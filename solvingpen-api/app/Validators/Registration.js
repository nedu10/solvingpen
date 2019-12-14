'use strict'

class Registration {
  get rules () {
    return {
      // validation rules
      name: 'required',
      password: 'required',
      email: 'required|email|unique:users',
    }
  }
  get messages() {
    return {
      "name.required": "Your Name is required",
      "password.required": "Your Password is required",
      "email.required": "Your Email is required",
      "email.email": "Please input a valid email",
      "email.unique": "This Email already exist"
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.status(404).json({
      status: "Failed",
      message: errorMessages
    })
  }
}

module.exports = Registration
