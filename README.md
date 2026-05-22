# Pulse Lab

Pulse Lab is a static **BTCUSDT Weekly RSI** monitor designed for compact weekly momentum reading.

## What Pulse Lab monitors
- BTCUSDT only.
- Weekly RSI only (RSI 14 from weekly closes).
- W-12 to W0 weekly RSI view.
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
- Divergence Status compares 12W price movement and 12W RSI movement.
- It labels alignment, divergence, recovery divergence, consolidation improvement/cooling, or mixed relationship.

## Data sources
1. Binance weekly candles (`1w`, `limit=120`):
   - `https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120`
2. Binance BTCUSDT 24h ticker:
   - `https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT`
3. Alternative.me Fear & Greed:
   - `https://api.alternative.me/fng/`

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
