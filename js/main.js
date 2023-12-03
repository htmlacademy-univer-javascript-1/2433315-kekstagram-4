/*import {createDescriptionPhoto} from './data.js';

const PHOTO_COUNT = 25;

const descriptionPhoto = Array.from({length: PHOTO_COUNT}, createDescriptionPhoto);

descriptionPhoto();

import {createThumbnails} from './thumbnails.js';
createThumbnails(descriptionPhoto());*/

import {descriptionPhotos} from './data.js';
import {renderGallery} from './gallery.js';

renderGallery(descriptionPhotos());
