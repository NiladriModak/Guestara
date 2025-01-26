Guestara Nodejs Assignment
To Run the file locally 
  1) npm init
  2) npm i
  3) npm run dev

VIDEO LINK 

https://www.loom.com/share/4d90df064271460e8c7ac9b5e5cf40b6?sid=49a9bc1a-c3c9-4323-b3f4-b1f91ddc2bbc

The main api calls are:-

  POST REQUEST
  1) To create a category -> localhost:300/api/v1/category/create
  2) To create a sub-category -> localhost:300/api/v1/sub-category/create
  3) To create a item -> localhost:300/api/v1/items/create

  GET REQUESTS
  1) To get all categories -> localhost:300/api/v1/category/getAllCategories
  2) To get all sub-categories -> localhost:300/api/v1/sub-category/getAllCategories
  3) To get all items -> localhost:300/api/v1/items/getAllCategories

  4) To get items by name or id -> localhost:300/api/v1/items/getByName
  5) To get sub-categories by name or id -> localhost:300/api/v1/sub-category/getByName
  6) To get items by name or id -> localhost:300/api/v1/category/getByName

  7) To get all sub-categories inside a category -> localhost:300/api/v1/:categoryId/getAll/sub-category
     Eg: localhost:300/api/v1/6795cbef6caf55a10f0e26f8/getAll/sub-category
  8) To get all sub-categories inside a category -> localhost:300/api/v1/:categoryId/getAll/items
     Eg: localhost:300/api/v1/6795cc496caf55a10f0e26fc/getAll/items

  9) To search items by name -> localhost:300/api/v1/serachItems?name=i

  PUT REQUESTS
  1) Edit -> localhost:300/api/v1/:id/edit/:model
      Eg: localhost:300/api/v1/6795e78c81f5be3d6d97a85e/edit/items (model can be category,sub-category or items) and id is the corresponding ids

Short answer to the following questions:

Which database you have chosen and why?

Ans - ➡️ MongoDB uses a document-based model (JSON-like structure) which makes it highly flexible for projects that deal with dynamic and evolving data schemas.
      ➡️ MongoDB provides fast read/write operations. 
      ➡️ Indexing for optimized queries.
      ➡️ Built-in aggregation framework for data analysis.
      ➡️ MongoDB is more efficient than traditional SQL databases.
      
3 things that you learned from this assignment?

Ans - ➡️ Creating a Database design having no redundancy (only a single table instade of multiple)
      ➡️ Implementing business logic, such as tax applicability, calculating total amounts (Base - Discount + Tax), and cascading defaults (subcategory inheriting category tax by default), was insightful and gave me a deeper understanding of backend logic design.
      ➡️ I learned to design RESTful APIs for CRUD operations while maintaining consistency across endpoints. For example, designing APIs for categories, subcategories, and items that ensure data relationships are properly maintained.
      
What was the most difficult part of the assignment?

Ans - ➡️ Design of Database
      ➡️ Managing the relationship between categories, subcategories, and items in a nested and hierarchical way without traditional foreign keys (as in SQL) was challenging. Deciding between embedding data vs referencing data for optimal performance was a critical decision.
      
What you would have done differently given more time?

Ans - ➡️Pagination 
      ➡️Implement the frontend for better understanding
  
