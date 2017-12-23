const revamp = require('./index');


test('simple extract', () => {
	const src = {
		a: 'ping',
		b: 42,
		c: 'unwanted'
	}
	const expected = {
		a: 'ping',
		b: 42
	}
	expect(revamp.extract(src, {
		a: 'a', b: 'b'
	}))
})
