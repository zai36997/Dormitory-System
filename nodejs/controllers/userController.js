const User = require('../models/login'),
 {validationResult} = require('express-validator')
// jwt = require('jsonwebtoken'),
// config = require('../config/index')

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

// function register(firstname,lastname,age,birthday,email,tel,pwdHash){


// }