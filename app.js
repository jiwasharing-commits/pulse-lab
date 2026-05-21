const WATCHLIST = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT"];
const OVERVIEW_SYMBOLS = ["BTCUSDT", "ETHUSDT", "SOLUSDT"];

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
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: value > 1000 ? 0 : 2 }).format(value);
}

function formatCompact(value) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(value);
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

async function fetchTickerData() {
  const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
  if (!response.ok) {
    throw new Error("Ticker endpoint unavailable");
  }
  return response.json();
}

async function fetchFearGreed() {
  const response = await fetch("https://api.alternative.me/fng/?limit=1");
  if (!response.ok) {
    throw new Error("Fear & Greed endpoint unavailable");
  }
  return response.json();
}

function setLoadingStates() {
  els.statusText.textContent = "Loading market data...";
  els.watchlistBody.innerHTML = '<tr><td colspan="5" class="state-row">Loading watchlist...</td></tr>';
}

function updateOverview(overviewRows) {
  const bySymbol = Object.fromEntries(overviewRows.map((row) => [row.symbol, row]));
  const btc = bySymbol.BTCUSDT;
  const eth = bySymbol.ETHUSDT;
  const sol = bySymbol.SOLUSDT;

  if (!btc || !eth || !sol) {
    return;
  }

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
    els.watchlistBody.innerHTML = '<tr><td colspan="5" class="state-row">No symbols available.</td></tr>';
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
    els.fgValue.textContent = "—";
    els.fgText.textContent = "Unavailable";
    els.fgTime.textContent = "No timestamp";
    return;
  }

  const timestamp = Number(latest.timestamp) * 1000;
  els.fgValue.textContent = latest.value;
  els.fgText.textContent = latest.value_classification;
  els.fgTime.textContent = Number.isFinite(timestamp)
    ? new Date(timestamp).toLocaleString()
    : "Timestamp unavailable";
}

async function loadDashboard() {
  setLoadingStates();

  try {
    const [tickerData, fearGreedData] = await Promise.all([fetchTickerData(), fetchFearGreed()]);

    const filteredRows = tickerData
      .filter((row) => WATCHLIST.includes(row.symbol))
      .map((row) => ({
        symbol: row.symbol,
        lastPrice: Number(row.lastPrice),
        changePct: Number(row.priceChangePercent),
        quoteVolume: Number(row.quoteVolume),
      }));

    const overviewRows = filteredRows.filter((row) => OVERVIEW_SYMBOLS.includes(row.symbol));

    updateOverview(overviewRows);
    updateWatchlist(filteredRows);
    updateFearGreed(fearGreedData);

    const updatedAt = new Date().toLocaleTimeString();
    els.statusText.textContent = `Monitoring live market trend and momentum. Last update: ${updatedAt}`;
  } catch (error) {
    els.statusText.textContent = "Unable to load one or more data sources right now.";
    els.watchlistBody.innerHTML = '<tr><td colspan="5" class="state-row">Error loading watchlist data. Try refreshing.</td></tr>';
    els.fgText.textContent = "Error loading sentiment";
  }
}

els.refreshBtn.addEventListener("click", loadDashboard);
loadDashboard();
