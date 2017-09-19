/**
 * Created by wmlam on 19/9/2017.
 */
var p = {
    getstatus: _getstatus,
    done: _done,
    getimage: _getimage
}
var pageinstance;

function _getimage(url){

}

function _createpageInstance() {
    phantom.create()
        .then(instance => {
            return instance.createPage();
        })

}

function _done() {

    if (pageinstance) {
        phInstance.exit();
        return true
    }
    ;
else
    return false;

}
function _getpageinstance() {
    if (!pageinstance) {
        pageinstance = _createpageInstance();
    }
    return pageinstance;
}

function _getstatus(url) {


}
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
    })