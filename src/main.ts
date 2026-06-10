import { mount } from 'svelte';
import './main.scss';
import App from './App.svelte';

mount(App, {
	target: document.getElementById('app')!
});
