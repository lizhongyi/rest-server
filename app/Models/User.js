'use strict'

const Model = require('./Model')
const Config = use('Config')

class User extends Model {
  static get hidden() {
    return ['password']
  }
  static get label() {
    return '用户'
  }
  static async fields() {
    return {
      _id: { sortable: true },
      mobile: { label: '手机号' },
      username: { label: '用户名' },
      realname: { label: '真实姓名' },
      avatar: { label: '头像', type: 'image', preview: { height: 300 } },
      points: { label: '积分', sortable: true },
      created_at: { label: '注册时间', sortable: true },
      sort: { label: '排序', sortable: true },
    }
  }

  getAvatar(val) {
    return this.uploadUri(val)
  }

  static boot() {
    super.boot()
    this.addHook('beforeCreate', 'User.hashPassword')
    this.addHook('beforeUpdate', 'User.hashPassword')
  }
}

module.exports = User
