// helper_functions.js
var webdriver = require('selenium-webdriver'),
	By = webdriver.By;

/* 
 *	Start with selector web element and click the option that matches
 * 	Assuming the selector only has option tags
 */
function select_option(selector, option_name) {
	//get each option tag within the select dropdown
	selector.findElements(By.css('option')).then((options) => {
		//check each option
		for (let i = 0; i < options.length; i++) {
			
			options[i].getText().then((opt_text) => {
				//compare the text with passed in name
				if(opt_text == option_name) {
					console.log(opt_text + " clicked");
					options[i].click(); //a match, click this option
					return true;
				}
			});
		}
	});
	return false; //option_name didnt match any available options
}



// append the item's category to the base url and add it as a property
// used in map()
let addUrlToItem = function(item) {

	const baseURL = "https://www.supremenewyork.com/shop/all";
	
	item.url = `${baseURL}/${item.category}`;

	return item;
};


// checks if category passed in matches a valid category 
let isValidCategory = function(userCategory) {
 
	if(typeof userCategory !== "string") // the category must be a string to be valid
		return false;

	const validCategories = ["t-shirts", "hats", "bags", "accessories", 
							"skate", "jackets", "shirts", "tops_sweaters",
							"sweatshirts", "pants"];

	// check if category the user entered is inside the valid list
	return validCategories.includes(userCategory);
};


let validateItems = function(rawItems) {

	rawItems.forEach(rawItem => {

		// validate the category name (it's a string and matches a valid category)
		if(!isValidCategory(rawItem.category)) {

			console.log("this item's category is malformed:\n");
			console.log(rawItem);
			console.log("\nshould match one of these: jackets, shirts, tops_sweaters, " +
				"sweatshirts, pants, t-shirts, hats, bags, accessories, " + 
				"skate\n")
		}
	});
};

/*
 *	Checks for file name in command line arguments
 *	If no file specified, it defaults to 'items.js'
 * 	There is no validation of 'items.js' file, 
 *		or if user file was valid
 */
function get_items() {

	const numAcceptableCLParams = 3;
	const filenameIndex = 2;

	let itemsFileName = 'items.js'; // use if nothing was passed through the CL

	// command line contained a file name
	if (process.argv.length === numAcceptableCLParams)
		itemsFileName = process.argv[filenameIndex];

	// import items from file that's relative to the current directory
	let rawItems = require(`./${itemsFileName}`); 
	validateItems(rawItems);

	let itemsWithUrls = rawItems.map(addUrlToItem); // add the category's url to each item

	return itemsWithUrls;
};

module.exports = {
	select_option: select_option,
	get_items: get_items
};
