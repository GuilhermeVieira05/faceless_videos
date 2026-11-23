import React from 'react';

export type RichPart = {text: string; hl: boolean};
export type RichWord = {parts: RichPart[]};

const isHighlight = (part: string) => part.length > 2 && part.startsWith('*') && part.endsWith('*');

/**
 * Quebra um texto com *destaque* em palavras. Pontuação colada no destaque
 * (ex.: *"I am agree"*?) continua na mesma palavra, sem espaço no meio.
 */
export const tokenizeRich = (text: string): RichWord[] => {
	const words: RichWord[] = [];
	let current: RichPart[] = [];
	const flush = () => {
		if (current.length > 0) words.push({parts: current});
		current = [];
	};
	for (const segment of text.split(/(\*[^*]+\*)/g)) {
		const hl = isHighlight(segment);
		const clean = hl ? segment.slice(1, -1) : segment;
		for (const piece of clean.split(/(\s+)/)) {
			if (!piece) continue;
			if (/^\s+$/.test(piece)) flush();
			else current.push({text: piece, hl});
		}
	}
	flush();
	return words;
};

export const Rich: React.FC<{text: string; color: string}> = ({text, color}) => (
	<>
		{text.split(/(\*[^*]+\*)/g).map((part, i) =>
			isHighlight(part) ? (
				<span key={i} style={{color}}>
					{part.slice(1, -1)}
				</span>
			) : (
				<React.Fragment key={i}>{part}</React.Fragment>
			),
		)}
	</>
);
