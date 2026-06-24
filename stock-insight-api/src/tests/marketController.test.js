jest.mock('yahoo-finance2', () => ({
    default: {
        quote: jest.fn(),
        search: jest.fn()
    }
}));

const yahooFinance = require('yahoo-finance2').default;
const {
    getMarkets,
    searchStocks
} = require('../Controller/marketController');

describe('Market Controller', () => {
    let res;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.clearAllMocks();
    });

    test('should return market summary cards', async () => {
        yahooFinance.quote
            .mockResolvedValueOnce({
                regularMarketPrice: 20000,
                regularMarketChangePercent: 1.23
            })
            .mockResolvedValueOnce({
                regularMarketPrice: 5000,
                regularMarketChangePercent: 0.45
            })
            .mockResolvedValueOnce({
                regularMarketPrice: 7000,
                regularMarketChangePercent: 0.67
            })
            .mockResolvedValueOnce({
                regularMarketPrice: 8000,
                regularMarketChangePercent: 0.89
            });

        await getMarkets({}, res);

        expect(res.json).toHaveBeenCalledWith([
            expect.objectContaining({ name: 'NIFTY 50', change: '1.23' }),
            expect.objectContaining({ name: 'S&P 500', change: '0.45' }),
            expect.objectContaining({ name: 'ASX', change: '0.67' }),
            expect.objectContaining({ name: 'FTSE 100', change: '0.89' })
        ]);
    });

    test('should return stock search suggestions', async () => {
        yahooFinance.search.mockResolvedValue({
            quotes: [
                {
                    symbol: 'TSLA',
                    shortname: 'Tesla, Inc.',
                    exchange: 'NMS',
                    quoteType: 'EQUITY'
                },
                {
                    symbol: 'TSM',
                    shortname: 'Taiwan Semiconductor',
                    exchange: 'NYQ',
                    quoteType: 'EQUITY'
                }
            ]
        });

        await searchStocks({ query: { q: 'Tesla' } }, res);

        expect(yahooFinance.search).toHaveBeenCalledWith(
            'Tesla',
            expect.objectContaining({
                quotesCount: 8,
                newsCount: 0,
                enableFuzzyQuery: true
            })
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            {
                symbol: 'TSLA',
                name: 'Tesla, Inc.',
                exchange: 'NMS',
                quoteType: 'EQUITY'
            },
            {
                symbol: 'TSM',
                name: 'Taiwan Semiconductor',
                exchange: 'NYQ',
                quoteType: 'EQUITY'
            }
        ]);
    });

    test('should return empty suggestions for short queries', async () => {
        await searchStocks({ query: { q: 'a' } }, res);

        expect(yahooFinance.search).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([]);
    });
});
