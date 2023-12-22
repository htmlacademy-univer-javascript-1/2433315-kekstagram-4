import { EFFECTS_INFORMATION } from './effects_data.js';

const EFFECT_DEFAUL = EFFECTS_INFORMATION[0];
let currentEffect = EFFECT_DEFAUL;

const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');
const imgElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');

const isDefault = () =>
  currentEffect === EFFECT_DEFAUL;

const showSlider = () =>
  sliderContainerElement.classList.remove('hidden');

const hideSlider = () =>
  sliderContainerElement.classList.add('hidden');

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
  });

  if (isDefault()){
    hideSlider();
  } else {
    showSlider();
  }
};

const initSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: EFFECT_DEFAUL.min,
      max: EFFECT_DEFAUL.max,
    },
    start: EFFECT_DEFAUL.max,
    step: EFFECT_DEFAUL.step,
    connect: 'lower',
  });
};

const onEffectsChange = (evt) => {
  currentEffect = EFFECTS_INFORMATION.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imgElement.style.filter = isDefault()
    ? EFFECT_DEFAUL.style
    : `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

const removeEffect  = () => {
  currentEffect = EFFECT_DEFAUL;
  updateSlider();
};

const initEffect = () => {
  initSlider();
  hideSlider();
  effectsElement.addEventListener('change', onEffectsChange);
  sliderElement.noUiSlider.on('update', onSliderUpdate);

};

export {removeEffect, initEffect};
