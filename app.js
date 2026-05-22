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
  btc24hInline: document.getElementById("btc24hInline"),
  btcPriceMeta: document.getElementById("btcPriceMeta"),
  rsiCurrent: document.getElementById("rsiCurrent"),
  rsiStatus: document.getElementById("rsiStatus"),
  rsiRegime: document.getElementById("rsiRegime"),
  rsiChangeLines: document.getElementById("rsiChangeLines"),
  rsiRefs: document.getElementById("rsiRefs"),
  rsiSlope: document.getElementById("rsiSlope"),
  direction: document.getElementById("direction"),
  momentumPhase: document.getElementById("momentumPhase"),
  momentumPhaseMeta: document.getElementById("momentumPhaseMeta"),
  chartState: document.getElementById("chartState"),
  interpretationBox: document.getElementById("interpretationBox"),
  analyticsStrip: document.getElementById("analyticsStrip"),
  fgValue: document.getElementById("fgValue"),
  fgText: document.getElementById("fgText"),
  fgTime: document.getElementById("fgTime"),
  rsiChart: document.getElementById("rsiChart"),
};
let chart;

const rsiZonePlugin = { id: "rsiZonePlugin", beforeDraw(c) { const {ctx, chartArea, scales}=c; if(!chartArea||!scales.y) return; const y=scales.y; const zones=[[0,30,"rgba(255,95,122,.08)"],[30,45,"rgba(255,150,120,.05)"],[45,55,"rgba(160,170,200,.06)"],[55,70,"rgba(111,140,255,.05)"],[70,100,"rgba(246,196,69,.06)"]]; ctx.save(); zones.forEach(([f,t,col])=>{const yt=y.getPixelForValue(t), yb=y.getPixelForValue(f); ctx.fillStyle=col; ctx.fillRect(chartArea.left,yt,chartArea.right-chartArea.left,yb-yt);}); ctx.restore(); }};

const f1 = (n) => Number(n).toFixed(1);
const f2 = (n) => Number(n).toFixed(2);
const signed1 = (n) => `${n >= 0 ? "+" : ""}${f1(n)}`;
const signed2 = (n) => `${n >= 0 ? "+" : ""}${f2(n)}`;
const usd = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: v > 1000 ? 0 : 2 }).format(v);

function classifyRsi(rsi) { if (rsi < 30) return "Deep Weak Zone"; if (rsi < 45) return "Weak Zone"; if (rsi < 55) return "Neutral Zone"; if (rsi <= 70) return "Strong Zone"; return "Heated Zone"; }
function getRegime(w0){ if(w0<30) return "Deep Weakness"; if(w0<45) return "Recovery Attempt"; if(w0<50) return "Neutral Below Midline"; if(w0<55) return "Neutral Above Midline"; if(w0<=70) return "Momentum Strength"; return "Heated Momentum"; }
function getDirection(w0,w1,w4,w12){ if(w0>w1&&w0>w4&&w0>w12) return "Strong Rising"; if(w0>w4&&w0>w12) return "Rising"; if(w0>w12&&w0<w4) return "Long-term Improving, Short-term Cooling"; if(w0<w12&&w0>w4) return "Short-term Bounce, Long-term Weak"; if(w0<w4&&w0<w12) return "Weakening"; return "Mixed / Sideways"; }
function getPhase(w0,d4,d12,w4,w12){ if(w0>70) return "Heated Phase"; if(w0>=30&&w0<45&&d12>0) return "Recovery Phase"; if(w0>=45&&w0<55&&d12>0) return "Neutral Recovery"; if(w0>=55&&w0<=70&&d4>0&&d12>0) return "Strength Phase"; if(w0<w4&&w0>w12) return "Cooling Phase"; if(d4<0&&d12<0) return "Weakening Phase"; return "Mixed Phase"; }
function slopeStatus(s){ if(s>1) return "Strong Positive Slope"; if(s>=0.3) return "Mild Positive Slope"; if(s>-0.3) return "Flat Slope"; if(s>=-1) return "Mild Negative Slope"; return "Negative Slope"; }
function consistencyStatus(c){ if(c>=9) return "Highly Consistent"; if(c>=6) return "Moderately Consistent"; if(c>=3) return "Weak Consistency"; return "Low Consistency"; }
function midlineStatus(d){ if(d<-5) return "Below Midline"; if(d<=5) return "Near Midline"; return "Above Midline"; }
function interpretation(direction, phase){
  const long = direction.includes("Long-term Improving") || direction === "Rising" || direction === "Strong Rising" ? "Improving" : direction.includes("Long-term Weak") || direction === "Weakening" ? "Weakening" : "Mixed";
  const short = direction.includes("Short-term Cooling") || direction === "Weakening" ? "Cooling" : direction.includes("Bounce") || direction === "Strong Rising" || direction === "Rising" ? "Improving" : "Mixed";
  return `12W trend: ${long}. 4W trend: ${short}. Phase: ${phase}.`;
}

function calculateRsiSeries(closes, p=RSI_PERIOD){ if(closes.length<=p) return []; let gs=0, ls=0; const rsis=[]; for(let i=1;i<=p;i++){const d=closes[i]-closes[i-1]; gs+=d>0?d:0; ls+=d<0?Math.abs(d):0;} let ag=gs/p, al=ls/p; rsis.push(al===0?100:100-100/(1+ag/al)); for(let i=p+1;i<closes.length;i++){const d=closes[i]-closes[i-1], g=d>0?d:0, l=d<0?Math.abs(d):0; ag=(ag*(p-1)+g)/p; al=(al*(p-1)+l)/p; rsis.push(al===0?100:100-100/(1+ag/al));} return rsis; }

function renderChart(values){ if(chart) chart.destroy(); const pointRadius=values.map((_,i)=>i===12?6:(i===0||i===8?4:2.4)); chart=new Chart(els.rsiChart,{type:"line",data:{labels:RSI_LABELS,datasets:[{label:"BTC Weekly RSI",data:values,borderColor:"#6f8cff",borderWidth:2,pointBackgroundColor:"#d7deff",pointBorderColor:"#6f8cff",pointRadius,pointHoverRadius:pointRadius.map(v=>v+1),tension:.3,fill:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:"#e8ecf8"}},tooltip:{callbacks:{title:(c)=>c[0].label,label:(c)=>`RSI: ${c.parsed.y.toFixed(1)}`}}},scales:{x:{ticks:{color:"#95a2c7"},grid:{color:"rgba(35,48,83,.5)"}},y:{min:0,max:100,ticks:{color:"#95a2c7",stepSize:10},grid:{color:(ctx)=>[30,50,70].includes(ctx.tick.value)?"rgba(246,196,69,.8)":"rgba(35,48,83,.5)"}}}},plugins:[rsiZonePlugin]}); }

async function fetchJson(url){ const r=await fetch(url,{method:"GET"}); if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }

function setLoading(){
  els.statusText.textContent="Loading BTC ticker, weekly RSI, and market context...";
  els.btcPrice.textContent="—"; els.btc24hInline.textContent="24h: —"; els.btc24hInline.className="meta"; els.btcPriceMeta.textContent="Loading...";
  els.rsiCurrent.textContent="—"; els.rsiStatus.textContent="Loading..."; els.rsiRegime.textContent="Regime: —";
  els.rsiChangeLines.textContent="4W: — · 12W: —"; els.rsiRefs.textContent="W0: — | W-4: — | W-12: —"; els.rsiSlope.textContent="RSI Slope: — / week";
  els.direction.textContent="—"; els.momentumPhase.textContent="—"; els.momentumPhaseMeta.textContent="Weekly phase status";
  els.chartState.textContent="Loading weekly RSI chart..."; els.interpretationBox.textContent="Loading weekly direction interpretation...";
  els.analyticsStrip.textContent="RSI Slope: — / week · Consistency: — · Distance to 50: — · Regime: —";
  els.fgValue.textContent="—"; els.fgText.textContent="Loading..."; els.fgTime.textContent="—";
}

function updateTicker(t){ const p=Number(t.lastPrice), ch=Number(t.priceChangePercent); if(!Number.isFinite(p)||!Number.isFinite(ch)) throw new Error("Ticker parse error"); els.btcPrice.textContent=usd(p); els.btc24hInline.textContent=`24h: ${ch>=0?"+":""}${ch.toFixed(1)}%`; els.btc24hInline.className=`meta ${ch>0?"pos":ch<0?"neg":"neu"}`; els.btcPriceMeta.textContent="BTCUSDT 24h ticker"; }
function updateFearGreed(data){ const l=data?.data?.[0]; if(!l){els.fgText.textContent="Market context unavailable"; return;} const ts=Number(l.timestamp)*1000; els.fgValue.textContent=l.value; els.fgText.textContent=l.value_classification; els.fgTime.textContent=Number.isFinite(ts)?new Date(ts).toLocaleString():"Timestamp unavailable"; }

function updateRsi(klines){
  const closes=klines.map(k=>Number(k[4])).filter(Number.isFinite); const rsiSeries=calculateRsiSeries(closes);
  if(rsiSeries.length<RSI_WINDOW) throw new Error("Not enough weekly data");
  const v=rsiSeries.slice(-RSI_WINDOW).map(n=>Number(n.toFixed(1)));
  const w0=v[12], w1=v[11], w4=v[8], w12=v[0];
  const d4=w0-w4, d12=w0-w12, slope=d12/12, distance50=w0-50;
  const direction=getDirection(w0,w1,w4,w12); const phase=getPhase(w0,d4,d12,w4,w12); const regime=getRegime(w0);
  let rises=0; for(let i=1;i<v.length;i++) if(v[i]>v[i-1]) rises+=1;

  els.rsiCurrent.textContent=f1(w0); els.rsiStatus.textContent=classifyRsi(w0); els.rsiRegime.textContent=`Regime: ${regime}`;
  els.rsiChangeLines.textContent=`4W: ${signed1(d4)} · 12W: ${signed1(d12)}`;
  els.rsiRefs.textContent=`W0: ${f1(w0)} | W-4: ${f1(w4)} | W-12: ${f1(w12)}`;
  els.rsiSlope.textContent=`RSI Slope: ${signed2(slope)} / week (${slopeStatus(slope)})`;
  els.direction.textContent=direction; els.momentumPhase.textContent=phase; els.interpretationBox.textContent=interpretation(direction,phase);
  els.analyticsStrip.textContent=`RSI Slope: ${signed2(slope)} / week (${slopeStatus(slope)}) · Consistency: ${rises}/12 rising weeks (${consistencyStatus(rises)}) · Distance to 50: ${signed1(distance50)} (${midlineStatus(distance50)}) · Regime: ${regime}`;
  renderChart(v);
}

async function loadDashboard(){
  setLoading(); els.refreshBtn.disabled=true;
  const [t,k,f]=await Promise.allSettled([fetchJson(BTC_TICKER_URL),fetchJson(BTC_WEEKLY_KLINE_URL),fetchJson(FEAR_GREED_URL)]);
  let tickerOk=false,rsiOk=false;
  if(t.status==="fulfilled"){ try{updateTicker(t.value); tickerOk=true;}catch{els.btcPriceMeta.textContent="Ticker unavailable";} } else els.btcPriceMeta.textContent="Ticker unavailable";
  if(k.status==="fulfilled"){ try{updateRsi(k.value); rsiOk=true;}catch{els.rsiStatus.textContent="RSI unavailable"; els.chartState.textContent="Unable to load RSI chart and analytics data."; els.interpretationBox.textContent="Weekly momentum interpretation is unavailable until RSI data loads."; els.analyticsStrip.textContent="RSI analytics unavailable.";} } else { els.rsiStatus.textContent="RSI unavailable"; els.chartState.textContent="Unable to load RSI chart and analytics data."; els.interpretationBox.textContent="Weekly momentum interpretation is unavailable until RSI data loads."; els.analyticsStrip.textContent="RSI analytics unavailable."; }
  if(f.status==="fulfilled") updateFearGreed(f.value); else { els.fgText.textContent="Market context unavailable"; els.fgTime.textContent="Try refresh"; }

  els.statusText.textContent=tickerOk&&rsiOk?`Monitoring BTC weekly momentum and direction. Last update: ${new Date().toLocaleTimeString()}`:(tickerOk||rsiOk)?"Partial update loaded. One source is currently unavailable.":"Unable to load BTC weekly monitor sources right now.";
  els.refreshBtn.disabled=false;
}

els.refreshBtn.addEventListener("click", loadDashboard);
loadDashboard();
