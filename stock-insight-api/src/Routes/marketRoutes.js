const express = require("express");
const yahooFinance = require("yahoo-finance2").default;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [nifty, sp500, asx, ftse] = await Promise.all([
      yahooFinance.quote("^NSEI"),
      yahooFinance.quote("^GSPC"),
      yahooFinance.quote("^AXJO"),
      yahooFinance.quote("^FTSE")
    ]);

    res.json([
      {
        flag: "🇮🇳",
        name: "NIFTY 50",
        value: nifty.regularMarketPrice,
        change: nifty.regularMarketChangePercent.toFixed(2)
      },
      {
        flag: "🇺🇸",
        name: "S&P 500",
        value: sp500.regularMarketPrice,
        change: sp500.regularMarketChangePercent.toFixed(2)
      },
      {
        flag: "🇦🇺",
        name: "ASX",
        value: asx.regularMarketPrice,
        change: asx.regularMarketChangePercent.toFixed(2)
      },
      {
        flag: "🇬🇧",
        name: "FTSE 100",
        value: ftse.regularMarketPrice,
        change: ftse.regularMarketChangePercent.toFixed(2)
      }
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Market data unavailable"
    });
  }
});

module.exports = router;
