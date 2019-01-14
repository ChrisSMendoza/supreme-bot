
const {Builder, By, Key, until} = require('selenium-webdriver');
var driver = new Builder().forBrowser('firefox').build();

const { get_items, select_option } = require('./helper_functions.js');
const debit = require('./debit.js');
const user = require('./user.js');
const form = require('./form.js');

const items = get_items();


for (const item of items) {

	driver.get(item.url); // go to the item's category page

	let itemLink = driver.wait(until.elementLocated(By.partialLinkText(item.keyPhrase)));
	// go to the item's page
	itemLink.click();
	// wait for page to load before selecting size, color, etc
	driver.wait(until.elementLocated(By.name('commit'))); 

	// the user specified colors
	if(item.colors.length > 0) {

		// go through colors until one is selected
		item.colors.some(color => {
			// NOTE:
			// findElements needed here since findElement throws an
			// exception when element is not found
			driver.findElements(By.partialLinkText(color))
			.then(colorLinks => {

				let colorFound = (colorLinks.length > 0);

				if(colorFound) {
					colorLinks[0].click(); // go to item with this color
				}
				// some() stops searching when color is matched and returns true
				return colorFound;
			});
		});
	}

	// the user specified a size
	if(item.size !== "") {
		// dropdown with each size
		let sizeSelector = driver.wait(until.elementLocated(By.name('s')));

		select_option(sizeSelector, item.size); // select the size
	}

	addCartBtn = driver.wait(until.elementLocated(By.name('commit')));
	addCartBtn.click(); // add the item to the cart

	// wait for item to be added to the cart
	driver.wait(until.elementLocated(By.linkText('checkout now')));
} // all items have been added to the cart

let checkoutNowBtn = 
	driver.wait(until.elementLocated(By.linkText('checkout now')));
checkoutNowBtn.click(); // go to checkout page

// do not fill out information until checkout page is loaded
driver.wait(until.urlIs("https://www.supremenewyork.com/checkout"));

// go through each input field on the checkout page
form.names.forEach((name, index) => {

	driver.findElement(By.name(name))
	.then(inputField => {
		
		inputField.sendKeys(user.details[index]); // insert matching user info
	},
	(err) => {
		console.log(`Element with name ${name} not found`);
	});
});

// input debit card information
let selector = driver.wait(until.elementLocated(By.id('credit_card_month')));
select_option(selector, debit.exp_month);

selector = driver.wait(until.elementLocated(By.id('credit_card_year')));
select_option(selector, debit.exp_year);

let terms_checkbox = driver.wait(until.elementLocated(By.id('order_terms')));
terms_checkbox.sendKeys(Key.SPACE);

