'use strict';
(function () {

  var TYPES = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var AVATARNUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinsList = document.querySelector('.map__pins');
  var mapWidth = mapPinsList.offsetWidth - mapPinMain.offsetWidth / 2;

  // Возвращает случайное целое число из заданного интервала

  var randomInteger = function (min, max) {
    var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
    return randomNumber;
  };

  /**
  * Перемешивает переданный массив по методу Фишера-Йетса
  * @param {any[]} arr - массив, который требуется перемешать
  * @return {any[]}
  */
  var shuffleArray = function (arr) {
    for (var j = arr.length - 1; j > 0; j--) {
      var rndm = Math.floor(Math.random() * (j + 1));
      var temp = arr[rndm];
      arr[rndm] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };


  // Функция создания объекта со случайными данными

  var createAdData = function () {
    var avatar = AVATARNUMBERS.slice();
    shuffleArray(avatar);

    var features = FEATURES.slice();
    shuffleArray(features);
    features.length = randomInteger(1, features.length);

    var addressX = randomInteger(0, 1000);
    var addressY = randomInteger(0, 1000);
    var price = randomInteger(0, 10000);

    var types = Object.values(TYPES);
    shuffleArray(types);

    var rooms = randomInteger(1, 5);
    var guests = randomInteger(1, 10);

    var checkin = CHECKIN.slice();
    shuffleArray(checkin);

    var checkout = CHECKOUT.slice();
    shuffleArray(checkout);

    var photos = PHOTOS.slice();
    shuffleArray(photos);
    photos.length = randomInteger(1, photos.length);

    var coordinateX = randomInteger(0, mapWidth);
    var coordinateY = randomInteger(130, 630);

    return {
      author: {
        avatar: 'img/avatars/user' + avatar.pop() + '.png',
      },
      offer: {
        title: 'Заголовок объявления',
        address: addressX + ', ' + addressY,
        price: price,
        type: types.pop(),
        rooms: rooms,
        guests: guests,
        checkin: checkin.pop(),
        checkout: checkout.pop(),
        features: features,
        description: 'Описание',
        photos: photos,
      },
      location: {
        x: coordinateX,
        y: coordinateY,
      },
    };
  };

  // Функция генерации 8 карточек объявлений

  window.createData = function () {
    var ads = [];
    for (var i = 0; i < 8; i++) {
      ads.push(createAdData());
    }
    return ads;
  };
})();
