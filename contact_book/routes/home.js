const express = require('express');
const router = express.Router();

// Home
router.get('/', (req, res) => {
    res.redirect('/contacts');
});

module.exports = router;