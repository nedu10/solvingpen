'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  //hide password when rendering user data
      
  static get hidden () {
    return ['password']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
  // interests () {
  //   return this.hasMany('App/Models/Interest', 'id', 'user_id')
  // }
  questions () {
    return this.hasMany('App/Models/Question', 'id', 'user_id')
  }

  specializations () {
    return this.belongsToMany(
      'App/Models/Specialization',
      'user_id',
      'specialization_id',
      'id',
      'id'
    )
    .pivotTable('user_specializations')
    .withTimestamps()
    .pivotModel('App/Models/UserSpecialization')
  }
}

module.exports = User
