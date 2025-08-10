
const CONFIG = {
  BUSINESS_NAME: 'i-Ben Digital Consult',
  PHONE: '0555610075', // your business line (used in WhatsApp/SMS fallback)
  CURRENCY: 'GHS'
};

const CATALOG = {
  MTN: [
    {label:'1 GB', price: 6},
    {label:'2 GB', price: 12},
    {label:'3 GB', price: 17},
    {label:'4 GB', price: 22},
    {label:'5 GB', price: 28},
    {label:'6 GB', price: 33},
    {label:'7 GB', price: 39},
    {label:'8 GB', price: 44},
    {label:'10 GB', price: 50},
    {label:'15 GB', price: 75},
    {label:'20 GB', price: 95},
    {label:'25 GB', price: 110},
    {label:'30 GB', price: 130},
    {label:'40 GB', price: 170},
    {label:'50 GB', price: 210},
    {label:'100 GB', price: 410}
  ],
  AirtelTigo: [
    {label:'1 GB', price: 5.5},
    {label:'2 GB', price: 10},
    {label:'3 GB', price: 15},
    {label:'4 GB', price: 19},
    {label:'5 GB', price: 24},
    {label:'6 GB', price: 28},
    {label:'7 GB', price: 33},
    {label:'8 GB', price: 38},
    {label:'9 GB', price: 40},
    {label:'10 GB', price: 45},
    {label:'15 GB', price: 65},
    {label:'20 GB', price: 85},
    {label:'30 GB', price: 130},
    {label:'40 GB', price: 172},
    {label:'50 GB', price: 210},
    {label:'100 GB', price: 315}
  ],
  Telecel: [
    {label:'5 GB', price: 27},
    {label:'10 GB', price: 49},
    {label:'15 GB', price: 65},
    {label:'20 GB', price: 90},
    {label:'30 GB', price: 130},
    {label:'40 GB', price: 170},
    {label:'50 GB', price: 200},
    {label:'100 GB', price: 320}
  ]
};

const fmt = v => `${CONFIG.CURRENCY} ${Number(v).toFixed(2)}`;

function populate(selectEl, items){
  selectEl.innerHTML = '';
  items.forEach((p, i) => {
    const opt = document.createElement('option');
    opt.value = p.label;
    opt.textContent = `${p.label} — ${fmt(p.price)} (Non-expiring)`;
    if(i===0) opt.selected = true;
    selectEl.appendChild(opt);
  });
}

function priceFor(network, label){
  const it = CATALOG[network].find(x => x.label === label);
  return it ? it.price : null;
}

function setPrice(el, price){
  el.textContent = price == null ? `${CONFIG.CURRENCY} —` : fmt(price);
}

function msg(network, plan, phone){
  return `Hello, I want to buy ${network} ${plan} for ${phone}. Price: ${fmt(priceFor(network, plan))}. Please send MoMo payment instructions.`;
}

function waLink(text){ return `https://wa.me/233${CONFIG.PHONE.slice(1)}?text=${encodeURIComponent(text)}`; }
function smsLink(text){ return `sms:${CONFIG.PHONE}?&body=${encodeURIComponent(text)}`; }

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('yr').textContent = new Date().getFullYear();

  const mtnSel = document.getElementById('mtnPlan');
  const atSel  = document.getElementById('atPlan');
  const tcSel  = document.getElementById('tcPlan');

  populate(mtnSel, CATALOG.MTN);
  populate(atSel,  CATALOG.AirtelTigo);
  populate(tcSel,  CATALOG.Telecel);

  setPrice(document.getElementById('mtnPrice'), priceFor('MTN', mtnSel.value));
  setPrice(document.getElementById('atPrice'),  priceFor('AirtelTigo', atSel.value));
  setPrice(document.getElementById('tcPrice'),  priceFor('Telecel', tcSel.value));

  mtnSel.addEventListener('change', e => setPrice(document.getElementById('mtnPrice'), priceFor('MTN', e.target.value)));
  atSel.addEventListener('change',  e => setPrice(document.getElementById('atPrice'),  priceFor('AirtelTigo', e.target.value)));
  tcSel.addEventListener('change',  e => setPrice(document.getElementById('tcPrice'),  priceFor('Telecel', e.target.value)));

  const phoneEl = document.getElementById('phone');
  function getPhone(){ return phoneEl.value.trim() || CONFIG.PHONE; }

  document.getElementById('mtnBuy').addEventListener('click', ()=>{
    const text = msg('MTN', mtnSel.value, getPhone()); window.open(waLink(text),'_blank');
  });
  document.getElementById('atBuy').addEventListener('click', ()=>{
    const text = msg('AirtelTigo', atSel.value, getPhone()); window.open(waLink(text),'_blank');
  });
  document.getElementById('tcBuy').addEventListener('click', ()=>{
    const text = msg('Telecel', tcSel.value, getPhone()); window.open(waLink(text),'_blank');
  });

  document.getElementById('waBtn').addEventListener('click', ()=>{
    const text = `Hello, I want to buy a data bundle.`; window.open(waLink(text),'_blank');
  });
  document.getElementById('smsBtn').addEventListener('click', ()=>{
    const text = `Hello, I want to buy a data bundle.`; window.location.href = smsLink(text);
  });

  // Service CTA buttons -> WhatsApp
  document.querySelectorAll('.services .btn').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const text = `Hello, I'm interested in ${btn.textContent} please.`;
      window.open(waLink(text),'_blank');
    });
  });
});
