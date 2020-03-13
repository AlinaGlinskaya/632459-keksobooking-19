'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 70;
  var IMAGE_HEIGHT = 70;

  var photoPreviewElement = document.querySelector('.ad-form__photo');
  var photoFileChooserElement = document.querySelector('.ad-form__upload input[type=file]');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview');
  var avatarFileChooserElement = document.querySelector('.ad-form-header__upload input[type=file]');

  var uploadImage = function (preview, file, fileName) {
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var image = new Image(IMAGE_WIDTH, IMAGE_HEIGHT);
        image.src = reader.result;
        preview.appendChild(image);
      });

      reader.readAsDataURL(file);
    }
  };

  photoFileChooserElement.addEventListener('change', function () {
    var file = photoFileChooserElement.files[0];
    var fileName = file.name.toLowerCase();
    uploadImage(photoPreviewElement, file, fileName);
  });

  avatarFileChooserElement.addEventListener('change', function () {
    var file = avatarFileChooserElement.files[0];
    var fileName = file.name.toLowerCase();
    avatarPreviewElement.innerHTML = '';
    uploadImage(avatarPreviewElement, file, fileName);
  });

})();
