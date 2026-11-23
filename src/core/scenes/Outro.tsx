import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {alpha, sceneBox} from '../layout';
import {Rich} from '../rich';
import type {SceneProps} from '../types';

/** Encerramento com chamada pra seguir. Campos: `title?`, `subtitle?`. */
export const Outro: React.FC<SceneProps> = ({scene, theme, hasCaptions, handle}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const left = theme.align === 'left';
	const pop = (delay: number) => spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 160}});
	const pulse = 1 + Math.sin(frame / 7) * 0.025;

	return (
		<div style={{...sceneBox(hasCaptions), alignItems: left ? 'flex-start' : 'center', textAlign: left ? 'left' : 'center'}}>
			<div
				style={{
					opacity: pop(0),
					transform: `translateY(${(1 - pop(0)) * 40}px)`,
					fontWeight: 900,
					fontSize: 100,
					lineHeight: 1.05,
					letterSpacing: -2,
					color: theme.text,
				}}
			>
				<Rich text={String(scene.title ?? 'Segue pra mais *dicas*')} color={theme.accent} />
			</div>

			{scene.subtitle ? (
				<div
					style={{
						marginTop: 36,
						opacity: pop(8),
						color: theme.muted,
						fontWeight: 500,
						fontSize: 50,
						lineHeight: 1.25,
					}}
				>
					{String(scene.subtitle)}
				</div>
			) : null}

			<div
				style={{
					marginTop: 72,
					opacity: pop(14),
					transform: `scale(${pulse * (0.9 + 0.1 * pop(14))})`,
					padding: '30px 60px',
					borderRadius: 999,
					background: theme.accent,
					color: '#0B1020',
					fontWeight: 900,
					fontSize: 58,
					boxShadow: `0 0 60px ${alpha(theme.accent, 0.5)}`,
				}}
			>
				{handle}
			</div>
		</div>
	);
};
