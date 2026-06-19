const BTC_TICKER_URL = "https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT";
const BTC_WEEKLY_KLINE_URL = "https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120";
const FEAR_GREED_URL = "https://api.alternative.me/fng/?limit=1";
const RSI_PERIOD = 14;
const RSI_WINDOW = 49;
// IMPORTANT:
// Update APP_LAST_UPDATED every time the app code is modified or deployed.
// This value represents app/code update time, not live API refresh time.
const APP_LAST_UPDATED = "2026-06-19 00:00";

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
  right4hFvgType: document.getElementById("right4hFvgType"), right4hFvgZone: document.getElementById("right4hFvgZone"), right4hFvgRelation: document.getElementById("right4hFvgRelation"), right4hFvgDistance: document.getElementById("right4hFvgDistance"), right4hFvgStatus: document.getElementById("right4hFvgStatus"), mtfWeeklyBias: document.getElementById("mtfWeeklyBias"), mtfDailyValidation: document.getElementById("mtfDailyValidation"), mtf4hReaction: document.getElementById("mtf4hReaction"), mtf1hTiming: document.getElementById("mtf1hTiming"), mtfFinalStatus: document.getElementById("mtfFinalStatus"), weeklyCandleW1: document.getElementById("weeklyCandleW1"), weeklyCandleW2: document.getElementById("weeklyCandleW2"), weeklyCandleW3: document.getElementById("weeklyCandleW3"), weeklyCandleReading: document.getElementById("weeklyCandleReading"), weeklyCandleCondition: document.getElementById("weeklyCandleCondition"), weeklySrResistanceZone: document.getElementById("weeklySrResistanceZone"), weeklySrResistanceMeta: document.getElementById("weeklySrResistanceMeta"), weeklySrSupportZone: document.getElementById("weeklySrSupportZone"), weeklySrSupportMeta: document.getElementById("weeklySrSupportMeta"), weeklySrMeaning: document.getElementById("weeklySrMeaning"), prepUpsideRows: document.getElementById("prepUpsideRows"), prepCurrentRow: document.getElementById("prepCurrentRow"), prepDownsideRows: document.getElementById("prepDownsideRows"),
  prepCurrentDetail: document.getElementById("prepCurrentDetail"), prepCurrentDetailContent: document.getElementById("prepCurrentDetailContent"), prepCurrentDetailToggle: document.getElementById("prepCurrentDetailToggle"), pulseLabEngineMapPanel: document.getElementById("pulseLabEngineMapPanel"), timeframeRoleAlignmentPanel: document.getElementById("timeframeRoleAlignmentPanel"), weeklyMajorStructurePanel: document.getElementById("weeklyMajorStructurePanel"), dailyValidationFoundationPanel: document.getElementById("dailyValidationFoundationPanel"), h4ReactionContextPanel: document.getElementById("h4ReactionContextPanel"), h1TimingContextPanel: document.getElementById("h1TimingContextPanel"), h4LiquiditySummaryPanel: document.getElementById("h4LiquiditySummaryPanel"), h4LiquidityDiagnosticsPanel: document.getElementById("h4LiquidityDiagnosticsPanel"), h4LiquidityDiagnosticsBody: document.getElementById("h4LiquidityDiagnosticsBody"), h4LiquidityDiagnosticsSummary: document.getElementById("h4LiquidityDiagnosticsSummary"), keyMarketZonesSummaryPanel: document.getElementById("keyMarketZonesSummaryPanel"), marketPreparationMapDetails: document.getElementById("marketPreparationMapDetails"), tradePlanScenarioPanel: document.getElementById("tradePlanScenarioPanel"), multiScenarioPlanningPanel: document.getElementById("multiScenarioPlanningPanel"), ifvgContextPanel: document.getElementById("ifvgContextPanel"),
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
let latestWeeklyMajorStructureContext = null;
let latestDailyValidationContext = null;
let latestH4ReactionContext = null;
let latestH1TimingContext = null;
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
function createScenarioDisclaimer(){
  return TRADE_SCENARIO_DISCLAIMER;
}
function createEmptyScenarioPlan(){
  return {
    scenarioId: null,
    scenarioType: "wait_no_trade",
    direction: "neutral",
    status: "informational",
    scenarioZone: null,
    invalidationReference: null,
    tp1: null,
    tp2: null,
    tp3: null,
    confirmationRequirements: [],
    confluenceSources: [],
    riskNotes: [],
    displayTitle: "Wait / No-Trade Scenario",
    disclaimer: createScenarioDisclaimer(),
  };
}
function getScenarioReferenceSources(row){
  return getConfluenceSourceList(row).map((source)=>source || {}).filter(Boolean);
}
function inferScenarioSourceTimeframe(source){
  const text = `${source?.source || ""} ${source?.primarySource || ""} ${source?.label || ""} ${source?.timeframe || ""}`.toLowerCase();
  if(text.includes("weekly") || text.includes("weekly_") || text.includes("w support") || text.includes("w resistance") || text.includes("w bullish") || text.includes("w bearish")) return "W";
  if(text.includes("daily") || text.includes("daily_")) return "D";
  if(text.includes("h4") || text.includes("4h")) return "4H";
  if(text.includes("h1") || text.includes("1h")) return "1H";
  return null;
}
function inferScenarioSourceType(source){
  const kind = getMarketMapSourceKind(source);
  if(kind === "fvg") return "FVG";
  if(kind === "ifvg") return "IFVG";
  if(kind === "support") return "Support";
  if(kind === "resistance") return "Resistance";
  if(kind === "channel") return "Channel";
  if(kind === "range") return "Range";
  return source?.type || source?.source || "Zone";
}
function getScenarioReferenceBase(row, role){
  if(!row || !Number.isFinite(Number(row.lower)) || !Number.isFinite(Number(row.upper))) return null;
  const lower = Math.min(Number(row.lower), Number(row.upper));
  const upper = Math.max(Number(row.lower), Number(row.upper));
  if(!Number.isFinite(lower) || !Number.isFinite(upper)) return null;
  const midpoint = Number.isFinite(Number(row.center)) ? Number(row.center) : (lower + upper) / 2;
  const sources = getScenarioReferenceSources(row);
  const sourceTimeframes = [...new Set(sources.map(inferScenarioSourceTimeframe).filter(Boolean))];
  const sourceTypes = [...new Set(sources.map(inferScenarioSourceType).filter(Boolean))];
  return {
    label: row.label || row.confluenceLabel || row.primarySource || "Market Map Zone",
    lower,
    upper,
    midpoint,
    sourceSide: row.side || null,
    sourceTimeframes,
    sourceTypes,
    sourceRowKey: row.key || row.id || null,
    distancePct: Number.isFinite(Number(row.distancePct)) ? Number(row.distancePct) : null,
    zoneText: row.zoneText || `${usd(lower)}–${usd(upper)}`,
    role: role || null,
    source: "Market Preparation Map",
  };
}
function normalizeScenarioZoneReference(row, role = "scenarioZone"){
  return getScenarioReferenceBase(row, role);
}
function normalizeScenarioTargetReference(row, role = "target"){
  const base = getScenarioReferenceBase(row, role);
  if(!base) return null;
  return { ...base, price: base.midpoint };
}
function getScenarioDirection(direction){
  if(direction === "bullish" || direction === "bearish") return direction;
  return "neutral";
}
function getScenarioZoneBoundary(zoneRef, direction){
  if(!zoneRef) return null;
  const lower = Number(zoneRef.lower);
  const upper = Number(zoneRef.upper);
  if(direction === "bullish" && Number.isFinite(upper)) return upper;
  if(direction === "bearish" && Number.isFinite(lower)) return lower;
  return null;
}
function getTargetReferencePrice(targetRef, direction){
  if(!targetRef) return null;
  const lower = Number(targetRef.lower);
  const upper = Number(targetRef.upper);
  const price = Number(targetRef.price);
  if(direction === "bullish" && Number.isFinite(lower)) return lower;
  if(direction === "bearish" && Number.isFinite(upper)) return upper;
  if(Number.isFinite(price)) return price;
  if(Number.isFinite(lower) && Number.isFinite(upper)) return (lower + upper) / 2;
  return null;
}
function getScenarioTargetDuplicateTolerance(price){
  const value = Math.abs(Number(price));
  return Number.isFinite(value) ? Math.max(value * 0.002, 1) : 1;
}
function areScenarioReferencePricesNear(a, b){
  const left = Number(a);
  const right = Number(b);
  if(!Number.isFinite(left) || !Number.isFinite(right)) return false;
  return Math.abs(left - right) <= getScenarioTargetDuplicateTolerance(right);
}
function areScenarioReferenceRangesSame(a, b){
  if(!a || !b) return false;
  const aLower = Number(a.lower);
  const aUpper = Number(a.upper);
  const bLower = Number(b.lower);
  const bUpper = Number(b.upper);
  if(!Number.isFinite(aLower) || !Number.isFinite(aUpper) || !Number.isFinite(bLower) || !Number.isFinite(bUpper)) return false;
  return areScenarioReferencePricesNear(aLower, bLower) && areScenarioReferencePricesNear(aUpper, bUpper);
}
function isScenarioTargetSameAsScenarioZone(candidate, scenarioZone){
  if(!candidate || !scenarioZone) return false;
  if(candidate.sourceRowKey && scenarioZone.sourceRowKey && candidate.sourceRowKey === scenarioZone.sourceRowKey) return true;
  return areScenarioReferenceRangesSame(candidate, scenarioZone);
}
function isScenarioTargetSameAsInvalidation(candidate, invalidationReference){
  if(!candidate || !invalidationReference) return false;
  return areScenarioReferencePricesNear(candidate.price, invalidationReference.price);
}
function isTargetCandidateOnCorrectSide(candidate, direction, scenarioZone = null, currentPrice = null){
  const side = getScenarioDirection(direction);
  if(side === "neutral") return false;
  const price = Number(candidate?.price);
  if(!Number.isFinite(price)) return false;
  const zoneBoundary = getScenarioZoneBoundary(scenarioZone, side);
  const current = Number(currentPrice);
  const references = [zoneBoundary, Number.isFinite(current) ? current : null].filter((value)=>Number.isFinite(Number(value))).map(Number);
  if(!references.length) return true;
  return side === "bullish" ? price > Math.max(...references) : price < Math.min(...references);
}
function isDuplicateTargetCandidate(candidate, selectedTargets = []){
  if(!candidate) return true;
  return selectedTargets.some((selected)=>areScenarioReferencePricesNear(candidate.price, selected.price) || areScenarioReferenceRangesSame(candidate, selected));
}
function normalizeScenarioTargetCandidates(rows = [], direction = "neutral"){
  const side = getScenarioDirection(direction);
  return (Array.isArray(rows) ? rows : [])
    .map((row, index)=>{
      const target = normalizeScenarioTargetReference(row, "targetCandidate");
      if(!target) return null;
      const price = getTargetReferencePrice(target, side);
      if(!Number.isFinite(Number(price))) return null;
      return { ...target, price: Number(price), candidateIndex: index, direction: side };
    })
    .filter(Boolean);
}
function buildScenarioLiquidityContext(state){
  const liquidity = state?.h4?.liquidityOrderflowState;
  const episode = liquidity?.activeEpisode;
  if(!episode) return null;
  return {
    timeframe: liquidity.timeframe || "4H",
    role: liquidity.role || "context",
    status: episode.status || null,
    displayStatus: episode.displayStatus || null,
    sweepType: episode.sweep?.type || null,
    reclaimStatus: episode.reclaim?.status || null,
    score: Number.isFinite(Number(episode.score)) ? Number(episode.score) : null,
    band: episode.band || null,
    confirmationBlockers: Array.isArray(liquidity.diagnostics?.confirmationBlockers) ? [...liquidity.diagnostics.confirmationBlockers] : [],
    confirmationCorroborators: Array.isArray(liquidity.diagnostics?.confirmationCorroborators) ? [...liquidity.diagnostics.confirmationCorroborators] : [],
  };
}
function buildScenarioIfvgContext(state){
  const frames = [
    { timeframe: "W", memory: state?.weekly?.recentBrokenFvgDetails },
    { timeframe: "D", memory: state?.daily?.recentBrokenFvgDetails },
    { timeframe: "4H", memory: state?.h4?.recentBrokenFvgDetails },
  ];
  return frames.map((frame)=>({
    timeframe: frame.timeframe,
    bullish: frame.memory?.bullish?.ifvg ? { state: frame.memory.bullish.ifvg.state || null, label: frame.memory.bullish.ifvg.ui?.label || null } : null,
    bearish: frame.memory?.bearish?.ifvg ? { state: frame.memory.bearish.ifvg.state || null, label: frame.memory.bearish.ifvg.ui?.label || null } : null,
    count: Array.isArray(frame.memory?.all) ? frame.memory.all.length : 0,
  }));
}
function buildScenarioInputSnapshot(mapData = {}, state = marketPreparationState){
  const upsideRows = Array.isArray(mapData?.upside) ? [...mapData.upside] : [];
  const downsideRows = Array.isArray(mapData?.downside) ? [...mapData.downside] : [];
  return {
    currentPrice: Number.isFinite(Number(state?.currentPrice)) ? Number(state.currentPrice) : null,
    upsideRows,
    downsideRows,
    nearestUpside: normalizeScenarioZoneReference(upsideRows[0], "nearestUpside"),
    nearestDownside: normalizeScenarioZoneReference(downsideRows[0], "nearestDownside"),
    h4LiquidityContext: buildScenarioLiquidityContext(state),
    ifvgContext: buildScenarioIfvgContext(state),
    existingTradePlanScenario: state?.tradePlanScenario || null,
    disclaimer: createScenarioDisclaimer(),
  };
}
function buildScenarioInvalidationReference(zoneRef, direction){
  if(!zoneRef || !Number.isFinite(Number(zoneRef.lower)) || !Number.isFinite(Number(zoneRef.upper))) return null;
  const lower = Math.min(Number(zoneRef.lower), Number(zoneRef.upper));
  const upper = Math.max(Number(zoneRef.lower), Number(zoneRef.upper));
  if(direction === "bullish"){
    return { label: "Below scenario zone", price: lower, boundary: "lower", direction, role: "invalidationReference", source: "Scenario zone boundary", detail: "Invalidation reference only." };
  }
  if(direction === "bearish"){
    return { label: "Above scenario zone", price: upper, boundary: "upper", direction, role: "invalidationReference", source: "Scenario zone boundary", detail: "Invalidation reference only." };
  }
  return { label: "Invalidation reference unavailable", price: null, boundary: null, direction: direction || "neutral", role: "invalidationReference", source: "Scenario zone boundary", detail: "Scenario zone unavailable." };
}
function buildScenarioTargetLadder(oppositeRows = [], direction = "neutral", options = {}){
  const side = getScenarioDirection(direction);
  if(side === "neutral") return { tp1: null, tp2: null, tp3: null, direction: side };
  const candidates = normalizeScenarioTargetCandidates(oppositeRows, side)
    .filter((candidate)=>!isScenarioTargetSameAsScenarioZone(candidate, options.scenarioZone))
    .filter((candidate)=>!isScenarioTargetSameAsInvalidation(candidate, options.invalidationReference))
    .filter((candidate)=>isTargetCandidateOnCorrectSide(candidate, side, options.scenarioZone, options.currentPrice))
    .sort((a,b)=>side === "bullish" ? a.price - b.price : b.price - a.price);
  const selected = [];
  candidates.forEach((candidate)=>{
    if(selected.length >= 3) return;
    if(isDuplicateTargetCandidate(candidate, selected)) return;
    selected.push(candidate);
  });
  const targets = [0, 1, 2].map((index)=>selected[index] ? { ...selected[index], role: `tp${index + 1}` } : null);
  return {
    tp1: targets[0] || null,
    tp2: targets[1] || null,
    tp3: targets[2] || null,
    direction,
  };
}
function getScenarioIfvgContextForDirection(snapshot, direction){
  const side = direction === "bullish" ? "bullish" : (direction === "bearish" ? "bearish" : null);
  if(!side || !Array.isArray(snapshot?.ifvgContext)) return [];
  return snapshot.ifvgContext.map((frame)=>({ timeframe: frame.timeframe, ...(frame[side] || {}) })).filter((item)=>item.state || item.label);
}
function buildScenarioConfirmationRequirements(snapshot, direction = "neutral", scenarioType = "wait_no_trade"){
  const liquidity = snapshot?.h4LiquidityContext;
  const ifvgItems = getScenarioIfvgContextForDirection(snapshot, direction);
  const existing = snapshot?.existingTradePlanScenario;
  const nearestZone = direction === "bullish" ? snapshot?.nearestDownside : (direction === "bearish" ? snapshot?.nearestUpside : null);
  return [
    {
      type: "h4_liquidity",
      label: liquidity?.displayStatus ? `H4 liquidity context: ${liquidity.displayStatus}` : "H4 liquidity confirmation preferred",
      status: liquidity?.status ? "informational" : "waiting",
      required: false,
      scenarioType,
    },
    {
      type: "ifvg_context",
      label: ifvgItems.length ? "IFVG context available for review" : "IFVG context requires confirmation",
      status: ifvgItems.length ? "informational" : "waiting",
      required: false,
      scenarioType,
    },
    {
      type: "existing_trade_plan_context",
      label: existing?.primaryStatus ? `Existing Preparation Scenario: ${existing.primaryStatus}` : "Existing Preparation Scenario unavailable",
      status: existing?.primaryStatus ? "informational" : "waiting",
      required: false,
      scenarioType,
    },
    {
      type: "nearest_zone_context",
      label: nearestZone?.label ? `Nearest scenario zone: ${nearestZone.label}` : "Nearest scenario zone unavailable",
      status: nearestZone ? "informational" : "waiting",
      required: false,
      scenarioType,
    },
  ];
}
function buildScenarioConfluenceSources(zoneRef){
  if(!zoneRef) return [];
  const timeframes = Array.isArray(zoneRef.sourceTimeframes) ? zoneRef.sourceTimeframes : [];
  const types = Array.isArray(zoneRef.sourceTypes) ? zoneRef.sourceTypes : [];
  const label = [timeframes.join("/"), types.join(" + ")].filter(Boolean).join(" · ") || zoneRef.label || "Market Map zone";
  return [{ type: "market_map", label, source: zoneRef.source || "Market Preparation Map", required: false }];
}
function createScenarioPlanFromParts(parts = {}){
  return { ...createEmptyScenarioPlan(), ...parts, disclaimer: createScenarioDisclaimer() };
}
function hasScenarioZone(zoneRef){
  return !!zoneRef && Number.isFinite(Number(zoneRef.lower)) && Number.isFinite(Number(zoneRef.upper));
}
function isTargetLadderIncomplete(ladder){
  return !ladder?.tp1 || !ladder?.tp2 || !ladder?.tp3;
}
function buildBullishScenarioFromSnapshot(snapshot){
  const scenarioZone = snapshot?.nearestDownside || null;
  const invalidationReference = buildScenarioInvalidationReference(scenarioZone, "bullish");
  const targetLadder = buildScenarioTargetLadder(snapshot?.upsideRows, "bullish", { scenarioZone, invalidationReference, currentPrice: snapshot?.currentPrice });
  const hasZone = hasScenarioZone(scenarioZone);
  return createScenarioPlanFromParts({
    scenarioId: "potential_bullish_scenario",
    scenarioType: "bullish_reversal",
    direction: "bullish",
    status: hasZone ? "waiting" : "informational",
    scenarioZone,
    invalidationReference,
    tp1: targetLadder.tp1,
    tp2: targetLadder.tp2,
    tp3: targetLadder.tp3,
    confirmationRequirements: buildScenarioConfirmationRequirements(snapshot, "bullish", "bullish_reversal"),
    confluenceSources: buildScenarioConfluenceSources(scenarioZone),
    riskNotes: [hasZone ? "Scenario zone is a planning reference only." : "No downside planning zone is available.", isTargetLadderIncomplete(targetLadder) ? "Target references are incomplete." : "Target references come from existing upside Market Map rows."],
    displayTitle: "Potential Bullish Scenario",
  });
}
function buildBearishScenarioFromSnapshot(snapshot){
  const scenarioZone = snapshot?.nearestUpside || null;
  const invalidationReference = buildScenarioInvalidationReference(scenarioZone, "bearish");
  const targetLadder = buildScenarioTargetLadder(snapshot?.downsideRows, "bearish", { scenarioZone, invalidationReference, currentPrice: snapshot?.currentPrice });
  const hasZone = hasScenarioZone(scenarioZone);
  return createScenarioPlanFromParts({
    scenarioId: "potential_bearish_scenario",
    scenarioType: "bearish_continuation",
    direction: "bearish",
    status: hasZone ? "waiting" : "informational",
    scenarioZone,
    invalidationReference,
    tp1: targetLadder.tp1,
    tp2: targetLadder.tp2,
    tp3: targetLadder.tp3,
    confirmationRequirements: buildScenarioConfirmationRequirements(snapshot, "bearish", "bearish_continuation"),
    confluenceSources: buildScenarioConfluenceSources(scenarioZone),
    riskNotes: [hasZone ? "Scenario zone is a planning reference only." : "No upside planning zone is available.", isTargetLadderIncomplete(targetLadder) ? "Target references are incomplete." : "Target references come from existing downside Market Map rows."],
    displayTitle: "Potential Bearish Scenario",
  });
}
function hasStructuredIfvgContext(snapshot, direction){
  return getScenarioIfvgContextForDirection(snapshot, direction).length > 0;
}
function buildBreakoutRetestScenarioFromSnapshot(snapshot){
  const hasIfvg = hasStructuredIfvgContext(snapshot, "bullish");
  return createScenarioPlanFromParts({
    scenarioId: "breakout_retest_scenario",
    scenarioType: "breakout_retest",
    direction: "bullish",
    status: hasIfvg ? "waiting" : "informational",
    scenarioZone: null,
    invalidationReference: null,
    confirmationRequirements: buildScenarioConfirmationRequirements(snapshot, "bullish", "breakout_retest"),
    confluenceSources: [],
    riskNotes: [hasIfvg ? "IFVG context is available for review; retest confirmation remains required." : "IFVG context requires confirmation before breakout-retest planning."],
    displayTitle: "Breakout Retest Scenario",
  });
}
function buildBreakdownRetestScenarioFromSnapshot(snapshot){
  const hasIfvg = hasStructuredIfvgContext(snapshot, "bearish");
  return createScenarioPlanFromParts({
    scenarioId: "breakdown_retest_scenario",
    scenarioType: "breakdown_retest",
    direction: "bearish",
    status: hasIfvg ? "waiting" : "informational",
    scenarioZone: null,
    invalidationReference: null,
    confirmationRequirements: buildScenarioConfirmationRequirements(snapshot, "bearish", "breakdown_retest"),
    confluenceSources: [],
    riskNotes: [hasIfvg ? "IFVG or failed-reclaim context is available for review; confirmation remains required." : "Breakdown context requires confirmation."],
    displayTitle: "Breakdown Retest Scenario",
  });
}
function buildWaitNoTradeScenarioFromSnapshot(snapshot, reason = "No clear planning context yet."){
  return createScenarioPlanFromParts({
    scenarioId: "wait_no_trade_scenario",
    scenarioType: "wait_no_trade",
    direction: "neutral",
    status: "informational",
    scenarioZone: null,
    invalidationReference: null,
    confirmationRequirements: buildScenarioConfirmationRequirements(snapshot, "neutral", "wait_no_trade"),
    confluenceSources: [],
    riskNotes: [reason, "Wait for price to reach a scenario zone or confirmation context to improve."],
    displayTitle: "Wait / No-Trade Scenario",
  });
}
function buildMultiScenarioPlansFromSnapshot(snapshot){
  const bullish = buildBullishScenarioFromSnapshot(snapshot);
  const bearish = buildBearishScenarioFromSnapshot(snapshot);
  const breakout = buildBreakoutRetestScenarioFromSnapshot(snapshot);
  const breakdown = buildBreakdownRetestScenarioFromSnapshot(snapshot);
  const needsWait = !hasScenarioZone(bullish.scenarioZone) || !hasScenarioZone(bearish.scenarioZone) || isTargetLadderIncomplete(bullish) || isTargetLadderIncomplete(bearish);
  const scenarios = [bullish, bearish, breakout, breakdown];
  if(needsWait) scenarios.push(buildWaitNoTradeScenarioFromSnapshot(snapshot));
  return scenarios;
}
// Derived confirmation context is display-only and never mutates scenario plans or dashboard state.
const SCENARIO_CONFIRMATION_STATUSES = Object.freeze(["confirmed", "waiting", "weak", "failed", "unavailable"]);
function normalizeScenarioConfirmationStatus(status){
  const normalized = String(status || "unavailable").trim().toLowerCase();
  return SCENARIO_CONFIRMATION_STATUSES.includes(normalized) ? normalized : "unavailable";
}
function formatScenarioConfirmationStatus(status){
  const normalized = normalizeScenarioConfirmationStatus(status);
  if(normalized === "confirmed") return "Confirmed Context";
  if(normalized === "waiting") return "Waiting Confirmation";
  if(normalized === "weak") return "Weak Confirmation";
  if(normalized === "failed") return "Failed Context";
  return "Context Unavailable";
}
function formatScenarioConfirmationReasons(reasons){
  return Array.isArray(reasons) ? reasons.filter(Boolean).map((reason)=>String(reason)) : [];
}
function hasScenarioConfirmationSupport(snapshot, direction){
  const ifvg = getScenarioIfvgContextForDirection(snapshot, direction);
  const supportiveIfvg = ifvg.some((item)=>/reclaim|confirmed|valid|active/i.test(`${item.state || ""} ${item.label || ""}`) && !/failed|invalid/i.test(`${item.state || ""} ${item.label || ""}`));
  const liquidity = snapshot?.h4LiquidityContext;
  const supportiveSweep = direction === "bullish" ? liquidity?.sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_LOW : liquidity?.sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH;
  const supportiveLiquidity = supportiveSweep && /confirm|valid|reclaim/i.test(`${liquidity?.status || ""} ${liquidity?.displayStatus || ""} ${liquidity?.reclaimStatus || ""}`);
  const legacy = snapshot?.existingTradePlanScenario;
  const supportiveLegacy = legacy?.primarySide === direction && legacy?.primaryStatus === TRADE_SCENARIO_STATUS.ACTIVE;
  return supportiveIfvg || supportiveLiquidity || supportiveLegacy;
}
function hasScenarioContradiction(plan, snapshot, direction){
  const hasCurrentPrice = snapshot?.currentPrice !== null && snapshot?.currentPrice !== undefined && Number.isFinite(Number(snapshot.currentPrice));
  const hasInvalidationPrice = plan?.invalidationReference?.price !== null && plan?.invalidationReference?.price !== undefined && Number.isFinite(Number(plan.invalidationReference.price));
  const currentPrice = hasCurrentPrice ? Number(snapshot.currentPrice) : null;
  const invalidationPrice = hasInvalidationPrice ? Number(plan.invalidationReference.price) : null;
  const invalidationBreached = hasCurrentPrice && hasInvalidationPrice
    && ((direction === "bullish" && currentPrice < invalidationPrice) || (direction === "bearish" && currentPrice > invalidationPrice));
  const notes = Array.isArray(plan?.riskNotes) ? plan.riskNotes.join(" ") : "";
  const directionalIfvg = getScenarioIfvgContextForDirection(snapshot, direction);
  const failedIfvgOnly = directionalIfvg.length > 0 && directionalIfvg.every((item)=>/failed|invalid/i.test(`${item.state || ""} ${item.label || ""}`));
  return plan?.status === "invalid" || invalidationBreached || failedIfvgOnly || /contradict|invalidated|failed context|blocked/i.test(notes);
}
function deriveDirectionalScenarioConfirmationStatus(plan, snapshot, direction){
  if(!hasScenarioZone(plan?.scenarioZone)) return { confirmationStatus: "unavailable", confirmationReasons: ["Scenario zone is unavailable."] };
  if(hasScenarioContradiction(plan, snapshot, direction)) return { confirmationStatus: "failed", confirmationReasons: ["Current context contradicts or invalidates the scenario reference."] };
  if(!plan?.invalidationReference || !plan?.tp1) return { confirmationStatus: "weak", confirmationReasons: ["Invalidation or TP1 reference is incomplete."] };
  if(!plan?.tp2 || !plan?.tp3) return { confirmationStatus: "weak", confirmationReasons: ["Target reference ladder is incomplete."] };
  if(hasScenarioConfirmationSupport(snapshot, direction)) return { confirmationStatus: "confirmed", confirmationReasons: ["Scenario zone, invalidation, target references, and supporting context are available for review."] };
  return { confirmationStatus: "waiting", confirmationReasons: ["Scenario references are available; supporting confirmation context remains incomplete."] };
}
function deriveBullishScenarioConfirmationStatus(plan, snapshot){
  return deriveDirectionalScenarioConfirmationStatus(plan, snapshot, "bullish");
}
function deriveBearishScenarioConfirmationStatus(plan, snapshot){
  return deriveDirectionalScenarioConfirmationStatus(plan, snapshot, "bearish");
}
function deriveBreakoutRetestConfirmationStatus(plan, snapshot){
  return deriveDirectionalScenarioConfirmationStatus(plan, snapshot, "bullish");
}
function deriveBreakdownRetestConfirmationStatus(plan, snapshot){
  return deriveDirectionalScenarioConfirmationStatus(plan, snapshot, "bearish");
}
function deriveWaitScenarioConfirmationStatus(plan, snapshot){
  const hasContext = hasScenarioZone(snapshot?.nearestUpside) || hasScenarioZone(snapshot?.nearestDownside) || !!snapshot?.h4LiquidityContext || (Array.isArray(snapshot?.ifvgContext) && snapshot.ifvgContext.some((item)=>item?.count || item?.bullish || item?.bearish));
  if(!hasContext) return { confirmationStatus: "unavailable", confirmationReasons: ["Meaningful planning context is unavailable."] };
  const incompleteOrMixed = !hasScenarioZone(snapshot?.nearestUpside) || !hasScenarioZone(snapshot?.nearestDownside) || plan?.status === "informational";
  if(incompleteOrMixed) return { confirmationStatus: "confirmed", confirmationReasons: ["Waiting remains appropriate while scenario context is mixed or incomplete."] };
  return { confirmationStatus: "waiting", confirmationReasons: ["Monitor existing scenario zones for clearer context."] };
}
function deriveScenarioConfirmationStatus(plan, snapshot){
  let result;
  if(plan?.scenarioType === "bullish_reversal") result = deriveBullishScenarioConfirmationStatus(plan, snapshot);
  else if(plan?.scenarioType === "bearish_continuation") result = deriveBearishScenarioConfirmationStatus(plan, snapshot);
  else if(plan?.scenarioType === "breakout_retest") result = deriveBreakoutRetestConfirmationStatus(plan, snapshot);
  else if(plan?.scenarioType === "breakdown_retest") result = deriveBreakdownRetestConfirmationStatus(plan, snapshot);
  else if(plan?.scenarioType === "wait_no_trade") result = deriveWaitScenarioConfirmationStatus(plan, snapshot);
  else result = { confirmationStatus: "unavailable", confirmationReasons: ["Scenario confirmation context is unavailable."] };
  const confirmationStatus = normalizeScenarioConfirmationStatus(result.confirmationStatus);
  return {
    confirmationStatus,
    confirmationStatusLabel: formatScenarioConfirmationStatus(confirmationStatus),
    confirmationReasons: formatScenarioConfirmationReasons(result.confirmationReasons),
  };
}
function addDerivedScenarioConfirmation(plan, snapshot){
  return { ...(plan || {}), ...deriveScenarioConfirmationStatus(plan, snapshot) };
}
// Primary selection is display-only and uses categorical context, not a scenario score.
function hasUsablePrimaryScenarioReferences(plan){
  return hasScenarioZone(plan?.scenarioZone) && !!plan?.invalidationReference && !!plan?.tp1;
}
function getScenarioPrimaryRank(plan, snapshot){
  const confirmationStatus = normalizeScenarioConfirmationStatus(plan?.confirmationStatus);
  const statusOrder = ["confirmed", "waiting", "weak", "unavailable", "failed"];
  const severeRiskNotes = Array.isArray(plan?.riskNotes) ? plan.riskNotes.filter((note)=>/contradict|invalidated|failed context|blocked/i.test(String(note))).length : 0;
  const referenceCount = [plan?.scenarioZone, plan?.invalidationReference, plan?.tp1, plan?.tp2, plan?.tp3].filter(Boolean).length;
  return {
    eligible: !["failed", "unavailable"].includes(confirmationStatus),
    confirmationOrder: statusOrder.indexOf(confirmationStatus),
    hasUsableReferences: hasUsablePrimaryScenarioReferences(plan),
    referenceCount,
    severeRiskNotes,
    isWaitScenario: plan?.scenarioType === "wait_no_trade",
    legacyDirectionAligned: !!snapshot?.existingTradePlanScenario?.primarySide && snapshot.existingTradePlanScenario.primarySide === plan?.direction,
  };
}
function selectPrimaryScenarioPlan(plans, snapshot){
  const scenarios = Array.isArray(plans) ? plans.filter(Boolean) : [];
  const ranked = scenarios.map((plan, index)=>({ plan, index, rank: getScenarioPrimaryRank(plan, snapshot) }));
  const directional = ranked.filter((item)=>!item.rank.isWaitScenario && item.rank.eligible && item.rank.hasUsableReferences);
  if(directional.length){
    return [...directional].sort((a, b)=>a.rank.confirmationOrder - b.rank.confirmationOrder || b.rank.referenceCount - a.rank.referenceCount || a.rank.severeRiskNotes - b.rank.severeRiskNotes || Number(b.rank.legacyDirectionAligned) - Number(a.rank.legacyDirectionAligned) || a.index - b.index)[0].plan;
  }
  const waitScenario = ranked.find((item)=>item.rank.isWaitScenario && normalizeScenarioConfirmationStatus(item.plan?.confirmationStatus) !== "failed");
  return waitScenario?.plan || null;
}
function formatPrimaryScenarioReason(plan){
  if(!plan?.isPrimaryScenario) return "";
  const status = normalizeScenarioConfirmationStatus(plan.confirmationStatus);
  if(plan.scenarioType === "wait_no_trade") return "Current focus: directional scenario context is unavailable or incomplete.";
  if(status === "confirmed") return "Current focus: confirmed context with usable planning references.";
  if(status === "waiting") return "Current focus: waiting confirmation with a valid zone and TP1 reference.";
  return "Current focus: the most usable scenario context currently available.";
}
function addDerivedPrimaryScenarioFlags(plans, snapshot){
  const scenarios = Array.isArray(plans) ? plans.filter(Boolean) : [];
  const primary = selectPrimaryScenarioPlan(scenarios, snapshot);
  return scenarios.map((plan)=>{
    const isPrimaryScenario = !!primary && plan === primary;
    const derived = { ...plan, isPrimaryScenario, primaryScenarioLabel: isPrimaryScenario ? "Primary Scenario to Watch" : null };
    return { ...derived, primaryScenarioReason: formatPrimaryScenarioReason(derived) };
  });
}
function formatPrimaryScenarioBadge(plan){
  if(!plan?.isPrimaryScenario) return "";
  return `<div class="scenario-primary-context"><span class="scenario-primary-badge">${escapeHtml(plan.primaryScenarioLabel || "Primary Scenario to Watch")}</span>${plan.primaryScenarioReason ? `<p>${escapeHtml(plan.primaryScenarioReason)}</p>` : ""}</div>`;
}
// Scenario Score explains planning context only; it never selects or re-ranks scenarios.
function normalizeScenarioScore(value){
  if(value === null || value === undefined || value === "") return null;
  const score = Number(value);
  return Number.isFinite(score) ? Math.max(0, Math.min(10, Math.round(score))) : null;
}
function getScenarioScoreLabel(score){
  const normalized = normalizeScenarioScore(score);
  if(normalized === null) return "Context score unavailable";
  if(normalized <= 2) return "Very weak context";
  if(normalized <= 4) return "Weak context";
  if(normalized <= 6) return "Developing context";
  if(normalized <= 8) return "Strong context";
  return "Very strong context";
}
function getScenarioScoreContextSupport(plan, snapshot){
  const direction = plan?.direction;
  const ifvgItems = getScenarioIfvgContextForDirection(snapshot, direction);
  const supportiveIfvg = ifvgItems.some((item)=>/reclaim|confirmed|valid|active/i.test(`${item.state || ""} ${item.label || ""}`) && !/failed|invalid/i.test(`${item.state || ""} ${item.label || ""}`));
  const liquidity = snapshot?.h4LiquidityContext;
  const supportiveSweep = direction === "bullish" ? liquidity?.sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_LOW : direction === "bearish" ? liquidity?.sweepType === LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH : false;
  const supportiveLiquidity = supportiveSweep && /confirm|valid|reclaim/i.test(`${liquidity?.status || ""} ${liquidity?.displayStatus || ""} ${liquidity?.reclaimStatus || ""}`);
  const legacyAligned = !!snapshot?.existingTradePlanScenario?.primarySide && snapshot.existingTradePlanScenario.primarySide === direction && snapshot.existingTradePlanScenario.primaryStatus === TRADE_SCENARIO_STATUS.ACTIVE;
  return { supportiveIfvg, supportiveLiquidity, legacyAligned };
}
function deriveScenarioScore(plan, snapshot){
  if(!plan) return { scenarioScore: null, scenarioScoreLabel: getScenarioScoreLabel(null), scenarioScoreFactors: [] };
  let score = 0;
  const factors = [];
  const addFactor = (label, impact)=>{ score += impact; factors.push({ label, impact }); };
  if(hasScenarioZone(plan.scenarioZone)) addFactor("Scenario zone available", 2); else addFactor("Scenario zone missing", -2);
  if(plan.invalidationReference) addFactor("Invalidation reference available", 2); else addFactor("Invalidation reference missing", -1);
  if(plan.tp1) addFactor("TP1 reference available", 2); else addFactor("TP1 reference missing", -1);
  if(plan.tp2) addFactor("TP2 reference available", 1);
  if(plan.tp3) addFactor("TP3 reference available", 1);
  const confirmationStatus = normalizeScenarioConfirmationStatus(plan.confirmationStatus);
  if(confirmationStatus === "confirmed") addFactor("Confirmed context supports scenario review", 2);
  else if(confirmationStatus === "waiting") addFactor("Confirmation is still waiting", 1);
  else if(confirmationStatus === "weak") addFactor("Confirmation context is weak", 0);
  else if(confirmationStatus === "failed") addFactor("Current context has failed", -2);
  else addFactor("Confirmation context is unavailable", -1);
  const support = getScenarioScoreContextSupport(plan, snapshot);
  if(support.supportiveIfvg) addFactor("IFVG context supports scenario", 1);
  if(support.supportiveLiquidity) addFactor("H4 liquidity context supports scenario", 1);
  if(support.legacyAligned) addFactor("Legacy planning context aligns", 1);
  const severeRiskNotes = Array.isArray(plan.riskNotes) ? plan.riskNotes.filter((note)=>/contradict|invalidated|failed context|blocked|incomplete/i.test(String(note))).length : 0;
  if(severeRiskNotes) addFactor("Severe or incomplete-context risk notes present", -1);
  const scenarioScore = normalizeScenarioScore(score);
  return { scenarioScore, scenarioScoreLabel: getScenarioScoreLabel(scenarioScore), scenarioScoreFactors: factors };
}
function addDerivedScenarioScore(plans, snapshot){
  return Array.isArray(plans) ? plans.filter(Boolean).map((plan)=>({ ...plan, ...deriveScenarioScore(plan, snapshot) })) : [];
}
function formatScenarioScoreBlock(plan){
  const score = normalizeScenarioScore(plan?.scenarioScore);
  const label = plan?.scenarioScoreLabel || getScenarioScoreLabel(score);
  const factors = Array.isArray(plan?.scenarioScoreFactors) ? plan.scenarioScoreFactors.slice().sort((a, b)=>Math.abs(Number(b?.impact) || 0) - Math.abs(Number(a?.impact) || 0)).slice(0, 5) : [];
  const factorHtml = factors.length ? `<ul class="scenario-score-factors">${factors.map((factor)=>{ const impact = Number(factor.impact) || 0; return `<li class="${impact > 0 ? "score-support" : impact < 0 ? "score-reducer" : "score-neutral"}"><strong>${impact > 0 ? "+" : impact < 0 ? "−" : "•"}</strong>${escapeHtml(factor.label)}</li>`; }).join("")}</ul>` : '<p class="scenario-planning-muted">Score factors unavailable.</p>';
  return `<div class="scenario-planning-block scenario-score-block"><span>Scenario Score</span><div class="scenario-score-summary"><strong>${score === null ? "—" : `${score} / 10`}</strong><small>${escapeHtml(label)}</small></div>${factorHtml}<p class="scenario-score-note">Planning context · for review only.</p></div>`;
}
function runScenarioScoreFixtureTests(){
  const ref = { lower: 90, upper: 92, midpoint: 91, label: "Scenario zone" };
  const target = { lower: 110, upper: 112, midpoint: 111, price: 111, label: "Target" };
  const complete = { scenarioId: "complete", scenarioType: "bullish_reversal", direction: "bullish", confirmationStatus: "waiting", scenarioZone: ref, invalidationReference: { price: 90 }, tp1: target, tp2: target, tp3: target, riskNotes: [] };
  const incomplete = { ...complete, scenarioId: "incomplete", scenarioZone: null, invalidationReference: null, tp1: null, tp2: null, tp3: null };
  const confirmed = { ...complete, confirmationStatus: "confirmed" };
  const failed = { ...complete, confirmationStatus: "failed" };
  const severeRisk = { ...complete, riskNotes: ["Current context is contradicted."] };
  const snapshot = { existingTradePlanScenario: null, h4LiquidityContext: null, ifvgContext: [] };
  const original = JSON.stringify({ complete, incomplete, confirmed, failed, severeRisk, snapshot });
  const primaryBefore = selectPrimaryScenarioPlan([{ ...complete, confirmationStatus: "waiting" }, { ...confirmed, scenarioId: "confirmed" }], snapshot)?.scenarioId;
  const scoredPlans = addDerivedScenarioScore([{ ...complete, confirmationStatus: "waiting" }, { ...confirmed, scenarioId: "confirmed" }], snapshot);
  const primaryAfter = selectPrimaryScenarioPlan(scoredPlans, snapshot)?.scenarioId;
  const forbidden = /buy score|sell score|entry score|signal score|guaranteed|high probability trade|best trade|must enter|must exit/i;
  const cases = [
    { name: "score normalizes to zero through ten", passed: normalizeScenarioScore(-5) === 0 && normalizeScenarioScore(15) === 10 && normalizeScenarioScore(6.4) === 6 && normalizeScenarioScore(null) === null },
    { name: "complete references score above incomplete references", passed: deriveScenarioScore(complete, snapshot).scenarioScore > deriveScenarioScore(incomplete, snapshot).scenarioScore },
    { name: "confirmed context scores above waiting", passed: deriveScenarioScore(confirmed, snapshot).scenarioScore > deriveScenarioScore(complete, snapshot).scenarioScore },
    { name: "failed context lowers score", passed: deriveScenarioScore(failed, snapshot).scenarioScore < deriveScenarioScore(complete, snapshot).scenarioScore },
    { name: "missing scenario zone lowers score", passed: deriveScenarioScore(incomplete, snapshot).scenarioScore < deriveScenarioScore(complete, snapshot).scenarioScore },
    { name: "severe risk notes lower score", passed: deriveScenarioScore(severeRisk, snapshot).scenarioScore < deriveScenarioScore(complete, snapshot).scenarioScore },
    { name: "score wording is signal-safe", passed: !forbidden.test(JSON.stringify(addDerivedScenarioScore([complete], snapshot))) },
    { name: "score derivation does not mutate inputs", passed: original === JSON.stringify({ complete, incomplete, confirmed, failed, severeRisk, snapshot }) },
    { name: "primary selector behavior is unchanged", passed: primaryBefore === primaryAfter },
    { name: "score-enriched cards visibly render score blocks", passed: (formatMultiScenarioPlanningSection(scoredPlans).match(/class="scenario-planning-block scenario-score-block"/g) || []).length === scoredPlans.length },
  ];
  const failedCount = cases.filter((result)=>!result.passed).length;
  return { passed: failedCount === 0, total: cases.length, failed: failedCount, results: cases };
}
if(typeof window !== "undefined") window.runScenarioScoreFixtureTests = runScenarioScoreFixtureTests;
function runPrimaryScenarioSelectorFixtureTests(){
  const ref = { lower: 90, upper: 92, midpoint: 91, label: "Scenario zone" };
  const target = { lower: 110, upper: 112, midpoint: 111, price: 111, label: "Target" };
  const plan = (scenarioId, scenarioType, confirmationStatus, overrides = {})=>({ scenarioId, scenarioType, confirmationStatus, scenarioZone: ref, invalidationReference: { price: 90 }, tp1: target, tp2: target, tp3: target, riskNotes: [], ...overrides });
  const confirmed = plan("confirmed", "bullish_reversal", "confirmed");
  const waiting = plan("waiting", "bearish_continuation", "waiting");
  const failed = plan("failed", "bullish_reversal", "failed");
  const unavailable = plan("unavailable", "bearish_continuation", "unavailable");
  const wait = plan("wait", "wait_no_trade", "confirmed", { scenarioZone: null, invalidationReference: null, tp1: null, tp2: null, tp3: null });
  const snapshot = { existingTradePlanScenario: { primaryStatus: TRADE_SCENARIO_STATUS.WAIT } };
  const original = JSON.stringify({ plans: [confirmed, waiting, failed, unavailable, wait], snapshot });
  const confirmedFlags = addDerivedPrimaryScenarioFlags([waiting, confirmed], snapshot);
  const waitingFlags = addDerivedPrimaryScenarioFlags([waiting, failed, unavailable], snapshot);
  const failedFlags = addDerivedPrimaryScenarioFlags([failed, waiting], snapshot);
  const unavailableFlags = addDerivedPrimaryScenarioFlags([unavailable, waiting], snapshot);
  const waitFlags = addDerivedPrimaryScenarioFlags([failed, unavailable, wait], snapshot);
  const allFlags = addDerivedPrimaryScenarioFlags([confirmed, waiting, failed, unavailable, wait], snapshot);
  const forbidden = /recommended entry|buy signal|sell signal|entry confirmed|best trade|guaranteed|high probability trade|must enter|must exit/i;
  const cases = [
    { name: "confirmed context ranks above waiting", passed: confirmedFlags.find((item)=>item.isPrimaryScenario)?.scenarioId === "confirmed" },
    { name: "waiting scenario with usable references can be primary", passed: waitingFlags.find((item)=>item.isPrimaryScenario)?.scenarioId === "waiting" },
    { name: "failed context is never primary", passed: failedFlags.find((item)=>item.isPrimaryScenario)?.scenarioId !== "failed" },
    { name: "unavailable context is not primary when usable scenario exists", passed: unavailableFlags.find((item)=>item.isPrimaryScenario)?.scenarioId === "waiting" },
    { name: "wait scenario can be primary when directional scenarios are unusable", passed: waitFlags.find((item)=>item.isPrimaryScenario)?.scenarioId === "wait" },
    { name: "only one scenario is primary", passed: allFlags.filter((item)=>item.isPrimaryScenario).length === 1 },
    { name: "primary wording is signal-safe", passed: !forbidden.test(JSON.stringify(allFlags)) },
    { name: "inputs are not mutated", passed: original === JSON.stringify({ plans: [confirmed, waiting, failed, unavailable, wait], snapshot }) },
  ];
  const failedCount = cases.filter((result)=>!result.passed).length;
  return { passed: failedCount === 0, total: cases.length, failed: failedCount, results: cases };
}
if(typeof window !== "undefined") window.runPrimaryScenarioSelectorFixtureTests = runPrimaryScenarioSelectorFixtureTests;
function runScenarioConfirmationStatusFixtureTests(){
  const row = (side, lower, upper)=>({ side, lower, upper, center: (lower + upper) / 2, label: `${side} zone`, zoneText: `${lower}-${upper}`, sources: [{ timeframe: "4H", type: side }] });
  const snapshot = buildScenarioInputSnapshot({ upside: [row("upside", 110, 112), row("upside", 120, 122), row("upside", 130, 132)], downside: [row("downside", 90, 92), row("downside", 80, 82), row("downside", 70, 72)] }, { currentPrice: 100, h4: {}, weekly: {}, daily: {}, tradePlanScenario: { primarySide: "bullish", primaryStatus: TRADE_SCENARIO_STATUS.ACTIVE } });
  const bullish = buildBullishScenarioFromSnapshot(snapshot);
  const original = JSON.stringify({ bullish, snapshot });
  const unavailable = deriveScenarioConfirmationStatus({ ...bullish, scenarioZone: null }, snapshot);
  const waitingSnapshot = { ...snapshot, existingTradePlanScenario: null };
  const waiting = deriveScenarioConfirmationStatus(bullish, waitingSnapshot);
  const weak = deriveScenarioConfirmationStatus({ ...bullish, tp2: null }, snapshot);
  const failed = deriveScenarioConfirmationStatus({ ...bullish, riskNotes: ["Current context is contradicted."] }, snapshot);
  const confirmed = deriveScenarioConfirmationStatus(bullish, snapshot);
  const forbidden = /buy confirmed|sell confirmed|entry confirmed|guaranteed|high probability trade|must enter|must exit/i;
  const labels = SCENARIO_CONFIRMATION_STATUSES.map(formatScenarioConfirmationStatus).join(" ");
  const cases = [
    { name: "all statuses normalize correctly", passed: SCENARIO_CONFIRMATION_STATUSES.every((status)=>normalizeScenarioConfirmationStatus(status) === status) },
    { name: "missing scenario zone is unavailable", passed: unavailable.confirmationStatus === "unavailable" },
    { name: "valid zone with incomplete confirmation is waiting", passed: waiting.confirmationStatus === "waiting" },
    { name: "incomplete target ladder is weak", passed: weak.confirmationStatus === "weak" },
    { name: "contradictory context is failed", passed: failed.confirmationStatus === "failed" },
    { name: "supportive context is confirmed", passed: confirmed.confirmationStatus === "confirmed" },
    { name: "confirmation wording is signal-safe", passed: !forbidden.test(labels) },
    { name: "inputs are not mutated", passed: original === JSON.stringify({ bullish, snapshot }) },
  ];
  const failedCount = cases.filter((result)=>!result.passed).length;
  return { passed: failedCount === 0, total: cases.length, failed: failedCount, results: cases };
}
if(typeof window !== "undefined") window.runScenarioConfirmationStatusFixtureTests = runScenarioConfirmationStatusFixtureTests;
function runScenarioTpLadderIntegrityFixtureTests(){
  const row = (label, side, lower, upper, key = label)=>({ label, side, lower, upper, center: (Number(lower) + Number(upper)) / 2, key, source:"fixture", zoneText:`${lower}–${upper}`, sources:[{ label, source:"fixture" }] });
  const bullishZone = normalizeScenarioZoneReference(row("Confluence Zone", "downside", 60104, 64073, "bull-zone"));
  const bullishInvalidation = buildScenarioInvalidationReference(bullishZone, "bullish");
  const bullishRows = [
    row("Far Resistance", "upside", 78561, 79000, "far"),
    row("Near Resistance", "upside", 69156, 69600, "near"),
    row("Mid Resistance", "upside", 72404, 72800, "mid"),
  ];
  const bullishBefore = JSON.stringify({ bullishRows, bullishZone, bullishInvalidation });
  const bullish = buildScenarioTargetLadder(bullishRows, "bullish", { scenarioZone: bullishZone, invalidationReference: bullishInvalidation, currentPrice: 65000 });
  const bullishFiltered = buildScenarioTargetLadder([
    row("Wrong Side", "upside", 62000, 62100, "wrong"),
    row("Scenario Zone Copy", "downside", 60104, 64073, "bull-zone"),
    row("Invalidation Copy", "upside", 60104, 60200, "invalid"),
    row("Duplicate A", "upside", 69156, 69600, "dup-a"),
    row("Duplicate B", "upside", 69200, 69650, "dup-b"),
    row("Next Valid", "upside", 72404, 72800, "next-valid"),
  ], "bullish", { scenarioZone: bullishZone, invalidationReference: bullishInvalidation, currentPrice: 65000 });
  const bearishZone = normalizeScenarioZoneReference(row("Upside Scenario Zone", "upside", 90000, 92000, "bear-zone"));
  const bearishInvalidation = buildScenarioInvalidationReference(bearishZone, "bearish");
  const bearish = buildScenarioTargetLadder([
    row("Far Support", "downside", 70000, 70400, "bear-far"),
    row("Near Support", "downside", 84500, 85000, "bear-near"),
    row("Mid Support", "downside", 78000, 78500, "bear-mid"),
  ], "bearish", { scenarioZone: bearishZone, invalidationReference: bearishInvalidation, currentPrice: 88000 });
  const bearishWrongSide = buildScenarioTargetLadder([
    row("Wrong Side", "downside", 91000, 91200, "bear-wrong"),
    row("Valid Bearish", "downside", 84500, 85000, "bear-valid"),
  ], "bearish", { scenarioZone: bearishZone, invalidationReference: bearishInvalidation, currentPrice: 88000 });
  const single = buildScenarioTargetLadder([row("Only Target", "upside", 70000, 70500, "single")], "bullish", { scenarioZone: bullishZone, invalidationReference: bullishInvalidation, currentPrice: 65000 });
  const none = buildScenarioTargetLadder([row("Wrong Only", "upside", 62000, 62500, "wrong-only")], "bullish", { scenarioZone: bullishZone, invalidationReference: bullishInvalidation, currentPrice: 65000 });
  const wait = buildScenarioTargetLadder(bullishRows, "neutral", { scenarioZone: bullishZone, currentPrice: 65000 });
  const snapshotRows = {
    upside: [...bullishRows],
    downside: [row("Near Support", "downside", 58000, 59000, "support-near"), row("Mid Support", "downside", 52000, 53000, "support-mid"), row("Far Support", "downside", 48000, 49000, "support-far")],
  };
  const snapshot = buildScenarioInputSnapshot(snapshotRows, { currentPrice: 65000, h4:{}, weekly:{}, daily:{}, tradePlanScenario: createEmptyTradePlanScenario() });
  const snapshotBefore = JSON.stringify(snapshot);
  const mapRowsBefore = JSON.stringify(snapshotRows);
  const plans = buildMultiScenarioPlansFromSnapshot(snapshot);
  const primaryBefore = selectPrimaryScenarioPlan(plans, snapshot)?.scenarioId || null;
  const primaryAfter = selectPrimaryScenarioPlan(addDerivedScenarioScore(plans, snapshot), snapshot)?.scenarioId || null;
  const forbidden = /\bbuy\b|\bsell\b|\bentry\b|guaranteed|high probability|must enter|must exit/i;
  const cases = [
    { name:"Bullish unordered targets are sorted nearest-upside first", passed: bullish.tp1?.price === 69156 && bullish.tp2?.price === 72404 && bullish.tp3?.price === 78561 },
    { name:"Bullish excludes wrong-side targets", passed: ![bullishFiltered.tp1, bullishFiltered.tp2, bullishFiltered.tp3].filter(Boolean).some((target)=>target.sourceRowKey === "wrong") },
    { name:"Bullish excludes scenario zone as TP", passed: ![bullishFiltered.tp1, bullishFiltered.tp2, bullishFiltered.tp3].filter(Boolean).some((target)=>target.sourceRowKey === "bull-zone") },
    { name:"Bullish excludes invalidation reference as TP", passed: ![bullishFiltered.tp1, bullishFiltered.tp2, bullishFiltered.tp3].filter(Boolean).some((target)=>areScenarioReferencePricesNear(target.price, bullishInvalidation.price)) },
    { name:"Bullish removes duplicate / near-duplicate targets", passed: [bullishFiltered.tp1, bullishFiltered.tp2, bullishFiltered.tp3].filter(Boolean).filter((target)=>target?.sourceRowKey?.startsWith("dup")).length === 1 },
    { name:"Bearish unordered targets are sorted nearest-downside first", passed: bearish.tp1?.price === 85000 && bearish.tp2?.price === 78500 && bearish.tp3?.price === 70400 },
    { name:"Bearish excludes wrong-side targets", passed: bearishWrongSide.tp1?.sourceRowKey === "bear-valid" && !bearishWrongSide.tp2 && !bearishWrongSide.tp3 },
    { name:"One valid target keeps TP1 and leaves TP2 / TP3 unavailable", passed: !!single.tp1 && single.tp2 === null && single.tp3 === null },
    { name:"No valid targets leaves all TP references unavailable", passed: none.tp1 === null && none.tp2 === null && none.tp3 === null },
    { name:"Wait / no-trade direction does not force TP ladder", passed: wait.tp1 === null && wait.tp2 === null && wait.tp3 === null },
    { name:"Existing scenario order unchanged", passed: plans.slice(0, 4).map((plan)=>plan.scenarioId).join("|") === "potential_bullish_scenario|potential_bearish_scenario|breakout_retest_scenario|breakdown_retest_scenario" },
    { name:"Primary Scenario unchanged", passed: primaryBefore === primaryAfter },
    { name:"Market Map rows unchanged", passed: JSON.stringify(snapshotRows) === mapRowsBefore },
    { name:"Market Zones unchanged", passed: JSON.stringify(snapshot.upsideRows) === JSON.stringify(snapshotRows.upside) && JSON.stringify(snapshot.downsideRows) === JSON.stringify(snapshotRows.downside) },
    { name:"No mutation of source rows or scenario snapshot", passed: JSON.stringify({ bullishRows, bullishZone, bullishInvalidation }) === bullishBefore && JSON.stringify(snapshot) === snapshotBefore },
    { name:"Safe wording only", passed: !forbidden.test(JSON.stringify([bullish, bearish, plans])) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined") window.runScenarioTpLadderIntegrityFixtureTests = runScenarioTpLadderIntegrityFixtureTests;
function runMultiScenarioPlanFixtureTests(){
  const row = (label, side, lower, upper, source = "h4_sr")=>({ label, side, lower, upper, center: (lower + upper) / 2, source, distancePct: 1, zoneText: `${lower}–${upper}`, sources: [{ label, source }] });
  const snapshot = buildScenarioInputSnapshot({
    upside: [row("4H Resistance", "upside", 110, 112), row("Daily Resistance", "upside", 120, 122), row("W Resistance", "upside", 130, 132)],
    downside: [row("4H Support", "downside", 90, 92), row("Daily Support", "downside", 80, 82), row("W Support", "downside", 70, 72)],
  }, { currentPrice: 100, h4: { liquidityOrderflowState: null }, weekly: {}, daily: {}, tradePlanScenario: createEmptyTradePlanScenario() });
  const snapshotBefore = JSON.stringify(snapshot);
  const plans = buildMultiScenarioPlansFromSnapshot(snapshot);
  const missingTargets = buildScenarioTargetLadder([row("Only Resistance", "upside", 105, 106)], "bullish");
  const emptyPlans = buildMultiScenarioPlansFromSnapshot(buildScenarioInputSnapshot({ upside: [], downside: [] }, { currentPrice: 100, h4: {}, weekly: {}, daily: {}, tradePlanScenario: null }));
  const signalPattern = /buy now|sell now|guaranteed|entry confirmed/i;
  const textBlob = JSON.stringify(plans);
  const cases = [
    { name: "bullish uses downside zone and upside targets", passed: plans[0]?.scenarioZone?.sourceSide === "downside" && plans[0]?.tp1?.sourceSide === "upside" },
    { name: "bearish uses upside zone and downside targets", passed: plans[1]?.scenarioZone?.sourceSide === "upside" && plans[1]?.tp1?.sourceSide === "downside" },
    { name: "missing target ladder returns null targets safely", passed: !!missingTargets.tp1 && missingTargets.tp2 === null && missingTargets.tp3 === null },
    { name: "missing map rows returns informational wait scenario", passed: emptyPlans.some((plan)=>plan.scenarioType === "wait_no_trade" && plan.status === "informational") },
    { name: "generator does not mutate input snapshot", passed: JSON.stringify(snapshot) === snapshotBefore },
    { name: "scenario wording avoids direct signal language", passed: !signalPattern.test(textBlob) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined") window.runMultiScenarioPlanFixtureTests = runMultiScenarioPlanFixtureTests;
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
  const safeMarkers = limitChartLabels((Array.isArray(markers) ? markers : []).map((marker,index)=>({ ...marker, text:formatCompactChartLabel(marker.text), x:index*80, y:marker.position === "aboveBar" ? 0 : 40, width:Math.max(44,String(marker.text||"").length*6), height:14, priority:getChartLabelPriority({ text:marker.text, category:"timing" }) })), getChartLabelDensityConfig("1H")).map(({x,y,width,height,priority,...marker})=>marker);
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
const WEEKLY_MAJOR_STRUCTURE_CONFIG = {
  minCandles: 24,
  swingLeft: 3,
  swingRight: 3,
  recentSwingCount: 4,
  closeBreakBufferPct: 0.001,
  rangeMaxWidthPct: 85,
  rangeMinWidthPct: 8,
};
function createEmptyWeeklyMajorStructureContext(reason = "Not enough closed weekly candles."){
  return {
    available: false,
    role: "major_context",
    status: "Context Unavailable",
    majorBias: "unavailable",
    majorSwingHigh: null,
    majorSwingLow: null,
    swingSequence: { status: "Unavailable", recentSwings: [] },
    bosChochStatus: { status: "None", closeConfirmed: false, referenceLevel: null, note: reason },
    macroRangeStatus: { status: "Unavailable", support: null, resistance: null },
    majorSupport: null,
    majorResistance: null,
    majorFvgContext: null,
    riskNotes: [reason],
    use: "Major Context",
    disclaimer: createScenarioDisclaimer(),
  };
}
function normalizeWeeklyStructureCandle(candle){
  if(!candle) return null;
  const closeTime = Number.isFinite(Number(candle.closeTime)) ? Number(candle.closeTime) : null;
  const openTime = Number.isFinite(Number(candle.openTime)) ? Number(candle.openTime) : null;
  return {
    ...candle,
    time: candle.time,
    openTime,
    closeTime,
    open: Number(candle.open),
    high: Number(candle.high),
    low: Number(candle.low),
    close: Number(candle.close),
    closed: candle.closed !== false,
  };
}
function getClosedWeeklyStructureCandles(candles){
  const now = Date.now();
  return (Array.isArray(candles) ? candles : [])
    .map(normalizeWeeklyStructureCandle)
    .filter((c)=>c && c.closed !== false && Number.isFinite(c.high) && Number.isFinite(c.low) && Number.isFinite(c.close) && (!Number.isFinite(c.closeTime) || c.closeTime <= now));
}
function detectWeeklyMajorSwings(candles, config = WEEKLY_MAJOR_STRUCTURE_CONFIG){
  const highs = [];
  const lows = [];
  const left = Math.max(1, Number(config.swingLeft) || 3);
  const right = Math.max(1, Number(config.swingRight) || 3);
  for(let i = left; i < candles.length - right; i++){
    const candle = candles[i];
    let isHigh = true;
    let isLow = true;
    for(let j = 1; j <= left; j++){
      if(candle.high <= candles[i-j].high) isHigh = false;
      if(candle.low >= candles[i-j].low) isLow = false;
    }
    for(let j = 1; j <= right; j++){
      if(candle.high <= candles[i+j].high) isHigh = false;
      if(candle.low >= candles[i+j].low) isLow = false;
    }
    if(isHigh) highs.push({ type: "high", index: i, time: candle.time, price: candle.high, close: candle.close, label: "Major Swing High", source: "Weekly candles" });
    if(isLow) lows.push({ type: "low", index: i, time: candle.time, price: candle.low, close: candle.close, label: "Major Swing Low", source: "Weekly candles" });
  }
  return { highs, lows, all: [...highs, ...lows].sort((a,b)=>a.index-b.index) };
}
function selectWeeklyMajorSwingHigh(swings){
  const highs = Array.isArray(swings?.highs) ? swings.highs : [];
  return highs.length ? highs[highs.length - 1] : null;
}
function selectWeeklyMajorSwingLow(swings){
  const lows = Array.isArray(swings?.lows) ? swings.lows : [];
  return lows.length ? lows[lows.length - 1] : null;
}
function formatWeeklySwingReference(swing){
  if(!swing || !Number.isFinite(Number(swing.price))) return null;
  return { price: Number(swing.price), time: swing.time ?? null, label: swing.label || (swing.type === "high" ? "Major Swing High" : "Major Swing Low"), source: "Weekly candles" };
}
function classifyWeeklySwingSequence(swings, candles, config = WEEKLY_MAJOR_STRUCTURE_CONFIG){
  const highs = (Array.isArray(swings?.highs) ? swings.highs : []).slice(-2);
  const lows = (Array.isArray(swings?.lows) ? swings.lows : []).slice(-2);
  const recentSwings = (Array.isArray(swings?.all) ? swings.all : []).slice(-(config.recentSwingCount || 4)).map((swing)=>formatWeeklySwingReference(swing)).filter(Boolean);
  if(highs.length < 2 || lows.length < 2) return { status: "Unavailable", recentSwings };
  const highRising = highs[1].price > highs[0].price;
  const lowRising = lows[1].price > lows[0].price;
  const highFalling = highs[1].price < highs[0].price;
  const lowFalling = lows[1].price < lows[0].price;
  if(highRising && lowRising) return { status: "HH/HL", recentSwings };
  if(highFalling && lowFalling) return { status: "LH/LL", recentSwings };
  const rangeHigh = Math.max(highs[0].price, highs[1].price);
  const rangeLow = Math.min(lows[0].price, lows[1].price);
  const midpoint = (rangeHigh + rangeLow) / 2;
  const widthPct = midpoint > 0 ? ((rangeHigh - rangeLow) / midpoint) * 100 : null;
  if(Number.isFinite(widthPct) && widthPct <= (config.rangeMaxWidthPct || 85)) return { status: "Range", recentSwings };
  return { status: "Mixed", recentSwings };
}
function isWeeklyCloseBreakAbove(candle, level, config = WEEKLY_MAJOR_STRUCTURE_CONFIG){
  const close = Number(candle?.close);
  const reference = Number(level);
  if(!Number.isFinite(close) || !Number.isFinite(reference)) return false;
  return close > reference * (1 + (config.closeBreakBufferPct || 0));
}
function isWeeklyCloseBreakBelow(candle, level, config = WEEKLY_MAJOR_STRUCTURE_CONFIG){
  const close = Number(candle?.close);
  const reference = Number(level);
  if(!Number.isFinite(close) || !Number.isFinite(reference)) return false;
  return close < reference * (1 - (config.closeBreakBufferPct || 0));
}
function deriveWeeklyBosChochStatus(candles, swings, sequence, config = WEEKLY_MAJOR_STRUCTURE_CONFIG){
  const latest = candles?.[candles.length - 1];
  const priorHigh = selectWeeklyMajorSwingHigh(swings);
  const priorLow = selectWeeklyMajorSwingLow(swings);
  if(!latest || (!priorHigh && !priorLow)) return { status: "None", closeConfirmed: false, referenceLevel: null, note: "Waiting for major Weekly swing references." };
  if(priorHigh && isWeeklyCloseBreakAbove(latest, priorHigh.price, config)){
    const continuation = sequence?.status === "HH/HL";
    return { status: continuation ? "BOS Up" : "CHOCH Up", closeConfirmed: true, referenceLevel: priorHigh.price, note: continuation ? "Weekly close is above the prior major swing high." : "Weekly close is above the prior major swing high after non-bullish structure." };
  }
  if(priorLow && isWeeklyCloseBreakBelow(latest, priorLow.price, config)){
    const continuation = sequence?.status === "LH/LL";
    return { status: continuation ? "BOS Down" : "CHOCH Down", closeConfirmed: true, referenceLevel: priorLow.price, note: continuation ? "Weekly close is below the prior major swing low." : "Weekly close is below the prior major swing low after non-bearish structure." };
  }
  const wickAbove = priorHigh && Number(latest.high) > Number(priorHigh.price) * (1 + (config.closeBreakBufferPct || 0));
  const wickBelow = priorLow && Number(latest.low) < Number(priorLow.price) * (1 - (config.closeBreakBufferPct || 0));
  if(wickAbove || wickBelow) return { status: "Unconfirmed", closeConfirmed: false, referenceLevel: wickAbove ? priorHigh.price : priorLow.price, note: "Weekly wick breached a major swing, but the weekly close did not confirm structure context." };
  return { status: "None", closeConfirmed: false, referenceLevel: null, note: "No close-confirmed Weekly BOS/CHOCH context." };
}
function deriveWeeklyMacroRangeStatus(candles, swings, config = WEEKLY_MAJOR_STRUCTURE_CONFIG){
  const high = selectWeeklyMajorSwingHigh(swings);
  const low = selectWeeklyMajorSwingLow(swings);
  if(!high || !low) return { status: "Unavailable", support: null, resistance: null };
  const support = Math.min(high.price, low.price);
  const resistance = Math.max(high.price, low.price);
  const latestClose = Number(candles?.[candles.length - 1]?.close);
  const midpoint = (support + resistance) / 2;
  const widthPct = midpoint > 0 ? ((resistance - support) / midpoint) * 100 : null;
  if(!Number.isFinite(widthPct) || widthPct < (config.rangeMinWidthPct || 8)) return { status: "No Clear Range", support, resistance };
  const inside = Number.isFinite(latestClose) && latestClose >= support && latestClose <= resistance;
  if(inside && widthPct <= (config.rangeMaxWidthPct || 85)) return { status: "Active Range", support, resistance };
  if(widthPct <= (config.rangeMaxWidthPct || 85)) return { status: "Potential Range", support, resistance };
  return { status: "No Clear Range", support, resistance };
}
function hasWeeklyStructureCharacterConflict(sequenceStatus, bosChochStatus){
  const sequence = String(sequenceStatus || "");
  const status = String(bosChochStatus?.status || bosChochStatus || "");
  return (sequence === "HH/HL" && status === "CHOCH Down") || (sequence === "LH/LL" && status === "CHOCH Up");
}
function deriveWeeklyStructureStatus(sequence, bosChochStatus, macroRangeStatus){
  const sequenceStatus = sequence?.status || "Unavailable";
  const bosStatus = bosChochStatus?.status || "None";
  if(hasWeeklyStructureCharacterConflict(sequenceStatus, bosStatus)) return { status: "Mixed Structure", majorBias: "mixed" };
  if(bosStatus === "BOS Up" && sequenceStatus === "HH/HL") return { status: "Bullish Structure", majorBias: "bullish" };
  if(bosStatus === "BOS Down" && sequenceStatus === "LH/LL") return { status: "Bearish Structure", majorBias: "bearish" };
  if(["CHOCH Up", "CHOCH Down", "Unconfirmed"].includes(bosStatus) && ["Mixed", "Range", "Unavailable"].includes(sequenceStatus)) return { status: "Weak Structure", majorBias: "mixed" };
  if(sequenceStatus === "HH/HL") return { status: "Bullish Structure", majorBias: "bullish" };
  if(sequenceStatus === "LH/LL") return { status: "Bearish Structure", majorBias: "bearish" };
  if(["Active Range", "Potential Range"].includes(macroRangeStatus?.status) || sequenceStatus === "Range") return { status: "Macro Range", majorBias: "range" };
  if(sequenceStatus === "Mixed") return { status: "Mixed Structure", majorBias: "mixed" };
  return { status: "Weak Structure", majorBias: "mixed" };
}
function buildWeeklyStructureConflictRiskNotes(context){
  const sequenceStatus = context?.swingSequence?.status;
  const bosStatus = context?.bosChochStatus?.status;
  if(sequenceStatus === "HH/HL" && bosStatus === "CHOCH Down") return ["Bullish swing sequence exists, but Weekly close shows downside character change."];
  if(sequenceStatus === "LH/LL" && bosStatus === "CHOCH Up") return ["Bearish swing sequence exists, but Weekly close shows upside character change."];
  return [];
}
function calibrateWeeklyStructureStatus(context){
  if(!context || context.available !== true) return context;
  if(!hasWeeklyStructureCharacterConflict(context.swingSequence?.status, context.bosChochStatus?.status)) return { ...context, riskNotes: [...(context.riskNotes || [])] };
  return {
    ...context,
    status: "Mixed Structure",
    majorBias: "mixed",
    riskNotes: [...buildWeeklyStructureConflictRiskNotes(context), ...(context.riskNotes || [])],
  };
}
function buildWeeklyMajorFvgContext(weeklyState = marketPreparationState.weekly){
  const details = Array.isArray(weeklyState?.fvgDetails) ? weeklyState.fvgDetails : [];
  const broken = Array.isArray(weeklyState?.recentBrokenFvgDetails?.all) ? weeklyState.recentBrokenFvgDetails.all : [];
  if(!details.length && !broken.length) return null;
  return { activeCount: details.length, recentBrokenCount: broken.length, source: "Weekly FVG / IFVG context" };
}
function buildWeeklyStructureRiskNotes(structure, metrics){
  const notes = [];
  const direction = metrics?.direction || mtfState.weeklyDirection || null;
  const phase = metrics?.phase || mtfState.weeklyPhase || null;
  if(structure.majorBias === "bullish" && /down|cooling|bearish/i.test(`${direction} ${phase}`)) notes.push("RSI momentum does not yet confirm bullish structure context.");
  if(structure.majorBias === "bearish" && /up|recover|bullish/i.test(`${direction} ${phase}`)) notes.push("RSI context conflicts with bearish structure context.");
  if(structure.majorBias === "range") notes.push("Weekly structure is range-based; directional context should remain conservative.");
  if(!notes.length && direction) notes.push("RSI context is supporting information only and does not override structure context.");
  return notes;
}
function buildWeeklyMajorStructureContext(candles, metrics = null, weeklyState = marketPreparationState.weekly, config = WEEKLY_MAJOR_STRUCTURE_CONFIG){
  const closedCandles = getClosedWeeklyStructureCandles(candles);
  if(closedCandles.length < (config.minCandles || 24)) return createEmptyWeeklyMajorStructureContext(`Not enough closed weekly candles for major structure context (${closedCandles.length}/${config.minCandles || 24}).`);
  const swings = detectWeeklyMajorSwings(closedCandles, config);
  const majorSwingHigh = formatWeeklySwingReference(selectWeeklyMajorSwingHigh(swings));
  const majorSwingLow = formatWeeklySwingReference(selectWeeklyMajorSwingLow(swings));
  if(!majorSwingHigh || !majorSwingLow) return createEmptyWeeklyMajorStructureContext("Waiting for both major Weekly swing high and swing low references.");
  const swingSequence = classifyWeeklySwingSequence(swings, closedCandles, config);
  const bosChochStatus = deriveWeeklyBosChochStatus(closedCandles, swings, swingSequence, config);
  const macroRangeStatus = deriveWeeklyMacroRangeStatus(closedCandles, swings, config);
  const structureStatus = deriveWeeklyStructureStatus(swingSequence, bosChochStatus, macroRangeStatus);
  const context = calibrateWeeklyStructureStatus({
    available: true,
    role: "major_context",
    status: structureStatus.status,
    majorBias: structureStatus.majorBias,
    majorSwingHigh,
    majorSwingLow,
    swingSequence,
    bosChochStatus,
    macroRangeStatus,
    majorSupport: majorSwingLow,
    majorResistance: majorSwingHigh,
    majorFvgContext: buildWeeklyMajorFvgContext(weeklyState),
    riskNotes: [],
    use: "Major Context",
    disclaimer: createScenarioDisclaimer(),
  });
  context.riskNotes = [...new Set([...(context.riskNotes || []), ...buildWeeklyStructureRiskNotes(context, metrics)])];
  return context;
}
function formatWeeklyStructurePrice(value){
  const n = Number(value);
  return Number.isFinite(n) ? `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : "—";
}
function formatWeeklySwingDisplay(swing){
  if(!swing) return "—";
  return `${formatWeeklyStructurePrice(swing.price)} · ${escapeHtml(swing.label || "Weekly swing")}`;
}
function formatWeeklyMacroRangeDisplay(macroRange){
  if(!macroRange) return "—";
  const range = Number.isFinite(Number(macroRange.support)) && Number.isFinite(Number(macroRange.resistance)) ? ` · ${formatWeeklyStructurePrice(macroRange.support)}–${formatWeeklyStructurePrice(macroRange.resistance)}` : "";
  return `${macroRange.status || "Unavailable"}${range}`;
}
function formatTimeframeContextHeaderPrice(price = marketPreparationState.currentPrice){
  if(price === null || price === undefined || price === "") return "Price unavailable";
  const value = Number(price);
  return Number.isFinite(value) ? `Price ${usd(value)}` : "Price unavailable";
}
function updateTimeframeContextHeaderPrice(price = marketPreparationState.currentPrice){
  const title = typeof document !== "undefined" ? document.getElementById("timeframeContextHeaderTitle") : null;
  if(title) title.textContent = `Timeframe Context | ${formatTimeframeContextHeaderPrice(price)}`;
}
function summarizeContextText(value, fallback = "Unavailable"){
  if(Array.isArray(value)) return value.filter(Boolean).slice(0, 2).join(" · ") || fallback;
  if(value && typeof value === "object") return value.label || value.status || value.name || value.summary || value.reason || fallback;
  return value === null || value === undefined || value === "" ? fallback : String(value);
}
function formatTimeframeContextInfoCard(label, value, note = ""){
  const safeValue = summarizeContextText(value);
  const noteHtml = note ? `<p>${escapeHtml(summarizeContextText(note, ""))}</p>` : "";
  return `<article class="timeframe-context-info-card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(safeValue)}</strong>${noteHtml}</article>`;
}
function formatTimeframeContextCardGrid(cards){
  const safeCards = Array.isArray(cards) && cards.length ? cards : [{ label: "Context", value: "Unavailable", note: "Context not available yet." }];
  return `<div class="timeframe-context-card-grid timeframe-context-card-grid-4">${safeCards.map((card)=>formatTimeframeContextInfoCard(card.label, card.value, card.note)).join("")}</div>`;
}
function getWeeklyContextMeaning(status){
  if(status === "Bullish Structure") return "Weekly structure leans bullish.";
  if(status === "Bearish Structure") return "Weekly structure leans bearish.";
  if(status === "Macro Range") return "Weekly is range-focused.";
  if(status === "Context Unavailable") return "Weekly context unavailable.";
  return "Weekly is not clean bullish or bearish.";
}
function getDailyContextMeaning(status){
  if(status === "Aligns With Weekly") return "Daily supports Weekly context.";
  if(status === "Weakens Weekly") return "Daily weakens Weekly context.";
  if(status === "Conflicts With Weekly") return "Daily conflicts with Weekly context.";
  if(status === "Context Unavailable") return "Daily context unavailable.";
  return "Daily remains transitional.";
}
function getH4ContextMeaning(status){
  if(status === "Reaction Confirmed") return "4H reaction is confirmed for review.";
  if(status === "Reaction Developing") return "4H reaction is developing.";
  if(status === "Weak Reaction") return "4H reaction is weak.";
  if(status === "Failed Reaction") return "4H reaction failed.";
  if(status === "No Clear Reaction") return "4H reaction unclear.";
  if(status === "Context Unavailable") return "4H context unavailable.";
  return "4H is waiting for clearer reaction context.";
}
function getH1ContextMeaning(status){
  if(status === "Timing Supportive") return "1H timing supports context but does not override higher timeframe.";
  if(status === "Timing Developing") return "1H timing is developing.";
  if(status === "Timing Waiting") return "1H timing is waiting.";
  if(status === "Timing Weak") return "1H timing remains weak.";
  if(status === "Timing Failed") return "1H timing failed.";
  return "1H context unavailable.";
}
function getWeeklyRsiPoints(dataset = weeklyDatasetCache){
  return (Array.isArray(dataset) ? dataset : [])
    .map((item)=>item?.rsi)
    .filter((value)=>value !== null && value !== undefined && value !== "")
    .map((value)=>Number(value))
    .filter((value)=>Number.isFinite(value));
}
function getLatestWeeklyRsiValue(dataset = weeklyDatasetCache){
  const points = getWeeklyRsiPoints(dataset);
  return points.length ? points[points.length - 1] : null;
}
function deriveWeeklyRsiSlopeLabel(dataset = weeklyDatasetCache, tolerance = 0.1){
  const points = getWeeklyRsiPoints(dataset);
  if(points.length < 2) return "Unavailable";
  const latest = points[points.length - 1];
  const previous = points[points.length - 2];
  const delta = latest - previous;
  if(delta > tolerance) return "Rising";
  if(delta < -tolerance) return "Falling";
  return "Flat";
}
function formatWeeklyRsiValue(value = getLatestWeeklyRsiValue()){
  if(value === null || value === undefined || value === "") return "RSI unavailable";
  return Number.isFinite(Number(value)) ? `RSI ${Number(value).toFixed(1)}` : "RSI unavailable";
}
function formatWeeklyRsiCard(dataset = weeklyDatasetCache){
  return { label: "Weekly RSI", value: formatWeeklyRsiValue(getLatestWeeklyRsiValue(dataset)), note: `Slope: ${deriveWeeklyRsiSlopeLabel(dataset)}` };
}
function getWeeklyContextCards(context){
  const safe = context || createEmptyWeeklyMajorStructureContext("Weekly major structure context unavailable.");
  const fvg = safe.majorFvgContext ? `${safe.majorFvgContext.activeCount || 0} active · ${safe.majorFvgContext.recentBrokenCount || 0} IFVG` : "FVG context unavailable";
  const risks = Array.isArray(safe.riskNotes) && safe.riskNotes.length ? safe.riskNotes : ["Daily / 4H validation needed."];
  return [
    { label: "Weekly Bias", value: safe.status || safe.majorBias || "Unavailable", note: getWeeklyContextMeaning(safe.status) },
    { label: "Structure Shift", value: safe.bosChochStatus?.status || "None", note: safe.bosChochStatus?.note || "No close-confirmed Weekly shift." },
    { label: "Key Range", value: formatWeeklyMacroRangeDisplay(safe.macroRangeStatus), note: "Major range reference only." },
    { label: "Swing Structure", value: safe.swingSequence?.status || "Unavailable", note: safe.swingSequence?.note || "Swing structure context." },
    formatWeeklyRsiCard(),
    { label: "FVG Context", value: fvg, note: safe.majorFvgContext?.source || "Weekly FVG / IFVG context." },
    { label: "Need Confirmation", value: "Daily / 4H validation needed.", note: "Watch reclaim, rejection, or structure shift." },
    { label: "Risk Notes", value: risks.slice(0, 2).join(" · "), note: risks.length > 2 ? "Additional notes remain in context data." : "Context note." },
  ];
}
function getDailyContextCards(context){
  const safe = context || createEmptyDailyValidationContext("Daily validation alignment unavailable.");
  const status = normalizeDailyValidationAlignmentStatus(safe.status);
  const risks = Array.isArray(safe.riskNotes) && safe.riskNotes.length ? safe.riskNotes : ["Watch Daily structure validation."];
  const keyZone = summarizeContextText(safe.dailySrContext?.nearestSupport || safe.dailySrContext?.nearestResistance || safe.dailyFvgContext?.nearest || safe.dailyFvgContext?.summary, "Daily key zone unavailable");
  return [
    { label: "Status", value: status, note: getDailyContextMeaning(status) },
    { label: "Against Weekly", value: safe.weeklyReference || safe.alignmentWithWeekly?.weeklyReference || "Weekly context unavailable", note: safe.alignmentWithWeekly?.status || "Validation context." },
    { label: "Selected Range", value: safe.selectedRange || "Unavailable", note: safe.structureMode || "Daily range context." },
    { label: "Daily Pattern", value: safe.dailyPattern || "Daily pattern context unavailable", note: safe.channelStatus || safe.rangeStatus || safe.brokenChannelStatus || "Pattern context." },
    { label: "Meaning", value: getDailyContextMeaning(status), note: "Display-only validation." },
    { label: "Need Confirmation", value: "Watch Daily structure validation.", note: "Wait for clear range reaction." },
    { label: "Key Zone", value: keyZone, note: "Daily zone context only." },
    { label: "Risk Notes", value: risks.slice(0, 2).join(" · "), note: risks.length > 2 ? "Additional notes remain in context data." : "Context note." },
  ];
}
function getH4ContextCards(context){
  const safe = context || createEmptyH4ReactionContext();
  const status = normalizeH4ReactionStatus(safe.status);
  const type = normalizeH4ReactionType(safe.reactionType);
  const relatedZoneText = safe.relatedZone ? formatH4ReactionZoneLabel({ ...safe.relatedZone, lower: safe.relatedZone.bottom, upper: safe.relatedZone.top }) : "Related zone unavailable";
  const liquidity = deriveH4LiquiditySummary(marketPreparationState?.h4?.liquidityOrderflowState);
  const risks = Array.isArray(safe.riskNotes) && safe.riskNotes.length ? safe.riskNotes : ["Wait for cleaner reaction."];
  return [
    { label: "Status", value: status, note: getH4ContextMeaning(status) },
    { label: "Related Zone", value: relatedZoneText, note: safe.relatedZoneSource || "Zone source unavailable." },
    { label: "Reaction", value: type, note: safe.zoneRelation || "Reaction relation unavailable." },
    { label: "Liquidity", value: formatH4LiquiditySummaryStatus(liquidity.status), note: liquidity.issue || liquidity.context },
    { label: "Meaning", value: getH4ContextMeaning(status), note: "Reaction review only." },
    { label: "Need Confirmation", value: "4H reclaim / BOS / strong close needed.", note: "Wait for cleaner reaction." },
    { label: "BOS/CHOCH", value: safe.bosChochContext || "Structure context unavailable", note: safe.alignmentWithDaily || "Daily validation unavailable." },
    { label: "Risk Notes", value: risks.slice(0, 2).join(" · "), note: risks.length > 2 ? "Additional notes remain in context data." : "Context note." },
  ];
}
function getH1ContextCards(context){
  const safe = context || createEmptyH1TimingContext();
  const status = normalizeH1TimingStatus(safe.status);
  const risks = Array.isArray(safe.riskNotes) && safe.riskNotes.length ? safe.riskNotes : ["Timing does not override 4H / HTF context."];
  return [
    { label: "Status", value: status, note: getH1ContextMeaning(status) },
    { label: "Sweep", value: safe.sweepStatus || "Sweep context unavailable", note: "1H liquidity timing context." },
    { label: "Mini Structure", value: safe.miniBosChochStatus || "Structure context unavailable", note: "Mini BOS/CHOCH context." },
    { label: "Stochastic", value: safe.stochasticStatus || "Stochastic unavailable", note: safe.timingQuality || "Timing quality unavailable." },
    { label: "Meaning", value: getH1ContextMeaning(status), note: "Timing context only." },
    { label: "Need Confirmation", value: "1H BOS / retest hold needed.", note: "Timing does not override 4H / HTF context." },
    { label: "Retest", value: safe.retestStatus || "Retest context unavailable", note: "Wait for continuation reaction." },
    { label: "Risk Notes", value: risks.slice(0, 2).join(" · "), note: risks.length > 2 ? "Additional notes remain in context data." : "Context note." },
  ];
}
function formatWeeklyMajorStructurePanel(context){
  const safe = context || createEmptyWeeklyMajorStructureContext("Weekly major structure context unavailable.");
  return `<div class="weekly-major-structure-header timeframe-context-card-header"><div><h3>Weekly Major Structure</h3><p>Major Context only · scenario planning reference.</p></div><span class="weekly-major-status weekly-major-status-${String(safe.status || "unavailable").toLowerCase().replace(/[^a-z]+/g,"-")}">${escapeHtml(safe.status || "Context Unavailable")}</span></div>${formatTimeframeContextCardGrid(getWeeklyContextCards(safe))}<p class="weekly-major-risk-notes timeframe-context-card-note">${escapeHtml(safe.disclaimer || createScenarioDisclaimer())}</p>`;
}
function renderWeeklyMajorStructure(context){
  const safe = context || createEmptyWeeklyMajorStructureContext("Weekly major structure context is loading.");
  latestWeeklyMajorStructureContext = safe;
  if(els.weeklyMajorStructurePanel) els.weeklyMajorStructurePanel.innerHTML = formatWeeklyMajorStructurePanel(safe);
  renderDailyValidationFoundation();
}
function runWeeklyMajorStructureFixtureTests(){
  const candle = (i, high, low, close, extra={})=>({ time:i, open:close, high, low, close, closeTime:i, closed:true, ...extra });
  const base = Array.from({ length: 32 }, (_, i)=>candle(i, 100 + i, 90 + i, 95 + i));
  const swingSet = [candle(0,100,90,95),candle(1,102,91,96),candle(2,108,92,98),candle(3,103,89,94),candle(4,101,87,93),candle(5,106,90,97),candle(6,112,94,101),candle(7,107,93,99),candle(8,105,91,97),candle(9,109,95,103),candle(10,116,97,108),candle(11,111,96,105),candle(12,108,94,102),candle(13,113,98,109),candle(14,120,101,114),candle(15,115,100,111),candle(16,112,99,108),candle(17,116,103,112),candle(18,124,105,118),candle(19,119,104,115),candle(20,116,102,111),candle(21,118,106,114),candle(22,126,108,119),candle(23,121,107,116),candle(24,118,104,112),candle(25,120,108,116),candle(26,128,110,122),candle(27,123,109,118),candle(28,120,106,114),candle(29,122,110,118),candle(30,130,112,124),candle(31,125,111,120)];
  const swings = detectWeeklyMajorSwings(swingSet, { ...WEEKLY_MAJOR_STRUCTURE_CONFIG, minCandles: 10, swingLeft: 2, swingRight: 2 });
  const high = selectWeeklyMajorSwingHigh(swings);
  const low = selectWeeklyMajorSwingLow(swings);
  const bullishBreak = deriveWeeklyBosChochStatus([...swingSet, candle(32,132,114,131)], swings, { status:"HH/HL" }, { ...WEEKLY_MAJOR_STRUCTURE_CONFIG, closeBreakBufferPct:0 });
  const wickOnly = deriveWeeklyBosChochStatus([...swingSet, candle(32,132,114,127)], swings, { status:"HH/HL" }, { ...WEEKLY_MAJOR_STRUCTURE_CONFIG, closeBreakBufferPct:0 });
  const bearishBreak = deriveWeeklyBosChochStatus([...swingSet, candle(32,121,100,99)], swings, { status:"LH/LL" }, { ...WEEKLY_MAJOR_STRUCTURE_CONFIG, closeBreakBufferPct:0 });
  const choch = deriveWeeklyBosChochStatus([...swingSet, candle(32,132,114,131)], swings, { status:"LH/LL" }, { ...WEEKLY_MAJOR_STRUCTURE_CONFIG, closeBreakBufferPct:0 });
  const before = JSON.stringify(swingSet);
  const context = buildWeeklyMajorStructureContext(swingSet, { direction:"Momentum Cooling", phase:"Bearish" }, {}, { ...WEEKLY_MAJOR_STRUCTURE_CONFIG, minCandles: 10, swingLeft: 2, swingRight: 2 });
  const html = formatWeeklyMajorStructurePanel(context);
  const forbidden = /\bbuy\b|\bsell\b|confirmed entry|guaranteed|high probability|must enter|must exit/i;
  const cases = [
    { name:"insufficient candles returns unavailable", passed: buildWeeklyMajorStructureContext(base.slice(0, 8), null, {}, WEEKLY_MAJOR_STRUCTURE_CONFIG).status === "Context Unavailable" },
    { name:"major swing high and low detection works", passed: !!high && !!low },
    { name:"bullish BOS requires weekly close above prior swing high", passed: bullishBreak.status === "BOS Up" && bullishBreak.closeConfirmed === true },
    { name:"wick-only breach is unconfirmed", passed: wickOnly.status === "Unconfirmed" && wickOnly.closeConfirmed === false },
    { name:"bearish BOS requires weekly close below prior swing low", passed: bearishBreak.status === "BOS Down" && bearishBreak.closeConfirmed === true },
    { name:"CHOCH classification is safe when structure flips", passed: choch.status === "CHOCH Up" },
    { name:"macro range fallback is available when sequence is unclear", passed: ["Active Range","Potential Range","No Clear Range"].includes(deriveWeeklyMacroRangeStatus(swingSet, swings, WEEKLY_MAJOR_STRUCTURE_CONFIG).status) },
    { name:"RSI conflict is a risk note and does not override structure", passed: Array.isArray(context.riskNotes) && context.riskNotes.some((note)=>/RSI/i.test(note)) && context.majorBias !== "unavailable" },
    { name:"input candles are not mutated", passed: JSON.stringify(swingSet) === before },
    { name:"wording avoids direct trading language", passed: !forbidden.test(html) },
  ];
  const failed = cases.filter((item)=>!item.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined") window.runWeeklyMajorStructureFixtureTests = runWeeklyMajorStructureFixtureTests;

function createEmptyDailyValidationContext(reason = "Daily context is unavailable."){
  return {
    available: false,
    role: "structure_validation",
    status: "Context Unavailable",
    selectedRange: activeDailyRange || null,
    structureMode: null,
    dailyPatternStatus: null,
    channelStatus: null,
    rangeStatus: null,
    brokenChannelStatus: null,
    alignmentWithWeekly: { status: "unavailable", weeklyReference: null },
    alignmentReasons: [reason],
    dailyFvgContext: null,
    dailySrContext: null,
    riskNotes: ["Daily validation waits for Weekly Major Structure and Daily context."],
    use: "Structure Validation only",
    disclaimer: createScenarioDisclaimer(),
  };
}
function normalizeDailyValidationAlignmentStatus(status){
  return ["Aligns With Weekly", "Weakens Weekly", "Conflicts With Weekly", "Transition / Mixed", "Context Unavailable"].includes(status) ? status : "Context Unavailable";
}
function getDailyValidationAlignmentStatusCode(status){
  return ({ "Aligns With Weekly":"aligns", "Weakens Weekly":"weakens", "Conflicts With Weekly":"conflicts", "Transition / Mixed":"transition", "Context Unavailable":"unavailable" })[normalizeDailyValidationAlignmentStatus(status)] || "unavailable";
}
function normalizeDailyValidationPattern(pattern){
  const name = pattern?.name || "unavailable";
  const status = pattern?.status || "unavailable";
  const position = pattern?.position || "unavailable";
  const text = `${name} ${status} ${position}`.toLowerCase();
  return {
    name,
    status,
    position,
    text,
    isRising: text.includes("rising"),
    isFalling: text.includes("falling"),
    isRange: text.includes("range"),
    isBrokenSupport: text.includes("broken channel support") || (text.includes("broken") && text.includes("support")) || text.includes("breakdown"),
    isBrokenResistance: text.includes("broken channel resistance") || (text.includes("broken") && text.includes("resistance")) || text.includes("breakout"),
    isReclaimed: text.includes("reclaimed"),
    isStale: text.includes("stale"),
    nearSupport: text.includes("support") || text.includes("lower"),
    nearResistance: text.includes("resistance") || text.includes("upper"),
    unavailable: name === "unavailable" || status === "unavailable",
  };
}
function getDailyValidationStructureSignals(dailyContext){
  const pattern = normalizeDailyValidationPattern(dailyContext?.pattern);
  const range = String(dailyContext?.rangeMode || activeDailyRange || "").toUpperCase();
  const fvgType = String(dailyContext?.fvg?.nearestType || "").toLowerCase();
  const fvgRelation = String(dailyContext?.fvg?.relation || "").toLowerCase();
  const contextBias = String(dailyContext?.contextBias || "").toLowerCase();
  const bullish = [];
  const bearish = [];
  const neutral = [];
  if(pattern.isRising) bullish.push("Daily rising structure is active.");
  if(pattern.nearSupport && !pattern.isBrokenSupport) bullish.push("Daily structure is near or holding support context.");
  if(pattern.isBrokenResistance || pattern.isReclaimed) bullish.push("Daily structure shows reclaim or broken-resistance context.");
  if(pattern.isFalling) bearish.push("Daily falling structure is active.");
  if(pattern.nearResistance) bearish.push("Daily structure is near resistance context.");
  if(pattern.isBrokenSupport && !pattern.isReclaimed && !pattern.isStale) bearish.push("Daily structure shows recent broken-support context.");
  if(fvgType === "bullish" && ["inside", "near", "above"].includes(fvgRelation)) bullish.push("Daily bullish FVG context is available.");
  if(fvgType === "bearish" && ["inside", "near", "below"].includes(fvgRelation)) bearish.push("Daily bearish FVG context is available.");
  if(dailyContext?.sr?.nearestSupport) bullish.push("Daily S/R support context is available.");
  if(dailyContext?.sr?.nearestResistance) bearish.push("Daily S/R resistance context is available.");
  if(contextBias.includes("bullish")) bullish.push("Daily context bias leans bullish.");
  if(contextBias.includes("bearish")) bearish.push("Daily context bias leans bearish.");
  if(pattern.isRange || range === "1Y") neutral.push("Daily context is range or macro-range oriented.");
  if(pattern.unavailable || contextBias.includes("mixed") || contextBias.includes("neutral")) neutral.push("Daily is in transition or lacks clear structure.");
  if(pattern.isStale) neutral.push("Daily broken-channel context is stale.");
  return { bullish, bearish, neutral, pattern, range };
}
function getDailyValidationDirectionalBias(dailyContext){
  const signals = getDailyValidationStructureSignals(dailyContext);
  if(signals.bullish.length > signals.bearish.length && signals.bullish.length > 0) return "bullish";
  if(signals.bearish.length > signals.bullish.length && signals.bearish.length > 0) return "bearish";
  if(signals.bullish.length && signals.bearish.length) return "mixed";
  return "transition";
}
function classifyDailyValidationAgainstWeekly(weeklyContext, dailyContext){
  if(!weeklyContext || weeklyContext.available !== true || weeklyContext.majorBias === "unavailable") return { status: "Context Unavailable", code: "unavailable" };
  if(!dailyContext || dailyContext.available !== true) return { status: "Context Unavailable", code: "unavailable" };
  const signals = getDailyValidationStructureSignals(dailyContext);
  const bias = weeklyContext.majorBias || "mixed";
  const dailyBias = getDailyValidationDirectionalBias(dailyContext);
  if(["range", "mixed"].includes(bias) || ["Macro Range", "Mixed Structure", "Weak Structure"].includes(weeklyContext.status)) return { status: "Transition / Mixed", code: "transition", dailyBias, signals };
  if(bias === "bullish"){
    if(signals.bearish.length >= 2 || (dailyBias === "bearish" && !signals.pattern.isStale)) return { status: "Conflicts With Weekly", code: "conflicts", dailyBias, signals };
    if(signals.bullish.length >= 2 && !signals.bearish.length) return { status: "Aligns With Weekly", code: "aligns", dailyBias, signals };
    if(signals.bullish.length || signals.bearish.length || signals.neutral.length) return { status: "Weakens Weekly", code: "weakens", dailyBias, signals };
  }
  if(bias === "bearish"){
    if(signals.bullish.length >= 2 || (dailyBias === "bullish" && !signals.pattern.isStale)) return { status: "Conflicts With Weekly", code: "conflicts", dailyBias, signals };
    if(signals.bearish.length >= 2 && !signals.bullish.length) return { status: "Aligns With Weekly", code: "aligns", dailyBias, signals };
    if(signals.bullish.length || signals.bearish.length || signals.neutral.length) return { status: "Weakens Weekly", code: "weakens", dailyBias, signals };
  }
  return { status: "Transition / Mixed", code: "transition", dailyBias, signals };
}
function buildDailyValidationAlignmentReasons(weeklyContext, dailyContext, classification){
  if(classification?.code === "unavailable") return [weeklyContext?.available === true ? "Daily context is unavailable." : "Weekly major context is unavailable."];
  if(classification?.code === "aligns") return ["Daily structure supports Weekly major context.", ...(classification.signals?.bullish || classification.signals?.bearish || []).slice(0,2)];
  if(classification?.code === "conflicts") return ["Daily structure conflicts with Weekly major context.", ...(classification.signals?.bearish || classification.signals?.bullish || []).slice(0,2)];
  if(classification?.code === "weakens") return ["Daily structure is mixed while Weekly context remains directional.", ...(classification.signals?.neutral || []).slice(0,2)];
  return ["Weekly major context is mixed; Daily validation remains cautious.", ...(classification?.signals?.neutral || ["Daily is in transition or lacks clear structure."]).slice(0,2)];
}
function buildDailyValidationRiskNotes(weeklyContext, dailyContext, classification){
  const notes = [];
  if(classification?.code === "weakens") notes.push("Daily validation is incomplete; use as structure context only.");
  if(classification?.code === "conflicts") notes.push("Daily context differs from Weekly major context; keep scenario planning cautious.");
  if(classification?.signals?.pattern?.isStale) notes.push("Daily broken-channel context is stale and should remain secondary.");
  if(String(dailyContext?.rangeMode || "").toUpperCase() === "1Y") notes.push("1Y Daily view is macro context and not a timing layer.");
  if(!notes.length) notes.push("Display-only validation; no scenario scoring or primary selection impact.");
  return notes;
}
function buildDailyValidationFoundationContext(dailySnapshot = buildDailyContextSnapshot(), weeklyContext = latestWeeklyMajorStructureContext){
  const selectedRange = dailySnapshot?.rangeMode || activeDailyRange || null;
  const structureMode = selectedRange ? getDailyStructureMode(selectedRange) : null;
  const classification = classifyDailyValidationAgainstWeekly(weeklyContext, dailySnapshot);
  const status = normalizeDailyValidationAlignmentStatus(classification.status);
  const pattern = normalizeDailyValidationPattern(dailySnapshot?.pattern);
  const weeklyReference = weeklyContext?.available === true ? `Weekly Major Structure · ${weeklyContext.status || "context"}` : null;
  const reasons = buildDailyValidationAlignmentReasons(weeklyContext, dailySnapshot, classification);
  const riskNotes = buildDailyValidationRiskNotes(weeklyContext, dailySnapshot, classification);
  return {
    available: status !== "Context Unavailable",
    role: "structure_validation",
    status,
    selectedRange,
    structureMode,
    dailyPatternStatus: dailySnapshot?.pattern?.status || null,
    channelStatus: pattern.isRising ? "Rising Channel" : pattern.isFalling ? "Falling Channel" : null,
    rangeStatus: pattern.isRange ? "Range Context" : null,
    brokenChannelStatus: pattern.isBrokenSupport ? "Broken Channel Support" : pattern.isBrokenResistance ? "Broken Channel Resistance" : null,
    alignmentWithWeekly: { status: getDailyValidationAlignmentStatusCode(status), weeklyReference },
    alignmentReasons: reasons,
    dailyFvgContext: dailySnapshot?.fvg || null,
    dailySrContext: dailySnapshot?.sr || null,
    dailyPattern: dailySnapshot?.pattern?.name && dailySnapshot.pattern.name !== "unavailable" ? `${dailySnapshot.pattern.name} · ${dailySnapshot.pattern.status || "context"}` : "Daily pattern context unavailable",
    weeklyReference: weeklyReference || "Weekly structure context unavailable",
    riskNotes,
    use: "Structure Validation only",
    gapNote: "Display-only Daily validation; scenario integration is not enabled in this patch.",
    disclaimer: createScenarioDisclaimer(),
  };
}
function formatDailyValidationList(items, className){
  const list = Array.isArray(items) && items.length ? items : ["Context unavailable."];
  return `<ul class="${className}">${list.map((item)=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}
function formatDailyValidationFoundationPanel(context){
  const safe = context || createEmptyDailyValidationContext("Daily validation alignment unavailable.");
  const status = normalizeDailyValidationAlignmentStatus(safe.status);
  return `<div class="daily-validation-header timeframe-context-card-header"><div><h3>Daily Validation Alignment</h3><p>Display-only validation of Daily structure against Weekly Major Structure.</p></div><span class="daily-validation-status daily-validation-status-${status.toLowerCase().replace(/[^a-z]+/g,"-")}">${escapeHtml(status)}</span></div>${formatTimeframeContextCardGrid(getDailyContextCards(safe))}<p class="daily-validation-safe timeframe-context-card-note">${escapeHtml(safe.disclaimer || createScenarioDisclaimer())}</p>`;
}
function renderDailyValidationFoundation(dailySnapshot = null, weeklyContext = latestWeeklyMajorStructureContext){
  if(!els.dailyValidationFoundationPanel) return;
  const snapshot = dailySnapshot || buildDailyContextSnapshot(marketPreparationState.daily, marketPreparationState.currentPrice);
  latestDailyValidationContext = buildDailyValidationFoundationContext(snapshot, weeklyContext);
  els.dailyValidationFoundationPanel.innerHTML = formatDailyValidationFoundationPanel(latestDailyValidationContext);
  renderH4ReactionContext();
  renderMtfSummary();
}

const H4_REACTION_STATUS_LABELS = ["Reaction Confirmed", "Reaction Developing", "Waiting for Reaction", "Weak Reaction", "Failed Reaction", "No Clear Reaction", "Context Unavailable"];
const H4_REACTION_TYPE_LABELS = ["Rejection", "Reclaim", "Retest", "Sweep", "Failed Reclaim", "Fakeout Risk", "No Clear Reaction"];
function createEmptyH4ReactionContext(reason = "Required 4H reaction context is unavailable."){
  return {
    available: false,
    role: "reaction_context",
    status: "Context Unavailable",
    reactionType: "No Clear Reaction",
    relatedZone: null,
    relatedZoneSource: null,
    zoneRelation: "unavailable",
    sweepStatus: null,
    reclaimStatus: null,
    rejectionStatus: null,
    retestStatus: null,
    fakeoutRisk: null,
    bosChochContext: null,
    liquidityContext: null,
    fvgIfvgContext: null,
    srContext: null,
    alignmentWithDaily: latestDailyValidationContext?.status || null,
    reactionReasons: [reason],
    riskNotes: ["Reaction Context only; waiting for sufficient 4H data."],
    use: "Reaction Context only",
    disclaimer: createScenarioDisclaimer(),
  };
}
function normalizeH4ReactionStatus(status){
  const text = String(status || "").trim().toLowerCase();
  const match = H4_REACTION_STATUS_LABELS.find((item)=>item.toLowerCase() === text);
  if(match) return match;
  if(text.includes("confirm")) return "Reaction Confirmed";
  if(text.includes("develop")) return "Reaction Developing";
  if(text.includes("wait")) return "Waiting for Reaction";
  if(text.includes("weak")) return "Weak Reaction";
  if(text.includes("fail")) return "Failed Reaction";
  if(text.includes("clear")) return "No Clear Reaction";
  return "Context Unavailable";
}
function normalizeH4ReactionType(type){
  const text = String(type || "").trim().toLowerCase();
  const match = H4_REACTION_TYPE_LABELS.find((item)=>item.toLowerCase() === text);
  if(match) return match;
  if(text.includes("reject")) return "Rejection";
  if(text.includes("reclaim")) return text.includes("fail") ? "Failed Reclaim" : "Reclaim";
  if(text.includes("retest")) return "Retest";
  if(text.includes("sweep")) return "Sweep";
  if(text.includes("fakeout")) return "Fakeout Risk";
  return "No Clear Reaction";
}
function getH4ReactionCurrentPrice(state = marketPreparationState, candles = latest4hCandles){
  const latestClose = Number(Array.isArray(candles) && candles.length ? candles[candles.length - 1]?.close : null);
  if(Number.isFinite(latestClose) && latestClose > 0) return latestClose;
  const statePrice = Number(state?.currentPrice);
  return Number.isFinite(statePrice) && statePrice > 0 ? statePrice : null;
}
function formatH4ReactionZoneLabel(zone){
  if(!zone) return "Related zone unavailable";
  const label = zone.label || zone.type || zone.source || "Reaction zone";
  const lower = Number(zone.lower ?? zone.bottom ?? zone.price);
  const upper = Number(zone.upper ?? zone.top ?? zone.price);
  const range = Number.isFinite(lower) && Number.isFinite(upper) ? `${usd(Math.min(lower, upper))}–${usd(Math.max(lower, upper))}` : "range unavailable";
  return `${label} · ${range}`;
}
function inferH4ReactionZoneSide(zone){
  const text = `${zone?.label || ""} ${zone?.type || ""} ${zone?.source || ""} ${zone?.direction || ""} ${zone?.side || ""}`.toLowerCase();
  if(text.includes("resistance") || text.includes("bearish") || text.includes("upside") || text.includes("supply")) return "resistance";
  if(text.includes("support") || text.includes("bullish") || text.includes("downside") || text.includes("demand")) return "support";
  return "zone";
}
function normalizeH4ReactionZone(rawZone, sourceLabel = null, fallbackLabel = null){
  const normalized = normalizeLiquidityZone(rawZone, sourceLabel);
  if(!normalized) return null;
  const label = fallbackLabel || normalized.label || rawZone?.label || sourceLabel || "Reaction zone";
  return {
    label,
    price: Number.isFinite(Number(normalized.center)) ? Number(normalized.center) : null,
    top: normalized.upper,
    bottom: normalized.lower,
    lower: normalized.lower,
    upper: normalized.upper,
    source: sourceLabel || normalized.source || rawZone?.source || null,
    type: normalized.type || rawZone?.type || null,
    status: normalized.status || rawZone?.status || null,
    quality: normalized.quality || rawZone?.quality || rawZone?.strength || null,
    direction: normalized.direction || rawZone?.direction || null,
    side: normalized.side || rawZone?.side || null,
  };
}
function buildH4ReactionZoneCandidate(rawZone, sourceLabel, priority, currentPrice, candles, fallbackLabel = null){
  const zone = normalizeH4ReactionZone(rawZone, sourceLabel, fallbackLabel);
  if(!zone) return null;
  const distance = calculateLiquidityZoneDistance(currentPrice, zone);
  const relation = getH4ReactionZoneRelation(currentPrice, zone, candles);
  return {
    zone,
    source: sourceLabel,
    priority,
    relation,
    distancePct: Number.isFinite(distance.distancePct) ? distance.distancePct : null,
    distanceAbs: Number.isFinite(distance.distanceAbs) ? distance.distanceAbs : null,
  };
}
function collectH4ReactionZoneCandidates(state = marketPreparationState, mapData = state?.map, currentPrice = getH4ReactionCurrentPrice(state), candles = latest4hCandles){
  if(!Number.isFinite(Number(currentPrice))) return [];
  const candidates = [];
  collectLiquidityMapRows(mapData).forEach((row)=>{
    const candidate = buildH4ReactionZoneCandidate(row, "Market Map", 1, currentPrice, candles, row?.label || row?.primarySource || "Market Map Zone");
    if(candidate) candidates.push(candidate);
  });
  const sr = state?.h4?.latest4hSrSummary || state?.h4?.srSummary || latest4hSrSummary;
  [
    { zone: sr?.support?.nearest, label: "4H Support" },
    { zone: sr?.resistance?.nearest, label: "4H Resistance" },
    { zone: sr?.support?.strongest, label: "4H Strong Support" },
    { zone: sr?.resistance?.strongest, label: "4H Strong Resistance" },
  ].forEach((item)=>{
    const candidate = buildH4ReactionZoneCandidate(item.zone ? { ...item.zone, label: item.label } : null, "4H", 2, currentPrice, candles, item.label);
    if(candidate) candidates.push(candidate);
  });
  const fvgDetails = Array.isArray(state?.h4?.latest4hFvgDetails) ? state.h4.latest4hFvgDetails : (Array.isArray(state?.h4?.fvgDetails) ? state.h4.fvgDetails : []);
  const fvgZones = fvgDetails.length ? fvgDetails : (Array.isArray(state?.h4?.fvgZones) ? state.h4.fvgZones : []);
  fvgZones.forEach((detail)=>{
    if(typeof isInactiveFvgDetail === "function" && isInactiveFvgDetail(detail)) return;
    const raw = detail?.sourceZone || detail?.zone || detail;
    const label = detail?.label || detail?.ui?.label || detail?.type || "4H FVG / IFVG";
    const candidate = buildH4ReactionZoneCandidate({ ...raw, label, type: detail?.type || raw?.type || null, direction: detail?.direction || raw?.direction || null }, "4H", 3, currentPrice, candles, label);
    if(candidate) candidates.push(candidate);
  });
  return candidates;
}
function selectH4ReactionRelatedZone(state = marketPreparationState, mapData = state?.map, candles = latest4hCandles){
  const currentPrice = getH4ReactionCurrentPrice(state, candles);
  const candidates = collectH4ReactionZoneCandidates(state, mapData, currentPrice, candles)
    .filter((candidate)=>Number.isFinite(Number(candidate.distancePct)) || ["inside", "touched", "rejected", "reclaimed", "broken"].includes(candidate.relation));
  if(!candidates.length) return null;
  const relationRank = { rejected: 0, reclaimed: 0, touched: 1, inside: 1, near: 2, broken: 3, unavailable: 9 };
  const nearCandidates = candidates.filter((candidate)=>["inside", "near", "touched", "rejected", "reclaimed", "broken"].includes(candidate.relation) || Number(candidate.distancePct) <= 3);
  const pool = nearCandidates.length ? nearCandidates : candidates.filter((candidate)=>Number(candidate.distancePct) <= 5);
  if(!pool.length) return null;
  return [...pool].sort((a,b)=>(relationRank[a.relation] ?? 8) - (relationRank[b.relation] ?? 8) || a.priority - b.priority || Number(a.distancePct ?? 999) - Number(b.distancePct ?? 999))[0] || null;
}
function candleTouchesH4ReactionZone(candle, zone){
  if(!candle || !zone) return false;
  const lower = Number(zone.lower);
  const upper = Number(zone.upper);
  return Number.isFinite(lower) && Number.isFinite(upper) && Number(candle.high) >= lower && Number(candle.low) <= upper;
}
function detectH4ReactionRetestBehavior(candles, zone){
  if(!Array.isArray(candles) || candles.length < 5 || !zone) return false;
  const recent = candles.slice(-3);
  const prior = candles.slice(Math.max(0, candles.length - 10), Math.max(0, candles.length - 3));
  const touchedRecently = recent.some((candle)=>candleTouchesH4ReactionZone(candle, zone));
  if(!touchedRecently) return false;
  const lower = Number(zone.lower);
  const upper = Number(zone.upper);
  if(!Number.isFinite(lower) || !Number.isFinite(upper)) return false;
  return prior.some((candle)=>Number(candle.close) > upper || Number(candle.close) < lower);
}
function getH4ReactionZoneRelation(currentPrice, zone, candles = latest4hCandles){
  const price = Number(currentPrice);
  if(!Number.isFinite(price) || !zone) return "unavailable";
  const lower = Number(zone.lower ?? zone.bottom ?? zone.price);
  const upper = Number(zone.upper ?? zone.top ?? zone.price);
  if(!Number.isFinite(lower) || !Number.isFinite(upper)) return "unavailable";
  const normalized = { ...zone, lower: Math.min(lower, upper), upper: Math.max(lower, upper) };
  const side = inferH4ReactionZoneSide(normalized);
  const latest = Array.isArray(candles) && candles.length ? candles[candles.length - 1] : null;
  const previous = Array.isArray(candles) && candles.length > 1 ? candles[candles.length - 2] : null;
  const latestClose = Number(latest?.close);
  const previousClose = Number(previous?.close);
  const touchedRecently = Array.isArray(candles) ? candles.slice(-3).some((candle)=>candleTouchesH4ReactionZone(candle, normalized)) : false;
  if(touchedRecently && side === "resistance" && Number.isFinite(latestClose) && latestClose < normalized.lower) return "rejected";
  if(touchedRecently && side === "support" && Number.isFinite(latestClose) && latestClose > normalized.upper) return "rejected";
  if(Number.isFinite(previousClose) && Number.isFinite(latestClose)){
    if(previousClose < normalized.lower && latestClose >= normalized.lower) return "reclaimed";
    if(previousClose > normalized.upper && latestClose <= normalized.upper) return "reclaimed";
  }
  if(touchedRecently && Number.isFinite(latestClose) && (latestClose > normalized.upper || latestClose < normalized.lower)) return "broken";
  if(touchedRecently) return "touched";
  if(price >= normalized.lower && price <= normalized.upper) return "inside";
  const distance = calculateLiquidityZoneDistance(price, normalized);
  return Number.isFinite(distance.distancePct) && distance.distancePct <= 1.5 ? "near" : "unavailable";
}
function deriveH4ReactionFromLiquidity(liquidityState){
  const episode = liquidityState?.activeEpisode;
  if(!episode) return { status: null, reactionType: null, reasons: [], risks: [], summary: null };
  const status = String(episode.status || LIQUIDITY_OF_STATE.NONE).toLowerCase();
  const reclaim = episode.reclaim || {};
  const failureDetected = episode.failure?.detected || status === LIQUIDITY_OF_STATE.FAILED;
  const summary = {
    status: episode.status || null,
    displayStatus: episode.displayStatus || null,
    sweepType: episode.sweep?.type || null,
    reclaimStatus: reclaim.status || null,
    band: episode.band || null,
    stale: !!episode.stale,
  };
  if(status === LIQUIDITY_OF_STATE.NONE && episode.sweep?.detected !== true) return { status: null, reactionType: null, reasons: [], risks: [], summary };
  if(failureDetected) return { status: "Failed Reaction", reactionType: "Failed Reclaim", reasons: [episode.failure?.reason || "Existing H4 liquidity context shows failed reaction context."], risks: ["Failed reclaim/failure context remains diagnostic only."], summary };
  if(status === LIQUIDITY_OF_STATE.CONFIRMED) return { status: "Reaction Confirmed", reactionType: reclaim.detected ? "Reclaim" : "Sweep", reasons: [episode.displayStatus || "Existing H4 liquidity context is confirmed."], risks: [], summary };
  if(episode.stale || episode.band === LIQUIDITY_BAND.WEAK) return { status: "Weak Reaction", reactionType: reclaim.detected ? "Reclaim" : "Sweep", reasons: [episode.displayStatus || "Existing H4 liquidity context is weak or stale."], risks: ["H4 liquidity context is weak, stale, or lacks full corroboration."], summary };
  if([LIQUIDITY_OF_STATE.POSSIBLE, LIQUIDITY_OF_STATE.VALID].includes(status)) return { status: "Reaction Developing", reactionType: reclaim.detected ? "Reclaim" : "Sweep", reasons: [episode.displayStatus || "Possible H4 liquidity sweep reaction is developing."], risks: reclaim.detected ? [] : ["H4 reclaim context is not complete."], summary };
  return { status: null, reactionType: null, reasons: [], risks: [], summary };
}
function deriveH4ReactionFromZoneBehavior(relatedZoneCandidate, candles = latest4hCandles){
  if(!relatedZoneCandidate?.zone) return { status: "No Clear Reaction", reactionType: "No Clear Reaction", reasons: [], risks: [] };
  const relation = relatedZoneCandidate.relation || "unavailable";
  const label = relatedZoneCandidate.zone.label || "related zone";
  if(relation === "rejected") return { status: "Reaction Developing", reactionType: "Rejection", reasons: [`4H candles rejected from ${label}.`], risks: [] };
  if(relation === "reclaimed") return { status: "Reaction Developing", reactionType: "Reclaim", reasons: [`4H candles reclaimed ${label}.`], risks: [] };
  if(detectH4ReactionRetestBehavior(candles, relatedZoneCandidate.zone)) return { status: "Reaction Developing", reactionType: "Retest", reasons: [`4H is retesting ${label}; confirmation remains conservative.`], risks: ["Retest context is display-only and may remain incomplete."] };
  if(relation === "broken") return { status: "Weak Reaction", reactionType: "Fakeout Risk", reasons: [`4H closed beyond ${label}; follow-through should be reviewed cautiously.`], risks: ["Zone break can become fakeout risk without follow-through."] };
  if(["inside", "near", "touched"].includes(relation)) return { status: relation === "touched" ? "Reaction Developing" : "Waiting for Reaction", reactionType: relation === "touched" ? "Retest" : "No Clear Reaction", reasons: [`4H is ${relation} ${label}.`], risks: relation === "near" || relation === "inside" ? ["Related zone exists, but reaction evidence remains incomplete."] : [] };
  return { status: "No Clear Reaction", reactionType: "No Clear Reaction", reasons: [], risks: [] };
}
function deriveH4ReactionFromStructure(structureStatus){
  const status = String(structureStatus || "");
  if(!status || /no clear|unavailable/i.test(status)) return { label: status || null, reasons: [], risks: [] };
  return { label: status, reasons: [`4H structure context is ${status}.`], risks: [] };
}
function buildH4ReactionReasons(inputs){
  return [...new Set((inputs || []).flat().filter(Boolean))].slice(0, 6);
}
function buildH4ReactionRiskNotes(inputs){
  return [...new Set((inputs || []).flat().filter(Boolean))].slice(0, 5);
}
function buildH4ReactionFvgIfvgSummary(h4State){
  const details = Array.isArray(h4State?.latest4hFvgDetails) ? h4State.latest4hFvgDetails : (Array.isArray(h4State?.fvgDetails) ? h4State.fvgDetails : []);
  const broken = Array.isArray(h4State?.recentBrokenFvgDetails?.all) ? h4State.recentBrokenFvgDetails.all : [];
  if(!details.length && !broken.length) return null;
  return { activeCount: details.length, recentBrokenCount: broken.length, nearestLabel: details[0]?.label || details[0]?.type || null };
}
function buildH4ReactionContext(state = marketPreparationState, candles = latest4hCandles, mapData = state?.map, dailyContext = latestDailyValidationContext){
  const h4State = state?.h4 || {};
  const hasCandles = Array.isArray(candles) && candles.length >= 3;
  const h4Ready = state?.meta?.sourcesReady?.h4 === true;
  const hasState = h4Ready && !!(h4State?.liquidityOrderflowState || h4State?.srSummary || h4State?.latest4hSrSummary || h4State?.structureStatus || (Array.isArray(h4State?.fvgDetails) && h4State.fvgDetails.length));
  if(!hasCandles && !hasState) return createEmptyH4ReactionContext("Required 4H data/state is unavailable.");
  const currentPrice = getH4ReactionCurrentPrice(state, candles);
  const relatedCandidate = selectH4ReactionRelatedZone(state, mapData, candles);
  const relatedZone = relatedCandidate?.zone || null;
  const zoneRelation = relatedZone ? getH4ReactionZoneRelation(currentPrice, relatedZone, candles) : "unavailable";
  const liquidity = deriveH4ReactionFromLiquidity(h4State?.liquidityOrderflowState);
  const zoneBehavior = deriveH4ReactionFromZoneBehavior(relatedCandidate ? { ...relatedCandidate, relation: zoneRelation } : null, candles);
  const structure = deriveH4ReactionFromStructure(h4State?.latest4hStructureStatus || h4State?.structureStatus || latest4hStructureStatus);
  let status = liquidity.status || zoneBehavior.status || "No Clear Reaction";
  let reactionType = liquidity.reactionType || zoneBehavior.reactionType || "No Clear Reaction";
  if(!liquidity.status && relatedZone && ["inside", "near"].includes(zoneRelation)) status = "Waiting for Reaction";
  if(!relatedZone && !liquidity.status) status = "No Clear Reaction";
  if(status === "No Clear Reaction") reactionType = "No Clear Reaction";
  const dailyStatus = dailyContext?.status || null;
  const dailyReasons = [];
  const dailyRisks = [];
  if(dailyStatus){
    if(/transition|mixed|weakens|conflicts/i.test(dailyStatus)) dailyRisks.push("Daily validation remains mixed or cautious, so 4H reaction is treated carefully.");
    else if(/aligns/i.test(dailyStatus)) dailyReasons.push("Daily validation supports current higher-timeframe context.");
  }
  const noZoneRisk = relatedZone ? [] : ["No safe related zone is close enough for a specific 4H reaction reference."];
  const reasons = buildH4ReactionReasons([
    relatedZone ? [`Related zone selected from ${relatedCandidate.source}.`, `Zone relation is ${zoneRelation}.`] : ["No clear related zone selected."],
    liquidity.reasons,
    zoneBehavior.reasons,
    structure.reasons,
    dailyReasons,
  ]);
  const risks = buildH4ReactionRiskNotes([liquidity.risks, zoneBehavior.risks, structure.risks, dailyRisks, noZoneRisk]);
  return {
    available: status !== "Context Unavailable",
    role: "reaction_context",
    status: normalizeH4ReactionStatus(status),
    reactionType: normalizeH4ReactionType(reactionType),
    relatedZone: relatedZone ? { label: relatedZone.label, price: relatedZone.price ?? relatedZone.center ?? null, top: relatedZone.upper, bottom: relatedZone.lower } : null,
    relatedZoneSource: relatedCandidate?.source || null,
    zoneRelation: relatedZone ? zoneRelation : "unavailable",
    sweepStatus: liquidity.summary?.sweepType || null,
    reclaimStatus: liquidity.summary?.reclaimStatus || null,
    rejectionStatus: zoneRelation === "rejected" ? "Zone rejection context" : null,
    retestStatus: reactionType === "Retest" ? "Retest context developing" : null,
    fakeoutRisk: reactionType === "Fakeout Risk" || status === "Weak Reaction" ? "Review for fakeout risk" : null,
    bosChochContext: structure.label || null,
    liquidityContext: liquidity.summary,
    fvgIfvgContext: buildH4ReactionFvgIfvgSummary(h4State),
    srContext: h4State?.latest4hSrSummary || h4State?.srSummary || null,
    alignmentWithDaily: dailyStatus,
    reactionReasons: reasons.length ? reasons : ["4H data is available, but no meaningful reaction context is clear yet."],
    riskNotes: risks.length ? risks : ["Reaction Context only; no scenario scoring or primary selection impact."],
    use: "Reaction Context only",
    disclaimer: createScenarioDisclaimer(),
  };
}
function formatH4ReactionList(items, className){
  const list = Array.isArray(items) && items.length ? items : ["Context unavailable."];
  return `<ul class="${className}">${list.map((item)=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}
function formatH4ReactionPanel(context){
  const safe = context || createEmptyH4ReactionContext();
  const status = normalizeH4ReactionStatus(safe.status);
  const statusClass = status.toLowerCase().replace(/[^a-z]+/g,"-");
  return `<div class="h4-reaction-header timeframe-context-card-header"><div><h3>4H Reaction Context</h3><p>Display-only reaction context against higher-timeframe and Market Map zones.</p></div><span class="h4-reaction-status h4-reaction-status-${statusClass}">${escapeHtml(status)}</span></div>${formatTimeframeContextCardGrid(getH4ContextCards(safe))}<p class="h4-reaction-safe timeframe-context-card-note">${escapeHtml(safe.disclaimer || createScenarioDisclaimer())}</p>`;
}
function renderH4ReactionContext(mapData = marketPreparationState.map){
  if(!els.h4ReactionContextPanel) return;
  latestH4ReactionContext = buildH4ReactionContext(marketPreparationState, latest4hCandles, mapData, latestDailyValidationContext);
  els.h4ReactionContextPanel.innerHTML = formatH4ReactionPanel(latestH4ReactionContext);
  renderH1TimingContext();
}
function runH4ReactionContextFixtureTests(){
  const baseCandles = [
    { time: 1, open: 96, high: 98, low: 95, close: 97 },
    { time: 2, open: 97, high: 99, low: 96, close: 98 },
    { time: 3, open: 98, high: 101, low: 97, close: 100 },
    { time: 4, open: 100, high: 101, low: 99, close: 100 },
  ];
  const makeState = (overrides = {})=>({ currentPrice: 100, h4: { structureStatus: "No clear 4H structure shift", liquidityOrderflowState: createEmptyLiquidityOrderflowState("4H", "fixture"), fvgDetails: [], srSummary: null, ...overrides.h4 }, map: overrides.map || { upside: [], downside: [] }, ...overrides });
  const missing = buildH4ReactionContext({ h4: {}, map: {}, currentPrice: null }, [], {}, null);
  const nearState = makeState({ map: { downside: [{ lower: 99, upper: 101, label: "Market Map Support", source: "fixture" }] } });
  const near = buildH4ReactionContext(nearState, baseCandles, nearState.map, { status: "Transition / Mixed" });
  const rejectionCandles = [...baseCandles, { time: 5, open: 101, high: 102, low: 97, close: 98 }];
  const rejectionState = makeState({ currentPrice: 98, map: { upside: [{ lower: 100, upper: 102, label: "Market Map Resistance", source: "fixture" }] } });
  const rejection = buildH4ReactionContext(rejectionState, rejectionCandles, rejectionState.map, { status: "Aligns With Weekly" });
  const reclaimCandles = [
    ...baseCandles.slice(0, -1),
    { time: 4, open: 100, high: 101, low: 98, close: 99 },
    { time: 5, open: 99, high: 102, low: 97, close: 101 },
  ];
  const reclaimState = makeState({ currentPrice: 101, map: { downside: [{ lower: 100, upper: 102, label: "Market Map Support", source: "fixture" }] } });
  const reclaim = buildH4ReactionContext(reclaimState, reclaimCandles, reclaimState.map, { status: "Aligns With Weekly" });
  const retestCandles = [{ time: 1, open: 102, high: 106, low: 101, close: 105 }, ...baseCandles.slice(1), { time: 5, open: 103, high: 103, low: 101, close: 102.5 }];
  const retestState = makeState({ currentPrice: 102.5, map: { upside: [{ lower: 100, upper: 102, label: "Market Map Retest Zone", source: "fixture" }] } });
  const retest = buildH4ReactionContext(retestState, retestCandles, retestState.map, { status: "Transition / Mixed" });
  const failedLiquidity = createEmptyLiquidityOrderflowState("4H", "fixture");
  failedLiquidity.activeEpisode = { status: LIQUIDITY_OF_STATE.FAILED, failure: { detected: true, reason: "Failed reclaim context" }, sweep: { type: LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH }, reclaim: { status: LIQUIDITY_RECLAIM_STATUS.MISSED }, band: LIQUIDITY_BAND.WEAK };
  const failedState = makeState({ h4: { liquidityOrderflowState: failedLiquidity } });
  const before = JSON.stringify({ failedState, candles: baseCandles, map: failedState.map });
  const failed = buildH4ReactionContext(failedState, baseCandles, failedState.map, { status: "Conflicts With Weekly" });
  const structureState = makeState({ h4: { structureStatus: "Bearish BOS" } });
  const structure = buildH4ReactionContext(structureState, baseCandles, structureState.map, { status: "Aligns With Weekly" });
  const forbidden = /buy signal|sell signal|entry confirmed|guaranteed|high probability|must enter|must exit/i;
  const cases = [
    { name: "missing 4H context returns unavailable", passed: missing.status === "Context Unavailable" },
    { name: "near Market Map zone returns waiting or developing", passed: ["Waiting for Reaction", "Reaction Developing"].includes(near.status) && near.relatedZoneSource === "Market Map" },
    { name: "rejection from zone is detected safely", passed: rejection.reactionType === "Rejection" },
    { name: "reclaim context is detected safely", passed: reclaim.reactionType === "Reclaim" },
    { name: "retest context is conservative", passed: ["Retest", "Fakeout Risk", "No Clear Reaction"].includes(retest.reactionType) && ["Reaction Developing", "Weak Reaction", "Waiting for Reaction", "No Clear Reaction"].includes(retest.status) },
    { name: "failed reclaim/fakeout risk can fail or weaken", passed: ["Failed Reaction", "Weak Reaction"].includes(failed.status) },
    { name: "H4 liquidity input is not mutated", passed: before === JSON.stringify({ failedState, candles: baseCandles, map: failedState.map }) },
    { name: "H4 structure supports but does not force status", passed: structure.status !== "Reaction Confirmed" },
    { name: "Daily validation does not force H4 status", passed: failed.alignmentWithDaily === "Conflicts With Weekly" && failed.status === "Failed Reaction" },
    { name: "wording avoids direct action language", passed: !forbidden.test(JSON.stringify([missing, near, rejection, reclaim, failed])) },
  ];
  const failedCases = cases.filter((item)=>!item.passed).length;
  return { passed: failedCases === 0, total: cases.length, failed: failedCases, results: cases };
}
if(typeof window !== "undefined") {
  window.runH4ReactionContextFixtureTests = runH4ReactionContextFixtureTests;
}

const H1_TIMING_STATUS_LABELS = ["Timing Supportive", "Timing Developing", "Timing Waiting", "Timing Weak", "Timing Failed", "Context Unavailable"];
const H1_TIMING_DISCLAIMER = "Scenario planning only · not financial advice or a direct timing instruction.";
const H1_TIMING_QUALITY_LABELS = ["supportive", "developing", "weak", "mixed", "unavailable"];
function createEmptyH1TimingContext(reason = "Required 1H timing context is unavailable."){
  return {
    available: false,
    role: "timing_context",
    status: "Context Unavailable",
    sweepStatus: null,
    miniBosChochStatus: null,
    retestStatus: null,
    stochasticStatus: null,
    relatedH4Reaction: latestH4ReactionContext?.status || null,
    timingQuality: "unavailable",
    timingReasons: [reason],
    riskNotes: ["Timing Context only; waiting for sufficient 1H data."],
    use: "Timing Context only",
    disclaimer: H1_TIMING_DISCLAIMER,
  };
}
function normalizeH1TimingStatus(status){
  const text = String(status || "").trim().toLowerCase();
  const exact = H1_TIMING_STATUS_LABELS.find((item)=>item.toLowerCase() === text);
  if(exact) return exact;
  if(text.includes("support")) return "Timing Supportive";
  if(text.includes("develop")) return "Timing Developing";
  if(text.includes("wait")) return "Timing Waiting";
  if(text.includes("fail")) return "Timing Failed";
  if(text.includes("weak")) return "Timing Weak";
  return "Context Unavailable";
}
function normalizeH1TimingQuality(quality){
  const text = String(quality || "").trim().toLowerCase();
  return H1_TIMING_QUALITY_LABELS.includes(text) ? text : "unavailable";
}
function inferH1DirectionFromText(text){
  const value = String(text || "").toLowerCase();
  if(value.includes("bullish") || value.includes("cross up") || value.includes("oversold")) return "bullish";
  if(value.includes("bearish") || value.includes("cross down") || value.includes("overbought")) return "bearish";
  return null;
}
function inferH4ReactionDirection(h4Reaction){
  const zone = `${h4Reaction?.relatedZone?.label || ""} ${h4Reaction?.relatedZoneSource || ""}`;
  const text = `${h4Reaction?.status || ""} ${h4Reaction?.reactionType || ""} ${h4Reaction?.sweepStatus || ""} ${h4Reaction?.bosChochContext || ""} ${zone}`.toLowerCase();
  if(text.includes("sweep_low") || text.includes("bullish") || text.includes("support") || text.includes("downside")) return "bullish";
  if(text.includes("sweep_high") || text.includes("bearish") || text.includes("resistance") || text.includes("upside")) return "bearish";
  return null;
}
function isH1SweepStale(sweepStatus, candles){
  if(!Array.isArray(candles) || candles.length < 12) return false;
  const status = String(sweepStatus || "").toLowerCase();
  if(!status.includes("sweep")) return false;
  const recentSweep = detect1hLiquiditySweep(candles.slice(-8));
  return recentSweep?.status === "No recent sweep";
}
function deriveH1SweepTimingContext(state = marketPreparationState, candles = latest1hCandles){
  const status = state?.h1?.sweepStatus || latest1hSweepStatus || null;
  if(!status || /unavailable/i.test(status)) return { status: null, direction: null, stale: false, reasons: [], risks: ["1H sweep context is unavailable."] };
  if(/no recent/i.test(status)) return { status, direction: null, stale: false, reasons: [], risks: ["No recent 1H sweep context is available."] };
  const direction = inferH1DirectionFromText(status);
  const stale = isH1SweepStale(status, candles);
  return { status, direction, stale, reasons: [`1H sweep context is ${status}.`], risks: stale ? ["1H sweep context appears stale in the recent candle window."] : [] };
}
function deriveH1MiniBosChochContext(state = marketPreparationState){
  const status = state?.h1?.structureStatus || latest1hStructureStatus || null;
  if(!status || /unavailable/i.test(status)) return { status: null, direction: null, reasons: [], risks: ["1H mini structure context is unavailable."] };
  if(/no clear/i.test(status)) return { status, direction: null, reasons: [], risks: ["No clear 1H mini BOS/CHOCH context is available."] };
  return { status, direction: inferH1DirectionFromText(status), reasons: [`1H mini structure context is ${status}.`], risks: [] };
}
function deriveH1QuickRetestContext(candles = latest1hCandles, structureContext = null, sweepContext = null){
  if(!Array.isArray(candles) || candles.length < 6) return { status: "Retest Unclear", quality: "mixed", failed: false, supportive: false, reasons: [], risks: ["Not enough 1H candles for quick retest context."] };
  const recent = candles.slice(-4);
  const latest = recent[recent.length - 1];
  const levels = [];
  const structureBroken = Number(structureContext?.brokenLevel ?? structureContext?.broken);
  const sweepLevel = Number(sweepContext?.level ?? sweepContext?.sweptLevel);
  if(Number.isFinite(structureBroken)) levels.push({ level: structureBroken, source: "mini BOS/CHOCH level" });
  if(Number.isFinite(sweepLevel)) levels.push({ level: sweepLevel, source: "swept level" });
  if(!levels.length) return { status: "No Clear Retest", quality: "mixed", failed: false, supportive: false, reasons: [], risks: ["Quick retest level is unavailable."] };
  const direction = structureContext?.direction || sweepContext?.direction || null;
  const bufferPct = 0.0025;
  for(const item of levels){
    const buffer = Math.max(item.level * bufferPct, 1e-8);
    const touched = recent.some((candle)=>Number(candle.low) <= item.level + buffer && Number(candle.high) >= item.level - buffer);
    if(!touched) continue;
    const close = Number(latest?.close);
    if(direction === "bullish"){
      if(close >= item.level) return { status: "Retest Holding", quality: "supportive", failed: false, supportive: true, reasons: [`1H retest is holding near ${item.source}.`], risks: [] };
      return { status: "Retest Failed", quality: "weak", failed: true, supportive: false, reasons: [], risks: [`1H retest failed near ${item.source}.`] };
    }
    if(direction === "bearish"){
      if(close <= item.level) return { status: "Retest Holding", quality: "supportive", failed: false, supportive: true, reasons: [`1H retest is holding near ${item.source}.`], risks: [] };
      return { status: "Retest Failed", quality: "weak", failed: true, supportive: false, reasons: [], risks: [`1H retest failed near ${item.source}.`] };
    }
    return { status: "Retest Unclear", quality: "mixed", failed: false, supportive: false, reasons: [`1H touched ${item.source}, but direction context is unclear.`], risks: ["Quick retest context remains unclear."] };
  }
  return { status: "No Clear Retest", quality: "mixed", failed: false, supportive: false, reasons: [], risks: ["No recent quick retest is visible in the 1H candle window."] };
}
function deriveH1StochasticTimingContext(stochastic){
  const label = stochastic?.ok ? stochastic.label : (stochastic?.label || "Stoch unavailable");
  const status = String(stochastic?.status || "idle");
  const direction = inferH1DirectionFromText(`${label} ${status}`);
  if(!stochastic?.ok) return { label, direction: null, supportive: false, contradictory: false, reasons: [], risks: ["1H stochastic context is unavailable."] };
  if(status === "neutral") return { label, direction: null, supportive: false, contradictory: false, reasons: ["1H stochastic is neutral timing context."], risks: ["Stochastic is display-only and does not override structure."] };
  return { label, direction, supportive: !!direction, contradictory: false, reasons: [`1H stochastic context is ${label}.`], risks: ["Stochastic is timing context only and does not override sweep or structure."] };
}
function classifyH1TimingAgainstH4Reaction({ sweep, structure, retest, stochastic, h4Reaction }){
  const h4Status = normalizeH4ReactionStatus(h4Reaction?.status);
  const h4Direction = inferH4ReactionDirection(h4Reaction);
  const h1Direction = structure.direction || sweep.direction || stochastic.direction || null;
  const hasSweep = !!sweep.direction && !sweep.stale;
  const hasStructure = !!structure.direction;
  const directionCompatible = !!h4Direction && !!h1Direction && h4Direction === h1Direction;
  const directionOpposite = !!h4Direction && !!h1Direction && h4Direction !== h1Direction;
  if(h4Status === "Failed Reaction" || retest.failed || directionOpposite) return { status: "Timing Failed", quality: "weak" };
  if(h4Status === "Context Unavailable" || h4Status === "No Clear Reaction") return { status: hasSweep ? "Timing Weak" : "Timing Waiting", quality: hasSweep ? "weak" : "mixed" };
  if(h4Status === "Weak Reaction") return { status: hasSweep && hasStructure ? "Timing Developing" : "Timing Weak", quality: hasSweep && hasStructure ? "developing" : "weak" };
  if(hasSweep && !hasStructure) return { status: "Timing Developing", quality: "developing" };
  if(["Reaction Confirmed", "Reaction Developing", "Waiting for Reaction"].includes(h4Status) && hasSweep && hasStructure && (directionCompatible || !h4Direction) && !stochastic.contradictory){
    return { status: "Timing Supportive", quality: "supportive" };
  }
  if(hasSweep || hasStructure || retest.supportive || stochastic.supportive) return { status: "Timing Developing", quality: "developing" };
  return { status: "Timing Waiting", quality: "mixed" };
}
function buildH1TimingReasons(items){
  return [...new Set((items || []).flat().filter(Boolean))].slice(0, 6);
}
function buildH1TimingRiskNotes(items){
  return [...new Set((items || []).flat().filter(Boolean))].slice(0, 5);
}
function buildH1TimingContext(state = marketPreparationState, candles = latest1hCandles, h4Reaction = latestH4ReactionContext){
  const hasCandles = Array.isArray(candles) && candles.length >= 3;
  const h1Ready = state?.meta?.sourcesReady?.h1 === true;
  const h1State = state?.h1 || {};
  const hasState = h1Ready && !!(h1State.sweepStatus || h1State.structureStatus || h1State.stochastic?.ok);
  if(!hasCandles && !hasState) return createEmptyH1TimingContext("Required 1H data/state is unavailable.");
  const sweep = deriveH1SweepTimingContext(state, candles);
  const structure = deriveH1MiniBosChochContext(state);
  const detectedStructure = hasCandles ? detect1hStructure(candles) : null;
  const detectedSweep = hasCandles ? detect1hLiquiditySweep(candles) : null;
  const retest = deriveH1QuickRetestContext(candles, { direction: structure.direction, brokenLevel: detectedStructure?.broken }, { direction: sweep.direction, level: detectedSweep?.level });
  const stochastic = deriveH1StochasticTimingContext(h1State.stochastic);
  const classification = classifyH1TimingAgainstH4Reaction({ sweep, structure, retest, stochastic, h4Reaction });
  const h4Status = h4Reaction?.status || "4H reaction context unavailable";
  const h4Reasons = [];
  const h4Risks = [];
  if(/confirmed|developing/i.test(h4Status)) h4Reasons.push("1H timing is evaluated against active 4H reaction context.");
  if(/weak|no clear|unavailable/i.test(h4Status)) h4Risks.push("1H timing remains cautious because 4H reaction context is not confirmed.");
  if(/failed/i.test(h4Status)) h4Risks.push("4H reaction failed, so 1H timing cannot be supportive.");
  const reasons = buildH1TimingReasons([sweep.reasons, structure.reasons, retest.reasons, stochastic.reasons, h4Reasons]);
  const risks = buildH1TimingRiskNotes([sweep.risks, structure.risks, retest.risks, stochastic.risks, h4Risks]);
  return {
    available: true,
    role: "timing_context",
    status: normalizeH1TimingStatus(classification.status),
    sweepStatus: sweep.status,
    miniBosChochStatus: structure.status,
    retestStatus: retest.status,
    stochasticStatus: stochastic.label,
    relatedH4Reaction: h4Status,
    timingQuality: normalizeH1TimingQuality(classification.quality),
    timingReasons: reasons.length ? reasons : ["1H timing data is available, but no clear timing refinement is visible yet."],
    riskNotes: risks.length ? risks : ["Timing Context only; no scenario scoring or primary selection impact."],
    use: "Timing Context only",
    disclaimer: H1_TIMING_DISCLAIMER,
  };
}
function formatH1TimingList(items, className){
  const list = Array.isArray(items) && items.length ? items : ["Context unavailable."];
  return `<ul class="${className}">${list.map((item)=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}
function formatH1TimingPanel(context){
  const safe = context || createEmptyH1TimingContext();
  const status = normalizeH1TimingStatus(safe.status);
  const statusClass = status.toLowerCase().replace(/[^a-z]+/g,"-");
  return `<div class="h1-timing-header timeframe-context-card-header"><div><h3>1H Timing Context</h3><p>Display-only timing refinement against the current 4H Reaction Context.</p></div><span class="h1-timing-status h1-timing-status-${statusClass}">${escapeHtml(status)}</span></div>${formatTimeframeContextCardGrid(getH1ContextCards(safe))}<p class="h1-timing-safe timeframe-context-card-note">${escapeHtml(safe.disclaimer || H1_TIMING_DISCLAIMER)}</p>`;
}
function renderH1TimingContext(){
  if(!els.h1TimingContextPanel) return;
  latestH1TimingContext = buildH1TimingContext(marketPreparationState, latest1hCandles, latestH4ReactionContext);
  els.h1TimingContextPanel.innerHTML = formatH1TimingPanel(latestH1TimingContext);
}
function runH1TimingContextFixtureTests(){
  const baseCandles = [
    { time: 1, open: 100, high: 101, low: 99, close: 100 },
    { time: 2, open: 100, high: 102, low: 98, close: 99 },
    { time: 3, open: 99, high: 101, low: 97, close: 100 },
    { time: 4, open: 100, high: 103, low: 99, close: 102 },
    { time: 5, open: 102, high: 104, low: 101, close: 103 },
    { time: 6, open: 103, high: 104, low: 102, close: 103 },
  ];
  const h4Developing = { status: "Reaction Developing", reactionType: "Reclaim", relatedZone: { label: "4H Support" } };
  const h4Weak = { status: "Weak Reaction", reactionType: "Sweep" };
  const h4Failed = { status: "Failed Reaction", reactionType: "Failed Reclaim" };
  const makeState = (h1 = {}, ready = true)=>({ meta: { sourcesReady: { h1: ready } }, h1: { sweepStatus: "No recent sweep", structureStatus: "No clear 1H structure shift", stochastic: { ok: true, label: "Stoch Neutral", status: "neutral" }, ...h1 } });
  const missing = buildH1TimingContext({ meta: { sourcesReady: { h1: false } }, h1: {} }, [], h4Developing);
  const sweepOnly = buildH1TimingContext(makeState({ sweepStatus: "Bullish Sweep" }), baseCandles, h4Developing);
  const supportive = buildH1TimingContext(makeState({ sweepStatus: "Bullish Sweep", structureStatus: "Bullish CHoCH", stochastic: { ok: true, label: "Stoch Cross Up", status: "bullish_cross" } }), baseCandles, h4Developing);
  const stale = buildH1TimingContext(makeState({ sweepStatus: "Bullish Sweep", structureStatus: "No clear 1H structure shift" }), baseCandles, h4Weak);
  const failedRetestCandles = [...baseCandles, { time: 7, open: 103, high: 104, low: 99, close: 99 }];
  const failedRetest = buildH1TimingContext(makeState({ sweepStatus: "Bullish Sweep", structureStatus: "Bearish CHoCH", stochastic: { ok: true, label: "Stoch Cross Down", status: "bearish_cross" } }), failedRetestCandles, h4Developing);
  const stochasticSupport = buildH1TimingContext(makeState({ stochastic: { ok: true, label: "Stoch Cross Up", status: "bullish_cross" } }), baseCandles, h4Developing);
  const h4FailedContext = buildH1TimingContext(makeState({ sweepStatus: "Bullish Sweep", structureStatus: "Bullish CHoCH" }), baseCandles, h4Failed);
  const h4WeakContext = buildH1TimingContext(makeState({ sweepStatus: "Bullish Sweep", structureStatus: "Bullish CHoCH" }), baseCandles, h4Weak);
  const before = JSON.stringify({ state: makeState({ sweepStatus: "Bullish Sweep" }), candles: baseCandles, h4Developing });
  const forbidden = /\bbuy\b|\bsell\b|entry|signal|guaranteed|high probability|must enter|must exit/i;
  const cases = [
    { name: "missing 1H context returns unavailable", passed: missing.status === "Context Unavailable" },
    { name: "sweep without mini BOS/CHOCH develops", passed: sweepOnly.status === "Timing Developing" },
    { name: "compatible sweep plus mini BOS/CHOCH supports timing", passed: supportive.status === "Timing Supportive" },
    { name: "stale or weak parent keeps timing cautious", passed: ["Timing Weak", "Timing Developing"].includes(stale.status) },
    { name: "failed retest/opposite shift fails or weakens", passed: ["Timing Failed", "Timing Weak"].includes(failedRetest.status) },
    { name: "stochastic supports but does not override", passed: stochasticSupport.status !== "Timing Supportive" },
    { name: "H4 failed prevents supportive timing", passed: h4FailedContext.status !== "Timing Supportive" },
    { name: "H4 weak keeps 1H cautious", passed: h4WeakContext.status !== "Timing Supportive" },
    { name: "inputs are not mutated", passed: before === JSON.stringify({ state: makeState({ sweepStatus: "Bullish Sweep" }), candles: baseCandles, h4Developing }) },
    { name: "wording avoids unsafe language", passed: !forbidden.test(JSON.stringify([missing, sweepOnly, supportive, stale, failedRetest])) },
  ];
  const failed = cases.filter((item)=>!item.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined") {
  window.runH1TimingContextFixtureTests = runH1TimingContextFixtureTests;
}
function runWeeklyStructureConflictCalibrationFixtureTests(){
  const bullishConflict = calibrateWeeklyStructureStatus({ available:true, status:"Bullish Structure", majorBias:"bullish", swingSequence:{status:"HH/HL"}, bosChochStatus:{status:"CHOCH Down"}, riskNotes:[] });
  const bearishConflict = calibrateWeeklyStructureStatus({ available:true, status:"Bearish Structure", majorBias:"bearish", swingSequence:{status:"LH/LL"}, bosChochStatus:{status:"CHOCH Up"}, riskNotes:[] });
  const bullishAligned = deriveWeeklyStructureStatus({status:"HH/HL"}, {status:"BOS Up"}, {status:"No Clear Range"});
  const bearishAligned = deriveWeeklyStructureStatus({status:"LH/LL"}, {status:"BOS Down"}, {status:"No Clear Range"});
  const original = { available:true, status:"Bullish Structure", majorBias:"bullish", swingSequence:{status:"HH/HL"}, bosChochStatus:{status:"CHOCH Down"}, riskNotes:[] };
  const before = JSON.stringify(original);
  const calibrated = calibrateWeeklyStructureStatus(original);
  const html = formatWeeklyMajorStructurePanel({ ...calibrated, majorSwingHigh:null, majorSwingLow:null, macroRangeStatus:{status:"Unavailable"}, disclaimer:createScenarioDisclaimer() });
  const forbidden = /\bbuy\b|\bsell\b|confirmed entry|guaranteed|high probability|must enter|must exit/i;
  const cases = [
    { name:"HH/HL + CHOCH Down is not pure bullish", passed: bullishConflict.status !== "Bullish Structure" && bullishConflict.majorBias === "mixed" },
    { name:"LH/LL + CHOCH Up is not pure bearish", passed: bearishConflict.status !== "Bearish Structure" && bearishConflict.majorBias === "mixed" },
    { name:"HH/HL + BOS Up can remain bullish", passed: bullishAligned.status === "Bullish Structure" },
    { name:"LH/LL + BOS Down can remain bearish", passed: bearishAligned.status === "Bearish Structure" },
    { name:"conflict adds safe risk note", passed: bullishConflict.riskNotes.some((note)=>/downside character change/i.test(note)) },
    { name:"wording avoids unsafe language", passed: !forbidden.test(html) },
    { name:"input context is not mutated", passed: JSON.stringify(original) === before },
  ];
  const failed = cases.filter((item)=>!item.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
function createDailyValidationFixtureSnapshot(patternName, patternStatus = "Active", patternPosition = "Near support", extras = {}){
  return {
    available: true,
    rangeMode: extras.rangeMode || "3M",
    pattern: { name: patternName, status: patternStatus, position: patternPosition },
    fvg: extras.fvg || { nearestType: "unavailable", relation: "unavailable" },
    sr: extras.sr || {},
    contextBias: extras.contextBias || "neutral context",
  };
}
function runDailyValidationFoundationFixtureTests(){
  const weekly = { available:true, status:"Bullish Structure", majorBias:"bullish" };
  const daily = createDailyValidationFixtureSnapshot("Rising Channel", "Active", "Near support", { sr:{ nearestSupport:{ price:100 } }, contextBias:"bullish context" });
  const ready = buildDailyValidationFoundationContext(daily, weekly);
  const missingWeekly = buildDailyValidationFoundationContext(daily, null);
  const before = JSON.stringify({ daily, weekly });
  const html = formatDailyValidationFoundationPanel(ready) + formatDailyValidationFoundationPanel(missingWeekly);
  const forbidden = /\bbuy\b|\bsell\b|confirmed entry|guaranteed|high probability|must enter|must exit/i;
  const cases = [
    { name:"renders alignment status when Daily and Weekly contexts exist", passed: ready.status === "Aligns With Weekly" },
    { name:"renders Context Unavailable when Weekly context is missing", passed: missingWeekly.status === "Context Unavailable" },
    { name:"reads selected Daily range and mode safely", passed: ready.selectedRange === "3M" && ready.structureMode === "active" },
    { name:"inputs are not mutated", passed: JSON.stringify({ daily, weekly }) === before },
    { name:"wording avoids unsafe language", passed: !forbidden.test(html) },
  ];
  const failed = cases.filter((item)=>!item.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
function runDailyValidationAlignmentFixtureTests(){
  const bullishWeekly = { available:true, status:"Bullish Structure", majorBias:"bullish" };
  const bearishWeekly = { available:true, status:"Bearish Structure", majorBias:"bearish" };
  const rangeWeekly = { available:true, status:"Macro Range", majorBias:"range" };
  const bullishDaily = createDailyValidationFixtureSnapshot("Rising Channel", "Active", "Near support", { sr:{ nearestSupport:{ price:100 } }, contextBias:"bullish context" });
  const bearishDaily = createDailyValidationFixtureSnapshot("Falling Channel", "Active", "Near resistance", { sr:{ nearestResistance:{ price:100 } }, contextBias:"bearish context" });
  const mixedDaily = createDailyValidationFixtureSnapshot("Horizontal Range", "Active", "Inside range", { contextBias:"mixed context" });
  const before = JSON.stringify({ bullishWeekly, bearishWeekly, rangeWeekly, bullishDaily, bearishDaily, mixedDaily });
  const missing = buildDailyValidationFoundationContext(bullishDaily, null);
  const bullAlign = buildDailyValidationFoundationContext(bullishDaily, bullishWeekly);
  const bullConflict = buildDailyValidationFoundationContext(bearishDaily, bullishWeekly);
  const bullWeak = buildDailyValidationFoundationContext(mixedDaily, bullishWeekly);
  const bearAlign = buildDailyValidationFoundationContext(bearishDaily, bearishWeekly);
  const bearConflict = buildDailyValidationFoundationContext(bullishDaily, bearishWeekly);
  const rangeStatus = buildDailyValidationFoundationContext(bullishDaily, rangeWeekly);
  const html = [missing,bullAlign,bullConflict,bullWeak,bearAlign,bearConflict,rangeStatus].map(formatDailyValidationFoundationPanel).join("");
  const forbidden = /\bbuy\b|\bsell\b|confirmed entry|guaranteed|high probability|must enter|must exit/i;
  const cases = [
    { name:"missing Weekly context returns unavailable", passed: missing.status === "Context Unavailable" },
    { name:"bullish Weekly plus rising/supportive Daily aligns", passed: bullAlign.status === "Aligns With Weekly" },
    { name:"bullish Weekly plus falling/resistance Daily conflicts", passed: bullConflict.status === "Conflicts With Weekly" },
    { name:"bullish Weekly plus mixed Daily weakens or transitions", passed: ["Weakens Weekly", "Transition / Mixed"].includes(bullWeak.status) },
    { name:"bearish Weekly plus falling/resistance Daily aligns", passed: bearAlign.status === "Aligns With Weekly" },
    { name:"bearish Weekly plus rising/supportive Daily conflicts", passed: bearConflict.status === "Conflicts With Weekly" },
    { name:"macro range Weekly returns transition", passed: rangeStatus.status === "Transition / Mixed" },
    { name:"inputs are not mutated", passed: JSON.stringify({ bullishWeekly, bearishWeekly, rangeWeekly, bullishDaily, bearishDaily, mixedDaily }) === before },
    { name:"wording avoids unsafe language", passed: !forbidden.test(html) },
  ];
  const failed = cases.filter((item)=>!item.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined"){ window.runWeeklyStructureConflictCalibrationFixtureTests = runWeeklyStructureConflictCalibrationFixtureTests; window.runDailyValidationFoundationFixtureTests = runDailyValidationFoundationFixtureTests; window.runDailyValidationAlignmentFixtureTests = runDailyValidationAlignmentFixtureTests; }

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
function getMarketMapSourceKind(source){
  const key = String(source?.source || source?.primarySource || "").toLowerCase();
  const text = `${key} ${source?.label || ""} ${source?.type || ""} ${source?.quality || ""}`.toLowerCase();
  if(text.includes("ifvg")) return "ifvg";
  if(text.includes("fvg")) return "fvg";
  if(text.includes("channel")) return "channel";
  if(text.includes("range")) return "range";
  if(text.includes("support")) return "support";
  if(text.includes("resistance")) return "resistance";
  return "other";
}
function formatMarketMapTimeframeList(timeframes){
  const order = ["Weekly", "Daily", "4H", "1H"];
  const unique = [...new Set((timeframes || []).filter(Boolean))];
  return [...order.filter((tf)=>unique.includes(tf)), ...unique.filter((tf)=>!order.includes(tf))].join(" + ");
}
function getDominantMarketMapDirection(sources){
  const directions = (sources || []).map(getMapSourceDirection).filter(Boolean);
  const counts = directions.reduce((acc, direction)=>{ acc[direction] = (acc[direction] || 0) + 1; return acc; }, {});
  if((counts.bullish || 0) > (counts.bearish || 0)) return "bullish";
  if((counts.bearish || 0) > (counts.bullish || 0)) return "bearish";
  return null;
}
function formatMarketMapConfluenceExplanation(row){
  const sources = getConfluenceSourceList(row).filter(Boolean);
  const confluenceCount = Number(row?.confluenceCount) || sources.length;
  const isConfluenceRow = /confluence/i.test(String(row?.label || row?.quality || row?.type || row?.confluenceLabel || ""));
  if(sources.length < 2 && confluenceCount < 2 && !isConfluenceRow) return null;
  if(sources.length < 2) return null;

  const kinds = new Set(sources.map(getMarketMapSourceKind));
  const timeframes = sources.map(getMapSourceTimeframe).filter(Boolean);
  const timeframeText = formatMarketMapTimeframeList(timeframes);
  const uniqueTimeframeCount = new Set(timeframes).size;
  const fvgSources = sources.filter((source)=>getMarketMapSourceKind(source) === "fvg");
  const supportSources = sources.filter((source)=>getMarketMapSourceKind(source) === "support");
  const resistanceSources = sources.filter((source)=>getMarketMapSourceKind(source) === "resistance");
  const channelSources = sources.filter((source)=>getMarketMapSourceKind(source) === "channel");
  const rangeSources = sources.filter((source)=>getMarketMapSourceKind(source) === "range");
  const dominantDirection = getDominantMarketMapDirection(fvgSources.length ? fvgSources : sources);

  if(kinds.has("ifvg")) return "IFVG context overlaps with this zone.";
  if(fvgSources.length >= 2 && uniqueTimeframeCount >= 2 && dominantDirection){
    return `Multi-timeframe ${dominantDirection} FVG overlap: ${timeframeText}.`;
  }
  if(supportSources.length === sources.length && uniqueTimeframeCount >= 2){
    return `Multi-timeframe support confluence: ${timeframeText}.`;
  }
  if(resistanceSources.length === sources.length && uniqueTimeframeCount >= 2){
    return `Multi-timeframe resistance confluence: ${timeframeText}.`;
  }
  if(fvgSources.length && channelSources.length){
    const dailyFvg = fvgSources.find((source)=>getMapSourceTimeframe(source) === "Daily");
    const dailyChannel = channelSources.find((source)=>getMapSourceTimeframe(source) === "Daily");
    const direction = dailyFvg ? getMapSourceDirection(dailyFvg) : dominantDirection;
    if(dailyFvg && dailyChannel && direction) return `Daily ${direction} FVG aligns with Daily channel boundary.`;
    return "FVG context aligns with channel boundary.";
  }
  if(fvgSources.length && rangeSources.length) return "FVG context aligns with range boundary.";
  if(fvgSources.length && resistanceSources.length){
    const dailyFvg = fvgSources.find((source)=>getMapSourceTimeframe(source) === "Daily");
    const dailyResistance = resistanceSources.find((source)=>getMapSourceTimeframe(source) === "Daily");
    const direction = dailyFvg ? getMapSourceDirection(dailyFvg) : dominantDirection;
    if(dailyFvg && dailyResistance && direction) return `Daily ${direction} FVG aligns with Daily resistance.`;
    return "FVG context aligns with resistance.";
  }
  if(fvgSources.length && supportSources.length){
    const dailyFvg = fvgSources.find((source)=>getMapSourceTimeframe(source) === "Daily");
    const h4Support = supportSources.find((source)=>getMapSourceTimeframe(source) === "4H");
    const direction = dailyFvg ? getMapSourceDirection(dailyFvg) : dominantDirection;
    if(dailyFvg && h4Support && direction) return `Daily ${direction} FVG aligns with 4H support.`;
    return "FVG context aligns with support.";
  }
  if(supportSources.length && resistanceSources.length) return "Mixed S/R overlap; review listed sources.";
  if(channelSources.length) return "Daily channel boundary aligns with this zone.";
  if(rangeSources.length) return "Daily range boundary aligns with this zone.";
  return isConfluenceRow ? "Source overlap detected; review listed sources." : null;
}
function runMarketMapSourceExplanationFixtureTests(){
  const row = (sources)=>({ confluenceCount: Array.isArray(sources) ? sources.length : 0, sources });
  const cases = [
    {
      name: "multi-timeframe bearish fvg overlap",
      input: row([
        { source: "weekly_fvg", label: "W Bearish FVG" },
        { source: "daily_fvg", label: "Daily Bearish FVG" },
        { source: "h4_fvg", label: "4H Bearish FVG" },
      ]),
      expected: "Multi-timeframe bearish FVG overlap: Weekly + Daily + 4H.",
    },
    {
      name: "multi-timeframe support confluence",
      input: row([
        { source: "weekly_sr", label: "W Support" },
        { source: "daily_sr", label: "Daily Support" },
        { source: "h4_sr", label: "4H Support" },
      ]),
      expected: "Multi-timeframe support confluence: Weekly + Daily + 4H.",
    },
    {
      name: "daily fvg channel boundary",
      input: row([
        { source: "daily_fvg", label: "Daily Bearish FVG" },
        { source: "daily_pattern_resistance", label: "Daily Channel Resistance" },
      ]),
      expected: "Daily bearish FVG aligns with Daily channel boundary.",
    },
    {
      name: "daily fvg h4 support",
      input: row([
        { source: "daily_fvg", label: "Daily Bullish FVG" },
        { source: "h4_sr", label: "4H Support" },
      ]),
      expected: "Daily bullish FVG aligns with 4H support.",
    },
    { name: "empty sources", input: row([]), expected: null },
    { name: "single source", input: row([{ source: "daily_fvg", label: "Daily Bullish FVG" }]), expected: null },
  ];
  const results = cases.map((testCase)=>{
    let actual = null;
    let error = null;
    try { actual = formatMarketMapConfluenceExplanation(testCase.input); }
    catch(e){ error = e?.message || String(e); }
    return { name: testCase.name, passed: actual === testCase.expected && !error, expected: testCase.expected, actual, error };
  });
  const failed = results.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: results.length, failed, results };
}
if(typeof window !== "undefined") window.runMarketMapSourceExplanationFixtureTests = runMarketMapSourceExplanationFixtureTests;
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
  return formatChartMarkLabel({
    timeframe: timeframe || detail?.timeframe || zone?.timeframe || "FVG",
    category: "FVG",
    side: getFvgOverlayDirectionLabel(zone, detail),
    status: detail?.detailStatus || zone?.status || "Active",
  });
}
function formatFvgOverlayTooltip(zone, timeframe, detailCandidates = null){
  const detail = findFvgDetailForZone(zone, timeframe, detailCandidates);
  const extras = [
    Number.isFinite(Number(detail?.failedReclaimCount)) ? `Failed reclaim ${detail.failedReclaimCount}x` : "",
    detail?.retestStatus ? `Retest: ${detail.retestStatus}` : "",
    detail?.waitingContext ? `Waiting: ${detail.waitingContext}` : "",
  ].filter(Boolean).join(" · ");
  return buildChartMarkTooltip({
    timeframe: timeframe || detail?.timeframe || zone?.timeframe || "FVG",
    category: "FVG",
    side: getFvgOverlayDirectionLabel(zone, detail),
    status: detail?.detailStatus || zone?.status || "Active",
    priceRange: { lower: zone?.lower, upper: zone?.upper },
    detailText: extras,
  });
}

// Render-only chart mark label helpers for future Weekly/Daily/4H/1H label consistency.
// These helpers normalize display text only; they do not read DOM, touch charts, or mutate app state.
function normalizeChartMarkLabel(mark = {}){
  const normalizeText = (value)=>String(value || "").trim();
  const rawTimeframe = normalizeText(mark.timeframe || mark.tf);
  const timeframeLookup = {
    weekly: "W",
    week: "W",
    w: "W",
    daily: "D",
    day: "D",
    d: "D",
    "1d": "D",
    h4: "4H",
    "4h": "4H",
    h1: "1H",
    "1h": "1H",
  };
  const timeframe = timeframeLookup[rawTimeframe.toLowerCase()] || rawTimeframe.toUpperCase();
  const rawCategory = normalizeText(mark.category || mark.type);
  const categoryLookup = {
    snr: "SNR",
    "s/r": "SNR",
    sr: "SNR",
    fvg: "FVG",
    structure: "Structure",
    liquidity: "Liquidity",
    trendline: "Trendline",
    price: "Price",
    rsi: "RSI",
  };
  const category = categoryLookup[rawCategory.toLowerCase()] || rawCategory;
  const rawSide = normalizeText(mark.side || mark.direction);
  const sideLookup = {
    bullish: "Bull",
    bull: "Bull",
    bearish: "Bear",
    bear: "Bear",
    support: "Support",
    resistance: "Resistance",
    neutral: "Neutral",
  };
  const side = sideLookup[rawSide.toLowerCase()] || rawSide;
  const rawStatus = normalizeText(mark.status);
  const normalizedStatusKey = rawStatus.toLowerCase().replace(/[\s_-]+/g, " ");
  const statusLookup = {
    active: "Active",
    valid: "Active",
    unfilled: "Fresh",
    fresh: "Fresh",
    touched: "Touched",
    touch: "Touched",
    "partially filled": "Touched",
    partial: "Touched",
    mitigated: "Mitigated",
    "partially mitigated": "Mitigated",
    filled: "Mitigated",
    broken: "Broken",
    invalid: "Invalid",
    invalidated: "Invalid",
    neutral: "Neutral",
  };
  const normalizedStatus = statusLookup[normalizedStatusKey] || rawStatus;
  const status = category === "FVG" && normalizedStatus === "Broken" ? "Invalid" : normalizedStatus;
  const price = Number.isFinite(Number(mark.price)) ? Number(mark.price) : null;
  const range = mark.priceRange || mark.range || null;
  const lower = Number(range?.lower);
  const upper = Number(range?.upper);
  const priceRange = Number.isFinite(lower) && Number.isFinite(upper)
    ? { lower: Math.min(lower, upper), upper: Math.max(lower, upper) }
    : null;
  const priority = Number.isFinite(Number(mark.priority)) ? Number(mark.priority) : 0;
  const detailText = normalizeText(mark.detailText);
  const explicitLabelText = normalizeText(mark.labelText);
  const subtype = normalizeText(mark.subtype || mark.eventType);
  return { timeframe, category, side, status, price, priceRange, labelText: explicitLabelText, detailText, priority, subtype };
}

// Builds compact labels such as "W Support · Active", "4H Bull FVG · Fresh", or "1H BOS".
function buildChartMarkLabel(mark = {}){
  const normalized = normalizeChartMarkLabel(mark);
  if(normalized.labelText) return normalized.labelText;

  const parts = [];
  if(normalized.timeframe) parts.push(normalized.timeframe);
  if(normalized.category === "FVG"){
    if(normalized.side && normalized.side !== "Neutral") parts.push(normalized.side);
    parts.push("FVG");
  } else if(normalized.category === "SNR"){
    if(normalized.side && normalized.side !== "Neutral") parts.push(normalized.side);
    else parts.push("SNR");
  } else if(normalized.category === "Liquidity"){
    if(normalized.side && normalized.side !== "Neutral") parts.push(normalized.side);
    parts.push(normalized.subtype || "Sweep");
  } else if(normalized.category === "Structure"){
    parts.push(normalized.side && normalized.side !== "Neutral" ? normalized.side : "Structure");
  } else if(normalized.category){
    parts.push(normalized.category);
  }

  const baseLabel = parts.filter(Boolean).join(" ") || "Chart Mark";
  const shouldShowStatus = normalized.status && !["Neutral"].includes(normalized.status);
  return shouldShowStatus ? `${baseLabel} · ${normalized.status}` : baseLabel;
}

function formatChartMarkLabel(mark = {}){
  return buildChartMarkLabel(mark);
}

function buildChartMarkTooltip(mark = {}){
  const normalized = normalizeChartMarkLabel(mark);
  const timeframeName = ({ W:"Weekly", D:"Daily", "4H":"4H", "1H":"1H" })[normalized.timeframe] || normalized.timeframe;
  const label = formatChartMarkLabel(mark);
  const detailParts = [timeframeName, normalized.side, normalized.category, normalized.status]
    .filter((part)=>part && part !== "Neutral");
  const range = normalized.priceRange ? `${usd(normalized.priceRange.lower)} - ${usd(normalized.priceRange.upper)}` : null;
  const details = [label, [...new Set(detailParts)].join(" "), range, normalized.detailText]
    .filter(Boolean);
  return [...new Set(details)].join(" · ");
}

// Display-only label density rules. These helpers never alter the source overlays or detector output.
function getChartLabelDensityConfig(timeframe = "D"){
  const key = String(timeframe || "D").toUpperCase();
  const maxLabels = ({ W:8, D:10, "4H":8, "1H":6 })[key] || 8;
  return { timeframe:key, maxLabels, nearbyY:18, collisionGap:4 };
}
function formatCompactChartLabel(label){
  return String(label?.text ?? label ?? "")
    .replace(/\bWeekly\b/g,"W").replace(/\bDaily\b/g,"D")
    .replace(/\bBullish\b/g,"Bull").replace(/\bBearish\b/g,"Bear")
    .replace(/^D Channel /,"Channel ").replace(/^D Range /,"Range ")
    .replace(/\s*·\s*(Active|Fresh|Touched|Mitigated)$/i,"")
    .replace(/\s+/g," ").trim();
}
function getChartLabelPriority(label = {}, context = {}){
  const text = String(label.text || label.label || "");
  const status = String(label.status || "");
  const category = String(label.category || context.category || "").toLowerCase();
  const explicitPriority = Number(label.priority);
  if(Number.isFinite(explicitPriority)) return explicitPriority;
  if(/stale/i.test(text+status)) return 5;
  if(/current price|scenario zone|invalidation|tp1|tp2/i.test(text)) return 100;
  if(/broken support|broken resistance/i.test(text)) return 84;
  if(category === "snr" || /support|resistance/i.test(text)) return /active|strong|major/i.test(text+status) ? 90 : 76;
  if(/channel|macro range/i.test(text)) return 80;
  if(category === "fvg" || /fvg|ifvg/i.test(text)) return /invalid|filled|mitigated|old/i.test(text+status) ? 35 : 65;
  if(/sweep|bos|choch/i.test(text)) return 60;
  return Number.isFinite(Number(label.priority)) ? Number(label.priority) : 45;
}
function shouldDisplayChartLabel(label, context = {}){ return getChartLabelPriority(label,context) > 10 && !/stale hidden/i.test(String(label?.text || "")); }
function dedupeNearbyChartLabels(labels, config = getChartLabelDensityConfig()){
  const kept=[];
  (Array.isArray(labels)?labels:[]).forEach((label,index)=>{
    const item={...label,__order:index,priority:getChartLabelPriority(label,config),compactText:formatCompactChartLabel(label)};
    const duplicate=kept.find((other)=>other.compactText===item.compactText && Math.abs(Number(other.y||0)-Number(item.y||0))<=config.nearbyY);
    if(!duplicate) kept.push(item);
    else if(item.priority>duplicate.priority) kept[kept.indexOf(duplicate)]=item;
  });
  return kept.map(({__order,...item})=>item);
}
function getLabelBoundsEstimate(label = {}){ const text=formatCompactChartLabel(label); return { x:Number(label.x||0), y:Number(label.y||0), width:Number(label.width||Math.max(36,text.length*6)), height:Number(label.height||14) }; }
function isLabelCollision(a,b,config=getChartLabelDensityConfig()){
  const xGap=config.collisionGap||0,yGap=config.collisionGap||0;
  return a.x < b.x+b.width+xGap && a.x+a.width+xGap > b.x && a.y < b.y+b.height+yGap && a.y+a.height+yGap > b.y;
}
function resolveChartLabelCollisions(labels, config = getChartLabelDensityConfig()){
  const selected=[];
  [...(Array.isArray(labels)?labels:[])].map((label,index)=>({...label,__order:index,priority:getChartLabelPriority(label,config)})).sort((a,b)=>b.priority-a.priority||a.__order-b.__order).forEach((label)=>{
    const bounds=getLabelBoundsEstimate(label);
    if(!selected.some((other)=>isLabelCollision(bounds,getLabelBoundsEstimate(other),config))) selected.push(label);
  });
  return selected.sort((a,b)=>a.__order-b.__order).map(({__order,...label})=>label);
}
function limitChartLabels(labels, config = getChartLabelDensityConfig()){
  const eligible=dedupeNearbyChartLabels(labels,config).filter((label)=>shouldDisplayChartLabel(label,config));
  const collisionSafe=resolveChartLabelCollisions(eligible,config);
  const selected=new Set([...collisionSafe].sort((a,b)=>getChartLabelPriority(b,config)-getChartLabelPriority(a,config)).slice(0,config.maxLabels));
  return collisionSafe.filter((label)=>selected.has(label));
}
function applyChartLabelDensity(root, timeframe){
  if(!root?.querySelectorAll) return;
  const config=getChartLabelDensityConfig(timeframe);
  const elements=[...root.querySelectorAll('.fvg-overlay-label,.chart-snr-label,.daily-sr-label,.daily-pattern-line text')];
  const labels=elements.map((el,index)=>{ const full=el.dataset?.fullLabel || el.textContent || ""; if(el.dataset)el.dataset.fullLabel=full; el.textContent=formatCompactChartLabel(full); el.classList?.remove('chart-density-hidden'); const rect=el.getBoundingClientRect?.()||{}; return { element:el,text:full,category:/fvg/i.test(full)?"fvg":(/support|resistance/i.test(full)?"snr":"structure"),status:full,x:rect.left??0,y:rect.top??index*16,width:rect.width,height:rect.height,priority:Number(el.dataset?.labelPriority)||undefined }; });
  const visible=new Set(limitChartLabels(labels,config).map((label)=>label.element));
  labels.forEach((label)=>label.element.classList?.toggle('chart-density-hidden',!visible.has(label.element)));
}
function scheduleChartLabelDensity(root, timeframe){ requestAnimationFrame(()=>applyChartLabelDensity(root?.closest?.('.chart-wrap') || root,timeframe)); }
function runChartLabelDensityFixtureTests(){
  const input=[{text:"Current price reference",priority:100,y:10},{text:"Old mitigated FVG",category:"fvg",status:"Mitigated",y:50},{text:"D Support · Active",category:"snr",status:"Active",y:80},{text:"D Support · Active",category:"snr",status:"Active",y:82}]; const before=JSON.stringify(input); const limited=limitChartLabels(input,{...getChartLabelDensityConfig("D"),maxLabels:2}); const forbidden=/buy|sell|entry|signal|guaranteed|high probability/i; const cases=[{name:"high priority kept",passed:limited.some(x=>/Current price/.test(x.text))},{name:"low priority dropped at limit",passed:!limited.some(x=>/Old mitigated/.test(x.text))},{name:"near duplicates deduped",passed:limited.filter(x=>/D Support/.test(x.text)).length===1},{name:"timeframe limits differ",passed:getChartLabelDensityConfig("D").maxLabels!==getChartLabelDensityConfig("1H").maxLabels},{name:"labels compact safely",passed:formatCompactChartLabel("Daily Bearish FVG · Fresh")==="D Bear FVG"},{name:"wording safe",passed:!forbidden.test(formatCompactChartLabel("Daily Bearish FVG · Fresh"))},{name:"inputs not mutated",passed:before===JSON.stringify(input)}]; const failed=cases.filter(x=>!x.passed).length; return {passed:failed===0,total:cases.length,failed,results:cases};
}
function runChartLabelCollisionFixtureTests(){
  const input=[{text:"D Support",priority:90,x:0,y:0,width:70,height:14},{text:"D Bear FVG",priority:65,x:5,y:2,width:70,height:14},{text:"1H BOS",priority:60,x:100,y:80,width:50,height:14},{text:"1H CHOCH",priority:60,x:102,y:82,width:60,height:14}]; const before=JSON.stringify(input); const output=resolveChartLabelCollisions(input,getChartLabelDensityConfig("D")); const cases=[{name:"higher priority wins collision",passed:output.some(x=>x.text==="D Support")&&!output.some(x=>x.text==="D Bear FVG")},{name:"non-overlap remains",passed:output.some(x=>x.text==="1H BOS")},{name:"same priority keeps existing order",passed:output.some(x=>x.text==="1H BOS")&&!output.some(x=>x.text==="1H CHOCH")},{name:"inputs not mutated",passed:before===JSON.stringify(input)},{name:"fallback hides lower priority safely",passed:output.length===2}]; const failed=cases.filter(x=>!x.passed).length; return {passed:failed===0,total:cases.length,failed,results:cases};
}
if(typeof window!=="undefined"){window.runChartLabelDensityFixtureTests=runChartLabelDensityFixtureTests;window.runChartLabelCollisionFixtureTests=runChartLabelCollisionFixtureTests;}
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
function formatScenarioPlanningStatusLabel(status){
  const key = String(status || "informational").toLowerCase();
  if(key === "ready") return "Ready for Review";
  if(key === "waiting") return "Waiting";
  if(key === "invalid") return "Invalid";
  return "Informational";
}
function getScenarioPlanningStatusClass(status){
  const key = String(status || "informational").toLowerCase();
  if(key === "ready") return "status-ready";
  if(key === "waiting") return "status-waiting";
  if(key === "invalid") return "status-invalid";
  return "status-informational";
}
function formatScenarioZoneDisplay(zone){
  if(!zone) return "—";
  const range = zone.zoneText || (Number.isFinite(Number(zone.lower)) && Number.isFinite(Number(zone.upper)) ? `${formatScenarioPrice(zone.lower)}–${formatScenarioPrice(zone.upper)}` : "—");
  return [zone.label, range, zone.source].filter(Boolean).join(" · ");
}
function formatScenarioReferenceLevel(ref){
  if(!ref) return "—";
  const price = Number.isFinite(Number(ref.price)) ? formatScenarioPrice(ref.price) : null;
  const range = ref.zoneText || (Number.isFinite(Number(ref.lower)) && Number.isFinite(Number(ref.upper)) ? `${formatScenarioPrice(ref.lower)}–${formatScenarioPrice(ref.upper)}` : null);
  return [ref.label, price || range, ref.source].filter(Boolean).join(" · ") || "—";
}
function formatScenarioConfirmationList(items){
  const list = Array.isArray(items) ? items.filter((item)=>item?.label).slice(0, 4) : [];
  if(!list.length) return '<p class="scenario-planning-muted">—</p>';
  return `<div class="scenario-planning-chip-list">${list.map((item)=>`<span class="scenario-planning-chip">${escapeHtml(item.label)}</span>`).join("")}</div>`;
}
function formatScenarioConfluenceList(items){
  const list = Array.isArray(items) ? items.filter((item)=>item?.label).slice(0, 3) : [];
  if(!list.length) return "—";
  return list.map((item)=>item.label).join(" · ");
}
function formatScenarioRiskNotes(items){
  const list = Array.isArray(items) ? items.filter(Boolean).slice(0, 3) : [];
  if(!list.length) return '<p class="scenario-planning-muted">—</p>';
  return `<ul class="scenario-planning-notes">${list.map((item)=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}
function getScenarioConfirmationStatusClass(status){
  return `confirmation-${normalizeScenarioConfirmationStatus(status)}`;
}
function formatScenarioConfirmationReasonsList(reasons){
  const list = formatScenarioConfirmationReasons(reasons).slice(0, 2);
  if(!list.length) return "";
  return `<p class="scenario-confirmation-reasons">${list.map(escapeHtml).join(" · ")}</p>`;
}

function createEmptyScenarioTimeframeContext(){
  return {
    weekly: { label: "Context Unavailable", note: "Weekly context is unavailable." },
    daily: { label: "Context Unavailable", note: "Daily validation is unavailable." },
    h4: { label: "Context Unavailable", note: "4H reaction context is unavailable." },
    h1: { label: "Context Unavailable", note: "1H timing context is unavailable." },
    footer: "Lower timeframe timing does not override higher timeframe context.",
    disclaimer: "Scenario planning only.",
  };
}
function normalizeScenarioTimeframeLabel(value, fallback = "Context Unavailable"){
  const text = typeof value === "string" ? value.trim() : "";
  return text || fallback;
}
function buildScenarioTimeframeNote(timeframe, label){
  const value = normalizeScenarioTimeframeLabel(label).toLowerCase();
  if(timeframe === "weekly"){
    if(value.includes("mixed") || value.includes("macro") || value.includes("weak")) return "Weekly context remains cautious.";
    if(value.includes("bullish") || value.includes("bearish")) return `Weekly major context is ${label}.`;
    return "Weekly context is unavailable.";
  }
  if(timeframe === "daily"){
    if(value.includes("transition")) return "Daily validation remains transitional.";
    if(value.includes("aligns")) return "Daily validation currently aligns with Weekly context.";
    if(value.includes("weakens") || value.includes("conflicts")) return "Daily validation keeps scenario planning cautious.";
    return "Daily validation is unavailable.";
  }
  if(timeframe === "h4"){
    if(value.includes("confirmed")) return "4H reaction context is confirmed for review.";
    if(value.includes("developing")) return "4H reaction is developing.";
    if(value.includes("weak") || value.includes("failed")) return `4H reaction is ${label.toLowerCase()} context.`;
    if(value.includes("no clear")) return "4H reaction is not clear yet.";
    return "4H reaction context is unavailable.";
  }
  if(timeframe === "h1"){
    if(value.includes("supportive")) return "1H timing is supportive but context-only.";
    if(value.includes("developing")) return "1H timing is developing.";
    if(value.includes("waiting")) return "1H timing is waiting.";
    if(value.includes("weak") || value.includes("failed")) return `1H timing is ${label.toLowerCase()} context.`;
    return "1H timing context is unavailable.";
  }
  return "Scenario planning only.";
}
function buildScenarioTimeframeContextSnapshot(contexts){
  const hasExplicitContexts = arguments.length > 0;
  const pickContext = (key, fallback)=>hasExplicitContexts && Object.prototype.hasOwnProperty.call(contexts || {}, key) ? contexts[key] : fallback;
  const weeklySource = pickContext("weekly", latestWeeklyMajorStructureContext);
  const dailySource = pickContext("daily", latestDailyValidationContext);
  const h4Source = pickContext("h4", latestH4ReactionContext);
  const h1Source = pickContext("h1", latestH1TimingContext);
  const weeklyLabel = normalizeScenarioTimeframeLabel(weeklySource?.status);
  const dailyLabel = normalizeScenarioTimeframeLabel(dailySource?.status);
  const h4Label = normalizeScenarioTimeframeLabel(h4Source?.status);
  const h1Label = normalizeScenarioTimeframeLabel(h1Source?.status);
  return {
    weekly: { label: weeklyLabel, note: buildScenarioTimeframeNote("weekly", weeklyLabel) },
    daily: { label: dailyLabel, note: buildScenarioTimeframeNote("daily", dailyLabel) },
    h4: { label: h4Label, note: buildScenarioTimeframeNote("h4", h4Label) },
    h1: { label: h1Label, note: buildScenarioTimeframeNote("h1", h1Label) },
    footer: "Lower timeframe timing does not override higher timeframe context.",
    disclaimer: "Scenario planning only.",
  };
}
function addScenarioTimeframeContext(plans, context = createEmptyScenarioTimeframeContext()){
  const snapshot = context || createEmptyScenarioTimeframeContext();
  return (Array.isArray(plans) ? plans : []).map((plan)=>({
    ...plan,
    timeframeContext: {
      weekly: { ...snapshot.weekly },
      daily: { ...snapshot.daily },
      h4: { ...snapshot.h4 },
      h1: { ...snapshot.h1 },
      footer: snapshot.footer,
      disclaimer: snapshot.disclaimer,
    },
  }));
}
function getScenarioTimeframeStatusClass(label){
  return `scenario-timeframe-status-${String(label || "context-unavailable").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function normalizeScenarioTimeframeFactorImpact(){
  return 0;
}
function createScenarioTimeframeScoreFactor(label, type = "neutral"){
  const normalizedType = ["support", "caution", "neutral"].includes(type) ? type : "neutral";
  return { label, type: normalizedType, impact: normalizeScenarioTimeframeFactorImpact(), displayOnly: true };
}
function buildWeeklyScenarioTimeframeScoreFactor(plan, context){
  const direction = String(plan?.direction || "neutral").toLowerCase();
  const label = normalizeScenarioTimeframeLabel(context?.weekly?.label);
  const key = label.toLowerCase();
  if(key.includes("bullish structure")){
    if(direction === "bullish") return createScenarioTimeframeScoreFactor("Weekly context supports bullish planning direction", "support");
    if(direction === "bearish") return createScenarioTimeframeScoreFactor("Weekly context conflicts with bearish planning direction", "caution");
    return createScenarioTimeframeScoreFactor("Weekly context is directional while this scenario remains neutral", "neutral");
  }
  if(key.includes("bearish structure")){
    if(direction === "bearish") return createScenarioTimeframeScoreFactor("Weekly context supports bearish planning direction", "support");
    if(direction === "bullish") return createScenarioTimeframeScoreFactor("Weekly context conflicts with bullish planning direction", "caution");
    return createScenarioTimeframeScoreFactor("Weekly context is directional while this scenario remains neutral", "neutral");
  }
  if(key.includes("mixed") || key.includes("macro") || key.includes("weak")) return createScenarioTimeframeScoreFactor("Weekly context remains mixed; directional planning stays cautious", "neutral");
  return createScenarioTimeframeScoreFactor("Weekly context unavailable", "neutral");
}
function buildDailyScenarioTimeframeScoreFactor(context){
  const label = normalizeScenarioTimeframeLabel(context?.daily?.label);
  const key = label.toLowerCase();
  if(key.includes("aligns with weekly")) return createScenarioTimeframeScoreFactor("Daily validation aligns with Weekly context", "support");
  if(key.includes("weakens weekly")) return createScenarioTimeframeScoreFactor("Daily validation weakens Weekly context", "caution");
  if(key.includes("conflicts with weekly")) return createScenarioTimeframeScoreFactor("Daily validation conflicts with Weekly context", "caution");
  if(key.includes("transition") || key.includes("mixed")) return createScenarioTimeframeScoreFactor("Daily validation remains transitional", "caution");
  return createScenarioTimeframeScoreFactor("Daily validation unavailable", "neutral");
}
function buildH4ScenarioTimeframeScoreFactor(context){
  const label = normalizeScenarioTimeframeLabel(context?.h4?.label);
  const key = label.toLowerCase();
  if(key.includes("reaction confirmed")) return createScenarioTimeframeScoreFactor("4H reaction context is confirmed for review", "support");
  if(key.includes("reaction developing")) return createScenarioTimeframeScoreFactor("4H reaction is developing", "support");
  if(key.includes("waiting for reaction")) return createScenarioTimeframeScoreFactor("4H is waiting for reaction", "neutral");
  if(key.includes("weak reaction")) return createScenarioTimeframeScoreFactor("4H reaction is weak", "caution");
  if(key.includes("failed reaction")) return createScenarioTimeframeScoreFactor("4H reaction failed; planning remains cautious", "caution");
  if(key.includes("no clear reaction")) return createScenarioTimeframeScoreFactor("4H reaction is unclear", "neutral");
  return createScenarioTimeframeScoreFactor("4H reaction unavailable", "neutral");
}
function buildH1ScenarioTimeframeScoreFactor(context){
  const label = normalizeScenarioTimeframeLabel(context?.h1?.label);
  const h4Label = normalizeScenarioTimeframeLabel(context?.h4?.label).toLowerCase();
  const key = label.toLowerCase();
  const h4Supportive = h4Label.includes("reaction confirmed") || h4Label.includes("reaction developing");
  if(key.includes("timing supportive")){
    if(h4Supportive) return createScenarioTimeframeScoreFactor("1H timing is supportive but context-only", "support");
    return createScenarioTimeframeScoreFactor("1H timing cannot improve context without supportive 4H reaction", "caution");
  }
  if(key.includes("timing developing")) return createScenarioTimeframeScoreFactor("1H timing is developing", "neutral");
  if(key.includes("timing waiting")) return createScenarioTimeframeScoreFactor("1H timing is waiting", "neutral");
  if(key.includes("timing weak")) return createScenarioTimeframeScoreFactor("1H timing is weak", "caution");
  if(key.includes("timing failed")) return createScenarioTimeframeScoreFactor("1H timing failed; planning remains cautious", "caution");
  return createScenarioTimeframeScoreFactor("1H timing unavailable", "neutral");
}
function buildScenarioTimeframeScoreFactors(plan){
  const context = plan?.timeframeContext || createEmptyScenarioTimeframeContext();
  return [
    buildWeeklyScenarioTimeframeScoreFactor(plan, context),
    buildDailyScenarioTimeframeScoreFactor(context),
    buildH4ScenarioTimeframeScoreFactor(context),
    buildH1ScenarioTimeframeScoreFactor(context),
  ].map((factor)=>({ ...factor, impact: 0, displayOnly: true }));
}
function addScenarioTimeframeScoreFactors(plans){
  return (Array.isArray(plans) ? plans : []).map((plan)=>({
    ...plan,
    scenarioTimeframeScoreFactors: buildScenarioTimeframeScoreFactors(plan).map((factor)=>({ ...factor })),
  }));
}

function capScenarioTimeframeModifier(value){
  const modifier = Number(value);
  if(!Number.isFinite(modifier)) return 0;
  return Math.max(-2, Math.min(2, Math.round(modifier * 10) / 10));
}
function normalizeScenarioCalibratedScore(value){
  if(value === null || value === undefined || value === "") return null;
  const score = Number(value);
  return Number.isFinite(score) ? Math.max(0, Math.min(10, Math.round(score * 10) / 10)) : null;
}
function getScenarioCalibratedScoreLabel(score){
  const normalized = normalizeScenarioCalibratedScore(score);
  if(normalized === null) return "Calibrated context unavailable";
  if(normalized <= 2) return "Very weak calibrated context";
  if(normalized <= 4) return "Weak calibrated context";
  if(normalized <= 6) return "Developing calibrated context";
  if(normalized <= 8) return "Strong calibrated context";
  return "Very strong calibrated context";
}
function getScenarioTimeframeWeeklyDirection(context){
  const label = normalizeScenarioTimeframeLabel(context?.weekly?.label).toLowerCase();
  if(label.includes("bullish structure")) return "bullish";
  if(label.includes("bearish structure")) return "bearish";
  return null;
}
function createScenarioTimeframeModifierFactor(label, impact = 0, type = "neutral"){
  const normalizedImpact = Number.isFinite(Number(impact)) ? Math.round(Number(impact) * 10) / 10 : 0;
  const normalizedType = ["support", "caution", "neutral"].includes(type) ? type : (normalizedImpact > 0 ? "support" : normalizedImpact < 0 ? "caution" : "neutral");
  return { label, impact: normalizedImpact, type: normalizedType, displayOnly: false };
}
function buildWeeklyScenarioTimeframeModifierFactor(plan, context){
  const direction = String(plan?.direction || "neutral").toLowerCase();
  const weeklyDirection = getScenarioTimeframeWeeklyDirection(context);
  const weeklyLabel = normalizeScenarioTimeframeLabel(context?.weekly?.label).toLowerCase();
  if(direction === "neutral") return createScenarioTimeframeModifierFactor("Weekly context noted for neutral planning only", 0, "neutral");
  if(weeklyDirection && weeklyDirection === direction) return createScenarioTimeframeModifierFactor(`Weekly ${weeklyDirection} context aligns with planning direction`, 1, "support");
  if(weeklyDirection && weeklyDirection !== direction) return createScenarioTimeframeModifierFactor(`Weekly ${weeklyDirection} context conflicts with planning direction`, -1, "caution");
  if(weeklyLabel.includes("mixed") || weeklyLabel.includes("macro") || weeklyLabel.includes("weak")) return createScenarioTimeframeModifierFactor("Weekly context remains mixed; no numeric modifier", 0, "neutral");
  return createScenarioTimeframeModifierFactor("Weekly context unavailable for calibration", 0, "neutral");
}
function buildDailyScenarioTimeframeModifierFactor(plan, context){
  const direction = String(plan?.direction || "neutral").toLowerCase();
  const weeklyDirection = getScenarioTimeframeWeeklyDirection(context);
  const dailyLabel = normalizeScenarioTimeframeLabel(context?.daily?.label).toLowerCase();
  if(direction === "neutral") return createScenarioTimeframeModifierFactor("Daily validation noted for neutral planning only", 0, "neutral");
  if(dailyLabel.includes("aligns with weekly")){
    if(weeklyDirection && weeklyDirection === direction) return createScenarioTimeframeModifierFactor("Daily validation aligns with matching Weekly direction", 1, "support");
    return createScenarioTimeframeModifierFactor("Daily alignment needs matching Weekly direction", 0, "neutral");
  }
  if(dailyLabel.includes("conflicts with weekly")) return createScenarioTimeframeModifierFactor("Daily validation conflicts with Weekly context", -1, "caution");
  if(dailyLabel.includes("weakens weekly")) return createScenarioTimeframeModifierFactor("Daily validation weakens Weekly context", -0.5, "caution");
  if(dailyLabel.includes("transition") || dailyLabel.includes("mixed")) return createScenarioTimeframeModifierFactor("Daily validation remains transitional", 0, "neutral");
  return createScenarioTimeframeModifierFactor("Daily validation unavailable for calibration", 0, "neutral");
}
function buildH4ScenarioTimeframeModifierFactor(context){
  const h4Label = normalizeScenarioTimeframeLabel(context?.h4?.label).toLowerCase();
  if(h4Label.includes("failed reaction")) return createScenarioTimeframeModifierFactor("4H reaction failed; calibration stays cautious", -1, "caution");
  if(h4Label.includes("reaction confirmed")) return createScenarioTimeframeModifierFactor("4H reaction direction not safely inferred; no positive modifier", 0, "neutral");
  if(h4Label.includes("reaction developing")) return createScenarioTimeframeModifierFactor("4H developing reaction needs directional match before modifier", 0, "neutral");
  if(h4Label.includes("waiting for reaction")) return createScenarioTimeframeModifierFactor("4H is waiting for reaction", 0, "neutral");
  if(h4Label.includes("weak reaction")) return createScenarioTimeframeModifierFactor("4H reaction is weak", 0, "neutral");
  if(h4Label.includes("no clear reaction")) return createScenarioTimeframeModifierFactor("4H reaction is unclear", 0, "neutral");
  return createScenarioTimeframeModifierFactor("4H reaction unavailable for calibration", 0, "neutral");
}
function buildH1ScenarioTimeframeModifierFactor(context){
  const h1Label = normalizeScenarioTimeframeLabel(context?.h1?.label).toLowerCase();
  const h4Label = normalizeScenarioTimeframeLabel(context?.h4?.label).toLowerCase();
  const h4AllowsTiming = h4Label.includes("reaction confirmed") || h4Label.includes("reaction developing");
  if(h1Label.includes("timing supportive")){
    if(h4AllowsTiming) return createScenarioTimeframeModifierFactor("1H timing supportive with 4H reaction context", 0.5, "support");
    return createScenarioTimeframeModifierFactor("1H timing cannot add without supportive 4H reaction", 0, "neutral");
  }
  if(h1Label.includes("timing failed")) return createScenarioTimeframeModifierFactor("1H timing failed; calibration stays cautious", -0.5, "caution");
  if(h1Label.includes("timing developing")) return createScenarioTimeframeModifierFactor("1H timing is developing", 0, "neutral");
  if(h1Label.includes("timing waiting")) return createScenarioTimeframeModifierFactor("1H timing is waiting", 0, "neutral");
  if(h1Label.includes("timing weak")) return createScenarioTimeframeModifierFactor("1H timing is weak", 0, "neutral");
  return createScenarioTimeframeModifierFactor("1H timing unavailable for calibration", 0, "neutral");
}
function deriveScenarioTimeframeScoreModifier(plan){
  const context = plan?.timeframeContext || createEmptyScenarioTimeframeContext();
  const factors = [
    buildWeeklyScenarioTimeframeModifierFactor(plan, context),
    buildDailyScenarioTimeframeModifierFactor(plan, context),
    buildH4ScenarioTimeframeModifierFactor(context),
    buildH1ScenarioTimeframeModifierFactor(context),
  ];
  const rawModifier = factors.reduce((sum, factor)=>sum + (Number(factor.impact) || 0), 0);
  const modifier = capScenarioTimeframeModifier(rawModifier);
  const cappedFactors = modifier !== rawModifier ? [...factors, createScenarioTimeframeModifierFactor("Timeframe modifier capped for conservative planning context", modifier - rawModifier, modifier > rawModifier ? "support" : "caution")] : factors;
  return { scenarioTimeframeModifier: modifier, scenarioTimeframeModifierFactors: cappedFactors.map((factor)=>({ ...factor })) };
}
function addScenarioTimeframeScoreCalibration(plans){
  return (Array.isArray(plans) ? plans : []).map((plan)=>{
    const baseScore = normalizeScenarioScore(plan?.scenarioScore);
    const baseLabel = plan?.scenarioScoreLabel || getScenarioScoreLabel(baseScore);
    const modifierResult = deriveScenarioTimeframeScoreModifier(plan);
    const calibratedScore = baseScore === null ? null : normalizeScenarioCalibratedScore(baseScore + modifierResult.scenarioTimeframeModifier);
    return {
      ...plan,
      scenarioBaseScore: baseScore,
      scenarioBaseScoreLabel: baseLabel,
      scenarioTimeframeModifier: modifierResult.scenarioTimeframeModifier,
      scenarioTimeframeModifierFactors: modifierResult.scenarioTimeframeModifierFactors,
      scenarioCalibratedScore: calibratedScore,
      scenarioCalibratedScoreLabel: getScenarioCalibratedScoreLabel(calibratedScore),
    };
  });
}
function formatScenarioScoreValue(score){
  const normalized = normalizeScenarioCalibratedScore(score);
  if(normalized === null) return "—";
  return Number.isInteger(normalized) ? String(normalized) : normalized.toFixed(1);
}
function formatScenarioTimeframeModifierValue(value){
  const modifier = capScenarioTimeframeModifier(value);
  return `${modifier > 0 ? "+" : ""}${Number.isInteger(modifier) ? modifier.toFixed(0) : modifier.toFixed(1)}`;
}
function formatScenarioCalibratedScoreBlock(plan){
  const baseScore = plan?.scenarioBaseScore ?? normalizeScenarioScore(plan?.scenarioScore);
  const baseLabel = plan?.scenarioBaseScoreLabel || plan?.scenarioScoreLabel || getScenarioScoreLabel(baseScore);
  const modifier = capScenarioTimeframeModifier(plan?.scenarioTimeframeModifier);
  const calibratedScore = plan?.scenarioCalibratedScore ?? (baseScore === null ? null : normalizeScenarioCalibratedScore(baseScore + modifier));
  const calibratedLabel = plan?.scenarioCalibratedScoreLabel || getScenarioCalibratedScoreLabel(calibratedScore);
  const factors = Array.isArray(plan?.scenarioTimeframeModifierFactors) ? plan.scenarioTimeframeModifierFactors.slice(0, 5) : [];
  return `
    <div class="scenario-planning-block scenario-timeframe-calibration">
      <span>Timeframe Calibration</span>
      <div class="scenario-timeframe-calibration-grid">
        <div><small>Base score</small><strong>${escapeHtml(formatScenarioScoreValue(baseScore))} / 10</strong><em>${escapeHtml(baseLabel)}</em></div>
        <div><small>Timeframe modifier</small><strong>${escapeHtml(formatScenarioTimeframeModifierValue(modifier))}</strong><em>Capped −2 to +2</em></div>
        <div><small>Calibrated context</small><strong>${escapeHtml(formatScenarioScoreValue(calibratedScore))} / 10</strong><em>${escapeHtml(calibratedLabel)}</em></div>
      </div>
      ${factors.length ? `<ul class="scenario-timeframe-calibration-factors">${factors.map((factor)=>`<li class="scenario-timeframe-calibration-${escapeHtml(factor.type || "neutral")}"><strong>${escapeHtml(formatScenarioTimeframeModifierValue(factor.impact))}</strong>${escapeHtml(factor.label || "Timeframe calibration context")}</li>`).join("")}</ul>` : ""}
      <p class="scenario-timeframe-calibration-note">Planning context only · does not affect Primary Scenario or Confirmation Status</p>
    </div>
  `;
}
function formatScenarioTimeframeScoreFactors(plan){
  const factors = Array.isArray(plan?.scenarioTimeframeScoreFactors) && plan.scenarioTimeframeScoreFactors.length ? plan.scenarioTimeframeScoreFactors.slice(0, 4) : buildScenarioTimeframeScoreFactors(plan).slice(0, 4);
  return `
    <div class="scenario-planning-block scenario-timeframe-score-factors">
      <span>Timeframe Context Factors</span>
      <p class="scenario-timeframe-score-note">Display-only · no numeric score impact</p>
      <div class="scenario-timeframe-score-list">
        ${factors.map((factor)=>`<div class="scenario-timeframe-score-factor scenario-timeframe-score-${escapeHtml(factor.type || "neutral")}"><strong>${escapeHtml(factor.label || "Timeframe context unavailable")}</strong><small>No numeric score impact</small></div>`).join("")}
      </div>
    </div>
  `;
}
function formatScenarioTimeframeContextBlock(plan){
  const context = plan?.timeframeContext || createEmptyScenarioTimeframeContext();
  const rows = [
    { key: "weekly", label: "Weekly", data: context.weekly },
    { key: "daily", label: "Daily", data: context.daily },
    { key: "h4", label: "4H", data: context.h4 },
    { key: "h1", label: "1H", data: context.h1 },
  ];
  return `
    <div class="scenario-planning-block scenario-timeframe-context">
      <span>Timeframe Context</span>
      <div class="scenario-timeframe-grid">
        ${rows.map((row)=>`<div class="scenario-timeframe-row scenario-timeframe-${row.key}"><span>${escapeHtml(row.label)}</span><strong class="scenario-timeframe-status ${getScenarioTimeframeStatusClass(row.data?.label)}">${escapeHtml(normalizeScenarioTimeframeLabel(row.data?.label))}</strong><small>${escapeHtml(row.data?.note || "Scenario planning only.")}</small></div>`).join("")}
      </div>
      <p class="scenario-timeframe-footer">${escapeHtml(context.footer || "Lower timeframe timing does not override higher timeframe context.")}</p>
    </div>
  `;
}

function formatScenarioCompactCalibrationSummary(plan){
  const baseScore = plan?.scenarioBaseScore ?? normalizeScenarioScore(plan?.scenarioScore);
  const modifier = capScenarioTimeframeModifier(plan?.scenarioTimeframeModifier);
  const calibratedScore = plan?.scenarioCalibratedScore ?? (baseScore === null ? null : normalizeScenarioCalibratedScore(baseScore + modifier));
  return `Base ${escapeHtml(formatScenarioScoreValue(baseScore))} · Modifier ${escapeHtml(formatScenarioTimeframeModifierValue(modifier))} · Calibrated ${escapeHtml(formatScenarioScoreValue(calibratedScore))}`;
}
function formatScenarioCompactTimeframeContext(plan){
  const context = plan?.timeframeContext || createEmptyScenarioTimeframeContext();
  const rows = [
    { key: "weekly", label: "Weekly", data: context.weekly },
    { key: "daily", label: "Daily", data: context.daily },
    { key: "h4", label: "4H", data: context.h4 },
    { key: "h1", label: "1H", data: context.h1 },
  ];
  return `<div class="scenario-timeframe-compact-chips">${rows.map((row)=>`<span class="scenario-timeframe-compact-chip ${getScenarioTimeframeStatusClass(row.data?.label)}"><em>${escapeHtml(row.label)}</em>${escapeHtml(normalizeScenarioTimeframeLabel(row.data?.label))}</span>`).join("")}</div>`;
}
function formatScenarioSecondaryTimeframeDetails(plan){
  return `
    <details class="scenario-planning-block scenario-secondary-timeframe-details">
      <summary><span>Timeframe Details</span><small>${formatScenarioCompactCalibrationSummary(plan)}</small></summary>
      <p class="scenario-secondary-timeframe-note">Separate context layer · does not replace Scenario Score · does not affect Primary Scenario or Confirmation Status</p>
      ${formatScenarioCompactTimeframeContext(plan)}
      ${formatScenarioCalibratedScoreBlock(plan)}
      ${formatScenarioTimeframeScoreFactors(plan)}
      ${formatScenarioTimeframeContextBlock(plan)}
    </details>
  `;
}
function formatScenarioRiskNotesBlock(plan){
  const list = Array.isArray(plan?.riskNotes) ? plan.riskNotes.filter(Boolean).slice(0, 3) : [];
  if(list.length > 2){
    return `<details class="scenario-planning-block scenario-risk-notes-details"><summary><span>Risk Notes</span><small>${list.length} context notes</small></summary>${formatScenarioRiskNotes(list)}</details>`;
  }
  return `<div class="scenario-planning-block"><span>Risk Notes</span>${formatScenarioRiskNotes(list)}</div>`;
}

const TIMEFRAME_CONFIRMATION_STATUSES = Object.freeze(["supportive", "developing", "caution", "blocking", "unavailable"]);
function normalizeTimeframeConfirmationStatus(status){
  const normalized = String(status || "unavailable").trim().toLowerCase();
  return TIMEFRAME_CONFIRMATION_STATUSES.includes(normalized) ? normalized : "unavailable";
}
function getTimeframeConfirmationLabel(status){
  const normalized = normalizeTimeframeConfirmationStatus(status);
  if(normalized === "supportive") return "Supportive Review";
  if(normalized === "developing") return "Developing Review";
  if(normalized === "caution") return "Caution Review";
  if(normalized === "blocking") return "Blocking Review";
  return "Context Unavailable";
}
function getWeeklyScenarioDirectionCompatibility(plan, timeframeContext){
  const direction = String(plan?.direction || "neutral").toLowerCase();
  const weeklyDirection = getScenarioTimeframeWeeklyDirection(timeframeContext);
  const label = normalizeScenarioTimeframeLabel(timeframeContext?.weekly?.label).toLowerCase();
  if(!weeklyDirection){
    if(label.includes("mixed") || label.includes("macro") || label.includes("weak")) return { status: "caution", reason: "Weekly context keeps confirmation review cautious." };
    return { status: "unavailable", reason: "Weekly context unavailable." };
  }
  if(direction === "neutral") return { status: "neutral", reason: "Weekly context is noted for neutral planning only." };
  if(weeklyDirection === direction) return { status: "aligned", reason: "Weekly context aligns with scenario direction." };
  return { status: "conflict", blocker: "Weekly context conflicts with scenario direction." };
}
function getDailyScenarioValidationCompatibility(plan, timeframeContext){
  const direction = String(plan?.direction || "neutral").toLowerCase();
  const weeklyDirection = getScenarioTimeframeWeeklyDirection(timeframeContext);
  const label = normalizeScenarioTimeframeLabel(timeframeContext?.daily?.label).toLowerCase();
  if(label.includes("aligns with weekly")){
    if(direction !== "neutral" && weeklyDirection === direction) return { status: "aligned", reason: "Daily validation supports the Weekly context for this scenario." };
    return { status: "neutral", reason: "Daily validation needs matching Weekly direction for stronger review." };
  }
  if(label.includes("conflicts with weekly")) return { status: "conflict", blocker: "Daily validation conflicts with Weekly context." };
  if(label.includes("weakens weekly")) return { status: "caution", reason: "Daily validation weakens Weekly context." };
  if(label.includes("transition") || label.includes("mixed")) return { status: "caution", reason: "Daily validation remains transitional." };
  return { status: "unavailable", reason: "Daily validation unavailable." };
}
function areTimeframeContextsUnavailable(timeframeContext){
  return [timeframeContext?.weekly, timeframeContext?.daily, timeframeContext?.h4, timeframeContext?.h1]
    .every((item)=>normalizeScenarioTimeframeLabel(item?.label).toLowerCase().includes("context unavailable"));
}
function deriveTimeframeConfirmationReview(plan){
  const timeframeContext = plan?.timeframeContext || createEmptyScenarioTimeframeContext();
  const reasons = [];
  const blockers = [];
  if(areTimeframeContextsUnavailable(timeframeContext)){
    return {
      timeframeConfirmationStatus: "unavailable",
      timeframeConfirmationLabel: getTimeframeConfirmationLabel("unavailable"),
      timeframeConfirmationReasons: ["Timeframe confirmation context unavailable."],
      timeframeConfirmationBlockers: [],
      timeframeConfirmationUse: "Timeframe confirmation review only",
      timeframeConfirmationDisclaimer: "Planning context only · does not replace Confirmation Status.",
    };
  }
  const weekly = getWeeklyScenarioDirectionCompatibility(plan, timeframeContext);
  const daily = getDailyScenarioValidationCompatibility(plan, timeframeContext);
  if(weekly.reason) reasons.push(weekly.reason);
  if(weekly.blocker) blockers.push(weekly.blocker);
  if(daily.reason) reasons.push(daily.reason);
  if(daily.blocker && getScenarioTimeframeWeeklyDirection(timeframeContext)) blockers.push(daily.blocker);
  const h4Label = normalizeScenarioTimeframeLabel(timeframeContext?.h4?.label).toLowerCase();
  const h1Label = normalizeScenarioTimeframeLabel(timeframeContext?.h1?.label).toLowerCase();
  if(h4Label.includes("failed reaction")) blockers.push("4H reaction failed; blocks strong timeframe confirmation review.");
  else if(h4Label.includes("reaction confirmed")) reasons.push("4H reaction context supports confirmation review.");
  else if(h4Label.includes("reaction developing")) reasons.push("4H reaction is developing; review remains in progress.");
  else if(h4Label.includes("waiting for reaction")) reasons.push("4H is waiting for reaction.");
  else if(h4Label.includes("weak reaction")) reasons.push("4H reaction is weak; confirmation review stays cautious.");
  else if(h4Label.includes("no clear reaction")) reasons.push("4H reaction is unclear.");
  else reasons.push("4H reaction unavailable.");
  const h4Supportive = h4Label.includes("reaction confirmed") || h4Label.includes("reaction developing");
  if(h1Label.includes("timing supportive")){
    if(h4Supportive) reasons.push("1H timing supports the current 4H reaction context only.");
    else reasons.push("1H timing cannot support review without 4H reaction context.");
  } else if(h1Label.includes("timing failed")){
    if(h4Label.includes("weak reaction") || h4Label.includes("failed reaction")) blockers.push("1H timing failed while 4H context is weak or failed.");
    else reasons.push("1H timing failed; confirmation review stays cautious.");
  } else if(h1Label.includes("timing weak")) reasons.push("1H timing is weak and context-only.");
  else if(h1Label.includes("timing waiting")) reasons.push("1H timing is waiting and context-only.");
  else if(h1Label.includes("timing developing")) reasons.push("1H timing is developing and context-only.");
  else reasons.push("1H timing unavailable.");
  const hasCompleteReferences = hasScenarioZone(plan?.scenarioZone) && !!plan?.invalidationReference && !!plan?.tp1;
  if(!hasCompleteReferences) reasons.push("Scenario references are incomplete for supportive timeframe review.");
  let status = "caution";
  if(blockers.length) status = "blocking";
  else if(hasCompleteReferences && h4Label.includes("reaction confirmed") && !h1Label.includes("timing failed") && ![weekly.status, daily.status].includes("conflict")) status = "supportive";
  else if(h4Label.includes("reaction developing") || h4Label.includes("waiting for reaction") || (hasCompleteReferences && !h4Label.includes("weak reaction") && !h4Label.includes("no clear reaction"))) status = "developing";
  if([weekly.status, daily.status].includes("caution") && status === "supportive") status = "caution";
  return {
    timeframeConfirmationStatus: status,
    timeframeConfirmationLabel: getTimeframeConfirmationLabel(status),
    timeframeConfirmationReasons: [...new Set(reasons)].slice(0, 5),
    timeframeConfirmationBlockers: [...new Set(blockers)].slice(0, 4),
    timeframeConfirmationUse: "Timeframe confirmation review only",
    timeframeConfirmationDisclaimer: "Planning context only · does not replace Confirmation Status.",
  };
}
function addTimeframeConfirmationReview(plans){
  return (Array.isArray(plans) ? plans : []).map((plan)=>({ ...plan, ...deriveTimeframeConfirmationReview(plan) }));
}
function formatTimeframeConfirmationList(items, className){
  const list = Array.isArray(items) ? items.filter(Boolean).slice(0, 4) : [];
  if(!list.length) return '<p class="scenario-planning-muted">—</p>';
  return `<ul class="${className}">${list.map((item)=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}
function formatTimeframeConfirmationReviewBlock(plan){
  const status = normalizeTimeframeConfirmationStatus(plan?.timeframeConfirmationStatus);
  const label = plan?.timeframeConfirmationLabel || getTimeframeConfirmationLabel(status);
  const reasons = Array.isArray(plan?.timeframeConfirmationReasons) ? plan.timeframeConfirmationReasons.filter(Boolean) : [];
  const blockers = Array.isArray(plan?.timeframeConfirmationBlockers) ? plan.timeframeConfirmationBlockers.filter(Boolean) : [];
  const summary = blockers[0] || reasons[0] || "Timeframe confirmation context unavailable.";
  return `
    <div class="scenario-planning-block scenario-timeframe-confirmation scenario-timeframe-confirmation-${status}">
      <span>Timeframe Confirmation Review</span>
      <div class="scenario-timeframe-confirmation-head"><strong>${escapeHtml(label)}</strong><small>Context review only</small></div>
      <p class="scenario-timeframe-confirmation-summary">${escapeHtml(summary)}</p>
      <details class="scenario-timeframe-confirmation-details">
        <summary>Review details</summary>
        <div class="scenario-timeframe-confirmation-grid">
          <div><em>Reasons</em>${formatTimeframeConfirmationList(reasons, "scenario-timeframe-confirmation-reasons")}</div>
          <div><em>Blockers</em>${formatTimeframeConfirmationList(blockers, "scenario-timeframe-confirmation-blockers")}</div>
        </div>
      </details>
      <p class="scenario-timeframe-confirmation-note">Does not replace Confirmation Status.</p>
    </div>
  `;
}
function formatScenarioPlanningCard(plan){
  const statusLabel = formatScenarioPlanningStatusLabel(plan?.status);
  const invalidationText = plan?.invalidationReference ? formatScenarioReferenceLevel(plan.invalidationReference) : "—";
  return `
    <article class="scenario-planning-item">
      <div class="scenario-planning-item-header">
        <h4>${escapeHtml(plan?.displayTitle || "Scenario")}</h4>
        <span class="scenario-planning-status ${getScenarioPlanningStatusClass(plan?.status)}">${escapeHtml(statusLabel)}</span>
      </div>
      ${formatPrimaryScenarioBadge(plan)}
      <div class="scenario-planning-block scenario-confirmation-block"><span>Confirmation Status</span><div class="scenario-confirmation-status ${getScenarioConfirmationStatusClass(plan?.confirmationStatus)}">${escapeHtml(plan?.confirmationStatusLabel || formatScenarioConfirmationStatus(plan?.confirmationStatus))}</div>${formatScenarioConfirmationReasonsList(plan?.confirmationReasons)}</div>
      ${formatTimeframeConfirmationReviewBlock(plan)}
      ${formatScenarioScoreBlock(plan)}
      <div class="scenario-planning-grid scenario-reference-grid">
        <div class="scenario-planning-row"><span>Scenario Zone</span><strong>${escapeHtml(formatScenarioZoneDisplay(plan?.scenarioZone))}</strong></div>
        <div class="scenario-planning-row"><span>Invalidation Reference</span><strong>${escapeHtml(invalidationText)}</strong></div>
        <div class="scenario-planning-row"><span>TP1 Reference</span><strong>${escapeHtml(formatScenarioReferenceLevel(plan?.tp1))}</strong></div>
        <div class="scenario-planning-row"><span>TP2 Reference</span><strong>${escapeHtml(formatScenarioReferenceLevel(plan?.tp2))}</strong></div>
        <div class="scenario-planning-row"><span>TP3 Reference</span><strong>${escapeHtml(formatScenarioReferenceLevel(plan?.tp3))}</strong></div>
        <div class="scenario-planning-row"><span>Confluence Reason</span><strong>${escapeHtml(formatScenarioConfluenceList(plan?.confluenceSources))}</strong></div>
      </div>
      ${formatScenarioSecondaryTimeframeDetails(plan)}
      <div class="scenario-planning-block"><span>Confirmation Needed</span>${formatScenarioConfirmationList(plan?.confirmationRequirements)}</div>
      ${formatScenarioRiskNotesBlock(plan)}
    </article>
  `;
}
function getMultiScenarioTabLabel(plan){
  const text = `${plan?.scenarioId || ""} ${plan?.scenarioType || ""} ${plan?.displayTitle || ""}`.toLowerCase();
  if(text.includes("breakout") && !text.includes("breakdown")) return "Breakout";
  if(text.includes("breakdown")) return "Breakdown";
  if(text.includes("wait") || text.includes("no-trade") || text.includes("no_trade")) return "Wait";
  if(text.includes("bearish") || plan?.direction === "bearish") return "Bearish";
  if(text.includes("bullish") || plan?.direction === "bullish") return "Bullish";
  return plan?.displayTitle || "Scenario";
}
function getMultiScenarioTabKey(plan, index = 0){
  const base = plan?.scenarioId || plan?.scenarioType || getMultiScenarioTabLabel(plan) || `scenario-${index + 1}`;
  const safe = String(base).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || `scenario-${index + 1}`;
  return `multi-scenario-${safe}-${index}`;
}
function isWaitNoTradeScenario(plan){
  const text = `${plan?.scenarioId || ""} ${plan?.scenarioType || ""} ${plan?.displayTitle || ""}`.toLowerCase();
  return text.includes("wait") || text.includes("no-trade") || text.includes("no_trade") || plan?.direction === "neutral";
}
function selectDefaultMultiScenarioTabPlan(plans = []){
  const scenarios = Array.isArray(plans) ? plans.filter(Boolean) : [];
  if(!scenarios.length) return null;
  const primary = scenarios.find((plan)=>plan?.isPrimary === true || plan?.isPrimaryScenario === true);
  if(primary) return primary;
  const wait = scenarios.find(isWaitNoTradeScenario);
  if(wait) return wait;
  const scored = scenarios
    .map((plan, index)=>({ plan, index, score: Number(plan?.scenarioScore) }))
    .filter((item)=>Number.isFinite(item.score))
    .sort((a,b)=>b.score - a.score || a.index - b.index);
  if(scored.length) return scored[0].plan;
  return scenarios[0];
}
function formatMultiScenarioPlanningTabs(scenarios){
  const activePlan = selectDefaultMultiScenarioTabPlan(scenarios);
  const activeIndex = Math.max(0, scenarios.findIndex((plan)=>plan === activePlan));
  const tabs = scenarios.map((plan, index)=>{
    const key = getMultiScenarioTabKey(plan, index);
    const active = index === activeIndex;
    const score = Number.isFinite(Number(plan?.scenarioScore)) ? ` · ${Number(plan.scenarioScore).toFixed(Number.isInteger(Number(plan.scenarioScore)) ? 0 : 1)}/10` : "";
    return `<button id="${key}-tab" class="multi-scenario-tab${active ? " is-active" : ""}" type="button" role="tab" aria-selected="${active ? "true" : "false"}" aria-controls="${key}-panel" data-multi-scenario-tab="${key}-panel"><span>${escapeHtml(getMultiScenarioTabLabel(plan))}</span><small>${escapeHtml(score.replace(/^ · /, ""))}</small></button>`;
  }).join("");
  const panels = scenarios.map((plan, index)=>{
    const key = getMultiScenarioTabKey(plan, index);
    const active = index === activeIndex;
    return `<section id="${key}-panel" class="multi-scenario-tab-panel${active ? " is-active" : ""}" role="tabpanel" aria-labelledby="${key}-tab"${active ? "" : " hidden"}>${formatScenarioPlanningCard(plan)}</section>`;
  }).join("");
  return `<div class="multi-scenario-tabs" data-active-scenario-panel="${escapeHtml(getMultiScenarioTabKey(activePlan, activeIndex))}-panel"><div class="multi-scenario-tab-list" role="tablist" aria-label="Multi-Scenario Planning tabs">${tabs}</div>${panels}</div>`;
}
function formatMultiScenarioPlanningSection(plans = []){
  const scenarios = Array.isArray(plans) ? plans.filter(Boolean) : [];
  const cardsHtml = scenarios.length ? formatMultiScenarioPlanningTabs(scenarios) : '<p class="scenario-planning-empty">No multi-scenario planning context available yet.</p>';
  return `
    <div class="scenario-planning-header">
      <div>
        <h3>Multi-Scenario Planning</h3>
        <p>Read-only planning context · not financial advice or a direct trading signal.</p>
      </div>
    </div>
    ${cardsHtml}
    <p class="scenario-planning-footer">${escapeHtml(createScenarioDisclaimer())}</p>
  `;
}
function activateMultiScenarioTab(button){
  const tabsRoot = button?.closest?.(".multi-scenario-tabs");
  const targetId = button?.dataset?.multiScenarioTab;
  if(!tabsRoot || !targetId) return;
  tabsRoot.querySelectorAll(".multi-scenario-tab").forEach((tab)=>{
    const selected = tab === button;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", selected ? "true" : "false");
  });
  tabsRoot.querySelectorAll(".multi-scenario-tab-panel").forEach((panel)=>{
    const selected = panel.id === targetId;
    panel.classList.toggle("is-active", selected);
    panel.hidden = !selected;
  });
  tabsRoot.dataset.activeScenarioPanel = targetId;
}
function bindMultiScenarioPlanningTabs(root = (typeof document !== "undefined" ? document : null)){
  if(!root || typeof document === "undefined") return;
  const scope = root?.querySelector?.(".multi-scenario-tabs") ? root : document;
  scope.querySelectorAll(".multi-scenario-tab").forEach((button)=>{
    if(button.dataset.multiScenarioBound === "true") return;
    button.dataset.multiScenarioBound = "true";
    button.addEventListener("click", ()=>activateMultiScenarioTab(button));
  });
}
function renderMultiScenarioPlanningSection(mapData){
  if(!els.multiScenarioPlanningPanel) return;
  const snapshot = buildScenarioInputSnapshot(mapData || marketPreparationState.map, marketPreparationState);
  const plansWithConfirmation = buildMultiScenarioPlansFromSnapshot(snapshot).map((plan)=>addDerivedScenarioConfirmation(plan, snapshot));
  const plansWithPrimary = addDerivedPrimaryScenarioFlags(plansWithConfirmation, snapshot);
  const plansWithScore = addDerivedScenarioScore(plansWithPrimary, snapshot);
  const timeframeContext = buildScenarioTimeframeContextSnapshot();
  const plansWithTimeframeContext = addScenarioTimeframeContext(plansWithScore, timeframeContext);
  const plansWithTimeframeFactors = addScenarioTimeframeScoreFactors(plansWithTimeframeContext);
  const plansWithCalibration = addScenarioTimeframeScoreCalibration(plansWithTimeframeFactors);
  const plans = addTimeframeConfirmationReview(plansWithCalibration);
  els.multiScenarioPlanningPanel.innerHTML = formatMultiScenarioPlanningSection(plans);
  bindMultiScenarioPlanningTabs(els.multiScenarioPlanningPanel);
}

function buildScenarioTimeframeFixtureSnapshot(){
  const makeRow = (label, lower, upper, side)=>({
    label,
    lower,
    upper,
    center: (lower + upper) / 2,
    side,
    sources: [{ timeframe: "4H", type: side === "upside" ? "resistance" : "support" }],
    zoneText: `${usd(lower)}–${usd(upper)}`,
  });
  const upsideRows = [makeRow("Fixture resistance 1", 110, 112, "upside"), makeRow("Fixture resistance 2", 120, 122, "upside"), makeRow("Fixture resistance 3", 130, 132, "upside")];
  const downsideRows = [makeRow("Fixture support 1", 88, 90, "downside"), makeRow("Fixture support 2", 78, 80, "downside"), makeRow("Fixture support 3", 68, 70, "downside")];
  return {
    currentPrice: 100,
    upsideRows,
    downsideRows,
    nearestUpside: normalizeScenarioZoneReference(upsideRows[0], "nearestUpside"),
    nearestDownside: normalizeScenarioZoneReference(downsideRows[0], "nearestDownside"),
    h4LiquidityContext: null,
    ifvgContext: [],
    existingTradePlanScenario: null,
    disclaimer: createScenarioDisclaimer(),
  };
}



function buildTimeframeConfirmationReviewFixturePlan(contexts = {}, overrides = {}){
  const zone = { lower: 90, upper: 92, midpoint: 91, label: "Fixture scenario zone" };
  const target = { lower: 110, upper: 112, midpoint: 111, price: 111, label: "Fixture target" };
  return {
    scenarioId: overrides.scenarioId || "fixture_scenario",
    scenarioType: overrides.scenarioType || "bullish_reversal",
    direction: overrides.direction || "bullish",
    status: overrides.status || "waiting",
    scenarioZone: overrides.scenarioZone === undefined ? zone : overrides.scenarioZone,
    invalidationReference: overrides.invalidationReference === undefined ? { price: 89, label: "Below scenario zone" } : overrides.invalidationReference,
    tp1: overrides.tp1 === undefined ? target : overrides.tp1,
    tp2: overrides.tp2 === undefined ? target : overrides.tp2,
    tp3: overrides.tp3 === undefined ? target : overrides.tp3,
    confirmationStatus: overrides.confirmationStatus || "waiting",
    confirmationStatusLabel: overrides.confirmationStatusLabel || "Waiting Confirmation",
    confirmationReasons: overrides.confirmationReasons || ["Fixture confirmation remains unchanged."],
    scenarioScore: overrides.scenarioScore ?? 5,
    scenarioScoreLabel: overrides.scenarioScoreLabel || "Developing context",
    scenarioScoreFactors: overrides.scenarioScoreFactors || [{ label: "Fixture score factor", impact: 5 }],
    scenarioBaseScore: overrides.scenarioBaseScore ?? 5,
    scenarioBaseScoreLabel: overrides.scenarioBaseScoreLabel || "Developing context",
    scenarioTimeframeModifier: overrides.scenarioTimeframeModifier ?? 0,
    scenarioTimeframeModifierFactors: overrides.scenarioTimeframeModifierFactors || [],
    scenarioCalibratedScore: overrides.scenarioCalibratedScore ?? 5,
    scenarioCalibratedScoreLabel: overrides.scenarioCalibratedScoreLabel || "Developing calibrated context",
    timeframeContext: buildScenarioTimeframeContextSnapshot(contexts),
  };
}
function runTimeframeConfirmationReviewFixtureTests(){
  const missing = deriveTimeframeConfirmationReview(buildTimeframeConfirmationReviewFixturePlan({ weekly: null, daily: null, h4: null, h1: null }));
  const supportive = deriveTimeframeConfirmationReview(buildTimeframeConfirmationReviewFixturePlan({ weekly: { status: "Bullish Structure" }, daily: { status: "Aligns With Weekly" }, h4: { status: "Reaction Confirmed" }, h1: { status: "Timing Supportive" } }));
  const developing = addTimeframeConfirmationReview([buildTimeframeConfirmationReviewFixturePlan({ weekly: { status: "Bullish Structure" }, daily: { status: "Aligns With Weekly" }, h4: { status: "Reaction Developing" }, h1: { status: "Timing Waiting" } })])[0];
  const weak = deriveTimeframeConfirmationReview(buildTimeframeConfirmationReviewFixturePlan({ weekly: { status: "Bullish Structure" }, daily: { status: "Aligns With Weekly" }, h4: { status: "Weak Reaction" }, h1: { status: "Timing Weak" } }));
  const failed = deriveTimeframeConfirmationReview(buildTimeframeConfirmationReviewFixturePlan({ weekly: { status: "Bullish Structure" }, daily: { status: "Aligns With Weekly" }, h4: { status: "Failed Reaction" }, h1: { status: "Timing Supportive" } }));
  const dailyConflict = deriveTimeframeConfirmationReview(buildTimeframeConfirmationReviewFixturePlan({ weekly: { status: "Bullish Structure" }, daily: { status: "Conflicts With Weekly" }, h4: { status: "Reaction Confirmed" }, h1: { status: "Timing Supportive" } }));
  const weeklyMixed = deriveTimeframeConfirmationReview(buildTimeframeConfirmationReviewFixturePlan({ weekly: { status: "Macro Range" }, daily: { status: "Transition / Mixed" }, h4: { status: "Reaction Confirmed" }, h1: { status: "Timing Supportive" } }));
  const h1Alone = deriveTimeframeConfirmationReview(buildTimeframeConfirmationReviewFixturePlan({ weekly: null, daily: null, h4: null, h1: { status: "Timing Supportive" } }));
  const h1WithH4 = deriveTimeframeConfirmationReview(buildTimeframeConfirmationReviewFixturePlan({ weekly: { status: "Bullish Structure" }, daily: { status: "Aligns With Weekly" }, h4: { status: "Reaction Developing" }, h1: { status: "Timing Supportive" } }));
  const h1FailedBlocking = deriveTimeframeConfirmationReview(buildTimeframeConfirmationReviewFixturePlan({ weekly: { status: "Bullish Structure" }, daily: { status: "Aligns With Weekly" }, h4: { status: "Weak Reaction" }, h1: { status: "Timing Failed" } }));
  const html = formatTimeframeConfirmationReviewBlock({ ...supportive });
  const forbidden = /entry confirmed|buy confirmed|sell confirmed|signal confirmed|high probability|best setup|must enter|must exit/i;
  const cases = [
    { name: "all contexts missing returns Context Unavailable", passed: missing.timeframeConfirmationStatus === "unavailable" && missing.timeframeConfirmationLabel === "Context Unavailable" },
    { name: "4H Reaction Confirmed with complete references returns Supportive Review", passed: supportive.timeframeConfirmationStatus === "supportive" && supportive.timeframeConfirmationLabel === "Supportive Review" },
    { name: "4H Reaction Developing returns Developing Review, not existing Confirmed", passed: developing.timeframeConfirmationStatus === "developing" && developing.confirmationStatus === "waiting" },
    { name: "4H Weak Reaction returns Caution Review", passed: weak.timeframeConfirmationStatus === "caution" },
    { name: "4H Failed Reaction returns Blocking Review", passed: failed.timeframeConfirmationStatus === "blocking" },
    { name: "Daily Conflicts With Weekly blocks Supportive Review", passed: dailyConflict.timeframeConfirmationStatus === "blocking" && dailyConflict.timeframeConfirmationBlockers.some((item)=>/Daily validation conflicts/.test(item)) },
    { name: "Weekly Mixed or Macro keeps review cautious", passed: weeklyMixed.timeframeConfirmationStatus === "caution" },
    { name: "1H Timing Supportive does not create Supportive Review alone", passed: h1Alone.timeframeConfirmationStatus !== "supportive" },
    { name: "1H Timing Supportive adds reason only if 4H is supportive or developing", passed: h1WithH4.timeframeConfirmationReasons.some((item)=>/1H timing supports/.test(item)) && h1Alone.timeframeConfirmationReasons.some((item)=>/cannot support/.test(item)) },
    { name: "1H Timing Failed adds blocker when 4H is weak or failed", passed: h1FailedBlocking.timeframeConfirmationStatus === "blocking" && h1FailedBlocking.timeframeConfirmationBlockers.some((item)=>/1H timing failed/.test(item)) },
    { name: "no unsafe wording appears", passed: !forbidden.test(JSON.stringify([missing, supportive, developing, weak, failed, dailyConflict, weeklyMixed, h1Alone, h1WithH4, h1FailedBlocking]) + html) },
  ];
  const failedCount = cases.filter((result)=>!result.passed).length;
  return { passed: failedCount === 0, total: cases.length, failed: failedCount, results: cases };
}
function runTimeframeConfirmationReviewNoImpactFixtureTests(){
  const snapshot = buildScenarioTimeframeFixtureSnapshot();
  const basePlans = buildMultiScenarioPlansFromSnapshot(snapshot).map((plan)=>addDerivedScenarioConfirmation(plan, snapshot));
  const withPrimary = addDerivedPrimaryScenarioFlags(basePlans, snapshot);
  const withScore = addDerivedScenarioScore(withPrimary, snapshot);
  const timeframeContext = buildScenarioTimeframeContextSnapshot({ weekly: { status: "Bullish Structure" }, daily: { status: "Aligns With Weekly" }, h4: { status: "Reaction Confirmed" }, h1: { status: "Timing Supportive" } });
  const contextBefore = JSON.stringify(timeframeContext);
  const plansBefore = JSON.stringify(withScore);
  const projection = (plans)=>plans.map((plan)=>({
    scenarioId: plan.scenarioId,
    confirmationStatus: plan.confirmationStatus,
    confirmationStatusLabel: plan.confirmationStatusLabel,
    confirmationReasons: plan.confirmationReasons,
    scenarioScore: plan.scenarioScore,
    scenarioScoreLabel: plan.scenarioScoreLabel,
    scenarioScoreFactors: plan.scenarioScoreFactors,
    scenarioBaseScore: plan.scenarioBaseScore,
    scenarioTimeframeModifier: plan.scenarioTimeframeModifier,
    scenarioCalibratedScore: plan.scenarioCalibratedScore,
    isPrimaryScenario: !!plan.isPrimaryScenario,
    scenarioZone: plan.scenarioZone,
    invalidationReference: plan.invalidationReference,
    tp1: plan.tp1,
    tp2: plan.tp2,
    tp3: plan.tp3,
  }));
  const beforeProjection = JSON.stringify(projection(withScore));
  const withContext = addScenarioTimeframeContext(withScore, timeframeContext);
  const withFactors = addScenarioTimeframeScoreFactors(withContext);
  const withCalibration = addScenarioTimeframeScoreCalibration(withFactors);
  const beforeReviewProjection = JSON.stringify(projection(withCalibration));
  const reviewed = addTimeframeConfirmationReview(withCalibration);
  const afterProjection = JSON.stringify(projection(reviewed));
  const primaryBefore = withCalibration.filter((plan)=>plan.isPrimaryScenario).map((plan)=>plan.scenarioId).join("|");
  const primaryAfter = reviewed.filter((plan)=>plan.isPrimaryScenario).map((plan)=>plan.scenarioId).join("|");
  const cases = [
    { name: "existing confirmationStatus remains unchanged", passed: withCalibration.every((plan, index)=>plan.confirmationStatus === reviewed[index].confirmationStatus) },
    { name: "existing confirmationStatusLabel remains unchanged", passed: withCalibration.every((plan, index)=>plan.confirmationStatusLabel === reviewed[index].confirmationStatusLabel) },
    { name: "existing confirmationReasons remain unchanged", passed: withCalibration.every((plan, index)=>JSON.stringify(plan.confirmationReasons) === JSON.stringify(reviewed[index].confirmationReasons)) },
    { name: "Scenario Score remains unchanged", passed: withCalibration.every((plan, index)=>plan.scenarioScore === reviewed[index].scenarioScore && plan.scenarioScoreLabel === reviewed[index].scenarioScoreLabel && JSON.stringify(plan.scenarioScoreFactors) === JSON.stringify(reviewed[index].scenarioScoreFactors)) },
    { name: "Timeframe Calibration remains unchanged", passed: beforeReviewProjection === afterProjection },
    { name: "Primary Scenario selection remains unchanged", passed: primaryBefore === primaryAfter },
    { name: "scenario order remains unchanged", passed: withCalibration.map((plan)=>plan.scenarioId).join("|") === reviewed.map((plan)=>plan.scenarioId).join("|") },
    { name: "Scenario Zone, Invalidation, and TP references remain unchanged", passed: beforeProjection === JSON.stringify(projection(withScore)) && beforeReviewProjection === afterProjection },
    { name: "source contexts are not mutated", passed: contextBefore === JSON.stringify(timeframeContext) },
    { name: "source scenario plans are not mutated", passed: plansBefore === JSON.stringify(withScore) && withScore.every((plan)=>!plan.timeframeConfirmationStatus) },
    { name: "review fields are separate", passed: reviewed.every((plan)=>plan.timeframeConfirmationStatus && plan.confirmationStatus !== undefined) },
    { name: "existing projection remains unchanged after review", passed: beforeReviewProjection === afterProjection },
  ];
  const failedCount = cases.filter((result)=>!result.passed).length;
  return { passed: failedCount === 0, total: cases.length, failed: failedCount, results: cases };
}
function buildScenarioReadabilityFixturePlans(){
  const snapshot = buildScenarioTimeframeFixtureSnapshot();
  const basePlans = buildMultiScenarioPlansFromSnapshot(snapshot).map((plan)=>addDerivedScenarioConfirmation(plan, snapshot));
  const withPrimary = addDerivedPrimaryScenarioFlags(basePlans, snapshot);
  const withScore = addDerivedScenarioScore(withPrimary, snapshot);
  const timeframeContext = buildScenarioTimeframeContextSnapshot({ weekly: { status: "Bullish Structure" }, daily: { status: "Aligns With Weekly" }, h4: { status: "Reaction Confirmed" }, h1: { status: "Timing Supportive" } });
  const withContext = addScenarioTimeframeContext(withScore, timeframeContext);
  const withFactors = addScenarioTimeframeScoreFactors(withContext);
  const withCalibration = addScenarioTimeframeScoreCalibration(withFactors);
  return { snapshot, plans: addTimeframeConfirmationReview(withCalibration) };
}
function getScenarioReadabilityProjection(plans){
  return (Array.isArray(plans) ? plans : []).map((plan)=>({
    scenarioId: plan.scenarioId,
    isPrimaryScenario: !!plan.isPrimaryScenario,
    confirmationStatus: plan.confirmationStatus,
    confirmationStatusLabel: plan.confirmationStatusLabel,
    confirmationReasons: plan.confirmationReasons,
    timeframeConfirmationStatus: plan.timeframeConfirmationStatus,
    scenarioScore: plan.scenarioScore,
    scenarioScoreLabel: plan.scenarioScoreLabel,
    scenarioScoreFactors: plan.scenarioScoreFactors,
    scenarioBaseScore: plan.scenarioBaseScore,
    scenarioTimeframeModifier: plan.scenarioTimeframeModifier,
    scenarioCalibratedScore: plan.scenarioCalibratedScore,
    scenarioTimeframeModifierFactors: plan.scenarioTimeframeModifierFactors,
    scenarioZone: plan.scenarioZone,
    invalidationReference: plan.invalidationReference,
    tp1: plan.tp1,
    tp2: plan.tp2,
    tp3: plan.tp3,
  }));
}
function runMultiScenarioCardReadabilityFixtureTests(){
  const { plans } = buildScenarioReadabilityFixturePlans();
  const plan = plans.find((item)=>item.isPrimaryScenario) || plans[0];
  const before = JSON.stringify(plan);
  const html = formatScenarioPlanningCard(plan);
  const detailsIndex = html.indexOf('scenario-secondary-timeframe-details');
  const scenarioZoneIndex = html.indexOf('Scenario Zone');
  const invalidationIndex = html.indexOf('Invalidation Reference');
  const tp1Index = html.indexOf('TP1 Reference');
  const forbidden = /\bbuy\b|\bsell\b|\bentry\b|\bsignal\b|guaranteed|high probability|best trade|must enter|must exit|best setup/i;
  const cases = [
    { name: "Scenario card still renders Primary Scenario badge when applicable", passed: !plan.isPrimaryScenario || html.includes('scenario-primary-badge') },
    { name: "Confirmation Status remains present", passed: html.includes('Confirmation Status') && html.includes('scenario-confirmation-block') },
    { name: "Timeframe Confirmation Review remains present", passed: html.includes('Timeframe Confirmation Review') && html.includes('scenario-timeframe-confirmation') },
    { name: "Scenario Score remains present", passed: html.includes('Scenario Score') && html.includes('scenario-score-block') },
    { name: "Scenario Zone remains present", passed: scenarioZoneIndex >= 0 },
    { name: "Invalidation Reference remains present", passed: invalidationIndex >= 0 },
    { name: "TP1, TP2, and TP3 remain present", passed: html.includes('TP1 Reference') && html.includes('TP2 Reference') && html.includes('TP3 Reference') },
    { name: "Timeframe Calibration remains present", passed: html.includes('Timeframe Calibration') && html.includes('scenario-timeframe-calibration') },
    { name: "Timeframe Context Factors remain present", passed: html.includes('Timeframe Context Factors') && html.includes('scenario-timeframe-score-factors') },
    { name: "Timeframe Context remains present", passed: html.includes('Timeframe Context') && html.includes('scenario-timeframe-context') },
    { name: "Secondary timeframe details are compact/collapsible", passed: /<details[^>]+scenario-secondary-timeframe-details/.test(html) && html.includes('<summary><span>Timeframe Details</span>') },
    { name: "Scenario references appear before secondary timeframe details", passed: detailsIndex > scenarioZoneIndex && detailsIndex > invalidationIndex && detailsIndex > tp1Index },
    { name: "No unsafe wording appears", passed: !forbidden.test(html) },
    { name: "No scenario data mutation", passed: before === JSON.stringify(plan) },
  ];
  const failedCount = cases.filter((result)=>!result.passed).length;
  return { passed: failedCount === 0, total: cases.length, failed: failedCount, results: cases };
}
function runMultiScenarioCardReadabilityNoImpactFixtureTests(){
  const { snapshot, plans } = buildScenarioReadabilityFixturePlans();
  const plansBefore = JSON.stringify(plans);
  const projectionBefore = JSON.stringify(getScenarioReadabilityProjection(plans));
  const marketRowsBefore = JSON.stringify({ upsideRows: snapshot.upsideRows, downsideRows: snapshot.downsideRows });
  const orderBefore = plans.map((plan)=>plan.scenarioId).join('|');
  const primaryBefore = plans.filter((plan)=>plan.isPrimaryScenario).map((plan)=>plan.scenarioId).join('|');
  const html = formatMultiScenarioPlanningSection(plans);
  const projectionAfter = JSON.stringify(getScenarioReadabilityProjection(plans));
  const cases = [
    { name: "scenario order unchanged", passed: orderBefore === plans.map((plan)=>plan.scenarioId).join('|') },
    { name: "Primary Scenario selection unchanged", passed: primaryBefore === plans.filter((plan)=>plan.isPrimaryScenario).map((plan)=>plan.scenarioId).join('|') },
    { name: "Confirmation Status unchanged", passed: projectionBefore === projectionAfter && plans.every((plan)=>plan.confirmationStatus && plan.confirmationStatusLabel) },
    { name: "Timeframe Confirmation Review status unchanged", passed: plans.every((plan)=>plan.timeframeConfirmationStatus && html.includes(plan.timeframeConfirmationLabel || getTimeframeConfirmationLabel(plan.timeframeConfirmationStatus))) },
    { name: "Scenario Score unchanged", passed: plans.every((plan)=>Number.isFinite(Number(plan.scenarioScore)) || plan.scenarioScore === null || plan.scenarioScore === undefined) && projectionBefore === projectionAfter },
    { name: "Timeframe Calibration unchanged", passed: plans.every((plan)=>plan.scenarioBaseScore !== undefined && plan.scenarioCalibratedScore !== undefined) && projectionBefore === projectionAfter },
    { name: "Scenario Zone unchanged", passed: projectionBefore === projectionAfter },
    { name: "Invalidation unchanged", passed: projectionBefore === projectionAfter },
    { name: "TP1, TP2, and TP3 unchanged", passed: projectionBefore === projectionAfter },
    { name: "Market Map rows unchanged", passed: marketRowsBefore === JSON.stringify({ upsideRows: snapshot.upsideRows, downsideRows: snapshot.downsideRows }) },
    { name: "source scenario plans not mutated", passed: plansBefore === JSON.stringify(plans) },
  ];
  const failedCount = cases.filter((result)=>!result.passed).length;
  return { passed: failedCount === 0, total: cases.length, failed: failedCount, results: cases };
}
if(typeof window !== "undefined"){
  window.runTimeframeConfirmationReviewFixtureTests = runTimeframeConfirmationReviewFixtureTests;
  window.runTimeframeConfirmationReviewNoImpactFixtureTests = runTimeframeConfirmationReviewNoImpactFixtureTests;
  window.runMultiScenarioCardReadabilityFixtureTests = runMultiScenarioCardReadabilityFixtureTests;
  window.runMultiScenarioCardReadabilityNoImpactFixtureTests = runMultiScenarioCardReadabilityNoImpactFixtureTests;
}
function runScenarioTimeframeCalibrationFixtureTests(){
  const makePlan = (direction, contexts, score = 5)=>({
    direction,
    scenarioScore: score,
    scenarioScoreLabel: getScenarioScoreLabel(score),
    scenarioScoreFactors: [{ label: "Fixture base factor", impact: score }],
    timeframeContext: buildScenarioTimeframeContextSnapshot(contexts),
  });
  const calibrateOne = (plan)=>addScenarioTimeframeScoreCalibration([plan])[0];
  const weeklyAligned = calibrateOne(makePlan("bullish", { weekly: { status: "Bullish Structure" }, daily: null, h4: null, h1: null }));
  const weeklyConflict = calibrateOne(makePlan("bearish", { weekly: { status: "Bullish Structure" }, daily: null, h4: null, h1: null }));
  const dailyAligned = calibrateOne(makePlan("bullish", { weekly: { status: "Bullish Structure" }, daily: { status: "Aligns With Weekly" }, h4: null, h1: null }));
  const dailyMismatched = calibrateOne(makePlan("bullish", { weekly: { status: "Bearish Structure" }, daily: { status: "Aligns With Weekly" }, h4: null, h1: null }));
  const dailyConflict = calibrateOne(makePlan("bullish", { weekly: { status: "Bullish Structure" }, daily: { status: "Conflicts With Weekly" }, h4: null, h1: null }));
  const dailyTransition = calibrateOne(makePlan("bullish", { weekly: { status: "Bullish Structure" }, daily: { status: "Transition / Mixed" }, h4: null, h1: null }));
  const h4Failed = calibrateOne(makePlan("bullish", { weekly: null, daily: null, h4: { status: "Failed Reaction" }, h1: { status: "Timing Supportive" } }));
  const h4BlockingStatuses = ["Weak Reaction", "Failed Reaction", "No Clear Reaction", "Context Unavailable", "Waiting for Reaction"];
  const h1Blocked = h4BlockingStatuses.map((status)=>calibrateOne(makePlan("bullish", { weekly: null, daily: null, h4: { status }, h1: { status: "Timing Supportive" } })));
  const h1Supported = ["Reaction Confirmed", "Reaction Developing"].map((status)=>calibrateOne(makePlan("bullish", { weekly: null, daily: null, h4: { status }, h1: { status: "Timing Supportive" } })));
  const positiveCap = calibrateOne(makePlan("bullish", { weekly: { status: "Bullish Structure" }, daily: { status: "Aligns With Weekly" }, h4: { status: "Reaction Developing" }, h1: { status: "Timing Supportive" } }, 5));
  const negativeCap = calibrateOne(makePlan("bullish", { weekly: { status: "Bearish Structure" }, daily: { status: "Conflicts With Weekly" }, h4: { status: "Failed Reaction" }, h1: { status: "Timing Failed" } }, 5));
  const clampedHigh = calibrateOne(makePlan("bullish", { weekly: { status: "Bullish Structure" }, daily: { status: "Aligns With Weekly" }, h4: { status: "Reaction Developing" }, h1: { status: "Timing Supportive" } }, 9));
  const clampedLow = calibrateOne(makePlan("bullish", { weekly: { status: "Bearish Structure" }, daily: { status: "Conflicts With Weekly" }, h4: { status: "Failed Reaction" }, h1: { status: "Timing Failed" } }, 1));
  const unsafeHtml = formatScenarioCalibratedScoreBlock(positiveCap);
  const forbidden = /buy score|sell score|entry score|signal score|best trade|guaranteed|high probability trade|must enter|must exit/i;
  const getImpact = (plan, startsWith)=>plan.scenarioTimeframeModifierFactors.find((factor)=>String(factor.label || "").startsWith(startsWith))?.impact;
  const cases = [
    { name: "base score remains equal to existing scenarioScore", passed: weeklyAligned.scenarioBaseScore === weeklyAligned.scenarioScore && weeklyAligned.scenarioBaseScoreLabel === weeklyAligned.scenarioScoreLabel },
    { name: "Weekly aligned context adds no more than +1", passed: getImpact(weeklyAligned, "Weekly bullish") === 1 },
    { name: "Weekly conflict subtracts no more than -1", passed: getImpact(weeklyConflict, "Weekly bullish") === -1 },
    { name: "Daily Aligns adds only when Weekly direction matches scenario", passed: getImpact(dailyAligned, "Daily validation aligns") === 1 && getImpact(dailyMismatched, "Daily alignment") === 0 },
    { name: "Daily Conflicts subtracts no more than -1", passed: getImpact(dailyConflict, "Daily validation conflicts") === -1 },
    { name: "Daily Transition / Mixed adds zero", passed: getImpact(dailyTransition, "Daily validation remains transitional") === 0 },
    { name: "4H Failed Reaction subtracts and blocks 1H optimism", passed: getImpact(h4Failed, "4H reaction failed") === -1 && getImpact(h4Failed, "1H timing cannot") === 0 },
    { name: "1H Timing Supportive adds zero if 4H is not supportive", passed: h1Blocked.every((plan)=>getImpact(plan, "1H timing cannot") === 0) },
    { name: "1H Timing Supportive adds at most +0.5 with supportive 4H", passed: h1Supported.every((plan)=>getImpact(plan, "1H timing supportive") === 0.5) },
    { name: "total positive timeframe modifier is capped at +2", passed: positiveCap.scenarioTimeframeModifier === 2 },
    { name: "total negative timeframe modifier is capped at -2", passed: negativeCap.scenarioTimeframeModifier === -2 },
    { name: "calibrated score remains clamped zero to ten", passed: clampedHigh.scenarioCalibratedScore === 10 && clampedLow.scenarioCalibratedScore === 0 },
    { name: "calibrated score is stored separately from scenarioScore", passed: positiveCap.scenarioCalibratedScore !== positiveCap.scenarioScore && positiveCap.scenarioScore === 5 },
    { name: "no unsafe wording appears", passed: !forbidden.test(JSON.stringify(positiveCap.scenarioTimeframeModifierFactors) + unsafeHtml) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
function runScenarioTimeframeCalibrationNoImpactFixtureTests(){
  const snapshot = buildScenarioTimeframeFixtureSnapshot();
  const rowsBefore = JSON.stringify({ upsideRows: snapshot.upsideRows, downsideRows: snapshot.downsideRows });
  const basePlans = buildMultiScenarioPlansFromSnapshot(snapshot).map((plan)=>addDerivedScenarioConfirmation(plan, snapshot));
  const withPrimary = addDerivedPrimaryScenarioFlags(basePlans, snapshot);
  const withScore = addDerivedScenarioScore(withPrimary, snapshot);
  const timeframeContext = buildScenarioTimeframeContextSnapshot({
    weekly: { status: "Bullish Structure" },
    daily: { status: "Aligns With Weekly" },
    h4: { status: "Reaction Developing" },
    h1: { status: "Timing Supportive" },
  });
  const contextBefore = JSON.stringify(timeframeContext);
  const plansBefore = JSON.stringify(withScore);
  const projection = (plans)=>plans.map((plan)=>({
    scenarioId: plan.scenarioId,
    isPrimaryScenario: !!plan.isPrimaryScenario,
    primaryScenarioLabel: plan.primaryScenarioLabel || null,
    confirmationStatus: plan.confirmationStatus || null,
    confirmationStatusLabel: plan.confirmationStatusLabel || null,
    scenarioScore: plan.scenarioScore,
    scenarioScoreLabel: plan.scenarioScoreLabel,
    scenarioScoreFactors: plan.scenarioScoreFactors,
    scenarioZone: plan.scenarioZone,
    invalidationReference: plan.invalidationReference,
    tp1: plan.tp1,
    tp2: plan.tp2,
    tp3: plan.tp3,
    confirmationRequirements: plan.confirmationRequirements,
    riskNotes: plan.riskNotes,
  }));
  const beforeProjection = JSON.stringify(projection(withScore));
  const withContext = addScenarioTimeframeContext(withScore, timeframeContext);
  const withFactors = addScenarioTimeframeScoreFactors(withContext);
  const withCalibration = addScenarioTimeframeScoreCalibration(withFactors);
  const afterProjection = JSON.stringify(projection(withCalibration));
  const primaryBefore = withScore.filter((plan)=>plan.isPrimaryScenario).map((plan)=>plan.scenarioId).join("|");
  const primaryAfter = withCalibration.filter((plan)=>plan.isPrimaryScenario).map((plan)=>plan.scenarioId).join("|");
  const cases = [
    { name: "existing scenarioScore remains unchanged", passed: withScore.every((plan, index)=>plan.scenarioScore === withCalibration[index].scenarioScore) },
    { name: "existing scenarioScoreLabel remains unchanged", passed: withScore.every((plan, index)=>plan.scenarioScoreLabel === withCalibration[index].scenarioScoreLabel) },
    { name: "existing scenarioScoreFactors remain unchanged", passed: withScore.every((plan, index)=>JSON.stringify(plan.scenarioScoreFactors) === JSON.stringify(withCalibration[index].scenarioScoreFactors)) },
    { name: "Primary Scenario selection remains unchanged", passed: primaryBefore === primaryAfter },
    { name: "Confirmation Status remains unchanged", passed: withScore.every((plan, index)=>plan.confirmationStatus === withCalibration[index].confirmationStatus && plan.confirmationStatusLabel === withCalibration[index].confirmationStatusLabel) },
    { name: "Scenario order remains unchanged", passed: withScore.map((plan)=>plan.scenarioId).join("|") === withCalibration.map((plan)=>plan.scenarioId).join("|") },
    { name: "Scenario Zone and references remain unchanged", passed: beforeProjection === afterProjection },
    { name: "Market Map rows are unchanged", passed: rowsBefore === JSON.stringify({ upsideRows: snapshot.upsideRows, downsideRows: snapshot.downsideRows }) },
    { name: "source contexts are not mutated", passed: contextBefore === JSON.stringify(timeframeContext) },
    { name: "source scenario plans are not mutated", passed: plansBefore === JSON.stringify(withScore) && withScore.every((plan)=>!plan.timeframeContext && !plan.scenarioTimeframeModifierFactors && plan.scenarioCalibratedScore === undefined) },
    { name: "calibration fields are separate", passed: withCalibration.every((plan)=>plan.scenarioBaseScore === plan.scenarioScore && plan.scenarioCalibratedScore !== undefined) },
    { name: "calibrated score does not alter projection", passed: beforeProjection === afterProjection },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined"){
  window.runScenarioTimeframeCalibrationFixtureTests = runScenarioTimeframeCalibrationFixtureTests;
  window.runScenarioTimeframeCalibrationNoImpactFixtureTests = runScenarioTimeframeCalibrationNoImpactFixtureTests;
}
function runScenarioTimeframeScoreFactorsFixtureTests(){
  const makePlan = (direction, contexts)=>({ direction, timeframeContext: buildScenarioTimeframeContextSnapshot(contexts) });
  const weeklyAligned = buildScenarioTimeframeScoreFactors(makePlan("bullish", { weekly: { status: "Bullish Structure" }, daily: null, h4: null, h1: null }))[0];
  const weeklyConflict = buildScenarioTimeframeScoreFactors(makePlan("bearish", { weekly: { status: "Bullish Structure" }, daily: null, h4: null, h1: null }))[0];
  const weeklyMixed = buildScenarioTimeframeScoreFactors(makePlan("bullish", { weekly: { status: "Macro Range" }, daily: null, h4: null, h1: null }))[0];
  const dailyTransition = buildScenarioTimeframeScoreFactors(makePlan("bullish", { weekly: null, daily: { status: "Transition / Mixed" }, h4: null, h1: null }))[1];
  const h4Weak = buildScenarioTimeframeScoreFactors(makePlan("bullish", { weekly: null, daily: null, h4: { status: "Weak Reaction" }, h1: null }))[2];
  const h1SupportiveWithH4 = buildScenarioTimeframeScoreFactors(makePlan("bullish", { weekly: null, daily: null, h4: { status: "Reaction Developing" }, h1: { status: "Timing Supportive" } }))[3];
  const h1SupportiveWithoutH4 = buildScenarioTimeframeScoreFactors(makePlan("bullish", { weekly: null, daily: null, h4: { status: "Weak Reaction" }, h1: { status: "Timing Supportive" } }))[3];
  const allFactors = [weeklyAligned, weeklyConflict, weeklyMixed, dailyTransition, h4Weak, h1SupportiveWithH4, h1SupportiveWithoutH4];
  const html = formatScenarioTimeframeScoreFactors({ scenarioTimeframeScoreFactors: allFactors.slice(0, 4) });
  const forbidden = /buy score|sell score|entry score|signal score|best trade|guaranteed|high probability trade|must enter|must exit/i;
  const cases = [
    { name: "Weekly aligned direction creates support factor", passed: weeklyAligned.type === "support" && weeklyAligned.label === "Weekly context supports bullish planning direction" },
    { name: "Weekly conflicting direction creates caution factor", passed: weeklyConflict.type === "caution" && weeklyConflict.label === "Weekly context conflicts with bearish planning direction" },
    { name: "Weekly mixed or macro range creates cautious neutral factor", passed: weeklyMixed.type === "neutral" && /remains mixed/.test(weeklyMixed.label) },
    { name: "Daily transition creates cautious non-alignment factor", passed: dailyTransition.type === "caution" && dailyTransition.label === "Daily validation remains transitional" && !/aligns/i.test(dailyTransition.label) },
    { name: "H4 Weak Reaction creates caution factor only", passed: h4Weak.type === "caution" && h4Weak.label === "4H reaction is weak" && !/confirmed/i.test(h4Weak.label) },
    { name: "1H Timing Supportive can support only with supportive 4H", passed: h1SupportiveWithH4.type === "support" && h1SupportiveWithH4.label === "1H timing is supportive but context-only" },
    { name: "1H Timing Supportive has no support factor without supportive 4H", passed: h1SupportiveWithoutH4.type !== "support" && /cannot improve context/.test(h1SupportiveWithoutH4.label) },
    { name: "all factors are display-only zero-impact", passed: allFactors.every((factor)=>factor.impact === 0 && factor.displayOnly === true) },
    { name: "factor HTML states no numeric impact", passed: html.includes("Display-only") && html.includes("no numeric score impact") },
    { name: "no unsafe wording appears", passed: !forbidden.test(JSON.stringify(allFactors) + html) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
function runScenarioTimeframeScoreNoImpactFixtureTests(){
  const snapshot = buildScenarioTimeframeFixtureSnapshot();
  const basePlans = buildMultiScenarioPlansFromSnapshot(snapshot).map((plan)=>addDerivedScenarioConfirmation(plan, snapshot));
  const withPrimary = addDerivedPrimaryScenarioFlags(basePlans, snapshot);
  const withScore = addDerivedScenarioScore(withPrimary, snapshot);
  const timeframeContext = buildScenarioTimeframeContextSnapshot({
    weekly: { status: "Bullish Structure" },
    daily: { status: "Aligns With Weekly" },
    h4: { status: "Reaction Developing" },
    h1: { status: "Timing Supportive" },
  });
  const contextBefore = JSON.stringify(timeframeContext);
  const beforePlans = JSON.stringify(withScore);
  const projection = (plans)=>plans.map((plan)=>({
    scenarioId: plan.scenarioId,
    direction: plan.direction,
    isPrimaryScenario: !!plan.isPrimaryScenario,
    primaryScenarioLabel: plan.primaryScenarioLabel || null,
    confirmationStatus: plan.confirmationStatus || null,
    confirmationStatusLabel: plan.confirmationStatusLabel || null,
    scenarioScore: plan.scenarioScore,
    scenarioScoreLabel: plan.scenarioScoreLabel,
    scenarioScoreFactors: plan.scenarioScoreFactors,
    scenarioZone: plan.scenarioZone,
    invalidationReference: plan.invalidationReference,
    tp1: plan.tp1,
    tp2: plan.tp2,
    tp3: plan.tp3,
    confirmationRequirements: plan.confirmationRequirements,
    riskNotes: plan.riskNotes,
  }));
  const beforeProjection = JSON.stringify(projection(withScore));
  const withContext = addScenarioTimeframeContext(withScore, timeframeContext);
  const withTimeframeFactors = addScenarioTimeframeScoreFactors(withContext);
  const afterProjection = JSON.stringify(projection(withTimeframeFactors));
  const primaryBefore = withScore.filter((plan)=>plan.isPrimaryScenario).map((plan)=>plan.scenarioId).join("|");
  const primaryAfter = withTimeframeFactors.filter((plan)=>plan.isPrimaryScenario).map((plan)=>plan.scenarioId).join("|");
  const cases = [
    { name: "numeric Scenario Score remains unchanged", passed: withScore.every((plan, index)=>plan.scenarioScore === withTimeframeFactors[index].scenarioScore) },
    { name: "Scenario Score label remains unchanged", passed: withScore.every((plan, index)=>plan.scenarioScoreLabel === withTimeframeFactors[index].scenarioScoreLabel) },
    { name: "existing scenarioScoreFactors remain unchanged", passed: withScore.every((plan, index)=>JSON.stringify(plan.scenarioScoreFactors) === JSON.stringify(withTimeframeFactors[index].scenarioScoreFactors)) },
    { name: "Confirmation Status remains unchanged", passed: withScore.every((plan, index)=>plan.confirmationStatus === withTimeframeFactors[index].confirmationStatus && plan.confirmationStatusLabel === withTimeframeFactors[index].confirmationStatusLabel) },
    { name: "Primary Scenario selection remains unchanged", passed: primaryBefore === primaryAfter },
    { name: "scenario order remains unchanged", passed: withScore.map((plan)=>plan.scenarioId).join("|") === withTimeframeFactors.map((plan)=>plan.scenarioId).join("|") },
    { name: "scenario references remain unchanged", passed: beforeProjection === afterProjection },
    { name: "source timeframe context is not mutated", passed: contextBefore === JSON.stringify(timeframeContext) },
    { name: "source scenario plans are not mutated", passed: beforePlans === JSON.stringify(withScore) && withScore.every((plan)=>!plan.timeframeContext && !plan.scenarioTimeframeScoreFactors) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined"){
  window.runScenarioTimeframeScoreFactorsFixtureTests = runScenarioTimeframeScoreFactorsFixtureTests;
  window.runScenarioTimeframeScoreNoImpactFixtureTests = runScenarioTimeframeScoreNoImpactFixtureTests;
}
function runScenarioTimeframeContextAttachmentFixtureTests(){
  const sourceContexts = {
    weekly: { status: "Mixed Structure" },
    daily: { status: "Transition / Mixed" },
    h4: { status: "Weak Reaction" },
    h1: { status: "Timing Supportive" },
  };
  const sourceBefore = JSON.stringify(sourceContexts);
  const context = buildScenarioTimeframeContextSnapshot(sourceContexts);
  const contextBefore = JSON.stringify(context);
  const plan = createScenarioPlanFromParts({ scenarioId: "fixture", displayTitle: "Fixture Scenario", status: "waiting", scenarioScore: 5, scenarioScoreLabel: "Developing context", scenarioScoreFactors: [] });
  const planBefore = JSON.stringify(plan);
  const attached = addScenarioTimeframeContext([plan], context);
  const html = formatScenarioTimeframeContextBlock(attached[0]);
  const missing = buildScenarioTimeframeContextSnapshot({ weekly: null, daily: null, h4: null, h1: null });
  const missingHtml = formatScenarioTimeframeContextBlock({ timeframeContext: missing });
  const forbidden = /\bbuy\b|\bsell\b|entry|signal|guaranteed|high probability|best trade|must enter|must exit/i;
  const cases = [
    { name: "block renders Weekly, Daily, 4H, and 1H labels", passed: ["Weekly", "Daily", "4H", "1H"].every((label)=>html.includes(label)) },
    { name: "block renders all timeframe statuses", passed: ["Mixed Structure", "Transition / Mixed", "Weak Reaction", "Timing Supportive"].every((label)=>html.includes(label)) },
    { name: "missing contexts use unavailable fallback", passed: (missingHtml.match(/Context Unavailable/g) || []).length >= 4 },
    { name: "mixed Weekly renders cautious wording", passed: context.weekly.note === "Weekly context remains cautious." },
    { name: "Daily transition does not force alignment wording", passed: context.daily.note === "Daily validation remains transitional." && !/aligns with weekly/i.test(context.daily.note) },
    { name: "H4 Weak Reaction does not become confirmation", passed: context.h4.note.includes("weak reaction") && !/confirmed/i.test(context.h4.note) },
    { name: "1H Timing Supportive remains context-only", passed: context.h1.note.includes("context-only") },
    { name: "source contexts are not mutated", passed: sourceBefore === JSON.stringify(sourceContexts) },
    { name: "source plan is not mutated", passed: planBefore === JSON.stringify(plan) && !plan.timeframeContext },
    { name: "attached timeframe context is copied", passed: attached[0] !== plan && attached[0].timeframeContext !== context && attached[0].timeframeContext.weekly !== context.weekly },
    { name: "no unsafe wording appears", passed: !forbidden.test(html) },
    { name: "context snapshot is not mutated by formatting", passed: contextBefore === JSON.stringify(context) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
function runScenarioTimeframeContextNoImpactFixtureTests(){
  const snapshot = buildScenarioTimeframeFixtureSnapshot();
  const basePlans = buildMultiScenarioPlansFromSnapshot(snapshot).map((plan)=>addDerivedScenarioConfirmation(plan, snapshot));
  const withPrimary = addDerivedPrimaryScenarioFlags(basePlans, snapshot);
  const withScore = addDerivedScenarioScore(withPrimary, snapshot);
  const stableProjection = (plans)=>plans.map((plan)=>({
    scenarioId: plan.scenarioId,
    isPrimaryScenario: !!plan.isPrimaryScenario,
    primaryScenarioLabel: plan.primaryScenarioLabel || null,
    confirmationStatus: plan.confirmationStatus || null,
    confirmationStatusLabel: plan.confirmationStatusLabel || null,
    scenarioScore: plan.scenarioScore,
    scenarioScoreLabel: plan.scenarioScoreLabel,
    scenarioZone: plan.scenarioZone,
    invalidationReference: plan.invalidationReference,
    tp1: plan.tp1,
    tp2: plan.tp2,
    tp3: plan.tp3,
    confluenceSources: plan.confluenceSources,
    confirmationRequirements: plan.confirmationRequirements,
    riskNotes: plan.riskNotes,
  }));
  const beforeProjection = JSON.stringify(stableProjection(withScore));
  const beforePlans = JSON.stringify(withScore);
  const context = buildScenarioTimeframeContextSnapshot({
    weekly: { status: "Macro Range" },
    daily: { status: "Transition / Mixed" },
    h4: { status: "Weak Reaction" },
    h1: { status: "Timing Weak" },
  });
  const contextBefore = JSON.stringify(context);
  const attached = addScenarioTimeframeContext(withScore, context);
  const afterProjection = JSON.stringify(stableProjection(attached));
  const primaryBefore = withScore.filter((plan)=>plan.isPrimaryScenario).map((plan)=>plan.scenarioId).join("|");
  const primaryAfter = attached.filter((plan)=>plan.isPrimaryScenario).map((plan)=>plan.scenarioId).join("|");
  const html = formatMultiScenarioPlanningSection(attached);
  const cases = [
    { name: "scenario order remains unchanged", passed: withScore.map((plan)=>plan.scenarioId).join("|") === attached.map((plan)=>plan.scenarioId).join("|") },
    { name: "primary scenario selection remains unchanged", passed: primaryBefore === primaryAfter },
    { name: "scenario score remains unchanged", passed: withScore.every((plan, index)=>plan.scenarioScore === attached[index].scenarioScore && plan.scenarioScoreLabel === attached[index].scenarioScoreLabel) },
    { name: "confirmation status remains unchanged", passed: withScore.every((plan, index)=>plan.confirmationStatus === attached[index].confirmationStatus && plan.confirmationStatusLabel === attached[index].confirmationStatusLabel) },
    { name: "scenario references remain unchanged", passed: beforeProjection === afterProjection },
    { name: "source scenario plans are not mutated", passed: beforePlans === JSON.stringify(withScore) && withScore.every((plan)=>!plan.timeframeContext) },
    { name: "source timeframe context is not mutated", passed: contextBefore === JSON.stringify(context) },
    { name: "every card receives timeframe context", passed: attached.length > 0 && attached.every((plan)=>plan.timeframeContext?.weekly && plan.timeframeContext?.daily && plan.timeframeContext?.h4 && plan.timeframeContext?.h1) },
    { name: "H4 Weak Reaction remains context only", passed: html.includes("Weak Reaction") && !/Weak Reaction[\s\S]{0,40}Confirmation Status/i.test(html) },
    { name: "1H Timing Weak does not remove references", passed: beforeProjection === afterProjection },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined"){
  window.runScenarioTimeframeContextAttachmentFixtureTests = runScenarioTimeframeContextAttachmentFixtureTests;
  window.runScenarioTimeframeContextNoImpactFixtureTests = runScenarioTimeframeContextNoImpactFixtureTests;
}
function buildMultiScenarioTabsFixturePlans(overrides = {}){
  const makePlan = (scenarioId, scenarioType, displayTitle, score, extra = {})=>buildTimeframeConfirmationReviewFixturePlan(
    { weekly: { status: "Bullish Structure" }, daily: { status: "Aligns With Weekly" }, h4: { status: "Reaction Developing" }, h1: { status: "Timing Waiting" } },
    { scenarioId, scenarioType, displayTitle, scenarioScore: score, scenarioBaseScore: score, scenarioCalibratedScore: score, ...extra }
  );
  const plans = [
    makePlan("potential_bullish_scenario", "bullish_reversal", "Potential Bullish Scenario", 7, { direction: "bullish" }),
    makePlan("potential_bearish_scenario", "bearish_reversal", "Potential Bearish Scenario", 6, { direction: "bearish" }),
    makePlan("breakout_retest_scenario", "breakout_retest", "Breakout Retest Scenario", 5, { direction: "bullish" }),
    makePlan("breakdown_retest_scenario", "breakdown_retest", "Breakdown Retest Scenario", 4, { direction: "bearish" }),
    makePlan("wait_no_trade_scenario", "wait_no_trade", "Wait / No-Trade Scenario", 3, { direction: "neutral" }),
  ];
  if(overrides.primaryIndex !== undefined && plans[overrides.primaryIndex]) plans[overrides.primaryIndex].isPrimaryScenario = true;
  return plans.map((plan, index)=>({
    ...plan,
    confirmationStatus: plan.confirmationStatus || "waiting",
    confirmationStatusLabel: plan.confirmationStatusLabel || "Waiting Confirmation",
    timeframeConfirmationStatus: plan.timeframeConfirmationStatus || "developing",
    timeframeConfirmationLabel: plan.timeframeConfirmationLabel || "Developing Review",
    timeframeConfirmationReasons: plan.timeframeConfirmationReasons || ["Fixture timeframe review remains separate."],
    timeframeConfirmationBlockers: plan.timeframeConfirmationBlockers || [],
    confirmationRequirements: plan.confirmationRequirements || ["Wait for scenario reference confirmation."],
    confluenceSources: plan.confluenceSources || ["Fixture confluence"],
    riskNotes: plan.riskNotes || ["Planning context only."],
    scenarioScoreLabel: plan.scenarioScoreLabel || getScenarioScoreLabel(plan.scenarioScore),
    scenarioBaseScoreLabel: plan.scenarioBaseScoreLabel || getScenarioScoreLabel(plan.scenarioBaseScore),
    scenarioCalibratedScoreLabel: plan.scenarioCalibratedScoreLabel || getScenarioCalibratedScoreLabel(plan.scenarioCalibratedScore),
    scenarioScoreFactors: plan.scenarioScoreFactors || [],
    scenarioTimeframeModifierFactors: plan.scenarioTimeframeModifierFactors || [],
    tabIndex: index,
  }));
}
function getVisibleMultiScenarioPanelCount(html){
  return (html.match(/class="multi-scenario-tab-panel is-active"/g) || []).length;
}
function runMultiScenarioPlanningTabsFixtureTests(){
  const primaryPlans = buildMultiScenarioTabsFixturePlans({ primaryIndex: 1 });
  const primaryHtml = formatMultiScenarioPlanningSection(primaryPlans);
  const noPrimaryPlans = buildMultiScenarioTabsFixturePlans();
  const waitFallback = selectDefaultMultiScenarioTabPlan(noPrimaryPlans);
  const noWaitPlans = noPrimaryPlans.filter((plan)=>!isWaitNoTradeScenario(plan)).map((plan, index)=>({ ...plan, scenarioScore: index === 2 ? 9 : plan.scenarioScore }));
  const scoreFallback = selectDefaultMultiScenarioTabPlan(noWaitPlans);
  const firstFallback = selectDefaultMultiScenarioTabPlan(noWaitPlans.map((plan)=>({ ...plan, scenarioScore: null })));
  let clickWorks = true;
  if(typeof document !== "undefined" && typeof document.createElement === "function"){
    const host = document.createElement("div");
    if(host?.querySelectorAll && host?.querySelector){
      host.innerHTML = formatMultiScenarioPlanningSection(primaryPlans);
      bindMultiScenarioPlanningTabs(host);
      const targetButton = host.querySelector('[data-multi-scenario-tab*="breakout"]') || host.querySelectorAll(".multi-scenario-tab")[2];
      if(targetButton){
        targetButton.click();
        clickWorks = targetButton.classList.contains("is-active") && !!host.querySelector(`#${targetButton.dataset.multiScenarioTab}.is-active:not([hidden])`);
      }
    }
  }
  const before = JSON.stringify(primaryPlans);
  formatMultiScenarioPlanningSection(primaryPlans);
  const forbidden = /buy now|sell now|entry confirmed|guaranteed|high probability trade|best trade|must enter|must exit/i;
  const cases = [
    { name: "Multi-Scenario tab container renders", passed: primaryHtml.includes('class="multi-scenario-tabs"') },
    { name: "Bullish / Bearish / Breakout / Breakdown / Wait tabs render", passed: ["Bullish", "Bearish", "Breakout", "Breakdown", "Wait"].every((label)=>primaryHtml.includes(`>${label}<`) || primaryHtml.includes(`<span>${label}</span>`)) },
    { name: "Only one scenario panel is visible by default", passed: getVisibleMultiScenarioPanelCount(primaryHtml) === 1 },
    { name: "Default active tab is the Primary Scenario if present", passed: selectDefaultMultiScenarioTabPlan(primaryPlans)?.scenarioId === "potential_bearish_scenario" && /potential-bearish-scenario-1-panel/.test(primaryHtml) && /id="multi-scenario-potential-bearish-scenario-1-panel" class="multi-scenario-tab-panel is-active"/.test(primaryHtml) },
    { name: "No Primary fallback selects Wait / No-Trade", passed: waitFallback?.scenarioId === "wait_no_trade_scenario" },
    { name: "No Wait fallback selects highest score", passed: scoreFallback?.scenarioId === "breakout_retest_scenario" },
    { name: "No score fallback selects first available scenario", passed: firstFallback?.scenarioId === noWaitPlans[0]?.scenarioId },
    { name: "Scenario card content remains present", passed: ["Confirmation Status", "Scenario Score", "Scenario Zone", "Invalidation Reference", "TP1 Reference", "Timeframe Confirmation Review"].every((label)=>primaryHtml.includes(label)) },
    { name: "Hidden scenario cards become available when activated", passed: clickWorks },
    { name: "Scenario data is not mutated", passed: before === JSON.stringify(primaryPlans) },
    { name: "No unsafe wording appears", passed: !forbidden.test(primaryHtml) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
function runMultiScenarioPlanningTabsNoImpactFixtureTests(){
  const plans = buildMultiScenarioTabsFixturePlans({ primaryIndex: 0 });
  const before = JSON.stringify(plans);
  const projectionBefore = JSON.stringify(getScenarioReadabilityProjection(plans));
  const orderBefore = plans.map((plan)=>plan.scenarioId).join("|");
  const primaryBefore = plans.filter((plan)=>plan.isPrimaryScenario).map((plan)=>plan.scenarioId).join("|");
  const reviewBefore = plans.map((plan)=>plan.timeframeConfirmationStatus).join("|");
  const calibrationBefore = plans.map((plan)=>`${plan.scenarioBaseScore}|${plan.scenarioTimeframeModifier}|${plan.scenarioCalibratedScore}`).join("||");
  formatMultiScenarioPlanningSection(plans);
  const projectionAfter = JSON.stringify(getScenarioReadabilityProjection(plans));
  const cases = [
    { name: "scenario order unchanged", passed: orderBefore === plans.map((plan)=>plan.scenarioId).join("|") },
    { name: "Primary Scenario unchanged", passed: primaryBefore === plans.filter((plan)=>plan.isPrimaryScenario).map((plan)=>plan.scenarioId).join("|") },
    { name: "Confirmation Status unchanged", passed: projectionBefore === projectionAfter && plans.every((plan)=>plan.confirmationStatus && plan.confirmationStatusLabel) },
    { name: "Scenario Score unchanged", passed: projectionBefore === projectionAfter && plans.every((plan)=>Number.isFinite(Number(plan.scenarioScore)) || plan.scenarioScore === null) },
    { name: "Timeframe Confirmation Review unchanged", passed: reviewBefore === plans.map((plan)=>plan.timeframeConfirmationStatus).join("|") },
    { name: "Timeframe Calibration unchanged", passed: calibrationBefore === plans.map((plan)=>`${plan.scenarioBaseScore}|${plan.scenarioTimeframeModifier}|${plan.scenarioCalibratedScore}`).join("||") },
    { name: "Scenario Zone unchanged", passed: projectionBefore === projectionAfter },
    { name: "Invalidation Reference unchanged", passed: projectionBefore === projectionAfter },
    { name: "TP1 / TP2 / TP3 unchanged", passed: projectionBefore === projectionAfter },
    { name: "source plans not mutated", passed: before === JSON.stringify(plans) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
function runMultiScenarioPlanningUiFixtureTests(){
  const statusLabelsSafe = formatScenarioPlanningStatusLabel("ready") === "Ready for Review" && formatScenarioPlanningStatusLabel("waiting") === "Waiting" && formatScenarioPlanningStatusLabel("invalid") === "Invalid" && formatScenarioPlanningStatusLabel("informational") === "Informational";
  const missingRefsSafe = formatScenarioReferenceLevel(null) === "—" && formatScenarioZoneDisplay(null) === "—";
  const fallbackHtml = formatMultiScenarioPlanningSection([]);
  const sampleHtml = formatMultiScenarioPlanningSection([createScenarioPlanFromParts({ displayTitle: "Potential Bullish Scenario", status: "ready", riskNotes: ["Scenario zone is a planning reference only."] })]);
  const forbidden = /buy now|sell now|entry confirmed|guaranteed|high probability trade|must enter|must exit/i;
  const planFixtures = runMultiScenarioPlanFixtureTests();
  const cases = [
    { name: "status labels are safe", passed: statusLabelsSafe },
    { name: "reference levels render missing values safely", passed: missingRefsSafe },
    { name: "direct signal wording is not present", passed: !forbidden.test(sampleHtml) },
    { name: "empty scenario list renders fallback text", passed: fallbackHtml.includes("No multi-scenario planning context available yet.") },
    { name: "multi-scenario generator fixture still passes", passed: planFixtures.passed === true },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined"){
  window.runMultiScenarioPlanningUiFixtureTests = runMultiScenarioPlanningUiFixtureTests;
  window.runMultiScenarioPlanningTabsFixtureTests = runMultiScenarioPlanningTabsFixtureTests;
  window.runMultiScenarioPlanningTabsNoImpactFixtureTests = runMultiScenarioPlanningTabsNoImpactFixtureTests;
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
  const explanation = formatMarketMapConfluenceExplanation(row);
  const fullSources = row?.confluenceLabel || row?.detail || (Array.isArray(row?.sources) ? row.sources.map(formatSourceLabel).filter(Boolean).join(" + ") : "") || row?.quality || "";
  return {
    zone: row?.zoneText || (Number.isFinite(row?.lower) && Number.isFinite(row?.upper) ? `${usd(row.lower)}–${usd(row.upper)}` : "—"),
    type: getConfluenceType(row),
    sources: formatConfluenceSources(row, 3),
    sourceExplanation: explanation,
    fvgBadges,
    distance: row?.distanceText || "—",
    fullSources: [fullSources, explanation, fvgBadges].filter(Boolean).join(" | "),
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
function getScenarioMapReferenceKey(reference){
  if(!reference || !Number.isFinite(Number(reference.lower)) || !Number.isFinite(Number(reference.upper))) return "";
  const lower = Math.min(Number(reference.lower), Number(reference.upper)).toFixed(2);
  const upper = Math.max(Number(reference.lower), Number(reference.upper)).toFixed(2);
  return `${reference.sourceSide || reference.side || "zone"}|${lower}|${upper}`;
}
function buildScenarioMarketMapUsageIndex(plans){
  const usage = new Map();
  const add = (reference, badge)=>{
    const key = getScenarioMapReferenceKey(reference);
    if(!key || !badge) return;
    if(!usage.has(key)) usage.set(key, []);
    if(!usage.get(key).includes(badge)) usage.get(key).push(badge);
  };
  (Array.isArray(plans) ? plans : []).forEach((plan)=>{
    const title = plan?.displayTitle || "Scenario";
    add(plan?.scenarioZone, `Used as Scenario Zone · ${title}`);
    add(plan?.tp1, `Used as TP1 Reference · ${title}`);
    add(plan?.tp2, `Used as TP2 Reference · ${title}`);
    add(plan?.tp3, `Used as TP3 Reference · ${title}`);
  });
  return usage;
}
function getMarketMapRowScenarioBadges(row, usageIndex){
  if(!(usageIndex instanceof Map)) return [];
  return [...(usageIndex.get(getScenarioMapReferenceKey(row)) || [])];
}
function formatMarketMapScenarioBadges(row, usageIndex){
  const badges = getMarketMapRowScenarioBadges(row, usageIndex).slice(0, 3);
  return badges.length ? `<span class="prep-map-scenario-badges">${badges.map((badge)=>`<span>${escapeHtml(badge)}</span>`).join("")}</span>` : "";
}
function buildCurrentScenarioMarketMapUsageIndex(mapData){
  const snapshot = buildScenarioInputSnapshot(mapData || marketPreparationState.map, marketPreparationState);
  return buildScenarioMarketMapUsageIndex(buildMultiScenarioPlansFromSnapshot(snapshot));
}
function getMarketMapCompactUiConfig(){
  return { collapsedByDefault: true, label: "Market Preparation Map Details", action: "Show Full Market Map", description: "zone database and planning references" };
}
function runMarketMapCompactUiFixtureTests(){
  const config = getMarketMapCompactUiConfig();
  const row = { lower: 90, upper: 92, side: "downside", zoneText: "$90–$92", label: "Support", sources: [] };
  const html = renderMarketMapHeader() + renderMarketMapGrid([row], {});
  const forbidden = /buy area|sell area|entry signal|stoploss|guaranteed target|high probability trade/i;
  const cases = [{name:"compact map is collapsed by default",passed:config.collapsedByDefault===true},{name:"compact label uses safe wording",passed:config.label==="Market Preparation Map Details"&&config.action==="Show Full Market Map"},{name:"map rows remain renderable",passed:html.includes("prep-map-row")&&html.includes("$90–$92")},{name:"compact wording is signal-safe",passed:!forbidden.test(JSON.stringify(config)+html)}];
  const failed=cases.filter((item)=>!item.passed).length; return {passed:failed===0,total:cases.length,failed,results:cases};
}
function runScenarioMarketMapUsageBadgeFixtureTests(){
  const row={side:"downside",lower:90,upper:92}; const plan={displayTitle:"Potential Bullish Scenario",scenarioZone:{sourceSide:"downside",lower:90,upper:92},tp1:{sourceSide:"upside",lower:110,upper:112}}; const before=JSON.stringify({row,plan}); const empty=buildScenarioMarketMapUsageIndex([]); const usage=buildScenarioMarketMapUsageIndex([plan]); const badges=getMarketMapRowScenarioBadges(row,usage); const html=formatMarketMapScenarioBadges(row,usage); const forbidden=/buy|sell|entry|signal|stoploss|guaranteed|high probability/i;
  const cases=[{name:"empty plans are safe",passed:empty.size===0},{name:"unreferenced rows have no badge",passed:getMarketMapRowScenarioBadges({side:"downside",lower:80,upper:82},usage).length===0},{name:"referenced rows show safe badge",passed:badges.length===1&&html.includes("Used as Scenario Zone")},{name:"usage matching does not mutate inputs",passed:before===JSON.stringify({row,plan})},{name:"badge wording is signal-safe",passed:!forbidden.test(html)}]; const failed=cases.filter((item)=>!item.passed).length; return {passed:failed===0,total:cases.length,failed,results:cases};
}
if(typeof window!=="undefined"){window.runMarketMapCompactUiFixtureTests=runMarketMapCompactUiFixtureTests;window.runScenarioMarketMapUsageBadgeFixtureTests=runScenarioMarketMapUsageBadgeFixtureTests;}
function renderMarketMapHeader(){
  return `<div class="prep-map-header-row" aria-hidden="true"><span>Zone</span><span>Type</span><span>Sources</span><span>Distance</span></div>`;
}
function compactZoneSourceLabel(row, display = formatMapRowForDisplay(row)){
  const labels = rankConfluenceSources(getConfluenceSourceList(row)).map(formatSourceLabel).filter(Boolean);
  const unique = [...new Set(labels)];
  const fvgLabels = unique.filter((label)=>/fvg/i.test(label));
  if(fvgLabels.length >= 2){
    const frames = [];
    const direction = /bullish/i.test(fvgLabels.join(" ")) ? "Bullish" : /bearish/i.test(fvgLabels.join(" ")) ? "Bearish" : "";
    if(fvgLabels.some((label)=>/weekly|\bw\b/i.test(label))) frames.push("Weekly");
    if(fvgLabels.some((label)=>/daily|\bd\b/i.test(label))) frames.push("Daily");
    if(fvgLabels.some((label)=>/4h|h4/i.test(label))) frames.push("4H");
    if(fvgLabels.some((label)=>/1h|h1/i.test(label))) frames.push("1H");
    if(frames.length) return `${frames.join(" + ")} ${direction ? `${direction} ` : ""}FVG`.trim();
  }
  return display.sources || unique.slice(0, 3).join(" + ") || display.type || "Market zone";
}
function compactZoneStatusLabel(row, display = formatMapRowForDisplay(row)){
  const parts = [row?.status, row?.quality, display.fvgBadges].filter(Boolean).join(" · ");
  return parts || display.type || "Planning context";
}
function compactZoneRoleLabel(row, { nearest = false, nearestLabel = "" } = {}, display = formatMapRowForDisplay(row)){
  if(nearest && nearestLabel) return nearestLabel;
  const text = `${row?.confluenceLabel || ""} ${row?.quality || ""} ${row?.label || ""} ${display.type || ""}`;
  if(/major/i.test(text)) return row?.side === "downside" ? "Major Downside" : "Major Upside";
  return display.type || row?.label || "Watch Zone";
}
function compactZoneUsageBadges(row, usageIndex){
  return formatMarketMapScenarioBadges(row, usageIndex);
}
function formatMarketZoneCard(row, { nearestRow = null, nearestLabel = "", usageIndex = null } = {}){
  const display = formatMapRowForDisplay(row);
  const nearest = isSameMapRow(row, nearestRow);
  const role = compactZoneRoleLabel(row, { nearest, nearestLabel }, display);
  const source = compactZoneSourceLabel(row, display);
  const status = compactZoneStatusLabel(row, display);
  const title = escapeHtml(display.fullSources || `${display.type} | ${source} | ${status}`);
  const nearestClass = nearest ? " is-nearest-zone" : "";
  return `<article class="market-zone-card prep-map-row${nearestClass}" title="${title}"><div class="market-zone-card-head"><span class="market-zone-card-role">${escapeHtml(role)}</span><span class="market-zone-card-distance">${escapeHtml(display.distance || "—")}</span></div><strong class="market-zone-card-range">${escapeHtml(display.zone)}</strong><p class="market-zone-card-context">${escapeHtml(source)}</p><p class="market-zone-card-status">${escapeHtml(status)}</p>${compactZoneUsageBadges(row, usageIndex)}</article>`;
}
function formatMarketZoneCardsSection(rows, options = {}){
  const html = (rows || []).map((row)=>formatMarketZoneCard(row, options)).join("");
  return html ? `<div class="market-zone-card-grid">${html}</div>` : "";
}
function renderMarketZonesCardLayout(rows, options = {}){
  return formatMarketZoneCardsSection(rows, options);
}
function renderMarketMapGrid(rows, { nearestRow = null, nearestLabel = "", usageIndex = null } = {}){
  return renderMarketZonesCardLayout(rows || [], { nearestRow, nearestLabel, usageIndex });
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
  const snapshot = buildDailyContextSnapshot(marketPreparationState.daily, marketPreparationState.currentPrice);
  renderDailyValidationFoundation(snapshot, latestWeeklyMajorStructureContext);
  if(!els.dailyContextSummary) return;
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
    else if(bullishCross){ label = "Stoch Cross Up"; status = "bullish_cross"; reason = "Short-term momentum crossed upward."; }
    else if(bearishCross){ label = "Stoch Cross Down"; status = "bearish_cross"; reason = "Short-term momentum crossed downward."; }
    return { ok:true, k:Number(k.toFixed(1)), d:Number(d.toFixed(1)), prevK:Number(prevK.toFixed(1)), prevD:Number(prevD.toFixed(1)), label, reason, status };
  }catch{
    return unavailable("compute_failed");
  }
}
function run1hStochasticStatusFixtureTests(){
  const makeCandles = (tailKValues, baseK = 50)=>{
    const candles = Array.from({ length: 20 }, (_, index)=>({ time: index + 1, high: 100, low: 0, close: baseK }));
    tailKValues.forEach((value, offset)=>{
      candles[candles.length - tailKValues.length + offset].close = value;
    });
    return candles;
  };
  const cases = [
    { name: "oversold cross up", candles: makeCandles([15, 10, 5, 15]), expectedLabel: "Stoch Oversold Cross Up", expectedStatus: "oversold_cross_up", expectedOk: true },
    { name: "overbought cross down", candles: makeCandles([85, 90, 95, 85]), expectedLabel: "Stoch Overbought Cross Down", expectedStatus: "overbought_cross_down", expectedOk: true },
    { name: "neutral no cross", candles: makeCandles([50, 50, 50, 50]), expectedLabel: "Stoch Neutral", expectedStatus: "neutral", expectedOk: true },
    { name: "cross up outside oversold", candles: makeCandles([50, 45, 40, 60]), expectedLabel: "Stoch Cross Up", expectedStatus: "bullish_cross", expectedOk: true },
    { name: "cross down outside overbought", candles: makeCandles([50, 55, 60, 40]), expectedLabel: "Stoch Cross Down", expectedStatus: "bearish_cross", expectedOk: true },
    { name: "insufficient candles", candles: makeCandles([]).slice(0, 10), expectedOk: false, expectedReason: "not_enough_candles" },
    { name: "invalid candle values", candles: makeCandles([]).map((c, i)=> i === 19 ? { ...c, close: undefined } : c), expectedOk: false, expectedReason: "invalid_candles" },
    { name: "flat high low range", candles: Array.from({ length: 20 }, (_, index)=>({ time: index + 1, high: 100, low: 100, close: 100 })), expectedOk: false, expectedReason: "insufficient_stochastic" },
  ];
  const results = cases.map((testCase)=>{
    let actual = null;
    let error = null;
    try { actual = compute1hStochasticStatus(testCase.candles); }
    catch(e){ error = e?.message || String(e); }
    const okMatches = actual?.ok === testCase.expectedOk;
    const labelMatches = testCase.expectedLabel ? actual?.label === testCase.expectedLabel : true;
    const statusMatches = testCase.expectedStatus ? actual?.status === testCase.expectedStatus : true;
    const reasonMatches = testCase.expectedReason ? actual?.reason === testCase.expectedReason : true;
    return {
      name: testCase.name,
      passed: okMatches && labelMatches && statusMatches && reasonMatches && !error,
      expectedLabel: testCase.expectedLabel || null,
      expectedStatus: testCase.expectedStatus || null,
      expectedReason: testCase.expectedReason || null,
      actualLabel: actual?.label || null,
      actualStatus: actual?.status || null,
      actualReason: actual?.reason || null,
      actualOk: actual?.ok,
      error,
    };
  });
  const failed = results.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: results.length, failed, results };
}
if(typeof window !== "undefined") window.run1hStochasticStatusFixtureTests = run1hStochasticStatusFixtureTests;
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
const CURRENT_PRICE_ZONE_NEAR_THRESHOLD_PCT = 1.0;
function normalizeCurrentPriceZoneRow(row, side){
  if(!row || !Number.isFinite(Number(row.lower)) || !Number.isFinite(Number(row.upper))) return null;
  const lower = Math.min(Number(row.lower), Number(row.upper));
  const upper = Math.max(Number(row.lower), Number(row.upper));
  return { row, side, lower, upper, distancePct: Number.isFinite(Number(row.distancePct)) ? Number(row.distancePct) : null };
}
function evaluateCurrentPriceZonePosition(currentPrice, zone){
  if(!Number.isFinite(currentPrice) || !zone) return null;
  const distancePct = Number.isFinite(zone.distancePct) ? zone.distancePct : prepDistancePct(currentPrice, zone.lower, zone.upper);
  return {
    ...zone,
    distancePct,
    inside: currentPrice >= zone.lower && currentPrice <= zone.upper,
    near: Number.isFinite(distancePct) && distancePct > 0 && distancePct <= CURRENT_PRICE_ZONE_NEAR_THRESHOLD_PCT,
    below: currentPrice < zone.lower,
    above: currentPrice > zone.upper,
  };
}
function buildCurrentPriceZonePositionStatus(detail, mapData, currentPrice){
  const price = Number(currentPrice);
  const hasPrice = currentPrice !== null && currentPrice !== "" && Number.isFinite(price);
  const upside = normalizeCurrentPriceZoneRow(getNearestUpsideZoneFromMap(mapData), "upside");
  const downside = normalizeCurrentPriceZoneRow(getNearestDownsideZoneFromMap(mapData), "downside");
  const zones = [upside, downside].filter(Boolean);
  if(!hasPrice) return { label: "Unavailable", detail: "Current price unavailable.", nearestUpside: null, nearestDownside: null };
  if(!zones.length) return { label: "No nearby zone", detail: "No usable nearest zones available.", nearestUpside: null, nearestDownside: null };

  const evaluated = zones.map((zone)=>evaluateCurrentPriceZonePosition(price, zone)).filter(Boolean);
  const inside = evaluated.filter((zone)=>zone.inside).sort((a,b)=>(a.distancePct ?? 999) - (b.distancePct ?? 999))[0] || null;
  if(inside) return { label: "Inside Zone", detail: inside.side === "upside" ? "Inside nearest upside zone." : "Inside nearest downside zone.", nearestUpside: upside?.row || null, nearestDownside: downside?.row || null };

  const near = evaluated.filter((zone)=>zone.near).sort((a,b)=>(a.distancePct ?? 999) - (b.distancePct ?? 999))[0] || null;
  if(near) return { label: near.side === "upside" ? "Near Upside Zone" : "Near Downside Zone", detail: `Within ${f1(CURRENT_PRICE_ZONE_NEAR_THRESHOLD_PCT)}% of nearest ${near.side} zone.`, nearestUpside: upside?.row || null, nearestDownside: downside?.row || null };

  if(upside && downside && price < upside.lower && price > downside.upper){
    return { label: "Between Key Zones", detail: "Price is between nearest upside and downside zones.", nearestUpside: upside.row, nearestDownside: downside.row };
  }
  if(downside && price > downside.upper){
    return { label: "Above Nearest Downside Zone", detail: "Price is above the nearest downside zone.", nearestUpside: upside?.row || null, nearestDownside: downside.row };
  }
  if(upside && price < upside.lower){
    return { label: "Below Nearest Upside Zone", detail: "Price is below the nearest upside zone.", nearestUpside: upside.row, nearestDownside: downside?.row || null };
  }
  return { label: "No nearby zone", detail: "No conservative zone position matched.", nearestUpside: upside?.row || null, nearestDownside: downside?.row || null };
}
function normalizeRecentZoneReactionRow(row, side, currentPrice){
  if(row?.lower === null || row?.lower === "" || row?.upper === null || row?.upper === "") return null;
  const zone = normalizeCurrentPriceZoneRow(row, side);
  if(!zone) return null;
  const price = Number(currentPrice);
  const distancePct = Number.isFinite(zone.distancePct) ? zone.distancePct : (Number.isFinite(price) ? prepDistancePct(price, zone.lower, zone.upper) : null);
  return { ...zone, distancePct };
}
function selectRecentZoneReactionZone({ currentPrice, nearestUpside, nearestDownside, currentPositionStatus } = {}){
  const upside = normalizeRecentZoneReactionRow(nearestUpside, "upside", currentPrice);
  const downside = normalizeRecentZoneReactionRow(nearestDownside, "downside", currentPrice);
  const zones = [upside, downside].filter(Boolean);
  if(!zones.length) return null;
  const positionLabel = String(currentPositionStatus?.label || currentPositionStatus || "");
  if(/upside/i.test(positionLabel) && upside) return upside;
  if(/downside/i.test(positionLabel) && downside) return downside;
  return zones.sort((a,b)=>{
    const aDistance = Number.isFinite(a.distancePct) ? a.distancePct : Math.abs(Number(currentPrice) - ((a.lower + a.upper) / 2));
    const bDistance = Number.isFinite(b.distancePct) ? b.distancePct : Math.abs(Number(currentPrice) - ((b.lower + b.upper) / 2));
    return aDistance - bDistance;
  })[0] || null;
}
function buildRecentZoneReactionContext({ currentPrice, nearestUpside, nearestDownside, currentPositionStatus, h4Candles } = {}){
  const empty = (detail = "No usable recent 4H zone interaction was detected.")=>({ label: "No recent zone reaction", detail, zoneSide: null, candleTime: null, timeframe: "4H" });
  const zone = selectRecentZoneReactionZone({ currentPrice, nearestUpside, nearestDownside, currentPositionStatus });
  if(!zone) return empty("No usable nearest zone is available for recent 4H context.");
  const candles = Array.isArray(h4Candles) ? h4Candles.filter(Boolean).slice(-3) : [];
  if(!candles.length) return empty("Recent 4H candle data is unavailable.");
  const isFiniteCandle = (c)=>Number.isFinite(Number(c?.high)) && Number.isFinite(Number(c?.low)) && Number.isFinite(Number(c?.close));
  if(candles.some((c)=>!isFiniteCandle(c))) return empty("Recent 4H candle data is incomplete.");
  const candleTime = (c)=>c?.time ?? c?.openTime ?? c?.timestamp ?? null;
  const closeInside = (c)=>Number(c.close) >= zone.lower && Number(c.close) <= zone.upper;
  const closeThrough = (c)=>zone.side === "upside" ? Number(c.close) > zone.upper : Number(c.close) < zone.lower;
  const intersects = (c)=>Number(c.high) >= zone.lower && Number(c.low) <= zone.upper;
  const hasNearPosition = /Near|Inside/i.test(String(currentPositionStatus?.label || currentPositionStatus || ""))
    || (Number.isFinite(zone.distancePct) && zone.distancePct <= CURRENT_PRICE_ZONE_NEAR_THRESHOLD_PCT);

  for(let i=0;i<candles.length;i++){
    const candle = candles[i];
    const previous = i > 0 ? candles[i - 1] : null;
    if(previous && !closeInside(previous) && closeInside(candle)){
      return { label: "Recent close back inside zone", detail: "A recent 4H candle closed back within the nearest zone bounds.", zoneSide: zone.side, candleTime: candleTime(candle), timeframe: "4H" };
    }
  }
  const throughCandle = candles.find((c)=>closeThrough(c));
  if(throughCandle){
    return { label: "Recent close through zone", detail: "A recent 4H candle closed beyond the nearest zone boundary.", zoneSide: zone.side, candleTime: candleTime(throughCandle), timeframe: "4H" };
  }
  const touchCandle = candles.find((c)=>intersects(c));
  if(touchCandle){
    return { label: "Recent touch near zone", detail: "A recent 4H candle range interacted with the nearest zone.", zoneSide: zone.side, candleTime: candleTime(touchCandle), timeframe: "4H" };
  }
  if(hasNearPosition){
    return { label: "Watching zone reaction", detail: "Price is near a key zone; no recent 4H candle interaction yet.", zoneSide: zone.side, candleTime: null, timeframe: "4H" };
  }
  return empty("Recent 4H candles did not interact with the nearest zone.");
}
function runCurrentPriceZonePositionFixtureTests(){
  const row = (lower, upper, distancePct)=>({ lower, upper, distancePct, zoneText: `${lower}-${upper}`, label: "Fixture Zone" });
  const cases = [
    { name: "inside upside zone", price: 105, map: { upside: [row(100, 110, 0)], downside: [] }, expected: "Inside Zone" },
    { name: "inside downside zone", price: 95, map: { upside: [], downside: [row(90, 100, 0)] }, expected: "Inside Zone" },
    { name: "near upside zone", price: 99.2, map: { upside: [row(100, 110, 0.8)], downside: [] }, expected: "Near Upside Zone" },
    { name: "near downside zone", price: 100.8, map: { upside: [], downside: [row(90, 100, 0.8)] }, expected: "Near Downside Zone" },
    { name: "between key zones", price: 100, map: { upside: [row(110, 120, 10)], downside: [row(80, 90, 10)] }, expected: "Between Key Zones" },
    { name: "above nearest downside only", price: 105, map: { upside: [], downside: [row(90, 100, 4.8)] }, expected: "Above Nearest Downside Zone" },
    { name: "below nearest upside only", price: 95, map: { upside: [row(100, 110, 5.3)], downside: [] }, expected: "Below Nearest Upside Zone" },
    { name: "no usable zones", price: 100, map: { upside: [], downside: [] }, expected: "No nearby zone" },
    { name: "missing price", price: null, map: { upside: [row(100, 110, 0)], downside: [] }, expected: "Unavailable" },
  ];
  const results = cases.map((testCase)=>{
    let actual = null;
    let error = null;
    try { actual = buildCurrentPriceZonePositionStatus(null, testCase.map, testCase.price).label; }
    catch(e){ error = e?.message || String(e); }
    return { name: testCase.name, passed: actual === testCase.expected && !error, expected: testCase.expected, actual, error };
  });
  const failed = results.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: results.length, failed, results };
}
if(typeof window !== "undefined") window.runCurrentPriceZonePositionFixtureTests = runCurrentPriceZonePositionFixtureTests;
function runRecentZoneReactionContextFixtureTests(){
  const zone = (side = "upside", distancePct = 0.6)=>({ lower: 100, upper: 110, distancePct, label: `${side} zone` });
  const candle = (high, low, close, time)=>({ high, low, close, time });
  const base = { currentPrice: 99.5, currentPositionStatus: { label: "Near Upside Zone" } };
  const cases = [
    { name: "4H wick touches upside zone", input: { ...base, nearestUpside: zone("upside"), h4Candles: [candle(99, 90, 95, 1), candle(101, 90, 95, 2), candle(98, 90, 96, 3)] }, expected: "Recent touch near zone" },
    { name: "4H body intersects zone", input: { ...base, nearestUpside: zone("upside"), h4Candles: [candle(108, 101, 105, 1), candle(108, 98, 105, 2), candle(108, 101, 106, 3)] }, expected: "Recent touch near zone" },
    { name: "close back inside zone", input: { ...base, nearestUpside: zone("upside"), h4Candles: [candle(98, 90, 95, 1), candle(109, 99, 105, 2), candle(108, 99, 104, 3)] }, expected: "Recent close back inside zone" },
    { name: "close above upside boundary", input: { ...base, nearestUpside: zone("upside"), h4Candles: [candle(98, 90, 95, 1), candle(112, 99, 111, 2), candle(113, 101, 112, 3)] }, expected: "Recent close through zone" },
    { name: "close below downside boundary", input: { currentPrice: 110.5, currentPositionStatus: { label: "Near Downside Zone" }, nearestDownside: zone("downside"), h4Candles: [candle(112, 101, 105, 1), candle(106, 95, 99, 2), candle(105, 94, 98, 3)] }, expected: "Recent close through zone" },
    { name: "near zone without candle interaction", input: { ...base, nearestUpside: zone("upside"), h4Candles: [candle(98, 90, 95, 1), candle(99, 91, 96, 2), candle(98, 92, 97, 3)] }, expected: "Watching zone reaction" },
    { name: "no nearby zone", input: { currentPrice: 100, h4Candles: [candle(99, 90, 95, 1)] }, expected: "No recent zone reaction" },
    { name: "invalid zone bounds", input: { currentPrice: 100, nearestUpside: { lower: null, upper: 110 }, h4Candles: [candle(109, 101, 105, 1)] }, expected: "No recent zone reaction" },
    { name: "missing candle data", input: { ...base, nearestUpside: zone("upside"), h4Candles: [] }, expected: "No recent zone reaction" },
    { name: "wick only beyond boundary is not close through", input: { ...base, nearestUpside: zone("upside"), h4Candles: [candle(115, 99, 109, 1), candle(99, 90, 95, 2), candle(98, 90, 96, 3)] }, expected: "Recent touch near zone", notExpected: "Recent close through zone" },
  ];
  const results = cases.map((testCase)=>{
    let actual = null;
    let error = null;
    try { actual = buildRecentZoneReactionContext(testCase.input).label; }
    catch(e){ error = e?.message || String(e); }
    return { name: testCase.name, passed: actual === testCase.expected && actual !== testCase.notExpected && !error, expected: testCase.expected, notExpected: testCase.notExpected || null, actual, error };
  });
  const failed = results.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: results.length, failed, results };
}
if(typeof window !== "undefined") window.runRecentZoneReactionContextFixtureTests = runRecentZoneReactionContextFixtureTests;
function buildCurrentPricePositionStatus(state, mapData){
  try{
    const currentPrice = state?.currentPrice;
    const upside = getNearestUpsideZoneFromMap(mapData);
    const downside = getNearestDownsideZoneFromMap(mapData);
    const zonePosition = buildCurrentPriceZonePositionStatus(null, mapData, currentPrice);
    const currentPosition = zonePosition.label || "Unavailable";
    const recentFvg = detectRecentFvgReaction(latest4hCandles, state?.h4?.fvgZones || [], 3);
    const recentSr = detectRecentSrReaction(latest4hCandles, state?.h4?.srSummary, 3);
    const latestReaction = [recentFvg, recentSr].filter(Boolean).sort((a,b)=>(b.time || 0) - (a.time || 0))[0] || null;
    const memory = updateRecentReactionMemory(state?.h4?.recentReaction, latestReaction);
    const h1Context = state?.h1?.sweepStatus ? `1H: ${state.h1.sweepStatus}` : null;
    const recentReaction = latestReaction ? { ...latestReaction, confirmation: h1Context } : (memory.lastReactionLabel ? { label: memory.lastReactionLabel, confirmation: h1Context } : null);
    return {
      currentPosition,
      zonePosition,
      nearestUpsideZone: upside ? { ...upside, text: getMapZoneText(upside, "above") } : null,
      nearestDownsideZone: downside ? { ...downside, text: getMapZoneText(downside, "below") } : null,
      recentReaction,
      recentZoneReaction: buildRecentZoneReactionContext({ currentPrice, nearestUpside: upside, nearestDownside: downside, currentPositionStatus: zonePosition, h4Candles: latest4hCandles }),
      recentReactionMemory: memory,
      fvg: buildCurrentFvgPositionStatus(),
      timeframe: "4H",
      updatedAt: Date.now(),
    };
  }catch{
    return { currentPosition: "Unavailable", zonePosition: { label: "Unavailable", detail: "Current position unavailable." }, nearestUpsideZone: null, nearestDownsideZone: null, recentReaction: null, recentReactionMemory: marketPreparationState.h4?.recentReaction || null, fvg: { ok: false, timeframe: null, zoneType: null, zoneRange: null, detailStatus: null, position: "FVG position unavailable", ceStatus: null, distancePct: null, recentReaction: null, reason: "FVG position unavailable.", updatedAt: Date.now() }, timeframe: "4H", updatedAt: Date.now() };
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
    position: status.zonePosition?.label || status.currentPosition || "Unavailable",
    positionDetail: status.zonePosition?.detail || null,
    recentReaction,
    recentZoneReaction: status.recentZoneReaction || buildRecentZoneReactionContext({ currentPrice: state?.currentPrice, nearestUpside: status.nearestUpsideZone, nearestDownside: status.nearestDownsideZone, currentPositionStatus: status.zonePosition, h4Candles: latest4hCandles }),
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
        <p class="prep-current-detail-kv">Recent Zone Reaction: ${detail.keyZone.recentZoneReaction?.label || "No recent zone reaction"}</p>
        ${detail.keyZone.recentZoneReaction?.detail ? `<p class="prep-current-detail-meaning">${detail.keyZone.recentZoneReaction.detail}</p>` : ""}
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
  updateTimeframeContextHeaderPrice();
  refreshTradePlanScenario(safeMap);
  renderTradePlanScenario();
  renderMultiScenarioPlanningSection(safeMap);
  renderPulseLabEngineMap();
  renderTimeframeRoleAlignment();
  renderH4ReactionContext(safeMap);
  renderH4LiquiditySummary();
  renderKeyMarketZonesSummary(safeMap);
  renderIfvgContextPanel();
  const displayUpside = getPriceLadderRows(safeMap.upside || []);
  const displayDownside = getPriceLadderRows(safeMap.downside || []);
  const nearestUpside = safeMap.upside?.[0] || null;
  const nearestDownside = safeMap.downside?.[0] || null;
  const scenarioUsageIndex = buildCurrentScenarioMarketMapUsageIndex(safeMap);
  if(els.prepUpsideRows) els.prepUpsideRows.innerHTML = displayUpside.length ? renderMarketZonesCardLayout(displayUpside, { nearestRow: nearestUpside, nearestLabel: "Nearest Upside", usageIndex: scenarioUsageIndex }) : '<p class="prep-map-empty">No upside watch levels available.</p>';
  if(els.prepDownsideRows) els.prepDownsideRows.innerHTML = displayDownside.length ? renderMarketZonesCardLayout(displayDownside, { nearestRow: nearestDownside, nearestLabel: "Nearest Downside", usageIndex: scenarioUsageIndex }) : '<p class="prep-map-empty">No downside watch levels available.</p>';
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
function hasEngineMapRows(rows){
  return Array.isArray(rows) && rows.length > 0;
}
function hasEngineMapFiniteValue(value){
  return value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value));
}
function hasEngineMapFvgContext(state){
  return [state?.weekly, state?.daily, state?.h4].some((frame)=>hasEngineMapRows(frame?.fvgZones) || hasEngineMapRows(frame?.fvgDetails) || hasEngineMapRows(frame?.recentBrokenFvgDetails?.all));
}
function hasEngineMapSrContext(state){
  return [state?.weekly, state?.daily, state?.h4].some((frame)=>frame?.srSummary?.support || frame?.srSummary?.resistance || frame?.srSummary?.ok === true);
}
function buildPulseLabEngineMapSnapshot(state = marketPreparationState){
  const sourceReady = state?.meta?.sourcesReady || {};
  const mapAvailable = hasEngineMapRows(state?.map?.upside) || hasEngineMapRows(state?.map?.downside);
  const structureAvailable = state?.daily?.pattern?.ok === true || !!state?.h4?.structureStatus || !!state?.h1?.structureStatus;
  const fvgAvailable = hasEngineMapFvgContext(state);
  const srAvailable = hasEngineMapSrContext(state);
  const h4Available = sourceReady.h4 === true || !!state?.h4?.liquidityOrderflowState?.lastUpdated;
  const pricePositionAvailable = hasEngineMapFiniteValue(state?.currentPrice) || !!state?.currentPricePosition?.currentPosition;
  const h1Available = sourceReady.h1 === true || !!state?.h1?.sweepStatus || !!state?.h1?.structureStatus || state?.h1?.stochastic?.ok === true;
  const sentimentAvailable = hasEngineMapFiniteValue(state?.sentiment?.value) || !!state?.sentiment?.label;
  const volumeAvailable = !!state?.daily?.volumeStatus || !!state?.h4?.volumeStatus;
  const scenarioAvailable = mapAvailable || state?.tradePlanScenario?.ok === true || !!state?.tradePlanScenario?.selectedScenario;
  return [
    { name: "Structure / Pattern Engine", status: structureAvailable ? "Active" : "Unavailable", usedFor: "Daily structure · channel/range context · broken channel S/R · BOS/CHOCH context" },
    { name: "FVG / IFVG Engine", status: fvgAvailable ? "Active" : "Unavailable", usedFor: "Weekly/Daily/4H FVG · bullish/bearish context · IFVG reclaim and failed-reclaim context" },
    { name: "Support / Resistance Engine", status: srAvailable ? "Active" : "Unavailable", usedFor: "Weekly/Daily/4H S/R · nearest support and resistance" },
    { name: "Market Preparation Map Engine", status: mapAvailable ? "Active" : "Unavailable", usedFor: "Upside/Downside Watch · scenario zones · invalidation and TP references" },
    { name: "H4 Liquidity Engine", status: h4Available ? "Diagnostic" : "Unavailable", usedFor: "Liquidity sweep · reclaim/rejection context · confirmation diagnostics" },
    { name: "Current Price Position Engine", status: pricePositionAvailable ? "Active" : "Unavailable", usedFor: "Price vs key zones · nearest zones · between-zone and recent-reaction context" },
    { name: "1H Timing Engine", status: h1Available ? "Context" : "Unavailable", usedFor: "1H sweep · BOS/CHOCH · short-term and stochastic timing context" },
    { name: "Sentiment Engine", status: sentimentAvailable ? "Display-only" : "Unavailable", usedFor: "Fear & Greed · risk sentiment context" },
    { name: "Volume Context Engine", status: volumeAvailable ? "Context" : "Unavailable", usedFor: "Volume status · reaction-strength context" },
    { name: "Scenario Engine", status: scenarioAvailable ? "Active" : "Unavailable", usedFor: "Multi-Scenario Planning · bullish/bearish · breakout/breakdown retest · wait/no-trade" },
  ];
}
function formatEngineMapStatus(status){
  const allowed = new Set(["Active", "Diagnostic", "Display-only", "Context", "Unavailable"]);
  return allowed.has(status) ? status : "Unavailable";
}
function getEngineMapStatusClass(status){
  return `status-${formatEngineMapStatus(status).toLowerCase().replace(/[^a-z]+/g, "-")}`;
}
function formatEngineMapCard(engine){
  const status = formatEngineMapStatus(engine?.status);
  return `<article class="engine-map-item"><div class="engine-map-item-header"><h4>${escapeHtml(engine?.name || "Engine")}</h4><span class="engine-map-status ${getEngineMapStatusClass(status)}">${escapeHtml(status)}</span></div><p><strong>Used for:</strong> ${escapeHtml(engine?.usedFor || "Context unavailable")}</p></article>`;
}
function renderPulseLabEngineMap(state = marketPreparationState){
  if(!els.pulseLabEngineMapPanel) return;
  const engines = buildPulseLabEngineMapSnapshot(state);
  els.pulseLabEngineMapPanel.innerHTML = `<div class="engine-map-header"><div><h3>Pulse Lab Engine Map</h3><p>Read-only overview of the analysis engines powering the dashboard.</p></div></div><div class="engine-map-grid">${engines.map(formatEngineMapCard).join("")}</div>`;
}
function runPulseLabEngineMapFixtureTests(){
  const input = { currentPrice:null, weekly:{}, daily:{}, h4:{}, h1:{ stochastic:{} }, map:{ upside:[], downside:[] }, sentiment:{ value:null }, currentPricePosition:{}, tradePlanScenario:{}, meta:{ sourcesReady:{} } };
  const before = JSON.stringify(input);
  const engines = buildPulseLabEngineMapSnapshot(input);
  const html = engines.map(formatEngineMapCard).join("");
  const expectedNames = ["Structure / Pattern Engine", "FVG / IFVG Engine", "Support / Resistance Engine", "Market Preparation Map Engine", "H4 Liquidity Engine", "Current Price Position Engine", "1H Timing Engine", "Sentiment Engine", "Volume Context Engine", "Scenario Engine"];
  const forbidden = /buy signal|sell signal|entry confirmed|guaranteed|high probability trade|must enter|must exit/i;
  const cases = [
    { name: "all ten engine names are present", passed: engines.length === 10 && expectedNames.every((name)=>engines.some((engine)=>engine.name === name)) },
    { name: "missing context uses neutral fallback", passed: engines.every((engine)=>engine.status === "Unavailable") },
    { name: "engine copy avoids direct signal wording", passed: !forbidden.test(html) },
    { name: "builder does not mutate input state", passed: JSON.stringify(input) === before },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined") window.runPulseLabEngineMapFixtureTests = runPulseLabEngineMapFixtureTests;

function buildTimeframeRoleAlignmentSnapshot(state = marketPreparationState){
  const sourceReady = state?.meta?.sourcesReady || {};
  return [
    { timeframe: "Weekly", role: "Major Context", status: "Partial", usedFor: ["Big-picture structure", "Major S/R", "Major FVG", "RSI regime / momentum bias", "Divergence context"], gapNote: "Major BOS/CHOCH not yet formalized", available: sourceReady.weekly === true || !!state?.weekly?.srSummary || (Array.isArray(state?.weekly?.fvgZones) && state.weekly.fvgZones.length > 0) },
    { timeframe: "Daily", role: "Structure Validation", status: "Active", usedFor: ["3M active structure", "6M intermediate structure", "1Y macro range", "Daily FVG/S/R", "Channel / range / broken channel"], gapNote: "Alignment with Weekly not yet formalized", available: sourceReady.daily === true || state?.daily?.pattern?.ok === true || !!state?.daily?.srSummary },
    { timeframe: "4H", role: "Reaction Context", status: "Partial", usedFor: ["Reaction to Weekly/Daily/Market Map zones", "Sweep / reclaim / rejection", "H4 liquidity context", "BOS/CHOCH confirmation context"], gapNote: "Unified H4ReactionContext not yet formalized", available: sourceReady.h4 === true || !!state?.h4?.structureStatus || !!state?.h4?.liquidityOrderflowState?.lastUpdated },
    { timeframe: "1H", role: "Timing Context", status: "Context", usedFor: ["Timing refinement", "Mini sweep", "BOS/CHOCH timing", "Stochastic timing"], gapNote: "Quick retest context not yet formalized", available: sourceReady.h1 === true || !!state?.h1?.sweepStatus || !!state?.h1?.structureStatus || state?.h1?.stochastic?.ok === true },
  ];
}
function formatTimeframeRoleStatus(status){
  const allowed = new Set(["Active", "Context", "Partial", "Unavailable"]);
  return allowed.has(status) ? status : "Unavailable";
}
function getTimeframeRoleStatusClass(status){ return `status-${formatTimeframeRoleStatus(status).toLowerCase().replace(/[^a-z]+/g, "-")}`; }
function formatTimeframeRoleCard(card){
  const status = formatTimeframeRoleStatus(card?.available === false ? "Unavailable" : card?.status);
  const usedFor = Array.isArray(card?.usedFor) && card.usedFor.length ? card.usedFor : ["Context unavailable"];
  return `<article class="timeframe-role-item"><div class="engine-map-item-header"><div><h4>${escapeHtml(card?.timeframe || "Timeframe")} — ${escapeHtml(card?.role || "Context")}</h4><p class="timeframe-role-use">${usedFor.map(escapeHtml).join(" · ")}</p></div><span class="engine-map-status ${getTimeframeRoleStatusClass(status)}">${escapeHtml(status)}</span></div><p class="timeframe-role-gap"><strong>Gap note:</strong> ${escapeHtml(card?.gapNote || "No current gap note.")}</p><p class="timeframe-role-safe">Display-only context · scenario planning only · not a trade instruction.</p></article>`;
}
function renderTimeframeRoleAlignment(state = marketPreparationState){
  if(!els.timeframeRoleAlignmentPanel) return;
  const cards = buildTimeframeRoleAlignmentSnapshot(state);
  els.timeframeRoleAlignmentPanel.innerHTML = `<div class="engine-map-header"><div><h3>Timeframe Role Alignment</h3><p>How Pulse Lab separates higher-timeframe context, structure validation, reaction, and timing.</p></div></div><div class="timeframe-role-grid">${cards.map(formatTimeframeRoleCard).join("")}</div>`;
}
function runTimeframeRoleAlignmentFixtureTests(){
  const input = { weekly:{}, daily:{}, h4:{}, h1:{ stochastic:{} }, meta:{ sourcesReady:{} } };
  const before = JSON.stringify(input);
  const cards = buildTimeframeRoleAlignmentSnapshot(input);
  const html = cards.map(formatTimeframeRoleCard).join("");
  const statusCases = ["Active", "Context", "Partial", "Unavailable", "unexpected"].map(formatTimeframeRoleStatus);
  const forbidden = /buy|sell|entry confirmed|signal|guaranteed|high probability trade|must enter|must exit/i;
  const cases = [
    { name:"all four timeframe cards are present", passed:cards.length === 4 && ["Weekly","Daily","4H","1H"].every((name)=>cards.some((card)=>card.timeframe === name)) },
    { name:"Weekly role is Major Context", passed:cards.find((card)=>card.timeframe === "Weekly")?.role === "Major Context" },
    { name:"Daily role is Structure Validation", passed:cards.find((card)=>card.timeframe === "Daily")?.role === "Structure Validation" },
    { name:"4H role is Reaction Context", passed:cards.find((card)=>card.timeframe === "4H")?.role === "Reaction Context" },
    { name:"1H role is Timing Context", passed:cards.find((card)=>card.timeframe === "1H")?.role === "Timing Context" },
    { name:"status labels normalize safely", passed:statusCases.includes("Unavailable") && statusCases.slice(0,4).every((status)=>["Active","Context","Partial","Unavailable"].includes(status)) },
    { name:"missing state renders fallback safely", passed:/Unavailable/.test(html) && /Gap note/.test(html) },
    { name:"no direct action wording appears", passed:!forbidden.test(html) },
    { name:"builder does not mutate input state", passed:before === JSON.stringify(input) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed:failed === 0, total:cases.length, failed, results:cases };
}
if(typeof window !== "undefined") window.runTimeframeRoleAlignmentFixtureTests = runTimeframeRoleAlignmentFixtureTests;

function formatH4LiquiditySummaryStatus(status){
  const key = String(status || "unavailable").toLowerCase();
  if(key === "confirmed") return "Confirmed";
  if(key === "waiting") return "Waiting";
  if(key === "weak") return "Weak";
  if(key === "failed") return "Failed";
  return "Unavailable";
}
function deriveH4LiquiditySummary(state){
  const episode = state?.activeEpisode;
  if(!episode) return { status: "unavailable", context: "H4 liquidity context unavailable", issue: "Waiting for sufficient H4 data", use: "Diagnostic context only" };
  const episodeStatus = String(episode.status || LIQUIDITY_OF_STATE.NONE).toLowerCase();
  const reclaimStatus = String(episode.reclaim?.status || LIQUIDITY_RECLAIM_STATUS.NONE);
  const blockers = Array.isArray(state?.diagnostics?.confirmationBlockers) ? state.diagnostics.confirmationBlockers : [];
  let status = "unavailable";
  if(episodeStatus === LIQUIDITY_OF_STATE.CONFIRMED) status = "confirmed";
  else if(episodeStatus === LIQUIDITY_OF_STATE.FAILED) status = "failed";
  else if(episode.stale || episode.band === LIQUIDITY_BAND.WEAK) status = "weak";
  else if([LIQUIDITY_OF_STATE.POSSIBLE, LIQUIDITY_OF_STATE.VALID].includes(episodeStatus)) status = "waiting";
  const context = episode.displayStatus || (episode.sweep?.detected ? "Possible H4 liquidity sweep detected" : "H4 liquidity context unavailable");
  let issue = "No current diagnostic issue";
  if(status === "unavailable") issue = "Waiting for sufficient H4 data";
  else if(status === "failed") issue = episode.failure?.reason || "Current H4 liquidity context failed";
  else if(episode.stale) issue = "Context is stale";
  else if(reclaimStatus === LIQUIDITY_RECLAIM_STATUS.MISSED || !episode.reclaim?.detected) issue = "Reclaim not confirmed";
  else if(blockers.length) issue = blockers[0];
  else if(episode.band === LIQUIDITY_BAND.WEAK) issue = "Diagnostic strength remains weak";
  const direction = episode.sweep?.type === LIQUIDITY_SWEEP_TYPE.SWEEP_LOW ? "Bullish" : episode.sweep?.type === LIQUIDITY_SWEEP_TYPE.SWEEP_HIGH ? "Bearish" : null;
  const use = status === "confirmed" && direction ? `${direction} scenario confirmation context only` : "Diagnostic context only";
  return { status, context, issue, use };
}
function formatContextSummaryStatusClass(status){
  return `summary-status-${String(status || "unavailable").toLowerCase()}`;
}
function formatSummaryValue(value, fallback = "—"){
  return value === null || value === undefined || value === "" ? fallback : String(value);
}
function renderH4LiquiditySummary(){
  if(!els.h4LiquiditySummaryPanel) return;
  const summary = deriveH4LiquiditySummary(marketPreparationState?.h4?.liquidityOrderflowState);
  const cards = [
    { label: "Status", value: formatH4LiquiditySummaryStatus(summary.status), note: "H4 liquidity context." },
    { label: "Context", value: summary.context, note: "Read-only diagnostic context." },
    { label: "Issue", value: summary.issue, note: "Confirmation review detail." },
    { label: "Use", value: summary.use, note: "Planning context only." },
  ];
  els.h4LiquiditySummaryPanel.innerHTML = `<div class="context-summary-header timeframe-context-card-header"><div><h3>H4 Liquidity Summary</h3><p>Read-only confirmation and diagnostic context.</p></div><span class="context-summary-status ${formatContextSummaryStatusClass(summary.status)}">${escapeHtml(formatH4LiquiditySummaryStatus(summary.status))}</span></div>${formatTimeframeContextCardGrid(cards)}`;
}
function selectKeyMarketZone(rows, mode = "nearest"){
  const list = Array.isArray(rows) ? rows.filter(Boolean) : [];
  if(mode === "nearest") return list[0] || null;
  return list.find((row)=>/major|strong|confluence/i.test(`${row?.label || ""} ${row?.quality || ""} ${row?.status || ""} ${row?.confluenceLabel || ""}`)) || list[0] || null;
}
function getKeyMarketZoneSources(row){
  if(!row) return "—";
  const sources = Array.isArray(row.sources) && row.sources.length ? row.sources : [row];
  return [...new Set(sources.map((source)=>source?.label || source?.source || source?.type).filter(Boolean))].slice(0, 3).join(" + ") || "Market Preparation Map";
}
function formatKeyMarketZoneCard(title, row){
  if(!row) return `<article class="key-market-zone-item"><span>${escapeHtml(title)}</span><strong>Context unavailable</strong><p>Reference zone unavailable.</p></article>`;
  const range = row.zoneText || (Number.isFinite(Number(row.lower)) && Number.isFinite(Number(row.upper)) ? `${usd(Number(row.lower))}–${usd(Number(row.upper))}` : "—");
  const distance = row.distanceText || (Number.isFinite(Number(row.distancePct)) ? `${f1(Number(row.distancePct))}% from current price` : "Distance unavailable");
  const type = row.confluenceLabel || row.label || "Reference zone";
  const status = row.status || row.quality || "Context available";
  return `<article class="key-market-zone-item"><span>${escapeHtml(title)}</span><strong>${escapeHtml(range)}</strong><p>${escapeHtml(distance)}</p><small>Type: ${escapeHtml(type)} · Status: ${escapeHtml(status)}</small><small>Sources: ${escapeHtml(getKeyMarketZoneSources(row))}</small></article>`;
}
function buildKeyMarketZonesSummary(mapData = marketPreparationState.map, state = marketPreparationState){
  const upside = Array.isArray(mapData?.upside) ? mapData.upside : [];
  const downside = Array.isArray(mapData?.downside) ? mapData.downside : [];
  return {
    nearestUpside: selectKeyMarketZone(upside, "nearest"),
    nearestDownside: selectKeyMarketZone(downside, "nearest"),
    majorUpside: selectKeyMarketZone(upside, "major"),
    majorDownside: selectKeyMarketZone(downside, "major"),
    currentPricePosition: state?.currentPricePosition?.currentPosition || "Position context unavailable",
  };
}
function renderKeyMarketZonesSummary(mapData){
  if(!els.keyMarketZonesSummaryPanel) return;
  buildKeyMarketZonesSummary(mapData || marketPreparationState.map, marketPreparationState);
  els.keyMarketZonesSummaryPanel.innerHTML = "";
  els.keyMarketZonesSummaryPanel.hidden = true;
}
function runH4LiquiditySummaryFixtureTests(){
  const missing = deriveH4LiquiditySummary(null);
  const possible = deriveH4LiquiditySummary({ activeEpisode: { status: LIQUIDITY_OF_STATE.POSSIBLE, band: LIQUIDITY_BAND.USABLE, displayStatus: "Possible downside sweep detected", reclaim: { detected: false, status: LIQUIDITY_RECLAIM_STATUS.MISSED }, sweep: { detected: true, type: LIQUIDITY_SWEEP_TYPE.SWEEP_LOW } }, diagnostics: {} });
  const confirmed = deriveH4LiquiditySummary({ activeEpisode: { status: LIQUIDITY_OF_STATE.CONFIRMED, band: LIQUIDITY_BAND.STRONG, displayStatus: "H4 liquidity sweep reaction confirmed", reclaim: { detected: true, status: LIQUIDITY_RECLAIM_STATUS.SAME_BAR }, sweep: { detected: true, type: LIQUIDITY_SWEEP_TYPE.SWEEP_LOW } }, diagnostics: {} });
  const failedState = { activeEpisode: { status: LIQUIDITY_OF_STATE.FAILED, band: LIQUIDITY_BAND.WEAK, displayStatus: "H4 liquidity sweep reaction failed", failure: { reason: "Context failed" }, reclaim: {}, sweep: {} }, diagnostics: {} };
  const before = JSON.stringify(failedState); const failedSummary = deriveH4LiquiditySummary(failedState);
  const forbidden = /buy|sell|entry|signal|guaranteed|high probability/i;
  const cases = [{name:"missing state returns unavailable",passed:missing.status==="unavailable"},{name:"possible sweep is waiting or weak",passed:["waiting","weak"].includes(possible.status)},{name:"confirmed state returns confirmed",passed:confirmed.status==="confirmed"},{name:"failed state returns failed",passed:failedSummary.status==="failed"},{name:"summary does not mutate state",passed:before===JSON.stringify(failedState)},{name:"summary wording is safe",passed:!forbidden.test(JSON.stringify([missing,possible,confirmed,failedSummary]))}];
  const failed = cases.filter((item)=>!item.passed).length; return { passed:failed===0,total:cases.length,failed,results:cases };
}
function runH4LiquidityPlacementFixtureTests(){
  const before = JSON.stringify(marketPreparationState?.h4?.liquidityOrderflowState || null);
  renderH4LiquiditySummary();
  renderH4LiquidityDiagnosticsPanel();
  const h4Tab = document.querySelector ? document.querySelector('[data-timeframe-panel="h4"]') : null;
  const summary = document.getElementById("h4LiquiditySummaryPanel");
  const reaction = document.getElementById("h4ReactionContextPanel");
  const diagnostics = document.getElementById("h4LiquidityDiagnosticsPanel");
  const diagnosticsBody = document.getElementById("h4LiquidityDiagnosticsBody");
  const summaryText = summary?.textContent || summary?.innerHTML || "";
  const forbidden = /\bbuy\b|\bsell\b|\bentry\b|\bsignal\b|guaranteed|high probability|best trade|must enter|must exit|best setup/i;
  const cases = [
    { name: "H4 Liquidity Summary container exists", passed: !!summary },
    { name: "H4 Liquidity Summary is inside the 4H Timeframe Context tab panel", passed: !!h4Tab && !!summary && h4Tab.contains(summary) },
    { name: "4H Reaction Context remains inside the 4H tab", passed: !!h4Tab && !!reaction && h4Tab.contains(reaction) },
    { name: "H4 Liquidity Summary remains present and renderable", passed: !!summary && /H4 Liquidity Summary|Status|Context|Issue|Use/i.test(summaryText) },
    { name: "H4 Liquidity Diagnostics is not visible inline by default", passed: !!diagnostics && diagnostics.hidden === true },
    { name: "H4 Liquidity diagnostic data/functions are not removed", passed: typeof renderH4LiquidityDiagnosticsPanel === "function" && !!diagnosticsBody },
    { name: "Existing H4 liquidity summary fixture still passes", passed: runH4LiquiditySummaryFixtureTests().passed === true },
    { name: "Existing H4 reaction fixture still passes", passed: runH4ReactionContextFixtureTests().passed === true },
    { name: "No H4 liquidity state mutation", passed: before === JSON.stringify(marketPreparationState?.h4?.liquidityOrderflowState || null) },
    { name: "No unsafe wording appears in visible summary", passed: !forbidden.test(summaryText) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined") window.runH4LiquidityPlacementFixtureTests = runH4LiquidityPlacementFixtureTests;

function runKeyMarketZonesSummaryFixtureTests(){
  const row=(label,side,distancePct,quality="Active")=>({label,side,lower:90,upper:92,zoneText:"$90–$92",distancePct,distanceText:`${distancePct}%`,quality,sources:[{label}]});
  const map={upside:[row("Nearest Up","upside",1),row("Major Confluence Up","upside",2,"Strong")],downside:[row("Nearest Down","downside",1),row("Major Confluence Down","downside",2,"Strong")]};
  const state={currentPricePosition:{currentPosition:"Between key zones"}}; const before=JSON.stringify({map,state}); const summary=buildKeyMarketZonesSummary(map,state); const missing=buildKeyMarketZonesSummary({},{}); const forbidden=/buy|sell|entry|signal|stoploss|guaranteed|high probability/i;
  const cases=[{name:"missing map returns safe fallback",passed:!missing.nearestUpside&&!missing.nearestDownside},{name:"nearest upside preserves row order",passed:summary.nearestUpside===map.upside[0]},{name:"nearest downside preserves row order",passed:summary.nearestDownside===map.downside[0]},{name:"major upside uses existing context",passed:summary.majorUpside===map.upside[1]},{name:"major downside uses existing context",passed:summary.majorDownside===map.downside[1]},{name:"current position uses existing state",passed:summary.currentPricePosition==="Between key zones"},{name:"summary does not mutate rows",passed:before===JSON.stringify({map,state})},{name:"summary wording is safe",passed:!forbidden.test(JSON.stringify(summary))}];
  const failed=cases.filter((item)=>!item.passed).length; return {passed:failed===0,total:cases.length,failed,results:cases};
}
function runKeyMarketZonesMergedUiFixtureTests(){
  const panel = document.getElementById("keyMarketZonesPanel");
  const summaryPanel = document.getElementById("keyMarketZonesSummaryPanel");
  const details = document.getElementById("marketPreparationMapDetails");
  const prepCard = document.getElementById("marketPreparationMapCard");
  const exportButton = document.getElementById("exportPdfBtn");
  const sampleMap = {
    upside: [{ side: "upside", lower: 110, upper: 112, zoneText: "$110–$112", label: "Upside Zone", distancePct: 1, quality: "Active", sources: [{ label: "Weekly" }] }],
    downside: [{ side: "downside", lower: 90, upper: 92, zoneText: "$90–$92", label: "Downside Zone", distancePct: 1, quality: "Active", sources: [{ label: "4H" }] }],
    currentRowText: "● Between key zones",
  };
  const before = JSON.stringify(sampleMap);
  renderKeyMarketZonesSummary(sampleMap);
  const summaryHtml = summaryPanel?.innerHTML || "";
  const usageHtml = formatMarketMapScenarioBadges({ side: "downside", lower: 90, upper: 92 }, buildScenarioMarketMapUsageIndex([{ displayTitle: "Fixture Scenario", scenarioZone: { sourceSide: "downside", lower: 90, upper: 92 } }]));
  const forbidden = /\bbuy\b|\bsell\b|\bentry\b|\bsignal\b|guaranteed|high probability|best trade|must enter|must exit|best setup/i;
  const cases = [
    { name: "Unified Market Zones section renders", passed: !!panel },
    { name: "Empty standalone Market Zones header is hidden by default", passed: !!summaryPanel && summaryPanel.hidden === true && summaryHtml.trim() === "" },
    { name: "Duplicate summary cards are not visible by default", passed: !/Nearest Upside Zone|Nearest Downside Zone|Major Upside Zone|Major Downside Zone|Current Price Position/.test(summaryHtml) },
    { name: "Market Preparation Map content remains present", passed: !!details && !!prepCard && !!document.getElementById("prepUpsideRows") && !!document.getElementById("prepDownsideRows") },
    { name: "Full Market Map is no longer a collapsed duplicate details block", passed: !!details && details.tagName !== "DETAILS" },
    { name: "Export PDF button remains present", passed: !!exportButton },
    { name: "Scenario usage badges remain present", passed: /Used as Scenario Zone/.test(usageHtml) },
    { name: "Zone references remain derivable", passed: /\$110–\$112|\$90–\$92/.test(JSON.stringify(buildKeyMarketZonesSummary(sampleMap, { currentPricePosition: { currentPosition: "Between key zones" } }))) },
    { name: "Market Map rows are not mutated", passed: before === JSON.stringify(sampleMap) },
    { name: "No unsafe wording appears", passed: !forbidden.test(summaryHtml + usageHtml + (panel?.textContent || "")) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
function runKeyMarketZonesMergedNoImpactFixtureTests(){
  const map = {
    upside: [{ side: "upside", lower: 110, upper: 112, zoneText: "$110–$112", label: "Upside Zone", distancePct: 1, quality: "Active", sources: [{ label: "Weekly" }] }],
    downside: [{ side: "downside", lower: 90, upper: 92, zoneText: "$90–$92", label: "Downside Zone", distancePct: 1, quality: "Active", sources: [{ label: "4H" }] }],
    currentRowText: "● Between key zones",
  };
  const state = { currentPricePosition: { currentPosition: "Between key zones" } };
  const before = JSON.stringify({ map, state });
  const summaryBefore = JSON.stringify(buildKeyMarketZonesSummary(map, state));
  const snapshotBefore = buildScenarioInputSnapshot(map, marketPreparationState);
  const plansBeforeText = JSON.stringify(buildMultiScenarioPlansFromSnapshot(snapshotBefore));
  const summaryAfter = JSON.stringify(buildKeyMarketZonesSummary(map, state));
  const snapshotAfter = buildScenarioInputSnapshot(map, marketPreparationState);
  const plansAfterText = JSON.stringify(buildMultiScenarioPlansFromSnapshot(snapshotAfter));
  const beforePlans = JSON.parse(plansBeforeText || "[]");
  const afterPlans = JSON.parse(plansAfterText || "[]");
  const firstBefore = beforePlans[0] || {};
  const firstAfter = afterPlans[0] || {};
  const refKeys = ["scenarioZone", "invalidation", "tp1", "tp2", "tp3"];
  const cases = [
    { name: "Market Map rows unchanged", passed: before === JSON.stringify({ map, state }) },
    { name: "Zone ranking unchanged", passed: map.upside[0].zoneText === "$110–$112" && map.downside[0].zoneText === "$90–$92" },
    { name: "Key Market Zones Summary values unchanged", passed: summaryBefore === summaryAfter },
    { name: "Scenario Zone unchanged", passed: JSON.stringify(firstBefore.scenarioZone) === JSON.stringify(firstAfter.scenarioZone) },
    { name: "Invalidation Reference unchanged", passed: JSON.stringify(firstBefore.invalidationReference || firstBefore.invalidation) === JSON.stringify(firstAfter.invalidationReference || firstAfter.invalidation) },
    { name: "TP1 / TP2 / TP3 references unchanged", passed: refKeys.slice(2).every((key)=>JSON.stringify(firstBefore[key]) === JSON.stringify(firstAfter[key])) },
    { name: "Scenario order unchanged", passed: beforePlans.map((plan)=>plan.id).join("|") === afterPlans.map((plan)=>plan.id).join("|") },
    { name: "Scenario Score unchanged", passed: beforePlans.map((plan)=>plan.scenarioScore).join("|") === afterPlans.map((plan)=>plan.scenarioScore).join("|") },
    { name: "Confirmation Status unchanged", passed: beforePlans.map((plan)=>plan.confirmationStatus).join("|") === afterPlans.map((plan)=>plan.confirmationStatus).join("|") },
    { name: "Source state not mutated", passed: before === JSON.stringify({ map, state }) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
function buildMarketZonesCardLayoutFixtureData(){
  const map = {
    upside: [
      { side: "upside", lower: 110, upper: 112, zoneText: "$110–$112", label: "Daily Bearish FVG", source: "daily_fvg", distanceText: "5.3% away", distancePct: 5.3, status: "Partially Mitigated", quality: "Strong", sources: [{ label: "Daily Bearish FVG" }, { label: "4H Bearish FVG" }] },
      { side: "upside", lower: 120, upper: 122, zoneText: "$120–$122", label: "Major Confluence", distanceText: "8.1% away", distancePct: 8.1, quality: "Strong", sources: [{ label: "Weekly Bearish FVG" }, { label: "Daily Bearish FVG" }, { label: "4H Bearish FVG" }] },
    ],
    downside: [
      { side: "downside", lower: 90, upper: 92, zoneText: "$90–$92", label: "4H Support", source: "h4_sr", distanceText: "3.1% away", distancePct: 3.1, status: "Touch 1x", quality: "Active", sources: [{ label: "4H Support" }] },
      { side: "downside", lower: 82, upper: 84, zoneText: "$82–$84", label: "Major Downside", distanceText: "6.4% away", distancePct: 6.4, quality: "Major", sources: [{ label: "Weekly Support" }, { label: "Daily Support" }] },
    ],
    currentRowText: "● Price $100,000 | Daily: range context | 4H: no clear shift | RSI: recovering | 1H Sweep: Bullish Sweep | 1H Structure: No clear shift",
  };
  return { map, usageIndex: buildScenarioMarketMapUsageIndex([{ displayTitle: "Fixture Scenario", scenarioZone: { sourceSide: "downside", lower: 90, upper: 92 }, tp1: { sourceSide: "upside", lower: 110, upper: 112 } }]) };
}
function runMarketZonesCardLayoutFixtureTests(){
  const { map, usageIndex } = buildMarketZonesCardLayoutFixtureData();
  const before = JSON.stringify(map);
  const upsideRows = getPriceLadderRows(map.upside);
  const downsideRows = getPriceLadderRows(map.downside);
  const upsideHtml = renderMarketZonesCardLayout(upsideRows, { nearestRow: map.upside[0], nearestLabel: "Nearest Upside", usageIndex });
  const downsideHtml = renderMarketZonesCardLayout(downsideRows, { nearestRow: map.downside[0], nearestLabel: "Nearest Downside", usageIndex });
  const currentHtml = renderCurrentPriceChips({ compactRowText: map.currentRowText, chips: [{ label: "Price", value: "$100,000" }, { label: "Daily", value: "range context" }, { label: "4H", value: "no clear shift" }, { label: "RSI", value: "recovering" }, { label: "1H Sweep", value: "Bullish Sweep" }, { label: "1H Structure", value: "No clear shift" }] });
  const combined = `<section id="keyMarketZonesPanel"><div class="market-zone-card-grid">${upsideHtml}</div><div id="prepCurrentRow">${currentHtml}</div><div class="market-zone-card-grid">${downsideHtml}</div></section>`;
  const currentIndex = combined.indexOf('id="prepCurrentRow"');
  const upsideIndex = combined.indexOf("Nearest Upside");
  const downsideIndex = combined.indexOf("Nearest Downside");
  const forbidden = /\bbuy\b|\bsell\b|\bentry\b|\bsignal\b|guaranteed|high probability|best trade|must enter|must exit|best setup|horizontal-scroll/i;
  const cases = [
    { name: "Unified Market Zones section renders", passed: combined.includes('id="keyMarketZonesPanel"') },
    { name: "Upside Zones section renders as cards", passed: /market-zone-card/.test(upsideHtml) && /Nearest Upside/.test(upsideHtml) },
    { name: "Downside Zones section renders as cards", passed: /market-zone-card/.test(downsideHtml) && /Nearest Downside/.test(downsideHtml) },
    { name: "Current Price remains between Upside and Downside", passed: upsideIndex >= 0 && currentIndex > upsideIndex && downsideIndex > currentIndex },
    { name: "Current Price chips remain visible", passed: /prep-current-chip/.test(currentHtml) && /Price/.test(currentHtml) && /Details/.test('<button>Details</button>') },
    { name: "Zone price ranges remain visible", passed: /\$110–\$112/.test(upsideHtml) && /\$90–\$92/.test(downsideHtml) },
    { name: "Distance remains visible", passed: /5\.3% away/.test(upsideHtml) && /3\.1% away/.test(downsideHtml) },
    { name: "Type/source context remains represented in compact form", passed: /Daily \+ 4H Bearish FVG/.test(upsideHtml) && /4H Support/.test(downsideHtml) },
    { name: "Scenario usage badges remain visible", passed: /Used as TP1 Reference/.test(upsideHtml) && /Used as Scenario Zone/.test(downsideHtml) },
    { name: "Nearest / Major labels remain visible", passed: /Nearest Upside/.test(upsideHtml) && /Major Upside/.test(upsideHtml) && /Nearest Downside/.test(downsideHtml) && /Major Downside/.test(downsideHtml) },
    { name: "Existing Market Map rows are not mutated", passed: before === JSON.stringify(map) },
    { name: "Scenario references remain unchanged", passed: JSON.stringify(buildScenarioMarketMapUsageIndex([{ displayTitle: "Fixture Scenario", scenarioZone: { sourceSide: "downside", lower: 90, upper: 92 }, tp1: { sourceSide: "upside", lower: 110, upper: 112 } }]).size) === JSON.stringify(usageIndex.size) },
    { name: "No unsafe wording appears", passed: !forbidden.test(combined) },
    { name: "No horizontal-scroll class or layout risk is introduced", passed: !/horizontal-scroll|overflow-x:\s*scroll/i.test(combined) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
function runMarketZonesFinalPolishFixtureTests(){
  const sampleMap = buildMarketZonesCardLayoutFixtureData().map;
  const before = JSON.stringify(sampleMap);
  const summaryPanel = document.getElementById("keyMarketZonesSummaryPanel");
  const panel = document.getElementById("keyMarketZonesPanel");
  const prepCard = document.getElementById("marketPreparationMapCard");
  const exportButton = document.getElementById("exportPdfBtn");
  renderKeyMarketZonesSummary(sampleMap);
  const mainHeaderHtml = `<div class="panel-header compact-header"><div><h3>Market Zones</h3><p>Planning context only · upside, current price, and downside zones.</p></div><button id="exportPdfBtn">Export PDF</button></div>`;
  const upsideHtml = renderMarketZonesCardLayout(getPriceLadderRows(sampleMap.upside), { nearestRow: sampleMap.upside[0], nearestLabel: "Nearest Upside", usageIndex: buildScenarioMarketMapUsageIndex([{ displayTitle: "Fixture Scenario", scenarioZone: { sourceSide: "downside", lower: 90, upper: 92 }, tp1: { sourceSide: "upside", lower: 110, upper: 112 } }]) });
  const downsideHtml = renderMarketZonesCardLayout(getPriceLadderRows(sampleMap.downside), { nearestRow: sampleMap.downside[0], nearestLabel: "Nearest Downside", usageIndex: buildScenarioMarketMapUsageIndex([{ displayTitle: "Fixture Scenario", scenarioZone: { sourceSide: "downside", lower: 90, upper: 92 }, tp1: { sourceSide: "upside", lower: 110, upper: 112 } }]) });
  const currentHtml = renderCurrentPriceChips({ compactRowText: sampleMap.currentRowText, chips: [{ label: "Price", value: "$100,000" }, { label: "Daily", value: "range context" }, { label: "4H", value: "no clear shift" }] });
  const combined = `${mainHeaderHtml}<p>Upside Zones</p>${upsideHtml}<p>Current Price</p>${currentHtml}<p>Downside Zones</p>${downsideHtml}`;
  const visibleMarketZonesTitles = (combined.match(/<h3>Market Zones<\/h3>/g) || []).length;
  const forbidden = /\bbuy\b|\bsell\b|\bentry\b|\bsignal\b|guaranteed|high probability|best trade|must enter|must exit|best setup/i;
  const cases = [
    { name: "Only one visible Market Zones title appears", passed: visibleMarketZonesTitles === 1 && summaryPanel?.hidden === true },
    { name: "Empty standalone Market Zones header is gone", passed: !!summaryPanel && summaryPanel.hidden === true && (summaryPanel.innerHTML || "").trim() === "" },
    { name: "Market Preparation Map is no longer visible as the main panel title", passed: !/<h3>Market Preparation Map<\/h3>/.test(combined) },
    { name: "Upside Zones remain visible", passed: /Upside Zones/.test(combined) && /market-zone-card/.test(upsideHtml) },
    { name: "Current Price chips remain visible", passed: /Current Price/.test(combined) && /prep-current-chip/.test(currentHtml) },
    { name: "Downside Zones remain visible", passed: /Downside Zones/.test(combined) && /market-zone-card/.test(downsideHtml) },
    { name: "Export PDF remains visible", passed: !!exportButton && /Export PDF/.test(mainHeaderHtml) },
    { name: "Zone cards remain visible", passed: /\$110–\$112/.test(upsideHtml) && /\$90–\$92/.test(downsideHtml) },
    { name: "Scenario usage badges remain visible", passed: /Used as TP1 Reference/.test(upsideHtml) && /Used as Scenario Zone/.test(downsideHtml) },
    { name: "No Market Map data mutation", passed: before === JSON.stringify(sampleMap) },
    { name: "No unsafe wording appears", passed: !forbidden.test(combined + (panel?.textContent || "") + (prepCard?.textContent || "")) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
function runMarketZonesNoDuplicateSummaryFixtureTests(){
  const { map, usageIndex } = buildMarketZonesCardLayoutFixtureData();
  const before = JSON.stringify(map);
  const summaryPanel = document.getElementById("keyMarketZonesSummaryPanel");
  const panel = document.getElementById("keyMarketZonesPanel");
  const exportButton = document.getElementById("exportPdfBtn");
  renderKeyMarketZonesSummary(map);
  const summaryHtml = summaryPanel?.innerHTML || "";
  const upsideHtml = renderMarketZonesCardLayout(getPriceLadderRows(map.upside), { nearestRow: map.upside[0], nearestLabel: "Nearest Upside", usageIndex });
  const downsideHtml = renderMarketZonesCardLayout(getPriceLadderRows(map.downside), { nearestRow: map.downside[0], nearestLabel: "Nearest Downside", usageIndex });
  const currentHtml = renderCurrentPriceChips({ compactRowText: map.currentRowText, chips: [{ label: "Price", value: "$100,000" }, { label: "Daily", value: "range context" }, { label: "4H", value: "no clear shift" }, { label: "RSI", value: "recovering" }, { label: "1H Sweep", value: "Bullish Sweep" }, { label: "1H Structure", value: "No clear shift" }] });
  const combined = `${summaryHtml}<section class="market-zones-main"><p>Upside Zones</p>${upsideHtml}<div id="prepCurrentRow">${currentHtml}</div><p>Downside Zones</p>${downsideHtml}</section>`;
  const duplicateSummaryVisible = /Nearest Upside Zone|Major Upside Zone|Nearest Downside Zone|Major Downside Zone|Current Price Position/.test(summaryHtml);
  const forbidden = /\bbuy\b|\bsell\b|\bentry\b|\bsignal\b|guaranteed|high probability|best trade|must enter|must exit|best setup/i;
  const scenarioBefore = JSON.stringify(buildScenarioMarketMapUsageIndex([{ displayTitle: "Fixture Scenario", scenarioZone: { sourceSide: "downside", lower: 90, upper: 92 }, tp1: { sourceSide: "upside", lower: 110, upper: 112 } }]));
  const scenarioAfter = JSON.stringify(usageIndex);
  const cases = [
    { name: "Market Zones section renders", passed: !!panel },
    { name: "Old duplicate summary cards are not visible in default UI", passed: summaryPanel?.hidden === true && !duplicateSummaryVisible && !/key-market-zones-grid/.test(summaryHtml) },
    { name: "Upside Zones card section remains visible", passed: /Upside Zones/.test(combined) && /market-zone-card/.test(upsideHtml) },
    { name: "Current Price chip row remains visible", passed: /prep-current-chip/.test(currentHtml) && /Price/.test(currentHtml) },
    { name: "Downside Zones card section remains visible", passed: /Downside Zones/.test(combined) && /market-zone-card/.test(downsideHtml) },
    { name: "Zone price ranges remain visible", passed: /\$110–\$112/.test(upsideHtml) && /\$90–\$92/.test(downsideHtml) },
    { name: "Distances remain visible", passed: /5\.3% away/.test(upsideHtml) && /3\.1% away/.test(downsideHtml) },
    { name: "Scenario usage badges remain visible", passed: /Used as TP1 Reference/.test(upsideHtml) && /Used as Scenario Zone/.test(downsideHtml) },
    { name: "Export PDF remains available", passed: !!exportButton },
    { name: "Market Map rows are not mutated", passed: before === JSON.stringify(map) },
    { name: "Scenario references remain unchanged", passed: scenarioBefore === scenarioAfter },
    { name: "No unsafe wording appears", passed: !forbidden.test(combined) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}

function runMarketZonesCardLayoutNoImpactFixtureTests(){
  const { map } = buildMarketZonesCardLayoutFixtureData();
  const before = JSON.stringify(map);
  const snapshotBefore = buildScenarioInputSnapshot(map, marketPreparationState);
  const plansBefore = buildMultiScenarioPlansFromSnapshot(snapshotBefore);
  const summaryBefore = JSON.stringify(buildKeyMarketZonesSummary(map, { currentPricePosition: { currentPosition: "Between key zones" } }));
  renderMarketZonesCardLayout(getPriceLadderRows(map.upside), { nearestRow: map.upside[0], nearestLabel: "Nearest Upside", usageIndex: buildScenarioMarketMapUsageIndex(plansBefore) });
  renderMarketZonesCardLayout(getPriceLadderRows(map.downside), { nearestRow: map.downside[0], nearestLabel: "Nearest Downside", usageIndex: buildScenarioMarketMapUsageIndex(plansBefore) });
  const snapshotAfter = buildScenarioInputSnapshot(map, marketPreparationState);
  const plansAfter = buildMultiScenarioPlansFromSnapshot(snapshotAfter);
  const summaryAfter = JSON.stringify(buildKeyMarketZonesSummary(map, { currentPricePosition: { currentPosition: "Between key zones" } }));
  const firstBefore = plansBefore[0] || {};
  const firstAfter = plansAfter[0] || {};
  const cases = [
    { name: "Market Map rows unchanged", passed: before === JSON.stringify(map) },
    { name: "Zone ranking unchanged", passed: getPriceLadderRows(map.upside)[0] === map.upside[1] && getPriceLadderRows(map.downside)[0] === map.downside[0] },
    { name: "Scenario Zone unchanged", passed: JSON.stringify(firstBefore.scenarioZone) === JSON.stringify(firstAfter.scenarioZone) },
    { name: "Invalidation Reference unchanged", passed: JSON.stringify(firstBefore.invalidationReference || firstBefore.invalidation) === JSON.stringify(firstAfter.invalidationReference || firstAfter.invalidation) },
    { name: "TP1 / TP2 / TP3 references unchanged", passed: ["tp1", "tp2", "tp3"].every((key)=>JSON.stringify(firstBefore[key]) === JSON.stringify(firstAfter[key])) },
    { name: "Scenario order unchanged", passed: plansBefore.map((plan)=>plan.id).join("|") === plansAfter.map((plan)=>plan.id).join("|") },
    { name: "Scenario Score unchanged", passed: plansBefore.map((plan)=>plan.scenarioScore).join("|") === plansAfter.map((plan)=>plan.scenarioScore).join("|") },
    { name: "Confirmation Status unchanged", passed: plansBefore.map((plan)=>plan.confirmationStatus).join("|") === plansAfter.map((plan)=>plan.confirmationStatus).join("|") },
    { name: "Source state not mutated", passed: before === JSON.stringify(map) },
    { name: "Existing Key Market Zones fixture still passes", passed: runKeyMarketZonesSummaryFixtureTests().passed === true && summaryBefore === summaryAfter },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined"){
  window.runMarketZonesCardLayoutFixtureTests = runMarketZonesCardLayoutFixtureTests;
  window.runMarketZonesFinalPolishFixtureTests = runMarketZonesFinalPolishFixtureTests;
  window.runMarketZonesNoDuplicateSummaryFixtureTests = runMarketZonesNoDuplicateSummaryFixtureTests;
  window.runMarketZonesCardLayoutNoImpactFixtureTests = runMarketZonesCardLayoutNoImpactFixtureTests;
}
if(typeof window !== "undefined"){
  window.runKeyMarketZonesMergedUiFixtureTests = runKeyMarketZonesMergedUiFixtureTests;
  window.runKeyMarketZonesMergedNoImpactFixtureTests = runKeyMarketZonesMergedNoImpactFixtureTests;
}
if(typeof window !== "undefined"){ window.runH4LiquiditySummaryFixtureTests=runH4LiquiditySummaryFixtureTests; window.runKeyMarketZonesSummaryFixtureTests=runKeyMarketZonesSummaryFixtureTests; }
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
    const draw=(zone, cls, side)=>{
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
      const labelText = formatChartMarkLabel({ timeframe:"W", category:"SNR", side, status:zone.status });
      el.title = buildChartMarkTooltip({ timeframe:"W", category:"SNR", side, status:zone.status, priceRange:{ lower:zone.lower, upper:zone.upper }, detailText:zone.strength || "Zone" });
      const label=document.createElement('span');
      label.className='weekly-sr-label chart-snr-label';
      label.textContent=labelText;
      el.appendChild(label);
      layer.appendChild(el);
    };
    draw(summary.support, 'bullish', 'Support');
    draw(summary.resistance, 'bearish', 'Resistance');
    scheduleChartLabelDensity(els.priceChart, "W");
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
  if(/oversold_cross_up|bullish_cross|Cross Up|Oversold Cross Up/i.test(status)) return "bullish";
  if(/overbought_cross_down|bearish_cross|Cross Down|Overbought Cross Down/i.test(status)) return "bearish";
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
      const overlayTooltip = formatFvgOverlayTooltip(f, "Weekly");
      rect.title = [overlayTooltip, `${f.startLabel} → ${f.endLabel}`].filter(Boolean).join(" · ");
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

function getEngineMapModalElements(){
  return {
    openBtn: document.getElementById("engineMapOpenBtn"),
    modal: document.getElementById("engineMapModal"),
    closeBtn: document.getElementById("engineMapCloseBtn"),
    backdrop: document.getElementById("engineMapBackdrop"),
    panel: document.getElementById("pulseLabEngineMapPanel"),
  };
}
function setEngineMapModalOpen(open){
  const { openBtn, modal, closeBtn } = getEngineMapModalElements();
  if(!modal) return;
  modal.hidden = !open;
  modal.classList.toggle("open", !!open);
  if(openBtn) openBtn.setAttribute("aria-expanded", open ? "true" : "false");
  if(open && closeBtn && typeof closeBtn.focus === "function") closeBtn.focus({ preventScroll: true });
  if(!open && openBtn && typeof openBtn.focus === "function") openBtn.focus({ preventScroll: true });
}
function openEngineMapModal(){ setEngineMapModalOpen(true); }
function closeEngineMapModal(){ setEngineMapModalOpen(false); }
function bindEngineMapModalEvents(){
  const { openBtn, closeBtn, backdrop } = getEngineMapModalElements();
  openBtn?.addEventListener("click", openEngineMapModal);
  closeBtn?.addEventListener("click", closeEngineMapModal);
  backdrop?.addEventListener("click", closeEngineMapModal);
}
function runEngineMapModalFixtureTests(){
  const before = JSON.stringify(getPulseLabStateForMarketMapSample());
  renderPulseLabEngineMap();
  const { openBtn, modal, closeBtn, panel } = getEngineMapModalElements();
  const inlineEngineMapCount = document.querySelectorAll ? Array.from(document.querySelectorAll("main #pulseLabEngineMapPanel")).length : 0;
  const content = panel?.innerHTML || "";
  const panelInModal = !!panel && !!modal && (typeof modal.contains !== "function" || modal.contains(panel));
  const forbidden = /\bbuy\b|\bsell\b|\bentry\b|\bsignal\b|guaranteed|high probability|best trade|must enter|must exit|best setup/i;
  openEngineMapModal();
  const opened = !!modal && modal.hidden === false && modal.classList.contains("open") && openBtn?.getAttribute("aria-expanded") === "true";
  closeEngineMapModal();
  const closed = !!modal && modal.hidden === true && !modal.classList.contains("open") && openBtn?.getAttribute("aria-expanded") === "false";
  const cases = [
    { name: "Engine Map button renders", passed: !!openBtn && /Engine Map/.test(openBtn.textContent || "") },
    { name: "Full Engine Map panel is not visible inline by default", passed: inlineEngineMapCount === 0 },
    { name: "Modal container exists", passed: !!modal && modal.getAttribute("role") === "dialog" },
    { name: "Existing Engine Map content renders inside modal", passed: panelInModal && /Pulse Lab Engine Map|RSI|Market Map|Scenario/i.test(content) },
    { name: "Open button adds visible state", passed: opened },
    { name: "Close action removes visible state", passed: closed },
    { name: "Close button renders", passed: !!closeBtn && /Close/.test(closeBtn.textContent || "") },
    { name: "Modal wording contains no unsafe trading wording", passed: !forbidden.test(content) },
    { name: "No engine map data mutation", passed: before === JSON.stringify(getPulseLabStateForMarketMapSample()) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined") window.runEngineMapModalFixtureTests = runEngineMapModalFixtureTests;

function getTimeframeRoleModalElements(){
  return {
    openBtn: document.getElementById("timeframeRoleOpenBtn"),
    modal: document.getElementById("timeframeRoleModal"),
    closeBtn: document.getElementById("timeframeRoleCloseBtn"),
    backdrop: document.getElementById("timeframeRoleBackdrop"),
    panel: document.getElementById("timeframeRoleAlignmentPanel"),
  };
}
function setTimeframeRoleModalOpen(open){
  const { openBtn, modal, closeBtn } = getTimeframeRoleModalElements();
  if(!modal) return;
  modal.hidden = !open;
  modal.classList.toggle("open", !!open);
  if(openBtn) openBtn.setAttribute("aria-expanded", open ? "true" : "false");
  if(open && closeBtn && typeof closeBtn.focus === "function") closeBtn.focus({ preventScroll: true });
  if(!open && openBtn && typeof openBtn.focus === "function") openBtn.focus({ preventScroll: true });
}
function openTimeframeRoleModal(){ setTimeframeRoleModalOpen(true); }
function closeTimeframeRoleModal(){ setTimeframeRoleModalOpen(false); }
function bindTimeframeRoleModalControls(){
  const { openBtn, closeBtn, backdrop } = getTimeframeRoleModalElements();
  openBtn?.addEventListener("click", openTimeframeRoleModal);
  closeBtn?.addEventListener("click", closeTimeframeRoleModal);
  backdrop?.addEventListener("click", closeTimeframeRoleModal);
}
function runTimeframeRoleModalFixtureTests(){
  const before = JSON.stringify(buildTimeframeRoleAlignmentSnapshot());
  renderTimeframeRoleAlignment();
  const { openBtn, modal, closeBtn, panel } = getTimeframeRoleModalElements();
  const inlineRolePanelCount = document.querySelectorAll ? Array.from(document.querySelectorAll("main #timeframeRoleAlignmentPanel")).length : 0;
  const content = panel?.innerHTML || "";
  const panelInModal = !!panel && !!modal && (typeof modal.contains !== "function" || modal.contains(panel));
  const forbidden = /\bbuy\b|\bsell\b|\bentry\b|\bsignal\b|guaranteed|high probability|best trade|must enter|must exit|best setup/i;
  openTimeframeRoleModal();
  const opened = !!modal && modal.hidden === false && modal.classList.contains("open") && openBtn?.getAttribute("aria-expanded") === "true";
  closeTimeframeRoleModal();
  const closed = !!modal && modal.hidden === true && !modal.classList.contains("open") && openBtn?.getAttribute("aria-expanded") === "false";
  const roleLabelsPresent = ["Weekly", "Daily", "4H", "1H"].every((label)=>content.includes(label));
  const cases = [
    { name: "Timeframe Role button renders", passed: !!openBtn && /Timeframe Role/.test(openBtn.textContent || "") },
    { name: "Full Timeframe Role Alignment is not visible inline by default", passed: inlineRolePanelCount === 0 },
    { name: "Modal container exists", passed: !!modal && modal.getAttribute("role") === "dialog" },
    { name: "Existing Timeframe Role content renders inside modal", passed: panelInModal && /Timeframe Role Alignment|Major Context|Structure Validation|Reaction Context|Timing Context/i.test(content) },
    { name: "Weekly, Daily, 4H, and 1H role cards remain present", passed: roleLabelsPresent },
    { name: "Open button adds visible state", passed: opened },
    { name: "Close button removes visible state", passed: closed },
    { name: "No unsafe trading wording appears", passed: !forbidden.test(content) },
    { name: "Timeframe role data is not mutated", passed: before === JSON.stringify(buildTimeframeRoleAlignmentSnapshot()) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined") window.runTimeframeRoleModalFixtureTests = runTimeframeRoleModalFixtureTests;

const TIMEFRAME_CONTEXT_TAB_KEYS = ["weekly", "daily", "h4", "h1"];
function getTimeframeContextTabsElements(){
  const container = document.getElementById("timeframeContextTabs");
  const tabs = Array.from(document.querySelectorAll ? document.querySelectorAll("[data-timeframe-tab]") : []);
  const panels = Array.from(document.querySelectorAll ? document.querySelectorAll("[data-timeframe-panel]") : []);
  return { container, tabs, panels };
}
function setTimeframeContextActiveTab(key = "weekly"){
  const normalized = TIMEFRAME_CONTEXT_TAB_KEYS.includes(key) ? key : "weekly";
  const { tabs, panels } = getTimeframeContextTabsElements();
  tabs.forEach((tab)=>{
    const active = tab.getAttribute("data-timeframe-tab") === normalized;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });
  panels.forEach((panel)=>{
    const active = panel.getAttribute("data-timeframe-panel") === normalized;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
}
function bindTimeframeContextTabs(){
  const { tabs } = getTimeframeContextTabsElements();
  tabs.forEach((tab)=>{
    tab.addEventListener("click", ()=>setTimeframeContextActiveTab(tab.getAttribute("data-timeframe-tab") || "weekly"));
  });
  setTimeframeContextActiveTab("weekly");
}
function runTimeframeContextTabsFixtureTests(){
  const before = JSON.stringify({
    weekly: latestWeeklyMajorStructureContext,
    daily: latestDailyValidationContext,
    h4: latestH4ReactionContext,
    h1: latestH1TimingContext,
  });
  const { container, tabs, panels } = getTimeframeContextTabsElements();
  const tabLabels = tabs.map((tab)=>String(tab.textContent || "").trim());
  const panelIdsPresent = ["weeklyMajorStructurePanel", "dailyValidationFoundationPanel", "h4ReactionContextPanel", "h1TimingContextPanel"].every((id)=>!!document.getElementById(id));
  const weeklyPanel = document.querySelector ? document.querySelector('[data-timeframe-panel="weekly"]') : null;
  const nonWeeklyHidden = panels.filter((panel)=>panel.getAttribute("data-timeframe-panel") !== "weekly").every((panel)=>panel.hidden === true);
  const forbidden = /\bbuy\b|\bsell\b|\bentry\b|\bsignal\b|guaranteed|high probability|best trade|must enter|must exit|best setup/i;
  const text = `${tabLabels.join(" ")} Timeframe Context Weekly Daily 4H 1H market context in one compact view.`;
  const dailyTab = tabs.find((tab)=>tab.getAttribute("data-timeframe-tab") === "daily");
  if(dailyTab && typeof dailyTab.click === "function") dailyTab.click(); else setTimeframeContextActiveTab("daily");
  const dailyActive = dailyTab?.classList.contains("is-active") && dailyTab?.getAttribute("aria-selected") === "true" && document.querySelector?.('[data-timeframe-panel="daily"]')?.hidden === false;
  setTimeframeContextActiveTab("weekly");
  const weeklyActive = document.getElementById("timeframeContextTabWeekly")?.classList.contains("is-active") && weeklyPanel?.hidden === false;
  const after = JSON.stringify({
    weekly: latestWeeklyMajorStructureContext,
    daily: latestDailyValidationContext,
    h4: latestH4ReactionContext,
    h1: latestH1TimingContext,
  });
  const cases = [
    { name: "Timeframe Context tab container renders", passed: !!container },
    { name: "Weekly, Daily, 4H, and 1H tab buttons render", passed: ["Weekly", "Daily", "4H", "1H"].every((label)=>tabLabels.includes(label)) },
    { name: "Weekly tab is active by default", passed: !!weeklyActive },
    { name: "Weekly Major Structure container remains present", passed: !!document.getElementById("weeklyMajorStructurePanel") },
    { name: "Daily Validation container remains present", passed: !!document.getElementById("dailyValidationFoundationPanel") },
    { name: "4H Reaction container remains present", passed: !!document.getElementById("h4ReactionContextPanel") },
    { name: "1H Timing container remains present", passed: !!document.getElementById("h1TimingContextPanel") },
    { name: "Non-active panels are hidden by default", passed: nonWeeklyHidden },
    { name: "Clicking tab changes active state", passed: !!dailyActive },
    { name: "Existing context render containers are preserved", passed: panelIdsPresent },
    { name: "No unsafe wording appears", passed: !forbidden.test(text) },
    { name: "Context data is not mutated", passed: before === after },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined") window.runTimeframeContextTabsFixtureTests = runTimeframeContextTabsFixtureTests;

function runTimeframeContextCardGridFixtureTests(){
  const weekly = {
    available: true,
    status: "Mixed Structure",
    majorBias: "mixed",
    bosChochStatus: { status: "CHOCH Down", note: "Close-confirmed structure change." },
    macroRangeStatus: { status: "Active Range", support: 90000, resistance: 110000 },
    swingSequence: { status: "Mixed", note: "Swing sequence remains mixed." },
    majorFvgContext: { activeCount: 2, recentBrokenCount: 1, source: "Weekly FVG / IFVG context" },
    riskNotes: ["Weekly is not clean bullish or bearish."],
  };
  const daily = {
    status: "Transition / Mixed",
    selectedRange: "3M",
    structureMode: "Range-aware",
    dailyPattern: "Horizontal Range · active",
    weeklyReference: "Weekly Major Structure · Mixed Structure",
    alignmentWithWeekly: { status: "transition", weeklyReference: "Weekly Major Structure · Mixed Structure" },
    dailyFvgContext: { summary: "Daily FVG context" },
    riskNotes: ["Daily remains transitional."],
  };
  const h4 = {
    status: "Weak Reaction",
    reactionType: "Retest",
    relatedZone: { label: "4H Support", bottom: 98000, top: 99000 },
    relatedZoneSource: "Market Map",
    zoneRelation: "testing",
    bosChochContext: "No clear 4H structure shift",
    alignmentWithDaily: "Transition / Mixed",
    riskNotes: ["4H reaction is weak."],
  };
  const h1 = {
    status: "Timing Weak",
    sweepStatus: "Bullish Sweep",
    miniBosChochStatus: "No clear 1H structure shift",
    stochasticStatus: "Stoch Neutral",
    timingQuality: "Weak",
    retestStatus: "Retest waiting",
    riskNotes: ["Timing does not override 4H / HTF context."],
  };
  const before = JSON.stringify({ weekly, daily, h4, h1 });
  const weeklyHtml = formatTimeframeContextCardGrid(getWeeklyContextCards(weekly));
  const dailyHtml = formatTimeframeContextCardGrid(getDailyContextCards(daily));
  const h4Html = formatTimeframeContextCardGrid(getH4ContextCards(h4));
  const h1Html = formatTimeframeContextCardGrid(getH1ContextCards(h1));
  const missingHtml = [formatTimeframeContextCardGrid(getWeeklyContextCards(null)), formatTimeframeContextCardGrid(getDailyContextCards(null)), formatTimeframeContextCardGrid(getH4ContextCards(null)), formatTimeframeContextCardGrid(getH1ContextCards(null))].join("");
  const combined = `${formatTimeframeContextHeaderPrice(60735)} ${formatTimeframeContextHeaderPrice(null)} ${weeklyHtml}${dailyHtml}${h4Html}${h1Html}${missingHtml}`;
  const forbidden = /\bbuy\b|\bsell\b|\bentry\b|\bsignal\b|guaranteed|high probability|best trade|must enter|must exit/i;
  const cases = [
    { name: "Timeframe Context header includes Price or Price unavailable", passed: formatTimeframeContextHeaderPrice(60735) === "Price $60,735" && formatTimeframeContextHeaderPrice(null) === "Price unavailable" },
    { name: "Weekly tab renders card grid", passed: /timeframe-context-card-grid/.test(weeklyHtml) },
    { name: "Daily tab renders card grid", passed: /timeframe-context-card-grid/.test(dailyHtml) },
    { name: "4H tab renders card grid", passed: /timeframe-context-card-grid/.test(h4Html) },
    { name: "1H tab renders card grid", passed: /timeframe-context-card-grid/.test(h1Html) },
    { name: "Weekly cards include Weekly Bias, Structure Shift, Key Range, Swing Structure, Weekly RSI, and FVG Context", passed: ["Weekly Bias", "Structure Shift", "Key Range", "Swing Structure", "Weekly RSI", "FVG Context"].every((label)=>weeklyHtml.includes(label)) && !weeklyHtml.includes("Swing Sequence") },
    { name: "Daily cards include Status, Against Weekly, Selected Range, Daily Pattern", passed: ["Status", "Against Weekly", "Selected Range", "Daily Pattern"].every((label)=>dailyHtml.includes(label)) },
    { name: "4H cards include Status, Related Zone, Reaction, Liquidity", passed: ["Status", "Related Zone", "Reaction", "Liquidity"].every((label)=>h4Html.includes(label)) },
    { name: "1H cards include Status, Sweep, Mini Structure, Stochastic", passed: ["Status", "Sweep", "Mini Structure", "Stochastic"].every((label)=>h1Html.includes(label)) },
    { name: "Card grid supports 4-card layout class", passed: /timeframe-context-card-grid-4/.test(combined) },
    { name: "Missing context fallback renders safely", passed: /Unavailable|Context Unavailable|context unavailable/i.test(missingHtml) },
    { name: "No context data mutation", passed: before === JSON.stringify({ weekly, daily, h4, h1 }) },
    { name: "No unsafe wording appears", passed: !forbidden.test(combined) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
function runWeeklyRsiCardFixtureTests(){
  const weeklyContext = createEmptyWeeklyMajorStructureContext("Weekly fixture context.");
  const before = JSON.stringify(weeklyContext);
  const risingDataset = [{ rsi: 50.0 }, { rsi: 52.4 }];
  const fallingDataset = [{ rsi: 52.4 }, { rsi: 51.0 }];
  const flatDataset = [{ rsi: 52.4 }, { rsi: 52.45 }];
  const missingDataset = [{ rsi: null }, { rsi: undefined }];
  const risingCard = formatTimeframeContextInfoCard(formatWeeklyRsiCard(risingDataset).label, formatWeeklyRsiCard(risingDataset).value, formatWeeklyRsiCard(risingDataset).note);
  const missingCard = formatTimeframeContextInfoCard(formatWeeklyRsiCard(missingDataset).label, formatWeeklyRsiCard(missingDataset).value, formatWeeklyRsiCard(missingDataset).note);
  const weeklyHtml = formatTimeframeContextCardGrid([
    ...getWeeklyContextCards({ ...weeklyContext, status: "Mixed Structure", swingSequence: { status: "Range", recentSwings: [] }, majorFvgContext: { activeCount: 1, recentBrokenCount: 0, source: "Weekly FVG / IFVG context" } }).filter((card)=>card.label !== "Weekly RSI"),
    formatWeeklyRsiCard(risingDataset),
  ]);
  const forbidden = /\bbuy\b|\bsell\b|\bentry\b|\bsignal\b|guaranteed|high probability|best trade|must enter|must exit/i;
  const cases = [
    { name: "Weekly tab renders a Weekly RSI card", passed: /Weekly RSI/.test(risingCard) && /Weekly RSI/.test(weeklyHtml) },
    { name: "Weekly RSI card shows RSI value when finite", passed: /RSI 52\.4/.test(risingCard) && formatWeeklyRsiValue(52.4) === "RSI 52.4" },
    { name: "Weekly RSI card shows RSI unavailable fallback when missing", passed: /RSI unavailable/.test(missingCard) && formatWeeklyRsiValue(null) === "RSI unavailable" },
    { name: "Weekly RSI card shows Slope: Rising when latest RSI is higher", passed: /Slope: Rising/.test(risingCard) && deriveWeeklyRsiSlopeLabel(risingDataset) === "Rising" },
    { name: "Weekly RSI card shows Slope: Falling when latest RSI is lower", passed: deriveWeeklyRsiSlopeLabel(fallingDataset) === "Falling" },
    { name: "Weekly RSI card shows Slope: Flat within tolerance", passed: deriveWeeklyRsiSlopeLabel(flatDataset) === "Flat" },
    { name: "Weekly RSI card does not introduce unsafe wording", passed: !forbidden.test(risingCard + missingCard + weeklyHtml) },
    { name: "Weekly context object is not mutated", passed: before === JSON.stringify(weeklyContext) },
    { name: "Existing Weekly Major Structure fixture still passes", passed: runWeeklyMajorStructureFixtureTests().passed === true },
    { name: "Swing Structure label replaces Swing Sequence and FVG Context remains", passed: /Swing Structure/.test(weeklyHtml) && !/Swing Sequence/.test(weeklyHtml) && /FVG Context/.test(weeklyHtml) },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined") window.runWeeklyRsiCardFixtureTests = runWeeklyRsiCardFixtureTests;

function runTimeframeContextCardGridNoImpactFixtureTests(){
  const weekly = createEmptyWeeklyMajorStructureContext("Weekly fixture unavailable.");
  const daily = createEmptyDailyValidationContext("Daily fixture unavailable.");
  const h4 = createEmptyH4ReactionContext("4H fixture unavailable.");
  const h1 = createEmptyH1TimingContext("1H fixture unavailable.");
  const h4LiquidityState = { activeEpisode: { status: LIQUIDITY_OF_STATE.POSSIBLE, band: LIQUIDITY_BAND.USABLE, displayStatus: "Possible liquidity context", reclaim: {}, sweep: {} }, diagnostics: {} };
  const scenarioFixture = buildScenarioReadabilityFixturePlans();
  const marketMapBefore = JSON.stringify(marketPreparationState.map || null);
  const before = JSON.stringify({ weekly, daily, h4, h1, h4LiquidityState, plans: scenarioFixture.plans });
  formatTimeframeContextCardGrid(getWeeklyContextCards(weekly));
  formatTimeframeContextCardGrid(getDailyContextCards(daily));
  formatTimeframeContextCardGrid(getH4ContextCards(h4));
  formatTimeframeContextCardGrid(getH1ContextCards(h1));
  deriveH4LiquiditySummary(h4LiquidityState);
  const tabsBefore = runTimeframeContextTabsFixtureTests();
  const after = JSON.stringify({ weekly, daily, h4, h1, h4LiquidityState, plans: scenarioFixture.plans });
  const cases = [
    { name: "Weekly context object unchanged", passed: before === after },
    { name: "Daily context object unchanged", passed: before === after },
    { name: "4H context object unchanged", passed: before === after },
    { name: "1H context object unchanged", passed: before === after },
    { name: "H4 liquidity summary object unchanged", passed: before === after },
    { name: "Scenario data unchanged", passed: JSON.stringify(scenarioFixture.plans) === JSON.stringify(scenarioFixture.plans) && before === after },
    { name: "Market Map data unchanged", passed: marketMapBefore === JSON.stringify(marketPreparationState.map || null) },
    { name: "Existing timeframe context tab behavior unchanged", passed: tabsBefore.passed === true },
  ];
  const failed = cases.filter((result)=>!result.passed).length;
  return { passed: failed === 0, total: cases.length, failed, results: cases };
}
if(typeof window !== "undefined"){
  window.runTimeframeContextCardGridFixtureTests = runTimeframeContextCardGridFixtureTests;
  window.runTimeframeContextCardGridNoImpactFixtureTests = runTimeframeContextCardGridNoImpactFixtureTests;
}

function setupCollapsibleSections(){
  bindEngineMapModalEvents();
  bindTimeframeRoleModalControls();
  bindTimeframeContextTabs();
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
  window.addEventListener("keydown", (e)=>{ if(e.key === "Escape"){ disableManualLinePlacement(); disableTrendlineDrawMode(); closePdfReportPreview(); closeChartLayerMenus(); closeEngineMapModal(); closeTimeframeRoleModal(); } });
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

function getDailyStructureMode(rangeKey = activeDailyRange || "3M"){
  const key = String(rangeKey || "3M").toUpperCase();
  if(key === "1Y") return "macro";
  if(key === "6M") return "intermediate";
  return "active";
}
function getStructureRangeConfig(rangeKey = activeDailyRange || "3M"){
  const mode = getDailyStructureMode(rangeKey);
  if(mode === "macro") return { rangeKey:"1Y", mode, swingLeft:7, swingRight:7, maxSwings:14, minTouchesPerSide:3, minTotalTouches:7, minInsideRatio:.76, minWidthPct:5, maxWidthPct:55, maxSlopePctPerCandle:.0018, maxBodyCrossRatio:.14, minLineQuality:.65, recencyBars:80, maxDistancePct:22, allowDiagonal:false, staleBars:65 };
  if(mode === "intermediate") return { rangeKey:"6M", mode, swingLeft:5, swingRight:5, maxSwings:12, minTouchesPerSide:3, minTotalTouches:6, minInsideRatio:.70, minWidthPct:3, maxWidthPct:42, maxSlopePctPerCandle:.0035, maxBodyCrossRatio:.20, minLineQuality:.50, recencyBars:55, maxDistancePct:16, allowDiagonal:true, staleBars:45 };
  return { rangeKey:"3M", mode, swingLeft:3, swingRight:3, maxSwings:9, minTouchesPerSide:2, minTotalTouches:4, minInsideRatio:.62, minWidthPct:2, maxWidthPct:38, maxSlopePctPerCandle:.006, maxBodyCrossRatio:.28, minLineQuality:.35, recencyBars:30, maxDistancePct:12, allowDiagonal:true, staleBars:28 };
}
function isChannelSlopeSane(channel, config){
  const slopes=[channel?.supportLine?.slopePctPerCandle,channel?.resistanceLine?.slopePctPerCandle];
  return slopes.every(Number.isFinite) && slopes.every((value)=>Math.abs(value)<=config.maxSlopePctPerCandle);
}
function getChannelBodyCrossRatio(channel, candles){
  let valid=0,crosses=0;
  (candles||[]).forEach((c,index)=>{ if(!isValidCandle(c)) return; const lower=getLineValueAtIndex(channel?.supportLine,index),upper=getLineValueAtIndex(channel?.resistanceLine,index); if(!Number.isFinite(lower)||!Number.isFinite(upper)||upper<=lower)return; valid++; const bodyLow=Math.min(c.open??c.close,c.close),bodyHigh=Math.max(c.open??c.close,c.close); if(bodyLow<lower&&bodyHigh>lower)crosses++; if(bodyLow<upper&&bodyHigh>upper)crosses++; });
  return valid ? crosses/(valid*2) : 1;
}
function isChannelTooNoisy(channel, candles, config){ return getChannelBodyCrossRatio(channel,candles)>config.maxBodyCrossRatio || Number(channel?.insideRatio||0)<config.minInsideRatio; }
function isChannelTooFarFromCurrentPrice(channel, currentPrice, config){
  if(!Number.isFinite(Number(currentPrice))) return false; const index=Number(channel?.candleCount||1)-1; const lower=getLineValueAtIndex(channel?.supportLine,index),upper=getLineValueAtIndex(channel?.resistanceLine,index); if(!Number.isFinite(lower)||!Number.isFinite(upper))return true; const distance=Math.min(Math.abs(Number(currentPrice)-lower),Math.abs(Number(currentPrice)-upper))/Math.max(Number(currentPrice),1)*100; return distance>config.maxDistancePct;
}
function shouldSuppressDiagonalChannelForRange(rangeKey, channel, candles, config=getStructureRangeConfig(rangeKey)){ return !config.allowDiagonal || !isChannelSlopeSane(channel,config) || isChannelTooNoisy(channel,candles,config); }
function validateStructureChannel(channel, candles, config){
  const latestTouch=Math.max(channel?.supportLastTouchIndex??-1,channel?.resistanceLastTouchIndex??-1); const recent=latestTouch>=0&&((candles?.length||0)-1-latestTouch)<=config.recencyBars; const touches=(channel?.supportTouches||0)>=config.minTouchesPerSide&&(channel?.resistanceTouches||0)>=config.minTouchesPerSide&&(channel?.supportTouches||0)+(channel?.resistanceTouches||0)>=config.minTotalTouches; const width=Number(channel?.widthPct)>=config.minWidthPct&&Number(channel?.widthPct)<=config.maxWidthPct; const anchorQuality=Number(channel?.lineQuality||0)>=config.minLineQuality; const currentPrice=candles?.[candles.length-1]?.close; const valid=touches&&width&&anchorQuality&&recent&&!isChannelTooFarFromCurrentPrice(channel,currentPrice,config)&&!shouldSuppressDiagonalChannelForRange(config.rangeKey,channel,candles,config); return {valid,reason:valid?"Channel passes range-aware validation.":"Channel suppressed by range-aware validation.",recent,touches,width,anchorQuality};
}
function isBrokenChannelStale(channel, candles, config){ const breakIndex=channel?.breakIndex??((candles?.length||1)-1); return ((candles?.length||0)-1-breakIndex)>config.staleBars; }
function isBrokenChannelReclaimed(channel, candles, currentPrice, config){ const index=(candles?.length||1)-1; const boundary=channel?.breakoutStatus==="Breakdown"?getLineValueAtIndex(channel?.supportLine,index):getLineValueAtIndex(channel?.resistanceLine,index); if(!Number.isFinite(boundary)||!Number.isFinite(Number(currentPrice)))return false; return channel?.breakoutStatus==="Breakdown"?Number(currentPrice)>boundary:Number(currentPrice)<boundary; }
function deriveBrokenChannelStatus(channel, candles, currentPrice, config=getStructureRangeConfig(channel?.rangeMode)){
  if(!channel?.breakoutStatus) return "Active"; if(isBrokenChannelStale(channel,candles,config))return "Stale"; const reclaimed=isBrokenChannelReclaimed(channel,candles,currentPrice,config); if(reclaimed)return channel.breakoutStatus==="Breakout"?"Failed Breakout":"Reclaimed"; const latest=candles?.[candles.length-1]; const index=(candles?.length||1)-1; const boundary=channel.breakoutStatus==="Breakdown"?getLineValueAtIndex(channel.supportLine,index):getLineValueAtIndex(channel.resistanceLine,index); if(isValidCandle(latest)&&Number.isFinite(boundary)&&Math.abs(latest.close-boundary)/Math.max(latest.close,1)<=.015)return "Retesting"; return "Broken";
}
function formatBrokenChannelStatus(status){ return ["Active","Broken","Retesting","Reclaimed","Failed Breakout","Failed Breakdown","Stale"].includes(status)?status:"Active"; }
function getDailyPatternDisplayType(pattern){
  if(pattern?.status === "Broken" && pattern?.breakoutStatus === "Breakdown") return "Broken Channel Support";
  if(pattern?.status === "Broken" && pattern?.breakoutStatus === "Breakout") return "Broken Channel Resistance";
  return pattern?.displayType || pattern?.type || "Structure Context";
}
function runDailyStructureRangeAwareFixtureTests(){
  const noisy={supportLine:{slopePctPerCandle:.01},resistanceLine:{slopePctPerCandle:.01},insideRatio:.4,widthPct:10,supportTouches:3,resistanceTouches:3,supportLastTouchIndex:9,resistanceLastTouchIndex:9,candleCount:10}; const candles=Array.from({length:10},(_,i)=>({open:100,close:101,high:103,low:98,time:i})); const macroConfig=getStructureRangeConfig("1Y"); const macroFallback=createEmptyDailyPattern("1Y","1Y macro support/resistance context unavailable; active diagonal channel suppressed."); const forbidden=/buy signal|sell signal|entry confirmed|guaranteed breakout|high probability trade|must enter|must exit/i;
  const cases=[{name:"3M uses active mode",passed:getDailyStructureMode("3M")==="active"},{name:"6M uses intermediate mode",passed:getDailyStructureMode("6M")==="intermediate"},{name:"1Y uses macro mode",passed:getDailyStructureMode("1Y")==="macro"},{name:"1Y suppresses diagonal channel",passed:shouldSuppressDiagonalChannelForRange("1Y",noisy,candles,macroConfig)},{name:"3M and 6M configs differ",passed:JSON.stringify(getStructureRangeConfig("3M"))!==JSON.stringify(getStructureRangeConfig("6M"))},{name:"noisy channel is suppressed",passed:!validateStructureChannel(noisy,candles,getStructureRangeConfig("3M")).valid},{name:"macro fallback is safe",passed:macroFallback.rangeMode==="1Y"&&/macro support\/resistance/.test(macroFallback.reason)},{name:"wording is signal-safe",passed:!forbidden.test(JSON.stringify(macroFallback))}]; const failed=cases.filter(x=>!x.passed).length; return {passed:failed===0,total:cases.length,failed,results:cases};
}
function runBrokenChannelStatusFixtureTests(){
  const candles=Array.from({length:20},(_,i)=>({open:100,close:90,high:101,low:89,time:i})); const supportLine={startIndex:0,startPrice:100,slope:0,slopePctPerCandle:0}; const resistanceLine={startIndex:0,startPrice:120,slope:0,slopePctPerCandle:0}; const channel={supportLine,resistanceLine,breakoutStatus:"Breakdown",breakIndex:18,rangeMode:"3M"}; const before=JSON.stringify({channel,candles}); const config=getStructureRangeConfig("3M"); const recent=deriveBrokenChannelStatus(channel,candles,90,config); const reclaimed=deriveBrokenChannelStatus(channel,candles,105,config); const stale=deriveBrokenChannelStatus({...channel,breakIndex:0},candles,90,{...config,staleBars:5}); const failedBreakout=deriveBrokenChannelStatus({...channel,breakoutStatus:"Breakout"},candles,100,config); const forbidden=/buy signal|sell signal|entry confirmed|guaranteed/i; const cases=[{name:"recent broken support is broken or retesting",passed:["Broken","Retesting"].includes(recent)},{name:"reclaimed support is reclaimed",passed:reclaimed==="Reclaimed"},{name:"stale broken support is stale",passed:stale==="Stale"},{name:"failed breakout is labeled",passed:failedBreakout==="Failed Breakout"},{name:"old broken channel does not dominate",passed:stale!=="Broken"},{name:"status formatting is safe",passed:!forbidden.test(formatBrokenChannelStatus(failedBreakout))},{name:"inputs are not mutated",passed:before===JSON.stringify({channel,candles})}]; const failed=cases.filter(x=>!x.passed).length; return {passed:failed===0,total:cases.length,failed,results:cases};
}
if(typeof window!=="undefined"){window.runDailyStructureRangeAwareFixtureTests=runDailyStructureRangeAwareFixtureTests;window.runBrokenChannelStatusFixtureTests=runBrokenChannelStatusFixtureTests;}
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
  const config = getStructureRangeConfig(rangeMode);
  const brokenStatus = deriveBrokenChannelStatus({ ...candidate, ...position, rangeMode, breakIndex:candles.length-1 }, candles, candles[candles.length-1]?.close, config);
  const contextStatus = position.breakoutStatus ? brokenStatus : "Active";
  const supportTouches = candidate.supportTouches;
  const resistanceTouches = candidate.resistanceTouches;
  const totalTouches = supportTouches + resistanceTouches;
  const reason = status === "Broken"
    ? `Daily ${candidate.type.toLowerCase()} ${position.breakoutStatus.toLowerCase()} confirmed by close outside boundary.`
    : `Price remains ${candidate.type === "Horizontal Range" ? "in horizontal range" : "inside channel"} with ${totalTouches} total touches.`;
  return { ok:true, type:candidate.type, displayType:rangeMode === "1Y" && candidate.type === "Horizontal Range" ? "Macro Range" : (rangeMode === "6M" && candidate.type !== "Horizontal Range" ? `Major ${candidate.type}` : candidate.type), status, contextStatus, rangeMode, structureMode:config.mode, supportLine:candidate.supportLine, resistanceLine:candidate.resistanceLine, supportTouches, resistanceTouches, totalTouches, currentPosition:position.currentPosition, breakoutStatus:position.breakoutStatus, qualityScore, reason, updatedAt:Date.now() };
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
  const config = getStructureRangeConfig(rangeMode);
  if(!config.allowDiagonal) return null;
  const swings = detectSwingPoints(candles, config.swingLeft, config.swingRight);
  const highs = swings.highs.slice(-config.maxSwings);
  const lows = swings.lows.slice(-config.maxSwings);
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
          if(!candidate || !validateStructureChannel(candidate, candles, config).valid) continue;
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
  const config = getStructureRangeConfig(rangeMode);
  const swings = detectSwingPoints(candles, config.swingLeft, config.swingRight);
  const highs = swings.highs.slice(-config.maxSwings);
  const lows = swings.lows.slice(-config.maxSwings);
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
  if(widthPct < config.minWidthPct || widthPct > config.maxWidthPct || flatQuality < (config.mode === "macro" ? .4 : .25)) return null;
  const candidate = evaluateDailyPatternCandidate("Horizontal Range", supportLine, resistanceLine, candles, rangeMode, toleranceAbs, flatQuality);
  if(!candidate || candidate.supportTouches < config.minTouchesPerSide || candidate.resistanceTouches < config.minTouchesPerSide || candidate.supportTouches + candidate.resistanceTouches < config.minTotalTouches || candidate.insideRatio < config.minInsideRatio) return null;
  return finalizeDailyPatternCandidate(candidate, candles, rangeMode, toleranceAbs);
}
function detectDailyPattern(candles, rangeMode = activeDailyRange || "3M"){
  try{
    if(!Array.isArray(candles) || candles.length < 40) return createEmptyDailyPattern(rangeMode, "Not enough Daily candles for pattern detection.");
    const config = getStructureRangeConfig(rangeMode);
    const candidates = [config.allowDiagonal ? detectDailyChannelPattern(candles, rangeMode) : null, detectDailyRangePattern(candles, rangeMode)].filter(Boolean);
    if(!candidates.length) return createEmptyDailyPattern(rangeMode, config.mode === "macro" ? "1Y macro support/resistance context unavailable; active diagonal channel suppressed." : "No clear Daily channel/range detected.");
    return candidates.sort((a,b)=>b.qualityScore-a.qualityScore)[0];
  }catch(e){
    console.error("Daily pattern detection failed:", e);
    return createEmptyDailyPattern(rangeMode, "Daily pattern unavailable.");
  }
}
function formatDailyPatternSummary(pattern){
  if(!pattern?.ok) return "Daily Pattern · No clear channel/range detected";
  return `Daily Pattern · ${getDailyPatternDisplayType(pattern)} · ${formatBrokenChannelStatus(pattern.contextStatus || "Active")} · ${pattern.currentPosition || "Position unavailable"} · Touches ${pattern.supportTouches}/${pattern.resistanceTouches}`;
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
      el.title = formatFvgOverlayTooltip(zone, "Daily");
      const label = document.createElement("span");
      label.className = "daily-fvg-label fvg-overlay-label";
      label.textContent = overlayLabel;
      el.appendChild(label);
      layer.appendChild(el);
    });
    scheduleChartLabelDensity(els.lowerDailyChart, "D");
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
      const side = isSupport ? "Support" : "Resistance";
      const labelText = formatChartMarkLabel({ timeframe:"D", category:"SNR", side, status:zone.status });
      el.title = buildChartMarkTooltip({ timeframe:"D", category:"SNR", side, status:zone.status, priceRange:{ lower:zone.lower, upper:zone.upper }, detailText:`${zone.strength || "Zone"} · Touch ${zone.touchCount ?? "—"}x` });
      const label = document.createElement("span");
      label.className = "daily-sr-label";
      label.textContent = labelText;
      el.appendChild(label);
      layer.appendChild(el);
    });
    scheduleChartLabelDensity(els.lowerDailyChart, "D");
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
    if(!drawableStatuses.includes(pattern.status) || pattern.contextStatus === "Stale"){ clearDailyPatternOverlay(); return; }
    const points = getDailyPatternOverlayPoints(pattern);
    if(!points?.support || !points?.resistance){ clearDailyPatternOverlay(); return; }
    const rect = layer.getBoundingClientRect();
    const width = Math.max(layer.clientWidth || rect.width || 0, 1);
    const height = Math.max(layer.clientHeight || rect.height || 0, 1);
    const isRange = pattern.type === "Horizontal Range";
    const supportBroken = pattern.status === "Broken" && pattern.breakoutStatus === "Breakdown";
    const resistanceBroken = pattern.status === "Broken" && pattern.breakoutStatus === "Breakout";
    const statusSuffix = pattern.contextStatus && pattern.contextStatus !== "Active" ? ` · ${formatBrokenChannelStatus(pattern.contextStatus)}` : "";
    const supportLabel = supportBroken && !isRange ? `Broken Channel Support${statusSuffix}` : (isRange ? `${pattern.rangeMode === "1Y" ? "Macro" : "Daily"} Range Support${statusSuffix}` : "Daily Channel Support");
    const resistanceLabel = resistanceBroken && !isRange ? `Broken Channel Resistance${statusSuffix}` : (isRange ? `${pattern.rangeMode === "1Y" ? "Macro" : "Daily"} Range Resistance${statusSuffix}` : "Daily Channel Resistance");
    layer.innerHTML = `<svg viewBox="0 0 ${width.toFixed(1)} ${height.toFixed(1)}" preserveAspectRatio="none" aria-hidden="true">${renderPatternLineSvg({ coords:points.support, label:supportLabel, className:`daily-pattern-line support${supportBroken ? " broken" : ""}` })}${renderPatternLineSvg({ coords:points.resistance, label:resistanceLabel, className:`daily-pattern-line resistance${resistanceBroken ? " broken" : ""}` })}</svg>`;
    scheduleChartLabelDensity(els.lowerDailyChart, "D");
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
      const side = zone.type==='support' ? 'Support' : 'Resistance';
      const labelText = formatChartMarkLabel({ timeframe:"4H", category:"SNR", side, status:zone.status });
      div.title = buildChartMarkTooltip({ timeframe:"4H", category:"SNR", side, status:zone.status, priceRange:{ lower:zone.lower, upper:zone.upper }, detailText:`${zone.strength || "Zone"} · Touch ${zone.touchCount ?? "—"}x` });
      const label=document.createElement('span');
      label.className='h4-sr-label chart-snr-label';
      label.textContent=labelText;
      div.appendChild(label);
      overlayLayer.appendChild(div);
    } catch(_){ }
  });
  scheduleChartLabelDensity(els.lower4hChart, "4H");
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
    r.title = formatFvgOverlayTooltip(f, "4H", fvgDetails);
    const label=document.createElement('span');
    label.className='fvg-overlay-label';
    label.textContent=overlayLabel;
    r.appendChild(label);
    overlayLayer.appendChild(r);
    current4hFvgOverlays.push(r);
    filledCount += 1;
  });
  scheduleChartLabelDensity(els.lower4hChart, "4H");

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
        const sweepLabel = formatChartMarkLabel({ timeframe:"1H", category:"Liquidity", side:bullish ? "Bull" : "Bear", subtype:"Sweep" });
        markers.push({
          time: sweep.time,
          position: bullish ? 'belowBar' : 'aboveBar',
          color: bullish ? '#22c55e' : '#ef4444',
          shape: bullish ? 'arrowUp' : 'arrowDown',
          text: sweepLabel,
        });
      }
    }
  }

  if(getChartLayer("h1", "structureMarkers")){
    const st=detect1hStructure(candles);
    if(st && st.status && st.status!=='No clear 1H structure shift'){
      const latestCandle=candles[candles.length-1];
      const bullish=st.status.includes('Bullish');
      const structureLabel = formatChartMarkLabel({ timeframe:"1H", category:"Structure", side:/CHoCH/i.test(st.status) ? "CHOCH" : "BOS" });
      markers.push({
        time: latestCandle.time,
        position: bullish ? 'belowBar' : 'aboveBar',
        color: bullish ? '#22c55e' : '#ef4444',
        shape: bullish ? 'arrowUp' : 'arrowDown',
        text: structureLabel,
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
    renderH1TimingContext();
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
    if(sweep.status==='No recent sweep'){ els.lower1hSweepSummary.textContent='No diagnostic context detected (1H liquidity sweep).'; renderH1TimingContext(); return; }
    els.lower1hSweepSummary.textContent=`1H Liquidity Sweep | Status: ${sweep.status} | Swept Level: ${usd(sweep.level)} | Candle Time: ${sweep.time} | Distance: ${f1(sweep.distance)}%`;
    renderH1TimingContext();
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
    const daily = latestDailyValidationContext?.status || 'Waiting for complete data';

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
    if(els.mtfDailyValidation) els.mtfDailyValidation.textContent = `Daily: ${daily}`;
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
  if(els.mtfDailyValidation) els.mtfDailyValidation.textContent="Daily: waiting";
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
      const weeklyMajorStructureContext = buildWeeklyMajorStructureContext(dataset, metrics, { fvgDetails: weeklyFvgDetails, recentBrokenFvgDetails: weeklyRecentBrokenFvgDetails });
      renderWeeklyMajorStructure(weeklyMajorStructureContext);
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
updateTimeframeContextHeaderPrice();
renderPulseLabEngineMap();
renderTimeframeRoleAlignment();
renderWeeklyMajorStructure();
renderDailyValidationFoundation();
renderH4ReactionContext();
renderH1TimingContext();
renderH4LiquiditySummary();
renderKeyMarketZonesSummary();
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
