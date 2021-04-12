import express, { Router } from 'express'
import { register, login, forgotPassword, resetPassword } from '../controllers/auth.js'

const router = Router ()

router.route ('/register').post (register)
router.route ('/login').post (login)
router.route ('/forgotpassword').post (forgotPassword)
router.route ('/resetpassword/:resetPasswordToken').put (resetPassword)

export default router