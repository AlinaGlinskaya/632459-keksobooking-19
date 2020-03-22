'use strict';

(function () {

  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var filterFormElement = document.querySelector('.map__filters');
  var houseTypeSelectElement = filterFormElement.querySelector('#housing-type');
  var housePriceSelectElement = filterFormElement.querySelector('#housing-price');
  var houseRoomSelectElement = filterFormElement.querySelector('#housing-rooms');
  var houseGuestSelectElement = filterFormElement.querySelector('#housing-guests');

  var switchSelectsToInactiveState = function () {
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
  var filterAds = function () {
    var ads = [];
    window.map.removePins();
    window.map.removeCard();

    var featuresChecked = filterFormElement.querySelectorAll('input[name=features]:checked');

    window.map.advertisements.forEach(function (item) {
      var type = false;
      if (houseTypeSelectElement.value === 'any' || item.offer.type === houseTypeSelectElement.value) {
        type = true;
      }

      var price = false;
      if (housePriceSelectElement.value === 'any' || getPriceRange(item.offer.price) === housePriceSelectElement.value) {
        price = true;
      }

      var rooms = false;
      if (houseRoomSelectElement.value === 'any' || item.offer.rooms === Number(houseRoomSelectElement.value)) {
        rooms = true;
      }

      var guests = false;
      if (houseGuestSelectElement.value === 'any' || item.offer.guests === Number(houseGuestSelectElement.value)) {
        guests = true;
      }

      var features = true;
      for (var j = 0; j < featuresChecked.length; j++) {
        if (item.offer.features.indexOf(featuresChecked[j].value) === -1) {
          features = false;
          break;
        }
      }

      if (type && price && rooms && guests && features) {
        ads.push(item);
      }
    });

    var fragment = document.createDocumentFragment();
    for (var a = 0; a < ads.length && a < window.map.ADS_AMOUNT; a++) {
      var pin = window.pin.create(ads[a]);
      fragment.appendChild(pin);
    }

    window.map.pinsListElement.appendChild(fragment);

  };

  var filterAdsWithDebounce = window.debounce(filterAds);

  filterFormElement.addEventListener('change', function () {
    filterAdsWithDebounce();
  });

  window.filter = {
    switchSelectsToInactiveState: switchSelectsToInactiveState,
  };

})();


