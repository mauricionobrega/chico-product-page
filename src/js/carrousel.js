(function () {
  'use strict';

  var chicoCarrousels = ch('.ch-carousel');

  function init() {
    var i = chicoCarrousels.length;
    while (i--) {
      new ch.Carousel(chicoCarrousels[i]);
    }
  }

  init();

}());
