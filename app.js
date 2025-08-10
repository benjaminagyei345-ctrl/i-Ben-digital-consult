// Basic config used by the flow
const CONFIG = {
  BUSINESS_NAME: 'i-Ben Digital Consult',
  PHONE_E164: '+233555610075',
  CURRENCY: 'GHS'
};

// Catalog (short list for demo; add all your plans here or keep as-is)
const CATALOG = {
  MTN: [
    {label:'1 GB', price: 6},
    {label:'2 GB', price: 12},
    {label:'5 GB', price: 28},
    {label:'10 GB', price: 50},
  ],
  AirtelTigo: [
    {label:'1 GB', price: 5.5},
    {label:'10 GB', price: 45},
    {label:'20 GB', price: 85},
    {label:'100 GB', price: 315},
  ],
  Telecel: [
    {label:'5 GB', price: 27},
    {label:'10 GB', price: 49},
    {label:'15 GB', price: 65},
    {label:'100 GB', price: 320},
  ]
};

function formatMoney(v){ return `GHS ${Number(v).toFixed(2)}`; }

// Renders the three dropdowns for Popular Plans
function renderDropdowns(){
  const root = document.getElementById('popularDropdowns');
  root.innerHTML = '';
  const order = ['MTN','AirtelTigo','Telecel'];
  const colorMap = { MTN:'btn-mtn', AirtelTigo:'btn-at', Telecel:'btn-tel' };
  const wrap = document.createElement('div');
  wrap.className = 'ddl-wrap';

  order.forEach(net=>{
    const card = document.createElement('div');
    card.className = 'ddl-card';
    card.innerHTML = `
      <div class="ddl-head"><div class="ddl-badge">${net}</div></div>
      <div class="ddl-row">
        <select aria-label="${net} plans"></select>
        <button class="btn-net ${colorMap[net]}">Buy Now</button>
      </div>
    `;
    const sel = card.querySelector('select');
    CATALOG[net].forEach(p=>{
      const opt = document.createElement('option');
      opt.value = p.label;
      opt.textContent = `${p.label} — ${formatMoney(p.price)} (Non‑expiring)`;
      sel.appendChild(opt);
    });
    card.querySelector('button').addEventListener('click', ()=>{
      startChat(net, sel.value);
    });
    wrap.appendChild(card);
  });

  root.appendChild(wrap);
}

// WhatsApp / SMS chat helper
function startChat(network, planLabel){
  const phone = CONFIG.PHONE_E164.replace('+','');
  const item = (CATALOG[network]||[]).find(p=>p.label===planLabel);
  const msg = `Hello, I want to buy ${network} ${planLabel}. Price: ${item?formatMoney(item.price):''}.`;
  // Prefer WhatsApp; users can also SMS from the Contact section
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.location.href = url;
}

// Hook up service buttons (Netflix, Audiomack, AFA)
document.addEventListener('click', (e)=>{
  if(e.target.matches('[data-service]')){
    const svc = e.target.getAttribute('data-service');
    const msg = `Hello, I'm interested in ${svc}.` + (svc.includes('AFA') ? ' Requirements: Full name & number to be registered.' : '');
    const phone = CONFIG.PHONE_E164.replace('+','');
    window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }
});

// Init
renderDropdowns();
