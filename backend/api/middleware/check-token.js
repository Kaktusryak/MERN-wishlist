const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log('check')
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded;
        return res.status(200).json({
            message:'token verified'
        })
    } catch {
        return res.status(401).json({ message: 'auth failed' })
    }


}