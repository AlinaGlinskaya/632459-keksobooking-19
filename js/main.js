'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var CHECKIN = ['12:00', '13:00', '14:00'];

var CHECKOUT = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');

var mapPinMain = document.querySelector('.map__pin--main');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var mapPinsList = document.querySelector('.map__pins');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var mapWidth = mapPinsList.offsetWidth - mapPinMain.offsetWidth / 2;

var avatarNumbers = ['01', '02', '03', '04', '05', '06', '07', '08'];

var createAdData = function () {
  var avatar = avatarNumbers.slice();
  shuffleArray(avatar);

  var features = FEATURES.slice();
  shuffleArray(features);
  features.length = randomInteger(1, features.length);

  var addressX = randomInteger(0, 1000);

  var addressY = randomInteger(0, 1000);

  var price = randomInteger(0, 10000);

  var types = TYPES.slice();
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
      address: addressX + ',' + addressY,
      price: price + ' Р/ночь',
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

var advertisement = (createData());

function createData() {
  var ads = [];
  for (var i = 0; i < 8; i++) {
    ads.push(createAdData());
  }
  return ads;
}

map.classList.remove('map--faded');

function randomInteger(min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randomNumber;
}

/**
* Перемешивает переданный массив по методу Фишера-Йетса
* @param {any[]} arr - массив, который требуется перемешать
* @return {any[]}
*/

function shuffleArray(arr) {
  for (var j = arr.length - 1; j > 0; j--) {
    var rndm = Math.floor(Math.random() * (j + 1));
    var temp = arr[rndm];
    arr[rndm] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

var createCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price;
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').src = card.offer.photos;
  return cardElement;
};

var createPin = function (card) {
  var pinElement = pinTemplate.cloneNode(true);
  card = createAdData();
  var pinWidth = 20;
  var pinHeight = 40;
  var left = card.location.x + pinWidth + 'px';
  var top = card.location.y + pinHeight + 'px';
  pinElement.style.left = left;
  pinElement.style.top = top;
  pinElement.querySelector('img').src = card.author.avatar;
  pinElement.querySelector('img').alt = card.title;
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < advertisement.length; i++) {
  fragment.appendChild(createCard(advertisement[i]));
  fragment.appendChild(createPin());
}
mapPinsList.appendChild(fragment);
