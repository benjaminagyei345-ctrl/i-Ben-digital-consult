const MERCHANT = {
  business: 'i‑Ben Digital Consult',
  momoName: 'Benjamin Agyei',
  momoNetwork: 'MTN MoMo',
  momoNumber: '0555610075',
  whatsappIntl: '233555610075'
};

const CATALOG = {
  MTN: [
    {label:'1 GB', price: 6},{label:'2 GB', price: 12},{label:'3 GB', price: 17},
    {label:'4 GB', price: 22},{label:'5 GB', price: 28},{label:'6 GB', price: 33},
    {label:'7 GB', price: 39},{label:'8 GB', price: 44},{label:'10 GB', price: 50},
    {label:'15 GB', price: 75},{label:'20 GB', price: 95},{label:'25 GB', price: 110},
    {label:'30 GB', price: 130},{label:'40 GB', price: 170},{label:'50 GB', price: 210},
    {label:'100 GB', price: 410}
  ],
  AirtelTigo: [
    {label:'1 GB', price: 5.5},{label:'2 GB', price: 10},{label:'3 GB', price: 15},
    {label:'4 GB', price: 19},{label:'5 GB', price: 24},{label:'6 GB', price: 28},
    {label:'7 GB', price: 33},{label:'8 GB', price: 38},{label:'9 GB', price: 40},
    {label:'10 GB', price: 45},{label:'15 GB', price: 65},{label:'20 GB', price: 85},
    {label:'30 GB', price: 130},{label:'40 GB', price: 172},{label:'50 GB', price: 210},
    {label:'100 GB', price: 315}
  ],
  Telecel: [
    {label:'5 GB', price: 27},{label:'10 GB', price: 49},{label:'15 GB', price: 65},
    {label:'20 GB', price: 90},{label:'30 GB', price: 130},{label:'40 GB', price: 170},
    {label:'50 GB', price: 200},{label:'100 GB', price: 320}
  ]
};

const fmt = v => `GHS ${Number(v).toFixed(2)}`;
const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
const smsLink = msg => `sms:+233${MERCHANT.momoNumber.slice(1)}${ios ? '&' : '?'}body=${encodeURIComponent(msg)}`;

function populatePlans(selectEl, network){
  selectEl.innerHTML = '';
  (CATALOG[network]||[]).forEach(p=>{
    const opt = document.createElement('option');
    opt.value = p.label;
    opt.textContent = `${p.label} — ${fmt(p.price)}`;
    selectEl.appendChild(opt);
  });
}

function renderPlanCards(){
  const grid = document.getElementById('planGrid');
  if(!grid) return;
  grid.innerHTML = '';
  Object.keys(CATALOG).forEach(net=>{
    CATALOG[net].forEach(p=>{
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <span class="badge">${net}</span>
        <div class="price">${p.label}</div>
        <div class="muted">${fmt(p.price)} • Non-expiring</div>
        <button class="btn">Buy Now</button>
      `;
      div.querySelector('button').addEventListener('click', ()=>{
        document.getElementById('mNetwork').value = net;
        populatePlans(document.getElementById('mPlan'), net);
        document.getElementById('mPlan').value = p.label;
        openModal();
      });
      grid.appendChild(div);
    });
  });
}

function renderPriceLists(){
  const fill = (id, net) => {
    const ul = document.getElementById(id); if(!ul) return;
    ul.innerHTML = '';
    CATALOG[net].forEach(p=>{
      const li = document.createElement('li');
      li.innerHTML = `<span>${p.label}</span><strong>${fmt(p.price)}</strong>`;
      ul.appendChild(li);
    });
  };
  fill('price-mtn','MTN'); fill('price-at','AirtelTigo'); fill('price-tc','Telecel');
}

function openModal(){
  document.getElementById('moName').textContent = MERCHANT.momoName;
  document.getElementById('moNetwork').textContent = MERCHANT.momoNetwork;
  document.getElementById('moNumber').textContent = MERCHANT.momoNumber;

  const netSel = document.getElementById('mNetwork');
  populatePlans(document.getElementById('mPlan'), netSel.value);
  document.getElementById('modal').classList.add('open');
}
function closeModal(){ document.getElementById('modal').classList.remove('open'); }

function sendOrder(channel){
  const network = document.getElementById('mNetwork').value;
  const plan = document.getElementById('mPlan').value;
  const phone = document.getElementById('mPhone').value.trim();
  if(!/^0\d{9}$/.test(phone)){ alert('Enter a valid Ghana number, e.g., 0551234567'); return; }
  const item = (CATALOG[network]||[]).find(p=>p.label===plan)||{price:0};
  const baseMsg = `Hello, I want to buy ${network} ${plan} for ${phone}. Price: ${fmt(item.price)}.\n\nMoMo details:\nName: ${MERCHANT.momoName}\nNetwork: ${MERCHANT.momoNetwork}\nNumber: ${MERCHANT.momoNumber}\n\nPlease send payment instructions.`;

  if(channel === 'WA'){
    location.href = `https://wa.me/${MERCHANT.whatsappIntl}?text=${encodeURIComponent(baseMsg)}`;
  }else{
    location.href = smsLink(baseMsg);
  }
}

(function init(){
  const y = document.querySelector('#year'); if(y) y.textContent = new Date().getFullYear();
  const w = document.getElementById('waBtn');
  if(w) w.href = `https://wa.me/${MERCHANT.whatsappIntl}?text=${encodeURIComponent('Hello, I want to buy a data bundle.')}`;
  const s = document.getElementById('smsBtn');
  if(s) s.href = smsLink('Hello, I want to buy a data bundle.');

  renderPriceLists(); renderPlanCards();
})();

document.addEventListener('change', (e)=>{
  if(e.target && e.target.id === 'mNetwork'){
    populatePlans(document.getElementById('mPlan'), e.target.value);
  }
});

function orderService(type, channel){
  let planText = '';
  if(type==='NETFLIX') planText = document.getElementById('svcNetflix').value;
  if(type==='MTN3')    planText = document.getElementById('svcMTN3').value;
  if(type==='AUDIO')   planText = document.getElementById('svcAUDIO').value;

  const msg =
`Hello, I want to order:
Service: ${type==='NETFLIX'?'Netflix Premium (Shared)': type==='MTN3'?'MTN Instant Bundles (3 days)':'Audiomack Premium (Android)'}
Plan: ${planText}

MoMo details for payment:
Name: ${MERCHANT.momoName}
Network: ${MERCHANT.momoNetwork}
Number: ${MERCHANT.momoNumber}

Please send payment instructions.`;

  if(channel==='WA'){
    location.href = `https://wa.me/${MERCHANT.whatsappIntl}?text=${encodeURIComponent(msg)}`;
  }else{
    const smsUrl = smsLink(msg);
    location.href = smsUrl;
  }
}
