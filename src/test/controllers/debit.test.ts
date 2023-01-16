import chai from "chai";
import chaiHttp from "chai-http";
import { user1 } from "./user-sign-in-test-data";
import { debit, debit2, debit3 } from "./debit-data";
import server from "../../app";

chai.should();

const { expect } = chai;
chai.use(chaiHttp);

describe("Add debit Transaction", () => {
  let userToken: string;
  before((done) => {
    chai
      .request(server)
      .post("/api/v1/users/login")
      .set("Accept", "application/json")
      .send(user1)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data.token;
        done();
      });
  });
  it("should allow user with token send money", (done) => {
    chai
      .request(server)
      .post("/api/v1/debits")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(debit)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Money transferred successfully.");
        done();
      });
  });
  it("should not allow user send money with incomplete details", (done) => {
    chai
      .request(server)
      .post("/api/v1/debits")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(debit2)
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  it("should not allow user without token send money", (done) => {
    chai
      .request(server)
      .post("/api/v1/debits")
      .send(debit3)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
