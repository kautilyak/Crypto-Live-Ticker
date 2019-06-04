const https = require('https');
const colors = require('colors');

try{
	var ticker = process.argv.slice(2)[0].toLowerCase();
	var frequency = process.argv.slice(2)[1];            
	const url = "https://api.wazirx.com/api/v2/tickers";   // API URL
	var prev=0;
	var totalChange;
	var now = new Date();
	
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
	
	
	if(!frequency) {
		frequency = 4000;     //Default frequency
	}
	
	// Log Info into console before getting data.
	
	console.log("\n\n" + now.toTimeString().grey);
	console.log(colors.green("\n### This program shows you real time updates of the CRYPTO-TICKER you input.\n### To quit press CTRL + C"));
	console.log(colors.green("### Mention frequency(ms) after ticker or default (4sec) will be set"));
	console.log(colors.green("### Made by Kautilya .K ")+"[https://kautilyak.github.io]");
	console.log("\nGetting Data....".inverse);
	var requestLoop = setInterval(()=>{
		
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
					totalChange = ((last_buy-open)/open)*100;
					totalChange = totalChange.toFixed(2);
						
						if(totalChange > 0) {
							console.log(`Daily change : ${colors.green(totalChange) + "%"}`);
						} else if (totalChange < 0){
							console.log(`Daily change : ${colors.red(totalChange) + "%"}`);
						} else {
							console.log("Daily Change : " + totalChange);
						}
					
					
					if(prev != last_buy) {
						var perc = percChange(prev, last_buy);  //Find the percentage change
						if(prev < last_buy) {
							console.log(`${colors.inverse(ticker_name)} ${colors.green(last_buy.bold +" "+ perc.inverse)}   ${now.toTimeString().grey}`);
						} else if(prev > last_buy){
							console.log(`${colors.inverse(ticker_name)} ${colors.red(last_buy  +" "+  perc.inverse)}   ${now.toTimeString().grey}`);
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
		});
	}, frequency);
	
} catch(err) {
	console.log(colors.red("Error : " + err.message));
}