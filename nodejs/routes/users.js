var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const {body} = require('express-validator')

// const passportJWT = require('../middlewares/passoprtJWT')
/* GET users listing. */
//const {firstName,lastName,age,birthday,email,tel,pwdHash} = req.body
router.post('/register',
body('firstName').not().isEmpty().withMessage('Please input firstname'),
body('lastName').not().isEmpty().withMessage('Please input lastname'),
body('age').not().isEmpty().withMessage('Please input age'),
body('birthday').not().isEmpty().withMessage('Please input birthday'),
body('tel').not().isEmpty().withMessage('Please input tel'),
body('email').not().isEmpty().withMessage('Please input email').isEmail().withMessage('Wrong format Email'),
body('pwdHash').not().isEmpty().withMessage('Please input password').isLength({min: 3}).withMessage('Password is more then 6 charecter'),

 userController.register)

 router.post('/login',userController.login)
 
//  router.post('/login',userController.login)
//  router.get('/me',passportJWT.isLogin,userController.me)
module.exports = router;
