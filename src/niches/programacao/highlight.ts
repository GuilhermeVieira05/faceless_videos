import type {syntaxColors} from './theme';

export type TokenKind = keyof typeof syntaxColors;
export type Token = {text: string; kind: TokenKind};

const KEYWORDS = new Set(
	'const let var function return if else for while do async await import from export default class extends new this try catch finally throw typeof instanceof interface type enum implements public private protected readonly of in as true false null undefined void switch case break continue static constructor yield satisfies keyof'.split(
		' ',
	),
);

// comentário | string | número | identificador | espaço | pontuação
const TOKEN_RE = /(\/\/.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|(\s+)|([^\sA-Za-z_$\d])/g;

/** Realce de sintaxe simples (JS/TS), linha a linha, sem dependências. */
export const tokenizeLine = (line: string): Token[] => {
	const tokens: Token[] = [];
	TOKEN_RE.lastIndex = 0;
	let m: RegExpExecArray | null;
	while ((m = TOKEN_RE.exec(line))) {
		const text = m[0];
		if (m[1]) tokens.push({text, kind: 'comment'});
		else if (m[2]) tokens.push({text, kind: 'string'});
		else if (m[3]) tokens.push({text, kind: 'number'});
		else if (m[4]) {
			const next = line.slice(TOKEN_RE.lastIndex).trimStart()[0];
			if (KEYWORDS.has(text)) tokens.push({text, kind: 'keyword'});
			else if (next === '(') tokens.push({text, kind: 'fn'});
			else if (/^[A-Z]/.test(text)) tokens.push({text, kind: 'type'});
			else tokens.push({text, kind: 'plain'});
		} else if (m[5]) tokens.push({text, kind: 'plain'});
		else tokens.push({text, kind: 'punct'});
	}
	return tokens;
};
