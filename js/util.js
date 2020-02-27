'use strict';

(function () {

  var PIN_MAIN_WIDTH = 40;
  var PIN_MAIN_HEIGHT = 44;

  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');

  // Заполняет поле адреса в неактиновм состоянии карты

  var getAddress = function (x, y) {
    if (adForm.classList.contains('ad-form--disabled')) {
      addressInput.value = x + ', ' + y;
    } else {
      addressInput.value = x + ', ' + (y + PIN_MAIN_HEIGHT / 2);
    }
  };

  // Вычисляет начальную координату главной метки по оси X

  var getStartCoordinateX = function () {
    var x = mapPinMain.style.left.slice(0, 3);
    var pinMainX = parseInt(x, 10) + PIN_MAIN_WIDTH / 2;
    return pinMainX;
  };

  // Вычисляет начальную координату главной метки по оси Y

  var getStartCoordinateY = function () {
    var y = mapPinMain.style.top.slice(0, 3);
    var pinMainY = parseInt(y, 10) + PIN_MAIN_HEIGHT / 2;
    return pinMainY;
  };

  window.util = {
    getStartCoordinateX: getStartCoordinateX,
    getStartCoordinateY: getStartCoordinateY,
    getAddress: getAddress,
  };
})();
