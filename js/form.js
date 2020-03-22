'use strict';

(function () {

  var Time = {
    TWELVE: '12:00',
    ONE: '13:00',
    TWO: '14:00',
  };

  var MinPrice = {
    FOR_BUNGALO: '0',
    FOR_FLAT: '1000',
    FOR_HOUSE: '5000',
    FOR_PALACE: '10000',
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
      case Time.TWELVE:
        option.value = Time.TWELVE;
        break;
      case Time.ONE:
        option.value = Time.ONE;
        break;
      case Time.TWO:
        option.value = Time.TWO;
        break;
      default:
        option.value = Time.TWELVE;
        break;
    }
  };

  /**
    Функция установки минимальной цены в зависимости от выбранного типа жилья
    */
  var setMinPrice = function () {
    switch (houseTypeSelectElement.value) {
      case 'bungalo':
        priceInputElement.setAttribute('min', MinPrice.FOR_BUNGALO);
        priceInputElement.placeholder = MinPrice.FOR_BUNGALO;
        break;
      case 'flat':
        priceInputElement.setAttribute('min', MinPrice.FOR_FLAT);
        priceInputElement.placeholder = MinPrice.FOR_FLAT;
        break;
      case 'house':
        priceInputElement.setAttribute('min', MinPrice.FOR_HOUSE);
        priceInputElement.placeholder = MinPrice.FOR_HOUSE;
        break;
      case 'palace':
        priceInputElement.setAttribute('min', MinPrice.FOR_PALACE);
        priceInputElement.placeholder = MinPrice.FOR_PALACE;
        break;
      default:
        priceInputElement.placeholder = MinPrice.FOR_FLAT;
        break;
    }
  };

  /**
    Функция заполняет поле «адрес» в формате: «координата по оси X, координата по оси Y»
    */
  var getAddress = function () {
    var x = mapPinMainElement.offsetLeft;
    var pinMainX = x + window.pin.mainWidth / 2;
    var y = mapPinMainElement.offsetTop;
    var pinMainY = y + window.pin.mainHeight;
    if (adFormElement.classList.contains('ad-form--disabled')) {
      addressInputElement.value = Math.round(pinMainX) + ', ' + Math.round(pinMainY - window.pin.mainHeight / 2);
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
    window.load.sendAdData(new FormData(adFormElement), function () {
      window.map.switchToInactiveState();
      window.backendMessage.successHandler();
    },
    function () {
      window.backendMessage.errorUploadHandler();
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
    setMinPrice: setMinPrice,
  };
})();
