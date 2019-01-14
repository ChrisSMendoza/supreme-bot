// test_items.js

// valid categories: 
// jackets, shirts, tops_sweaters, sweatshirts, pants, 
// t-shirts, hats, bags, accessories, skate

module.exports = 
[
	{
		keyPhrase: "Tagless Tees", // should be title cased
		colors: ["Black"], // only need 2, could use 1
		category: "accessories", // should match one used in URL
		size: "L"
	},
	{
		keyPhrase: "Truck",
		colors: [], // not applicable here
		category: "skate",
		size: "" // not applicable here
	}
];