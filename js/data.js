import {getRandomArrayElement, createIdGenerator, getRandomInteger} from './util.js';

const DESCRIPTION = [
  'Прекраный день!',
  'Всем привет из Сочи',
  'Ура! выходные!',
  'Отдых на природе',
  'Прекрасное свидание',
  'На футболе'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Петька',
  'Никита',
  'Мария',
  'Анатолий Петрович',
  'Анна',
  'Наташа',
  'Турал',
  'Яков'
];

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();
const generateUrlId = createIdGenerator();

const createMessege = () => getRandomInteger(0, 1)
  ? getRandomArrayElement(MESSAGE)
  : `${getRandomArrayElement(MESSAGE)} ${getRandomArrayElement(MESSAGE)}`;

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-/${getRandomInteger(1, 6)}.svg`,
  message: createMessege(),
  name: getRandomArrayElement(NAMES)
});

const createDescriptionPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment)
});

export {createDescriptionPhoto};
