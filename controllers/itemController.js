// 1- calling the model
const Item = require("../models/items");

const allItems = (req, res) => {
    Item.find()
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const addItem =  async (req, res) => {
  const image = req.file.path
     const { Name, description , price } = req.body;
      const item = new Item({ Name: Name, description: description,price:price,image:image });
      const newItem = await item.save();
      res.json(newItem);
};

module.exports = {
  allItems,
  addItem,
}; 

