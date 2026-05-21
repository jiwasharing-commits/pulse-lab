const WATCHLIST = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT"];
const OVERVIEW_SYMBOLS = ["BTCUSDT", "ETHUSDT", "SOLUSDT"];
const BINANCE_TICKER_ENDPOINTS = [
  "https://api.binance.com/api/v3/ticker/24hr",
  "https://data-api.binance.vision/api/v3/ticker/24hr",
];

const els = {
  statusText: document.getElementById("statusText"),
  refreshBtn: document.getElementById("refreshBtn"),
  watchlistBody: document.getElementById("watchlistBody"),
  btcPrice: document.getElementById("btcPrice"),
  ethPrice: document.getElementById("ethPrice"),
  solPrice: document.getElementById("solPrice"),
  btcMeta: document.getElementById("btcMeta"),
  ethMeta: document.getElementById("ethMeta"),
  solMeta: document.getElementById("solMeta"),
  marketChange: document.getElementById("marketChange"),
  marketVolume: document.getElementById("marketVolume"),
  fgValue: document.getElementById("fgValue"),
  fgText: document.getElementById("fgText"),
  fgTime: document.getElementById("fgTime"),
};

function formatUsd(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value > 1000 ? 0 : 2,
  }).format(value);
}

function formatCompact(value) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function getSignal(changePct, quoteVolume, averageVolume) {
  const volumeStrong = quoteVolume > averageVolume * 1.05;

  if (changePct > 3 && volumeStrong) {
    return { label: "Bullish", className: "bullish" };
  }
  if (changePct < -3) {
    return { label: "Bearish", className: "bearish" };
  }
  return { label: "Neutral", className: "neutral" };
}

async function fetchJsonWithFallback(urls) {
  let lastError;

  for (const url of urls) {
    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("All endpoints failed");
}

async function fetchTickerData() {
  return fetchJsonWithFallback(BINANCE_TICKER_ENDPOINTS);
}

async function fetchFearGreed() {
  const response = await fetch("https://api.alternative.me/fng/?limit=1", { method: "GET" });
  if (!response.ok) {
    throw new Error(`Fear & Greed HTTP ${response.status}`);
  }
  return response.json();
}

function setOverviewState(message) {
  els.btcPrice.textContent = "—";
  els.ethPrice.textContent = "—";
  els.solPrice.textContent = "—";
  els.marketChange.textContent = "—";
  els.marketVolume.textContent = "—";
  els.marketChange.className = "value";
  els.btcMeta.textContent = message;
  els.ethMeta.textContent = message;
  els.solMeta.textContent = message;
}

function setWatchlistState(message) {
  els.watchlistBody.innerHTML = `<tr><td colspan="5" class="state-row">${message}</td></tr>`;
}

function setSentimentState(value, text, time) {
  els.fgValue.textContent = value;
  els.fgText.textContent = text;
  els.fgTime.textContent = time;
}

function setLoadingStates() {
  els.statusText.textContent = "Loading market data...";
  setOverviewState("Loading...");
  setWatchlistState("Loading watchlist...");
  setSentimentState("—", "Loading sentiment...", "—");
}

function updateOverview(overviewRows) {
  if (overviewRows.length !== OVERVIEW_SYMBOLS.length) {
    setOverviewState("Overview unavailable");
    return;
  }

  const bySymbol = Object.fromEntries(overviewRows.map((row) => [row.symbol, row]));
  const btc = bySymbol.BTCUSDT;
  const eth = bySymbol.ETHUSDT;
  const sol = bySymbol.SOLUSDT;

  const setCoin = (coin, priceEl, metaEl) => {
    const changeClass = coin.changePct >= 0 ? "pos" : "neg";
    priceEl.textContent = formatUsd(coin.lastPrice);
    metaEl.innerHTML = `<span class="${changeClass}">${coin.changePct.toFixed(2)}%</span> in 24h`;
  };

  setCoin(btc, els.btcPrice, els.btcMeta);
  setCoin(eth, els.ethPrice, els.ethMeta);
  setCoin(sol, els.solPrice, els.solMeta);

  const averageChange = (btc.changePct + eth.changePct + sol.changePct) / 3;
  const combinedVolume = btc.quoteVolume + eth.quoteVolume + sol.quoteVolume;

  els.marketChange.textContent = `${averageChange >= 0 ? "+" : ""}${averageChange.toFixed(2)}%`;
  els.marketChange.className = `value ${averageChange >= 0 ? "pos" : "neg"}`;
  els.marketVolume.textContent = formatCompact(combinedVolume);
}

function updateWatchlist(rows) {
  if (!rows.length) {
    setWatchlistState("No symbols available.");
    return;
  }

  const avgVolume = rows.reduce((sum, row) => sum + row.quoteVolume, 0) / rows.length;

  els.watchlistBody.innerHTML = rows
    .map((row) => {
      const signal = getSignal(row.changePct, row.quoteVolume, avgVolume);
      const changeClass = row.changePct >= 0 ? "pos" : "neg";

      return `
        <tr>
          <td>${row.symbol}</td>
          <td>${formatUsd(row.lastPrice)}</td>
          <td class="${changeClass}">${row.changePct.toFixed(2)}%</td>
          <td>${formatCompact(row.quoteVolume)}</td>
          <td><span class="badge ${signal.className}">${signal.label}</span></td>
        </tr>
      `;
    })
    .join("");
}

function updateFearGreed(payload) {
  const latest = payload?.data?.[0];
  if (!latest) {
    setSentimentState("—", "Sentiment unavailable", "No timestamp");
    return;
  }

  const timestamp = Number(latest.timestamp) * 1000;
  setSentimentState(
    latest.value,
    latest.value_classification,
    Number.isFinite(timestamp) ? new Date(timestamp).toLocaleString() : "Timestamp unavailable"
  );
}

function normalizeTickerRows(tickerData) {
  if (!Array.isArray(tickerData)) {
    return [];
  }

  return tickerData
    .filter((row) => WATCHLIST.includes(row.symbol))
    .map((row) => ({
      symbol: row.symbol,
      lastPrice: Number(row.lastPrice),
      changePct: Number(row.priceChangePercent),
      quoteVolume: Number(row.quoteVolume),
    }))
    .filter((row) => Number.isFinite(row.lastPrice) && Number.isFinite(row.changePct) && Number.isFinite(row.quoteVolume));
}

async function loadDashboard() {
  setLoadingStates();
  els.refreshBtn.disabled = true;

  const results = await Promise.allSettled([fetchTickerData(), fetchFearGreed()]);
  const [tickerResult, sentimentResult] = results;

  let tickerOk = false;
  let sentimentOk = false;

  if (tickerResult.status === "fulfilled") {
    const filteredRows = normalizeTickerRows(tickerResult.value);
    const overviewRows = filteredRows.filter((row) => OVERVIEW_SYMBOLS.includes(row.symbol));

    updateOverview(overviewRows);
    updateWatchlist(filteredRows);
    tickerOk = true;
  } else {
    setOverviewState("Unable to load data");
    setWatchlistState("Error loading watchlist data. Try refresh.");
  }

  if (sentimentResult.status === "fulfilled") {
    updateFearGreed(sentimentResult.value);
    sentimentOk = true;
  } else {
    setSentimentState("—", "Error loading sentiment", "Try refresh");
  }

  if (tickerOk && sentimentOk) {
    els.statusText.textContent = `Monitoring live market trend and momentum. Last update: ${new Date().toLocaleTimeString()}`;
  } else if (tickerOk || sentimentOk) {
    els.statusText.textContent = "Partial update loaded. One source is currently unavailable.";
  } else {
    els.statusText.textContent = "Unable to load market sources right now.";
  }

  els.refreshBtn.disabled = false;
}

els.refreshBtn.addEventListener("click", loadDashboard);
loadDashboard();
