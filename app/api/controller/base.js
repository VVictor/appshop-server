function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Controller {
    __before() {
        var _this = this;

        return _asyncToGenerator(function* () {
            // 根据token值获取用户id
            think.token = _this.ctx.header['x-nideshop-token'] || '';
            const tokenSerivce = think.service('token', 'api');
            think.userId = yield tokenSerivce.getUserId();
            const publicController = _this.config('publicController');
            const publicAction = _this.config('publicAction');
            // 如果为非公开，则验证用户是否登录
            const controllerAction = _this.ctx.controller + '/' + _this.ctx.action;
            // if (!publicController.includes(this.ctx.controller) && !publicAction.includes(controllerAction)) {
            //   if (think.userId <= 0) {
            //     return this.fail(401, '请先登录');
            //   }
            // }
        })();
    }
    /**
     * 获取时间戳
     * @returns {Number}
     */
    getTime() {
        return parseInt(Date.now() / 1000);
    }
    /**
     * 获取当前登录用户的id
     * @returns {*}
     */
    getLoginUserId() {
        return think.userId;
    }
    //  timestampToTime (unixtimestamp){  
    //    var unixtimestamp = new Date(unixtimestamp*1000);  
    //    var year = 1900 + unixtimestamp.getYear();  
    //    var month = "0" + (unixtimestamp.getMonth() + 1);  
    //    var date = "0" + unixtimestamp.getDate();  
    //    var hour = "0" + unixtimestamp.getHours();  
    //    var minute = "0" + unixtimestamp.getMinutes();  
    //    var second = "0" + unixtimestamp.getSeconds();  
    //    return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)  
    //        + " " + hour.substring(hour.length-2, hour.length) + ":"  
    //        + minute.substring(minute.length-2, minute.length) + ":"  
    //        + second.substring(second.length-2, second.length);  
    // } 
};
//# sourceMappingURL=base.js.map