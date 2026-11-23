/**
 * Um comando só: gera a voz (edge-tts) e renderiza o vídeo.
 *
 *   npm run make -- content/programacao/003-padrao-observer.json
 *   npm run make -- --all
 *   npm run make -- <roteiro> --no-voice     (renderiza só com legenda, sem narração em áudio)
 *
 * Na primeira vez cria a pasta .venv e instala o edge-tts sozinho.
 * Outras opções (--preview, --still=N, --browser=...) são repassadas ao render.
 */
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const noVoice = args.includes('--no-voice');
const passthrough = args.filter((a) => a !== '--no-voice');
const win = process.platform === 'win32';
const systemPython = win ? 'python' : 'python3';
const venvPython = path.join(root, '.venv', win ? 'Scripts/python.exe' : 'bin/python');

const run = (cmd: string, cmdArgs: string[], what: string, opts: {shell?: boolean} = {}) => {
	const result = spawnSync(cmd, cmdArgs, {cwd: root, stdio: 'inherit', shell: opts.shell});
	if (result.error || result.status !== 0) {
		console.error(`\nFalhou: ${what}.`);
		process.exit(result.status ?? 1);
	}
};

const listScripts = (): string[] => {
	if (args.includes('--all')) {
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
	return passthrough.filter((a) => !a.startsWith('--')).map((a) => path.resolve(a));
};

const ensureVoiceEnv = () => {
	if (fs.existsSync(venvPython)) return;
	console.log('Preparando o ambiente de voz (só na primeira vez)...');
	run(systemPython, ['-m', 'venv', '.venv'], 'criar o ambiente Python (.venv). O Python 3 está instalado?');
	run(venvPython, ['-m', 'pip', 'install', '-q', 'edge-tts'], 'instalar o edge-tts');
};

const files = listScripts();
if (files.length === 0) {
	console.error('Informe um roteiro (ex.: content/programacao/003-padrao-observer.json) ou use --all.');
	process.exit(1);
}

if (!noVoice) {
	ensureVoiceEnv();
	for (const file of files) {
		console.log(`\nGerando voz: ${path.relative(root, file)}`);
		run(venvPython, ['scripts/tts.py', file], 'gerar a voz. Sem internet? Use --no-voice para renderizar só com legenda');
	}
}

const quoted = passthrough.map((a) => JSON.stringify(a)).join(' ');
run('npx', ['tsx', 'scripts/render.ts', quoted], 'renderizar o vídeo', {shell: true});
