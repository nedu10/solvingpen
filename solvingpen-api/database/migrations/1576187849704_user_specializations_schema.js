'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSpecializationsSchema extends Schema {
  up () {
    this.create('user_specializations', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.integer('specialization_id').notNullable().unsigned().references('id').inTable('specializations')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_specializations')
  }
}

module.exports = UserSpecializationsSchema
