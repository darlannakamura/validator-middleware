var validator = require('validator');
/**
 * TODO
 * 0 - Criar o módulo de mensagens -> hoje as mensagens são retornadas em pt-br
 * 1 - break "_isObj", "_isBoolean", etc in another module named "validator.type.js"
 * 2 - jogar os erros para outro módulo também
 * 
 */

class NotFoundError extends Error {}

class MinLengthError extends Error {}

class ValidationError extends Error {}

exports.ValidationError;
exports.NotFoundError;
exports.MinLengthError;

exports._isObj = (obj) => {
    return (typeof obj === 'object' && obj !== null);
}

exports._isBoolean = (input) => {
    return (input === false || input === true);
}

exports._isString = (input) => {
    return (typeof input === 'string');
}

exports._isArrayOfTwoIntegers = (input) => {
    const isArray = (Array.isArray(input));
    let lengthIsEqualTwo = false;
    let areIntegers = true;

    if(isArray) {
        lengthIsEqualTwo = (input.length == 2);
        input.forEach( i => {
            if (!Number.isInteger(i) || i < 0) {
                areIntegers = false;
                return;
            }
        });
    }

    return isArray && lengthIsEqualTwo && areIntegers;
}

exports._isArrayOfString = (input) => {
    const isArray = (Array.isArray(input));
    let areStrings = true;

    if(isArray) {
        input.forEach( i => {
            if (!exports._isString(i)) areStrings = false;
        });
    }

    return isArray && input.length >= 1 && areStrings;
}

// -----------------------------------------------------

exports.checkInputTypes = (req, fields) => {
    let _isObj = exports._isObj;
    if(req == null || !_isObj(req)) {
        throw new TypeError('"req" needs to be an object, in validate(req, fields).');
    }

    if(fields == null || !_isObj(fields)) {
        throw new TypeError('"fields" needs to be an object, in validate(req, fields).');
    }
}

exports.getRequiredFields = (fields) => {
    if(exports._isObj(fields) && Object.keys(fields).length > 0){
        const keys = Object.keys(fields);
        let requiredFields = [];
    
        keys.map( key => {
            if ('required' in fields[key] && fields[key].required){
                requiredFields.push(key);
            }
        });
        return requiredFields;
    } else {
        throw TypeError('Parameter "fields in getRequiredFields needs to be an object.');
    }
}

validationType = {
    required: (required) => {
        if(!exports._isBoolean(required)){
            throw TypeError('"required" property needs to be a boolean.');
        }
    },
    
    length: (length) => {
        if(exports._isArrayOfTwoIntegers(length)){
            if(length[0] > length[1]) { //if min > max
                throw TypeError('"length" property needs a [min, max] value, and min needs to be <= to max value.');
            }
        } else {
            throw TypeError('"length" property needs to be an array of two integers.');
        }
    },
    
    message: (message) => {
        if(!exports._isString(message)) {
            throw TypeError('"message" property needs to be a string.');
        }
    },
    
    verbose: (verbose) => {
        if(!exports._isString(verbose)) {
            throw TypeError('"verbose" property needs to be a string.');
        }
    },
    
    validation: (validation) => {
        if(!exports._isArrayOfString(validation)) {
            throw TypeError('"validation" property needs to be an array of string.');
        } 
    }    
}



/**
 * This method will try to check if all the properties in the fields are filled correctly, 
 * in relation to the type received in each property and with the values.
 * For example, the "required" property, needs to receive a boolean - it needs to throws an error if receives anything else.
 */
exports.validatePropertyType = (obj) => {
    if(!exports._isObj(obj)){
        throw TypeError('"obj" needs to be an object.');
    }

    const fields = Object.keys(obj); //get the fields
    const properties = ['required', 'length', 'message', 'verbose', 'validation'];
    
    fields.map( f => {
        let ob = obj[f];

        properties.map( prop => {
            if(prop in ob) {
                validationType[prop](ob[prop]);
            }
        });
    });

}

isCpf = (value) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    const matchRegex = regex.test(value);

    let cpf = value.replace(/[^\d]+/g, "");

    if (cpf === null         ||
        matchRegex === false ||
        cpf.length != 11     ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    )
        return false;

    // Validate 1st digit
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;

    // Validate 2nd digit
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;

    return true;
}

var validateStringType = {
    alpha: (value) => {
        if(!validator.isAlpha(value, 'pt-BR')) {
            throw new ValidationError('O campo precisa conter apenas letras.');
        }
    },
    alphanumeric: (value) => {
        if(!validator.isAlphanumeric(value, 'pt-BR')) {
            throw new ValidationError('O campo precisa conter apenas letras ou números');
        }
    },
    boolean: (value) => {
        if(!validator.isBoolean(value)) {
            throw new ValidationError('O campo precisa ser verdadeiro ou falso.');
        }
    },
    email: (value) => {
        if(!validator.isEmail(value)){
            throw new ValidationError('O campo precisa ser e-mail.');
        }
    },
    id: (value) => {
        if(!validator.isInt(value, {gt:0})) {
            throw new ValidationError('O campo precisa ser um valor inteiro positivo (> 1).');
        }
    },
    cpf: (value) => {
        if(!isCpf(value)) {
            throw new ValidationError('O campo precisa ser CPF.');
        }
    }
}

exports.validateStringType = validateStringType;

var validateProperty = {
    required: (body, field, required) => {
        if(required) {
            if(!(field in body)) throw new NotFoundError(`"${field}" É obrigatório.`);
        }
    },
    length: (body, field, length) => {
        let val = body[field];
        if(val.length < length[0]) {
            throw new MinLengthError(`"${field}" deve ter no mínimo ${length[0]} caracteres.`);
        } else if(val.length > length[1]){
            throw new MaxLengthError(`"${field}" deve ter no máximo ${length[1]} caracteres`);
        }
    },
    validation: (body, field, validations) => {
        let value = body[field];
        validations.map( validation => {
            validator[validation](value);
        });
    },
    type: (body, field, type) => {
        let value = body[field];
        if (validateStringType[type]) {
            validateStringType[type](value);
        } 
    }
};

exports.validateProperty = validateProperty;

/**
 * This method will validate if the body object of the request is
 * in agreement with the requirements filled on *.fields.json.
 * For example, if the user was specified that "name" field is required, 
 * this method will check if exists a name in body and if doesn't exists,
 * it will thrown an NotFoundError.
 */
exports.validateProperties = (body, obj) => {
    const fields = Object.keys(obj);

    fields.map( field => {
        const properties = Object.keys(obj[field]);
        properties.map ( prop => {
            validateProperty[prop](body, field, obj[field][prop]);
        });
    });
}

exports.validate = (req, fields) => {
    exports.checkInputTypes(req, fields); // return a Error if error.
    
    const body = req.body || {};

    exports.validatePropertyType(fields);

    exports.validateProperties(body, fields);

    return true;
}

