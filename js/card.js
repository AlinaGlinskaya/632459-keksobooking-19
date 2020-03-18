'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

  var HouseType = {
    'FLAT': 'Квартира',
    'PALACE': 'Дворец',
    'BUNGALO': 'Бунгало',
    'HOUSE': 'Дом'
  };

  var RoomAmount = {
    NO_ROOMS: 0,
    ONE_ROOM: 1,
    MANY_ROOMS: 4,
  };

  var GuestAmount = {
    ONE_GUEST: 1,
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  /**
  * @param {object} cardData - объект с данными объявления
  * @param {object} photoList - элемент, в который добавляются изображения
  */
  var createPhoto = function (cardData, photoList) {
    var photos = cardData.offer.photos;
    for (var i = 0; i < photos.length; i++) {
      var img = new Image(PHOTO_WIDTH, PHOTO_HEIGHT);
      img.src = photos[i];
      img.classList.add('popup__photo');
      img.alt = cardData.offer.title;
      photoList.appendChild(img);
    }
  };

  /**
  * @param {object} cardData - объект с данными объявления
  * @param {object} featuresList - элемент, в который добавляются features
  */
  var createFeatureList = function (cardData, featuresList) {
    cardData.offer.features.forEach(function (id) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + id);
      featuresList.appendChild(featureItem);
    });
  };


  var setConformityForGuests = function (card) {
    if (card.offer.guests === GuestAmount.ONE_GUEST) {
      return ' гостя';
    }
    return ' гостей';
  };

  var setConformityForRooms = function (card) {
    if (card.offer.rooms === RoomAmount.ONE_ROOM) {
      return ' комната для ';
    }

    return (card.offer.rooms > RoomAmount.MANY_ROOMS || card.offer.rooms === RoomAmount.NO_ROOMS) ? ' комнат для ' : ' комнаты для ';

  };

  var adCardCloseKeydownHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      var adCard = document.querySelector('.map__card');
      adCard.remove();
      document.removeEventListener('keydown', adCardCloseKeydownHandler);
    }
  };

  /**
    Метод отрисовки карточки
    * @param {object} card - объект с данными объявления
    * @return {object} карточка объявления
    */
  var createCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = HouseType[card.offer.type.toUpperCase()];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + setConformityForRooms(card) + card.offer.guests + setConformityForGuests(card);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var featuresListElement = cardElement.querySelector('.popup__features');
    featuresListElement.innerHTML = '';
    createFeatureList(card, featuresListElement);

    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('img').src = card.author.avatar;

    var adCloseButton = cardElement.querySelector('.popup__close');
    adCloseButton.addEventListener('click', function () {
      cardElement.remove();
      document.removeEventListener('keydown', adCardCloseKeydownHandler);
      var pinActiveElement = document.querySelector('.map__pin--active');
      pinActiveElement.classList.remove('map__pin--active');
    });

    document.addEventListener('keydown', adCardCloseKeydownHandler);

    var photoListElement = cardElement.querySelector('.popup__photos');
    photoListElement.innerHTML = '';
    createPhoto(card, photoListElement);
    return cardElement;
  };

  window.card = {
    createCard: createCard,
  };
})();
