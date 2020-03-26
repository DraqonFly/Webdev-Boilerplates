const express = require('express');
const router = express.Router({ caseSensitive: true, strict: true });

router.get('/', (req, res) => res.sendFile(__dirname + '/public/html/index.html') )

module.exports = router;
