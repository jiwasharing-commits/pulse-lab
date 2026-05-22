const BTC_TICKER_URL = "https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT";
const BTC_WEEKLY_KLINE_URL = "https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1w&limit=120";
const FEAR_GREED_URL = "https://api.alternative.me/fng/?limit=1";
const RSI_PERIOD = 14;
const RSI_WINDOW = 13;
const RSI_LABELS = ["W-12", "W-11", "W-10", "W-9", "W-8", "W-7", "W-6", "W-5", "W-4", "W-3", "W-2", "W-1", "W0"];

const els = {
  statusText: document.getElementById("statusText"), refreshBtn: document.getElementById("refreshBtn"),
  btcPrice: document.getElementById("btcPrice"), btc24hInline: document.getElementById("btc24hInline"), btcPriceMeta: document.getElementById("btcPriceMeta"),
  rsiCurrent: document.getElementById("rsiCurrent"), rsiStatus: document.getElementById("rsiStatus"), rsiRegime: document.getElementById("rsiRegime"),
  rsiChangeLines: document.getElementById("rsiChangeLines"), rsiRefs: document.getElementById("rsiRefs"), rsiSlope: document.getElementById("rsiSlope"),
  direction: document.getElementById("direction"), momentumPhase: document.getElementById("momentumPhase"), momentumPhaseMeta: document.getElementById("momentumPhaseMeta"),
  chartState: document.getElementById("chartState"), interpretationBox: document.getElementById("interpretationBox"), analyticsStrip: document.getElementById("analyticsStrip"),
  priceMetrics: document.getElementById("priceMetrics"), divergenceStatus: document.getElementById("divergenceStatus"), divergenceText: document.getElementById("divergenceText"),
  fgValue: document.getElementById("fgValue"), fgText: document.getElementById("fgText"), fgTime: document.getElementById("fgTime"),
  rsiChart: document.getElementById("rsiChart"), priceChart: document.getElementById("priceChart"), rsiCompareChart: document.getElementById("rsiCompareChart"),
};
let chart, priceChart, rsiCompareChart;

const rsiZonePlugin = { id: "rsiZonePlugin", beforeDraw(c) { const {ctx, chartArea, scales}=c; if(!chartArea||!scales.y) return; const y=scales.y; const zones=[[0,30,"rgba(255,95,122,.08)"],[30,45,"rgba(255,150,120,.05)"],[45,55,"rgba(160,170,200,.06)"],[55,70,"rgba(111,140,255,.05)"],[70,100,"rgba(246,196,69,.06)"]]; ctx.save(); zones.forEach(([f,t,col])=>{const yt=y.getPixelForValue(t), yb=y.getPixelForValue(f); ctx.fillStyle=col; ctx.fillRect(chartArea.left,yt,chartArea.right-chartArea.left,yb-yt);}); ctx.restore(); }};
const f1=(n)=>Number(n).toFixed(1), f2=(n)=>Number(n).toFixed(2), signed1=(n)=>`${n>=0?"+":""}${f1(n)}`, signed2=(n)=>`${n>=0?"+":""}${f2(n)}`;
const usd=(v)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:v>1000?0:2}).format(v);

const classifyRsi=(r)=>r<30?"Deep Weak Zone":r<45?"Weak Zone":r<55?"Neutral Zone":r<=70?"Strong Zone":"Heated Zone";
const getRegime=(w0)=>w0<30?"Deep Weakness":w0<45?"Recovery Attempt":w0<50?"Neutral Below Midline":w0<55?"Neutral Above Midline":w0<=70?"Momentum Strength":"Heated Momentum";
const getDirection=(w0,w1,w4,w12)=>w0>w1&&w0>w4&&w0>w12?"Strong Rising":w0>w4&&w0>w12?"Rising":w0>w12&&w0<w4?"Long-term Improving, Short-term Cooling":w0<w12&&w0>w4?"Short-term Bounce, Long-term Weak":w0<w4&&w0<w12?"Weakening":"Mixed / Sideways";
const getPhase=(w0,d4,d12,w4,w12)=>w0>70?"Heated Phase":w0>=30&&w0<45&&d12>0?"Recovery Phase":w0>=45&&w0<55&&d12>0?"Neutral Recovery":w0>=55&&w0<=70&&d4>0&&d12>0?"Strength Phase":w0<w4&&w0>w12?"Cooling Phase":d4<0&&d12<0?"Weakening Phase":"Mixed Phase";
const slopeStatus=(s)=>s>1?"Strong Positive Slope":s>=0.3?"Mild Positive Slope":s>-0.3?"Flat Slope":s>=-1?"Mild Negative Slope":"Negative Slope";
const consistencyStatus=(c)=>c>=9?"Highly Consistent":c>=6?"Moderately Consistent":c>=3?"Weak Consistency":"Low Consistency";
const midlineStatus=(d)=>d<-5?"Below Midline":d<=5?"Near Midline":"Above Midline";
const interpretation=(d,p)=>`12W trend: ${d.includes("Improving")||d==="Rising"||d==="Strong Rising"?"Improving":d.includes("Weak")||d==="Weakening"?"Weakening":"Mixed"}. 4W trend: ${d.includes("Cooling")||d==="Weakening"?"Cooling":d.includes("Bounce")||d==="Rising"||d==="Strong Rising"?"Improving":"Mixed"}. Phase: ${p}.`;

function getDivergenceStatus(price12, rsi12){
  const flat = price12 >= -3 && price12 <= 3;
  if (price12 > 3 && rsi12 > 0) return "Price and RSI Aligned";
  if (price12 > 3 && rsi12 < 0) return "Momentum Divergence";
  if (price12 < -3 && rsi12 > 0) return "Momentum Recovery Divergence";
  if (flat && rsi12 > 0) return "Momentum Improving During Consolidation";
  if (flat && rsi12 < 0) return "Momentum Cooling During Consolidation";
  return "Mixed Relationship";
}
function getDivergenceText(status){
  const m = {
    "Price and RSI Aligned":"Price and weekly momentum are moving in the same direction.",
    "Momentum Divergence":"Price improved while weekly RSI weakened, showing softer momentum confirmation.",
    "Momentum Recovery Divergence":"Price weakened while weekly RSI improved, showing early momentum recovery.",
    "Momentum Improving During Consolidation":"Price is consolidating while weekly RSI improves.",
    "Momentum Cooling During Consolidation":"Price is consolidating while weekly RSI cools.",
    "Mixed Relationship":"Price and RSI relationship is mixed.",
  };
  return m[status] || "Price and RSI relationship is mixed.";
}

function calculateRsiSeries(closes,p=RSI_PERIOD){ if(closes.length<=p) return []; let gs=0,ls=0; const rsis=[]; for(let i=1;i<=p;i++){const d=closes[i]-closes[i-1]; gs+=d>0?d:0; ls+=d<0?Math.abs(d):0;} let ag=gs/p, al=ls/p; rsis.push(al===0?100:100-100/(1+ag/al)); for(let i=p+1;i<closes.length;i++){const d=closes[i]-closes[i-1], g=d>0?d:0, l=d<0?Math.abs(d):0; ag=(ag*(p-1)+g)/p; al=(al*(p-1)+l)/p; rsis.push(al===0?100:100-100/(1+ag/al));} return rsis; }

function renderRsiChart(canvas, values){
  const pointRadius=values.map((_,i)=>i===12?6:(i===0||i===8?4:2.4));
  return new Chart(canvas,{type:"line",data:{labels:RSI_LABELS,datasets:[{label:"BTC Weekly RSI",data:values,borderColor:"#6f8cff",borderWidth:2,pointBackgroundColor:"#d7deff",pointBorderColor:"#6f8cff",pointRadius,pointHoverRadius:pointRadius.map(v=>v+1),tension:.3,fill:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:"#e8ecf8"}},tooltip:{callbacks:{title:(c)=>c[0].label,label:(c)=>`RSI: ${c.parsed.y.toFixed(1)}`}}},scales:{x:{ticks:{color:"#95a2c7"},grid:{color:"rgba(35,48,83,.5)"}},y:{min:0,max:100,ticks:{color:"#95a2c7",stepSize:10},grid:{color:(ctx)=>[30,50,70].includes(ctx.tick.value)?"rgba(246,196,69,.8)":"rgba(35,48,83,.5)"}}}},plugins:[rsiZonePlugin]});
}

function renderPriceChart(values){
  if(priceChart) priceChart.destroy();
  const pointRadius=values.map((_,i)=>i===12?5:(i===0||i===8?3.5:2.2));
  priceChart=new Chart(els.priceChart,{type:"line",data:{labels:RSI_LABELS,datasets:[{label:"BTC Weekly Close",data:values,borderColor:"#1fc981",borderWidth:2,pointRadius,pointBackgroundColor:"#b9f5dd",tension:.25,fill:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:"#e8ecf8"}},tooltip:{callbacks:{title:(c)=>c[0].label,label:(c)=>`Close: ${usd(c.parsed.y)}`}}},scales:{x:{ticks:{color:"#95a2c7"},grid:{color:"rgba(35,48,83,.5)"}},y:{ticks:{color:"#95a2c7"},grid:{color:"rgba(35,48,83,.5)"}}}}});
}

async function fetchJson(url){ const r=await fetch(url,{method:"GET"}); if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }

function setLoading(){
  els.statusText.textContent="Loading BTC ticker, weekly RSI, and market context...";
  els.btcPrice.textContent="—"; els.btc24hInline.textContent="24h: —"; els.btc24hInline.className="meta"; els.btcPriceMeta.textContent="Loading...";
  els.rsiCurrent.textContent="—"; els.rsiStatus.textContent="Loading..."; els.rsiRegime.textContent="Regime: —";
  els.rsiChangeLines.textContent="4W: — · 12W: —"; els.rsiRefs.textContent="W0: — | W-4: — | W-12: —"; els.rsiSlope.textContent="RSI Slope: — / week";
  els.direction.textContent="—"; els.momentumPhase.textContent="—"; els.chartState.textContent="Loading weekly RSI chart..."; els.interpretationBox.textContent="Loading weekly direction interpretation...";
  els.analyticsStrip.textContent="RSI Slope: — / week · Consistency: — · Distance to 50: — · Regime: —";
  els.priceMetrics.textContent="4W Price Change: — · 12W Price Change: —"; els.divergenceStatus.textContent="Divergence Status: —"; els.divergenceText.textContent="Loading divergence interpretation...";
  els.fgValue.textContent="—"; els.fgText.textContent="Loading..."; els.fgTime.textContent="—";
}

function updateTicker(t){ const p=Number(t.lastPrice), ch=Number(t.priceChangePercent); if(!Number.isFinite(p)||!Number.isFinite(ch)) throw new Error("Ticker parse error"); els.btcPrice.textContent=usd(p); els.btc24hInline.textContent=`24h: ${ch>=0?"+":""}${ch.toFixed(1)}%`; els.btc24hInline.className=`meta ${ch>0?"pos":ch<0?"neg":"neu"}`; els.btcPriceMeta.textContent="BTCUSDT 24h ticker"; }
function updateFearGreed(data){ const l=data?.data?.[0]; if(!l){els.fgText.textContent="Market context unavailable"; return;} const ts=Number(l.timestamp)*1000; els.fgValue.textContent=l.value; els.fgText.textContent=l.value_classification; els.fgTime.textContent=Number.isFinite(ts)?new Date(ts).toLocaleString():"Timestamp unavailable"; }

function updateRsiAndPrice(klines){
  const closes=klines.map(k=>Number(k[4])).filter(Number.isFinite);
  const latest13Prices=closes.slice(-RSI_WINDOW);
  const rsiSeries=calculateRsiSeries(closes); if(rsiSeries.length<RSI_WINDOW||latest13Prices.length<RSI_WINDOW) throw new Error("Not enough weekly data");
  const v=rsiSeries.slice(-RSI_WINDOW).map(n=>Number(n.toFixed(1)));
  const w0=v[12], w1=v[11], w4=v[8], w12=v[0];
  const d4=w0-w4, d12=w0-w12, slope=d12/12, distance50=w0-50;
  const direction=getDirection(w0,w1,w4,w12), phase=getPhase(w0,d4,d12,w4,w12), regime=getRegime(w0);
  let rises=0; for(let i=1;i<v.length;i++) if(v[i]>v[i-1]) rises+=1;

  const p0=latest13Prices[12], p4=latest13Prices[8], p12=latest13Prices[0];
  const p4c=((p0-p4)/p4)*100, p12c=((p0-p12)/p12)*100;
  const divergence=getDivergenceStatus(p12c,d12);

  els.rsiCurrent.textContent=f1(w0); els.rsiStatus.textContent=classifyRsi(w0); els.rsiRegime.textContent=`Regime: ${regime}`;
  els.rsiChangeLines.textContent=`4W: ${signed1(d4)} · 12W: ${signed1(d12)}`;
  els.rsiRefs.textContent=`W0: ${f1(w0)} | W-4: ${f1(w4)} | W-12: ${f1(w12)}`;
  els.rsiSlope.textContent=`RSI Slope: ${signed2(slope)} / week (${slopeStatus(slope)})`;
  els.direction.textContent=direction; els.momentumPhase.textContent=phase; els.interpretationBox.textContent=interpretation(direction,phase);
  els.analyticsStrip.textContent=`RSI Slope: ${signed2(slope)} / week (${slopeStatus(slope)}) · Consistency: ${rises}/12 rising weeks (${consistencyStatus(rises)}) · Distance to 50: ${signed1(distance50)} (${midlineStatus(distance50)}) · Regime: ${regime}`;
  els.priceMetrics.textContent=`4W Price Change: ${signed2(p4c)}% · 12W Price Change: ${signed2(p12c)}%`;
  els.divergenceStatus.textContent=`Divergence Status: ${divergence}`;
  els.divergenceText.textContent=getDivergenceText(divergence);

  if(chart) chart.destroy();
  chart=renderRsiChart(els.rsiChart,v);
  if(rsiCompareChart) rsiCompareChart.destroy();
  rsiCompareChart=renderRsiChart(els.rsiCompareChart,v);
  renderPriceChart(latest13Prices);
}

async function loadDashboard(){
  setLoading(); els.refreshBtn.disabled=true;
  const [t,k,f]=await Promise.allSettled([fetchJson(BTC_TICKER_URL),fetchJson(BTC_WEEKLY_KLINE_URL),fetchJson(FEAR_GREED_URL)]);
  let tickerOk=false,rsiOk=false;
  if(t.status==="fulfilled"){ try{updateTicker(t.value); tickerOk=true;}catch{els.btcPriceMeta.textContent="Ticker unavailable";} } else els.btcPriceMeta.textContent="Ticker unavailable";
  if(k.status==="fulfilled"){ try{updateRsiAndPrice(k.value); rsiOk=true;}catch{els.rsiStatus.textContent="RSI unavailable"; els.chartState.textContent="Unable to load RSI and price comparison data."; els.interpretationBox.textContent="Weekly momentum interpretation is unavailable until RSI data loads."; els.analyticsStrip.textContent="RSI analytics unavailable."; els.divergenceStatus.textContent="Divergence Status: unavailable"; els.divergenceText.textContent="Price and RSI comparison is unavailable.";} }
  else { els.rsiStatus.textContent="RSI unavailable"; els.chartState.textContent="Unable to load RSI and price comparison data."; els.interpretationBox.textContent="Weekly momentum interpretation is unavailable until RSI data loads."; els.analyticsStrip.textContent="RSI analytics unavailable."; els.divergenceStatus.textContent="Divergence Status: unavailable"; els.divergenceText.textContent="Price and RSI comparison is unavailable."; }
  if(f.status==="fulfilled") updateFearGreed(f.value); else { els.fgText.textContent="Market context unavailable"; els.fgTime.textContent="Try refresh"; }
  els.statusText.textContent=tickerOk&&rsiOk?`Monitoring BTC weekly momentum and direction. Last update: ${new Date().toLocaleTimeString()}`:(tickerOk||rsiOk)?"Partial update loaded. One source is currently unavailable.":"Unable to load BTC weekly monitor sources right now.";
  els.refreshBtn.disabled=false;
}

els.refreshBtn.addEventListener("click", loadDashboard);
loadDashboard();
