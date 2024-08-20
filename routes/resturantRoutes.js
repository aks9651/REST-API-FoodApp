const express = require('express');
const {createresturantController, getAllResturantController, getResturantController, deleteResturant}= require('../controller/resturantController.js')

const router = express.Router();

router.post('/createresturant', createresturantController );
router.get('/getallresturant', getAllResturantController);
router.get('/getresturant/:id', getResturantController)
router.delete('/deleteresturant/:id', deleteResturant)


module.exports = router;