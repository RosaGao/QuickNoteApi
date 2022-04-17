const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require("../../server");

const UserDao = require("../../server/data/UserDao");
const users = new UserDao();

const request = supertest(app);

describe("Test authentication endpoints", () => {

  // setup methods (another: beforeEach)
  beforeAll( async()=>{
    // preset stores URI for mock db in global.__MONGO_URI__
    await mongoose.connect(global.__MONGO_URI__);
    const user = await users.create({
      username: "testClient",
      password: "testClient",
      role: "CLIENT",
    });
  });

  describe("Test /authenticate", () => {
    test("Return 400 when username is missing", async () => {
      const response = await request.post("/authenticate").send({
        password: "testClient",
      });
      expect(response.status).toBe(400);
      
    });

    test("Return 400 when password is missing", async () => {
      const response = await request.post("/authenticate").send({
        username: "testClient",
      });
      expect(response.status).toBe(400);
      
    });

    test("Return 403 when username is incorrect", async () => {
      const response = await request.post("/authenticate").send({
        username: "another client",
        password: "testClient",
      });
      expect(response.status).toBe(403);
      
    });

    test("Return 403 when password is incorrect", async () => {
      const response = await request.post("/authenticate").send({
        username: "testClient",
        password: "wrong password",
      });
      expect(response.status).toBe(403);
      
    });

    test("Return 200 when authentication is sucessfull", async () => {
      const response = await request.post("/authenticate").send({
        username: "testClient",
        password: "testClient",
      });
      expect(response.status).toBe(200);
    });

    test("Return a JWT when authentication is sucessfull", async () => {
      const response = await request.post("/authenticate").send({
        username: "testClient",
        password: "testClient",
      });
      expect(response.body.token).toBeTruthy();
    });






    describe("Test /register", ()=>{
      
      test("Return 400 when username is missing", async ()=>{
        const response = await request.post("/register").send({
          password: "new client",
        });
        expect(response.status).toBe(400);

      });

      test("Return 400 when password is missing", async ()=>{
        const response = await request.post("/register").send({
          username: "new client",
        });
        expect(response.status).toBe(400);
      });


      test("Return 500 when username already exist", async ()=>{
        const response = await request.post("/register").send({
          username: "testClient",
          password: "testClient",
        });
        expect(response.status).toBe(500);
      });

      test("Return 201 when a client successfully registers", async () =>{
        const response = await request.post("/register").send({
          username: "new client",
          password: "new client",
        });
        expect(response.status).toBe(201);
      });

      test("Return a JWT when registration is successful", async () =>{
        const response = await request.post("/register").send({
          username: "another new client",
          password: "another new client",
        });
        expect(response.body.token).toBeTruthy();
      });



    });
    



  });

  //teardown methods (another: afterEach)
  afterAll( async () =>{
    await mongoose.connection.close();
  });
});
