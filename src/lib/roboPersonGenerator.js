/**
 * Person Generator.
 * Version: 1.0.1
 */

const { WORDS_COLLECTION } = require('../config/words.js');

(function () {

  const PG = {};
  const GLOBAL_SCOPE = typeof window === 'object' ? window : global;
  const WORDS = {
    commonCollection: WORDS_COLLECTION.common,
    additionalCollection: WORDS_COLLECTION.additional,
    getRandomCommon: function () {
      return this.commonCollection[Math.floor(Math.random() * this.commonCollection.length)]
    },
    getRandomAdditional: function () {
      return this.additionalCollection[Math.floor(Math.random() * this.additionalCollection.length)]
    }
  };

  function init() {

    function generateName() {

      const { commonCollection, additionalCollection } = WORDS;

      const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

      const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

      const firstPart = commonCollection[getRandomInt(0, commonCollection.length + 1)];
      const secondPart = additionalCollection[getRandomInt(0, additionalCollection.length + 1)];

      if (!firstPart || !secondPart) {
        return 'Mister Robot';
      }

      const randomName = `${capitalize(firstPart)} ${capitalize(secondPart)}`;

      return randomName;

    }

    function generatePerson(id) {

      const ROBOT_HASH_IMAGE_URL = 'https://robohash.org';
      const personName = generateName();
      const PERSON_MIN_AGE = 10;
      const PERSON_MAX_AGE = 90;

      return {
        id: id,
        name: personName,
        age: Math.floor(Math.random() * (1 + PERSON_MAX_AGE - PERSON_MIN_AGE)) + PERSON_MIN_AGE,
        secretWord: WORDS.getRandomCommon(),
        imageUrl: `${ROBOT_HASH_IMAGE_URL}/id/${personName.split(' ').join('')}?size=200x200`
      }

    }

    function generatePersons(size) {
      const result = [];
      for (let i = 0; i < size; i++) {
        result.push(generatePerson(i));
      }
      return result;
    }

    PG.generate = generatePersons;

  }

  if (GLOBAL_SCOPE.PG) {
    return;
  }

  init();

  GLOBAL_SCOPE.PG = PG;

})();

module.exports.PG = PG;
