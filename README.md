# Pulse Lab

Pulse Lab is a static **BTCUSDT Weekly RSI** monitor focused on reading weekly momentum direction from a W-12 to W0 view.

## What Pulse Lab monitors
- BTCUSDT only.
- Weekly RSI only (RSI 14 from weekly closes).
- Weekly momentum reading with Direction and Momentum Phase.
- Fear & Greed as supporting market context.

## Data sources
1. Binance weekly candles (`1w`, `limit=120`):
   - `https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120`
2. Binance BTCUSDT 24h ticker:
   - `https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT`
3. Alternative.me Fear & Greed:
   - `https://api.alternative.me/fng/`

## Weekly RSI method
- RSI 14 is calculated client-side in JavaScript from weekly close prices.
- The app stores the full RSI series, then extracts the latest 13 points:
  `W-12` ... `W0`.
- Definitions:
  - `4W RSI Change = W0 - W-4`
  - `12W RSI Change = W0 - W-12`

## Momentum reading logic
- **Direction** compares `W0` with `W-1`, `W-4`, and `W-12`.
- **Momentum Phase** classifies weekly momentum condition from RSI level and 4W/12W changes.

## Project structure
- `index.html`
- `style.css`
- `app.js`
- `README.md`

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

## Technical constraints
- Static frontend only.
- No API key.
- No backend.
- No database.
- No paid APIs.
- No build tools required.
