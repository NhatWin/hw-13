const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (_, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [Product]
  }).then(data => {
    res.json(data)
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    include: [Product],
    where: {
      id: req.params.id
    }
  }).then(data => {
    if(data) {
      res.json(data)
    } else {
      res.status(404).json({ message: `Tag with id ${data} not found` });
    }
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(res.json("Tag Saved"))
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    if (!data) {
      
    } else {
      res.json("Tag Updated")
    }
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    if (!data) {
      res.status(404).json({message: `No tag with id ${req.params.id}`})
    } else {
      res.json("Tag Deleted")
    }  
  })
  .catch((err) => {
    res.status(500).json({ message: err.message });
  });
});

module.exports = router;
