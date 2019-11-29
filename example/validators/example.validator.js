var validator = require('../libs/validator');

exports.middleware = async (req, res, next) => {
    try {
        const FIELDS = require('../fields/add.fields');
        validator.validate(req, FIELDS);
        next();
    } catch (err) {
        return res.status(422).send({
            message: err.message
        });
    }
}
