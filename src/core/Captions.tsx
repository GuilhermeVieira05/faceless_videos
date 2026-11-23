import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CAPTION_H, SAFE} from './layout';
import type {Theme} from './types';

type TimedWord = {word: string; start: number; end: number};

const START_OFFSET = 4;

/** Distribui as palavras ao longo da fala, proporcional ao tamanho de cada uma. */
const timeWords = (text: string, speechFrames: number): TimedWord[] => {
	const words = text.split(/\s+/).filter(Boolean);
	if (words.length === 0) return [];
	const weights = words.map((w) => w.length + 2);
	const total = weights.reduce((a, b) => a + b, 0);
	const usable = Math.max(speechFrames - START_OFFSET, words.length * 3);
	let cursor = START_OFFSET;
	return words.map((word, i) => {
		const dur = (usable * weights[i]) / total;
		const item = {word, start: cursor, end: cursor + dur};
		cursor += dur;
		return item;
	});
};

/** Agrupa em blocos curtos (até 4 palavras / 24 letras), quebrando depois de pontuação. */
const chunkWords = (words: TimedWord[]): TimedWord[][] => {
	const chunks: TimedWord[][] = [];
	let current: TimedWord[] = [];
	let chars = 0;
	for (const w of words) {
		if (current.length > 0 && (current.length >= 4 || chars + w.word.length > 24)) {
			chunks.push(current);
			current = [];
			chars = 0;
		}
		current.push(w);
		chars += w.word.length + 1;
		if (/[.,!?;:]$/.test(w.word)) {
			chunks.push(current);
			current = [];
			chars = 0;
		}
	}
	if (current.length > 0) chunks.push(current);
	return chunks;
};

export const Captions: React.FC<{text: string; speechFrames: number; theme: Theme}> = ({text, speechFrames, theme}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const chunks = React.useMemo(() => chunkWords(timeWords(text, speechFrames)), [text, speechFrames]);

	let index = -1;
	for (let i = 0; i < chunks.length; i++) if (frame >= chunks[i][0].start) index = i;
	if (index < 0) return null;

	const chunk = chunks[index];
	const lastEnd = chunks[chunks.length - 1].slice(-1)[0].end;
	if (frame > lastEnd + 12) return null;

	const pop = spring({frame: frame - chunk[0].start, fps, config: {damping: 16, stiffness: 280}, durationInFrames: 10});

	return (
		<div
			style={{
				position: 'absolute',
				left: SAFE.left,
				right: SAFE.right,
				bottom: SAFE.bottom,
				height: CAPTION_H,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
			}}
		>
			<div
				style={{
					transform: `scale(${0.88 + 0.12 * pop})`,
					fontFamily: theme.fontSans,
					fontWeight: 900,
					fontSize: 78,
					lineHeight: 1.12,
					letterSpacing: -1,
					WebkitTextStroke: '14px rgba(0,0,0,0.92)',
					paintOrder: 'stroke fill',
					textShadow: '0 8px 24px rgba(0,0,0,0.45)',
				}}
			>
				{chunk.map((w, i) => {
					const active = frame >= w.start && frame < w.end;
					return (
						<span key={i} style={{color: active ? theme.accent : '#FFFFFF', marginRight: i < chunk.length - 1 ? 18 : 0}}>
							{w.word}
						</span>
					);
				})}
			</div>
		</div>
	);
};
