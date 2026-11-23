import type React from 'react';

/** Uma cena do roteiro. Cada nicho define quais `type` existem e quais campos extras usam. */
export type AnyScene = {
	type: string;
	/** Texto narrado. Vira áudio (via `npm run tts`) e legenda. */
	narration?: string;
	/** Voz específica desta cena (sobrescreve a do roteiro). */
	voice?: string;
	/** Duração mínima em segundos. Sem narração, é a duração da cena. */
	duration?: number;
	/** Força legenda ligada/desligada nesta cena. */
	captions?: boolean;
	[key: string]: any;
};

export type Script = {
	id: string;
	niche: string;
	title: string;
	handle?: string;
	voice?: string;
	scenes: AnyScene[];
};

export type ResolvedScene = {
	startFrame: number;
	frames: number;
	speechFrames: number;
	audio: string | null;
};

export type VideoProps = {
	script: Script;
	resolved?: ResolvedScene[];
};

export type Theme = {
	id: string;
	handle: string;
	align: 'left' | 'center';
	bg: string[];
	glow: [string, string];
	pattern: 'grid' | 'dots' | 'none';
	text: string;
	muted: string;
	accent: string;
	accent2: string;
	surface: string;
	surfaceBorder: string;
	good: string;
	bad: string;
	fontSans: string;
	fontMono: string;
};

export type SceneProps = {
	scene: AnyScene;
	theme: Theme;
	frames: number;
	hasCaptions: boolean;
	handle: string;
};

export type SceneComponent = React.FC<SceneProps>;

export type NicheDefinition = {
	id: string;
	label: string;
	theme: Theme;
	scenes: Record<string, SceneComponent>;
	/** Tipos de cena que mostram legenda por padrão. */
	captionTypes: string[];
	defaultScript: Script;
};
