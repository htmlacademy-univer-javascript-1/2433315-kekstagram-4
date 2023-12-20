import {getRandomArrayElement, createIdGenerator, getRandomInteger} from './util.js';

const PHOTO_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;

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

const generateCommentId = createIdGenerator();

const createMessege = () => Array.from(
  { length: getRandomInteger(1, 2)},
  ()=> getRandomArrayElement(MESSAGE)
).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessege(),
  name: getRandomArrayElement(NAMES)
});

const createPicture = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(0, COMMENT_COUNT)}, createComment)
});

const getPictures = () => Array.from(
  {length: PHOTO_COUNT},
  (_, pictureIndex) => createPicture(pictureIndex + 1)
);

export {getPictures};
