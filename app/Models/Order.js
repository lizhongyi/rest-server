'use strict'

const Model = require('./Model')
const User = use('App/Models/User')

module.exports = class Order extends Model {

  static get label() {
    return '订单'
  }

  static get actions() {
    return false
  }

  static async fields() {
    return {
      _id: { sortable: true },
      no: { label: '编号' },
      title: { label: '名称' },
      user_id: {
        label: '用户',
        type: 'select2',
        ref: "user.username",
        cols: 6,
        options: await User.options('_id', 'username'),
        searchable: true,
        sortable: true
      },
      payment_type: {
        label: '支付方式',
        type: 'select',
        options: [
          { text: '请选择...', value: null },
          { text: '支付宝', value: 'ALI_APP' },
          { text: '微信支付', value: 'WX_APP' },
          { text: '兑换码', value: 'VOUCHER' },
        ],
        searchable: true
      },
      items: {
        label: '购买产品',
        type: 'array',
        editable: false,
        listable: false,
        ref: 'items.buyable._id',
        fields: {
          buyable_type: { label: '产品类型' },
          buyable_id: { label: '产品', ref: "buyable.name" },
          price: { label: '价格' },
          started_at: { label: '生效时间' },
          expired_at: { label: '过期时间' },
        }
      },
      total: { label: '金额', sortable: true },
      created_at: { label: '创建时间' },
      paid_at: { label: '支付时间', sortable: true },
    }
  }

  user() {
    return this.belongsTo('App/Models/User', 'user_id', '_id')
  }

  items() {
    return this.hasMany('App/Models/OrderItem', '_id', 'order_id')
  }

}