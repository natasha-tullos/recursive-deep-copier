// Recursive function that checks for type of arg,
// then creates a new copy of the given argument.
function deepCopy(value) {
  if (typeof value !== 'object' || value === null || value === undefined) 
    return value;

  if (Array.isArray(value)) {
    return value.map((arrayValue) => {
      return deepCopy(arrayValue);
    });
  }

  if (typeof value === 'object') {
    const result = {};

    Object.keys(value).forEach((key) => {
      const newValue = value[key];

      result[key] = deepCopy(newValue);
    }, {});

    return result;
  }
}

// Value is of type string, int, or object - plain object/instance of array
function Copier(value = undefined) {  
  // This is the copy method for copier that uses deep copy
  this.copy =  function() {
    return deepCopy(value);
  }
  
  // Returns a given value after 1 second in promise
  this.get = function() {
    return new Promise((resolve) => {
      // returns the original object after 1 second.
      setTimeout(() => {
        resolve(value);
      }, 1000)
    });
  }

  // returns a promise that returns an error after 2 seconds
  this.delete = function() {
    // throw error after 2 seconds, returns promise
    return new Promise(() => {
      setTimeout(() => {
        throw new Error('Cannot delete!');
      }, 2000);
    });
  }

}

// the below console logs were used to manually test
// each case of the copier function

const copyItem = new Copier({
  id: 'testId',
  firstName: 'Nat',
  lastName: 'Tullos'
});

// console.log('COPY METHOD');
// console.log(copyItem.copy().then(result => console.log(result, ' resulting copy')));

// console.log('GET METHOD');
// console.log(copyItem.get().then(val => console.log(val, 'resolved GET value')), ' GET Request');

// console.log('DELETE METHOD');
// console.log(copyItem.delete(), ' DELETE Request')

module.exports = {
  Copier
};