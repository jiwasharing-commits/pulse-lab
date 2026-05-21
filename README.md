# Pulse Lab

Pulse Lab is a lightweight, static web dashboard for monitoring crypto market trend, flow, momentum, and signal status using free public APIs.

## Purpose

- Monitor live market movement for selected pairs without a backend.
- Show quick overview metrics for BTC, ETH, and SOL.
- Display simple signal status (Bullish / Neutral / Bearish) based on 24h change and relative volume.
- Surface market sentiment with the Fear & Greed Index.

## APIs Used

1. **Binance public API**
   - `https://api.binance.com/api/v3/ticker/24hr`
   - Fallback: `https://data-api.binance.vision/api/v3/ticker/24hr`
   - Used for price, 24h change, and quote volume values.

2. **Alternative.me Fear & Greed API**
   - `https://api.alternative.me/fng/?limit=1`
   - Used for sentiment index value, classification, and timestamp.

No paid APIs, backend services, databases, or secret keys are used.

## Project Structure

- `index.html`
- `style.css`
- `app.js`
- `README.md`

## Open Locally

Because this app uses browser `fetch()` to call HTTPS APIs, open it from a local static server:

### Option A: Python

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000`

### Option B: VS Code Live Server

- Open the folder in VS Code.
- Start **Live Server**.
- Open the served URL in your browser.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or your default branch), folder `/ (root)`
4. Save and wait for deployment.
5. Open the published Pages URL.

The app runs directly as static files from GitHub Pages with no build tools required.

## Notes

- Refresh data with the **Refresh** button.
- The dashboard includes loading, empty, and error handling states for overview, watchlist, and sentiment sections.
- Wording is neutral and focused on monitoring and signal status.
