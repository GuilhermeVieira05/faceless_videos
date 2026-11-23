import {coreScenes} from '../../core/ScriptVideo';
import type {NicheDefinition, Script} from '../../core/types';
import defaultScript from '../../../content/ingles/001-i-agree.json';
import {ExampleScene} from './ExampleScene';
import {PhraseScene} from './PhraseScene';
import {inglesTheme} from './theme';
import {WrongRightScene} from './WrongRightScene';

export const ingles: NicheDefinition = {
	id: 'ingles',
	label: 'Inglês',
	theme: inglesTheme,
	scenes: {...coreScenes, phrase: PhraseScene, wrongRight: WrongRightScene, example: ExampleScene},
	// no inglês o texto já está na tela: legenda só quando pedida na cena (captions: true)
	captionTypes: [],
	defaultScript: defaultScript as Script,
};
