var WpApi = function(config) {

    this.$ = config.$;

    this.host = config.host;
    this.port = config.port || null;

    this.token = config.token || null;

};

WpApi.prototype = {

    setToken : function(token) {
        this.token = token;
    },

    _request : function(type, data) {
        var reqPars = {
            type : type,
            url : this.host
        };
        if (this.token) {
            reqPars['headers'] = {"Authorization": "Bearer " + this.token};
        }
        return this.$.ajax(reqPars);
    },

    save : function(pt, data) {
        data['action'] = 'update';
        data['post_type'] = pt;
        return this._request('post', data);
    },

    get : function(id) {
        return this._request('get', {id : id, action : 'get'});
    },

    find : function(pt, pars) {
        pars['action'] = 'find';
        pars['post_type'] = pt;
        return this._request('get', pars);
    }

};

export default WpApi;