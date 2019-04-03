import * as request from "supertest"
import app from '../../src/app'

describe("GET /departament/public", () => {
    it("SHOULD return 200ok", async done => {
        request(app)
            .get("/departament/public")
            .end((err, res) => {
                expect(res.status).toBe(200);
                done();
            });
    });
});