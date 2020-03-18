'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };

  var RequestMethod = {
    GET: 'GET',
    POST: 'POST',
  };

  var ServerUrl = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking',
  };

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainElement = document.querySelector('main');

  var getAdsData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(RequestMethod.GET, ServerUrl.LOAD);
    xhr.send();
  };

  var uploadAdData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open(RequestMethod.POST, ServerUrl.UPLOAD);
    xhr.send(data);
  };

  var successHandler = function () {
    var successMessage = successMessageTemplate.cloneNode(true);
    mainElement.appendChild(successMessage);
    document.addEventListener('keydown', successMessageKeydownHandler);
    document.addEventListener('click', successMessageClickHandler);
  };

  var errorUploadHandler = function () {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    mainElement.appendChild(errorMessage);
    document.addEventListener('keydown', errorMessageKeydownHandler);
    document.addEventListener('click', errorMessageClickHandler);
    var errorMessageElement = document.querySelector('.error');
    var errorButton = errorMessageElement.querySelector('.error__button');
    errorButton.addEventListener('click', errorButtonClickHandler);
  };

  var errorLoadHandler = function (errorText) {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    var errorMessageText = errorMessage.querySelector('.error__message');
    errorMessageText.textContent = errorText;
    mainElement.appendChild(errorMessage);
    document.addEventListener('click', errorMessageClickHandler);
    document.addEventListener('keydown', errorMessageKeydownHandler);
    var errorMessageElement = document.querySelector('.error');
    var errorButton = errorMessageElement.querySelector('.error__button');
    errorButton.addEventListener('click', errorButtonClickHandler);
    window.filter.switchSelectsToInactiveState();
    window.map.mapPinMainElement.addEventListener('click', window.map.unsuccessLoadHandler);
  };

  var errorMessageKeydownHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      var errorMessageElement = document.querySelector('.error');
      errorMessageElement.remove();
      document.removeEventListener('keydown', errorMessageKeydownHandler);
      document.removeEventListener('click', errorMessageClickHandler);
    }
  };

  var errorMessageClickHandler = function () {
    var errorMessageElement = document.querySelector('.error');
    errorMessageElement.remove();
    document.removeEventListener('click', errorMessageClickHandler);
    document.removeEventListener('keydown', errorMessageKeydownHandler);
  };

  var errorButtonClickHandler = function () {
    var errorMessageElement = document.querySelector('.error');
    errorMessageElement.remove();
    var errorButton = errorMessageElement.querySelector('.error__button');
    errorButton.removeEventListener('click', errorButtonClickHandler);
    document.removeEventListener('click', errorMessageClickHandler);
  };

  var successMessageKeydownHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      var successMessageElement = document.querySelector('.success');
      successMessageElement.remove();
      document.removeEventListener('keydown', successMessageKeydownHandler);
    }
  };

  var successMessageClickHandler = function () {
    var successMessageElement = document.querySelector('.success');
    successMessageElement.remove();
    document.removeEventListener('click', successMessageClickHandler);
    document.removeEventListener('keydown', successMessageKeydownHandler);
  };

  window.load = {
    getAdsData: getAdsData,
    uploadAdData: uploadAdData,
    successHandler: successHandler,
    errorUploadHandler: errorUploadHandler,
    errorLoadHandler: errorLoadHandler,
  };
})();
