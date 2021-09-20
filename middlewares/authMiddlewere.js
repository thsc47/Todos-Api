const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const header = req.get('Authorization');
    console.log(header)
    if(header){
        const token = header.split(' ')[1]
        try {
            const validToken = jwt.verify(token, process.env.JWT_SIGN)
            req.user = {...validToken}
            next();
        } catch (error) {
            res.status(401).json({msg:"Unauthozathed acess"})
        }
    }else{
        res.status(401).json({msg:"Need a token"})
    }
};

module.exports = auth;