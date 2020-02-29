'use strict';

(function () {

  var ENTER_KEY = 'Enter';

  var map = document.querySelector('.map');
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

  // Функция активации карты и формы

  var switchToActiveState = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilterFeatures.removeAttribute('disabled');
    fieldsetAdHeader.removeAttribute('disabled');
    removeDisableAttr(mapFilterInputs);
    removeDisableAttr(fieldsetAdText);
    var advertisement = window.createData();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertisement.length; i++) {
      fragment.appendChild(window.pin.createPin(advertisement[i]));
    }
    mapPinsList.appendChild(fragment);
  };

  var pinClickActivateMapHandler = function (evt) {
    if (evt.button === 0) {
      switchToActiveState();
      window.form.getAddress();
      var mainPin = document.querySelector('.map__pin--main');
      mainPin.removeEventListener('mousedown', pinClickActivateMapHandler);
    }
  };

  var pinKeydownActivateMapHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      switchToActiveState();
      window.form.getAddress();
      var mainPin = document.querySelector('.map__pin--main');
      mainPin.removeEventListener('keydown', pinKeydownActivateMapHandler);
    }
  };

  mapPinMain.addEventListener('mousedown', pinClickActivateMapHandler);

  mapPinMain.addEventListener('keydown', pinKeydownActivateMapHandler);

  addDisableAttr(mapFilterInputs);
  addDisableAttr(fieldsetAdText);
  mapFilterFeatures.setAttribute('disabled', '');
  fieldsetAdHeader.setAttribute('disabled', '');
})();
