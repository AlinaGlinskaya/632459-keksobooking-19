'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');
  var houseTypeSelect = filterForm.querySelector('#housing-type');
  var housePriceSelect = filterForm.querySelector('#housing-price');
  var houseRoomSelect = filterForm.querySelector('#housing-rooms');
  var houseGuestSelect = filterForm.querySelector('#housing-guests');

  var getPriceRange = function (price) {
    var selectValue;
    switch (price) {
      case price < 10000:
        selectValue = 'low';
        break;
      case price >= 10000 && price <= 50000:
        selectValue = 'middle';
        break;
      case price >= 50000:
        selectValue = 'high';
        break;
    }
    return selectValue;
  };

  var changeInputHandler = function () {
    var ads = window.advertisements.slice();
    if (houseTypeSelect.value !== 'any') {
      ads = ads.filter(function (ad) {
        return ad.offer.type === houseTypeSelect.value;
      });
    }
    if (housePriceSelect !== 'any') {
      ads = ads.filter(function (ad) {
        var priceRange = getPriceRange(ad.offer.price);
        return priceRange === housePriceSelect.value;
      });
    }
    if (houseRoomSelect.value !== 'any') {
      ads = ads.filter(function (ad) {
        return String(ad.offer.rooms) === houseRoomSelect.value;
      });
    }

    window.map.removePins();
    window.map.removeCard();

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.map.ADS_AMOUNT && i < ads.length; i++) {
      fragment.appendChild(window.pin.createPin(ads[i]));
    }
    window.map.mapPinsList.appendChild(fragment);
  };

  filterForm.addEventListener('change', changeInputHandler);

})();


