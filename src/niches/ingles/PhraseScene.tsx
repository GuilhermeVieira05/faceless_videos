import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ArrowDownIcon} from '../../core/Icons';
import {alpha, sceneBox} from '../../core/layout';
import {Rich} from '../../core/rich';
import type {SceneProps} from '../../core/types';

/** "Como dizer X em inglês". Campos: `pt`, `en`, `pronunciation?`, `note?`. */
export const PhraseScene: React.FC<SceneProps> = ({scene, theme, frames, hasCaptions}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const pop = (delay: number) => spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 170}});

	const tEn = Math.max(16, Math.round(frames * 0.2));
	const tPron = tEn + 16;
	const tNote = tPron + 16;
	const en = String(scene.en);
	const enSize = en.length > 34 ? 78 : en.length > 22 ? 94 : 112;

	return (
		<div style={{...sceneBox(hasCaptions), alignItems: 'center', textAlign: 'center'}}>
			<div style={{opacity: pop(0), transform: `translateY(${(1 - pop(0)) * 30}px)`}}>
				<div style={{color: theme.muted, fontWeight: 800, fontSize: 36, letterSpacing: 6, textTransform: 'uppercase'}}>Como dizer</div>
				<div style={{marginTop: 18, color: theme.text, fontWeight: 900, fontSize: 76, lineHeight: 1.1, letterSpacing: -1.5}}>
					<Rich text={String(scene.pt)} color={theme.accent2} />
				</div>
			</div>

			<div style={{marginTop: 44, opacity: pop(tEn - 6)}}>
				<ArrowDownIcon size={84} color={theme.accent} />
			</div>

			<div
				style={{
					marginTop: 36,
					width: '100%',
					padding: '64px 44px',
					borderRadius: 48,
					background: theme.surface,
					border: `3px solid ${alpha(theme.accent, 0.6)}`,
					boxShadow: `0 0 90px ${alpha(theme.accent, 0.22)}`,
					opacity: Math.min(1, pop(tEn) * 1.4),
					transform: `scale(${0.85 + 0.15 * pop(tEn)})`,
				}}
			>
				<div style={{color: theme.accent, fontWeight: 900, fontSize: enSize, lineHeight: 1.08, letterSpacing: -2, textWrap: 'balance'}}>{en}</div>
				{scene.pronunciation ? (
					<div style={{marginTop: 32, opacity: pop(tPron), color: theme.muted, fontWeight: 500, fontSize: 48, fontStyle: 'italic'}}>
						{String(scene.pronunciation)}
					</div>
				) : null}
			</div>

			{scene.note ? (
				<div style={{marginTop: 44, opacity: pop(tNote), transform: `translateY(${(1 - pop(tNote)) * 24}px)`, color: theme.text, fontWeight: 600, fontSize: 46, lineHeight: 1.3}}>
					<Rich text={String(scene.note)} color={theme.accent} />
				</div>
			) : null}
		</div>
	);
};
