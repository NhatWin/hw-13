const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (_, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  }).then(data => {

    res.json(data)
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
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
    if(data) {
      res.json(data)
    } else {
      res.status(404).json({ message: `Category with id ${data} not found` });
    }
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(res.json("Category Saved"))
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
})

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    if (!data) {
      res.status(404).json({message: `No category with id ${req.params.id}`})
    } else {
      res.json("Category Updated")
    }
  });
})

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    if (!data) {
      res.status(404).json({message: `No category with id ${req.params.id}`})
    } else {
      res.json("Category Deleted")
    }  
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
});

module.exports = router;
