const BTC_TICKER_URL = "https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT";
const BTC_WEEKLY_KLINE_URL = "https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120";
const FEAR_GREED_URL = "https://api.alternative.me/fng/?limit=1";
const RSI_PERIOD = 14;
const RSI_WINDOW = 49;
// IMPORTANT:
// Update APP_LAST_UPDATED every time the app code is modified or deployed.
// This value represents app/code update time, not live API refresh time.
const APP_LAST_UPDATED = "2026-05-30 00:00";

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
  prepCurrentDetail: document.getElementById("prepCurrentDetail"), prepCurrentDetailContent: document.getElementById("prepCurrentDetailContent"), prepCurrentDetailToggle: document.getElementById("prepCurrentDetailToggle"),
  fvgToggleBtn: document.getElementById("fvgToggleBtn"), biasToggleBtn: document.getElementById("biasToggleBtn"), fvgContent: document.getElementById("fvgContent"), biasContent: document.getElementById("biasContent"), fvgViewDetailsBtn: document.getElementById("fvgViewDetailsBtn"), biasViewDetailsBtn: document.getElementById("biasViewDetailsBtn"),
  priceChart: document.getElementById("priceChart"), priceChartError: document.getElementById("priceChartError"), rsiChart: document.getElementById("rsiChart"), rsiChartError: document.getElementById("rsiChartError"),
  ltfPanel: document.getElementById("ltfPanel"), ltfToggleBtn: document.getElementById("ltfToggleBtn"), ltfContent: document.getElementById("ltfContent"),
  ltfStartDate: document.getElementById("ltfStartDate"), ltfEndDate: document.getElementById("ltfEndDate"), ltfApplyBtn: document.getElementById("ltfApplyBtn"), ltfResetBtn: document.getElementById("ltfResetBtn"),
  lowerDailyChart: document.getElementById("lowerDailyChart"), lowerDailyError: document.getElementById("lowerDailyError"), lowerDailyMeta: document.getElementById("lowerDailyMeta"), lowerDailyPatternSummary: document.getElementById("lowerDailyPatternSummary"), lowerDailyPatternOverlay: document.getElementById("lowerDailyPatternOverlay"), lower4hMeta: document.getElementById("lower4hMeta"), lower1hMeta: document.getElementById("lower1hMeta"), lower4hChart: document.getElementById("lower4hChart"), lower1hChart: document.getElementById("lower1hChart"), lower4hError: document.getElementById("lower4hError"), lower1hError: document.getElementById("lower1hError"), lower4hFvgSummary: document.getElementById("lower4hFvgSummary"), lower4hStructure: document.getElementById("lower4hStructure"), lower4hReaction: document.getElementById("lower4hReaction"),
  lower1hSweepSummary: document.getElementById("lower1hSweepSummary"), lower1hStructureSummary: document.getElementById("lower1hStructureSummary"), lowerTfReactionSummary: document.getElementById("lowerTfReactionSummary"), lower4hFvgOverlay: document.getElementById("lower4hFvgOverlay"), lower4hSrOverlay: document.getElementById("lower4hSrOverlay"), lower4hSrNearestResistance: document.getElementById("lower4hSrNearestResistance"), lower4hSrStrongestResistance: document.getElementById("lower4hSrStrongestResistance"), lower4hSrNearestSupport: document.getElementById("lower4hSrNearestSupport"), lower4hSrStrongestSupport: document.getElementById("lower4hSrStrongestSupport"), lower4hSrState: document.getElementById("lower4hSrState"),
  ltfDateControls: document.getElementById("ltfDateControls"), ltfPreset1w: document.getElementById("ltfPreset1w"), ltfPreset2w: document.getElementById("ltfPreset2w"), ltfPreset1m: document.getElementById("ltfPreset1m"), ltfPreset3m: document.getElementById("ltfPreset3m"), ltfPresetCustom: document.getElementById("ltfPresetCustom"), dailyPreset3m: document.getElementById("dailyPreset3m"), dailyPreset6m: document.getElementById("dailyPreset6m"), dailyPreset1y: document.getElementById("dailyPreset1y"), dailyLayerToggleBtn: document.getElementById("dailyLayerToggleBtn"), dailyLayerMenu: document.getElementById("dailyLayerMenu"), h4LayerToggleBtn: document.getElementById("h4LayerToggleBtn"), h4LayerMenu: document.getElementById("h4LayerMenu"),
  weeklyAddLineBtn: document.getElementById("weeklyAddLineBtn"), weeklyDrawLineBtn: document.getElementById("weeklyDrawLineBtn"), weeklyDrawTrendlineBtn: document.getElementById("weeklyDrawTrendlineBtn"), weeklyManageBtn: document.getElementById("weeklyManageBtn"), h4AddLineBtn: document.getElementById("h4AddLineBtn"), h4DrawLineBtn: document.getElementById("h4DrawLineBtn"), h4DrawTrendlineBtn: document.getElementById("h4DrawTrendlineBtn"), h4ManageBtn: document.getElementById("h4ManageBtn"),
  exportPdfBtn: document.getElementById("exportPdfBtn"), pdfReportRoot: document.getElementById("pdfReportRoot"), drawingManagerModal: document.getElementById("drawingManagerModal"), drawingManagerTitle: document.getElementById("drawingManagerTitle"), drawingManagerLinesList: document.getElementById("drawingManagerLinesList"), drawingManagerTrendlinesList: document.getElementById("drawingManagerTrendlinesList"), drawingManagerClearAllBtn: document.getElementById("drawingManagerClearAllBtn"), drawingManagerCloseBtn: document.getElementById("drawingManagerCloseBtn"),
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
let weeklyDatasetCache = [];
let ltfDailyChart = null;
let ltf4hChart = null;
let ltf1hChart = null;
let ltfDailySeries = null;
let ltf4hSeries = null;
let ltf1hSeries = null;
let latest1hCandles = [];
let current4hFvgPriceLines = [];
let current4hFvgOverlays = [];
let ltf4hFvgLayer = null;
let fvgRedrawPending = false;
let active4hFvgs = [];
let latestDailyCandles = [];
let latest4hCandles = [];
let srRedrawPending = false;
let latest4hSrSummary = null;
let latest4hStructureStatus = "No clear 4H structure shift";
let latest1hSweepStatus = "No recent 1H liquidity sweep";
let latest1hStructureStatus = "No clear 1H structure shift";
let activeLowerTfMode = "3M";
let activeDailyRange = "6M";
let ltfVisible = false;
let dailyPreset = "6m";
let ltfPreset = "3m";
const DAILY_PRESET_LIMITS = { "3m": 92, "6m": 183, "1y": 365 };
let lowerTimeframeLoaded = false;
let fvgOpen=false;
let biasOpen=false;
const MANUAL_LINES_KEY = "pl_manual_chart_lines_v1";
const MANUAL_DRAWINGS_KEY = "pl_manual_chart_drawings_v1";
const MAX_MANUAL_LINES_PER_CHART = 30;
const MAX_MANUAL_DRAWINGS_PER_CHART = 30;
const CHART_LAYER_STORAGE_KEY = "pulseLab.chartLayers.v1";
const DEFAULT_CHART_LAYER_STATE = {
  daily: { patternSummary: true, patternLines: true },
  h4: { fvg: true, sr: true, manualLines: true, trendlines: true },
};
let chartLayerState = null;
let manualChartLines = { weekly: [], h4: [] };
let manualChartDrawings = { weekly: [], h4: [] };
const manualLineHandles = { weekly: [], h4: [] };
let manualLinePlacement = { active: false, chartKey: null };
let weeklyPlacementHandler = null;
let h4PlacementHandler = null;
let trendlineDrawMode = { active: false, chartKey: null, startPoint: null };
let drawingManagerChartKey = null;
let prepCurrentDetailOpen = false;
const mtfState = { weeklyDirection: null, weeklyPhase: null, weeklyDivergence: null, topBias: null, h4Structure: null, h4FvgNearest: null, h1Sweep: null, h1Structure: null };
const marketPreparationState = {
  currentPrice: null,
  weekly: { fvgZones: [], srSummary: null },
  daily: { candles: [], fvgZones: [], srSummary: null, structureStatus: null, candleContext: null, volumeStatus: null, recentReaction: null, pattern: createEmptyDailyPattern("6M"), meta: { rangeMode: "6M", preset: "6m", candleCount: 0, updatedAt: null } },
  h4: { fvgZones: [], srSummary: null, structureStatus: null, rsiStatus: null, volumeStatus: null, recentReaction: { lastBrokenFvg: null, lastMitigatedFvg: null, lastBrokenSupport: null, lastBrokenResistance: null, lastReactionLabel: null, updatedAt: null } },
  h1: { sweepStatus: null, structureStatus: null, stochastic: { ok: false, k: null, d: null, prevK: null, prevD: null, label: "Stoch unavailable", reason: null, status: "idle" } },
  mtf: { finalStatus: null, weeklyBias: null, reaction4h: null, timing1h: null },
  ticker: { change24hPct: null },
  sentiment: { value: null, label: null, updatedAt: null },
  currentPricePosition: { currentPosition: null, nearestUpsideZone: null, nearestDownsideZone: null, recentReaction: null, timeframe: "4H", updatedAt: null },
  map: { upside: [], downside: [], currentRowText: "● Price unavailable" },
  meta: { lastUpdatedMs: null, sourcesReady: { ticker: false, weekly: false, daily: false, h4: false, h1: false } },
};

const f1=(n)=>Number(n).toFixed(1), f2=(n)=>Number(n).toFixed(2), signed1=(n)=>`${n>=0?"+":""}${f1(n)}`, signed2=(n)=>`${n>=0?"+":""}${f2(n)}`;
const usd=(v)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:v>1000?0:2}).format(v);
function toNullableNumber(value){ if(value === null || value === undefined || value === "") return null; const n = Number(value); return Number.isFinite(n) ? n : null; }
function cloneDefaultChartLayers(){ return JSON.parse(JSON.stringify(DEFAULT_CHART_LAYER_STATE)); }
function mergeChartLayerDefaults(saved){
  const merged = cloneDefaultChartLayers();
  if(!saved || typeof saved !== "object") return merged;
  Object.keys(DEFAULT_CHART_LAYER_STATE).forEach((chartKey)=>{
    const src = saved[chartKey];
    if(!src || typeof src !== "object") return;
    Object.keys(DEFAULT_CHART_LAYER_STATE[chartKey]).forEach((layerKey)=>{
      if(typeof src[layerKey] === "boolean") merged[chartKey][layerKey] = src[layerKey];
    });
  });
  return merged;
}
function loadChartLayerState(){
  try{
    const raw = localStorage.getItem(CHART_LAYER_STORAGE_KEY);
    if(!raw) return cloneDefaultChartLayers();
    return mergeChartLayerDefaults(JSON.parse(raw));
  }catch(e){
    console.warn("Chart layer settings reset to defaults:", e);
    return cloneDefaultChartLayers();
  }
}
function saveChartLayerState(){
  try{ localStorage.setItem(CHART_LAYER_STORAGE_KEY, JSON.stringify(mergeChartLayerDefaults(chartLayerState))); }
  catch(e){ console.warn("Chart layer settings could not be saved:", e); }
}
function getChartLayer(chartKey, layerKey){
  if(!chartLayerState) chartLayerState = loadChartLayerState();
  const defaultValue = DEFAULT_CHART_LAYER_STATE?.[chartKey]?.[layerKey];
  if(typeof defaultValue !== "boolean") return true;
  const value = chartLayerState?.[chartKey]?.[layerKey];
  return typeof value === "boolean" ? value : defaultValue;
}
function setChartLayer(chartKey, layerKey, value){
  if(!DEFAULT_CHART_LAYER_STATE?.[chartKey] || !(layerKey in DEFAULT_CHART_LAYER_STATE[chartKey])) return;
  if(!chartLayerState) chartLayerState = loadChartLayerState();
  chartLayerState[chartKey] = { ...DEFAULT_CHART_LAYER_STATE[chartKey], ...(chartLayerState[chartKey] || {}) };
  chartLayerState[chartKey][layerKey] = Boolean(value);
  saveChartLayerState();
  syncChartLayerControls();
  applyChartLayerVisibility(chartKey);
}
function resetChartLayers(chartKey){
  if(!DEFAULT_CHART_LAYER_STATE?.[chartKey]) return;
  if(!chartLayerState) chartLayerState = loadChartLayerState();
  chartLayerState[chartKey] = { ...DEFAULT_CHART_LAYER_STATE[chartKey] };
  saveChartLayerState();
  syncChartLayerControls();
  applyChartLayerVisibility(chartKey);
}
function syncChartLayerControls(){
  document.querySelectorAll('[data-chart-key][data-layer-key]').forEach((input)=>{
    input.checked = getChartLayer(input.dataset.chartKey, input.dataset.layerKey);
  });
}
function setLayerMenuOpen(chartKey, open){
  const menu = chartKey === "daily" ? els.dailyLayerMenu : els.h4LayerMenu;
  const btn = chartKey === "daily" ? els.dailyLayerToggleBtn : els.h4LayerToggleBtn;
  if(menu) menu.hidden = !open;
  if(btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
}
function closeChartLayerMenus(){ setLayerMenuOpen("daily", false); setLayerMenuOpen("h4", false); }
function toggleChartLayerMenu(chartKey){
  const menu = chartKey === "daily" ? els.dailyLayerMenu : els.h4LayerMenu;
  const nextOpen = Boolean(menu?.hidden);
  closeChartLayerMenus();
  setLayerMenuOpen(chartKey, nextOpen);
}
function bindChartLayerControls(){
  [[els.dailyLayerToggleBtn,"daily"],[els.h4LayerToggleBtn,"h4"]].forEach(([btn, chartKey])=>{
    btn?.addEventListener("click", (e)=>{ e.stopPropagation(); toggleChartLayerMenu(chartKey); });
  });
  [els.dailyLayerMenu, els.h4LayerMenu].forEach((menu)=>{
    menu?.addEventListener("click", (e)=>e.stopPropagation());
  });
  document.querySelectorAll('[data-chart-key][data-layer-key]').forEach((input)=>{
    input.addEventListener("change", ()=>setChartLayer(input.dataset.chartKey, input.dataset.layerKey, input.checked));
  });
  document.querySelectorAll('[data-layer-reset]').forEach((btn)=>{
    btn.addEventListener("click", ()=>resetChartLayers(btn.dataset.layerReset));
  });
  document.addEventListener("click", closeChartLayerMenus);
  syncChartLayerControls();
  applyAllChartLayerVisibility();
}
function applyDailyLayerVisibility(){
  if(els.lowerDailyPatternSummary) els.lowerDailyPatternSummary.hidden = !getChartLayer("daily", "patternSummary");
  if(getChartLayer("daily", "patternLines")) renderDailyPatternOverlay();
  else clearDailyPatternOverlay();
}
function clearH4ManualLineHandles(){
  (manualLineHandles.h4 || []).forEach((h)=>{ try { ltf4hSeries?.removePriceLine(h); } catch(_){} });
  manualLineHandles.h4 = [];
}
function applyH4LayerVisibility(){
  if(getChartLayer("h4", "fvg")) schedule4hFvgOverlayRedraw(latest4hCandles);
  else clear4hFvgOverlay();
  if(getChartLayer("h4", "sr")) schedule4hSrOverlayRedraw(latest4hCandles);
  else clear4hSrOverlay();
  if(getChartLayer("h4", "manualLines")) applyManualLinesTo4hChart();
  else clearH4ManualLineHandles();
  if(getChartLayer("h4", "trendlines")) renderTrendlinesForChart("h4");
  else clearTrendlineOverlay("h4");
}
function applyChartLayerVisibility(chartKey){
  if(chartKey === "daily") applyDailyLayerVisibility();
  else if(chartKey === "h4") applyH4LayerVisibility();
}
function applyAllChartLayerVisibility(){ applyDailyLayerVisibility(); applyH4LayerVisibility(); }
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
  if(chartKey === "h4" && !getChartLayer("h4", "manualLines")) return;
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
    if(chartKey === "h4" && !getChartLayer("h4", "trendlines")){ clearTrendlineOverlay("h4"); return; }
    const layer = chartKey === "weekly" ? els.weeklyTrendlineOverlay : els.h4TrendlineOverlay;
    const chart = chartKey === "weekly" ? priceChart : ltf4hChart;
    const series = chartKey === "weekly" ? candleSeries : ltf4hSeries;
    if(!layer || !chart || !series){ clearTrendlineOverlay(chartKey); return; }
    const drawings = getManualDrawings(chartKey).filter((d)=>d.kind==="trendline");
    if(!drawings.length){ clearTrendlineOverlay(chartKey); return; }
    const svgns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgns, "svg");
    drawings.forEach((d)=>{
      const startNorm = normalizeTrendlineTimeForChart(chartKey, d.start?.time);
      const endNorm = normalizeTrendlineTimeForChart(chartKey, d.end?.time);
      const x1 = startNorm == null ? null : chart.timeScale().timeToCoordinate(startNorm);
      const x2 = endNorm == null ? null : chart.timeScale().timeToCoordinate(endNorm);
      const y1 = series.priceToCoordinate(Number(d.start?.price));
      const y2 = series.priceToCoordinate(Number(d.end?.price));
      if(!Number.isFinite(x1)||!Number.isFinite(x2)||!Number.isFinite(y1)||!Number.isFinite(y2)){
        console.warn("Trendline coordinate conversion failed", { chartKey, startTime: d.start?.time, endTime: d.end?.time, startNorm, endNorm });
        return;
      }
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
function normalizeTrendlineTimeForChart(chartKey, time){
  if(time == null) return null;
  const toDateString = (input)=>{
    if(typeof input === "string"){
      if(/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;
      const d = new Date(input);
      return Number.isFinite(d.getTime()) ? d.toISOString().slice(0,10) : null;
    }
    if(typeof input === "number"){
      const ms = input > 1e12 ? input : input * 1000;
      const d = new Date(ms);
      return Number.isFinite(d.getTime()) ? d.toISOString().slice(0,10) : null;
    }
    if(typeof input === "object" && "year" in input && "month" in input && "day" in input){
      const mm = String(input.month).padStart(2,"0");
      const dd = String(input.day).padStart(2,"0");
      return `${input.year}-${mm}-${dd}`;
    }
    return null;
  };
  const toUnix = (input)=>{
    if(typeof input === "number") return Number.isFinite(input) ? Math.floor(input > 1e12 ? input/1000 : input) : null;
    if(typeof input === "string"){
      const d = new Date(input);
      return Number.isFinite(d.getTime()) ? Math.floor(d.getTime()/1000) : null;
    }
    if(typeof input === "object" && "year" in input && "month" in input && "day" in input){
      const d = new Date(Date.UTC(input.year, input.month-1, input.day, 0, 0, 0));
      return Number.isFinite(d.getTime()) ? Math.floor(d.getTime()/1000) : null;
    }
    return null;
  };
  return chartKey === "weekly" ? toDateString(time) : toUnix(time);
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
  const rawTime = chart.timeScale().coordinateToTime(x);
  const time = normalizeTrendlineTimeForChart(chartKey, rawTime);
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
function deleteManagedLine(chartKey, lineId){
  deleteManualLine(chartKey, lineId);
  rebuildManualLines(chartKey);
  renderDrawingManager(chartKey);
}
function deleteManagedTrendline(chartKey, drawingId){
  deleteManualDrawing(chartKey, drawingId);
  renderTrendlinesForChart(chartKey);
  renderDrawingManager(chartKey);
}
function clearAllManagedDrawings(chartKey){
  clearManualLines(chartKey);
  clearManualDrawings(chartKey);
  rebuildManualLines(chartKey);
  clearTrendlineOverlay(chartKey);
  renderTrendlinesForChart(chartKey);
  renderDrawingManager(chartKey);
}
function renderDrawingManager(chartKey){
  if(!els.drawingManagerLinesList || !els.drawingManagerTrendlinesList || !els.drawingManagerTitle) return;
  const lines = getManualLines(chartKey);
  const trends = getManualDrawings(chartKey).filter((d)=>d.kind==="trendline");
  els.drawingManagerTitle.textContent = `Manage Chart Drawings (${chartKey === 'weekly' ? 'Weekly' : '4H'})`;
  els.drawingManagerLinesList.innerHTML = lines.length
    ? lines.map((l)=>`<div class="drawing-manager-item"><span>${f1(l.price)} | ${l.type} | ${l.label}</span><button class="refresh-btn secondary btn-danger" data-kind="line" data-id="${l.id}" type="button">Delete</button></div>`).join("")
    : `<div class="drawing-manager-item"><span>No horizontal lines.</span></div>`;
  els.drawingManagerTrendlinesList.innerHTML = trends.length
    ? trends.map((t)=>`<div class="drawing-manager-item"><span>Trendline | ${t.type || "Custom"} | ${t.label || "Manual Trendline"}</span><button class="refresh-btn secondary btn-danger" data-kind="trendline" data-id="${t.id}" type="button">Delete</button></div>`).join("")
    : `<div class="drawing-manager-item"><span>No trendlines.</span></div>`;
}
function openDrawingManager(chartKey){
  drawingManagerChartKey = chartKey;
  renderDrawingManager(chartKey);
  if(els.drawingManagerModal) els.drawingManagerModal.hidden = false;
}
function closeDrawingManager(){
  drawingManagerChartKey = null;
  if(els.drawingManagerModal) els.drawingManagerModal.hidden = true;
}
function bindDrawingManagerEvents(){
  if(!els.drawingManagerModal) return;
  els.drawingManagerModal.addEventListener("click", (e)=>{
    const target = e.target;
    if(!(target instanceof HTMLElement)) return;
    if(target.classList.contains("drawing-manager-backdrop")) closeDrawingManager();
    if(target.id === "drawingManagerCloseBtn") closeDrawingManager();
    if(target.id === "drawingManagerClearAllBtn" && drawingManagerChartKey){
      clearAllManagedDrawings(drawingManagerChartKey);
    }
    if(target.dataset.kind === "line" && drawingManagerChartKey){
      deleteManagedLine(drawingManagerChartKey, target.dataset.id);
    }
    if(target.dataset.kind === "trendline" && drawingManagerChartKey){
      deleteManagedTrendline(drawingManagerChartKey, target.dataset.id);
    }
  });
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

function normalizeMapZoneRow(row, currentPrice){
  if(!row || !Number.isFinite(row.lower) || !Number.isFinite(row.upper)) return null;
  const lower = Math.min(row.lower, row.upper);
  const upper = Math.max(row.lower, row.upper);
  const center = (lower + upper) / 2;
  const distancePct = prepDistancePct(currentPrice, lower, upper);
  const sourceRank = { daily_pattern_resistance: 8, daily_pattern_support: 8, daily_pattern_range_resistance: 8, daily_pattern_range_support: 8, daily_sr: 6, daily_fvg: 5, h4_sr: 4, h4_fvg: 3, weekly_sr: 2, weekly_fvg: 1 }[row.source] || 0;
  return {
    ...row,
    lower,
    upper,
    center,
    sourceRank,
    priorityScore: Number(row.priorityScore) || 0,
    distancePct,
    distanceText: distancePct===null ? '—' : `${f1(distancePct)}%`,
    zoneText: `${usd(lower)}–${usd(upper)}`,
    sources: [{ ...row, lower, upper, center }],
    confluenceCount: 1,
    confluenceLabel: row.label || row.source || 'Zone',
    primarySource: row.source || 'unknown',
  };
}
function getZoneOverlapRatio(a, b){
  if(!a || !b) return 0;
  const overlap = Math.max(0, Math.min(a.upper, b.upper) - Math.max(a.lower, b.lower));
  const aw = Math.max(0, a.upper - a.lower);
  const bw = Math.max(0, b.upper - b.lower);
  const denom = Math.max(1e-9, Math.min(aw || 0, bw || 0));
  return overlap / denom;
}
function zonesOverlap(a, b){ return getZoneOverlapRatio(a,b) > 0; }
function getZoneGapPct(a, b, currentPrice){
  if(!a || !b) return null;
  const gap = a.upper < b.lower ? b.lower - a.upper : b.upper < a.lower ? a.lower - b.upper : 0;
  const denom = Number.isFinite(currentPrice) && currentPrice > 0 ? currentPrice : Math.max(1, ((a.center || 0) + (b.center || 0)) / 2);
  return gap / denom;
}
function shouldMergeMapRows(a, b, currentPrice){
  if(!a || !b || a.side !== b.side) return false;
  const denom = Number.isFinite(currentPrice) && currentPrice > 0 ? currentPrice : Math.max(1, ((a.center || 0) + (b.center || 0)) / 2);
  const centerDistancePct = Math.abs(a.center - b.center) / denom;
  const gapPct = getZoneGapPct(a, b, currentPrice);
  return getZoneOverlapRatio(a,b) >= 0.35 || centerDistancePct < 0.0035 || (Number.isFinite(gapPct) && gapPct < 0.005);
}
function formatConfluenceQuality(row){
  const labels = [...new Set((row.sources || []).map((s)=>s.label || s.source).filter(Boolean))];
  return labels.length ? labels.join(' + ') : (row.quality || 'Confluence');
}
function mergeConfluenceRows(rows, currentPrice){
  const normalized = (rows || []).map((r)=>normalizeMapZoneRow(r, currentPrice)).filter(Boolean);
  const better = (a,b)=> (a.priorityScore - b.priorityScore) || (a.sourceRank - b.sourceRank) || ((b.distancePct ?? 999) - (a.distancePct ?? 999));
  const sorted = normalized.sort((a,b)=>better(b,a));
  const groups = [];
  for(const row of sorted){
    const group = groups.find((g)=>shouldMergeMapRows(g, row, currentPrice));
    if(!group){ groups.push({ ...row, primary: row }); continue; }
    group.sources.push(...row.sources);
    group.lower = Math.min(group.lower, row.lower);
    group.upper = Math.max(group.upper, row.upper);
    group.center = (group.lower + group.upper) / 2;
    if(better(row, group.primary) > 0) group.primary = row;
  }
  return groups.map((g)=>{
    const uniqueSources=[];
    const seen=new Set();
    for(const src of g.sources){
      const key=`${src.source}|${src.label}|${Number(src.lower).toFixed(2)}|${Number(src.upper).toFixed(2)}`;
      if(seen.has(key)) continue;
      seen.add(key);
      uniqueSources.push(src);
    }
    const distancePct = prepDistancePct(currentPrice, g.lower, g.upper);
    const confluenceCount = uniqueSources.length;
    const primary = g.primary || g;
    const baseScore = Math.max(...uniqueSources.map((s)=>Number(s.priorityScore)||0), primary.priorityScore || 0);
    const priorityScore = baseScore + Math.max(0, confluenceCount - 1) * 8 - (Number.isFinite(distancePct) ? Math.min(distancePct, 10) * 0.25 : 0);
    const row = {
      ...primary,
      lower: g.lower,
      upper: g.upper,
      center: (g.lower + g.upper) / 2,
      distancePct,
      distanceText: distancePct===null ? '—' : `${f1(distancePct)}%`,
      zoneText: `${usd(g.lower)}–${usd(g.upper)}`,
      sources: uniqueSources,
      confluenceCount,
      confluenceLabel: uniqueSources.map((s)=>s.label || s.source).filter(Boolean).join(' + '),
      primarySource: primary.source || 'unknown',
      priorityScore,
    };
    if(confluenceCount > 1){
      row.label = 'Confluence Zone';
      row.quality = formatConfluenceQuality(row);
      row.detail = row.confluenceLabel;
    }
    return row;
  }).sort((a,b)=> (b.priorityScore-a.priorityScore) || ((a.distancePct ?? 999)-(b.distancePct ?? 999))).slice(0,3);
}


function isActionableDailyPattern(pattern){ return !!pattern?.ok && ["Valid", "Strong"].includes(pattern.status); }
function isBrokenDailyPattern(pattern){ return !!pattern?.ok && pattern.status === "Broken"; }
function formatDailyPatternName(pattern){ return pattern?.ok ? pattern.type : "No clear Daily channel/range"; }
function formatDailyPatternTouches(pattern){ return pattern?.ok ? `Support ${pattern.supportTouches || 0}x / Resistance ${pattern.resistanceTouches || 0}x` : "—"; }
function formatDailyPatternCaption(pattern){
  if(!pattern?.ok) return "Daily Pattern: No clear Daily channel/range detected";
  return `Daily Pattern: ${pattern.type} · ${pattern.status} · ${pattern.currentPosition || "Position unavailable"} · Touches ${pattern.supportTouches || 0}/${pattern.resistanceTouches || 0}`;
}
function getDailyPatternBoundaryValues(pattern, candles = marketPreparationState.daily?.candles || latestDailyCandles){
  if(!pattern?.ok || !Array.isArray(candles) || !candles.length) return null;
  const latestIndex = candles.length - 1;
  const lower = getLineValueAtIndex(pattern.supportLine, latestIndex);
  const upper = getLineValueAtIndex(pattern.resistanceLine, latestIndex);
  if(!Number.isFinite(lower) || !Number.isFinite(upper)) return null;
  return { lower: Math.min(lower, upper), upper: Math.max(lower, upper), latestIndex };
}
function getDailyPatternBoundaryZone(price, boundaryPrice){
  if(!Number.isFinite(boundaryPrice)) return null;
  const avgRange = getAverageDailyRange(marketPreparationState.daily?.candles || latestDailyCandles);
  const base = Number.isFinite(price) && price > 0 ? price : boundaryPrice;
  const halfWidth = Math.max(base * 0.0025, avgRange * 0.15, boundaryPrice * 0.0015);
  return { lower: boundaryPrice - halfWidth, upper: boundaryPrice + halfWidth };
}
function getDailyPatternBoundaryLabels(pattern){
  const isRange = pattern?.type === "Horizontal Range";
  return {
    support: isRange ? "Daily Range Support" : "Daily Channel Support",
    resistance: isRange ? "Daily Range Resistance" : "Daily Channel Resistance",
    supportSource: isRange ? "daily_pattern_range_support" : "daily_pattern_support",
    resistanceSource: isRange ? "daily_pattern_range_resistance" : "daily_pattern_resistance",
    quality: pattern?.ok ? `${pattern.status} ${isRange ? "Daily Range" : pattern.type}` : "Daily Pattern",
  };
}
function getDailyPatternRecentReaction(pattern){
  if(!isBrokenDailyPattern(pattern)) return null;
  if(pattern.type === "Horizontal Range") return pattern.breakoutStatus === "Breakout" ? "Daily Range Breakout" : pattern.breakoutStatus === "Breakdown" ? "Daily Range Breakdown" : "Broken Daily Range";
  return `Broken Daily ${pattern.type}`;
}
function getDailyPatternKeyZoneContext(state){
  const pattern = state?.daily?.pattern;
  if(isBrokenDailyPattern(pattern)) return { currentPosition:null, recentReaction:getDailyPatternRecentReaction(pattern) };
  if(!isActionableDailyPattern(pattern)) return { currentPosition:null, recentReaction:null };
  const isRange = pattern.type === "Horizontal Range";
  const pos = String(pattern.currentPosition || "").toLowerCase();
  if(pos.includes("support") || pos.includes("lower")) return { currentPosition:`Near Daily ${isRange ? "Range Support" : "Channel Support"}`, recentReaction:null };
  if(pos.includes("resistance") || pos.includes("upper")) return { currentPosition:`Near Daily ${isRange ? "Range Resistance" : "Channel Resistance"}`, recentReaction:null };
  return { currentPosition:null, recentReaction:null };
}
function addDailyPatternMapRows(add, price){
  const pattern = marketPreparationState.daily?.pattern;
  if(!isActionableDailyPattern(pattern)) return;
  const boundaries = getDailyPatternBoundaryValues(pattern);
  if(!boundaries) return;
  const labels = getDailyPatternBoundaryLabels(pattern);
  const supportZone = getDailyPatternBoundaryZone(price, boundaries.lower);
  const resistanceZone = getDailyPatternBoundaryZone(price, boundaries.upper);
  if(supportZone) add({ side:'downside', symbol:'▼', lower:supportZone.lower, upper:supportZone.upper, label:labels.support, quality:labels.quality, source:labels.supportSource, priorityScore:48, detail:`${labels.support} · ${formatDailyPatternCaption(pattern)}` });
  if(resistanceZone) add({ side:'upside', symbol:'▲', lower:resistanceZone.lower, upper:resistanceZone.upper, label:labels.resistance, quality:labels.quality, source:labels.resistanceSource, priorityScore:48, detail:`${labels.resistance} · ${formatDailyPatternCaption(pattern)}` });
}
function getDailyPatternDetail(pattern = marketPreparationState.daily?.pattern){
  return {
    ok: !!pattern?.ok,
    pattern: formatDailyPatternName(pattern),
    status: pattern?.ok ? pattern.status : "Unavailable",
    position: pattern?.ok ? (pattern.currentPosition || "Position unavailable") : "—",
    touches: formatDailyPatternTouches(pattern),
    reason: pattern?.ok ? (pattern.reason || "Daily pattern detected.") : "No clear Daily channel/range detected",
    caption: formatDailyPatternCaption(pattern),
  };
}

function buildMarketPreparationMap(){
  try{
    const price = marketPreparationState.currentPrice;
    const rows = [];
    const add = (row) => { const normalized = normalizeMapZoneRow(row, price); if(normalized) rows.push(normalized); };
    (marketPreparationState.weekly.fvgZones||[]).forEach((z)=>add({ side: z.type?.includes("Bullish")?'downside':'upside', symbol: z.type?.includes("Bullish")?'▼':'▲', lower: z.lower, upper: z.upper, label: z.type?.includes("Bullish")?'W Bullish FVG':'W Bearish FVG', quality: z.status||'Valid', source:'weekly_fvg', priorityScore:20, detail:'' }));
    const wsr = marketPreparationState.weekly.srSummary;
    if(wsr?.support) add({ side:'downside', symbol:'▼', lower:wsr.support.lower, upper:wsr.support.upper, label:'W Support', quality:wsr.support.strength||'Strong', source:'weekly_sr', priorityScore:25, detail:'' });
    if(wsr?.resistance) add({ side:'upside', symbol:'▲', lower:wsr.resistance.lower, upper:wsr.resistance.upper, label:'W Resistance', quality:wsr.resistance.strength||'Strong', source:'weekly_sr', priorityScore:25, detail:'' });
    (marketPreparationState.daily.fvgZones||[]).forEach((z)=>add({ side: z.type?.includes("Bullish")?'downside':'upside', symbol: z.type?.includes("Bullish")?'▼':'▲', lower: z.lower, upper: z.upper, label: z.type?.includes("Bullish")?'Daily Bullish FVG':'Daily Bearish FVG', quality: z.status||'Valid', source:'daily_fvg', priorityScore:36, detail:'' }));
    const dsr = marketPreparationState.daily.srSummary;
    if(dsr?.support?.nearest) add({ side:'downside', symbol:'▼', lower:dsr.support.nearest.lower, upper:dsr.support.nearest.upper, label:'Daily Support', quality:`Touch ${dsr.support.nearest.touchCount}x`, source:'daily_sr', priorityScore:44, detail:'' });
    if(dsr?.resistance?.nearest) add({ side:'upside', symbol:'▲', lower:dsr.resistance.nearest.lower, upper:dsr.resistance.nearest.upper, label:'Daily Resistance', quality:`Touch ${dsr.resistance.nearest.touchCount}x`, source:'daily_sr', priorityScore:44, detail:'' });
    addDailyPatternMapRows(add, price);
    (marketPreparationState.h4.fvgZones||[]).forEach((z)=>add({ side: z.type?.includes("Bullish")?'downside':'upside', symbol: z.type?.includes("Bullish")?'▼':'▲', lower: z.lower, upper: z.upper, label: z.type?.includes("Bullish")?'4H Bullish FVG':'4H Bearish FVG', quality: z.status||'High Prob', source:'h4_fvg', priorityScore:32, detail:'' }));
    const h4sr = marketPreparationState.h4.srSummary;
    if(h4sr?.support?.nearest) add({ side:'downside', symbol:'▼', lower:h4sr.support.nearest.lower, upper:h4sr.support.nearest.upper, label:'4H Support', quality:`Touch ${h4sr.support.nearest.touchCount}x`, source:'h4_sr', priorityScore:40, detail:'' });
    if(h4sr?.resistance?.nearest) add({ side:'upside', symbol:'▲', lower:h4sr.resistance.nearest.lower, upper:h4sr.resistance.nearest.upper, label:'4H Resistance', quality:`Touch ${h4sr.resistance.nearest.touchCount}x`, source:'h4_sr', priorityScore:40, detail:'' });
    const upside = mergeConfluenceRows(rows.filter((r)=>r.side==='upside' && (Number.isFinite(price) ? r.center>price : true)), price);
    const downside = mergeConfluenceRows(rows.filter((r)=>r.side==='downside' && (Number.isFinite(price) ? r.center<price : true)), price);
    const h4RsiText = marketPreparationState.h4.rsiStatus?.ok ? ` | ${marketPreparationState.h4.rsiStatus.label}` : "";
    const currentRowText = Number.isFinite(price)
      ? `● ${usd(price)} | ${marketPreparationState.h4.structureStatus||'4H —'}${h4RsiText} | 1H Sweep: ${marketPreparationState.h1.sweepStatus||'—'} | 1H Structure: ${marketPreparationState.h1.structureStatus||'—'}`
      : "● Price unavailable | Waiting for ticker/4H/1H context";
    return { upside, downside, currentRowText };
  } catch {
    return { upside: [], downside: [], currentRowText: "● Price unavailable | Waiting for ticker/4H/1H context" };
  }
}
function getSentimentMeaning(value, label){
  if(!Number.isFinite(value)) return "Sentiment context is unavailable.";
  const lc = String(label || "").toLowerCase();
  if(lc.includes("extreme fear")) return "Risk-off pressure is elevated.";
  if(lc.includes("fear")) return "Risk appetite is cautious.";
  if(lc.includes("extreme greed")) return "Risk-on conditions are stretched.";
  if(lc.includes("greed")) return "Risk-on conditions are elevated.";
  return "Sentiment is balanced; monitor follow-through.";
}
function compute4hVolumeStatus(candles){
  try{
    if(!Array.isArray(candles) || candles.length < 20) return null;
    const vols = candles.map(c=>Number(c.volume)).filter(v=>Number.isFinite(v) && v>0);
    if(vols.length < 20) return null;
    const latest = vols[vols.length - 1];
    const avg = vols.slice(-20).reduce((a,b)=>a+b,0) / 20;
    if(!Number.isFinite(latest) || !Number.isFinite(avg) || avg <= 0) return null;
    const ratio = latest / avg;
    const label = ratio < 0.8 ? "Weak" : ratio <= 1.2 ? "Average" : ratio <= 1.8 ? "Above Avg" : "Spike";
    return { label, ratio };
  }catch{
    return null;
  }
}
function compute1hStochasticStatus(candles, kPeriod = 14, dPeriod = 3){
  const unavailable = (reason)=>({ ok:false, k:null, d:null, prevK:null, prevD:null, label:"Stoch unavailable", reason, status:"idle" });
  try{
    if(!Array.isArray(candles) || candles.length < (kPeriod + dPeriod + 1)) return unavailable("not_enough_candles");
    const values = candles.map((c)=>({ high:Number(c.high), low:Number(c.low), close:Number(c.close) }));
    if(values.some((c)=>!Number.isFinite(c.high) || !Number.isFinite(c.low) || !Number.isFinite(c.close))) return unavailable("invalid_candles");
    const kValues = [];
    for(let i=kPeriod-1;i<values.length;i++){
      const window = values.slice(i-kPeriod+1, i+1);
      const highestHigh = Math.max(...window.map(c=>c.high));
      const lowestLow = Math.min(...window.map(c=>c.low));
      if(!Number.isFinite(highestHigh) || !Number.isFinite(lowestLow) || highestHigh === lowestLow){
        kValues.push(null);
        continue;
      }
      kValues.push(((values[i].close - lowestLow) / (highestHigh - lowestLow)) * 100);
    }
    const dValues = kValues.map((_, i)=>{
      if(i < dPeriod-1) return null;
      const slice = kValues.slice(i-dPeriod+1, i+1);
      if(slice.some((v)=>!Number.isFinite(v))) return null;
      return slice.reduce((a,b)=>a+b,0) / dPeriod;
    });
    const latestIndex = kValues.length - 1;
    let prevIndex = latestIndex - 1;
    while(prevIndex >= 0 && (!Number.isFinite(kValues[prevIndex]) || !Number.isFinite(dValues[prevIndex]))) prevIndex--;
    const k = kValues[latestIndex];
    const d = dValues[latestIndex];
    const prevK = prevIndex >= 0 ? kValues[prevIndex] : null;
    const prevD = prevIndex >= 0 ? dValues[prevIndex] : null;
    if(!Number.isFinite(k) || !Number.isFinite(d) || !Number.isFinite(prevK) || !Number.isFinite(prevD)) return unavailable("insufficient_stochastic");
    const bullishCross = prevK <= prevD && k > d;
    const bearishCross = prevK >= prevD && k < d;
    let label = "Stoch Neutral";
    let status = "neutral";
    let reason = "No clear stochastic timing signal.";
    if(k < 20 && bullishCross){ label = "Stoch Oversold Cross Up"; status = "oversold_cross_up"; reason = "Short-term bounce timing may be forming."; }
    else if(k > 80 && bearishCross){ label = "Stoch Overbought Cross Down"; status = "overbought_cross_down"; reason = "Short-term rejection timing may be forming."; }
    else if(k < 20){ label = "Stoch Oversold"; status = "oversold"; reason = "Short-term timing is in an oversold area."; }
    else if(k > 80){ label = "Stoch Overbought"; status = "overbought"; reason = "Short-term timing is in an overbought area."; }
    else if(bullishCross){ label = "Stoch Bullish Cross"; status = "bullish_cross"; reason = "Short-term momentum crossed upward."; }
    else if(bearishCross){ label = "Stoch Bearish Cross"; status = "bearish_cross"; reason = "Short-term momentum crossed downward."; }
    return { ok:true, k:Number(k.toFixed(1)), d:Number(d.toFixed(1)), prevK:Number(prevK.toFixed(1)), prevD:Number(prevD.toFixed(1)), label, reason, status };
  }catch{
    return unavailable("compute_failed");
  }
}
function getNearestUpsideZoneFromMap(mapData){
  return Array.isArray(mapData?.upside) && mapData.upside.length ? mapData.upside[0] : null;
}
function getNearestDownsideZoneFromMap(mapData){
  return Array.isArray(mapData?.downside) && mapData.downside.length ? mapData.downside[0] : null;
}
function getMapZoneKind(zone){
  const label = String(zone?.label || zone?.source || "").toLowerCase();
  if(label.includes("support")) return "support";
  if(label.includes("resistance")) return "resistance";
  if(label.includes("fvg")) return "fvg";
  return "zone";
}
function getMapZoneText(zone, directionText){
  if(!zone) return directionText === "above" ? "Nearest upside unavailable" : "Nearest downside unavailable";
  const label = zone.label || "Zone";
  const distance = zone.distanceText || "—";
  return `${label} · ${distance} ${directionText}`;
}
function classifyZonePosition(currentPrice, zone){
  if(!Number.isFinite(currentPrice) || !zone || !Number.isFinite(zone.lower) || !Number.isFinite(zone.upper)) return null;
  const kind = getMapZoneKind(zone);
  const lower = Math.min(zone.lower, zone.upper);
  const upper = Math.max(zone.lower, zone.upper);
  const distancePct = prepDistancePct(currentPrice, lower, upper);
  const isInside = currentPrice >= lower && currentPrice <= upper;
  const title = kind === "support" ? "Support" : kind === "resistance" ? "Resistance" : kind === "fvg" ? "FVG" : "Zone";
  if(isInside) return { label: `Inside ${title}`, kind, distancePct, zone };
  if(Number.isFinite(distancePct) && distancePct <= 1) return { label: `Near ${title}`, kind, distancePct, zone };
  if(kind === "fvg" && Number.isFinite(distancePct) && distancePct <= 3) return { label: "Approaching FVG", kind, distancePct, zone };
  if(kind === "fvg") return { label: currentPrice > upper ? "Above FVG" : "Below FVG", kind, distancePct, zone };
  return { label: null, kind, distancePct, zone };
}
function normalizeReactionZone(zone, label, source){
  if(!zone || !Number.isFinite(zone.lower) || !Number.isFinite(zone.upper)) return null;
  return { ...zone, lower: Math.min(zone.lower, zone.upper), upper: Math.max(zone.lower, zone.upper), label, source };
}
function getSrZonesForReaction(srSummary){
  const zones = [];
  const add = (zone, type, label) => {
    const normalized = normalizeReactionZone(zone, label, "h4_sr");
    if(normalized) zones.push({ ...normalized, type });
  };
  add(srSummary?.support?.nearest, "support", "4H Support");
  add(srSummary?.support?.strongest, "support", "4H Support");
  add(srSummary?.resistance?.nearest, "resistance", "4H Resistance");
  add(srSummary?.resistance?.strongest, "resistance", "4H Resistance");
  const seen = new Set();
  return zones.filter((z)=>{
    const key = `${z.type}|${Number(z.lower).toFixed(2)}|${Number(z.upper).toFixed(2)}`;
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function reactionTimeValue(candle){ return Number(candle?.time ?? candle?.openTime ?? Date.now()); }
function detectRecentFvgReaction(candles, fvgZones, lookback = 3){
  try{
    if(!Array.isArray(candles) || !Array.isArray(fvgZones) || !fvgZones.length) return null;
    const recent = candles.slice(-lookback).filter(Boolean);
    let latest = null;
    recent.forEach((c)=>{
      fvgZones.forEach((zone)=>{
        const z = normalizeReactionZone(zone, zone.type?.includes("Bullish") ? "4H Bullish FVG" : "4H Bearish FVG", "h4_fvg");
        if(!z || !Number.isFinite(c.high) || !Number.isFinite(c.low) || !Number.isFinite(c.close)) return;
        const touched = c.high >= z.lower && c.low <= z.upper;
        const bullish = String(zone.type || "").includes("Bullish");
        const broke = bullish ? c.close < z.lower : c.close > z.upper;
        const rejected = touched && (bullish ? c.close > z.upper : c.close < z.lower);
        const mitigated = touched && !broke;
        const base = { zone: z, timeframe: "4H", time: reactionTimeValue(c), type: "fvg" };
        if(broke) latest = { ...base, status: "Broke through FVG", label: `Broke through ${z.label}`, memoryKey: "lastBrokenFvg" };
        else if(rejected) latest = { ...base, status: "Rejected from FVG", label: `Rejected from ${z.label} on last ${lookback} candles`, memoryKey: "lastMitigatedFvg" };
        else if(mitigated) latest = { ...base, status: "Mitigated FVG", label: `Recently mitigated ${z.label}`, memoryKey: "lastMitigatedFvg" };
      });
    });
    return latest;
  }catch{ return null; }
}
function detectRecentSrReaction(candles, srSummary, lookback = 3){
  try{
    if(!Array.isArray(candles) || candles.length < 2 || !srSummary) return null;
    const recent = candles.slice(-lookback).filter(Boolean);
    const latestCandle = recent[recent.length - 1];
    const previous = candles[candles.length - 2];
    let latest = null;
    getSrZonesForReaction(srSummary).forEach((zone)=>{
      if(!latestCandle || !previous) return;
      const touched = recent.some((c)=> zone.type === "support" ? c.low <= zone.upper && c.low >= zone.lower : c.high >= zone.lower && c.high <= zone.upper);
      const supportBroken = zone.type === "support" && latestCandle.close < zone.lower && previous.close >= zone.lower;
      const resistanceBroken = zone.type === "resistance" && latestCandle.close > zone.upper && previous.close <= zone.upper;
      const bounced = zone.type === "support" && touched && latestCandle.close > zone.upper;
      const rejected = zone.type === "resistance" && touched && latestCandle.close < zone.lower;
      const base = { zone, timeframe: "4H", time: reactionTimeValue(latestCandle), type: "sr" };
      if(supportBroken) latest = { ...base, status: "Support Broken", label: "Recent Support Broken", memoryKey: "lastBrokenSupport" };
      else if(resistanceBroken) latest = { ...base, status: "Resistance Broken", label: "Recent Resistance Broken", memoryKey: "lastBrokenResistance" };
      else if(bounced) latest = { ...base, status: "Bounced from Support", label: `Bounced from ${zone.label} on last ${lookback} candles`, memoryKey: null };
      else if(rejected) latest = { ...base, status: "Rejected from Resistance", label: `Rejected from ${zone.label} on last ${lookback} candles`, memoryKey: null };
    });
    return latest;
  }catch{ return null; }
}
function updateRecentReactionMemory(prevMemory, latestReaction){
  const memory = {
    lastBrokenFvg: prevMemory?.lastBrokenFvg || null,
    lastMitigatedFvg: prevMemory?.lastMitigatedFvg || null,
    lastBrokenSupport: prevMemory?.lastBrokenSupport || null,
    lastBrokenResistance: prevMemory?.lastBrokenResistance || null,
    lastReactionLabel: prevMemory?.lastReactionLabel || null,
    updatedAt: prevMemory?.updatedAt || null,
  };
  if(!latestReaction) return memory;
  if(latestReaction.memoryKey && Object.prototype.hasOwnProperty.call(memory, latestReaction.memoryKey)) memory[latestReaction.memoryKey] = latestReaction;
  memory.lastReactionLabel = latestReaction.label || latestReaction.status || null;
  memory.updatedAt = Date.now();
  return memory;
}
function formatCurrentPositionLabel(position){
  return position?.label || "Between key zones";
}
function formatRecentReactionLabel(reaction){
  return reaction?.label || reaction?.lastReactionLabel || "No clear recent reaction";
}
function buildCurrentPricePositionStatus(state, mapData){
  try{
    const currentPrice = state?.currentPrice;
    const upside = getNearestUpsideZoneFromMap(mapData);
    const downside = getNearestDownsideZoneFromMap(mapData);
    const upPosition = classifyZonePosition(currentPrice, upside);
    const downPosition = classifyZonePosition(currentPrice, downside);
    let currentPosition = "Current position unavailable";
    if(Number.isFinite(currentPrice)){
      const candidates = [upPosition, downPosition].filter((p)=>p?.label);
      const inside = candidates.find((p)=>String(p.label).startsWith("Inside"));
      const near = candidates.find((p)=>String(p.label).startsWith("Near"));
      currentPosition = formatCurrentPositionLabel(inside || near || { label: (upside || downside) ? "Between key zones" : "Current position unavailable" });
    }
    const recentFvg = detectRecentFvgReaction(latest4hCandles, state?.h4?.fvgZones || [], 3);
    const recentSr = detectRecentSrReaction(latest4hCandles, state?.h4?.srSummary, 3);
    const latestReaction = [recentFvg, recentSr].filter(Boolean).sort((a,b)=>(b.time || 0) - (a.time || 0))[0] || null;
    const memory = updateRecentReactionMemory(state?.h4?.recentReaction, latestReaction);
    const h1Context = state?.h1?.sweepStatus ? `1H: ${state.h1.sweepStatus}` : null;
    const recentReaction = latestReaction ? { ...latestReaction, confirmation: h1Context } : (memory.lastReactionLabel ? { label: memory.lastReactionLabel, confirmation: h1Context } : null);
    return {
      currentPosition,
      nearestUpsideZone: upside ? { ...upside, text: getMapZoneText(upside, "above") } : null,
      nearestDownsideZone: downside ? { ...downside, text: getMapZoneText(downside, "below") } : null,
      recentReaction,
      recentReactionMemory: memory,
      timeframe: "4H",
      updatedAt: Date.now(),
    };
  }catch{
    return { currentPosition: "Current position unavailable", nearestUpsideZone: null, nearestDownsideZone: null, recentReaction: null, recentReactionMemory: marketPreparationState.h4?.recentReaction || null, timeframe: "4H", updatedAt: Date.now() };
  }
}
function getKeyZonePositionContext(mapData, state){
  const status = buildCurrentPricePositionStatus(state, mapData);
  const patternContext = getDailyPatternKeyZoneContext(state);
  const recentReaction = patternContext.recentReaction || (status.recentReaction?.confirmation
    ? `${formatRecentReactionLabel(status.recentReaction)} · ${status.recentReaction.confirmation}`
    : formatRecentReactionLabel(status.recentReaction));
  return {
    nearestUpside: status.nearestUpsideZone?.text || "Nearest upside unavailable",
    nearestDownside: status.nearestDownsideZone?.text || "Nearest downside unavailable",
    position: patternContext.currentPosition || status.currentPosition || "Current position unavailable",
    recentReaction,
  };
}
function buildCurrentPriceDetailDataV2(mapData){
  const price = marketPreparationState.currentPrice;
  const change24hPct = marketPreparationState.ticker?.change24hPct;
  const sentiment = marketPreparationState.sentiment || { value:null, label:null, updatedAt:null };
  const weeklyBias = marketPreparationState.mtf?.weeklyBias || "Unavailable";
  const weeklyFvg = (marketPreparationState.weekly?.fvgZones||[])[0] || null;
  const weeklySr = marketPreparationState.weekly?.srSummary || null;
  const h4Status = marketPreparationState.h4?.structureStatus || "Unavailable";
  const h4Rsi = marketPreparationState.h4?.rsiStatus || { ok:false, value:null, regime:null, slope:null, label:"4H RSI unavailable" };
  const h4Volume = marketPreparationState.h4?.volumeStatus || null;
  const h1Sweep = marketPreparationState.h1?.sweepStatus || "Unavailable";
  const h1Structure = marketPreparationState.h1?.structureStatus || "Unavailable";
  const h1Stochastic = marketPreparationState.h1?.stochastic || { ok:false, k:null, d:null, prevK:null, prevD:null, label:"Stoch unavailable", reason:null, status:"idle" };
  const contains = (txt, key)=>String(txt||"").toLowerCase().includes(String(key).toLowerCase());
  const h4Meaning = (contains(h4Status,"Bearish BOS") || contains(h4Status,"Bearish CHoCH"))
    ? "4H structure still reflects downside reaction pressure."
    : (contains(h4Status,"Bullish BOS") || contains(h4Status,"Bullish CHoCH"))
      ? "4H structure shows improving short-range reaction."
      : "No clear strong 4H structure shift yet.";
  let h4RsiMeaning = "4H momentum is mixed; monitor follow-through.";
  if(contains(h4Rsi.label,"Oversold")) h4RsiMeaning = "Momentum is weak; short-range bounce risk can increase.";
  else if(contains(h4Rsi.label,"Overbought")) h4RsiMeaning = "Momentum is elevated; rejection risk can increase.";
  else if(h4Rsi.regime==="Below 50" && h4Rsi.slope==="rising") h4RsiMeaning = "Momentum is improving from below midline.";
  else if(h4Rsi.regime==="Above 50" && h4Rsi.slope==="falling") h4RsiMeaning = "Momentum is cooling from above midline.";
  const h1SweepMeaning = contains(h1Sweep,"Bullish Sweep")
    ? "Short-term buyer reaction appeared near lower liquidity."
    : contains(h1Sweep,"Bearish Sweep")
      ? "Short-term seller reaction appeared near upper liquidity."
      : (contains(h1Sweep,"No recent") || contains(h1Sweep,"No"))
        ? "No strong recent sweep signal."
        : "1H sweep context is unavailable.";
  const h1StructureMeaning = (contains(h1Structure,"Bullish BOS") || contains(h1Structure,"Bullish CHoCH"))
    ? "Short-term structure is improving."
    : (contains(h1Structure,"Bearish BOS") || contains(h1Structure,"Bearish CHoCH"))
      ? "Short-term structure still leans weaker."
      : "No clear short-term structure confirmation yet.";
  const prepNote = (contains(h4Rsi.label,"Oversold") && contains(h1Sweep,"Bullish Sweep"))
    ? "Avoid chasing short. Watch whether 1H forms bullish CHoCH/BOS or price fails to reclaim."
    : (contains(h4Status,"Bearish BOS") && contains(h1Structure,"No clear"))
      ? "Downside pressure remains, but wait for confirmation near key zone."
      : (contains(h4Rsi.label,"Overbought") && contains(h1Sweep,"Bearish Sweep"))
        ? "Avoid chasing long. Watch rejection near upside reaction zone."
        : "Keep preparation neutral and wait for multi-timeframe confirmation.";
  const weeklyFvgText = weeklyFvg ? `${weeklyFvg.type || "Weekly FVG"} ${Number.isFinite(price)&&price<weeklyFvg.lower?"above":Number.isFinite(price)&&price>weeklyFvg.upper?"below":"nearby"}` : "—";
  const weeklySrText = weeklySr?.support && weeklySr?.resistance ? "Price between weekly zones" : (weeklySr?.support || weeklySr?.resistance) ? "Price near weekly zone" : "—";
  const dailyPattern = getDailyPatternDetail(marketPreparationState.daily?.pattern);
  const keyZone = getKeyZonePositionContext(mapData, marketPreparationState);
  return {
    compactRowText: Number.isFinite(price)
      ? `● ${usd(price)} | ${h4Status}${h4Rsi?.ok ? ` | ${h4Rsi.label}` : ""} | 1H ${h1Sweep} | 1H ${h1Structure}`
      : "● Price unavailable | Waiting for ticker/4H/1H context",
    price: { value: Number.isFinite(price) ? price : null, text: Number.isFinite(price) ? usd(price) : "Price unavailable", change24hPct: Number.isFinite(change24hPct) ? change24hPct : null },
    sentiment: { value: toNullableNumber(sentiment.value), label: sentiment.label || null, meaning: getSentimentMeaning(toNullableNumber(sentiment.value), sentiment.label) },
    weekly: { bias: weeklyBias, fvg: weeklyFvgText, sr: weeklySrText, meaning: weeklyBias !== "Unavailable" ? "Weekly context still defines the main reaction zones." : "Weekly context unavailable." },
    daily: { pattern: dailyPattern.pattern, status: dailyPattern.status, position: dailyPattern.position, touches: dailyPattern.touches, reason: dailyPattern.reason, caption: dailyPattern.caption },
    h4Structure: { status: h4Status, brokenLevel: null, latestClose: null, meaning: h4Meaning },
    h4Rsi: { ok: !!h4Rsi.ok, value: Number.isFinite(h4Rsi.value) ? h4Rsi.value : null, regime: h4Rsi.regime || null, slope: h4Rsi.slope || null, label: h4Rsi.label || "4H RSI unavailable", meaning: h4RsiMeaning },
    h4Volume: { label: h4Volume?.label || null, ratio: Number.isFinite(h4Volume?.ratio) ? h4Volume.ratio : null },
    h4ContextMeaning: (contains(h4Status,"Bearish BOS") || contains(h4Status,"Bearish CHoCH")) ? "Downside reaction pressure exists; monitor reclaim attempts." : contains(h4Rsi.label,"Oversold") ? "Downside pressure exists, but bounce risk can increase." : "4H context is mixed; watch zone reactions.",
    h1Sweep: { status: h1Sweep, sweptLevel: null, distancePct: null, meaning: h1SweepMeaning },
    h1Structure: { status: h1Structure, brokenLevel: null, latestClose: null, meaning: h1StructureMeaning },
    h1Stochastic: { ok: !!h1Stochastic.ok, k: Number.isFinite(h1Stochastic.k) ? h1Stochastic.k : null, d: Number.isFinite(h1Stochastic.d) ? h1Stochastic.d : null, prevK: Number.isFinite(h1Stochastic.prevK) ? h1Stochastic.prevK : null, prevD: Number.isFinite(h1Stochastic.prevD) ? h1Stochastic.prevD : null, label: h1Stochastic.label || "Stoch unavailable", reason: h1Stochastic.reason || null, status: h1Stochastic.status || "idle" },
    h1TimingMeaning: contains(h1Sweep,"Bullish Sweep") ? "Buyer reaction appeared, but reversal confirmation still needed." : contains(h1Sweep,"Bearish Sweep") ? "Seller reaction appeared; watch continuation or failed follow-through." : "Timing confirmation is still limited.",
    keyZone,
    preparation: { note: prepNote }
  };
}
function renderCurrentPriceDetailCards(detail){
  if(!els.prepCurrentDetailContent) return;
  const nPct = (v)=>Number.isFinite(v) ? `${v>=0?"+":""}${f1(v)}%` : "—";
  const nNum = (v)=>Number.isFinite(v) ? f1(v) : "—";
  els.prepCurrentDetailContent.innerHTML = `
    <div class="prep-current-detail-cards">
      <article class="prep-current-detail-card">
        <h4 class="prep-current-detail-card-title">Price</h4>
        <p class="prep-current-detail-kv">Current: ${detail.price.text}</p>
        <p class="prep-current-detail-kv">24H: ${nPct(detail.price.change24hPct)}</p>
      </article>
      <article class="prep-current-detail-card">
        <h4 class="prep-current-detail-card-title">Sentiment</h4>
        <p class="prep-current-detail-kv">Fear & Greed: ${detail.sentiment.value ?? "—"}</p>
        <p class="prep-current-detail-kv">Label: ${detail.sentiment.label || "—"}</p>
        <p class="prep-current-detail-meaning">${detail.sentiment.meaning}</p>
      </article>
      <article class="prep-current-detail-card">
        <h4 class="prep-current-detail-card-title">Weekly Context</h4>
        <p class="prep-current-detail-kv">Weekly Bias: ${detail.weekly.bias}</p>
        <p class="prep-current-detail-kv">Weekly FVG: ${detail.weekly.fvg}</p>
        <p class="prep-current-detail-kv">Weekly S/R: ${detail.weekly.sr}</p>
        <p class="prep-current-detail-meaning">${detail.weekly.meaning}</p>
      </article>
      <article class="prep-current-detail-card">
        <h4 class="prep-current-detail-card-title">Daily Context</h4>
        <p class="prep-current-detail-kv">Pattern: ${detail.daily.pattern}</p>
        <p class="prep-current-detail-kv">Status: ${detail.daily.status}</p>
        <p class="prep-current-detail-kv">Position: ${detail.daily.position}</p>
        <p class="prep-current-detail-kv">Touches: ${detail.daily.touches}</p>
        <p class="prep-current-detail-meaning">${detail.daily.reason}</p>
      </article>
      <article class="prep-current-detail-card">
        <h4 class="prep-current-detail-card-title">4H Context</h4>
        <p class="prep-current-detail-kv">Structure: ${detail.h4Structure.status}</p>
        <p class="prep-current-detail-kv">RSI: ${detail.h4Rsi.ok ? `${nNum(detail.h4Rsi.value)} · ${detail.h4Rsi.regime||"—"} · ${detail.h4Rsi.slope||"—"}` : "—"}</p>
        <p class="prep-current-detail-kv">Volume: ${detail.h4Volume.label ? `${detail.h4Volume.label} (${nNum(detail.h4Volume.ratio)}x)` : "—"}</p>
        <p class="prep-current-detail-meaning">${detail.h4ContextMeaning}</p>
      </article>
      <article class="prep-current-detail-card">
        <h4 class="prep-current-detail-card-title">1H Timing</h4>
        <p class="prep-current-detail-kv">Sweep: ${detail.h1Sweep.status}</p>
        <p class="prep-current-detail-kv">Structure: ${detail.h1Structure.status}</p>
        <p class="prep-current-detail-kv">Stochastic: ${detail.h1Stochastic.ok ? detail.h1Stochastic.label : "—"}</p>
        <p class="prep-current-detail-kv">K/D: ${detail.h1Stochastic.ok ? `K ${nNum(detail.h1Stochastic.k)} · D ${nNum(detail.h1Stochastic.d)}` : "—"}</p>
        <p class="prep-current-detail-meaning">${detail.h1TimingMeaning}</p>
      </article>
      <article class="prep-current-detail-card">
        <h4 class="prep-current-detail-card-title">Key Zone Position</h4>
        <p class="prep-current-detail-kv">Nearest Upside: ${detail.keyZone.nearestUpside}</p>
        <p class="prep-current-detail-kv">Nearest Downside: ${detail.keyZone.nearestDownside}</p>
        <p class="prep-current-detail-kv">Current Position: ${detail.keyZone.position}</p>
        <p class="prep-current-detail-kv">Recent Reaction: ${detail.keyZone.recentReaction}</p>
      </article>
      <article class="prep-current-detail-card prep-current-detail-preparation">
        <h4 class="prep-current-detail-card-title">Preparation</h4>
        <p class="prep-current-detail-meaning">${detail.preparation.note}</p>
      </article>
    </div>
  `;
}
function setCurrentPriceDetailState(isOpen){
  prepCurrentDetailOpen = !!isOpen;
  if(els.prepCurrentDetail){
    els.prepCurrentDetail.hidden = !prepCurrentDetailOpen;
    els.prepCurrentDetail.classList.toggle("open", prepCurrentDetailOpen);
  }
  if(els.prepCurrentDetailToggle) els.prepCurrentDetailToggle.textContent = prepCurrentDetailOpen ? "Hide Details" : "Details";
}
function toggleCurrentPriceDetail(force){
  if(typeof force === "boolean") setCurrentPriceDetailState(force);
  else setCurrentPriceDetailState(!prepCurrentDetailOpen);
}
function bindCurrentPriceDetailEvents(){
  els.prepCurrentRow?.addEventListener("click", ()=>toggleCurrentPriceDetail());
  els.prepCurrentDetailToggle?.addEventListener("click", (e)=>{ e.stopPropagation(); toggleCurrentPriceDetail(); });
}
function renderMarketPreparationMap(mapData){
  const safeMap = mapData || { upside: [], downside: [], currentRowText: "● Price unavailable" };
  const positionStatus = buildCurrentPricePositionStatus(marketPreparationState, safeMap);
  marketPreparationState.currentPricePosition = {
    currentPosition: positionStatus.currentPosition,
    nearestUpsideZone: positionStatus.nearestUpsideZone,
    nearestDownsideZone: positionStatus.nearestDownsideZone,
    recentReaction: positionStatus.recentReaction,
    timeframe: positionStatus.timeframe,
    updatedAt: positionStatus.updatedAt,
  };
  if(positionStatus.recentReactionMemory) marketPreparationState.h4.recentReaction = positionStatus.recentReactionMemory;
  marketPreparationState.map = { upside: safeMap.upside || [], downside: safeMap.downside || [], currentRowText: safeMap.currentRowText || "● Price unavailable" };
  const row = (r)=>`<div class="prep-map-row"><span class="prep-map-row-symbol">${r.symbol}</span><span class="prep-map-row-zone">${r.zoneText}</span><span class="prep-map-row-label">${r.label}</span><span class="prep-map-row-quality">${r.quality}</span><span class="prep-map-row-distance">${r.distanceText}</span></div>`;
  if(els.prepUpsideRows) els.prepUpsideRows.innerHTML = safeMap.upside.length ? safeMap.upside.map(row).join('') : '<p class="prep-map-empty">No upside watch levels available.</p>';
  if(els.prepDownsideRows) els.prepDownsideRows.innerHTML = safeMap.downside.length ? safeMap.downside.map(row).join('') : '<p class="prep-map-empty">No downside watch levels available.</p>';
  const detail = buildCurrentPriceDetailDataV2(safeMap);
  if(els.prepCurrentRow) els.prepCurrentRow.textContent = detail.compactRowText || "● Price unavailable";
  renderCurrentPriceDetailCards(detail);
  setCurrentPriceDetailState(prepCurrentDetailOpen);
}

function escapeHtml(value){
  return String(value ?? "").replace(/[&<>"]/g, (ch)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
}
function formatPdfDate(date = new Date()){
  return `${date.toISOString().slice(0,10)} ${date.toISOString().slice(11,16)} UTC`;
}
function formatPdfMaybe(value, fallback = "—"){
  return value === null || value === undefined || value === "" ? fallback : String(value);
}
function getPdfSourceCode(sourceLike){
  const raw = String(sourceLike || "").toLowerCase();
  if(raw.includes("weekly") || raw.includes("w ") || raw.startsWith("w")) return "W";
  if(raw.includes("daily") || raw.includes("1d")) return "Daily";
  if(raw.includes("h4") || raw.includes("4h")) return "4H";
  return null;
}
function formatPdfSourceShort(row){
  const sourceItems = Array.isArray(row?.sources) && row.sources.length ? row.sources : [row].filter(Boolean);
  const found = new Set();
  sourceItems.forEach((item)=>{
    [item?.source, item?.primarySource, item?.label].forEach((value)=>{
      const code = getPdfSourceCode(value);
      if(code) found.add(code);
    });
  });
  const ordered = ["W", "Daily", "4H"].filter((code)=>found.has(code));
  return ordered.length ? ordered.join(" + ") : "—";
}
function formatPdfTypeShort(row){
  const text = `${row?.label || ""} ${row?.source || ""} ${row?.confluenceLabel || ""}`;
  if((row?.confluenceCount || 0) > 1 || /confluence/i.test(text)) return "Confluence";
  if(/daily_pattern_range/i.test(text)) return "Range Boundary";
  if(/daily_pattern|channel/i.test(text)) return "Channel Boundary";
  if(/fvg/i.test(text)) return "FVG";
  if(/support/i.test(text)) return "Support";
  if(/resistance/i.test(text)) return "Resistance";
  return row?.label || "—";
}
function formatPdfStatusShort(row){
  const sourceQualities = Array.isArray(row?.sources) ? row.sources.map((s)=>s.quality || s.status).join(" ") : "";
  const text = `${row?.quality || ""} ${row?.status || ""} ${sourceQualities}`;
  if(/broken/i.test(text)) return "Broken";
  if(/partial|partially/i.test(text)) return "Partial";
  if(/filled/i.test(text)) return "Filled";
  if(/unfilled|active/i.test(text)) return "Active";
  if(/strong/i.test(text)) return "Strong";
  if(/valid|touch|medium|weak|high prob/i.test(text)) return "Valid";
  return "Valid";
}
function formatPdfNote(row){
  const sourceDetails = Array.isArray(row?.sources) && row.sources.length
    ? [...new Set(row.sources.map((s)=>s.label || s.source).filter(Boolean))].join(" + ")
    : "";
  return row?.detail || row?.confluenceLabel || sourceDetails || row?.quality || "—";
}
function formatPdfZoneRow(row, side){
  return {
    side,
    zone: row?.zoneText || "—",
    source: formatPdfSourceShort(row),
    type: formatPdfTypeShort(row),
    status: formatPdfStatusShort(row),
    distance: row?.distanceText || "—",
    note: formatPdfNote(row),
  };
}
function normalizePdfBiasText(value){
  const text = String(value || "").trim();
  if(!text || /^unavailable$/i.test(text) || /bias unavailable/i.test(text)) return null;
  if(/waiting/i.test(text)) return "Mixed / Waiting confirmation";
  return text;
}
function getPdfMainBias(state, detail){
  const candidates = [state?.mtf?.weeklyBias, mtfState?.weeklyDirection, detail?.weekly?.bias];
  for(const candidate of candidates){
    const normalized = normalizePdfBiasText(candidate);
    if(normalized) return normalized;
  }
  return "Neutral / Confirmation needed";
}
function buildPdfKeyLevels(mapData){
  return [
    ...(mapData?.upside || []).map((row)=>formatPdfZoneRow(row, "Upside")),
    ...(mapData?.downside || []).map((row)=>formatPdfZoneRow(row, "Downside")),
  ];
}
function formatReactionMemoryItem(item){
  if(!item) return "—";
  const zone = item.zone?.lower && item.zone?.upper ? ` · ${usd(item.zone.lower)}–${usd(item.zone.upper)}` : "";
  return `${item.label || item.status || "Available"}${zone}`;
}
function buildPdfRecentReactionHistory(state){
  const memory = state?.h4?.recentReaction || {};
  return {
    recentlyBrokenFvg: formatReactionMemoryItem(memory.lastBrokenFvg),
    recentlyMitigatedFvg: formatReactionMemoryItem(memory.lastMitigatedFvg),
    recentSupportBroken: formatReactionMemoryItem(memory.lastBrokenSupport),
    recentResistanceBroken: formatReactionMemoryItem(memory.lastBrokenResistance),
    lastReaction: memory.lastReactionLabel || "No clear recent reaction",
  };
}
function buildPdfScenarios(detail, mapData, state){
  const upside = mapData?.upside?.[0];
  const downside = mapData?.downside?.[0];
  const h4Rsi = detail?.h4Rsi?.label || "4H RSI unavailable";
  const h1Sweep = detail?.h1Sweep?.status || "1H sweep unavailable";
  const pattern = state?.daily?.pattern;
  const patternContext = isActionableDailyPattern(pattern) ? ` Daily pattern context: ${pattern.type} is ${pattern.status} with price ${pattern.currentPosition || "near boundary context"}.` : "";
  return {
    bullish: `Monitor whether price holds ${downside?.zoneText || "the nearest downside zone"} and reclaims ${upside?.zoneText || "the nearest upside zone"} with supportive 1H timing. Current timing context: ${h1Sweep}.${patternContext}`,
    bearish: `Monitor whether price fails below ${downside?.zoneText || "the nearest downside zone"} or rejects from upside reaction zones. Current momentum context: ${h4Rsi}.${patternContext}`,
    caution: "Daily pattern detection is heuristic; wait for candle-close confirmation near boundaries and avoid relying on one timeframe only.",
  };
}
function buildPdfChartRangeContext(){
  const dailyRange = getCandleDateRange(marketPreparationState.daily?.candles || latestDailyCandles);
  const h4Range = getCandleDateRange(latest4hCandles);
  const h1Range = getCandleDateRange(latest1hCandles);
  const dailyMode = marketPreparationState.daily?.meta?.rangeMode || activeDailyRange || "6M";
  const intradayMode = ltfPreset === "custom" ? "Custom" : ({ "1w":"1W", "2w":"2W", "1m":"1M", "3m":"3M" }[ltfPreset] || activeLowerTfMode || "3M");
  return {
    weekly: { title:"Weekly Chart Snapshot", meta:"48 weekly candles / ±1 year", purpose:"Big bias, major FVG, major S/R", imageDataUrl:null, placeholder:"Chart snapshot unavailable" },
    daily: { title:"Daily Chart Snapshot", meta: dailyRange.count ? `selected Daily Range: ${dailyMode} · ${dailyRange.first} → ${dailyRange.last} · ${dailyRange.count} candles` : `selected Daily Range: ${dailyMode} · range unavailable`, purpose:"Larger lower-timeframe context", patternCaption: formatDailyPatternCaption(marketPreparationState.daily?.pattern), imageDataUrl:null, placeholder:"Chart snapshot unavailable" },
    h4: { title:"4H Chart Snapshot", meta: h4Range.count ? `follows selected Intraday ${intradayMode} range · ${h4Range.first} → ${h4Range.last} · ${h4Range.count} candles` : `follows selected Intraday ${intradayMode} range · range unavailable`, purpose:"Reaction / validation timeframe", imageDataUrl:null, placeholder:"Chart snapshot unavailable" },
    h1: { title:"1H Chart Snapshot", meta: h1Range.count ? `capped for timing · latest ${h1Range.count} candles · ${h1Range.first} → ${h1Range.last}` : "capped for timing · latest 336 candles · range unavailable", purpose:"Short-term timing layer", imageDataUrl:null, placeholder:"Chart snapshot unavailable" },
  };
}
function getChartSnapshotTarget(chartKey){
  const ids = { weekly:"weeklyPriceChartWrapper", daily:"lowerDailyChartWrapper", h4:"lower4hChartWrapper", h1:"lower1hChartWrapper" };
  return document.getElementById(ids[chartKey]);
}
function getChartSnapshotElement(chartKey){
  return { weekly:els.priceChart, daily:els.lowerDailyChart, h4:els.lower4hChart, h1:els.lower1hChart }[chartKey] || null;
}
function getChartSnapshotInstance(chartKey){
  return { weekly:priceChart, daily:ltfDailyChart, h4:ltf4hChart, h1:ltf1hChart }[chartKey] || null;
}
function getPdfCaptureHeight(chartKey){
  return { weekly:760, daily:720, h4:720, h1:680 }[chartKey] || 720;
}
function redrawSnapshotLayers(chartKey){
  try{
    if(chartKey === "weekly"){
      renderFvgFilledOverlay();
      if(weeklySrSummaryForOverlay) renderWeeklySrOverlay(weeklySrSummaryForOverlay, weeklyDatasetCache || []);
      scheduleTrendlineRedraw("weekly");
    }
    if(chartKey === "daily"){
      renderDailyPatternOverlay();
    }
    if(chartKey === "h4"){
      schedule4hFvgOverlayRedraw(latest4hCandles);
      schedule4hSrOverlayRedraw(latest4hCandles);
      scheduleTrendlineRedraw("h4");
    }
  } catch(error){
    console.warn("Snapshot overlay redraw skipped", chartKey, error);
  }
}
function resizeChartForSnapshot(chartKey, height = getPdfCaptureHeight(chartKey)){
  const target = getChartSnapshotTarget(chartKey);
  const chartEl = getChartSnapshotElement(chartKey);
  const chart = getChartSnapshotInstance(chartKey);
  if(!target || !chartEl) return null;
  const previousState = {
    target,
    chartEl,
    chart,
    targetHeight: target.style.height,
    targetMinHeight: target.style.minHeight,
    chartHeight: chartEl.style.height,
    chartMinHeight: chartEl.style.minHeight,
  };
  target.style.height = `${height}px`;
  target.style.minHeight = `${height}px`;
  chartEl.style.height = `${height}px`;
  chartEl.style.minHeight = `${height}px`;
  if(chart) chart.resize(Math.max(chartEl.clientWidth || target.clientWidth || 320, 320), height);
  redrawSnapshotLayers(chartKey);
  return previousState;
}
function restoreChartAfterSnapshot(chartKey, previousState){
  if(!previousState) return;
  const { target, chartEl, chart } = previousState;
  target.style.height = previousState.targetHeight;
  target.style.minHeight = previousState.targetMinHeight;
  chartEl.style.height = previousState.chartHeight;
  chartEl.style.minHeight = previousState.chartMinHeight;
  const restoredHeight = Math.max(chartEl.clientHeight || 0, 1);
  const restoredWidth = Math.max(chartEl.clientWidth || target.clientWidth || 320, 320);
  if(chart) chart.resize(restoredWidth, restoredHeight);
  redrawSnapshotLayers(chartKey);
}
function waitForSnapshotFrame(ms = 120){
  return new Promise((resolve)=>requestAnimationFrame(()=>setTimeout(resolve, ms)));
}
async function captureChartSnapshot(chartKey){
  let snapshotState = null;
  try{
    if(typeof window.html2canvas !== "function") return null;
    const target = getChartSnapshotTarget(chartKey);
    if(!target || target.clientWidth <= 0 || target.clientHeight <= 0) return null;
    snapshotState = resizeChartForSnapshot(chartKey);
    await waitForSnapshotFrame(160);
    const canvas = await window.html2canvas(target, { scale:2, backgroundColor:"#0b1120", useCORS:true, logging:false });
    return canvas.toDataURL("image/png", 0.92);
  }catch(error){
    console.warn("Chart snapshot capture failed", chartKey, error);
    return null;
  } finally {
    restoreChartAfterSnapshot(chartKey, snapshotState);
    await waitForSnapshotFrame(60);
  }
}
async function captureAllReportChartSnapshots(){
  const snapshots = {};
  for(const key of ["weekly","daily","h4","h1"]){
    snapshots[key] = await captureChartSnapshot(key);
  }
  return snapshots;
}
function injectChartSnapshotsIntoReport(reportData, snapshots){
  Object.entries(snapshots || {}).forEach(([key, imageDataUrl])=>{
    if(reportData.charts?.[key]) reportData.charts[key].imageDataUrl = imageDataUrl || null;
  });
  return reportData;
}
function buildPdfReportData(){
  const mapData = buildMarketPreparationMap();
  const detail = buildCurrentPriceDetailDataV2(mapData);
  const state = marketPreparationState;
  const priceText = detail.price?.text || "Price unavailable";
  const changeText = Number.isFinite(detail.price?.change24hPct) ? `${detail.price.change24hPct >= 0 ? "+" : ""}${f1(detail.price.change24hPct)}%` : "—";
  const marketStatus = state.mtf?.finalStatus || state.h4?.structureStatus || "Status unavailable";
  const mainBias = getPdfMainBias(state, detail);
  return {
    meta: { title:"Pulse Lab Market Preparation Report", asset:"BTC/USDT", generatedAt:formatPdfDate(), context:"Weekly + Daily + 4H + 1H", lowerTimeframeDefault:"3M" },
    executiveSummary: { currentPrice:priceText, change24h:changeText, marketStatus, mainBias, keyMessage:detail.preparation?.note || "Keep preparation neutral and wait for multi-timeframe confirmation." },
    marketMap: { upside:mapData.upside || [], current:detail.compactRowText || mapData.currentRowText, downside:mapData.downside || [] },
    detail,
    dailyContext: {
      fvg: (state.daily?.fvgZones || [])[0]?.type || "—",
      sr: state.daily?.srSummary?.support?.nearest || state.daily?.srSummary?.resistance?.nearest ? "Daily S/R available" : "—",
      pattern: getDailyPatternDetail(state.daily?.pattern),
      meta: getCandleDateRange(state.daily?.candles || latestDailyCandles),
    },
    keyLevels: buildPdfKeyLevels(mapData),
    recentHistory: buildPdfRecentReactionHistory(state),
    scenarios: buildPdfScenarios(detail, mapData, state),
    charts: buildPdfChartRangeContext(),
    notes: ["Weekly uses 48 candles for the main momentum window.", `Daily follows selected Daily Range: ${marketPreparationState.daily?.meta?.rangeMode || activeDailyRange || "6M"}.`, "Daily Pattern is detected from selected Daily Range and used as preparation context.", `4H follows selected Intraday Range: ${ltfPreset === "custom" ? "Custom" : ({ "1w":"1W", "2w":"2W", "1m":"1M", "3m":"3M" }[ltfPreset] || "3M")}.`, "1H is capped for timing/performance.", "This report is for market preparation and monitoring context only."],
  };
}
function renderPdfRows(rows){
  if(!rows?.length) return '<p class="pdf-muted">No rows available.</p>';
  return rows.map((r)=>`<div class="pdf-ladder-row"><strong>${escapeHtml(r.zoneText || "—")}</strong><span>${escapeHtml(r.label || "—")}</span><span>${escapeHtml(r.quality || "—")}</span><span>${escapeHtml(r.distanceText || "—")}</span></div>`).join("");
}
function renderPdfCards(cards){
  return cards.map((card)=>`<article class="pdf-card"><h3>${escapeHtml(card.title)}</h3>${card.lines.map((line)=>`<p>${escapeHtml(line)}</p>`).join("")}</article>`).join("");
}
function renderPdfChartBlock(chart){
  const image = chart.imageDataUrl
    ? `<img class="pdf-chart-img" src="${chart.imageDataUrl}" alt="${escapeHtml(chart.title)}" />`
    : `<div class="pdf-chart-unavailable">${escapeHtml(chart.placeholder || "Chart snapshot unavailable")}</div>`;
  const patternCaption = chart.patternCaption ? `<p><strong>Pattern:</strong> ${escapeHtml(chart.patternCaption.replace(/^Daily Pattern:\s*/, ""))}</p>` : "";
  return `<section class="pdf-chart-block"><h3>${escapeHtml(chart.title)}</h3><p><strong>Range:</strong> ${escapeHtml(chart.meta)}</p><p><strong>Purpose:</strong> ${escapeHtml(chart.purpose)}</p>${patternCaption}${image}</section>`;
}
function renderPdfReportPreview(report){
  if(!els.pdfReportRoot) return;
  const d = report.detail;
  const dailyMeta = report.dailyContext.meta;
  const detailCards = [
    { title:"Price", lines:[`Current: ${d.price.text}`, `24H: ${report.executiveSummary.change24h}`] },
    { title:"Sentiment", lines:[`Fear & Greed: ${formatPdfMaybe(d.sentiment.value)}`, `Label: ${formatPdfMaybe(d.sentiment.label)}`, d.sentiment.meaning] },
    { title:"Weekly Context", lines:[`Bias: ${d.weekly.bias}`, `FVG: ${d.weekly.fvg}`, `S/R: ${d.weekly.sr}`] },
    { title:"Daily Context", lines:[`FVG: ${report.dailyContext.fvg}`, `S/R: ${report.dailyContext.sr}`, `Pattern: ${report.dailyContext.pattern.pattern}`, `Status: ${report.dailyContext.pattern.status}`, `Position: ${report.dailyContext.pattern.position}`, `Touches: ${report.dailyContext.pattern.touches}`, report.dailyContext.pattern.reason, dailyMeta.count ? `${dailyMeta.first} → ${dailyMeta.last} · ${dailyMeta.count} candles` : "Range unavailable"] },
    { title:"4H Context", lines:[`Structure: ${d.h4Structure.status}`, `RSI: ${d.h4Rsi.ok ? `${d.h4Rsi.value} · ${d.h4Rsi.regime} · ${d.h4Rsi.slope}` : "—"}`, `Volume: ${d.h4Volume.label ? `${d.h4Volume.label} (${f1(d.h4Volume.ratio)}x)` : "—"}`] },
    { title:"1H Timing", lines:[`Sweep: ${d.h1Sweep.status}`, `Structure: ${d.h1Structure.status}`, `Stochastic: ${d.h1Stochastic.ok ? `${d.h1Stochastic.label} · K ${d.h1Stochastic.k} / D ${d.h1Stochastic.d}` : "—"}`] },
    { title:"Key Zone Position", lines:[`Upside: ${d.keyZone.nearestUpside}`, `Downside: ${d.keyZone.nearestDownside}`, `Position: ${d.keyZone.position}`, `Recent: ${d.keyZone.recentReaction}`] },
    { title:"Preparation", lines:[d.preparation.note] },
  ];
  const keyRows = report.keyLevels.length ? report.keyLevels.map((row)=>`<tr><td>${escapeHtml(row.side)}</td><td>${escapeHtml(row.zone)}</td><td>${escapeHtml(row.source)}</td><td>${escapeHtml(row.type)}</td><td>${escapeHtml(row.status)}</td><td>${escapeHtml(row.distance)}</td><td>${escapeHtml(row.note)}</td></tr>`).join("") : '<tr><td colspan="7">No key levels available.</td></tr>';
  const weeklyChartBlock = renderPdfChartBlock(report.charts.weekly);
  const dailyChartBlock = renderPdfChartBlock(report.charts.daily);
  const h4ChartBlock = renderPdfChartBlock(report.charts.h4);
  const h1ChartBlock = renderPdfChartBlock(report.charts.h1);
  els.pdfReportRoot.innerHTML = `
    <div class="pdf-report-actions"><button id="pdfPrintBtn" class="refresh-btn" type="button">Print / Save PDF</button><button id="pdfDownloadBtn" class="refresh-btn" type="button">Download PDF</button><button id="pdfCloseBtn" class="refresh-btn secondary" type="button">Close</button></div>
    <article class="pdf-report">
      <section class="pdf-page">
        <header class="pdf-report-header"><p>Pulse Lab</p><h1>${escapeHtml(report.meta.title)}</h1><div class="pdf-report-meta"><span>Asset: ${escapeHtml(report.meta.asset)}</span><span>Generated: ${escapeHtml(report.meta.generatedAt)}</span><span>Context: ${escapeHtml(report.meta.context)}</span><span>Lower TF Default: ${escapeHtml(report.meta.lowerTimeframeDefault)}</span></div></header>
        <section class="pdf-section"><h2>Executive Summary</h2><div class="pdf-card-grid">${renderPdfCards([{title:"Current Price",lines:[report.executiveSummary.currentPrice, `24H: ${report.executiveSummary.change24h}`]},{title:"Market Status",lines:[report.executiveSummary.marketStatus]},{title:"Main Bias",lines:[report.executiveSummary.mainBias]},{title:"Key Message",lines:[report.executiveSummary.keyMessage]}])}</div></section>
        <section class="pdf-section avoid-break"><h2>Market Preparation Map</h2><div class="pdf-map"><h3>Upside Watch</h3>${renderPdfRows(report.marketMap.upside)}<h3>Current Price</h3><p class="pdf-current-row">${escapeHtml(report.marketMap.current)}</p><h3>Downside Watch</h3>${renderPdfRows(report.marketMap.downside)}</div></section>
        <section class="pdf-section"><h2>Current Price Detail</h2><div class="pdf-card-grid pdf-card-grid-4">${renderPdfCards(detailCards)}</div></section>
      </section>
      <section class="pdf-page">
        <section class="pdf-section"><h2>Key Levels & Preparation Plan</h2><div class="pdf-table-wrap"><table class="pdf-table"><thead><tr><th>Side</th><th>Zone</th><th>Source</th><th>Type</th><th>Status</th><th>Distance</th><th>Note</th></tr></thead><tbody>${keyRows}</tbody></table></div></section>
        <section class="pdf-section avoid-break"><h2>Recent Reaction / Broken Zone History</h2><div class="pdf-card-grid">${renderPdfCards([{title:"Recently Broken FVG",lines:[report.recentHistory.recentlyBrokenFvg]},{title:"Recently Mitigated FVG",lines:[report.recentHistory.recentlyMitigatedFvg]},{title:"Recent Support Broken",lines:[report.recentHistory.recentSupportBroken]},{title:"Recent Resistance Broken",lines:[report.recentHistory.recentResistanceBroken]},{title:"Last Reaction",lines:[report.recentHistory.lastReaction]}])}</div></section>
        <section class="pdf-section avoid-break"><h2>Preparation Scenario</h2><div class="pdf-card-grid">${renderPdfCards([{title:"Bullish Scenario",lines:[report.scenarios.bullish]},{title:"Bearish Scenario",lines:[report.scenarios.bearish]},{title:"Caution / Invalidation",lines:[report.scenarios.caution]}])}</div></section>
      </section>
      <section class="pdf-page">
        <section class="pdf-section"><h2>Weekly Chart Snapshot</h2><div class="pdf-chart-grid">${weeklyChartBlock}</div></section>
      </section>
      <section class="pdf-page">
        <section class="pdf-section"><h2>Daily Chart Snapshot</h2><div class="pdf-chart-grid">${dailyChartBlock}</div></section>
      </section>
      <section class="pdf-page">
        <section class="pdf-section"><h2>4H Chart Snapshot</h2><div class="pdf-chart-grid">${h4ChartBlock}</div></section>
      </section>
      <section class="pdf-page">
        <section class="pdf-section"><h2>1H Chart Snapshot</h2><div class="pdf-chart-grid">${h1ChartBlock}</div></section>
        <section class="pdf-section avoid-break"><h2>Data Notes</h2><ul>${report.notes.map((note)=>`<li>${escapeHtml(note)}</li>`).join("")}</ul></section>
      </section>
    </article>`;
  els.pdfReportRoot.hidden = false;
  document.getElementById("pdfPrintBtn")?.addEventListener("click", ()=>window.print());
  document.getElementById("pdfDownloadBtn")?.addEventListener("click", downloadMarketReportPdf);
  document.getElementById("pdfCloseBtn")?.addEventListener("click", closePdfReportPreview);
}
async function openPdfReportPreview(){
  const report = buildPdfReportData();
  const snapshots = await captureAllReportChartSnapshots();
  renderPdfReportPreview(injectChartSnapshotsIntoReport(report, snapshots));
}
function closePdfReportPreview(){ if(els.pdfReportRoot){ els.pdfReportRoot.hidden = true; els.pdfReportRoot.innerHTML = ""; } }
function ensureJsPdfReady(){
  return typeof window.jspdf?.jsPDF === "function" ? window.jspdf.jsPDF : null;
}
function getPdfFileName(){
  const date = new Date().toISOString().slice(0,10);
  return `pulse-lab-btcusdt-report-${date}.pdf`;
}
async function waitForPdfPageImages(pageEl){
  const images = Array.from(pageEl?.querySelectorAll("img") || []);
  await Promise.all(images.map((img)=>{
    if(img.complete && img.naturalWidth > 0) return Promise.resolve();
    return new Promise((resolve)=>{
      img.addEventListener("load", resolve, { once:true });
      img.addEventListener("error", resolve, { once:true });
      setTimeout(resolve, 1500);
    });
  }));
}
async function capturePdfPage(pageEl){
  if(typeof window.html2canvas !== "function") return null;
  if(!pageEl) return null;
  await waitForPdfPageImages(pageEl);
  await waitForSnapshotFrame(80);
  return window.html2canvas(pageEl, { scale:2, backgroundColor:"#ffffff", useCORS:true, logging:false });
}
async function downloadMarketReportPdf(){
  const jsPDF = ensureJsPdfReady();
  if(!jsPDF){ window.alert("Direct download unavailable. Use Print / Save PDF."); return; }
  if(!els.pdfReportRoot || els.pdfReportRoot.hidden){ window.alert("Report preview unavailable. Open Export PDF first."); return; }
  const btn = document.getElementById("pdfDownloadBtn");
  try{
    if(btn){ btn.disabled = true; btn.textContent = "Preparing download..."; }
    const pages = Array.from(els.pdfReportRoot.querySelectorAll(".pdf-page"));
    if(!pages.length) throw new Error("No PDF pages found");
    const pdf = new jsPDF("p", "mm", "a4");
    for(let i=0;i<pages.length;i++){
      const canvas = await capturePdfPage(pages[i]);
      if(!canvas) throw new Error(`Could not capture report page ${i+1}`);
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      if(i > 0) pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
    }
    pdf.save(getPdfFileName());
  } catch(error){
    console.error("Direct PDF download failed", error);
    window.alert("Direct download failed. Use Print / Save PDF.");
  } finally {
    if(btn){ btn.disabled = false; btn.textContent = "Download PDF"; }
  }
}
async function exportMarketReportPdf(){
  try {
    if(els.exportPdfBtn) { els.exportPdfBtn.disabled = true; els.exportPdfBtn.textContent = "Preparing PDF..."; }
    await openPdfReportPreview();
  }
  catch(error){ console.error("PDF report export failed", error); window.alert("Report export unavailable. Please wait for dashboard data to finish loading and try again."); }
  finally { if(els.exportPdfBtn) { els.exportPdfBtn.disabled = false; els.exportPdfBtn.textContent = "Export PDF"; } }
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
  const priceChartWidth = Math.max(els.priceChart.clientWidth||0,320);
  const priceChartHeight = Math.max(els.priceChart.clientHeight||0,460);
  priceChart = LightweightCharts.createChart(els.priceChart, { width: priceChartWidth, height: priceChartHeight, layout:{background:{type:"solid",color:"transparent"},textColor:"#cbd5e1"}, grid:{vertLines:{color:"rgba(148,163,184,0.12)"},horzLines:{color:"rgba(148,163,184,0.12)"}}, rightPriceScale:{borderColor:"rgba(148,163,184,0.2)"}, timeScale:{borderColor:"rgba(148,163,184,0.2)",timeVisible:true,tickMarkFormatter:(time)=>weekLabelMap.get(timeKey(time))||""} });
  candleSeries = priceChart.addCandlestickSeries({ upColor: "#22c55e", downColor: "#ef4444", borderUpColor: "#22c55e", borderDownColor: "#ef4444", wickUpColor: "#22c55e", wickDownColor: "#ef4444" });
  candleSeries.setData(candles);
  priceChart.resize(priceChartWidth, priceChartHeight);
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

function renderFearGreed(data){
  const l=data?.data?.[0];
  if(!l){
    if(els.leftFearGreed) els.leftFearGreed.textContent="Fear & Greed: unavailable";
    updateMarketPreparationState({ sentiment: { value: null, label: null, updatedAt: null } });
    renderMarketPreparationMap(buildMarketPreparationMap());
    return;
  }
  const ts=Number(l.timestamp)*1000;
  const t=Number.isFinite(ts)?new Date(ts).toLocaleString():"unknown";
  if(els.leftFearGreed){
    els.leftFearGreed.textContent=`Fear & Greed: ${l.value} ${l.value_classification}`;
    els.leftFearGreed.title=`Updated: ${t}`;
  }
  updateMarketPreparationState({ sentiment: { value: toNullableNumber(l.value), label: l.value_classification || null, updatedAt: Number.isFinite(ts) ? ts : null } });
  renderMarketPreparationMap(buildMarketPreparationMap());
}


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
function setDailyPresetUI(preset){
  dailyPreset = preset;
  activeDailyRange = ({ "3m":"3M", "6m":"6M", "1y":"1Y" }[preset] || "6M");
  const act=(el,on)=>{ if(!el) return; el.classList.toggle('active', on); };
  act(els.dailyPreset3m, preset==='3m');
  act(els.dailyPreset6m, preset==='6m');
  act(els.dailyPreset1y, preset==='1y');
}
function getDailyPresetLimit(preset){ return DAILY_PRESET_LIMITS[preset] || DAILY_PRESET_LIMITS["6m"]; }

function setupCollapsibleSections(){
  els.ltfToggleBtn?.addEventListener('click', async ()=>{ setToggleState('ltf', !ltfVisible); if(ltfVisible){ requestAnimationFrame(()=>{ if(!lowerTimeframeLoaded){ setDailyPresetUI(dailyPreset || '6m'); setLtfPresetUI('3m'); renderDailyRangeMode(activeDailyRange); renderLowerTimeframeMode('3M'); } else { const m={ '1w':'1W','2w':'2W','1m':'1M','3m':'3M' }; renderDailyRangeMode(activeDailyRange); renderLowerTimeframeMode(m[ltfPreset] || '3M'); } }); } else destroyLtfCharts(); });
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
  els.ltfResetBtn?.addEventListener('click', ()=>{ if(els.ltfStartDate) els.ltfStartDate.value=''; if(els.ltfEndDate) els.ltfEndDate.value=''; setLtfPresetUI('3m'); lowerTimeframeLoaded=true; if(ltfVisible) renderLowerTimeframeMode('RESET'); });
  els.dailyPreset3m?.addEventListener('click', ()=>{ setDailyPresetUI('3m'); if(ltfVisible) renderDailyRangeMode('3M'); });
  els.dailyPreset6m?.addEventListener('click', ()=>{ setDailyPresetUI('6m'); if(ltfVisible) renderDailyRangeMode('6M'); });
  els.dailyPreset1y?.addEventListener('click', ()=>{ setDailyPresetUI('1y'); if(ltfVisible) renderDailyRangeMode('1Y'); });
  els.weeklyAddLineBtn?.addEventListener('click', ()=>handleAddLine('weekly'));
  els.weeklyDrawLineBtn?.addEventListener('click', ()=>enableManualLinePlacement('weekly'));
  els.weeklyDrawTrendlineBtn?.addEventListener('click', ()=>enableTrendlineDrawMode('weekly'));
  els.weeklyManageBtn?.addEventListener('click', ()=>openDrawingManager('weekly'));
  els.h4AddLineBtn?.addEventListener('click', ()=>handleAddLine('h4'));
  els.h4DrawLineBtn?.addEventListener('click', ()=>enableManualLinePlacement('h4'));
  els.h4DrawTrendlineBtn?.addEventListener('click', ()=>enableTrendlineDrawMode('h4'));
  els.h4ManageBtn?.addEventListener('click', ()=>openDrawingManager('h4'));
  els.exportPdfBtn?.addEventListener('click', exportMarketReportPdf);
  window.addEventListener("keydown", (e)=>{ if(e.key === "Escape"){ disableManualLinePlacement(); disableTrendlineDrawMode(); closePdfReportPreview(); closeChartLayerMenus(); } });
  setDailyPresetUI('6m');
  setLtfPresetUI('3m');
  restoreToggleState();
  if(ltfVisible){ requestAnimationFrame(()=>{ renderDailyRangeMode(activeDailyRange); renderLowerTimeframeMode('3M'); lowerTimeframeLoaded=true; }); }
}

function toggleLtfError(el,msg=""){ if(!el) return; el.hidden=!msg; if(msg) el.textContent=msg; }
function clearDailyChart(){ if(els.lowerDailyChart) els.lowerDailyChart.innerHTML=''; clearDailyPatternOverlay(); if(els.lowerDailyMeta) els.lowerDailyMeta.textContent='Daily Context: waiting'; if(els.lowerDailyPatternSummary) els.lowerDailyPatternSummary.textContent='Daily Pattern · waiting'; }
function destroyDailyChart(){ if(ltfDailyChart){ ltfDailyChart.remove(); ltfDailyChart=null; } ltfDailySeries=null; latestDailyCandles=[]; clearDailyChart(); }
function renderDailyTimeframeChart(candles){ const r=renderSingleLtfChart(els.lowerDailyChart,candles, els.lowerDailyChart?.clientHeight || 400); ltfDailyChart=r.chart; ltfDailySeries=r.series; latestDailyCandles=candles; return r; }
function scanDailyFvg(candles){
  try{
    if(!Array.isArray(candles) || candles.length < 3) return [];
    return scan4hFvg(candles).map((f)=>({ ...f, type: f.type.replace('4H', 'Daily'), timeframe: '1D' }));
  }catch(e){
    console.error('Daily FVG scan failed:', e);
    return [];
  }
}
function scanDailySupportResistance(candles){
  try{
    return scan4hSupportResistance(candles);
  }catch(e){
    console.error('Daily S/R scan failed:', e);
    return { ok:false, reason:'scan_failed', currentPrice:candles?.[candles.length-1]?.close??null, candleCount:Array.isArray(candles)?candles.length:0, support:{nearest:null,strongest:null}, resistance:{nearest:null,strongest:null}, meta:{swingHighCount:0,swingLowCount:0,supportZoneCount:0,resistanceZoneCount:0,activeSupportCount:0,activeResistanceCount:0,tolerancePct:0,avgRangeAbs:0} };
  }
}

function createEmptyDailyPattern(rangeMode = activeDailyRange || "6M", reason = "Daily pattern unavailable."){
  return { ok:false, type:null, status:"Unavailable", rangeMode, supportLine:null, resistanceLine:null, supportTouches:0, resistanceTouches:0, totalTouches:0, currentPosition:null, breakoutStatus:null, qualityScore:0, reason, updatedAt:null };
}
function isValidCandle(c){ return c && Number.isFinite(c.high) && Number.isFinite(c.low) && Number.isFinite(c.close); }
function detectSwingPoints(candles, left = 3, right = 3){
  const highs=[], lows=[];
  if(!Array.isArray(candles) || candles.length < left + right + 3) return { highs, lows };
  const minSep = Math.max(5, left + right - 1);
  const pushSeparated = (arr, point, pickHigher)=>{
    const prev = arr[arr.length - 1];
    if(prev && point.index - prev.index < minSep){
      if(pickHigher ? point.price > prev.price : point.price < prev.price) arr[arr.length - 1] = point;
      return;
    }
    arr.push(point);
  };
  for(let i=left;i<candles.length-right;i++){
    const c=candles[i];
    if(!isValidCandle(c)) continue;
    let isHigh=true, isLow=true;
    for(let j=1;j<=left;j++){
      if(!isValidCandle(candles[i-j]) || c.high<=candles[i-j].high) isHigh=false;
      if(!isValidCandle(candles[i-j]) || c.low>=candles[i-j].low) isLow=false;
    }
    for(let j=1;j<=right;j++){
      if(!isValidCandle(candles[i+j]) || c.high<=candles[i+j].high) isHigh=false;
      if(!isValidCandle(candles[i+j]) || c.low>=candles[i+j].low) isLow=false;
    }
    if(isHigh) pushSeparated(highs, { index:i, time:c.time, price:c.high }, true);
    if(isLow) pushSeparated(lows, { index:i, time:c.time, price:c.low }, false);
  }
  return { highs, lows };
}
function buildLineFromPoints(a, b){
  if(!a || !b || a.index===b.index || !Number.isFinite(a.price) || !Number.isFinite(b.price)) return null;
  const slope = (b.price - a.price) / (b.index - a.index);
  const midPrice = Math.max((a.price + b.price) / 2, 1);
  return { startIndex:a.index, startTime:a.time, startPrice:a.price, endIndex:b.index, endTime:b.time, endPrice:b.price, slope, slopePctPerCandle:slope / midPrice };
}
function getLineValueAtIndex(line, index){ return line && Number.isFinite(line.startPrice) && Number.isFinite(line.slope) ? line.startPrice + line.slope * (index - line.startIndex) : null; }
function getAverageDailyRange(candles){
  const ranges = (candles||[]).map(c=>isValidCandle(c) ? (c.high - c.low) : null).filter(v=>Number.isFinite(v)&&v>0);
  return ranges.length ? ranges.reduce((a,b)=>a+b,0)/ranges.length : 0;
}
function countBoundaryTouches(candles, line, side, toleranceAbs){
  let count=0, inTouch=false, lastTouchIndex=null;
  (candles||[]).forEach((c,i)=>{
    if(!isValidCandle(c)) return;
    const boundary = getLineValueAtIndex(line, i);
    if(!Number.isFinite(boundary)) return;
    const probe = side === "support" ? c.low : c.high;
    const touching = Math.abs(probe - boundary) <= toleranceAbs;
    if(touching && !inTouch){ count++; lastTouchIndex=i; inTouch=true; }
    if(!touching) inTouch=false;
  });
  return { count, lastTouchIndex };
}
function getPatternCurrentPosition(candles, pattern, toleranceAbs){
  const latestIndex = candles.length - 1;
  const latest = candles[latestIndex];
  const lower = getLineValueAtIndex(pattern.supportLine, latestIndex);
  const upper = getLineValueAtIndex(pattern.resistanceLine, latestIndex);
  if(!isValidCandle(latest) || !Number.isFinite(lower) || !Number.isFinite(upper) || upper <= lower) return { currentPosition:null, breakoutStatus:null, insideRatio:null };
  const buffer = Math.max(toleranceAbs * 0.6, latest.close * 0.003);
  if(latest.close > upper + buffer) return { currentPosition:"Breakout", breakoutStatus:"Breakout", insideRatio:null };
  if(latest.close < lower - buffer) return { currentPosition:"Breakdown", breakoutStatus:"Breakdown", insideRatio:null };
  if(latest.low <= lower + toleranceAbs && latest.close >= lower) return { currentPosition:"Testing support boundary", breakoutStatus:null, insideRatio:null };
  if(latest.high >= upper - toleranceAbs && latest.close <= upper) return { currentPosition:"Testing resistance boundary", breakoutStatus:null, insideRatio:null };
  const ratio = (latest.close - lower) / (upper - lower);
  if(pattern.type === "Horizontal Range"){
    if(ratio <= 0.25) return { currentPosition:"Near range support", breakoutStatus:null, insideRatio:ratio };
    if(ratio >= 0.75) return { currentPosition:"Near range resistance", breakoutStatus:null, insideRatio:ratio };
    return { currentPosition:"Inside range", breakoutStatus:null, insideRatio:ratio };
  }
  if(ratio <= 0.25) return { currentPosition:"Near lower channel", breakoutStatus:null, insideRatio:ratio };
  if(ratio >= 0.75) return { currentPosition:"Near upper channel", breakoutStatus:null, insideRatio:ratio };
  return { currentPosition:"Middle of channel", breakoutStatus:null, insideRatio:ratio };
}
function scoreDailyPatternCandidate(candidate){
  const totalTouches = candidate.supportTouches + candidate.resistanceTouches;
  const touchScore = Math.min(totalTouches, 8) / 8 * 25;
  const balanceScore = Math.min(candidate.supportTouches, candidate.resistanceTouches) >= 2 ? 15 : Math.min(candidate.supportTouches, candidate.resistanceTouches) / 2 * 15;
  const insideScore = Math.max(0, Math.min(candidate.insideRatio || 0, 1)) * 25;
  const lineScore = Math.max(0, Math.min(candidate.lineQuality || 0, 1)) * 15;
  const latestTouch = Math.max(candidate.supportLastTouchIndex ?? -1, candidate.resistanceLastTouchIndex ?? -1);
  const recencyScore = latestTouch < 0 ? 0 : Math.max(0, 1 - ((candidate.candleCount - 1 - latestTouch) / Math.max(candidate.candleCount, 1))) * 10;
  const width = candidate.widthPct || 0;
  const widthScore = width >= 3 && width <= 35 ? 10 : width >= 1.5 && width <= 45 ? 5 : 0;
  return Math.round(touchScore + balanceScore + insideScore + lineScore + recencyScore + widthScore);
}
function finalizeDailyPatternCandidate(candidate, candles, rangeMode, toleranceAbs){
  const position = getPatternCurrentPosition(candles, candidate, toleranceAbs);
  const qualityScore = scoreDailyPatternCandidate(candidate);
  let status = qualityScore >= 75 ? "Strong" : qualityScore >= 55 ? "Valid" : qualityScore >= 35 ? "Weak" : "Detected";
  if(position.breakoutStatus) status = "Broken";
  const supportTouches = candidate.supportTouches;
  const resistanceTouches = candidate.resistanceTouches;
  const totalTouches = supportTouches + resistanceTouches;
  const reason = status === "Broken"
    ? `Daily ${candidate.type.toLowerCase()} ${position.breakoutStatus.toLowerCase()} confirmed by close outside boundary.`
    : `Price remains ${candidate.type === "Horizontal Range" ? "in horizontal range" : "inside channel"} with ${totalTouches} total touches.`;
  return { ok:true, type:candidate.type, status, rangeMode, supportLine:candidate.supportLine, resistanceLine:candidate.resistanceLine, supportTouches, resistanceTouches, totalTouches, currentPosition:position.currentPosition, breakoutStatus:position.breakoutStatus, qualityScore, reason, updatedAt:Date.now() };
}
function evaluateDailyPatternCandidate(type, supportLine, resistanceLine, candles, rangeMode, toleranceAbs, lineQuality){
  if(!supportLine || !resistanceLine) return null;
  const lastIndex = candles.length - 1;
  let inside=0, valid=0;
  for(let i=0;i<candles.length;i++){
    const c=candles[i]; if(!isValidCandle(c)) continue;
    const lower = getLineValueAtIndex(supportLine, i), upper = getLineValueAtIndex(resistanceLine, i);
    if(!Number.isFinite(lower) || !Number.isFinite(upper) || upper<=lower) continue;
    valid++;
    if(c.close >= lower - toleranceAbs && c.close <= upper + toleranceAbs) inside++;
  }
  const lowerLast = getLineValueAtIndex(supportLine, lastIndex), upperLast = getLineValueAtIndex(resistanceLine, lastIndex);
  if(!Number.isFinite(lowerLast) || !Number.isFinite(upperLast) || upperLast<=lowerLast) return null;
  const current = Math.max(candles[lastIndex]?.close || 1, 1);
  const widthPct = ((upperLast - lowerLast) / current) * 100;
  const support = countBoundaryTouches(candles, supportLine, "support", toleranceAbs);
  const resistance = countBoundaryTouches(candles, resistanceLine, "resistance", toleranceAbs);
  return { type, supportLine, resistanceLine, supportTouches:support.count, resistanceTouches:resistance.count, supportLastTouchIndex:support.lastTouchIndex, resistanceLastTouchIndex:resistance.lastTouchIndex, insideRatio:valid ? inside / valid : 0, widthPct, lineQuality, candleCount:candles.length };
}
function detectDailyChannelPattern(candles, rangeMode){
  if(!Array.isArray(candles) || candles.length < 40) return null;
  const currentPrice = candles[candles.length-1]?.close;
  const avgRangeAbs = getAverageDailyRange(candles);
  const toleranceAbs = Math.max((currentPrice || 1) * 0.0075, avgRangeAbs * 0.35);
  const swings = detectSwingPoints(candles, 3, 3);
  const highs = swings.highs.slice(-10);
  const lows = swings.lows.slice(-10);
  let best = null;
  for(let li=0; li<lows.length-1; li++){
    for(let lj=li+1; lj<lows.length; lj++){
      const supportLine = buildLineFromPoints(lows[li], lows[lj]);
      if(!supportLine) continue;
      for(let hi=0; hi<highs.length-1; hi++){
        for(let hj=hi+1; hj<highs.length; hj++){
          const resistanceLine = buildLineFromPoints(highs[hi], highs[hj]);
          if(!resistanceLine) continue;
          const supportSlope = supportLine.slopePctPerCandle;
          const resistanceSlope = resistanceLine.slopePctPerCandle;
          const rising = supportSlope > 0.00015 && resistanceSlope > 0.00015 && lows[lj].price > lows[li].price && highs[hj].price > highs[hi].price;
          const falling = supportSlope < -0.00015 && resistanceSlope < -0.00015 && lows[lj].price < lows[li].price && highs[hj].price < highs[hi].price;
          if(!rising && !falling) continue;
          const slopeDenom = Math.max(Math.abs(supportSlope), Math.abs(resistanceSlope), 0.00001);
          const parallelQuality = Math.max(0, 1 - (Math.abs(supportSlope - resistanceSlope) / slopeDenom));
          if(parallelQuality < 0.25) continue;
          const candidate = evaluateDailyPatternCandidate(rising ? "Rising Channel" : "Falling Channel", supportLine, resistanceLine, candles, rangeMode, toleranceAbs, parallelQuality);
          if(!candidate || candidate.supportTouches < 2 || candidate.resistanceTouches < 2 || candidate.supportTouches + candidate.resistanceTouches < 4 || candidate.insideRatio < 0.60 || candidate.widthPct < 2 || candidate.widthPct > 45) continue;
          candidate.qualityScore = scoreDailyPatternCandidate(candidate);
          if(!best || candidate.qualityScore > best.qualityScore) best = candidate;
        }
      }
    }
  }
  return best ? finalizeDailyPatternCandidate(best, candles, rangeMode, toleranceAbs) : null;
}
function detectDailyRangePattern(candles, rangeMode){
  if(!Array.isArray(candles) || candles.length < 40) return null;
  const currentPrice = candles[candles.length-1]?.close;
  const avgRangeAbs = getAverageDailyRange(candles);
  const toleranceAbs = Math.max((currentPrice || 1) * 0.0075, avgRangeAbs * 0.35);
  const swings = detectSwingPoints(candles, 3, 3);
  const highs = swings.highs.slice(-8);
  const lows = swings.lows.slice(-8);
  if(highs.length < 2 || lows.length < 2) return null;
  const avgHigh = highs.reduce((sum,p)=>sum+p.price,0)/highs.length;
  const avgLow = lows.reduce((sum,p)=>sum+p.price,0)/lows.length;
  if(!Number.isFinite(avgHigh) || !Number.isFinite(avgLow) || avgHigh <= avgLow) return null;
  const start = { index:0, time:candles[0]?.time, price:avgLow };
  const end = { index:candles.length-1, time:candles[candles.length-1]?.time, price:avgLow };
  const supportLine = buildLineFromPoints(start, end);
  const resistanceLine = buildLineFromPoints({ ...start, price:avgHigh }, { ...end, price:avgHigh });
  const widthPct = ((avgHigh - avgLow) / Math.max(currentPrice || 1, 1)) * 100;
  const highDrift = Math.abs(highs[highs.length-1].price - highs[0].price) / Math.max(avgHigh, 1);
  const lowDrift = Math.abs(lows[lows.length-1].price - lows[0].price) / Math.max(avgLow, 1);
  const flatQuality = Math.max(0, 1 - ((highDrift + lowDrift) / 0.18));
  if(widthPct < 3 || widthPct > 35 || flatQuality < 0.25) return null;
  const candidate = evaluateDailyPatternCandidate("Horizontal Range", supportLine, resistanceLine, candles, rangeMode, toleranceAbs, flatQuality);
  if(!candidate || candidate.supportTouches < 2 || candidate.resistanceTouches < 2 || candidate.supportTouches + candidate.resistanceTouches < 4 || candidate.insideRatio < 0.62) return null;
  return finalizeDailyPatternCandidate(candidate, candles, rangeMode, toleranceAbs);
}
function detectDailyPattern(candles, rangeMode = activeDailyRange || "6M"){
  try{
    if(!Array.isArray(candles) || candles.length < 40) return createEmptyDailyPattern(rangeMode, "Not enough Daily candles for pattern detection.");
    const candidates = [detectDailyChannelPattern(candles, rangeMode), detectDailyRangePattern(candles, rangeMode)].filter(Boolean);
    if(!candidates.length) return createEmptyDailyPattern(rangeMode, "No clear Daily channel/range detected.");
    return candidates.sort((a,b)=>b.qualityScore-a.qualityScore)[0];
  }catch(e){
    console.error("Daily pattern detection failed:", e);
    return createEmptyDailyPattern(rangeMode, "Daily pattern unavailable.");
  }
}
function formatDailyPatternSummary(pattern){
  if(!pattern?.ok) return "Daily Pattern · No clear channel/range detected";
  return `Daily Pattern · ${pattern.type} · ${pattern.status} · ${pattern.currentPosition || "Position unavailable"} · Touches ${pattern.supportTouches}/${pattern.resistanceTouches}`;
}
function setDailyPatternSummary(pattern){ if(els.lowerDailyPatternSummary){ els.lowerDailyPatternSummary.textContent = formatDailyPatternSummary(pattern); els.lowerDailyPatternSummary.hidden = !getChartLayer("daily", "patternSummary"); } }

function updateDailyMarketContext(candles, mode){
  try{
    if(!Array.isArray(candles) || !candles.length){
      const pattern = createEmptyDailyPattern(mode, "Daily pattern unavailable.");
      setDailyPatternSummary(pattern);
      updateMarketPreparationState({ daily: { candles: [], fvgZones: [], srSummary: null, pattern, meta: { rangeMode: mode, preset: dailyPreset, candleCount: 0, updatedAt: Date.now() } }, meta: { sourcesReady: { daily: false } } });
      renderMarketPreparationMap(buildMarketPreparationMap());
      return;
    }
    const current = candles[candles.length-1]?.close;
    const fvgZones = scanDailyFvg(candles).filter(f=>f.status!=='Filled').map((f)=>{
      const inside = current>=f.lower && current<=f.upper;
      const nearest = current>f.upper ? f.upper : f.lower;
      const distance = inside ? 0 : Math.abs(current-nearest)/current*100;
      return { ...f, distancePct: distance };
    }).sort((a,b)=>Math.abs(a.distancePct)-Math.abs(b.distancePct) || ((a.status==='Unfilled'?0:1)-(b.status==='Unfilled'?0:1)) || b.index-a.index);
    const srSummary = scanDailySupportResistance(candles);
    const pattern = detectDailyPattern(candles, mode);
    setDailyPatternSummary(pattern);
    updateMarketPreparationState({ daily: { candles, fvgZones, srSummary, pattern, meta: { rangeMode: mode, preset: dailyPreset, candleCount: candles.length, updatedAt: Date.now() } }, meta: { sourcesReady: { daily: true } } });
    renderDailyPatternOverlay();
    renderMarketPreparationMap(buildMarketPreparationMap());
  }catch(e){
    console.error('Daily market context update failed:', e);
    const pattern = createEmptyDailyPattern(mode, "Daily pattern unavailable.");
    setDailyPatternSummary(pattern);
    updateMarketPreparationState({ daily: { candles: [], fvgZones: [], srSummary: null, pattern, meta: { rangeMode: mode, preset: dailyPreset, candleCount: 0, updatedAt: Date.now() } }, meta: { sourcesReady: { daily: false } } });
    renderMarketPreparationMap(buildMarketPreparationMap());
  }
}
function destroyIntradayCharts(){ setLtfMeta(els.lower4hMeta, '4H Reaction: waiting'); setLtfMeta(els.lower1hMeta, '1H Timing: waiting'); if(ltf4hChart){ ltf4hChart.remove(); ltf4hChart=null; } if(ltf1hChart){ ltf1hChart.remove(); ltf1hChart=null; } ltf4hSeries=null; ltf1hSeries=null; clear4hFvgOverlay(); clear4hSrOverlay(); clearTrendlineOverlay("h4"); if(els.lower4hFvgOverlay) els.lower4hFvgOverlay.innerHTML=""; if(els.lower4hSrOverlay) els.lower4hSrOverlay.innerHTML=""; if(manualLinePlacement.chartKey==='h4') disableManualLinePlacement(); if(trendlineDrawMode.chartKey==='h4') disableTrendlineDrawMode(); }
function destroyLtfCharts(){ destroyDailyChart(); destroyIntradayCharts(); }
function mapKlinesToCandles(klines, limit){
  const src = typeof limit === "number" ? klines.slice(-limit) : klines;
  return src.map((k)=>({ time:Math.floor(Number(k[0]) / 1000), open:parseFloat(k[1]), high:parseFloat(k[2]), low:parseFloat(k[3]), close:parseFloat(k[4]), volume:parseFloat(k[5]) }))
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
function formatCandleDate(time){
  if(time === null || time === undefined || time === "") return "—";
  if(typeof time === "string") return time.slice(0,10);
  if(typeof time === "object" && "year" in time){
    const mm = String(time.month).padStart(2,"0"), dd = String(time.day).padStart(2,"0");
    return `${time.year}-${mm}-${dd}`;
  }
  const n = Number(time);
  if(!Number.isFinite(n)) return "—";
  const ms = n > 1e12 ? n : n * 1000;
  const d = new Date(ms);
  return Number.isNaN(d.getTime()) ? "—" : d.toISOString().slice(0,10);
}
function getCandleDateRange(candles){
  if(!Array.isArray(candles) || !candles.length) return { count:0, first:"—", last:"—" };
  return { count:candles.length, first:formatCandleDate(candles[0]?.time), last:formatCandleDate(candles[candles.length-1]?.time) };
}
function formatLtfRangeMeta({ role, mode, candles, isCapped = false, isCustom = false, capLabel = "" }){
  const range = getCandleDateRange(candles);
  if(!range.count) return `${role} · range unavailable`;
  const modeText = String(mode || "selected").toUpperCase();
  let behavior = isCustom ? "custom range" : `follows selected ${modeText} range`;
  if(isCustom && capLabel) behavior = `custom range, ${capLabel}`;
  else if(isCapped) behavior = `capped for timing · ${capLabel || `latest ${range.count} candles`}`;
  else if(capLabel) behavior = `${behavior} · ${capLabel}`;
  return `${role} · ${behavior} · ${range.first} → ${range.last} · ${range.count} candles`;
}


function clearDailyPatternOverlay(){ if(els.lowerDailyPatternOverlay) els.lowerDailyPatternOverlay.innerHTML = ""; }
function lineToSvgCoords(chart, series, line, startIndex, endIndex, candles){
  if(!chart || !series || !line || !Array.isArray(candles) || !candles.length) return null;
  const startCandle = candles[startIndex], endCandle = candles[endIndex];
  if(!startCandle || !endCandle) return null;
  const startPrice = getLineValueAtIndex(line, startIndex);
  const endPrice = getLineValueAtIndex(line, endIndex);
  if(!Number.isFinite(startPrice) || !Number.isFinite(endPrice)) return null;
  const x1 = chart.timeScale().timeToCoordinate(startCandle.time);
  const x2 = chart.timeScale().timeToCoordinate(endCandle.time);
  const y1 = series.priceToCoordinate(startPrice);
  const y2 = series.priceToCoordinate(endPrice);
  if([x1,x2,y1,y2].some((v)=>!Number.isFinite(v))) return null;
  return { x1, y1, x2, y2, endPrice };
}
function getDailyPatternOverlayPoints(pattern){
  const candles = marketPreparationState.daily?.candles?.length ? marketPreparationState.daily.candles : latestDailyCandles;
  if(!pattern?.ok || !Array.isArray(candles) || !candles.length) return null;
  const startIndex = Math.max(0, Math.min(pattern.supportLine?.startIndex ?? 0, pattern.resistanceLine?.startIndex ?? 0));
  const endIndex = candles.length - 1;
  return {
    candles,
    support: lineToSvgCoords(ltfDailyChart, ltfDailySeries, pattern.supportLine, startIndex, endIndex, candles),
    resistance: lineToSvgCoords(ltfDailyChart, ltfDailySeries, pattern.resistanceLine, startIndex, endIndex, candles),
  };
}
function renderPatternLineSvg({ coords, label, className }){
  if(!coords) return "";
  const labelX = Math.max(6, Math.min(coords.x2 - 120, Math.max(coords.x1, coords.x2) - 128));
  const labelY = Math.max(14, coords.y2 - 7);
  return `<g class="${className}"><line x1="${coords.x1.toFixed(1)}" y1="${coords.y1.toFixed(1)}" x2="${coords.x2.toFixed(1)}" y2="${coords.y2.toFixed(1)}"/><text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}">${escapeHtml(label)}</text></g>`;
}
function renderDailyPatternOverlay(){
  try{
    if(!getChartLayer("daily", "patternLines")){ clearDailyPatternOverlay(); return; }
    const layer = els.lowerDailyPatternOverlay;
    const pattern = marketPreparationState.daily?.pattern;
    if(!layer || !ltfDailyChart || !ltfDailySeries || !pattern?.ok){ clearDailyPatternOverlay(); return; }
    const drawableStatuses = ["Valid", "Strong", "Broken"];
    if(!drawableStatuses.includes(pattern.status)){ clearDailyPatternOverlay(); return; }
    const points = getDailyPatternOverlayPoints(pattern);
    if(!points?.support || !points?.resistance){ clearDailyPatternOverlay(); return; }
    const rect = layer.getBoundingClientRect();
    const width = Math.max(layer.clientWidth || rect.width || 0, 1);
    const height = Math.max(layer.clientHeight || rect.height || 0, 1);
    const isRange = pattern.type === "Horizontal Range";
    const brokenClass = pattern.status === "Broken" ? " broken" : "";
    const supportLabel = pattern.status === "Broken" && !isRange ? "Broken Channel Support" : (isRange ? "Daily Range Support" : "Daily Channel Support");
    const resistanceLabel = pattern.status === "Broken" && !isRange ? "Broken Channel Resistance" : (isRange ? "Daily Range Resistance" : "Daily Channel Resistance");
    layer.innerHTML = `<svg viewBox="0 0 ${width.toFixed(1)} ${height.toFixed(1)}" preserveAspectRatio="none" aria-hidden="true">${renderPatternLineSvg({ coords:points.support, label:supportLabel, className:`daily-pattern-line support${brokenClass}` })}${renderPatternLineSvg({ coords:points.resistance, label:resistanceLabel, className:`daily-pattern-line resistance${brokenClass}` })}</svg>`;
  }catch(e){
    console.error("Daily pattern overlay render failed:", e);
    clearDailyPatternOverlay();
  }
}

function formatDailyRangeMeta({ role, mode, candles }){
  const range = getCandleDateRange(candles);
  if(!range.count) return `${role} · range unavailable`;
  const modeText = String(mode || "selected").toUpperCase();
  return `${role} · selected ${modeText} range · ${range.first} → ${range.last} · ${range.count} candles`;
}
function formatIntradayRangeMeta({ role, mode, candles, isCustom = false }){
  const text = formatLtfRangeMeta({ role, mode, candles, isCustom });
  const modeText = String(mode || "selected").toUpperCase();
  return isCustom ? text : text.replace(`follows selected ${modeText} range`, `follows selected Intraday ${modeText} range`);
}
function setLtfMeta(el, text){ if(el) el.textContent = text; }
async function renderDailyRangeMode(mode = activeDailyRange || "6M"){
  activeDailyRange = mode;
  const preset = ({ "3M":"3m", "6M":"6m", "1Y":"1y" }[mode] || dailyPreset || "6m");
  dailyPreset = preset;
  if(!ltfVisible) return;
  if(!els.lowerDailyChart || els.lowerDailyChart.clientWidth===0 || els.lowerDailyChart.clientHeight===0){
    requestAnimationFrame(()=>renderDailyRangeMode(mode));
    return;
  }
  toggleLtfError(els.lowerDailyError,'');
  try{
    destroyDailyChart();
    const limit = getDailyPresetLimit(preset);
    const rows = await fetchLtfKlines('1d', null, null, limit);
    const candles = mapKlinesToCandles(rows, limit);
    if(!candles.length){
      setLtfMeta(els.lowerDailyMeta, 'Daily Context · range unavailable');
      toggleLtfError(els.lowerDailyError,'No Daily candles found for selected range.');
      updateDailyMarketContext([], mode);
      return;
    }
    setLtfMeta(els.lowerDailyMeta, formatDailyRangeMeta({ role:'Daily Context', mode, candles }));
    renderDailyTimeframeChart(candles);
    ltfDailyChart.resize(els.lowerDailyChart.clientWidth, els.lowerDailyChart.clientHeight);
    ltfDailyChart.timeScale().fitContent();
    ltfDailyChart.timeScale().subscribeVisibleTimeRangeChange(()=>renderDailyPatternOverlay());
    ltfDailyChart.timeScale().subscribeVisibleLogicalRangeChange(()=>renderDailyPatternOverlay());
    updateDailyMarketContext(candles, mode);
  }catch(e){
    console.error('Daily chart render failed:', e);
    setLtfMeta(els.lowerDailyMeta, 'Daily Context · range unavailable');
    toggleLtfError(els.lowerDailyError,'Daily chart unavailable.');
    updateDailyMarketContext([], mode);
  }
}
async function renderLowerTimeframeMode(mode="3M"){
  activeLowerTfMode = mode;
  console.log("Lower TF mode:", activeLowerTfMode);
  if(!ltfVisible) return;
  if(!els.lower4hChart || !els.lower1hChart || els.lower4hChart.clientWidth===0 || els.lower1hChart.clientWidth===0 || els.lower4hChart.clientHeight===0 || els.lower1hChart.clientHeight===0){
    requestAnimationFrame(()=>renderLowerTimeframeMode(mode));
    return;
  }
  lowerTimeframeLoaded = true;
  toggleLtfError(els.lower4hError,''); toggleLtfError(els.lower1hError,'');
  destroyIntradayCharts();
  if(els.lower4hChart) els.lower4hChart.innerHTML='';
  if(els.lower1hChart) els.lower1hChart.innerHTML='';
  if(els.lower4hFvgOverlay) els.lower4hFvgOverlay.innerHTML='';
  if(els.lower4hSrOverlay) els.lower4hSrOverlay.innerHTML='';

  let st=null, et=null, preset='3m';
  if(mode==='1W') preset='1w';
  if(mode==='2W') preset='2w';
  if(mode==='1M') preset='1m';
  if(mode==='3M') preset='3m';
  if(mode==='CUSTOM') preset='custom';
  if(mode==='RESET') preset='3m';
  const hasRange = preset==='custom' && els.ltfStartDate.value && els.ltfEndDate.value;
  if(hasRange){
    st = new Date(`${els.ltfStartDate.value}T00:00:00`).getTime();
    et = new Date(`${els.ltfEndDate.value}T23:59:59`).getTime();
  }
  const limit4hByPreset = { '1w': 42, '2w': 84, '1m': 180, '3m': 540 };
  const limit1hByPreset = { '1w': 168, '2w': 336, '1m': 336, '3m': 336 };
  const selectedModeLabel = { '1w':'1W', '2w':'2W', '1m':'1M', '3m':'3M' }[preset] || '3M';
  const h1CapLabelByPreset = { '1w':'latest 168 candles (~1 week)', '2w':'latest 336 candles (~2 weeks)', '1m':'latest 336 candles (~2 weeks)', '3m':'latest 336 candles (~2 weeks)' };
  const limit4h = hasRange ? 1000 : (limit4hByPreset[preset] || 540);
  const limit1h = hasRange ? 1000 : (limit1hByPreset[preset] || 336);
  console.log('4H chart size:', els.lower4hChart.clientWidth, els.lower4hChart.clientHeight);
  const [h4,h1] = await Promise.allSettled([fetchLtfKlines('4h', st, et, limit4h), fetchLtfKlines('1h', st, et, limit1h)]);
  if(h4.status==='fulfilled'){
    try {
      const candles=mapKlinesToCandles(h4.value, hasRange ? undefined : limit4h);
      console.log('4H candles:', candles.length);
      console.log('Sample 4H candle:', candles[0]);
      if(!candles.length) { setLtfMeta(els.lower4hMeta, '4H Reaction · range unavailable'); toggleLtfError(els.lower4hError,'No 4H candles found for selected range.'); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='No signal detected (4H FVG).'; render4hSupportResistanceSummary({ok:false,reason:'not_enough_candles'}); }
      else {
        setLtfMeta(els.lower4hMeta, formatIntradayRangeMeta({ role:'4H Reaction', mode:selectedModeLabel, candles, isCustom:hasRange }));
        const r=renderSingleLtfChart(els.lower4hChart,candles, els.lower4hChart?.clientHeight || 400);
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
    catch(e){ console.error('4H chart render failed:', e); setLtfMeta(els.lower4hMeta, '4H Reaction · range unavailable'); toggleLtfError(els.lower4hError,'4H chart unavailable.'); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='FVG overlay unavailable'; render4hSupportResistanceSummary({ok:false,reason:'scan_failed'}); }
  } else { setLtfMeta(els.lower4hMeta, '4H Reaction · range unavailable'); toggleLtfError(els.lower4hError,'4H chart unavailable.'); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='4H data unavailable.'; if(els.lower4hStructure) els.lower4hStructure.textContent='4H Structure: 4H data unavailable.'; if(els.lower4hReaction) els.lower4hReaction.textContent='4H Reaction: 4H data unavailable.'; render4hSupportResistanceSummary({ok:false,reason:'not_enough_candles'}); }
  if(h1.status==='fulfilled'){
    try {
      const candles=mapKlinesToCandles(h1.value, hasRange ? undefined : limit1h);
      console.log('1H candles length:', candles.length);
      console.log('Sample 1H candle:', candles[0]);
      if(!candles.length) { latest1hCandles = []; setLtfMeta(els.lower1hMeta, '1H Timing · range unavailable'); toggleLtfError(els.lower1hError,'No 1H candles found for selected range.'); update1hStochasticStatus([]); }
      else {
        latest1hCandles = candles;
        setLtfMeta(els.lower1hMeta, formatLtfRangeMeta({ role:'1H Timing', mode:selectedModeLabel, candles, isCapped:!hasRange && (preset==='1m' || preset==='3m'), isCustom:hasRange, capLabel:hasRange ? 'max 1000 candles' : h1CapLabelByPreset[preset] }));
        const r1=renderSingleLtfChart(els.lower1hChart,candles, els.lower1hChart?.clientHeight || 360);
        ltf1hChart=r1.chart; ltf1hSeries=r1.series;
        ltf1hChart.resize(els.lower1hChart.clientWidth, els.lower1hChart.clientHeight);
        ltf1hChart.timeScale().fitContent();
        try { update1hStochasticStatus(candles); } catch(err){ console.error("1H stochastic update failed:", err); }
        try { render1hSweepSummary(candles); } catch(err){ console.error("1H sweep render failed:", err); }
        try { render1hStructureSummary(candles); } catch(err){ console.error("1H structure render failed:", err); }
        try { render1hEventMarkers(candles); } catch(err){ console.error("1H event marker render failed:", err); }
        renderLowerTfReactionSummary();
        renderMtfSummary();
      }
    }
    catch(e){ console.error('1H chart render failed:', e); latest1hCandles = []; setLtfMeta(els.lower1hMeta, '1H Timing · range unavailable'); update1hStochasticStatus([]); toggleLtfError(els.lower1hError,'1H chart unavailable.'); if(els.lower1hSweepSummary) els.lower1hSweepSummary.textContent='1H liquidity sweep unavailable.'; if(els.lower1hStructureSummary) els.lower1hStructureSummary.textContent='1H structure unavailable'; }
  } else { latest1hCandles = []; setLtfMeta(els.lower1hMeta, '1H Timing · range unavailable'); update1hStochasticStatus([]); toggleLtfError(els.lower1hError,'1H chart unavailable.'); if(els.lower1hSweepSummary) els.lower1hSweepSummary.textContent='1H data unavailable.'; if(els.lower1hStructureSummary) els.lower1hStructureSummary.textContent='1H structure unavailable'; }
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
  if(!getChartLayer("h4", "sr")){ clear4hSrOverlay(); return; }
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
  if(!getChartLayer("h4", "sr")){ clear4hSrOverlay(); return; }
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
  if(!getChartLayer("h4", "fvg")){ clear4hFvgOverlay(); return { selected: [], selectedBullish: [], selectedBearish: [], visualMode: 'Hidden' }; }
  if(!chart || !series || !container || !overlayLayer) return { selected: [], selectedBullish: [], selectedBearish: [], visualMode: 'Failed' };
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
  if(!getChartLayer("h4", "fvg")){ clear4hFvgOverlay(); return; }
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
    const volumeStatus = compute4hVolumeStatus(candles);
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
    if(!active4hFvgs.length){ mtfState.h4Structure = structure.status; mtfState.h4FvgNearest = null; if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='No signal detected (4H FVG).'; if(els.lower4hReaction) els.lower4hReaction.textContent='4H Reaction: No active Weekly FVG zone detected.'; const srSummary = scan4hSupportResistance(candles); latest4hSrSummary = srSummary; render4hSupportResistanceSummary(srSummary); updateMarketPreparationState({ h4: { fvgZones: [], srSummary, structureStatus: structure.status, rsiStatus, volumeStatus }, meta: { sourcesReady: { h4: true } } }); renderMarketPreparationMap(buildMarketPreparationMap()); schedule4hSrOverlayRedraw(candles); renderLowerTfReactionSummary(); renderMtfSummary(); return; }
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
    updateMarketPreparationState({ h4: { fvgZones: active4hFvgs, srSummary, structureStatus: structure.status, rsiStatus, volumeStatus }, meta: { sourcesReady: { h4: true } } });
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
function update1hStochasticStatus(candles){
  const stochastic = compute1hStochasticStatus(candles, 14, 3);
  updateMarketPreparationState({ h1: { stochastic }, meta: { sourcesReady: { h1: true } } });
  renderMarketPreparationMap(buildMarketPreparationMap());
  return stochastic;
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
  updateMarketPreparationState({ currentPrice: p, ticker: { change24hPct: ch }, meta: { sourcesReady: { ticker: true } } });
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
      weeklyDatasetCache = dataset;
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
  else {
    if(els.leftFearGreed) els.leftFearGreed.textContent="Fear & Greed: unavailable";
    updateMarketPreparationState({ sentiment: { value: null, label: null, updatedAt: null } });
    renderMarketPreparationMap(buildMarketPreparationMap());
  }

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
bindDrawingManagerEvents();
bindCurrentPriceDetailEvents();
bindChartLayerControls();
closeDrawingManager();

window.addEventListener("resize", ()=>{
  if(priceChart && els.priceChart) {
    priceChart.resize(els.priceChart.clientWidth, els.priceChart.clientHeight);
    renderFvgFilledOverlay();
    if(weeklySrSummaryForOverlay) renderWeeklySrOverlay(weeklySrSummaryForOverlay, weeklyDatasetCache || []);
  }
  if(ltfDailyChart && els.lowerDailyChart) { ltfDailyChart.resize(els.lowerDailyChart.clientWidth, els.lowerDailyChart.clientHeight); renderDailyPatternOverlay(); }
  if(ltf4hChart && els.lower4hChart) ltf4hChart.resize(els.lower4hChart.clientWidth, els.lower4hChart.clientHeight);
  if(ltf1hChart && els.lower1hChart) ltf1hChart.resize(els.lower1hChart.clientWidth, els.lower1hChart.clientHeight);
  scheduleTrendlineRedraw("weekly");
  scheduleTrendlineRedraw("h4");
  if(ltf4hChart) { schedule4hFvgOverlayRedraw(latest4hCandles); schedule4hSrOverlayRedraw(latest4hCandles); renderLowerTfReactionSummary(); }
});
