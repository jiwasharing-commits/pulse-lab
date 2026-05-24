const BTC_TICKER_URL = "https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT";
const BTC_WEEKLY_KLINE_URL = "https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120";
const FEAR_GREED_URL = "https://api.alternative.me/fng/?limit=1";
const RSI_PERIOD = 14;
const RSI_WINDOW = 49;
// IMPORTANT:
// Update APP_LAST_UPDATED every time the app code is modified or deployed.
// This value represents app/code update time, not live API refresh time.
const APP_LAST_UPDATED = "2026-05-24 21:35";

const els = {
  statusText: document.getElementById("statusText"), refreshBtn: document.getElementById("refreshBtn"), appLastUpdated: document.getElementById("appLastUpdated"), dataRefreshed: document.getElementById("dataRefreshed"),
  btcPrice: document.getElementById("btcPrice"), btc24hInline: document.getElementById("btc24hInline"), btcPriceMeta: document.getElementById("btcPriceMeta"),
  rsiCurrent: document.getElementById("rsiCurrent"), rsiStatus: document.getElementById("rsiStatus"), rsiRegime: document.getElementById("rsiRegime"),
  rsiChangeLines: document.getElementById("rsiChangeLines"), rsiRefs: document.getElementById("rsiRefs"), rsiSlope: document.getElementById("rsiSlope"),
  direction: document.getElementById("direction"), momentumPhase: document.getElementById("momentumPhase"), analyticsStrip: document.getElementById("analyticsStrip"),
  priceMetrics: document.getElementById("priceMetrics"), divergenceStatus: document.getElementById("divergenceStatus"), divergenceText: document.getElementById("divergenceText"),
  biasScannerList: document.getElementById("biasScannerList"), fvgList: document.getElementById("fvgList"),
  fvgTitle: document.getElementById("fvgTitle"), biasTitle: document.getElementById("biasTitle"),
  leftRsiValue: document.getElementById("leftRsiValue"), leftRsiRegime: document.getElementById("leftRsiRegime"), leftDistance50: document.getElementById("leftDistance50"), leftSlopes: document.getElementById("leftSlopes"),
  leftDirection: document.getElementById("leftDirection"), leftPhase: document.getElementById("leftPhase"), leftChanges: document.getElementById("leftChanges"), leftFearGreed: document.getElementById("leftFearGreed"),
  rightFvgCount: document.getElementById("rightFvgCount"), rightNearestFvg: document.getElementById("rightNearestFvg"), rightFvgStatus: document.getElementById("rightFvgStatus"),
  rightBiasTop: document.getElementById("rightBiasTop"), rightBiasMeta: document.getElementById("rightBiasMeta"), rightDivergence: document.getElementById("rightDivergence"), rightDivergenceMeta: document.getElementById("rightDivergenceMeta"),
  right4hFvgType: document.getElementById("right4hFvgType"), right4hFvgZone: document.getElementById("right4hFvgZone"), right4hFvgRelation: document.getElementById("right4hFvgRelation"), right4hFvgDistance: document.getElementById("right4hFvgDistance"), right4hFvgStatus: document.getElementById("right4hFvgStatus"), mtfWeeklyBias: document.getElementById("mtfWeeklyBias"), mtf4hReaction: document.getElementById("mtf4hReaction"), mtf1hTiming: document.getElementById("mtf1hTiming"), mtfFinalStatus: document.getElementById("mtfFinalStatus"),
  fvgToggleBtn: document.getElementById("fvgToggleBtn"), biasToggleBtn: document.getElementById("biasToggleBtn"), fvgContent: document.getElementById("fvgContent"), biasContent: document.getElementById("biasContent"), fvgViewDetailsBtn: document.getElementById("fvgViewDetailsBtn"), biasViewDetailsBtn: document.getElementById("biasViewDetailsBtn"),
  priceChart: document.getElementById("priceChart"), priceChartError: document.getElementById("priceChartError"), rsiChart: document.getElementById("rsiChart"), rsiChartError: document.getElementById("rsiChartError"),
  ltfPanel: document.getElementById("ltfPanel"), ltfToggleBtn: document.getElementById("ltfToggleBtn"), ltfContent: document.getElementById("ltfContent"),
  ltfStartDate: document.getElementById("ltfStartDate"), ltfEndDate: document.getElementById("ltfEndDate"), ltfApplyBtn: document.getElementById("ltfApplyBtn"), ltfResetBtn: document.getElementById("ltfResetBtn"),
  lower4hChart: document.getElementById("lower4hChart"), lower1hChart: document.getElementById("lower1hChart"), lower4hError: document.getElementById("lower4hError"), lower1hError: document.getElementById("lower1hError"), lower4hFvgSummary: document.getElementById("lower4hFvgSummary"), lower4hStructure: document.getElementById("lower4hStructure"), lower4hReaction: document.getElementById("lower4hReaction"),
  lower1hSweepSummary: document.getElementById("lower1hSweepSummary"), lower1hStructureSummary: document.getElementById("lower1hStructureSummary"), lowerTfReactionSummary: document.getElementById("lowerTfReactionSummary"), lower4hFvgOverlay: document.getElementById("lower4hFvgOverlay"),
  ltfDateControls: document.getElementById("ltfDateControls"), ltfPreset1w: document.getElementById("ltfPreset1w"), ltfPreset2w: document.getElementById("ltfPreset2w"), ltfPresetCustom: document.getElementById("ltfPresetCustom"),
};

let priceChart = null;
let candleSeries = null;
let rsiChart = null;
let fvgOverlayLines = [];
let fvgOverlayLayer = null;
let activeFvgZonesForOverlay = [];
let weeklyOverlayRightTime = null;
let ltf4hChart = null;
let ltf1hChart = null;
let ltf4hSeries = null;
let ltf1hSeries = null;
let current4hFvgPriceLines = [];
let current4hFvgOverlays = [];
let ltf4hFvgLayer = null;
let fvgRedrawPending = false;
let active4hFvgs = [];
let latest4hCandles = [];
let latest4hStructureStatus = "No clear 4H structure shift";
let latest1hSweepStatus = "No recent 1H liquidity sweep";
let latest1hStructureStatus = "No clear 1H structure shift";
let activeLowerTfMode = "1W";
let ltfVisible = false;
let ltfPreset = "1w";
let lowerTimeframeLoaded = false;
let fvgOpen=false;
let biasOpen=false;
const mtfState = { weeklyDirection: null, weeklyPhase: null, weeklyDivergence: null, topBias: null, h4Structure: null, h4FvgNearest: null, h1Sweep: null, h1Structure: null };

const f1=(n)=>Number(n).toFixed(1), f2=(n)=>Number(n).toFixed(2), signed1=(n)=>`${n>=0?"+":""}${f1(n)}`, signed2=(n)=>`${n>=0?"+":""}${f2(n)}`;
const usd=(v)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:v>1000?0:2}).format(v);
const classifyRsi=(r)=>r<30?"Deep Weak Zone":r<45?"Weak Zone":r<55?"Neutral Zone":r<=70?"Strong Zone":"Heated Zone";
const getRegime=(w0)=>w0<30?"Deep Weakness":w0<45?"Recovery Attempt":w0<50?"Neutral Below Midline":w0<55?"Neutral Above Midline":w0<=70?"Momentum Strength":"Heated Momentum";
const getDirection=(w0,w1,w4,w12)=>w0>w1&&w0>w4&&w0>w12?"Strong Rising":w0>w4&&w0>w12?"Rising":w0>w12&&w0<w4?"Long-term Improving, Short-term Cooling":w0<w12&&w0>w4?"Short-term Bounce, Long-term Weak":w0<w4&&w0<w12?"Weakening":"Mixed / Sideways";
const getPhase=(w0,d4,d12,w4,w12)=>w0>70?"Heated Phase":w0>=30&&w0<45&&d12>0?"Recovery Phase":w0>=45&&w0<55&&d12>0?"Neutral Recovery":w0>=55&&w0<=70&&d4>0&&d12>0?"Strength Phase":w0<w4&&w0>w12?"Cooling Phase":d4<0&&d12<0?"Weakening Phase":"Mixed Phase";
const midlineStatus=(d)=>d<-5?"Below Midline":d<=5?"Near Midline":"Above Midline";
function getDivergence(priceChange12W, rsiChange12W, rsiChange4W){let status="Mixed Relationship",note="Price and RSI relationship is mixed.";if(priceChange12W>3&&rsiChange12W>0){status="Price and RSI Aligned";note="Price and weekly momentum are moving in the same direction.";if(rsiChange4W<0) note="Long-range alignment remains positive, but short-term RSI is cooling.";} else if(priceChange12W>3&&rsiChange12W<0){status="Bearish Divergence";note="Price improved while weekly RSI weakened, showing softer momentum confirmation.";if(rsiChange4W<0) note="Momentum divergence is also visible in the short-term window.";} else if(priceChange12W<-3&&rsiChange12W>0){status="Bullish Divergence";note="Price weakened while weekly RSI improved, showing momentum recovery.";if(rsiChange4W>0) note="Weekly RSI recovery is also improving in the short-term window.";} else if(priceChange12W>=-3&&priceChange12W<=3&&rsiChange12W>0){status="Momentum Improving During Consolidation";note="Price is consolidating while weekly RSI improves.";} else if(priceChange12W>=-3&&priceChange12W<=3&&rsiChange12W<0){status="Momentum Cooling During Consolidation";note="Price is consolidating while weekly RSI cools.";}return {status,note};}

function calculateRsiSeries(closes,p=RSI_PERIOD){ if(closes.length<=p) return []; let gs=0,ls=0; const rsis=[]; for(let i=1;i<=p;i++){const d=closes[i]-closes[i-1]; gs+=d>0?d:0; ls+=d<0?Math.abs(d):0;} let ag=gs/p, al=ls/p; rsis.push(al===0?100:100-100/(1+ag/al)); for(let i=p+1;i<closes.length;i++){const d=closes[i]-closes[i-1], g=d>0?d:0, l=d<0?Math.abs(d):0; ag=(ag*(p-1)+g)/p; al=(al*(p-1)+l)/p; rsis.push(al===0?100:100-100/(1+ag/al));} return rsis; }
function getConfidence(score){ return score>=20?"Strong":score>=12?"Moderate":"Weak"; }
function runBiasScanner(prices, rsis){const out=[];for(let i=0;i<prices.length;i++){for(let j=i+3;j<prices.length&&j-i<=48;j++){const pc=((prices[j]-prices[i])/prices[i])*100, rc=rsis[j]-rsis[i];if(Math.abs(pc)<3&&Math.abs(rc)<4) continue;let bias="";if((pc<=-3||(pc>=-3&&pc<=3))&&rc>=4) bias="Potential Upward Bias";else if((pc>=3||(pc>=-3&&pc<=3))&&rc<=-4) bias="Potential Downward Bias";if(!bias) continue;const score=Math.abs(pc)+Math.abs(rc);out.push({bias,range:`W-${48-i} → W-${48-j}`,priceChangePercent:pc,rsiChange:rc,score,confidence:getConfidence(score)});}}return out.sort((a,b)=>b.score-a.score).slice(0,3);} 

async function fetchJson(url){ const r=await fetch(url,{method:"GET"}); if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }
const fetchBtcTicker=()=>fetchJson(BTC_TICKER_URL);
async function fetchWeeklyKlines(){
  const klines = await fetchJson(BTC_WEEKLY_KLINE_URL);
  console.log("Klines length:", Array.isArray(klines) ? klines.length : "not-array");
  console.log("Sample kline:", Array.isArray(klines) ? klines[0] : null);
  if(!Array.isArray(klines)) throw new Error("Weekly Binance data unavailable.");
  return klines;
}

function buildWeeklyDataset(klines){
  const mapped = klines.map((k)=>({
    openTime: Number(k[0]),
    time: new Date(Number(k[0])).toISOString().slice(0,10),
    open: parseFloat(k[1]), high: parseFloat(k[2]), low: parseFloat(k[3]), close: parseFloat(k[4])
  })).filter((d)=>Number.isFinite(d.openTime)&&d.time&&Number.isFinite(d.open)&&Number.isFinite(d.high)&&Number.isFinite(d.low)&&Number.isFinite(d.close));
  if(mapped.length < RSI_WINDOW) throw new Error("Weekly Binance data unavailable.");
  const closes = mapped.map((d)=>d.close);
  const rsiSeries = calculateRsiSeries(closes).map((v)=>Number(v.toFixed(1)));
  const start = mapped.length - RSI_WINDOW;
  const dataset = mapped.slice(-RSI_WINDOW).map((d, i)=>({
    label: i === RSI_WINDOW - 1 ? "W0" : `W-${(RSI_WINDOW - 1) - i}`,
    time: d.time,
    open: d.open, high: d.high, low: d.low, close: d.close,
    rsi: Number.isFinite(rsiSeries[start + i - RSI_PERIOD]) ? rsiSeries[start + i - RSI_PERIOD] : null,
  }));
  console.log("Dataset length:", dataset.length);
  console.log("Sample dataset item:", dataset[0]);
  return dataset;
}


function createWeekLabelMap(dataset){
  const map = new Map();
  dataset.forEach((d)=>map.set(d.time, d.label));
  return map;
}
function timeKey(t){
  if(typeof t === "string") return t;
  if(t && typeof t === "object" && "year" in t) {
    const mm=String(t.month).padStart(2,"0"), dd=String(t.day).padStart(2,"0");
    return `${t.year}-${mm}-${dd}`;
  }
  return "";
}

function togglePriceChartError(msg=""){ if(!els.priceChartError) return; els.priceChartError.hidden = !msg; if(msg) els.priceChartError.textContent = msg; }
function toggleRsiChartError(msg=""){ if(!els.rsiChartError) return; els.rsiChartError.hidden = !msg; if(msg) els.rsiChartError.textContent = msg; }

function renderSummaryCards(dataset){
  const rsiValues = dataset.map(d=>d.rsi).filter(Number.isFinite);
  if(rsiValues.length < RSI_WINDOW){ els.rsiStatus.textContent = "Weekly Binance data unavailable."; return null; }
  const v = rsiValues;
  const w0=v[48], w1=v[47], w4=v[44], w12=v[36], w24=v[24], w48=v[0];
  const d4=w0-w4, d12=w0-w12, d24=w0-w24, d48=w0-w48;
  const slope12=d12/12, slope24=d24/24, slope48=d48/48, distance50=w0-50;
  const direction=getDirection(w0,w1,w4,w12), phase=getPhase(w0,d4,d12,w4,w12), regime=getRegime(w0);
  let rises12=0; for(let i=37;i<v.length;i++) if(v[i]>v[i-1]) rises12+=1;
  let rises24=0; for(let i=25;i<v.length;i++) if(v[i]>v[i-1]) rises24+=1;
  els.rsiCurrent.textContent=f1(w0); els.rsiStatus.textContent=classifyRsi(w0); els.rsiRegime.textContent=`Regime: ${regime}`;
  els.rsiChangeLines.textContent=`4W: ${signed1(d4)} · 12W: ${signed1(d12)} · 24W: ${signed1(d24)} · 48W: ${signed1(d48)}`;
  els.rsiRefs.textContent=`W0: ${f1(w0)} | W-4: ${f1(w4)} | W-12: ${f1(w12)} | W-24: ${f1(w24)} | W-48: ${f1(w48)}`;
  els.rsiSlope.textContent=`RSI Slope 48W: ${signed2(slope48)} / week`;
  els.direction.textContent=direction; els.momentumPhase.textContent=phase;
  els.analyticsStrip.textContent=`RSI Slope 12W: ${signed2(slope12)}/week · RSI Slope 24W: ${signed2(slope24)}/week · RSI Slope 48W: ${signed2(slope48)}/week · Consistency 12W: ${rises12}/12 · Consistency 24W: ${rises24}/24 · Distance to 50: ${signed1(distance50)} (${midlineStatus(distance50)}) · Regime: ${regime}`;
  if(els.leftRsiValue) els.leftRsiValue.textContent=f1(w0);
  if(els.leftRsiRegime) els.leftRsiRegime.textContent=regime;
  if(els.leftDistance50) els.leftDistance50.textContent=`${signed1(distance50)} (${midlineStatus(distance50)})`;
  if(els.leftSlopes) els.leftSlopes.textContent=`${signed2(slope12)} / ${signed2(slope24)} / ${signed2(slope48)}`;
  if(els.leftDirection) els.leftDirection.textContent=direction;
  if(els.leftPhase) els.leftPhase.textContent=phase;
  if(els.leftChanges) els.leftChanges.textContent=`4W ${signed1(d4)} | 12W ${signed1(d12)} | 24W ${signed1(d24)} | 48W ${signed1(d48)}`;
  mtfState.weeklyDirection = direction;
  mtfState.weeklyPhase = phase;
  return { d4,d12,d24,d48, w0,w4,w12,w24,w48, direction, phase, regime, rsiValues: v };
}

function renderDivergenceStatus(dataset, metrics){
  if(!metrics) return;
  const p0=dataset[48].close, p4=dataset[44].close, p12=dataset[36].close, p24=dataset[24].close, p48=dataset[0].close;
  const pc4=((p0-p4)/p4)*100, pc12=((p0-p12)/p12)*100, pc24=((p0-p24)/p24)*100, pc48=((p0-p48)/p48)*100;
  const divergence=getDivergence(pc12,metrics.d12,metrics.d4);
  els.priceMetrics.textContent=`12W Price: ${signed1(pc12)}% | 12W RSI: ${signed1(metrics.d12)} | 24W Price: ${signed1(pc24)}% | 24W RSI: ${signed1(metrics.d24)} | 48W Price: ${signed1(pc48)}% | 48W RSI: ${signed1(metrics.d48)}`;
  els.divergenceStatus.textContent=`Divergence Status: ${divergence.status}`;
  els.divergenceText.textContent=`4W context: Price ${signed1(pc4)}%, RSI ${signed1(metrics.d4)}. ${divergence.note}`;
  if(els.rightDivergence) els.rightDivergence.textContent=divergence.status;
  if(els.rightDivergenceMeta) els.rightDivergenceMeta.textContent=`12W ${signed1(pc12)}%/${signed1(metrics.d12)} | 24W ${signed1(pc24)}% | 48W ${signed1(pc48)}%`;
  mtfState.weeklyDivergence = divergence.status;
}

function renderPotentialBiasScanner(dataset, metrics){
  if(!metrics) return;
  const prices=dataset.map(x=>x.close), rsis=metrics.rsiValues;
  const items = runBiasScanner(prices, rsis);
  if(els.biasTitle) els.biasTitle.textContent=`Potential Bias Scanner (${items.length})`;
  if(els.rightBiasTop) els.rightBiasTop.textContent = items[0] ? items[0].bias : "Top Bias: -";
  if(els.rightBiasMeta) els.rightBiasMeta.textContent = items[0] ? `${items[0].range} | ${items[0].confidence}` : "Confidence: unavailable";
  if(!items.length){ els.biasScannerList.innerHTML='<div class="scanner-row">No clear potential bias detected across the weekly comparison ranges.</div>'; return; }
  els.biasScannerList.innerHTML=items.map(it=>`<div class="scanner-row"><span class="scanner-title">${it.bias}</span>Range: ${it.range} · Price: ${signed2(it.priceChangePercent)}% · RSI: ${signed1(it.rsiChange)} · Confidence: ${it.confidence}<br>${it.bias==='Potential Upward Bias'?'Price weakened or consolidated while weekly RSI improved.':'Price improved or consolidated while weekly RSI weakened.'}</div>`).join('');
}

function renderPriceChart(dataset){
  const weekLabelMap = createWeekLabelMap(dataset);
  if (typeof LightweightCharts === "undefined") throw new Error("LightweightCharts is not defined");
  if (!els.priceChart) throw new Error("priceChart container is null");
  if (priceChart) { priceChart.remove(); priceChart = null; candleSeries = null; }
  els.priceChart.innerHTML = "";
  const candles = dataset.map(d=>({ time:d.time, open:d.open, high:d.high, low:d.low, close:d.close }));
  if(!candles.length) throw new Error("No valid OHLC candle data.");
  priceChart = LightweightCharts.createChart(els.priceChart, { width: Math.max(els.priceChart.clientWidth||0,320), height: 300, layout:{background:{type:"solid",color:"transparent"},textColor:"#cbd5e1"}, grid:{vertLines:{color:"rgba(148,163,184,0.12)"},horzLines:{color:"rgba(148,163,184,0.12)"}}, rightPriceScale:{borderColor:"rgba(148,163,184,0.2)"}, timeScale:{borderColor:"rgba(148,163,184,0.2)",timeVisible:true,tickMarkFormatter:(time)=>weekLabelMap.get(timeKey(time))||""} });
  candleSeries = priceChart.addCandlestickSeries({ upColor: "#22c55e", downColor: "#ef4444", borderUpColor: "#22c55e", borderDownColor: "#ef4444", wickUpColor: "#22c55e", wickDownColor: "#ef4444" });
  candleSeries.setData(candles);
  priceChart.timeScale().fitContent();
}

function renderRsiChart(dataset){
  const weekLabelMap = createWeekLabelMap(dataset);
  if (typeof LightweightCharts === "undefined") throw new Error("LightweightCharts is not defined");
  if (!els.rsiChart) throw new Error("rsiChart container is null");
  if (rsiChart) { rsiChart.remove(); rsiChart = null; }
  els.rsiChart.innerHTML = "";
  const points = dataset.filter(d=>Number.isFinite(d.rsi)).map(d=>({ time:d.time, value:d.rsi }));
  if(!points.length) throw new Error("No valid RSI chart data.");
  rsiChart = LightweightCharts.createChart(els.rsiChart, { width: Math.max(els.rsiChart.clientWidth||0,320), height: 240, layout:{background:{type:"solid",color:"transparent"},textColor:"#cbd5e1"}, grid:{vertLines:{color:"rgba(148,163,184,0.12)"},horzLines:{color:"rgba(148,163,184,0.12)"}}, rightPriceScale:{borderColor:"rgba(148,163,184,0.2)", scaleMargins:{top:0.05,bottom:0.05}}, timeScale:{borderColor:"rgba(148,163,184,0.2)",timeVisible:true,tickMarkFormatter:(time)=>weekLabelMap.get(timeKey(time))||""} });
  const line = rsiChart.addLineSeries({ color:'#6f8cff', lineWidth:2 });
  line.setData(points);
  line.createPriceLine({ price:30, color:'rgba(239,68,68,.65)', lineWidth:1, lineStyle:2, axisLabelVisible:true, title:'30' });
  line.createPriceLine({ price:50, color:'rgba(148,163,184,.65)', lineWidth:1, lineStyle:2, axisLabelVisible:true, title:'50' });
  line.createPriceLine({ price:70, color:'rgba(34,197,94,.65)', lineWidth:1, lineStyle:2, axisLabelVisible:true, title:'70' });
  rsiChart.timeScale().fitContent();
  // TODO: re-enable time-scale sync after data pipeline stability is fully verified.
}

function renderFearGreed(data){ const l=data?.data?.[0]; if(!l){ if(els.leftFearGreed) els.leftFearGreed.textContent="Fear & Greed: unavailable"; return; } const ts=Number(l.timestamp)*1000; const t=Number.isFinite(ts)?new Date(ts).toLocaleString():"unknown"; if(els.leftFearGreed){ els.leftFearGreed.textContent=`Fear & Greed: ${l.value} ${l.value_classification}`; els.leftFearGreed.title=`Updated: ${t}`; } }


function scanWeeklyFvg(dataset){
  const fvgs=[];
  for(let i=2;i<dataset.length;i++){
    const a=dataset[i-2], c=dataset[i];
    if(c.low>a.high){
      const lower=a.high, upper=c.low;
      fvgs.push({type:"Bullish FVG", index:i, startLabel:a.label,endLabel:c.label,startTime:a.time,endTime:c.time,lower,upper,midpoint:(lower+upper)/2,sizePercent:((upper-lower)/((lower+upper)/2))*100});
    }
    if(c.high<a.low){
      const lower=c.high, upper=a.low;
      fvgs.push({type:"Bearish FVG", index:i, startLabel:a.label,endLabel:c.label,startTime:a.time,endTime:c.time,lower,upper,midpoint:(lower+upper)/2,sizePercent:((upper-lower)/((lower+upper)/2))*100});
    }
  }
  return fvgs.map((f)=>({ ...f, status:getFvgStatus(f,dataset) }));
}
function getFvgStatus(fvg,dataset){
  const after=dataset.slice(fvg.index+1);
  if(fvg.type==="Bullish FVG"){
    if(after.some(c=>c.low<=fvg.lower)) return "Filled";
    if(after.some(c=>c.low<fvg.upper && c.low>fvg.lower)) return "Partially Filled";
    return "Unfilled";
  }
  if(after.some(c=>c.high>=fvg.upper)) return "Filled";
  if(after.some(c=>c.high>fvg.lower && c.high<fvg.upper)) return "Partially Filled";
  return "Unfilled";
}
function fvgDistancePct(fvg,currentPrice){
  if(currentPrice>fvg.upper) return ((currentPrice-fvg.upper)/currentPrice)*100;
  if(currentPrice<fvg.lower) return ((fvg.lower-currentPrice)/currentPrice)*100;
  return 0;
}
function renderFvgPanel(dataset){
  if(!els.fvgList) return;
  try {
    const active=getActiveFvgs(dataset);
    if(els.fvgTitle) els.fvgTitle.textContent=`Active Weekly FVG Zones (${active.length})`;
    const shown = Math.min(active.length,5);
    if(els.rightFvgCount) els.rightFvgCount.textContent=`Active: ${active.length} | Shown: ${shown}`;
    if(els.rightNearestFvg) els.rightNearestFvg.textContent=active[0]?`Nearest: ${active[0].type} ${active[0].startLabel}->${active[0].endLabel}`:"Nearest: -";
    if(els.rightFvgStatus) els.rightFvgStatus.textContent=active[0]?`Status: ${active[0].status}`:"Status: -";
    if(!active.length){ els.fvgList.innerHTML='<div class="scanner-row">No active weekly FVG detected in the current W-48 to W0 range.</div>'; return []; }
    els.fvgList.innerHTML=active.map(f=>{
      const distLabel=f.distance===0?"Inside Zone":`${signed1(f.distance)}%`;
      return `<div class="scanner-row"><span class="scanner-title">${f.type}</span> | ${f.startLabel} → ${f.endLabel} | ${usd(f.lower)} - ${usd(f.upper)} | ${f.status} | Distance: ${distLabel} | Size: ${f1(f.sizePercent)}%</div>`;
    }).join('');
    return active;
  } catch (e) {
    console.error("FVG scan failed:", e);
    els.fvgList.innerHTML='<div class="scanner-row">FVG section unavailable.</div>';
    return [];
  }
}



function ensureFvgOverlayLayer(){
  if(!els.priceChart) return null;
  if(!fvgOverlayLayer){
    fvgOverlayLayer = document.createElement("div");
    fvgOverlayLayer.className = "fvg-overlay-layer";
    els.priceChart.appendChild(fvgOverlayLayer);
  }
  return fvgOverlayLayer;
}
function clearFvgFilledOverlay(){
  if(fvgOverlayLayer) fvgOverlayLayer.innerHTML = "";
}
function renderFvgFilledOverlay(){
  try {
    if(!priceChart || !candleSeries || !activeFvgZonesForOverlay.length) return;
    const layer = ensureFvgOverlayLayer();
    if(!layer) return;
    layer.innerHTML = "";
    const rightBoundary = weeklyOverlayRightTime != null
      ? priceChart.timeScale().timeToCoordinate(weeklyOverlayRightTime)
      : null;

    activeFvgZonesForOverlay.forEach((f)=>{
      const xStart = priceChart.timeScale().timeToCoordinate(f.endTime);
      const yTop = candleSeries.priceToCoordinate(f.upper);
      const yBottom = candleSeries.priceToCoordinate(f.lower);
      const xEnd = rightBoundary != null ? rightBoundary - 4 : null;
      if(xStart == null || xEnd == null || yTop == null || yBottom == null) return;

      const rect = document.createElement("div");
      const bullish = f.type === "Bullish FVG";
      const left = Math.max(0, Math.min(xStart, xEnd));
      const width = Math.max(1, Math.abs(xEnd - xStart));
      rect.className = `fvg-zone ${bullish ? "bullish" : "bearish"}`;
      rect.style.left = `${left}px`;
      rect.style.top = `${Math.min(yTop, yBottom)}px`;
      rect.style.width = `${width}px`;
      rect.style.height = `${Math.max(1, Math.abs(yBottom - yTop))}px`;
      rect.title = `${f.type} | ${f.startLabel} → ${f.endLabel}`;
      layer.appendChild(rect);
    });
  } catch (e) {
    console.error("FVG filled overlay render failed", e);
  }
}

function getActiveFvgs(dataset){
  const currentPrice=dataset[dataset.length-1].close;
  return scanWeeklyFvg(dataset)
    .filter(f=>f.status!=="Filled")
    .map(f=>({ ...f, distance:fvgDistancePct(f,currentPrice) }))
    .sort((a,b)=>{
      if(Math.abs(a.distance)!==Math.abs(b.distance)) return Math.abs(a.distance)-Math.abs(b.distance);
      if(b.index!==a.index) return b.index-a.index;
      const sa=(a.status==="Unfilled"?0:1), sb=(b.status==="Unfilled"?0:1);
      return sa-sb;
    })
    .slice(0,5);
}
function clearFvgOverlay(){
  fvgOverlayLines.forEach((line)=>{ try { candleSeries?.removePriceLine(line); } catch(_){} });
  fvgOverlayLines = [];
  clearFvgFilledOverlay();
}
function renderFvgOverlay(activeFvgs, dataset){
  activeFvgZonesForOverlay = activeFvgs || [];
  const latest = Array.isArray(dataset) && dataset.length ? dataset[dataset.length-1] : null;
  weeklyOverlayRightTime = latest?.time ?? null;
  try {
    if(!candleSeries) return;
    clearFvgOverlay();
    activeFvgs.forEach((f)=>{
      const bull = f.type === "Bullish FVG";
      const color = bull ? "rgba(34,197,94,0.38)" : "rgba(239,68,68,0.38)";
      const upperLine = candleSeries.createPriceLine({ price:f.upper, color, lineWidth:1, lineStyle:2, axisLabelVisible:false, title:`${f.type} upper` });
      const lowerLine = candleSeries.createPriceLine({ price:f.lower, color, lineWidth:1, lineStyle:2, axisLabelVisible:false, title:`${f.type} lower` });
      fvgOverlayLines.push(upperLine, lowerLine);
    });
    renderFvgFilledOverlay();
    render4hVsWeeklyFvgSummary();

    priceChart.timeScale().subscribeVisibleTimeRangeChange(() => renderFvgFilledOverlay());
    priceChart.timeScale().subscribeVisibleLogicalRangeChange(() => renderFvgFilledOverlay());
  } catch (e) {
    console.error("FVG overlay render failed", e);
  }
}



function setToggleState(name, open){
  if(name==='ltf'){ ltfVisible=open; els.ltfContent.hidden=!open; els.ltfToggleBtn.textContent=open?'Hide':'Show'; }
  if(name==='fvg'){ fvgOpen=open; els.fvgContent.hidden=!open; els.fvgToggleBtn.textContent=open?'Hide':'Show'; }
  if(name==='bias'){ biasOpen=open; els.biasContent.hidden=!open; els.biasToggleBtn.textContent=open?'Hide':'Show'; }
  try { sessionStorage.setItem(`pl_${name}_open`, open?'1':'0'); } catch(_){}
}
function restoreToggleState(){
  const read=(k)=>{ try { return sessionStorage.getItem(k)==='1'; } catch(_) { return false; } };
  setToggleState('ltf', read('pl_ltf_open'));
  setToggleState('fvg', read('pl_fvg_open'));
  setToggleState('bias', read('pl_bias_open'));
}

function setLtfPresetUI(preset){
  ltfPreset = preset;
  const act=(el,on)=>{ if(!el) return; el.classList.toggle('active', on); };
  act(els.ltfPreset1w, preset==='1w'); act(els.ltfPreset2w, preset==='2w'); act(els.ltfPresetCustom, preset==='custom');
  if(els.ltfDateControls) els.ltfDateControls.hidden = preset!=='custom';
}

function setupCollapsibleSections(){
  els.ltfToggleBtn?.addEventListener('click', async ()=>{ setToggleState('ltf', !ltfVisible); if(ltfVisible){ requestAnimationFrame(()=>{ if(!lowerTimeframeLoaded){ setLtfPresetUI('1w'); renderLowerTimeframeMode('1W'); } else { renderLowerTimeframeMode(ltfPreset==='2w'?'2W':'1W'); } }); } else destroyLtfCharts(); });
  els.fvgToggleBtn?.addEventListener('click', ()=>setToggleState('fvg', !fvgOpen));
  els.biasToggleBtn?.addEventListener('click', ()=>setToggleState('bias', !biasOpen));
  els.fvgViewDetailsBtn?.addEventListener('click', ()=>{ setToggleState('fvg', true); document.getElementById('fvgPanel')?.scrollIntoView({behavior:'smooth',block:'nearest'}); });
  els.biasViewDetailsBtn?.addEventListener('click', ()=>{ setToggleState('bias', true); document.getElementById('biasScannerPanel')?.scrollIntoView({behavior:'smooth',block:'nearest'}); });
  els.ltfPreset1w?.addEventListener('click', ()=>{ setLtfPresetUI('1w'); if(ltfVisible) { lowerTimeframeLoaded=true; renderLowerTimeframeMode('1W'); } });
  els.ltfPreset2w?.addEventListener('click', ()=>{ setLtfPresetUI('2w'); if(ltfVisible) { lowerTimeframeLoaded=true; renderLowerTimeframeMode('2W'); } });
  els.ltfPresetCustom?.addEventListener('click', ()=>{ setLtfPresetUI('custom'); });
  els.ltfApplyBtn?.addEventListener('click', ()=>{ lowerTimeframeLoaded=true; renderLowerTimeframeMode('CUSTOM'); });
  els.ltfResetBtn?.addEventListener('click', ()=>{ if(els.ltfStartDate) els.ltfStartDate.value=''; if(els.ltfEndDate) els.ltfEndDate.value=''; setLtfPresetUI('1w'); lowerTimeframeLoaded=true; if(ltfVisible) renderLowerTimeframeMode('RESET'); });
  setLtfPresetUI('1w');
  restoreToggleState();
  if(ltfVisible){ requestAnimationFrame(()=>{ renderLowerTimeframeMode('1W'); lowerTimeframeLoaded=true; }); }
}

function toggleLtfError(el,msg=""){ if(!el) return; el.hidden=!msg; if(msg) el.textContent=msg; }
function destroyLtfCharts(){ if(ltf4hChart){ ltf4hChart.remove(); ltf4hChart=null; } if(ltf1hChart){ ltf1hChart.remove(); ltf1hChart=null; } ltf4hSeries=null; ltf1hSeries=null; clear4hFvgOverlay(); if(els.lower4hFvgOverlay) els.lower4hFvgOverlay.innerHTML=""; }
function mapKlinesToCandles(klines, limit){
  const src = typeof limit === "number" ? klines.slice(-limit) : klines;
  return src.map((k)=>({ time:Math.floor(Number(k[0]) / 1000), open:parseFloat(k[1]), high:parseFloat(k[2]), low:parseFloat(k[3]), close:parseFloat(k[4]) }))
    .filter((c)=>Number.isFinite(c.time) && Number.isFinite(c.open)&&Number.isFinite(c.high)&&Number.isFinite(c.low)&&Number.isFinite(c.close));
}
async function fetchLtfKlines(interval, startTime, endTime, limitOverride){
  const u=new URL('https://data-api.binance.vision/api/v3/klines');
  u.searchParams.set('symbol','BTCUSDT');
  u.searchParams.set('interval', interval);
  const fallbackLimit = interval==='4h' ? 42 : 168;
  const finalLimit = startTime && endTime ? 1000 : (limitOverride || fallbackLimit);
  u.searchParams.set('limit', String(finalLimit));
  if(startTime) u.searchParams.set('startTime', String(startTime));
  if(endTime) u.searchParams.set('endTime', String(endTime));
  const data=await fetchJson(u.toString());
  if(!Array.isArray(data)) throw new Error(`${interval} data unavailable`);
  return data;
}
function renderSingleLtfChart(container, candles, height){
  const chart = LightweightCharts.createChart(container, { width: Math.max(container.clientWidth||0,320), height, layout:{background:{type:'solid',color:'transparent'},textColor:'#cbd5e1'}, grid:{vertLines:{color:'rgba(148,163,184,0.12)'},horzLines:{color:'rgba(148,163,184,0.12)'}}, rightPriceScale:{borderColor:'rgba(148,163,184,0.2)'}, timeScale:{borderColor:'rgba(148,163,184,0.2)',timeVisible:true} });
  const s=chart.addCandlestickSeries({ upColor:'#22c55e', downColor:'#ef4444', borderUpColor:'#22c55e', borderDownColor:'#ef4444', wickUpColor:'#22c55e', wickDownColor:'#ef4444' });
  s.setData(candles); chart.timeScale().fitContent(); return { chart, series: s };
}
async function renderLowerTimeframeMode(mode="1W"){
  activeLowerTfMode = mode;
  console.log("Lower TF mode:", activeLowerTfMode);
  if(!ltfVisible) return;
  if(!els.lower4hChart || !els.lower1hChart || els.lower4hChart.clientWidth===0 || els.lower1hChart.clientWidth===0 || els.lower4hChart.clientHeight===0 || els.lower1hChart.clientHeight===0){
    requestAnimationFrame(()=>renderLowerTimeframeMode(mode));
    return;
  }
  lowerTimeframeLoaded = true;
  toggleLtfError(els.lower4hError,''); toggleLtfError(els.lower1hError,'');
  destroyLtfCharts();
  if(els.lower4hChart) els.lower4hChart.innerHTML='';
  if(els.lower1hChart) els.lower1hChart.innerHTML='';
  if(els.lower4hFvgOverlay) els.lower4hFvgOverlay.innerHTML='';

  let st=null, et=null, preset='1w';
  if(mode==='2W') preset='2w';
  if(mode==='CUSTOM') preset='custom';
  if(mode==='RESET') preset='1w';
  const hasRange = preset==='custom' && els.ltfStartDate.value && els.ltfEndDate.value;
  if(hasRange){
    st = new Date(`${els.ltfStartDate.value}T00:00:00`).getTime();
    et = new Date(`${els.ltfEndDate.value}T23:59:59`).getTime();
  }
  const limit4h = hasRange ? 1000 : (preset==='2w' ? 84 : 42);
  const limit1h = hasRange ? 1000 : (preset==='2w' ? 336 : 168);
  console.log('4H chart size:', els.lower4hChart.clientWidth, els.lower4hChart.clientHeight);
  const [h4,h1] = await Promise.allSettled([fetchLtfKlines('4h', st, et, limit4h), fetchLtfKlines('1h', st, et, limit1h)]);
  if(h4.status==='fulfilled'){
    try {
      const candles=mapKlinesToCandles(h4.value, hasRange ? undefined : limit4h);
      console.log('4H candles:', candles.length);
      console.log('Sample 4H candle:', candles[0]);
      if(!candles.length) { toggleLtfError(els.lower4hError,'No 4H candles found for selected range.'); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='No signal detected (4H FVG).'; }
      else {
        const r=renderSingleLtfChart(els.lower4hChart,candles,280);
        ltf4hChart=r.chart; ltf4hSeries=r.series;
        ltf4hChart.resize(els.lower4hChart.clientWidth, els.lower4hChart.clientHeight);
        ltf4hChart.timeScale().fitContent();
        ltf4hChart.timeScale().subscribeVisibleTimeRangeChange(()=>{ try { schedule4hFvgOverlayRedraw(candles); } catch(err){ console.error('4H FVG overlay redraw failed', err); } });
        try { render4hFvgSummaryAndOverlay(candles); } catch(err){ console.error('4H FVG overlay redraw failed', err); }
        requestAnimationFrame(()=>{ try { schedule4hFvgOverlayRedraw(candles); } catch(err){ console.error('4H FVG overlay redraw failed', err); } });
        setTimeout(()=>{ try { schedule4hFvgOverlayRedraw(candles); } catch(err){ console.error('4H FVG overlay redraw failed', err); } },50);
        console.log('4H overlay exists:', !!document.getElementById('lower4hFvgOverlay'));
      }
    }
    catch(e){ console.error('4H chart render failed:', e); toggleLtfError(els.lower4hError,'4H chart unavailable.'); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='FVG overlay unavailable'; }
  } else { toggleLtfError(els.lower4hError,'4H chart unavailable.'); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='4H data unavailable.'; if(els.lower4hStructure) els.lower4hStructure.textContent='4H Structure: 4H data unavailable.'; if(els.lower4hReaction) els.lower4hReaction.textContent='4H Reaction: 4H data unavailable.'; }
  if(h1.status==='fulfilled'){
    try {
      const candles=mapKlinesToCandles(h1.value, hasRange ? undefined : limit1h);
      console.log('1H candles length:', candles.length);
      console.log('Sample 1H candle:', candles[0]);
      if(!candles.length) { toggleLtfError(els.lower1hError,'No 1H candles found for selected range.'); }
      else {
        const r1=renderSingleLtfChart(els.lower1hChart,candles,280);
        ltf1hChart=r1.chart; ltf1hSeries=r1.series;
        ltf1hChart.resize(els.lower1hChart.clientWidth, els.lower1hChart.clientHeight);
        ltf1hChart.timeScale().fitContent();
        try { render1hSweepSummary(candles); } catch(err){ console.error("1H sweep render failed:", err); }
        try { render1hStructureSummary(candles); } catch(err){ console.error("1H structure render failed:", err); }
        try { render1hEventMarkers(candles); } catch(err){ console.error("1H event marker render failed:", err); }
        renderLowerTfReactionSummary();
        renderMtfSummary();
      }
    }
    catch(e){ console.error('1H chart render failed:', e); toggleLtfError(els.lower1hError,'1H chart unavailable.'); if(els.lower1hSweepSummary) els.lower1hSweepSummary.textContent='1H liquidity sweep unavailable.'; if(els.lower1hStructureSummary) els.lower1hStructureSummary.textContent='1H structure unavailable'; }
  } else { toggleLtfError(els.lower1hError,'1H chart unavailable.'); if(els.lower1hSweepSummary) els.lower1hSweepSummary.textContent='1H data unavailable.'; if(els.lower1hStructureSummary) els.lower1hStructureSummary.textContent='1H structure unavailable'; }
  render4hVsWeeklyFvgSummary();
}

function render4hVsWeeklyFvgSummary(){
  if(!els.right4hFvgType) return;
  try {
    if(!activeFvgZonesForOverlay.length){
      els.right4hFvgType.textContent='No active Weekly FVG zone detected.';
      els.right4hFvgZone.textContent='Zone: —';
      els.right4hFvgRelation.textContent='Relation: —';
      els.right4hFvgDistance.textContent='Distance: —';
      els.right4hFvgStatus.textContent='—';
      return;
    }
    if(!ltf4hChart){
      els.right4hFvgType.textContent='4H data unavailable.';
      return;
    }
    // reuse last loaded 4H candles via chart series data snapshot isn't accessible; fetch latest 4H quick
    fetchLtfKlines('4h', null, null, 1).then((rows)=>{
      const c = mapKlinesToCandles(rows, 1)[0];
      if(!c){ els.right4hFvgType.textContent='4H data unavailable.'; return; }
      const price = c.close;
      const nearest = activeFvgZonesForOverlay
        .map((f)=>{
          const inside = price >= f.lower && price <= f.upper;
          const nearestBoundary = price > f.upper ? f.upper : f.lower;
          const dist = inside ? 0 : Math.abs(price-nearestBoundary)/price*100;
          return { f, inside, dist };
        })
        .sort((a,b)=>a.dist-b.dist)[0];
      const rel = nearest.inside ? 'Inside Weekly FVG' : (price > nearest.f.upper ? 'Above Weekly FVG' : 'Below Weekly FVG');
      const prox = nearest.dist===0 ? 'Inside Zone' : nearest.dist<=1 ? 'Very Near' : nearest.dist<=3 ? 'Near' : 'Far';
      els.right4hFvgType.textContent = nearest.f.type;
      els.right4hFvgZone.textContent = `Zone: ${usd(nearest.f.lower)}–${usd(nearest.f.upper)}`;
      els.right4hFvgRelation.textContent = `Relation: ${rel}`;
      els.right4hFvgDistance.textContent = `Distance: ${nearest.dist===0?'0%':f1(nearest.dist)+'%'}`;
      els.right4hFvgStatus.textContent = nearest.inside ? '4H price is inside an active Weekly FVG zone.' : (prox==='Far' ? '4H price is far from active Weekly FVG zones.' : '4H price is near an active Weekly FVG zone.');
    }).catch(()=>{ els.right4hFvgType.textContent='4H data unavailable.'; });
  } catch (e) { console.error('4H vs Weekly FVG summary failed', e); }
}



function find4hSwings(candles){
  const highs=[], lows=[];
  for(let i=2;i<candles.length-2;i++){
    const c=candles[i];
    if(c.high>candles[i-1].high&&c.high>candles[i-2].high&&c.high>candles[i+1].high&&c.high>candles[i+2].high) highs.push({index:i,price:c.high,time:c.time});
    if(c.low<candles[i-1].low&&c.low<candles[i-2].low&&c.low<candles[i+1].low&&c.low<candles[i+2].low) lows.push({index:i,price:c.low,time:c.time});
  }
  return {highs,lows};
}
function detect4hStructure(candles){
  const latest=candles[candles.length-1];
  const {highs,lows}=find4hSwings(candles);
  const sh=highs[highs.length-1], sl=lows[lows.length-1];
  let status='No clear 4H structure shift', broken=null, ref='—';
  const bearishTrend = lows.length>=2 && lows[lows.length-1].price<lows[lows.length-2].price;
  const bullishTrend = highs.length>=2 && highs[highs.length-1].price>highs[highs.length-2].price;
  if(sh && latest.close>sh.price){ status = bearishTrend ? 'Bullish CHoCH' : 'Bullish BOS'; broken=sh.price; ref=String(sh.time); }
  else if(sl && latest.close<sl.price){ status = bullishTrend ? 'Bearish CHoCH' : 'Bearish BOS'; broken=sl.price; ref=String(sl.time); }
  return {status, broken, ref, latestClose: latest.close};
}

function scan4hFvg(candles){
  const fvgs=[];
  for(let i=2;i<candles.length;i++){
    const a=candles[i-2], c=candles[i];
    if(c.low>a.high){
      const lower=a.high, upper=c.low;
      fvgs.push({type:'Bullish 4H FVG', index:i, startTime:a.time, endTime:c.time, lower, upper, midpoint:(lower+upper)/2, sizePercent:((upper-lower)/((lower+upper)/2))*100});
    }
    if(c.high<a.low){
      const lower=c.high, upper=a.low;
      fvgs.push({type:'Bearish 4H FVG', index:i, startTime:a.time, endTime:c.time, lower, upper, midpoint:(lower+upper)/2, sizePercent:((upper-lower)/((lower+upper)/2))*100});
    }
  }
  return fvgs.map(f=>({ ...f, status:get4hFvgStatus(f,candles) }));
}
function get4hFvgStatus(fvg,candles){
  const after=candles.slice(fvg.index+1);
  if(fvg.type==='Bullish 4H FVG'){
    if(after.some(c=>c.low<=fvg.lower)) return 'Filled';
    if(after.some(c=>c.low<fvg.upper && c.low>fvg.lower)) return 'Partially Filled';
    return 'Unfilled';
  }
  if(after.some(c=>c.high>=fvg.upper)) return 'Filled';
  if(after.some(c=>c.high>fvg.lower && c.high<fvg.upper)) return 'Partially Filled';
  return 'Unfilled';
}
function ensure4hFvgLayer(){
  if(els.lower4hFvgOverlay) { ltf4hFvgLayer = els.lower4hFvgOverlay; return ltf4hFvgLayer; }
  return null;
}
function clear4hFvgOverlay(){
  console.log("4H FVG overlays before clear:", current4hFvgOverlays.length);
  console.log("4H FVG price lines before clear:", current4hFvgPriceLines.length);
  current4hFvgOverlays.forEach((el)=>{ try { el.remove(); } catch(_){} });
  current4hFvgOverlays=[];
  current4hFvgPriceLines.forEach((line)=>{ try { ltf4hSeries?.removePriceLine(line); } catch(_){} });
  current4hFvgPriceLines=[];
  const overlay = document.getElementById("lower4hFvgOverlay");
  if(overlay) overlay.innerHTML='';
}
function selectClean4hFvgs(activeFvgs, currentPrice, maxZones=2){
  const sorted=[...activeFvgs].sort((a,b)=>Math.abs(a.distance)-Math.abs(b.distance) || ((a.status==='Unfilled'?0:1)-(b.status==='Unfilled'?0:1)) || b.index-a.index);
  const selected=[];
  for(const z of sorted){
    const tooClose = selected.some((s)=>{
      const overlap = !(z.upper < s.lower || z.lower > s.upper);
      const gap = z.upper < s.lower ? (s.lower-z.upper) : (z.lower > s.upper ? (z.lower-s.upper) : 0);
      const near = currentPrice>0 ? (gap/currentPrice)*100 < 0.5 : false;
      return overlap || near;
    });
    if(!tooClose) selected.push(z);
    if(selected.length>=maxZones) break;
  }
  return selected;
}

function renderClean4hFvgOverlay({ chart, series, container, overlayLayer, candles, activeFvgs, maxZones = 2 }){
  if(!chart || !series || !container || !overlayLayer) return { selected: [], visualMode: 'Failed' };
  clear4hFvgOverlay();
  const currentPrice=candles?.[candles.length-1]?.close||0;
  const selected4hFvgs=selectClean4hFvgs(activeFvgs,currentPrice,maxZones);
  const lastTime=candles?.[candles.length-1]?.time;
  const rightLimit=Math.max(1, container.clientWidth-40);
  const MIN_ZONE_HEIGHT=10;
  let filledCount=0, fallbackCount=0;

  console.log('4H active FVGs:', activeFvgs);
  console.log('4H selected FVGs:', selected4hFvgs);
  console.log('Overlay layer size:', overlayLayer.clientWidth, overlayLayer.clientHeight);
  console.log('4H chart container size:', container.clientWidth, container.clientHeight);

  selected4hFvgs.forEach((f)=>{
    const bull=f.type==='Bullish 4H FVG';
    const x1=chart.timeScale().timeToCoordinate(f.startTime);
    const x2=chart.timeScale().timeToCoordinate(lastTime);
    const y1=series.priceToCoordinate(f.upper);
    const y2=series.priceToCoordinate(f.lower);
    console.log('FVG coordinates:', { x1, x2, y1, y2 });

    if(x1==null || x2==null || y1==null || y2==null){
      console.log('4H FVG overlay coordinate skip:', {x1,x2,y1,y2});
      try {
        const lineCol=bull?'rgba(34,197,94,0.55)':'rgba(239,68,68,0.55)';
        const up=series.createPriceLine({price:f.upper,color:lineCol,lineWidth:1,lineStyle:2,axisLabelVisible:false});
        const low=series.createPriceLine({price:f.lower,color:lineCol,lineWidth:1,lineStyle:2,axisLabelVisible:false});
        current4hFvgPriceLines.push(up,low);
        fallbackCount += 1;
      } catch(_) {}
      return;
    }

    const left=Math.max(0, Math.min(x1,x2));
    const width=Math.max(1, Math.min(Math.abs(x2-x1), rightLimit-left));
    const center=(y1+y2)/2;
    const height=Math.max(MIN_ZONE_HEIGHT, Math.abs(y2-y1));
    const top=Math.max(0, center-(height/2));
    const r=document.createElement('div');
    r.className=`fvg-zone ${bull?'bullish':'bearish'}`;
    r.style.left=`${left}px`; r.style.top=`${top}px`; r.style.width=`${width}px`; r.style.height=`${height}px`;
    r.style.background=bull?'rgba(34, 197, 94, 0.22)':'rgba(239, 68, 68, 0.22)';
    r.style.borderColor=bull?'rgba(34, 197, 94, 0.80)':'rgba(239, 68, 68, 0.80)';
    overlayLayer.appendChild(r);
    current4hFvgOverlays.push(r);
    filledCount += 1;
  });

  const visualMode = filledCount>0 ? 'Filled Zones' : (fallbackCount>0 ? 'Boundary Lines' : 'Failed');
  console.log('FVG visual mode:', visualMode);
  console.log('4H FVG active total:', activeFvgs.length);
  console.log('4H FVG selected for chart:', selected4hFvgs.length);
  console.log('4H FVG overlay layer children:', overlayLayer.children.length);
  console.log('Sample FVG:', selected4hFvgs[0]);
  return { selected: selected4hFvgs, visualMode };
}


function schedule4hFvgOverlayRedraw(candles){
  if(fvgRedrawPending) return;
  fvgRedrawPending=true;
  requestAnimationFrame(()=>{
    fvgRedrawPending=false;
    try {
      const layer=ensure4hFvgLayer();
      if(!layer) return;
      renderClean4hFvgOverlay({ chart: ltf4hChart, series: ltf4hSeries, container: els.lower4hChart, overlayLayer: layer, candles, activeFvgs: active4hFvgs, maxZones: 2 });
    } catch(error){
      console.error('Clean 4H FVG overlay failed:', error);
      if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='FVG overlay unavailable';
    }
  });
}


function render4hFvgSummaryAndOverlay(candles){
  try {
    latest4hCandles = candles;
    if(!ltf4hChart || !ltf4hSeries){ if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='4H FVG: 4H data unavailable.'; return; }
    clear4hFvgOverlay();
    const current=candles[candles.length-1]?.close;
    active4hFvgs = scan4hFvg(candles).filter(f=>f.status!=='Filled').map(f=>{
      const inside = current>=f.lower && current<=f.upper;
      const nearest = current>f.upper?f.upper:f.lower;
      const distance = inside?0:Math.abs(current-nearest)/current*100;
      return { ...f, distance };
    }).sort((a,b)=>Math.abs(a.distance)-Math.abs(b.distance) || ((a.status==='Unfilled'?0:1)-(b.status==='Unfilled'?0:1)) || b.index-a.index);
    const structure = detect4hStructure(candles);
    latest4hStructureStatus = structure.status;
    if(els.lower4hStructure) els.lower4hStructure.textContent = `4H Structure | Status: ${structure.status} | Broken: ${structure.broken?usd(structure.broken):'—'} | Latest Close: ${usd(structure.latestClose)}`;
    if(!active4hFvgs.length){ mtfState.h4Structure = structure.status; mtfState.h4FvgNearest = null; if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='No signal detected (4H FVG).'; if(els.lower4hReaction) els.lower4hReaction.textContent='4H Reaction: No active Weekly FVG zone detected.'; renderLowerTfReactionSummary(); renderMtfSummary(); return; }
    const nearest = active4hFvgs[0];
    mtfState.h4Structure = structure.status;
    mtfState.h4FvgNearest = nearest ? nearest.type : null;
    const layer=ensure4hFvgLayer();
    const visual = layer ? renderClean4hFvgOverlay({ chart: ltf4hChart, series: ltf4hSeries, container: els.lower4hChart, overlayLayer: layer, candles, activeFvgs: active4hFvgs, maxZones: 2 }) : { selected: [], visualMode: "Failed" };
    if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent=`4H FVG | Active: ${active4hFvgs.length} | Shown: ${visual.selected.length} | Nearest: ${nearest.type} | Distance: ${nearest.distance===0?'0%':f1(nearest.distance)+'%'} | Status: ${nearest.status} | Visual: ${visual.visualMode}`;
    const relation = nearest.distance===0 ? 'Inside' : (nearest.distance<=3 ? 'Near' : 'Far');
    if(els.lower4hReaction) els.lower4hReaction.textContent = `4H Reaction | Weekly FVG Relation: ${relation} | 4H FVG Active: ${active4hFvgs.length} | 4H Structure: ${structure.status}`;
    renderLowerTfReactionSummary();
  } catch(e){ console.error('Clean 4H FVG overlay failed:', e); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='FVG overlay unavailable'; if(els.lower4hStructure) els.lower4hStructure.textContent='4H Structure: unavailable.'; if(els.lower4hReaction) els.lower4hReaction.textContent='4H Reaction: unavailable.'; }
}



function detect1hStructure(candles){
  const {highs,lows}=find4hSwings(candles);
  const latest=candles[candles.length-1];
  const sh=highs[highs.length-1], sl=lows[lows.length-1];
  const bearishTrend = lows.length>=2 && lows[lows.length-1].price<lows[lows.length-2].price;
  const bullishTrend = highs.length>=2 && highs[highs.length-1].price>highs[highs.length-2].price;
  let status='No clear 1H structure shift', broken=null, ref='—';
  if(sh && latest.close>sh.price){ status=bearishTrend?'Bullish CHoCH':'Bullish BOS'; broken=sh.price; ref=String(sh.time); }
  else if(sl && latest.close<sl.price){ status=bullishTrend?'Bearish CHoCH':'Bearish BOS'; broken=sl.price; ref=String(sl.time); }
  return {status, broken, ref, latestClose: latest.close};
}

function render1hEventMarkers(candles){
  if(!ltf1hSeries || !Array.isArray(candles) || !candles.length) return;
  const markers=[];
  const sweep=detect1hLiquiditySweep(candles);
  if(sweep && sweep.status && sweep.status!=='No recent sweep'){
    if(sweep.time==null){
      console.warn('1H sweep marker skipped: missing time');
    } else {
      const bullish=sweep.status.includes('Bullish');
      markers.push({
        time: sweep.time,
        position: bullish ? 'belowBar' : 'aboveBar',
        color: bullish ? '#22c55e' : '#ef4444',
        shape: bullish ? 'arrowUp' : 'arrowDown',
        text: sweep.status,
      });
    }
  }

  const st=detect1hStructure(candles);
  if(st && st.status && st.status!=='No clear 1H structure shift'){
    const latestCandle=candles[candles.length-1];
    const bullish=st.status.includes('Bullish');
    markers.push({
      time: latestCandle.time,
      position: bullish ? 'belowBar' : 'aboveBar',
      color: bullish ? '#22c55e' : '#ef4444',
      shape: bullish ? 'arrowUp' : 'arrowDown',
      text: st.status,
    });
  }

  if(typeof ltf1hSeries.setMarkers==='function'){
    ltf1hSeries.setMarkers(markers);
  } else if(typeof ltf1hSeries.createSeriesMarkers==='function') {
    ltf1hSeries.createSeriesMarkers(markers);
  }
}
function render1hStructureSummary(candles){
  try {
    const st=detect1hStructure(candles);
    latest1hStructureStatus = st.status;
    mtfState.h1Structure = st.status;
    if(els.lower1hStructureSummary) els.lower1hStructureSummary.textContent=`1H Structure | Status: ${st.status} | Broken Level: ${st.broken?usd(st.broken):'—'} | Reference Swing: ${st.ref} | Latest Close: ${usd(st.latestClose)}`;
  } catch(e){
    console.error('1H structure scanner failed', e);
    latest1hStructureStatus = '1H structure unavailable';
    if(els.lower1hStructureSummary) els.lower1hStructureSummary.textContent='1H structure unavailable';
  }
}

function detect1hLiquiditySweep(candles){
  const swingsH=[], swingsL=[];
  for(let i=2;i<candles.length-2;i++){
    const c=candles[i];
    if(c.high>candles[i-1].high&&c.high>candles[i-2].high&&c.high>candles[i+1].high&&c.high>candles[i+2].high) swingsH.push({price:c.high,time:c.time,index:i});
    if(c.low<candles[i-1].low&&c.low<candles[i-2].low&&c.low<candles[i+1].low&&c.low<candles[i+2].low) swingsL.push({price:c.low,time:c.time,index:i});
  }
  const start=Math.max(0,candles.length-20);
  let found=null;
  for(let i=start;i<candles.length;i++){
    const c=candles[i];
    const lowRef=[...swingsL].reverse().find(s=>s.index<i);
    if(lowRef && c.low<lowRef.price && c.close>lowRef.price) found={status:'Bullish Sweep', level:lowRef.price, time:c.time, close:c.close};
    const highRef=[...swingsH].reverse().find(s=>s.index<i);
    if(highRef && c.high>highRef.price && c.close<highRef.price) found={status:'Bearish Sweep', level:highRef.price, time:c.time, close:c.close};
    if(found) break;
  }
  if(!found) return {status:'No recent sweep'};
  const dist=Math.abs(found.close-found.level)/found.close*100;
  return {...found, distance:dist};
}
function render1hSweepSummary(candles){
  try{
    const sweep=detect1hLiquiditySweep(candles);
    latest1hSweepStatus = sweep.status;
    mtfState.h1Sweep = sweep.status;
    if(!els.lower1hSweepSummary) return;
    if(sweep.status==='No recent sweep'){ els.lower1hSweepSummary.textContent='No signal detected (1H liquidity sweep).'; return; }
    els.lower1hSweepSummary.textContent=`1H Liquidity Sweep | Status: ${sweep.status} | Swept Level: ${usd(sweep.level)} | Candle Time: ${sweep.time} | Distance: ${f1(sweep.distance)}%`;
  }catch(e){ console.error('1H sweep scanner failed',e); if(els.lower1hSweepSummary) els.lower1hSweepSummary.textContent='1H liquidity sweep unavailable.'; }
}
function renderLowerTfReactionSummary(){
  if(!els.lowerTfReactionSummary) return;
  const nearest = active4hFvgs[0];
  const fvgTxt = nearest ? `${nearest.type} (${nearest.status})` : 'No active 4H FVG';
  els.lowerTfReactionSummary.textContent = `Lower TF: 4H ${latest4hStructureStatus} · FVG ${fvgTxt} · 1H Sweep ${latest1hSweepStatus} · 1H ${latest1hStructureStatus}`;
}


function getStatusBadgeClass(status){
  const s=(status||'').toLowerCase();
  if(s.includes('aligned')) return 'status-aligned';
  if(s.includes('constructive')) return 'status-constructive';
  if(s.includes('mixed')) return 'status-mixed';
  if(s.includes('conflicting')) return 'status-conflicting';
  if(s.includes('waiting')) return 'status-waiting';
  if(s.includes('unavailable')) return 'status-unavailable';
  return 'status-waiting';
}

function renderMtfSummary(){
  try {
    if(!els.mtfWeeklyBias || !els.mtf4hReaction || !els.mtf1hTiming || !els.mtfFinalStatus) return;
    const wb = mtfState.weeklyDirection || 'Waiting for complete data';
    const h4 = mtfState.h4Structure ? `${mtfState.h4Structure}${mtfState.h4FvgNearest ? ` · ${mtfState.h4FvgNearest}` : ''}` : 'Waiting for complete data';
    const h1 = mtfState.h1Structure ? `${mtfState.h1Structure}${mtfState.h1Sweep ? ` · ${mtfState.h1Sweep}` : ''}` : 'Waiting for complete data';

    const weeklyBull = /Rising|Improving|Strength|Aligned|Bullish/.test(`${mtfState.weeklyDirection||''} ${mtfState.weeklyPhase||''} ${mtfState.weeklyDivergence||''}`);
    const weeklyBear = /Weakening|Cooling|Bearish/.test(`${mtfState.weeklyDirection||''} ${mtfState.weeklyPhase||''} ${mtfState.weeklyDivergence||''}`);
    const h4Bull = /Bullish|Rising|Near|Inside/.test(`${mtfState.h4Structure||''} ${mtfState.h4FvgNearest||''}`);
    const h4Bear = /Bearish|Weakening/.test(`${mtfState.h4Structure||''}`);
    const h1Bull = /Bullish/.test(`${mtfState.h1Structure||''} ${mtfState.h1Sweep||''}`);
    const h1Bear = /Bearish/.test(`${mtfState.h1Structure||''} ${mtfState.h1Sweep||''}`);

    let finalStatus = 'Mixed';
    if((weeklyBull && h4Bull && h1Bull) || (weeklyBear && h4Bear && h1Bear)) finalStatus = 'Aligned';
    else if((weeklyBull||!weeklyBear) && (h4Bull||h1Bull)) finalStatus = 'Constructive';
    else if((weeklyBull && (h4Bear||h1Bear)) || (weeklyBear && (h4Bull||h1Bull))) finalStatus = 'Conflicting';

    if(wb==='Waiting for complete data' || h4==='Waiting for complete data' || h1==='Waiting for complete data') finalStatus='Waiting for complete data';

    els.mtfWeeklyBias.textContent = `Weekly Bias: ${wb}`;
    els.mtf4hReaction.textContent = `4H Reaction: ${h4}`;
    els.mtf1hTiming.textContent = `1H Timing: ${h1}`;
    els.mtfFinalStatus.innerHTML = `Final Status: <span class="status-badge ${getStatusBadgeClass(finalStatus)}">${finalStatus}</span>`;
  } catch (e){
    if(els.mtfFinalStatus) els.mtfFinalStatus.innerHTML = 'Final Status: <span class="status-badge status-unavailable">Unavailable</span>'; 
  }
}


async function loadVersionMeta(){
  try {
    const res = await fetch(`version.json?ts=${Date.now()}`, { cache: "no-store" });
    if(!res.ok) throw new Error(`Version metadata request failed: ${res.status}`);
    const meta = await res.json();
    const v = typeof meta?.lastUpdated === 'string' ? meta.lastUpdated.trim() : '';
    if(els.appLastUpdated){
      els.appLastUpdated.textContent = v ? `Last Updated: ${v}` : `Last Updated: ${APP_LAST_UPDATED || 'unavailable'}`;
    }
  } catch (error) {
    console.error('Version metadata load failed:', error);
    if(els.appLastUpdated){
      els.appLastUpdated.textContent = APP_LAST_UPDATED
        ? `Last Updated: ${APP_LAST_UPDATED}`
        : 'Last Updated: unavailable';
    }
  }
}

function setLoading(){
  if(els.appLastUpdated) els.appLastUpdated.textContent = "Last Updated: loading...";
  if(els.dataRefreshed) els.dataRefreshed.textContent = "Data Refreshed: loading...";
  els.statusText.textContent="Loading BTC ticker, weekly RSI, and market context...";
  els.btcPrice.textContent="—"; els.btc24hInline.textContent="24h: —"; els.btc24hInline.className="meta"; els.btcPriceMeta.textContent="Loading...";
  els.rsiCurrent.textContent="—"; els.rsiStatus.textContent="Loading..."; els.rsiRegime.textContent="Regime: —";
  els.rsiChangeLines.textContent="4W: — · 12W: — · 24W: — · 48W: —"; els.rsiRefs.textContent="W0: — | W-4: — | W-12: — | W-24: — | W-48: —";
  els.rsiSlope.textContent="RSI Slope 48W: — / week"; els.direction.textContent="—"; els.momentumPhase.textContent="—";
  els.analyticsStrip.textContent="RSI analytics loading..."; els.priceMetrics.textContent="Price/RSI comparison loading...";
  els.divergenceStatus.textContent="Divergence Status: —"; els.divergenceText.textContent="Loading divergence context...";
  els.biasScannerList.innerHTML='<div class="scanner-row">Loading scanner results...</div>';
  if(els.fvgList) els.fvgList.innerHTML='<div class="scanner-row">Loading weekly FVG zones...</div>';
  if(els.leftRsiValue) els.leftRsiValue.textContent="loading";
  if(els.leftRsiRegime) els.leftRsiRegime.textContent="loading";
  if(els.leftDistance50) els.leftDistance50.textContent="loading";
  if(els.leftSlopes) els.leftSlopes.textContent="loading";
  if(els.leftDirection) els.leftDirection.textContent="loading";
  if(els.leftPhase) els.leftPhase.textContent="loading";
  if(els.leftChanges) els.leftChanges.textContent="loading";
  if(els.leftFearGreed) els.leftFearGreed.textContent="Fear & Greed: loading";
  if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent="4H FVG: loading";
  if(els.lower4hStructure) els.lower4hStructure.textContent="4H Structure: loading";
  if(els.lower4hReaction) els.lower4hReaction.textContent="4H Reaction: loading";
  if(els.lower1hSweepSummary) els.lower1hSweepSummary.textContent="1H Liquidity Sweep: loading";
  if(els.lower1hStructureSummary) els.lower1hStructureSummary.textContent="1H Structure: loading";
  if(els.lowerTfReactionSummary) els.lowerTfReactionSummary.textContent="Lower TF Reaction: loading";
  if(els.right4hFvgType) els.right4hFvgType.textContent='loading';
  if(els.rightFvgCount) els.rightFvgCount.textContent="Active FVG: loading";
  if(els.rightNearestFvg) els.rightNearestFvg.textContent="Nearest: loading";
  if(els.rightFvgStatus) els.rightFvgStatus.textContent="Status: loading";
  if(els.rightBiasTop) els.rightBiasTop.textContent="Top Bias: loading";
  if(els.rightBiasMeta) els.rightBiasMeta.textContent="Confidence: loading";
  if(els.rightDivergence) els.rightDivergence.textContent="loading";
  if(els.rightDivergenceMeta) els.rightDivergenceMeta.textContent="loading";
  if(els.mtfWeeklyBias) els.mtfWeeklyBias.textContent="Weekly Bias: waiting";
  if(els.mtf4hReaction) els.mtf4hReaction.textContent="4H Reaction: waiting";
  if(els.mtf1hTiming) els.mtf1hTiming.textContent="1H Timing: waiting";
  if(els.mtfFinalStatus) els.mtfFinalStatus.innerHTML='Final Status: <span class="status-badge status-waiting">Waiting</span>';
  togglePriceChartError(""); toggleRsiChartError("");
  clearFvgOverlay();
}

function renderTicker(t){
  const p=Number(t.lastPrice), ch=Number(t.priceChangePercent);
  if(!Number.isFinite(p)||!Number.isFinite(ch)) throw new Error("Ticker unavailable.");
  els.btcPrice.textContent=usd(p);
  els.btc24hInline.textContent=`24h: ${ch>=0?"+":""}${ch.toFixed(1)}%`;
  els.btc24hInline.className=`meta ${ch>0?"pos":ch<0?"neg":"neu"}`;
  els.btcPriceMeta.textContent="BTCUSDT 24h ticker";
}

async function loadDashboard(){
  setLoading();
  els.refreshBtn.disabled=true;

  const [tickerRes, klinesRes, fgRes] = await Promise.allSettled([fetchBtcTicker(), fetchWeeklyKlines(), fetchJson(FEAR_GREED_URL)]);

  let tickerOk=false, weeklyOk=false;
  if(tickerRes.status === "fulfilled"){
    try { renderTicker(tickerRes.value); tickerOk = true; }
    catch { els.btcPriceMeta.textContent = "Ticker unavailable."; }
  } else {
    els.btcPriceMeta.textContent = "Ticker unavailable.";
  }

  if(klinesRes.status === "fulfilled"){
    try {
      const dataset = buildWeeklyDataset(klinesRes.value);
      const metrics = renderSummaryCards(dataset);
      renderDivergenceStatus(dataset, metrics);
      renderPotentialBiasScanner(dataset, metrics);
      const activeFvgs = renderFvgPanel(dataset);
      renderMtfSummary();
      weeklyOk = true;

      try { renderPriceChart(dataset); togglePriceChartError(""); renderFvgOverlay(activeFvgs, dataset); }
      catch (error) { console.error("Price chart render failed:", error); togglePriceChartError("Chart unavailable, but data is still loaded."); }

      try { renderRsiChart(dataset); toggleRsiChartError(""); }
      catch (error) { console.error("RSI chart render failed:", error); toggleRsiChartError("Chart unavailable, but data is still loaded."); }

    } catch (error) {
      console.error("Weekly pipeline failed:", error);
      els.rsiStatus.textContent = "Weekly Binance data unavailable.";
      els.analyticsStrip.textContent = "Weekly Binance data unavailable.";
      els.divergenceStatus.textContent = "Divergence Status: unavailable";
      els.divergenceText.textContent = "Weekly Binance data unavailable.";
      els.biasScannerList.innerHTML='<div class="scanner-row">Scanner unavailable until weekly data loads.</div>';
    if(els.fvgList) els.fvgList.innerHTML='<div class="scanner-row">FVG section unavailable.</div>';
    if(els.rightFvgCount) els.rightFvgCount.textContent='Active FVG: unavailable';
    if(els.rightNearestFvg) els.rightNearestFvg.textContent='Nearest: unavailable';
    if(els.rightFvgStatus) els.rightFvgStatus.textContent='Status: unavailable';
    if(els.rightBiasTop) els.rightBiasTop.textContent='Top Bias: unavailable';
    if(els.rightBiasMeta) els.rightBiasMeta.textContent='Confidence: unavailable';
    if(els.rightDivergence) els.rightDivergence.textContent='unavailable';
    if(els.rightDivergenceMeta) els.rightDivergenceMeta.textContent='unavailable';
    if(els.mtfFinalStatus) els.mtfFinalStatus.innerHTML='Final Status: <span class="status-badge status-waiting">Waiting</span>'; 
    clearFvgOverlay();
    }
  } else {
    els.rsiStatus.textContent = "Weekly Binance data unavailable.";
    els.analyticsStrip.textContent = "Weekly Binance data unavailable.";
    els.divergenceStatus.textContent = "Divergence Status: unavailable";
    els.divergenceText.textContent = "Weekly Binance data unavailable.";
    els.biasScannerList.innerHTML='<div class="scanner-row">Scanner unavailable until weekly data loads.</div>';
  }

  if(fgRes.status === "fulfilled") renderFearGreed(fgRes.value);
  else { if(els.leftFearGreed) els.leftFearGreed.textContent="Fear & Greed: unavailable"; }

  if(els.dataRefreshed) els.dataRefreshed.textContent = `Data Refreshed: ${new Date().toLocaleString()}`;

  els.statusText.textContent = tickerOk && weeklyOk
    ? `Monitoring BTC weekly momentum and direction. Last update: ${new Date().toLocaleTimeString()}`
    : (tickerOk || weeklyOk)
      ? "Partial update loaded. One source is currently unavailable."
      : "Unable to load BTC weekly monitor sources right now";

  els.refreshBtn.disabled=false;
}

els.refreshBtn.addEventListener("click", loadDashboard);
loadVersionMeta();
loadDashboard();

setupCollapsibleSections();

window.addEventListener("resize", ()=>{
  if(ltf4hChart && els.lower4hChart) ltf4hChart.resize(els.lower4hChart.clientWidth, els.lower4hChart.clientHeight);
  if(ltf1hChart && els.lower1hChart) ltf1hChart.resize(els.lower1hChart.clientWidth, els.lower1hChart.clientHeight);
  if(ltf4hChart) { schedule4hFvgOverlayRedraw(latest4hCandles); renderLowerTfReactionSummary(); }
});
