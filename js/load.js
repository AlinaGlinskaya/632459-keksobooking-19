'use strict';

(function () {

  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };

  var RequestMethod = {
    GET: 'GET',
    POST: 'POST',
  };

  var ServerUrl = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking',
  };

  var createNewRequest = function (method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT_IN_MS;
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
    xhr.open(method, url);
    return xhr;
  };

  var getAdsData = function (onSuccess, onError) {
    createNewRequest(RequestMethod.GET, ServerUrl.LOAD, onSuccess, onError).send();
  };

  var sendAdData = function (onSuccess, onError, data) {
    createNewRequest(RequestMethod.POST, ServerUrl.UPLOAD, onSuccess, onError).send(data);
  };

  window.load = {
    getAdsData: getAdsData,
    sendAdData: sendAdData,
  };
})();
