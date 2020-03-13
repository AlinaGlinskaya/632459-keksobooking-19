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

  var adCardCloseKeydownHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      var adCard = document.querySelector('.map__card');
      adCard.remove();
      document.removeEventListener('keydown', adCardCloseKeydownHandler);
    }
  };

  window.createCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = HouseType[card.offer.type.toUpperCase()];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    for (var i = 0; i < (card.offer.features).length; i++) {
      var featureItem = document.createElement('li');
      featureItem.textContent = card.offer.features[i];
      cardElement.querySelector('.popup__features').appendChild(featureItem);
    }
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('img').src = card.author.avatar;

    var adCloseButton = cardElement.querySelector('.popup__close');
    adCloseButton.addEventListener('click', function () {
      cardElement.remove();
      document.removeEventListener('keydown', adCardCloseKeydownHandler);
    });

    document.addEventListener('keydown', adCardCloseKeydownHandler);

    var photoListElement = cardElement.querySelector('.popup__photos');
    photoListElement.innerHTML = '';
    createPhoto(card, photoListElement);
    return cardElement;
  };
})();
