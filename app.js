// Prices per card
const RC_PRICES = {
  bece: 25,
  wassce: 30
};
function updateRcPrice(kind){
  const qty = Number(document.getElementById(kind+'Qty').value);
  const unit = RC_PRICES[kind];
  const total = qty * unit;
  document.getElementById(kind+'Price').textContent = total.toFixed(2);
}
['bece','wassce'].forEach(k=>{
  document.getElementById(k+'Qty').addEventListener('change',()=>updateRcPrice(k));
  updateRcPrice(k);
});
function waOrderRc(kind, label){
  const qty = document.getElementById(kind+'Qty').value;
  const idx = document.getElementById(kind+'Index').value.trim();
  const yr  = document.getElementById(kind+'Year').value.trim();
  const total = document.getElementById(kind+'Price').textContent;
  const lines = [
    `Order: ${label} Result Checker`,
    `Qty: ${qty}`,
    `Total: GHS ${total}`,
    idx ? `Index: ${idx}` : null,
    yr  ? `Exam Year: ${yr}` : null
  ].filter(Boolean).join('\n');
  const msg = encodeURIComponent(lines);
  window.open(`https://wa.me/233555610075?text=${msg}`, "_blank");
}
document.getElementById('beceBuy').onclick = ()=>waOrderRc('bece','BECE');
document.getElementById('wassceBuy').onclick = ()=>waOrderRc('wassce','WASSCE');
