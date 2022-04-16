const UserDao = require("../server/data/UserDao");
const faker = require("faker");
const db = require("../server/data/db");

async function createSampleUsers(role) {
  try {
    db.connect();
    const users = new UserDao();
    const data = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      role
    }
    const user = await users.create(data);
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}

createSampleUsers("ADMIN");
createSampleUsers("CLIENT");
createSampleUsers("CLIENT");

