import {getAudioDurationInSeconds} from '@remotion/media-utils';
import type {CalculateMetadataFunction} from 'remotion';
import {staticFile} from 'remotion';
import {FPS, HEIGHT, WIDTH} from './layout';
import type {AnyScene, ResolvedScene, VideoProps} from './types';

/** Silêncio depois da fala, antes de passar pra próxima cena. */
const AUDIO_TAIL_SECONDS = 0.45;
const WORDS_PER_SECOND = 2.6;

export const audioPath = (scriptId: string, index: number) => `audio/${scriptId}/scene-${index}.mp3`;

const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/** Estimativa de duração quando ainda não existe áudio de narração. */
export const estimateSceneSeconds = (scene: AnyScene): number => {
	if (!scene.narration && typeof scene.duration === 'number') return scene.duration;

	const narration = scene.narration ? countWords(scene.narration) / WORDS_PER_SECOND + 0.8 : 0;

	let otherWords = 0;
	for (const [key, value] of Object.entries(scene)) {
		if (['type', 'narration', 'voice', 'code'].includes(key)) continue;
		if (typeof value === 'string') otherWords += countWords(value);
		if (Array.isArray(value)) otherWords += value.reduce((a, v) => a + (typeof v === 'string' ? countWords(v) : 0), 0);
	}
	const codeLines = typeof scene.code === 'string' ? scene.code.split('\n').length : 0;
	const visual = 2 + otherWords / 3.5 + codeLines * 0.6;

	return Math.max(narration, visual, scene.duration ?? 0, 2.5);
};

/**
 * Descobre a duração de cada cena: usa o áudio real (public/audio/<id>/scene-N.mp3)
 * quando existe, e a estimativa por texto quando não existe.
 */
export const calculateScriptMetadata: CalculateMetadataFunction<VideoProps> = async ({props}) => {
	const {script} = props;
	const resolved: ResolvedScene[] = [];
	let cursor = 0;

	for (let i = 0; i < script.scenes.length; i++) {
		const scene = script.scenes[i];
		let audio: string | null = null;
		let speechSeconds = scene.narration ? countWords(scene.narration) / WORDS_PER_SECOND : 0;
		let seconds = estimateSceneSeconds(scene);

		if (scene.narration) {
			const path = audioPath(script.id, i);
			try {
				const real = await getAudioDurationInSeconds(staticFile(path));
				if (real > 0) {
					audio = path;
					speechSeconds = real;
					seconds = Math.max(real + AUDIO_TAIL_SECONDS, scene.duration ?? 0);
				}
			} catch {
				// sem áudio ainda: segue com a estimativa
			}
		}

		const frames = Math.max(1, Math.ceil(seconds * FPS));
		resolved.push({
			startFrame: cursor,
			frames,
			speechFrames: Math.max(1, Math.min(Math.round(speechSeconds * FPS), frames)),
			audio,
		});
		cursor += frames;
	}

	return {
		durationInFrames: Math.max(cursor, 1),
		fps: FPS,
		width: WIDTH,
		height: HEIGHT,
		props: {...props, resolved},
	};
};
