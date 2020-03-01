'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (!adForm.classList.contains('ad-form--disabled')) {
      evt.preventDefault();
      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      var pinDragMousemoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        window.form.getAddress();

        var shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetWidth - shift.x) + 'px';
      };

      var pinDragMouseupHandler = function (upEvt) {
        upEvt.preventDefault();
        window.form.getAddress();

        document.removeEventListener('mousemove', pinDragMousemoveHandler);
        document.removeEventListener('mouseup', pinDragMouseupHandler);
      };

      document.addEventListener('mousemove', pinDragMousemoveHandler);
      document.addEventListener('mouseup', pinDragMouseupHandler);
    }
  });
})();
