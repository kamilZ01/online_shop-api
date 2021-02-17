const { GeneralError } = require('./GeneralError');
const handleErrors = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            status: 'error',
            message: err.message
        });
    }
    if(err.message === 'EmptyResponse') {
        return res.status(404).json({
            status: 'error',
            message: 'Not found'
        })
    }

    return res.status(500).json({
        status: 'error',
        message: err.message
    });
}

module.exports = handleErrors;