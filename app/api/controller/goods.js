function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
const moment = require('moment');
module.exports = class extends Base {
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const model = _this.model('goods');
            const goodsList = yield model.select();
            return _this.success(goodsList);
        })();
    }
    /**
     * 获取sku信息，用于购物车编辑时选择规格
     * @returns {Promise.<Promise|PreventPromise|void>}
     */
    saveUserIdAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const formId = _this2.post('formId');
            let user = yield _this2.model('user').where({
                id: think.userId
            }).find();
            const currentTime = parseInt(new Date().getTime() / 1000);
            let data = {
                form_id: formId,
                order_id: 0,
                user_id: think.userId,
                add_time: currentTime
            };
            yield _this2.model('formid').add(data);
        })();
    }
    /**
     * 商品详情页数据
     * @returns {Promise.<Promise|PreventPromise|void>}
     */
    detailAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            const goodsId = _this3.get('id');
            const model = _this3.model('goods');
            const info = yield model.where({
                'id': goodsId
            }).find();
            const gallery = yield _this3.model('goods_gallery').where({
                goods_id: goodsId,
                is_delete: 0
            }).order('sort_order').limit(6).select();
            yield _this3.model('footprint').addFootprint(think.userId, goodsId);
            let productList = yield model.getProductList(goodsId);
            let goodsNumber = 0;
            for (const item of productList) {
                if (item.goods_number > 0) {
                    goodsNumber = goodsNumber + item.goods_number;
                }
            }
            info.goods_number = goodsNumber;
            return _this3.success({
                info: info,
                gallery: gallery,
                specificationList: yield model.getSpecificationList(goodsId),
                productList: yield model.getProductList(goodsId)
            });
        })();
    }
    goodsShareAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            const goodsId = _this4.get('id');
            const info = yield _this4.model('goods').where({
                id: goodsId
            }).field('name,retail_price').find();
            return _this4.success(info);
        })();
    }
    /**
     * 获取商品列表
     * @returns {Promise.<*>}
     */
    listAction() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            const keyword = _this5.get('keyword');
            const sort = _this5.get('sort');
            const order = _this5.get('order');
            const sales = _this5.get('sales');
            const model = _this5.model('goods');
            const whereMap = {
                is_on_sale: 1,
                is_delete: 0
            };
            if (!think.isEmpty(keyword)) {
                whereMap.name = ['like', `%${keyword}%`];
                // 添加到搜索历史
                yield _this5.model('search_history').add({
                    keyword: keyword,
                    user_id: think.userId,
                    add_time: parseInt(new Date().getTime() / 1000)
                });
                //    TODO 之后要做个判断，这个词在搜索记录中的次数，如果大于某个值，则将他存入keyword
            }
            // 排序
            let orderMap = {};
            if (sort === 'price') {
                // 按价格
                orderMap = {
                    retail_price: order
                };
            } else if (sort === 'sales') {
                // 按价格
                orderMap = {
                    sell_volume: sales
                };
            } else {
                // 按商品添加时间
                orderMap = {
                    sort_order: 'asc'
                };
            }
            const goodsData = yield model.where(whereMap).order(orderMap).select();
            return _this5.success(goodsData);
        })();
    }
    /**
     * 在售的商品总数
     * @returns {Promise.<Promise|PreventPromise|void>}
     */
    countAction() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            const goodsCount = yield _this6.model('goods').where({
                is_delete: 0,
                is_on_sale: 1
            }).count('id');
            return _this6.success({
                goodsCount: goodsCount
            });
        })();
    }
};
//# sourceMappingURL=goods.js.map