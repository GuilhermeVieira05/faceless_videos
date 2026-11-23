import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

/** Entrada suave e saída rápida de cada cena. */
export const SceneFade: React.FC<{frames: number; children: React.ReactNode}> = ({frames, children}) => {
	const frame = useCurrentFrame();
	const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
	const fadeIn = interpolate(frame, [0, 6], [0, 1], clamp);
	const fadeOut = interpolate(frame, [Math.max(7, frames - 5), frames], [1, 0], clamp);
	const lift = interpolate(frame, [0, 12], [28, 0], {...clamp, easing: Easing.out(Easing.cubic)});
	return (
		<AbsoluteFill style={{opacity: Math.min(fadeIn, fadeOut), transform: `translateY(${lift}px)`}}>
			{children}
		</AbsoluteFill>
	);
};
