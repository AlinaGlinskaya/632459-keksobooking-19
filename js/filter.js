'use strict';

(function () {

  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var filterFormElement = document.querySelector('.map__filters');
  var houseTypeSelectElement = filterFormElement.querySelector('#housing-type');
  var housePriceSelectElement = filterFormElement.querySelector('#housing-price');
  var houseRoomSelectElement = filterFormElement.querySelector('#housing-rooms');
  var houseGuestSelectElement = filterFormElement.querySelector('#housing-guests');
  var filterFeatures = filterFormElement.querySelectorAll('.map__checkbox');

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

  var changeInputHandler = function () {
    var ads = [];
    window.map.removePins();
    window.map.removeCard();

    for (var i = 0; i < window.advertisements.length; i++) {
      if ((houseTypeSelectElement.value === 'any' ||
      window.advertisements[i].offer.type === houseTypeSelectElement.value) &&

      (housePriceSelectElement.value === 'any' ||
      getPriceRange(window.advertisements[i].offer.price) === housePriceSelectElement.value) &&

      (houseRoomSelectElement.value === 'any' ||
      window.advertisements[i].offer.rooms === Number(houseRoomSelectElement.value)) &&

      (houseGuestSelectElement.value === 'any' ||
      window.advertisements[i].offer.guests === Number(houseGuestSelectElement.value))) {
        ads.push(window.advertisements[i]);
      }

      var fragment = document.createDocumentFragment();
      for (var a = 0; a < ads.length && a < window.map.ADS_AMOUNT; a++) {
        fragment.appendChild(window.pin.createPin(ads[a]));
      }
      window.map.mapPinsListElement.appendChild(fragment);
    }

  };

  /* var changeInputHandler = function () {
    var ads = window.advertisements.slice();

    if (houseTypeSelectElement.value !== 'any') {
      ads = ads.filter(function (ad) {
        return ad.offer.type === houseTypeSelectElement.value;
      });
    }
    if (housePriceSelectElement.value !== 'any') {
      ads = ads.filter(function (ad) {
        var priceRange = getPriceRange(ad.offer.price);
        return priceRange === housePriceSelectElement.value;
      });
    }
    if (houseRoomSelectElement.value !== 'any') {
      ads = ads.filter(function (ad) {
        return ad.offer.rooms === Number(houseRoomSelectElement.value);
      });
    }
    if (houseGuestSelectElement.value !== 'any') {
      ads = ads.filter(function (ad) {
        return ad.offer.guests === Number(houseGuestSelectElement.value);
      });
    }

    var features = Array.from(filterFeatures);
    var featuresChecked = [];
    for (var index = 0; index < features.length; index++) {
      if (features[index].checked) {
        featuresChecked.push(features[index].value);
      }
    }

    window.map.removePins();
    window.map.removeCard();

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.map.ADS_AMOUNT && i < ads.length; i++) {
      fragment.appendChild(window.pin.createPin(ads[i]));
    }
    window.map.mapPinsListElement.appendChild(fragment);
    }
  };*/

  /* var compareArrays = function (arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
      arr2.includes(arr1[i]);
    }
  };*/

  /* ads = ads.filter(function (ad) {
      return compareArrays(featuresChecked, ad.offer.features);
    });*/

  filterFormElement.addEventListener('change', changeInputHandler);

})();


