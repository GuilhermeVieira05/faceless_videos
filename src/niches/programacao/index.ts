import {coreScenes} from '../../core/ScriptVideo';
import type {NicheDefinition, Script} from '../../core/types';
import defaultScript from '../../../content/programacao/001-typescript-any.json';
import {CodeScene} from './CodeScene';
import {programacaoTheme} from './theme';

export const programacao: NicheDefinition = {
	id: 'programacao',
	label: 'Programação',
	theme: programacaoTheme,
	scenes: {...coreScenes, code: CodeScene},
	captionTypes: ['code', 'bullets'],
	defaultScript: defaultScript as Script,
};
