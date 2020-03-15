'use strict';

(function () {

  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var filterFormElement = document.querySelector('.map__filters');
  var houseTypeSelectElement = filterFormElement.querySelector('#housing-type');
  var housePriceSelectElement = filterFormElement.querySelector('#housing-price');
  var houseRoomSelectElement = filterFormElement.querySelector('#housing-rooms');
  var houseGuestSelectElement = filterFormElement.querySelector('#housing-guests');

  window.switchFilterToInactiveState = function () {
    houseTypeSelectElement.setAttribute('disabled', '');
    housePriceSelectElement.setAttribute('disabled', '');
    houseRoomSelectElement.setAttribute('disabled', '');
    houseGuestSelectElement.setAttribute('disabled', '');
  };

  /**
    Функция установки соответствия цены из объекта данных значениям селекта
    * @param {number} price - цена из объекта данных объявления
    * @return {selectValue} значение селекта
    */
  var getPriceRange = function (price) {
    var selectValue;
    switch (true) {
      case price < LOW_PRICE:
        selectValue = 'low';
        break;
      case price >= LOW_PRICE && price <= HIGH_PRICE:
        selectValue = 'middle';
        break;
      case price >= HIGH_PRICE:
        selectValue = 'high';
        break;
      default:
        selectValue = 'any';
        break;
    }
    return selectValue;
  };

  /**
    Метод отрисовки похожих объявлений
    */
  var filterInputChangeHandler = function () {
    var ads = [];
    window.map.removePins();
    window.map.removeCard();

    var featuresChecked = filterFormElement.querySelectorAll('input[name=features]:checked');

    for (var i = 0; i < window.advertisements.length; i++) {
      var type = false;
      if (houseTypeSelectElement.value === 'any' || window.advertisements[i].offer.type === houseTypeSelectElement.value) {
        type = true;
      }

      var price = false;
      if (housePriceSelectElement.value === 'any' || getPriceRange(window.advertisements[i].offer.price) === housePriceSelectElement.value) {
        price = true;
      }

      var rooms = false;
      if (houseRoomSelectElement.value === 'any' || window.advertisements[i].offer.rooms === Number(houseRoomSelectElement.value)) {
        rooms = true;
      }

      var guests = false;
      if (houseGuestSelectElement.value === 'any' || window.advertisements[i].offer.guests === Number(houseGuestSelectElement.value)) {
        guests = true;
      }

      var features = true;
      for (var j = 0; j < featuresChecked.length; j++) {
        if (window.advertisements[i].offer.features.indexOf(featuresChecked[j].value) === -1) {
          features = false;
          break;
        }
      }

      if (type && price && rooms && guests && features) {
        ads.push(window.advertisements[i]);
      }
    }

    var fragment = document.createDocumentFragment();
    for (var a = 0; a < ads.length && a < window.map.ADS_AMOUNT; a++) {
      var pin = window.pin.createPin(ads[a]);
      fragment.appendChild(pin);
    }


    window.debounce(window.map.mapPinsListElement.appendChild(fragment));

  };

  filterFormElement.addEventListener('change', filterInputChangeHandler);


})();

