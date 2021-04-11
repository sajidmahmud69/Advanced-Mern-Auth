// Set up private routes which needs token to enter 

import express, { Router } from 'express'
import { getPrivateData } from '../controllers/private.js'
import  protect from '../middleware/auth.js'

const router = Router ()

router.route ('/').get (protect, getPrivateData)

export default router
