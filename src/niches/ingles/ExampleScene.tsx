import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {alpha, sceneBox} from '../../core/layout';
import {Rich} from '../../core/rich';
import type {SceneProps} from '../../core/types';

/** Frase de exemplo com tradução. Campos: `en` (use *destaque*), `pt`, `label?`. */
export const ExampleScene: React.FC<SceneProps> = ({scene, theme, frames, hasCaptions}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const pop = (delay: number) => spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 170}});
	const tPt = Math.max(26, Math.round(frames * 0.42));
	const en = String(scene.en);
	const size = en.replace(/\*/g, '').length > 48 ? 72 : 88;

	return (
		<div style={{...sceneBox(hasCaptions), alignItems: 'center', textAlign: 'center'}}>
			<div
				style={{
					opacity: pop(0),
					padding: '14px 36px',
					borderRadius: 999,
					background: alpha(theme.accent2, 0.2),
					border: `2px solid ${alpha(theme.accent2, 0.7)}`,
					color: theme.text,
					fontWeight: 800,
					fontSize: 36,
					letterSpacing: 5,
					textTransform: 'uppercase',
				}}
			>
				{String(scene.label ?? 'Exemplo')}
			</div>

			<div
				style={{
					marginTop: 56,
					width: '100%',
					padding: '64px 44px',
					borderRadius: 48,
					background: theme.surface,
					border: `3px solid ${theme.surfaceBorder}`,
					opacity: Math.min(1, pop(8) * 1.4),
					transform: `scale(${0.9 + 0.1 * pop(8)})`,
					color: theme.text,
					fontWeight: 900,
					fontSize: size,
					lineHeight: 1.15,
					letterSpacing: -1.5,
					textWrap: 'balance',
				}}
			>
				<Rich text={en} color={theme.accent} />
			</div>

			<div style={{marginTop: 52, opacity: pop(tPt), transform: `translateY(${(1 - pop(tPt)) * 28}px)`, color: theme.muted, fontWeight: 500, fontSize: 54, fontStyle: 'italic', lineHeight: 1.3}}>
				{String(scene.pt)}
			</div>
		</div>
	);
};
