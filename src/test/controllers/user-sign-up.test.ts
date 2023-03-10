import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";
import { user1, user2, user3 } from "./user-sign-up-test-data";

chai.should();
chai.use(chaiHttp);
describe("Should test all users", async () => {
  describe("/api/v1/users/register should create a user", () => {
    it("it should create a user with complete details successfully", (done) => {
      chai
        .request(server)
        .post("/api/v1/users/register")
        .set("Accept", "application/json")
        .send(user1)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("statusCode").eql(201);
          res.body.should.have.property("message").eql("User created Successfuly, Kindly log in!");
          done();
        });
    });
    it("it should not create a user with incomplete details", (done) => {
      chai
        .request(server)
        .post("/api/v1/users/register")
        .set("Accept", "application/json")
        .send(user2)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("it should not register a user with an already registered email", (done) => {
      chai
        .request(server)
        .post("/api/v1/users/register")
        .set("Accept", "application/json")
        .send(user3)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
