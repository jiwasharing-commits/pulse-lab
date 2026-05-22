const BTC_TICKER_URL = "https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT";
const BTC_WEEKLY_KLINE_URL = "https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120";
const FEAR_GREED_URL = "https://api.alternative.me/fng/?limit=1";
const RSI_PERIOD = 14;
const RSI_WINDOW = 13;
const RSI_LABELS = ["W-12", "W-11", "W-10", "W-9", "W-8", "W-7", "W-6", "W-5", "W-4", "W-3", "W-2", "W-1", "W0"];

const els = {
  statusText: document.getElementById("statusText"),
  refreshBtn: document.getElementById("refreshBtn"),
  btcPrice: document.getElementById("btcPrice"),
  btcPriceMeta: document.getElementById("btcPriceMeta"),
  btc24h: document.getElementById("btc24h"),
  rsiCurrent: document.getElementById("rsiCurrent"),
  rsiStatus: document.getElementById("rsiStatus"),
  rsi4w: document.getElementById("rsi4w"),
  rsi12w: document.getElementById("rsi12w"),
  direction: document.getElementById("direction"),
  momentumPhase: document.getElementById("momentumPhase"),
  momentumPhaseMeta: document.getElementById("momentumPhaseMeta"),
  chartState: document.getElementById("chartState"),
  interpretationBox: document.getElementById("interpretationBox"),
  fgValue: document.getElementById("fgValue"),
  fgText: document.getElementById("fgText"),
  fgTime: document.getElementById("fgTime"),
  rsiChart: document.getElementById("rsiChart"),
};

let chart;

const rsiZonePlugin = {
  id: "rsiZonePlugin",
  beforeDraw(chartObj) {
    const { ctx, chartArea, scales } = chartObj;
    if (!chartArea || !scales.y) return;
    const y = scales.y;
    const zones = [
      { from: 0, to: 30, color: "rgba(255, 95, 122, 0.08)" },
      { from: 30, to: 45, color: "rgba(255, 150, 120, 0.06)" },
      { from: 45, to: 55, color: "rgba(160, 170, 200, 0.06)" },
      { from: 55, to: 70, color: "rgba(111, 140, 255, 0.06)" },
      { from: 70, to: 100, color: "rgba(246, 196, 69, 0.07)" },
    ];
    ctx.save();
    zones.forEach((z) => {
      const yTop = y.getPixelForValue(z.to);
      const yBottom = y.getPixelForValue(z.from);
      ctx.fillStyle = z.color;
      ctx.fillRect(chartArea.left, yTop, chartArea.right - chartArea.left, yBottom - yTop);
    });
    ctx.restore();
  },
};

function formatUsd(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: value > 1000 ? 0 : 2 }).format(value);
}
const f1 = (n) => Number(n).toFixed(1);
const signed1 = (n) => `${n >= 0 ? "+" : ""}${Number(n).toFixed(1)}`;

function setLoadingState() {
  els.statusText.textContent = "Loading BTC ticker, weekly RSI, and market context...";
  [els.btcPrice, els.btc24h, els.rsiCurrent, els.rsi4w, els.rsi12w, els.direction, els.momentumPhase].forEach((e) => (e.textContent = "—"));
  els.btcPriceMeta.textContent = "Loading...";
  els.rsiStatus.textContent = "Loading...";
  els.momentumPhaseMeta.textContent = "Weekly phase status";
  els.chartState.textContent = "Loading weekly RSI chart...";
  els.interpretationBox.textContent = "Loading weekly direction interpretation...";
  els.fgValue.textContent = "—";
  els.fgText.textContent = "Loading...";
  els.fgTime.textContent = "—";
}

function classifyRsi(rsi) {
  if (rsi < 30) return "Deep Weak Zone";
  if (rsi < 45) return "Weak Zone";
  if (rsi < 55) return "Neutral Zone";
  if (rsi <= 70) return "Strong Zone";
  return "Heated Zone";
}

function getDirection(w0, w1, w4, w12) {
  if (w0 > w1 && w0 > w4 && w0 > w12) return "Strong Rising";
  if (w0 > w4 && w0 > w12) return "Rising";
  if (w0 > w12 && w0 < w4) return "Long-term Improving, Short-term Cooling";
  if (w0 < w12 && w0 > w4) return "Short-term Bounce, Long-term Weak";
  if (w0 < w4 && w0 < w12) return "Weakening";
  return "Mixed / Sideways";
}

function getMomentumPhase(w0, d4, d12, w4, w12) {
  if (w0 > 70) return "Heated Phase";
  if (w0 >= 30 && w0 < 45 && d12 > 0) return "Recovery Phase";
  if (w0 >= 45 && w0 < 55 && d12 > 0) return "Neutral Recovery";
  if (w0 >= 55 && w0 <= 70 && d4 > 0 && d12 > 0) return "Strength Phase";
  if (w0 < w4 && w0 > w12) return "Cooling Phase";
  if (d4 < 0 && d12 < 0) return "Weakening Phase";
  return "Mixed Phase";
}

function getInterpretation(direction, phase) {
  const map = {
    "Long-term Improving, Short-term Cooling": "Weekly RSI remains improved compared with 12 weeks ago, but short-term weekly momentum is cooling compared with the 4-week reference point.",
    "Strong Rising": "Weekly momentum is strengthening across short, medium, and longer comparison points.",
    Rising: "Weekly momentum is improving compared with the 4-week and 12-week reference points.",
    Weakening: "Weekly momentum is below both the 4-week and 12-week reference points.",
    "Short-term Bounce, Long-term Weak": "Weekly RSI is improving against the 4-week reference point, but remains below the 12-week reference point.",
    "Mixed / Sideways": "Weekly momentum is mixed and does not show a clear single direction.",
  };
  return `${map[direction]} Current momentum phase: ${phase}.`;
}

function calculateRsiSeries(closes, period = RSI_PERIOD) {
  if (closes.length <= period) return [];
  const rsis = [];
  let gainSum = 0;
  let lossSum = 0;
  for (let i = 1; i <= period; i += 1) {
    const d = closes[i] - closes[i - 1];
    gainSum += d > 0 ? d : 0;
    lossSum += d < 0 ? Math.abs(d) : 0;
  }
  let avgGain = gainSum / period;
  let avgLoss = lossSum / period;
  rsis.push(avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss));
  for (let i = period + 1; i < closes.length; i += 1) {
    const d = closes[i] - closes[i - 1];
    const g = d > 0 ? d : 0;
    const l = d < 0 ? Math.abs(d) : 0;
    avgGain = (avgGain * (period - 1) + g) / period;
    avgLoss = (avgLoss * (period - 1) + l) / period;
    rsis.push(avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss));
  }
  return rsis;
}

function renderChart(values) {
  if (chart) chart.destroy();
  const pointRadius = values.map((_, i) => (i === 0 || i === 8 ? 4 : i === 12 ? 5.5 : 2.5));
  chart = new Chart(els.rsiChart, {
    type: "line",
    data: { labels: RSI_LABELS, datasets: [{ label: "BTC Weekly RSI", data: values, borderColor: "#6f8cff", borderWidth: 2, pointBackgroundColor: "#cfd8ff", pointBorderColor: "#6f8cff", pointRadius, pointHoverRadius: pointRadius.map((v) => v + 1), tension: 0.3, fill: false }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: "#e8ecf8" } },
        tooltip: { callbacks: { title: (ctx) => ctx[0].label, label: (ctx) => `RSI: ${ctx.parsed.y.toFixed(1)}` } },
      },
      scales: {
        x: { ticks: { color: "#95a2c7" }, grid: { color: "rgba(35,48,83,0.5)" } },
        y: { min: 0, max: 100, ticks: { color: "#95a2c7", stepSize: 10 }, grid: { color: (ctx) => ([30, 50, 70].includes(ctx.tick.value) ? "rgba(246,196,69,0.8)" : "rgba(35,48,83,0.5)") } },
      },
    },
    plugins: [rsiZonePlugin],
  });
}

async function fetchJson(url) {
  const r = await fetch(url, { method: "GET" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

function updateTickerCard(t) {
  const price = Number(t.lastPrice);
  const ch = Number(t.priceChangePercent);
  if (!Number.isFinite(price) || !Number.isFinite(ch)) throw new Error("Ticker parse error");
  els.btcPrice.textContent = formatUsd(price);
  els.btcPriceMeta.textContent = "BTCUSDT 24h ticker";
  els.btc24h.textContent = `${ch >= 0 ? "+" : ""}${ch.toFixed(1)}%`;
  els.btc24h.className = `value ${ch >= 0 ? "pos" : "neg"}`;
}

function updateRsiSection(klines) {
  const closes = klines.map((k) => Number(k[4])).filter(Number.isFinite);
  const rsiSeries = calculateRsiSeries(closes, RSI_PERIOD);
  if (rsiSeries.length < RSI_WINDOW) throw new Error("Not enough weekly data");
  const v = rsiSeries.slice(-RSI_WINDOW);
  const w0 = v[12], w1 = v[11], w4 = v[8], w12 = v[0];
  const d4 = w0 - w4, d12 = w0 - w12;
  const direction = getDirection(w0, w1, w4, w12);
  const phase = getMomentumPhase(w0, d4, d12, w4, w12);

  els.rsiCurrent.textContent = f1(w0);
  els.rsiStatus.textContent = classifyRsi(w0);
  els.rsi4w.textContent = signed1(d4);
  els.rsi4w.className = `value ${d4 >= 0 ? "pos" : "neg"}`;
  els.rsi12w.textContent = signed1(d12);
  els.rsi12w.className = `value ${d12 >= 0 ? "pos" : "neg"}`;
  document.querySelector('#rsi4w + .meta').textContent = `W0: ${f1(w0)} | W-4: ${f1(w4)}`;
  document.querySelector('#rsi12w + .meta').textContent = `W0: ${f1(w0)} | W-12: ${f1(w12)}`;
  els.direction.textContent = direction;
  els.momentumPhase.textContent = phase;
  els.momentumPhaseMeta.textContent = "Weekly phase status";
  els.chartState.textContent = "Weekly data is used for long-range momentum monitoring.";
  els.interpretationBox.textContent = getInterpretation(direction, phase);

  renderChart(v.map((n) => Number(n.toFixed(1))));
}

function updateFearGreed(data) {
  const latest = data?.data?.[0];
  if (!latest) return;
  const ts = Number(latest.timestamp) * 1000;
  els.fgValue.textContent = latest.value;
  els.fgText.textContent = latest.value_classification;
  els.fgTime.textContent = Number.isFinite(ts) ? new Date(ts).toLocaleString() : "Timestamp unavailable";
}

async function loadDashboard() {
  setLoadingState();
  els.refreshBtn.disabled = true;
  const [tickerResult, klineResult, sentimentResult] = await Promise.allSettled([fetchJson(BTC_TICKER_URL), fetchJson(BTC_WEEKLY_KLINE_URL), fetchJson(FEAR_GREED_URL)]);
  let tickerOk = false, rsiOk = false;
  if (tickerResult.status === "fulfilled") {
    try { updateTickerCard(tickerResult.value); tickerOk = true; } catch { els.btcPriceMeta.textContent = "Ticker unavailable"; }
  } else els.btcPriceMeta.textContent = "Ticker unavailable";

  if (klineResult.status === "fulfilled") {
    try { updateRsiSection(klineResult.value); rsiOk = true; } catch {
      els.rsiStatus.textContent = "RSI unavailable";
      els.chartState.textContent = "Unable to load RSI chart data.";
      els.interpretationBox.textContent = "Weekly direction interpretation is unavailable until RSI data loads.";
      els.momentumPhase.textContent = "—";
    }
  } else {
    els.rsiStatus.textContent = "RSI unavailable";
    els.chartState.textContent = "Unable to load RSI chart data.";
    els.interpretationBox.textContent = "Weekly direction interpretation is unavailable until RSI data loads.";
  }

  if (sentimentResult.status === "fulfilled") updateFearGreed(sentimentResult.value);
  else { els.fgText.textContent = "Market context unavailable"; els.fgTime.textContent = "Try refresh"; }

  els.statusText.textContent = tickerOk && rsiOk
    ? `Monitoring BTC weekly momentum and direction. Last update: ${new Date().toLocaleTimeString()}`
    : (tickerOk || rsiOk) ? "Partial update loaded. One source is currently unavailable." : "Unable to load BTC weekly monitor sources right now.";
  els.refreshBtn.disabled = false;
}

els.refreshBtn.addEventListener("click", loadDashboard);
loadDashboard();
