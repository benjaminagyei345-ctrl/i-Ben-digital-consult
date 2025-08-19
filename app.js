// Minimal test for MTN with fixed Moolre links
const MOOLRE_LINKS = {
  mtn: {
    "1 GB": "https://pos.moolre.com/VDzK2iWY6v4QULHTGhk1OxuEAp8jPb",
    "2 GB": "https://pos.moolre.com/VDzK2iWY6v4QULHTGhk1OxuEAp8jPb",
    "3 GB": "https://pos.moolre.com/VDzK2iWY6v4QULHTGhk1OxuEAp8jPb"
  }
};

const DATA_PLANS = {
  mtn: [
    { label: "1 GB", price: 6 },
    { label: "2 GB", price: 12 },
    { label: "3 GB", price: 17 }
  ]
};

const WA_NUMBER = "233555610075";

function ghValid(n){ return /^0\d{9}$/.test(n); }
function fillSelect(id, items){
  const sel = document.getElementById(id);
  sel.innerHTML = "";
  items.forEach(p=>{
    const o = document.createElement("option");
    o.value = p.price; o.textContent = p.label; sel.appendChild(o);
  });
}

function bindDataCard(prefix, key){
  const sel = document.getElementById(prefix+"Plan");
  const priceEl = document.getElementById(prefix+"Price");
  const phoneEl = document.getElementById(prefix+"Number");
  const payBtn = document.getElementById(prefix+"Pay");
  const buyBtn = document.getElementById(prefix+"Buy");

  function update(){ priceEl.textContent = Number(sel.value).toFixed(2); }
  sel.addEventListener("change", update); update();

  payBtn.addEventListener("click", ()=>{
    const plan = sel.options[sel.selectedIndex].text;
    const url = MOOLRE_LINKS[key][plan];
    if(!url){ alert("No payment link set for "+plan); return; }
    window.open(url, "_blank");
  });

  buyBtn.addEventListener("click", ()=>{
    const plan = sel.options[sel.selectedIndex].text;
    const price = sel.value;
    const phone = phoneEl.value.trim();
    if(!ghValid(phone)){ alert("Enter a valid Ghana number (0XXXXXXXXX)."); phoneEl.focus(); return; }
    const msg = encodeURIComponent(`Order: MTN DATA\nPlan: ${plan}\nPrice: GHS ${price}\nNumber: ${phone}`);
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  });
}

window.addEventListener("DOMContentLoaded", ()=>{
  fillSelect("mtnPlan", DATA_PLANS.mtn);
  bindDataCard("mtn","mtn");
});
