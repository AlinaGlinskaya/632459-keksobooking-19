'use strict';

(function () {

  var ENTER_KEY = 'Enter';
  var LIMIT_TOP = 130;
  var LIMIT_BOTTOM = 630;
  var LIMIT_LEFT = 0;
  var MAIN_PIN_START_LEFT = 570;
  var MAIN_PIN_START_TOP = 375;

  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;
  var adForm = document.querySelector('.ad-form');
  var mapFilterInputs = document.querySelectorAll('.map__filter');
  var mapFilterFeatures = document.querySelector('.map__features');
  var fieldsetAdHeader = document.querySelector('.ad-form-header');
  var fieldsetAdText = document.querySelectorAll('.ad-form__element');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinsList = document.querySelector('.map__pins');

  var addDisableAttr = function (fields) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', '');
    }
  };

  var removeDisableAttr = function (fields) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].removeAttribute('disabled');
    }
  };

  /**
    Функция активации карты и формы
    */
  var switchToActiveState = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilterFeatures.removeAttribute('disabled');
    fieldsetAdHeader.removeAttribute('disabled');
    removeDisableAttr(mapFilterInputs);
    removeDisableAttr(fieldsetAdText);
    window.load.loadAdsData(function (advertisement) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < advertisement.length; i++) {
        fragment.appendChild(window.pin.createPin(advertisement[i]));
      }
      mapPinsList.appendChild(fragment);
    },
    window.load.errorLoadHandler);
  };

  var pinClickActivateMapHandler = function (evt) {
    if ((evt.button === 0) && (adForm.classList.contains('ad-form--disabled'))) {
      switchToActiveState();
      window.form.getAddress();
    }
    evt.preventDefault();
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinDragMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      window.form.getAddress();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newOffsetTop = mapPinMain.offsetTop - shift.y;
      if ((newOffsetTop + mapPinMain.clientHeight) > LIMIT_TOP && (newOffsetTop + mapPinMain.clientHeight) < LIMIT_BOTTOM) {
        mapPinMain.style.top = newOffsetTop + 'px';
      }

      var newoffsetLeft = mapPinMain.offsetLeft - shift.x;
      if (newoffsetLeft > LIMIT_LEFT && newoffsetLeft < (mapWidth - mapPinMain.clientWidth)) {
        mapPinMain.style.left = newoffsetLeft + 'px';
      }
    };

    var pinDragMouseupHandler = function (upEvt) {
      upEvt.preventDefault();
      window.form.getAddress();

      document.removeEventListener('mousemove', pinDragMousemoveHandler);
      document.removeEventListener('mouseup', pinDragMouseupHandler);
    };

    document.addEventListener('mousemove', pinDragMousemoveHandler);
    document.addEventListener('mouseup', pinDragMouseupHandler);
  };

  var pinKeydownActivateMapHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      switchToActiveState();
      window.form.getAddress();
      var mainPin = document.querySelector('.map__pin--main');
      mainPin.removeEventListener('keydown', pinKeydownActivateMapHandler);
    }
  };

  /**
    Функция перевода карты и формы в неактивное состояние
    */
  window.switchToInactiveState = function () {
    var pins = map.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }

    map.classList.add('map--faded');
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    addDisableAttr(mapFilterInputs);
    addDisableAttr(fieldsetAdText);
    mapFilterFeatures.setAttribute('disabled', '');
    fieldsetAdHeader.setAttribute('disabled', '');
    mapPinMain.style.left = MAIN_PIN_START_LEFT + 'px';
    mapPinMain.style.top = MAIN_PIN_START_TOP + 'px';
    window.form.getAddress();

    var adCard = document.querySelector('.map__card');
    if (adCard) {
      adCard.remove();
      document.removeEventListener('keydown', window.pin.adCardCloseKeydownHandler);
    }
  };

  window.switchToInactiveState();

  mapPinMain.addEventListener('mousedown', pinClickActivateMapHandler);
  mapPinMain.addEventListener('keydown', pinKeydownActivateMapHandler);

})();
