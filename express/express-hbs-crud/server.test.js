const expect = require('expect');
const request = require('supertest');
const  app = require('./server').app;

describe('Simple home requests', ()=> {

    it('should return home', (done) => {
        request(app).get('/')
            .expect(200)
            .expect((res) => {
               expect(res.text).toContain('Welcome to Tasks App')
            })
            .end(done);
    });

    it('should return tasks', (done) => {
        request(app).get('/tasks')
            .expect(200)
            .expect((res) => {
               expect(res.text).toContain('Tasks List')
            })
            .end(done);
    });

});
