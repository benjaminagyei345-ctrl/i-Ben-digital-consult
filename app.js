/* Color the Buy buttons by network/service */
(function(){
  function applyColors(){
    // Product cards (data bundles)
    document.querySelectorAll('#planGrid .card, .card').forEach(function(card){
      var badge = card.querySelector('.badge');
      var btn = card.querySelector('button.btn, a.btn, .buy-btn');
      if(!badge || !btn) return;
      var net = (badge.textContent || '').toLowerCase();
      btn.classList.remove('buy-mtn','buy-tigo','buy-telecel','buy-netflix','buy-audiomack');
      if(net.includes('mtn')) btn.classList.add('buy-mtn');
      else if(net.includes('airteltigo') || net.includes('tigo') || net.includes('at')) btn.classList.add('buy-tigo');
      else if(net.includes('telecel') || net.includes('vodafone')) btn.classList.add('buy-telecel');
    });

    // Services section cards (Netflix / Audiomack)
    document.querySelectorAll('#services .card').forEach(function(card){
      var title = (card.querySelector('h2,h3,h4') || {}).textContent || '';
      var btn = card.querySelector('button.btn, a.btn, .buy-btn');
      if(!btn) return;
      var t = title.toLowerCase();
      btn.classList.remove('buy-netflix','buy-audiomack');
      if(t.includes('netflix')) btn.classList.add('buy-netflix');
      if(t.includes('audiomack')) btn.classList.add('buy-audiomack');
    });
  }

  // Run on load
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      applyColors();
      // In case cards render asynchronously
      setTimeout(applyColors, 300);
      setTimeout(applyColors, 800);
      setTimeout(applyColors, 1500);
    });
  } else {
    applyColors();
  }

  // If the page defines renderPlanCards, patch it to re-apply colors after it runs
  var _orig = window.renderPlanCards;
  if (typeof _orig === 'function'){
    window.renderPlanCards = function(){
      var result = _orig.apply(this, arguments);
      try { applyColors(); } catch(e){}
      return result;
    };
  }

  // Expose manually
  window.applyBuyButtonColors = applyColors;
})();