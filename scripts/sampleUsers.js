const UserDao = require("../server/data/UserDao");
const db = require("../server/data/db");

async function createSampleUsers(username, role) {
  try {
    db.connect();
    const users = new UserDao();
    const data = {
      username: username,
      password: username,
      role: role
    }
    const user = await users.create(data);
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}

createSampleUsers("client1", "CLIENT");
createSampleUsers("client2", "CLIENT");
createSampleUsers("admin1", "ADMIN");
createSampleUsers("admin2", "ADMIN");

