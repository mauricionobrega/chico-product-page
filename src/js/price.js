(function (win, doc) {
  'use strict';

  var prices = doc.querySelectorAll('.price');

  function init() {
    var i = prices.length;
    while (i--) {
      var price = prices[i],
        value = price.innerHTML,
        slipted = value.split('.');
      price.innerHTML = slipted[0] + '<sup>' + slipted[1] + '</sup>';
    }
  }

  init();

}(window, window.document));
