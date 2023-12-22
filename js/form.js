import {onFormInput, refreshPrinstine} from './validation.js';
import {isEscapeKey} from './util.js';
import { removeScale, initScale } from './scale.js';
import { removeEffect, initEffect } from './photo_effects.js';

const bodyElement = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const filefield = document.querySelector('.img-upload__input');
const overlayElement = document.querySelector('.img-upload__overlay');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const isFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closeEditPopup();
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
  refreshPrinstine();
  overlayElement.classList.add('hidden');
  bodyElement.classList.add('modal-open');
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