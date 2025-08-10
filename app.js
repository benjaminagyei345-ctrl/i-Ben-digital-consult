// Config
const CONFIG = {
  BUSINESS_NAME: 'i-Ben Digital Consult',
  PHONE: '0555610075', // used for WhatsApp/SMS
  CURRENCY: 'GHS'
};

// Catalog data
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

function formatMoney(v){ return `${CONFIG.CURRENCY} ${Number(v).toFixed(2)}`; }

function populatePlans(selectEl, network){
  selectEl.innerHTML = '';
  CATALOG[network].forEach(p=>{
    const opt = document.createElement('option');
    opt.value = p.label;
    opt.textContent = `${p.label} — ${formatMoney(p.price)}`;
    selectEl.appendChild(opt);
  });
}

function renderPlanCards(){
  const grid = document.getElementById('planGrid');
  grid.innerHTML = '';
  const mapClass = {'mtn':'buy-mtn','airteltigo':'buy-tigo','telecel':'buy-telecel'};

  Object.keys(CATALOG).forEach(net=>{
    const cls = mapClass[net.toLowerCase()] || '';
    CATALOG[net].forEach(p=>{
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <span class="badge">${net}</span>
        <div class="price">${p.label}</div>
        <div class="muted">${formatMoney(p.price)} • Non-expiring</div>
        <button class="btn ${cls}">Buy Now</button>
      `;
      div.querySelector('button').addEventListener('click', ()=>{
        choose(net, p.label);
      });
      grid.appendChild(div);
    });
  });
}

function choose(network, plan){
  document.querySelector('#mNetwork').value = network;
  populatePlans(document.querySelector('#mPlan'), network);
  if(plan) document.querySelector('#mPlan').value = plan;
  openModal();
}

function openModal(){ document.getElementById('modal').classList.add('open'); }
function closeModal(){ document.getElementById('modal').classList.remove('open'); }

// Quick purchase sync
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelector('#qNetwork').addEventListener('change', ()=>{
    populatePlans(document.querySelector('#qPlan'), document.querySelector('#qNetwork').value);
  });
  populatePlans(document.querySelector('#qPlan'), document.querySelector('#qNetwork').value);
  renderPlanCards();
  document.getElementById('waQuick').addEventListener('click', waQuickOrder);
  document.getElementById('smsQuick').addEventListener('click', smsQuickOrder);
});

// Messaging helpers
function makeWA(text){ return `https://wa.me/233${CONFIG.PHONE.replace(/^0/,'')}?text=${encodeURIComponent(text)}`; }
function makeSMS(text){ return `sms:${CONFIG.PHONE}?&body=${encodeURIComponent(text)}`; }
function callNow(){ window.location.href = `tel:${CONFIG.PHONE}`; }

// Quick purchase message
function waQuickOrder(){
  const n = document.querySelector('#qNetwork').value;
  const p = document.querySelector('#qPlan').value;
  const ph = document.querySelector('#qPhone').value || '';
  const price = CATALOG[n].find(x=>x.label===p)?.price || '';
  const text = `Hello, I want to buy ${n} ${p} for ${ph}. Price: ${formatMoney(price)}.`;
  window.location.href = makeWA(text);
}
function smsQuickOrder(){
  const n = document.querySelector('#qNetwork').value;
  const p = document.querySelector('#qPlan').value;
  const ph = document.querySelector('#qPhone').value || '';
  const price = CATALOG[n].find(x=>x.label===p)?.price || '';
  const text = `Hello, I want to buy ${n} ${p} for ${ph}. Price: ${formatMoney(price)}.`;
  window.location.href = makeSMS(text);
}

// Modal quick
function waQuickOrderModal(){ // not used directly
  const n = document.querySelector('#mNetwork').value;
  const p = document.querySelector('#mPlan').value;
  const ph = document.querySelector('#mPhone').value || '';
  const price = CATALOG[n].find(x=>x.label===p)?.price || '';
  const text = `Hello, I want to buy ${n} ${p} for ${ph}. Price: ${formatMoney(price)}.`;
  window.location.href = makeWA(text);
}
function waQuickOrder(){ waQuickOrderModal(); }
function smsQuickOrder(){
  const n = document.querySelector('#mNetwork').value || document.querySelector('#qNetwork').value;
  const p = document.querySelector('#mPlan').value || document.querySelector('#qPlan').value;
  const ph = document.querySelector('#mPhone').value || document.querySelector('#qPhone').value || '';
  const price = CATALOG[n].find(x=>x.label===p)?.price || '';
  const text = `Hello, I want to buy ${n} ${p} for ${ph}. Price: ${formatMoney(price)}.`;
  window.location.href = makeSMS(text);
}

// Services: generic order
function getServiceText(serviceLabel, selectId){
  const raw = document.getElementById(selectId).value; // "name|price"
  const [name, price] = raw.split('|');
  return `${serviceLabel} — ${name} (Price: ${price.startsWith('GHS')?price:`GHS ${price}`}).`;
}
function orderService(label, id){
  alert('Payment integration coming soon. Please contact us on WhatsApp or SMS to complete your order.');
}
function waService(label, id){ window.location.href = makeWA(`Hello, I want to buy ${getServiceText(label,id)}`); }
function smsService(label, id){ window.location.href = makeSMS(`Hello, I want to buy ${getServiceText(label,id)}`); }

// AFA Registration
function orderAFARegister(){
  alert('Registration via manual chat. Tap WhatsApp or SMS and send your details.');
}
function waAFARegister(){
  const name = document.getElementById('afaName').value || '(name)';
  const num  = document.getElementById('afaNumber').value || '(number)';
  const text = `AFA Registration — Name: ${name}; Number: ${num}. Fee: GHS 10.`;
  window.location.href = makeWA(text);
}
function smsAFARegister(){
  const name = document.getElementById('afaName').value || '(name)';
  const num  = document.getElementById('afaNumber').value || '(number)';
  const text = `AFA Registration — Name: ${name}; Number: ${num}. Fee: GHS 10.`;
  window.location.href = makeSMS(text);
}