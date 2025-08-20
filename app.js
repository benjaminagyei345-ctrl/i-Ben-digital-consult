// ====== CONFIG (editable in admin): Fixed Moolre payment links ======
// This object is overridden by data from localStorage ('moolre_links') if present.
let MOOLRE_LINKS = {
  mtn: {
    "1 GB":   "https://pos.moolre.com/VDzK2iWY6v4QULHTGhk1OxuEAp8jPb",
    "2 GB":   "https://pos.moolre.com/VDzK2iWY6v4QULHTGhk1OxuEAp8jPb",
    "3 GB":   "https://pos.moolre.com/VDzK2iWY6v4QULHTGhk1OxuEAp8jPb",
    "4 GB":   "https://pay.moolre.com/MTN_4GB_LINK",
    "5 GB":   "https://pay.moolre.com/MTN_5GB_LINK",
    "6 GB":   "https://pay.moolre.com/MTN_6GB_LINK",
    "7 GB":   "https://pay.moolre.com/MTN_7GB_LINK",
    "8 GB":   "https://pay.moolre.com/MTN_8GB_LINK",
    "10 GB":  "https://pay.moolre.com/MTN_10GB_LINK",
    "15 GB":  "https://pay.moolre.com/MTN_15GB_LINK",
    "20 GB":  "https://pay.moolre.com/MTN_20GB_LINK",
    "25 GB":  "https://pay.moolre.com/MTN_25GB_LINK",
    "30 GB":  "https://pay.moolre.com/MTN_30GB_LINK",
    "40 GB":  "https://pay.moolre.com/MTN_40GB_LINK",
    "50 GB":  "https://pay.moolre.com/MTN_50GB_LINK",
    "100 GB": "https://pay.moolre.com/MTN_100GB_LINK"
  },
  at: {
    "1 GB":   "https://pay.moolre.com/AT_1GB_LINK",
    "2 GB":   "https://pay.moolre.com/AT_2GB_LINK",
    "3 GB":   "https://pay.moolre.com/AT_3GB_LINK",
    "4 GB":   "https://pay.moolre.com/AT_4GB_LINK",
    "5 GB":   "https://pay.moolre.com/AT_5GB_LINK",
    "6 GB":   "https://pay.moolre.com/AT_6GB_LINK",
    "7 GB":   "https://pay.moolre.com/AT_7GB_LINK",
    "8 GB":   "https://pay.moolre.com/AT_8GB_LINK",
    "9 GB":   "https://pay.moolre.com/AT_9GB_LINK",
    "10 GB":  "https://pay.moolre.com/AT_10GB_LINK",
    "15 GB":  "https://pay.moolre.com/AT_15GB_LINK",
    "20 GB":  "https://pay.moolre.com/AT_20GB_LINK",
    "30 GB":  "https://pay.moolre.com/AT_30GB_LINK",
    "40 GB":  "https://pay.moolre.com/AT_40GB_LINK",
    "50 GB":  "https://pay.moolre.com/AT_50GB_LINK",
    "100 GB": "https://pay.moolre.com/AT_100GB_LINK"
  },
  telecel: {
    "5 GB":   "https://pay.moolre.com/TEL_5GB_LINK",
    "10 GB":  "https://pay.moolre.com/TEL_10GB_LINK",
    "15 GB":  "https://pay.moolre.com/TEL_15GB_LINK",
    "20 GB":  "https://pay.moolre.com/TEL_20GB_LINK",
    "30 GB":  "https://pay.moolre.com/TEL_30GB_LINK",
    "40 GB":  "https://pay.moolre.com/TEL_40GB_LINK",
    "50 GB":  "https://pay.moolre.com/TEL_50GB_LINK",
    "100 GB": "https://pay.moolre.com/TEL_100GB_LINK"
  },
  bece: "https://pay.moolre.com/BECE_CARD_LINK",
  wassce: "https://pay.moolre.com/WASSCE_CARD_LINK",
  netflix: {
    "1 month access":  "https://pay.moolre.com/NETFLIX_1M",
    "3 months access": "https://pay.moolre.com/NETFLIX_3M",
    "6 months access": "https://pay.moolre.com/NETFLIX_6M"
  },
  audiomack: {
    "1 month unlocked":  "https://pay.moolre.com/AUDIO_1M",
    "3 months unlocked": "https://pay.moolre.com/AUDIO_3M",
    "6 months unlocked": "https://pay.moolre.com/AUDIO_6M"
  },
  afa: "https://pay.moolre.com/AFA_GHS10"
};

// Load overrides from localStorage if present
try {
  const stored = localStorage.getItem('moolre_links');
  if (stored) {
    const parsed = JSON.parse(stored);
    MOOLRE_LINKS = parsed;
  }
} catch(e){}

// ====== DATA: Your bundle prices in GHS ======
const DATA_PLANS = {
  mtn: [
    { label: "1 GB", price: 6 }, { label: "2 GB", price: 12 }, { label: "3 GB", price: 17 },
    { label: "4 GB", price: 22 }, { label: "5 GB", price: 28 }, { label: "6 GB", price: 33 },
    { label: "7 GB", price: 39 }, { label: "8 GB", price: 44 }, { label: "10 GB", price: 50 },
    { label: "15 GB", price: 75 }, { label: "20 GB", price: 95 }, { label: "25 GB", price: 110 },
    { label: "30 GB", price: 130 }, { label: "40 GB", price: 170 }, { label: "50 GB", price: 210 },
    { label: "100 GB", price: 410 }
  ],
  at: [
    { label: "1 GB", price: 5 }, { label: "2 GB", price: 10 }, { label: "3 GB", price: 15 },
    { label: "4 GB", price: 19 }, { label: "5 GB", price: 24 }, { label: "6 GB", price: 28 },
    { label: "7 GB", price: 33 }, { label: "8 GB", price: 38 }, { label: "9 GB", price: 40 },
    { label: "10 GB", price: 45 }, { label: "15 GB", price: 65 }, { label: "20 GB", price: 85 },
    { label: "30 GB", price: 130 }, { label: "40 GB", price: 172 }, { label: "50 GB", price: 210 },
    { label: "100 GB", price: 315 }
  ],
  telecel: [
    { label: "5 GB", price: 27 }, { label: "10 GB", price: 49 }, { label: "15 GB", price: 65 },
    { label: "20 GB", price: 90 }, { label: "30 GB", price: 130 }, { label: "40 GB", price: 170 },
    { label: "50 GB", price: 200 }, { label: "100 GB", price: 320 }
  ]
};

// Result checker prices
const RC_PRICES = { bece: 25, wassce: 30 };

// WhatsApp target (fallback/manual)
const WA_NUMBER = "233555610075";

// ====== Helpers ======
function ghValid(num) {
  return /^0\d{9}$/.test(num);
}

function fillSelect(id, items) {
  const sel = document.getElementById(id);
  sel.innerHTML = "";
  items.forEach(p => {
    const o = document.createElement("option");
    o.value = p.price;
    o.textContent = p.label;
    sel.appendChild(o);
  });
}

function bindDataCard(prefix, listKey) {
  const sel = document.getElementById(prefix + "Plan");
  const priceEl = document.getElementById(prefix + "Price");
  const phoneEl = document.getElementById(prefix + "Number");
  const buyBtn = document.getElementById(prefix + "Buy");
  const payBtn = document.getElementById(prefix + "Pay");

  function updatePrice() {
    if (!sel.value) { priceEl.textContent = "—"; return; }
    priceEl.textContent = Number(sel.value).toFixed(2);
  }
  sel.addEventListener("change", updatePrice);
  updatePrice();

  // WhatsApp order (backup)
  buyBtn.addEventListener("click", () => {
    const plan = sel.options[sel.selectedIndex]?.text || "";
    const price = sel.value;
    const phone = phoneEl.value.trim();
    if (!ghValid(phone)) {
      alert("Enter a valid Ghana number (starts with 0 and has 10 digits).");
      phoneEl.focus();
      return;
    }
    const msg = encodeURIComponent(`Order: ${listKey.toUpperCase()} DATA\nPlan: ${plan}\nPrice: GHS ${price}\nNumber: ${phone}`);
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  });

  // Pay with Moolre (fixed link by label)
  payBtn.addEventListener("click", () => {
    const planLabel = sel.options[sel.selectedIndex]?.text || "";
    const url = MOOLRE_LINKS[listKey]?.[planLabel];
    if (!url) {
      alert("Payment link not set yet for: " + planLabel + ". Open #admin to paste links.");
      return;
    }
    window.open(url, "_blank");
  });
}

// Result checker bindings
function updateRcPrice(kind){
  const qty = Number(document.getElementById(kind+'Qty').value);
  const unit = RC_PRICES[kind];
  const total = qty * unit;
  document.getElementById(kind+'Price').textContent = total.toFixed(2);
}

function waOrderRc(kind, label){
  const qty = document.getElementById(kind+'Qty').value;
  const idx = document.getElementById(kind+'Index')?.value.trim() || "";
  const yr  = document.getElementById(kind+'Year')?.value.trim() || "";
  const total = document.getElementById(kind+'Price').textContent;
  const lines = [
    `Order: ${label} Result Checker`,
    `Qty: ${qty}`,
    `Total: GHS ${total}`,
    idx ? `Index: ${idx}` : null,
    yr  ? `Exam Year: ${yr}` : null
  ].filter(Boolean).join('\n');
  const msg = encodeURIComponent(lines);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
}

function payRc(kind, label){
  const url = MOOLRE_LINKS[kind];
  if (!url) { alert("Payment link not set yet for " + label + ". Open #admin to paste link."); return; }
  window.open(url, "_blank");
}

// Netflix & Audiomack simple binds
function bindSimplePrice(selectId, priceId){
  const sel = document.getElementById(selectId);
  const priceEl = document.getElementById(priceId);
  function upd(){ priceEl.textContent = Number(sel.value).toFixed(2); }
  sel.addEventListener("change", upd); upd();
}

function paySimple(label, selectId, map){
  const sel = document.getElementById(selectId);
  const key = sel.options[sel.selectedIndex].text;
  const url = map[key];
  if (!url) { alert("Payment link not set yet for: " + label + " • " + key + ". Open #admin to paste links."); return; }
  window.open(url, "_blank");
}

function waSimple(label, selectId){
  const sel = document.getElementById(selectId);
  const plan = sel.options[sel.selectedIndex].text;
  const price = sel.value;
  const msg = encodeURIComponent(`Order: ${label}\nPlan: ${plan}\nTotal: GHS ${price}`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
}

// ====== Admin overlay (hash #admin) ======
function showAdminIfHash(){
  const gear = document.getElementById('adminGear');
  const modal = document.getElementById('adminModal');
  const txt = document.getElementById('linksJson');
  const sample = {
    mtn: { "1 GB": "", "2 GB": "", "3 GB": "", "4 GB": "", "5 GB": "", "6 GB": "", "7 GB": "", "8 GB": "", "10 GB": "", "15 GB": "", "20 GB": "", "25 GB": "", "30 GB": "", "40 GB": "", "50 GB": "", "100 GB": "" },
    at: { "1 GB": "", "2 GB": "", "3 GB": "", "4 GB": "", "5 GB": "", "6 GB": "", "7 GB": "", "8 GB": "", "9 GB": "", "10 GB": "", "15 GB": "", "20 GB": "", "30 GB": "", "40 GB": "", "50 GB": "", "100 GB": "" },
    telecel: { "5 GB": "", "10 GB": "", "15 GB": "", "20 GB": "", "30 GB": "", "40 GB": "", "50 GB": "", "100 GB": "" },
    bece: "",
    wassce: "",
    netflix: { "1 month access": "", "3 months access": "", "6 months access": "" },
    audiomack: { "1 month unlocked": "", "3 months unlocked": "", "6 months unlocked": "" },
    afa: ""
  };
  if (location.hash === '#admin') {
    gear.style.display = 'block';
  } else {
    gear.style.display = 'none';
  }
  document.getElementById('loadSample').onclick = ()=>{
    txt.value = JSON.stringify(sample, null, 2);
  };
  document.getElementById('saveLinks').onclick = ()=>{
    try {
      const obj = JSON.parse(txt.value);
      localStorage.setItem('moolre_links', JSON.stringify(obj));
      alert('Saved! Refresh the page to use your links.');
    } catch(e){
      alert('Invalid JSON');
    }
  };
  document.getElementById('closeModal').onclick = ()=> modal.style.display = 'none';
  document.getElementById('adminGear').onclick = ()=>{
    txt.value = localStorage.getItem('moolre_links') || JSON.stringify(sample, null, 2);
    modal.style.display = 'flex';
  };
}

window.addEventListener("hashchange", showAdminIfHash);

// ====== Init ======
window.addEventListener("DOMContentLoaded", () => {
  fillSelect("mtnPlan", DATA_PLANS.mtn);
  fillSelect("atPlan", DATA_PLANS.at);
  fillSelect("telecelPlan", DATA_PLANS.telecel);

  bindDataCard("mtn", "mtn");
  bindDataCard("at", "at");
  bindDataCard("telecel", "telecel");

  ['bece','wassce'].forEach(k=>{
    document.getElementById(k+'Qty').addEventListener('change',()=>updateRcPrice(k));
    updateRcPrice(k);
  });
  document.getElementById('beceBuy').onclick = ()=>waOrderRc('bece','BECE');
  document.getElementById('wassceBuy').onclick = ()=>waOrderRc('wassce','WASSCE');
  document.getElementById('becePay').onclick = ()=>payRc('bece','BECE');
  document.getElementById('wasscePay').onclick = ()=>payRc('wassce','WASSCE');

  // Netflix/Audiomack
  bindSimplePrice("netflixPlan","netflixPrice");
  bindSimplePrice("audioPlan","audioPrice");
  document.getElementById("netflixPay").addEventListener("click",()=>paySimple("Netflix","netflixPlan", MOOLRE_LINKS.netflix));
  document.getElementById("audioPay").addEventListener("click",()=>paySimple("Audiomack","audioPlan", MOOLRE_LINKS.audiomack));
  document.getElementById("netflixBuy").addEventListener("click",()=>waSimple("Netflix Shared Account","netflixPlan"));
  document.getElementById("audioBuy").addEventListener("click",()=>waSimple("Audiomack Premium (Android)","audioPlan"));

  // AFA quick
  document.getElementById("afaBuy").addEventListener("click",()=>{
    const msg = encodeURIComponent("AFA Registration\nPayment: GHS 10\nRequirements: Full name + number to be registered");
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`,"_blank");
  });
  document.getElementById("afaPay").addEventListener("click",()=>{
    const url = MOOLRE_LINKS.afa;
    if (!url) { alert("Payment link not set yet for AFA. Open #admin to paste link."); return; }
    window.open(url, "_blank");
  });

  // Admin overlay
  showAdminIfHash();
});
