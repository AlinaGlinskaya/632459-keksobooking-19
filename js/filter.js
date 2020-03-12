'use strict';

(function () {

  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var filterForm = document.querySelector('.map__filters');
  var houseTypeSelect = filterForm.querySelector('#housing-type');
  var housePriceSelect = filterForm.querySelector('#housing-price');
  var houseRoomSelect = filterForm.querySelector('#housing-rooms');
  var houseGuestSelect = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelectorAll('.map__checkbox');

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
    }
    return selectValue;
  };

  var compareArrays = function (arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
      arr2.includes(arr1[i]);
    }
  };

  var changeInputHandler = function () {
    var ads = window.advertisements.slice();

    if (houseTypeSelect.value !== 'any') {
      ads = ads.filter(function (ad) {
        return ad.offer.type === houseTypeSelect.value;
      });
    }
    if (housePriceSelect.value !== 'any') {
      ads = ads.filter(function (ad) {
        var priceRange = getPriceRange(ad.offer.price);
        return priceRange === housePriceSelect.value;
      });
    }
    if (houseRoomSelect.value !== 'any') {
      ads = ads.filter(function (ad) {
        return ad.offer.rooms === Number(houseRoomSelect.value);
      });
    }
    if (houseGuestSelect.value !== 'any') {
      ads = ads.filter(function (ad) {
        return ad.offer.guests === Number(houseGuestSelect.value);
      });
    }

    var features = Array.from(filterFeatures);
    var featuresChecked = [];
    for (var index = 0; index < features.length; index++) {
      if (features[index].checked) {
        featuresChecked.push(features[index].value);
      }
    }

    ads = ads.filter(function (ad) {
      return compareArrays(featuresChecked, ad.offer.features);
    });

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


