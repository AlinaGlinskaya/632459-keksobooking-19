'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var roomSelectElement = adForm.querySelector('#room_number');
  var guestSelectElement = adForm.querySelector('#capacity');
  var timeInSelectElement = adForm.querySelector('#timein');
  var timeOutSelectElement = adForm.querySelector('#timeout');
  var houseTypeSelectElement = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var addressInput = adForm.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');

  var checkCapacity = function () {
    switch (roomSelectElement.value) {
      case '1':
        if (guestSelectElement.value === '3' || guestSelectElement.value === '2' || guestSelectElement.value === '0') {
          roomSelectElement.setCustomValidity('Только для 1 гостя');
        } else {
          roomSelectElement.setCustomValidity('');
        }
        break;

      case '2':
        if (guestSelectElement.value === '3' || guestSelectElement.value === '0') {
          roomSelectElement.setCustomValidity('Только для 1-го или 2-х гостей');
        } else {
          roomSelectElement.setCustomValidity('');
        }
        break;

      case '3':
        if (guestSelectElement.value === '0') {
          roomSelectElement.setCustomValidity('Только для 1-го, 2-х или 3-х гостей');
        } else {
          roomSelectElement.setCustomValidity('');
        }
        break;

      case '100':
        if (guestSelectElement.value !== '0') {
          roomSelectElement.setCustomValidity('Не для гостей');
        } else {
          roomSelectElement.setCustomValidity('');
        }
        break;
    }
  };

  var changeTimeOption = function (select, option) {
    switch (select.value) {
      case '12:00':
        option.value = '12:00';
        break;
      case '13:00':
        option.value = '13:00';
        break;
      case '14:00':
        option.value = '14:00';
        break;
    }
  };

  var setMinPrice = function () {
    switch (houseTypeSelectElement.value) {
      case 'bungalo':
        priceInput.setAttribute('min', '0');
        priceInput.placeholder = '0';
        break;
      case 'flat':
        priceInput.setAttribute('min', '1000');
        priceInput.placeholder = '1000';
        break;
      case 'house':
        priceInput.setAttribute('min', '5000');
        priceInput.placeholder = '5000';
        break;
      case 'palace':
        priceInput.setAttribute('min', '10000');
        priceInput.placeholder = '10000';
        break;
    }
  };

  /**
    Заполняет поле «адрес» в формате: «координата по оси X, координата по оси Y»
    */
  var getAddress = function () {
    var x = mapPinMain.offsetLeft;
    var pinMainX = x + window.pin.pinMainWidth / 2;
    var y = mapPinMain.offsetTop;
    var pinMainY = y + window.pin.pinMainHeight;
    if (adForm.classList.contains('ad-form--disabled')) {
      addressInput.value = Math.round(pinMainX) + ', ' + Math.round(pinMainY - window.pin.pinMainHeight / 2);
    } else {
      addressInput.value = Math.round(pinMainX) + ', ' + Math.round(pinMainY);
    }
  };

  roomSelectElement.addEventListener('change', function () {
    checkCapacity();
  });

  guestSelectElement.addEventListener('change', function () {
    checkCapacity();
  });

  timeInSelectElement.addEventListener('change', function () {
    changeTimeOption(timeInSelectElement, timeOutSelectElement);
  });

  timeOutSelectElement.addEventListener('change', function () {
    changeTimeOption(timeOutSelectElement, timeInSelectElement);
  });

  houseTypeSelectElement.addEventListener('change', function () {
    setMinPrice();
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });

  getAddress();

  window.form = {
    getAddress: getAddress,
  };
})();
