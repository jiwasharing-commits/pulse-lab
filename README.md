# Pulse Lab

Pulse Lab is a static **BTCUSDT Weekly RSI** monitor designed for compact weekly momentum reading.

## What Pulse Lab monitors
- BTCUSDT only.
- Weekly RSI only (RSI 14 from weekly closes).
- W-48 to W0 weekly RSI view (49 weekly points).
- Direction and Momentum Phase from W0, W-1, W-4, and W-12.
- BTC Weekly Price vs RSI dual chart as the main chart section.
- Fear & Greed as supporting market context.

## Main chart section
- Top chart is BTC Weekly Candlestick (Open/High/Low/Close).
- Bottom chart is BTC Weekly RSI.

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
- Scans all weekly ranges inside `W-48` to `W0` using existing weekly price and RSI data.
- Uses filtered rules to find potential upward/downward bias from price movement vs RSI movement.
- Keeps only the top 3 strongest ranges by score after filtering noisy ranges.
- Includes 24W and 48W Price/RSI Change and RSI Slope while keeping 4W and 12W context.

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


## Price Chart Rendering Note

- BTC weekly price uses a dedicated **candlestick chart** rendered with **Lightweight Charts** (CDN) so OHLC candles render reliably in static GitHub Pages deployments.
- OHLC mapping uses Binance weekly kline indices: `open=kline[1]`, `high=kline[2]`, `low=kline[3]`, `close=kline[4]` and each value is parsed to numeric format before rendering.
- RSI remains separate in the lower chart and is still calculated from weekly close prices only.


## Weekly Fair Value Gap (FVG)

- Pulse Lab scans weekly BTCUSDT candles for 3-candle imbalance zones (FVG).
- Bullish FVG: current candle low is above the high from two candles back.
- Bearish FVG: current candle high is below the low from two candles back.
- Only active zones (Unfilled or Partially Filled) are shown by default.
- This feature is for monitoring weekly imbalance zones, not financial advice.


## Lower Timeframe Detail (Optional)

- Weekly view remains the main analysis view.
- Lower Timeframe Detail is optional and collapsed by default.
- You can inspect selected ranges with BTCUSDT 4H and 1H candlestick charts.
- Date range requests use Binance `startTime` and `endTime` parameters.
- No API key, backend, database, or paid API is required.


## Compact Analysis-First Layout

- Main weekly chart remains the primary analysis view.
- Fear & Greed is shown as a compact quick-context chip instead of a large panel.
- Lower Timeframe Detail is collapsed by default.
- Active Weekly FVG Zones and Potential Bias Scanner are collapsible detail panels.


## Full-Width 3-Column Layout

- Desktop uses a full-width 3-column layout: Left Quick Panel, Main Chart Area, Right Quick Panel.
- Left panel contains RSI and momentum summaries plus compact Fear & Greed context.
- Main area contains summary cards, weekly chart, and collapsible lower timeframe detail.
- Right panel contains compact FVG, divergence, and potential bias summaries with collapsible detail lists.
- Mobile layout automatically stacks into one column.


## Lower Timeframe Presets

- Default lower timeframe view tracks one weekly candle range.
- 1W Detail: 4H shows latest 42 candles, 1H shows latest 168 candles.
- 2W Detail: 4H shows latest 84 candles, 1H shows latest 336 candles.
- Custom Date allows selected-range inspection with Binance `startTime` and `endTime`.


## 1H Structure Scanner

- Added 1H CHoCH/BOS scanner for lower-timeframe timing detail.
- Uses confirmed swing highs/lows with 2-left / 2-right candles.
- 1H structure output is shown near the 1H chart and inside Lower TF Reaction.
- Last Updated is loaded from `version.json` (app/code metadata), while Data Refreshed is dynamic API refresh time.
- This tool is for monitoring context and does not provide financial advice.


## Lower Timeframe Mode Consistency

- Lower Timeframe Detail supports 1W, 2W, and Custom Date with one shared analysis stack.
- All modes run the same chart/scanner flow (4H/1H charts, 4H FVG, 4H structure, 1H sweep, 1H structure, and Lower TF Reaction).
- Modes differ only by candle range (1W: 42/168, 2W: 84/336, Custom Date: selected range).
- Active 4H FVG zones are rendered as filled colored overlays across all modes, with overlays reset and redrawn on mode changes.
- Lower timeframe summaries are aligned beside their related charts for compact review.

- Whenever modifying Pulse Lab, update both `version.json` (`lastUpdated`) and `APP_LAST_UPDATED` in `app.js` (fallback) to the current update date/time.

- Lower timeframe chart overlay draws a maximum 3 active 4H FVG zones for cleaner readability.
- Thin 4H FVG overlays use a minimum visual height so zones remain visible in dense lower-timeframe ranges.
