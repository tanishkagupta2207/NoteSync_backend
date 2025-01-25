const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({message: 'Hello from auth route'});
});

module.exports = router;