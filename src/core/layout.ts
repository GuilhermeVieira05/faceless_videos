import type React from 'react';

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;

/**
 * Zonas seguras para TikTok / Shorts: a interface das plataformas cobre o topo,
 * a parte de baixo (descrição, botões) e a lateral direita.
 */
export const SAFE = {top: 190, bottom: 380, left: 72, right: 72};
export const CAPTION_H = 250;
export const CONTENT_W = WIDTH - SAFE.left - SAFE.right;

/** Altura disponível para o conteúdo principal da cena. */
export const contentHeight = (hasCaptions: boolean) =>
	HEIGHT - SAFE.top - SAFE.bottom - (hasCaptions ? CAPTION_H : 0);

/** Caixa onde cada cena desenha seu conteúdo (já respeita as zonas seguras e a legenda). */
export const sceneBox = (hasCaptions: boolean): React.CSSProperties => ({
	position: 'absolute',
	left: SAFE.left,
	right: SAFE.right,
	top: SAFE.top,
	bottom: SAFE.bottom + (hasCaptions ? CAPTION_H : 0),
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
});

export const alpha = (hex: string, a: number) =>
	`${hex}${Math.round(Math.max(0, Math.min(1, a)) * 255)
		.toString(16)
		.padStart(2, '0')}`;
