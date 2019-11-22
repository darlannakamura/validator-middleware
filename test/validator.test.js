'use strict';

const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;
var validator = require('../validator');

describe('_isObject', function(done) {
    it('Test if a null is not an object', function(done) {
        assert.equal(validator._isObj(null), false);
        done();
    });

    it('Test if a undefined is not an object', function(done) {
        assert.equal(validator._isObj(undefined), false);
        done();
    });

    it('Test if a string is not an object', function(done) {
        assert.equal(validator._isObj(''), false);
        done();
    });

    it('Test if a integer is not an object', function(done) {
        assert.equal(validator._isObj(0), false);
        done();
    });

    it('Test if a empty object is an object', function(done) {
        assert.equal(validator._isObj({}), true);
        done();
    });

    it('Test if a filled object is an object', function(done) {
        assert.equal(validator._isObj({key: 'value'}), true);
        done();
    });
});

describe('_isBoolean', function(done) {
    it('Test if return false for string', function(done) {
        chai.assert.equal(validator._isBoolean(''), false);
        done();
    });

    it('Test if return false for number', function(done) {
        chai.assert.equal(validator._isBoolean(0), false);
        chai.assert.equal(validator._isBoolean(-1.2), false);
        done();
    });

    it('Test if return false for object', function(done) {
        chai.assert.equal(validator._isBoolean({}), false);
        done();
    });
    
    it('Test if return false for null', function(done) {
        chai.assert.equal(validator._isBoolean(null), false);
        done();
    });

    it('Test if return false for undefined', function(done) {
        chai.assert.equal(validator._isBoolean(undefined), false);
        done();
    });
});

describe('_isString', function(done) {
    it('Test if return false to a null', function(done) {
        chai.assert.equal(validator._isString(null), false);
        done();
    });

    it('Test if return false to a undefined', function(done) {
        chai.assert.equal(validator._isString(undefined), false);
        done();
    });

    it('Test if return false to a empty object', function(done) {
        chai.assert.equal(validator._isString({}), false);
        done();
    });

    it('Test if return false to a integer', function(done) {
        chai.assert.equal(validator._isString(2), false);
        done();
    });

    it('Test if return false to a float', function(done) {
        chai.assert.equal(validator._isString(2.2), false);
        done();
    });
});

describe('_isArrayOfTwoIntegers', function(done) {
    it('Test if returns false to a null', function(done) {
        chai.assert.equal(validator._isArrayOfTwoIntegers(null), false);
        done();
    });

    it('Test if returns false to a undefined', function(done) {
        chai.assert.equal(validator._isArrayOfTwoIntegers(undefined), false);
        done();
    });

    it('Test if returns false to a empty object', function(done) {
        chai.assert.equal(validator._isArrayOfTwoIntegers({}), false);
        done();
    });

    it('Test if returns false to a empty array', function(done) {
        chai.assert.equal(validator._isArrayOfTwoIntegers([]), false);
        done();
    });

    it('Test if returns false to an array with three elements', function(done) {
        chai.assert.equal(validator._isArrayOfTwoIntegers([0, 1, 2]), false);
        done();
    });

    it('Test if returns false to an array with two string elements', function(done) {
        chai.assert.equal(validator._isArrayOfTwoIntegers(['0', '1']), false);
        done();
    });

    it('Test if returns false to an array with one negative integer elements', function(done) {
        chai.assert.equal(validator._isArrayOfTwoIntegers([-10, 11]), false);
        chai.assert.equal(validator._isArrayOfTwoIntegers([10, -11]), false);
        done();
    });

    it('Test if returns false to an array with two negative integer elements', function(done) {
        chai.assert.equal(validator._isArrayOfTwoIntegers([-10, -11]), false);
        done();
    });

    it('Test if returns true to an array with two integer elements', function(done) {
        chai.assert.equal(validator._isArrayOfTwoIntegers([1, 10]), true);
        done();
    });
});

describe('_isArrayOfString', function(done) {
    it('Test if return false to a null', function(done) {
        chai.assert.equal(validator._isArrayOfString(null), false);
        done();
    });

    it('Test if return false to a undefined', function(done) {
        chai.assert.equal(validator._isArrayOfString(undefined), false);
        done();
    });

    it('Test if return false to a empty object', function(done) {
        chai.assert.equal(validator._isArrayOfString({}), false);
        done();
    });

    it('Test if return false to a string', function(done) {
        chai.assert.equal(validator._isArrayOfString(''), false);
        done();
    });

    it('Test if return false to a integer', function(done) {
        chai.assert.equal(validator._isArrayOfString(0), false);
        done();
    });

    it('Test if return false to a empty array', function(done) {
        chai.assert.equal(validator._isArrayOfString([]), false);
        done();
    });

    it('Test if return false to a array of integers', function(done) {
        chai.assert.equal(validator._isArrayOfString([0, 1]), false);
        done();
    });

    it('Test if return true to a string array', function(done) {
        chai.assert.equal(validator._isArrayOfString(['a', 'b']), true);
        done();
    });
});


describe('checkInputTypes', function(done) {
    it('Teste parâmetro req sendo nulo', function(done) {
        chai.assert.throws(() => { validator.checkInputTypes(null, null) }, TypeError);
        done();
    });

    it('Teste parâmetro fields sendo nulo', function(done) {
        chai.assert.throws(() => { validator.checkInputTypes({}, null) }, TypeError);
        done();
    });
});


describe('getRequiredFields', function(done) {
    it('Test fields parameter being null', function(done) {
        chai.assert.throws( () => { validator.getRequiredFields(null) }, TypeError);
        done();
    });

    it('Test fields parameter being string', function(done) {
        chai.assert.throws( () => { validator.getRequiredFields('') }, TypeError);
        done();
    });

    it('Test fields parameter being an empty object', function(done) {
        chai.assert.throws( () => { validator.getRequiredFields({}) }, TypeError);
        done();
    });

    it('Test fields parameter being a filled object', function(done) {
        chai.assert.isArray(validator.getRequiredFields( {key: {required:true} } ));
        chai.assert.equal(validator.getRequiredFields( {key: {required:true} } ).length, 1);
        done();
    });
});


describe('Validate Type Properties - "required" property', function(done) {
    it('Test if the "required" property accepts a null', function(done) {
        chai.assert.throws(() => { return validator.validatePropertyType({key: {required: null}}) }, TypeError);
        done();
    });

    it('Test if the "required" property accepts a number', function(done) {
        chai.assert.throws(() => { return validator.validatePropertyType({key: {required: 0}}) }, TypeError);
        done();
    });

    it('Test if the "required" property accepts a string', function(done) {
        chai.assert.throws(() => { return validator.validatePropertyType({key: {required: ''}}) }, TypeError);
        done();
    });

    it('Test if the "required" property accepts a boolean', function(done) {
        chai.assert.doesNotThrow(() => { return validator.validatePropertyType({key: {required: false}}) }, TypeError);
        done();
    });
});

describe('Validate Type Properties - "length" property', function(done) {
    it('Test if the "length" property accepts a null', function(done) {
        chai.assert.throw( () => { return validator.validatePropertyType({key: {length: null}})}, TypeError);
        done();
    });

    it('Test if the "length" property accepts a undefined', function(done) {
        chai.assert.throw( () => { return validator.validatePropertyType({key: {length: undefined}})}, TypeError);
        done();
    });

    it('Test if the "length" property accepts a empty object', function(done) {
        chai.assert.throw( () => { return validator.validatePropertyType({key: {length: {}}})}, TypeError);
        done();
    });

    it('Test if the "length" property accepts a empty array', function(done) {
        chai.assert.throw( () => { return validator.validatePropertyType({key: {length: [] }}) }, TypeError);
        done();
    });


    it('Test if the "length" property accepts a min value major than max value', function(done) {
        chai.assert.throw( () => { return validator.validatePropertyType({key: {length: [5,1] }}) }, validator.MinLengthError);
        done();
    });


    it('Test if the "length" property accepts a two integers array', function(done) {
        chai.assert.doesNotThrow( () => { return validator.validatePropertyType({key: {length: [1,10] }}) }, TypeError);
        done();
    });
});

describe('Validate Type Properties - "message" property', function(done) {
    it('Test if "message" property accepts a null', function(done) {
        chai.assert.throw(() => { return validator.validatePropertyType({key: {message: null}}) }, TypeError);
        done();
    });

    it('Test if "message" property accepts an undefined', function(done) {
        chai.assert.throw(() => { return validator.validatePropertyType({key: {message: undefined}}) }, TypeError);
        done();
    });

    it('Test if "message" property accepts a empty object', function(done) {
        chai.assert.throw(() => { return validator.validatePropertyType({key: {message: {} }}) }, TypeError);
        done();
    });

    it('Test if "message" property accepts a integer', function(done) {
        chai.assert.throw(() => { return validator.validatePropertyType({key: {message: 0 }}) }, TypeError);
        done();
    });

    it('Test if "message" property accepts a float', function(done) {
        chai.assert.throw(() => { return validator.validatePropertyType({key: {message: 1.2 }}) }, TypeError);
        done();
    });
});

describe('Validate Type Properties - "verbose" property', function(done) {
    it('Test if "verbose" property accepts a null', function(done) {
        chai.assert.throw(() => { return validator.validatePropertyType({key: {verbose: null}}) }, TypeError);
        done();
    });

    it('Test if "verbose" property accepts an undefined', function(done) {
        chai.assert.throw(() => { return validator.validatePropertyType({key: {verbose: undefined}}) }, TypeError);
        done();
    });

    it('Test if "verbose" property accepts a empty object', function(done) {
        chai.assert.throw(() => { return validator.validatePropertyType({key: {verbose: {} }}) }, TypeError);
        done();
    });

    it('Test if "verbose" property accepts a integer', function(done) {
        chai.assert.throw(() => { return validator.validatePropertyType({key: {verbose: 0 }}) }, TypeError);
        done();
    });

    it('Test if "verbose" property accepts a float', function(done) {
        chai.assert.throw(() => { return validator.validatePropertyType({key: {verbose: 1.2 }}) }, TypeError);
        done();
    });
});

describe('Validate Type Properties - "validation" property', function(done) {
    it('Test if "validation" property accepts a null', function(done) {
        chai.assert.throw( () => { return validator.validatePropertyType({key: {validation: null}}) }, TypeError);
        done();
    });

    it('Test if "validation" property accepts a undefined', function(done) {
        chai.assert.throw( () => { return validator.validatePropertyType({key: {validation: undefined}})}, TypeError);
        done();
    });

    it('Test if "validation" property accepts an empty object', function(done) {
        chai.assert.throw( () => { return validator.validatePropertyType({key: {validation: {}}})}, TypeError);
        done();
    });

    it('Test if "validation" property accepts an empty array', function(done) {
        chai.assert.throw( () => { return validator.validatePropertyType({key: {validation: []}})}, TypeError);
        done();
    });

    it('Test if "validation" property accepts an string array', function(done) {
        chai.assert.doesNotThrow( () => { return validator.validatePropertyType({key: {validation: ['string']}})}, TypeError);
        done();
    });
});

//TODO
//Validar as propriedades
//validar a propriedade "type" com todas as suas variações.

describe('Properties - "required" property', function(done) {
    it(`Test when doesn't exists a required field on body`, function(done) {
        chai.assert.throw( () => { return validator.validateProperties.required({}, 'key', true)}, validator.NotFoundError);
        done();
    });

    it(`Test when exists a required field on body`, function(done) {
        chai.assert.doesNotThrow(() => { return validator.validateProperty.required({key: 'value'}, 'key', true ) }, validator.NotFoundError);
        done();
    });
});


describe('Properties - "length" property', function(done) {
    it(`Test when the field is lower`, function(done) {
        chai.assert.throw( () => { return validator.validateProperty.length({key: 'v'}, 'key', [2,10]) }, validator.MinLengthError);
        done();
    });

    it(`Test when the field is higher`, function(done) {
        chai.assert.throw( () => { return validator.validateProperty.length({key: 'abcde'}, 'key', [2,3] ) }, validator.MaxLengthError)
        done();
    });

    it(`Test when the field is between min and max lenth`, function(done) {
        chai.assert.doesNotThrow( () => { return validator.validateProperty.length({key: 'abcde'},'key', [2,10] ) }, validator.MaxLengthError)
        done();
    });
});


describe('"type" property - alpha', function(done) {
    it('Test when receive a special char', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.alpha('$')}, validator.ValidationError);
        done();
    });

    it('Test when receive a SQL INJECTION', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.alpha("' AND 1=1;")}, validator.ValidationError);
        done();
    });

    it('Test when receive a alphanumeric', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.alpha("abc123")}, validator.ValidationError);
        done();
    });

    it('Test when receive a alpha', function(done) {
        chai.assert.doesNotThrow( () => { return validator.validateStringType.alpha("abc")}, validator.ValidationError);
        done();
    });
});

describe('"type" property - alphanumeric', function(done) {
    it('Test when receive a special char', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.alphanumeric('$')}, validator.ValidationError);
        done();
    });

    it('Test when receive a HTML element', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.alphanumeric('<input name="test"></input>')}, validator.ValidationError);
        done();
    });

    it('Test when receive a SQL INJECTION', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.alphanumeric("' AND 1=1;")}, validator.ValidationError);
        done();
    });

    it('Test when receive a alphanumeric', function(done) {
        chai.assert.doesNotThrow( () => { return validator.validateStringType.alphanumeric("abc123")}, validator.ValidationError);
        done();
    });

    it('Test when receive a alpha', function(done) {
        chai.assert.doesNotThrow( () => { return validator.validateStringType.alphanumeric("abc")}, validator.ValidationError);
        done();
    });
});

describe('"type" property - boolean', function(done) {
    it('Test when receives a alphanumeric', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.boolean('alphanumeric123') }, validator.ValidationError);
        done();
    });

    it('Test when receives a empty string', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.boolean('') }, validator.ValidationError);
        done();
    });

    it('Test when receives a special char', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.boolean('$$') }, validator.ValidationError);
        done();
    });

    it('Test when receives a boolean in upper case', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.boolean('TRUE') }, validator.ValidationError);
        done();
    });

    it('Test when receives a boolean in camel case', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.boolean('False') }, validator.ValidationError);
        done();
    });

    it('Test when receives a boolean', function(done) {
        chai.assert.doesNotThrow( () => { return validator.validateStringType.boolean('false') }, validator.ValidationError);
        done();
    });
});

describe('"type" property - email', function(done) {
    it('Test when receives a boolean', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.email('true')}, validator.ValidationError);
        done();
    });

    it('Test when receives an empty string', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.email('')}, validator.ValidationError);
        done();
    });

    it('Test when receives a special chars', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.email('#$!##@')}, validator.ValidationError);
        done();
    });

    it('Test when receives an email with two @', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.email('email@@domain.co')}, validator.ValidationError);
        done();
    });

    it('Test when receives just the emaiml address', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.email('email@.com')}, validator.ValidationError);
        done();
    });

    it('Test when receives a email address without the domain', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.email('email@')}, validator.ValidationError);
        done();
    });

    it('Test when receives a valid email withou the @', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.email('emaildomain.com')}, validator.ValidationError);
        done();
    });

    it('Test when receives a email without the dot', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.email('email@domaincom')}, validator.ValidationError);
        done();
    });

    it('Test when receives one character after "."', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.email('email@domain.c')}, validator.ValidationError);
        done();
    });

    it('Test when receives a bol email', function(done) {
        chai.assert.doesNotThrow( () => { return validator.validateStringType.email('email_93@bol.com.br')}, validator.ValidationError);
        done();
    });


    it('Test when receives a strange but valid email', function(done) {
        chai.assert.doesNotThrow( () => { return validator.validateStringType.email('93_xa_basz@baz.sc.wr')}, validator.ValidationError);
        done();
    });

    it('Test when receives a valid email', function(done) {
        chai.assert.doesNotThrow( () => { return validator.validateStringType.email('email@google.com')}, validator.ValidationError);
        done();
    });
});

describe('"type" property - id', function(done) {
    it('Test when receives a underline', function(done) {
        chai.assert.throw ( () => { return validator.validateStringType.id('_')}, validator.ValidationError);
        done();
    });

    it('Test when receives an alphanumeric', function(done) {
        chai.assert.throw ( () => { return validator.validateStringType.id('alpha123')}, validator.ValidationError);
        done();
    });

    it('Test when receives a negative integer', function(done) {
        chai.assert.throw ( () => { return validator.validateStringType.id('-20')}, validator.ValidationError);
        done();
    });

    it('Test when receives a positive float', function(done) {
        chai.assert.throw ( () => { return validator.validateStringType.id('12.2')}, validator.ValidationError);
        done();
    });

    it('Test when receives a negative float', function(done) {
        chai.assert.throw ( () => { return validator.validateStringType.id('-12.2')}, validator.ValidationError);
        done();
    });

    it('Test when receives zero', function(done) {
        chai.assert.throw ( () => { return validator.validateStringType.id('0')}, validator.ValidationError);
        done();
    });

    it('Test when receives a positive integer', function(done) {
        chai.assert.doesNotThrow ( () => { return validator.validateStringType.id('12')}, validator.ValidationError);
        done();
    });
});

describe('"type" property - cpf', function(done) {
    it('Test when receive special chars', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.cpf('2#!@#@')}, validator.ValidationError);
        done();
    });

    it('Test when receive 3 integers', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.cpf('123')}, validator.ValidationError);
        done();
    });

    it('Test when receives an empty string', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.cpf('')}, validator.ValidationError);
        done();
    });

    it('Test when receives null', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.cpf(null)}, validator.ValidationError);
        done();
    });

    it('Test when receive 3 integers', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.cpf('123')}, validator.ValidationError);
        done();
    });

    it('Test when receive 10 integers', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.cpf('1234567890')}, validator.ValidationError);
        done();
    });

    it('Test when receive a valid cpf without punctuation', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.cpf('63917776081')}, validator.ValidationError);
        done();
    });

    it('Test when receive a invalid cpf with punctuation', function(done) {
        chai.assert.throw( () => { return validator.validateStringType.cpf('123.456.789-10')}, validator.ValidationError);
        done();
    });

    it('Test when receive a valid cpf with punctuation', function(done) {
        chai.assert.doesNotThrow( () => { return validator.validateStringType.cpf('894.986.010-46')}, validator.ValidationError);
        done();
    });
});


describe('validate', function(done) {
    it('Test when receive a required field is not found in body ', function(done) {
        chai.assert.throw( () => {
            return validator.validate(
                {
                    body: { test: 'value' }
                }, 
                {
                    key: {
                        required: true,
                        type: 'alpha',
                        length: [2,10]
                    }
                }, validator.ValidationError)
        });
        done();
    });

    it('Test when receive a lower value than the min required ', function(done) {
        chai.assert.throw( () => {
            return validator.validate(
                {
                    body: { key: 'value' }
                }, 
                {
                    key: {
                        required: true,
                        type: 'alpha',
                        length: [6,10]
                    }
                })
        });
        done();
    });

    it('Test when receive a special chars but must be alpha ', function(done) {
        chai.assert.throw( () => {
            return validator.validate(
                {
                    body: { key: '$$$' }
                }, 
                {
                    key: {
                        required: true,
                        type: 'alpha',
                        length: [2,10]
                    }
                })
        });
        done();
    });

    it('Test when receive a invalid email ', function(done) {
        chai.assert.throw( () => {
            return validator.validate(
                {
                    body: { key: 'email@ddd' }
                }, 
                {
                    key: {
                        required: true,
                        type: 'email',
                        length: [2,10]
                    }
                })
        });
        done();
    });

    it('Test when receive a valid combination', function(done) {
        chai.assert.doesNotThrow( () => {
            return validator.validate(
                {
                    body: { key: 'email@domain.com' }
                }, 
                {
                    key: {
                        required: true,
                        type: 'email',
                        length: [2,100]
                    }
                })
        });
        done();
    });

    it('Test if return true when receives a valid combination', function(done) {
        chai.assert.equal(validator.validate(
                {
                    body: { key: 'email@domain.com' }
                }, 
                {
                    key: {
                        required: true,
                        type: 'email',
                        length: [2,100]
                    }
                })
        , true);
        done();
    });

    
    it('Test when receive a valid combination', function(done) {
        chai.assert.doesNotThrow( () => {
            return validator.validate(
                {
                    body: { key: 'value' }
                }, 
                {
                    key: {
                        required: true,
                        type: 'alpha',
                        length: [2,10]
                    }
                })
        });
        done();
    });
});
