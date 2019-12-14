'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const UserSpecialization = use('App/Models/UserSpecialization')

class UserController {
    async register({request, response}) {
        const {name, email, description, password, specialization} = request.post()

        try {
            const user = new User()
            user.email = email
            user.name = name
            user.description = description
            user.password = password
            const saveUser = await user.save()

            console.log('saveUser >> ', saveUser)
             
            if (!saveUser) {
                throw response.status(500).json({
                    status: 'Failed',
                    message: 'Internal server error'
                })
            }

            const get_user = await User.query().where('email', email).first()

            if (specialization.length > 0) {
                for (let i = 0; i < specialization.length; i++) {
                    const user_specialization = new UserSpecialization()
                    user_specialization.specialization_id = specialization[i]
                    user_specialization.user_id = get_user.id
                    await user_specialization.save()
                }
                
            }


            return response.status(201).json({
                status: 'Success',
                message: 'User is successfully registered',
                data: saveUser
            })
        } catch (error) {
            console.log(error)
            return response.status(500).json({
                status: 'Failed',
                message: 'Failed Internal server error',
                error: error
            })
        }   
    }
    async getSingleUser({response, params}) {
        const {user_id} = params
        try {
            const get_user = await User.query().where("id", user_id).first()
            return response.status(200).json({
                status: 'Success',
                message: 'User is successfully fetched',
                data: get_user
            })

        } catch (error) {
            console.log(error)
            return response.status(500).json({
                status: 'Failed',
                message: 'Failed Internal server error',
                error: error
            })
        }
    } 
    async getAllUser({response}) {
        try {
            const get_users = await User.query().fetch()
            return response.status(200).json({
                status: 'Success',
                message: 'Successfully fetched users',
                data: get_users
            })
        } catch (error) {
            console.log(error)
            return response.status(500).json({
                status: 'Failed',
                message: 'Failed Internal server error',
                error: error
            })
        }
    }
    async login({ request, response, auth}) {
        
        const {email, password} = request.post()
        try {
            const checkLoginUser = await User.query().where("email", email).first()

            if (!checkLoginUser) {
                return response.status(400).json({
                    status: 'Failed',
                    message: 'Invalid Credentials',
                    details: 'User does not exist'
                })
            }
            const verifyPassword = await Hash.verify(password, checkLoginUser.password)

            if (!verifyPassword) {
                return response.status(400).json({
                    status: 'Failed',
                    message: 'Wrong password'
                })
            }

            const loginUser = await auth.generate(checkLoginUser, true)

            return response.status(202).json({
                status: 'Success',
                message: 'Successfully logged in',
                token: loginUser
            })

        } catch (error) {
            console.log(error)
            return response.status(500).json({
                status: 'Failed',
                message: 'Failed Internal server error',
                error: error
            })
        } 
    }
    async profile({response, auth}) {
        try {
            const authUser = auth.current.user
            const user = await User.query().where("id", authUser.id).first()
            return response.status(200).json({
                status: 'Success',
                message: 'Successfully fetch profile',
                data: user
            })
        } catch (error) {
            console.log(error)
            return response.status(500).json({
                status: 'Failed',
                message: 'Failed Internal server error',
                error: error
            }) 
        }
    }
    async update({request, params, response}) {
        const {user_id} = params
        const {name, description, points} = request.post()

        try {
            const user = await User.query().where("id", user_id).first()
           

            user.name = (name) ? name : user.name
            user.description = (description) ? description : user.description
            user.points = (points) ? points : user.points
            
            const updateUser = await user.save()

            return response.status(202).json({
                status: 'Success',
                message: 'Successfully Updated user',
                data: updateUser
            })
        } catch (error) {
            console.log(error)
            return response.status(500).json({
                status: 'Failed',
                message: 'Failed Internal server error',
                error: error
            })
        }   
    }
    async updateSpecialization({request, params, response}){
        const {user_id, specialization_id} = params
    }
}

module.exports = UserController
