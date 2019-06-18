const https = require('https');
const colors = require('colors');
const nodemailer = require('nodemailer');
const lineByLine = require('line-by-line');
var argv = require('minimist')(process.argv.slice(2));


try{
	var pr;
	var ticker = argv['_'][0].toLowerCase();
	var frequency = argv['t']; 
	var email = argv['e'];
	var notify = argv['n'];
	var help = argv['h'];
	var change_holder = argv['c'];
	const url = "https://api.wazirx.com/api/v2/tickers";   // API URL
	var prev=0;
	var totalChange;
	var thresh_check;
	var changeIsSet = false;
	var changeIsTriggered = false;
	var price_holder = null;
	var startPriceSet = false;
	var mailArray = new Array();
	
	if(email == true) {
		var lr = new lineByLine('mail.txt');
		lr.on('line', (data) => {
			mailArray.push(data);
		}).on('end', ()=> {
			mailArray = mailArray.join(', ');
		});
		
		
	}
	
	//Nodemailer

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'thespikybro@gmail.com',
		pass: 'ipcxobaivndjfnld'
	  }
	});
	
	
	// For price notification
	var mailOptionsForPrice = {
	  from: 'Crypto Ticker <ticker@nodemailer.com>',
	  to: mailArray,
	  subject: `${ticker.toUpperCase()} Price Alert!`,
	  text: `The price has reached ${notify}. To view more please check exchange.   Project website: https://github.com/kautilyak/Crypto-Live-Ticker`
	};
	
	
	//For change increase Notification 
	var mailOptionsForChangeIncrease = {
	  from: 'Crypto Ticker <ticker@nodemailer.com>',
	  to: mailArray,
	  subject: `${ticker.toUpperCase()} Change Alert!`,
	  text: `The market increased ${change_holder} %. To view more please check exchange.  Project website: https://github.com/kautilyak/Crypto-Live-Ticker`
	};
	
	//For change decrease Notification
	var mailOptionsForChangeDecrease = {
	  from: 'Crypto Ticker <ticker@nodemailer.com>',
	  to: mailArray,
	  subject: `${ticker.toUpperCase()} Change Alert!`,
	  text: `The market decreased ${change_holder} %. To view more please check exchange.  Project website: https://github.com/kautilyak/Crypto-Live-Ticker`
	};


	
	
	//Function to find the percentage change in price.
	
	function percChange(first, second) {
		var perc = 0;
		if(second<first) {
			perc = ((first-second)/first)*100;
		} else if(first<second) {
			perc = ((second-first)/second)*100;
		}
		return perc.toFixed(2) + ' %';
	}
	
	//Function to check change if change is mentioned
	
	function checkChange(first_val, last_val) {
		var p;
		if(last_val > first_val) {
			
			//Market change is positive
			p = ((last_val-first_val)/last_val)*100;
			p = p.toFixed(2);
			
		} else if(first_val > last_val) {
			
			// Market change is negative
			p = ((first_val-last_val)/first_val)*100;
			p = -p.toFixed(2);
		}
		
		return p;
	}
	
	
	if(!frequency) {
		frequency = 4000;     //Default frequency
	}
	
	// Log Info into console before getting data.
	
	console.log(colors.green("\n### This program shows you real time updates of the CRYPTO-TICKER you input.\n### To quit press CTRL + C"));
	console.log(colors.green("### Mention frequency(ms) after ticker or default (4sec) will be set"));
	console.log(colors.green("### Made by Kautilya .K ")+"[https://kautilyak.github.io]");
	console.log("\nGetting Data....".inverse);
	var requestLoop = setInterval(()=>{
		var now = new Date();
		var body = '';
		var request = https.get(url, (response) => {
			response.on('data', (chunk) => {
				body += chunk;
			});
			
			response.on('end', ()=>{
				body = JSON.parse(body);
				if(body[ticker]) {  	// Check if the ticker provided is valid 
					var ticker_name = body[ticker]['name'];
					var last_buy = body[ticker]['last'];
					var open = body[ticker]['open'];
					var high = body[ticker]['high'];
					var low = body[ticker]['low'];
					totalChange = ((last_buy-open)/open)*100;
					totalChange = totalChange.toFixed(2);
					
					//If change is mentioned 
					if(change_holder != null) {
						changeIsSet = true;
					}
					
					//Check if base price is set 
					if(startPriceSet == false) {
						price_holder = last_buy;
						startPriceSet = true;
					}
					
					if(changeIsSet == true && startPriceSet == true) {
						pr = checkChange(price_holder, last_buy);
						if(pr>0 && pr>= change_holder) {
							//Send mail
							transporter.sendMail(mailOptionsForChangeIncrease, function(error, info){
							  if (error) {
								console.log(error);
							  } else {
								console.log(colors.green('Market Price Increased: '+ pr + ' %   ' + info.response));
								//changeIsTriggered = true;
								price_holder = null;
								startPriceSet = false;
								}
							});
							
						} else if(pr<0 && pr<= -change_holder) {
							//Send mail
							transporter.sendMail(mailOptionsForChangeDecrease, function(error, info){
							  if (error) {
								console.log(error);
							  } else {
								console.log(colors.green('Market Price Decreased: '+ pr + ' %   ' + info.response));
								//changeIsTriggered = true;
								price_holder = null;
								startPriceSet = false;
							  }
							});
						}
					}
					
					
					
					//ELSE
					// MAIL CHECK
					if(thresh_check) {
						if(thresh_check > 0) {
							if(notify <= last_buy){
								
								//Send mail
								transporter.sendMail(mailOptionsForPrice, function(error, info){
								  if (error) {
									console.log(error);
								  } else {
									console.log(colors.green('Threshold Price Reached: '+ notify + ' ' + info.response));
									notify = null;
								  }
								});
								
							}
						} else {
							if(notify >= last_buy) {
								
								//Send mail
								transporter.sendMail(mailOptionsForPrice, function(error, info){
								  if (error) {
									console.log(error);
								  } else {
									console.log(colors.green('Threshold Price Reached: '+ notify + ' ' + info.response));
									notify = null;
								  }
								});
								
							}
						}
					}
					
					// Thresh Check
					if(notify != null && notify > last_buy) {
						thresh_check = 1;
					} else {
						thresh_check = -1;
					}
					
					
					// DAILY CHANGE 
					
					
					if(totalChange > 0) {
						console.log(`Daily change : ${colors.grey(low)} - ${colors.grey(high)} ( ${colors.green(totalChange)} %)`);
					} else if (totalChange < 0){
						console.log(`Daily change : ${colors.grey(low)} - ${colors.grey(high)} ( ${colors.red(totalChange)} %)`);
					} else {
						console.log(`Daily change : ${colors.grey(low)} - ${colors.grey(high)} (${totalChange}%)`);
					}
					
					
					if(prev != last_buy) {
						var perc = percChange(prev, last_buy);  //Find the percentage change
						if(prev < last_buy) {
							console.log(`${colors.inverse(ticker_name)} ${colors.green(last_buy.bold +" "+ perc.inverse)}             ${now.toTimeString().grey}`);
						} else if(prev > last_buy){
							console.log(`${colors.inverse(ticker_name)} ${colors.red(last_buy  +" "+  perc.inverse)}             ${now.toTimeString().grey}`);
						}
						
						prev = last_buy;
						
					} else {
					console.log(`${colors.inverse(ticker_name)} ${colors.bold(last_buy)}            ${now.toTimeString().grey}`);
					}
					
				} else {
					clearInterval(requestLoop);     //Exit the loop
					var error = new Error("Error: Invalid Ticker Provided");
					console.log(colors.red(error.message));
				}
			});
		}).on('error', (e)=>{     // Request error like internet conn etc...
			console.log(colors.red('Please reconnect to the internet...'));
		});
	}, frequency);
	
} catch(err) {
	console.log(colors.red("Error : " + err.message));
}
