# Pulse Lab

Pulse Lab is a static **Bitcoin Weekly RSI Monitor** focused on long-range BTCUSDT momentum and weekly direction.

## What this app monitors

- BTCUSDT weekly momentum using RSI 14.
- Weekly RSI trend points from `W-12` to `W0` displayed as a line chart.
- Supporting market context from the Fear & Greed Index.

## Data sources (public, no key)

1. Binance BTCUSDT weekly candles (`1w`, `limit=120`):
   - `https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120`
2. Binance BTCUSDT 24h ticker:
   - `https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT`
3. Alternative.me Fear & Greed:
   - `https://api.alternative.me/fng/`

## RSI method and weekly points

- RSI 14 is calculated client-side in JavaScript from weekly close prices.
- The full RSI series is generated from the kline close sequence.
- The dashboard extracts the latest 13 RSI points in order:
  - `W-12, W-11, W-10, W-9, W-8, W-7, W-6, W-5, W-4, W-3, W-2, W-1, W0`
- Meanings:
  - `W0` = latest weekly RSI
  - `W-4` = RSI 4 weeks before W0
  - `W-12` = RSI 12 weeks before W0

## Dashboard calculations

- **Current Weekly RSI** = `W0`
- **4W RSI Change** = `W0 - W-4`
- **12W RSI Change** = `W0 - W-12`
- **Direction** compares `W0` with `W-1`, `W-4`, and `W-12`:
  - Strong Rising / Rising / Weakening / Mixed

## Fear & Greed usage

Fear & Greed appears below the RSI chart as supporting market context. It is not the primary monitor metric.

## Project structure

- `index.html`
- `style.css`
- `app.js`
- `README.md`

## Run locally

Use any simple static server. Example:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Select your branch (for example `main`) and `/ (root)`.
5. Save and open the published URL.

The app is fully static and GitHub Pages compatible.

## Constraints

- No API key
- No backend
- No database
- No paid API
- No build tools required
