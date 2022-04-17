const supertest = require("supertest");
const app = require("../server");

// supertest allows send request to API w/out running server
const request = supertest(app);

test("Get 200 for API homepage", async ()=>{
  const response = await request.get("/");
  expect(response.status).toBe(200);
});



const endpoint = "/api/users";

describe(`Test endpoint ${endpoint}`, () => {

  describe("HTTP GET request", () => {

    test("Return 401 when no authorization token is provided", async () => {

    });

    test("Return 401 when authorization token is expired", async () => {
      
    });

    test("Return 403 when authorization token belongs to a CLIENT", async () => {
      
    });

    test("Return 200 when authorization token belongs to an ADMIN", async () => {

    });

    // Add more tests!
  });

  // Add tests for other HTTP methods!

});
