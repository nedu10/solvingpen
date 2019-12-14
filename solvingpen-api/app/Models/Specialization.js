'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Specialization extends Model {
    // interest () {
    //     return this.hasOne('App/Models/Interest', 'id', 'specialization_id')
    //   }
    //   tag () {
    //     return this.hasOne('App/Models/Interest', 'id', 'specialization_id')
    //   }
      users () {
        return this.belongsToMany(
          'App/Models/Specialization',
          'specialization_id',
          'user_id',
          'id',
          'id'
        )
        .pivotTable('user_specializations')
        .withTimestamps()
        .pivotModel('App/Models/UserSpecialization')
      }
      questions () {
        return this.belongsToMany(
          'App/Models/Specialization',
          'specialization_id',
          'question_id',
          'id',
          'id'
        )
        .pivotTable('question_specializations')
        .withTimestamps()
        .pivotModel('App/Models/QuestionSpecialization')
      }
}

module.exports = Specialization
