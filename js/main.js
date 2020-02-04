'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinsList = document.querySelector('.map__pins');

var cardTemplate = document.querySelector('#card')
.content
.querySelector('.map__card');

var cards = [
  {
    author: {
      avatar: 'img/avatars/user01.png',
    }
  },


  {
    offer: {
      title: 'строка',
      address: 'строка',
      price: 100,
      type: 'строка',
      rooms: 1,
      guests: 1,
      checkin: 'строка',
      checkout: 'строка',
      features: 'строка',
      description: 'строка',
      photos: 'строка',
    },

    location: {
      x: 100,
      y: 100,
    },
  },

];

var renderCards = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = card.avatar;
  cardElement.querySelector('.popup__title').textContent = card.title;
  cardElement.querySelector('.popup__text--address').textContent = card.address;
  cardElement.querySelector('.popup__text--ptice').textContent = card.price;
  cardElement.querySelector('.popup__type').textContent = card.type;
  //  Здесь будут ещё переменные
  return cardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < cards.length; i++) {
  fragment.appendChild(renderCards(cards[i]));
}

mapPinsList.appendChild(fragment);
