'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpecializationSchema extends Schema {
  up () {
    this.create('specializations', (table) => {
      table.increments()
      table.string('specialization_title').notNullable()
      table.string('specialization_description')
      table.timestamps()
    })
  }

  down () {
    this.drop('specializations')
  }
}

module.exports = SpecializationSchema
