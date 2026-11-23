import React from 'react';
import {Composition} from 'remotion';
import {createNicheComponent} from './core/ScriptVideo';
import {FPS, HEIGHT, WIDTH} from './core/layout';
import {loadFonts} from './core/fonts';
import {calculateScriptMetadata} from './core/timing';
import type {VideoProps} from './core/types';
import {ingles} from './niches/ingles';
import {programacao} from './niches/programacao';

loadFonts();

/**
 * Todo nicho vira uma Composition (id = id do nicho).
 * Para criar um nicho novo: crie a pasta em src/niches, registre em meta.ts e adicione na lista abaixo.
 */
const niches = [programacao, ingles].map((niche) => ({niche, component: createNicheComponent(niche)}));

export const Root: React.FC = () => (
	<>
		{niches.map(({niche, component}) => (
			<Composition
				key={niche.id}
				id={niche.id}
				component={component}
				durationInFrames={300}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
				defaultProps={{script: niche.defaultScript} satisfies VideoProps}
				calculateMetadata={calculateScriptMetadata}
			/>
		))}
	</>
);
