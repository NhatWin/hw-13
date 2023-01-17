const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (_, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  }).then(categorysData => {
    res.json(categorysData)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    include: [Product],
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.json(data)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
}).then(res.json("Category Saved"));

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
}).then(res.json("Category Updated"));

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destory({
    where: {
      id: req.params.id
    }
  })
});

module.exports = router;
