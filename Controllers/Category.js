const Category = require("../Model/Category");
const ErrorHandler = require("../Utils/errorHandler");

//create
//category sub-category or items based on the parameter
//post method
exports.createCategory = async (req, res, next) => {
  try {
    //The inputs that the user need to provide
    let {
      name,
      imageUrl,
      description,
      taxApplicability,
      tax,
      taxType,
      totalAmount,
      parentCategory,
      baseAmount,
      discount,
    } = req.body;
    let data = null;
    const { model } = req.params; //
    const modelType = model;

    //checking if there is any values missing that are requried to create category
    if (!name || !description || !modelType) {
      return next(new ErrorHandler("Please enter the details needed", 404));
    }
    //if the model is sub-category or items there must be a valid parent_id value
    if (modelType === "sub-category" || modelType === "items") {
      if (parentCategory === null || parentCategory === "") {
        return next(
          new ErrorHandler(
            "Please enter the parent of the sub category or item",
            404
          )
        );
      }
      //checking if the parent is accually present in database
      let parent = await Category.findById(parentCategory).populate();
      if (!parent || parent.modelType === "items") {
        next(new ErrorHandler("Please provide a valid parent", 404));
      }
      //if no tax is given make the taxes as parent taxes
      if (!taxApplicability) taxApplicability = parent.taxApplicability;
      if (!tax) tax = parent.tax;
      if (!taxType) taxType = parent.taxType;
    }

    //The key things that are needed to create an item if missing then an error will be produced
    if (modelType === "items") {
      if (!baseAmount || !discount)
        return next(new ErrorHandler("Only item creation errors", 404));
      else totalAmount = baseAmount - discount;
    }

    //creating a category or subcategory or items based on the modelType
    data = await Category.create({
      name,
      url: imageUrl,
      description,
      taxApplicability: taxApplicability,
      tax: taxApplicability === true ? tax : null,
      taxType: taxApplicability === true ? taxType : null,
      parentCategory,
      baseAmount,
      discount,
      totalAmount,
      modelType,
    });
    //after successful creation of the categories then returning a json
    res.status(200).json({
      data,
      success: true,
    });
  } catch (error) {
    //If any error occurs
    next(new ErrorHandler("Internal server error", 404));
  }
};

//get all categories from the database
exports.getAllCategories = async (req, res, next) => {
  try {
    //get the type of model whether category sub-category or items
    const { model } = req.params;
    const modelType = model;
    //make the default as category
    if (modelType === "") {
      modelType = "category";
    }
    //the attributes to takeback to the user
    let options = {
      name: 1,
      description: 1,
      url: 1,
      taxApplicability: 1,
      tax: 1,
      taxType: 1,
      modelType: 1,
    };
    //If the model is sub-category the parent must be retured along with it
    if (modelType === "sub-category") {
      options = {
        ...options,
        parentCategory: 1,
      };
    } else if (modelType === "items") {
      //for items the baseAmount discount and totalAmount must be given
      options = {
        ...options,
        parentCategory: 1,
        baseAmount: 1,
        discount: 1,
        totalAmount: 1,
      };
    }

    //find the model and return those attributes in option
    let data;
    data = await Category.find({ modelType }).select(options);
    res.status(200).json({
      data,
      success: true,
    });
  } catch (error) {
    next(new ErrorHandler("Internal Server Error", 404));
  }
};

//get all categories by name
exports.getCategoryByName = async (req, res, next) => {
  try {
    //take input of the name or the category
    const { categoryName, categoryId } = req.body;
    //take the type of model in route
    const { model } = req.params;
    //options of attributes for a category
    let options = {
      name: 1,
      description: 1,
      url: 1,
      taxApplicability: 1,
      tax: 1,
      taxType: 1,
      modelType: 1,
    };
    //if none of the category id or name are not given then error
    if (!categoryId && !categoryName) {
      return next(new ErrorHandler("Please provide Name or Id", 404));
    }
    //add some extra attributes for sub-category
    if (model === "sub-category") {
      options = {
        ...options,
        parentCategory: 1,
      };
    } else if (model === "items") {
      // extra attributes for items
      options = {
        ...options,
        parentCategory: 1,
        baseAmount: 1,
        discount: 1,
        totalAmount: 1,
      };
    }

    let data = null;
    if (categoryId) {
      //find by categoryId

      data = await Category.findById(categoryId).select(options);

      if (!data) {
        return next(new ErrorHandler("Category not found", 404));
      }
    } else {
      //find by categoryName

      data = await Category.findOne({
        name: categoryName,
        modelType: model,
      }).select(options);
    }
    //return the final data
    res.status(200).json({
      data,
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler("Internal Server Error", 404));
  }
};

exports.getAllSubCatAndItems = async (req, res, next) => {
  try {
    //model and id of the items in params
    const { model, id } = req.params;
    //find that parentCategory and modelType
    const data = await Category.find({ parentCategory: id, modelType: model });

    res.status(200).json({
      data,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.editCategory = async (req, res, next) => {
  try {
    //take the id and model from the user
    const { id, model } = req.params;

    let {
      name,
      description,
      image,
      taxApplicability,
      tax,
      taxType,
      baseAmount,
      discount,
      parentCategory,
      totalAmount,
    } = req.body;
    //options or selections

    let options = {
      name,
      description,
      url: image,
      taxApplicability,
      tax: taxApplicability === false ? null : tax,
      taxType: taxApplicability === false ? null : taxType,
    };
    const prev = await Category.findById(id);
    if (!prev) {
      return next(new ErrorHandler(model, "not found", 404));
    }

    let data = null;
    if (model === "category") {
    } else if (model === "sub-category") {
      options = {
        ...options,
        parentCategory,
      };
    } else if (model === "items") {
      //changing the totalAmount based on changing the baseAmount and discount
      if (baseAmount || discount) {
        baseAmount = baseAmount || prev.baseAmount;
        discount = discount || prev.discount;
        totalAmount = baseAmount - discount;
      }
      options = {
        ...options,
        parentCategory,
        baseAmount,
        discount,
        totalAmount,
      };
    }
    data = await Category.findByIdAndUpdate(id, options, { new: true });
    res.status(200).json({
      data,
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler("Internal server error", 404));
  }
};

exports.searchItems = async (req, res, next) => {
  try {
    const { name } = req.query;
    //using regrex to search words and options - i means ignoring the case
    const data = await Category.find({
      name: { $regex: name, $options: "i" },
      modelType: "items",
    });
    res.status(200).json({
      data,
      success: true,
    });
  } catch (error) {
    next(new ErrorHandler("Internal server error", 404));
  }
};
