'use strict'

const Database = use('Database')
/*
|--------------------------------------------------------------------------
| SpecializationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class SpecializationSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Database.truncate('specializations')
    const specializations = await Database.table('specializations')
      .insert([{
        specialization_title: 'Electromagnetism',
        specialization_description: 'Electromagnetism is good'
      }, 
      {
        specialization_title: 'Mathematics',
        specialization_description: 'Mathematics is difficult'
      },
      ])

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}

module.exports = SpecializationSeeder
