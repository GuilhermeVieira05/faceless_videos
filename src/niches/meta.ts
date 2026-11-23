/**
 * Metadados dos nichos, sem React: usados pela validação dos roteiros (e pelo CLI de render).
 * Ao criar um nicho novo, registre aqui os tipos de cena e os campos obrigatórios de cada um.
 */
export type NicheMeta = {
	label: string;
	/** tipo de cena -> campos obrigatórios */
	scenes: Record<string, string[]>;
};

export const nicheMeta: Record<string, NicheMeta> = {
	programacao: {
		label: 'Programação',
		scenes: {
			hook: ['title'],
			code: ['code'],
			bullets: ['points'],
			outro: [],
		},
	},
	ingles: {
		label: 'Inglês',
		scenes: {
			hook: ['title'],
			phrase: ['pt', 'en'],
			wrongRight: ['wrong', 'right'],
			example: ['en', 'pt'],
			bullets: ['points'],
			outro: [],
		},
	},
};
