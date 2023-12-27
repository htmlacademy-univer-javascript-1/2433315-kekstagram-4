import { pristine } from './validation.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './sending-message.js';
import {isEscapeKey} from './util.js';
import { removeScale, initScale } from './scale.js';
import { removeEffect, initEffect } from './photo-effects.js';

const bodyElement = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const filefield = document.querySelector('.img-upload__input');
const overlayElement = document.querySelector('.img-upload__overlay');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

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

function onOpenEditPopup () {
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
  filefield.addEventListener('change', onOpenEditPopup);
};

export {initEditPopup};
