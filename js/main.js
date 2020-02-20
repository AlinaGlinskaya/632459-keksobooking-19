'use strict';

var TYPES = {'Дворец': 'palace', 'Квартира': 'flat', 'Дом': 'house', 'Бунгало': 'bungalo'};
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ENTER_KEY = 'Enter';
var AVATARNUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var PIN_MAIN_WIDTH = 40;
var PIN_MAIN_HEIGHT = 44;

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinsList = document.querySelector('.map__pins');
// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapWidth = mapPinsList.offsetWidth - mapPinMain.offsetWidth / 2;
var fieldsetAdHeader = document.querySelector('.ad-form-header');
var fieldsetAdText = document.querySelectorAll('.ad-form__element');
var mapFilterInputs = document.querySelectorAll('.map__filter');
var mapFilterFeatures = document.querySelector('.map__features');
var adForm = document.querySelector('.ad-form');
var adFormSubmit = adForm.querySelector('.ad-form__submit');

var addDisableAttr = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].setAttribute('disabled', '');
  }
};

var removeDisableAttr = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].removeAttribute('disabled');
  }
};

var switchToActiveState = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilterFeatures.removeAttribute('disabled');
  fieldsetAdHeader.removeAttribute('disabled');
  removeDisableAttr(mapFilterInputs);
  removeDisableAttr(fieldsetAdText);
};

var getAddress = function (x, y) {
  var addressInput = adForm.querySelector('#address');
  if (adForm.classList.contains('ad-form--disabled')) {
    addressInput.value = x + ', ' + y;
  } else {
    addressInput.value = x + ', ' + (y + PIN_MAIN_HEIGHT / 2);
  }
};

var getStartCoordinateX = function () {
  var x = mapPinMain.style.left.slice(0, 3);
  var pinMainX = parseInt(x, 10) + PIN_MAIN_WIDTH / 2;
  return pinMainX;
};

var getStartCoordinateY = function () {
  var y = mapPinMain.style.top.slice(0, 3);
  var pinMainY = parseInt(y, 10) + PIN_MAIN_HEIGHT / 2;
  return pinMainY;
};

var checkCapacity = function () {
  var room = adForm.querySelector('#room_number');
  var roomInput = room.querySelector('option');
  var guest = adForm.querySelector('#capacity');
  var guestInput = guest.querySelector('option');
  if (roomInput.value === '1' && (guestInput.value === '3' || guestInput.value === '2' || guestInput.value === '0')) {
    room.setCustomValidity('Только для 1 гостя');
  }
  if (roomInput.value === '2' && (guestInput.value === '3' || guestInput.value === '0')) {
    room.setCustomValidity('Только для 1 или 2-х гостей');
  }
  if (roomInput.value === '3' && guestInput.value === '0') {
    room.setCustomValidity('Для 1, 2 или 3-х гостей');
  }
  if (roomInput.value === '100' && guestInput !== '0') {
    room.setCustomValidity('Не для гостей');
  }
};

var createAdData = function () {
  var avatar = AVATARNUMBERS.slice();
  shuffleArray(avatar);

  var features = FEATURES.slice();
  shuffleArray(features);
  features.length = randomInteger(1, features.length);

  var addressX = randomInteger(0, 1000);
  var addressY = randomInteger(0, 1000);
  var price = randomInteger(0, 10000);

  var types = Object.keys(TYPES);
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

var createData = function () {
  var ads = [];
  for (var i = 0; i < 8; i++) {
    ads.push(createAdData());
  }
  return ads;
};

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

/*
var createPhoto = function (cardData, photoListElement) {
  var photos = PHOTOS.slice();
  var photosLength = randomInteger(1, 3);
  shuffleArray(photos);
  for (var i = 0; i < photosLength; i++) {
    var img = new Image(45, 40);
    img.src = photos.pop();
    img.classList.add('popup__photo');
    img.alt = cardData.offer.title;
    photoListElement.appendChild(img);
  }
};

/**
 * @param {object} card - объект с данными объявления
 * @return {object} - DOM-элемент карточки объявления
 */

/*
var createCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('img').src = card.author.avatar;
  var photoList = cardElement.querySelector('.popup__photos');
  photoList.innerHTML = '';
  createPhoto(card, photoList);
  return cardElement;
};
*/


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

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    switchToActiveState();
    getAddress(getStartCoordinateX(), getStartCoordinateY());
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    switchToActiveState();
  }
});

getAddress(getStartCoordinateX(), getStartCoordinateY());

addDisableAttr(mapFilterInputs);
addDisableAttr(fieldsetAdText);
mapFilterFeatures.setAttribute('disabled', '');
fieldsetAdHeader.setAttribute('disabled', '');

adFormSubmit.addEventListener('submit', function (evt) {
  debugger;
  evt.preventDefault();
  checkCapacity();
});

/*
var advertisement = (createData());
var fragment = document.createDocumentFragment();
for (var i = 0; i < advertisement.length; i++) {
  fragment.appendChild(createPin());
}
mapPinsList.appendChild(fragment);
*/

// map.appendChild(createCard(advertisement[0]));
