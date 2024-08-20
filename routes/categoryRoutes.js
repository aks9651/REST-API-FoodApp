const express = require('express');
const { createCategoryController, getAllCategoryController, getCategoryController, deleteCategoryController, updateCategoryController } = require('../controller/categoryController');

const router = express.Router();
//Create Method 

router.post('/createcategory', createCategoryController);
router.get('/getallcategory', getAllCategoryController);
router.get('/getcategory/:id', getCategoryController);
router.delete('/deletecategory/:id', deleteCategoryController);
router.put('/updatecategory/:id',updateCategoryController);

module.exports = router;