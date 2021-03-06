'use strict';

(function () {

  var ENTER_KEY = 'Enter';
  var LIMIT_TOP = 130;
  var LIMIT_BOTTOM = 630;
  var LIMIT_LEFT = -1;
  var MAIN_PIN_START_LEFT = 570;
  var MAIN_PIN_START_TOP = 375;
  var ADS_AMOUNT = 5;

  var mapElement = document.querySelector('.map');
  var mapWidth = mapElement.offsetWidth;
  var adFormElement = document.querySelector('.ad-form');
  var mapFilterInputs = document.querySelectorAll('.map__filter');
  var mapFilterFeaturesElement = document.querySelector('.map__features');
  var fieldsetAdHeaderElement = document.querySelector('.ad-form-header');
  var fieldsetAdText = document.querySelectorAll('.ad-form__element');
  var pinMainElement = document.querySelector('.map__pin--main');
  var pinsListElement = document.querySelector('.map__pins');

  var advertisements;

  var addDisableAttr = function (fields) {
    fields.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
  };

  var removeDisableAttr = function (fields) {
    fields.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var getPins = function () {
    window.load.getAdsData(function (ads) {
      advertisements = ads;
      window.map.advertisements = advertisements;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < ADS_AMOUNT; i++) {
        fragment.appendChild(window.pin.create(ads[i]));
      }
      pinsListElement.appendChild(fragment);
    },
    window.backendMessage.errorLoadHandler);
  };

  var unsuccessLoadHandler = function () {
    getPins();
    pinMainElement.removeEventListener('click', unsuccessLoadHandler);
  };

  /**
    Функция активации карты и формы
    */
  var switchToActiveState = function () {
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    mapFilterFeaturesElement.removeAttribute('disabled');
    fieldsetAdHeaderElement.removeAttribute('disabled');
    removeDisableAttr(mapFilterInputs);
    removeDisableAttr(fieldsetAdText);

    getPins();

    window.form.checkCapacity();
    window.form.setMinPrice();
  };

  var pinClickActivateMapHandler = function (evt) {
    if (evt.button === 0 && mapElement.classList.contains('map--faded')) {
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

      var newOffsetTop = pinMainElement.offsetTop - shift.y;
      if ((newOffsetTop + pinMainElement.clientHeight) >= LIMIT_TOP && (newOffsetTop + pinMainElement.clientHeight) <= LIMIT_BOTTOM) {
        pinMainElement.style.top = newOffsetTop + 'px';
      }

      var newoffsetLeft = pinMainElement.offsetLeft - shift.x;
      if (newoffsetLeft > (LIMIT_LEFT - window.pin.mainWidth / 2) && newoffsetLeft < (mapWidth - pinMainElement.clientWidth / 2)) {
        pinMainElement.style.left = newoffsetLeft + 'px';
      }
    };

    var pinDragMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

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

  var removePins = function () {
    var pins = mapElement.querySelectorAll('.map__pin');
    pins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });

  };

  var removeCard = function () {
    var adCard = document.querySelector('.map__card');
    if (adCard) {
      adCard.remove();
      document.removeEventListener('keydown', window.pin.adCardCloseKeydownHandler);
    }
  };

  /**
    Функция перевода карты и формы в неактивное состояние
    */
  var switchToInactiveState = function () {
    removePins();
    removeCard();
    mapElement.classList.add('map--faded');
    adFormElement.reset();
    adFormElement.classList.add('ad-form--disabled');
    addDisableAttr(mapFilterInputs);
    addDisableAttr(fieldsetAdText);
    mapFilterFeaturesElement.setAttribute('disabled', '');
    fieldsetAdHeaderElement.setAttribute('disabled', '');

    pinMainElement.style.left = MAIN_PIN_START_LEFT + 'px';
    pinMainElement.style.top = MAIN_PIN_START_TOP + 'px';
    window.form.getAddress();
  };

  pinMainElement.addEventListener('mousedown', pinClickActivateMapHandler);
  pinMainElement.addEventListener('keydown', pinKeydownActivateMapHandler);

  switchToInactiveState();

  window.map = {
    ADS_AMOUNT: ADS_AMOUNT,
    pinsListElement: pinsListElement,
    pinMainElement: pinMainElement,
    unsuccessLoadHandler: unsuccessLoadHandler,
    switchToInactiveState: switchToInactiveState,
    removePins: removePins,
    removeCard: removeCard,
  };

})();
