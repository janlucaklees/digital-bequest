<script lang="ts">
	//
	// Props

	//
	// Imports
	import html2pdf from 'html2pdf.js';

	import i18n from './i18n';

	import Page from './components/Page.svelte';
	import { encodeMessage } from './lib/message-functions';

	//
	// Code
	let message = 'In the event of my death, scan the QR Code to retrieve my important credentials.';
	let credentials = '';
	let password = '';
	let passwordRepetition = '';

	let page;

	$: cipher = encodeMessage(credentials, password);

	function downloadPDF(): void {
		void html2pdf(page);
	}
</script>

<div class="container hide-on-print">
	<h3>{$i18n.t('encode.steps.1.title')}</h3>

	<p>{$i18n.t('encode.steps.1.subtitle')}</p>

	<textarea rows="12" bind:value={message}></textarea>
</div>

<div class="container hide-on-print">
	<h3>{$i18n.t('encode.steps.2.title')}</h3>

	<p>{$i18n.t('encode.steps.2.subtitle')}</p>

	<textarea rows="12" bind:value={credentials}></textarea>
</div>

<div class="container hide-on-print">
	<h3>{$i18n.t('encode.steps.3.title')}</h3>

	<p>{$i18n.t('encode.steps.3.subtitle')}</p>

	<label for="password">{$i18n.t('encode.steps.3.fields.password.label')}</label>
	<input id="password" name="password" type="password" bind:value={password} />

	<label for="password-repeat">{$i18n.t('encode.steps.3.fields.password-repeat.label')}</label>
	<input
		id="password-repeat"
		name="password-repeat"
		type="password"
		bind:value={passwordRepetition}
	/>
</div>

<div class="container dont-interfere-on-print">
	<h3 class="hide-on-print">
		{$i18n.t('encode.steps.4.title')}
	</h3>

	<div class="preview dont-interfere-on-print">
		<div class="scaler dont-interfere-on-print">
			<Page
				bind:page
				{message}
				qrCodeData={`${window.location.origin}${
					window.location.pathname
				}?c=${encodeURIComponent(cipher)}`}
			/>
		</div>
	</div>

	<div class="align-center hide-on-print">
		<button class="cta" on:click={downloadPDF}>
			{$i18n.t('encode.steps.4.buttons.download')}
		</button>
	</div>
</div>

<style>
	textarea {
		height: auto;
		min-height: 8rem;
		resize: vertical;
	}

	.preview {
		position: relative;

		width: calc(210mm * 0.75);
		height: calc(297mm * 0.75);

		margin: 0 auto 6rem;

		overflow: hidden;

		box-shadow:
			rgba(0, 0, 0, 0.15) 0px 15px 25px,
			rgba(0, 0, 0, 0.05) 0px 5px 10px;
	}
	.scaler {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		transform: scale(0.75);
		transform-origin: top left;
	}

	.align-center {
		display: flex;
		justify-content: center;
	}

	.cta {
		font-size: 2rem;
		height: 3.45em;
	}
</style>
