const expect = require('expect');
const request = require('supertest');
var app = require('./server').app;

describe('Simple home requests', ()=> {

    it('should return home', (done) => {
        request(app).get('/')
            .expect('Hell of a World')
            .end(done);
    });

    it('should return 200 code', (done) => {
        request(app).get('/ok')
            .expect(200)
            .expect('All right all right all right')
            .end(done);
    })
});

describe('Requests for json content', () => {
    it('should return data', (done) => {
        request(app).get('/data')
        .expect(200)
        .expect((res) => {
            expect(res.body).toInclude({id:42, name : 'Asimov'});
        })
        .end(done);
    })
});