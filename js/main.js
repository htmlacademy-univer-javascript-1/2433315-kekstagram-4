import {createDescriptionPhoto} from './data.js';

const PHOTO_COUNT = 25;

const descriptionPhoto = Array.from({length: PHOTO_COUNT}, createDescriptionPhoto);

descriptionPhoto();
