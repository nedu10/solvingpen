'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSpecializationsSchema extends Schema {
  up () {
    this.create('question_specializations', (table) => {
      table.increments()
      table.integer('question_id').notNullable().unsigned().references('id').inTable('questions')
      table.integer('specialization_id').notNullable().unsigned().references('id').inTable('specializations')
      table.timestamps()
    })
  }

  down () {
    this.drop('question_specializations')
  }
}

module.exports = QuestionSpecializationsSchema
