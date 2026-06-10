import fs from 'fs';

import { encodeMessage, decodeMessage } from './message-functions';

describe('Message Functions', () => {
	it('should decrypt what it encrypted.', () => {
		const message = 'Super secret message!';
		const password = 'qwer1234';

		expect(decodeMessage(encodeMessage(message, password), password)).toEqual(message);
	});

	it('should work with various UTF-8 characters.', () => {
		const message = fs.readFileSync(`${__dirname}/UTF-8_demo.txt`, 'utf8');
		const password = 'qwer1234';

		expect(decodeMessage(encodeMessage(message, password), password)).toEqual(message);
	});

	it('should always be backwards copatible.', () => {
		const message = 'May this work till the end of (my) time.';
		const cypher =
			'U2FsdGVkX18soMozNq0HkaV/JdEZHweFkOcuEIKKp/ReoRIAc4rxqWvDpDxvWJcqy9N28jij3Uco0Nk+6scccA==';
		const password = 'qwer1234';

		expect(decodeMessage(cypher, password)).toEqual(message);
	});
});
