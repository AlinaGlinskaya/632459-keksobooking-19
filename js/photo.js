'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 70;
  var IMAGE_HEIGHT = 70;

  var photoPreview = document.querySelector('.ad-form__photo');
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var avatarFileChooser = document.querySelector('.ad-form-header__upload input[type=file]');

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

  photoFileChooser.addEventListener('change', function () {
    var file = photoFileChooser.files[0];
    var fileName = file.name.toLowerCase();
    uploadImage(photoPreview, file, fileName);
  });

  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];
    var fileName = file.name.toLowerCase();
    avatarPreview.innerHTML = '';
    uploadImage(avatarPreview, file, fileName);
  });

})();
