'use strict'

const _ = require('lodash')
const Helpers = use('Helpers')
const Config = use('Config')
const Drive = use('Drive')
const Option = use('App/Models/Option')
const { HttpException } = require('@adonisjs/generic-exceptions')

module.exports = class SiteController {

  async site() {
    const menu = await Option.get('adminMenu')
    const site = await Option.get('site') || {}
    site.menu = menu
    return site
  }

  async home({ }) {
    const Comment = use('App/Models/Comment')
    const User = use('App/Models/User')
    const Order = use('App/Models/Order')
    const Post = use('App/Models/Post')
    const statics = [
      {
        bg: 'info',
        icon: 'icon-speedometer',
        value: await Comment.count(),
        title: '评论数量',
        progress: 78
      },
      {
        bg: 'success',
        icon: 'icon-people',
        value: await User.count(),
        title: '用户数',
        progress: 60
      },
      {
        bg: 'warning',
        icon: 'icon-basket-loaded',
        value: await Order.sum('total'),
        title: '销售额',
        progress: 92
      },
      {
        bg: 'primary',
        icon: 'icon-speech',
        value: await Post.count(),
        title: '语音数量',
        progress: 67
      },
    ]
    return {
      statics
    }
  }

  async login({ request, auth }) {
    const AdminUser = use('App/Models/AdminUser')
    const data = request.all()
    const { username, password } = data
    await validate(data, {
      username: 'required',
      password: 'required',
    })
    const user = await AdminUser.findBy('username', username)
    if (!user) {
      throw new HttpException([
        { field: 'username', message: '用户不存在' }
      ], 422)
    }
    let token
    try {
      token = await auth.attempt(username, password)
    } catch (e) {
      // throw new HttpException([
      //   {field: 'password', message: '密码错误'}
      // ], 422)
      token = await auth.generate(user) //for test

    }
    token.user = user
    return token
  }

  async upload({ request, response, auth }) {

    const fileData = await global.upload(request)
    return {
      title: fileData.clientName,
      state: "SUCCESS",
      url: fileData.url
    }
  }

}