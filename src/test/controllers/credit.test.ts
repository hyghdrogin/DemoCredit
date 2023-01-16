import chai from "chai";
import chaiHttp from "chai-http";
import { user1 } from "./user-sign-in-test-data";
import { credit, credit2, credit3 } from "./credit-data";
import server from "../../app";

chai.should();

const { expect } = chai;
chai.use(chaiHttp);

describe("Add credit", () => {
  let token: string;
  before((done) => {
    chai
      .request(server)
      .post("/api/v1/users/login")
      .set("Accept", "application/json")
      .send(user1)
      .end((err, res) => {
        if (err) throw err;
        token = res.body.data.token;
        done();
      });
  });
  it("should allow user with token add money to his account", (done) => {
    chai
      .request(server)
      .post("/api/v1/credits/paystack/initialize")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(credit)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it("should not allow user add money to his account with incomplete details", (done) => {
    chai
      .request(server)
      .post("/api/v1/credits/paystack/initialize")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(credit2)
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  it("should not allow user without token add money to his account", (done) => {
    chai
      .request(server)
      .post("/api/v1/credits/paystack/initialize")
      .send(credit3)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
