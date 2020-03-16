'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 70;
  var IMAGE_HEIGHT = 70;
  var AVATAR_WIDTH = 40;
  var AVATAR_HEIGHT = 44;

  var photoPreviewElement = document.querySelector('.ad-form__photo');
  var photoFileChooserElement = document.querySelector('.ad-form__upload input[type=file]');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview');
  var avatarFileChooserElement = document.querySelector('.ad-form-header__upload input[type=file]');

  photoFileChooserElement.addEventListener('change', function () {
    var file = photoFileChooserElement.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var image = new Image(IMAGE_WIDTH, IMAGE_HEIGHT);
        image.src = reader.result;
        photoPreviewElement.appendChild(image);
      });

      reader.readAsDataURL(file);
    }
  });

  avatarFileChooserElement.addEventListener('change', function () {
    var file = avatarFileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var image = new Image(AVATAR_WIDTH, AVATAR_HEIGHT);
        avatarPreviewElement.innerHTML = '';
        image.src = reader.result;
        avatarPreviewElement.appendChild(image);
      });

      reader.readAsDataURL(file);
    }

  });

})();
