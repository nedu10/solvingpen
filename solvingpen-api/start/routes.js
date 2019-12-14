'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'welcome to solvingPen' }
})

//user
Route.group(() => {
  Route.post('/registration', 'UserController.register').validator('Registration')
  // Route.post('/add_patient', 'TherapistController.addPatient').validator('PatientRegistration').middleware(['auth', 'isTherapist'])
  // Route.put('/edit_patient/:patient_id', 'TherapistController.updatePatient').middleware(['auth', 'isTherapist'])
  // Route.delete('/delete_patient/:patient_id', 'TherapistController.deletePatient').middleware(['auth', 'isTherapist'])
  // Route.delete('/remove_specialization/:therapist_specialization_id', 'TherapistController.removeSpecialization').middleware(['auth', 'isTherapist'])
  // Route.get('/', 'TherapistController.therapistProfile').middleware(['auth', 'isTherapist'])
  Route.post('/login', 'UserController.login').validator('Login').middleware(['guest'])
  Route.get('/users', 'UserController.getAllUser')
  Route.get('/profile', 'UserController.profile').middleware(['auth'])
  Route.get('/user/:user_id', 'UserController.getSingleUser')
  Route.put('/user/:user_id', 'UserController.update').middleware(['auth'])
  Route.put('/user/:user_id/:specialization_id', 'UserController.updateSpecialization').middleware(['auth'])
}).prefix('/api')
