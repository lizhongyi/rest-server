'use strict'

const _ = require('lodash')
const Helpers = use('Helpers')
const Config = use('Config')
const Drive = use('Drive')
const { HttpException } = require('@adonisjs/generic-exceptions')

module.exports = class ResourceController {

  async index({ request, Model, query }) {
    const { page = 1, perPage = 20 } = query
    const offset = (page - 1) * perPage
    const limit = perPage
    const data = await Model.query(query).listFields().skip(offset).limit(limit).fetch()
    return data
  }

  async show({ request, auth, Model, model }) {
    return model
  }
  
}