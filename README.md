# Pulse Lab

Pulse Lab is a static **BTCUSDT Weekly RSI** monitor designed for compact weekly momentum reading.

## What Pulse Lab monitors
- BTCUSDT only.
- Weekly RSI only (RSI 14 from weekly closes).
- W-24 to W0 weekly RSI view (25 weekly points).
- Direction and Momentum Phase from W0, W-1, W-4, and W-12.
- BTC Weekly Price vs RSI dual chart as the main chart section.
- Fear & Greed as supporting market context.

## Main chart section
- The standalone RSI-only chart was removed to avoid duplication.
- The main chart section is **BTC Weekly Price vs RSI**.
- Top chart: BTC weekly close price.
- Bottom chart: BTC weekly RSI.
- Both use aligned `W-12` to `W0` labels.
- Price and RSI are shown separately because their scales are different.

## Divergence status
- Divergence Status compares 12W price movement and 12W RSI movement using automatic thresholds, with additional 24W context.
- It classifies: Price and RSI Aligned, Bearish Divergence, Bullish Divergence, consolidation improving/cooling, or Mixed Relationship.
- A compact 4W context line is added to show short-window price and RSI behavior.

## Data sources
1. Binance weekly candles (`1w`, `limit=120`):
   - `https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120`
2. Binance BTCUSDT 24h ticker:
   - `https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT`
3. Alternative.me Fear & Greed:
   - `https://api.alternative.me/fng/`


## Potential Bias Scanner
- Scans all weekly ranges inside `W-24` to `W0` using existing weekly price and RSI data.
- Uses filtered rules to find potential upward/downward bias from price movement vs RSI movement.
- Keeps only the top 3 strongest ranges by score after filtering noisy ranges.
- Includes 24W Price Change, 24W RSI Change, and 24W RSI Slope while keeping 4W and 12W context.

## Technical constraints
- Static frontend only.
- All calculations run client-side JavaScript.
- No API key.
- No backend.
- No database.
- No paid APIs.
- No build tools required.
- GitHub Pages compatible.

## Run locally
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## GitHub Pages deployment
1. Push to GitHub.
2. Go to **Settings → Pages**.
3. Select **Deploy from a branch** and choose `/ (root)`.
4. Open the published URL.
