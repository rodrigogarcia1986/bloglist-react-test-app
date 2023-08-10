const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

const tokenExtractor = async (req, res, next) => {

    const authorization = req.get('Authorization')

    console.log("req authorization:", authorization)
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    } else {
        req.token = null
    }
    try {
        const decodedToken = await jwt.verify(req.token, process.env.SECRET)
        req.decodedToken = decodedToken
    } catch (error) {
        req.decodedToken = null
    }
    next()
}



module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}