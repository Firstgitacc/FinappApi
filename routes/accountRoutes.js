const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const Account = require('../models/Account');

router.get('/',accountController.getAllAccounts);
router.delete('/:id',accountController.deleteAccount);
router.put('/:id',accountController.UpdateAccount)
router.post('/', accountController.addAccount);

module.exports = router;