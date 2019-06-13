# Crypto-Live-Ticker
 A Node.Js program which helps you monitor any crypto market live. Any crypto market under USDT,INR and BTC base can be monitored.

# Pre-requisites

- Node.JS must be installed on your system for this to work.
- npm 
- Basic commandline knowledge (Optional)

# Usage

- Install all the required dependencies by running the following code:

<code> npm install </code>

- And the commandline to use the program is:

<code> node ticker.js [SYMBOL] -t [INTERVAL] -e [EMAIL] -n [THRESHOLD] -c [CHANGE] </code>


# Breakdown

- [SYMBOL] : Symbol to track , Example - trxusdt , trxbtc, trxinr etc..
- t : Set the frequency between refresh data (optional)
- e : Email to notify when threshold price hits (optional)
- n : Notify email once it hits X threshold price (optional) (email required)
- c : Notify email every time  X% Change in the market (Optional) (email required)


<i>Setting both -n and -c will activate both change and price alerts. Make sure the -e [EMAIL] is set along with them</i>

# NOTES

I've made this for myself as the website is not that responsive to frequent updates and as a day trader i found this very inconvinient in responding quickly in a volatile market. This ticker helped me notice the change in price and volume and thus respond accorningly without any delay. 

- More functionality coming soon.
- Program uses WazirX API
