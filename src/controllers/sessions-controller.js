const knex = require("../database/knex");
const appError = require("../utils/app-error");

const { compare } = require("bcryptjs");

class SessionsController {
  async create(request, response){
    const {email, password} = request.body;

    const user = await knex("users").where({email}).first();

    if(!user) {
      throw new appError("E-mail e/ou senha incorreta", 401);
    }

    const matchedPassword = await compare(password, user.password);

    if(!matchedPassword) {
      throw new appError("E-mail e/ou senha incorreta", 401);
    }

    return response.json({user})
  }
}

module.exports = SessionsController;