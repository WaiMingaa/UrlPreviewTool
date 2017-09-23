/**
 * Created by wmlam on 19/9/2017.
 */
var cheerio = require('cheerio');
var phantom = require('phantom');
module.exports = (function () {

    function _getMetadata(url) {
        phantom.create().then(instance => {
            return instance.createPage();
        }).then(function (page) {
            sitepage =page;
            console.log(url);
            return page.open(url)
        }).then(function (status) {
            console.log(status);
            if (status== 'success') {
                sitepage.evaluate(function () {
                    return document.getElementsByTagName('head')[0].innerHTML;
                }).then(function (html) {
                   // console.log(html);
                    var $ = cheerio.load(html);
                    //console.log($);
                    var text = $('meta').html();
                    console.log(text);

                })

            }
            else {
                console.log('there');
                return false;
            }

        }).catch(function (error) {
            console.log(error);
            phInstance.exit();
        })
    }

    function _getStatus(url) {
        phantom.create().then(instance => {
            return instance.createPage();
        }).then(function (page) {
            page.open(url).then(function (status) {
                if (!status == "fail")
                    return true;
                else
                    return false;
            })
        }).catch(function (error) {
            console.log(error);
            phInstance.exit();
        })
    }

    function _getImage(url) {
        phantom.create().then(instance => {
            return instance.createPage();
        }).then(function (page) {
            page.open(url).then(function (status) {
                if (!status == "fail")
                    return sitepage.render('./image/capture.jpg');
                else
                    false;
            })
        }).catch(function (error) {
            console.log(error);
            phInstance.exit();
        })
    }

    return {
        getStatus: _getStatus,
        getImage: _getImage,
        getMetadata: _getMetadata
    }
})();
/*
phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        var link = "http://" + url;
        return page.open(link);
    })
    .then(status => {
        console.log(status);
        if (!status == "fail")
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
    })*/
