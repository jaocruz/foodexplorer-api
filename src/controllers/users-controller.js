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

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

    return response.status(201).json();    
  };

  async update (request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if(!user){
      throw new appError("Usuário não encontrado.")
    };

    const updatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(updatedEmail && updatedEmail.id !== user.id){
      throw new appError("Esse e-mail já está em uso.")
    };

    user.name = name;
    user.email = email;

    await database.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [user.name, user.email, id]);

    return response.status(200).json();
  };
}

module.exports = UsersController;