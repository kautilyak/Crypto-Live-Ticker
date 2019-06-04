# Crypto-Live-Ticker
 A Node.Js program which helps you monitor any crypto market live. Any crypto market under USDT and INR base can be monitored.

# Pre-requisites

- Node.JS must be installed on your system for this to work.
- npm 
- Basic commandline knowledge (Optional)

# Usage

- Install all the required dependencies by running the following code:

<code> npm install </code>

- And the commandline to use the program is:

<code> node ticker.js -s [SYMBOL] -t [INTERVAL] -e [EMAIL] -n [THRESHOLD] </code>


# Breakdown

- s : Symbol to track , Example - trxusdt , trxbtc, trxinr etc..
- t : Set the frequency between refresh data (optional)
- e : Email to notify when threshold price hits (optional)
- n : Threshold price (optional)

# NOTES

I've made this for myself as the website is not that responsive to frequent updates and as a day trader i found this very inconvinient in responding quickly in a volatile market. This ticker helped me notice the change in price and volume and thus respond accorningly without any delay. 

- More functionality coming soon.
