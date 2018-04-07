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
});

describe('Tasks case tests', () => {
    it('should return tasks', (done) => {
        request(app).get('/tasks')
            .expect(200)
            .expect((res) => {
               expect(res.text).toContain('Tasks List')
            })
            .end(done);
    });
});

describe('Tasks detail tests', () => {
  it('should return 404 with wrong id', (done) => {
      request(app).get('/tasks/detail/666')
          .expect(404)
          .expect((res) => {
            expect(res.text).toContain('<h2>Error</h2>');
            expect(res.text).toContain('Id not valid');
          })
          .end(done);
  });
});

describe('Task delete tests', () => {
  it('should return 404 with wrong id', (done) => {
    request(app).get('/tasks/delete/666')
      .expect(404)
      .expect((res) => {
        expect(res.text).toContain('<h2>Error</h2>');
        expect(res.text).toContain('Id not valid');
      })
      .end(done);
  });
});

describe('New task tests', () => {
  it('should return new task page', (done) => {
    request(app).get('/tasks/new')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Add Task');
        expect(res.text).toContain('<form name=\"new\" method=\"post\" action=\"/tasks/new\">');
      })
      .end(done);
  });

})

describe('Task update tests', () => {
  it('should return 404 with wrong id', (done) => {
    request(app).get('/tasks/update/666')
      .expect(404)
      .expect((res) => {
        expect(res.text).toContain('<h2>Error</h2>');
        expect(res.text).toContain('Id not valid');
      })
      .end(done);
  });

})
