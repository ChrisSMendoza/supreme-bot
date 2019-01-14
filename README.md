Supreme Shopping Bot
====================
### An easy to use bot that finds and buys all your Supreme needs (does not solve the Captcha).
Format the items file, enter your personal information in another, and you're all set.

Features
--------
* Finds items based on keywords that can be found [online](http://www.heatedsneaks.com/supreme-dashbot-extension-guide.html).
* Fills out personal information programmatically
* Checks out fast enough to get what you want

Installation
------------
Selenium, the browser automation tool used, requires a webdriver for each browser. This repo uses Firefox because it allows a checkbox at checkout to be clicked. Follow [this to set up Firefox Geckodriver with Node](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Your_own_automation_environment)

Once that's set up, clone the repo
```
git clone https://github.com/ChrisSMendoza/supreme-bot.git
```
Go to the project folder and install the node dependencies
```
cd supreme-bot
npm install
```
That's it, now you're ready to get Supreme at retail price.
To test everything is working enter:
```
cd src
node buy_items.js test_items.js
```
This will add Hanes tees and skate trucks to a cart, enter checkout info, but not actually purchase it.

Running the bot
---------------
#### Setting checkout information
1. Place card info in debit.js
2. Place personal info in user.js

#### Configuring an items file
You may copy items_template.js as a starting point
1. Create a new file or use items.js
2. Fill in each piece of information
* **keyPhrase**: the text to be found within a link, must partially match item names on the Supreme site
* **colors**: an array of colors to try, goes from left to right until a color is found (can use a single color)
* **category**: the category of the item, validated before being used in url
* **size**: the desired size

**Note**: an empty array or empty string are to be used when colors or sizes are not applicable respectively

**Note**: I use [this site](http://www.heatedsneaks.com/supreme-dashbot-extension-guide.html) for setting the **keyPhrase**, **colors**, and **category**

**Example**
```
{
	keyPhrase: "Split Box",
	colors: ["Black", "White"], 
	category: "sweatshirts",
	size: "L"
}
```
#### Execution
Ensure you're inside the **src** directory and enter
```
node buy_items.js [filename]
```
The bot will now sit idle until the first item's page is loaded. Chances are you are running the bot some time before the drop time. It is up to you to refresh the browser until the shop is open (sorry I didn't implement that). Once the shop page loads, the bot will take over, it will click the items and input info. Click submit once all the info is entered and be ready to solve the captcha.
**Note**: If no filename is entered, the bot will use items.js

