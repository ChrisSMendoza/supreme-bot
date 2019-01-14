// user.js

const debit = require('./debit.js');

module.exports = {

	details: [
		"Fake User", // full name
		"fakeemailtoo@notreal.com",
		"18001231234",
		"12345 Fake St",
		"99", // apt #, etc.
		"98765", // zip code
		"Fake City",
		debit.number,
		debit.cvv
	]
};