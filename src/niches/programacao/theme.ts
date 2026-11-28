import type {Theme} from '../../core/types';

export const programacaoTheme: Theme = {
	id: 'programacao',
	handle: '@bugdeproducao',
	align: 'left',
	bg: ['#070B17', '#0C1330', '#0A0F1E'],
	glow: ['#22D3EE', '#8B5CF6'],
	pattern: 'grid',
	text: '#F4F7FF',
	muted: '#8E9BC0',
	accent: '#38BDF8',
	accent2: '#A78BFA',
	surface: '#0E1630',
	surfaceBorder: 'rgba(148,163,255,0.20)',
	good: '#34D399',
	bad: '#FB7185',
	fontSans: 'Inter, system-ui, sans-serif',
	fontMono: '"DejaVu Sans Mono", ui-monospace, Menlo, Consolas, monospace',
};

export const syntaxColors = {
	keyword: '#C792EA',
	string: '#9AE6B4',
	number: '#F6AD55',
	comment: '#5F6E96',
	fn: '#7DD3FC',
	type: '#FBD38D',
	punct: '#9FB0D9',
	plain: '#E6ECFF',
};
