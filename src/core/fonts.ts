import {continueRender, delayRender, staticFile} from 'remotion';

// Fontes empacotadas em public/fonts: o render não depende de internet nem do que está instalado no sistema.
const faces: {family: string; file: string; weight: string}[] = [
	{family: 'Inter', file: 'fonts/Inter-Regular.otf', weight: '400'},
	{family: 'Inter', file: 'fonts/Inter-Medium.otf', weight: '500'},
	{family: 'Inter', file: 'fonts/Inter-Bold.otf', weight: '700'},
	{family: 'Inter', file: 'fonts/Inter-ExtraBold.otf', weight: '800'},
	{family: 'Inter', file: 'fonts/Inter-Black.otf', weight: '900'},
	{family: 'DejaVu Sans Mono', file: 'fonts/DejaVuSansMono.ttf', weight: '400'},
	{family: 'DejaVu Sans Mono', file: 'fonts/DejaVuSansMono-Bold.ttf', weight: '700'},
];

let started = false;

export const loadFonts = () => {
	if (started || typeof document === 'undefined') return;
	started = true;
	const handle = delayRender('Carregando fontes');
	Promise.all(
		faces.map(async (f) => {
			const face = new FontFace(f.family, `url(${staticFile(f.file)})`, {weight: f.weight});
			await face.load();
			(document.fonts as unknown as {add: (f: FontFace) => void}).add(face);
		}),
	)
		.then(() => continueRender(handle))
		.catch((err) => {
			console.error('Falha ao carregar fontes', err);
			continueRender(handle);
		});
};
