const BTC_TICKER_URL = "https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT";
const BTC_WEEKLY_KLINE_URL = "https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120";
const FEAR_GREED_URL = "https://api.alternative.me/fng/?limit=1";
const RSI_PERIOD = 14;
const RSI_WINDOW = 49;
// IMPORTANT:
// Update APP_LAST_UPDATED every time the app code is modified or deployed.
// This value represents app/code update time, not live API refresh time.
const APP_LAST_UPDATED = "2026-06-02 02:23";

const els = {
  statusText: document.getElementById("statusText"), refreshBtn: document.getElementById("refreshBtn"), appLastUpdated: document.getElementById("appLastUpdated"), dataRefreshed: document.getElementById("dataRefreshed"), globalLayerToggleBtn: document.getElementById("globalLayerToggleBtn"), globalLayerMenu: document.getElementById("globalLayerMenu"), resetAllLayersBtn: document.getElementById("resetAllLayersBtn"), chartZoomToggleBtn: document.getElementById("chartZoomToggleBtn"),
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
  prepCurrentDetail: document.getElementById("prepCurrentDetail"), prepCurrentDetailContent: document.getElementById("prepCurrentDetailContent"), prepCurrentDetailToggle: document.getElementById("prepCurrentDetailToggle"), h4LiquidityDiagnosticsPanel: document.getElementById("h4LiquidityDiagnosticsPanel"), h4LiquidityDiagnosticsBody: document.getElementById("h4LiquidityDiagnosticsBody"), h4LiquidityDiagnosticsSummary: document.getElementById("h4LiquidityDiagnosticsSummary"), tradePlanScenarioPanel: document.getElementById("tradePlanScenarioPanel"), ifvgContextPanel: document.getElementById("ifvgContextPanel"),
  fvgToggleBtn: document.getElementById("fvgToggleBtn"), biasToggleBtn: document.getElementById("biasToggleBtn"), fvgContent: document.getElementById("fvgContent"), biasContent: document.getElementById("biasContent"), fvgViewDetailsBtn: document.getElementById("fvgViewDetailsBtn"), biasViewDetailsBtn: document.getElementById("biasViewDetailsBtn"),
  priceChart: document.getElementById("priceChart"), priceChartError: document.getElementById("priceChartError"), rsiChart: document.getElementById("rsiChart"), rsiChartError: document.getElementById("rsiChartError"), weeklyRsiCard: document.getElementById("weeklyRsiCard"), weeklyLayerToggleBtn: document.getElementById("weeklyLayerToggleBtn"), weeklyLayerMenu: document.getElementById("weeklyLayerMenu"),
  ltfPanel: document.getElementById("ltfPanel"), ltfToggleBtn: document.getElementById("ltfToggleBtn"), ltfContent: document.getElementById("ltfContent"),
  ltfStartDate: document.getElementById("ltfStartDate"), ltfEndDate: document.getElementById("ltfEndDate"), ltfApplyBtn: document.getElementById("ltfApplyBtn"), ltfResetBtn: document.getElementById("ltfResetBtn"),
  lowerDailyChart: document.getElementById("lowerDailyChart"), lowerDailyError: document.getElementById("lowerDailyError"), lowerDailyMeta: document.getElementById("lowerDailyMeta"), lowerDailyPatternSummary: document.getElementById("lowerDailyPatternSummary"), lowerDailyFvgOverlay: document.getElementById("lowerDailyFvgOverlay"), lowerDailySrOverlay: document.getElementById("lowerDailySrOverlay"), lowerDailyPatternOverlay: document.getElementById("lowerDailyPatternOverlay"), lower4hMeta: document.getElementById("lower4hMeta"), lower1hMeta: document.getElementById("lower1hMeta"), lower4hChart: document.getElementById("lower4hChart"), lower1hChart: document.getElementById("lower1hChart"), lower4hError: document.getElementById("lower4hError"), lower1hError: document.getElementById("lower1hError"), lower4hFvgSummary: document.getElementById("lower4hFvgSummary"), lower4hStructure: document.getElementById("lower4hStructure"), lower4hReaction: document.getElementById("lower4hReaction"),
  lower1hSweepSummary: document.getElementById("lower1hSweepSummary"), lower1hStructureSummary: document.getElementById("lower1hStructureSummary"), lowerTfReactionSummary: document.getElementById("lowerTfReactionSummary"), dailyContextSummary: document.getElementById("dailyContextSummary"), lower4hFvgOverlay: document.getElementById("lower4hFvgOverlay"), lower4hSrOverlay: document.getElementById("lower4hSrOverlay"), lower4hSrNearestResistance: document.getElementById("lower4hSrNearestResistance"), lower4hSrStrongestResistance: document.getElementById("lower4hSrStrongestResistance"), lower4hSrNearestSupport: document.getElementById("lower4hSrNearestSupport"), lower4hSrStrongestSupport: document.getElementById("lower4hSrStrongestSupport"), lower4hSrState: document.getElementById("lower4hSrState"),
  ltfDateControls: document.getElementById("ltfDateControls"), ltfPreset1w: document.getElementById("ltfPreset1w"), ltfPreset2w: document.getElementById("ltfPreset2w"), ltfPreset1m: document.getElementById("ltfPreset1m"), ltfPreset3m: document.getElementById("ltfPreset3m"), ltfPresetCustom: document.getElementById("ltfPresetCustom"), dailyPreset3m: document.getElementById("dailyPreset3m"), dailyPreset6m: document.getElementById("dailyPreset6m"), dailyPreset1y: document.getElementById("dailyPreset1y"), dailyLayerToggleBtn: document.getElementById("dailyLayerToggleBtn"), dailyLayerMenu: document.getElementById("dailyLayerMenu"), h4LayerToggleBtn: document.getElementById("h4LayerToggleBtn"), h4LayerMenu: document.getElementById("h4LayerMenu"), h1LayerToggleBtn: document.getElementById("h1LayerToggleBtn"), h1LayerMenu: document.getElementById("h1LayerMenu"),
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
let dailyFvgRedrawPending = false;
let dailySrRedrawPending = false;
let active4hFvgs = [];
let latestDailyCandles = [];
let latest4hCandles = [];
let srRedrawPending = false;
let latest4hSrSummary = null;
let latest4hStructureStatus = "No clear 4H structure shift";
let latest1hSweepStatus = "No recent 1H liquidity sweep";
let latest1hStructureStatus = "No clear 1H structure shift";
let activeLowerTfMode = "3M";
let activeDailyRange = "3M";
let ltfVisible = false;
let dailyPreset = "3m";
let ltfPreset = "3m";
const DAILY_PRESET_LIMITS = { "3m": 92, "6m": 183, "1y": 365 };
const CHART_ZOOM_OFF_INTERACTION_OPTIONS = {
  handleScroll: {
    mouseWheel: false,
    pressedMouseMove: true,
    horzTouchDrag: true,
    vertTouchDrag: false,
  },
  handleScale: {
    mouseWheel: false,
    pinch: true,
    axisPressedMouseMove: true,
  },
};
const CHART_ZOOM_ON_INTERACTION_OPTIONS = {
  handleScroll: {
    mouseWheel: false,
    pressedMouseMove: true,
    horzTouchDrag: true,
    vertTouchDrag: false,
  },
  handleScale: {
    mouseWheel: false,
    pinch: true,
    axisPressedMouseMove: true,
  },
};
let chartZoomMode = false;
let lowerTimeframeLoaded = false;
let fvgOpen=false;
let biasOpen=false;
const MANUAL_LINES_KEY = "pl_manual_chart_lines_v1";
const MANUAL_DRAWINGS_KEY = "pl_manual_chart_drawings_v1";
const MAX_MANUAL_LINES_PER_CHART = 30;
const MAX_MANUAL_DRAWINGS_PER_CHART = 30;
const CHART_LAYER_STORAGE_KEY = "pulseLab.chartLayers.v1";
const DEFAULT_CHART_LAYER_STATE = {
  weekly: { fvg: true, sr: true, manualLines: true, trendlines: true, rsiPanel: true },
  daily: { fvg: true, sr: true, patternLines: true, patternSummary: true },
  h4: { fvg: true, sr: true, manualLines: true, trendlines: true },
  h1: { sweepMarkers: true, structureMarkers: true, stochasticText: true },
};
const CHART_LAYER_PRESETS = {
  clean: {
    weekly: { fvg: false, sr: false, manualLines: true, trendlines: true, rsiPanel: true },
    daily: { fvg: false, sr: false, patternLines: false, patternSummary: true },
    h4: { fvg: false, sr: false, manualLines: true, trendlines: true },
    h1: { sweepMarkers: false, structureMarkers: false, stochasticText: true },
  },
  manual: {
    weekly: { fvg: false, sr: false, manualLines: true, trendlines: true, rsiPanel: false },
    daily: { fvg: false, sr: false, patternLines: false, patternSummary: false },
    h4: { fvg: false, sr: false, manualLines: true, trendlines: true },
    h1: { sweepMarkers: false, structureMarkers: false, stochasticText: false },
  },
  preparation: {
    weekly: { fvg: true, sr: true, manualLines: true, trendlines: true, rsiPanel: true },
    daily: { fvg: true, sr: true, patternLines: true, patternSummary: true },
    h4: { fvg: true, sr: true, manualLines: true, trendlines: true },
    h1: { sweepMarkers: true, structureMarkers: true, stochasticText: true },
  },
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
const TRADE_SCENARIO_STATUS = {
  NO_TRADE: "No Trade",
  WAIT: "Wait Confirmation",
  CANDIDATE: "Candidate Scenario",
  ACTIVE: "Active Scenario",
  INVALIDATED: "Invalidated",
};
const TRADE_SCENARIO_DISCLAIMER = "Scenario planning only · not financial advice or a direct trading signal.";
const IFVG_STATE = {
  NONE: "none",
  POSSIBLE: "possible",
  VALID: "valid",
  CONFIRMED: "confirmed",
  FAILED: "failed",
};
const IFVG_RETEST_STATUS = {
  NONE: "none",
  BOUNDARY: "boundary",
  INSIDE: "inside",
  CE: "ce",
  FULL: "full",
};
const IFVG_REJECTION_STATUS = {
  NONE: "none",
  CANDIDATE: "candidate",
  CONFIRMED: "confirmed",
};
const IFVG_QUALITY_BAND = {
  WEAK: "weak",
  USABLE: "usable",
  STRONG: "strong",
  HIGH_CONFLUENCE: "highConfluence",
};
const LIQUIDITY_OF_STATE = {
  NONE: "none",
  POSSIBLE: "possible",
  VALID: "valid",
  CONFIRMED: "confirmed",
  FAILED: "failed",
};
const LIQUIDITY_SWEEP_TYPE = {
  NONE: "none",
  SWEEP_LOW: "sweepLow",
  SWEEP_HIGH: "sweepHigh",
};
const LIQUIDITY_RECLAIM_STATUS = {
  NONE: "none",
  SAME_BAR: "sameBar",
  NEXT_BAR: "nextBar",
  LATE: "late",
  MISSED: "missed",
};
const LIQUIDITY_BAND = {
  WEAK: "weak",
  USABLE: "usable",
  STRONG: "strong",
  HIGH_CONFLUENCE: "highConfluence",
};
const LIQUIDITY_AVWAP_SIDE = {
  UNKNOWN: "unknown",
  ABOVE: "above",
  BELOW: "below",
  AROUND: "around",
};
const LIQUIDITY_VOLUME_STATUS = {
  UNKNOWN: "unknown",
  NORMAL: "normal",
  SPIKE: "spike",
  STRONG_SPIKE: "strongSpike",
};
const marketPreparationState = {
  currentPrice: null,
  weekly: { fvgZones: [], fvgDetails: [], recentFvgReaction: createEmptyRecentFvgReactionMemory(), recentBrokenFvgDetails: createEmptyRecentBrokenFvgDetails("Weekly"), srSummary: null },
  daily: { candles: [], fvgZones: [], fvgDetails: [], recentFvgReaction: createEmptyRecentFvgReactionMemory(), recentBrokenFvgDetails: createEmptyRecentBrokenFvgDetails("Daily"), srSummary: null, structureStatus: null, candleContext: null, volumeStatus: null, recentReaction: null, pattern: createEmptyDailyPattern("3M"), meta: { rangeMode: "3M", preset: "3m", candleCount: 0, updatedAt: null } },
  h4: { fvgZones: [], fvgDetails: [], recentFvgReaction: createEmptyRecentFvgReactionMemory(), recentBrokenFvgDetails: createEmptyRecentBrokenFvgDetails("4H"), srSummary: null, structureStatus: null, rsiStatus: null, volumeStatus: null, liquidityOrderflowState: createEmptyLiquidityOrderflowState("4H", "context"), recentReaction: { lastBrokenFvg: null, lastMitigatedFvg: null, lastBrokenSupport: null, lastBrokenResistance: null, lastReactionLabel: null, updatedAt: null } },
  h1: { sweepStatus: null, structureStatus: null, stochastic: { ok: false, k: null, d: null, prevK: null, prevD: null, label: "Stoch unavailable", reason: null, status: "idle" } },
  mtf: { finalStatus: null, weeklyBias: null, reaction4h: null, timing1h: null },
  ticker: { change24hPct: null },
  sentiment: { value: null, label: null, updatedAt: null },
  currentPricePosition: { currentPosition: null, nearestUpsideZone: null, nearestDownsideZone: null, recentReaction: null, fvg: { ok: false, timeframe: null, zoneType: null, zoneRange: null, detailStatus: null, position: null, ceStatus: null, distancePct: null, recentReaction: null, reason: null, updatedAt: null }, timeframe: "4H", updatedAt: null },
  map: { upside: [], downside: [], currentRowText: "● Price unavailable" },
  fvgMtfContext: createEmptyFvgMtfContext(),
  fvgQuality: createEmptyFvgQualityState(),
  tradePlanScenario: createEmptyTradePlanScenario(),
  meta: { lastUpdatedMs: null, sourcesReady: { ticker: false, weekly: false, daily: false, h4: false, h1: false } },
};
if(typeof window !== "undefined") {
  window.getPulseLabState = function getPulseLabState(){
    return marketPreparationState;
  };
}

const h4MarketMapRealStateSamples = [];
function cloneMarketMapSampleValue(value){
  if(value == null) return value;
  try{
    return JSON.parse(JSON.stringify(value));
  } catch {
    if(Array.isArray(value)) return value.slice();
    if(typeof value === "object") return { ...value };
    return value;
  }
}
function marketMapSampleHasLabel(values){
  return (Array.isArray(values) ? values : []).some((value)=>{
    const label = String(value || "").toLowerCase();
    return label.includes("market map") || label.includes("marketmap");
  });
}
function getPulseLabStateForMarketMapSample(){
  if(typeof window !== "undefined" && typeof window.getPulseLabState === "function") return window.getPulseLabState();
  return marketPreparationState;
}
function buildH4MarketMapSampleClassification({ nearbyMarketMapZones = [], nearestMarketMapZone = null, marketMapDiagnostics = {} } = {}){
  const sourceBreakdown = Array.isArray(marketMapDiagnostics.sourceBreakdown) ? marketMapDiagnostics.sourceBreakdown : [];
  const duplicateRisk = Array.isArray(marketMapDiagnostics.duplicateRisk) ? marketMapDiagnostics.duplicateRisk : [];
  const directionInference = Array.isArray(marketMapDiagnostics.directionInference) ? marketMapDiagnostics.directionInference : [];
  const eligiblePreview = marketMapDiagnostics.eligiblePreview || {};
  const hasNearbyMarketMap = nearbyMarketMapZones.length > 0;
  const hasNearestMarketMap = nearestMarketMapZone?.found === true;
  const hasHtfCandidate = sourceBreakdown.some((item)=>item?.hasHtfSource || item?.multiSource) || Number(eligiblePreview.futureCandidateCount) > 0;
  const hasDuplicateRisk = duplicateRisk.length > 0;
  const hasAlignedDirectionInference = directionInference.some((item)=>item?.alignment === "aligned");
  const hasConflictDirectionInference = directionInference.some((item)=>item?.alignment === "conflict");
  const nearnessGap = marketMapDiagnostics.nearnessGap || null;
  const gapToBufferAbs = Number(nearnessGap?.gapToBufferAbs);
  const buffer = Number(nearnessGap?.buffer);
  const hasNearnessGap = !!nearnessGap;
  const isAlmostNearby = nearnessGap?.nearestFound === true
    && Number(nearnessGap?.nearbyCount) === 0
    && Number.isFinite(gapToBufferAbs)
    && Number.isFinite(buffer)
    && gapToBufferAbs <= buffer * 2;
  const farFromNearby = nearnessGap?.nearestFound === true
    && Number(nearnessGap?.nearbyCount) === 0
    && Number.isFinite(gapToBufferAbs)
    && Number.isFinite(buffer)
    && gapToBufferAbs > buffer * 2;
  return {
    hasNearbyMarketMap,
    hasNearestMarketMap,
    hasHtfCandidate,
    hasDuplicateRisk,
    hasAlignedDirectionInference,
    hasConflictDirectionInference,
    hasNearnessGap,
    isAlmostNearby,
    farFromNearby,
    isUsefulFor2D4BReview: hasNearbyMarketMap || hasHtfCandidate || hasDuplicateRisk || hasAlignedDirectionInference || hasConflictDirectionInference,
  };
}
function buildH4MarketMapRealStateSnapshot(label = null){
  const state = getPulseLabStateForMarketMapSample() || {};
  const h4Liquidity = state.h4?.liquidityOrderflowState || {};
  const diagnostics = h4Liquidity.diagnostics || {};
  const mapState = state.map || {};
  const active = h4Liquidity.activeEpisode || {};
  const marketMapDiagnostics = diagnostics.marketMapDiagnostics || createEmptyMarketMapContextDiagnostics("Market Map diagnostics unavailable in current state.");
  const contextGateEligibleCorroborators = Array.isArray(diagnostics.contextGateEligibleCorroborators) ? diagnostics.contextGateEligibleCorroborators : [];
  const confirmationCorroborators = Array.isArray(diagnostics.confirmationCorroborators) ? diagnostics.confirmationCorroborators : [];
  const nearbyMarketMapZones = Array.isArray(diagnostics.nearbyMarketMapZones) ? diagnostics.nearbyMarketMapZones : [];
  const marketMapAllowListProbe = hasH4LiquidityCorroborator(active, { eligibleContextCorroborators: ["Market Map confluence", "Nearby Market Map context"] });
  const safetyFlags = {
    hasMarketMapEligibleLabel: marketMapSampleHasLabel(contextGateEligibleCorroborators),
    hasMarketMapConfirmationLabel: marketMapSampleHasLabel(confirmationCorroborators),
    hasMarketMapAllowListLeak: marketMapSampleHasLabel(marketMapAllowListProbe.corroborators),
    nearestOnlyEligibleLeak: diagnostics.nearestMarketMapZone?.found === true && nearbyMarketMapZones.length === 0 && marketMapSampleHasLabel(contextGateEligibleCorroborators),
    h1HasLiquidityState: Boolean(state.h1?.liquidityOrderflowState),
  };
  const sampleClassification = buildH4MarketMapSampleClassification({
    nearbyMarketMapZones,
    nearestMarketMapZone: diagnostics.nearestMarketMapZone,
    marketMapDiagnostics,
  });
  const warnings = Object.values(safetyFlags).some(Boolean) ? ["Safety flag failed — investigate before proceeding."] : [];
  return cloneMarketMapSampleValue({
    id: `h4-market-map-sample-${h4MarketMapRealStateSamples.length + 1}`,
    label: label ? String(label) : `sample-${h4MarketMapRealStateSamples.length + 1}`,
    timestamp: new Date().toISOString(),
    activeEpisode: {
      status: active.status,
      stale: active.stale,
      reclaim: active.reclaim?.status,
      avwap: active.avwap?.side,
      correctSideCloses: active.avwap?.correctSideCloses,
      score: active.score,
      band: active.band,
      failure: active.failure?.detected,
      display: active.displayStatus,
    },
    mapShapeSummary: {
      keys: Object.keys(mapState),
      upsideCount: Array.isArray(mapState.upside) ? mapState.upside.length : null,
      downsideCount: Array.isArray(mapState.downside) ? mapState.downside.length : null,
      rowsCount: Array.isArray(mapState.rows) ? mapState.rows.length : null,
      zonesCount: Array.isArray(mapState.zones) ? mapState.zones.length : null,
      upsideWatchCount: Array.isArray(mapState.upsideWatch) ? mapState.upsideWatch.length : null,
      downsideWatchCount: Array.isArray(mapState.downsideWatch) ? mapState.downsideWatch.length : null,
      firstUpsideKeys: Array.isArray(mapState.upside) && mapState.upside[0] ? Object.keys(mapState.upside[0]) : [],
      firstDownsideKeys: Array.isArray(mapState.downside) && mapState.downside[0] ? Object.keys(mapState.downside[0]) : [],
    },
    marketMap: {
      nearbyMarketMapZones,
      nearestMarketMapZone: diagnostics.nearestMarketMapZone,
      sourceBreakdown: marketMapDiagnostics.sourceBreakdown,
      duplicateRisk: marketMapDiagnostics.duplicateRisk,
      directionInference: marketMapDiagnostics.directionInference,
      distanceSummary: marketMapDiagnostics.distanceSummary,
      nearnessGap: marketMapDiagnostics.nearnessGap,
      eligiblePreview: marketMapDiagnostics.eligiblePreview,
      warnings: marketMapDiagnostics.warnings,
      skipped: marketMapDiagnostics.skipped,
    },
    gate: {
      contextGateEligibleCorroborators,
      confirmationCorroborators,
      confirmationBlockers: Array.isArray(diagnostics.confirmationBlockers) ? diagnostics.confirmationBlockers : [],
    },
    safetyFlags,
    sampleClassification,
    warnings,
  });
}
function runH4MarketMapRealStateSample(label = null){
  const snapshot = buildH4MarketMapRealStateSnapshot(label);
  h4MarketMapRealStateSamples.push(snapshot);
  return snapshot;
}
function getH4MarketMapRealStateSamples(){
  return h4MarketMapRealStateSamples.map((sample)=>cloneMarketMapSampleValue(sample));
}
function clearH4MarketMapRealStateSamples(){
  const countBefore = h4MarketMapRealStateSamples.length;
  h4MarketMapRealStateSamples.length = 0;
  return { cleared: true, countBefore };
}
if(typeof window !== "undefined") {
  window.runH4MarketMapRealStateSample = runH4MarketMapRealStateSample;
  window.getH4MarketMapRealStateSamples = getH4MarketMapRealStateSamples;
  window.clearH4MarketMapRealStateSamples = clearH4MarketMapRealStateSamples;
}

function createEmptyLiquidityOrderflowState(timeframe = "4H", role = "context", reason = "Liquidity/orderflow state not evaluated yet."){
  const safeReason = reason || "Liquidity/orderflow state not evaluated yet.";
  return {
    timeframe,
    role,
    sourceMode: "ohlcv-proxy",
    lastUpdated: null,
    activeEpisode: {
      episodeId: null,
      status: LIQUIDITY_OF_STATE.NONE,
      stale: false,
      displayStatus: "No liquidity/orderflow confirmation",
      band: LIQUIDITY_BAND.WEAK,
      score: 0,
      reasons: [safeReason],
      sweep: {
        detected: false,
        type: LIQUIDITY_SWEEP_TYPE.NONE,
        levelType: null,
        levelPrice: null,
        breachPrice: null,
        breachBuffer: null,
        excursionAtr: null,
        anchorTime: null,
        anchorIndex: null,
        anchorMethod: null,
        mergeCount: 0,
      },
      reclaim: {
        detected: false,
        status: LIQUIDITY_RECLAIM_STATUS.NONE,
        at: null,
        closePrice: null,
        barsFromSweep: null,
        passedThreshold: false,
      },
      avwap: {
        available: false,
        value: null,
        side: LIQUIDITY_AVWAP_SIDE.UNKNOWN,
        distancePct: null,
        correctSideCloses: 0,
        anchorTime: null,
        lifetimeBars: 0,
        lostControl: false,
      },
      structure: {
        swingMethod: null,
        choch: LIQUIDITY_OF_STATE.NONE,
        bos: LIQUIDITY_OF_STATE.NONE,
        chochAligned: false,
        bosAligned: false,
        firstBreakTime: null,
      },
      volume: {
        baselineMethod: "rollingMedian20",
        baseline: null,
        current: null,
        ratio: null,
        status: LIQUIDITY_VOLUME_STATUS.UNKNOWN,
      },
      context: {
        weeklyBias: null,
        dailyBias: null,
        htfAligned: false,
        strongConflict: false,
        nearMarketMapZone: false,
        marketMapZoneIds: [],
        nearFvg: false,
        nearIfvg: false,
        ifvgDirection: null,
        ifvgState: null,
        zoneOrIfvgConfluence: false,
      },
      failure: {
        detected: false,
        at: null,
        price: null,
        reason: null,
        priorStateBeforeFailure: null,
      },
    },
    recentCompleted: [],
    diagnostics: {
      closedBarsUsed: 0,
      candidateLevelsScanned: 0,
      latencyMs: null,
      dataWarnings: [],
    },
  };
}
function normalizeLiquidityPrice(value){
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}
function getOrderflowCandleTime(candle){
  return candle?.time ?? candle?.openTime ?? candle?.timestamp ?? null;
}
function createLiquidityDiagnosticWarning(message){
  return String(message || "Liquidity/orderflow diagnostic unavailable.");
}
function isValidOrderflowCandle(candle){
  const open = Number(candle?.open);
  const high = Number(candle?.high);
  const low = Number(candle?.low);
  const close = Number(candle?.close);
  return Number.isFinite(open) && Number.isFinite(high) && Number.isFinite(low) && Number.isFinite(close) && high >= low;
}
function getOrderflowCandleVolume(candle){
  const volume = Number(candle?.volume);
  return Number.isFinite(volume) && volume > 0 ? volume : 0;
}
function getClosedOrderflowCandles(candles){
  if(!Array.isArray(candles) || candles.length < 2) return [];
  return candles.slice(0, -1).filter(isValidOrderflowCandle);
}
function createUnavailableAnchoredVwap(reason = "Anchored VWAP is unavailable."){
  return { available: false, value: null, anchorIndex: null, anchorTime: null, lifetimeBars: 0, cumulativeVolume: null, reason };
}
function calculateAnchoredVwap(candles, anchorIndex){
  if(!Array.isArray(candles) || !candles.length) return createUnavailableAnchoredVwap("No candles available for anchored VWAP.");
  const startIndex = Number(anchorIndex);
  if(!Number.isInteger(startIndex) || startIndex < 0 || startIndex >= candles.length) return createUnavailableAnchoredVwap("Invalid anchored VWAP anchor index.");
  let cumulativeVolume = 0;
  let cumulativeTypicalVolume = 0;
  let lifetimeBars = 0;
  for(let i = startIndex; i < candles.length; i += 1){
    const candle = candles[i];
    if(!isValidOrderflowCandle(candle)) continue;
    const volume = getOrderflowCandleVolume(candle);
    if(volume <= 0) continue;
    const typicalPrice = (Number(candle.high) + Number(candle.low) + Number(candle.close)) / 3;
    cumulativeVolume += volume;
    cumulativeTypicalVolume += typicalPrice * volume;
    lifetimeBars += 1;
  }
  if(cumulativeVolume <= 0 || !Number.isFinite(cumulativeTypicalVolume)) return createUnavailableAnchoredVwap("Anchored VWAP unavailable because valid volume is missing.");
  return { available: true, value: cumulativeTypicalVolume / cumulativeVolume, anchorIndex: startIndex, anchorTime: getOrderflowCandleTime(candles[startIndex]), lifetimeBars, cumulativeVolume, reason: null };
}
function classifyLiquidityAvwapSide(closePrice, avwapValue, tolerancePct = 0.001){
  const close = Number(closePrice);
  const avwap = Number(avwapValue);
  const tolerance = Number(tolerancePct);
  if(!Number.isFinite(close) || !Number.isFinite(avwap) || avwap <= 0) return LIQUIDITY_AVWAP_SIDE.UNKNOWN;
  const distancePct = Math.abs(close - avwap) / avwap;
  if(distancePct <= (Number.isFinite(tolerance) && tolerance >= 0 ? tolerance : 0.001)) return LIQUIDITY_AVWAP_SIDE.AROUND;
  return close > avwap ? LIQUIDITY_AVWAP_SIDE.ABOVE : LIQUIDITY_AVWAP_SIDE.BELOW;
}
function calculateRollingMedianVolume(candles, index, lookback = 20){
  if(!Array.isArray(candles) || !candles.length) return null;
  const endIndex = Math.min(Math.max(Number(index) || 0, 0), candles.length);
  const startIndex = Math.max(0, endIndex - Math.max(Number(lookback) || 20, 1));
  const volumes = candles.slice(startIndex, endIndex).map(getOrderflowCandleVolume).filter((v)=>Number.isFinite(v) && v > 0);
  if(!volumes.length) return null;
  const sorted = [...volumes].sort((a,b)=>a-b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function calculateLiquidityVolumeStatus(candles, index, lookback = 20){
  const baselineMethod = `rollingMedian${Math.max(Number(lookback) || 20, 1)}`;
  if(!Array.isArray(candles) || !candles.length) return { baselineMethod, baseline: null, current: null, ratio: null, status: LIQUIDITY_VOLUME_STATUS.UNKNOWN };
  const candle = candles[index];
  const current = getOrderflowCandleVolume(candle);
  const baseline = calculateRollingMedianVolume(candles, index, lookback);
  if(!Number.isFinite(current) || current <= 0 || !Number.isFinite(baseline) || baseline <= 0) return { baselineMethod, baseline, current: current || null, ratio: null, status: LIQUIDITY_VOLUME_STATUS.UNKNOWN };
  const ratio = current / baseline;
  const status = ratio >= 2 ? LIQUIDITY_VOLUME_STATUS.STRONG_SPIKE : (ratio >= 1.5 ? LIQUIDITY_VOLUME_STATUS.SPIKE : LIQUIDITY_VOLUME_STATUS.NORMAL);
  return { baselineMethod, baseline, current, ratio, status };
}
function calculateAverageRange(candles, index, lookback = 14){
  if(!Array.isArray(candles) || !candles.length) return null;
  const endIndex = Math.min(Math.max(Number(index) || 0, 0), candles.length);
  const startIndex = Math.max(0, endIndex - Math.max(Number(lookback) || 14, 1));
  const ranges = candles.slice(startIndex, endIndex)
    .filter(isValidOrderflowCandle)
    .map((c)=>Number(c.high) - Number(c.low))
    .filter((range)=>Number.isFinite(range) && range > 0);
  if(!ranges.length) return null;
  return ranges.reduce((sum, range)=>sum + range, 0) / ranges.length;
}
function calculateLiquidityBuffer(candles, index, options = {}){
  const rangePct = Number.isFinite(Number(options.rangePct)) ? Number(options.rangePct) : 0.10;
  const fallbackPct = Number.isFinite(Number(options.fallbackPct)) ? Number(options.fallbackPct) : 0.001;
  const lookback = Number.isFinite(Number(options.lookback)) ? Number(options.lookback) : 14;
  const averageRange = calculateAverageRange(candles, index, lookback);
  if(Number.isFinite(averageRange) && averageRange > 0) return { value: averageRange * rangePct, method: "averageRangePct", averageRange, pct: rangePct };
  const price = normalizeLiquidityPrice(candles?.[index]?.close) || normalizeLiquidityPrice(candles?.[index]?.open) || null;
  return { value: price ? price * fallbackPct : null, method: "fallbackPct", averageRange: null, pct: fallbackPct };
}
function sortLiquidityCandidateLevelsByRecencyOrWeight(levels){
  return [...(Array.isArray(levels) ? levels : [])].sort((a,b)=>(Number(b?.weight || 0) - Number(a?.weight || 0)) || (Number(b?.ref?.index ?? -1) - Number(a?.ref?.index ?? -1)) || String(a?.id || "").localeCompare(String(b?.id || "")));
}
function buildLiquidityCandidateLevels(candles, srSummary, mapData, options = {}){
  const maxCandidates = Math.max(1, Number(options.maxCandidates) || 20);
  const levels = [];
  const closedCandles = getClosedOrderflowCandles(candles);
  const addLevel = (candidate)=>{
    if(!candidate || !candidate.id) return;
    const price = normalizeLiquidityPrice(candidate.price);
    const lower = normalizeLiquidityPrice(candidate.lower);
    const upper = normalizeLiquidityPrice(candidate.upper);
    if(!price && !(lower && upper && upper >= lower)) return;
    levels.push({
      id: candidate.id,
      type: candidate.type,
      side: candidate.side,
      price,
      lower: lower ?? price,
      upper: upper ?? price,
      timeframe: candidate.timeframe || "4H",
      source: candidate.source,
      quality: candidate.quality || "basic",
      weight: Number.isFinite(Number(candidate.weight)) ? Number(candidate.weight) : 1,
      ref: candidate.ref || null,
    });
  };
  if(closedCandles.length >= 5 && typeof find4hSwings === "function"){
    const swings = find4hSwings(closedCandles);
    (swings.highs || []).slice(-6).forEach((swing)=>addLevel({ id: `h4-swing-high-${swing.time ?? swing.index}`, type: "swingHigh", side: "high", price: swing.price, timeframe: "4H", source: "swing", quality: "qualified", weight: 3, ref: swing }));
    (swings.lows || []).slice(-6).forEach((swing)=>addLevel({ id: `h4-swing-low-${swing.time ?? swing.index}`, type: "swingLow", side: "low", price: swing.price, timeframe: "4H", source: "swing", quality: "qualified", weight: 3, ref: swing }));
  }
  const addSrZone = (zone, type, side, idSuffix, weight)=>{
    if(!zone) return;
    addLevel({ id: `h4-${type}-${idSuffix}`, type, side, price: normalizeLiquidityPrice(zone.center) || normalizeLiquidityPrice(zone.price) || ((normalizeLiquidityPrice(zone.lower) && normalizeLiquidityPrice(zone.upper)) ? (Number(zone.lower) + Number(zone.upper)) / 2 : null), lower: zone.lower, upper: zone.upper, timeframe: "4H", source: "supportResistance", quality: "qualified", weight, ref: zone });
  };
  addSrZone(srSummary?.support?.nearest, "support", "zone", "nearest", 2.5);
  addSrZone(srSummary?.support?.strongest, "support", "zone", "strongest", 2.25);
  addSrZone(srSummary?.resistance?.nearest, "resistance", "zone", "nearest", 2.5);
  addSrZone(srSummary?.resistance?.strongest, "resistance", "zone", "strongest", 2.25);
  const mapRows = [...(mapData?.upside || []), ...(mapData?.downside || [])].slice(0, 8);
  mapRows.forEach((row, index)=>addLevel({ id: `market-map-zone-${row?.source || "row"}-${index}`, type: "marketMapZone", side: "zone", price: normalizeLiquidityPrice(row?.center) || ((normalizeLiquidityPrice(row?.lower) && normalizeLiquidityPrice(row?.upper)) ? (Number(row.lower) + Number(row.upper)) / 2 : null), lower: row?.lower, upper: row?.upper, timeframe: row?.timeframe || "4H", source: "marketMap", quality: "basic", weight: 1, ref: { source: row?.source || null, label: row?.label || null } }));
  const seen = new Set();
  return sortLiquidityCandidateLevelsByRecencyOrWeight(levels).filter((level)=>{
    const key = `${level.source}:${level.type}:${level.side}:${level.lower}:${level.upper}:${level.price}`;
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, maxCandidates);
}
function isLowSideLiquidityCandidate(level){
  const type = String(level?.type || "").toLowerCase();
  const side = String(level?.side || "").toLowerCase();
  return side === "low" || type.includes("low") || type.includes("support");
}
function isHighSideLiquidityCandidate(level){
  const type = String(level?.type || "").toLowerCase();
  const side = String(level?.side || "").toLowerCase();
  return side === "high" || type.includes("high") || type.includes("resistance");
}
function createH4LiquidityEpisodeId(sweepType, levelType, levelPrice, anchorTime){
  const price = Number.isFinite(Number(levelPrice)) ? Number(levelPrice).toFixed(2) : "unknown";
  return `h4-${sweepType}-${levelType || "level"}-${price}-${anchorTime ?? "unknown"}`;
}
function getLiquidityLevelReferencePrice(level, sweepType){
  if(!level) return null;
  if(sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_LOW) return normalizeLiquidityPrice(level.price) || normalizeLiquidityPrice(level.lower);
  if(sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH) return normalizeLiquidityPrice(level.price) || normalizeLiquidityPrice(level.upper);
  return normalizeLiquidityPrice(level.price);
}
function detectH4LiquiditySweepEpisode(closedCandles, candidateLevels, options = {}){
  if(!Array.isArray(closedCandles) || !closedCandles.length || !Array.isArray(candidateLevels) || !candidateLevels.length) return null;
  const scanWindow = Math.max(1, Number(options.scanWindow) || 60);
  const startIndex = Math.max(0, closedCandles.length - scanWindow);
  let best = null;
  for(let candleIndex = startIndex; candleIndex < closedCandles.length; candleIndex += 1){
    const candle = closedCandles[candleIndex];
    if(!isValidOrderflowCandle(candle)) continue;
    const buffer = calculateLiquidityBuffer(closedCandles, candleIndex, options.bufferOptions || {});
    const breachBuffer = Number.isFinite(Number(buffer?.value)) && Number(buffer.value) > 0 ? Number(buffer.value) : 0;
    candidateLevels.forEach((level)=>{
      const checks = [];
      if(isLowSideLiquidityCandidate(level)) checks.push({ sweepType: LIQUIDITY_SWEEP_TYPE.SWEEP_LOW, breachPrice: Number(candle.low), levelPrice: getLiquidityLevelReferencePrice(level, LIQUIDITY_SWEEP_TYPE.SWEEP_LOW) });
      if(isHighSideLiquidityCandidate(level)) checks.push({ sweepType: LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH, breachPrice: Number(candle.high), levelPrice: getLiquidityLevelReferencePrice(level, LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH) });
      checks.forEach((check)=>{
        if(!Number.isFinite(check.levelPrice) || !Number.isFinite(check.breachPrice)) return;
        const sweptLow = check.sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_LOW && check.breachPrice < check.levelPrice - breachBuffer;
        const sweptHigh = check.sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH && check.breachPrice > check.levelPrice + breachBuffer;
        if(!sweptLow && !sweptHigh) return;
        const excursion = Math.abs(check.breachPrice - check.levelPrice);
        const weight = Number(level?.weight || 0);
        const candidate = { candle, candleIndex, level, sweepType: check.sweepType, levelPrice: check.levelPrice, breachPrice: check.breachPrice, breachBuffer, buffer, excursion, rank: candleIndex * 1000000 + weight * 1000 + excursion };
        if(!best || candidate.rank > best.rank) best = candidate;
      });
    });
  }
  if(!best) return null;
  return best;
}
function createEmptyH4LiquidityReclaim(status = LIQUIDITY_RECLAIM_STATUS.NONE){
  return { detected: false, status, at: null, closePrice: null, barsFromSweep: null, passedThreshold: false, candleIndex: null };
}
function getLiquidityReactionDirection(sweepType){
  if(sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_LOW) return "bullish";
  if(sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH) return "bearish";
  return null;
}
function isCorrectLiquidityAvwapSide(sweepType, side){
  return (sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_LOW && side === LIQUIDITY_AVWAP_SIDE.ABOVE)
    || (sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH && side === LIQUIDITY_AVWAP_SIDE.BELOW);
}
function classifyH4LiquidityReclaim(closedCandles, sweep, options = {}){
  if(!Array.isArray(closedCandles) || !closedCandles.length || !sweep) return createEmptyH4LiquidityReclaim();
  const anchorIndex = Number(sweep.candleIndex ?? sweep.anchorIndex);
  const maxBars = Math.max(1, Number(options.maxBars) || 3);
  if(!Number.isInteger(anchorIndex) || anchorIndex < 0 || anchorIndex >= closedCandles.length) return createEmptyH4LiquidityReclaim();
  const levelPrice = Number(sweep.levelPrice);
  const breachBuffer = Number.isFinite(Number(sweep.breachBuffer)) ? Number(sweep.breachBuffer) : 0;
  if(!Number.isFinite(levelPrice)) return createEmptyH4LiquidityReclaim();
  const endIndex = Math.min(closedCandles.length - 1, anchorIndex + maxBars);
  for(let index = anchorIndex; index <= endIndex; index += 1){
    const candle = closedCandles[index];
    if(!isValidOrderflowCandle(candle)) continue;
    const closePrice = Number(candle.close);
    const passedThreshold = sweep.sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_LOW
      ? closePrice > levelPrice + breachBuffer
      : (sweep.sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH ? closePrice < levelPrice - breachBuffer : false);
    if(!passedThreshold) continue;
    const barsFromSweep = index - anchorIndex;
    const status = barsFromSweep === 0 ? LIQUIDITY_RECLAIM_STATUS.SAME_BAR : (barsFromSweep === 1 ? LIQUIDITY_RECLAIM_STATUS.NEXT_BAR : LIQUIDITY_RECLAIM_STATUS.LATE);
    return { detected: true, status, at: getOrderflowCandleTime(candle), closePrice, barsFromSweep, passedThreshold: true, candleIndex: index };
  }
  if((closedCandles.length - 1) - anchorIndex >= maxBars) return createEmptyH4LiquidityReclaim(LIQUIDITY_RECLAIM_STATUS.MISSED);
  return createEmptyH4LiquidityReclaim();
}
function countCorrectAvwapSideCloses(closedCandles, startIndex, avwapValue, sweepType){
  if(!Array.isArray(closedCandles) || !closedCandles.length) return 0;
  const start = Number(startIndex);
  if(!Number.isInteger(start) || start < 0 || start >= closedCandles.length) return 0;
  let count = 0;
  for(let index = start; index < closedCandles.length; index += 1){
    const candle = closedCandles[index];
    if(!isValidOrderflowCandle(candle)) break;
    const side = classifyLiquidityAvwapSide(candle.close, avwapValue);
    if(!isCorrectLiquidityAvwapSide(sweepType, side)) break;
    count += 1;
  }
  return count;
}
function buildH4LiquidityAvwapState(closedCandles, sweep, reclaim){
  const empty = { available: false, value: null, side: LIQUIDITY_AVWAP_SIDE.UNKNOWN, distancePct: null, correctSideCloses: 0, anchorTime: null, lifetimeBars: 0, lostControl: false };
  if(!Array.isArray(closedCandles) || !closedCandles.length || !sweep) return empty;
  const anchorIndex = Number(sweep.candleIndex ?? sweep.anchorIndex);
  const anchored = calculateAnchoredVwap(closedCandles, anchorIndex);
  if(!anchored.available) return { ...empty, anchorTime: anchored.anchorTime ?? getOrderflowCandleTime(closedCandles[anchorIndex]) ?? null };
  const latest = closedCandles[closedCandles.length - 1];
  const latestClose = Number(latest?.close);
  const side = classifyLiquidityAvwapSide(latestClose, anchored.value);
  const distancePct = Number.isFinite(latestClose) && Number.isFinite(anchored.value) && anchored.value > 0 ? ((latestClose - anchored.value) / anchored.value) * 100 : null;
  return {
    available: true,
    value: anchored.value,
    side,
    distancePct,
    correctSideCloses: reclaim?.detected ? countCorrectAvwapSideCloses(closedCandles, reclaim.candleIndex, anchored.value, sweep.sweepType) : 0,
    anchorTime: anchored.anchorTime ?? getOrderflowCandleTime(closedCandles[anchorIndex]) ?? null,
    lifetimeBars: anchored.lifetimeBars,
    lostControl: false,
  };
}
function scoreH4LiquidityPreliminary(reclaim, avwap, sweepType){
  let score = 0;
  if(reclaim?.detected){
    if(reclaim.status === LIQUIDITY_RECLAIM_STATUS.SAME_BAR) score += 2;
    else if(reclaim.status === LIQUIDITY_RECLAIM_STATUS.NEXT_BAR || reclaim.status === LIQUIDITY_RECLAIM_STATUS.LATE) score += 1;
  }
  if(avwap?.available && isCorrectLiquidityAvwapSide(sweepType, avwap.side)) score += 1;
  return Math.max(0, score);
}
function getH4LiquidityBandForPreliminaryScore(score){
  return score >= 3 ? LIQUIDITY_BAND.USABLE : LIQUIDITY_BAND.WEAK;
}
function getH4LiquidityBarsAfterSweep(episode, closedCandles){
  if(!episode || !Array.isArray(closedCandles) || !closedCandles.length) return null;
  const anchorIndex = Number(episode?.sweep?.anchorIndex ?? episode?.sweep?.candleIndex);
  if(!Number.isInteger(anchorIndex) || anchorIndex < 0 || anchorIndex >= closedCandles.length) return null;
  return Math.max(0, (closedCandles.length - 1) - anchorIndex);
}
function classifyH4LiquidityStale(episode, closedCandles, options = {}){
  const barsAfterSweep = getH4LiquidityBarsAfterSweep(episode, closedCandles);
  const possibleWindow = Math.max(1, Number(options.possibleWindowBars) || 12);
  const validWindow = Math.max(possibleWindow, Number(options.validWindowBars) || 24);
  const reclaimWindow = Math.max(1, Number(options.reclaimWindowBars) || 3);
  const confirmationWindowBars = validWindow;
  const reclaimWindowRemaining = Number.isFinite(barsAfterSweep) ? Math.max(0, reclaimWindow - barsAfterSweep) : null;
  const status = episode?.status;
  const reclaimDetected = episode?.reclaim?.detected === true;
  const possibleStale = status === LIQUIDITY_OF_STATE.POSSIBLE && !reclaimDetected && Number.isFinite(barsAfterSweep) && barsAfterSweep >= possibleWindow;
  const validStale = status === LIQUIDITY_OF_STATE.VALID && Number.isFinite(barsAfterSweep) && barsAfterSweep >= validWindow;
  const stale = possibleStale || validStale;
  return {
    stale,
    reason: stale ? "H4 liquidity sweep context is aging without confirmation." : null,
    barsAfterSweep,
    reclaimWindowRemaining,
    confirmationWindowBars,
  };
}
function classifyH4LiquidityBand(score){
  const capped = Math.min(10, Math.max(0, Number(score) || 0));
  if(capped >= 9) return LIQUIDITY_BAND.HIGH_CONFLUENCE;
  if(capped >= 6) return LIQUIDITY_BAND.STRONG;
  if(capped >= 3) return LIQUIDITY_BAND.USABLE;
  return LIQUIDITY_BAND.WEAK;
}
function getH4LiquidityDeepBreachWarning(episode){
  const levelPrice = Number(episode?.sweep?.levelPrice);
  const breachPrice = Number(episode?.sweep?.breachPrice);
  const sweepType = episode?.sweep?.type;
  if(!Number.isFinite(levelPrice) || levelPrice <= 0 || !Number.isFinite(breachPrice)) return { triggered: false, deepBreachPct: null, reason: null };
  let deepBreachPct = null;
  if(sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_LOW) deepBreachPct = ((levelPrice - breachPrice) / levelPrice) * 100;
  else if(sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH) deepBreachPct = ((breachPrice - levelPrice) / levelPrice) * 100;
  if(!Number.isFinite(deepBreachPct)) return { triggered: false, deepBreachPct: null, reason: null };
  const triggered = deepBreachPct >= 3;
  return {
    triggered,
    deepBreachPct,
    reason: triggered ? "Deep breach; reaction still requires reclaim/reject confirmation." : null,
  };
}
function scoreH4LiquidityEpisode(episode, context = {}, options = {}){
  const components = [];
  const reasons = [];
  const add = (label, value)=>{
    const score = Number(value);
    if(!label || !Number.isFinite(score) || score === 0) return;
    components.push({ label, score });
  };
  if(!episode || episode.status !== LIQUIDITY_OF_STATE.VALID || episode.reclaim?.detected !== true){
    return { score: 0, band: LIQUIDITY_BAND.WEAK, components, reasons };
  }
  add("qualified level", 1);
  if(Number.isFinite(Number(episode.sweep?.excursionAtr)) && Number(episode.sweep.excursionAtr) >= 0.5) add("meaningful sweep excursion", 1);
  if(episode.reclaim.status === LIQUIDITY_RECLAIM_STATUS.SAME_BAR) add("same-bar reclaim/reject", 2);
  else if(episode.reclaim.status === LIQUIDITY_RECLAIM_STATUS.NEXT_BAR) add("next-bar reclaim/reject", 1);
  else if(episode.reclaim.status === LIQUIDITY_RECLAIM_STATUS.LATE) add("late reclaim/reject", 1);
  const avwapSide = episode.avwap?.side;
  if(episode.avwap?.available && isCorrectLiquidityAvwapSide(episode.sweep?.type, avwapSide)) add("AVWAP correct side", 2);
  else if(episode.avwap?.available && avwapSide !== LIQUIDITY_AVWAP_SIDE.UNKNOWN && avwapSide !== LIQUIDITY_AVWAP_SIDE.AROUND) add("AVWAP wrong side", -1);
  if(Number(episode.avwap?.correctSideCloses) >= 2) add("two AVWAP-side closes", 1);
  if(episode.volume?.status === LIQUIDITY_VOLUME_STATUS.STRONG_SPIKE) add("strong volume spike", 2);
  else if(episode.volume?.status === LIQUIDITY_VOLUME_STATUS.SPIKE) add("volume spike", 1);
  if(context.structureAligned) add("structure aligned", 1);
  if(context.nearMarketMapZone) add("near Market Map zone", 1);
  if(context.nearFvg || context.nearIfvg) add("near FVG/IFVG", 1);
  if(context.strongConflict) add("strong HTF conflict", -2);
  if(options.penalizeDeepBreach !== false && context.deepBreachWarning?.triggered) add("deep breach warning", -1);
  const rawScore = components.reduce((sum, item)=>sum + item.score, 0);
  const score = Math.min(10, Math.max(0, rawScore));
  const band = classifyH4LiquidityBand(score);
  if(score > 0) reasons.push(`H4 liquidity/orderflow context score: ${score}/10.`);
  return { score, band, components, reasons };
}
function createEmptyH4LiquidityFailure({ boundary = null, scanStartIndex = null, barsChecked = 0 } = {}){
  return { detected: false, at: null, price: null, reason: null, priorStateBeforeFailure: null, candleIndex: null, boundary, scanStartIndex, barsChecked };
}
function getH4LiquidityFailureBoundary(episode){
  const levelPrice = Number(episode?.sweep?.levelPrice);
  const breachBuffer = Number.isFinite(Number(episode?.sweep?.breachBuffer)) ? Number(episode.sweep.breachBuffer) : 0;
  const sweepType = episode?.sweep?.type;
  if(!Number.isFinite(levelPrice)) return { boundary: null, direction: null };
  if(sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_LOW) return { boundary: levelPrice - breachBuffer, direction: "below" };
  if(sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH) return { boundary: levelPrice + breachBuffer, direction: "above" };
  return { boundary: null, direction: null };
}
function getH4LiquidityFailureStartIndex(episode){
  if(!episode) return null;
  const reclaimIndex = Number(episode?.reclaim?.candleIndex);
  if(episode.status === LIQUIDITY_OF_STATE.VALID && Number.isInteger(reclaimIndex) && reclaimIndex >= 0) return reclaimIndex + 1;
  const anchorIndex = Number(episode?.sweep?.anchorIndex ?? episode?.sweep?.candleIndex);
  if(!Number.isInteger(anchorIndex) || anchorIndex < 0) return null;
  return anchorIndex + 1;
}
function buildH4LiquidityFailureReason(episode){
  if(episode?.sweep?.type === LIQUIDITY_SWEEP_TYPE.SWEEP_LOW) return "Failure detected after H4 close moved back below swept liquidity level.";
  if(episode?.sweep?.type === LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH) return "Failure detected after H4 close moved back above swept liquidity level.";
  return "Failure detected after H4 close invalidated swept liquidity level.";
}
function detectH4LiquidityFailure(closedCandles, episode, options = {}){
  const boundaryState = getH4LiquidityFailureBoundary(episode);
  const scanStartIndex = getH4LiquidityFailureStartIndex(episode);
  const boundary = Number(boundaryState.boundary);
  if(!Array.isArray(closedCandles) || !closedCandles.length || !episode || !Number.isFinite(boundary) || !Number.isInteger(scanStartIndex)) return createEmptyH4LiquidityFailure({ boundary: boundaryState.boundary ?? null, scanStartIndex });
  const start = Math.max(0, scanStartIndex);
  if(start >= closedCandles.length) return createEmptyH4LiquidityFailure({ boundary, scanStartIndex: start });
  let barsChecked = 0;
  for(let index = start; index < closedCandles.length; index += 1){
    const candle = closedCandles[index];
    if(!isValidOrderflowCandle(candle)) continue;
    barsChecked += 1;
    const closePrice = Number(candle.close);
    const failed = boundaryState.direction === "below" ? closePrice < boundary : (boundaryState.direction === "above" ? closePrice > boundary : false);
    if(!failed) continue;
    return {
      detected: true,
      at: getOrderflowCandleTime(candle),
      price: closePrice,
      reason: buildH4LiquidityFailureReason(episode, candle),
      priorStateBeforeFailure: [LIQUIDITY_OF_STATE.POSSIBLE, LIQUIDITY_OF_STATE.VALID].includes(episode.status) ? episode.status : null,
      candleIndex: index,
      boundary,
      scanStartIndex: start,
      barsChecked,
    };
  }
  return createEmptyH4LiquidityFailure({ boundary, scanStartIndex: start, barsChecked });
}
function hasH4LiquidityValidReclaim(episode){
  return episode?.reclaim?.detected === true
    && [LIQUIDITY_RECLAIM_STATUS.SAME_BAR, LIQUIDITY_RECLAIM_STATUS.NEXT_BAR, LIQUIDITY_RECLAIM_STATUS.LATE].includes(episode.reclaim.status);
}
function isH4LiquidityAvwapConfirmed(episode){
  return episode?.avwap?.available === true
    && isCorrectLiquidityAvwapSide(episode?.sweep?.type, episode.avwap.side)
    && Number(episode.avwap.correctSideCloses) >= 1;
}
function getH4LiquidityReactionDirection(episode){
  return getLiquidityReactionDirection(episode?.sweep?.type);
}
function hasH4LiquidityCorroborator(episode, context = {}){
  const corroborators = [];
  if(episode?.volume?.status === LIQUIDITY_VOLUME_STATUS.STRONG_SPIKE) corroborators.push("Strong volume spike");
  else if(episode?.volume?.status === LIQUIDITY_VOLUME_STATUS.SPIKE) corroborators.push("Volume spike");
  if(Number(episode?.avwap?.correctSideCloses) >= 2) corroborators.push("AVWAP persistence");
  const allowedContext = new Set(["H4 FVG proximity", "H4 IFVG context", "4H structure alignment"]);
  (Array.isArray(context?.eligibleContextCorroborators) ? context.eligibleContextCorroborators : [])
    .filter((label)=>allowedContext.has(label))
    .forEach((label)=>corroborators.push(label));
  return { hasCorroborator: corroborators.length > 0, corroborators: [...new Set(corroborators)] };
}
function hasH4LiquidityStrongConflict(episode, context = {}){
  return context?.strongConflict === true;
}
function buildH4LiquidityConfirmationReason(episode, context = {}){
  return [
    "Close reclaim/reject confirmed on closed H4 candle.",
    "AVWAP control supports the reaction context.",
    "Additional corroborator is present.",
    "No strong higher-timeframe conflict detected.",
  ];
}
function shouldConfirmH4LiquidityEpisode(episode, context = {}, options = {}){
  const blockers = [];
  const threshold = Number.isFinite(Number(options.scoreThreshold)) ? Number(options.scoreThreshold) : 6;
  const validReclaim = hasH4LiquidityValidReclaim(episode);
  const avwapConfirmed = isH4LiquidityAvwapConfirmed(episode);
  const corroboratorState = hasH4LiquidityCorroborator(episode, context);
  const strongConflict = hasH4LiquidityStrongConflict(episode, context);
  if(episode?.status !== LIQUIDITY_OF_STATE.VALID) blockers.push("not valid");
  if(!validReclaim) blockers.push("no reclaim");
  if(episode?.avwap?.available !== true) blockers.push("AVWAP unavailable");
  else if(!isCorrectLiquidityAvwapSide(episode?.sweep?.type, episode.avwap.side)) blockers.push("AVWAP not on correct side");
  if(Number(episode?.avwap?.correctSideCloses) < 1) blockers.push("correctSideCloses < 1");
  if((Number(episode?.score) || 0) < threshold) blockers.push("score below threshold");
  if(!corroboratorState.hasCorroborator) blockers.push("no corroborator");
  if(strongConflict) blockers.push("strong conflict");
  if(episode?.stale === true) blockers.push("stale");
  if(episode?.failure?.detected === true) blockers.push("failure detected");
  const confirmed = blockers.length === 0 && validReclaim && avwapConfirmed && corroboratorState.hasCorroborator && !strongConflict;
  const closedCandles = Array.isArray(context?.closedCandles) ? context.closedCandles : [];
  const confirmationIndex = confirmed && closedCandles.length ? closedCandles.length - 1 : null;
  const confirmationAt = Number.isInteger(confirmationIndex) ? getOrderflowCandleTime(closedCandles[confirmationIndex]) : null;
  return {
    confirmed,
    reasons: confirmed ? buildH4LiquidityConfirmationReason(episode, context) : [],
    blockers,
    corroborators: corroboratorState.corroborators,
    confirmationAt,
    confirmationIndex,
  };
}
function buildH4LiquidityContextZoneKey(zone, crossSource = false){
  if(!zone || typeof zone !== "object") return null;
  if(!crossSource && zone.refKey) return zone.refKey;
  const lower = Number(zone.lower);
  const upper = Number(zone.upper);
  if(!Number.isFinite(lower) || !Number.isFinite(upper)) return null;
  const direction = zone.direction || "unknown";
  return crossSource ? `${lower}:${upper}:${direction}` : `${zone.source || "context"}:${lower}:${upper}:${direction}`;
}
function isLiquidityContextRelationEligible(relation){
  return relation === "inside" || relation === "near";
}
function isLiquidityContextStatusInactive(status){
  return /broken|failed|filled/i.test(String(status || ""));
}
function getH4StructureAlignmentCorroboratorEligibility(structureAlignment){
  const skipped = [];
  const warnings = [];
  if(!structureAlignment || typeof structureAlignment !== "object"){
    return { eligible: false, skipped: ["No 4H structure alignment context."], warnings };
  }
  const structureType = String(structureAlignment.structureType || "").toUpperCase();
  const relationToReclaim = structureAlignment.relationToReclaim || "unknown";
  const structureDirection = structureAlignment.structureDirection || null;
  const reactionDirection = structureAlignment.reactionDirection || null;
  if(structureAlignment.alignment === "conflict"){
    warnings.push("4H structure conflict remains warning-only.");
    return { eligible: false, skipped, warnings };
  }
  if(structureAlignment.alignment !== "aligned") skipped.push("4H structure alignment is not aligned.");
  if(structureAlignment.episodeAligned !== true) skipped.push("4H structure is not episode-aligned.");
  if(relationToReclaim !== "after"){
    if(relationToReclaim === "unknown") skipped.push("4H structure alignment has no reclaim relationship.");
    else skipped.push("4H structure did not occur after reclaim.");
  }
  if(!reactionDirection || structureDirection !== reactionDirection) skipped.push("4H structure direction does not match liquidity reaction.");
  if(!["BOS", "CHOCH"].includes(structureType)) skipped.push("4H structure type is not BOS/CHOCH.");
  if(!Number.isFinite(structureAlignment.eventIndex)) skipped.push("4H structure event index missing.");
  if(structureAlignment.eventTime == null || structureAlignment.eventTime === "") skipped.push("4H structure event time missing.");
  return { eligible: skipped.length === 0, skipped, warnings };
}
function getH4LiquidityEligibleContextCorroborators(contextDiagnostics){
  const eligible = new Set();
  const skipped = [];
  const warnings = [];
  const ifvgZoneKeys = new Set();
  const ifvgItems = Array.isArray(contextDiagnostics?.nearbyH4Ifvgs) ? contextDiagnostics.nearbyH4Ifvgs : [];
  const fvgItems = Array.isArray(contextDiagnostics?.nearbyH4Fvgs) ? contextDiagnostics.nearbyH4Fvgs : [];
  if(!ifvgItems.length) skipped.push("No nearby H4 IFVG context.");
  if(!fvgItems.length) skipped.push("No nearby H4 FVG context.");
  ifvgItems.forEach((zone)=>{
    const refKey = buildH4LiquidityContextZoneKey(zone) || buildH4LiquidityContextZoneKey(zone, true);
    const zoneKey = buildH4LiquidityContextZoneKey(zone, true);
    const lower = Number(zone?.lower);
    const upper = Number(zone?.upper);
    const ifvgState = String(zone?.ifvgState || "").toLowerCase();
    if(zone?.sameDirection !== true){ warnings.push("Opposite-direction H4 IFVG context skipped."); return; }
    if(!isLiquidityContextRelationEligible(zone?.relation)){ skipped.push("H4 IFVG context outside nearby relation."); return; }
    if(!["valid", "confirmed"].includes(ifvgState)){ skipped.push("H4 IFVG context is not valid or confirmed."); return; }
    if(isLiquidityContextStatusInactive(zone?.status) || zone?.stale === true){ warnings.push("Inactive H4 IFVG context skipped."); return; }
    if(!Number.isFinite(lower) || !Number.isFinite(upper)){ skipped.push("H4 IFVG context has invalid zone bounds."); return; }
    if(!refKey){ skipped.push("H4 IFVG context has no dedupe key."); return; }
    if(zoneKey) ifvgZoneKeys.add(zoneKey);
    eligible.add("H4 IFVG context");
  });
  fvgItems.forEach((zone)=>{
    const refKey = buildH4LiquidityContextZoneKey(zone) || buildH4LiquidityContextZoneKey(zone, true);
    const zoneKey = buildH4LiquidityContextZoneKey(zone, true);
    const lower = Number(zone?.lower);
    const upper = Number(zone?.upper);
    if(zoneKey && ifvgZoneKeys.has(zoneKey)){ skipped.push("H4 FVG proximity skipped because valid H4 IFVG context uses the same zone."); return; }
    if(zone?.sameDirection !== true){ warnings.push("Opposite-direction H4 FVG context skipped."); return; }
    if(!isLiquidityContextRelationEligible(zone?.relation)){ skipped.push("H4 FVG context outside nearby relation."); return; }
    if(isLiquidityContextStatusInactive(zone?.status)){ skipped.push("Inactive H4 FVG context skipped."); return; }
    if(!Number.isFinite(lower) || !Number.isFinite(upper)){ skipped.push("H4 FVG context has invalid zone bounds."); return; }
    if(!refKey){ skipped.push("H4 FVG context has no dedupe key."); return; }
    eligible.add("H4 FVG proximity");
  });
  const structureEligibility = getH4StructureAlignmentCorroboratorEligibility(contextDiagnostics?.structureAlignment);
  if(structureEligibility.eligible) eligible.add("4H structure alignment");
  structureEligibility.skipped.forEach((reason)=>skipped.push(reason));
  structureEligibility.warnings.forEach((reason)=>warnings.push(reason));
  return {
    eligibleCorroborators: [...eligible],
    skipped: [...new Set(skipped)],
    warnings: [...new Set(warnings)],
  };
}
function runH4LiquidityContextCorroboratorFixtureTests(){
  const closedCandles = [{ time: 1710000000, close: 100 }];
  const baseEpisode = (overrides = {})=>({
    status: LIQUIDITY_OF_STATE.VALID,
    stale: false,
    sweep: { type: LIQUIDITY_SWEEP_TYPE.SWEEP_LOW },
    reclaim: { detected: true, status: LIQUIDITY_RECLAIM_STATUS.SAME_BAR, candleIndex: 0, closePrice: 101 },
    avwap: { available: true, side: LIQUIDITY_AVWAP_SIDE.ABOVE, correctSideCloses: 1 },
    volume: { status: LIQUIDITY_VOLUME_STATUS.NORMAL },
    score: 6,
    failure: { detected: false },
    ...overrides,
    sweep: { type: LIQUIDITY_SWEEP_TYPE.SWEEP_LOW, ...(overrides.sweep || {}) },
    reclaim: { detected: true, status: LIQUIDITY_RECLAIM_STATUS.SAME_BAR, candleIndex: 0, closePrice: 101, ...(overrides.reclaim || {}) },
    avwap: { available: true, side: LIQUIDITY_AVWAP_SIDE.ABOVE, correctSideCloses: 1, ...(overrides.avwap || {}) },
    volume: { status: LIQUIDITY_VOLUME_STATUS.NORMAL, ...(overrides.volume || {}) },
    failure: { detected: false, ...(overrides.failure || {}) },
  });
  const h4Fvg = (overrides = {})=>({
    id: "fixture-fvg",
    source: "h4Fvg",
    direction: "bullish",
    lower: 99,
    upper: 101,
    relation: "inside",
    sameDirection: true,
    status: "Active",
    refKey: "fixture-zone",
    ...overrides,
  });
  const h4Ifvg = (overrides = {})=>({
    id: "fixture-ifvg",
    source: "h4Ifvg",
    direction: "bullish",
    lower: 99,
    upper: 101,
    relation: "inside",
    sameDirection: true,
    ifvgState: IFVG_STATE.VALID,
    status: "Valid",
    refKey: "fixture-zone",
    ...overrides,
  });
  const structureAlignment = (overrides = {})=>({
    alignment: "aligned",
    episodeAligned: true,
    reactionDirection: "bullish",
    structureDirection: "bullish",
    structureType: "BOS",
    eventIndex: 12,
    eventTime: 1710000000,
    relationToSweep: "after",
    relationToReclaim: "after",
    reason: "Fixture aligned structure.",
    warnings: [],
    ...overrides,
  });
  const contextDiagnostics = (overrides = {})=>({
    nearbyH4Fvgs: [],
    nearbyH4Ifvgs: [],
    nearbyMarketMapZones: [],
    nearestH4Fvg: null,
    nearestH4Ifvg: null,
    nearestMarketMapZone: null,
    structureAlignment: { alignment: "unknown", episodeAligned: false },
    ...overrides,
  });
  const includes = (list, value)=>Array.isArray(list) && list.includes(value);
  const notIncludes = (list, value)=>!includes(list, value);
  const cases = [
    {
      name: "H4 FVG eligible confirms when all core gates pass",
      episode: baseEpisode(),
      context: contextDiagnostics({ nearbyH4Fvgs: [h4Fvg()] }),
      expected: "confirmed true with H4 FVG proximity",
      checks: [
        ({ gate })=>includes(gate.eligibleCorroborators, "H4 FVG proximity"),
        ({ confirmation })=>confirmation.confirmed === true,
        ({ confirmation })=>includes(confirmation.corroborators, "H4 FVG proximity"),
      ],
    },
    {
      name: "H4 IFVG eligible confirms when all core gates pass",
      episode: baseEpisode(),
      context: contextDiagnostics({ nearbyH4Ifvgs: [h4Ifvg()] }),
      expected: "confirmed true with H4 IFVG context",
      checks: [
        ({ gate })=>includes(gate.eligibleCorroborators, "H4 IFVG context"),
        ({ confirmation })=>confirmation.confirmed === true,
        ({ confirmation })=>includes(confirmation.corroborators, "H4 IFVG context"),
      ],
    },
    {
      name: "Aligned 4H structure confirms when all core gates pass",
      episode: baseEpisode(),
      context: contextDiagnostics({ structureAlignment: structureAlignment() }),
      expected: "confirmed true with 4H structure alignment",
      checks: [
        ({ gate })=>includes(gate.eligibleCorroborators, "4H structure alignment"),
        ({ confirmation })=>confirmation.confirmed === true,
        ({ confirmation })=>includes(confirmation.corroborators, "4H structure alignment"),
      ],
    },
    {
      name: "H4 FVG context cannot bypass missing reclaim",
      episode: baseEpisode({ reclaim: { detected: false, status: LIQUIDITY_RECLAIM_STATUS.NONE } }),
      context: contextDiagnostics({ nearbyH4Fvgs: [h4Fvg()] }),
      expected: "confirmed false with no reclaim blocker",
      checks: [
        ({ gate })=>includes(gate.eligibleCorroborators, "H4 FVG proximity"),
        ({ confirmation })=>confirmation.confirmed === false,
        ({ confirmation })=>includes(confirmation.blockers, "no reclaim"),
      ],
    },
    {
      name: "Aligned 4H structure cannot bypass missing reclaim",
      episode: baseEpisode({ reclaim: { detected: false, status: LIQUIDITY_RECLAIM_STATUS.NONE } }),
      context: contextDiagnostics({ structureAlignment: structureAlignment() }),
      expected: "confirmed false with no reclaim blocker",
      checks: [
        ({ gate })=>includes(gate.eligibleCorroborators, "4H structure alignment"),
        ({ confirmation })=>confirmation.confirmed === false,
        ({ confirmation })=>includes(confirmation.blockers, "no reclaim"),
      ],
    },
    {
      name: "H4 FVG context cannot bypass AVWAP wrong side",
      episode: baseEpisode({ avwap: { side: LIQUIDITY_AVWAP_SIDE.BELOW } }),
      context: contextDiagnostics({ nearbyH4Fvgs: [h4Fvg()] }),
      expected: "confirmed false with AVWAP wrong-side blocker",
      checks: [
        ({ confirmation })=>confirmation.confirmed === false,
        ({ confirmation })=>includes(confirmation.blockers, "AVWAP not on correct side"),
      ],
    },
    {
      name: "Aligned 4H structure cannot bypass AVWAP wrong side",
      episode: baseEpisode({ avwap: { side: LIQUIDITY_AVWAP_SIDE.BELOW } }),
      context: contextDiagnostics({ structureAlignment: structureAlignment() }),
      expected: "confirmed false with AVWAP wrong-side blocker",
      checks: [
        ({ gate })=>includes(gate.eligibleCorroborators, "4H structure alignment"),
        ({ confirmation })=>confirmation.confirmed === false,
        ({ confirmation })=>includes(confirmation.blockers, "AVWAP not on correct side"),
      ],
    },
    {
      name: "H4 FVG context cannot bypass low score",
      episode: baseEpisode({ score: 5 }),
      context: contextDiagnostics({ nearbyH4Fvgs: [h4Fvg()] }),
      expected: "confirmed false with score blocker",
      checks: [
        ({ confirmation })=>confirmation.confirmed === false,
        ({ confirmation })=>includes(confirmation.blockers, "score below threshold"),
      ],
    },
    {
      name: "Aligned 4H structure cannot bypass low score",
      episode: baseEpisode({ score: 5 }),
      context: contextDiagnostics({ structureAlignment: structureAlignment() }),
      expected: "confirmed false with score blocker",
      checks: [
        ({ gate })=>includes(gate.eligibleCorroborators, "4H structure alignment"),
        ({ confirmation })=>confirmation.confirmed === false,
        ({ confirmation })=>includes(confirmation.blockers, "score below threshold"),
      ],
    },
    {
      name: "Opposite-direction H4 IFVG is not eligible",
      episode: baseEpisode(),
      context: contextDiagnostics({ nearbyH4Ifvgs: [h4Ifvg({ sameDirection: false, direction: "bearish" })] }),
      expected: "no H4 IFVG context eligibility and warning present",
      checks: [
        ({ gate })=>notIncludes(gate.eligibleCorroborators, "H4 IFVG context"),
        ({ gate })=>gate.warnings.length > 0 || gate.skipped.length > 0,
        ({ confirmation })=>confirmation.confirmed === false,
      ],
    },
    {
      name: "Conflict structure is not eligible",
      episode: baseEpisode(),
      context: contextDiagnostics({ structureAlignment: structureAlignment({ alignment: "conflict", structureDirection: "bearish", reason: "Fixture conflict.", warnings: ["Episode-aligned opposite 4H structure observed."] }) }),
      expected: "no 4H structure alignment eligibility and warning present",
      checks: [
        ({ gate })=>notIncludes(gate.eligibleCorroborators, "4H structure alignment"),
        ({ gate })=>gate.warnings.some((warning)=>/conflict/.test(warning)),
        ({ confirmation })=>confirmation.confirmed === false,
      ],
    },
    {
      name: "Pre-reclaim structure is not eligible",
      episode: baseEpisode(),
      context: contextDiagnostics({ structureAlignment: structureAlignment({ relationToReclaim: "before", episodeAligned: false, reason: "Fixture before reclaim." }) }),
      expected: "no 4H structure alignment eligibility before reclaim",
      checks: [
        ({ gate })=>notIncludes(gate.eligibleCorroborators, "4H structure alignment"),
        ({ gate })=>gate.skipped.some((reason)=>/after reclaim/.test(reason)),
        ({ confirmation })=>includes(confirmation.blockers, "no corroborator"),
      ],
    },
    {
      name: "Old string-only structure diagnostics are not eligible",
      episode: baseEpisode(),
      context: contextDiagnostics({ structureAlignment: { alignment: "unknown", episodeAligned: false, reactionDirection: "bullish", structureDirection: "bullish", structureType: "BOS", eventIndex: null, eventTime: null, relationToReclaim: "unknown", warnings: ["Missing structure event index/time."] } }),
      expected: "no 4H structure alignment eligibility without metadata",
      checks: [
        ({ gate })=>notIncludes(gate.eligibleCorroborators, "4H structure alignment"),
        ({ gate })=>gate.skipped.length > 0,
        ({ confirmation })=>includes(confirmation.blockers, "no corroborator"),
      ],
    },
    {
      name: "Nearest-only H4 zones are not eligible",
      episode: baseEpisode(),
      context: contextDiagnostics({ nearestH4Fvg: { found: true, source: "h4Fvg", label: "Nearest FVG" } }),
      expected: "no nearest-only context eligibility",
      checks: [
        ({ gate })=>gate.eligibleCorroborators.length === 0,
        ({ confirmation })=>includes(confirmation.blockers, "no corroborator"),
      ],
    },
    {
      name: "Market Map proximity is not eligible",
      episode: baseEpisode(),
      context: contextDiagnostics({ nearbyMarketMapZones: [{ source: "marketMap", relation: "inside", label: "Fixture Map Zone" }] }),
      expected: "no Market Map context eligibility",
      checks: [
        ({ gate })=>gate.eligibleCorroborators.length === 0,
        ({ confirmation })=>includes(confirmation.blockers, "no corroborator"),
      ],
    },
    {
      name: "Context cannot bypass failed episode",
      episode: baseEpisode({ failure: { detected: true } }),
      context: contextDiagnostics({ nearbyH4Fvgs: [h4Fvg()] }),
      expected: "confirmed false with failure blocker",
      checks: [
        ({ confirmation })=>confirmation.confirmed === false,
        ({ confirmation })=>includes(confirmation.blockers, "failure detected"),
      ],
    },
    {
      name: "Aligned 4H structure cannot bypass failed episode",
      episode: baseEpisode({ failure: { detected: true } }),
      context: contextDiagnostics({ structureAlignment: structureAlignment() }),
      expected: "confirmed false with failure blocker",
      checks: [
        ({ gate })=>includes(gate.eligibleCorroborators, "4H structure alignment"),
        ({ confirmation })=>confirmation.confirmed === false,
        ({ confirmation })=>includes(confirmation.blockers, "failure detected"),
      ],
    },
    {
      name: "Context cannot bypass stale episode",
      episode: baseEpisode({ stale: true }),
      context: contextDiagnostics({ nearbyH4Fvgs: [h4Fvg()] }),
      expected: "confirmed false with stale blocker",
      checks: [
        ({ confirmation })=>confirmation.confirmed === false,
        ({ confirmation })=>includes(confirmation.blockers, "stale"),
      ],
    },
    {
      name: "Aligned 4H structure cannot bypass stale episode",
      episode: baseEpisode({ stale: true }),
      context: contextDiagnostics({ structureAlignment: structureAlignment() }),
      expected: "confirmed false with stale blocker",
      checks: [
        ({ gate })=>includes(gate.eligibleCorroborators, "4H structure alignment"),
        ({ confirmation })=>confirmation.confirmed === false,
        ({ confirmation })=>includes(confirmation.blockers, "stale"),
      ],
    },
    {
      name: "H4 IFVG is preferred over H4 FVG for the same zone",
      episode: baseEpisode(),
      context: contextDiagnostics({ nearbyH4Fvgs: [h4Fvg()], nearbyH4Ifvgs: [h4Ifvg()] }),
      expected: "only H4 IFVG context eligible for same zone",
      checks: [
        ({ gate })=>includes(gate.eligibleCorroborators, "H4 IFVG context"),
        ({ gate })=>notIncludes(gate.eligibleCorroborators, "H4 FVG proximity"),
        ({ confirmation })=>confirmation.confirmed === true,
        ({ confirmation })=>includes(confirmation.corroborators, "H4 IFVG context"),
        ({ confirmation })=>notIncludes(confirmation.corroborators, "H4 FVG proximity"),
      ],
    },
  ];
  const results = cases.map((testCase)=>{
    const gate = getH4LiquidityEligibleContextCorroborators(testCase.context);
    const confirmation = shouldConfirmH4LiquidityEpisode(
      testCase.episode,
      { closedCandles, eligibleContextCorroborators: gate.eligibleCorroborators },
      { scoreThreshold: 6 }
    );
    const details = {
      eligibleContextCorroborators: gate.eligibleCorroborators,
      skipped: gate.skipped,
      warnings: gate.warnings,
      confirmationCorroborators: confirmation.corroborators,
      confirmationBlockers: confirmation.blockers,
      confirmed: confirmation.confirmed,
    };
    const passed = testCase.checks.every((check)=>check({ gate, confirmation, details }));
    return {
      name: testCase.name,
      passed,
      expected: testCase.expected,
      actual: passed ? "matched" : "mismatch",
      details,
    };
  });
  const failed = results.filter((result)=>!result.passed).length;
  return {
    passed: failed === 0,
    total: results.length,
    failed,
    results,
  };
}
if(typeof window !== "undefined") {
  window.runH4LiquidityContextCorroboratorFixtureTests = runH4LiquidityContextCorroboratorFixtureTests;
}

function runH4MarketMapContextFixtureTests(){
  const closedCandles = [{ time: 1710000000, close: 100 }];
  const baseEpisode = (overrides = {})=>({
    status: LIQUIDITY_OF_STATE.VALID,
    stale: false,
    sweep: { type: LIQUIDITY_SWEEP_TYPE.SWEEP_LOW, levelPrice: 100, breachPrice: 99.5, breachBuffer: 0.4, ...(overrides.sweep || {}) },
    reclaim: { detected: true, status: LIQUIDITY_RECLAIM_STATUS.SAME_BAR, candleIndex: 0, closePrice: 100, ...(overrides.reclaim || {}) },
    avwap: { available: true, side: LIQUIDITY_AVWAP_SIDE.ABOVE, correctSideCloses: 1, ...(overrides.avwap || {}) },
    volume: { status: LIQUIDITY_VOLUME_STATUS.NORMAL, ...(overrides.volume || {}) },
    score: 6,
    failure: { detected: false, ...(overrides.failure || {}) },
    ...overrides,
  });
  const supportRow = (overrides = {})=>({ lower: 98, upper: 101, label: "Daily Support", source: "daily_sr", side: "downside", quality: "Touch 3x", ...overrides });
  const resistanceRow = (overrides = {})=>({ lower: 99, upper: 102, label: "Daily Resistance", source: "daily_sr", side: "upside", quality: "Touch 3x", ...overrides });
  const emptyContext = { nearbyH4Fvgs: [], nearbyH4Ifvgs: [], structureAlignment: { alignment: "unknown", episodeAligned: false } };
  const includes = (list, value)=>Array.isArray(list) && list.includes(value);
  const notIncludes = (list, value)=>!includes(list, value);
  const sourceList = (row)=>Array.isArray(row?.sources) && row.sources.length ? row.sources : [row].filter(Boolean);
  const summarizeMarketMapFixtureSource = (row)=>sourceList(row).map((source)=>source?.source || source?.primarySource || source?.label || "unknown");
  const detectMarketMapDuplicateRisk = (row)=>sourceList(row).some((source)=>/h4[_\s-]*fvg|4h\s*fvg/i.test(`${source?.source || ""} ${source?.primarySource || ""} ${source?.label || ""}`));
  const classifyMarketMapFixtureDirection = (row, sweepType)=>{
    const reaction = getLiquidityReactionDirection(sweepType);
    const text = `${row?.side || ""} ${row?.label || ""} ${row?.source || ""} ${summarizeMarketMapFixtureSource(row).join(" ")}`.toLowerCase();
    const supportLike = /support|demand|bullish|downside/.test(text);
    const resistanceLike = /resistance|supply|bearish|upside/.test(text);
    const aligned = reaction === "bullish" ? supportLike && !resistanceLike : reaction === "bearish" ? resistanceLike && !supportLike : false;
    const conflict = reaction === "bullish" ? resistanceLike && !supportLike : reaction === "bearish" ? supportLike && !resistanceLike : false;
    return { reaction, aligned, conflict, reason: aligned ? "Map row appears aligned with reaction side." : conflict ? "Map row appears opposite to reaction side." : "Map row direction is ambiguous." };
  };
  const isFutureHtfCandidate = (row)=>{
    const sources = summarizeMarketMapFixtureSource(row).join(" ").toLowerCase();
    const htf = /weekly|daily|weekly_fvg|weekly_sr|daily_fvg|daily_sr/.test(sources);
    return htf && sourceList(row).length > 1 && !detectMarketMapDuplicateRisk(row);
  };
  const evaluate = (testCase)=>{
    const episode = testCase.episode || baseEpisode();
    const mapState = testCase.mapState || { upside: [], downside: [] };
    const nearby = findNearbyMarketMapZones(episode, mapState, { closedCandles, maxRows: 5 });
    const nearest = buildNearestLiquidityContextDiagnostics({ episode, closedCandles, mapState, h4State: {} }).nearestMarketMapZone;
    const gate = getH4LiquidityEligibleContextCorroborators({ ...emptyContext, nearbyMarketMapZones: nearby });
    const marketMapDiagnostics = buildMarketMapContextDiagnostics({
      episode,
      nearbyMarketMapZones: nearby,
      nearestMarketMapZone: nearest,
      contextPriceReference: getLiquidityPriceReference(episode),
      contextBuffer: getLiquidityContextBuffer(episode, closedCandles),
      eligibleContextCorroborators: gate.eligibleCorroborators,
    });
    const marketMapAllowListProbe = hasH4LiquidityCorroborator(episode, { eligibleContextCorroborators: ["Market Map confluence", "Nearby Market Map context"] });
    const confirmation = shouldConfirmH4LiquidityEpisode(episode, { closedCandles, eligibleContextCorroborators: ["Market Map confluence"] }, { scoreThreshold: 6 });
    const firstRow = [...(mapState.upside || []), ...(mapState.downside || []), ...(mapState.rows || []), ...(mapState.zones || []), ...(mapState.upsideWatch || []), ...(mapState.downsideWatch || [])][0] || null;
    const direction = firstRow ? classifyMarketMapFixtureDirection(firstRow, episode?.sweep?.type) : null;
    const duplicateRisk = firstRow ? detectMarketMapDuplicateRisk(firstRow) : false;
    const futureCandidate = firstRow ? isFutureHtfCandidate(firstRow) : false;
    return {
      nearby,
      nearest,
      gate,
      marketMapDiagnostics,
      marketMapAllowListProbe,
      confirmation,
      duplicateRisk,
      futureCandidate,
      direction,
      normalizedFirstRow: firstRow ? normalizeLiquidityZone(firstRow, "marketMap") : null,
      sourceBreakdown: firstRow ? summarizeMarketMapFixtureSource(firstRow) : [],
    };
  };
  const cases = [
    {
      name: "Nearby support Market Map zone for sweepLow is diagnostics-only",
      episode: baseEpisode(),
      mapState: { downside: [supportRow()] },
      expected: "nearby and nearest map diagnostics exist, but Market Map is not eligible",
      checks: [
        ({ result })=>result.nearby.length === 1,
        ({ result })=>result.nearest.found === true,
        ({ result })=>notIncludes(result.gate.eligibleCorroborators, "Market Map confluence"),
        ({ result })=>result.marketMapAllowListProbe.hasCorroborator === false,
        ({ result })=>notIncludes(result.confirmation.corroborators, "Market Map confluence"),
        ({ result })=>result.direction.aligned === true,
        ({ result })=>result.marketMapDiagnostics.sourceBreakdown.length > 0,
        ({ result })=>result.marketMapDiagnostics.directionInference.some((item)=>item.alignment === "aligned"),
        ({ result })=>result.marketMapDiagnostics.distanceSummary.some((item)=>item.insideBuffer === true),
        ({ result })=>result.marketMapDiagnostics.nearnessGap.status === "nearby",
        ({ result })=>result.marketMapDiagnostics.nearnessGap.insideBuffer === true || result.marketMapDiagnostics.nearnessGap.nearbyCount > 0,
        ({ result })=>result.marketMapDiagnostics.nearnessGap.gapToBufferAbs === 0,
        ({ result })=>result.marketMapDiagnostics.eligiblePreview.wouldBeEligible === false,
      ],
    },
    {
      name: "Nearby resistance Market Map zone for sweepHigh is diagnostics-only",
      episode: baseEpisode({ sweep: { type: LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH, levelPrice: 100, breachPrice: 100.5, breachBuffer: 0.4 }, avwap: { side: LIQUIDITY_AVWAP_SIDE.BELOW } }),
      mapState: { upside: [resistanceRow()] },
      expected: "nearby and nearest map diagnostics exist, but Market Map is not eligible",
      checks: [
        ({ result })=>result.nearby.length === 1,
        ({ result })=>result.nearest.found === true,
        ({ result })=>notIncludes(result.gate.eligibleCorroborators, "Market Map confluence"),
        ({ result })=>result.marketMapAllowListProbe.hasCorroborator === false,
        ({ result })=>result.direction.aligned === true,
        ({ result })=>result.marketMapDiagnostics.directionInference.some((item)=>item.alignment === "aligned"),
        ({ result })=>result.marketMapDiagnostics.eligiblePreview.wouldBeEligible === false,
      ],
    },
    {
      name: "Opposite-side Market Map zone remains diagnostics-only",
      episode: baseEpisode(),
      mapState: { upside: [resistanceRow({ lower: 99, upper: 100.5 })] },
      expected: "nearby opposite-side row can be observed without eligibility or blocker",
      checks: [
        ({ result })=>result.nearby.length === 1,
        ({ result })=>result.direction.conflict === true,
        ({ result })=>notIncludes(result.gate.eligibleCorroborators, "Market Map confluence"),
        ({ result })=>!result.confirmation.blockers.includes("strong conflict"),
        ({ result })=>result.marketMapDiagnostics.directionInference.some((item)=>item.alignment === "conflict"),
        ({ result })=>result.marketMapDiagnostics.warnings.includes("Market Map direction conflict observed; diagnostics only."),
      ],
    },
    {
      name: "Far Market Map zone is nearest-only and ineligible",
      episode: baseEpisode(),
      mapState: { upside: [resistanceRow({ lower: 120, upper: 121, label: "Far Daily Resistance" })] },
      expected: "nearest is found but nearby list is empty and no Market Map eligibility exists",
      checks: [
        ({ result })=>result.nearest.found === true,
        ({ result })=>result.nearby.length === 0,
        ({ result })=>notIncludes(result.gate.eligibleCorroborators, "Market Map confluence"),
        ({ result })=>result.confirmation.confirmed === false,
        ({ result })=>result.marketMapDiagnostics.distanceSummary.some((item)=>item.insideBuffer === false),
        ({ result })=>result.marketMapDiagnostics.nearnessGap.status === "nearest-outside-buffer",
        ({ result })=>result.marketMapDiagnostics.nearnessGap.insideBuffer === false,
        ({ result })=>Number(result.marketMapDiagnostics.nearnessGap.gapToBufferAbs) > 0,
        ({ result })=>Number(result.marketMapDiagnostics.nearnessGap.needsCloserBy) > 0,
        ({ result })=>result.marketMapDiagnostics.eligiblePreview.wouldBeEligible === false,
      ],
    },
    {
      name: "Nearest-only Market Map zone does not count as corroborator",
      episode: baseEpisode(),
      mapState: { zones: [supportRow({ lower: 90, upper: 91, label: "Nearest-only Support" })] },
      expected: "nearest-only map diagnostics do not satisfy corroborator gate",
      checks: [
        ({ result })=>result.nearest.found === true,
        ({ result })=>result.nearby.length === 0,
        ({ result })=>result.marketMapAllowListProbe.hasCorroborator === false,
        ({ result })=>includes(result.confirmation.blockers, "no corroborator"),
        ({ result })=>result.marketMapDiagnostics.distanceSummary.some((item)=>item.insideBuffer === false),
      ],
    },
    {
      name: "Market Map row with H4 FVG source flags duplicate risk",
      episode: baseEpisode(),
      mapState: { downside: [{ ...supportRow({ label: "Confluence Zone", source: "h4_fvg" }), sources: [{ source: "h4_fvg", label: "4H Bullish FVG", lower: 98, upper: 101 }] }] },
      expected: "duplicate H4 FVG source risk is visible in fixture details and not eligible",
      checks: [
        ({ result })=>result.duplicateRisk === true,
        ({ result })=>notIncludes(result.gate.eligibleCorroborators, "Market Map confluence"),
        ({ result })=>notIncludes(result.confirmation.corroborators, "Market Map confluence"),
        ({ result })=>result.marketMapDiagnostics.duplicateRisk.some((item)=>item.risk === "h4_fvg" || item.risk === "h4_only"),
      ],
    },
    {
      name: "HTF confluence Market Map row is future candidate only",
      episode: baseEpisode(),
      mapState: { downside: [{ ...supportRow({ label: "Confluence Zone", source: "weekly_fvg" }), sources: [{ source: "weekly_fvg", label: "W Bullish FVG", lower: 98, upper: 101 }, { source: "daily_sr", label: "Daily Support", lower: 98.5, upper: 101 }] }] },
      expected: "HTF confluence can be identified for future study but remains ineligible",
      checks: [
        ({ result })=>result.futureCandidate === true,
        ({ result })=>result.nearby.length === 1,
        ({ result })=>notIncludes(result.gate.eligibleCorroborators, "Market Map confluence"),
        ({ result })=>result.marketMapDiagnostics.sourceBreakdown.some((item)=>item.hasHtfSource && item.multiSource),
        ({ result })=>result.marketMapDiagnostics.eligiblePreview.futureCandidateCount >= 1,
      ],
    },
    {
      name: "Invalid Market Map bounds fail safely",
      episode: baseEpisode(),
      mapState: { downside: [{ label: "Invalid Map Row", source: "daily_sr", side: "downside" }] },
      expected: "invalid row is skipped without throw or eligibility",
      checks: [
        ({ result })=>result.normalizedFirstRow === null,
        ({ result })=>result.nearby.length === 0,
        ({ result })=>result.nearest.found === false,
        ({ result })=>notIncludes(result.gate.eligibleCorroborators, "Market Map confluence"),
        ({ result })=>result.marketMapDiagnostics.nearnessGap.status === "no-market-map-zone",
        ({ result })=>result.marketMapDiagnostics.eligiblePreview.wouldBeEligible === false,
      ],
    },
    {
      name: "Invalid Market Map reference reports invalid nearness gap",
      episode: baseEpisode({ reclaim: { detected: false, status: LIQUIDITY_RECLAIM_STATUS.NONE, closePrice: null }, sweep: { type: LIQUIDITY_SWEEP_TYPE.SWEEP_LOW, levelPrice: null, breachPrice: null, breachBuffer: null } }),
      mapState: { downside: [supportRow()] },
      expected: "invalid reference price or buffer reports invalid-reference without eligibility",
      checks: [
        ({ result })=>result.nearby.length === 0,
        ({ result })=>result.marketMapDiagnostics.nearnessGap.status === "invalid-reference",
        ({ result })=>result.marketMapDiagnostics.nearnessGap.reason === "Invalid reference price or buffer.",
        ({ result })=>notIncludes(result.gate.eligibleCorroborators, "Market Map confluence"),
      ],
    },
    {
      name: "Market Map shape coverage remains diagnostics-safe",
      episode: baseEpisode(),
      mapState: { rows: [] },
      expected: "supported shapes normalize and zoneLow/zoneHigh-only shape is documented unsupported",
      custom: ()=>{
        const shapes = [
          { name: "lowerUpper", row: { lower: 98, upper: 101, label: "Lower Upper Support", source: "daily_sr" }, shouldNormalize: true },
          { name: "priceLevel", row: { price: 100, label: "Point Zone", source: "manual" }, shouldNormalize: true },
          { name: "nestedZone", row: { zone: { lower: 98, upper: 101 }, label: "Nested Zone", source: "daily_sr" }, shouldNormalize: true },
          { name: "zoneLowHigh", row: { zoneLow: 98, zoneHigh: 101, label: "Unsupported Zone Low High", source: "daily_sr" }, shouldNormalize: false },
        ];
        const normalized = shapes.map((shape)=>({ ...shape, normalized: normalizeLiquidityZone(shape.row, "marketMap") }));
        const passed = normalized.every((shape)=>shape.shouldNormalize ? !!shape.normalized : !shape.normalized);
        return {
          passed,
          details: {
            shapes: normalized.map((shape)=>({ name: shape.name, supported: !!shape.normalized, expectedSupported: shape.shouldNormalize })),
            eligibleContextCorroborators: [],
            note: "zoneLow/zoneHigh-only rows are currently unsupported and fail safely.",
          },
        };
      },
    },
    {
      name: "Market Map confluence label is rejected by corroborator allow-list",
      episode: baseEpisode(),
      mapState: { downside: [supportRow()] },
      expected: "Market Map labels are not accepted by hasH4LiquidityCorroborator",
      checks: [
        ({ result })=>result.marketMapAllowListProbe.hasCorroborator === false,
        ({ result })=>notIncludes(result.marketMapAllowListProbe.corroborators, "Market Map confluence"),
        ({ result })=>notIncludes(result.confirmation.corroborators, "Market Map confluence"),
      ],
    },
  ];
  const results = cases.map((testCase)=>{
    if(typeof testCase.custom === "function"){
      const custom = testCase.custom();
      return { name: testCase.name, passed: custom.passed, expected: testCase.expected, actual: custom.passed ? "matched" : "mismatch", details: custom.details };
    }
    const result = evaluate(testCase);
    const details = {
      nearbyMarketMapZones: result.nearby,
      nearestMarketMapZone: result.nearest,
      contextGateEligibleCorroborators: result.gate.eligibleCorroborators,
      contextGateSkipped: result.gate.skipped,
      contextGateWarnings: result.gate.warnings,
      marketMapDiagnostics: result.marketMapDiagnostics,
      marketMapAllowListProbe: result.marketMapAllowListProbe,
      confirmationCorroborators: result.confirmation.corroborators,
      confirmationBlockers: result.confirmation.blockers,
      duplicateRisk: result.duplicateRisk,
      futureCandidate: result.futureCandidate,
      direction: result.direction,
      normalizedFirstRow: result.normalizedFirstRow,
      sourceBreakdown: result.sourceBreakdown,
    };
    const passed = testCase.checks.every((check)=>check({ result, details }));
    return { name: testCase.name, passed, expected: testCase.expected, actual: passed ? "matched" : "mismatch", details };
  });
  const failed = results.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: results.length, failed, results };
}
if(typeof window !== "undefined") {
  window.runH4MarketMapContextFixtureTests = runH4MarketMapContextFixtureTests;
}

function normalizeLiquidityZone(zone, sourceHint = null){
  if(!zone || typeof zone !== "object") return null;
  const nested = zone.sourceZone || zone.zone || zone.priceZone || null;
  const readNumber = (...values)=>{
    for(const value of values){
      const number = Number(value);
      if(Number.isFinite(number)) return number;
    }
    return null;
  };
  const lowerValue = readNumber(zone.lower, zone.low, zone.min, nested?.lower, nested?.low, nested?.min);
  const upperValue = readNumber(zone.upper, zone.high, zone.max, nested?.upper, nested?.high, nested?.max);
  const pointValue = readNumber(zone.price, zone.level, zone.center, zone.mid, nested?.price, nested?.level, nested?.center, nested?.ce);
  let lower = lowerValue;
  let upper = upperValue;
  if(!Number.isFinite(lower) && !Number.isFinite(upper) && Number.isFinite(pointValue)){
    lower = pointValue;
    upper = pointValue;
  } else if(Number.isFinite(lower) && !Number.isFinite(upper)){
    upper = lower;
  } else if(!Number.isFinite(lower) && Number.isFinite(upper)){
    lower = upper;
  }
  if(!Number.isFinite(lower) || !Number.isFinite(upper)) return null;
  const min = Math.min(lower, upper);
  const max = Math.max(lower, upper);
  const textForDirection = `${zone.direction || nested?.direction || zone.type || nested?.type || zone.label || nested?.label || ""}`.toLowerCase();
  const direction = textForDirection.includes("bullish") ? "bullish" : (textForDirection.includes("bearish") ? "bearish" : (zone.direction || nested?.direction || null));
  const source = sourceHint || zone.source || nested?.source || zone.timeframe || nested?.timeframe || null;
  const id = zone.id || zone.key || nested?.id || nested?.key || null;
  const label = zone.label || zone.name || nested?.label || nested?.name || zone.type || nested?.type || source || "Liquidity zone";
  const type = zone.type || nested?.type || zone.kind || nested?.kind || null;
  const status = zone.status || zone.detailStatus || zone.baseStatus || nested?.status || zone.ifvg?.state || null;
  const quality = zone.quality || zone.band || zone.strength || zone.priorityScore || nested?.quality || nested?.strength || null;
  return {
    id,
    source,
    label,
    type,
    direction,
    lower: min,
    upper: max,
    center: (min + max) / 2,
    status,
    quality,
    timeframe: zone.timeframe || nested?.timeframe || null,
    side: zone.side || nested?.side || null,
    ref: { id, key: zone.key || nested?.key || null, label, source, type, status },
  };
}
function getLiquidityPriceReference(episode){
  const reclaimClose = Number(episode?.reclaim?.closePrice);
  if(episode?.reclaim?.detected === true && Number.isFinite(reclaimClose) && reclaimClose > 0) return { primaryPrice: reclaimClose, referenceType: "reclaimClose" };
  const levelPrice = Number(episode?.sweep?.levelPrice);
  if(Number.isFinite(levelPrice) && levelPrice > 0) return { primaryPrice: levelPrice, referenceType: "sweepLevel" };
  const breachPrice = Number(episode?.sweep?.breachPrice);
  if(Number.isFinite(breachPrice) && breachPrice > 0) return { primaryPrice: breachPrice, referenceType: "breachPrice" };
  return { primaryPrice: null, referenceType: "none" };
}
function getLiquidityContextBuffer(episode, closedCandles){
  const { primaryPrice } = getLiquidityPriceReference(episode);
  const breachBuffer = Number(episode?.sweep?.breachBuffer);
  const fallback = Number.isFinite(primaryPrice) && primaryPrice > 0 ? primaryPrice * 0.003 : null;
  const cap = Number.isFinite(primaryPrice) && primaryPrice > 0 ? primaryPrice * 0.005 : null;
  const hasBreachBuffer = Number.isFinite(breachBuffer) && breachBuffer > 0;
  let buffer = hasBreachBuffer ? breachBuffer : fallback;
  if(Number.isFinite(buffer) && Number.isFinite(fallback)) buffer = Math.max(buffer, fallback);
  if(Number.isFinite(buffer) && Number.isFinite(cap)) buffer = Math.min(buffer, cap);
  return {
    buffer: Number.isFinite(buffer) && buffer > 0 ? buffer : null,
    method: hasBreachBuffer ? "breachBuffer+fallbackPct" : (Number.isFinite(fallback) ? "fallbackPct" : "unavailable"),
    fallbackUsed: !hasBreachBuffer,
  };
}
function isPriceNearZone(price, zone, buffer){
  const value = Number(price);
  const padding = Number(buffer);
  const normalized = zone?.lower !== undefined && zone?.upper !== undefined ? zone : normalizeLiquidityZone(zone);
  if(!Number.isFinite(value) || !normalized || !Number.isFinite(padding) || padding < 0) return false;
  const lower = Number(normalized.lower);
  const upper = Number(normalized.upper);
  if(!Number.isFinite(lower) || !Number.isFinite(upper)) return false;
  return value >= lower - padding && value <= upper + padding;
}
function buildLiquidityContextDedupeKey(item){
  if(!item || typeof item !== "object") return null;
  const timeframe = item.timeframe || "4H";
  const source = item.source || "unknown";
  if(item.id) return `${timeframe}:${source}:${item.id}`;
  return `${timeframe}:${source}:${item.type || "zone"}:${item.lower ?? ""}:${item.upper ?? ""}:${item.direction || ""}`;
}
function getLiquidityZoneRelation(price, zone, buffer){
  if(!isPriceNearZone(price, zone, buffer)) return null;
  const lower = Number(zone.lower);
  const upper = Number(zone.upper);
  return Number.isFinite(lower) && Number.isFinite(upper) && price >= lower && price <= upper ? "inside" : "near";
}
function getLiquidityZoneDistancePct(price, zone){
  const value = Number(price);
  const center = Number(zone?.center ?? ((Number(zone?.lower) + Number(zone?.upper)) / 2));
  if(!Number.isFinite(value) || value <= 0 || !Number.isFinite(center)) return null;
  return Math.abs(value - center) / value * 100;
}
function calculateLiquidityZoneDistance(price, normalizedZone){
  const value = Number(price);
  const zone = normalizedZone?.lower !== undefined && normalizedZone?.upper !== undefined ? normalizedZone : normalizeLiquidityZone(normalizedZone);
  if(!Number.isFinite(value) || value <= 0 || !zone) return { distanceAbs: null, distancePct: null, relation: "unknown" };
  const lower = Number(zone.lower);
  const upper = Number(zone.upper);
  const center = Number(zone.center ?? ((lower + upper) / 2));
  if(!Number.isFinite(lower) || !Number.isFinite(upper)){
    if(!Number.isFinite(center)) return { distanceAbs: null, distancePct: null, relation: "unknown" };
    const pointDistance = Math.abs(value - center);
    return { distanceAbs: pointDistance, distancePct: pointDistance / value * 100, relation: "near" };
  }
  if(lower === upper){
    const pointDistance = Math.abs(value - lower);
    return { distanceAbs: pointDistance, distancePct: pointDistance / value * 100, relation: pointDistance === 0 ? "inside" : "near" };
  }
  if(value >= lower && value <= upper) return { distanceAbs: 0, distancePct: 0, relation: "inside" };
  const distanceAbs = value < lower ? lower - value : value - upper;
  return {
    distanceAbs,
    distancePct: distanceAbs / value * 100,
    relation: value < lower ? "below" : "above",
  };
}
function createEmptyNearestLiquidityZone(source, reason){
  return { found: false, source, reason, zone: null, distanceAbs: null, distancePct: null, relation: "unknown", lower: null, upper: null, label: null, direction: null, status: null, quality: null };
}
function summarizeNearestLiquidityZone(zone){
  return zone ? { id: zone.id || null, source: zone.source || null, label: zone.label || null, type: zone.type || null, direction: zone.direction || null, lower: zone.lower, upper: zone.upper, status: zone.status || null, quality: zone.quality || null } : null;
}
function findNearestLiquidityZone(price, zones, options = {}){
  const source = options.sourceLabel || null;
  const value = Number(price);
  if(!Number.isFinite(value) || value <= 0) return createEmptyNearestLiquidityZone(source, "invalid price");
  if(!Array.isArray(zones) || !zones.length) return createEmptyNearestLiquidityZone(source, "no zones");
  const maxScan = Math.max(1, Number(options.maxScan) || zones.length);
  let nearest = null;
  zones.slice(0, maxScan).forEach((rawZone)=>{
    const zone = normalizeLiquidityZone(rawZone, source);
    if(!zone) return;
    const distance = calculateLiquidityZoneDistance(value, zone);
    if(!Number.isFinite(distance.distanceAbs)) return;
    if(!nearest || distance.distanceAbs < nearest.distance.distanceAbs){
      nearest = { zone, distance };
    }
  });
  if(!nearest) return createEmptyNearestLiquidityZone(source, "no valid normalized zones");
  const summary = summarizeNearestLiquidityZone(nearest.zone);
  return {
    found: true,
    source,
    reason: null,
    zone: summary,
    distanceAbs: nearest.distance.distanceAbs,
    distancePct: nearest.distance.distancePct,
    relation: nearest.distance.relation,
    lower: summary.lower,
    upper: summary.upper,
    label: summary.label,
    direction: summary.direction,
    status: summary.status,
    quality: summary.quality,
  };
}
function collectLiquidityMapRows(mapState){
  if(!mapState || typeof mapState !== "object") return [];
  const keys = ["upside", "downside", "rows", "zones", "upsideWatch", "downsideWatch"];
  return keys.flatMap((key)=>Array.isArray(mapState[key]) ? mapState[key] : []);
}
function findNearbyMarketMapZones(episode, mapState, options = {}){
  const { primaryPrice } = getLiquidityPriceReference(episode);
  const bufferState = options.bufferState || getLiquidityContextBuffer(episode, options.closedCandles);
  const buffer = Number(bufferState.buffer);
  if(!Number.isFinite(primaryPrice) || !Number.isFinite(buffer) || !mapState) return [];
  const maxRows = Math.max(1, Number(options.maxRows) || 5);
  return collectLiquidityMapRows(mapState)
    .map((row, index)=>({ row, index, zone: normalizeLiquidityZone(row, "marketMap") }))
    .filter((item)=>item.zone && isPriceNearZone(primaryPrice, item.zone, buffer))
    .slice(0, maxRows)
    .map(({ row, index, zone })=>{
      const distance = calculateLiquidityZoneDistance(primaryPrice, zone);
      const sources = Array.isArray(row.sources)
        ? row.sources.map((source)=>({ source: source?.source || source?.primarySource || null, label: source?.label || null, type: source?.type || null, lower: source?.lower ?? null, upper: source?.upper ?? null })).filter(Boolean)
        : [];
      return {
        id: zone.id || `marketMap-${index}`,
        source: "marketMap",
        label: zone.label,
        type: zone.type,
        side: row.side || zone.side || null,
        direction: zone.direction,
        lower: zone.lower,
        upper: zone.upper,
        status: zone.status,
        distanceAbs: distance.distanceAbs,
        distancePct: getLiquidityZoneDistancePct(primaryPrice, zone),
        relation: getLiquidityZoneRelation(primaryPrice, zone, buffer),
        quality: zone.quality,
        sources,
        primarySource: row.primarySource || row.source || zone.source || null,
        confluenceCount: Number(row.confluenceCount) || sources.length || null,
      };
    });
}
function isInactiveFvgDetail(detail){
  const status = String(detail?.detailStatus || detail?.status || detail?.baseStatus || "").toLowerCase();
  return status.includes("broken") || status.includes("failed") || status.includes("filled");
}
function findNearbyH4FvgZones(episode, h4FvgDetails, options = {}){
  const { primaryPrice } = getLiquidityPriceReference(episode);
  const bufferState = options.bufferState || getLiquidityContextBuffer(episode, options.closedCandles);
  const buffer = Number(bufferState.buffer);
  if(!Array.isArray(h4FvgDetails) || !h4FvgDetails.length || !Number.isFinite(primaryPrice) || !Number.isFinite(buffer)) return [];
  const maxRows = Math.max(1, Number(options.maxRows) || 5);
  const reactionDirection = getH4LiquidityReactionDirection(episode);
  const seen = new Set();
  return h4FvgDetails
    .filter((detail)=>!isInactiveFvgDetail(detail))
    .map((detail, index)=>{
      const zone = normalizeLiquidityZone({ ...(detail.sourceZone || detail), id: detail.key || detail.id || null, direction: detail.direction || getFvgDirection(detail.sourceZone || detail), status: detail.detailStatus || detail.status || null, quality: detail.quality?.band || detail.quality || null, timeframe: detail.timeframe || "4H" }, "h4Fvg");
      if(!zone || !isPriceNearZone(primaryPrice, zone, buffer)) return null;
      const refKey = buildLiquidityContextDedupeKey({ ...zone, id: detail.key || zone.id || `h4Fvg-${index}`, source: "h4Fvg", timeframe: "4H" });
      if(seen.has(refKey)) return null;
      seen.add(refKey);
      return {
        id: detail.key || zone.id || `h4Fvg-${index}`,
        source: "h4Fvg",
        direction: zone.direction,
        lower: zone.lower,
        upper: zone.upper,
        status: detail.detailStatus || zone.status,
        quality: detail.quality?.band || zone.quality,
        relation: getLiquidityZoneRelation(primaryPrice, zone, buffer),
        distancePct: getLiquidityZoneDistancePct(primaryPrice, zone),
        sameDirection: !!reactionDirection && zone.direction === reactionDirection,
        refKey,
      };
    })
    .filter(Boolean)
    .slice(0, maxRows);
}
function findNearbyH4IfvgZones(episode, h4State, options = {}){
  const { primaryPrice } = getLiquidityPriceReference(episode);
  const bufferState = options.bufferState || getLiquidityContextBuffer(episode, options.closedCandles);
  const buffer = Number(bufferState.buffer);
  if(!h4State || !Number.isFinite(primaryPrice) || !Number.isFinite(buffer)) return [];
  const maxRows = Math.max(1, Number(options.maxRows) || 5);
  const reactionDirection = getH4LiquidityReactionDirection(episode);
  const candidates = [
    ...(Array.isArray(h4State.recentBrokenFvgDetails?.all) ? h4State.recentBrokenFvgDetails.all : []),
    ...(Array.isArray(h4State.fvgDetails) ? h4State.fvgDetails.filter((detail)=>detail?.ifvg && detail.ifvg.state !== IFVG_STATE.NONE) : []),
  ];
  const seen = new Set();
  return candidates
    .map((detail, index)=>{
      const ifvg = detail?.ifvg || {};
      const sourceZone = ifvg.zone && Number.isFinite(Number(ifvg.zone.lower)) && Number.isFinite(Number(ifvg.zone.upper)) ? ifvg.zone : (detail?.sourceZone || detail);
      const direction = ifvg.inversionSide || detail?.direction || getFvgDirection(detail?.sourceZone || detail);
      const zone = normalizeLiquidityZone({ ...sourceZone, id: detail?.key || ifvg.originalFvgId || null, direction, status: ifvg.state || detail?.detailStatus || null, quality: ifvg.quality?.band || detail?.quality?.band || null, timeframe: detail?.timeframe || "4H" }, "h4Ifvg");
      if(!zone || !isPriceNearZone(primaryPrice, zone, buffer)) return null;
      const refKey = buildLiquidityContextDedupeKey({ ...zone, id: detail?.key || ifvg.originalFvgId || `h4Ifvg-${index}`, source: "h4Ifvg", timeframe: "4H" });
      if(seen.has(refKey)) return null;
      seen.add(refKey);
      return {
        id: detail?.key || ifvg.originalFvgId || `h4Ifvg-${index}`,
        source: "h4Ifvg",
        direction: zone.direction,
        lower: zone.lower,
        upper: zone.upper,
        ifvgState: ifvg.state || null,
        status: detail?.detailStatus || zone.status,
        band: ifvg.quality?.band || null,
        relation: getLiquidityZoneRelation(primaryPrice, zone, buffer),
        distancePct: getLiquidityZoneDistancePct(primaryPrice, zone),
        sameDirection: !!reactionDirection && zone.direction === reactionDirection,
        refKey,
      };
    })
    .filter(Boolean)
    .slice(0, maxRows);
}
function collectMarketMapLiquidityZones(mapState){
  return collectLiquidityMapRows(mapState).map((row, index)=>({ ...row, id: row.id || row.key || `marketMap-${index}` }));
}
function collectH4FvgLiquidityZones(h4FvgDetails){
  if(!Array.isArray(h4FvgDetails)) return [];
  return h4FvgDetails
    .filter((detail)=>!isInactiveFvgDetail(detail))
    .map((detail, index)=>({
      ...(detail?.sourceZone || detail || {}),
      id: detail?.key || detail?.id || `h4Fvg-${index}`,
      source: "h4Fvg",
      direction: detail?.direction || getFvgDirection(detail?.sourceZone || detail),
      status: detail?.detailStatus || detail?.status || null,
      quality: detail?.quality?.band || detail?.quality || null,
      timeframe: detail?.timeframe || "4H",
    }));
}
function collectH4IfvgLiquidityZones(h4State){
  if(!h4State) return [];
  const candidates = [
    ...(Array.isArray(h4State.recentBrokenFvgDetails?.all) ? h4State.recentBrokenFvgDetails.all : []),
    ...(Array.isArray(h4State.fvgDetails) ? h4State.fvgDetails.filter((detail)=>detail?.ifvg && detail.ifvg.state !== IFVG_STATE.NONE) : []),
  ];
  return candidates.map((detail, index)=>{
    const ifvg = detail?.ifvg || {};
    const sourceZone = ifvg.zone && Number.isFinite(Number(ifvg.zone.lower)) && Number.isFinite(Number(ifvg.zone.upper)) ? ifvg.zone : (detail?.sourceZone || detail || {});
    return {
      ...sourceZone,
      id: detail?.key || ifvg.originalFvgId || `h4Ifvg-${index}`,
      source: "h4Ifvg",
      direction: ifvg.inversionSide || detail?.direction || getFvgDirection(detail?.sourceZone || detail),
      status: ifvg.state || detail?.detailStatus || null,
      quality: ifvg.quality?.band || detail?.quality?.band || null,
      timeframe: detail?.timeframe || ifvg.timeframe || "4H",
    };
  });
}
function buildNearestLiquidityContextDiagnostics(input = {}){
  const episode = input.episode || null;
  const closedCandles = Array.isArray(input.closedCandles) ? input.closedCandles : [];
  const contextPriceReference = getLiquidityPriceReference(episode);
  const bufferState = getLiquidityContextBuffer(episode, closedCandles);
  const contextBuffer = { buffer: bufferState.buffer, method: bufferState.method, fallbackUsed: bufferState.fallbackUsed };
  const price = contextPriceReference.primaryPrice;
  return {
    contextPriceReference,
    contextBuffer,
    nearestMarketMapZone: findNearestLiquidityZone(price, collectMarketMapLiquidityZones(input.mapState), { sourceLabel: "marketMap" }),
    nearestH4Fvg: findNearestLiquidityZone(price, collectH4FvgLiquidityZones(input.h4State?.fvgDetails), { sourceLabel: "h4Fvg" }),
    nearestH4Ifvg: findNearestLiquidityZone(price, collectH4IfvgLiquidityZones(input.h4State), { sourceLabel: "h4Ifvg" }),
  };
}
function compareStructureEventRelation(eventIndex, referenceIndex){
  if(!Number.isInteger(eventIndex) || !Number.isInteger(referenceIndex)) return "unknown";
  if(eventIndex > referenceIndex) return "after";
  if(eventIndex === referenceIndex) return "same";
  return "before";
}
function normalizeH4StructureEvent(structureStatus, candles = []){
  if(!structureStatus) return null;
  if(typeof structureStatus === "string"){
    const text = structureStatus;
    const direction = /Bullish/i.test(text) ? "bullish" : (/Bearish/i.test(text) ? "bearish" : "neutral");
    const structureType = /CHoCH/i.test(text) ? "CHOCH" : (/BOS/i.test(text) ? "BOS" : "none");
    return { status: text, direction, structureType, eventIndex: null, eventTime: null, brokenLevel: null, sourceSwingIndex: null, sourceSwingTime: null, confidence: structureType === "none" ? "none" : "low" };
  }
  if(typeof structureStatus !== "object") return null;
  const status = structureStatus.status || "No clear 4H structure shift";
  const direction = structureStatus.direction || (/Bullish/i.test(status) ? "bullish" : (/Bearish/i.test(status) ? "bearish" : "neutral"));
  const structureType = structureStatus.structureType || (/CHoCH/i.test(status) ? "CHOCH" : (/BOS/i.test(status) ? "BOS" : "none"));
  let eventIndex = Number.isInteger(structureStatus.eventIndex) ? structureStatus.eventIndex : null;
  const eventTime = structureStatus.eventTime ?? (Number.isInteger(eventIndex) ? getOrderflowCandleTime(candles[eventIndex]) : null);
  if(!Number.isInteger(eventIndex) && eventTime != null && Array.isArray(candles)){
    const foundIndex = candles.findIndex((c)=>String(getOrderflowCandleTime(c)) === String(eventTime));
    eventIndex = foundIndex >= 0 ? foundIndex : null;
  }
  return {
    ...structureStatus,
    status,
    direction,
    structureType,
    eventIndex,
    eventTime,
    brokenLevel: normalizeLiquidityPrice(structureStatus.brokenLevel) ?? normalizeLiquidityPrice(structureStatus.broken),
    sourceSwingIndex: Number.isInteger(structureStatus.sourceSwingIndex) ? structureStatus.sourceSwingIndex : null,
    sourceSwingTime: structureStatus.sourceSwingTime ?? structureStatus.ref ?? null,
    confidence: structureStatus.confidence || (structureType === "none" ? "none" : (Number.isInteger(eventIndex) ? "medium" : "low")),
  };
}
function classifyH4StructureEpisodeAlignment(episode, structureStatus, candles, options = {}){
  const warnings = [];
  const source = normalizeH4StructureEvent(structureStatus, candles);
  const reactionDirection = getLiquidityReactionDirection(episode?.sweep?.type);
  const eventIndex = Number.isInteger(source?.eventIndex) ? source.eventIndex : null;
  const eventTime = source?.eventTime ?? null;
  const structureDirection = source?.direction || null;
  const structureType = source?.structureType || null;
  const sweepIndex = Number(episode?.sweep?.anchorIndex ?? episode?.sweep?.candleIndex);
  const reclaimIndex = episode?.reclaim?.detected === true ? Number(episode?.reclaim?.candleIndex) : NaN;
  const relationToSweep = compareStructureEventRelation(eventIndex, Number.isInteger(sweepIndex) ? sweepIndex : null);
  const relationToReclaim = episode?.reclaim?.detected === true
    ? compareStructureEventRelation(eventIndex, Number.isInteger(reclaimIndex) ? reclaimIndex : null)
    : "unknown";
  const base = {
    alignment: "unknown",
    episodeAligned: false,
    reactionDirection,
    structureDirection,
    structureType,
    eventIndex,
    eventTime,
    relationToSweep,
    relationToReclaim,
    reason: "4H structure context unavailable.",
    source: source?.status || (typeof structureStatus === "string" ? structureStatus : null),
    warnings,
  };
  if(!source) return base;
  if(!Number.isInteger(eventIndex) || eventTime == null){
    return { ...base, reason: "4H structure event metadata is missing; keeping structure diagnostics only.", warnings: [...warnings, "Missing structure event index/time."] };
  }
  if(structureType === "none" || structureDirection === "neutral"){
    return { ...base, reason: "No clear 4H BOS/CHoCH structure event to align with liquidity episode." };
  }
  if(!reactionDirection){
    return { ...base, reason: "Liquidity reaction direction is unavailable for structure alignment." };
  }
  if(episode?.reclaim?.detected !== true || !Number.isInteger(reclaimIndex)){
    const informative = relationToSweep === "after" && (structureDirection === reactionDirection || ["bullish", "bearish"].includes(structureDirection));
    return {
      ...base,
      alignment: informative && structureDirection === reactionDirection ? "aligned" : (informative ? "conflict" : "unknown"),
      episodeAligned: false,
      reason: "4H structure event is not eligible for episode alignment until reclaim/reject exists.",
      warnings: [...warnings, "No reclaim candle available for structure episode alignment."],
    };
  }
  if(relationToReclaim !== "after"){
    const alignment = relationToSweep === "after" && structureDirection === reactionDirection ? "aligned" : (relationToSweep === "after" ? "conflict" : "unknown");
    return {
      ...base,
      alignment,
      episodeAligned: false,
      reason: "4H structure occurred before or on the reclaim candle; diagnostics only.",
      warnings: [...warnings, "Structure did not occur after reclaim candle."],
    };
  }
  if(structureDirection === reactionDirection){
    return { ...base, alignment: "aligned", episodeAligned: true, reason: "4H structure occurred after reclaim and matches liquidity reaction direction." };
  }
  if(["bullish", "bearish"].includes(structureDirection)){
    return { ...base, alignment: "conflict", episodeAligned: true, reason: "4H structure occurred after reclaim but opposes liquidity reaction direction.", warnings: [...warnings, "Episode-aligned opposite 4H structure observed."] };
  }
  return { ...base, reason: "4H structure direction is neutral or unavailable." };
}
function classifyH4StructureAlignment(episode, h4State, options = {}){
  const source = options.structureStatus ?? h4State?.structureStatus ?? null;
  if(!source) return classifyH4StructureEpisodeAlignment(episode, null, options.closedCandles || []);
  return classifyH4StructureEpisodeAlignment(episode, source, options.closedCandles || []);
}
function runH4StructureAlignmentFixtureTests(){
  const candles = Array.from({ length: 130 }, (_, index)=>({ time: 1700000000 + index * 14400, close: 100 + index }));
  const baseEpisode = (overrides = {})=>({
    status: LIQUIDITY_OF_STATE.VALID,
    sweep: { type: LIQUIDITY_SWEEP_TYPE.SWEEP_LOW, anchorIndex: 100, ...(overrides.sweep || {}) },
    reclaim: { detected: true, status: LIQUIDITY_RECLAIM_STATUS.SAME_BAR, candleIndex: 110, ...(overrides.reclaim || {}) },
    avwap: { available: true, side: LIQUIDITY_AVWAP_SIDE.ABOVE, correctSideCloses: 1 },
    volume: { status: LIQUIDITY_VOLUME_STATUS.NORMAL },
    score: 6,
    stale: false,
    failure: { detected: false },
    ...overrides,
  });
  const structureEvent = (overrides = {})=>{
    const direction = overrides.direction || "bullish";
    const structureType = overrides.structureType || "BOS";
    const eventIndex = Number.isInteger(overrides.eventIndex) ? overrides.eventIndex : 112;
    const status = overrides.status || `${direction === "bullish" ? "Bullish" : direction === "bearish" ? "Bearish" : "No clear 4H"} ${structureType === "none" ? "structure shift" : structureType}`;
    return {
      status,
      direction,
      structureType,
      eventIndex,
      eventTime: candles[eventIndex]?.time ?? null,
      broken: Number.isFinite(overrides.broken) ? overrides.broken : 100,
      brokenLevel: Number.isFinite(overrides.brokenLevel) ? overrides.brokenLevel : 100,
      ref: String(candles[Math.max(0, eventIndex - 3)]?.time ?? "—"),
      sourceSwingIndex: Number.isInteger(overrides.sourceSwingIndex) ? overrides.sourceSwingIndex : Math.max(0, eventIndex - 3),
      sourceSwingTime: overrides.sourceSwingTime ?? candles[Math.max(0, eventIndex - 3)]?.time ?? null,
      latestClose: 101,
      confidence: overrides.confidence || "medium",
      ...overrides,
    };
  };
  const includes = (list, value)=>Array.isArray(list) && list.includes(value);
  const notIncludes = (list, value)=>!includes(list, value);
  const hasWarningContaining = (alignment, text)=>Array.isArray(alignment?.warnings) && alignment.warnings.some((warning)=>String(warning).includes(text));
  const evaluateStructureEligibility = (alignment)=>{
    const gate = getH4LiquidityEligibleContextCorroborators({ nearbyH4Fvgs: [], nearbyH4Ifvgs: [], nearbyMarketMapZones: [], structureAlignment: alignment });
    const corroboratorState = hasH4LiquidityCorroborator(baseEpisode(), { eligibleContextCorroborators: gate.eligibleCorroborators });
    const confirmation = shouldConfirmH4LiquidityEpisode(baseEpisode(), { closedCandles: candles, eligibleContextCorroborators: gate.eligibleCorroborators }, { scoreThreshold: 6 });
    return {
      gate,
      corroboratorState,
      confirmation,
      hasStructureLabel: includes(gate.eligibleCorroborators, "4H structure alignment"),
    };
  };
  const cases = [
    {
      name: "Structure after sweep but before reclaim remains diagnostics-only",
      episode: baseEpisode(),
      structure: structureEvent({ direction: "bullish", structureType: "BOS", eventIndex: 105, status: "Bullish BOS" }),
      expected: "relation after sweep / before reclaim with episodeAligned false and no structure label",
      eligible: false,
      checks: [
        ({ alignment })=>alignment.reactionDirection === "bullish",
        ({ alignment })=>alignment.structureDirection === "bullish",
        ({ alignment })=>alignment.relationToSweep === "after",
        ({ alignment })=>alignment.relationToReclaim === "before",
        ({ alignment })=>alignment.episodeAligned === false,
        ({ alignment })=>hasWarningContaining(alignment, "Structure did not occur after reclaim"),
      ],
    },
    {
      name: "Structure after reclaim matching sweepLow direction becomes eligible diagnostics label",
      episode: baseEpisode(),
      structure: structureEvent({ direction: "bullish", structureType: "BOS", eventIndex: 112, status: "Bullish BOS" }),
      expected: "aligned, episodeAligned true, and 4H structure alignment eligible",
      eligible: true,
      checks: [
        ({ alignment })=>alignment.relationToSweep === "after",
        ({ alignment })=>alignment.relationToReclaim === "after",
        ({ alignment })=>alignment.alignment === "aligned",
        ({ alignment })=>alignment.episodeAligned === true,
      ],
    },
    {
      name: "Structure after reclaim opposite sweepLow direction conflicts as warning-only diagnostics",
      episode: baseEpisode(),
      structure: structureEvent({ direction: "bearish", structureType: "BOS", eventIndex: 112, status: "Bearish BOS" }),
      expected: "conflict and episodeAligned true with warning but no structure label",
      eligible: false,
      checks: [
        ({ alignment })=>alignment.reactionDirection === "bullish",
        ({ alignment })=>alignment.structureDirection === "bearish",
        ({ alignment })=>alignment.relationToReclaim === "after",
        ({ alignment })=>alignment.alignment === "conflict",
        ({ alignment })=>alignment.episodeAligned === true,
        ({ alignment })=>hasWarningContaining(alignment, "opposite 4H structure"),
      ],
    },
    {
      name: "No reclaim keeps structure non-episode-aligned",
      episode: baseEpisode({ reclaim: { detected: false, status: LIQUIDITY_RECLAIM_STATUS.NONE, candleIndex: null } }),
      structure: structureEvent({ direction: "bullish", structureType: "BOS", eventIndex: 112, status: "Bullish BOS" }),
      expected: "relationToReclaim unknown, episodeAligned false, and no structure label",
      eligible: false,
      checks: [
        ({ alignment })=>alignment.relationToSweep === "after",
        ({ alignment })=>alignment.relationToReclaim === "unknown",
        ({ alignment })=>alignment.episodeAligned === false,
        ({ alignment })=>hasWarningContaining(alignment, "No reclaim candle"),
      ],
    },
    {
      name: "No clear structure remains unknown",
      episode: baseEpisode(),
      structure: structureEvent({ direction: "neutral", structureType: "none", eventIndex: 112, status: "No clear 4H structure shift", broken: null, brokenLevel: null, confidence: "low" }),
      expected: "unknown, episodeAligned false, and no structure label",
      eligible: false,
      checks: [
        ({ alignment })=>alignment.alignment === "unknown",
        ({ alignment })=>alignment.episodeAligned === false,
        ({ alignment })=>alignment.structureDirection === "neutral",
        ({ alignment })=>alignment.structureType === "none",
        ({ alignment })=>/No clear 4H BOS\/CHoCH/.test(alignment.reason),
      ],
    },
    {
      name: "Old string-only structure lacks event metadata",
      episode: baseEpisode(),
      structure: "Bullish BOS",
      expected: "unknown with missing event metadata warning and no structure label",
      eligible: false,
      checks: [
        ({ alignment })=>alignment.alignment === "unknown",
        ({ alignment })=>alignment.episodeAligned === false,
        ({ alignment })=>alignment.reactionDirection === "bullish",
        ({ alignment })=>alignment.structureDirection === "bullish",
        ({ alignment })=>hasWarningContaining(alignment, "Missing structure event index/time"),
      ],
    },
    {
      name: "sweepHigh bearish structure after reclaim becomes eligible diagnostics label",
      episode: baseEpisode({ sweep: { type: LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH, anchorIndex: 100 } }),
      structure: structureEvent({ direction: "bearish", structureType: "BOS", eventIndex: 112, status: "Bearish BOS" }),
      expected: "bearish reaction aligned and 4H structure alignment eligible",
      eligible: true,
      checks: [
        ({ alignment })=>alignment.reactionDirection === "bearish",
        ({ alignment })=>alignment.structureDirection === "bearish",
        ({ alignment })=>alignment.alignment === "aligned",
        ({ alignment })=>alignment.episodeAligned === true,
      ],
    },
    {
      name: "sweepHigh bullish structure after reclaim conflicts diagnostics",
      episode: baseEpisode({ sweep: { type: LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH, anchorIndex: 100 } }),
      structure: structureEvent({ direction: "bullish", structureType: "CHOCH", eventIndex: 112, status: "Bullish CHoCH" }),
      expected: "bearish reaction conflict with warning and no structure label",
      eligible: false,
      checks: [
        ({ alignment })=>alignment.reactionDirection === "bearish",
        ({ alignment })=>alignment.structureDirection === "bullish",
        ({ alignment })=>alignment.alignment === "conflict",
        ({ alignment })=>alignment.episodeAligned === true,
        ({ alignment })=>hasWarningContaining(alignment, "opposite 4H structure"),
      ],
    },
  ];
  const results = cases.map((testCase)=>{
    const alignment = classifyH4StructureEpisodeAlignment(testCase.episode, testCase.structure, candles);
    const eligibility = evaluateStructureEligibility(alignment);
    const details = {
      structureAlignment: alignment,
      contextGateEligibleCorroborators: eligibility.gate.eligibleCorroborators,
      contextGateSkipped: eligibility.gate.skipped,
      contextGateWarnings: eligibility.gate.warnings,
      hasStructureCorroborator: eligibility.corroboratorState.hasCorroborator,
      confirmationCorroborators: eligibility.confirmation.corroborators,
      confirmationBlockers: eligibility.confirmation.blockers,
      confirmed: eligibility.confirmation.confirmed,
    };
    const eligibilityPassed = testCase.eligible
      ? eligibility.hasStructureLabel && eligibility.confirmation.confirmed === true && includes(eligibility.confirmation.corroborators, "4H structure alignment")
      : !eligibility.hasStructureLabel && notIncludes(eligibility.confirmation.corroborators, "4H structure alignment");
    const passed = testCase.checks.every((check)=>check({ alignment, details })) && eligibilityPassed;
    return {
      name: testCase.name,
      passed,
      expected: testCase.expected,
      actual: passed ? "matched" : "mismatch",
      details,
    };
  });
  const failed = results.filter((result)=>!result.passed).length;
  return {
    passed: failed === 0,
    total: results.length,
    failed,
    results,
  };
}
if(typeof window !== "undefined") {
  window.runH4StructureAlignmentFixtureTests = runH4StructureAlignmentFixtureTests;
}


function createEmptyMarketMapContextDiagnostics(reason = "No Market Map context diagnostics available."){
  return {
    sourceBreakdown: [],
    duplicateRisk: [],
    directionInference: [],
    distanceSummary: [],
    nearnessGap: {
      nearestFound: false,
      nearbyCount: 0,
      referencePrice: null,
      referenceType: null,
      buffer: null,
      bufferMethod: null,
      nearestLabel: null,
      nearestLower: null,
      nearestUpper: null,
      nearestRelation: null,
      nearestDistanceAbs: null,
      nearestDistancePct: null,
      insideBuffer: false,
      gapToBufferAbs: null,
      gapToBufferPct: null,
      needsCloserBy: null,
      status: "no-market-map-zone",
      reason,
    },
    eligiblePreview: {
      wouldBeEligible: false,
      reason: "Market Map remains diagnostics-only in Phase 2D4A2",
      futureCandidateCount: 0,
      duplicateRiskCount: 0,
      nearbyCount: 0,
      nearestFound: false,
    },
    warnings: [],
    skipped: reason ? [reason] : [],
  };
}
function getMarketMapDiagnosticSources(row){
  if(!row || typeof row !== "object") return [];
  const rawSources = Array.isArray(row.sources) && row.sources.length ? row.sources : [row];
  return rawSources.map((source)=>({
    source: source?.source || source?.primarySource || row.primarySource || row.source || null,
    label: source?.label || null,
    type: source?.type || null,
    lower: source?.lower ?? null,
    upper: source?.upper ?? null,
  })).filter((source)=>source.source || source.label || source.type || source.lower != null || source.upper != null);
}
function getMarketMapDiagnosticText(row){
  const sources = getMarketMapDiagnosticSources(row);
  return [
    row?.label,
    row?.type,
    row?.source,
    row?.primarySource,
    row?.side,
    row?.direction,
    row?.quality,
    ...sources.flatMap((source)=>[source.source, source.label, source.type]),
  ].filter(Boolean).join(" ").toLowerCase();
}
function summarizeMarketMapDiagnosticSource(row){
  const sources = getMarketMapDiagnosticSources(row);
  const text = getMarketMapDiagnosticText(row);
  const hasH4Source = /\bh4\b|\b4h\b|h4_fvg|4h\s*fvg|h4\s*s\/?r|4h\s*s\/?r/.test(text);
  const hasHtfSource = /weekly|\bw\b|daily|\bd\b|\b1d\b|weekly\s*fvg|daily\s*fvg|weekly\s*s\/?r|daily\s*s\/?r/.test(text);
  const multiSource = sources.length > 1 || Number(row?.confluenceCount) > 1 || /confluence/.test(`${row?.label || ""} ${row?.type || ""}`.toLowerCase());
  return {
    label: row?.label || null,
    side: row?.side || null,
    type: row?.type || null,
    source: row?.source || null,
    sources,
    primarySource: row?.primarySource || row?.source || null,
    confluenceCount: Number(row?.confluenceCount) || sources.length || null,
    quality: row?.quality || null,
    status: row?.status || null,
    lower: row?.lower ?? null,
    upper: row?.upper ?? null,
    distanceAbs: row?.distanceAbs ?? null,
    distancePct: row?.distancePct ?? null,
    relation: row?.relation || null,
    hasH4Source,
    hasHtfSource,
    multiSource,
  };
}
function inferMarketMapDiagnosticDirection(row, episode){
  const reactionDirection = getLiquidityReactionDirection(episode?.sweep?.type);
  const text = getMarketMapDiagnosticText(row);
  const explicit = String(row?.direction || "").toLowerCase();
  const supportLike = /support|demand|bullish|downside/.test(text) || explicit === "bullish";
  const resistanceLike = /resistance|supply|bearish|upside/.test(text) || explicit === "bearish";
  let inferredMapDirection = null;
  let inferenceBasis = "unavailable";
  let confidence = "low";
  if(supportLike && !resistanceLike){ inferredMapDirection = "bullish"; inferenceBasis = "support/demand/bullish/downside text"; confidence = row?.side || explicit ? "medium" : "low"; }
  else if(resistanceLike && !supportLike){ inferredMapDirection = "bearish"; inferenceBasis = "resistance/supply/bearish/upside text"; confidence = row?.side || explicit ? "medium" : "low"; }
  else if(supportLike && resistanceLike){ inferenceBasis = "mixed support/resistance or bullish/bearish text"; }
  const alignment = reactionDirection && inferredMapDirection
    ? (reactionDirection === inferredMapDirection ? "aligned" : "conflict")
    : "unknown";
  return {
    label: row?.label || null,
    reactionDirection,
    inferredMapDirection,
    inferenceBasis,
    alignment,
    confidence: alignment === "unknown" ? "low" : confidence,
    reason: alignment === "aligned" ? "Market Map row direction appears to support the liquidity reaction."
      : alignment === "conflict" ? "Market Map row direction appears opposite to the liquidity reaction."
      : "Market Map row direction is unclear; diagnostics only.",
  };
}
function buildMarketMapDuplicateRisk(row, eligibleContextCorroborators = []){
  const eligible = new Set(Array.isArray(eligibleContextCorroborators) ? eligibleContextCorroborators : []);
  const text = getMarketMapDiagnosticText(row);
  const sources = getMarketMapDiagnosticSources(row);
  const hasH4Fvg = /h4_fvg|h4\s*fvg|4h\s*fvg/.test(text);
  const hasH4Ifvg = /h4_ifvg|4h\s*ifvg|\bifvg\b|recent\s*broken\s*fvg/.test(text);
  const h4Only = sources.length > 0 && sources.every((source)=>/\bh4\b|\b4h\b|h4_|4h\s*/.test(`${source.source || ""} ${source.label || ""}`.toLowerCase()));
  if(hasH4Fvg && eligible.has("H4 FVG proximity")) return { label: row?.label || null, duplicateWith: "H4 FVG proximity", risk: "h4_fvg", reason: "Market Map row references H4 FVG context already eligible separately." };
  if(hasH4Ifvg && eligible.has("H4 IFVG context")) return { label: row?.label || null, duplicateWith: "H4 IFVG context", risk: "h4_ifvg", reason: "Market Map row references H4 IFVG/recent broken FVG context already eligible separately." };
  if(h4Only || hasH4Fvg || hasH4Ifvg) return { label: row?.label || null, duplicateWith: null, risk: hasH4Ifvg ? "h4_ifvg" : hasH4Fvg ? "h4_fvg" : "h4_only", reason: "Market Map row is H4-only or references H4 liquidity context; avoid double counting." };
  return { label: row?.label || null, duplicateWith: null, risk: "none", reason: "No H4 duplicate risk detected." };
}
function buildMarketMapDistanceSummary(row, input){
  const contextPriceReference = input.contextPriceReference || {};
  const contextBuffer = input.contextBuffer || {};
  const buffer = Number(contextBuffer.buffer);
  const distanceAbs = Number(row?.distanceAbs);
  const relation = row?.relation || null;
  const insideBuffer = ["inside", "near"].includes(relation) || (Number.isFinite(distanceAbs) && Number.isFinite(buffer) && distanceAbs <= buffer);
  return {
    label: row?.label || null,
    relation,
    distanceAbs: Number.isFinite(distanceAbs) ? distanceAbs : null,
    distancePct: Number.isFinite(Number(row?.distancePct)) ? Number(row.distancePct) : null,
    buffer: Number.isFinite(buffer) ? buffer : null,
    insideBuffer,
    bufferMethod: contextBuffer.method || null,
    referencePrice: contextPriceReference.primaryPrice ?? null,
    referenceType: contextPriceReference.referenceType || null,
  };
}
function buildMarketMapNearnessGap(input = {}){
  const nearby = Array.isArray(input.nearbyMarketMapZones) ? input.nearbyMarketMapZones : [];
  const nearest = input.nearestMarketMapZone?.found ? input.nearestMarketMapZone : null;
  const contextPriceReference = input.contextPriceReference || {};
  const contextBuffer = input.contextBuffer || {};
  const referencePrice = Number(contextPriceReference.primaryPrice);
  const buffer = Number(contextBuffer.buffer);
  const nearestDistanceAbs = Number(nearest?.distanceAbs);
  const nearestDistancePct = Number(nearest?.distancePct);
  const hasValidReference = Number.isFinite(referencePrice) && referencePrice > 0 && Number.isFinite(buffer) && buffer >= 0;
  const nearestFound = !!nearest;
  const nearbyCount = nearby.length;
  const insideBuffer = nearestFound && hasValidReference && Number.isFinite(nearestDistanceAbs) && nearestDistanceAbs <= buffer;
  const gapToBufferAbs = nearestFound && hasValidReference && Number.isFinite(nearestDistanceAbs)
    ? Math.max(0, nearestDistanceAbs - buffer)
    : null;
  const gapToBufferPct = Number.isFinite(gapToBufferAbs) && Number.isFinite(referencePrice) && referencePrice > 0
    ? gapToBufferAbs / referencePrice * 100
    : null;
  let status = "no-market-map-zone";
  let reason = "No Market Map zone found.";
  if(!hasValidReference){
    status = "invalid-reference";
    reason = "Invalid reference price or buffer.";
  } else if(nearbyCount > 0){
    status = "nearby";
    reason = "At least one Market Map zone is inside context buffer.";
  } else if(nearestFound){
    status = "nearest-outside-buffer";
    reason = "Nearest Market Map zone is outside context buffer.";
  }
  return {
    nearestFound,
    nearbyCount,
    referencePrice: Number.isFinite(referencePrice) ? referencePrice : null,
    referenceType: contextPriceReference.referenceType || null,
    buffer: Number.isFinite(buffer) ? buffer : null,
    bufferMethod: contextBuffer.method || null,
    nearestLabel: nearest?.label || nearest?.zone?.label || null,
    nearestLower: nearest?.lower ?? nearest?.zone?.lower ?? null,
    nearestUpper: nearest?.upper ?? nearest?.zone?.upper ?? null,
    nearestRelation: nearest?.relation || null,
    nearestDistanceAbs: Number.isFinite(nearestDistanceAbs) ? nearestDistanceAbs : null,
    nearestDistancePct: Number.isFinite(nearestDistancePct) ? nearestDistancePct : null,
    insideBuffer,
    gapToBufferAbs,
    gapToBufferPct,
    needsCloserBy: gapToBufferAbs,
    status,
    reason,
  };
}
function buildMarketMapContextDiagnostics(input = {}){
  const nearby = Array.isArray(input.nearbyMarketMapZones) ? input.nearbyMarketMapZones : [];
  const nearest = input.nearestMarketMapZone?.found ? input.nearestMarketMapZone : null;
  const rows = [
    ...nearby.map((row)=>({ ...row, diagnosticScope: "nearby" })),
    ...(nearest ? [{ ...nearest.zone, ...nearest, diagnosticScope: "nearest" }] : []),
  ];
  const warnings = [];
  const skipped = [];
  if(!nearby.length) skipped.push("No nearby Market Map zones inside context buffer.");
  if(!nearest) skipped.push("No nearest Market Map zone available.");
  const sourceBreakdown = rows.map((row)=>summarizeMarketMapDiagnosticSource(row));
  const duplicateRisk = rows.map((row)=>buildMarketMapDuplicateRisk(row, input.eligibleContextCorroborators));
  const directionInference = rows.map((row)=>inferMarketMapDiagnosticDirection(row, input.episode));
  const distanceSummary = rows.map((row)=>buildMarketMapDistanceSummary(row, input));
  const nearnessGap = buildMarketMapNearnessGap({
    nearbyMarketMapZones: nearby,
    nearestMarketMapZone: input.nearestMarketMapZone,
    contextPriceReference: input.contextPriceReference,
    contextBuffer: input.contextBuffer,
  });
  const futureCandidateCount = sourceBreakdown.filter((item, index)=>item.hasHtfSource && item.multiSource && duplicateRisk[index]?.risk === "none").length;
  const duplicateRiskCount = duplicateRisk.filter((item)=>item.risk && item.risk !== "none").length;
  if(directionInference.some((item)=>item.alignment === "conflict")) warnings.push("Market Map direction conflict observed; diagnostics only.");
  if(duplicateRiskCount) warnings.push("Market Map duplicate H4 source risk observed; diagnostics only.");
  return {
    sourceBreakdown,
    duplicateRisk,
    directionInference,
    distanceSummary,
    nearnessGap,
    eligiblePreview: {
      wouldBeEligible: false,
      reason: "Market Map remains diagnostics-only in Phase 2D4A2",
      futureCandidateCount,
      duplicateRiskCount,
      nearbyCount: nearby.length,
      nearestFound: !!nearest,
    },
    warnings: [...new Set(warnings)],
    skipped: [...new Set(skipped)],
  };
}

function buildH4LiquidityContextCorroborators(input = {}){
  const episode = input.episode || null;
  const closedCandles = Array.isArray(input.closedCandles) ? input.closedCandles : [];
  const bufferState = getLiquidityContextBuffer(episode, closedCandles);
  const priceReference = getLiquidityPriceReference(episode);
  const nearbyMarketMapZones = findNearbyMarketMapZones(episode, input.mapState, { bufferState, closedCandles, maxRows: 5 });
  const nearbyH4Fvgs = findNearbyH4FvgZones(episode, input.h4State?.fvgDetails, { bufferState, closedCandles, maxRows: 5 });
  const nearbyH4Ifvgs = findNearbyH4IfvgZones(episode, input.h4State, { bufferState, closedCandles, maxRows: 5 });
  const structureAlignment = classifyH4StructureAlignment(episode, input.h4State, { structureStatus: input.structureStatus, closedCandles });
  const nearestDiagnostics = buildNearestLiquidityContextDiagnostics({ episode, closedCandles, mapState: input.mapState, h4State: input.h4State });
  const marketMapDiagnostics = buildMarketMapContextDiagnostics({
    episode,
    nearbyMarketMapZones,
    nearestMarketMapZone: nearestDiagnostics.nearestMarketMapZone,
    contextPriceReference: nearestDiagnostics.contextPriceReference,
    contextBuffer: nearestDiagnostics.contextBuffer,
    eligibleContextCorroborators: input.eligibleContextCorroborators,
  });
  const contextCorroborators = [];
  const contextWarnings = [];
  const contextBlockers = [];
  if(nearbyMarketMapZones.length) contextCorroborators.push("Nearby Market Map context");
  if(nearbyH4Fvgs.some((zone)=>zone.sameDirection)) contextCorroborators.push("Nearby same-direction H4 FVG context");
  if(nearbyH4Fvgs.some((zone)=>zone.sameDirection === false)) contextWarnings.push("Nearby opposite-direction H4 FVG context observed.");
  const supportiveIfvgs = nearbyH4Ifvgs.filter((zone)=>zone.sameDirection && [IFVG_STATE.CONFIRMED, IFVG_STATE.VALID].includes(zone.ifvgState));
  if(supportiveIfvgs.length) contextCorroborators.push("Nearby same-direction H4 IFVG context");
  if(nearbyH4Ifvgs.some((zone)=>zone.sameDirection === false)) contextWarnings.push("Nearby opposite-direction H4 IFVG context observed.");
  if(nearbyH4Ifvgs.some((zone)=>[IFVG_STATE.FAILED].includes(zone.ifvgState) || zone.status === "Failed")) contextWarnings.push("Nearby failed H4 IFVG context observed.");
  if(structureAlignment.alignment === "conflict") contextWarnings.push("4H structure context conflict observed.");
  else if(structureAlignment.source && structureAlignment.episodeAligned === false) contextWarnings.push("4H structure context is not episode-aligned.");
  return {
    contextCorroborators: [...new Set(contextCorroborators)],
    contextWarnings: [...new Set(contextWarnings)],
    contextBlockers,
    nearbyMarketMapZones,
    nearbyH4Fvgs,
    nearbyH4Ifvgs,
    structureAlignment,
    nearestMarketMapZone: nearestDiagnostics.nearestMarketMapZone,
    nearestH4Fvg: nearestDiagnostics.nearestH4Fvg,
    nearestH4Ifvg: nearestDiagnostics.nearestH4Ifvg,
    contextPriceReference: nearestDiagnostics.contextPriceReference,
    contextBuffer: nearestDiagnostics.contextBuffer,
    marketMapDiagnostics,
    diagnostics: {
      priceReference,
      buffer: bufferState.buffer,
      bufferMethod: bufferState.method,
      bufferFallbackUsed: bufferState.fallbackUsed,
    },
  };
}
function buildH4LiquidityOrderflowState(input = {}){
  const startedAt = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
  const closedCandles = getClosedOrderflowCandles(input.candles);
  const dataWarnings = [];
  if(!closedCandles.length) dataWarnings.push(createLiquidityDiagnosticWarning("No closed H4 candles available."));
  dataWarnings.push(createLiquidityDiagnosticWarning("Market Map context not used as primary sweep level in Phase 2C1."));
  const candidateLevels = buildLiquidityCandidateLevels(closedCandles, input.srSummary, null, { maxCandidates: 20 });
  const primaryCandidates = candidateLevels.filter((level)=>level?.source !== "marketMap").slice(0, 20);
  if(!primaryCandidates.length) dataWarnings.push(createLiquidityDiagnosticWarning("No H4 liquidity candidate levels available."));
  const sweep = detectH4LiquiditySweepEpisode(closedCandles, primaryCandidates, input.options || {});
  const base = createEmptyLiquidityOrderflowState("4H", "context", input.reason || "No possible H4 liquidity sweep detected.");
  base.lastUpdated = Date.now();
  const buildDiagnostics = ({ warnings = dataWarnings, barsAfterSweep = null, reclaimWindowRemaining = null, confirmationWindowBars = null, deepBreachPct = null, scoreComponents = [], contextCorroborators = [], contextWarnings = [], contextBlockers = [], nearbyMarketMapZones = [], nearbyH4Fvgs = [], nearbyH4Ifvgs = [], structureAlignment = null, contextPriceReference = null, contextBuffer = null, nearestMarketMapZone = null, nearestH4Fvg = null, nearestH4Ifvg = null, marketMapDiagnostics = null, contextGateEligibleCorroborators = [], contextGateSkipped = [], contextGateWarnings = [], failureBoundary = null, failureScanStartIndex = null, failureBarsChecked = 0, confirmationCorroborators = [], confirmationBlockers = [], confirmationAt = null, confirmationIndex = null } = {})=>{
    const endedAt = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
    return {
      closedBarsUsed: closedCandles.length,
      candidateLevelsScanned: primaryCandidates.length,
      latencyMs: Math.max(0, endedAt - startedAt),
      dataWarnings: warnings,
      barsAfterSweep,
      reclaimWindowRemaining,
      confirmationWindowBars,
      deepBreachPct,
      scoreComponents,
      contextCorroborators,
      contextWarnings,
      contextBlockers,
      nearbyMarketMapZones,
      nearbyH4Fvgs,
      nearbyH4Ifvgs,
      structureAlignment,
      contextPriceReference,
      contextBuffer,
      nearestMarketMapZone,
      marketMapDiagnostics,
      nearestH4Fvg,
      nearestH4Ifvg,
      contextGateEligibleCorroborators,
      contextGateSkipped,
      contextGateWarnings,
      failureBoundary,
      failureScanStartIndex,
      failureBarsChecked,
      confirmationCorroborators,
      confirmationBlockers,
      confirmationAt,
      confirmationIndex,
    };
  };
  if(!sweep){
    base.diagnostics = buildDiagnostics({ warnings: [...dataWarnings, createLiquidityDiagnosticWarning("No possible H4 liquidity sweep detected.")] });
    return base;
  }
  const anchorTime = getOrderflowCandleTime(sweep.candle);
  const sweepType = sweep.sweepType;
  const levelType = sweep.level?.type || null;
  const excursionAtr = Number.isFinite(Number(sweep.buffer?.averageRange)) && Number(sweep.buffer.averageRange) > 0 ? sweep.excursion / Number(sweep.buffer.averageRange) : null;
  const reclaim = classifyH4LiquidityReclaim(closedCandles, sweep, { maxBars: 3 });
  const avwap = buildH4LiquidityAvwapState(closedCandles, sweep, reclaim);
  const volume = reclaim.detected ? calculateLiquidityVolumeStatus(closedCandles, reclaim.candleIndex, 20) : base.activeEpisode.volume;
  const isValid = reclaim.detected && [LIQUIDITY_RECLAIM_STATUS.SAME_BAR, LIQUIDITY_RECLAIM_STATUS.NEXT_BAR, LIQUIDITY_RECLAIM_STATUS.LATE].includes(reclaim.status);
  const avwapSupportsContext = avwap.available && isCorrectLiquidityAvwapSide(sweepType, avwap.side);
  const episode = {
    ...base.activeEpisode,
    episodeId: createH4LiquidityEpisodeId(sweepType, levelType, sweep.levelPrice, anchorTime),
    status: isValid ? LIQUIDITY_OF_STATE.VALID : LIQUIDITY_OF_STATE.POSSIBLE,
    stale: false,
    displayStatus: isValid ? "Valid H4 liquidity sweep reaction" : (reclaim.status === LIQUIDITY_RECLAIM_STATUS.MISSED ? "Possible liquidity sweep detected; reclaim not confirmed" : "Possible liquidity sweep detected"),
    sweep: {
      ...base.activeEpisode.sweep,
      detected: true,
      type: sweepType,
      levelType,
      levelPrice: sweep.levelPrice,
      breachPrice: sweep.breachPrice,
      breachBuffer: sweep.breachBuffer,
      excursionAtr,
      anchorTime,
      anchorIndex: sweep.candleIndex,
      anchorMethod: "sweepCandle",
      mergeCount: 0,
    },
    reclaim,
    avwap,
    volume,
  };
  const staleState = classifyH4LiquidityStale(episode, closedCandles, { reclaimWindowBars: 3, possibleWindowBars: 12, validWindowBars: 24 });
  const deepBreachWarning = getH4LiquidityDeepBreachWarning(episode);
  const scoreState = scoreH4LiquidityEpisode(episode, { deepBreachWarning }, { penalizeDeepBreach: true });
  const reasons = isValid
    ? [
      "Close reclaim/reject confirmed on closed H4 candle.",
      avwap.available ? "Anchored VWAP context calculated from sweep candle." : "AVWAP unavailable due to missing volume.",
      avwapSupportsContext ? "AVWAP side supports reaction context." : "AVWAP side has not confirmed control.",
      ...scoreState.reasons,
      ...(staleState.stale && staleState.reason ? [staleState.reason] : []),
    ]
    : [
      "Possible H4 liquidity sweep detected on closed candle.",
      reclaim.status === LIQUIDITY_RECLAIM_STATUS.MISSED ? "Reclaim/reject was not confirmed within the initial H4 window." : "Waiting for reclaim/reject confirmation.",
      ...(deepBreachWarning.triggered && deepBreachWarning.reason ? [deepBreachWarning.reason] : []),
      ...(staleState.stale && staleState.reason ? [staleState.reason] : []),
    ];
  const activeEpisode = {
    ...episode,
    stale: staleState.stale,
    band: scoreState.band,
    score: scoreState.score,
    reasons,
  };
  const failure = detectH4LiquidityFailure(closedCandles, activeEpisode);
  const failedEpisode = failure.detected
    ? {
      ...activeEpisode,
      status: LIQUIDITY_OF_STATE.FAILED,
      stale: false,
      displayStatus: "H4 liquidity sweep reaction failed",
      band: LIQUIDITY_BAND.WEAK,
      score: 0,
      reasons: [
        ...(activeEpisode.reasons || []),
        failure.reason || "Failure detected after H4 close invalidated swept liquidity level.",
      ],
      failure: {
        detected: true,
        at: failure.at,
        price: failure.price,
        reason: failure.reason,
        priorStateBeforeFailure: failure.priorStateBeforeFailure,
      },
    }
    : activeEpisode;
  const contextState = buildH4LiquidityContextCorroborators({
    episode: activeEpisode,
    closedCandles,
    mapState: marketPreparationState.map,
    h4State: marketPreparationState.h4,
    structureStatus: input.structureStatus,
  });
  const contextGate = getH4LiquidityEligibleContextCorroborators(contextState);
  const confirmation = failure.detected
    ? { confirmed: false, reasons: [], blockers: ["failure detected"], corroborators: [], confirmationAt: null, confirmationIndex: null }
    : shouldConfirmH4LiquidityEpisode(failedEpisode, { closedCandles, eligibleContextCorroborators: contextGate.eligibleCorroborators }, { scoreThreshold: 6 });
  const marketMapDiagnostics = buildMarketMapContextDiagnostics({
    episode: activeEpisode,
    nearbyMarketMapZones: contextState.nearbyMarketMapZones,
    nearestMarketMapZone: contextState.nearestMarketMapZone,
    contextPriceReference: contextState.contextPriceReference,
    contextBuffer: contextState.contextBuffer,
    eligibleContextCorroborators: contextGate.eligibleCorroborators,
  });
  const finalEpisode = confirmation.confirmed
    ? {
      ...failedEpisode,
      status: LIQUIDITY_OF_STATE.CONFIRMED,
      stale: false,
      displayStatus: "H4 liquidity sweep reaction confirmed",
      reasons: [...new Set([
        ...(failedEpisode.reasons || []),
        ...confirmation.reasons,
      ])],
    }
    : failedEpisode;
  const diagnostics = buildDiagnostics({
    barsAfterSweep: staleState.barsAfterSweep,
    reclaimWindowRemaining: staleState.reclaimWindowRemaining,
    confirmationWindowBars: staleState.confirmationWindowBars,
    deepBreachPct: deepBreachWarning.deepBreachPct,
    scoreComponents: scoreState.components,
    contextCorroborators: contextState.contextCorroborators,
    contextWarnings: contextState.contextWarnings,
    contextBlockers: contextState.contextBlockers,
    nearbyMarketMapZones: contextState.nearbyMarketMapZones,
    nearbyH4Fvgs: contextState.nearbyH4Fvgs,
    nearbyH4Ifvgs: contextState.nearbyH4Ifvgs,
    structureAlignment: contextState.structureAlignment,
    contextPriceReference: contextState.contextPriceReference,
    contextBuffer: contextState.contextBuffer,
    nearestMarketMapZone: contextState.nearestMarketMapZone,
    marketMapDiagnostics,
    nearestH4Fvg: contextState.nearestH4Fvg,
    nearestH4Ifvg: contextState.nearestH4Ifvg,
    contextGateEligibleCorroborators: contextGate.eligibleCorroborators,
    contextGateSkipped: contextGate.skipped,
    contextGateWarnings: contextGate.warnings,
    failureBoundary: failure.boundary,
    failureScanStartIndex: failure.scanStartIndex,
    failureBarsChecked: failure.barsChecked,
    confirmationCorroborators: confirmation.corroborators,
    confirmationBlockers: confirmation.blockers,
    confirmationAt: confirmation.confirmationAt,
    confirmationIndex: confirmation.confirmationIndex,
  });
  return {
    ...base,
    activeEpisode: finalEpisode,
    recentCompleted: [],
    diagnostics,
  };
}
function createEmptyRecentFvgReactionMemory(){
  return { lastTouchedFvg: null, lastMitigatedFvg: null, lastCeTouchedFvg: null, lastFilledFvg: null, lastBrokenFvg: null, latestReaction: null, updatedAt: null };
}
function createEmptyRecentBrokenFvgDetails(timeframe, limit = getRecentBrokenFvgLimit(timeframe)){
  return { bullish: null, bearish: null, all: [], meta: { timeframe: timeframe || null, limit, updatedAt: null } };
}
function getRecentBrokenFvgLimit(timeframe){
  const tf = String(timeframe || "").toLowerCase();
  if(tf.includes("week")) return 4;
  if(tf.includes("daily") || tf === "1d") return 6;
  if(tf.includes("4h")) return 10;
  return 6;
}
function getRecentBrokenFvgSortValue(detail){
  const broken = detail?.brokenAt;
  const numeric = Number(broken);
  if(Number.isFinite(numeric)) return numeric;
  const parsed = Date.parse(String(broken || ""));
  if(Number.isFinite(parsed)) return parsed;
  const idx = Number(detail?.sourceZone?.index ?? detail?.index);
  if(Number.isFinite(idx)) return idx;
  return 0;
}
function isRecentBrokenFvgDetail(detail){
  return detail?.detailStatus === "Broken"
    && detail?.brokenAt !== null
    && detail?.brokenAt !== undefined
    && detail?.ifvg?.breakEvent?.method === "close";
}
function selectLatestBrokenFvgByDirection(details, direction){
  return (details || []).find((detail)=>detail?.direction === direction) || null;
}
function buildRecentBrokenFvgDetails(details, timeframe, limit = getRecentBrokenFvgLimit(timeframe)){
  if(!Array.isArray(details) || !details.length) return createEmptyRecentBrokenFvgDetails(timeframe, limit);
  const broken = details
    .filter(isRecentBrokenFvgDetail)
    .sort((a,b)=>getRecentBrokenFvgSortValue(b) - getRecentBrokenFvgSortValue(a) || String(b?.key || "").localeCompare(String(a?.key || "")))
    .slice(0, limit);
  return {
    bullish: selectLatestBrokenFvgByDirection(broken, "bullish"),
    bearish: selectLatestBrokenFvgByDirection(broken, "bearish"),
    all: broken,
    meta: { timeframe: timeframe || null, limit, updatedAt: Date.now() },
  };
}
function createEmptyFvgConflictState(reason = "No FVG direction conflict detected."){
  return { ok: false, label: null, severity: null, htfDirection: null, ltfDirection: null, parentTimeframe: null, conflictTimeframes: [], reason, suggestedAction: null, updatedAt: Date.now() };
}
function createEmptyFvgQualityState(reason = "FVG quality unavailable."){
  return { ok: false, label: "Unavailable", score: 0, maxScore: 10, direction: null, timeframeScope: null, factors: [], penalties: [], override: null, reason, updatedAt: Date.now() };
}
function createEmptyFvgTimingZone(reason = "1H timing data is unavailable."){
  return { ok: false, timeframe: "1H", direction: null, timingStatus: "Unavailable", sweep: null, structure: null, stochastic: null, relatedZone: null, supportsHighProbability: false, reason, updatedAt: Date.now() };
}
function createEmptyTradePlanScenario(reason = "No trade scenario is available yet."){
  return { ok: false, primaryStatus: TRADE_SCENARIO_STATUS.NO_TRADE, primarySide: "neutral", reason, caution: [], buyScenario: null, sellScenario: null, selectedScenario: null, updatedAt: Date.now(), disclaimer: TRADE_SCENARIO_DISCLAIMER };
}
function createEmptyFvgMtfContext(reason = "No active overlapping Weekly/Daily/4H FVG cluster."){
  return { ok: false, direction: null, relation: "No clear MTF FVG overlap", parentZone: null, activeZone: null, reactionZone: null, timingZone: createEmptyFvgTimingZone(), overlapZone: null, coreZone: null, precisionZone: null, sources: [], conflictReason: null, conflict: createEmptyFvgConflictState(), qualityHint: null, reason, updatedAt: Date.now() };
}
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
  applyLayerPreset(chartKey, "default");
}
function getLayerPreset(chartKey, presetName){
  if(!DEFAULT_CHART_LAYER_STATE?.[chartKey]) return null;
  const normalized = String(presetName || "default").toLowerCase();
  if(normalized === "default") return { ...DEFAULT_CHART_LAYER_STATE[chartKey] };
  if(normalized === "full") return Object.fromEntries(Object.keys(DEFAULT_CHART_LAYER_STATE[chartKey]).map((key)=>[key, true]));
  return CHART_LAYER_PRESETS?.[normalized]?.[chartKey] ? { ...DEFAULT_CHART_LAYER_STATE[chartKey], ...CHART_LAYER_PRESETS[normalized][chartKey] } : null;
}
function applyLayerPreset(chartKey, presetName){
  const preset = getLayerPreset(chartKey, presetName);
  if(!preset) return;
  if(!chartLayerState) chartLayerState = loadChartLayerState();
  chartLayerState[chartKey] = { ...DEFAULT_CHART_LAYER_STATE[chartKey], ...preset };
  saveChartLayerState();
  updateLayerControlChecklist(chartKey);
  applyChartLayerVisibility(chartKey);
}
function applyLayerPresetToAll(presetName){
  if(!chartLayerState) chartLayerState = loadChartLayerState();
  Object.keys(DEFAULT_CHART_LAYER_STATE).forEach((chartKey)=>{
    const preset = getLayerPreset(chartKey, presetName);
    if(preset) chartLayerState[chartKey] = { ...DEFAULT_CHART_LAYER_STATE[chartKey], ...preset };
  });
  saveChartLayerState();
  updateAllLayerControlChecklists();
  applyAllChartLayerVisibility();
  closeChartLayerMenus();
}
function resetAllChartLayers(){ applyLayerPresetToAll("default"); }
function renderLayerPresetButtons(chartKey){
  const menu = getLayerMenu(chartKey);
  if(!menu || menu.querySelector(".layer-preset-section")) return;
  const section = document.createElement("div");
  section.className = "layer-preset-section";
  section.innerHTML = '<span class="layer-preset-label">Preset:</span><div class="layer-preset-actions"><button type="button" data-layer-preset="default">Default</button><button type="button" data-layer-preset="clean">Clean</button><button type="button" data-layer-preset="full">Full</button><button type="button" data-layer-preset="manual">Manual</button><button type="button" data-layer-preset="preparation">Prep</button></div>';
  section.querySelectorAll("[data-layer-preset]").forEach((btn)=>{
    btn.addEventListener("click", ()=>applyLayerPreset(chartKey, btn.dataset.layerPreset));
  });
  menu.prepend(section);
}
function updateLayerControlChecklist(chartKey){
  const selector = chartKey ? `[data-chart-key="${chartKey}"][data-layer-key]` : '[data-chart-key][data-layer-key]';
  document.querySelectorAll(selector).forEach((input)=>{
    input.checked = getChartLayer(input.dataset.chartKey, input.dataset.layerKey);
  });
}
function updateAllLayerControlChecklists(){ updateLayerControlChecklist(); }
function syncChartLayerControls(){ updateAllLayerControlChecklists(); }
function getLayerMenu(chartKey){ return { weekly: els.weeklyLayerMenu, daily: els.dailyLayerMenu, h4: els.h4LayerMenu, h1: els.h1LayerMenu, global: els.globalLayerMenu }[chartKey] || null; }
function getLayerToggleButton(chartKey){ return { weekly: els.weeklyLayerToggleBtn, daily: els.dailyLayerToggleBtn, h4: els.h4LayerToggleBtn, h1: els.h1LayerToggleBtn, global: els.globalLayerToggleBtn }[chartKey] || null; }
function setLayerMenuOpen(chartKey, open){
  const menu = getLayerMenu(chartKey);
  const btn = getLayerToggleButton(chartKey);
  if(menu) menu.hidden = !open;
  if(btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
}
function closeChartLayerMenus(){ [...Object.keys(DEFAULT_CHART_LAYER_STATE), "global"].forEach((chartKey)=>setLayerMenuOpen(chartKey, false)); }
function toggleChartLayerMenu(chartKey){
  const menu = getLayerMenu(chartKey);
  const nextOpen = Boolean(menu?.hidden);
  closeChartLayerMenus();
  setLayerMenuOpen(chartKey, nextOpen);
}
function bindGlobalLayerControls(){
  els.globalLayerToggleBtn?.addEventListener("click", (e)=>{ e.stopPropagation(); toggleChartLayerMenu("global"); });
  els.globalLayerMenu?.addEventListener("click", (e)=>e.stopPropagation());
  document.querySelectorAll("[data-global-layer-preset]").forEach((btn)=>{
    btn.addEventListener("click", ()=>applyLayerPresetToAll(btn.dataset.globalLayerPreset));
  });
  els.resetAllLayersBtn?.addEventListener("click", resetAllChartLayers);
}
function getChartInteractionOptions(){ return chartZoomMode ? CHART_ZOOM_ON_INTERACTION_OPTIONS : CHART_ZOOM_OFF_INTERACTION_OPTIONS; }
function getActiveChartInstances(){ return [priceChart, rsiChart, ltfDailyChart, ltf4hChart, ltf1hChart].filter(Boolean); }
function applyChartZoomModeToCharts(){
  const options = getChartInteractionOptions();
  getActiveChartInstances().forEach((chart)=>{ try { chart.applyOptions(options); } catch(_){} });
}
function updateChartZoomToggleUI(){
  if(!els.chartZoomToggleBtn) return;
  els.chartZoomToggleBtn.textContent = chartZoomMode ? "Chart Interaction: ON" : "Chart Interaction: OFF";
  els.chartZoomToggleBtn.title = "Mouse wheel scrolls the page; use drag, axis drag, or pinch for chart interaction.";
  els.chartZoomToggleBtn.setAttribute("aria-label", `Chart interaction ${chartZoomMode ? "on" : "off"}. Mouse wheel scrolls the page; use drag, axis drag, or pinch for chart interaction.`);
  els.chartZoomToggleBtn.classList.toggle("is-active", chartZoomMode);
  els.chartZoomToggleBtn.setAttribute("aria-pressed", String(chartZoomMode));
}
function setChartZoomMode(enabled){
  chartZoomMode = Boolean(enabled);
  applyChartZoomModeToCharts();
  updateChartZoomToggleUI();
}
function bindChartZoomToggle(){
  updateChartZoomToggleUI();
  els.chartZoomToggleBtn?.addEventListener("click", ()=>setChartZoomMode(!chartZoomMode));
}
function bindChartLayerControls(){
  Object.keys(DEFAULT_CHART_LAYER_STATE).forEach(renderLayerPresetButtons);
  [[els.weeklyLayerToggleBtn,"weekly"],[els.dailyLayerToggleBtn,"daily"],[els.h4LayerToggleBtn,"h4"],[els.h1LayerToggleBtn,"h1"]].forEach(([btn, chartKey])=>{
    btn?.addEventListener("click", (e)=>{ e.stopPropagation(); toggleChartLayerMenu(chartKey); });
  });
  [els.weeklyLayerMenu, els.dailyLayerMenu, els.h4LayerMenu, els.h1LayerMenu].forEach((menu)=>{
    menu?.addEventListener("click", (e)=>e.stopPropagation());
  });
  document.querySelectorAll('[data-chart-key][data-layer-key]').forEach((input)=>{
    input.addEventListener("change", ()=>setChartLayer(input.dataset.chartKey, input.dataset.layerKey, input.checked));
  });
  document.querySelectorAll('[data-layer-reset]').forEach((btn)=>{
    btn.addEventListener("click", ()=>resetChartLayers(btn.dataset.layerReset));
  });
  bindGlobalLayerControls();
  document.addEventListener("click", closeChartLayerMenus);
  syncChartLayerControls();
  applyAllChartLayerVisibility();
}
function clearManualLineHandles(chartKey){
  const series = chartKey === "weekly" ? candleSeries : ltf4hSeries;
  (manualLineHandles[chartKey] || []).forEach((h)=>{ try { series?.removePriceLine(h); } catch(_){} });
  manualLineHandles[chartKey] = [];
}
function applyWeeklyLayerVisibility(){
  if(getChartLayer("weekly", "fvg")){
    if(activeFvgZonesForOverlay.length && !fvgOverlayLines.length) renderFvgOverlay(activeFvgZonesForOverlay, weeklyDatasetCache || []);
    else renderFvgFilledOverlay();
  } else clearFvgOverlay();
  if(getChartLayer("weekly", "sr")){ if(weeklySrSummaryForOverlay) renderWeeklySrOverlay(weeklySrSummaryForOverlay, weeklyDatasetCache || []); }
  else clearWeeklySrOverlay();
  if(getChartLayer("weekly", "manualLines")) applyManualLinesToWeeklyChart();
  else clearManualLineHandles("weekly");
  if(getChartLayer("weekly", "trendlines")) renderTrendlinesForChart("weekly");
  else clearTrendlineOverlay("weekly");
  if(els.weeklyRsiCard) els.weeklyRsiCard.hidden = !getChartLayer("weekly", "rsiPanel");
}
function applyDailyLayerVisibility(){
  if(getChartLayer("daily", "fvg")) scheduleDailyFvgOverlayRedraw();
  else clearDailyFvgOverlay();
  if(getChartLayer("daily", "sr")) scheduleDailySrOverlayRedraw();
  else clearDailySrOverlay();
  if(els.lowerDailyPatternSummary) els.lowerDailyPatternSummary.hidden = !getChartLayer("daily", "patternSummary");
  if(getChartLayer("daily", "patternLines")) renderDailyPatternOverlay();
  else clearDailyPatternOverlay();
}
function applyH4LayerVisibility(){
  if(getChartLayer("h4", "fvg")) schedule4hFvgOverlayRedraw(latest4hCandles);
  else clear4hFvgOverlay();
  if(getChartLayer("h4", "sr")) schedule4hSrOverlayRedraw(latest4hCandles);
  else clear4hSrOverlay();
  if(getChartLayer("h4", "manualLines")) applyManualLinesTo4hChart();
  else clearManualLineHandles("h4");
  if(getChartLayer("h4", "trendlines")) renderTrendlinesForChart("h4");
  else clearTrendlineOverlay("h4");
}
function set1hMarkers(markers){
  const safeMarkers = Array.isArray(markers) ? markers : [];
  if(typeof ltf1hSeries?.setMarkers === 'function') ltf1hSeries.setMarkers(safeMarkers);
  else if(typeof ltf1hSeries?.createSeriesMarkers === 'function') ltf1hSeries.createSeriesMarkers(safeMarkers);
}
function applyH1LayerVisibility(){
  if(ltf1hSeries) render1hEventMarkers(latest1hCandles);
  document.querySelectorAll('.h1-stochastic-layer').forEach((el)=>{ el.hidden = !getChartLayer("h1", "stochasticText"); });
}
function applyChartLayerVisibility(chartKey){
  if(chartKey === "weekly") applyWeeklyLayerVisibility();
  else if(chartKey === "daily") applyDailyLayerVisibility();
  else if(chartKey === "h4") applyH4LayerVisibility();
  else if(chartKey === "h1") applyH1LayerVisibility();
}
function applyAllChartLayerVisibility(){ applyWeeklyLayerVisibility(); applyDailyLayerVisibility(); applyH4LayerVisibility(); applyH1LayerVisibility(); }
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
  if((chartKey === "weekly" || chartKey === "h4") && !getChartLayer(chartKey, "manualLines")) return;
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
    if((chartKey === "weekly" || chartKey === "h4") && !getChartLayer(chartKey, "trendlines")){ clearTrendlineOverlay(chartKey); return; }
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
function getConfluenceSourceList(row){
  return Array.isArray(row?.sources) && row.sources.length ? row.sources : [row].filter(Boolean);
}
function getDisplaySourcePriority(source){
  const key = String(source?.source || source?.primarySource || "").toLowerCase();
  const label = String(source?.label || "").toLowerCase();
  const text = `${key} ${label}`;
  if(key === "weekly_fvg" || (text.includes("weekly") && text.includes("fvg")) || (text.includes("w ") && text.includes("fvg"))) return 100;
  if(key === "weekly_sr" || text.includes("w support") || text.includes("w resistance") || text.includes("weekly support") || text.includes("weekly resistance")) return 95;
  if(key === "daily_fvg" || (text.includes("daily") && text.includes("fvg"))) return 90;
  if(key === "daily_sr" || text.includes("daily support") || text.includes("daily resistance")) return 85;
  if(key === "h4_fvg" || key === "4h_fvg" || (text.includes("4h") && text.includes("fvg"))) return 80;
  if(key === "h4_sr" || key === "4h_sr" || text.includes("4h support") || text.includes("4h resistance")) return 75;
  if(key.includes("daily_pattern") || text.includes("channel") || text.includes("range boundary")) return 70;
  if(text.includes("manual")) return 60;
  return 0;
}
function rankConfluenceSources(sources){
  return [...(sources || [])].sort((a,b)=>
    (getDisplaySourcePriority(b)-getDisplaySourcePriority(a))
    || ((Number(b.priorityScore)||0)-(Number(a.priorityScore)||0))
    || ((a.distancePct ?? 999)-(b.distancePct ?? 999))
  );
}
function formatSourceLabel(source){ return source?.label || source?.source || "Source"; }
function formatConfluenceSources(row, maxDisplay = 3){
  const labels = [...new Set(rankConfluenceSources(getConfluenceSourceList(row)).map(formatSourceLabel).filter(Boolean))];
  if(!labels.length) return row?.quality || row?.label || "—";
  const shown = labels.slice(0, maxDisplay);
  const more = labels.length - shown.length;
  return more > 0 ? `${shown.join(" + ")} + ${more} more` : shown.join(" + ");
}
function isFvgMapSource(source){
  const key = String(source?.source || source?.primarySource || "").toLowerCase();
  const label = String(source?.label || source?.type || source?.quality || "").toLowerCase();
  return key.includes("fvg") || label.includes("fvg");
}
function isFvgMapRow(row){ return getConfluenceSourceList(row).some(isFvgMapSource); }
function getMapSourceTimeframe(source){
  const text = `${source?.source || ""} ${source?.primarySource || ""} ${source?.label || ""}`.toLowerCase();
  if(text.includes("weekly") || text.includes("weekly_fvg") || /^w\b/.test(text)) return "Weekly";
  if(text.includes("daily") || text.includes("daily_fvg") || text.includes("1d")) return "Daily";
  if(text.includes("4h") || text.includes("h4")) return "4H";
  return null;
}
function getMapSourceDirection(source){
  const direction = getFvgDirection(source);
  if(direction) return direction;
  const text = `${source?.label || ""} ${source?.type || ""} ${source?.quality || ""}`.toLowerCase();
  if(text.includes("bullish")) return "bullish";
  if(text.includes("bearish")) return "bearish";
  return null;
}
function getAllFvgDetailsForMapRows(){
  return [
    ...(marketPreparationState.weekly?.fvgDetails || []),
    ...(marketPreparationState.daily?.fvgDetails || []),
    ...(marketPreparationState.h4?.fvgDetails || []),
  ].filter((detail)=>getFvgDetailZone(detail));
}
function getFvgDetailsForOverlayTimeframe(timeframe, detailCandidates = null){
  const tf = String(timeframe || "").toLowerCase();
  const candidates = Array.isArray(detailCandidates) ? detailCandidates : (
    tf.includes("weekly") ? marketPreparationState.weekly?.fvgDetails
    : tf.includes("daily") ? marketPreparationState.daily?.fvgDetails
    : tf.includes("4h") || tf.includes("h4") ? marketPreparationState.h4?.fvgDetails
    : []
  );
  return (Array.isArray(candidates) ? candidates : []).filter((detail)=>getFvgDetailZone(detail));
}
function findFvgDetailForZone(zone, timeframe, detailCandidates = null){
  const zoneBounds = getFvgDetailZone(zone);
  if(!zoneBounds) return null;
  const normalizedTimeframe = timeframe || zone?.timeframe || null;
  const zoneKey = getFvgKey(zone, normalizedTimeframe);
  const zoneDirection = getFvgDirection(zone);
  const zoneCenter = (zoneBounds.lower + zoneBounds.upper) / 2;
  const candidates = getFvgDetailsForOverlayTimeframe(normalizedTimeframe, detailCandidates);
  const exact = candidates.find((detail)=>detail?.key && detail.key === zoneKey);
  if(exact) return exact;
  const nearPrice = (a, b)=>{
    const tolerance = Math.max(1, Math.abs(zoneBounds.upper - zoneBounds.lower) * 0.02, Math.abs(zoneCenter) * 0.00002);
    return Math.abs(Number(a) - Number(b)) <= tolerance;
  };
  const scored = candidates.map((detail)=>{
    const detailZone = getFvgDetailZone(detail);
    if(!detailZone) return null;
    const detailDirection = detail.direction || getFvgDirection(detail.sourceZone || detail);
    if(zoneDirection && detailDirection && zoneDirection !== detailDirection) return null;
    const lowerMatch = nearPrice(zoneBounds.lower, detailZone.lower);
    const upperMatch = nearPrice(zoneBounds.upper, detailZone.upper);
    const overlap = getZoneOverlapRatio(zoneBounds, detailZone);
    const detailCenter = (detailZone.lower + detailZone.upper) / 2;
    const centerDistance = Math.abs(zoneCenter - detailCenter);
    const timeMatch = (zone.startTime && detail.sourceZone?.startTime && zone.startTime === detail.sourceZone.startTime)
      || (zone.endTime && detail.sourceZone?.endTime && zone.endTime === detail.sourceZone.endTime);
    if((lowerMatch && upperMatch) || overlap >= 0.8 || (timeMatch && overlap >= 0.35)){
      return { detail, score: (timeMatch ? 2 : 0) + (lowerMatch && upperMatch ? 2 : 0) + overlap - (centerDistance / Math.max(1, Math.abs(zoneCenter))) };
    }
    return null;
  }).filter(Boolean).sort((a,b)=>b.score-a.score);
  return scored[0]?.detail || null;
}
function getFvgOverlayDirectionLabel(zone, detail = null){
  const direction = detail?.direction || getFvgDirection(zone);
  if(direction === "bullish") return "Bullish";
  if(direction === "bearish") return "Bearish";
  const typeText = String(zone?.type || detail?.sourceZone?.type || "FVG");
  if(/bullish/i.test(typeText)) return "Bullish";
  if(/bearish/i.test(typeText)) return "Bearish";
  return "";
}
function formatFvgOverlayLabel(zone, timeframe, detailCandidates = null){
  const detail = findFvgDetailForZone(zone, timeframe, detailCandidates);
  const directionLabel = getFvgOverlayDirectionLabel(zone, detail);
  const status = detail?.detailStatus || zone?.status || "Active";
  const tf = timeframe || detail?.timeframe || zone?.timeframe || "FVG";
  const prefix = [tf, directionLabel, "FVG"].filter(Boolean).join(" ");
  return `${prefix} · ${status}`;
}
function findFvgDetailForMapSource(source){
  if(!isFvgMapSource(source)) return null;
  const sourceZone = getFvgDetailZone(source);
  const timeframe = getMapSourceTimeframe(source);
  const direction = getMapSourceDirection(source);
  if(!sourceZone && !timeframe) return null;
  const sourceCenter = sourceZone ? ((sourceZone.lower + sourceZone.upper) / 2) : null;
  return getAllFvgDetailsForMapRows().map((detail)=>({ detail, zone:getFvgDetailZone(detail) })).filter(({detail, zone})=>{
    if(!zone) return false;
    if(timeframe && detail.timeframe !== timeframe) return false;
    const detailDirection = detail.direction || getFvgDirection(detail.sourceZone || detail);
    if(direction && detailDirection && direction !== detailDirection) return false;
    if(!sourceZone) return false;
    const overlap = getZoneOverlapRatio(sourceZone, zone);
    const distance = getFvgDistancePctFromPrice(zone, sourceCenter);
    return overlap >= 0.35 || (Number.isFinite(distance) && distance <= 0.75);
  }).sort((a,b)=>{
    const ao = sourceZone ? getZoneOverlapRatio(sourceZone, a.zone) : 0;
    const bo = sourceZone ? getZoneOverlapRatio(sourceZone, b.zone) : 0;
    const ad = sourceCenter ? getFvgDistancePctFromPrice(a.zone, sourceCenter) : 999;
    const bd = sourceCenter ? getFvgDistancePctFromPrice(b.zone, sourceCenter) : 999;
    return bo - ao || ((ad ?? 999) - (bd ?? 999));
  })[0]?.detail || null;
}
function getMapRowMatchedFvgDetails(row){
  const matched = [];
  const seen = new Set();
  getConfluenceSourceList(row).forEach((source)=>{
    const detail = findFvgDetailForMapSource(source);
    if(!detail) return;
    const key = detail.key || getFvgKey(getFvgDetailZone(detail), detail.timeframe);
    if(seen.has(key)) return;
    seen.add(key);
    matched.push(detail);
  });
  return matched;
}
function getMapRowFvgStatus(row){
  const details = getMapRowMatchedFvgDetails(row);
  if(details.length){
    const statuses = details.map((detail)=>detail.detailStatus || detail.baseStatus).filter(Boolean);
    if(statuses.includes("Broken")) return "Broken";
    if(statuses.length && statuses.every((status)=>status === "Filled")) return "Filled";
    if(statuses.includes("50% Mitigated")) return "50% Mitigated";
    if(statuses.includes("Partially Mitigated")) return "Partially Mitigated";
    if(statuses.includes("Touched")) return "Touched";
    if(statuses.length && statuses.every((status)=>status === "Fresh")) return "Fresh";
    if(statuses.includes("Fresh")) return "Fresh";
  }
  const fallback = `${row?.status || ""} ${row?.quality || ""}`;
  if(/broken/i.test(fallback)) return "Broken";
  if(/filled/i.test(fallback) && !/unfilled/i.test(fallback)) return "Filled";
  if(/partial/i.test(fallback)) return "Partially Mitigated";
  if(/touched|touch/i.test(fallback)) return "Touched";
  if(/fresh|unfilled|active/i.test(fallback)) return "Active";
  return null;
}
function getMatchedFvgDirections(details){ return [...new Set((details || []).map((detail)=>detail.direction || getFvgDirection(detail.sourceZone || detail)).filter(Boolean))]; }
function detailsHaveOppositeFvgOverlap(details){
  for(let i=0;i<(details || []).length;i++){
    for(let j=i+1;j<details.length;j++){
      const a = details[i], b = details[j];
      if(!hasOppositeDirection(a, b)) continue;
      const az = getFvgDetailZone(a), bz = getFvgDetailZone(b);
      if(az && bz && (getZoneOverlapRatio(az, bz) > 0 || isFvgNear(az, bz, 0.01))) return true;
    }
  }
  return false;
}
function rowMatchesFvgConflict(details){
  if(!Array.isArray(details) || details.length < 2) return null;
  const weekly = details.find((detail)=>detail.timeframe === "Weekly");
  const weeklyZone = getFvgDetailZone(weekly);
  const lowerOpposite = weekly && weeklyZone ? details.filter((detail)=>{
    if(detail === weekly || !hasOppositeDirection(weekly, detail)) return false;
    const zone = getFvgDetailZone(detail);
    return zone && (getZoneOverlapRatio(zone, weeklyZone) > 0 || isFvgNested(zone, weeklyZone) || isFvgNear(zone, weeklyZone, 0.01));
  }) : [];
  if(weekly && lowerOpposite.length){
    const dir = weekly.direction || getFvgDirection(weekly.sourceZone || weekly);
    return { label: dir === "bullish" ? "Under Pressure" : "Under Pressure", reason: "HTF parent FVG is challenged by lower-timeframe opposite FVG." };
  }
  if(detailsHaveOppositeFvgOverlap(details)) return { label: "Conflict", reason: "Matched FVG sources have opposite directions in the same/near zone." };
  return null;
}
function getFormalFvgTimingZone(){
  const zone = marketPreparationState.fvgMtfContext?.timingZone;
  return zone && typeof zone === "object" ? zone : createEmptyFvgTimingZone();
}
function doesTimingZoneAlignWithFvgRow(timingZone, rowDetails){
  const directions = getMatchedFvgDirections(rowDetails);
  if(directions.length !== 1) return false;
  const direction = directions[0];
  return timingZone?.timingStatus === "Confirming"
    && timingZone?.supportsHighProbability === true
    && (timingZone.direction === direction);
}
function hasRowFvgTimingConfirmation(details, row){
  const timingZone = getFormalFvgTimingZone();
  if(!doesTimingZoneAlignWithFvgRow(timingZone, details)) return false;
  const rowDistance = Number(row?.distancePct);
  return Number.isFinite(rowDistance) ? rowDistance <= 1.5 : false;
}
function buildFvgQualityScoreForDetails(details, rowContext = {}){
  const activeDetails = (details || []).filter(Boolean);
  if(!activeDetails.length) return null;
  const statuses = activeDetails.map((detail)=>detail.detailStatus || detail.baseStatus).filter(Boolean);
  if(statuses.includes("Broken")) return "Broken";
  if(statuses.length && statuses.every((status)=>status === "Filled")) return "Weak";
  const conflict = rowMatchesFvgConflict(activeDetails);
  if(conflict) return conflict.label;
  const directions = getMatchedFvgDirections(activeDetails);
  const timeframes = [...new Set(activeDetails.map((detail)=>detail.timeframe).filter(Boolean))];
  const aligned = directions.length === 1;
  const multiTf = timeframes.length >= 2;
  const confluenceCount = Number(rowContext?.confluenceCount) || getConfluenceSourceList(rowContext).length;
  const hasOverlap = multiTf && activeDetails.some((a, idx)=>activeDetails.slice(idx + 1).some((b)=>{
    const az = getFvgDetailZone(a), bz = getFvgDetailZone(b);
    return az && bz && getZoneOverlapRatio(az, bz) > 0;
  }));
  const srConfluence = scoreSrConfluenceForDetails(activeDetails);
  const displacement = scoreDisplacementForDetails(activeDetails);
  if(aligned && multiTf && hasOverlap && hasRowFvgTimingConfirmation(activeDetails, rowContext)) return "High-Probability";
  if(aligned && (multiTf || confluenceCount > 1) && (hasOverlap || confluenceCount > 1 || srConfluence || displacement)) return "Strong";
  if(statuses.includes("50% Mitigated") || statuses.includes("Partially Mitigated") || statuses.includes("Touched") || statuses.includes("Fresh")) return (confluenceCount > 1 || srConfluence || displacement) ? "Valid" : "Weak";
  return "Valid";
}
function getMapRowFvgQuality(row){
  if(!isFvgMapRow(row)) return null;
  const details = getMapRowMatchedFvgDetails(row);
  if(details.length) return buildFvgQualityScoreForDetails(details, row);
  const fallback = String(row?.quality || row?.status || "");
  if(/broken/i.test(fallback)) return "Broken";
  if(/conflict/i.test(fallback)) return "Conflict";
  if(/under pressure/i.test(fallback)) return "Under Pressure";
  if(/strong/i.test(fallback)) return "Strong";
  if(/valid|active|unfilled|partial|touched/i.test(fallback)) return "Valid";
  return null;
}
function formatFvgQualityLabelForDisplay(label){
  return label === "High-Probability" ? "High-Confluence" : label;
}
function formatMapRowFvgBadges(row){
  if(!isFvgMapRow(row)) return null;
  const status = getMapRowFvgStatus(row);
  const quality = getMapRowFvgQuality(row);
  const displayQuality = formatFvgQualityLabelForDisplay(quality);
  if(!status && !displayQuality) return null;
  return [status ? `Status: ${status}` : null, displayQuality ? `Quality: ${displayQuality}` : null].filter(Boolean).join(" · ");
}
function getScenarioRowQuality(row){
  const fvgQuality = getMapRowFvgQuality(row);
  if(fvgQuality) return fvgQuality;
  const text = `${row?.quality || ""} ${row?.status || ""} ${Array.isArray(row?.sources) ? row.sources.map((s)=>`${s.quality || ""} ${s.status || ""}`).join(" ") : ""}`;
  if(/broken/i.test(text)) return "Broken";
  if(/filled/i.test(text) && !/unfilled/i.test(text)) return "Filled";
  if(/high[-\s]?probability/i.test(text)) return "High-Probability";
  if(/strong/i.test(text)) return "Strong";
  if(/valid|active|unfilled|partial|touched|touch|medium/i.test(text)) return "Valid";
  if(/weak/i.test(text)) return "Weak";
  return null;
}
function isScenarioQualityAtLeast(row, min){
  const rank = { Filled: 0, Broken: 0, Weak: 1, Valid: 2, Strong: 3, "High-Probability": 4 };
  const quality = getScenarioRowQuality(row);
  return (rank[quality] || 0) >= (rank[min] || 0);
}
function getScenarioRowText(row){
  return `${row?.label || ""} ${row?.source || ""} ${row?.primarySource || ""} ${row?.confluenceLabel || ""} ${Array.isArray(row?.sources) ? row.sources.map((s)=>`${s.label || ""} ${s.source || ""} ${s.primarySource || ""}`).join(" ") : ""}`.toLowerCase();
}
function isBuyEntryRow(row){
  const text = getScenarioRowText(row);
  const positive = /bullish/.test(text) || /support/.test(text);
  const negative = /bearish/.test(text) || /resistance/.test(text);
  return !!row && positive && !negative;
}
function isSellEntryRow(row){
  const text = getScenarioRowText(row);
  const positive = /bearish/.test(text) || /resistance/.test(text);
  const negative = /bullish/.test(text) || /support/.test(text);
  return !!row && positive && !negative;
}
function normalizeScenarioEntryZone(row, side){
  if(!row || !Number.isFinite(row.lower) || !Number.isFinite(row.upper) || row.upper <= row.lower) return null;
  const status = getMapRowFvgStatus(row) || row.status || null;
  const quality = getScenarioRowQuality(row);
  return { lower: row.lower, upper: row.upper, zoneText: row.zoneText || `${usd(row.lower)}–${usd(row.upper)}`, type: inferSingleZoneType(row), sources: formatConfluenceSources(row, 4), distancePct: row.distancePct ?? null, quality, status, rowKey: getMapRowStableKey(row), sourceSide: side === "buy" ? "downside" : "upside" };
}
function calculateScenarioBuffer(row, currentPrice){
  if(!row || !Number.isFinite(row.lower) || !Number.isFinite(row.upper) || !Number.isFinite(currentPrice) || currentPrice <= 0) return null;
  const zoneWidth = row.upper - row.lower;
  if(!Number.isFinite(zoneWidth) || zoneWidth <= 0) return null;
  return Math.max(zoneWidth * 0.10, currentPrice * 0.002);
}
function buildScenarioInvalidation(row, side, currentPrice){
  const buffer = calculateScenarioBuffer(row, currentPrice);
  if(!Number.isFinite(buffer)) return null;
  if(side === "buy"){
    const price = row.lower - buffer;
    return { price, rule: "Scenario invalid if 4H/Daily close is below invalidation zone.", buffer, basis: "Scenario zone lower boundary - buffer" };
  }
  if(side === "sell"){
    const price = row.upper + buffer;
    return { price, rule: "Scenario invalid if 4H/Daily close is above invalidation zone.", buffer, basis: "Scenario zone upper boundary + buffer" };
  }
  return null;
}
function buildScenarioTargets(side, mapData, entryRow){
  const rows = side === "buy" ? (mapData?.upside || []) : (mapData?.downside || []);
  const candidates = rows.filter((row)=>row && !isSameMapRow(row, entryRow) && Number.isFinite(row.lower) && Number.isFinite(row.upper) && row.upper > row.lower);
  const first = candidates[0] || null;
  const second = candidates[1] || null;
  if(side === "buy"){
    return { tp1: first ? first.lower : null, tp2: first ? first.upper : null, tp3: second ? second.lower : null };
  }
  if(side === "sell"){
    return { tp1: first ? first.upper : null, tp2: first ? first.lower : null, tp3: second ? second.upper : null };
  }
  return { tp1: null, tp2: null, tp3: null };
}
function getScenarioTimingGate(side){
  const timingZone = marketPreparationState.fvgMtfContext?.timingZone || createEmptyFvgTimingZone();
  const expectedDirection = side === "buy" ? "bullish" : (side === "sell" ? "bearish" : null);
  const aligned = !!expectedDirection && timingZone.timingStatus === "Confirming" && timingZone.supportsHighProbability === true && timingZone.direction === expectedDirection;
  return { timingStatus: timingZone.timingStatus || "Unavailable", timingDirection: timingZone.direction || null, expectedDirection, aligned, supportsHighProbability: timingZone.supportsHighProbability === true, reason: timingZone.reason || null };
}
function getParentFvgBrokenContext(){
  const context = marketPreparationState.fvgMtfContext || {};
  const conflict = context.conflict;
  if(!conflict?.ok || conflict.label !== "Parent FVG Broken") return { isBroken: false, parentDirection: null, brokenDirection: null, supportsSide: null, blocksSide: null, reason: null };
  const parentZone = context.parentZone || {};
  const typeText = String(parentZone.type || parentZone.label || "").toLowerCase();
  const parentDirection = conflict.htfDirection || parentZone.direction || (typeText.includes("bullish") ? "bullish" : (typeText.includes("bearish") ? "bearish" : null));
  if(parentDirection === "bullish") return { isBroken: true, parentDirection, brokenDirection: "down", supportsSide: "sell", blocksSide: "buy", reason: "Broken bullish parent FVG may support bearish context." };
  if(parentDirection === "bearish") return { isBroken: true, parentDirection, brokenDirection: "up", supportsSide: "buy", blocksSide: "sell", reason: "Broken bearish parent FVG may support bullish context." };
  return { isBroken: true, parentDirection: null, brokenDirection: null, supportsSide: null, blocksSide: "both", reason: "Parent FVG broken direction unclear." };
}
function doesParentFvgBrokenBlockSide(side){
  const ctx = getParentFvgBrokenContext();
  return !!ctx.isBroken && (ctx.blocksSide === "both" || ctx.blocksSide === side);
}
function getParentFvgBrokenScenarioEffect(side){
  const ctx = getParentFvgBrokenContext();
  if(!ctx.isBroken) return { context: ctx, blocker: null, warning: null, activeBlocked: false, parentBroken: false };
  if(doesParentFvgBrokenBlockSide(side)) return { context: ctx, blocker: ctx.reason || "Parent FVG Broken", warning: null, activeBlocked: true, parentBroken: true };
  if(ctx.supportsSide === side) return { context: ctx, blocker: null, warning: ctx.reason, activeBlocked: false, parentBroken: false };
  return { context: ctx, blocker: null, warning: ctx.reason || "Parent FVG broken direction unclear.", activeBlocked: true, parentBroken: false };
}
function getScenarioHardBlockers(side){
  const blockers = [];
  const warnings = [];
  const conflict = marketPreparationState.fvgMtfContext?.conflict;
  let activeBlocked = false;
  let parentBroken = false;
  let parentBrokenContext = null;
  if(conflict?.ok){
    if(conflict.label === "Parent FVG Broken"){
      const effect = getParentFvgBrokenScenarioEffect(side);
      parentBrokenContext = effect.context;
      if(effect.blocker) blockers.push(effect.blocker);
      if(effect.warning) warnings.push(effect.warning);
      activeBlocked = activeBlocked || effect.activeBlocked;
      parentBroken = effect.parentBroken;
    } else if(conflict.label === "Conflict / Wait Confirmation"){
      warnings.push("Conflict / Wait Confirmation");
      activeBlocked = true;
    } else if(conflict.label === "HTF Support Under Pressure" || conflict.label === "HTF Resistance Under Pressure"){
      warnings.push(conflict.label);
      activeBlocked = true;
    }
  }
  return { blockers, warnings, conflictLabel: conflict?.ok ? conflict.label : null, parentBroken, parentBrokenContext, activeBlocked: activeBlocked || blockers.length > 0 };
}
function isScenarioEntryNear(row, currentPrice){
  if(!row || !Number.isFinite(currentPrice)) return false;
  if(currentPrice >= row.lower && currentPrice <= row.upper) return true;
  return Number.isFinite(row.distancePct) && row.distancePct <= 1.5;
}
function buildScenarioStopLogic(entryZone, invalidation, side){
  if(!entryZone || !invalidation) return null;
  const boundary = side === "buy" ? entryZone.lower : entryZone.upper;
  return { text: side === "buy" ? "Planning invalidation below the scenario zone with buffer." : "Planning invalidation above the scenario zone with buffer.", boundary, bufferType: "zone width / percentage buffer" };
}
function createEmptyEstimatedRR(reason = "Missing valid scenario zone, invalidation, or reference level.", warnings = []){
  return { ok: false, status: "unavailable", assumption: "Estimated using midpoint of scenario zone.", reason, warnings };
}
function calculateTargetRR(side, entryMid, risk, target){
  if(!Number.isFinite(target)) return null;
  const reward = side === "buy" ? target - entryMid : (side === "sell" ? entryMid - target : null);
  if(!Number.isFinite(reward) || reward <= 0) return null;
  const rr = reward / risk;
  if(!Number.isFinite(rr) || rr <= 0) return null;
  return { target, reward, rr: Math.round(rr * 100) / 100, ok: true };
}
function calculateScenarioEstimatedRR(scenario){
  const assumption = "Estimated using midpoint of scenario zone.";
  const warnings = [];
  if(!scenario || !["buy", "sell"].includes(scenario.side)) return createEmptyEstimatedRR("Missing valid scenario side.");
  const entry = scenario.entryZone || {};
  const invalidation = scenario.invalidation || {};
  const targets = scenario.targets || {};
  if(!Number.isFinite(entry.lower) || !Number.isFinite(entry.upper) || entry.upper <= entry.lower || !Number.isFinite(invalidation.price)){
    return createEmptyEstimatedRR("Missing valid scenario zone, invalidation, or reference level.");
  }
  const entryMid = (entry.lower + entry.upper) / 2;
  const risk = scenario.side === "buy" ? entryMid - invalidation.price : invalidation.price - entryMid;
  const minRisk = Math.max(entryMid * 0.0005, 1);
  if(!Number.isFinite(risk) || risk <= minRisk) return createEmptyEstimatedRR("Risk distance is too small or invalid for a reliable estimate.");
  const zoneWidth = entry.upper - entry.lower;
  if(Number.isFinite(zoneWidth) && zoneWidth / entryMid > 0.03) warnings.push("Scenario zone is wide; estimate may be less precise.");
  if(scenario.status === TRADE_SCENARIO_STATUS.WAIT) warnings.push("Estimated only if scenario context becomes valid.");
  const result = { ok: false, status: "unavailable", assumption, entryMid, risk, tp1: null, tp2: null, tp3: null, validTargets: [], warnings };
  for(const key of ["tp1", "tp2", "tp3"]){
    const targetResult = calculateTargetRR(scenario.side, entryMid, risk, targets[key]);
    if(targetResult){
      result[key] = targetResult;
      result.validTargets.push(key);
    }else if(key !== "tp1"){
      warnings.push(`${key.toUpperCase()} unavailable.`);
    }
  }
  if(!result.tp1) return createEmptyEstimatedRR("Missing valid TP1 for a reliable estimate.", warnings);
  result.ok = true;
  result.status = result.validTargets.length === 3 ? "available" : "partial";
  return result;
}
function buildNoTradeScenario(side, reason, blockers = []){
  return { side, status: TRADE_SCENARIO_STATUS.NO_TRADE, entryZone: null, invalidation: null, stopLogic: null, targets: { tp1: null, tp2: null, tp3: null }, estimatedRR: null, riskLabel: "No Trade", activationCondition: "Wait for independent confirmation and a clean scenario zone.", invalidationReason: null, reason, blockers, warnings: [], evidence: { timingStatus: marketPreparationState.fvgMtfContext?.timingZone?.timingStatus || "Unavailable", timingDirection: marketPreparationState.fvgMtfContext?.timingZone?.direction || null, conflictLabel: marketPreparationState.fvgMtfContext?.conflict?.label || null, fvgQualityLabel: marketPreparationState.fvgQuality?.label || null, rowQuality: null } };
}
function buildTradeScenarioForSide(side, mapData){
  const currentPrice = marketPreparationState.currentPrice;
  if(!Number.isFinite(currentPrice)) return buildNoTradeScenario(side, "Current price is unavailable.", ["Current price unavailable"]);
  const rows = side === "buy" ? (mapData?.downside || []) : (mapData?.upside || []);
  const isEntry = side === "buy" ? isBuyEntryRow : isSellEntryRow;
  if(!rows.length) return buildNoTradeScenario(side, `No ${side === "buy" ? "downside" : "upside"} scenario zones are available.`, ["Map rows unavailable"]);
  const entryRow = rows.find((row)=>isEntry(row) && isScenarioQualityAtLeast(row, "Valid") && !["Broken", "Filled"].includes(getMapRowFvgStatus(row)) && Number.isFinite(row.lower) && Number.isFinite(row.upper) && row.upper > row.lower);
  if(!entryRow) return buildNoTradeScenario(side, `No valid ${side === "buy" ? "bullish" : "bearish"} scenario zone is available.`, ["No valid scenario zone"]);
  const entryZone = normalizeScenarioEntryZone(entryRow, side);
  const invalidation = buildScenarioInvalidation(entryRow, side, currentPrice);
  const targets = buildScenarioTargets(side, mapData, entryRow);
  const blockers = [];
  const warnings = [];
  if(!entryZone) blockers.push("Scenario zone invalid");
  if(!invalidation) blockers.push("Invalidation unavailable");
  if(!Number.isFinite(targets.tp1)) blockers.push("Level 1 reference unavailable");
  const rowStatus = entryZone?.status || getMapRowFvgStatus(entryRow);
  if(["Broken", "Filled"].includes(rowStatus)) blockers.push(`Scenario row ${rowStatus}`);
  const hard = getScenarioHardBlockers(side);
  blockers.push(...hard.blockers);
  warnings.push(...hard.warnings);
  const timing = getScenarioTimingGate(side);
  const entryNear = isScenarioEntryNear(entryRow, currentPrice);
  if(!entryNear) warnings.push("Current price has not reached the scenario zone.");
  const invalidated = !!invalidation && ((side === "buy" && currentPrice < invalidation.price) || (side === "sell" && currentPrice > invalidation.price));
  let status = TRADE_SCENARIO_STATUS.NO_TRADE;
  let reason = `${side === "buy" ? "Bullish" : "Bearish"} scenario is not available.`;
  if(invalidated || hard.parentBroken || ["Broken", "Filled"].includes(rowStatus)){
    status = TRADE_SCENARIO_STATUS.INVALIDATED;
    reason = invalidated ? "Current price has crossed the scenario invalidation level." : "Scenario is invalidated by broken/filled context.";
  } else if(blockers.length){
    status = TRADE_SCENARIO_STATUS.NO_TRADE;
    reason = blockers.join("; ");
  } else if(hard.activeBlocked){
    status = TRADE_SCENARIO_STATUS.WAIT;
    reason = `${hard.conflictLabel || "MTF conflict"}; wait for independent 1H/4H context.`;
  } else if(!entryNear || ["Waiting", "Pullback", "Unavailable"].includes(timing.timingStatus)){
    status = TRADE_SCENARIO_STATUS.WAIT;
    reason = !entryNear ? "Scenario zone exists, but price is not near the scenario zone." : "Scenario zone exists, but 1H timing context is not active.";
  } else if(timing.timingStatus === "Conflict"){
    status = TRADE_SCENARIO_STATUS.WAIT;
    reason = "1H timing conflicts with the scenario direction; wait for independent confirmation.";
  } else if(timing.aligned && entryNear && isScenarioQualityAtLeast(entryRow, "Strong")){
    status = TRADE_SCENARIO_STATUS.ACTIVE;
    reason = "Scenario planning context is active with aligned 1H timing.";
  } else {
    status = TRADE_SCENARIO_STATUS.CANDIDATE;
    reason = "Scenario zone, invalidation, and Level 1 reference are available, but active context is not fully confirmed.";
  }
  const riskLabel = status === TRADE_SCENARIO_STATUS.ACTIVE ? (isScenarioQualityAtLeast(entryRow, "High-Probability") ? "Low" : "Medium") : (status === TRADE_SCENARIO_STATUS.CANDIDATE ? "Medium" : (status === TRADE_SCENARIO_STATUS.NO_TRADE ? "No Trade" : "High"));
  const estimatedRR = status === TRADE_SCENARIO_STATUS.INVALIDATED || status === TRADE_SCENARIO_STATUS.NO_TRADE ? null : calculateScenarioEstimatedRR({ side, status, entryZone, invalidation, targets });
  return { side, status, entryZone, invalidation, stopLogic: buildScenarioStopLogic(entryZone, invalidation, side), targets, estimatedRR, riskLabel, activationCondition: side === "buy" ? "Wait for bullish 1H context near the scenario zone." : "Wait for bearish 1H context near the scenario zone.", invalidationReason: invalidated ? reason : null, reason, blockers, warnings, evidence: { timingStatus: timing.timingStatus, timingDirection: timing.timingDirection, conflictLabel: hard.conflictLabel, parentFvgBrokenContext: hard.parentBrokenContext || null, fvgQualityLabel: marketPreparationState.fvgQuality?.label || null, rowQuality: entryZone?.quality || null } };
}
function selectPrimaryTradeScenario(buyScenario, sellScenario){
  const rank = { [TRADE_SCENARIO_STATUS.ACTIVE]: 4, [TRADE_SCENARIO_STATUS.CANDIDATE]: 3, [TRADE_SCENARIO_STATUS.WAIT]: 2, [TRADE_SCENARIO_STATUS.INVALIDATED]: 1, [TRADE_SCENARIO_STATUS.NO_TRADE]: 0 };
  const scenarios = [buyScenario, sellScenario].filter(Boolean);
  const viable = scenarios.filter((s)=>s.status !== TRADE_SCENARIO_STATUS.NO_TRADE);
  if(!viable.length) return null;
  return viable.sort((a,b)=> (rank[b.status] - rank[a.status]) || ((a.entryZone?.distancePct ?? 999) - (b.entryZone?.distancePct ?? 999)) || (({ "High-Probability": 4, Strong: 3, Valid: 2, Weak: 1 }[b.entryZone?.quality] || 0) - ({ "High-Probability": 4, Strong: 3, Valid: 2, Weak: 1 }[a.entryZone?.quality] || 0)))[0] || null;
}
function buildTradePlanScenario(mapData){
  const buyScenario = buildTradeScenarioForSide("buy", mapData);
  const sellScenario = buildTradeScenarioForSide("sell", mapData);
  const selectedScenario = selectPrimaryTradeScenario(buyScenario, sellScenario);
  const primaryStatus = selectedScenario?.status || (buyScenario?.status === TRADE_SCENARIO_STATUS.WAIT || sellScenario?.status === TRADE_SCENARIO_STATUS.WAIT ? TRADE_SCENARIO_STATUS.WAIT : TRADE_SCENARIO_STATUS.NO_TRADE);
  const primarySide = selectedScenario?.side || "neutral";
  const caution = [...new Set([...(buyScenario?.warnings || []), ...(sellScenario?.warnings || []), ...(buyScenario?.blockers || []), ...(sellScenario?.blockers || [])].filter(Boolean))].slice(0, 6);
  return { ok: !!selectedScenario, primaryStatus, primarySide, reason: selectedScenario?.reason || (primaryStatus === TRADE_SCENARIO_STATUS.WAIT ? "Scenario context exists, but confirmation is incomplete." : "No clean trade scenario is available."), caution, buyScenario, sellScenario, selectedScenario, updatedAt: Date.now(), disclaimer: TRADE_SCENARIO_DISCLAIMER };
}
function refreshTradePlanScenario(mapData = marketPreparationState.map){
  const safeMap = mapData || marketPreparationState.map;
  if(!safeMap || (!Array.isArray(safeMap.upside) && !Array.isArray(safeMap.downside))){
    marketPreparationState.tradePlanScenario = createEmptyTradePlanScenario("Market map is unavailable.");
    return marketPreparationState.tradePlanScenario;
  }
  marketPreparationState.tradePlanScenario = buildTradePlanScenario({
    ...safeMap,
    upside: Array.isArray(safeMap.upside) ? safeMap.upside : [],
    downside: Array.isArray(safeMap.downside) ? safeMap.downside : [],
  });
  return marketPreparationState.tradePlanScenario;
}
function formatScenarioSide(side, status){
  const normalizedStatus = String(status || "").toLowerCase();
  if(side === "buy"){
    if(normalizedStatus.includes("active")) return "Active Bullish Scenario";
    if(normalizedStatus.includes("invalid")) return "Invalidated Bullish Scenario";
    return "Potential Bullish Scenario";
  }
  if(side === "sell"){
    if(normalizedStatus.includes("active")) return "Active Bearish Scenario";
    if(normalizedStatus.includes("invalid")) return "Invalidated Bearish Scenario";
    return "Potential Bearish Scenario";
  }
  return "Neutral / No Trade";
}
function formatScenarioStatus(status){
  return status || "Unavailable";
}
function formatScenarioPrice(value){
  return Number.isFinite(value) ? usd(value) : "—";
}
function getScenarioStatusClass(status){
  const key = String(status || "").toLowerCase();
  if(key.includes("active")) return "status-active";
  if(key.includes("candidate")) return "status-candidate";
  if(key.includes("wait")) return "status-wait";
  if(key.includes("invalid")) return "status-invalidated";
  return "status-no-trade";
}
function formatScenarioActivationCondition(scenario){
  const side = scenario?.side;
  const status = String(scenario?.status || "").toLowerCase();
  const timingDirection = scenario?.evidence?.timingDirection;
  if(side === "buy" && timingDirection === "bearish") return "Current 1H timing is bearish; wait for bullish context before considering this scenario.";
  if(side === "sell" && timingDirection === "bullish") return "Current 1H timing is bullish; wait for bearish context before considering this scenario.";
  if(side === "buy") return status.includes("active") ? "Bullish 1H timing context is active near the scenario zone." : "Wait for bullish 1H context near the scenario zone.";
  if(side === "sell") return status.includes("active") ? "Bearish 1H timing context is active near the scenario zone." : "Wait for bearish 1H context near the scenario zone.";
  return "Wait for independent confirmation and a clean scenario zone.";
}
function formatScenarioWarningText(item){
  return String(item || "");
}
function formatEstimatedRRValue(rr){
  return Number.isFinite(rr) ? `~${rr.toFixed(1)}R` : null;
}
function formatEstimatedRRLine(estimatedRR){
  if(!estimatedRR?.ok || !estimatedRR.tp1?.ok) return null;
  return ["tp1", "tp2", "tp3"]
    .map((key)=>estimatedRR[key]?.ok ? `${({ tp1: "Level 1", tp2: "Level 2", tp3: "Level 3" }[key] || key.toUpperCase())} ${formatEstimatedRRValue(estimatedRR[key].rr)}` : null)
    .filter(Boolean)
    .join(" · ");
}
function renderEstimatedRRSection(scenario){
  const status = scenario?.status;
  const statusText = String(status || "").toLowerCase();
  if(!scenario || status === TRADE_SCENARIO_STATUS.NO_TRADE || status === TRADE_SCENARIO_STATUS.INVALIDATED) return "";
  const rrLine = formatEstimatedRRLine(scenario.estimatedRR);
  if(!rrLine) return "";
  const title = statusText.includes("wait") ? "Scenario R:R if context becomes valid" : "Scenario R:R";
  return `<div class="trade-plan-row trade-plan-rr"><span class="trade-plan-rr-title">${escapeHtml(title)}</span><strong class="trade-plan-rr-values">${escapeHtml(rrLine)}</strong><small class="trade-plan-rr-note">Based on midpoint of scenario zone. Scenario only.</small></div>`;
}
function formatTradePlanScenarioPanel(scenarioState){
  const state = scenarioState || createEmptyTradePlanScenario("Preparation Scenario: Unavailable");
  const selected = state.selectedScenario || null;
  const status = formatScenarioStatus(selected?.status || state.primaryStatus || "Unavailable");
  const side = formatScenarioSide(selected?.side || state.primarySide, status);
  const entryZone = selected?.entryZone;
  const invalidation = selected?.invalidation;
  const targets = selected?.targets || {};
  const stopLogic = selected?.stopLogic;
  const warnings = selected ? (selected.warnings || []) : (state.caution || []);
  const blockers = selected?.blockers || [];
  const invalidationSide = selected?.side === "sell" ? "Above" : (selected?.side === "buy" ? "Below" : "At");
  const entryText = entryZone ? (entryZone.zoneText || `${formatScenarioPrice(entryZone.lower)}–${formatScenarioPrice(entryZone.upper)}`) : "—";
  const invalidationText = invalidation ? `${invalidationSide} ${formatScenarioPrice(invalidation.price)}` : "—";
  const targetText = `Level 1: ${formatScenarioPrice(targets.tp1)} · Level 2: ${formatScenarioPrice(targets.tp2)} · Level 3: ${formatScenarioPrice(targets.tp3)}`;
  const warningHtml = warnings.length ? `<div class="trade-plan-warning"><strong>Warnings</strong><ul>${warnings.map((item)=>`<li>${escapeHtml(formatScenarioWarningText(item))}</li>`).join("")}</ul></div>` : "";
  const blockerHtml = blockers.length ? `<div class="trade-plan-warning trade-plan-blocker"><strong>Blockers</strong><ul>${blockers.map((item)=>`<li>${escapeHtml(item)}</li>`).join("")}</ul></div>` : "";
  const estimatedRRHtml = renderEstimatedRRSection(selected);
  return `
    <div class="trade-plan-header">
      <div>
        <h3>Preparation Scenario</h3>
        <p>${escapeHtml(state.disclaimer || "Scenario planning only · not financial advice or a direct trading signal.")}</p>
      </div>
      <span class="trade-plan-status ${getScenarioStatusClass(status)}">${escapeHtml(status)}</span>
    </div>
    <div class="trade-plan-grid">
      <div class="trade-plan-row"><span>Side</span><strong>${escapeHtml(side)}</strong></div>
      <div class="trade-plan-row"><span>Scenario Zone</span><strong>${escapeHtml(entryText)}</strong></div>
      <div class="trade-plan-row"><span>Invalidation</span><strong>${escapeHtml(invalidationText)}</strong>${invalidation?.rule ? `<small>${escapeHtml(invalidation.rule)}</small>` : ""}</div>
      <div class="trade-plan-row"><span>Invalidation Logic</span><strong>${escapeHtml(stopLogic?.text || "—")}</strong></div>
      <div class="trade-plan-row trade-plan-targets"><span>Reference Levels</span><strong>${escapeHtml(targetText)}</strong></div>
      ${estimatedRRHtml}
      <div class="trade-plan-row"><span>Risk</span><strong>${escapeHtml(selected?.riskLabel || "No Trade")}</strong></div>
      <div class="trade-plan-row trade-plan-wide"><span>Scenario Condition</span><strong>${escapeHtml(formatScenarioActivationCondition(selected))}</strong></div>
      <div class="trade-plan-row trade-plan-wide"><span>Reason</span><strong>${escapeHtml(selected?.reason || state.reason || "Preparation Scenario: Unavailable")}</strong></div>
    </div>
    ${warningHtml}
    ${blockerHtml}
    <p class="trade-plan-footer">Scenario only. Use independent confirmation and risk controls.</p>
  `;
}
function renderTradePlanScenario(){
  if(!els.tradePlanScenarioPanel) return;
  els.tradePlanScenarioPanel.innerHTML = formatTradePlanScenarioPanel(marketPreparationState.tradePlanScenario);
}
function getIfvgContextItems(){
  const sources = [
    { timeframe: "Weekly", memory: marketPreparationState.weekly?.recentBrokenFvgDetails },
    { timeframe: "Daily", memory: marketPreparationState.daily?.recentBrokenFvgDetails },
    { timeframe: "4H", memory: marketPreparationState.h4?.recentBrokenFvgDetails },
  ];
  return sources.flatMap((source)=>(source.memory?.all || []).map((detail)=>({ timeframe: source.timeframe, detail, ifvg: detail?.ifvg || null })));
}
function summarizeIfvgMemory(memory){
  const counts = { confirmed: 0, valid: 0, possible: 0, failed: 0, stale: 0 };
  const items = (memory?.all || []).map((detail)=>({ detail, ifvg: detail?.ifvg || null })).filter((item)=>item.ifvg);
  items.forEach(({ ifvg })=>{
    const state = ifvg.state || IFVG_STATE.NONE;
    if(state === IFVG_STATE.CONFIRMED) counts.confirmed += 1;
    else if(state === IFVG_STATE.VALID) counts.valid += 1;
    else if(state === IFVG_STATE.POSSIBLE) counts.possible += 1;
    else if(state === IFVG_STATE.FAILED) counts.failed += 1;
    if(ifvg.stale) counts.stale += 1;
  });
  const rank = { confirmed: 5, valid: 4, possible: 3, failed: 2, none: 1 };
  const sortedItems = items.sort((a,b)=>
    (rank[b.ifvg?.state] || 0) - (rank[a.ifvg?.state] || 0)
    || (Number(b.detail?.brokenAt || 0) - Number(a.detail?.brokenAt || 0))
  );
  return { counts, items: sortedItems };
}
function getIfvgDisplayDirection(ifvg, detail){
  const direction = ifvg?.inversionSide || getIfvgInversionSide(detail?.direction || getFvgDirection(detail?.sourceZone || detail));
  if(direction === "bullish") return "Bullish";
  if(direction === "bearish") return "Bearish";
  return "Mixed";
}
function formatIfvgStateLabel(state){
  if(state === IFVG_STATE.CONFIRMED) return "Confirmed";
  if(state === IFVG_STATE.VALID) return "Valid";
  if(state === IFVG_STATE.POSSIBLE) return "Possible";
  if(state === IFVG_STATE.FAILED) return "Failed";
  return "No context";
}
function getIfvgContextStatusClass(state){
  if(state === IFVG_STATE.CONFIRMED) return "ifvg-state-confirmed";
  if(state === IFVG_STATE.VALID) return "ifvg-state-valid";
  if(state === IFVG_STATE.POSSIBLE) return "ifvg-state-possible";
  if(state === IFVG_STATE.FAILED) return "ifvg-state-failed";
  return "ifvg-state-stale";
}
function formatIfvgFailureText(ifvg){
  const prior = ifvg?.priorStateBeforeFailure;
  if(prior === IFVG_STATE.CONFIRMED) return "Previously confirmed, later failed after reclaim.";
  if(prior === IFVG_STATE.VALID) return "Previously valid, later failed after reclaim.";
  if(prior === IFVG_STATE.POSSIBLE) return "Possible IFVG later failed after reclaim.";
  return ifvg?.failure?.reason ? "Failed after reclaim by close." : "Failed after reclaim.";
}
function formatIfvgContextLine(detail, timeframe){
  const ifvg = detail?.ifvg || {};
  const state = ifvg.state || IFVG_STATE.NONE;
  const direction = getIfvgDisplayDirection(ifvg, detail);
  const stateLabel = formatIfvgStateLabel(state);
  let note = "Context unavailable.";
  if(state === IFVG_STATE.CONFIRMED) note = `Retest + rejection confirmed · ${ifvg.quality?.band || "context"} context`;
  else if(state === IFVG_STATE.VALID) note = `${ifvg.retest?.status === IFVG_RETEST_STATUS.FULL ? "Full retest" : "Retested inside zone"} · ${ifvg.rejection?.status === IFVG_REJECTION_STATUS.CANDIDATE ? "rejection candidate" : "waiting rejection"}`;
  else if(state === IFVG_STATE.POSSIBLE) note = "Closed break detected · waiting for retest";
  else if(state === IFVG_STATE.FAILED) note = formatIfvgFailureText(ifvg);
  if(ifvg.stale && state !== IFVG_STATE.FAILED) note = `${note} · stale context`;
  return { title: `${timeframe} ${stateLabel} ${direction} IFVG`, note, state };
}
function renderIfvgContextPanel(){
  if(!els.ifvgContextPanel) return;
  const frames = [
    { label: "Weekly", memory: marketPreparationState.weekly?.recentBrokenFvgDetails },
    { label: "Daily", memory: marketPreparationState.daily?.recentBrokenFvgDetails },
    { label: "4H", memory: marketPreparationState.h4?.recentBrokenFvgDetails },
  ];
  const summaries = frames.map((frame)=>({ ...frame, summary: summarizeIfvgMemory(frame.memory) }));
  const hasItems = summaries.some((frame)=>frame.summary.items.length);
  const countLabels = (counts)=>[
    counts.confirmed ? `Confirmed ${counts.confirmed}` : null,
    counts.valid ? `Valid ${counts.valid}` : null,
    counts.possible ? `Possible ${counts.possible}` : null,
    counts.failed ? `Failed ${counts.failed}` : null,
    counts.stale ? `Stale ${counts.stale}` : null,
  ].filter(Boolean).join(" · ") || "No recent context";
  const frameHtml = summaries.map((frame)=>{
    const counts = frame.summary.counts;
    const nonFailed = frame.summary.items.filter((item)=>item.ifvg?.state !== IFVG_STATE.FAILED).slice(0, 2);
    const detailHtml = nonFailed.map(({ detail })=>{
      const line = formatIfvgContextLine(detail, frame.label);
      return `<div class="ifvg-context-row"><span class="ifvg-context-badge ${getIfvgContextStatusClass(line.state)}">${escapeHtml(formatIfvgStateLabel(line.state))}</span><strong>${escapeHtml(line.title)}</strong><small>${escapeHtml(line.note)}</small></div>`;
    }).join("");
    const failedNote = counts.failed ? `<p class="ifvg-context-note">${counts.failed === frame.summary.items.length ? "Recent IFVG attempts mostly failed after reclaim." : `${counts.failed} failed after reclaim.`}</p>` : "";
    return `<article class="ifvg-context-timeframe"><h4>${escapeHtml(frame.label)}</h4><p class="ifvg-context-counts">${escapeHtml(countLabels(counts))}</p>${detailHtml}${failedNote}</article>`;
  }).join("");
  els.ifvgContextPanel.innerHTML = `
    <div class="ifvg-context-header">
      <div>
        <h3>IFVG Context</h3>
        <p class="ifvg-context-subtitle">Context only · not a trading signal</p>
      </div>
    </div>
    ${hasItems ? `<div class="ifvg-context-grid">${frameHtml}</div>` : `<p class="ifvg-context-note">No recent IFVG context detected.</p>`}
  `;
}
function inferSingleZoneType(row){
  const text = `${row?.label || ""} ${row?.source || ""} ${row?.primarySource || ""}`.toLowerCase();
  if(text.includes("fvg")) return "FVG";
  if(text.includes("support")) return "Support";
  if(text.includes("resistance")) return "Resistance";
  if(text.includes("range")) return "Range Boundary";
  if(text.includes("daily_pattern") || text.includes("channel")) return "Channel Boundary";
  return row?.label || "Zone";
}
function getConfluenceType(row){
  const count = Number(row?.confluenceCount) || getConfluenceSourceList(row).length;
  if(count >= 4) return "Major Confluence";
  if(count === 3) return "Strong Confluence";
  if(count === 2) return "Confluence";
  return inferSingleZoneType(row);
}
function formatMapRowForDisplay(row){
  const fvgBadges = formatMapRowFvgBadges(row);
  const fullSources = row?.confluenceLabel || row?.detail || (Array.isArray(row?.sources) ? row.sources.map(formatSourceLabel).filter(Boolean).join(" + ") : "") || row?.quality || "";
  return {
    zone: row?.zoneText || (Number.isFinite(row?.lower) && Number.isFinite(row?.upper) ? `${usd(row.lower)}–${usd(row.upper)}` : "—"),
    type: getConfluenceType(row),
    sources: formatConfluenceSources(row, 3),
    fvgBadges,
    distance: row?.distanceText || "—",
    fullSources: [fullSources, fvgBadges].filter(Boolean).join(" | "),
  };
}
function getMapRowCenter(row){
  if(Number.isFinite(row?.center)) return row.center;
  const lower = Number(row?.lower), upper = Number(row?.upper);
  return Number.isFinite(lower) && Number.isFinite(upper) ? (Math.min(lower, upper) + Math.max(lower, upper)) / 2 : null;
}
function getMapRowStableKey(row){
  if(!row) return "";
  const lower = Number(row.lower), upper = Number(row.upper), center = getMapRowCenter(row);
  const sourceKey = getConfluenceSourceList(row).map((source)=>`${source?.source || source?.primarySource || ""}:${source?.label || ""}:${Number(source?.lower || 0).toFixed(2)}:${Number(source?.upper || 0).toFixed(2)}`).join("|");
  return [row.primarySource || row.source || "zone", row.label || row.quality || "", Number.isFinite(lower) ? lower.toFixed(2) : "na", Number.isFinite(upper) ? upper.toFixed(2) : "na", Number.isFinite(center) ? center.toFixed(2) : "na", sourceKey].join("|");
}
function isSameMapRow(a, b){ return !!a && !!b && getMapRowStableKey(a) === getMapRowStableKey(b); }
function getPriceLadderRows(rows){
  return [...(rows || [])].sort((a,b)=>{
    const ac = getMapRowCenter(a);
    const bc = getMapRowCenter(b);
    return (Number.isFinite(bc) ? bc : -Infinity) - (Number.isFinite(ac) ? ac : -Infinity);
  });
}
function formatNearestZoneDetail(row, directionText){
  if(!row) return { range: "—", type: "—", sources: "—" };
  const display = formatMapRowForDisplay(row);
  const distance = display.distance && display.distance !== "—" ? `${display.distance} ${directionText}` : `— ${directionText}`;
  return { range: `${display.zone} · ${distance}`, type: display.type || "—", sources: display.sources || "—" };
}
function renderKeyZoneDetailBlock(title, detail){
  return `<div class="key-zone-nearest-card"><p class="key-zone-zone-title">${escapeHtml(title)}</p><p class="key-zone-zone-range">${escapeHtml(detail?.range || "—")}</p><p class="key-zone-zone-detail">Type: ${escapeHtml(detail?.type || "—")}</p><p class="key-zone-zone-detail">Sources: ${escapeHtml(detail?.sources || "—")}</p></div>`;
}
function renderMarketMapHeader(){
  return `<div class="prep-map-header-row" aria-hidden="true"><span>Zone</span><span>Type</span><span>Sources</span><span>Distance</span></div>`;
}
function renderMarketMapGrid(rows, { nearestRow = null, nearestLabel = "" } = {}){
  return (rows || []).map((r)=>{
    const display = formatMapRowForDisplay(r);
    const title = escapeHtml(display.fullSources || display.sources);
    const sourceHtml = `${escapeHtml(display.sources)}${display.fvgBadges ? `<span class="prep-map-row-badges">${escapeHtml(display.fvgBadges)}</span>` : ""}`;
    const nearest = isSameMapRow(r, nearestRow);
    const className = `prep-map-row${nearest ? " is-nearest-zone" : ""}`;
    const nearestPill = nearest && nearestLabel ? `<span class="prep-map-nearest-label">${escapeHtml(nearestLabel)}</span>` : "";
    return `<div class="${className}" title="${title}"><span class="prep-map-row-zone" data-label="Zone">${nearestPill}${escapeHtml(display.zone)}</span><span class="prep-map-row-type" data-label="Type">${escapeHtml(display.type)}</span><span class="prep-map-row-sources" data-label="Sources">${sourceHtml}</span><span class="prep-map-row-distance" data-label="Distance">${escapeHtml(display.distance)}</span></div>`;
  }).join("");
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

function formatDailyContextZoneText(zone){
  const lower = Number(zone?.lower);
  const upper = Number(zone?.upper);
  if(Number.isFinite(lower) && Number.isFinite(upper)) return `${formatDiagnosticPrice(lower)}–${formatDiagnosticPrice(upper)}`;
  const price = Number(zone?.price ?? zone?.level ?? zone?.center);
  return Number.isFinite(price) ? formatDiagnosticPrice(price) : "unavailable";
}
function classifyDailyContextZoneRelation(zone, currentPrice){
  const price = Number(currentPrice);
  const lower = Number(zone?.lower);
  const upper = Number(zone?.upper);
  if(!Number.isFinite(price) || !Number.isFinite(lower) || !Number.isFinite(upper) || price <= 0) return "unavailable";
  if(price >= lower && price <= upper) return "inside";
  const nearest = price > upper ? upper : lower;
  const distancePct = Math.abs(price - nearest) / price * 100;
  if(distancePct <= 1.5) return "near";
  return price > upper ? "above" : "below";
}
function getDailyContextFvgDirection(zone){
  const text = `${zone?.type || ""} ${zone?.direction || ""} ${zone?.label || ""}`.toLowerCase();
  if(text.includes("bullish")) return "bullish";
  if(text.includes("bearish")) return "bearish";
  return "mixed";
}
function buildDailyContextFvgSummary(dailyState = {}, currentPrice = null, skipped = []){
  const zones = Array.isArray(dailyState.fvgZones) ? dailyState.fvgZones : [];
  const details = Array.isArray(dailyState.fvgDetails) ? dailyState.fvgDetails : [];
  const nearest = zones[0] || getFvgDetailZone(details[0]) || null;
  if(!nearest){
    skipped.push("Daily FVG unavailable");
    return { nearestType: "unavailable", nearestStatus: "unavailable", relation: "unavailable", zoneText: "unavailable" };
  }
  const direction = getDailyContextFvgDirection(nearest);
  const status = nearest.detailStatus || nearest.status || details[0]?.detailStatus || "active";
  return {
    nearestType: direction,
    nearestStatus: String(status || "active").toLowerCase(),
    relation: classifyDailyContextZoneRelation(nearest, currentPrice),
    zoneText: formatDailyContextZoneText(nearest),
  };
}
function buildDailyContextIfvgSummary(dailyState = {}, skipped = []){
  const summary = summarizeIfvgMemory(dailyState.recentBrokenFvgDetails);
  const counts = {
    total: summary.items.length,
    bullish: summary.items.filter(({ detail, ifvg })=>String(getIfvgDisplayDirection(ifvg, detail)).toLowerCase() === "bullish").length,
    bearish: summary.items.filter(({ detail, ifvg })=>String(getIfvgDisplayDirection(ifvg, detail)).toLowerCase() === "bearish").length,
    confirmed: summary.counts.confirmed,
    valid: summary.counts.valid,
    possible: summary.counts.possible,
    failed: summary.counts.failed,
  };
  const latest = summary.items[0] || null;
  if(!latest){
    skipped.push("Daily IFVG unavailable");
    return { counts, latestLabel: "unavailable", latestState: "unavailable" };
  }
  const line = formatIfvgContextLine(latest.detail, "Daily");
  return { counts, latestLabel: line.title, latestState: latest.ifvg?.state || "unavailable" };
}
function buildDailyContextSrItem(zone, label, currentPrice){
  if(!zone) return null;
  const lower = Number(zone.lower);
  const upper = Number(zone.upper);
  const center = Number.isFinite(lower) && Number.isFinite(upper) ? (lower + upper) / 2 : Number(zone.price ?? zone.level ?? zone.center);
  const price = Number(currentPrice);
  const distancePct = Number.isFinite(price) && price > 0 && Number.isFinite(center) ? Math.abs(price - center) / price * 100 : null;
  return {
    label,
    price: Number.isFinite(center) ? center : null,
    distancePct,
    quality: zone.strength || (Number.isFinite(Number(zone.touchCount)) ? `Touch ${zone.touchCount}x` : "unavailable"),
  };
}
function buildDailyContextSrSummary(dailyState = {}, currentPrice = null, skipped = []){
  const sr = dailyState.srSummary || {};
  const nearestSupport = buildDailyContextSrItem(sr.support?.nearest || sr.support, "Nearest support", currentPrice);
  const nearestResistance = buildDailyContextSrItem(sr.resistance?.nearest || sr.resistance, "Nearest resistance", currentPrice);
  if(!nearestSupport && !nearestResistance) skipped.push("Daily S/R unavailable");
  return { nearestSupport, nearestResistance };
}
function buildDailyContextPatternSummary(dailyState = {}, skipped = []){
  const pattern = getDailyPatternDetail(dailyState.pattern);
  if(!pattern.ok) skipped.push("Daily pattern unavailable");
  return { name: pattern.pattern, status: pattern.status, position: pattern.position, touches: pattern.touches, reason: pattern.reason };
}
function deriveDailyContextBias({ available, fvg, ifvg, sr, pattern }){
  if(!available) return "unavailable";
  let bullish = 0;
  let bearish = 0;
  if(fvg?.nearestType === "bullish") bullish += 1;
  if(fvg?.nearestType === "bearish") bearish += 1;
  const latestIfvg = `${ifvg?.latestLabel || ""}`.toLowerCase();
  if(latestIfvg.includes("bullish")) bullish += 1;
  if(latestIfvg.includes("bearish")) bearish += 1;
  if(sr?.nearestSupport) bullish += 1;
  if(sr?.nearestResistance) bearish += 1;
  const patternText = `${pattern?.name || ""} ${pattern?.position || ""}`.toLowerCase();
  if(patternText.includes("rising") || patternText.includes("support")) bullish += 1;
  if(patternText.includes("falling") || patternText.includes("resistance")) bearish += 1;
  if(bullish > 0 && bearish > 0) return "mixed context";
  if(bullish > bearish) return "bullish context";
  if(bearish > bullish) return "bearish context";
  return "neutral context";
}
function buildDailyContextSnapshot(dailyState = marketPreparationState.daily, currentPrice = marketPreparationState.currentPrice){
  const warnings = ["Daily context only; not used by H4 confirmed gate"];
  const skipped = [];
  const state = dailyState || {};
  const candles = Array.isArray(state.candles) ? state.candles : [];
  const fvgZones = Array.isArray(state.fvgZones) ? state.fvgZones : [];
  const fvgDetails = Array.isArray(state.fvgDetails) ? state.fvgDetails : [];
  const hasSr = !!state.srSummary;
  const hasPattern = state.pattern?.ok === true;
  const available = !!(candles.length || fvgZones.length || fvgDetails.length || hasSr || hasPattern);
  if(!available) skipped.push("Daily data unavailable");
  const rangeMode = state.meta?.rangeMode || activeDailyRange || "unavailable";
  const candleCount = Number.isFinite(Number(state.meta?.candleCount)) ? Number(state.meta.candleCount) : candles.length;
  const fvg = buildDailyContextFvgSummary(state, currentPrice, skipped);
  const ifvg = buildDailyContextIfvgSummary(state, skipped);
  const sr = buildDailyContextSrSummary(state, currentPrice, skipped);
  const pattern = buildDailyContextPatternSummary(state, skipped);
  const contextBias = deriveDailyContextBias({ available, fvg, ifvg, sr, pattern });
  return { available, rangeMode, candleCount, fvg, ifvg, sr, pattern, contextBias, warnings: [...new Set(warnings)], skipped: [...new Set(skipped)] };
}
function formatDailyContextForMarketPreparation(snapshot){
  if(!snapshot || snapshot.available !== true) return "Daily: context unavailable";
  const patternText = `${snapshot.pattern?.name || ""} ${snapshot.pattern?.status || ""} ${snapshot.pattern?.position || ""}`.toLowerCase();
  if(patternText.includes("rising")) return "Daily: rising channel";
  if(patternText.includes("falling")) return "Daily: falling channel";
  if(patternText.includes("range")) return "Daily: range context";
  if(snapshot.fvg?.nearestType && snapshot.fvg.nearestType !== "unavailable") return "Daily: FVG context";
  if(snapshot.sr?.nearestSupport) return "Daily: near support";
  if(snapshot.sr?.nearestResistance) return "Daily: near resistance";
  const bias = String(snapshot.contextBias || "").toLowerCase();
  if(["bullish context", "bearish context", "mixed context", "neutral context"].includes(bias)) return `Daily: ${bias}`;
  return "Daily: neutral context";
}
function formatDailyContextChipValue(snapshot){
  return formatDailyContextForMarketPreparation(snapshot).replace(/^Daily:\s*/i, "");
}
function formatDailyContextSrItem(item){
  if(!item) return "unavailable";
  const price = Number.isFinite(Number(item.price)) ? formatDiagnosticPrice(item.price) : "unavailable";
  const distance = Number.isFinite(Number(item.distancePct)) ? ` · ${f1(Number(item.distancePct))}%` : "";
  const quality = item.quality && item.quality !== "unavailable" ? ` · ${item.quality}` : "";
  return `${item.label}: ${price}${distance}${quality}`;
}
function formatDailyContextFvgLine(fvg){
  if(!fvg || fvg.nearestType === "unavailable") return "FVG context unavailable";
  return `${fvg.nearestType} · ${fvg.nearestStatus} · ${fvg.relation} · ${fvg.zoneText}`;
}
function formatDailyContextIfvgLine(ifvg){
  if(!ifvg || ifvg.latestState === "unavailable") return "IFVG context unavailable";
  const total = Number(ifvg.counts?.total) || 0;
  return `${ifvg.latestLabel} · ${ifvg.latestState} · total ${total}`;
}
function renderDailyContextSummary(){
  if(!els.dailyContextSummary) return;
  const snapshot = buildDailyContextSnapshot(marketPreparationState.daily, marketPreparationState.currentPrice);
  if(!snapshot.available){
    els.dailyContextSummary.innerHTML = `<h4>Daily Context</h4><p>Daily context unavailable.</p><small>Context only · bridges Weekly bias and 4H reaction</small>`;
    return;
  }
  const srLine = [formatDailyContextSrItem(snapshot.sr.nearestSupport), formatDailyContextSrItem(snapshot.sr.nearestResistance)].filter((item)=>item !== "unavailable").join(" | ") || "S/R context unavailable";
  els.dailyContextSummary.innerHTML = `
    <h4>Daily Context</h4>
    <small>Context only · bridges Weekly bias and 4H reaction</small>
    <div class="daily-context-grid">
      <span><strong>Range</strong>${escapeHtml(snapshot.rangeMode)}</span>
      <span><strong>Candles</strong>${escapeHtml(formatDiagnosticValue(snapshot.candleCount))}</span>
      <span><strong>Bias</strong>${escapeHtml(snapshot.contextBias)}</span>
      <span><strong>FVG</strong>${escapeHtml(formatDailyContextFvgLine(snapshot.fvg))}</span>
      <span><strong>IFVG</strong>${escapeHtml(formatDailyContextIfvgLine(snapshot.ifvg))}</span>
      <span><strong>S/R</strong>${escapeHtml(srLine)}</span>
      <span><strong>Pattern</strong>${escapeHtml(`${snapshot.pattern.name} · ${snapshot.pattern.status} · ${snapshot.pattern.position}`)}</span>
    </div>
  `;
}
function runDailyContextSnapshotFixtureTests(){
  const makeResult = (name, passed, expected, actual, details = {})=>({ name, passed: !!passed, expected, actual, details });
  const mockPattern = { ok:true, type:"Rising Channel", status:"Valid", currentPosition:"near support", supportTouches:2, resistanceTouches:2, totalTouches:4, reason:"Daily pattern fixture.", rangeMode:"3M" };
  const fixtures = [
    {
      name: "empty daily state is unavailable and safe",
      run: ()=>buildDailyContextSnapshot({ candles: [], fvgZones: [], fvgDetails: [], srSummary: null, pattern: null, meta: { rangeMode:"3M", candleCount:0 } }, 100),
      verify: (actual)=>!actual.available && actual.contextBias === "unavailable" && actual.skipped.includes("Daily data unavailable"),
      expected: "available false, unavailable context, no throw",
    },
    {
      name: "daily FVG and support context summarizes",
      run: ()=>buildDailyContextSnapshot({ candles:[{close:100}], fvgZones:[{ type:"Daily Bullish FVG", lower:96, upper:101, status:"Active" }], fvgDetails:[], recentBrokenFvgDetails:{ all:[] }, srSummary:{ support:{ nearest:{ lower:95, upper:98, touchCount:3 } } }, pattern:null, meta:{ rangeMode:"3M", candleCount:1 } }, 100),
      verify: (actual)=>actual.available && actual.fvg.nearestType === "bullish" && !!actual.sr.nearestSupport && actual.contextBias !== "unavailable",
      expected: "available true with FVG and support summary",
    },
    {
      name: "daily pattern context summarizes",
      run: ()=>buildDailyContextSnapshot({ candles:[{close:100}], fvgZones:[], fvgDetails:[], recentBrokenFvgDetails:{ all:[] }, srSummary:null, pattern:mockPattern, meta:{ rangeMode:"3M", candleCount:1 } }, 100),
      verify: (actual)=>actual.pattern.name === "Rising Channel" && actual.pattern.status === "Valid" && actual.pattern.position === "near support",
      expected: "pattern summary exists",
    },
    {
      name: "missing optional shapes remain safe",
      run: ()=>buildDailyContextSnapshot({ candles:[{close:100}], meta:{ rangeMode:"3M", candleCount:1 } }, 100),
      verify: (actual)=>actual.available && actual.skipped.length >= 3 && actual.warnings.includes("Daily context only; not used by H4 confirmed gate"),
      expected: "no throw with skipped and warning details",
    },
    {
      name: "formatter returns unavailable phrase",
      run: ()=>formatDailyContextForMarketPreparation({ available:false }),
      verify: (actual)=>actual === "Daily: context unavailable",
      expected: "Daily: context unavailable",
    },
    {
      name: "formatter prefers pattern context",
      run: ()=>formatDailyContextForMarketPreparation({ available:true, pattern:{ name:"Rising Channel", status:"Valid", position:"near support" }, fvg:{ nearestType:"bullish" }, sr:{ nearestSupport:{ label:"support" } }, contextBias:"mixed context" }),
      verify: (actual)=>actual === "Daily: rising channel",
      expected: "Daily: rising channel",
    },
    {
      name: "formatter returns FVG context",
      run: ()=>formatDailyContextForMarketPreparation({ available:true, pattern:{ name:"—", status:"Unavailable", position:"—" }, fvg:{ nearestType:"bullish" }, sr:{}, contextBias:"neutral context" }),
      verify: (actual)=>actual === "Daily: FVG context",
      expected: "Daily: FVG context",
    },
    {
      name: "formatter returns support context",
      run: ()=>formatDailyContextForMarketPreparation({ available:true, pattern:{ name:"—", status:"Unavailable", position:"—" }, fvg:{ nearestType:"unavailable" }, sr:{ nearestSupport:{ label:"support" } }, contextBias:"neutral context" }),
      verify: (actual)=>actual === "Daily: near support",
      expected: "Daily: near support",
    },
    {
      name: "formatter falls back to bias context",
      run: ()=>formatDailyContextForMarketPreparation({ available:true, pattern:{ name:"—", status:"Unavailable", position:"—" }, fvg:{ nearestType:"unavailable" }, sr:{}, contextBias:"neutral context" }),
      verify: (actual)=>actual === "Daily: neutral context",
      expected: "Daily: neutral context",
    },
    {
      name: "formatter avoids prohibited wording",
      run: ()=>formatDailyContextForMarketPreparation({ available:true, pattern:{ name:"Range", status:"Valid", position:"middle" }, fvg:{ nearestType:"unavailable" }, sr:{}, contextBias:"neutral context" }),
      verify: (actual)=>{
        const prohibited = ["b"+"uy", "s"+"ell", "en"+"try", "sig"+"nal", "take"+" profit", "stop"+" loss", "win"+"rate", "prob"+"ability", "lev"+"erage", "position"+" size", "guar"+"anteed", "sure"+" profit", "exact"+" stop", "exact"+" target"];
        return !prohibited.some((term)=>String(actual).toLowerCase().includes(term));
      },
      expected: "no prohibited action wording",
    },
    {
      name: "compact row stays PDF-safe while Market Preparation row keeps Daily phrase",
      run: ()=>{
        const priorPrice = marketPreparationState.currentPrice;
        marketPreparationState.currentPrice = 100;
        const detail = buildCurrentPriceDetailDataV2({ upside: [], downside: [] });
        const map = buildMarketPreparationMap();
        marketPreparationState.currentPrice = priorPrice;
        return { compactRowText: detail.compactRowText, currentRowText: map.currentRowText };
      },
      verify: (actual)=>!String(actual.compactRowText).includes("Daily:") && String(actual.currentRowText).includes("Daily:"),
      expected: "compactRowText excludes Daily while Market Preparation row includes it",
    },
    {
      name: "Daily default range is 3M with legacy range buttons preserved",
      run: ()=>({
        activeDailyRange,
        dailyPreset,
        metaRangeMode: marketPreparationState.daily?.meta?.rangeMode,
        metaPreset: marketPreparationState.daily?.meta?.preset,
        limit3m: DAILY_PRESET_LIMITS["3m"],
        limit6m: DAILY_PRESET_LIMITS["6m"],
        limit1y: DAILY_PRESET_LIMITS["1y"],
      }),
      verify: (actual)=>actual.activeDailyRange === "3M"
        && actual.dailyPreset === "3m"
        && actual.metaRangeMode === "3M"
        && actual.metaPreset === "3m"
        && actual.limit3m === 92
        && actual.limit6m === 183
        && actual.limit1y === 365,
      expected: "Daily defaults to 3M and keeps 6M/1Y limits",
    },
    {
      name: "no alternate Daily key or liquidity state regression",
      run: ()=>{
        const alternateDailyKey = ["d", "1"].join("");
        const liquidityKey = ["liquidity", "OrderflowState"].join("");
        return {
          hasAlternateDailyKey: Boolean(marketPreparationState[alternateDailyKey]),
          hasDailyLiquidity: Boolean(marketPreparationState.daily?.[liquidityKey]),
          hasH1Liquidity: Boolean(marketPreparationState.h1?.[liquidityKey]),
        };
      },
      verify: (actual)=>actual.hasAlternateDailyKey === false && actual.hasDailyLiquidity === false && actual.hasH1Liquidity === false,
      expected: "no alternate Daily key, no Daily liquidity state, no H1 liquidity state",
    },
  ];
  const results = fixtures.map((fixture)=>{
    try{
      const actual = fixture.run();
      return makeResult(fixture.name, fixture.verify(actual), fixture.expected, actual);
    } catch(error){
      return makeResult(fixture.name, false, fixture.expected, error?.message || String(error), { error: true });
    }
  });
  const failed = results.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: results.length, failed, results };
}
if(typeof window !== "undefined"){
  window.buildDailyContextSnapshot = buildDailyContextSnapshot;
  window.formatDailyContextForMarketPreparation = formatDailyContextForMarketPreparation;
  window.runDailyContextSnapshotFixtureTests = runDailyContextSnapshotFixtureTests;
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
    (marketPreparationState.h4.fvgZones||[]).forEach((z)=>add({ side: z.type?.includes("Bullish")?'downside':'upside', symbol: z.type?.includes("Bullish")?'▼':'▲', lower: z.lower, upper: z.upper, label: z.type?.includes("Bullish")?'4H Bullish FVG':'4H Bearish FVG', quality: z.status||'Active', source:'h4_fvg', priorityScore:32, detail:'' }));
    const h4sr = marketPreparationState.h4.srSummary;
    if(h4sr?.support?.nearest) add({ side:'downside', symbol:'▼', lower:h4sr.support.nearest.lower, upper:h4sr.support.nearest.upper, label:'4H Support', quality:`Touch ${h4sr.support.nearest.touchCount}x`, source:'h4_sr', priorityScore:40, detail:'' });
    if(h4sr?.resistance?.nearest) add({ side:'upside', symbol:'▲', lower:h4sr.resistance.nearest.lower, upper:h4sr.resistance.nearest.upper, label:'4H Resistance', quality:`Touch ${h4sr.resistance.nearest.touchCount}x`, source:'h4_sr', priorityScore:40, detail:'' });
    const upside = mergeConfluenceRows(rows.filter((r)=>r.side==='upside' && (Number.isFinite(price) ? r.center>price : true)), price);
    const downside = mergeConfluenceRows(rows.filter((r)=>r.side==='downside' && (Number.isFinite(price) ? r.center<price : true)), price);
    const h4RsiText = marketPreparationState.h4.rsiStatus?.ok ? ` | ${marketPreparationState.h4.rsiStatus.label}` : "";
    const dailyContextText = formatDailyContextForMarketPreparation(buildDailyContextSnapshot(marketPreparationState.daily, price));
    const currentRowText = Number.isFinite(price)
      ? `● ${usd(price)} | ${dailyContextText} | ${marketPreparationState.h4.structureStatus||'4H —'}${h4RsiText} | 1H Sweep: ${marketPreparationState.h1.sweepStatus||'—'} | 1H Structure: ${marketPreparationState.h1.structureStatus||'—'}`
      : "● Price unavailable | Daily: context unavailable | Waiting for ticker/4H/1H context";
    return { upside, downside, currentRowText };
  } catch {
    return { upside: [], downside: [], currentRowText: "● Price unavailable | Daily: context unavailable | Waiting for ticker/4H/1H context" };
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
function formatFvgZoneSummary(zone, fallback = "—"){
  if(!zone) return fallback;
  const label = zone.label || getFvgDetailLabel(zone) || "FVG";
  const normalized = getFvgDetailZone(zone);
  return normalized ? `${label} ${usd(normalized.lower)}–${usd(normalized.upper)}` : label;
}
function formatFvgMtfContextSummary(context = marketPreparationState.fvgMtfContext){
  const relation = context?.relation || "No clear MTF FVG overlap";
  const parent = formatFvgZoneSummary(context?.parentZone, "Parent zone unavailable");
  const core = context?.coreZone || context?.overlapZone;
  const coreText = core?.lower && core?.upper ? `${usd(core.lower)}–${usd(core.upper)}` : "Core zone unavailable";
  return { relation, parent, core: coreText, timing: formatFvgTimingZoneText(context?.timingZone), reason: context?.conflict?.ok ? context.conflict.reason : (context?.reason || "No clear MTF FVG overlap.") };
}
function getFvgDetailZone(detail){
  const zone = detail?.sourceZone || detail;
  const lower = Number(zone?.lower);
  const upper = Number(zone?.upper);
  if(!Number.isFinite(lower) || !Number.isFinite(upper) || upper <= lower) return null;
  return { ...zone, lower, upper };
}
function getFvgDetailLabel(detail){
  const tf = detail?.timeframe || detail?.sourceZone?.timeframe || "FVG";
  const direction = detail?.direction || getFvgDirection(detail?.sourceZone || detail);
  const dirLabel = direction === "bullish" ? "Bullish" : (direction === "bearish" ? "Bearish" : "");
  return `${tf} ${dirLabel} FVG`.replace(/\s+/g, " ").trim();
}
function getFvgRecentCandles(timeframe){
  const tf = String(timeframe || "").toLowerCase();
  if(tf.includes("daily") || tf === "1d") return (marketPreparationState.daily?.candles?.length ? marketPreparationState.daily.candles : latestDailyCandles) || [];
  if(tf.includes("4h")) return latest4hCandles || [];
  if(tf.includes("weekly") || tf.includes("week")) return weeklyDatasetCache || [];
  return latest4hCandles?.length ? latest4hCandles : ((marketPreparationState.daily?.candles?.length ? marketPreparationState.daily.candles : latestDailyCandles) || []);
}
function getImportantFvgDetailsForPosition(){
  const sources = [
    { timeframe: "Daily", details: marketPreparationState.daily?.fvgDetails, zones: marketPreparationState.daily?.fvgZones, candles: marketPreparationState.daily?.candles?.length ? marketPreparationState.daily.candles : latestDailyCandles, priority: 300 },
    { timeframe: "4H", details: marketPreparationState.h4?.fvgDetails, zones: marketPreparationState.h4?.fvgZones, candles: latest4hCandles, priority: 200 },
    { timeframe: "Weekly", details: marketPreparationState.weekly?.fvgDetails, zones: marketPreparationState.weekly?.fvgZones, candles: weeklyDatasetCache, priority: 100 },
  ];
  return sources.flatMap((src)=>{
    const details = Array.isArray(src.details) && src.details.length ? src.details : buildFvgDetailsForTimeframe(src.zones || [], src.candles || [], src.timeframe);
    return (details || []).map((detail)=>({ ...detail, __priority: src.priority }));
  }).filter((detail)=>getFvgDetailZone(detail));
}
function getFvgDistancePctFromPrice(zone, currentPrice){
  if(!zone || !Number.isFinite(currentPrice) || currentPrice <= 0) return null;
  if(currentPrice >= zone.lower && currentPrice <= zone.upper) return 0;
  const boundary = currentPrice > zone.upper ? zone.upper : zone.lower;
  return Math.abs(currentPrice - boundary) / currentPrice * 100;
}
function isMovingTowardFvg(zone, currentPrice, recentCandles){
  if(!zone || !Number.isFinite(currentPrice) || !Array.isArray(recentCandles) || recentCandles.length < 3) return false;
  const last = recentCandles.slice(-3).map((c)=>Number(c?.close)).filter(Number.isFinite);
  if(last.length < 3) return false;
  if(currentPrice < zone.lower) return last[last.length - 1] > last[0];
  if(currentPrice > zone.upper) return last[last.length - 1] < last[0];
  return false;
}
function getFvgRecentBoundaryReaction(detail, zone, recentCandles){
  const direction = detail?.direction || getFvgDirection(zone);
  if(!direction || !zone || !Array.isArray(recentCandles) || recentCandles.length < 2) return null;
  const recent = recentCandles.slice(-3);
  const touched = recent.some((c)=>Number(c?.high) >= zone.lower && Number(c?.low) <= zone.upper);
  const last = recent[recent.length - 1];
  const prev = recent[recent.length - 2];
  const lastClose = Number(last?.close), prevClose = Number(prev?.close);
  if(!touched || !Number.isFinite(lastClose) || !Number.isFinite(prevClose)) return null;
  if(direction === "bullish" && lastClose > prevClose && lastClose >= zone.lower) return { position: "Bounced from FVG", reaction: "Bounced from bullish FVG" };
  if(direction === "bearish" && lastClose < prevClose && lastClose <= zone.upper) return { position: "Rejected from FVG", reaction: "Rejected from bearish FVG" };
  return null;
}
function classifyCurrentPriceVsFvg(detail, currentPrice, recentCandles){
  const zone = getFvgDetailZone(detail);
  if(!zone || !Number.isFinite(currentPrice)) return null;
  const cePrice = Number.isFinite(detail?.cePrice) ? detail.cePrice : getFvgCePrice(zone);
  const width = Math.max(1e-9, zone.upper - zone.lower);
  const toleranceAbs = Math.max(currentPrice * 0.005, width * 0.25);
  const ceToleranceAbs = Math.max(currentPrice * 0.003, width * 0.18);
  const distancePct = getFvgDistancePctFromPrice(zone, currentPrice);
  let position = currentPrice > zone.upper ? "Above FVG" : (currentPrice < zone.lower ? "Below FVG" : "Inside FVG");
  let ceStatus = null;
  let recentReaction = detail?.recentReaction || null;
  if(detail?.detailStatus === "Broken") position = "Broke through FVG";
  else if(Number.isFinite(cePrice) && Math.abs(currentPrice - cePrice) <= ceToleranceAbs){ position = "Testing CE"; ceStatus = "Testing CE"; }
  else {
    const boundaryReaction = getFvgRecentBoundaryReaction(detail, zone, recentCandles);
    if(boundaryReaction){ position = boundaryReaction.position; recentReaction = boundaryReaction.reaction; }
    else if(currentPrice < zone.lower && zone.lower - currentPrice <= toleranceAbs) position = "Near FVG";
    else if(currentPrice > zone.upper && currentPrice - zone.upper <= toleranceAbs) position = "Near FVG";
    else if(position !== "Inside FVG" && isMovingTowardFvg(zone, currentPrice, recentCandles)) position = "Approaching FVG";
  }
  const label = getFvgDetailLabel(detail);
  const zoneRange = `${usd(zone.lower)}–${usd(zone.upper)}`;
  return {
    ok: true,
    timeframe: detail?.timeframe || null,
    zoneType: label,
    zoneRange,
    detailStatus: detail?.detailStatus || detail?.baseStatus || null,
    position,
    ceStatus,
    distancePct,
    recentReaction,
    reason: `${position}: ${label} ${zoneRange}`,
    updatedAt: Date.now(),
    __priority: detail.__priority || 0,
  };
}
function getNearestFvgPosition(currentPrice){
  const details = getImportantFvgDetailsForPosition();
  if(!Number.isFinite(currentPrice) || !details.length) return null;
  const candidates = details.map((detail)=>{
    const recentCandles = getFvgRecentCandles(detail.timeframe);
    const status = classifyCurrentPriceVsFvg(detail, currentPrice, recentCandles);
    return status ? { ...status, detail } : null;
  }).filter(Boolean);
  const rankPosition = (p)=>{
    if(p.position === "Broke through FVG") return 6;
    if(p.position === "Testing CE") return 5;
    if(p.position === "Inside FVG") return 4;
    if(p.position === "Rejected from FVG" || p.position === "Bounced from FVG") return 3;
    if(p.position === "Near FVG") return 2;
    if(p.position === "Approaching FVG") return 1;
    return 0;
  };
  return candidates.sort((a,b)=>
    (rankPosition(b) - rankPosition(a))
    || ((b.__priority || 0) - (a.__priority || 0))
    || ((a.distancePct ?? 999) - (b.distancePct ?? 999))
  )[0] || null;
}
function buildCurrentFvgPositionStatus(){
  const currentPrice = marketPreparationState.currentPrice;
  if(!Number.isFinite(currentPrice)) return { ok: false, timeframe: null, zoneType: null, zoneRange: null, detailStatus: null, position: "FVG position unavailable", ceStatus: null, distancePct: null, recentReaction: null, reason: "Current price unavailable.", updatedAt: Date.now() };
  const nearest = getNearestFvgPosition(currentPrice);
  if(!nearest) return { ok: false, timeframe: null, zoneType: null, zoneRange: null, detailStatus: null, position: "No nearby active FVG", ceStatus: null, distancePct: null, recentReaction: null, reason: "No important active FVG is available near current price.", updatedAt: Date.now() };
  const activePositions = new Set(["Inside FVG", "Near FVG", "Approaching FVG", "Testing CE", "Rejected from FVG", "Bounced from FVG", "Broke through FVG"]);
  if(!activePositions.has(nearest.position)) nearest.position = "Between key zones";
  return nearest;
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
      fvg: buildCurrentFvgPositionStatus(),
      timeframe: "4H",
      updatedAt: Date.now(),
    };
  }catch{
    return { currentPosition: "Current position unavailable", nearestUpsideZone: null, nearestDownsideZone: null, recentReaction: null, recentReactionMemory: marketPreparationState.h4?.recentReaction || null, fvg: { ok: false, timeframe: null, zoneType: null, zoneRange: null, detailStatus: null, position: "FVG position unavailable", ceStatus: null, distancePct: null, recentReaction: null, reason: "FVG position unavailable.", updatedAt: Date.now() }, timeframe: "4H", updatedAt: Date.now() };
  }
}
function getKeyZonePositionContext(mapData, state){
  const status = buildCurrentPricePositionStatus(state, mapData);
  const patternContext = getDailyPatternKeyZoneContext(state);
  const recentReaction = patternContext.recentReaction || (status.recentReaction?.confirmation
    ? `${formatRecentReactionLabel(status.recentReaction)} · ${status.recentReaction.confirmation}`
    : formatRecentReactionLabel(status.recentReaction));
  return {
    referencePrice: Number.isFinite(state?.currentPrice) ? usd(state.currentPrice) : "—",
    nearestUpside: status.nearestUpsideZone?.text || "Nearest upside unavailable",
    nearestDownside: status.nearestDownsideZone?.text || "Nearest downside unavailable",
    nearestUpsideDetail: formatNearestZoneDetail(status.nearestUpsideZone, "above"),
    nearestDownsideDetail: formatNearestZoneDetail(status.nearestDownsideZone, "below"),
    position: patternContext.currentPosition || status.currentPosition || "Current position unavailable",
    recentReaction,
    fvg: status.fvg || buildCurrentFvgPositionStatus(),
    recentFvgReaction: formatRecentFvgReactionText(getMostRecentFvgReactionMemory()),
    conflict: marketPreparationState.fvgMtfContext?.conflict || createEmptyFvgConflictState(),
    quality: marketPreparationState.fvgQuality || createEmptyFvgQualityState(),
    mtfContext: formatFvgMtfContextSummary(marketPreparationState.fvgMtfContext),
    timingZone: marketPreparationState.fvgMtfContext?.timingZone || createEmptyFvgTimingZone(),
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
  const dailySnapshot = buildDailyContextSnapshot(marketPreparationState.daily, price);
  const dailyContextText = formatDailyContextForMarketPreparation(dailySnapshot);
  const keyZone = getKeyZonePositionContext(mapData, marketPreparationState);
  return {
    compactRowText: Number.isFinite(price)
      ? `● ${usd(price)} | ${h4Status}${h4Rsi?.ok ? ` | ${h4Rsi.label}` : ""} | 1H ${h1Sweep} | 1H ${h1Structure}`
      : "● Price unavailable | Waiting for ticker/4H/1H context",
    price: { value: Number.isFinite(price) ? price : null, text: Number.isFinite(price) ? usd(price) : "Price unavailable", change24hPct: Number.isFinite(change24hPct) ? change24hPct : null },
    sentiment: { value: toNullableNumber(sentiment.value), label: sentiment.label || null, meaning: getSentimentMeaning(toNullableNumber(sentiment.value), sentiment.label) },
    weekly: { bias: weeklyBias, fvg: weeklyFvgText, sr: weeklySrText, meaning: weeklyBias !== "Unavailable" ? "Weekly context still defines the main reaction zones." : "Weekly context unavailable." },
    daily: { pattern: dailyPattern.pattern, status: dailyPattern.status, position: dailyPattern.position, touches: dailyPattern.touches, reason: dailyPattern.reason, caption: dailyPattern.caption, contextText: dailyContextText, contextChip: formatDailyContextChipValue(dailySnapshot) },
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
function renderCurrentPriceChips(detail){
  if(!detail) return escapeHtml("● Price unavailable");
  const priceText = detail.price?.text || "Price unavailable";
  const dailyText = detail.daily?.contextChip || String(detail.daily?.contextText || "Daily: context unavailable").replace(/^Daily:\s*/i, "");
  const h4Text = detail.h4Structure?.status || "4H unavailable";
  const rsiText = detail.h4Rsi?.ok ? (detail.h4Rsi.label || "RSI available") : "RSI unavailable";
  const sweepText = detail.h1Sweep?.status || "Sweep unavailable";
  const h1Text = detail.h1Structure?.status || "1H unavailable";
  const chips = [
    ["Price", priceText],
    ["Daily", dailyText],
    ["4H", h4Text],
    ["RSI", rsiText],
    ["1H Sweep", sweepText],
    ["1H Structure", h1Text],
  ];
  return `<div class="prep-current-chip-row" aria-label="Current price market context">${chips.map(([label, value])=>`<span class="prep-current-chip"><strong>${escapeHtml(label)}</strong> ${escapeHtml(value)}</span>`).join("")}</div>`;
}
function formatH4VolumeStatusLabel(label){
  if(label === "Weak") return "Low";
  if(label === "Above Avg") return "Above Average";
  return label || null;
}
function formatH4VolumeStatusText(volumeStatus){
  const label = formatH4VolumeStatusLabel(volumeStatus?.label);
  if(label){
    return Number.isFinite(volumeStatus?.ratio) ? `${label} (${f1(volumeStatus.ratio)}x avg)` : label;
  }
  if(Array.isArray(latest4hCandles) && latest4hCandles.length > 0 && latest4hCandles.length < 20) return "Insufficient data";
  return "Unavailable";
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
        <p class="prep-current-detail-kv">Context: ${detail.daily.contextText}</p>
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
        <p class="prep-current-detail-kv">4H Volume: ${formatH4VolumeStatusText(detail.h4Volume)}</p>
        <p class="prep-current-detail-meaning">${detail.h4ContextMeaning}</p>
      </article>
      <article class="prep-current-detail-card">
        <h4 class="prep-current-detail-card-title">1H Timing</h4>
        <p class="prep-current-detail-kv">Sweep: ${detail.h1Sweep.status}</p>
        <p class="prep-current-detail-kv">Structure: ${detail.h1Structure.status}</p>
        <p class="prep-current-detail-kv h1-stochastic-layer">Stochastic: ${detail.h1Stochastic.ok ? detail.h1Stochastic.label : "—"}</p>
        <p class="prep-current-detail-kv h1-stochastic-layer">K/D: ${detail.h1Stochastic.ok ? `K ${nNum(detail.h1Stochastic.k)} · D ${nNum(detail.h1Stochastic.d)}` : "—"}</p>
        <p class="prep-current-detail-meaning">${detail.h1TimingMeaning}</p>
      </article>
      <article class="prep-current-detail-card">
        <h4 class="prep-current-detail-card-title">Current Price vs Key Zones</h4>
        <p class="prep-current-detail-kv key-zone-reference-price">Reference Price: ${detail.keyZone.referencePrice || "—"}</p>
        ${renderKeyZoneDetailBlock("Nearest Upside Zone", detail.keyZone.nearestUpsideDetail)}
        ${renderKeyZoneDetailBlock("Nearest Downside Zone", detail.keyZone.nearestDownsideDetail)}
        <p class="prep-current-detail-kv">Current Position: ${detail.keyZone.position}</p>
        <p class="prep-current-detail-kv">FVG Position: ${detail.keyZone.fvg?.ok ? `${detail.keyZone.fvg.position} · ${detail.keyZone.fvg.zoneType} · ${detail.keyZone.fvg.detailStatus || "Status unavailable"}` : (detail.keyZone.fvg?.position || "No nearby active FVG")}</p>
        <p class="prep-current-detail-kv">FVG Reaction: ${detail.keyZone.recentFvgReaction || detail.keyZone.fvg?.recentReaction || detail.keyZone.fvg?.reason || "No FVG reaction"}</p>
        ${detail.keyZone.conflict?.ok ? `<p class="prep-current-detail-kv">FVG Conflict: ${detail.keyZone.conflict.label} · wait confirmation</p>` : ""}
        <p class="prep-current-detail-kv">FVG Quality: ${formatFvgQualitySummary(detail.keyZone.quality)}</p>
        <p class="prep-current-detail-kv">FVG MTF Context: ${detail.keyZone.mtfContext?.relation || "No clear MTF FVG overlap"}</p>
        <p class="prep-current-detail-kv">1H Timing Zone: ${detail.keyZone.mtfContext?.timing || formatFvgTimingZoneText(detail.keyZone.timingZone)}</p>
        <p class="prep-current-detail-kv">Parent Zone: ${detail.keyZone.mtfContext?.parent || "Parent zone unavailable"}</p>
        <p class="prep-current-detail-kv">Core Zone: ${detail.keyZone.mtfContext?.core || "Core zone unavailable"}</p>
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
    fvg: positionStatus.fvg || buildCurrentFvgPositionStatus(),
    timeframe: positionStatus.timeframe,
    updatedAt: positionStatus.updatedAt,
  };
  if(positionStatus.recentReactionMemory) marketPreparationState.h4.recentReaction = positionStatus.recentReactionMemory;
  marketPreparationState.fvgQuality = buildFvgQualityScore();
  marketPreparationState.map = { upside: safeMap.upside || [], downside: safeMap.downside || [], currentRowText: safeMap.currentRowText || "● Price unavailable" };
  refreshTradePlanScenario(safeMap);
  renderTradePlanScenario();
  renderIfvgContextPanel();
  const displayUpside = getPriceLadderRows(safeMap.upside || []);
  const displayDownside = getPriceLadderRows(safeMap.downside || []);
  const nearestUpside = safeMap.upside?.[0] || null;
  const nearestDownside = safeMap.downside?.[0] || null;
  if(els.prepUpsideRows) els.prepUpsideRows.innerHTML = displayUpside.length ? renderMarketMapHeader() + renderMarketMapGrid(displayUpside, { nearestRow: nearestUpside, nearestLabel: "Nearest Upside" }) : '<p class="prep-map-empty">No upside watch levels available.</p>';
  if(els.prepDownsideRows) els.prepDownsideRows.innerHTML = displayDownside.length ? renderMarketMapHeader() + renderMarketMapGrid(displayDownside, { nearestRow: nearestDownside, nearestLabel: "Nearest Downside" }) : '<p class="prep-map-empty">No downside watch levels available.</p>';
  const detail = buildCurrentPriceDetailDataV2(safeMap);
  if(els.prepCurrentRow) els.prepCurrentRow.innerHTML = renderCurrentPriceChips(detail) || escapeHtml(detail.compactRowText || "● Price unavailable");
  renderCurrentPriceDetailCards(detail);
  applyH1LayerVisibility();
  setCurrentPriceDetailState(prepCurrentDetailOpen);
  renderH4LiquidityDiagnosticsPanel();
}

function escapeHtml(value){
  return String(value ?? "").replace(/[&<>"]/g, (ch)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
}

function formatDiagnosticValue(value){
  if(value === null || value === undefined || value === "") return "—";
  if(typeof value === "boolean") return value ? "Yes" : "No";
  if(typeof value === "number" && Number.isFinite(value)) return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return String(value);
}
function formatDiagnosticPrice(value){
  const n = Number(value);
  return Number.isFinite(n) ? n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—";
}
function renderDiagnosticRow(label, value){
  return `<div class="h4-liquidity-diagnostics-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(formatDiagnosticValue(value))}</strong></div>`;
}
function renderDiagnosticList(items){
  const list = Array.isArray(items) ? items.filter((item)=>item !== null && item !== undefined && item !== "") : [];
  if(!list.length) return '<p class="h4-liquidity-diagnostics-none">None</p>';
  return `<ul class="h4-liquidity-diagnostics-list">${list.map((item)=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}
function renderDiagnosticSection(title, content){
  return `<section class="h4-liquidity-diagnostics-section"><h4>${escapeHtml(title)}</h4>${content}</section>`;
}
function renderH4LiquidityDiagnosticsPanel(){
  if(!els.h4LiquidityDiagnosticsBody) return;
  const state = marketPreparationState?.h4?.liquidityOrderflowState;
  if(!state){
    els.h4LiquidityDiagnosticsBody.innerHTML = '<p class="h4-liquidity-diagnostics-empty">H4 liquidity diagnostics unavailable.</p>';
    return;
  }
  const episode = state.activeEpisode || {};
  const diagnostics = state.diagnostics || {};
  const sweep = episode.sweep || {};
  const reclaim = episode.reclaim || {};
  const avwap = episode.avwap || {};
  const failure = episode.failure || {};
  const structure = diagnostics.structureAlignment || {};
  const nearnessGap = diagnostics.marketMapDiagnostics?.nearnessGap || {};
  const sections = [
    renderDiagnosticSection("State", [
      renderDiagnosticRow("State", episode.status),
      renderDiagnosticRow("Display", episode.displayStatus),
      renderDiagnosticRow("Stale", episode.stale),
      renderDiagnosticRow("Failure", failure.detected),
    ].join("")),
    renderDiagnosticSection("Sweep / Reclaim", [
      renderDiagnosticRow("Sweep", sweep.type),
      renderDiagnosticRow("Level", formatDiagnosticPrice(sweep.levelPrice)),
      renderDiagnosticRow("Breach", formatDiagnosticPrice(sweep.breachPrice)),
      renderDiagnosticRow("Reclaim", reclaim.status),
      renderDiagnosticRow("Reclaim close", formatDiagnosticPrice(reclaim.closePrice)),
      renderDiagnosticRow("Bars after sweep", diagnostics.barsAfterSweep),
    ].join("")),
    renderDiagnosticSection("AVWAP", [
      renderDiagnosticRow("AVWAP side", avwap.side),
      renderDiagnosticRow("AVWAP value", formatDiagnosticPrice(avwap.value)),
      renderDiagnosticRow("Correct-side closes", avwap.correctSideCloses),
    ].join("")),
    renderDiagnosticSection("Diagnostic Strength", [
      renderDiagnosticRow("Diagnostic score", episode.score),
      renderDiagnosticRow("Diagnostic band", episode.band),
    ].join("")),
    renderDiagnosticSection("Confirmation", [
      '<div class="h4-liquidity-diagnostics-list-block"><span>Confirmation blockers</span>' + renderDiagnosticList(diagnostics.confirmationBlockers) + '</div>',
      '<div class="h4-liquidity-diagnostics-list-block"><span>Confirmation corroborators</span>' + renderDiagnosticList(diagnostics.confirmationCorroborators) + '</div>',
    ].join("")),
    renderDiagnosticSection("Context", [
      '<div class="h4-liquidity-diagnostics-list-block"><span>Eligible context</span>' + renderDiagnosticList(diagnostics.contextGateEligibleCorroborators) + '</div>',
      '<div class="h4-liquidity-diagnostics-list-block"><span>Context skipped</span>' + renderDiagnosticList(diagnostics.contextGateSkipped) + '</div>',
      '<div class="h4-liquidity-diagnostics-list-block"><span>Context warnings</span>' + renderDiagnosticList(diagnostics.contextGateWarnings) + '</div>',
    ].join("")),
    renderDiagnosticSection("Structure", [
      renderDiagnosticRow("Alignment", structure.alignment),
      renderDiagnosticRow("Episode aligned", structure.episodeAligned),
      renderDiagnosticRow("Reaction", structure.reactionDirection),
      renderDiagnosticRow("Structure direction", structure.structureDirection),
      renderDiagnosticRow("Relation to reclaim", structure.relationToReclaim),
    ].join("")),
    renderDiagnosticSection("Market Map", [
      renderDiagnosticRow("Market Map status", nearnessGap.status),
      renderDiagnosticRow("Nearest", nearnessGap.nearestLabel),
      renderDiagnosticRow("Distance", formatDiagnosticPrice(nearnessGap.nearestDistanceAbs)),
      renderDiagnosticRow("Buffer", formatDiagnosticPrice(nearnessGap.buffer)),
      renderDiagnosticRow("Needs closer by", formatDiagnosticPrice(nearnessGap.needsCloserBy)),
      renderDiagnosticRow("Note", nearnessGap.reason),
      '<p class="h4-liquidity-diagnostics-note">Market Map remains diagnostics-only.</p>',
    ].join("")),
  ];
  els.h4LiquidityDiagnosticsBody.innerHTML = `
    <p class="h4-liquidity-diagnostics-note">Diagnostics only; does not alter score, status, Market Map, Preparation Scenario, or PDF.</p>
    <div class="h4-liquidity-diagnostics-grid">${sections.join("")}</div>
  `;
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
  const fvgStatus = getMapRowFvgStatus(row);
  if(fvgStatus) return fvgStatus;
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
  const base = row?.detail || row?.confluenceLabel || sourceDetails || row?.quality || "—";
  const fvgBadges = formatMapRowFvgBadges(row);
  return fvgBadges ? `${base} | ${fvgBadges}` : base;
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
function buildPdfFvgInterpretationSummary(detail, state){
  const mtf = formatFvgMtfContextSummary(state?.fvgMtfContext);
  const quality = formatFvgQualitySummary(state?.fvgQuality);
  const position = detail?.keyZone?.fvg?.ok ? `${detail.keyZone.fvg.position} · ${detail.keyZone.fvg.zoneType}` : (detail?.keyZone?.fvg?.position || "No nearby active FVG");
  const recent = detail?.keyZone?.recentFvgReaction || detail?.keyZone?.fvg?.recentReaction || detail?.keyZone?.fvg?.reason || "No recent FVG reaction";
  return { context: mtf.relation, quality, position, recentReaction: recent, parent: mtf.parent, core: mtf.core };
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
      renderDailyFvgOverlay();
      renderDailySrOverlay();
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
    executiveSummary: { currentPrice:priceText, change24h:changeText, marketStatus, mainBias, keyMessage:detail.preparation?.note || "Keep preparation neutral and wait for multi-timeframe confirmation.", fvg: buildPdfFvgInterpretationSummary(detail, state) },
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
    notes: ["Weekly uses 48 candles for the main momentum window.", `Daily follows selected Daily Range: ${marketPreparationState.daily?.meta?.rangeMode || activeDailyRange || "6M"}.`, "Daily Pattern is detected from selected Daily Range and used as preparation context.", "FVG status and quality are derived from existing FVG zones, current price position, recent reaction, and multi-timeframe overlap. They are preparation context, not buy/sell signals.", `4H follows selected Intraday Range: ${ltfPreset === "custom" ? "Custom" : ({ "1w":"1W", "2w":"2W", "1m":"1M", "3m":"3M" }[ltfPreset] || "3M")}.`, "1H is capped for timing/performance.", "This report is for market preparation and monitoring context only."],
  };
}
function renderPdfRows(rows){
  if(!rows?.length) return '<p class="pdf-muted">No rows available.</p>';
  return rows.map((r)=>{
    const badges = formatMapRowFvgBadges(r);
    const quality = [r.quality || "—", badges].filter(Boolean).join(" | ");
    return `<div class="pdf-ladder-row"><strong>${escapeHtml(r.zoneText || "—")}</strong><span>${escapeHtml(r.label || "—")}</span><span>${escapeHtml(quality)}</span><span>${escapeHtml(r.distanceText || "—")}</span></div>`;
  }).join("");
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
    { title:"Key Zone Position", lines:[`Upside: ${d.keyZone.nearestUpside}`, `Downside: ${d.keyZone.nearestDownside}`, `Position: ${d.keyZone.position}`, `FVG Context: ${d.keyZone.mtfContext?.relation || "No clear MTF FVG overlap"}`, `FVG Quality: ${formatFvgQualitySummary(d.keyZone.quality)}`, `Recent: ${d.keyZone.recentReaction}`] },
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
        <section class="pdf-section"><h2>Executive Summary</h2><div class="pdf-card-grid">${renderPdfCards([{title:"Current Price",lines:[report.executiveSummary.currentPrice, `24H: ${report.executiveSummary.change24h}`]},{title:"Market Status",lines:[report.executiveSummary.marketStatus]},{title:"Main Bias",lines:[report.executiveSummary.mainBias]},{title:"Key Message",lines:[report.executiveSummary.keyMessage]},{title:"FVG Interpretation",lines:[`Context: ${report.executiveSummary.fvg.context}`, `Quality: ${report.executiveSummary.fvg.quality}`, `Position: ${report.executiveSummary.fvg.position}`, `Recent: ${report.executiveSummary.fvg.recentReaction}`]}])}</div></section>
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
  priceChart = LightweightCharts.createChart(els.priceChart, { ...getChartInteractionOptions(), width: priceChartWidth, height: priceChartHeight, layout:{background:{type:"solid",color:"transparent"},textColor:"#cbd5e1"}, grid:{vertLines:{color:"rgba(148,163,184,0.12)"},horzLines:{color:"rgba(148,163,184,0.12)"}}, rightPriceScale:{borderColor:"rgba(148,163,184,0.2)"}, timeScale:{borderColor:"rgba(148,163,184,0.2)",timeVisible:true,tickMarkFormatter:(time)=>weekLabelMap.get(timeKey(time))||""} });
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
  rsiChart = LightweightCharts.createChart(els.rsiChart, { ...getChartInteractionOptions(), width: Math.max(els.rsiChart.clientWidth||0,320), height: 240, layout:{background:{type:"solid",color:"transparent"},textColor:"#cbd5e1"}, grid:{vertLines:{color:"rgba(148,163,184,0.12)"},horzLines:{color:"rgba(148,163,184,0.12)"}}, rightPriceScale:{borderColor:"rgba(148,163,184,0.2)", scaleMargins:{top:0.05,bottom:0.05}}, timeScale:{borderColor:"rgba(148,163,184,0.2)",timeVisible:true,tickMarkFormatter:(time)=>weekLabelMap.get(timeKey(time))||""} });
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

  let condition = "No clear 3W candle context";
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

function clearWeeklySrOverlay(){
  try { if(weeklySrOverlayLayer) weeklySrOverlayLayer.innerHTML = ""; } catch(_){}
}
function renderWeeklySrOverlay(summary, dataset){
  try {
    weeklySrSummaryForOverlay = summary;
    if(!getChartLayer("weekly", "sr")){ clearWeeklySrOverlay(); return; }
    if(!priceChart || !candleSeries) return;
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
function clampNumber(value, min, max){
  const n = Number(value);
  if(!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}
function getFvgKey(zone, timeframe){
  if(!zone || typeof zone !== "object") return `${timeframe || "FVG"}:unavailable`;
  return [timeframe || zone.timeframe || "FVG", zone.type || "Unknown", zone.startTime || zone.startLabel || "start", zone.endTime || zone.endLabel || "end", Number(zone.lower || 0).toFixed(2), Number(zone.upper || 0).toFixed(2)].join("|");
}
function getFvgDirection(zone){
  const type = String(zone?.type || "").toLowerCase();
  if(type.includes("bullish")) return "bullish";
  if(type.includes("bearish")) return "bearish";
  return null;
}
function getFvgCePrice(zone){
  const lower = Number(zone?.lower);
  const upper = Number(zone?.upper);
  if(!Number.isFinite(lower) || !Number.isFinite(upper)) return null;
  return (lower + upper) / 2;
}
function getCandlesAfterFvg(zone, candles){
  if(!zone || !Array.isArray(candles) || !candles.length) return [];
  const index = Number(zone.index);
  if(Number.isInteger(index) && index >= 0 && index < candles.length) return candles.slice(index + 1);
  const boundaryTime = zone.endTime ?? zone.startTime;
  if(boundaryTime === null || boundaryTime === undefined) return [];
  return candles.filter((c)=>c?.time !== undefined && c.time > boundaryTime);
}
const FVG_SHALLOW_TOUCH_FILL_THRESHOLD = 0.15;
function calculateFvgFillStats(zone, candles){
  const direction = getFvgDirection(zone);
  const lower = Number(zone?.lower);
  const upper = Number(zone?.upper);
  const cePrice = getFvgCePrice(zone);
  const height = upper - lower;
  const after = getCandlesAfterFvg(zone, candles);
  if(!direction || !Number.isFinite(lower) || !Number.isFinite(upper) || !Number.isFinite(height) || height <= 0 || cePrice === null){
    return { fillPct: 0, touchedAt: null, mitigatedAt: null, ceTouchedAt: null, filledAt: null, brokenAt: null };
  }
  let fillPct = 0;
  let touchedAt = null;
  let mitigatedAt = null;
  let ceTouchedAt = null;
  let filledAt = null;
  let brokenAt = null;
  after.forEach((c)=>{
    const time = c?.time ?? null;
    const high = Number(c?.high);
    const low = Number(c?.low);
    const close = Number(c?.close);
    if(direction === "bullish"){
      if(Number.isFinite(low)){
        const candleFill = clampNumber((upper - low) / height, 0, 1);
        fillPct = Math.max(fillPct, candleFill);
        if(low <= upper && !touchedAt) touchedAt = time;
        if(low < upper && low > lower && !mitigatedAt) mitigatedAt = time;
        if(low <= cePrice && low > lower && !ceTouchedAt) ceTouchedAt = time;
        if(low <= lower && !filledAt) filledAt = time;
      }
      if(Number.isFinite(close) && close < lower && !brokenAt) brokenAt = time;
    } else if(direction === "bearish"){
      if(Number.isFinite(high)){
        const candleFill = clampNumber((high - lower) / height, 0, 1);
        fillPct = Math.max(fillPct, candleFill);
        if(high >= lower && !touchedAt) touchedAt = time;
        if(high > lower && high < upper && !mitigatedAt) mitigatedAt = time;
        if(high >= cePrice && high < upper && !ceTouchedAt) ceTouchedAt = time;
        if(high >= upper && !filledAt) filledAt = time;
      }
      if(Number.isFinite(close) && close > upper && !brokenAt) brokenAt = time;
    }
  });
  return { fillPct: clampNumber(fillPct, 0, 1), touchedAt, mitigatedAt, ceTouchedAt, filledAt, brokenAt };
}
function getFvgDetailStatus(stats){
  if(stats?.brokenAt) return "Broken";
  if(stats?.filledAt) return "Filled";
  if(stats?.ceTouchedAt) return "50% Mitigated";
  if(stats?.mitigatedAt && Number(stats.fillPct) > FVG_SHALLOW_TOUCH_FILL_THRESHOLD) return "Partially Mitigated";
  if(stats?.touchedAt) return "Touched";
  return "Fresh";
}
function getFvgRecentReaction(detailStatus){
  if(detailStatus === "Broken") return "Broken";
  if(detailStatus === "Filled") return "Filled";
  if(detailStatus === "50% Mitigated") return "CE touched";
  if(detailStatus === "Partially Mitigated") return "Mitigated";
  if(detailStatus === "Touched") return "Touched";
  return "Fresh";
}
function buildFvgDetail(zone, candles, timeframe){
  const direction = getFvgDirection(zone);
  const cePrice = getFvgCePrice(zone);
  const stats = calculateFvgFillStats(zone, candles);
  const detailStatus = getFvgDetailStatus(stats);
  return {
    key: getFvgKey(zone, timeframe),
    timeframe: timeframe || zone?.timeframe || null,
    direction,
    baseStatus: zone?.status || null,
    detailStatus,
    cePrice,
    fillPct: stats.fillPct,
    touchedAt: stats.touchedAt,
    mitigatedAt: stats.mitigatedAt,
    ceTouchedAt: stats.ceTouchedAt,
    filledAt: stats.filledAt,
    brokenAt: stats.brokenAt,
    invalidationSide: direction === "bullish" ? "below" : (direction === "bearish" ? "above" : null),
    recentReaction: getFvgRecentReaction(detailStatus),
    sourceZone: zone && typeof zone === "object" ? { ...zone } : null,
  };
}
function buildFvgDetailsForTimeframe(zones, candles, timeframe){
  if(!Array.isArray(zones) || !zones.length || !Array.isArray(candles) || !candles.length) return [];
  return zones.map((zone)=>buildFvgDetail(zone, candles, timeframe));
}
function createEmptyIfvgState(detail, timeframe){
  const zone = getFvgDetailZone(detail);
  const originalSide = detail?.direction || getFvgDirection(detail?.sourceZone || detail);
  const lower = Number(zone?.lower);
  const upper = Number(zone?.upper);
  const ce = Number.isFinite(detail?.cePrice) ? detail.cePrice : getFvgCePrice(zone);
  const width = Number.isFinite(lower) && Number.isFinite(upper) ? upper - lower : null;
  const midpoint = Number.isFinite(lower) && Number.isFinite(upper) ? (lower + upper) / 2 : null;
  return {
    state: IFVG_STATE.NONE,
    stale: false,
    priorStateBeforeFailure: null,
    timeframe: timeframe || detail?.timeframe || detail?.sourceZone?.timeframe || null,
    originalFvgId: detail?.key || (zone ? getFvgKey(zone, timeframe || detail?.timeframe) : null),
    originalSide: originalSide || null,
    inversionSide: getIfvgInversionSide(originalSide),
    zone: {
      lower: Number.isFinite(lower) ? lower : null,
      upper: Number.isFinite(upper) ? upper : null,
      ce: Number.isFinite(ce) ? ce : null,
      width: Number.isFinite(width) && width > 0 ? width : null,
      widthPct: Number.isFinite(width) && width > 0 && Number.isFinite(midpoint) && midpoint > 0 ? (width / midpoint) * 100 : null,
    },
    breakEvent: {
      detected: false,
      method: "none",
      direction: null,
      at: null,
      candleTimeframe: timeframe || detail?.timeframe || null,
      closePrice: null,
      extremePrice: null,
      barsSinceBreak: null,
    },
    retest: {
      status: IFVG_RETEST_STATUS.NONE,
      firstAt: null,
      lastAt: null,
      touchCount: 0,
      maxPenetrationPct: 0,
      barsFromBreak: null,
    },
    rejection: {
      status: IFVG_REJECTION_STATUS.NONE,
      at: null,
      closeAway: false,
      closeAwayPctZone: null,
      wickReject: false,
      pattern: null,
      displacement: null,
      volumeRelative: null,
    },
    failure: {
      detected: false,
      at: null,
      price: null,
      reason: null,
    },
    structure: {
      bosAligned: false,
      chochAligned: false,
      markerRef: null,
    },
    confluence: {
      higherTimeframeAligned: false,
      higherTimeframeRefs: [],
      srOverlap: null,
      conflict: null,
    },
    quality: {
      score: 0,
      band: IFVG_QUALITY_BAND.WEAK,
      reasons: [],
    },
    ui: {
      label: "No IFVG",
      microcopy: "No confirmed inversion context.",
      overlayStyle: "none",
      showByDefault: false,
    },
    meta: {
      createdAt: null,
      updatedAt: Date.now(),
      source: "ifvg-engine-v1",
    },
  };
}
function getIfvgInversionSide(originalSide){
  if(originalSide === "bullish") return "bearish";
  if(originalSide === "bearish") return "bullish";
  return null;
}
function getIfvgBreakBoundary(detail){
  const zone = getFvgDetailZone(detail);
  const side = detail?.direction || getFvgDirection(detail?.sourceZone || detail);
  if(!zone || !side) return null;
  return side === "bullish" ? zone.lower : zone.upper;
}
function getIfvgReclaimBoundary(detail){
  const zone = getFvgDetailZone(detail);
  const side = detail?.direction || getFvgDirection(detail?.sourceZone || detail);
  if(!zone || !side) return null;
  return side === "bullish" ? zone.upper : zone.lower;
}
function getIfvgClosedCandlesAfterFvg(detail, candles){
  const zone = detail?.sourceZone || detail;
  const after = getCandlesAfterFvg(zone, candles);
  if(!Array.isArray(after) || !after.length) return [];
  return after.length > 1 ? after.slice(0, -1) : [];
}
function detectIfvgBreakEvent(detail, candles, timeframe){
  const empty = createEmptyIfvgState(detail, timeframe).breakEvent;
  const zone = getFvgDetailZone(detail);
  const side = detail?.direction || getFvgDirection(detail?.sourceZone || detail);
  const closed = getIfvgClosedCandlesAfterFvg(detail, candles);
  if(!zone || !side || !closed.length) return empty;
  let wickEvent = null;
  for(let i=0;i<closed.length;i++){
    const candle = closed[i] || {};
    const close = Number(candle.close);
    const high = Number(candle.high);
    const low = Number(candle.low);
    const time = candle.time ?? null;
    if(side === "bullish"){
      if(Number.isFinite(close) && close < zone.lower){
        return { detected: true, method: "close", direction: "down", at: time, candleTimeframe: timeframe || detail?.timeframe || null, closePrice: close, extremePrice: Number.isFinite(low) ? low : null, barsSinceBreak: closed.length - i - 1 };
      }
      if(!wickEvent && Number.isFinite(low) && low < zone.lower && (!Number.isFinite(close) || close >= zone.lower)){
        wickEvent = { detected: true, method: "wick", direction: "down", at: time, candleTimeframe: timeframe || detail?.timeframe || null, closePrice: Number.isFinite(close) ? close : null, extremePrice: low, barsSinceBreak: closed.length - i - 1 };
      }
    } else if(side === "bearish"){
      if(Number.isFinite(close) && close > zone.upper){
        return { detected: true, method: "close", direction: "up", at: time, candleTimeframe: timeframe || detail?.timeframe || null, closePrice: close, extremePrice: Number.isFinite(high) ? high : null, barsSinceBreak: closed.length - i - 1 };
      }
      if(!wickEvent && Number.isFinite(high) && high > zone.upper && (!Number.isFinite(close) || close <= zone.upper)){
        wickEvent = { detected: true, method: "wick", direction: "up", at: time, candleTimeframe: timeframe || detail?.timeframe || null, closePrice: Number.isFinite(close) ? close : null, extremePrice: high, barsSinceBreak: closed.length - i - 1 };
      }
    }
  }
  return wickEvent || empty;
}
function classifyIfvgRetest(detail, breakEvent, candles){
  const base = createEmptyIfvgState(detail, breakEvent?.candleTimeframe).retest;
  if(!breakEvent?.detected || breakEvent.method !== "close") return base;
  const zone = getFvgDetailZone(detail);
  const side = detail?.direction || getFvgDirection(detail?.sourceZone || detail);
  const ce = Number.isFinite(detail?.cePrice) ? detail.cePrice : getFvgCePrice(zone);
  const width = zone ? zone.upper - zone.lower : null;
  const closed = getIfvgClosedCandlesAfterFvg(detail, candles);
  if(!zone || !side || !Number.isFinite(ce) || !Number.isFinite(width) || width <= 0 || !closed.length) return base;
  const breakIndex = closed.findIndex((c)=>c?.time === breakEvent.at);
  if(breakIndex < 0) return base;
  const afterBreak = closed.slice(breakIndex + 1);
  let status = IFVG_RETEST_STATUS.NONE;
  let firstAt = null;
  let lastAt = null;
  let touchCount = 0;
  let maxPenetrationPct = 0;
  let barsFromBreak = null;
  afterBreak.forEach((c, idx)=>{
    const high = Number(c?.high);
    const low = Number(c?.low);
    let candleStatus = IFVG_RETEST_STATUS.NONE;
    let penetration = 0;
    if(side === "bullish" && Number.isFinite(high)){
      if(high >= zone.upper){ candleStatus = IFVG_RETEST_STATUS.FULL; penetration = width; }
      else if(high >= ce){ candleStatus = IFVG_RETEST_STATUS.CE; penetration = ce - zone.lower; }
      else if(high > zone.lower){ candleStatus = IFVG_RETEST_STATUS.INSIDE; penetration = high - zone.lower; }
      else if(high >= zone.lower){ candleStatus = IFVG_RETEST_STATUS.BOUNDARY; penetration = 0; }
    } else if(side === "bearish" && Number.isFinite(low)){
      if(low <= zone.lower){ candleStatus = IFVG_RETEST_STATUS.FULL; penetration = width; }
      else if(low <= ce){ candleStatus = IFVG_RETEST_STATUS.CE; penetration = zone.upper - ce; }
      else if(low < zone.upper){ candleStatus = IFVG_RETEST_STATUS.INSIDE; penetration = zone.upper - low; }
      else if(low <= zone.upper){ candleStatus = IFVG_RETEST_STATUS.BOUNDARY; penetration = 0; }
    }
    if(candleStatus !== IFVG_RETEST_STATUS.NONE){
      touchCount += 1;
      if(firstAt === null){ firstAt = c?.time ?? null; barsFromBreak = idx + 1; }
      lastAt = c?.time ?? null;
      maxPenetrationPct = Math.max(maxPenetrationPct, clampNumber(penetration / width, 0, 1) * 100);
      const rank = { none: 0, boundary: 1, inside: 2, ce: 3, full: 4 };
      if(rank[candleStatus] > rank[status]) status = candleStatus;
    }
  });
  return { status, firstAt, lastAt, touchCount, maxPenetrationPct, barsFromBreak };
}
function classifyIfvgRejection(detail, breakEvent, retest, candles){
  const base = createEmptyIfvgState(detail, breakEvent?.candleTimeframe).rejection;
  if(!breakEvent?.detected || breakEvent.method !== "close" || ![IFVG_RETEST_STATUS.INSIDE, IFVG_RETEST_STATUS.CE, IFVG_RETEST_STATUS.FULL].includes(retest?.status)) return base;
  const zone = getFvgDetailZone(detail);
  const side = detail?.direction || getFvgDirection(detail?.sourceZone || detail);
  const width = zone ? zone.upper - zone.lower : null;
  const closed = getIfvgClosedCandlesAfterFvg(detail, candles);
  if(!zone || !side || !Number.isFinite(width) || width <= 0 || !closed.length) return base;
  const retestIndex = closed.findIndex((c)=>c?.time === retest.lastAt);
  if(retestIndex < 0) return base;
  for(let i=retestIndex;i<closed.length;i++){
    const c = closed[i] || {};
    const close = Number(c.close);
    const high = Number(c.high);
    const low = Number(c.low);
    if(side === "bullish" && Number.isFinite(close) && close < zone.lower){
      const closeAwayPctZone = clampNumber((zone.lower - close) / width, 0, 10) * 100;
      const wickReject = Number.isFinite(high) && high > zone.lower;
      return { ...base, status: IFVG_REJECTION_STATUS.CANDIDATE, at: c.time ?? null, closeAway: true, closeAwayPctZone, wickReject, pattern: "Bearish close-away", volumeRelative: calculateIfvgVolumeRelative(c, closed, i) };
    }
    if(side === "bearish" && Number.isFinite(close) && close > zone.upper){
      const closeAwayPctZone = clampNumber((close - zone.upper) / width, 0, 10) * 100;
      const wickReject = Number.isFinite(low) && low < zone.upper;
      return { ...base, status: IFVG_REJECTION_STATUS.CANDIDATE, at: c.time ?? null, closeAway: true, closeAwayPctZone, wickReject, pattern: "Bullish close-away", volumeRelative: calculateIfvgVolumeRelative(c, closed, i) };
    }
  }
  return base;
}
function calculateIfvgVolumeRelative(candle, candles, index, lookback = 20){
  const volume = Number(candle?.volume);
  if(!Number.isFinite(volume) || volume <= 0 || !Array.isArray(candles) || index <= 0) return null;
  const start = Math.max(0, index - lookback);
  const sample = candles.slice(start, index).map((c)=>Number(c.volume)).filter((v)=>Number.isFinite(v) && v > 0);
  if(sample.length < Math.min(5, lookback)) return null;
  const avg = sample.reduce((a,b)=>a+b,0) / sample.length;
  return avg > 0 ? volume / avg : null;
}
function detectIfvgReclaimFailure(detail, breakEvent, candles){
  if(!breakEvent?.detected || breakEvent.method !== "close") return null;
  const zone = getFvgDetailZone(detail);
  const side = detail?.direction || getFvgDirection(detail?.sourceZone || detail);
  const closed = getIfvgClosedCandlesAfterFvg(detail, candles);
  if(!zone || !side || !closed.length) return null;
  const breakIndex = closed.findIndex((c)=>c?.time === breakEvent.at);
  if(breakIndex < 0) return null;
  for(let i=breakIndex + 1;i<closed.length;i++){
    const close = Number(closed[i]?.close);
    if(side === "bullish" && Number.isFinite(close) && close > zone.upper) return { detected: true, at: closed[i]?.time ?? null, price: close, reason: "Bearish IFVG failed after price reclaimed above the zone by close." };
    if(side === "bearish" && Number.isFinite(close) && close < zone.lower) return { detected: true, at: closed[i]?.time ?? null, price: close, reason: "Bullish IFVG failed after price reclaimed below the zone by close." };
  }
  return null;
}
function isIfvgCloseAwayStrong(ifvg){
  return Number(ifvg?.rejection?.closeAwayPctZone) >= 25;
}
function getIfvgCorroborators(detail, ifvg, candles, timeframe){
  const corroborators = [];
  const side = ifvg?.inversionSide;
  const rejectionAt = ifvg?.rejection?.at;
  const closed = getIfvgClosedCandlesAfterFvg(detail, candles);
  const rejectionIndex = closed.findIndex((c)=>c?.time === rejectionAt);
  if(rejectionIndex >= 0){
    const candle = closed[rejectionIndex];
    const body = Math.abs(Number(candle.close) - Number(candle.open));
    const range = Number(candle.high) - Number(candle.low);
    const avgBody = calculateAverageBodySize(closed, rejectionIndex, 20);
    const avgRange = calculateAverageRangeSize(closed, rejectionIndex, 20);
    const candleDirection = candle.close > candle.open ? "bullish" : (candle.close < candle.open ? "bearish" : null);
    const hasExpansion = candleDirection === side && ((Number.isFinite(avgBody) && avgBody > 0 && body / avgBody >= 1.5) || (Number.isFinite(avgRange) && avgRange > 0 && range / avgRange >= 1.5));
    if(hasExpansion) corroborators.push({ type: "displacement", reason: `${timeframe || detail?.timeframe || "FVG"} IFVG rejection used an aligned expansion candle.` });
  }
  if(Number(ifvg?.rejection?.volumeRelative) >= 1.2) corroborators.push({ type: "volume", reason: "Rejection volume was above recent average." });
  const structureStatus = timeframe === "4H" ? marketPreparationState.h4?.structureStatus : null;
  if(structureStatus && side){
    const aligned = side === "bullish" ? /Bullish (BOS|CHoCH)/i.test(structureStatus) : /Bearish (BOS|CHoCH)/i.test(structureStatus);
    if(aligned) corroborators.push({ type: /CHoCH/i.test(structureStatus) ? "choch" : "bos", reason: `Latest ${timeframe} structure context is ${structureStatus}.`, markerRef: structureStatus });
  }
  return corroborators;
}
function findIfvgSrConfluence(detail, ifvg){
  if(!ifvg?.inversionSide || !ifvg?.zone) return null;
  const pseudo = { ...detail, direction: ifvg.inversionSide, detailStatus: "Fresh", sourceZone: { ...(detail?.sourceZone || {}), lower: ifvg.zone.lower, upper: ifvg.zone.upper, type: `${ifvg.inversionSide === "bullish" ? "Bullish" : "Bearish"} IFVG` } };
  return findSrConfluenceForFvg(pseudo);
}
function scoreIfvgQuality(detail, ifvg, candles, timeframe){
  let score = 0;
  const reasons = [];
  const add = (points, reason)=>{ score += points; if(reason) reasons.push(reason); };
  if([IFVG_RETEST_STATUS.INSIDE, IFVG_RETEST_STATUS.CE, IFVG_RETEST_STATUS.FULL].includes(ifvg?.retest?.status)) add(1, "Retested inside the inversion zone.");
  if(ifvg?.retest?.status === IFVG_RETEST_STATUS.CE) add(1, "Retested the 50% / CE area.");
  if(ifvg?.retest?.status === IFVG_RETEST_STATUS.FULL) reasons.push("Full-zone retest; treat context carefully.");
  if(ifvg?.rejection?.wickReject) add(1, "Rejected after probing back into the zone.");
  if(ifvg?.rejection?.closeAway && isIfvgCloseAwayStrong(ifvg)) add(2, "Strong close-away rejection from the IFVG zone.");
  const corroborators = getIfvgCorroborators(detail, ifvg, candles, timeframe);
  corroborators.forEach((c)=>{
    if(c.type === "bos" || c.type === "choch") add(2, c.reason);
    else if(c.type === "displacement") add(1, c.reason);
    else if(c.type === "volume") add(1, c.reason);
  });
  const sr = findIfvgSrConfluence(detail, ifvg);
  if(sr){ add(1, `IFVG inversion side is near ${sr.zone.label}.`); }
  const conflict = marketPreparationState.fvgMtfContext?.conflict;
  if(conflict?.ok){ score -= 2; reasons.push(`MTF conflict caution: ${conflict.label}.`); }
  const band = score >= 7 ? IFVG_QUALITY_BAND.HIGH_CONFLUENCE : (score >= 5 ? IFVG_QUALITY_BAND.STRONG : (score >= 3 ? IFVG_QUALITY_BAND.USABLE : IFVG_QUALITY_BAND.WEAK));
  return { score, band, reasons, corroborators, srOverlap: sr ? { label: sr.zone.label, overlap: sr.overlap, timeframe: sr.zone.timeframe } : null, conflict: conflict?.ok ? { label: conflict.label, severity: conflict.severity } : null };
}
function getIfvgStaleThreshold(timeframe){
  const tf = String(timeframe || "").toLowerCase();
  if(tf.includes("week")) return 12;
  if(tf.includes("daily") || tf === "1d") return 30;
  if(tf.includes("4h")) return 60;
  return 30;
}
function buildIfvgStateForDetail(detail, candles, timeframe){
  const ifvg = createEmptyIfvgState(detail, timeframe);
  const zone = getFvgDetailZone(detail);
  const originalSide = ifvg.originalSide;
  if(!zone || !originalSide || !Array.isArray(candles) || !candles.length){
    return ifvg;
  }
  const breakEvent = detectIfvgBreakEvent(detail, candles, timeframe);
  ifvg.breakEvent = breakEvent;
  if(!breakEvent.detected){
    return ifvg;
  }
  if(breakEvent.method === "wick"){
    ifvg.ui = { ...ifvg.ui, label: "Pierced FVG", microcopy: "Wick-only breach; no confirmed inversion context." };
    return ifvg;
  }
  ifvg.state = IFVG_STATE.POSSIBLE;
  ifvg.meta.createdAt = breakEvent.at;
  ifvg.ui = { ...ifvg.ui, label: `${ifvg.inversionSide === "bullish" ? "Possible Bullish" : "Possible Bearish"} IFVG`, microcopy: "Closed candle broke the FVG; waiting for retest confirmation." };
  const failure = detectIfvgReclaimFailure(detail, breakEvent, candles);
  const retest = classifyIfvgRetest(detail, breakEvent, candles);
  ifvg.retest = retest;
  if([IFVG_RETEST_STATUS.INSIDE, IFVG_RETEST_STATUS.CE, IFVG_RETEST_STATUS.FULL].includes(retest.status)){
    ifvg.state = IFVG_STATE.VALID;
    ifvg.ui = { ...ifvg.ui, label: `${ifvg.inversionSide === "bullish" ? "Valid Bullish" : "Valid Bearish"} IFVG`, microcopy: "IFVG retested the zone; waiting for corroborated rejection." };
  }
  const rejection = classifyIfvgRejection(detail, breakEvent, retest, candles);
  ifvg.rejection = rejection;
  const quality = scoreIfvgQuality(detail, ifvg, candles, timeframe);
  ifvg.quality = { score: quality.score, band: quality.band, reasons: quality.reasons };
  ifvg.structure = { bosAligned: quality.corroborators.some((c)=>c.type === "bos"), chochAligned: quality.corroborators.some((c)=>c.type === "choch"), markerRef: quality.corroborators.find((c)=>c.markerRef)?.markerRef || null };
  ifvg.confluence = { higherTimeframeAligned: false, higherTimeframeRefs: [], srOverlap: quality.srOverlap, conflict: quality.conflict };
  if(rejection.closeAway){
    const displacementCorroborator = quality.corroborators.find((c)=>c.type === "displacement") || null;
    ifvg.rejection.displacement = displacementCorroborator ? displacementCorroborator.reason : null;
    const hasCorroborator = quality.corroborators.length > 0;
    ifvg.rejection.status = hasCorroborator && quality.score >= 4 ? IFVG_REJECTION_STATUS.CONFIRMED : IFVG_REJECTION_STATUS.CANDIDATE;
    if(ifvg.rejection.status === IFVG_REJECTION_STATUS.CONFIRMED){
      ifvg.state = IFVG_STATE.CONFIRMED;
      ifvg.ui = { ...ifvg.ui, label: `${ifvg.inversionSide === "bullish" ? "Confirmed Bullish" : "Confirmed Bearish"} IFVG`, microcopy: "Retest and corroborated rejection confirmed IFVG context." };
    }
  }
  if(failure?.detected){
    ifvg.priorStateBeforeFailure = [IFVG_STATE.POSSIBLE, IFVG_STATE.VALID, IFVG_STATE.CONFIRMED].includes(ifvg.state) ? ifvg.state : null;
    ifvg.state = IFVG_STATE.FAILED;
    ifvg.failure = { detected: true, at: failure.at ?? null, price: Number.isFinite(Number(failure.price)) ? Number(failure.price) : null, reason: failure.reason || "IFVG failed after reclaim by close." };
    const priorText = ifvg.priorStateBeforeFailure ? `Previously ${ifvg.priorStateBeforeFailure} IFVG later failed after reclaim.` : ifvg.failure.reason;
    ifvg.ui = { ...ifvg.ui, label: "Failed IFVG", microcopy: priorText };
    ifvg.quality.reasons.push(ifvg.failure.reason);
  }
  const threshold = getIfvgStaleThreshold(timeframe);
  if(Number.isFinite(breakEvent.barsSinceBreak) && breakEvent.barsSinceBreak > threshold && ![IFVG_STATE.CONFIRMED, IFVG_STATE.FAILED].includes(ifvg.state)){
    ifvg.stale = true;
    ifvg.quality.reasons.push("IFVG context is stale; no timely confirmation after break.");
  }
  return ifvg;
}
function enrichFvgDetailsWithIfvg(details, candles, timeframe){
  if(!Array.isArray(details) || !details.length) return [];
  return details.map((detail)=>({ ...detail, ifvg: buildIfvgStateForDetail(detail, candles, timeframe || detail?.timeframe) }));
}
const FVG_REACTION_FIELD_CONFIG = {
  touchedAt: { key: "lastTouchedFvg", reactionType: "Touched", priority: 1 },
  mitigatedAt: { key: "lastMitigatedFvg", reactionType: "Mitigated", priority: 2 },
  ceTouchedAt: { key: "lastCeTouchedFvg", reactionType: "50% CE", priority: 3 },
  filledAt: { key: "lastFilledFvg", reactionType: "Filled", priority: 4 },
  brokenAt: { key: "lastBrokenFvg", reactionType: "Broken", priority: 5 },
};
function formatFvgReactionMemoryItem(detail, reactionType, reactionTime, currentPrice){
  if(!detail || reactionTime === null || reactionTime === undefined) return null;
  const zone = getFvgDetailZone(detail);
  if(!zone) return null;
  const direction = detail.direction || getFvgDirection(zone);
  const label = `${getFvgDetailLabel(detail)} ${String(reactionType || "Reaction").toLowerCase()}`;
  return {
    key: detail.key || getFvgKey(zone, detail.timeframe),
    timeframe: detail.timeframe || null,
    type: detail.zoneType || detail.sourceZone?.type || zone.type || getFvgDetailLabel(detail),
    direction,
    zoneRange: `${usd(zone.lower)}–${usd(zone.upper)}`,
    lower: zone.lower,
    upper: zone.upper,
    cePrice: Number.isFinite(detail.cePrice) ? detail.cePrice : getFvgCePrice(zone),
    detailStatus: detail.detailStatus || detail.baseStatus || null,
    reactionType,
    reactionTime,
    distancePct: getFvgDistancePctFromPrice(zone, currentPrice),
    label,
    reason: `${label} at ${usd(zone.lower)}–${usd(zone.upper)}`,
  };
}
function pickLatestFvgReaction(fvgDetails, reactionField, currentPrice = marketPreparationState.currentPrice){
  const config = FVG_REACTION_FIELD_CONFIG[reactionField];
  if(!config || !Array.isArray(fvgDetails) || !fvgDetails.length) return null;
  return fvgDetails
    .map((detail)=>formatFvgReactionMemoryItem(detail, config.reactionType, detail?.[reactionField], currentPrice))
    .filter(Boolean)
    .sort((a,b)=>(Number(b.reactionTime)||0)-(Number(a.reactionTime)||0) || (config.priority||0))
    [0] || null;
}
function getFvgReactionPriority(reactionType){
  return Object.values(FVG_REACTION_FIELD_CONFIG).find((cfg)=>cfg.reactionType === reactionType)?.priority || 0;
}
function getLatestFvgReaction(memory){
  if(memory?.latestReaction) return memory.latestReaction;
  const items = [memory?.lastTouchedFvg, memory?.lastMitigatedFvg, memory?.lastCeTouchedFvg, memory?.lastFilledFvg, memory?.lastBrokenFvg].filter(Boolean);
  return items.sort((a,b)=>(Number(b.reactionTime)||0)-(Number(a.reactionTime)||0) || (getFvgReactionPriority(b.reactionType) - getFvgReactionPriority(a.reactionType)))[0] || null;
}
function buildRecentFvgReactionMemory(fvgDetails, currentPrice, timeframe){
  const memory = createEmptyRecentFvgReactionMemory();
  if(!Array.isArray(fvgDetails) || !fvgDetails.length) return memory;
  Object.entries(FVG_REACTION_FIELD_CONFIG).forEach(([field, config])=>{
    memory[config.key] = pickLatestFvgReaction(fvgDetails, field, currentPrice);
    if(memory[config.key] && timeframe && !memory[config.key].timeframe) memory[config.key].timeframe = timeframe;
  });
  const reactions = [memory.lastTouchedFvg, memory.lastMitigatedFvg, memory.lastCeTouchedFvg, memory.lastFilledFvg, memory.lastBrokenFvg].filter(Boolean);
  memory.latestReaction = reactions.sort((a,b)=>{
    const timeDelta = (Number(b.reactionTime)||0) - (Number(a.reactionTime)||0);
    if(timeDelta) return timeDelta;
    return getFvgReactionPriority(b.reactionType) - getFvgReactionPriority(a.reactionType);
  })[0] || null;
  memory.updatedAt = Date.now();
  return memory;
}
function formatRecentFvgReactionText(memory){
  const latest = getLatestFvgReaction(memory);
  if(!latest) return "No recent FVG reaction";
  return `${latest.type || latest.timeframe || "FVG"} ${String(latest.reactionType || "reaction").toLowerCase()}`;
}
function getMostRecentFvgReactionMemory(){
  const memories = [marketPreparationState.h4?.recentFvgReaction, marketPreparationState.daily?.recentFvgReaction, marketPreparationState.weekly?.recentFvgReaction].filter(Boolean);
  const latest = memories.map(getLatestFvgReaction).filter(Boolean).sort((a,b)=>(Number(b.reactionTime)||0)-(Number(a.reactionTime)||0) || (getFvgReactionPriority(b.reactionType) - getFvgReactionPriority(a.reactionType)))[0] || null;
  return latest ? { latestReaction: latest } : createEmptyRecentFvgReactionMemory();
}
function normalizeFvgDetailForMtf(detail){
  const zone = getFvgDetailZone(detail);
  const direction = detail?.direction || getFvgDirection(zone);
  const status = detail?.detailStatus || detail?.baseStatus || null;
  if(!zone || !direction || ["Broken", "Filled"].includes(status)) return null;
  const timeframe = detail?.timeframe || zone.timeframe || "FVG";
  const tf = String(timeframe).toLowerCase();
  const role = tf.includes("weekly") ? "parent" : (tf.includes("daily") || tf === "1d" ? "active" : (tf.includes("4h") ? "reaction" : "timing"));
  const currentPrice = marketPreparationState.currentPrice;
  return {
    key: detail.key || getFvgKey(zone, timeframe),
    timeframe,
    role,
    type: detail.sourceZone?.type || zone.type || getFvgDetailLabel(detail),
    direction,
    lower: zone.lower,
    upper: zone.upper,
    cePrice: Number.isFinite(detail.cePrice) ? detail.cePrice : getFvgCePrice(zone),
    detailStatus: status,
    distancePct: getFvgDistancePctFromPrice(zone, currentPrice),
    label: getFvgDetailLabel(detail),
    sourceDetail: detail,
  };
}
function getActiveFvgDetailsForMtf(){
  return [
    ...(marketPreparationState.weekly?.fvgDetails || []),
    ...(marketPreparationState.daily?.fvgDetails || []),
    ...(marketPreparationState.h4?.fvgDetails || []),
  ].map(normalizeFvgDetailForMtf).filter(Boolean);
}
function calculateFvgOverlap(zones){
  const valid = (zones || []).filter((z)=>Number.isFinite(z?.lower) && Number.isFinite(z?.upper) && z.upper > z.lower);
  if(valid.length < 2) return null;
  const lower = Math.max(...valid.map((z)=>z.lower));
  const upper = Math.min(...valid.map((z)=>z.upper));
  if(lower >= upper) return null;
  return { lower, upper, zoneRange: `${usd(lower)}–${usd(upper)}` };
}
function calculateFvgOverlapRatio(a, b){
  if(!a || !b) return 0;
  const low = Math.max(a.lower, b.lower), high = Math.min(a.upper, b.upper);
  const overlap = Math.max(0, high - low);
  const denom = Math.max(1e-9, Math.min(a.upper - a.lower, b.upper - b.lower));
  return overlap / denom;
}
function isFvgNested(child, parent){
  return !!child && !!parent && child.lower >= parent.lower && child.upper <= parent.upper;
}
function isFvgNear(a, b, tolerancePct = 0.01){
  if(!a || !b) return false;
  if(calculateFvgOverlapRatio(a,b) > 0) return true;
  const gap = a.upper < b.lower ? b.lower - a.upper : (b.upper < a.lower ? a.lower - b.upper : 0);
  const ref = Number.isFinite(marketPreparationState.currentPrice) && marketPreparationState.currentPrice > 0 ? marketPreparationState.currentPrice : Math.max(1, (a.lower + a.upper + b.lower + b.upper) / 4);
  return gap / ref <= tolerancePct;
}
function groupFvgDetailsByDirection(details){
  return (details || []).reduce((acc, detail)=>{ if(detail?.direction) (acc[detail.direction] ||= []).push(detail); return acc; }, {});
}
function getMtfRoleZone(details, role){
  return (details || [])
    .filter((d)=>d.role === role)
    .sort((a,b)=>(a.distancePct ?? 999) - (b.distancePct ?? 999))[0] || null;
}
function sortFvgMtfCandidates(details){
  const roleRank = { parent: 3, active: 2, reaction: 1, timing: 0 };
  return [...(details || [])].sort((a,b)=>(roleRank[b.role] || 0) - (roleRank[a.role] || 0) || ((a.distancePct ?? 999) - (b.distancePct ?? 999)));
}
function getFvgDirectionFromDetail(detail){
  return detail?.direction || getFvgDirection(detail?.sourceZone || detail);
}
function hasOppositeDirection(a, b){
  const ad = getFvgDirectionFromDetail(a), bd = getFvgDirectionFromDetail(b);
  return !!ad && !!bd && ad !== bd;
}
function isFvgInsideOrOverlapping(child, parent){
  return !!child && !!parent && (isFvgNested(child, parent) || calculateFvgOverlapRatio(child, parent) > 0);
}
function normalizeFvgDetailForConflict(detail){
  const zone = getFvgDetailZone(detail);
  const direction = getFvgDirectionFromDetail(detail);
  if(!zone || !direction) return null;
  const timeframe = detail?.timeframe || zone.timeframe || "FVG";
  const tf = String(timeframe).toLowerCase();
  const role = tf.includes("weekly") ? "parent" : (tf.includes("daily") || tf === "1d" ? "active" : (tf.includes("4h") ? "reaction" : "timing"));
  return { key: detail.key || getFvgKey(zone, timeframe), timeframe, role, type: detail.sourceZone?.type || zone.type || getFvgDetailLabel(detail), direction, lower: zone.lower, upper: zone.upper, cePrice: Number.isFinite(detail.cePrice) ? detail.cePrice : getFvgCePrice(zone), detailStatus: detail?.detailStatus || detail?.baseStatus || null, distancePct: getFvgDistancePctFromPrice(zone, marketPreparationState.currentPrice), label: getFvgDetailLabel(detail), sourceDetail: detail };
}
function getConflictFvgDetails(){
  return [
    ...(marketPreparationState.weekly?.fvgDetails || []),
    ...(marketPreparationState.daily?.fvgDetails || []),
    ...(marketPreparationState.h4?.fvgDetails || []),
  ].map(normalizeFvgDetailForConflict).filter(Boolean);
}
function makeFvgConflictState({ label, severity, htfDirection, ltfDirection, parentTimeframe = null, conflictTimeframes = [], reason, suggestedAction }){
  return { ok: true, label, severity, htfDirection, ltfDirection, parentTimeframe, conflictTimeframes: [...new Set(conflictTimeframes.filter(Boolean))], reason, suggestedAction, updatedAt: Date.now() };
}
function classifyFvgConflictContext(fvgMtfContext, details){
  const all = details || getConflictFvgDetails();
  const active = all.filter((d)=>!["Broken", "Filled"].includes(d.detailStatus));
  const weeklyAll = all.filter((d)=>d.role === "parent");
  const weeklyActive = active.filter((d)=>d.role === "parent");
  const dailyActive = active.filter((d)=>d.role === "active");
  const h4Active = active.filter((d)=>d.role === "reaction");
  const brokenParent = weeklyAll.find((d)=>d.detailStatus === "Broken") || marketPreparationState.weekly?.recentFvgReaction?.lastBrokenFvg;
  if(brokenParent){
    const direction = brokenParent.direction || getFvgDirectionFromDetail(brokenParent);
    const possible = direction === "bullish" ? "Weekly Bullish FVG Broken / Possible Bearish IFVG Context" : "Weekly Bearish FVG Broken / Possible Bullish IFVG Context";
    return makeFvgConflictState({ label: "Parent FVG Broken", severity: "high", htfDirection: direction, ltfDirection: null, parentTimeframe: "Weekly", conflictTimeframes: [], reason: possible, suggestedAction: "Treat the parent FVG as reaction context until a retest confirms or rejects inversion." });
  }
  for(const weekly of weeklyActive){
    const challengers = [...dailyActive, ...h4Active].filter((d)=>hasOppositeDirection(weekly, d) && isFvgNear(d, weekly, 0.01));
    if(challengers.length){
      const bearishPressure = weekly.direction === "bullish" && challengers.some((d)=>d.direction === "bearish");
      const bullishPressure = weekly.direction === "bearish" && challengers.some((d)=>d.direction === "bullish");
      if(bearishPressure) return makeFvgConflictState({ label: "HTF Support Under Pressure", severity: "medium", htfDirection: "bullish", ltfDirection: "bearish", parentTimeframe: "Weekly", conflictTimeframes: challengers.map((d)=>d.timeframe), reason: "Weekly bullish parent FVG is being challenged by bearish lower-timeframe FVGs.", suggestedAction: "Wait for 4H/1H confirmation before treating the zone as support." });
      if(bullishPressure) return makeFvgConflictState({ label: "HTF Resistance Under Pressure", severity: "medium", htfDirection: "bearish", ltfDirection: "bullish", parentTimeframe: "Weekly", conflictTimeframes: challengers.map((d)=>d.timeframe), reason: "Weekly bearish parent FVG is being challenged by bullish lower-timeframe FVGs.", suggestedAction: "Wait for 4H/1H confirmation before treating the zone as resistance." });
    }
  }
  const weeklyBull = weeklyActive.some((d)=>d.direction === "bullish"), weeklyBear = weeklyActive.some((d)=>d.direction === "bearish");
  const dailyBull = dailyActive.some((d)=>d.direction === "bullish"), dailyBear = dailyActive.some((d)=>d.direction === "bearish");
  const h4Bull = h4Active.some((d)=>d.direction === "bullish"), h4Bear = h4Active.some((d)=>d.direction === "bearish");
  if(weeklyBull && dailyBull && h4Bear) return makeFvgConflictState({ label: "HTF Bullish, LTF Pullback", severity: "low", htfDirection: "bullish", ltfDirection: "bearish", parentTimeframe: weeklyActive[0]?.timeframe || "Weekly", conflictTimeframes: h4Active.filter((d)=>d.direction === "bearish").map((d)=>d.timeframe), reason: "Weekly/Daily FVGs remain bullish, while 4H shows short-term bearish pullback.", suggestedAction: "Watch whether 4H bearish FVG breaks upward or Daily support fails." });
  if(weeklyBear && dailyBear && h4Bull) return makeFvgConflictState({ label: "HTF Bearish, LTF Pullback", severity: "low", htfDirection: "bearish", ltfDirection: "bullish", parentTimeframe: weeklyActive[0]?.timeframe || "Weekly", conflictTimeframes: h4Active.filter((d)=>d.direction === "bullish").map((d)=>d.timeframe), reason: "Weekly/Daily FVGs remain bearish, while 4H shows short-term bullish pullback.", suggestedAction: "Watch whether 4H bullish FVG breaks downward or Daily resistance holds." });
  for(const daily of dailyActive){
    const h4Conflict = h4Active.find((h4)=>hasOppositeDirection(daily, h4) && isFvgInsideOrOverlapping(h4, daily));
    if(h4Conflict) return makeFvgConflictState({ label: "Conflict / Wait Confirmation", severity: "medium", htfDirection: daily.direction, ltfDirection: h4Conflict.direction, parentTimeframe: daily.timeframe, conflictTimeframes: [h4Conflict.timeframe], reason: `Daily active ${daily.direction} FVG conflicts with ${h4Conflict.direction} 4H reaction FVG.`, suggestedAction: "Wait for 4H/1H confirmation before treating this as directional confluence." });
  }
  return createEmptyFvgConflictState();
}
function buildFvgConflictState(){
  return classifyFvgConflictContext(marketPreparationState.fvgMtfContext, getConflictFvgDetails());
}
function getDirectionFrom1hStructure(structureStatus){
  const text = String(structureStatus || "");
  if(/Bullish\s+(BOS|CHoCH)/i.test(text)) return "bullish";
  if(/Bearish\s+(BOS|CHoCH)/i.test(text)) return "bearish";
  return null;
}
function getDirectionFrom1hSweep(sweepStatus){
  const text = String(sweepStatus || "");
  if(/Bullish\s+Sweep/i.test(text)) return "bullish";
  if(/Bearish\s+Sweep/i.test(text)) return "bearish";
  return null;
}
function getDirectionFrom1hStochastic(stochastic){
  if(!stochastic?.ok) return null;
  const status = String(stochastic.status || stochastic.label || "");
  if(/oversold_cross_up|bullish_cross|Bullish Cross|Oversold Cross Up/i.test(status)) return "bullish";
  if(/overbought_cross_down|bearish_cross|Bearish Cross|Overbought Cross Down/i.test(status)) return "bearish";
  return null;
}
function isUsable1hTimingText(value){
  const text = String(value || "");
  return /Bullish|Bearish|No clear|No recent/i.test(text) && !/unavailable|range unavailable/i.test(text);
}
function getMtfDirectionForTiming(fvgMtfContext){
  const direction = fvgMtfContext?.direction;
  if(direction === "bullish" || direction === "bearish") return direction;
  const conflict = fvgMtfContext?.conflict;
  if(conflict?.htfDirection === "bullish" || conflict?.htfDirection === "bearish") return conflict.htfDirection;
  const currentDirection = marketPreparationState.currentPricePosition?.fvg?.detail?.direction;
  return currentDirection === "bullish" || currentDirection === "bearish" ? currentDirection : null;
}
function getFvgTimingRelatedZone(fvgMtfContext){
  return fvgMtfContext?.reactionZone || fvgMtfContext?.coreZone || fvgMtfContext?.activeZone || fvgMtfContext?.parentZone || null;
}
function getTimingSignalSummary({ structureStatus, sweepStatus, stochastic }){
  const parts = [];
  if(getDirectionFrom1hSweep(sweepStatus)) parts.push(String(sweepStatus));
  if(getDirectionFrom1hStructure(structureStatus)) parts.push(String(structureStatus));
  if(stochastic?.ok && getDirectionFrom1hStochastic(stochastic)) parts.push(stochastic.label || "Stochastic support");
  return parts.join(" + ");
}
function buildFvgTimingZone(fvgMtfContext, state = marketPreparationState){
  try{
    if(!Array.isArray(latest1hCandles) || !latest1hCandles.length) return createEmptyFvgTimingZone();
    const h1 = state?.h1 || {};
    const structureStatus = h1.structureStatus || null;
    const sweepStatus = h1.sweepStatus || null;
    const stochastic = h1.stochastic || null;
    const hasAnyH1State = !!(isUsable1hTimingText(structureStatus) || isUsable1hTimingText(sweepStatus) || stochastic?.ok);
    if(!hasAnyH1State) return createEmptyFvgTimingZone();
    const mtfDirection = getMtfDirectionForTiming(fvgMtfContext);
    if(!mtfDirection) return createEmptyFvgTimingZone("MTF FVG direction is unavailable for 1H timing.");
    const structureDirection = getDirectionFrom1hStructure(structureStatus);
    const sweepDirection = getDirectionFrom1hSweep(sweepStatus);
    const stochasticDirection = getDirectionFrom1hStochastic(stochastic);
    const signalDirections = [structureDirection, sweepDirection].filter(Boolean);
    const signalSummary = getTimingSignalSummary({ structureStatus, sweepStatus, stochastic }) || "no clear 1H structure/sweep confirmation";
    const relatedZone = getFvgTimingRelatedZone(fvgMtfContext);
    const makeTiming = ({ ok = true, direction = null, timingStatus, supportsHighProbability = false, reason })=>{
      const status = timingStatus || "Unavailable";
      return {
        ok,
        timeframe: "1H",
        direction,
        timingStatus: status,
        sweep: sweepStatus,
        structure: structureStatus,
        stochastic: stochastic || null,
        relatedZone,
        supportsHighProbability: status === "Confirming" && supportsHighProbability === true,
        reason,
        updatedAt: Date.now(),
      };
    };
    if(!signalDirections.length){
      return makeTiming({ ok: true, direction: stochasticDirection, timingStatus: "Waiting", reason: `Waiting for 1H confirmation: ${signalSummary}.` });
    }
    const aligned = signalDirections.includes(mtfDirection);
    const opposite = signalDirections.some((direction)=>direction && direction !== mtfDirection);
    if(aligned && !opposite){
      const label = mtfDirection === "bullish" ? "bullish" : "bearish";
      return makeTiming({ direction: mtfDirection, timingStatus: "Confirming", supportsHighProbability: true, reason: `1H timing confirms ${label} MTF FVG context: ${signalSummary}.` });
    }
    if(opposite){
      const oppositeDirection = signalDirections.find((direction)=>direction !== mtfDirection) || null;
      const conflictActive = !!fvgMtfContext?.conflict?.ok || fvgMtfContext?.direction === "mixed" || /Conflict|Under Pressure/i.test(`${fvgMtfContext?.relation || ""} ${fvgMtfContext?.qualityHint || ""}`);
      if(conflictActive){
        return makeTiming({ direction: oppositeDirection, timingStatus: "Conflict", reason: `1H timing opposes ${mtfDirection} MTF FVG context while MTF conflict/pressure is active: ${signalSummary}.` });
      }
      return makeTiming({ direction: oppositeDirection, timingStatus: "Pullback", reason: `1H shows ${oppositeDirection} pullback against ${mtfDirection} MTF FVG context: ${signalSummary}.` });
    }
    return makeTiming({ ok: true, direction: stochasticDirection, timingStatus: "Waiting", reason: `Waiting for 1H confirmation: ${signalSummary}.` });
  }catch(_){
    return createEmptyFvgTimingZone();
  }
}
function formatFvgTimingZoneText(timingZone){
  if(!timingZone || timingZone.timingStatus === "Unavailable") return "Unavailable · 1H timing data is unavailable";
  const status = timingZone.timingStatus || "Unavailable";
  const dirLabel = timingZone.direction === "bullish" ? "Bullish" : (timingZone.direction === "bearish" ? "Bearish" : "");
  const signal = getTimingSignalSummary({ structureStatus: timingZone.structure, sweepStatus: timingZone.sweep, stochastic: timingZone.stochastic });
  const suffix = signal || timingZone.reason || "no clear 1H confirmation";
  return `${status}${dirLabel ? ` ${dirLabel}` : ""} · ${suffix}`;
}
function withFvgTimingZone(context){
  const base = context || createEmptyFvgMtfContext();
  return { ...base, timingZone: buildFvgTimingZone(base, marketPreparationState) };
}
function buildMtfContextPayload({ ok = true, direction = null, relation = null, details = [], overlapZone = null, conflictReason = null, conflict = createEmptyFvgConflictState(), qualityHint = null, reason = null }){
  const sorted = sortFvgMtfCandidates(details);
  const parentZone = getMtfRoleZone(sorted, "parent") || getMtfRoleZone(sorted, "active") || sorted[0] || null;
  const activeZone = getMtfRoleZone(sorted, "active");
  const reactionZone = getMtfRoleZone(sorted, "reaction");
  const precisionZone = reactionZone && parentZone && (isFvgNested(reactionZone, parentZone) || (activeZone && isFvgNested(reactionZone, activeZone))) ? reactionZone : null;
  const payload = { ok, direction, relation, parentZone, activeZone, reactionZone, timingZone: createEmptyFvgTimingZone(), overlapZone, coreZone: overlapZone, precisionZone, sources: sorted.map((d)=>d.label), conflictReason, conflict, qualityHint, reason, updatedAt: Date.now() };
  return { ...payload, timingZone: buildFvgTimingZone(payload, marketPreparationState) };
}
function buildAlignedFvgMtfContext(details, direction){
  const aligned = sortFvgMtfCandidates(details || []);
  if(aligned.length < 2) return null;
  const overlapAll = calculateFvgOverlap(aligned);
  const nested = aligned.some((child)=>aligned.some((parent)=>child !== parent && isFvgNested(child, parent)));
  const dirLabel = direction === "bullish" ? "Bullish" : "Bearish";
  if(overlapAll){
    return buildMtfContextPayload({ direction, relation: nested ? `Nested Multi-Timeframe ${dirLabel} FVG` : `${dirLabel} FVG Confluence`, details: aligned, overlapZone: overlapAll, qualityHint: aligned.length >= 3 ? "Strong" : "Valid", reason: `${aligned.map((d)=>d.timeframe).join(", ")} ${direction} FVGs overlap.` });
  }
  let bestPair = null;
  for(let i=0;i<aligned.length;i++) for(let j=i+1;j<aligned.length;j++){
    const overlap = calculateFvgOverlap([aligned[i], aligned[j]]);
    if(overlap && (!bestPair || calculateFvgOverlapRatio(aligned[i], aligned[j]) > bestPair.ratio)) bestPair = { pair:[aligned[i], aligned[j]], overlap, ratio: calculateFvgOverlapRatio(aligned[i], aligned[j]) };
  }
  if(bestPair) return buildMtfContextPayload({ direction, relation: `Partial ${dirLabel} FVG Overlap`, details: bestPair.pair, overlapZone: bestPair.overlap, qualityHint: "Valid", reason: `${bestPair.pair.map((d)=>d.timeframe).join(" and ")} ${direction} FVGs partially overlap.` });
  const nearPair = aligned.find((a, idx)=>aligned.slice(idx+1).some((b)=>isFvgNear(a,b,0.01)));
  if(nearPair) return buildMtfContextPayload({ direction, relation: `Near ${dirLabel} FVG Cluster`, details: aligned, overlapZone: null, qualityHint: "Watch", reason: `${dirLabel} FVGs are near each other but do not overlap.` });
  return null;
}
function buildConflictFvgMtfContext(details){
  const active = sortFvgMtfCandidates(details || []);
  if(active.length < 2) return null;
  for(const a of active){
    for(const b of active){
      if(a === b || a.direction === b.direction) continue;
      if(!isFvgNear(a,b,0.01)) continue;
      const weekly = [a,b].find((z)=>z.role === "parent");
      const other = weekly ? ([a,b].find((z)=>z !== weekly)) : null;
      let relation = "Conflict / wait confirmation";
      let conflictReason = "Opposing FVG directions are overlapping or clustered nearby.";
      if(weekly?.direction === "bullish" && other?.direction === "bearish") { relation = "HTF Support Under Pressure"; conflictReason = "Weekly bullish FVG is being challenged by bearish Daily/4H FVGs."; }
      else if(weekly?.direction === "bearish" && other?.direction === "bullish") { relation = "HTF Resistance Under Pressure"; conflictReason = "Weekly bearish FVG is being challenged by bullish Daily/4H FVGs."; }
      return buildMtfContextPayload({ direction: "mixed", relation, details: [a,b], overlapZone: calculateFvgOverlap([a,b]), conflictReason, qualityHint: "Conflict", reason: "Do not label as strong confluence." });
    }
  }
  return null;
}
function buildFvgMtfContext(){
  try{
    const details = getActiveFvgDetailsForMtf();
    const conflictState = buildFvgConflictState();
    if(conflictState.ok){
      const conflictContext = buildConflictFvgMtfContext(details) || buildMtfContextPayload({ ok: true, direction: "mixed", relation: conflictState.label, details, conflictReason: conflictState.reason, conflict: conflictState, qualityHint: "Conflict", reason: conflictState.reason });
      return { ...conflictContext, relation: conflictState.label, direction: "mixed", conflict: conflictState, conflictReason: conflictState.reason, qualityHint: conflictState.severity === "low" ? "Pullback" : "Conflict", reason: conflictState.reason };
    }
    if(!details.length) return { ...createEmptyFvgMtfContext(), conflict: conflictState };
    const grouped = groupFvgDetailsByDirection(details);
    const bullish = buildAlignedFvgMtfContext(grouped.bullish || [], "bullish");
    const bearish = buildAlignedFvgMtfContext(grouped.bearish || [], "bearish");
    const ranked = [bullish, bearish].filter(Boolean).sort((a,b)=>(b.sources?.length || 0) - (a.sources?.length || 0) || (a.overlapZone ? -1 : 1))[0];
    return ranked ? { ...ranked, conflict: conflictState } : { ...createEmptyFvgMtfContext(), conflict: conflictState };
  }catch(_){ return createEmptyFvgMtfContext("MTF FVG context unavailable."); }
}
function refreshFvgMtfContext(){
  updateMarketPreparationState({ fvgMtfContext: withFvgTimingZone(buildFvgMtfContext()) });
}
function refreshFvgTimingZoneAndQuality({ rebuildQuality = true } = {}){
  try{
    const baseContext = marketPreparationState.fvgMtfContext || createEmptyFvgMtfContext();
    const timingZone = buildFvgTimingZone(baseContext, marketPreparationState);
    updateMarketPreparationState({ fvgMtfContext: { timingZone } });
    if(rebuildQuality) updateMarketPreparationState({ fvgQuality: buildFvgQualityScore() });
    refreshTradePlanScenario();
    renderTradePlanScenario();
  }catch(_){
    updateMarketPreparationState({ fvgMtfContext: { timingZone: createEmptyFvgTimingZone() } });
    refreshTradePlanScenario();
    renderTradePlanScenario();
  }
}
function getAllFvgDetailsForQuality(){
  return [
    ...(marketPreparationState.weekly?.fvgDetails || []),
    ...(marketPreparationState.daily?.fvgDetails || []),
    ...(marketPreparationState.h4?.fvgDetails || []),
  ].filter((detail)=>getFvgDetailZone(detail));
}
function getPrimaryFvgDetailForQuality(details){
  const current = marketPreparationState.currentPricePosition?.fvg;
  const key = current?.detail?.key || current?.detail?.sourceDetail?.key;
  if(key){
    const match = (details || []).find((detail)=>detail?.key === key);
    if(match) return match;
  }
  const activeStatuses = new Set(["Fresh", "Touched", "Partially Mitigated", "50% Mitigated"]);
  return [...(details || [])].filter((detail)=>activeStatuses.has(detail?.detailStatus)).sort((a,b)=>{
    const az = getFvgDetailZone(a), bz = getFvgDetailZone(b);
    const ad = getFvgDistancePctFromPrice(az, marketPreparationState.currentPrice) ?? 999;
    const bd = getFvgDistancePctFromPrice(bz, marketPreparationState.currentPrice) ?? 999;
    const role = { Weekly: 3, Daily: 2, "4H": 1 };
    return ad - bd || ((role[b?.timeframe] || 0) - (role[a?.timeframe] || 0));
  })[0] || (details || [])[0] || null;
}
function scoreFvgStatusFactor(detail){
  const status = detail?.detailStatus || detail?.baseStatus;
  if(status === "Fresh") return { type: "factor", item: { name: "Fresh FVG", points: 1, reason: `${detail.timeframe || "FVG"} zone has not been touched after formation.` } };
  if(status === "Touched" || status === "Partially Mitigated") return { type: "factor", item: { name: "Active FVG", points: 1, reason: `${detail.timeframe || "FVG"} zone is ${status.toLowerCase()} but not broken.` } };
  if(status === "50% Mitigated") return { type: "factor", item: { name: "CE interaction", points: 1, reason: `${detail.timeframe || "FVG"} CE has been touched without invalidation.` } };
  if(status === "Filled") return { type: "penalty", item: { name: "Fully filled", points: -2, reason: `${detail.timeframe || "FVG"} zone is already filled.` } };
  if(status === "Broken") return { type: "penalty", item: { name: "Broken FVG", points: -3, reason: `${detail.timeframe || "FVG"} zone is broken by close.` } };
  return null;
}
function scoreMtfFvgFactor(fvgMtfContext){
  if(!fvgMtfContext?.ok) return { factors: [], penalties: [{ name: "No MTF confluence", points: -2, reason: "No active multi-timeframe FVG overlap or cluster is available." }] };
  const factors = [], penalties = [];
  const relation = String(fvgMtfContext.relation || "");
  if(fvgMtfContext.overlapZone || fvgMtfContext.coreZone || /Nested|Confluence|Overlap/i.test(relation)){
    factors.push({ name: "MTF overlap", points: 2, reason: fvgMtfContext.reason || "Active FVG zones overlap across timeframes." });
  } else if(/Near/i.test(relation)){
    factors.push({ name: "Near FVG cluster", points: 1, reason: fvgMtfContext.reason || "FVG zones are near each other but do not overlap." });
  }
  const sources = fvgMtfContext.sources || [];
  const hasWeekly = sources.some((s)=>/Weekly/i.test(s));
  const hasDaily = sources.some((s)=>/Daily/i.test(s));
  if(hasWeekly && hasDaily && fvgMtfContext.direction && fvgMtfContext.direction !== "mixed"){
    factors.push({ name: "Weekly/Daily alignment", points: 2, reason: "Weekly and Daily FVG direction are aligned." });
  }
  return { factors, penalties };
}
function scoreFvgPositionFactor(currentPricePosition){
  const fvg = currentPricePosition?.fvg;
  if(!fvg?.ok) return null;
  const relevant = ["Inside FVG", "Near FVG", "Approaching FVG", "Testing CE", "Rejected from FVG", "Bounced from FVG"];
  if(relevant.includes(fvg.position)) return { name: "Current price position", points: 1, reason: `Price is ${String(fvg.position).toLowerCase()} on ${fvg.zoneType || "active FVG"}.` };
  return null;
}
function scoreFvgRecentReactionFactor(recentFvgReaction){
  const latest = getLatestFvgReaction(recentFvgReaction);
  if(!latest) return null;
  if(["Broken", "Filled"].includes(latest.reactionType)) return { type: "penalty", item: { name: "Recent invalidation", points: latest.reactionType === "Broken" ? -3 : -2, reason: latest.reason || `${latest.label || "FVG"} was ${latest.reactionType.toLowerCase()} recently.` } };
  return { type: "factor", item: { name: "Recent FVG reaction", points: 1, reason: latest.reason || `${latest.label || "FVG"} reacted recently.` } };
}
function normalizeSrZoneForConfluence(zone, timeframe, type){
  const lower = Number(zone?.lower);
  const upper = Number(zone?.upper);
  if(!Number.isFinite(lower) || !Number.isFinite(upper) || upper <= lower) return null;
  const status = String(zone?.status || "Active");
  if(/broken/i.test(status)) return null;
  return {
    ...zone,
    timeframe,
    type,
    lower,
    upper,
    label: `${timeframe} ${type === "support" ? "Support" : "Resistance"}`,
  };
}
function getSrZonesForConfluence(){
  const zones = [];
  const add = (zone, timeframe, type)=>{
    const normalized = normalizeSrZoneForConfluence(zone, timeframe, type);
    if(normalized) zones.push(normalized);
  };
  const weekly = marketPreparationState.weekly?.srSummary;
  add(weekly?.support, "Weekly", "support");
  add(weekly?.resistance, "Weekly", "resistance");
  for(const [timeframe, summary] of [["Daily", marketPreparationState.daily?.srSummary], ["4H", marketPreparationState.h4?.srSummary]]){
    add(summary?.support?.nearest, timeframe, "support");
    add(summary?.support?.strongest, timeframe, "support");
    add(summary?.resistance?.nearest, timeframe, "resistance");
    add(summary?.resistance?.strongest, timeframe, "resistance");
  }
  const seen = new Set();
  return zones.filter((zone)=>{
    const key = `${zone.timeframe}|${zone.type}|${zone.lower.toFixed(2)}|${zone.upper.toFixed(2)}`;
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function calculateZoneOverlapRatio(a, b){
  return getZoneOverlapRatio(a, b);
}
function isZoneNearFvg(fvgDetail, srZone, tolerancePct = 0.005){
  const fvgZone = getFvgDetailZone(fvgDetail);
  if(!fvgZone || !srZone) return false;
  if(calculateZoneOverlapRatio(fvgZone, srZone) > 0) return true;
  const gap = fvgZone.upper < srZone.lower ? srZone.lower - fvgZone.upper : (srZone.upper < fvgZone.lower ? fvgZone.lower - srZone.upper : 0);
  const reference = Number.isFinite(marketPreparationState.currentPrice) && marketPreparationState.currentPrice > 0
    ? marketPreparationState.currentPrice
    : Math.max(1, (fvgZone.lower + fvgZone.upper + srZone.lower + srZone.upper) / 4);
  return gap / reference <= tolerancePct;
}
function findSrConfluenceForFvg(detail){
  const direction = detail?.direction || getFvgDirection(detail?.sourceZone || detail);
  if(!direction || ["Broken", "Filled"].includes(detail?.detailStatus)) return null;
  const requiredType = direction === "bullish" ? "support" : (direction === "bearish" ? "resistance" : null);
  if(!requiredType) return null;
  return getSrZonesForConfluence()
    .filter((zone)=>zone.type === requiredType && isZoneNearFvg(detail, zone, 0.005))
    .map((zone)=>({ zone, overlap: calculateZoneOverlapRatio(getFvgDetailZone(detail), zone) }))
    .sort((a,b)=>{
      const rank = { Weekly: 3, Daily: 2, "4H": 1 };
      return b.overlap - a.overlap || ((rank[b.zone.timeframe] || 0) - (rank[a.zone.timeframe] || 0));
    })[0] || null;
}
function scoreSrConfluenceFactor(detail){
  const match = findSrConfluenceForFvg(detail);
  if(!match) return null;
  const { zone, overlap } = match;
  const points = (overlap > 0 && /Weekly|Daily/i.test(zone.timeframe)) ? 2 : 1;
  const directionLabel = (detail.direction || getFvgDirection(detail.sourceZone || detail)) === "bullish" ? "Bullish" : "Bearish";
  const relation = overlap > 0 ? "overlaps" : "is near";
  return {
    name: "S/R confluence",
    points,
    reason: `${detail.timeframe || "FVG"} ${directionLabel} FVG ${relation} ${zone.label}.`,
  };
}
function scoreSrConfluenceForDetails(details){
  const factors = (details || []).map(scoreSrConfluenceFactor).filter(Boolean);
  if(!factors.length) return null;
  return factors.sort((a,b)=>(b.points || 0)-(a.points || 0))[0];
}
function getCandlesForFvgTimeframe(timeframe){
  const tf = String(timeframe || "").toLowerCase();
  if(tf.includes("daily") || tf === "1d") return marketPreparationState.daily?.candles || latestDailyCandles || [];
  if(tf.includes("4h") || tf.includes("h4")) return latest4hCandles || [];
  if(tf.includes("weekly")) return weeklyDatasetCache || [];
  return [];
}
function getFvgFormationCandle(detail, candles){
  const sourceZone = detail?.sourceZone || detail;
  const index = Number(sourceZone?.index);
  if(!Number.isInteger(index) || !Array.isArray(candles) || !candles.length) return null;
  const candidateIndexes = [index - 1, index];
  const direction = detail?.direction || getFvgDirection(sourceZone);
  for(const candidateIndex of candidateIndexes){
    if(candidateIndex < 0 || candidateIndex >= candles.length) continue;
    const candle = candles[candidateIndex];
    if(!candle || !Number.isFinite(candle.open) || !Number.isFinite(candle.close) || !Number.isFinite(candle.high) || !Number.isFinite(candle.low)) continue;
    const candleDirection = candle.close > candle.open ? "bullish" : (candle.close < candle.open ? "bearish" : null);
    if(direction && candleDirection === direction) return { candle, index: candidateIndex };
  }
  return null;
}
function calculateAverageBodySize(candles, endIndex, lookback = 20){
  if(!Array.isArray(candles) || !Number.isInteger(endIndex) || endIndex <= 0) return null;
  const sample = candles.slice(Math.max(0, endIndex - lookback), endIndex)
    .map((c)=>Math.abs(Number(c?.close) - Number(c?.open)))
    .filter((v)=>Number.isFinite(v) && v > 0);
  if(sample.length < 5) return null;
  return sample.reduce((sum, v)=>sum + v, 0) / sample.length;
}
function calculateAverageRangeSize(candles, endIndex, lookback = 20){
  if(!Array.isArray(candles) || !Number.isInteger(endIndex) || endIndex <= 0) return null;
  const sample = candles.slice(Math.max(0, endIndex - lookback), endIndex)
    .map((c)=>Number(c?.high) - Number(c?.low))
    .filter((v)=>Number.isFinite(v) && v > 0);
  if(sample.length < 5) return null;
  return sample.reduce((sum, v)=>sum + v, 0) / sample.length;
}
function calculateAverageVolume(candles, endIndex, lookback = 20){
  if(!Array.isArray(candles) || !Number.isInteger(endIndex) || endIndex <= 0) return null;
  const sample = candles.slice(Math.max(0, endIndex - lookback), endIndex)
    .map((c)=>Number(c?.volume))
    .filter((v)=>Number.isFinite(v) && v > 0);
  if(sample.length < 5) return null;
  return sample.reduce((sum, v)=>sum + v, 0) / sample.length;
}
function detectFvgDisplacement(detail, candles = getCandlesForFvgTimeframe(detail?.timeframe)){
  try{
    if(!detail || ["Broken", "Filled"].includes(detail?.detailStatus) || !Array.isArray(candles) || !candles.length) return null;
    const formation = getFvgFormationCandle(detail, candles);
    if(!formation) return null;
    const { candle, index } = formation;
    const direction = detail.direction || getFvgDirection(detail.sourceZone || detail);
    const candleDirection = candle.close > candle.open ? "bullish" : (candle.close < candle.open ? "bearish" : null);
    if(direction && candleDirection !== direction) return null;
    const body = Math.abs(candle.close - candle.open);
    const range = candle.high - candle.low;
    const avgBody = calculateAverageBodySize(candles, index, 20);
    const avgRange = calculateAverageRangeSize(candles, index, 20);
    if(!Number.isFinite(body) || !Number.isFinite(range) || range <= 0 || (!Number.isFinite(avgBody) && !Number.isFinite(avgRange))) return null;
    const bodyRatio = Number.isFinite(avgBody) && avgBody > 0 ? body / avgBody : null;
    const rangeRatio = Number.isFinite(avgRange) && avgRange > 0 ? range / avgRange : null;
    const hasLargeBody = Number.isFinite(bodyRatio) && bodyRatio >= 1.5;
    const hasLargeRange = Number.isFinite(rangeRatio) && rangeRatio >= 1.5;
    if(!hasLargeBody && !hasLargeRange) return null;
    const avgVolume = calculateAverageVolume(candles, index, 20);
    const volume = Number(candle.volume);
    const volumeRatio = Number.isFinite(avgVolume) && avgVolume > 0 && Number.isFinite(volume) ? volume / avgVolume : null;
    const volumeConfirms = Number.isFinite(volumeRatio) && volumeRatio >= 1.2;
    const veryClear = ((Number.isFinite(bodyRatio) && bodyRatio >= 2) || (Number.isFinite(rangeRatio) && rangeRatio >= 2)) && volumeConfirms;
    return { ok: true, timeframe: detail.timeframe || "FVG", direction, candleIndex: index, bodyRatio, rangeRatio, volumeRatio, volumeConfirms, veryClear };
  }catch(_){
    return null;
  }
}
function scoreDisplacementFactor(detail){
  const displacement = detectFvgDisplacement(detail);
  if(!displacement?.ok) return null;
  const directionLabel = displacement.direction === "bullish" ? "Bullish" : "Bearish";
  const tf = displacement.timeframe || detail?.timeframe || "FVG";
  const points = displacement.veryClear ? 2 : 1;
  const volumeText = displacement.volumeConfirms ? " with volume confirmation" : "";
  return { name: "Displacement", points, reason: `${tf} ${directionLabel} FVG formed after a large ${directionLabel.toLowerCase()} displacement candle${volumeText}.` };
}
function scoreDisplacementForDetails(details){
  const factors = (details || []).map(scoreDisplacementFactor).filter(Boolean);
  if(!factors.length) return null;
  return factors.sort((a,b)=>(b.points || 0)-(a.points || 0))[0];
}
function scoreFvgTimingFactor(state){
  const factors = [];
  const penalties = [];
  const timingZone = state?.fvgMtfContext?.timingZone;
  if(timingZone && timingZone.timingStatus && timingZone.timingStatus !== "Unavailable"){
    if(timingZone.timingStatus === "Confirming" && timingZone.supportsHighProbability){
      factors.push({ name: "1H Timing Zone", points: 2, reason: timingZone.reason || "1H timing confirms the MTF FVG direction." });
    } else if(timingZone.timingStatus === "Conflict"){
      penalties.push({ name: "1H Timing Zone conflict", points: -2, reason: timingZone.reason || "1H timing conflicts with the MTF FVG context." });
    } else if(timingZone.timingStatus === "Pullback"){
      penalties.push({ name: "1H Timing Zone pullback", points: -1, reason: timingZone.reason || "1H timing is pulling back against the MTF FVG direction." });
    }
  } else {
    const direction = state?.fvgMtfContext?.direction || state?.currentPricePosition?.fvg?.detail?.direction;
    const addIfAligned = (label, bullishText, bearishText, name)=>{
      const txt = String(label || "");
      if(direction === "bullish" && new RegExp(bullishText, "i").test(txt)) factors.push({ name, points: 2, reason: `${name} aligns bullish.` });
      else if(direction === "bearish" && new RegExp(bearishText, "i").test(txt)) factors.push({ name, points: 2, reason: `${name} aligns bearish.` });
      else if(/Bullish|Bearish/i.test(txt) && direction && direction !== "mixed") penalties.push({ name: `${name} mismatch`, points: -2, reason: `${name} does not align with ${direction} FVG context.` });
    };
    addIfAligned(state?.h4?.structureStatus, "Bullish", "Bearish", "4H structure");
    addIfAligned(state?.h1?.structureStatus, "Bullish", "Bearish", "1H structure");
    addIfAligned(state?.h1?.sweepStatus, "Bullish", "Bearish", "Liquidity sweep");
  }
  const vol = state?.h4?.volumeStatus;
  if(vol?.label && /Above Avg|Spike/i.test(vol.label)) factors.push({ name: "Volume confirmation", points: 1, reason: `4H volume is ${vol.label}${Number.isFinite(vol.ratio) ? ` (${f2(vol.ratio)}x)` : ""}.` });
  return { factors, penalties };
}
function applyFvgQualityOverrides(scoreResult, state){
  const conflict = state?.fvgMtfContext?.conflict;
  if(conflict?.ok){
    if(conflict.label === "Parent FVG Broken") return { ...scoreResult, ok: true, label: "Broken", override: "broken_parent", reason: `${conflict.reason} Do not treat as strong confluence.` };
    if(conflict.label === "HTF Support Under Pressure" || conflict.label === "HTF Resistance Under Pressure") return { ...scoreResult, ok: true, label: "Under Pressure", override: "conflict", reason: `${conflict.reason} Do not treat as strong confluence.` };
    if(conflict.label === "Conflict / Wait Confirmation") return { ...scoreResult, ok: true, label: "Conflict", override: "conflict", reason: `${conflict.reason} Wait for confirmation.` };
  }
  return scoreResult;
}
function getFvgQualityLabel(scoreResult){
  if(!scoreResult?.ok) return "Unavailable";
  if(scoreResult.override && scoreResult.label) return scoreResult.label;
  const score = scoreResult.score || 0;
  if(score <= 1) return "Weak";
  if(score <= 3) return "Valid";
  if(score <= 6) return "Strong";
  return scoreResult.allowHighProbability ? "High-Probability" : "Strong";
}
function buildFvgQualityScore(){
  try{
    const details = getAllFvgDetailsForQuality();
    const active = details.filter((detail)=>!["Broken", "Filled"].includes(detail?.detailStatus));
    if(!active.length){
      const fallback = applyFvgQualityOverrides(createEmptyFvgQualityState("No active FVG details available for quality scoring."), marketPreparationState);
      return fallback.override ? fallback : createEmptyFvgQualityState("No active FVG details available for quality scoring.");
    }
    const factors = [], penalties = [];
    const primary = getPrimaryFvgDetailForQuality(active);
    const primaryStatus = scoreFvgStatusFactor(primary);
    if(primaryStatus?.type === "factor") factors.push(primaryStatus.item);
    if(primaryStatus?.type === "penalty") penalties.push(primaryStatus.item);
    const mtf = scoreMtfFvgFactor(marketPreparationState.fvgMtfContext);
    factors.push(...mtf.factors); penalties.push(...mtf.penalties);
    const srConfluence = scoreSrConfluenceForDetails(active);
    if(srConfluence) factors.push(srConfluence);
    const displacement = scoreDisplacementForDetails(active);
    if(displacement) factors.push(displacement);
    const positionFactor = scoreFvgPositionFactor(marketPreparationState.currentPricePosition);
    if(positionFactor) factors.push(positionFactor);
    for(const memory of [marketPreparationState.daily?.recentFvgReaction, marketPreparationState.h4?.recentFvgReaction]){
      const reaction = scoreFvgRecentReactionFactor(memory);
      if(reaction?.type === "factor") factors.push(reaction.item);
      if(reaction?.type === "penalty") penalties.push(reaction.item);
    }
    const timing = scoreFvgTimingFactor(marketPreparationState);
    factors.push(...timing.factors); penalties.push(...timing.penalties);
    let score = clampNumber(factors.reduce((sum, f)=>sum + (f.points || 0), 0) + penalties.reduce((sum, p)=>sum + (p.points || 0), 0), 0, 10);
    const hasMtfOverlap = !!(marketPreparationState.fvgMtfContext?.overlapZone || marketPreparationState.fvgMtfContext?.coreZone || /Nested|Confluence|Overlap/i.test(marketPreparationState.fvgMtfContext?.relation || ""));
    const hasRelevantPosition = !!positionFactor;
    const timingZone = marketPreparationState.fvgMtfContext?.timingZone;
    const timingStatus = timingZone?.timingStatus;
    const hasFormalTimingZone = !!(timingZone && timingZone.timeframe === "1H");
    const hasFormalTimingConfirmation = hasFormalTimingZone && timingStatus === "Confirming" && timingZone.supportsHighProbability === true;
    const timingBlocksHighProbability = hasFormalTimingZone
      ? ["Waiting", "Pullback", "Conflict", "Unavailable"].includes(timingStatus)
      : false;
    const hasLegacyTimingOrReaction = !hasFormalTimingZone
      && (timing.factors.some((f)=>/timing|structure|sweep|volume/i.test(f.name || "")) || factors.some((f)=>f.name === "Recent FVG reaction"));
    const hasTimingOrReaction = hasFormalTimingConfirmation || hasLegacyTimingOrReaction;
    let result = { ok: true, label: null, score, maxScore: 10, direction: marketPreparationState.fvgMtfContext?.direction || primary?.direction || null, timeframeScope: [...new Set(active.map((d)=>d.timeframe).filter(Boolean))].join(" + ") || null, factors, penalties, override: null, reason: null, updatedAt: Date.now(), allowHighProbability: hasMtfOverlap && hasRelevantPosition && hasTimingOrReaction && !timingBlocksHighProbability };
    result = applyFvgQualityOverrides(result, marketPreparationState);
    result.label = getFvgQualityLabel(result);
    if(!result.reason){
      result.reason = result.label === "High-Probability"
        ? "High-confluence FVG context with MTF overlap, relevant price position, and timing/reaction confirmation."
        : `${formatFvgQualityLabelForDisplay(result.label)} FVG context${result.allowHighProbability ? "." : "; wait for timing/reaction confirmation before upgrading."}`;
    }
    delete result.allowHighProbability;
    return result;
  }catch(_){
    return createEmptyFvgQualityState("FVG quality scoring unavailable.");
  }
}
function formatFvgQualitySummary(scoreResult){
  if(!scoreResult || scoreResult.label === "Unavailable") return "Unavailable";
  const displayLabel = formatFvgQualityLabelForDisplay(scoreResult.label);
  if(scoreResult.override === "conflict") return `${displayLabel} · wait confirmation`;
  if(scoreResult.override === "broken_parent") return `${displayLabel} · parent zone broken`;
  return `${displayLabel} · score ${scoreResult.score}/${scoreResult.maxScore || 10}`;
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
    if(!getChartLayer("weekly", "fvg")){ clearFvgFilledOverlay(); return; }
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
      rect.title = `${formatFvgOverlayLabel(f, "Weekly")} | ${f.startLabel} → ${f.endLabel}`;
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
    if(!getChartLayer("weekly", "fvg")){ render4hVsWeeklyFvgSummary(); return; }
    safeFvgs.forEach((f)=>{
      const bull = f.type === "Bullish FVG";
      const color = bull ? "rgba(34,197,94,0.38)" : "rgba(239,68,68,0.38)";
      const overlayLabel = formatFvgOverlayLabel(f, "Weekly");
      const upperLine = candleSeries.createPriceLine({ price:f.upper, color, lineWidth:1, lineStyle:2, axisLabelVisible:false, title:`${overlayLabel} upper` });
      const lowerLine = candleSeries.createPriceLine({ price:f.lower, color, lineWidth:1, lineStyle:2, axisLabelVisible:false, title:`${overlayLabel} lower` });
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
  activeDailyRange = ({ "3m":"3M", "6m":"6M", "1y":"1Y" }[preset] || "3M");
  const act=(el,on)=>{ if(!el) return; el.classList.toggle('active', on); };
  act(els.dailyPreset3m, preset==='3m');
  act(els.dailyPreset6m, preset==='6m');
  act(els.dailyPreset1y, preset==='1y');
}
function getDailyPresetLimit(preset){ return DAILY_PRESET_LIMITS[preset] || DAILY_PRESET_LIMITS["3m"]; }

function setupCollapsibleSections(){
  els.ltfToggleBtn?.addEventListener('click', async ()=>{ setToggleState('ltf', !ltfVisible); if(ltfVisible){ requestAnimationFrame(()=>{ if(!lowerTimeframeLoaded){ setDailyPresetUI(dailyPreset || '3m'); setLtfPresetUI('3m'); renderDailyRangeMode(activeDailyRange); renderLowerTimeframeMode('3M'); } else { const m={ '1w':'1W','2w':'2W','1m':'1M','3m':'3M' }; renderDailyRangeMode(activeDailyRange); renderLowerTimeframeMode(m[ltfPreset] || '3M'); } }); } else destroyLtfCharts(); });
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
  setDailyPresetUI('3m');
  setLtfPresetUI('3m');
  restoreToggleState();
  if(ltfVisible){ requestAnimationFrame(()=>{ renderDailyRangeMode(activeDailyRange); renderLowerTimeframeMode('3M'); lowerTimeframeLoaded=true; }); }
}

function toggleLtfError(el,msg=""){ if(!el) return; el.hidden=!msg; if(msg) el.textContent=msg; }
function clearDailyChart(){ if(els.lowerDailyChart) els.lowerDailyChart.innerHTML=''; clearDailyFvgOverlay(); clearDailySrOverlay(); clearDailyPatternOverlay(); if(els.lowerDailyMeta) els.lowerDailyMeta.textContent='Daily Context: waiting'; if(els.lowerDailyPatternSummary) els.lowerDailyPatternSummary.textContent='Daily Pattern · waiting'; }
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

function createEmptyDailyPattern(rangeMode = activeDailyRange || "3M", reason = "Daily pattern unavailable."){
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
function detectDailyPattern(candles, rangeMode = activeDailyRange || "3M"){
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
      clearDailyFvgOverlay();
      clearDailySrOverlay();
      updateMarketPreparationState({ daily: { candles: [], fvgZones: [], fvgDetails: [], recentFvgReaction: createEmptyRecentFvgReactionMemory(), recentBrokenFvgDetails: createEmptyRecentBrokenFvgDetails("Daily"), srSummary: null, pattern, meta: { rangeMode: mode, preset: dailyPreset, candleCount: 0, updatedAt: Date.now() } }, meta: { sourcesReady: { daily: false } } });
      refreshFvgMtfContext();
      renderDailyContextSummary();
      renderMarketPreparationMap(buildMarketPreparationMap());
      return;
    }
    const current = candles[candles.length-1]?.close;
    const rawDailyFvgZones = scanDailyFvg(candles);
    const fvgZones = rawDailyFvgZones.filter(f=>f.status!=='Filled').map((f)=>{
      const inside = current>=f.lower && current<=f.upper;
      const nearest = current>f.upper ? f.upper : f.lower;
      const distance = inside ? 0 : Math.abs(current-nearest)/current*100;
      return { ...f, distancePct: distance };
    }).sort((a,b)=>Math.abs(a.distancePct)-Math.abs(b.distancePct) || ((a.status==='Unfilled'?0:1)-(b.status==='Unfilled'?0:1)) || b.index-a.index);
    const allDailyFvgDetails = enrichFvgDetailsWithIfvg(buildFvgDetailsForTimeframe(rawDailyFvgZones, candles, "Daily"), candles, "Daily");
    const fvgDetails = enrichFvgDetailsWithIfvg(buildFvgDetailsForTimeframe(fvgZones, candles, "Daily"), candles, "Daily");
    const recentBrokenFvgDetails = buildRecentBrokenFvgDetails(allDailyFvgDetails, "Daily");
    const recentFvgReaction = buildRecentFvgReactionMemory(allDailyFvgDetails, current, "Daily");
    const srSummary = scanDailySupportResistance(candles);
    const pattern = detectDailyPattern(candles, mode);
    setDailyPatternSummary(pattern);
    updateMarketPreparationState({ daily: { candles, fvgZones, fvgDetails, recentFvgReaction, recentBrokenFvgDetails, srSummary, pattern, meta: { rangeMode: mode, preset: dailyPreset, candleCount: candles.length, updatedAt: Date.now() } }, meta: { sourcesReady: { daily: true } } });
    refreshFvgMtfContext();
    renderDailyContextSummary();
    scheduleDailyFvgOverlayRedraw();
    scheduleDailySrOverlayRedraw();
    renderDailyPatternOverlay();
    renderMarketPreparationMap(buildMarketPreparationMap());
  }catch(e){
    console.error('Daily market context update failed:', e);
    const pattern = createEmptyDailyPattern(mode, "Daily pattern unavailable.");
    setDailyPatternSummary(pattern);
    clearDailyFvgOverlay();
    clearDailySrOverlay();
    updateMarketPreparationState({ daily: { candles: [], fvgZones: [], fvgDetails: [], recentFvgReaction: createEmptyRecentFvgReactionMemory(), recentBrokenFvgDetails: createEmptyRecentBrokenFvgDetails("Daily"), srSummary: null, pattern, meta: { rangeMode: mode, preset: dailyPreset, candleCount: 0, updatedAt: Date.now() } }, meta: { sourcesReady: { daily: false } } });
    refreshFvgMtfContext();
    renderDailyContextSummary();
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
  const chart = LightweightCharts.createChart(container, { ...getChartInteractionOptions(), width: Math.max(container.clientWidth||0,320), height, layout:{background:{type:'solid',color:'transparent'},textColor:'#cbd5e1'}, grid:{vertLines:{color:'rgba(148,163,184,0.12)'},horzLines:{color:'rgba(148,163,184,0.12)'}}, rightPriceScale:{borderColor:'rgba(148,163,184,0.2)'}, timeScale:{borderColor:'rgba(148,163,184,0.2)',timeVisible:true} });
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


function clearDailyFvgOverlay(){ if(els.lowerDailyFvgOverlay) els.lowerDailyFvgOverlay.innerHTML = ""; }
function getSelectedDailyFvgs(fvgZones, currentPrice, maxTotal = 5){
  const price = Number(currentPrice);
  const hasPrice = Number.isFinite(price) && price > 0;
  const statusRank = (status)=>String(status || "").toLowerCase().includes("unfilled") ? 0 : (String(status || "").toLowerCase().includes("partial") ? 1 : 2);
  const decorated = (Array.isArray(fvgZones) ? fvgZones : [])
    .filter((z)=>z && Number.isFinite(z.lower) && Number.isFinite(z.upper) && z.upper > z.lower && String(z.status || "").toLowerCase() !== "filled")
    .map((z, order)=>{
      const typeText = String(z.type || "");
      const isBullish = typeText.includes("Bullish");
      const isBearish = typeText.includes("Bearish");
      const inside = hasPrice && price >= z.lower && price <= z.upper;
      const nearest = !hasPrice ? z.midpoint : (price > z.upper ? z.upper : (price < z.lower ? z.lower : price));
      const distancePct = Number.isFinite(z.distancePct) ? Math.abs(z.distancePct) : (hasPrice ? Math.abs(price - nearest) / price * 100 : Number.MAX_SAFE_INTEGER);
      return { ...z, __order: order, __isBullish: isBullish, __isBearish: isBearish, __inside: inside, __distancePct: distancePct, __statusRank: statusRank(z.status) };
    })
    .sort((a,b)=>Number(!a.__inside)-Number(!b.__inside) || a.__distancePct-b.__distancePct || a.__statusRank-b.__statusRank || (Number(b.sizePercent)||0)-(Number(a.sizePercent)||0) || (Number(b.index)||0)-(Number(a.index)||0) || a.__order-b.__order);
  const selected = [];
  const counts = { bullish: 0, bearish: 0 };
  const addZone = (zone)=>{
    if(!zone || selected.includes(zone) || selected.length >= maxTotal) return false;
    selected.push(zone);
    if(zone.__isBullish) counts.bullish += 1;
    if(zone.__isBearish) counts.bearish += 1;
    return true;
  };
  decorated.forEach((zone)=>{
    if(selected.length >= Math.min(maxTotal, 4)) return;
    if(zone.__isBullish && counts.bullish >= 2) return;
    if(zone.__isBearish && counts.bearish >= 2) return;
    addZone(zone);
  });
  decorated.forEach((zone)=>{ if(selected.length < maxTotal) addZone(zone); });
  return selected.map(({ __order, __isBullish, __isBearish, __inside, __distancePct, __statusRank, ...zone })=>zone);
}
function renderDailyFvgOverlay(){
  try{
    if(!getChartLayer("daily", "fvg")){ clearDailyFvgOverlay(); return; }
    const layer = els.lowerDailyFvgOverlay;
    const candles = marketPreparationState.daily?.candles?.length ? marketPreparationState.daily.candles : latestDailyCandles;
    if(!layer || !ltfDailyChart || !ltfDailySeries || !els.lowerDailyChart || !Array.isArray(candles) || !candles.length){ clearDailyFvgOverlay(); return; }
    const currentPrice = candles[candles.length - 1]?.close;
    const zones = getSelectedDailyFvgs(marketPreparationState.daily?.fvgZones || [], currentPrice, 5);
    layer.innerHTML = "";
    if(!zones.length) return;
    const lastTime = candles[candles.length - 1]?.time;
    const rightLimit = Math.max(1, (els.lowerDailyChart.clientWidth || layer.clientWidth || 0) - 40);
    if(lastTime == null) return;
    zones.forEach((zone)=>{
      const bull = String(zone.type || "").includes("Bullish");
      const x1 = ltfDailyChart.timeScale().timeToCoordinate(zone.startTime);
      const x2 = ltfDailyChart.timeScale().timeToCoordinate(lastTime);
      const yUpper = ltfDailySeries.priceToCoordinate(zone.upper);
      const yLower = ltfDailySeries.priceToCoordinate(zone.lower);
      if([x1,x2,yUpper,yLower].some((v)=>!Number.isFinite(v))) return;
      const left = Math.max(0, Math.min(x1, x2));
      const width = Math.max(1, Math.min(Math.abs(x2 - x1), rightLimit - left));
      const center = (yUpper + yLower) / 2;
      const height = Math.max(10, Math.abs(yLower - yUpper));
      const top = Math.max(0, center - (height / 2));
      const el = document.createElement("div");
      el.className = `fvg-zone daily-fvg-zone ${bull ? "bullish" : "bearish"}`;
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      const overlayLabel = formatFvgOverlayLabel(zone, "Daily");
      el.title = `${overlayLabel} · ${usd(zone.lower)} - ${usd(zone.upper)}`;
      const label = document.createElement("span");
      label.className = "daily-fvg-label fvg-overlay-label";
      label.textContent = overlayLabel;
      el.appendChild(label);
      layer.appendChild(el);
    });
  }catch(_){
    clearDailyFvgOverlay();
  }
}
function scheduleDailyFvgOverlayRedraw(){
  if(!getChartLayer("daily", "fvg")){ clearDailyFvgOverlay(); return; }
  if(dailyFvgRedrawPending) return;
  dailyFvgRedrawPending = true;
  requestAnimationFrame(()=>{
    dailyFvgRedrawPending = false;
    renderDailyFvgOverlay();
  });
}
function clearDailySrOverlay(){ if(els.lowerDailySrOverlay) els.lowerDailySrOverlay.innerHTML = ""; }
function getSelectedDailySrZones(srSummary){
  if(!srSummary?.ok) return [];
  const pool = [
    srSummary.support?.nearest,
    srSummary.support?.strongest,
    srSummary.resistance?.nearest,
    srSummary.resistance?.strongest,
  ].filter((z)=>z && Number.isFinite(z.lower) && Number.isFinite(z.upper) && z.upper > z.lower);
  const uniq = [];
  const seen = new Set();
  for(const zone of pool){
    const key = `${zone.type || "zone"}|${Number(zone.lower).toFixed(2)}|${Number(zone.upper).toFixed(2)}`;
    if(seen.has(key)) continue;
    seen.add(key);
    uniq.push(zone);
  }
  const supports = uniq.filter((z)=>z.type === "support").slice(0, 2);
  const resistances = uniq.filter((z)=>z.type === "resistance").slice(0, 2);
  return [...supports, ...resistances].slice(0, 4);
}
function renderDailySrOverlay(){
  try{
    if(!getChartLayer("daily", "sr")){ clearDailySrOverlay(); return; }
    const layer = els.lowerDailySrOverlay;
    const candles = marketPreparationState.daily?.candles?.length ? marketPreparationState.daily.candles : latestDailyCandles;
    if(!layer || !ltfDailyChart || !ltfDailySeries || !els.lowerDailyChart || !Array.isArray(candles) || !candles.length){ clearDailySrOverlay(); return; }
    const zones = getSelectedDailySrZones(marketPreparationState.daily?.srSummary);
    layer.innerHTML = "";
    if(!zones.length) return;
    const firstTime = candles[0]?.time;
    const lastTime = candles[candles.length - 1]?.time;
    if(lastTime == null) return;
    const x2 = ltfDailyChart.timeScale().timeToCoordinate(lastTime);
    if(!Number.isFinite(x2)) return;
    const rightLimit = Math.max(1, (els.lowerDailyChart.clientWidth || layer.clientWidth || 0) - 40);
    zones.forEach((zone)=>{
      const x1 = ltfDailyChart.timeScale().timeToCoordinate(zone.firstTime || firstTime);
      const yTop = ltfDailySeries.priceToCoordinate(zone.upper);
      const yBottom = ltfDailySeries.priceToCoordinate(zone.lower);
      if([x1,yTop,yBottom].some((v)=>!Number.isFinite(v))) return;
      const left = Math.max(0, Math.min(x1, x2));
      const width = Math.max(1, Math.min(Math.abs(x2 - x1), rightLimit - left));
      const center = (yTop + yBottom) / 2;
      const height = Math.max(8, Math.abs(yBottom - yTop));
      const top = Math.max(0, center - (height / 2));
      const strength = String(zone.strength || "").toLowerCase();
      const strengthClass = strength === "strong" ? "strong" : (strength === "weak" ? "weak" : "medium");
      const isSupport = zone.type === "support";
      const el = document.createElement("div");
      el.className = `ltf-sr-zone daily-sr-zone ${isSupport ? "support" : "resistance"} ${strengthClass}`;
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.title = `${isSupport ? "Daily Support" : "Daily Resistance"} · ${zone.strength || "Zone"} · Touch ${zone.touchCount ?? "—"}x · ${usd(zone.lower)} - ${usd(zone.upper)}`;
      const label = document.createElement("span");
      label.className = "daily-sr-label";
      label.textContent = isSupport ? "Daily Support" : "Daily Resistance";
      el.appendChild(label);
      layer.appendChild(el);
    });
  }catch(_){
    clearDailySrOverlay();
  }
}
function scheduleDailySrOverlayRedraw(){
  if(!getChartLayer("daily", "sr")){ clearDailySrOverlay(); return; }
  if(dailySrRedrawPending) return;
  dailySrRedrawPending = true;
  requestAnimationFrame(()=>{
    dailySrRedrawPending = false;
    renderDailySrOverlay();
  });
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
async function renderDailyRangeMode(mode = activeDailyRange || "3M"){
  activeDailyRange = mode;
  const preset = ({ "3M":"3m", "6M":"6m", "1Y":"1y" }[mode] || dailyPreset || "3m");
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
    ltfDailyChart.timeScale().subscribeVisibleTimeRangeChange(()=>{ scheduleDailyFvgOverlayRedraw(); scheduleDailySrOverlayRedraw(); renderDailyPatternOverlay(); });
    ltfDailyChart.timeScale().subscribeVisibleLogicalRangeChange(()=>{ scheduleDailyFvgOverlayRedraw(); scheduleDailySrOverlayRedraw(); renderDailyPatternOverlay(); });
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
  const [h4,h1] = await Promise.allSettled([fetchLtfKlines('4h', st, et, limit4h), fetchLtfKlines('1h', st, et, limit1h)]);
  if(h4.status==='fulfilled'){
    try {
      const candles=mapKlinesToCandles(h4.value, hasRange ? undefined : limit4h);
      if(!candles.length) { setLtfMeta(els.lower4hMeta, '4H Reaction · range unavailable'); toggleLtfError(els.lower4hError,'No 4H candles found for selected range.'); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='No diagnostic context detected (4H FVG).'; render4hSupportResistanceSummary({ok:false,reason:'not_enough_candles'}); }
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
      }
    }
    catch(e){ console.error('4H chart render failed:', e); setLtfMeta(els.lower4hMeta, '4H Reaction · range unavailable'); toggleLtfError(els.lower4hError,'4H chart unavailable.'); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='FVG overlay unavailable'; render4hSupportResistanceSummary({ok:false,reason:'scan_failed'}); }
  } else { setLtfMeta(els.lower4hMeta, '4H Reaction · range unavailable'); toggleLtfError(els.lower4hError,'4H chart unavailable.'); if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='4H data unavailable.'; if(els.lower4hStructure) els.lower4hStructure.textContent='4H Structure: 4H data unavailable.'; if(els.lower4hReaction) els.lower4hReaction.textContent='4H Reaction: 4H data unavailable.'; render4hSupportResistanceSummary({ok:false,reason:'not_enough_candles'}); }
  if(h1.status==='fulfilled'){
    try {
      const candles=mapKlinesToCandles(h1.value, hasRange ? undefined : limit1h);
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
  const latestIndex = Array.isArray(candles) ? candles.length - 1 : -1;
  const latest = latestIndex >= 0 ? candles[latestIndex] : null;
  const empty = {
    status: 'No clear 4H structure shift',
    broken: null,
    ref: '—',
    latestClose: latest?.close ?? null,
    direction: 'neutral',
    structureType: 'none',
    eventIndex: latestIndex >= 0 ? latestIndex : null,
    eventTime: latest ? getOrderflowCandleTime(latest) : null,
    brokenLevel: null,
    sourceSwingIndex: null,
    sourceSwingTime: null,
    confidence: latest ? 'low' : 'none',
  };
  if(!latest) return empty;
  const {highs,lows}=find4hSwings(candles);
  const sh=highs[highs.length-1], sl=lows[lows.length-1];
  let status=empty.status, broken=null, ref=empty.ref, direction='neutral', structureType='none', sourceSwingIndex=null, sourceSwingTime=null, confidence='low';
  const bearishTrend = lows.length>=2 && lows[lows.length-1].price<lows[lows.length-2].price;
  const bullishTrend = highs.length>=2 && highs[highs.length-1].price>highs[highs.length-2].price;
  if(sh && latest.close>sh.price){ status = bearishTrend ? 'Bullish CHoCH' : 'Bullish BOS'; broken=sh.price; ref=String(sh.time); direction='bullish'; structureType=bearishTrend ? 'CHOCH' : 'BOS'; sourceSwingIndex=sh.index; sourceSwingTime=sh.time; confidence='medium'; }
  else if(sl && latest.close<sl.price){ status = bullishTrend ? 'Bearish CHoCH' : 'Bearish BOS'; broken=sl.price; ref=String(sl.time); direction='bearish'; structureType=bullishTrend ? 'CHOCH' : 'BOS'; sourceSwingIndex=sl.index; sourceSwingTime=sl.time; confidence='medium'; }
  return {status, broken, ref, latestClose: latest.close, direction, structureType, eventIndex: latestIndex, eventTime: getOrderflowCandleTime(latest), brokenLevel: broken, sourceSwingIndex, sourceSwingTime, confidence};
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

function renderClean4hFvgOverlay({ chart, series, container, overlayLayer, candles, activeFvgs, fvgDetails = null, maxBullish = 2, maxBearish = 2 }){
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

  selected4hFvgs.forEach((f)=>{
    const bull=f.type==='Bullish 4H FVG';
    const x1=chart.timeScale().timeToCoordinate(f.startTime);
    const x2=chart.timeScale().timeToCoordinate(lastTime);
    const y1=series.priceToCoordinate(f.upper);
    const y2=series.priceToCoordinate(f.lower);

    if(x1==null || x2==null || y1==null || y2==null){
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
    const overlayLabel = formatFvgOverlayLabel(f, "4H", fvgDetails);
    r.title = `${overlayLabel} · ${usd(f.lower)} - ${usd(f.upper)}`;
    const label=document.createElement('span');
    label.className='fvg-overlay-label';
    label.textContent=overlayLabel;
    r.appendChild(label);
    overlayLayer.appendChild(r);
    current4hFvgOverlays.push(r);
    filledCount += 1;
  });

  const visualMode = filledCount>0 ? 'Filled Zones' : (fallbackCount>0 ? 'Boundary Lines' : 'Failed');
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
    const raw4hFvgs = scan4hFvg(candles);
    const all4hFvgDetails = enrichFvgDetailsWithIfvg(buildFvgDetailsForTimeframe(raw4hFvgs, candles, "4H"), candles, "4H");
    const recentBrokenFvgDetails = buildRecentBrokenFvgDetails(all4hFvgDetails, "4H");
    const recentFvgReaction = buildRecentFvgReactionMemory(all4hFvgDetails, current, "4H");
    active4hFvgs = raw4hFvgs.filter(f=>f.status!=='Filled').map(f=>{
      const inside = current>=f.lower && current<=f.upper;
      const nearest = current>f.upper?f.upper:f.lower;
      const distance = inside?0:Math.abs(current-nearest)/current*100;
      return { ...f, distance };
    }).sort((a,b)=>Math.abs(a.distance)-Math.abs(b.distance) || ((a.status==='Unfilled'?0:1)-(b.status==='Unfilled'?0:1)) || b.index-a.index);
    const structure = detect4hStructure(candles);
    latest4hStructureStatus = structure.status;
    if(els.lower4hStructure) els.lower4hStructure.textContent = `4H Structure | Status: ${structure.status} | Broken: ${structure.broken?usd(structure.broken):'—'} | Latest Close: ${usd(structure.latestClose)}`;
    if(!active4hFvgs.length){ mtfState.h4Structure = structure.status; mtfState.h4FvgNearest = null; if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent='No diagnostic context detected (4H FVG).'; if(els.lower4hReaction) els.lower4hReaction.textContent='4H Reaction: No active Weekly FVG zone detected.'; const srSummary = scan4hSupportResistance(candles); const liquidityOrderflowState = buildH4LiquidityOrderflowState({ candles, srSummary, structureStatus: structure, reason: "No possible H4 liquidity sweep detected." }); latest4hSrSummary = srSummary; render4hSupportResistanceSummary(srSummary); updateMarketPreparationState({ h4: { fvgZones: [], fvgDetails: [], recentFvgReaction, recentBrokenFvgDetails, srSummary, structureStatus: structure.status, rsiStatus, volumeStatus, liquidityOrderflowState }, meta: { sourcesReady: { h4: true } } }); refreshFvgMtfContext(); renderMarketPreparationMap(buildMarketPreparationMap()); schedule4hSrOverlayRedraw(candles); renderLowerTfReactionSummary(); renderMtfSummary(); return; }
    const nearest = active4hFvgs[0];
    mtfState.h4Structure = structure.status;
    mtfState.h4FvgNearest = nearest ? nearest.type : null;
    const fvgDetails = enrichFvgDetailsWithIfvg(buildFvgDetailsForTimeframe(active4hFvgs, candles, "4H"), candles, "4H");
    const layer=ensure4hFvgLayer();
    const visual = layer ? renderClean4hFvgOverlay({ chart: ltf4hChart, series: ltf4hSeries, container: els.lower4hChart, overlayLayer: layer, candles, activeFvgs: active4hFvgs, fvgDetails, maxBullish: 2, maxBearish: 2 }) : { selected: [], selectedBullish: [], selectedBearish: [], visualMode: "Failed" };
    const nearestDetail = findFvgDetailForZone(nearest, "4H", fvgDetails);
    const nearestStatus = nearestDetail?.detailStatus || nearest.status;
    if(els.lower4hFvgSummary) els.lower4hFvgSummary.textContent=`4H FVG | Active: ${active4hFvgs.length} | Bullish: ${visual.selectedBullish.length} | Bearish: ${visual.selectedBearish.length} | Shown: ${visual.selected.length} | Nearest: ${nearest.type} | Distance: ${nearest.distance===0?'0%':f1(nearest.distance)+'%'} | Status: ${nearestStatus} | Visual: ${visual.visualMode}`;
    const relation = nearest.distance===0 ? 'Inside' : (nearest.distance<=3 ? 'Near' : 'Far');
    if(els.lower4hReaction) els.lower4hReaction.textContent = `4H Reaction | Weekly FVG Relation: ${relation} | 4H FVG Active: ${active4hFvgs.length} | 4H Structure: ${structure.status}`;
    const srSummary = scan4hSupportResistance(candles);
    const liquidityOrderflowState = buildH4LiquidityOrderflowState({ candles, srSummary, structureStatus: structure, reason: "No possible H4 liquidity sweep detected." });
    latest4hSrSummary = srSummary;
    render4hSupportResistanceSummary(srSummary);
    updateMarketPreparationState({ h4: { fvgZones: active4hFvgs, fvgDetails, recentFvgReaction, recentBrokenFvgDetails, srSummary, structureStatus: structure.status, rsiStatus, volumeStatus, liquidityOrderflowState }, meta: { sourcesReady: { h4: true } } });
    refreshFvgMtfContext();
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
  if(!ltf1hSeries) return;
  if(!Array.isArray(candles) || !candles.length){ set1hMarkers([]); return; }
  const markers=[];
  if(getChartLayer("h1", "sweepMarkers")){
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
  }

  if(getChartLayer("h1", "structureMarkers")){
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
  }

  set1hMarkers(markers);
}
function update1hStochasticStatus(candles){
  const stochastic = compute1hStochasticStatus(candles, 14, 3);
  updateMarketPreparationState({ h1: { stochastic }, meta: { sourcesReady: { h1: true } } });
  refreshFvgTimingZoneAndQuality();
  renderMarketPreparationMap(buildMarketPreparationMap());
  return stochastic;
}

function render1hStructureSummary(candles){
  try {
    const st=detect1hStructure(candles);
    latest1hStructureStatus = st.status;
    updateMarketPreparationState({ h1: { structureStatus: st.status }, meta: { sourcesReady: { h1: true } } });
    refreshFvgTimingZoneAndQuality();
    renderMarketPreparationMap(buildMarketPreparationMap());
    mtfState.h1Structure = st.status;
    if(els.lower1hStructureSummary) els.lower1hStructureSummary.textContent=`1H Structure | Status: ${st.status} | Broken Level: ${st.broken?usd(st.broken):'—'} | Reference Swing: ${st.ref} | Latest Close: ${usd(st.latestClose)}`;
  } catch(e){
    console.error('1H structure scanner failed', e);
    latest1hStructureStatus = '1H structure unavailable';
    updateMarketPreparationState({ h1: { structureStatus: latest1hStructureStatus }, meta: { sourcesReady: { h1: true } } });
    refreshFvgTimingZoneAndQuality();
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
    refreshFvgTimingZoneAndQuality();
    renderMarketPreparationMap(buildMarketPreparationMap());
    mtfState.h1Sweep = sweep.status;
    if(!els.lower1hSweepSummary) return;
    if(sweep.status==='No recent sweep'){ els.lower1hSweepSummary.textContent='No diagnostic context detected (1H liquidity sweep).'; return; }
    els.lower1hSweepSummary.textContent=`1H Liquidity Sweep | Status: ${sweep.status} | Swept Level: ${usd(sweep.level)} | Candle Time: ${sweep.time} | Distance: ${f1(sweep.distance)}%`;
  }catch(e){ console.error('1H sweep scanner failed',e); if(els.lower1hSweepSummary) els.lower1hSweepSummary.textContent='1H liquidity sweep unavailable.'; }
}
function renderLowerTfReactionSummary(){
  renderDailyContextSummary();
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
  if(els.lowerTfReactionSummary) els.lowerTfReactionSummary.textContent="Lower TF Stack: loading";
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
  renderMarketPreparationMap({ upside: [], downside: [], currentRowText: "● Price unavailable | Daily: context unavailable | Waiting for ticker/4H/1H context" });
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
      const rawWeeklyFvgs = scanWeeklyFvg(dataset);
      const allWeeklyFvgDetails = enrichFvgDetailsWithIfvg(buildFvgDetailsForTimeframe(rawWeeklyFvgs, dataset, "Weekly"), dataset, "Weekly");
      const weeklyFvgDetails = enrichFvgDetailsWithIfvg(buildFvgDetailsForTimeframe(activeFvgs, dataset, "Weekly"), dataset, "Weekly");
      const weeklyRecentBrokenFvgDetails = buildRecentBrokenFvgDetails(allWeeklyFvgDetails, "Weekly");
      const weeklyRecentFvgReaction = buildRecentFvgReactionMemory(allWeeklyFvgDetails, dataset[dataset.length-1]?.close, "Weekly");
      renderWeeklySupportResistance(weeklySrSummary);
      renderWeeklyCandleCharacter(dataset);
      renderMtfSummary();
      updateMarketPreparationState({ weekly: { fvgZones: activeFvgs, fvgDetails: weeklyFvgDetails, recentFvgReaction: weeklyRecentFvgReaction, recentBrokenFvgDetails: weeklyRecentBrokenFvgDetails, srSummary: weeklySrSummary }, meta: { sourcesReady: { weekly: true } } });
      refreshFvgMtfContext();
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
renderH4LiquidityDiagnosticsPanel();
renderDailyContextSummary();
loadDashboard();

manualChartLines = loadManualChartLines();
manualChartDrawings = loadManualChartDrawings();
setupCollapsibleSections();
bindDrawingManagerEvents();
bindCurrentPriceDetailEvents();
bindChartLayerControls();
bindChartZoomToggle();
closeDrawingManager();

window.addEventListener("resize", ()=>{
  if(priceChart && els.priceChart) {
    priceChart.resize(els.priceChart.clientWidth, els.priceChart.clientHeight);
    renderFvgFilledOverlay();
    if(weeklySrSummaryForOverlay) renderWeeklySrOverlay(weeklySrSummaryForOverlay, weeklyDatasetCache || []);
  }
  if(ltfDailyChart && els.lowerDailyChart) { ltfDailyChart.resize(els.lowerDailyChart.clientWidth, els.lowerDailyChart.clientHeight); scheduleDailyFvgOverlayRedraw(); scheduleDailySrOverlayRedraw(); renderDailyPatternOverlay(); }
  if(ltf4hChart && els.lower4hChart) ltf4hChart.resize(els.lower4hChart.clientWidth, els.lower4hChart.clientHeight);
  if(ltf1hChart && els.lower1hChart) ltf1hChart.resize(els.lower1hChart.clientWidth, els.lower1hChart.clientHeight);
  scheduleTrendlineRedraw("weekly");
  scheduleTrendlineRedraw("h4");
  if(ltf4hChart) { schedule4hFvgOverlayRedraw(latest4hCandles); schedule4hSrOverlayRedraw(latest4hCandles); renderLowerTfReactionSummary(); }
});
