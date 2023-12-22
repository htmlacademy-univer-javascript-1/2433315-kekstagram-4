const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');

const createThumbnail = ({comments, description, likes, url, id}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;
  return thumbnail;
};

const renderThumbnails = (pictures) => {
  pictureContainer.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });
  pictureContainer.append(fragment);
};

export {renderThumbnails};

/*const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();
const pictureContainerElement = document.querySelector('.pictures');

const createThumbnails = (descriptionPhotos) => {
  pictureContainerElement.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());
  descriptionPhotos.forEach(({url, description, likes, comments, id}) => {
    const thumbnail = pictureTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnail.dataset.thumbnailId = id;
    pictureFragment.appendChild(thumbnail);
  });
  pictureContainerElement.appendChild(pictureFragment);
};

export {createThumbnails};
*/
