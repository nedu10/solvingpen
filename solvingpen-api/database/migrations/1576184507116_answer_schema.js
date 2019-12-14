'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswerSchema extends Schema {
  up () {
    this.create('answers', (table) => {
      table.increments()
      table.integer('question_id').notNullable().unsigned().references('id').inTable('questions')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.string('answer_text_area').notNullable()
      table.string('answer_attachment_url').nullable()
      table.string('answer_links').nullable()
      table.boolean('best_answer').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('answers')
  }
}

module.exports = AnswerSchema
