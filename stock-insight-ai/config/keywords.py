"""
keywords.py

Central keyword configuration for the
Stock Insight News Engine.

Contains keyword groups used for:

- Relevance scoring
- Impact detection
- Company matching
- Noise filtering

No business logic should exist here.
"""

# ==========================================================
# Company Alias Keywords
# ==========================================================

COMMON_COMPANY_SUFFIXES = [

    "inc",

    "inc.",

    "corp",

    "corporation",

    "co",

    "co.",

    "company",

    "limited",

    "ltd",

    "ltd.",

    "plc",

    "group",

    "holdings",

]

# ==========================================================
# Earnings Keywords
# ==========================================================

EARNINGS_KEYWORDS = [

    "earnings",

    "quarterly results",

    "quarter results",

    "q1",

    "q2",

    "q3",

    "q4",

    "annual results",

    "financial results",

    "eps",

    "revenue",

    "sales",

    "income",

    "operating profit",

    "net profit",

    "guidance",

    "forecast",

]

# ==========================================================
# Corporate Action
# ==========================================================

CORPORATE_ACTION_KEYWORDS = [

    "merger",

    "acquisition",

    "takeover",

    "spin off",

    "spinoff",

    "buyback",

    "share buyback",

    "stock split",

    "bonus shares",

    "rights issue",

    "secondary offering",

    "ipo",

    "follow on offering",

]

# ==========================================================
# Dividend
# ==========================================================

DIVIDEND_KEYWORDS = [

    "dividend",

    "special dividend",

    "cash dividend",

    "interim dividend",

    "final dividend",

    "record date",

    "ex dividend",

]

# ==========================================================
# Executive
# ==========================================================

EXECUTIVE_KEYWORDS = [

    "ceo",

    "cfo",

    "chairman",

    "chairperson",

    "director",

    "board",

    "executive",

    "management",

    "president",

    "founder",

]

# ==========================================================
# Regulatory
# ==========================================================

REGULATORY_KEYWORDS = [

    "sec",

    "asic",

    "nse",

    "bse",

    "asx",

    "nasdaq",

    "nyse",

    "filing",

    "investigation",

    "compliance",

    "penalty",

    "fine",

]

# ==========================================================
# Legal
# ==========================================================

LEGAL_KEYWORDS = [

    "lawsuit",

    "court",

    "litigation",

    "settlement",

    "fraud",

    "criminal",

    "probe",

    "investigation",

    "antitrust",

]

# ==========================================================
# Product
# ==========================================================

PRODUCT_KEYWORDS = [

    "launch",

    "product",

    "software",

    "service",

    "platform",

    "feature",

    "innovation",

    "patent",

    "technology",

]

# ==========================================================
# Analyst
# ==========================================================

ANALYST_KEYWORDS = [

    "buy rating",

    "sell rating",

    "hold rating",

    "price target",

    "analyst",

    "upgrade",

    "downgrade",

    "outperform",

    "underperform",

]

# ==========================================================
# Healthcare
# ==========================================================

FDA_KEYWORDS = [

    "fda",

    "clinical trial",

    "phase 1",

    "phase 2",

    "phase 3",

    "drug approval",

]

# ==========================================================
# Macro Economy
# ==========================================================

MACRO_KEYWORDS = [

    "inflation",

    "interest rates",

    "recession",

    "federal reserve",

    "rbi",

    "reserve bank",

    "gdp",

    "cpi",

    "ppi",

    "employment",

]

# ==========================================================
# High Impact Keywords
# ==========================================================

HIGH_IMPACT_KEYWORDS = [

    "bankruptcy",

    "default",

    "earnings",

    "acquisition",

    "merger",

    "buyback",

    "dividend",

    "guidance",

    "profit warning",

    "stock split",

    "ceo resigns",

    "fraud",

    "investigation",

    "lawsuit",

    "contract",

]

# ==========================================================
# Low Value / Noise
# ==========================================================

LOW_VALUE_KEYWORDS = [

    "top stocks",

    "best stocks",

    "watchlist",

    "market roundup",

    "daily recap",

    "trending stocks",

    "stocks to buy",

    "stocks to watch",

    "price prediction",

    "forecast 2030",

]

# ==========================================================
# Spam Keywords
# ==========================================================

SPAM_KEYWORDS = [

    "click here",

    "subscribe",

    "sponsored",

    "advertisement",

    "promo",

    "casino",

    "betting",

    "bonus",

    "free money",

]

# ==========================================================
# Positive Sentiment
# ==========================================================

POSITIVE_KEYWORDS = [

    "beats expectations",

    "growth",

    "record revenue",

    "record profit",

    "strong demand",

    "raised guidance",

    "expansion",

    "approval",

]

# ==========================================================
# Negative Sentiment
# ==========================================================

NEGATIVE_KEYWORDS = [

    "misses expectations",

    "decline",

    "loss",

    "lawsuit",

    "fraud",

    "bankruptcy",

    "downgrade",

    "investigation",

    "recall",

]

# ==========================================================
# Master Keyword Dictionary
# ==========================================================

KEYWORD_GROUPS = {

    "earnings": EARNINGS_KEYWORDS,

    "corporate": CORPORATE_ACTION_KEYWORDS,

    "dividend": DIVIDEND_KEYWORDS,

    "executive": EXECUTIVE_KEYWORDS,

    "regulatory": REGULATORY_KEYWORDS,

    "legal": LEGAL_KEYWORDS,

    "product": PRODUCT_KEYWORDS,

    "analyst": ANALYST_KEYWORDS,

    "healthcare": FDA_KEYWORDS,

    "macro": MACRO_KEYWORDS,

    "high_impact": HIGH_IMPACT_KEYWORDS,

    "noise": LOW_VALUE_KEYWORDS,

    "spam": SPAM_KEYWORDS,

    "positive": POSITIVE_KEYWORDS,

    "negative": NEGATIVE_KEYWORDS,

}

# ==========================================================
# Helper Functions
# ==========================================================

def get_all_keywords():

    keywords = set()

    for values in KEYWORD_GROUPS.values():

        keywords.update(values)

    return sorted(keywords)


def get_group(name: str):

    return KEYWORD_GROUPS.get(name.lower(), [])


def is_spam_keyword(keyword: str):

    return keyword.lower() in SPAM_KEYWORDS


def is_noise_keyword(keyword: str):

    return keyword.lower() in LOW_VALUE_KEYWORDS


def is_high_impact(keyword: str):

    return keyword.lower() in HIGH_IMPACT_KEYWORDS