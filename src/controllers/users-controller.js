const { hash } = require("bcryptjs");
const appError = require("../utils/app-error");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create (request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(checkUserExists){
      throw new appError("Este e-mail já está em uso.")
    };

    const hashedPassword = await hash(password, 8);

    await database.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, "customer"]);

    return response.status(201).json();    
  };
}

module.exports = UsersController;