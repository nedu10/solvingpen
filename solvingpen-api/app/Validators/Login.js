'use strict'

class Login {
  get rules () {
    return {
      // validation rules
      password: 'required',
      email: 'required|email',
    }
  }
  get messages() {
    return {
      "password.required": "Your Password is required",
      "email.required": "Your Email is required",
      "email.email": "Please input a valid email"
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.status(404).json({
      status: "Failed",
      message: errorMessages
    })
  }
}

module.exports = Login
