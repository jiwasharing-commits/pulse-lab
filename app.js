const BTC_TICKER_URL = "https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT";
const BTC_WEEKLY_KLINE_URL = "https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120";
const FEAR_GREED_URL = "https://api.alternative.me/fng/?limit=1";
const RSI_PERIOD = 14;
const RSI_WINDOW = 49;
const MAX_LOOKBACK = 48;
const els = {
  statusText: document.getElementById("statusText"), refreshBtn: document.getElementById("refreshBtn"),
  btcPrice: document.getElementById("btcPrice"), btc24hInline: document.getElementById("btc24hInline"), btcPriceMeta: document.getElementById("btcPriceMeta"),
  rsiCurrent: document.getElementById("rsiCurrent"), rsiStatus: document.getElementById("rsiStatus"), rsiRegime: document.getElementById("rsiRegime"),
  rsiChangeLines: document.getElementById("rsiChangeLines"), rsiRefs: document.getElementById("rsiRefs"), rsiSlope: document.getElementById("rsiSlope"),
  direction: document.getElementById("direction"), momentumPhase: document.getElementById("momentumPhase"), analyticsStrip: document.getElementById("analyticsStrip"),
  priceMetrics: document.getElementById("priceMetrics"), divergenceStatus: document.getElementById("divergenceStatus"), divergenceText: document.getElementById("divergenceText"),
  fgValue: document.getElementById("fgValue"), fgText: document.getElementById("fgText"), fgTime: document.getElementById("fgTime"), biasScannerList: document.getElementById("biasScannerList"),
  priceChart: document.getElementById("priceChart"), priceChartError: document.getElementById("priceChartError"), rsiChart: document.getElementById("rsiChart"), rsiChartError: document.getElementById("rsiChartError"),
};
let priceChart, candleSeries, rsiChart, rsiLineSeries;
let syncingRange = false;
let resizeHandlerBound = false;


function toYmd(ms){ return new Date(ms).toISOString().slice(0,10); }


function toggleRsiChartError(msg=""){
  if(!els.rsiChartError) return;
  if(msg){ els.rsiChartError.textContent=msg; els.rsiChartError.hidden=false; }
  else { els.rsiChartError.hidden=true; }
}

function createBaseChart(container, height){
  return LightweightCharts.createChart(container, {
    width: Math.max(container.clientWidth || 0, 320),
    height,
    layout:{ background:{ type:"solid", color:"transparent" }, textColor:'#cbd5e1' },
    grid:{ vertLines:{color:'rgba(148, 163, 184, 0.12)'}, horzLines:{color:'rgba(148, 163, 184, 0.12)'} },
    rightPriceScale:{ borderColor:'rgba(148, 163, 184, 0.2)' },
    timeScale:{ borderColor:'rgba(148, 163, 184, 0.2)', timeVisible:true }
  });
}

function createCandleSeries(chart){
  if (typeof chart.addCandlestickSeries !== "function") {
    throw new Error("addCandlestickSeries is unavailable on current Lightweight Charts build");
  }
  return chart.addCandlestickSeries({
    upColor: "#22c55e",
    downColor: "#ef4444",
    borderUpColor: "#22c55e",
    borderDownColor: "#ef4444",
    wickUpColor: "#22c55e",
    wickDownColor: "#ef4444"
  });
}

function resetCharts(){
  if (priceChart) { priceChart.remove(); priceChart = null; candleSeries = null; }
  if (rsiChart) { rsiChart.remove(); rsiChart = null; rsiLineSeries = null; }
  if (els.priceChart) els.priceChart.innerHTML = "";
  if (els.rsiChart) els.rsiChart.innerHTML = "";
}
function togglePriceChartError(msg=""){
  if(!els.priceChartError) return;
  if(msg){ els.priceChartError.textContent=msg; els.priceChartError.hidden=false; }
  else { els.priceChartError.hidden=true; }
}
function syncVisibleRange(){
  if(!priceChart || !rsiChart) return;
  priceChart.timeScale().subscribeVisibleTimeRangeChange((range)=>{
    if(syncingRange || !range || !rsiChart) return;
    syncingRange = true;
    rsiChart.timeScale().setVisibleRange(range);
    syncingRange = false;
  });
  rsiChart.timeScale().subscribeVisibleTimeRangeChange((range)=>{
    if(syncingRange || !range || !priceChart) return;
    syncingRange = true;
    priceChart.timeScale().setVisibleRange(range);
    syncingRange = false;
  });
}

function renderDualCharts(ohlc, rsiValues){
  if (typeof LightweightCharts === "undefined") throw new Error("LightweightCharts not loaded");
  if(!els.priceChart || !els.rsiChart) throw new Error("chart container not found");
  if (!ohlc.length || !rsiValues.length) throw new Error("empty chart data");

  const candles = ohlc.map((c)=>({ time: toYmd(c.openTime), open:c.open, high:c.high, low:c.low, close:c.close }));
  const validCandles = candles.filter((c)=>c.time && Number.isFinite(c.open) && Number.isFinite(c.high) && Number.isFinite(c.low) && Number.isFinite(c.close));
  const rsiPoints = ohlc.map((c, i)=>({ time: toYmd(c.openTime), value: rsiValues[i] }));
  const validRsi = rsiPoints.filter((p)=>p.time && Number.isFinite(p.value));

  if (!validCandles.length) throw new Error("No valid OHLC candle data.");
  if (!validRsi.length) throw new Error("No valid RSI chart data.");

  resetCharts();
  priceChart = createBaseChart(els.priceChart, 300);
  rsiChart = createBaseChart(els.rsiChart, 240);

  candleSeries = createCandleSeries(priceChart);
  candleSeries.setData(validCandles);

  rsiLineSeries = rsiChart.addLineSeries({ color:'#6f8cff', lineWidth:2 });
  rsiLineSeries.setData(validRsi);
  rsiLineSeries.createPriceLine({ price:30, color:'rgba(239,68,68,.65)', lineWidth:1, lineStyle:2, axisLabelVisible:true, title:'30' });
  rsiLineSeries.createPriceLine({ price:50, color:'rgba(148,163,184,.65)', lineWidth:1, lineStyle:2, axisLabelVisible:true, title:'50' });
  rsiLineSeries.createPriceLine({ price:70, color:'rgba(34,197,94,.65)', lineWidth:1, lineStyle:2, axisLabelVisible:true, title:'70' });
  rsiChart.priceScale('right').applyOptions({ autoScale: false, scaleMargins: { top: 0.05, bottom: 0.05 } });
  rsiChart.timeScale().applyOptions({ visible: true });

  priceChart.timeScale().fitContent();
  const range = priceChart.timeScale().getVisibleRange();
  if(range) rsiChart.timeScale().setVisibleRange(range);
  syncVisibleRange();

  if(!resizeHandlerBound){
    window.addEventListener("resize", ()=>{
      if(priceChart && els.priceChart) priceChart.applyOptions({ width: Math.max(els.priceChart.clientWidth || 0, 320) });
      if(rsiChart && els.rsiChart) rsiChart.applyOptions({ width: Math.max(els.rsiChart.clientWidth || 0, 320) });
    });
    resizeHandlerBound = true;
  }
}


async function fetchJson(url){ const r=await fetch(url,{method:"GET"}); if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }
function setLoading(){ els.statusText.textContent="Loading BTC ticker, weekly RSI, and market context..."; els.btcPrice.textContent="—"; els.btc24hInline.textContent="24h: —"; els.btc24hInline.className="meta"; els.btcPriceMeta.textContent="Loading..."; els.rsiCurrent.textContent="—"; els.rsiStatus.textContent="Loading..."; els.rsiRegime.textContent="Regime: —"; els.rsiChangeLines.textContent="4W: — · 12W: — · 24W: — · 48W: —"; els.rsiRefs.textContent="W0: — | W-4: — | W-12: — | W-24: — | W-48: —"; els.rsiSlope.textContent="RSI Slope 48W: — / week"; els.direction.textContent="—"; els.momentumPhase.textContent="—"; els.analyticsStrip.textContent="RSI Slope 12W: — · RSI Slope 24W: — · RSI Slope 48W: — · Consistency 12W: — · Consistency 24W: — · Distance to 50: — · Regime: —"; els.priceMetrics.textContent="12W Price: — | 12W RSI: — | 24W Price: — | 24W RSI: — | 48W Price: — | 48W RSI: —"; els.divergenceStatus.textContent="Divergence Status: —"; els.divergenceText.textContent="Loading divergence context..."; els.fgValue.textContent="—"; els.fgText.textContent="Loading..."; els.fgTime.textContent="—"; els.biasScannerList.innerHTML='<div class="scanner-row">Loading scanner results...</div>'; }
function updateTicker(t){ const p=Number(t.lastPrice), ch=Number(t.priceChangePercent); if(!Number.isFinite(p)||!Number.isFinite(ch)) throw new Error("Ticker parse error"); els.btcPrice.textContent=usd(p); els.btc24hInline.textContent=`24h: ${ch>=0?"+":""}${ch.toFixed(1)}%`; els.btc24hInline.className=`meta ${ch>0?"pos":ch<0?"neg":"neu"}`; els.btcPriceMeta.textContent="BTCUSDT 24h ticker"; }
function updateFearGreed(data){ const l=data?.data?.[0]; if(!l){els.fgText.textContent="Market context unavailable"; return;} const ts=Number(l.timestamp)*1000; els.fgValue.textContent=l.value; els.fgText.textContent=l.value_classification; els.fgTime.textContent=Number.isFinite(ts)?new Date(ts).toLocaleString():"Timestamp unavailable"; }

function updateRsiAndPrice(klines){
  const mapped = klines.map(k=>({openTime:Number(k[0]),open:parseFloat(k[1]),high:parseFloat(k[2]),low:parseFloat(k[3]),close:parseFloat(k[4])})).filter(c=>Object.values(c).every(Number.isFinite));
  const latest = mapped.slice(-RSI_WINDOW);
  const closes = mapped.map(c=>c.close);
  const rsiSeries=calculateRsiSeries(closes);
  if(rsiSeries.length<RSI_WINDOW||latest.length<RSI_WINDOW) throw new Error("Not enough weekly data");
  const v=rsiSeries.slice(-RSI_WINDOW).map(n=>Number(n.toFixed(1)));
  const w0=v[48], w1=v[47], w4=v[44], w12=v[36], w24=v[24], w48=v[0];
  const d4=w0-w4, d12=w0-w12, d24=w0-w24, d48=w0-w48;
  const slope12=d12/12, slope24=d24/24, slope48=d48/48, distance50=w0-50;
  const direction=getDirection(w0,w1,w4,w12), phase=getPhase(w0,d4,d12,w4,w12), regime=getRegime(w0);
  let rises12=0; for(let i=37;i<v.length;i++) if(v[i]>v[i-1]) rises12+=1;
  let rises24=0; for(let i=25;i<v.length;i++) if(v[i]>v[i-1]) rises24+=1;
  const p0=latest[48].close, p4=latest[44].close, p12=latest[36].close, p24=latest[24].close, p48=latest[0].close;
  const pc4=((p0-p4)/p4)*100, pc12=((p0-p12)/p12)*100, pc24=((p0-p24)/p24)*100, pc48=((p0-p48)/p48)*100;
  const divergence=getDivergence(pc12,d12,d4);

  els.rsiCurrent.textContent=f1(w0); els.rsiStatus.textContent=classifyRsi(w0); els.rsiRegime.textContent=`Regime: ${regime}`;
  els.rsiChangeLines.textContent=`4W: ${signed1(d4)} · 12W: ${signed1(d12)} · 24W: ${signed1(d24)} · 48W: ${signed1(d48)}`;
  els.rsiRefs.textContent=`W0: ${f1(w0)} | W-4: ${f1(w4)} | W-12: ${f1(w12)} | W-24: ${f1(w24)} | W-48: ${f1(w48)}`;
  els.rsiSlope.textContent=`RSI Slope 48W: ${signed2(slope48)} / week`;
  els.direction.textContent=direction; els.momentumPhase.textContent=phase;
  els.analyticsStrip.textContent=`RSI Slope 12W: ${signed2(slope12)}/week · RSI Slope 24W: ${signed2(slope24)}/week · RSI Slope 48W: ${signed2(slope48)}/week · Consistency 12W: ${rises12}/12 · Consistency 24W: ${rises24}/24 · Distance to 50: ${signed1(distance50)} (${midlineStatus(distance50)}) · Regime: ${regime}`;
  els.priceMetrics.textContent=`12W Price: ${signed1(pc12)}% | 12W RSI: ${signed1(d12)} | 24W Price: ${signed1(pc24)}% | 24W RSI: ${signed1(d24)} | 48W Price: ${signed1(pc48)}% | 48W RSI: ${signed1(d48)}`;
  els.divergenceStatus.textContent=`Divergence Status: ${divergence.status}`;
  els.divergenceText.textContent=`4W context: Price ${signed1(pc4)}%, RSI ${signed1(d4)}. ${divergence.note}`;

  try {
    renderDualCharts(latest, v);
    togglePriceChartError();
    toggleRsiChartError();
  } catch (error) {
    togglePriceChartError("Price chart unavailable. Check console for render details.");
    toggleRsiChartError("RSI chart unavailable. Check console for render details.");
    console.error("Dual chart render failed:", error);
  }
  renderBiasScanner(runBiasScanner(latest.map(x=>x.close), v));
}

async function loadDashboard(){ setLoading(); els.refreshBtn.disabled=true; const [t,k,f]=await Promise.allSettled([fetchJson(BTC_TICKER_URL),fetchJson(BTC_WEEKLY_KLINE_URL),fetchJson(FEAR_GREED_URL)]); let tickerOk=false,rsiOk=false; if(t.status==="fulfilled"){ try{updateTicker(t.value); tickerOk=true;}catch{els.btcPriceMeta.textContent="Ticker unavailable";} } else els.btcPriceMeta.textContent="Ticker unavailable"; if(k.status==="fulfilled"){ try{updateRsiAndPrice(k.value); rsiOk=true;}catch{els.rsiStatus.textContent="RSI unavailable"; els.analyticsStrip.textContent="RSI analytics unavailable."; els.divergenceStatus.textContent="Divergence Status: unavailable"; els.divergenceText.textContent="Price and RSI comparison is unavailable."; els.biasScannerList.innerHTML='<div class="scanner-row">Scanner unavailable until weekly data loads.</div>';} } else { els.rsiStatus.textContent="RSI unavailable"; els.analyticsStrip.textContent="RSI analytics unavailable."; els.divergenceStatus.textContent="Divergence Status: unavailable"; els.divergenceText.textContent="Price and RSI comparison is unavailable."; els.biasScannerList.innerHTML='<div class="scanner-row">Scanner unavailable until weekly data loads.</div>'; } if(f.status==="fulfilled") updateFearGreed(f.value); else { els.fgText.textContent="Market context unavailable"; els.fgTime.textContent="Try refresh"; } els.statusText.textContent=tickerOk&&rsiOk?`Monitoring BTC weekly momentum and direction. Last update: ${new Date().toLocaleTimeString()}`:(tickerOk||rsiOk)?"Partial update loaded. One source is currently unavailable.":"Unable to load BTC weekly monitor sources right now."; els.refreshBtn.disabled=false; }

els.refreshBtn.addEventListener("click", loadDashboard);
loadDashboard();
