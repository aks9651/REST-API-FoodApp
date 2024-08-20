const express = require('express');
const { createFoodController, getAllFoodController, getFoodController, deleteFoodContoller, updateFoodController, placeOrderController } = require('../controller/foodController');

const router = express.Router();
//Create APi
router.post('/create', createFoodController);
router.get('/getallfood', getAllFoodController);
router.get('/getfood/:id', getFoodController);
router.delete('/deletefood/:id', deleteFoodContoller);
router.put('/updatefood/:id', updateFoodController);

//Place Order APi
router.post('/placeorder', placeOrderController);


module.exports= router;