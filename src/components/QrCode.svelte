<script lang="ts">
	import QRCode from 'qrcode';

	let { data }: { data: string } = $props();

	let canvas = $state<HTMLCanvasElement | undefined>(undefined);

	$effect(() => {
		if (canvas) void QRCode.toCanvas(canvas, data, { errorCorrectionLevel: 'H' });
	});
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
