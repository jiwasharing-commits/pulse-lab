const BTC_TICKER_URL = "https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT";
const BTC_WEEKLY_KLINE_URL = "https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120";
const FEAR_GREED_URL = "https://api.alternative.me/fng/?limit=1";
const RSI_PERIOD = 14;
const RSI_WINDOW = 49;
// IMPORTANT:
// Update APP_LAST_UPDATED every time the app code is modified or deployed.
// This value represents app/code update time, not live API refresh time.
const APP_LAST_UPDATED = "2026-05-28 14:05";

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
  right4hFvgType: document.getElementById("right4hFvgType"), right4hFvgZone: document.getElementById("right4hFvgZone"), right4hFvgRelation: document.getElementById("right4hFvgRelation"), right4hFvgDistance: document.getElementById("right4hFvgDistance"), right4hFvgStatus: document.getElementById("right4hFvgStatus"), mtfWeeklyBias: document.getElementById("mtfWeeklyBias"), mtf4hReaction: document.getElementById("mtf4hReaction"), mtf1hTiming: document.getElementById("mtf1hTiming"), mtfFinalStatus: document.getElementById("mtfFinalStatus"), weeklyCandleW1: document.getElementById("weeklyCandleW1"), weeklyCandleW2: document.getElementById("weeklyCandleW2"), weeklyCandleW3: document.getElementById("weeklyCandleW3"), weeklyCandleReading: document.getElementById("weeklyCandleReading"), weeklyCandleCondition: document.getElementById("weeklyCandleCondition"), weeklySrResistanceZone: document.getElementById("weeklySrResistanceZone"), weeklySrResistanceMeta: document.getElementById("weeklySrResistanceMeta"), weeklySrSupportZone: document.getElementById("weeklySrSupportZone"), weeklySrSupportMeta: document.getElementById("weeklySrSupportMeta"), weeklySrMeaning: document.getElementById("weeklySrMeaning"), prepUpsideRows: document.getElementById("prepUpsideRows"), prepCurrentRow: document.getElementById("prepCurrentRow"), prepDownsideRows: document.getElementById("prepDownsideRows"),
  fvgToggleBtn: document.getElementById("fvgToggleBtn"), biasToggleBtn: document.getElementById("biasToggleBtn"), fvgContent: document.getElementById("fvgContent"), biasContent: document.getElementById("biasContent"), fvgViewDetailsBtn: document.getElementById("fvgViewDetailsBtn"), biasViewDetailsBtn: document.getElementById("biasViewDetailsBtn"),
  priceChart: document.getElementById("priceChart"), priceChartError: document.getElementById("priceChartError"), rsiChart: document.getElementById("rsiChart"), rsiChartError: document.getElementById("rsiChartError"),
  ltfPanel: document.getElementById("ltfPanel"), ltfToggleBtn: document.getElementById("ltfToggleBtn"), ltfContent: document.getElementById("ltfContent"),
  ltfStartDate: document.getElementById("ltfStartDate"), ltfEndDate: document.getElementById("ltfEndDate"), ltfApplyBtn: document.getElementById("ltfApplyBtn"), ltfResetBtn: document.getElementById("ltfResetBtn"),
  lower4hChart: document.getElementById("lower4hChart"), lower1hChart: document.getElementById("lower1hChart"), lower4hError: document.getElementById("lower4hError"), lower1hError: document.getElementById("lower1hError"), lower4hFvgSummary: document.getElementById("lower4hFvgSummary"), lower4hStructure: document.getElementById("lower4hStructure"), lower4hReaction: document.getElementById("lower4hReaction"),
  lower1hSweepSummary: document.getElementById("lower1hSweepSummary"), lower1hStructureSummary: document.getElementById("lower1hStructureSummary"), lowerTfReactionSummary: document.getElementById("lowerTfReactionSummary"), lower4hFvgOverlay: document.getElementById("lower4hFvgOverlay"), lower4hSrOverlay: document.getElementById("lower4hSrOverlay"), lower4hSrNearestResistance: document.getElementById("lower4hSrNearestResistance"), lower4hSrStrongestResistance: document.getElementById("lower4hSrStrongestResistance"), lower4hSrNearestSupport: document.getElementById("lower4hSrNearestSupport"), lower4hSrStrongestSupport: document.getElementById("lower4hSrStrongestSupport"), lower4hSrState: document.getElementById("lower4hSrState"),
  ltfDateControls: document.getElementById("ltfDateControls"), ltfPreset1w: document.getElementById("ltfPreset1w"), ltfPreset2w: document.getElementById("ltfPreset2w"), ltfPreset1m: document.getElementById("ltfPreset1m"), ltfPreset3m: document.getElementById("ltfPreset3m"), ltfPresetCustom: document.getElementById("ltfPresetCustom"),
  weeklyAddLineBtn: document.getElementById("weeklyAddLineBtn"), weeklyDrawLineBtn: document.getElementById("weeklyDrawLineBtn"), weeklyDrawTrendlineBtn: document.getElementById("weeklyDrawTrendlineBtn"), weeklyManageLinesBtn: document.getElementById("weeklyManageLinesBtn"), weeklyManageDrawingsBtn: document.getElementById("weeklyManageDrawingsBtn"), h4AddLineBtn: document.getElementById("h4AddLineBtn"), h4DrawLineBtn: document.getElementById("h4DrawLineBtn"), h4DrawTrendlineBtn: document.getElementById("h4DrawTrendlineBtn"), h4ManageLinesBtn: document.getElementById("h4ManageLinesBtn"), h4ManageDrawingsBtn: document.getElementById("h4ManageDrawingsBtn"),
  weeklyTrendlineOverlay: document.getElementById("weeklyTrendlineOverlay"), h4TrendlineOverlay: document.getElementById("h4TrendlineOverlay"),
};

let priceChart = null;
let candleSeries = null;
let rsiChart = null;
let fvgOverlayLines = [];
let fvgOverlayLayer = null;
let activeFvgZonesForOverlay = [];
let weeklyOverlayRightTime = null;
let weeklySrOverlayLayer = null;
let weeklySrSummaryForOverlay = null;
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
let srRedrawPending = false;
let latest4hSrSummary = null;
let latest4hStructureStatus = "No clear 4H structure shift";
let latest1hSweepStatus = "No recent 1H liquidity sweep";
let latest1hStructureStatus = "No clear 1H structure shift";
let activeLowerTfMode = "1M";
let ltfVisible = false;
let ltfPreset = "1m";
let lowerTimeframeLoaded = false;
let fvgOpen=false;
let biasOpen=false;
const MANUAL_LINES_KEY = "pl_manual_chart_lines_v1";
const MANUAL_DRAWINGS_KEY = "pl_manual_chart_drawings_v1";
const MAX_MANUAL_LINES_PER_CHART = 30;
const MAX_MANUAL_DRAWINGS_PER_CHART = 30;
let manualChartLines = { weekly: [], h4: [] };
let manualChartDrawings = { weekly: [], h4: [] };
const manualLineHandles = { weekly: [], h4: [] };
let manualLinePlacement = { active: false, chartKey: null };
let weeklyPlacementHandler = null;
let h4PlacementHandler = null;
let trendlineDrawMode = { active: false, chartKey: null, startPoint: null };
const mtfState = { weeklyDirection: null, weeklyPhase: null, weeklyDivergence: null, topBias: null, h4Structure: null, h4FvgNearest: null, h1Sweep: null, h1Structure: null };
const marketPreparationState = {
  currentPrice: null,
  weekly: { fvgZones: [], srSummary: null },
  h4: { fvgZones: [], srSummary: null, structureStatus: null, rsiStatus: null },
  h1: { sweepStatus: null, structureStatus: null },
  mtf: { finalStatus: null, weeklyBias: null, reaction4h: null, timing1h: null },
  map: { upside: [], downside: [], currentRowText: "● Price unavailable" },
  meta: { lastUpdatedMs: null, sourcesReady: { ticker: false, weekly: false, h4: false, h1: false } },
};

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
function updateMarketPreparationState(partial = {}){
  const merge = (target, source) => Object.entries(source).forEach(([k,v])=>{
    if(v && typeof v === "object" && !Array.isArray(v)){
      target[k] = target[k] && typeof target[k] === "object" && !Array.isArray(target[k]) ? target[k] : {};
      merge(target[k], v);
    } else target[k] = v;
  });
  merge(marketPreparationState, partial);
  marketPreparationState.meta.lastUpdatedMs = Date.now();
}
function loadManualChartLines(){
  try{
    const raw = localStorage.getItem(MANUAL_LINES_KEY);
    if(!raw) return { weekly: [], h4: [] };
    const parsed = JSON.parse(raw);
    return { weekly: Array.isArray(parsed?.weekly) ? parsed.weekly : [], h4: Array.isArray(parsed?.h4) ? parsed.h4 : [] };
  }catch{
    return { weekly: [], h4: [] };
  }
}
function saveManualChartLines(){ try { localStorage.setItem(MANUAL_LINES_KEY, JSON.stringify(manualChartLines)); } catch(_){} }
function loadManualChartDrawings(){
  try{
    const raw = localStorage.getItem(MANUAL_DRAWINGS_KEY);
    if(!raw) return { weekly: [], h4: [] };
    const parsed = JSON.parse(raw);
    return { weekly: Array.isArray(parsed?.weekly) ? parsed.weekly : [], h4: Array.isArray(parsed?.h4) ? parsed.h4 : [] };
  }catch{
    return { weekly: [], h4: [] };
  }
}
function saveManualChartDrawings(){ try { localStorage.setItem(MANUAL_DRAWINGS_KEY, JSON.stringify(manualChartDrawings)); } catch(_){} }
function getManualLines(chartKey){ return Array.isArray(manualChartLines?.[chartKey]) ? manualChartLines[chartKey] : []; }
function getManualDrawings(chartKey){ return Array.isArray(manualChartDrawings?.[chartKey]) ? manualChartDrawings[chartKey] : []; }
function addManualLine(chartKey, lineData){
  if(!manualChartLines[chartKey]) manualChartLines[chartKey] = [];
  if(manualChartLines[chartKey].length >= MAX_MANUAL_LINES_PER_CHART) return false;
  manualChartLines[chartKey].push(lineData);
  saveManualChartLines();
  return true;
}
function deleteManualLine(chartKey, lineId){
  if(!Array.isArray(manualChartLines?.[chartKey])) return;
  manualChartLines[chartKey] = manualChartLines[chartKey].filter((l)=>l.id !== lineId);
  saveManualChartLines();
}
function clearManualLines(chartKey){ manualChartLines[chartKey] = []; saveManualChartLines(); }
function addManualDrawing(chartKey, drawing){
  if(!manualChartDrawings[chartKey]) manualChartDrawings[chartKey] = [];
  if(manualChartDrawings[chartKey].length >= MAX_MANUAL_DRAWINGS_PER_CHART) return false;
  manualChartDrawings[chartKey].push(drawing);
  saveManualChartDrawings();
  return true;
}
function deleteManualDrawing(chartKey, drawingId){
  if(!Array.isArray(manualChartDrawings?.[chartKey])) return;
  manualChartDrawings[chartKey] = manualChartDrawings[chartKey].filter((d)=>d.id !== drawingId);
  saveManualChartDrawings();
}
function clearManualDrawings(chartKey){ manualChartDrawings[chartKey] = []; saveManualChartDrawings(); }
function buildPriceLineOptions(line){
  const byType = {
    "Support": { color: "rgba(56, 189, 248, 0.72)" },
    "Resistance": { color: "rgba(251, 191, 36, 0.72)" },
    "Alert": { color: "rgba(168, 85, 247, 0.70)" },
    "Entry": { color: "rgba(34, 197, 94, 0.72)" },
    "Stop Loss": { color: "rgba(239, 68, 68, 0.72)" },
    "Take Profit": { color: "rgba(20, 184, 166, 0.72)" },
    "Custom": { color: "rgba(148, 163, 184, 0.70)" },
  };
  const style = byType[line.type] || byType.Custom;
  return { price: line.price, lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: `${line.label || line.type || "Line"} (${line.type || "Custom"})`, ...style };
}
function rebuildManualLines(chartKey){
  const series = chartKey === "weekly" ? candleSeries : ltf4hSeries;
  if(!series) return;
  (manualLineHandles[chartKey] || []).forEach((h)=>{ try { series.removePriceLine(h); } catch(_){} });
  manualLineHandles[chartKey] = [];
  getManualLines(chartKey).forEach((line)=>{
    if(!Number.isFinite(Number(line.price))) return;
    try { manualLineHandles[chartKey].push(series.createPriceLine(buildPriceLineOptions(line))); } catch(_){}
  });
}
function applyManualLinesToWeeklyChart(){ rebuildManualLines("weekly"); }
function applyManualLinesTo4hChart(){ rebuildManualLines("h4"); }
function handleAddLine(chartKey){
  try{
    const priceInput = window.prompt("Enter price level (number):", "");
    if(priceInput === null) return;
    const price = Number(priceInput.replace(/,/g,"").trim());
    if(!Number.isFinite(price) || price <= 0){ window.alert("Invalid price."); return; }
    const labelRaw = window.prompt("Enter label:", "Manual Level");
    if(labelRaw === null) return;
    const typeRaw = window.prompt("Type: Support / Resistance / Alert / Entry / Stop Loss / Take Profit / Custom", "Custom");
    if(typeRaw === null) return;
    const validTypes = ["Support","Resistance","Alert","Entry","Stop Loss","Take Profit","Custom"];
    const normalizedType = validTypes.find((t)=>t.toLowerCase()===typeRaw.trim().toLowerCase()) || "Custom";
    const line = { id: `${chartKey}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`, chart: chartKey, price, label: (labelRaw || "Manual Level").trim(), type: normalizedType, createdAt: new Date().toISOString() };
    if(!addManualLine(chartKey, line)){ window.alert(`Maximum ${MAX_MANUAL_LINES_PER_CHART} lines reached for this chart.`); return; }
    rebuildManualLines(chartKey);
  }catch(_){}
}
function handleManageLines(chartKey){
  try{
    const lines = getManualLines(chartKey);
    if(!lines.length){ window.alert("No manual lines on this chart."); return; }
    const list = lines.map((l,i)=>`${i+1}) ${f1(l.price)} | ${l.type} | ${l.label}`).join("\n");
    const cmd = window.prompt(`${list}\n\nCommands:\nd:2 = delete item 2\nclear = clear all\n(cancel = no action)`, "");
    if(!cmd) return;
    const c = cmd.trim().toLowerCase();
    if(c === "clear"){
      if(window.confirm("Clear all manual lines for this chart?")){ clearManualLines(chartKey); rebuildManualLines(chartKey); }
      return;
    }
    if(c.startsWith("d:")){
      const idx = Number(c.split(":")[1]) - 1;
      if(Number.isInteger(idx) && idx >= 0 && idx < lines.length){ deleteManualLine(chartKey, lines[idx].id); rebuildManualLines(chartKey); }
    }
  }catch(_){}
}
function setLinePlacementUiState(chartKey, isActive){
  const btn = chartKey === "weekly" ? els.weeklyDrawLineBtn : els.h4DrawLineBtn;
  if(!btn) return;
  btn.classList.toggle("active-draw", !!isActive);
  btn.textContent = isActive ? "Drawing… Click chart" : "Draw Line";
}
function disableManualLinePlacement(){
  manualLinePlacement = { active: false, chartKey: null };
  setLinePlacementUiState("weekly", false);
  setLinePlacementUiState("h4", false);
}
function normalizeManualLineType(typeRaw){
  const validTypes = ["Support","Resistance","Alert","Entry","Stop Loss","Take Profit","Custom"];
  return validTypes.find((t)=>t.toLowerCase()===(typeRaw||"").trim().toLowerCase()) || "Custom";
}
function promptManualLineMeta(){
  const labelRaw = window.prompt("Enter label:", "Manual Line");
  if(labelRaw === null) return null;
  const typeRaw = window.prompt("Type: Support / Resistance / Alert / Entry / Stop Loss / Take Profit / Custom", "Custom");
  if(typeRaw === null) return null;
  return { label: (labelRaw || "Manual Line").trim(), type: normalizeManualLineType(typeRaw) };
}
function getPriceFromChartClick(chartKey, event){
  const container = chartKey === "weekly" ? els.priceChart : els.lower4hChart;
  const series = chartKey === "weekly" ? candleSeries : ltf4hSeries;
  if(!container || !series) return null;
  const rect = container.getBoundingClientRect();
  if(!rect || rect.width <= 0 || rect.height <= 0) return null;
  const y = event.clientY - rect.top;
  if(!Number.isFinite(y) || y < 0 || y > rect.height) return null;
  const price = series.coordinateToPrice(y);
  return Number.isFinite(price) ? Number(price) : null;
}
function handleChartLinePlacementClick(chartKey, event){
  if(!manualLinePlacement.active || manualLinePlacement.chartKey !== chartKey) return;
  const price = getPriceFromChartClick(chartKey, event);
  if(!Number.isFinite(price) || price <= 0) return;
  const meta = promptManualLineMeta();
  if(!meta){ disableManualLinePlacement(); return; }
  const line = { id: `${chartKey}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`, chart: chartKey, price, label: meta.label, type: meta.type, createdAt: new Date().toISOString() };
  if(!addManualLine(chartKey, line)){ window.alert(`Maximum ${MAX_MANUAL_LINES_PER_CHART} lines reached for this chart.`); disableManualLinePlacement(); return; }
  rebuildManualLines(chartKey);
  disableManualLinePlacement();
}
function enableManualLinePlacement(chartKey){
  if(manualLinePlacement.active && manualLinePlacement.chartKey === chartKey){ disableManualLinePlacement(); return; }
  disableTrendlineDrawMode();
  disableManualLinePlacement();
  const series = chartKey === "weekly" ? candleSeries : ltf4hSeries;
  if(!series){ window.alert("Chart is not ready yet."); return; }
  manualLinePlacement = { active: true, chartKey };
  setLinePlacementUiState(chartKey, true);
}
function attachWeeklyPlacementListener(){
  if(weeklyPlacementHandler && els.priceChart) els.priceChart.removeEventListener("click", weeklyPlacementHandler);
  weeklyPlacementHandler = (e)=>{ handleChartLinePlacementClick("weekly", e); handleTrendlineChartClick("weekly", e); };
  els.priceChart?.addEventListener("click", weeklyPlacementHandler);
}
function attach4hPlacementListener(){
  if(h4PlacementHandler && els.lower4hChart) els.lower4hChart.removeEventListener("click", h4PlacementHandler);
  h4PlacementHandler = (e)=>{ handleChartLinePlacementClick("h4", e); handleTrendlineChartClick("h4", e); };
  els.lower4hChart?.addEventListener("click", h4PlacementHandler);
}
function clearTrendlineOverlay(chartKey){
  const layer = chartKey === "weekly" ? els.weeklyTrendlineOverlay : els.h4TrendlineOverlay;
  if(layer) layer.innerHTML = "";
}
function buildDrawingStyle(drawing){
  const map = {
    "Support": "#38bdf8",
    "Resistance": "#fbbf24",
    "Alert": "#a855f7",
    "Entry": "#22c55e",
    "Stop Loss": "#ef4444",
    "Take Profit": "#14b8a6",
    "Custom": "#94a3b8",
  };
  return map[drawing.type] || map.Custom;
}
function renderTrendlinesForChart(chartKey){
  try{
    const layer = chartKey === "weekly" ? els.weeklyTrendlineOverlay : els.h4TrendlineOverlay;
    const chart = chartKey === "weekly" ? priceChart : ltf4hChart;
    const series = chartKey === "weekly" ? candleSeries : ltf4hSeries;
    if(!layer || !chart || !series){ clearTrendlineOverlay(chartKey); return; }
    const drawings = getManualDrawings(chartKey).filter((d)=>d.kind==="trendline");
    if(!drawings.length){ clearTrendlineOverlay(chartKey); return; }
    const svgns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgns, "svg");
    drawings.forEach((d)=>{
      const x1 = chart.timeScale().timeToCoordinate(d.start?.time);
      const x2 = chart.timeScale().timeToCoordinate(d.end?.time);
      const y1 = series.priceToCoordinate(Number(d.start?.price));
      const y2 = series.priceToCoordinate(Number(d.end?.price));
      if(!Number.isFinite(x1)||!Number.isFinite(x2)||!Number.isFinite(y1)||!Number.isFinite(y2)) return;
      const color = buildDrawingStyle(d);
      const line = document.createElementNS(svgns, "line");
      line.setAttribute("x1", `${x1}`); line.setAttribute("y1", `${y1}`);
      line.setAttribute("x2", `${x2}`); line.setAttribute("y2", `${y2}`);
      line.setAttribute("stroke", color); line.setAttribute("class", "trendline");
      svg.appendChild(line);
      const label = document.createElementNS(svgns, "text");
      label.setAttribute("x", `${x2 + 4}`); label.setAttribute("y", `${y2 - 4}`);
      label.setAttribute("class", "trendline-label");
      label.textContent = d.label || d.type || "Trendline";
      svg.appendChild(label);
    });
    layer.innerHTML = "";
    layer.appendChild(svg);
  }catch(_){}
}
function scheduleTrendlineRedraw(chartKey){
  requestAnimationFrame(()=>renderTrendlinesForChart(chartKey));
}
function setTrendlineDrawUiState(chartKey, text){
  const btn = chartKey === "weekly" ? els.weeklyDrawTrendlineBtn : els.h4DrawTrendlineBtn;
  if(!btn) return;
  btn.classList.toggle("active-draw", !!text);
  btn.textContent = text || "Draw Trendline";
}
function disableTrendlineDrawMode(){
  const activeChart = trendlineDrawMode.chartKey;
  trendlineDrawMode = { active: false, chartKey: null, startPoint: null };
  setTrendlineDrawUiState("weekly", null);
  setTrendlineDrawUiState("h4", null);
  if(activeChart) {
    const layer = activeChart === "weekly" ? els.weeklyTrendlineOverlay : els.h4TrendlineOverlay;
    if(layer) layer.style.pointerEvents = "none";
  }
}
function getChartPointFromClick(chartKey, event){
  const container = chartKey === "weekly" ? els.priceChart : els.lower4hChart;
  const chart = chartKey === "weekly" ? priceChart : ltf4hChart;
  const series = chartKey === "weekly" ? candleSeries : ltf4hSeries;
  if(!container || !chart || !series) return null;
  const rect = container.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  if(!Number.isFinite(x)||!Number.isFinite(y)||x<0||y<0||x>rect.width||y>rect.height) return null;
  const price = series.coordinateToPrice(y);
  const time = chart.timeScale().coordinateToTime(x);
  if(!Number.isFinite(price) || !time) return null;
  return { time, price: Number(price) };
}
function handleTrendlineChartClick(chartKey, event){
  if(!trendlineDrawMode.active || trendlineDrawMode.chartKey !== chartKey) return;
  const point = getChartPointFromClick(chartKey, event);
  if(!point) return;
  if(!trendlineDrawMode.startPoint){
    trendlineDrawMode.startPoint = point;
    setTrendlineDrawUiState(chartKey, "Click end point");
    return;
  }
  const labelRaw = window.prompt("Enter trendline label:", "Manual Trendline");
  if(labelRaw === null){ disableTrendlineDrawMode(); return; }
  const typeRaw = window.prompt("Type: Support / Resistance / Alert / Entry / Stop Loss / Take Profit / Custom", "Custom");
  if(typeRaw === null){ disableTrendlineDrawMode(); return; }
  const drawing = { id:`${chartKey}_tl_${Date.now()}_${Math.random().toString(36).slice(2,7)}`, chart: chartKey, kind:"trendline", label:(labelRaw||"Manual Trendline").trim(), type: normalizeManualLineType(typeRaw), start: trendlineDrawMode.startPoint, end: point, createdAt: new Date().toISOString() };
  if(!addManualDrawing(chartKey, drawing)){ window.alert(`Maximum ${MAX_MANUAL_DRAWINGS_PER_CHART} drawings reached for this chart.`); disableTrendlineDrawMode(); return; }
  renderTrendlinesForChart(chartKey);
  disableTrendlineDrawMode();
}
function enableTrendlineDrawMode(chartKey){
  if(trendlineDrawMode.active && trendlineDrawMode.chartKey === chartKey){ disableTrendlineDrawMode(); return; }
  const chart = chartKey === "weekly" ? priceChart : ltf4hChart;
  const series = chartKey === "weekly" ? candleSeries : ltf4hSeries;
  if(!chart || !series){ window.alert("Chart is not ready yet."); return; }
  disableManualLinePlacement();
  disableTrendlineDrawMode();
  trendlineDrawMode = { active: true, chartKey, startPoint: null };
  const layer = chartKey === "weekly" ? els.weeklyTrendlineOverlay : els.h4TrendlineOverlay;
  if(layer) layer.style.pointerEvents = "none";
  setTrendlineDrawUiState(chartKey, "Click start point");
}
function handleManageDrawings(chartKey){
  try{
    const drawings = getManualDrawings(chartKey).filter((d)=>d.kind==="trendline");
    if(!drawings.length){ window.alert("No trendlines on this chart."); return; }
    const list = drawings.map((d,i)=>`${i+1}) Trendline | ${d.type || "Custom"} | ${d.label || "Manual Trendline"}`).join("\n");
    const cmd = window.prompt(`${list}\n\nCommands:\nd:2 = delete item 2\nclear = clear all\n(cancel = no action)`, "");
    if(!cmd) return;
    const c = cmd.trim().toLowerCase();
    if(c === "clear"){
      if(window.confirm("Clear all drawings for this chart?")){ clearManualDrawings(chartKey); renderTrendlinesForChart(chartKey); }
      return;
    }
    if(c.startsWith("d:")){
      const idx = Number(c.split(":")[1]) - 1;
      if(Number.isInteger(idx) && idx >= 0 && idx < drawings.length){ deleteManualDrawing(chartKey, drawings[idx].id); renderTrendlinesForChart(chartKey); }
    }
  }catch(_){}
}
function prepDistancePct(price, lower, upper){
  if(!Number.isFinite(price)||!Number.isFinite(lower)||!Number.isFinite(upper)) return null;
  if(price < lower) return ((lower-price)/price)*100;
  if(price > upper) return ((price-upper)/price)*100;
  return 0;
}
function compute4hRsiStatus(candles, period = 14){
  try{
    if(!Array.isArray(candles) || candles.length < (period + 1)) return { ok:false, value:null, prev:null, slope:null, regime:null, label:"4H RSI unavailable", reason:"not_enough_candles" };
    const closes = candles.map(c=>Number(c.close)).filter(Number.isFinite);
    if(closes.length < (period + 1)) return { ok:false, value:null, prev:null, slope:null, regime:null, label:"4H RSI unavailable", reason:"not_enough_candles" };
    const series = calculateRsiSeries(closes, period);
    if(!Array.isArray(series) || series.length < 1) return { ok:false, value:null, prev:null, slope:null, regime:null, label:"4H RSI unavailable", reason:"insufficient_rsi" };
    const value = Number(series[series.length-1]);
    const prev = series.length > 1 ? Number(series[series.length-2]) : null;
    if(!Number.isFinite(value)) return { ok:false, value:null, prev:null, slope:null, regime:null, label:"4H RSI unavailable", reason:"invalid_rsi" };
    const d = Number.isFinite(prev) ? (value - prev) : 0;
    const slope = !Number.isFinite(prev) ? null : (Math.abs(d) < 0.15 ? "flat" : (d > 0 ? "rising" : "falling"));
    const regime = value >= 70 ? "Overbought" : value <= 30 ? "Oversold" : value >= 50 ? "Above 50" : "Below 50";
    let label = "4H RSI unavailable";
    if(value >= 70) label = "4H RSI Overbought";
    else if(value <= 30) label = "4H RSI Oversold";
    else if(value < 50 && slope === "rising") label = "4H RSI Recovering";
    else if(value > 50 && slope === "falling") label = "4H RSI Weakening";
    else if(value >= 50) label = "4H RSI Above 50 ↑";
    else if(value < 50) label = "4H RSI Below 50 ↓";
    return { ok:true, value:Number(value.toFixed(1)), prev:Number.isFinite(prev)?Number(prev.toFixed(1)):null, slope, regime, label, reason:null };
  }catch{
    return { ok:false, value:null, prev:null, slope:null, regime:null, label:"4H RSI unavailable", reason:"compute_failed" };
  }
}
function buildMarketPreparationMap(){
  try{
    const price = marketPreparationState.currentPrice;
    const mkRow = (base) => {
      const dist = prepDistancePct(price, base.lower, base.upper);
      return { ...base, distancePct: dist, distanceText: dist===null?'—':`${f1(dist)}%`, zoneText: `${usd(base.lower)}–${usd(base.upper)}` };
    };
    const rows = [];
    const add = (row) => { if(Number.isFinite(row.lower)&&Number.isFinite(row.upper)) rows.push(mkRow(row)); };
    (marketPreparationState.weekly.fvgZones||[]).forEach((z)=>add({ side: z.type?.includes("Bullish")?'downside':'upside', symbol: z.type?.includes("Bullish")?'▼':'▲', lower: z.lower, upper: z.upper, label: z.type?.includes("Bullish")?'W Bullish FVG':'W Bearish FVG', quality: z.status||'Valid', source:'weekly_fvg', priorityScore:20, detail:'' }));
    const wsr = marketPreparationState.weekly.srSummary;
    if(wsr?.support) add({ side:'downside', symbol:'▼', lower:wsr.support.lower, upper:wsr.support.upper, label:'W Support', quality:wsr.support.strength||'Strong', source:'weekly_sr', priorityScore:25, detail:'' });
    if(wsr?.resistance) add({ side:'upside', symbol:'▲', lower:wsr.resistance.lower, upper:wsr.resistance.upper, label:'W Resistance', quality:wsr.resistance.strength||'Strong', source:'weekly_sr', priorityScore:25, detail:'' });
    (marketPreparationState.h4.fvgZones||[]).forEach((z)=>add({ side: z.type?.includes("Bullish")?'downside':'upside', symbol: z.type?.includes("Bullish")?'▼':'▲', lower: z.lower, upper: z.upper, label: z.type?.includes("Bullish")?'4H Bullish FVG':'4H Bearish FVG', quality: z.status||'High Prob', source:'h4_fvg', priorityScore:32, detail:'' }));
    const h4sr = marketPreparationState.h4.srSummary;
    if(h4sr?.support?.nearest) add({ side:'downside', symbol:'▼', lower:h4sr.support.nearest.lower, upper:h4sr.support.nearest.upper, label:'4H Support', quality:`Touch ${h4sr.support.nearest.touchCount}x`, source:'h4_sr', priorityScore:40, detail:'' });
    if(h4sr?.resistance?.nearest) add({ side:'upside', symbol:'▲', lower:h4sr.resistance.nearest.lower, upper:h4sr.resistance.nearest.upper, label:'4H Resistance', quality:`Touch ${h4sr.resistance.nearest.touchCount}x`, source:'h4_sr', priorityScore:40, detail:'' });
    const dedupe = (arr) => {
      const out = [];
      arr.sort((a,b)=>b.priorityScore-a.priorityScore).forEach((r)=>{
        const c = (r.lower+r.upper)/2;
        const exists = out.find((o)=>Math.abs(c-((o.lower+o.upper)/2))/Math.max(1, price||1) < 0.0035);
        if(!exists) out.push(r);
      });
      return out.slice(0,3);
    };
    const upside = dedupe(rows.filter((r)=>r.side==='upside' && Number.isFinite(price) ? ((r.lower+r.upper)/2)>price : true));
    const downside = dedupe(rows.filter((r)=>r.side==='downside' && Number.isFinite(price) ? ((r.lower+r.upper)/2)<price : true));
    const h4RsiText = marketPreparationState.h4.rsiStatus?.ok ? ` | ${marketPreparationState.h4.rsiStatus.label}` : "";
    const currentRowText = Number.isFinite(price)
      ? `● ${usd(price)} | ${marketPreparationState.h4.structureStatus||'4H —'}${h4RsiText} | 1H Sweep: ${marketPreparationState.h1.sweepStatus||'—'} | 1H Structure: ${marketPreparationState.h1.structureStatus||'—'}`
      : "● Price unavailable | Waiting for ticker/4H/1H context";
    return { upside, downside, currentRowText };
  } catch {
    return { upside: [], downside: [], currentRowText: "● Price unavailable | Waiting for ticker/4H/1H context" };
  }
}
function renderMarketPreparationMap(mapData){
  const row = (r)=>`<div class="prep-map-row"><span class="prep-map-row-symbol">${r.symbol}</span><span class="prep-map-row-zone">${r.zoneText}</span><span class="prep-map-row-label">${r.label}</span><span class="prep-map-row-quality">${r.quality}</span><span class="prep-map-row-distance">${r.distanceText}</span></div>`;
  if(els.prepUpsideRows) els.prepUpsideRows.innerHTML = mapData.upside.length ? mapData.upside.map(row).join('') : '<p class="prep-map-empty">No upside watch levels available.</p>';
  if(els.prepDownsideRows) els.prepDownsideRows.innerHTML = mapData.downside.length ? mapData.downside.map(row).join('') : '<p class="prep-map-empty">No downside watch levels available.</p>';
  if(els.prepCurrentRow) els.prepCurrentRow.textContent = mapData.currentRowText || "● Price unavailable";
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
  if(!items.length){ if(els.biasScannerList) els.biasScannerList.innerHTML='<div class="scanner-row">No clear potential bias detected across the weekly comparison ranges.</div>'; return; }
  if(els.biasScannerList) els.biasScannerList.innerHTML=items.map(it=>`<div class="scanner-row"><span class="scanner-title">${it.bias}</span>Range: ${it.range} · Price: ${signed2(it.priceChangePercent)}% · RSI: ${signed1(it.rsiChange)} · Confidence: ${it.confidence}<br>${it.bias==='Potential Upward Bias'?'Price weakened or consolidated while weekly RSI improved.':'Price improved or consolidated while weekly RSI weakened.'}</div>`).join('');
}

function renderPriceChart(dataset){
  const weekLabelMap = createWeekLabelMap(dataset);
  if (typeof LightweightCharts === "undefined") throw new Error("LightweightCharts is not defined");
  if (!els.priceChart) throw new Error("priceChart container is null");
  if (priceChart) { priceChart.remove(); priceChart = null; candleSeries = null; }
  els.priceChart.innerHTML = "";
  weeklySrOverlayLayer = null;
  const candles = dataset.map(d=>({ time:d.time, open:d.open, high:d.high, low:d.low, close:d.close }));
  if(!candles.length) throw new Error("No valid OHLC candle data.");
  priceChart = LightweightCharts.createChart(els.priceChart, { width: Math.max(els.priceChart.clientWidth||0,320), height: 300, layout:{background:{type:"solid",color:"transparent"},textColor:"#cbd5e1"}, grid:{vertLines:{color:"rgba(148,163,184,0.12)"},horzLines:{color:"rgba(148,163,184,0.12)"}}, rightPriceScale:{borderColor:"rgba(148,163,184,0.2)"}, timeScale:{borderColor:"rgba(148,163,184,0.2)",timeVisible:true,tickMarkFormatter:(time)=>weekLabelMap.get(timeKey(time))||""} });
  candleSeries = priceChart.addCandlestickSeries({ upColor: "#22c55e", downColor: "#ef4444", borderUpColor: "#22c55e", borderDownColor: "#ef4444", wickUpColor: "#22c55e", wickDownColor: "#ef4444" });
  candleSeries.setData(candles);
  attachWeeklyPlacementListener();
  applyManualLinesToWeeklyChart();
  renderTrendlinesForChart("weekly");
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


function classifyWeeklyCandleCharacter(candle, previousCandles=[]){
  const range = candle.high - candle.low;
  if(!Number.isFinite(range) || range <= 0) return "Neutral Candle";
  const body = Math.abs(candle.close - candle.open);
  const upperWick = candle.high - Math.max(candle.open, candle.close);
  const lowerWick = Math.min(candle.open, candle.close) - candle.low;
  const closePosition = (candle.close - candle.low) / range;
  const bodyRatio = body / range;
  const upperWickRatio = upperWick / range;
  const lowerWickRatio = lowerWick / range;

  const prevRanges = previousCandles
    .map(c=>c.high-c.low)
    .filter(v=>Number.isFinite(v) && v>0)
    .slice(-5);
  const avgRange = prevRanges.length ? prevRanges.reduce((a,b)=>a+b,0)/prevRanges.length : null;
  const isWideRange = avgRange && range > avgRange * 1.25;
  const isNarrowRange = avgRange && range < avgRange * 0.75;

  if(lowerWickRatio >= 0.40 && closePosition >= 0.55) return "Bullish Rejection";
  if(upperWickRatio >= 0.40 && closePosition <= 0.45) return "Bearish Rejection";
  if(candle.close > candle.open && bodyRatio >= 0.55 && closePosition >= 0.70) return "Strong Bullish";
  if(candle.close < candle.open && bodyRatio >= 0.55 && closePosition <= 0.30) return "Strong Bearish";
  if(bodyRatio <= 0.25 && upperWickRatio >= 0.20 && lowerWickRatio >= 0.20) return "Indecision";
  if(isWideRange && candle.close > candle.open) return "Wide Range Bullish";
  if(isWideRange && candle.close < candle.open) return "Wide Range Bearish";
  if(isNarrowRange) return "Narrow Range";
  return "Neutral Candle";
}

function getWeeklyCandleCharacterSummary(dataset){
  if(!Array.isArray(dataset) || dataset.length < 4) return null;
  const now = Date.now();
  const closed = dataset.filter(d=>{
    const openTs = Date.parse(`${d.time}T00:00:00Z`);
    if(!Number.isFinite(openTs)) return false;
    const closeTs = openTs + (7 * 24 * 60 * 60 * 1000);
    return closeTs <= now;
  });
  if(closed.length < 3) return null;

  const w1 = closed[closed.length-1];
  const w2 = closed[closed.length-2];
  const w3 = closed[closed.length-3];

  const c3 = classifyWeeklyCandleCharacter(w3, closed.slice(0, Math.max(0, closed.length-3)));
  const c2 = classifyWeeklyCandleCharacter(w2, closed.slice(0, Math.max(0, closed.length-2)));
  const c1 = classifyWeeklyCandleCharacter(w1, closed.slice(0, Math.max(0, closed.length-1)));

  const bearishTypes = new Set(["Strong Bearish","Bearish Rejection","Wide Range Bearish"]);
  const bullishTypes = new Set(["Strong Bullish","Bullish Rejection","Wide Range Bullish"]);

  let reading = "Mixed weekly candle character";
  if(bearishTypes.has(c3) && bearishTypes.has(c2) && c1 === "Bullish Rejection") reading = "Bearish pressure weakening";
  else if(bullishTypes.has(c3) && bullishTypes.has(c2) && c1 === "Bearish Rejection") reading = "Bullish pressure weakening";
  else if(c3 === "Indecision" && c2 === "Bullish Rejection" && c1 === "Strong Bullish") reading = "Bullish reaction strengthening";
  else if(c3 === "Indecision" && c2 === "Bearish Rejection" && c1 === "Strong Bearish") reading = "Bearish reaction strengthening";
  else if(c3 === "Narrow Range" && c2 === "Narrow Range" && c1 === "Wide Range Bullish") reading = "Bullish volatility expansion";
  else if(c3 === "Narrow Range" && c2 === "Narrow Range" && c1 === "Wide Range Bearish") reading = "Bearish volatility expansion";
  else if(c3 === "Strong Bullish" && c2 === "Strong Bullish" && c1 === "Strong Bullish") reading = "Bullish continuation";
  else if(c3 === "Strong Bearish" && c2 === "Strong Bearish" && c1 === "Strong Bearish") reading = "Bearish continuation";

  let condition = "No clear 3W candle signal";
  if(reading.includes("pressure weakening")) condition = "Needs 4H validation";
  else if(reading.includes("continuation")) condition = "Weekly pressure continues";
  else if(reading.includes("volatility expansion")) condition = "Watch reaction around key zones";

  return { w1:c1, w2:c2, w3:c3, reading, condition };
}

function renderWeeklyCandleCharacter(dataset){
  try {
    const summary = getWeeklyCandleCharacterSummary(dataset);
    if(!summary){
      if(els.weeklyCandleW1) els.weeklyCandleW1.textContent = "Weekly Candle Character unavailable";
      if(els.weeklyCandleW2) els.weeklyCandleW2.textContent = "W-2: —";
      if(els.weeklyCandleW3) els.weeklyCandleW3.textContent = "W-3: —";
      if(els.weeklyCandleReading) els.weeklyCandleReading.textContent = "3W Reading: —";
      if(els.weeklyCandleCondition) els.weeklyCandleCondition.textContent = "Condition: —";
      return;
    }
    if(els.weeklyCandleW1) els.weeklyCandleW1.textContent = `W-1: ${summary.w1}`;
    if(els.weeklyCandleW2) els.weeklyCandleW2.textContent = `W-2: ${summary.w2}`;
    if(els.weeklyCandleW3) els.weeklyCandleW3.textContent = `W-3: ${summary.w3}`;
    if(els.weeklyCandleReading) els.weeklyCandleReading.textContent = `3W Reading: ${summary.reading}`;
    if(els.weeklyCandleCondition) els.weeklyCandleCondition.textContent = `Condition: ${summary.condition}`;
  } catch (e) {
    console.error("Weekly candle character render failed", e);
    if(els.weeklyCandleW1) els.weeklyCandleW1.textContent = "Candle character unavailable";
  }
}

function renderFearGreed(data){ const l=data?.data?.[0]; if(!l){ if(els.leftFearGreed) els.leftFearGreed.textContent="Fear & Greed: unavailable"; return; } const ts=Number(l.timestamp)*1000; const t=Number.isFinite(ts)?new Date(ts).toLocaleString():"unknown"; if(els.leftFearGreed){ els.leftFearGreed.textContent=`Fear & Greed: ${l.value} ${l.value_classification}`; els.leftFearGreed.title=`Updated: ${t}`; } }


function getClosedWeeklyCandles(dataset){
  if(!Array.isArray(dataset)) return [];
  const nowSec = Math.floor(Date.now()/1000);
  return dataset.filter((c, i)=>{
    const next = dataset[i+1];
    if(next) return c.time < next.time;
    const openSec = Math.floor(new Date(`${c.time}T00:00:00Z`).getTime()/1000);
    if(!Number.isFinite(openSec)) return false;
    return (nowSec - openSec) >= (7*24*60*60);
  });
}

function findWeeklySwings(candles48){
  const highs=[], lows=[];
  for(let i=2;i<candles48.length-2;i++){
    const c=candles48[i];
    if(c.high>candles48[i-1].high&&c.high>candles48[i-2].high&&c.high>candles48[i+1].high&&c.high>candles48[i+2].high) highs.push({index:i,time:c.time,price:c.high});
    if(c.low<candles48[i-1].low&&c.low<candles48[i-2].low&&c.low<candles48[i+1].low&&c.low<candles48[i+2].low) lows.push({index:i,time:c.time,price:c.low});
  }
  return { highs, lows };
}

function clusterWeeklyLevelsToZones(levels, type, candles48){
  if(!levels.length) return [];
  const ranges = candles48.map(c=>c.high-c.low).filter(v=>Number.isFinite(v)&&v>0);
  const avgRangeAbs = ranges.length ? ranges.reduce((a,b)=>a+b,0)/ranges.length : 0;
  const avgRangePct = candles48.map(c=>(c.high-c.low)/c.close).filter(v=>Number.isFinite(v)&&v>0);
  const meanRangePct = avgRangePct.length ? avgRangePct.reduce((a,b)=>a+b,0)/avgRangePct.length : 0.01;
  const tolPct = Math.min(0.025, Math.max(0.01, meanRangePct * 0.35));
  const tolAbs = (center)=>Math.max(center*tolPct, avgRangeAbs*0.18);
  const sorted = [...levels].sort((a,b)=>a.price-b.price);
  const clusters=[];
  sorted.forEach((lv)=>{
    const hit = clusters.find(cl=>Math.abs(lv.price-cl.center)<=tolAbs(cl.center));
    if(hit){ hit.levels.push(lv); hit.center = hit.levels.reduce((a,b)=>a+b.price,0)/hit.levels.length; }
    else clusters.push({ levels:[lv], center:lv.price });
  });
  return clusters.map((cl)=>{
    const center = cl.levels.reduce((a,b)=>a+b.price,0)/cl.levels.length;
    const halfWidth = Math.max(center*tolPct, avgRangeAbs*0.18);
    const times = cl.levels.map(x=>x.time).sort();
    return { type, center, lower:center-halfWidth, upper:center+halfWidth, sourceLevels:cl.levels, firstTime:times[0], lastTime:times[times.length-1], tolPct, avgRangeAbs };
  });
}

function evaluateWeeklyZone(zone, candles48, type){
  let touchCount=0, rejectionCount=0, broken=false, inTouch=false;
  candles48.forEach((c)=>{
    const touched = type==='support' ? (c.low>=zone.lower && c.low<=zone.upper) : (c.high>=zone.lower && c.high<=zone.upper);
    if(touched && !inTouch) touchCount++;
    if(touched){
      const rejected = type==='support' ? c.close>zone.upper : c.close<zone.lower;
      if(rejected) rejectionCount++;
      inTouch=true;
    } else {
      inTouch=false;
    }
    if(type==='support' && c.close<zone.lower) broken=true;
    if(type==='resistance' && c.close>zone.upper) broken=true;
  });
  const touchPts = touchCount>=4?4:touchCount;
  const rejectionPts = rejectionCount>=3?3:rejectionCount;
  const swingPts = zone.sourceLevels.length>=2?1:0;
  const activePts = broken?0:1;
  const score = touchPts + rejectionPts + swingPts + activePts;
  const strength = score>=7?'Strong':score>=4?'Medium':'Weak';
  return { ...zone, touchCount, rejectionCount, broken, status:broken?'Broken':'Active', score, strength };
}

function scanWeeklySupportResistance(dataset){
  try {
    const closed = getClosedWeeklyCandles(dataset);
    const candles48 = closed.slice(-48);
    if(candles48.length < 12) return { support:null, resistance:null, currentPrice:null, meaning:'Weekly Support & Resistance unavailable' };
    const swings = findWeeklySwings(candles48);
    const supportZones = clusterWeeklyLevelsToZones(swings.lows, 'support', candles48).map(z=>evaluateWeeklyZone(z, candles48, 'support'));
    const resistanceZones = clusterWeeklyLevelsToZones(swings.highs, 'resistance', candles48).map(z=>evaluateWeeklyZone(z, candles48, 'resistance'));
    const currentPrice = candles48[candles48.length-1]?.close ?? null;
    const nearestActiveSupport = supportZones.filter(z=>z.status==='Active'&&currentPrice!=null&&z.upper<=currentPrice).sort((a,b)=>(currentPrice-a.upper)-(currentPrice-b.upper))[0];
    const nearestActiveResistance = resistanceZones.filter(z=>z.status==='Active'&&currentPrice!=null&&z.lower>=currentPrice).sort((a,b)=>(a.lower-currentPrice)-(b.lower-currentPrice))[0];
    const fallbackSupport = supportZones.sort((a,b)=>b.score-a.score)[0] || null;
    const fallbackResistance = resistanceZones.sort((a,b)=>b.score-a.score)[0] || null;
    const support = nearestActiveSupport || fallbackSupport || null;
    const resistance = nearestActiveResistance || fallbackResistance || null;
    let meaning = 'Weekly Support & Resistance unavailable';
    if(support && resistance && currentPrice!=null){
      if(currentPrice>resistance.upper) meaning='Price is trading above major resistance zone.';
      else if(currentPrice<support.lower) meaning='Price is trading below major support zone.';
      else meaning='Price is trading between major weekly zones.';
    }
    return { support, resistance, currentPrice, meaning, candles48 };
  } catch (e) {
    console.error('Weekly SR scan failed:', e);
    return { support:null, resistance:null, currentPrice:null, meaning:'Weekly Support & Resistance unavailable' };
  }
}

function renderWeeklySupportResistance(summary){
  const missing = !summary || (!summary.support && !summary.resistance);
  if(missing){
    if(els.weeklySrResistanceZone) els.weeklySrResistanceZone.textContent='Weekly Support & Resistance unavailable';
    if(els.weeklySrResistanceMeta) els.weeklySrResistanceMeta.textContent='Resistance: —';
    if(els.weeklySrSupportZone) els.weeklySrSupportZone.textContent='Support: —';
    if(els.weeklySrSupportMeta) els.weeklySrSupportMeta.textContent='—';
    if(els.weeklySrMeaning) els.weeklySrMeaning.textContent='Meaning: —';
    return;
  }
  const fmtZone = (z)=>`${usd(z.lower)} – ${usd(z.upper)}`;
  if(els.weeklySrResistanceZone) els.weeklySrResistanceZone.textContent = summary.resistance ? fmtZone(summary.resistance) : 'Resistance: —';
  if(els.weeklySrResistanceMeta) els.weeklySrResistanceMeta.textContent = summary.resistance ? `${summary.resistance.strength} | Touch ${summary.resistance.touchCount}x | Rejection ${summary.resistance.rejectionCount}x | ${summary.resistance.status}` : '—';
  if(els.weeklySrSupportZone) els.weeklySrSupportZone.textContent = summary.support ? fmtZone(summary.support) : 'Support: —';
  if(els.weeklySrSupportMeta) els.weeklySrSupportMeta.textContent = summary.support ? `${summary.support.strength} | Touch ${summary.support.touchCount}x | Rejection ${summary.support.rejectionCount}x | ${summary.support.status}` : '—';
  if(els.weeklySrMeaning) els.weeklySrMeaning.textContent = `Meaning: ${summary.meaning || '—'}`;
}

function ensureWeeklySrOverlayLayer(){
  if(!els.priceChart) return null;
  let layer = document.getElementById('weeklySrOverlay');
  if(!layer){
    layer = document.createElement('div');
    layer.id = 'weeklySrOverlay';
    layer.className = 'fvg-overlay-layer';
    els.priceChart.appendChild(layer);
  }
  weeklySrOverlayLayer = layer;
  return layer;
}

function renderWeeklySrOverlay(summary, dataset){
  try {
    if(!priceChart || !candleSeries) return;
    weeklySrSummaryForOverlay = summary;
    const layer = ensureWeeklySrOverlayLayer();
    if(!layer) return;
    layer.innerHTML='';
    const closed = getClosedWeeklyCandles(dataset);
    const lastClosed = closed[closed.length-1];
    const right = lastClosed ? priceChart.timeScale().timeToCoordinate(lastClosed.time) : null;
    if(right==null) return;
    const draw=(zone, cls)=>{
      if(!zone) return;
      const xStart = priceChart.timeScale().timeToCoordinate(zone.firstTime || dataset[0]?.time);
      const yTop = candleSeries.priceToCoordinate(zone.upper);
      const yBottom = candleSeries.priceToCoordinate(zone.lower);
      const xEnd = right - 4;
      if(xStart==null||yTop==null||yBottom==null||xEnd==null) return;
      const el=document.createElement('div');
      el.className=`fvg-zone ${cls}`;
      el.style.left=`${Math.max(0,Math.min(xStart,xEnd))}px`;
      el.style.width=`${Math.max(1,Math.abs(xEnd-xStart))}px`;
      const top=Math.min(yTop,yBottom), h=Math.max(8,Math.abs(yBottom-yTop));
      const cy=(yTop+yBottom)/2;
      el.style.top=`${h===Math.abs(yBottom-yTop)?top:(cy-h/2)}px`;
      el.style.height=`${h}px`;
      layer.appendChild(el);
    };
    draw(summary.support, 'bullish');
    draw(summary.resistance, 'bearish');
  } catch (e) {
    console.error('Weekly SR overlay failed:', e);
  }
}


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
  try {
    const active=getActiveFvgs(dataset);
    if(els.fvgTitle) els.fvgTitle.textContent=`Active Weekly FVG Zones (${active.length})`;
    const shown = Math.min(active.length,5);
    if(els.rightFvgCount) els.rightFvgCount.textContent=`Active: ${active.length} | Shown: ${shown}`;
    if(els.rightNearestFvg) els.rightNearestFvg.textContent=active[0]?`Nearest: ${active[0].type} ${active[0].startLabel}->${active[0].endLabel}`:"Nearest: -";
    if(els.rightFvgStatus) els.rightFvgStatus.textContent=active[0]?`Status: ${active[0].status}`:"Status: -";
    if(!active.length){ if(els.fvgList) els.fvgList.innerHTML='<div class="scanner-row">No active weekly FVG detected in the current W-48 to W0 range.</div>'; return []; }
    if(els.fvgList) els.fvgList.innerHTML=active.map(f=>{
      const distLabel=f.distance===0?"Inside Zone":`${signed1(f.distance)}%`;
      return `<div class="scanner-row"><span class="scanner-title">${f.type}</span> | ${f.startLabel} → ${f.endLabel} | ${usd(f.lower)} - ${usd(f.upper)} | ${f.status} | Distance: ${distLabel} | Size: ${f1(f.sizePercent)}%</div>`;
    }).join('');
    return active;
  } catch (e) {
    console.error("FVG scan failed:", e);
    if(els.fvgList) els.fvgList.innerHTML='<div class="scanner-row">FVG section unavailable.</div>';
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
  const safeFvgs = Array.isArray(activeFvgs) ? activeFvgs : [];
  activeFvgZonesForOverlay = safeFvgs;
  const latest = Array.isArray(dataset) && dataset.length ? dataset[dataset.length-1] : null;
  weeklyOverlayRightTime = latest?.time ?? null;
  try {
    if(!candleSeries) return;
    clearFvgOverlay();
    safeFvgs.forEach((f)=>{
      const bull = f.type === "Bullish FVG";
      const color = bull ? "rgba(34,197,94,0.38)" : "rgba(239,68,68,0.38)";
      const upperLine = candleSeries.createPriceLine({ price:f.upper, color, lineWidth:1, lineStyle:2, axisLabelVisible:false, title:`${f.type} upper` });
      const lowerLine = candleSeries.createPriceLine({ price:f.lower, color, lineWidth:1, lineStyle:2, axisLabelVisible:false, title:`${f.type} lower` });
      fvgOverlayLines.push(upperLine, lowerLine);
    });
    renderFvgFilledOverlay();
    render4hVsWeeklyFvgSummary();

    priceChart.timeScale().subscribeVisibleTimeRangeChange(() => { renderFvgFilledOverlay(); if(weeklySrSummaryForOverlay) renderWeeklySrOverlay(weeklySrSummaryForOverlay, dataset); scheduleTrendlineRedraw("weekly"); });
    priceChart.timeScale().subscribeVisibleLogicalRangeChange(() => { renderFvgFilledOverlay(); if(weeklySrSummaryForOverlay) renderWeeklySrOverlay(weeklySrSummaryForOverlay, dataset); scheduleTrendlineRedraw("weekly"); });
  } catch (e) {
    console.error("FVG overlay render failed", e);
  }
}



function setToggleState(name, open){
  if(name==='ltf'){ ltfVisible=open; els.ltfContent.hidden=!open; els.ltfToggleBtn.textContent=open?'Hide':'Show'; }
  if(name==='fvg'){ fvgOpen=open; if(els.fvgContent) els.fvgContent.hidden=!open; if(els.fvgToggleBtn) els.fvgToggleBtn.textContent=open?'Hide':'Show'; }
  if(name==='bias'){ biasOpen=open; if(els.biasContent) els.biasContent.hidden=!open; if(els.biasToggleBtn) els.biasToggleBtn.textContent=open?'Hide':'Show'; }
  try { sessionStorage.setItem(`pl_${name}_open`, open?'1':'0'); } catch(_){}
}
function restoreToggleState(){
  const read=(k)=>{ try { return sessionStorage.getItem(k)==='1'; } catch(_) { return false; } };
  setToggleState('ltf', true);
  setToggleState('fvg', read('pl_fvg_open'));
  setToggleState('bias', read('pl_bias_open'));
}

function setLtfPresetUI(preset){
  ltfPreset = preset;
  const act=(el,on)=>{ if(!el) return; el.classList.toggle('active', on); };
  act(els.ltfPreset1w, preset==='1w');
  act(els.ltfPreset2w, preset==='2w');
  act(els.ltfPreset1m, preset==='1m');
  act(els.ltfPreset3m, preset==='3m');
  act(els.ltfPresetCustom, preset==='custom');
  if(els.ltfDateControls) els.ltfDateControls.hidden = preset!=='custom';
}

function setupCollapsibleSections(){
  els.ltfToggleBtn?.addEventListener('click', async ()=>{ setToggleState('ltf', !ltfVisible); if(ltfVisible){ requestAnimationFrame(()=>{ if(!lowerTimeframeLoaded){ setLtfPresetUI('1m'); renderLowerTimeframeMode('1M'); } else { const m={ '1w':'1W','2w':'2W','1m':'1M','3m':'3M' }; renderLowerTimeframeMode(m[ltfPreset] || '1M'); } }); } else destroyLtfCharts(); });
  els.fvgToggleBtn?.addEventListener('click', ()=>setToggleState('fvg', !fvgOpen));
  els.biasToggleBtn?.addEventListener('click', ()=>setToggleState('bias', !biasOpen));
  els.fvgViewDetailsBtn?.addEventListener('click', ()=>{ setToggleState('fvg', true); document.getElementById('fvgPanel')?.scrollIntoView({behavior:'smooth',block:'nearest'}); });
  els.biasViewDetailsBtn?.addEventListener('click', ()=>{ setToggleState('bias', true); document.getElementById('biasScannerPanel')?.scrollIntoView({behavior:'smooth',block:'nearest'}); });
  els.ltfPreset1w?.addEventListener('click', ()=>{ setLtfPresetUI('1w'); if(ltfVisible) { lowerTimeframeLoaded=true; renderLowerTimeframeMode('1W'); } });
  els.ltfPreset2w?.addEventListener('click', ()=>{ setLtfPresetUI('2w'); if(ltfVisible) { lowerTimeframeLoaded=true; renderLowerTimeframeMode('2W'); } });
  els.ltfPreset1m?.addEventListener('click', ()=>{ setLtfPresetUI('1m'); if(ltfVisible) { lowerTimeframeLoaded=true; renderLowerTimeframeMode('1M'); } });
  els.ltfPreset3m?.addEventListener('click', ()=>{ setLtfPresetUI('3m'); if(ltfVisible) { lowerTimeframeLoaded=true; renderLowerTimeframeMode('3M'); } });
  els.ltfPresetCustom?.addEventListener('click', ()=>{ setLtfPresetUI('custom'); });
  els.ltfApplyBtn?.addEventListener('click', ()=>{ lowerTimeframeLoaded=true; renderLowerTimeframeMode('CUSTOM'); });
  els.ltfResetBtn?.addEventListener('click', ()=>{ if(els.ltfStartDate) els.ltfStartDate.value=''; if(els.ltfEndDate) els.ltfEndDate.value=''; setLtfPresetUI('1m'); lowerTimeframeLoaded=true; if(ltfVisible) renderLowerTimeframeMode('RESET'); });
  els.weeklyAddLineBtn?.addEventListener('click', ()=>handleAddLine('weekly'));
  els.weeklyDrawLineBtn?.addEventListener('click', ()=>enableManualLinePlacement('weekly'));
  els.weeklyDrawTrendlineBtn?.addEventListener('click', ()=>enableTrendlineDrawMode('weekly'));
  els.weeklyManageLinesBtn?.addEventListener('click', ()=>handleManageLines('weekly'));
  els.weeklyManageDrawingsBtn?.addEventListener('click', ()=>handleManageDrawings('weekly'));
  els.h4AddLineBtn?.addEventListener('click', ()=>handleAddLine('h4'));
  els.h4DrawLineBtn?.addEventListener('click', ()=>enableManualLinePlacement('h4'));
  els.h4DrawTrendlineBtn?.addEventListener('click', ()=>enableTrendlineDrawMode('h4'));
  els.h4ManageLinesBtn?.addEventListener('click', ()=>handleManageLines('h4'));
  els.h4ManageDrawingsBtn?.addEventListener('click', ()=>handleManageDrawings('h4'));
  window.addEventListener("keydown", (e)=>{ if(e.key === "Escape"){ disableManualLinePlacement(); disableTrendlineDrawMode(); } });
  setLtfPresetUI('1m');
  restoreToggleState();
  if(ltfVisible){ requestAnimationFrame(()=>{ renderLowerTimeframeMode('1M'); lowerTimeframeLoaded=true; }); }
}

function toggleLtfError(el,msg=""){ if(!el) return; el.hidden=!msg; if(msg) el.textContent=msg; }
function destroyLtfCharts(){ if(ltf4hChart){ ltf4hChart.remove(); ltf4hChart=null; } if(ltf1hChart){ ltf1hChart.remove(); ltf1hChart=null; } ltf4hSeries=null; ltf1hSeries=null; clear4hFvgOverlay(); clear4hSrOverlay(); clearTrendlineOverlay("h4"); if(els.lower4hFvgOverlay) els.lower4hFvgOverlay.innerHTML=""; if(els.lower4hSrOverlay) els.lower4hSrOverlay.innerHTML=""; if(manualLinePlacement.chartKey==='h4') disableManualLinePlacement(); if(trendlineDrawMode.chartKey==='h4') disableTrendlineDrawMode(); }
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
  if(els.lower4hSrOverlay) els.lower4hSrOverlay.innerHTML='';

  let st=null, et=null, preset='1m';
  if(mode==='2W') preset='2w';
  if(mode==='1M') preset='1m';
  if(mode==='3M') preset='3m';
  if(mode==='CUSTOM') preset='custom';
  if(mode==='RESET') preset='1m';
  const hasRange = preset==='custom' && els.ltfStartDate.value && els.ltfEndDate.value;
  if(hasRange){
    st = new Date(`${els.ltfStartDate.value}T00:00:00`).getTime();
    et = new Date(`${els.ltfEndDate.value}T23:59:59`).getTime();
  }
  const limit4hByPreset = { '1w': 42, '2w': 84, '1m': 180, '3m': 540 };
  const limit1hByPreset = { '1w': 168, '2w': 336, '1m': 336, '3m': 336 };
  const limit4h = hasRange ? 1000 : (limit4hByPreset[preset] || 180);
  const limit1h = hasRange ? 1000 : (limit1hByPreset[preset] || 336);
  console.log('4H chart size:', els.lower4hChart.clientWidth, els.lower4hChart.clientHeight);
  const [h4,h1] = await Promise.allSettled([fetchLtfKlines('4h', st, et, limit4h), fetchLtfKlines('1h', st, et, limit1h)]);
  if(h4.status==='fulfilled'){
    try {
      const candles=mapKlinesToCandles(h4.value, hasRange ? undefined : limit4h);
      console.log('4H candles:', candles.length);
      console.log('Sample 4H candle:', candles[0]);
      if(!candles.length) { toggleLtfError(els.lower4hError,'No 4H candles found for selected range.'); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='No signal detected (4H FVG).'; render4hSupportResistanceSummary({ok:false,reason:'not_enough_candles'}); }
      else {
        const r=renderSingleLtfChart(els.lower4hChart,candles,280);
        ltf4hChart=r.chart; ltf4hSeries=r.series;
        attach4hPlacementListener();
        ltf4hChart.resize(els.lower4hChart.clientWidth, els.lower4hChart.clientHeight);
        ltf4hChart.timeScale().fitContent();
        ltf4hChart.timeScale().subscribeVisibleTimeRangeChange(()=>{ try { schedule4hFvgOverlayRedraw(candles); schedule4hSrOverlayRedraw(candles); scheduleTrendlineRedraw("h4"); } catch(err){ console.error('4H overlay redraw failed', err); } });
        ltf4hChart.timeScale().subscribeVisibleLogicalRangeChange(()=>{ try { schedule4hFvgOverlayRedraw(candles); schedule4hSrOverlayRedraw(candles); scheduleTrendlineRedraw("h4"); } catch(err){ console.error('4H overlay redraw failed', err); } });
        try { render4hFvgSummaryAndOverlay(candles); } catch(err){ console.error('4H FVG overlay redraw failed', err); }
        applyManualLinesTo4hChart();
        renderTrendlinesForChart("h4");
        requestAnimationFrame(()=>{ try { schedule4hFvgOverlayRedraw(candles); schedule4hSrOverlayRedraw(candles); } catch(err){ console.error('4H overlay redraw failed', err); } });
        setTimeout(()=>{ try { schedule4hFvgOverlayRedraw(candles); schedule4hSrOverlayRedraw(candles); } catch(err){ console.error('4H overlay redraw failed', err); } },50);
        console.log('4H overlay exists:', !!document.getElementById('lower4hFvgOverlay'));
      }
    }
    catch(e){ console.error('4H chart render failed:', e); toggleLtfError(els.lower4hError,'4H chart unavailable.'); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='FVG overlay unavailable'; render4hSupportResistanceSummary({ok:false,reason:'scan_failed'}); }
  } else { toggleLtfError(els.lower4hError,'4H chart unavailable.'); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='4H data unavailable.'; if(els.lower4hStructure) els.lower4hStructure.textContent='4H Structure: 4H data unavailable.'; if(els.lower4hReaction) els.lower4hReaction.textContent='4H Reaction: 4H data unavailable.'; render4hSupportResistanceSummary({ok:false,reason:'not_enough_candles'}); }
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

function clear4hSrOverlay(){
  try { if(els.lower4hSrOverlay) els.lower4hSrOverlay.innerHTML=''; } catch(_){}
}

function getSelected4hSrZones(srSummary){
  if(!srSummary?.ok) return [];
  const pool=[
    srSummary.support?.nearest,
    srSummary.support?.strongest,
    srSummary.resistance?.nearest,
    srSummary.resistance?.strongest,
  ].filter(Boolean);
  const uniq=[];
  const seen=new Set();
  for(const z of pool){
    const key=`${z.type}|${Number(z.lower).toFixed(2)}|${Number(z.upper).toFixed(2)}`;
    if(seen.has(key)) continue;
    seen.add(key);
    uniq.push(z);
  }
  const supports=uniq.filter(z=>z.type==='support').slice(0,2);
  const resistances=uniq.filter(z=>z.type==='resistance').slice(0,2);
  return [...supports,...resistances].slice(0,4);
}

function render4hSrOverlay({ chart, series, overlayLayer, candles, srSummary }){
  if(!chart || !series || !overlayLayer || !Array.isArray(candles) || !candles.length) return;
  clear4hSrOverlay();
  const zones=getSelected4hSrZones(srSummary);
  if(!zones.length) return;
  const lastTime=candles[candles.length-1]?.time;
  if(lastTime==null) return;
  const x2=chart.timeScale().timeToCoordinate(lastTime);
  if(x2==null) return;
  const rightLimit=Math.max(1, (els.lower4hChart?.clientWidth||0)-40);
  zones.forEach((zone)=>{
    try{
      const x1=chart.timeScale().timeToCoordinate(zone.firstTime);
      const yTop=series.priceToCoordinate(zone.upper);
      const yBottom=series.priceToCoordinate(zone.lower);
      if(x1==null || yTop==null || yBottom==null) return;
      const left=Math.max(0, Math.min(x1,x2));
      const width=Math.max(1, Math.min(Math.abs(x2-x1), rightLimit-left));
      const center=(yTop+yBottom)/2;
      const height=Math.max(8, Math.abs(yBottom-yTop));
      const top=Math.max(0, center-(height/2));
      const div=document.createElement('div');
      const strength=(zone.strength||'').toLowerCase();
      const strengthClass=strength==='strong' ? 'strong' : (strength==='weak' ? 'weak' : 'medium');
      div.className=`ltf-sr-zone ${zone.type==='support'?'support':'resistance'} ${strengthClass}`;
      div.style.left=`${left}px`;
      div.style.top=`${top}px`;
      div.style.width=`${width}px`;
      div.style.height=`${height}px`;
      overlayLayer.appendChild(div);
    } catch(_){ }
  });
}

function schedule4hSrOverlayRedraw(candles){
  if(srRedrawPending) return;
  srRedrawPending=true;
  requestAnimationFrame(()=>{
    srRedrawPending=false;
    try{
      render4hSrOverlay({ chart: ltf4hChart, series: ltf4hSeries, overlayLayer: els.lower4hSrOverlay, candles: candles||latest4hCandles, srSummary: latest4hSrSummary });
    } catch(err){
      console.warn('4H SR overlay redraw skipped', err);
      clear4hSrOverlay();
    }
  });
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
function selectClean4hFvgsByType(activeFvgs, currentPrice, { maxBullish=2, maxBearish=2 } = {}){
  const sortFn=(a,b)=>Math.abs(a.distance)-Math.abs(b.distance) || ((a.status==='Unfilled'?0:1)-(b.status==='Unfilled'?0:1)) || b.index-a.index;
  const pickClean=(zones,maxZones)=>{
    const sorted=[...zones].sort(sortFn);
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
  };
  const bullish = activeFvgs.filter((f)=>f.type==='Bullish 4H FVG');
  const bearish = activeFvgs.filter((f)=>f.type==='Bearish 4H FVG');
  const selectedBullish = pickClean(bullish, maxBullish);
  const selectedBearish = pickClean(bearish, maxBearish);
  const selected = [...selectedBullish, ...selectedBearish]
    .sort(sortFn)
    .slice(0, maxBullish + maxBearish);
  return { selected, selectedBullish, selectedBearish };
}

function renderClean4hFvgOverlay({ chart, series, container, overlayLayer, candles, activeFvgs, maxBullish = 2, maxBearish = 2 }){
  if(!chart || !series || !container || !overlayLayer) return { selected: [], visualMode: 'Failed' };
  clear4hFvgOverlay();
  const currentPrice=candles?.[candles.length-1]?.close||0;
  const picked = selectClean4hFvgsByType(activeFvgs,currentPrice,{maxBullish,maxBearish});
  const selected4hFvgs=picked.selected;
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
  return { selected: selected4hFvgs, selectedBullish: picked.selectedBullish, selectedBearish: picked.selectedBearish, visualMode };
}


function schedule4hFvgOverlayRedraw(candles){
  if(fvgRedrawPending) return;
  fvgRedrawPending=true;
  requestAnimationFrame(()=>{
    fvgRedrawPending=false;
    try {
      const layer=ensure4hFvgLayer();
      if(!layer) return;
      renderClean4hFvgOverlay({ chart: ltf4hChart, series: ltf4hSeries, container: els.lower4hChart, overlayLayer: layer, candles, activeFvgs: active4hFvgs, maxBullish: 2, maxBearish: 2 });
    } catch(error){
      console.error('Clean 4H FVG overlay failed:', error);
      if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='FVG overlay unavailable'; render4hSupportResistanceSummary({ok:false,reason:'scan_failed'});
    }
  });
}


function render4hFvgSummaryAndOverlay(candles){
  try {
    latest4hCandles = candles;
    const rsiStatus = compute4hRsiStatus(candles, RSI_PERIOD);
    if(!ltf4hChart || !ltf4hSeries){ if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='4H FVG: 4H data unavailable.'; render4hSupportResistanceSummary({ok:false,reason:'not_enough_candles'}); latest4hSrSummary={ok:false,reason:'not_enough_candles'}; clear4hSrOverlay(); return; }
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
    if(!active4hFvgs.length){ mtfState.h4Structure = structure.status; mtfState.h4FvgNearest = null; if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='No signal detected (4H FVG).'; if(els.lower4hReaction) els.lower4hReaction.textContent='4H Reaction: No active Weekly FVG zone detected.'; const srSummary = scan4hSupportResistance(candles); latest4hSrSummary = srSummary; render4hSupportResistanceSummary(srSummary); updateMarketPreparationState({ h4: { fvgZones: [], srSummary, structureStatus: structure.status, rsiStatus }, meta: { sourcesReady: { h4: true } } }); renderMarketPreparationMap(buildMarketPreparationMap()); schedule4hSrOverlayRedraw(candles); renderLowerTfReactionSummary(); renderMtfSummary(); return; }
    const nearest = active4hFvgs[0];
    mtfState.h4Structure = structure.status;
    mtfState.h4FvgNearest = nearest ? nearest.type : null;
    const layer=ensure4hFvgLayer();
    const visual = layer ? renderClean4hFvgOverlay({ chart: ltf4hChart, series: ltf4hSeries, container: els.lower4hChart, overlayLayer: layer, candles, activeFvgs: active4hFvgs, maxBullish: 2, maxBearish: 2 }) : { selected: [], selectedBullish: [], selectedBearish: [], visualMode: "Failed" };
    if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent=`4H FVG | Active: ${active4hFvgs.length} | Bullish: ${visual.selectedBullish.length} | Bearish: ${visual.selectedBearish.length} | Shown: ${visual.selected.length} | Nearest: ${nearest.type} | Distance: ${nearest.distance===0?'0%':f1(nearest.distance)+'%'} | Status: ${nearest.status} | Visual: ${visual.visualMode}`;
    const relation = nearest.distance===0 ? 'Inside' : (nearest.distance<=3 ? 'Near' : 'Far');
    if(els.lower4hReaction) els.lower4hReaction.textContent = `4H Reaction | Weekly FVG Relation: ${relation} | 4H FVG Active: ${active4hFvgs.length} | 4H Structure: ${structure.status}`;
    const srSummary = scan4hSupportResistance(candles);
    latest4hSrSummary = srSummary;
    render4hSupportResistanceSummary(srSummary);
    updateMarketPreparationState({ h4: { fvgZones: active4hFvgs, srSummary, structureStatus: structure.status, rsiStatus }, meta: { sourcesReady: { h4: true } } });
    renderMarketPreparationMap(buildMarketPreparationMap());
    schedule4hSrOverlayRedraw(candles);
    renderLowerTfReactionSummary();
  } catch(e){ console.error('Clean 4H FVG overlay failed:', e); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='FVG overlay unavailable'; latest4hSrSummary={ok:false,reason:'scan_failed'}; render4hSupportResistanceSummary({ok:false,reason:'scan_failed'}); clear4hSrOverlay(); if(els.lower4hStructure) els.lower4hStructure.textContent='4H Structure: unavailable.'; if(els.lower4hReaction) els.lower4hReaction.textContent='4H Reaction: unavailable.'; }
}




function classify4hSrStrength(score){
  return score>=7?'Strong':score>=4?'Medium':'Weak';
}

function find4hSwingsForSr(candles, left = 2, right = 2){
  const highs=[], lows=[];
  for(let i=left;i<candles.length-right;i++){
    const c=candles[i];
    let isHigh=true, isLow=true;
    for(let j=1;j<=left;j++){ if(!(c.high>candles[i-j].high)) isHigh=false; if(!(c.low<candles[i-j].low)) isLow=false; }
    for(let j=1;j<=right;j++){ if(!(c.high>candles[i+j].high)) isHigh=false; if(!(c.low<candles[i+j].low)) isLow=false; }
    if(isHigh) highs.push({index:i,time:c.time,price:c.high});
    if(isLow) lows.push({index:i,time:c.time,price:c.low});
  }
  return { highs, lows };
}

function cluster4hLevelsToZones(levels, type, candles){
  if(!levels.length) return { zones:[], tolerancePct:0, avgRangeAbs:0 };
  const ranges = candles.map(c=>c.high-c.low).filter(v=>Number.isFinite(v)&&v>0);
  const avgRangeAbs = ranges.length ? ranges.reduce((a,b)=>a+b,0)/ranges.length : 0;
  const rangePcts = candles.map(c=>(c.high-c.low)/(c.close||1)).filter(v=>Number.isFinite(v)&&v>0);
  const avgRangePct = rangePcts.length ? rangePcts.reduce((a,b)=>a+b,0)/rangePcts.length : 0.005;
  const tolerancePct = Math.min(0.012, Math.max(0.003, avgRangePct*0.30));
  const tolAbs=(center)=>Math.max(center*tolerancePct, avgRangeAbs*0.20);
  const sorted=[...levels].sort((a,b)=>a.price-b.price);
  const clusters=[];
  sorted.forEach((lv)=>{
    const hit=clusters.find((cl)=>Math.abs(lv.price-cl.center)<=tolAbs(cl.center));
    if(hit){ hit.levels.push(lv); hit.center = hit.levels.reduce((m,x)=>m+x.price,0)/hit.levels.length; }
    else clusters.push({ center: lv.price, levels:[lv] });
  });
  const zones=clusters.map((cl)=>{
    const center=cl.center;
    const halfWidth=Math.max(center*tolerancePct, avgRangeAbs*0.20);
    const ts=cl.levels.map(x=>x.time).sort();
    return { type, lower:center-halfWidth, upper:center+halfWidth, center, sourceLevels:cl.levels, sourceLevelsCount:cl.levels.length, firstTime:ts[0], lastTime:ts[ts.length-1] };
  });
  return { zones, tolerancePct, avgRangeAbs };
}

function evaluate4hZone(zone, candles, type){
  let touchCount=0,rejectionCount=0,broken=false,inTouch=false,rejectedThisEpisode=false;
  candles.forEach((c)=>{
    const touched = type==='support' ? (c.low>=zone.lower && c.low<=zone.upper) : (c.high>=zone.lower && c.high<=zone.upper);
    if(touched && !inTouch){ touchCount++; inTouch=true; rejectedThisEpisode=false; }
    if(touched){
      const rejected = type==='support' ? c.close>zone.upper : c.close<zone.lower;
      if(rejected && !rejectedThisEpisode){ rejectionCount++; rejectedThisEpisode=true; }
    } else { inTouch=false; rejectedThisEpisode=false; }
    if(type==='support' && c.close<zone.lower) broken=true;
    if(type==='resistance' && c.close>zone.upper) broken=true;
  });
  const touchPts = touchCount>=4?4:touchCount;
  const rejectionPts = rejectionCount>=3?3:rejectionCount;
  const swingPts = zone.sourceLevelsCount>=2?1:0;
  const activePts = broken?0:1;
  const score = touchPts + rejectionPts + swingPts + activePts;
  const strength = classify4hSrStrength(score);
  return { ...zone, touchCount, rejectionCount, broken, status: broken?'Broken':'Active', score, strength };
}

function selectNearestAndStrongest4hZones(zones, currentPrice, type){
  const active = zones.filter((z)=>z.status==='Active');
  let nearest=null;
  if(type==='resistance'){
    const above=active.filter((z)=>z.lower>=currentPrice).map((z)=>({ ...z, distancePct: ((z.lower-currentPrice)/currentPrice)*100 }));
    nearest=above.sort((a,b)=>a.distancePct-b.distancePct)[0]||null;
  } else {
    const below=active.filter((z)=>z.upper<=currentPrice).map((z)=>({ ...z, distancePct: ((currentPrice-z.upper)/currentPrice)*100 }));
    nearest=below.sort((a,b)=>a.distancePct-b.distancePct)[0]||null;
  }
  const forStrongest = active.filter((z)=>z.strength!=='Weak');
  const src = forStrongest.length?forStrongest:active;
  const strongest = src.sort((a,b)=>b.score-a.score || b.rejectionCount-a.rejectionCount || b.touchCount-a.touchCount || b.lastTime-a.lastTime)[0] || null;
  return { nearest, strongest };
}

function format4hSrZone(zone){
  if(!zone) return 'Not found';
  return `${usd(zone.lower)} – ${usd(zone.upper)}`;
}

function scan4hSupportResistance(candles){
  try{
    if(!Array.isArray(candles) || candles.length<20){
      return { ok:false, reason:'not_enough_candles', currentPrice:candles?.[candles.length-1]?.close??null, candleCount:Array.isArray(candles)?candles.length:0, support:{nearest:null,strongest:null}, resistance:{nearest:null,strongest:null}, meta:{swingHighCount:0,swingLowCount:0,supportZoneCount:0,resistanceZoneCount:0,activeSupportCount:0,activeResistanceCount:0,tolerancePct:0,avgRangeAbs:0} };
    }
    const currentPrice=candles[candles.length-1].close;
    const swings=find4hSwingsForSr(candles,2,2);
    const supCluster=cluster4hLevelsToZones(swings.lows,'support',candles);
    const resCluster=cluster4hLevelsToZones(swings.highs,'resistance',candles);
    const supportZones=supCluster.zones.map((z)=>evaluate4hZone(z,candles,'support')).map((z)=>({ ...z, distancePct: z.upper<=currentPrice?((currentPrice-z.upper)/currentPrice)*100:((z.lower-currentPrice)/currentPrice)*100 }));
    const resistanceZones=resCluster.zones.map((z)=>evaluate4hZone(z,candles,'resistance')).map((z)=>({ ...z, distancePct: z.lower>=currentPrice?((z.lower-currentPrice)/currentPrice)*100:((currentPrice-z.upper)/currentPrice)*100 }));
    const supportSel=selectNearestAndStrongest4hZones(supportZones,currentPrice,'support');
    const resistanceSel=selectNearestAndStrongest4hZones(resistanceZones,currentPrice,'resistance');
    return {
      ok:true, reason:null, currentPrice, candleCount:candles.length,
      support:{ nearest:supportSel.nearest, strongest:supportSel.strongest },
      resistance:{ nearest:resistanceSel.nearest, strongest:resistanceSel.strongest },
      meta:{
        swingHighCount:swings.highs.length, swingLowCount:swings.lows.length,
        supportZoneCount:supportZones.length, resistanceZoneCount:resistanceZones.length,
        activeSupportCount:supportZones.filter((z)=>z.status==='Active').length,
        activeResistanceCount:resistanceZones.filter((z)=>z.status==='Active').length,
        tolerancePct:Math.max(supCluster.tolerancePct||0,resCluster.tolerancePct||0),
        avgRangeAbs:Math.max(supCluster.avgRangeAbs||0,resCluster.avgRangeAbs||0),
      }
    };
  }catch(e){
    console.error('4H SR scan failed:', e);
    return { ok:false, reason:'scan_failed', currentPrice:candles?.[candles.length-1]?.close??null, candleCount:Array.isArray(candles)?candles.length:0, support:{nearest:null,strongest:null}, resistance:{nearest:null,strongest:null}, meta:{swingHighCount:0,swingLowCount:0,supportZoneCount:0,resistanceZoneCount:0,activeSupportCount:0,activeResistanceCount:0,tolerancePct:0,avgRangeAbs:0} };
  }
}

function render4hSupportResistanceSummary(srSummary){
  const set=(el,val)=>{ if(el) el.textContent=val; };
  if(!srSummary || !srSummary.ok){
    set(els.lower4hSrNearestResistance,'Nearest Resistance: Not found');
    set(els.lower4hSrStrongestResistance,'Strongest Resistance: Not found');
    set(els.lower4hSrNearestSupport,'Nearest Support: Not found');
    set(els.lower4hSrStrongestSupport,'Strongest Support: Not found');
    set(els.lower4hSrState, srSummary?.reason==='not_enough_candles' ? '4H S/R unavailable: not enough candles' : '4H S/R unavailable');
    return;
  }
  const nr=srSummary.resistance.nearest, ns=srSummary.support.nearest, sr=srSummary.resistance.strongest, ss=srSummary.support.strongest;
  set(els.lower4hSrNearestResistance, nr ? `Nearest Resistance: ${format4hSrZone(nr)} | ${nr.strength} | Distance ${f1(Math.abs(nr.distancePct))}%` : 'Nearest Resistance: Not found');
  set(els.lower4hSrStrongestResistance, sr ? `Strongest Resistance: ${format4hSrZone(sr)} | ${sr.strength} | Touch ${sr.touchCount} | Rejection ${sr.rejectionCount}` : 'Strongest Resistance: Not found');
  set(els.lower4hSrNearestSupport, ns ? `Nearest Support: ${format4hSrZone(ns)} | ${ns.strength} | Distance ${f1(Math.abs(ns.distancePct))}%` : 'Nearest Support: Not found');
  set(els.lower4hSrStrongestSupport, ss ? `Strongest Support: ${format4hSrZone(ss)} | ${ss.strength} | Touch ${ss.touchCount} | Rejection ${ss.rejectionCount}` : 'Strongest Support: Not found');
  const notes=[];
  if(!nr) notes.push('No active resistance above current price in selected 4H range.');
  if(!ns) notes.push('No active support below current price in selected 4H range.');
  set(els.lower4hSrState, notes.length?notes.join(' '):'4H S/R available for current selected range.');
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
    updateMarketPreparationState({ h1: { structureStatus: st.status }, meta: { sourcesReady: { h1: true } } });
    renderMarketPreparationMap(buildMarketPreparationMap());
    mtfState.h1Structure = st.status;
    if(els.lower1hStructureSummary) els.lower1hStructureSummary.textContent=`1H Structure | Status: ${st.status} | Broken Level: ${st.broken?usd(st.broken):'—'} | Reference Swing: ${st.ref} | Latest Close: ${usd(st.latestClose)}`;
  } catch(e){
    console.error('1H structure scanner failed', e);
    latest1hStructureStatus = '1H structure unavailable';
    updateMarketPreparationState({ h1: { structureStatus: latest1hStructureStatus }, meta: { sourcesReady: { h1: true } } });
    renderMarketPreparationMap(buildMarketPreparationMap());
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
    updateMarketPreparationState({ h1: { sweepStatus: sweep.status }, meta: { sourcesReady: { h1: true } } });
    renderMarketPreparationMap(buildMarketPreparationMap());
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
  if(els.biasScannerList) els.biasScannerList.innerHTML='<div class="scanner-row">Loading scanner results...</div>';
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
  if(els.lower4hSrNearestResistance) els.lower4hSrNearestResistance.textContent="Nearest Resistance: loading";
  if(els.lower4hSrStrongestResistance) els.lower4hSrStrongestResistance.textContent="Strongest Resistance: loading";
  if(els.lower4hSrNearestSupport) els.lower4hSrNearestSupport.textContent="Nearest Support: loading";
  if(els.lower4hSrStrongestSupport) els.lower4hSrStrongestSupport.textContent="Strongest Support: loading";
  if(els.lower4hSrState) els.lower4hSrState.textContent="4H S/R: loading";
  if(els.lower1hSweepSummary) els.lower1hSweepSummary.textContent="1H Liquidity Sweep: loading";
  if(els.lower1hStructureSummary) els.lower1hStructureSummary.textContent="1H Structure: loading";
  if(els.lowerTfReactionSummary) els.lowerTfReactionSummary.textContent="Lower TF Reaction: loading";
  if(els.right4hFvgType) els.right4hFvgType.textContent='loading';
  if(els.rightFvgCount) els.rightFvgCount.textContent="Active FVG: loading";
  if(els.rightNearestFvg) els.rightNearestFvg.textContent="Nearest: loading";
  if(els.rightFvgStatus) els.rightFvgStatus.textContent="Status: loading";
  if(els.weeklySrResistanceZone) els.weeklySrResistanceZone.textContent="Resistance: loading";
  if(els.weeklySrResistanceMeta) els.weeklySrResistanceMeta.textContent="—";
  if(els.weeklySrSupportZone) els.weeklySrSupportZone.textContent="Support: loading";
  if(els.weeklySrSupportMeta) els.weeklySrSupportMeta.textContent="—";
  if(els.weeklySrMeaning) els.weeklySrMeaning.textContent="Meaning: loading";
  if(els.rightBiasTop) els.rightBiasTop.textContent="Top Bias: loading";
  if(els.rightBiasMeta) els.rightBiasMeta.textContent="Confidence: loading";
  if(els.rightDivergence) els.rightDivergence.textContent="loading";
  if(els.rightDivergenceMeta) els.rightDivergenceMeta.textContent="loading";
  if(els.mtfWeeklyBias) els.mtfWeeklyBias.textContent="Weekly Bias: waiting";
  if(els.mtf4hReaction) els.mtf4hReaction.textContent="4H Reaction: waiting";
  if(els.mtf1hTiming) els.mtf1hTiming.textContent="1H Timing: waiting";
  if(els.mtfFinalStatus) els.mtfFinalStatus.innerHTML='Final Status: <span class="status-badge status-waiting">Waiting</span>';
  if(els.weeklyCandleW1) els.weeklyCandleW1.textContent='W-1: loading';
  if(els.weeklyCandleW2) els.weeklyCandleW2.textContent='W-2: loading';
  if(els.weeklyCandleW3) els.weeklyCandleW3.textContent='W-3: loading';
  if(els.weeklyCandleReading) els.weeklyCandleReading.textContent='3W Reading: loading';
  if(els.weeklyCandleCondition) els.weeklyCandleCondition.textContent='Condition: loading';
  renderMarketPreparationMap({ upside: [], downside: [], currentRowText: "● Price unavailable | Waiting for ticker/4H/1H context" });
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
  updateMarketPreparationState({ currentPrice: p, meta: { sourcesReady: { ticker: true } } });
  renderMarketPreparationMap(buildMarketPreparationMap());
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
      const weeklySrSummary = scanWeeklySupportResistance(dataset);
      renderWeeklySupportResistance(weeklySrSummary);
      renderWeeklyCandleCharacter(dataset);
      renderMtfSummary();
      updateMarketPreparationState({ weekly: { fvgZones: activeFvgs, srSummary: weeklySrSummary }, meta: { sourcesReady: { weekly: true } } });
      renderMarketPreparationMap(buildMarketPreparationMap());
      weeklyOk = true;

      try { renderPriceChart(dataset); togglePriceChartError(""); renderFvgOverlay(activeFvgs, dataset); renderWeeklySrOverlay(weeklySrSummary, dataset); }
      catch (error) { console.error("Price chart render failed:", error); togglePriceChartError("Chart unavailable, but data is still loaded."); }

      try { renderRsiChart(dataset); toggleRsiChartError(""); }
      catch (error) { console.error("RSI chart render failed:", error); toggleRsiChartError("Chart unavailable, but data is still loaded."); }

    } catch (error) {
      console.error("Weekly pipeline failed:", error);
      els.rsiStatus.textContent = "Weekly Binance data unavailable.";
      els.analyticsStrip.textContent = "Weekly Binance data unavailable.";
      els.divergenceStatus.textContent = "Divergence Status: unavailable";
      els.divergenceText.textContent = "Weekly Binance data unavailable.";
      if(els.biasScannerList) els.biasScannerList.innerHTML='<div class="scanner-row">Scanner unavailable until weekly data loads.</div>';
    if(els.fvgList) els.fvgList.innerHTML='<div class="scanner-row">FVG section unavailable.</div>';
    if(els.rightFvgCount) els.rightFvgCount.textContent='Active FVG: unavailable';
    if(els.rightNearestFvg) els.rightNearestFvg.textContent='Nearest: unavailable';
    if(els.rightFvgStatus) els.rightFvgStatus.textContent='Status: unavailable';
    renderWeeklySupportResistance(null);
    if(els.rightBiasTop) els.rightBiasTop.textContent='Top Bias: unavailable';
    if(els.rightBiasMeta) els.rightBiasMeta.textContent='Confidence: unavailable';
    if(els.rightDivergence) els.rightDivergence.textContent='unavailable';
    if(els.rightDivergenceMeta) els.rightDivergenceMeta.textContent='unavailable';
    if(els.mtfFinalStatus) els.mtfFinalStatus.innerHTML='Final Status: <span class="status-badge status-waiting">Waiting</span>';
  if(els.weeklyCandleW1) els.weeklyCandleW1.textContent='W-1: loading';
  if(els.weeklyCandleW2) els.weeklyCandleW2.textContent='W-2: loading';
  if(els.weeklyCandleW3) els.weeklyCandleW3.textContent='W-3: loading';
  if(els.weeklyCandleReading) els.weeklyCandleReading.textContent='3W Reading: loading';
  if(els.weeklyCandleCondition) els.weeklyCandleCondition.textContent='Condition: loading'; 
    clearFvgOverlay();
    }
  } else {
    els.rsiStatus.textContent = "Weekly Binance data unavailable.";
    els.analyticsStrip.textContent = "Weekly Binance data unavailable.";
    els.divergenceStatus.textContent = "Divergence Status: unavailable";
    els.divergenceText.textContent = "Weekly Binance data unavailable.";
    if(els.biasScannerList) els.biasScannerList.innerHTML='<div class="scanner-row">Scanner unavailable until weekly data loads.</div>';
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

manualChartLines = loadManualChartLines();
manualChartDrawings = loadManualChartDrawings();
setupCollapsibleSections();

window.addEventListener("resize", ()=>{
  if(ltf4hChart && els.lower4hChart) ltf4hChart.resize(els.lower4hChart.clientWidth, els.lower4hChart.clientHeight);
  if(ltf1hChart && els.lower1hChart) ltf1hChart.resize(els.lower1hChart.clientWidth, els.lower1hChart.clientHeight);
  scheduleTrendlineRedraw("weekly");
  scheduleTrendlineRedraw("h4");
  if(ltf4hChart) { schedule4hFvgOverlayRedraw(latest4hCandles); schedule4hSrOverlayRedraw(latest4hCandles); renderLowerTfReactionSummary(); }
});
