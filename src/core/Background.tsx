import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {FPS, SAFE} from './layout';
import type {Theme} from './types';

export const Background: React.FC<{theme: Theme}> = ({theme}) => {
	const frame = useCurrentFrame();
	const t = frame / FPS;

	const pattern: React.CSSProperties =
		theme.pattern === 'grid'
			? {
					backgroundImage:
						'linear-gradient(rgba(255,255,255,0.045) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.045) 2px, transparent 2px)',
					backgroundSize: '90px 90px',
				}
			: theme.pattern === 'dots'
				? {
						backgroundImage: 'radial-gradient(rgba(255,255,255,0.10) 3px, transparent 3px)',
						backgroundSize: '64px 64px',
					}
				: {};

	const orb = (color: string, x: number, y: number, size: number): React.CSSProperties => ({
		position: 'absolute',
		left: x - size / 2,
		top: y - size / 2,
		width: size,
		height: size,
		borderRadius: '50%',
		background: `radial-gradient(circle, ${color}55 0%, ${color}00 65%)`,
	});

	return (
		<AbsoluteFill style={{background: `linear-gradient(165deg, ${theme.bg.join(', ')})`}}>
			<div style={orb(theme.glow[0], 220 + Math.sin(t * 0.45) * 170, 360 + Math.cos(t * 0.35) * 140, 1300)} />
			<div style={orb(theme.glow[1], 880 + Math.cos(t * 0.4) * 160, 1480 + Math.sin(t * 0.3) * 160, 1400)} />
			<AbsoluteFill style={pattern} />
		</AbsoluteFill>
	);
};

export const ProgressBar: React.FC<{theme: Theme}> = ({theme}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const pct = Math.min(1, frame / Math.max(1, durationInFrames - 1));
	return (
		<div
			style={{
				position: 'absolute',
				top: SAFE.top - 70,
				left: SAFE.left,
				right: SAFE.right,
				height: 10,
				borderRadius: 5,
				background: 'rgba(255,255,255,0.16)',
				overflow: 'hidden',
			}}
		>
			<div style={{width: `${pct * 100}%`, height: '100%', borderRadius: 5, background: theme.accent}} />
		</div>
	);
};
