const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryByName,
  getAllSubCatAndItems,
  editCategory,
  searchItems,
} = require("../Controllers/Category");
const router = express.Router();
//route to create a category or sub-category or items
//based on the model parameter
//eg: for -> category --> /category/create
//    for -> sub-category --> /sub-category/create
//    for -> items --> /items/create
router.route("/:model/create").post(createCategory);
//route for getting all items based on model
router.route("/:model/getAllCategories").get(getAllCategories);
//finding by name or id based on category
router.route("/:model/getByName").get(getCategoryByName);
//find all the sub-catergories of category or items of a category or sub-category
router.route("/:id/getAll/:model").get(getAllSubCatAndItems);
//edit a model
router.route("/:id/edit/:model").put(editCategory);
//search items by its name
router.route("/serachItems").get(searchItems);
module.exports = router;
