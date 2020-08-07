module.exports = function (callee) {
    function API_Call(callee) {
        var OPTIONS = {
            headers: {'Content-Type': 'application/json'},
            url: null,
            body: null
        };

        return {
            NLP : function (keyword, callback) {
                OPTIONS.url = "https://open-korean-text-api.herokuapp.com/extractPhrases";
                OPTIONS.body = JSON.stringify({
                    "text": keyword
                });
                request.post(OPTIONS, function (err, res, result) {
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            }
        };
    }
    function statusCodeErrorHandler(statusCode, callback , data) {
        switch (statusCode) {
            case 200:
                callback(null, JSON.parse(data));
                break;
            default:
                callback('error', JSON.parse(data));
                break;
        }
    }
    var INSTANCE;
    if (INSTANCE === undefined) {
        INSTANCE = new API_Call(callee);
    }
    return INSTANCE;
};