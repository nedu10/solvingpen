'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Question extends Model {
    user () {
        return this.belongsTo('App/Models/User', 'user_id', 'id')
    }
    // tags () {
    //     return this.hasMany('App/Models/Tag', 'id', 'question_id')
    //   }
    specializations () {
        return this.belongsToMany(
          'App/Models/Specialization',
          'question_id',
          'specialization_id',
          'id',
          'id'
        )
        .pivotTable('question_specializations')
        .withTimestamps()
        .pivotModel('App/Models/QuestionSpecialization')
      }
}

module.exports = Question
