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

<code> node ticker.js [TICKER] [INTERVAL] </code>

# Breakdown

<b> [TICKER] </b> can be any symbol with USDT or INR base. For Example - BTCUSDT , XRPUSDT, BTCINR, EOSINR, TRXUSDT ...

<b>[INTERVAL] </b>- It is optional. If set <i>(in ms) </i>updates the ticker in that interval. Default is 4000 , and is auto-set when nothing is mentioned.

# NOTES

I've made this for myself as the website is not that responsive to frequent updates and as a day trader i found this very inconvinient in responding quickly in a volatile market. This ticker helped me notice the change in price and volume and thus respond accorningly without any delay. 

- More functionality coming soon.
