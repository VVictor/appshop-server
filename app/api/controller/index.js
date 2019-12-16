function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
// const view = require('think-view');
const moment = require('moment');
const Jushuitan = require('jushuitan');
const rp = require('request-promise');
const http = require("http");
module.exports = class extends Base {
    indexAction() {
        //auto render template file index_index.html
        // return this.display();

        return _asyncToGenerator(function* () {})();
    }
    appInfoAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            // async indexAction() {
            let currentTime = parseInt(new Date().getTime() / 1000);
            const banner = yield _this.model('ad').where({
                enabled: 1,
                is_delete: 0
            }).order('sort_order asc').select();
            const notice = yield _this.model('notice').where({
                is_delete: 0
            }).select();
            const channel = yield _this.model('category').where({
                is_channel: 1,
                parent_id: 0
            }).order({
                sort_order: 'asc'
            }).select();
            const categoryList = yield _this.model('category').where({
                parent_id: 0,
                is_show: 1
            }).order({
                sort_order: 'asc'
            }).select();
            const newCategoryList = [];
            for (const categoryItem of categoryList) {
                const categoryGoods = yield _this.model('goods').where({
                    category_id: categoryItem.id,
                    goods_number: ['>=', 0],
                    is_on_sale: 1,
                    is_index: 1,
                    is_delete: 0
                }).order({
                    sort_order: 'asc'
                }).select();
                newCategoryList.push({
                    id: categoryItem.id,
                    name: categoryItem.name,
                    goodsList: categoryGoods,
                    banner: categoryItem.img_url,
                    height: categoryItem.p_height
                });
            }
            return _this.success({
                channel: channel,
                banner: banner,
                notice: notice,
                categoryList: newCategoryList
            });
        })();
    }
};
//# sourceMappingURL=index.js.map