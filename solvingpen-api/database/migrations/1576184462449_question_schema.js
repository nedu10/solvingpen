'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.string('question_title').notNullable()
      table.string('question_text_area').notNullable()
      table.string('question_attachment_url').nullable()
      table.string('question_links').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
