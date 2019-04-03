import * as request from 'supertest'
import app from '../../src/app'

describe("POST /departament", () => {
    it("Creando un departamento", done => {
        var dep = {
            'name': 'Vichada'
        };
        request(app)
            .post('/departament')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTNjYmE3OTAwNTZkMTYwZmY4M2E3YiIsImFkbWluIjp0cnVlLCJpYXQiOjE1NTQzMzE3NTh9.xot31YweXCcK_8Fimbaq5R1uzxZ7sL8DZmdaEs9dyas')
            .send(dep)
            .expect(200, done)
    });
});