const express = require("express")
const Users = require("./users-model")
const restrict = require("../middleware/restrict")

const router = express.Router()

// This endpoint is only available to logged-in users due to the `restrict` middleware
router.get("/", restrict("admin"), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})


router.get('/:id', verifyUser, (req, res) => {
    const id = req.params.id;
  
    Users.findById(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  router.delete('/:id', verifyUser, (req, res) => {
    const id = req.params.id;
  
    Users.remove(id)
      .then(deletedUser => {
        const unit = deletedUser > 1 ? 'records' : 'record';
        res.status(200).json({ message: `${deletedUser} ${unit} deleted.` });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }); //working
  //middlewre
  function verifyUser(req, res, next) {
    const id = req.params.id;
  
    Users.findById(id)
      .then(item => {
        if (item) {
          req.item = item;
          next();
        } else {
          res.status(404).json({ message: 'User Not Found.' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
module.exports = router