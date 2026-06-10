const excludeDocs = (files: string[]): string[] => files.filter((f) => !f.includes('/docs/'));

export default {
	'*.{js,ts,svelte}': (files) => {
		const filtered = excludeDocs(files);
		return filtered.length ? [`eslint ${filtered.join(' ')}`] : [];
	},
	'*.{js,ts,svelte,html,scss,md,yml,yaml}': (files) => {
		const filtered = excludeDocs(files);
		return filtered.length ? [`prettier --write ${filtered.join(' ')}`] : [];
	}
};
