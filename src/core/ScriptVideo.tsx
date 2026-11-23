import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Background, ProgressBar} from './Background';
import {Captions} from './Captions';
import {SceneFade} from './SceneFade';
import {Bullets} from './scenes/Bullets';
import {Hook} from './scenes/Hook';
import {Outro} from './scenes/Outro';
import type {NicheDefinition, SceneComponent, VideoProps} from './types';

/** Cenas que qualquer nicho pode usar sem escrever código. */
export const coreScenes: Record<string, SceneComponent> = {
	hook: Hook,
	bullets: Bullets,
	outro: Outro,
};

/** Transforma a definição de um nicho em um componente de vídeo que renderiza o roteiro JSON. */
export const createNicheComponent = (niche: NicheDefinition): React.FC<VideoProps> => {
	const NicheVideo: React.FC<VideoProps> = ({script, resolved}) => {
		if (!resolved) return null;
		const handle = script.handle ?? niche.theme.handle;

		return (
			<AbsoluteFill style={{fontFamily: niche.theme.fontSans}}>
				<Background theme={niche.theme} />
				{script.scenes.map((scene, i) => {
					const info = resolved[i];
					const Scene = niche.scenes[scene.type];
					if (!Scene) throw new Error(`Cena desconhecida "${scene.type}" no nicho "${niche.id}"`);
					const hasCaptions = Boolean(scene.narration) && (scene.captions ?? niche.captionTypes.includes(scene.type));

					return (
						<Sequence key={i} from={info.startFrame} durationInFrames={info.frames}>
							<SceneFade frames={info.frames}>
								<Scene scene={scene} theme={niche.theme} frames={info.frames} hasCaptions={hasCaptions} handle={handle} />
								{hasCaptions && scene.narration ? (
									<Captions text={scene.narration} speechFrames={info.speechFrames} theme={niche.theme} />
								) : null}
							</SceneFade>
							{info.audio ? <Audio src={staticFile(info.audio)} /> : null}
						</Sequence>
					);
				})}
				<ProgressBar theme={niche.theme} />
			</AbsoluteFill>
		);
	};
	return NicheVideo;
};
