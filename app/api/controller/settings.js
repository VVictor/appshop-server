function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
module.exports = class extends Base {
    showSettingsAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            let info = yield _this.model('show_settings').where({
                id: 1
            }).find();
            return _this.success(info);
        })();
    }
    saveAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            let name = _this2.post('name');
            let mobile = _this2.post('mobile');
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
            if (mobile.length < 11) {
                return _this2.fail(200, '长度不对');
            } else if (!myreg.test(mobile)) {
                return _this2.fail(300, '手机不对哦');
            }
            if (name == '' || mobile == '') {
                return _this2.fail(100, '不能为空');
            }
            let data = {
                name: name,
                mobile: mobile,
                name_mobile: 1
            };
            let info = yield _this2.model('user').where({
                id: think.userId
            }).update(data);
            return _this2.success(info);
        })();
    }
    userDetailAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            let info = yield _this3.model('user').where({
                id: think.userId
            }).field('mobile,name').find();
            return _this3.success(info);
        })();
    }
};
//# sourceMappingURL=settings.js.map