<script lang="ts">
	// Props
	export let data;

	// Imports
	import QRCode from 'qrcode';

	// Code
	let canvas;

	$: if (canvas) void QRCode.toCanvas(canvas, data, { errorCorrectionLevel: 'H' });
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		width: auto !important;
		height: auto !important;

		min-width: 60%;
		max-width: 80%;

		aspect-ratio: 1 / 1;
	}
</style>
