const assert = require('assert');
const { Copier } = require('../copy');

describe('Test copier functionality', function () {
  it('should return value without deep copy if not an object or array', async function () {
    const copyItemOne = new Copier().copy();
    const copyItemTwo = new Copier('Test String');

    await assert.strictEqual(copyItemOne, undefined);
    await assert.strictEqual(copyItemTwo.copy(), 'Test String');
  });

  it('should copy objects', function () {
    const copyItem = new Copier({
      id: 'testId',
      firstName: 'Nat',
      lastName: 'Tullos'
    }).copy();
    
    assert.deepStrictEqual(copyItem, 
      {
        id: 'testId',
        firstName: 'Nat',
        lastName: 'Tullos'
      }
    );
  });

  it('should copy array of objecs', function () {
    const copyItem = new Copier([{
      id: 'testId',
      firstName: 'Nat',
      lastName: 'Tullos'
    }]).copy();
    
    assert.deepStrictEqual(copyItem, 
      [{
        id: 'testId',
        firstName: 'Nat',
        lastName: 'Tullos'
      }]
    );
  });

  it('should return a promise value for get request', async () => {
    const copyItem = await new Copier('Hello world').get().then(result => result);

    await assert.deepStrictEqual(copyItem, 'Hello world'); 
  });

  // would have written a test for the delete method if I had more time
});