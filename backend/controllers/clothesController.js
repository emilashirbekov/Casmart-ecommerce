const asyncHandler = require('express-async-handler');
const Clothes = require('../models/clothesModal.js');

//@desc get all clothes
//@route GET /api/clothes
//@access public
const getClothes = asyncHandler(async (req, res) => {
  const clothes = await Clothes.find();
  res.status(201).json(clothes);
});

//@desc get one clothes
//@route GET /api/clothes
//@access public
const getOneClothes = asyncHandler(async (req, res) => {
  const clothes = await Clothes.findById(req.params.id);
  if (!clothes) {
    res.status(404);
    throw new Error('Clothes not found');
  }
  res.status(201).json(clothes);
});

const searchOneClothes = asyncHandler(async (req, res) => {
  const searchValue = req.params.title;
  try {
    const result = await Clothes.find({
      title: { $regex: searchValue, $options: 'i' },
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

//@desc create  clothes
//@route GET /api/clothes
//@access public
const createClothes = asyncHandler(async (req, res) => {
  const { id, category, imgUrl, sizes, price, title } = req.body;
  if (!id || !category || !imgUrl || !sizes || !price || !title) {
    res.status(400);
    throw new Error('All fields are required');
  }
  const clothes = await Clothes.create({
    id,
    category,
    imgUrl,
    sizes,
    price,
    title,
  });
  res.status(201).json(clothes);
});

//@desc update clothes
//@route GET /api/clothes
//@access public
const updateClothes = asyncHandler(async (req, res) => {
  const clothes = await Clothes.findById(req.params.id);
  if (!clothes) {
    res.status(404);
    throw new Error('Clothes not found');
  }
  const updatedClothes = await Clothes.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json(updatedClothes);
});

//@desc delete clothes
//@route GET /api/clothes
//@access public
const deleteClothes = asyncHandler(async (req, res) => {
  const clothes = await Clothes.findById(req.params.id);
  if (!clothes) {
    res.status(404);
    throw new Error('Clothes not found');
  }
  const deletedClothes = await Clothes.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: deletedClothes });
});

module.exports = {
  getClothes,
  getOneClothes,
  createClothes,
  updateClothes,
  deleteClothes,
  searchOneClothes,
};
