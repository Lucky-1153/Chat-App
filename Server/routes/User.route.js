import {Router} from 'express'
import { acceptFrindRequest, getMyFriends, getMyNotification, getMyProfile, login, searchUser, sendFriendRequest, signup } from '../controllers/User.controller.js'
import { upload } from "../middlewares/multer.js";
import {auth} from '../middlewares/Auth.middleware.js'

const router = Router()

router.route('/login').post(login)
router.route('/signup').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
    ]),
    signup)
router.route('/searchUser').get( auth, searchUser)
router.route('/sendFriendRequest').post( auth, sendFriendRequest)
router.route('/acceptFriendRequest').post( auth, acceptFrindRequest)
router.route('/getMyProfile').get( auth, getMyProfile)
router.route('/getMyFriends').get( auth, getMyFriends)
router.route('/getMyNofification').get( auth, getMyNotification)

export default router
