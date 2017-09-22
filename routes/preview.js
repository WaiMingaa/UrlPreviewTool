var express = require('express');
var router = express.Router();
var phantom = require('phantom');
/* GET users listing. */
var sitepage = null;
router.get('/:url?', function (req, res, next) {
    var url = req.query.url;
    if( url.startsWith('http://')||url.startsWith('https://'))
        ;
    else
        url='http://'+url;
    phantom.create()
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
            sitepage = page;
            sitepage.property('viewportSize', {width: 1366, height: 768});
            return sitepage.open(url);
        })
        .then(status => {
            console.log(status);
            return sitepage.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
        }).then(()=>{
        return sitepage.evaluate(function(){
            return $('body').html().toString();
        })
    })
        .then(content => {
            res.send(content);
        })
        .catch(error => {
            res.send(error);
            phInstance.exit();
        })
});

module.exports = router;
