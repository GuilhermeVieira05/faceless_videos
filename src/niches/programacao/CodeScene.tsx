import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CrossIcon, CheckIcon} from '../../core/Icons';
import {CONTENT_W, alpha, contentHeight, sceneBox} from '../../core/layout';
import {Rich} from '../../core/rich';
import type {SceneProps} from '../../core/types';
import {tokenizeLine} from './highlight';
import {syntaxColors} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const CHAR_W = 0.602; // largura de um caractere da fonte mono, em "em"
const WINDOW_PAD = 34;
const HEADER_H = 74;

/**
 * Janela de código com digitação animada.
 * Campos: `code`, `filename?`, `title?`, `label?` + `tone?` (bad | good | neutral), `highlight?` (linhas, começando em 1).
 */
export const CodeScene: React.FC<SceneProps> = ({scene, theme, frames, hasCaptions}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const lines = String(scene.code ?? '').replace(/\s+$/, '').split('\n');
	const tokens = lines.map(tokenizeLine);
	const total = lines.reduce((sum, l) => sum + l.length + 1, 0);
	const maxLen = Math.max(...lines.map((l) => l.length), 1);

	const tone: 'bad' | 'good' | 'neutral' = scene.tone === 'bad' || scene.tone === 'good' ? scene.tone : 'neutral';
	const toneColor = tone === 'bad' ? theme.bad : tone === 'good' ? theme.good : theme.accent;

	// tamanho da fonte: cabe na largura E na altura disponíveis
	const reserved = 130 + (scene.title ? 120 : 0) + (scene.label ? 110 : 0);
	const innerW = CONTENT_W - WINDOW_PAD * 2 - 70; // 70 = coluna do número da linha
	const innerH = contentHeight(hasCaptions) - HEADER_H - WINDOW_PAD * 2 - reserved;
	const fontSize = Math.max(22, Math.min(46, Math.floor(innerW / (maxLen * CHAR_W)), Math.floor(innerH / (lines.length * 1.55))));
	const lineH = Math.round(fontSize * 1.55);

	// digitação
	const typeStart = 10;
	const typeFrames = Math.min(frames * 0.5, Math.max(24, total / 1.6));
	const visible = Math.floor(interpolate(frame, [typeStart, typeStart + typeFrames], [0, total], clamp));
	const typing = frame < typeStart + typeFrames;

	// foco nas linhas destacadas depois de digitar
	const highlight = new Set<number>(Array.isArray(scene.highlight) ? scene.highlight.map(Number) : []);
	const focus = highlight.size > 0 ? interpolate(frame, [typeStart + typeFrames + 6, typeStart + typeFrames + 18], [0, 1], clamp) : 0;

	const windowIn = spring({frame, fps, config: {damping: 16, stiffness: 140}});
	const labelIn = spring({frame: frame - 4, fps, config: {damping: 12, stiffness: 200}});

	let offset = 0;
	let cursorLine = 0;
	const rows = lines.map((line, i) => {
		const start = offset;
		offset += line.length + 1;
		const shown = Math.max(0, Math.min(line.length, visible - start));
		if (visible >= start) cursorLine = i;

		let consumed = 0;
		const spans: React.ReactNode[] = [];
		for (const [k, tok] of tokens[i].entries()) {
			if (consumed >= shown) break;
			const piece = tok.text.slice(0, shown - consumed);
			consumed += tok.text.length;
			spans.push(
				<span key={k} style={{color: syntaxColors[tok.kind], fontStyle: tok.kind === 'comment' ? 'italic' : 'normal'}}>
					{piece}
				</span>,
			);
		}

		const isHl = highlight.has(i + 1);
		const opacity = highlight.size > 0 && !isHl ? 1 - 0.65 * focus : 1;
		return (
			<div
				key={i}
				style={{
					display: 'flex',
					height: lineH,
					alignItems: 'center',
					margin: `0 -${WINDOW_PAD}px`,
					padding: `0 ${WINDOW_PAD}px`,
					opacity,
					background: isHl ? alpha(toneColor, 0.16 * focus) : 'transparent',
					borderLeft: `6px solid ${isHl ? alpha(toneColor, focus) : 'transparent'}`,
					paddingLeft: WINDOW_PAD - 6,
				}}
			>
				<span style={{width: 70, flex: '0 0 70px', color: alpha('#9FB0D9', 0.45), fontSize: fontSize * 0.8}}>{i + 1}</span>
				<span style={{whiteSpace: 'pre'}}>
					{spans}
					{typing && cursorLine === i ? (
						<span style={{display: 'inline-block', width: fontSize * 0.55, height: fontSize * 1.05, marginLeft: 2, verticalAlign: 'middle', background: Math.floor(frame / 8) % 2 === 0 ? theme.accent : 'transparent'}} />
					) : null}
				</span>
			</div>
		);
	});

	return (
		<div style={sceneBox(hasCaptions)}>
			{scene.title ? (
				<div style={{marginBottom: 34, fontWeight: 900, fontSize: 64, lineHeight: 1.08, letterSpacing: -1.5, color: theme.text, opacity: labelIn}}>
					<Rich text={String(scene.title)} color={theme.accent} />
				</div>
			) : null}

			{scene.label ? (
				<div
					style={{
						alignSelf: 'flex-start',
						display: 'flex',
						alignItems: 'center',
						gap: 18,
						marginBottom: 30,
						padding: '12px 30px 12px 16px',
						borderRadius: 999,
						background: alpha(toneColor, 0.16),
						border: `2px solid ${alpha(toneColor, 0.6)}`,
						color: toneColor,
						fontWeight: 900,
						fontSize: 40,
						letterSpacing: 3,
						textTransform: 'uppercase',
						opacity: labelIn,
						transform: `scale(${0.8 + 0.2 * labelIn})`,
						transformOrigin: 'left center',
					}}
				>
					{tone === 'bad' ? <CrossIcon size={46} color={toneColor} /> : tone === 'good' ? <CheckIcon size={46} color={toneColor} /> : null}
					{String(scene.label)}
				</div>
			) : null}

			<div
				style={{
					borderRadius: 36,
					background: theme.surface,
					border: `2px solid ${tone === 'neutral' ? theme.surfaceBorder : alpha(toneColor, 0.55)}`,
					boxShadow: `0 30px 90px rgba(0,0,0,0.5), 0 0 80px ${alpha(toneColor, tone === 'neutral' ? 0.08 : 0.2)}`,
					overflow: 'hidden',
					transform: `scale(${0.96 + 0.04 * windowIn})`,
				}}
			>
				<div style={{height: HEADER_H, display: 'flex', alignItems: 'center', gap: 14, padding: `0 ${WINDOW_PAD}px`, background: 'rgba(255,255,255,0.04)'}}>
					{['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
						<div key={c} style={{width: 20, height: 20, borderRadius: '50%', background: c}} />
					))}
					<div style={{marginLeft: 18, fontFamily: theme.fontMono, fontSize: 28, color: theme.muted}}>{String(scene.filename ?? '')}</div>
				</div>
				<div style={{padding: WINDOW_PAD, fontFamily: theme.fontMono, fontSize, color: syntaxColors.plain}}>{rows}</div>
			</div>
		</div>
	);
};
