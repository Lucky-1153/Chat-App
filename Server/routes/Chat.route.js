import { Router } from "express"; 
import { auth } from "../middlewares/Auth.middleware.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttatchments } from "../controllers/Chat.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router()

router.route('/newGroupChat').post( auth, newGroupChat)
router.route('/getMyChats').get( auth, getMyChats)
router.route('/getMyGroups').get( auth, getMyGroups)
router.route('/addNewMember').post( auth, addMembers)
router.route('/removeMember').post( auth, removeMember)
router.route('/leaveGroup').post( auth, leaveGroup)
router.route('/sendAttatchments').post( 
    upload.fields([
        {
            name: 'attatchments',
            maxCount: 5
        },
    ]),
    auth, sendAttatchments)
router.route('/message/:id').get( auth, getMessages)
router.route('/chatDetails')
        .get( auth, getChatDetails)
        .put( auth, renameGroup)
        .post( auth, deleteChat)

export default router