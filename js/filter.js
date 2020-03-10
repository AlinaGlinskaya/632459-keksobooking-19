'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');
  var houseTypeSelect = filterForm.querySelector('#housing-type');
  var filterFeaturesField = filterForm.querySelector('#housing-features');
  var housePriceSelect = filterForm.querySelector('#housing-price');
  var houseRoomSelect = filterForm.querySelector('#housing-rooms');
  var houseGuestSelect = filterForm.querySelector('#housing-guests');

  var changeInputHandler = function () {
    var ads = window.advertisements.slice();
    ads = ads.filter(function (ad) {
      return ad.offer.type === houseTypeSelect.value;
    });

    window.map.removePins();
    window.map.removeCard();

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.map.ADS_AMOUNT && i < ads.length; i++) {
      fragment.appendChild(window.pin.createPin(ads[i]));
    }
    window.map.mapPinsList.appendChild(fragment);
  };

  var inactivateFilter = function () {
    houseTypeSelect.setAttribute('disabled', '');
    filterFeaturesField.setAttribute('disabled', '');
    housePriceSelect.setAttribute('disabled', '');
    houseRoomSelect.setAttribute('disabled', '');
    houseGuestSelect.setAttribute('disabled', '');
  };

  filterForm.addEventListener('change', changeInputHandler);

  window.filter = {
    inactivateFilter: inactivateFilter,
  };

})();


