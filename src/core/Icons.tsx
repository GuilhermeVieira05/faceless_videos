import React from 'react';

type IconProps = {size?: number; color: string};

export const CheckIcon: React.FC<IconProps> = ({size = 64, color}) => (
	<svg width={size} height={size} viewBox="0 0 64 64" fill="none">
		<circle cx="32" cy="32" r="30" fill={color} />
		<path d="M18 33 L28 43 L47 22" stroke="#0B1020" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export const CrossIcon: React.FC<IconProps> = ({size = 64, color}) => (
	<svg width={size} height={size} viewBox="0 0 64 64" fill="none">
		<circle cx="32" cy="32" r="30" fill={color} />
		<path d="M21 21 L43 43 M43 21 L21 43" stroke="#0B1020" strokeWidth="7" strokeLinecap="round" />
	</svg>
);

export const ArrowDownIcon: React.FC<IconProps> = ({size = 64, color}) => (
	<svg width={size} height={size} viewBox="0 0 64 64" fill="none">
		<path d="M32 10 V50 M16 36 L32 52 L48 36" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);
