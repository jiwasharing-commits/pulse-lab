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
  chartState: document.getElementById("chartState"),
  interpretationBox: document.getElementById("interpretationBox"),
  fgValue: document.getElementById("fgValue"),
  fgText: document.getElementById("fgText"),
  fgTime: document.getElementById("fgTime"),
  rsiChart: document.getElementById("rsiChart"),
};

let chart;

function formatUsd(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: value > 1000 ? 0 : 2 }).format(value);
}

function formatSigned1(value) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}`;
}

function setLoadingState() {
  els.statusText.textContent = "Loading BTC ticker, weekly RSI, and market context...";
  els.btcPrice.textContent = "—";
  els.btcPriceMeta.textContent = "Loading...";
  els.btc24h.textContent = "—";
  els.rsiCurrent.textContent = "—";
  els.rsiStatus.textContent = "Loading...";
  els.rsi4w.textContent = "—";
  els.rsi12w.textContent = "—";
  els.direction.textContent = "—";
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
  if (w0 < w4 && w0 < w12) return "Weakening";
  return "Mixed";
}

function getDirectionInterpretation(direction) {
  if (direction === "Strong Rising") return "Weekly momentum is strengthening across short and longer comparison points.";
  if (direction === "Rising") return "Weekly momentum is improving compared with the 4-week and 12-week reference points.";
  if (direction === "Weakening") return "Weekly momentum is below the 4-week and 12-week reference points.";
  return "Weekly momentum is mixed and does not show a clear single direction.";
}

function calculateRsiSeries(closes, period = RSI_PERIOD) {
  if (closes.length <= period) return [];

  const rsis = [];
  let gainSum = 0;
  let lossSum = 0;

  for (let i = 1; i <= period; i += 1) {
    const delta = closes[i] - closes[i - 1];
    gainSum += delta > 0 ? delta : 0;
    lossSum += delta < 0 ? Math.abs(delta) : 0;
  }

  let avgGain = gainSum / period;
  let avgLoss = lossSum / period;

  const seedRsi = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
  rsis.push(seedRsi);

  for (let i = period + 1; i < closes.length; i += 1) {
    const delta = closes[i] - closes[i - 1];
    const gain = delta > 0 ? delta : 0;
    const loss = delta < 0 ? Math.abs(delta) : 0;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
    const rsi = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
    rsis.push(rsi);
  }

  return rsis;
}

function renderChart(values) {
  if (chart) chart.destroy();

  chart = new Chart(els.rsiChart, {
    type: "line",
    data: {
      labels: RSI_LABELS,
      datasets: [{
        label: "BTC Weekly RSI",
        data: values,
        borderColor: "#6f8cff",
        backgroundColor: "rgba(111,140,255,0.2)",
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3,
        fill: false,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: "#e8ecf8" } },
        tooltip: {
          callbacks: {
            title: (ctx) => ctx[0].label,
            label: (ctx) => `RSI: ${ctx.parsed.y.toFixed(1)}`,
          },
        },
      },
      scales: {
        x: { ticks: { color: "#95a2c7" }, grid: { color: "rgba(35,48,83,0.5)" } },
        y: {
          min: 0,
          max: 100,
          ticks: { color: "#95a2c7", stepSize: 10 },
          grid: {
            color: (ctx) => ([30, 50, 70].includes(ctx.tick.value) ? "rgba(246,196,69,0.8)" : "rgba(35,48,83,0.5)"),
          },
        },
      },
    },
  });
}

async function fetchJson(url) {
  const response = await fetch(url, { method: "GET" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function updateTickerCard(ticker) {
  const price = Number(ticker.lastPrice);
  const change = Number(ticker.priceChangePercent);
  if (!Number.isFinite(price) || !Number.isFinite(change)) throw new Error("Ticker parse error");

  els.btcPrice.textContent = formatUsd(price);
  els.btcPriceMeta.textContent = "BTCUSDT 24h ticker";
  els.btc24h.textContent = `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
  els.btc24h.className = `value ${change >= 0 ? "pos" : "neg"}`;
}

function updateRsiSection(klines) {
  const closes = klines.map((k) => Number(k[4])).filter((v) => Number.isFinite(v));
  const rsiSeries = calculateRsiSeries(closes, RSI_PERIOD);
  if (rsiSeries.length < RSI_WINDOW) throw new Error("Not enough weekly data for RSI window");

  const latest13 = rsiSeries.slice(-RSI_WINDOW);
  const w0 = latest13[12];
  const w1 = latest13[11];
  const w4 = latest13[8];
  const w12 = latest13[0];

  const delta4w = w0 - w4;
  const delta12w = w0 - w12;
  const direction = getDirection(w0, w1, w4, w12);

  els.rsiCurrent.textContent = w0.toFixed(1);
  els.rsiStatus.textContent = classifyRsi(w0);
  els.rsi4w.textContent = formatSigned1(delta4w);
  els.rsi4w.className = `value ${delta4w >= 0 ? "pos" : "neg"}`;
  els.rsi12w.textContent = formatSigned1(delta12w);
  els.rsi12w.className = `value ${delta12w >= 0 ? "pos" : "neg"}`;
  els.direction.textContent = direction;
  els.chartState.textContent = "Weekly data is used for long-range momentum monitoring.";
  els.interpretationBox.textContent = getDirectionInterpretation(direction);

  renderChart(latest13.map((v) => Number(v.toFixed(1))));
}

function updateFearGreed(data) {
  const latest = data?.data?.[0];
  if (!latest) {
    els.fgValue.textContent = "—";
    els.fgText.textContent = "Unavailable";
    els.fgTime.textContent = "No timestamp";
    return;
  }

  const timestamp = Number(latest.timestamp) * 1000;
  els.fgValue.textContent = latest.value;
  els.fgText.textContent = latest.value_classification;
  els.fgTime.textContent = Number.isFinite(timestamp) ? new Date(timestamp).toLocaleString() : "Timestamp unavailable";
}

async function loadDashboard() {
  setLoadingState();
  els.refreshBtn.disabled = true;

  const [tickerResult, klineResult, sentimentResult] = await Promise.allSettled([
    fetchJson(BTC_TICKER_URL),
    fetchJson(BTC_WEEKLY_KLINE_URL),
    fetchJson(FEAR_GREED_URL),
  ]);

  let tickerOk = false;
  let rsiOk = false;

  if (tickerResult.status === "fulfilled") {
    try {
      updateTickerCard(tickerResult.value);
      tickerOk = true;
    } catch {
      els.btcPriceMeta.textContent = "Ticker unavailable";
    }
  } else {
    els.btcPriceMeta.textContent = "Ticker unavailable";
  }

  if (klineResult.status === "fulfilled") {
    try {
      updateRsiSection(klineResult.value);
      rsiOk = true;
    } catch {
      els.rsiStatus.textContent = "RSI unavailable";
      els.chartState.textContent = "Unable to load RSI chart data.";
      els.interpretationBox.textContent = "Weekly direction interpretation is unavailable until RSI data loads.";
    }
  } else {
    els.rsiStatus.textContent = "RSI unavailable";
    els.chartState.textContent = "Unable to load RSI chart data.";
    els.interpretationBox.textContent = "Weekly direction interpretation is unavailable until RSI data loads.";
  }

  if (sentimentResult.status === "fulfilled") {
    updateFearGreed(sentimentResult.value);
  } else {
    els.fgText.textContent = "Market context unavailable";
    els.fgTime.textContent = "Try refresh";
  }

  if (tickerOk && rsiOk) {
    els.statusText.textContent = `Monitoring BTC weekly momentum and direction. Last update: ${new Date().toLocaleTimeString()}`;
  } else if (tickerOk || rsiOk) {
    els.statusText.textContent = "Partial update loaded. One source is currently unavailable.";
  } else {
    els.statusText.textContent = "Unable to load BTC weekly monitor sources right now.";
  }

  els.refreshBtn.disabled = false;
}

els.refreshBtn.addEventListener("click", loadDashboard);
loadDashboard();
