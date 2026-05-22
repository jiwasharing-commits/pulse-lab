# Pulse Lab

Pulse Lab is a static **BTCUSDT Weekly RSI** monitor designed for compact weekly momentum reading.

## What Pulse Lab monitors
- BTCUSDT only.
- Weekly RSI only (RSI 14 from weekly closes).
- W-12 to W0 weekly RSI view.
- Direction and Momentum Phase from W0, W-1, W-4, and W-12.
- Fear & Greed as supporting market context.

## Data sources
1. Binance weekly candles (`1w`, `limit=120`):
   - `https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120`
2. Binance BTCUSDT 24h ticker:
   - `https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT`
3. Alternative.me Fear & Greed:
   - `https://api.alternative.me/fng/`

## Weekly analytics
- Full RSI series is calculated client-side, then latest 13 points (`W-12 ... W0`) are used.
- `4W RSI Change = W0 - W-4`
- `12W RSI Change = W0 - W-12`
- `RSI Slope = (W0 - W-12) / 12` (average weekly change)
- Momentum Consistency counts rising weeks across 12 transitions in the W-12..W0 window.
- Distance to RSI 50 tracks below/near/above midline status.
- Weekly RSI Regime gives zone-specific classification for W0.

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
