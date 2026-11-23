import {nicheMeta} from '../niches/meta';

/** Confere o roteiro e devolve uma lista de erros em português (vazia = ok). */
export const validateScript = (script: any): string[] => {
	const errors: string[] = [];
	if (!script || typeof script !== 'object') return ['O roteiro precisa ser um objeto JSON.'];

	if (typeof script.id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(script.id)) {
		errors.push('"id" é obrigatório e só pode ter letras, números, - e _.');
	}
	if (typeof script.title !== 'string' || !script.title.trim()) errors.push('"title" é obrigatório.');

	const meta = nicheMeta[script.niche];
	if (!meta) {
		errors.push(`"niche" inválido: "${script.niche}". Opções: ${Object.keys(nicheMeta).join(', ')}.`);
		return errors;
	}

	if (!Array.isArray(script.scenes) || script.scenes.length === 0) {
		errors.push('"scenes" precisa ser uma lista com pelo menos uma cena.');
		return errors;
	}

	script.scenes.forEach((scene: any, i: number) => {
		const where = `Cena ${i + 1}`;
		const required = meta.scenes[scene?.type];
		if (!required) {
			errors.push(`${where}: tipo "${scene?.type}" não existe no nicho ${script.niche}. Opções: ${Object.keys(meta.scenes).join(', ')}.`);
			return;
		}
		for (const field of required) {
			if (scene[field] === undefined || scene[field] === '' || (Array.isArray(scene[field]) && scene[field].length === 0)) {
				errors.push(`${where} (${scene.type}): falta o campo "${field}".`);
			}
		}
		if (scene.narration !== undefined && typeof scene.narration !== 'string') {
			errors.push(`${where}: "narration" precisa ser texto.`);
		}
		if (scene.duration !== undefined && (typeof scene.duration !== 'number' || scene.duration <= 0)) {
			errors.push(`${where}: "duration" precisa ser um número de segundos maior que zero.`);
		}
	});

	return errors;
};
