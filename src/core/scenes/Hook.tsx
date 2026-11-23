import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {alpha, sceneBox} from '../layout';
import {tokenizeRich} from '../rich';
import type {SceneProps} from '../types';

/** Abertura: tag opcional + título grande (com *destaque*) + subtítulo opcional. */
export const Hook: React.FC<SceneProps> = ({scene, theme, hasCaptions}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const title = String(scene.title ?? '');
	const words = tokenizeRich(title);
	const plainLength = title.replace(/\*/g, '').length;
	const size = plainLength > 60 ? 88 : plainLength > 36 ? 106 : 124;
	const left = theme.align === 'left';
	const subtitleStart = 8 + words.length * 3;

	const pop = (delay: number) => spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 170}});

	return (
		<div style={{...sceneBox(hasCaptions), alignItems: left ? 'flex-start' : 'center', textAlign: left ? 'left' : 'center'}}>
			{scene.tag ? (
				<div
					style={{
						opacity: pop(0),
						transform: `translateY(${(1 - pop(0)) * 20}px)`,
						marginBottom: 44,
						padding: '14px 32px',
						borderRadius: 999,
						background: alpha(theme.accent, 0.16),
						border: `2px solid ${alpha(theme.accent, 0.55)}`,
						color: theme.accent,
						fontWeight: 800,
						fontSize: 36,
						letterSpacing: 5,
						textTransform: 'uppercase',
					}}
				>
					{String(scene.tag)}
				</div>
			) : null}

			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: left ? 'flex-start' : 'center',
					columnGap: size * 0.26,
					rowGap: size * 0.06,
					fontWeight: 900,
					fontSize: size,
					lineHeight: 1.05,
					letterSpacing: -2,
					color: theme.text,
				}}
			>
				{words.map((w, i) => {
					const p = pop(4 + i * 3);
					return (
						<span
							key={i}
							style={{
								display: 'inline-block',
								opacity: Math.min(1, p * 1.4),
								transform: `translateY(${(1 - p) * 56}px)`,
							}}
						>
							{w.parts.map((part, k) => (
								<span key={k} style={{color: part.hl ? theme.accent : theme.text}}>
									{part.text}
								</span>
							))}
						</span>
					);
				})}
			</div>

			{scene.subtitle ? (
				<div
					style={{
						marginTop: 48,
						opacity: pop(subtitleStart),
						transform: `translateY(${(1 - pop(subtitleStart)) * 24}px)`,
						color: theme.muted,
						fontWeight: 500,
						fontSize: 50,
						lineHeight: 1.25,
					}}
				>
					{String(scene.subtitle)}
				</div>
			) : null}
		</div>
	);
};
