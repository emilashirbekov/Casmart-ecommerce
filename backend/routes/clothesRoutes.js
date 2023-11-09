const express = require('express');
const {
  getClothes,
  getOneClothes,
  createClothes,
  updateClothes,
  deleteClothes,
  searchOneClothes,
} = require('../controllers/clothesController');
const router = express.Router();

router.route('/').get(getClothes);

router.route('/:id').get(getOneClothes);

router.route('/search/:title').get(searchOneClothes);

router.route('/').post(createClothes);

router.route('/:id').put(updateClothes);

router.route('/:id').delete(deleteClothes);

module.exports = router;
