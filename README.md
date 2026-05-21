# Pulse Lab

Pulse Lab is a static Bitcoin monitoring dashboard focused on **BTCUSDT Weekly RSI**.

## App Purpose

- Monitor BTC trend, momentum, and weekly direction in a single-page dashboard.
- Visualize the latest 13 weekly RSI points (W-12 to W0).
- Keep the app lightweight and deployable on GitHub Pages.

## Data Sources

1. Binance weekly klines (BTCUSDT, 1w, limit 120):
   - `https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120`
2. Binance BTC 24h ticker:
   - `https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT`
3. Alternative.me Fear & Greed:
   - `https://api.alternative.me/fng/?limit=1`

## RSI Method

- RSI 14 is calculated manually in client-side JavaScript from weekly close prices.
- The full RSI series is computed from fetched klines.
- The chart displays the latest 13 weekly RSI values:
  - `W-12, W-11, W-10, W-9, W-8, W-7, W-6, W-5, W-4, W-3, W-2, W-1, W0`
- `W0` means the latest available weekly RSI.

## Project Structure

- `index.html`
- `style.css`
- `app.js`
- `README.md`

## Local Usage

Run from a local static server:

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000`

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**.
4. Choose branch (for example `main`) and folder `/ (root)`.
5. Save and open the published URL.

The app runs directly as static files with no build tools.

## Constraints

- No API keys.
- No backend or server logic.
- No database.
- No paid APIs.
