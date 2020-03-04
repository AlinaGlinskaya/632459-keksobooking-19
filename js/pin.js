'use strict';

(function () {

  var PIN_WIDTH = 20;
  var PIN_HEIGHT = 40;
  var ESC_KEY = 'Escape';

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var pinMainWidth = mapPinMain.offsetWidth;
  var pinMainHeight = mapPinMain.offsetHeight;


  var adCardCloseKeydownHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      var adCard = document.querySelector('.map__card');
      adCard.remove();
      document.removeEventListener('keydown', adCardCloseKeydownHandler);
    }
  };

  var createPin = function (card) {
    var pinElement = pinTemplate.cloneNode(true);
    var left = card.location.x + PIN_WIDTH / 2 + 'px';
    var top = card.location.y + PIN_HEIGHT + 'px';
    pinElement.style.left = left;
    pinElement.style.top = top;
    pinElement.querySelector('img').src = card.author.avatar;
    pinElement.querySelector('img').alt = card.title;
    pinElement.addEventListener('click', function () {
      if (!pinElement.classList.contains('map__pin--active')) {
        var pinElementActive = document.querySelector('.map__pin--active');
        if (pinElementActive) {
          pinElementActive.classList.remove('map__pin--active');
        }

        var adCard = document.querySelector('.map__card');
        if (adCard) {
          document.removeEventListener('keydown', adCardCloseKeydownHandler);
          adCard.remove();
        }

        map.appendChild(window.createCard(card));

        pinElement.classList.add('map__pin--active');
      }
    });
    return pinElement;
  };

  window.pin = {
    createPin: createPin,
    pinMainWidth: pinMainWidth,
    pinMainHeight: pinMainHeight,
  };
})();
