import CryptoJS from 'crypto-js';

export function encodeMessage(message: string, password: string): string {
	return CryptoJS.AES.encrypt(message, password).toString();
}

export function decodeMessage(cipher: string, password: string): string {
	return CryptoJS.AES.decrypt(cipher, password).toString(CryptoJS.enc.Utf8);
}
