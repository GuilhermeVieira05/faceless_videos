/**
 * Renderiza roteiros JSON em vídeo.
 *
 *   npm run render -- content/programacao/001-typescript-any.json
 *   npm run render -- --all                  (todos os roteiros em content/)
 *   npm run render -- <roteiro> --preview    (um PNG por cena, pra conferir o visual rápido)
 *   npm run render -- <roteiro> --still=120  (um PNG do frame 120)
 *
 * Opções: --browser=/caminho/do/chrome (ou variável REMOTION_BROWSER)
 */
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';
import {validateScript} from '../src/core/validate';

const root = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flag = (name: string) => args.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
const flagValue = (name: string) => flag(name)?.split('=')[1];

const browserExecutable = flagValue('browser') ?? process.env.REMOTION_BROWSER ?? null;

// Cenas sem áudio geram um 404 esperado em public/audio: não polui o terminal com isso.
const onBrowserLog = (log: {text: string}) => {
	if (log.text.includes('/audio/') && log.text.includes('404')) return;
	console.log(log.text);
};

const findScripts = (): string[] => {
	if (flag('all')) {
		const out: string[] = [];
		const contentDir = path.join(root, 'content');
		for (const niche of fs.readdirSync(contentDir)) {
			const dir = path.join(contentDir, niche);
			if (!fs.statSync(dir).isDirectory()) continue;
			for (const file of fs.readdirSync(dir).sort()) {
				if (file.endsWith('.json') && !file.startsWith('_')) out.push(path.join(dir, file));
			}
		}
		return out;
	}
	return args.filter((a) => !a.startsWith('--')).map((a) => path.resolve(a));
};

const main = async () => {
	const files = findScripts();
	if (files.length === 0) {
		console.error('Informe um roteiro (ex.: content/programacao/001-typescript-any.json) ou use --all.');
		process.exit(1);
	}

	// valida tudo antes de começar o render (que é a parte demorada)
	let failed = false;
	const scripts = files.map((file) => {
		const script = JSON.parse(fs.readFileSync(file, 'utf8'));
		const errors = validateScript(script);
		if (errors.length > 0) {
			failed = true;
			console.error(`\n${path.relative(root, file)}:\n  - ${errors.join('\n  - ')}`);
		}
		return {file, script};
	});
	if (failed) process.exit(1);

	console.log('Preparando o projeto...');
	const serveUrl = await bundle({entryPoint: path.join(root, 'src/index.ts'), publicDir: path.join(root, 'public')});

	for (const {file, script} of scripts) {
		const inputProps = {script};
		const composition = await selectComposition({serveUrl, id: script.niche, inputProps, browserExecutable, onBrowserLog});
		const outDir = path.join(root, 'out', script.niche);
		fs.mkdirSync(outDir, {recursive: true});
		const seconds = (composition.durationInFrames / composition.fps).toFixed(1);
		const resolved: {startFrame: number; frames: number; audio: string | null}[] = (composition.props as any).resolved;
		const withAudio = resolved.filter((r) => r.audio).length;
		console.log(`\n${script.id}: ${seconds}s, ${script.scenes.length} cenas (${withAudio} com narração em áudio)`);

		if (flag('preview')) {
			const dir = path.join(outDir, `${script.id}-preview`);
			fs.mkdirSync(dir, {recursive: true});
			for (const [i, r] of resolved.entries()) {
				const frame = r.startFrame + Math.min(r.frames - 1, Math.round(r.frames * 0.85));
				await renderStill({composition, serveUrl, inputProps, frame, output: path.join(dir, `cena-${i + 1}.png`), browserExecutable, onBrowserLog});
			}
			console.log(`  Prévias em ${path.relative(root, dir)}`);
			continue;
		}

		const still = flagValue('still');
		if (still !== undefined) {
			const output = path.join(outDir, `${script.id}-frame-${still}.png`);
			await renderStill({composition, serveUrl, inputProps, frame: Number(still), output, browserExecutable, onBrowserLog});
			console.log(`  ${path.relative(root, output)}`);
			continue;
		}

		const output = path.join(outDir, `${script.id}.mp4`);
		let lastPct = -1;
		await renderMedia({
			composition,
			serveUrl,
			inputProps,
			codec: 'h264',
			crf: 20,
			outputLocation: output,
			browserExecutable,
			onBrowserLog,
			onProgress: ({progress}) => {
				const pct = Math.floor(progress * 10) * 10;
				if (pct !== lastPct) {
					lastPct = pct;
					process.stdout.write(`  ${pct}%\r`);
				}
			},
		});
		console.log(`  Pronto: ${path.relative(root, output)}`);
	}
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
