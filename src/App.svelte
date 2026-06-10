<script lang="ts">
	//
	// Props

	//
	// Imports
	import i18n from './i18n';

	import logo from './assets/digital-bequest.svg';
	import Decode from './Decode.svelte';
	import Encode from './Encode.svelte';

	//
	// Code

	// Retrieve possible cipher from URL
	const queryParams = new URLSearchParams(window.location.search);
	const cipher = queryParams.get('c');
	const hasCipher = cipher !== null;
</script>

<main class="wrapper">
	<div class="container hide-on-print">
		<img src={logo} alt={$i18n.t('app.logo.alt')} />

		<h1 class="app-name">
			{$i18n.t('app.name')}
		</h1>

		<p class="slogan">
			{$i18n.t('app.slogan')}
		</p>
	</div>

	{#if hasCipher}
		<Decode {cipher} />
	{:else}
		<Encode />
	{/if}
</main>

<style>
	.container {
		text-align: center;
	}

	img {
		margin-bottom: 3.5rem;
	}
</style>
