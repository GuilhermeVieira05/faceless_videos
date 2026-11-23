import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {alpha, sceneBox} from '../layout';
import {Rich} from '../rich';
import type {SceneProps} from '../types';

/** Lista numerada que vai aparecendo ponto a ponto. Campos: `title?`, `points: string[]`. */
export const Bullets: React.FC<SceneProps> = ({scene, theme, frames, hasCaptions}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const points: string[] = Array.isArray(scene.points) ? scene.points.map(String) : [];
	const left = theme.align === 'left';
	const step = Math.max(10, (frames * 0.6) / Math.max(1, points.length));
	const pop = (delay: number) => spring({frame: frame - delay, fps, config: {damping: 15, stiffness: 170}});

	return (
		<div style={{...sceneBox(hasCaptions), alignItems: left ? 'flex-start' : 'center'}}>
			{scene.title ? (
				<div
					style={{
						opacity: pop(0),
						marginBottom: 56,
						fontWeight: 900,
						fontSize: 76,
						lineHeight: 1.08,
						letterSpacing: -1.5,
						color: theme.text,
						textAlign: left ? 'left' : 'center',
					}}
				>
					<Rich text={String(scene.title)} color={theme.accent} />
				</div>
			) : null}

			<div style={{display: 'flex', flexDirection: 'column', gap: 34, width: '100%'}}>
				{points.map((point, i) => {
					const p = pop(10 + i * step);
					return (
						<div
							key={i}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 32,
								padding: '30px 36px',
								borderRadius: 32,
								background: theme.surface,
								border: `2px solid ${theme.surfaceBorder}`,
								opacity: Math.min(1, p * 1.5),
								transform: `translateX(${(1 - p) * (left ? -70 : 0)}px) translateY(${(1 - p) * (left ? 0 : 40)}px)`,
							}}
						>
							<div
								style={{
									flex: '0 0 auto',
									width: 72,
									height: 72,
									borderRadius: '50%',
									background: theme.accent,
									color: '#0B1020',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: 900,
									fontSize: 40,
									boxShadow: `0 0 36px ${alpha(theme.accent, 0.45)}`,
								}}
							>
								{i + 1}
							</div>
							<div style={{fontWeight: 700, fontSize: 50, lineHeight: 1.18, color: theme.text}}>
								<Rich text={point} color={theme.accent} />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
