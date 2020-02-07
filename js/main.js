'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var CHECKIN = ['12:00', '13:00', '14:00'];

var CHECKOUT = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');

var mapPin = document.querySelector('.map__pin');

var mapPinsList = document.querySelector('.map__pins');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var mapWidth = mapPinsList.offsetWidth - mapPin.offsetWidth / 2;

var cards = [
  {author: {
    avatar: 'img/avatars/user0' + randomInteger(1, 8) + '.png',
  },

  offer: {
    title: 'Заголовок объявления',
    address: location.x + ',' + location.y,
    price: randomInteger(0, 100000),
    type: arrayRandElement(TYPES),
    rooms: randomInteger(1, 5),
    guests: randomInteger(1, 10),
    checkin: arrayRandElement(CHECKIN),
    checkout: arrayRandElement(CHECKOUT),
    features: arrayRandLength(FEATURES),
    description: 'Описание',
    photos: arrayRandLength(PHOTOS),
  },

  location: {
    x: randomInteger(0, mapWidth),
    y: randomInteger(130, 630),
  },
  }
];

map.classList.remove('map--faded');

function randomInteger(min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randomNumber;
}

function arrayRandElement(array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
}

function arrayRandLength(array) {
  array.length = randomInteger(1, 6);
  return array;
}

var createCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' Р/ночь';
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').src = card.offer.photos;
  return cardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < cards.length; i++) {
  fragment.appendChild(createCard(cards[i]));
}
mapPinsList.appendChild(fragment);
