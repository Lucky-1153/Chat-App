import express, { Router } from 'express'
import { auth, adminOnly } from '../middlewares/Auth.middleware.js'
import { adminLogin, allChats, allMessages, allUsers, getAdminData, getdashboaredStats } from '../controllers/Admin.controller.js'

const router = Router()

router.route('/adminLogin').post(adminLogin)
router.route('/getAdminData').get(getAdminData)
router.route('/allUsers').get(adminOnly,allUsers)
router.route('/allChats').get(adminOnly, allChats)
router.route('/allMessages').get(adminOnly, allMessages)
router.route('/getDashboardStats').get(adminOnly, getdashboaredStats)

export default router