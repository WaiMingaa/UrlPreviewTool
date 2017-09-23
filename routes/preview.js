var express = require('express');
var router = express.Router();
var phantom = require('phantom');
/* GET users listing. */
var sitepage = null;
router.get('/:url', function (req, res, next) {
    var url= req.params.url;
    phantom.create()
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
            sitepage = page;
            var link= "http://"+url;
            return page.open(link);
        })
        .then(status => {
            console.log(status);
            if(!status=="fail")
            return sitepage.render('./image/test.png');
            else
                page.open(link)
        })
        .then(() => {
            console.log(`File created at /image`);
        })
        .catch(error => {
            console.log(error);
            phInstance.exit();
        })
    next();
});

module.exports = router;
