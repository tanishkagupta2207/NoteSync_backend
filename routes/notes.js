const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({message: 'Hello from notes route'});
});

module.exports = router;