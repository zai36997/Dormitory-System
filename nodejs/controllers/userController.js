const User = require('../models/login'),
 {validationResult} = require('express-validator'),
jwt = require('jsonwebtoken'),
config = require('../config/index')

const Status = {
    USER : 'user',
    ADMIN : 'admin'
} 

exports.register = async (req,res,next) =>{
try {
    const {firstName,lastName,age,birthday,email,tel,pwdHash,status} = req.body

    //เช็คการกรอกข้อมูลว่าครบมั้ย
    const errorValidation = validationResult(req)
        if (!errorValidation.isEmpty()) {
            const error = new Error('Please input requierd information')
            error.statusCode = 422
            error.validation = errorValidation.array();
            throw error
        }
     //เช็คว่า email ซ้ำมั้ย   
    const exitemail = await User.findOne({email:email})
        if(exitemail){
            const error = new Error('This email is not avaliable.')
            error.statusCode = 403
            throw error
        }

    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.birthday = birthday
    user.age = age
    user.email = email
    user.tel = tel
    user.pwdHash = await user.encryptPassword(pwdHash),
    user.status = Status.USER
    await user.save()
    console.log(req.body)
    res.status(201).json({
        data: user
    })

} catch (error) {
    next(error)
}
}

exports.login = async (req,res,next) =>{
    try {
        const {email,pwdHash} = req.body
        const user = await User.findOne({
            email: email
        })

         //เช็ก user ว่าซ้ำมั้ย
    if (!user) {
        const error = new Error('Email not found')
        error.statusCode = 401
        throw error
    }
    //เช็ก email และ password
    const validPassword = await user.validPassword(pwdHash)
    if(!validPassword){
        const error = new Error('Password or Email incorrect')
            error.statusCode = 401
            throw error
    }

        //  สร้าง token
        const token = jwt.sign({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            status: user.status,  
        },config.JWT_SECRET,{expiresIn : '5 days'})

        const expires_in = jwt.decode(token)
        return res.json({
            access_token: token,
            expires_in: expires_in
        })



    } catch (error) {
        next(error)
    }
}
// function register(firstname,lastname,age,birthday,email,tel,pwdHash){


// }