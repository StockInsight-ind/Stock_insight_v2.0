const yahooFinance = require('yahoo-finance2').default;

const getMarkets = async (req, res) => {
    try {
        const [nifty, sp500, asx, ftse] = await Promise.all([
            yahooFinance.quote('^NSEI'),
            yahooFinance.quote('^GSPC'),
            yahooFinance.quote('^AXJO'),
            yahooFinance.quote('^FTSE')
        ]);

        res.json([
            {
                flag: '🇮🇳',
                name: 'NIFTY 50',
                value: nifty.regularMarketPrice,
                change: nifty.regularMarketChangePercent.toFixed(2)
            },
            {
                flag: '🇺🇸',
                name: 'S&P 500',
                value: sp500.regularMarketPrice,
                change: sp500.regularMarketChangePercent.toFixed(2)
            },
            {
                flag: '🇦🇺',
                name: 'ASX',
                value: asx.regularMarketPrice,
                change: asx.regularMarketChangePercent.toFixed(2)
            },
            {
                flag: '🇬🇧',
                name: 'FTSE 100',
                value: ftse.regularMarketPrice,
                change: ftse.regularMarketChangePercent.toFixed(2)
            }
        ]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Market data unavailable'
        });
    }
};

const searchStocks = async (req, res) => {
    try {
        const query = String(req.query.q || '').trim();

        if (query.length < 2) {
            return res.status(200).json([]);
        }

        const searchResult = await yahooFinance.search(query, {
            quotesCount: 8,
            newsCount: 0,
            enableFuzzyQuery: true
        });

        const quotes = Array.isArray(searchResult.quotes) ? searchResult.quotes : [];

        const results = quotes
            .filter((quote) => quote && typeof quote.symbol === 'string')
            .map((quote) => ({
                symbol: quote.symbol.toUpperCase(),
                name: quote.shortname || quote.longname || quote.symbol,
                exchange: quote.exchange || '',
                quoteType: quote.quoteType || ''
            }))
            .slice(0, 8);

        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Stock search unavailable'
        });
    }
};

module.exports = {
    getMarkets,
    searchStocks
};
