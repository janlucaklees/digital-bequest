<script lang="ts">
	import i18n from './i18n';
	import { decodeMessage } from './lib/message-functions';

	let { cipher }: { cipher: string } = $props();

	let password = $state('');
	let credentials = $state('');

	$effect(() => {
		void (async () => {
			credentials = await decodeMessage(cipher, password);
		})();
	});
</script>

<div class="container">
	<h3>{$i18n.t('decode.title')}</h3>

	<p>{$i18n.t('decode.copy')}</p>

	<label for="password">
		{$i18n.t('decode.fields.password.label')}
	</label>

	<input id="password" name="password" type="password" bind:value={password} />

	<label for="credentials">
		{$i18n.t('decode.message.title')}
	</label>

	<pre id="credentials"><code>{credentials}</code></pre>
</div>

<style>
</style>
