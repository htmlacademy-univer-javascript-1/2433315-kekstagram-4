import { pristine } from './validation.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './sending_message.js';
import {isEscapeKey} from './util.js';
import { removeScale, initScale } from './scale.js';
import { removeEffect, initEffect } from './photo_effects.js';

const CORRECT_FILE_TYPES =['png', 'jpg', 'jpeg'];

const bodyElement = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const filefield = document.querySelector('.img-upload__input');
const overlayElement = document.querySelector('.img-upload__overlay');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const fileChooserElement = document.querySelector('.img-upload__start input[type=file]');
const previewElement = document.querySelector('.img-upload__preview img');
const effectPreviewsElement = document.querySelectorAll('.effects__preview');

const onFileChooserChanged = () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const isMatch = CORRECT_FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isMatch) {
    const newPictureUrl = URL.createObjectURL(file);
    previewElement.src = newPictureUrl;

    effectPreviewsElement.forEach((effect) => {
      effect.style.backgroundImage = `url(${newPictureUrl})`;
    });
  }
};

fileChooserElement.addEventListener('change', onFileChooserChanged);

const isFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused() && !errorMessage.classList.contains('open-error')) {
    evt.preventDefault();
    closeEditPopup();
  }
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onFormInput = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closeEditPopup();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(unblockSubmitButton);
  }
};

function openEditPopup () {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  form.addEventListener('submit', onFormInput);
  initScale();
}

function closeEditPopup () {
  form.reset();
  pristine.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  form.removeEventListener('submit', onFormInput);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  removeScale();
  removeEffect();
}

function onCancelButtonClick () {
  closeEditPopup();
}

const initEditPopup = () => {
  initEffect();
  filefield.addEventListener('change', openEditPopup);
};

export {initEditPopup};
