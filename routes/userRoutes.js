const express = require('express');
const { getUserController, updateUserController, updatePasswordController, deleteUserController } = require('../controller/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();
// GET User Method
router.get('/getuser', authMiddleware, getUserController);

// UPDATE User Method
router.post('/updateuser', authMiddleware, updateUserController)

//UPDATE Password Method
router.post('/updatePassword',authMiddleware, updatePasswordController)

//Delete Account Method
router.delete('/deleteUser/:id', authMiddleware, deleteUserController)
module.exports = router;