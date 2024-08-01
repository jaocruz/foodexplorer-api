const appError = require("../utils/app-error");

class UsersController {
  create (request, response) {
    const { name, email, password } = request.body;

    if(!name){
      throw new appError("Nome não informado")
    }

    if(!email){
      throw new appError("E-mail não informado")
    }
    
    response.status(201).json({ name, email, password })
  }
}

module.exports = UsersController;