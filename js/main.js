import {getPictures} from './data.js';
import {renderGallery} from './gallery.js';
import {initEditPopup} from './form.js';

renderGallery(getPictures());
initEditPopup();
