import { md5 } from '@noble/hashes/legacy.js';

const MAGIC = 'Salted__';

// EVP_BytesToKey derives AES-256-CBC key+IV from password+salt using MD5,
// matching the scheme CryptoJS used internally — required for backwards-compatible decryption.
function evpBytesToKey(
	password: Uint8Array,
	salt: Uint8Array
): { key: Uint8Array; iv: Uint8Array } {
	const chunks: Uint8Array[] = [];
	let prev = new Uint8Array(0);
	while (chunks.reduce((n, b) => n + b.length, 0) < 48) {
		const input = new Uint8Array(prev.length + password.length + salt.length);
		input.set(prev);
		input.set(password, prev.length);
		input.set(salt, prev.length + password.length);
		prev = md5(input);
		chunks.push(prev);
	}
	const derived = new Uint8Array(chunks.reduce((n, b) => n + b.length, 0));
	let offset = 0;
	for (const chunk of chunks) {
		derived.set(chunk, offset);
		offset += chunk.length;
	}
	return { key: derived.slice(0, 32), iv: derived.slice(32, 48) };
}

export async function encodeMessage(message: string, password: string): Promise<string> {
	const enc = new TextEncoder();
	const salt = crypto.getRandomValues(new Uint8Array(8));
	const { key, iv } = evpBytesToKey(enc.encode(password), salt);
	const cryptoKey = await crypto.subtle.importKey('raw', key, 'AES-CBC', false, ['encrypt']);
	const encrypted = await crypto.subtle.encrypt(
		{ name: 'AES-CBC', iv },
		cryptoKey,
		enc.encode(message)
	);
	const out = new Uint8Array(16 + encrypted.byteLength);
	out.set(enc.encode(MAGIC));
	out.set(salt, 8);
	out.set(new Uint8Array(encrypted), 16);
	let binary = '';
	for (const byte of out) binary += String.fromCharCode(byte);
	return btoa(binary);
}

export async function decodeMessage(cipherText: string, password: string): Promise<string> {
	try {
		const bytes = Uint8Array.from(atob(cipherText), (c) => c.charCodeAt(0));
		if (new TextDecoder().decode(bytes.slice(0, 8)) !== MAGIC) return '';
		const salt = bytes.slice(8, 16);
		const { key, iv } = evpBytesToKey(new TextEncoder().encode(password), salt);
		const cryptoKey = await crypto.subtle.importKey('raw', key, 'AES-CBC', false, ['decrypt']);
		const decrypted = await crypto.subtle.decrypt(
			{ name: 'AES-CBC', iv },
			cryptoKey,
			bytes.slice(16)
		);
		return new TextDecoder().decode(decrypted);
	} catch {
		return '';
	}
}
