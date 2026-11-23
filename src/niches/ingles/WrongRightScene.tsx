import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CheckIcon, CrossIcon} from '../../core/Icons';
import {alpha, sceneBox} from '../../core/layout';
import {Rich} from '../../core/rich';
import type {SceneProps} from '../../core/types';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Erro comum x forma correta. Campos: `wrong`, `right`, `note?`. */
export const WrongRightScene: React.FC<SceneProps> = ({scene, theme, frames, hasCaptions}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const pop = (delay: number) => spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 170}});

	const tWrong = 4;
	const tStrike = 22;
	const tRight = Math.max(40, Math.round(frames * 0.38));
	const tNote = tRight + 18;
	const strike = interpolate(frame, [tStrike, tStrike + 12], [0, 1], clamp);

	const wrong = String(scene.wrong);
	const right = String(scene.right);
	const size = (t: string) => (t.length > 30 ? 58 : t.length > 20 ? 68 : 80);

	const card = (tone: 'bad' | 'good'): React.CSSProperties => {
		const color = tone === 'bad' ? theme.bad : theme.good;
		return {
			display: 'flex',
			alignItems: 'center',
			gap: 32,
			width: '100%',
			padding: '48px 40px',
			borderRadius: 44,
			background: alpha(color, 0.12),
			border: `3px solid ${alpha(color, 0.65)}`,
			boxShadow: `0 0 70px ${alpha(color, 0.18)}`,
		};
	};

	return (
		<div style={{...sceneBox(hasCaptions), alignItems: 'center', textAlign: 'center'}}>
			<div style={{...card('bad'), opacity: Math.min(1, pop(tWrong) * 1.4), transform: `translateY(${(1 - pop(tWrong)) * 40}px)`}}>
				<CrossIcon size={84} color={theme.bad} />
				<div style={{position: 'relative', flex: 1, textAlign: 'left'}}>
					<div style={{color: theme.text, opacity: 0.75, fontWeight: 800, fontSize: size(wrong), lineHeight: 1.1, letterSpacing: -1}}>{wrong}</div>
					<div style={{position: 'absolute', left: 0, top: '52%', height: 8, width: `${strike * 100}%`, borderRadius: 4, background: theme.bad}} />
				</div>
			</div>

			<div style={{...card('good'), marginTop: 40, opacity: Math.min(1, pop(tRight) * 1.4), transform: `translateY(${(1 - pop(tRight)) * 40}px) scale(${0.94 + 0.06 * pop(tRight)})`}}>
				<CheckIcon size={84} color={theme.good} />
				<div style={{flex: 1, textAlign: 'left', color: theme.text, fontWeight: 900, fontSize: size(right), lineHeight: 1.1, letterSpacing: -1}}>{right}</div>
			</div>

			{scene.note ? (
				<div style={{marginTop: 52, opacity: pop(tNote), transform: `translateY(${(1 - pop(tNote)) * 24}px)`, color: theme.text, fontWeight: 600, fontSize: 46, lineHeight: 1.3}}>
					<Rich text={String(scene.note)} color={theme.accent} />
				</div>
			) : null}
		</div>
	);
};
