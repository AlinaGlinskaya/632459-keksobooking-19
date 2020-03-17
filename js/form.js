'use strict';

(function () {

  var CheckinTime = {
    '12': '12:00',
    '13': '13:00',
    '14': '14:00',
  };

  var adFormElement = document.querySelector('.ad-form');
  var roomSelectElement = adFormElement.querySelector('#room_number');
  var guestSelectElement = adFormElement.querySelector('#capacity');
  var timeInSelectElement = adFormElement.querySelector('#timein');
  var timeOutSelectElement = adFormElement.querySelector('#timeout');
  var houseTypeSelectElement = adFormElement.querySelector('#type');
  var priceInputElement = adFormElement.querySelector('#price');
  var addressInputElement = adFormElement.querySelector('#address');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var resetButtonElement = adFormElement.querySelector('.ad-form__reset');
  var inputTitleElement = adFormElement.querySelector('input[name=title]');
  var inputPriceElement = adFormElement.querySelector('input[name=price]');

  /**
    Функция проверки соответствия количества гостей и количества комнат
    */
  var checkCapacity = function () {
    switch (roomSelectElement.value) {
      case '1':
        if (guestSelectElement.value === '3' || guestSelectElement.value === '2' || guestSelectElement.value === '0') {
          roomSelectElement.setCustomValidity('Только для 1 гостя');
        } else {
          roomSelectElement.setCustomValidity('');
          removeFieldHighLight(roomSelectElement);
        }
        break;

      case '2':
        if (guestSelectElement.value === '3' || guestSelectElement.value === '0') {
          roomSelectElement.setCustomValidity('Только для 1-го или 2-х гостей');
        } else {
          roomSelectElement.setCustomValidity('');
          removeFieldHighLight(roomSelectElement);
        }
        break;

      case '3':
        if (guestSelectElement.value === '0') {
          roomSelectElement.setCustomValidity('Только для 1-го, 2-х или 3-х гостей');
        } else {
          roomSelectElement.setCustomValidity('');
          removeFieldHighLight(roomSelectElement);
        }
        break;

      case '100':
        if (guestSelectElement.value !== '0') {
          roomSelectElement.setCustomValidity('Не для гостей');
        } else {
          roomSelectElement.setCustomValidity('');
          removeFieldHighLight(roomSelectElement);
        }
        break;

      default:
        roomSelectElement.setCustomValidity('');
        break;
    }
  };

  /**
    Функция синхронизации времени заезда и выезда
    * @param {object} select - значение первого селекта
    * @param {object} option - значение второго селекта
    */
  var changeTimeOption = function (select, option) {
    switch (select.value) {
      case CheckinTime[12]:
        option.value = '12:00';
        break;
      case CheckinTime[13]:
        option.value = '13:00';
        break;
      case CheckinTime[14]:
        option.value = '14:00';
        break;
      default:
        option.value = '12:00';
        break;
    }
  };

  /**
    Функция установки минимальной цены в зависимости от выбранного типа жилья
    */
  var setMinPrice = function () {
    switch (houseTypeSelectElement.value) {
      case 'bungalo':
        priceInputElement.setAttribute('min', '0');
        priceInputElement.placeholder = '0';
        break;
      case 'flat':
        priceInputElement.setAttribute('min', '1000');
        priceInputElement.placeholder = '1000';
        break;
      case 'house':
        priceInputElement.setAttribute('min', '5000');
        priceInputElement.placeholder = '5000';
        break;
      case 'palace':
        priceInputElement.setAttribute('min', '10000');
        priceInputElement.placeholder = '10000';
        break;
      default:
        priceInputElement.placeholder = '1000';
        break;
    }
  };

  /**
    Функция заполняет поле «адрес» в формате: «координата по оси X, координата по оси Y»
    */
  var getAddress = function () {
    var x = mapPinMainElement.offsetLeft;
    var pinMainX = x + window.pin.pinMainWidth / 2;
    var y = mapPinMainElement.offsetTop;
    var pinMainY = y + window.pin.pinMainHeight;
    if (adFormElement.classList.contains('ad-form--disabled')) {
      addressInputElement.value = Math.round(pinMainX) + ', ' + Math.round(pinMainY - window.pin.pinMainHeight / 2);
    } else {
      addressInputElement.value = Math.round(pinMainX) + ', ' + Math.round(pinMainY);
    }
  };

  /**
    Функция подсветки невалидных полей
    * @param {object} field - поле формы
    */
  var highLightInvalidField = function (field) {
    field.style = 'border: 2px solid red';
  };

  /**
    Функция удаления подсветки полей
    * @param {object} field - поле формы
    */
  var removeFieldHighLight = function (field) {
    field.style = 'border: none';
  };

  var resetButtonClickHandler = function () {
    window.map.switchToInactiveState();
    resetButtonElement.removeEventListener('click', resetButtonClickHandler);
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

  // Подсветка невалидных полей
  inputTitleElement.addEventListener('invalid', function () {
    highLightInvalidField(inputTitleElement);
  });

  inputPriceElement.addEventListener('invalid', function () {
    highLightInvalidField(inputPriceElement);
  });

  inputTitleElement.addEventListener('change', function () {
    removeFieldHighLight(inputTitleElement);
  });

  inputPriceElement.addEventListener('change', function () {
    removeFieldHighLight(inputPriceElement);
  });

  roomSelectElement.addEventListener('invalid', function () {
    highLightInvalidField(roomSelectElement);
  });

  guestSelectElement.addEventListener('invalid', function () {
    highLightInvalidField(guestSelectElement);
  });


  adFormElement.addEventListener('submit', function (evt) {
    window.load.uploadAdData(new FormData(adFormElement), function () {
      window.map.switchToInactiveState();
      window.load.successHandler();
    },
    function () {
      window.load.errorUploadHandler();
    });
    evt.preventDefault();
  });

  getAddress();

  resetButtonElement.addEventListener('click', function () {
    resetButtonClickHandler();
  });

  window.form = {
    getAddress: getAddress,
    checkCapacity: checkCapacity,
  };
})();
