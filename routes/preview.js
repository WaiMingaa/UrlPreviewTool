var express = require('express');
var router = express.Router();
var phantom = require('phantom');
/* GET users listing. */
var sitepage = null;
router.get('/:url', function (req, res, next) {
    phantom.create()
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
            sitepage = page;
            return page.open('https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75')
        })
        .then(status => {
            console.log(status);
            return sitepage.render('./image/test.png')
        })
        .then(() => {
            console.log(`File created at [./stackoverflow.pdf]`);
        })
        .catch(error => {
            console.log(error);
            phInstance.exit();
        })
    next();
});

module.exports = router;
