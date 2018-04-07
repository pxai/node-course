const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const Task = require('./task');
const app = require('./server').app;

const tasks = [{
  _id: new ObjectID(),
  name: 'First task',
  date: new Date(),
  done: false
}, {
  _id: new ObjectID(),
  name: 'Second task',
    date: new Date(),
  done: true
}];


beforeEach((done) => {
  Task.remove({})
  .then(() => {
    return Task.insertMany(tasks);
  }).then(() => done());
});


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

  it('should return data with valid id', (done) => {
      request(app).get(`/tasks/detail/${tasks[0]._id}`)
          .expect(200)
          .expect((res) => {
            expect(res.text).toContain('<h3>Task: First task</h3>');
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

  it('should delete data with valid id', (done) => {
      request(app).get(`/tasks/delete/${tasks[0]._id}`)
          .expect(302)
          .expect((res) => {
            expect(res.text).toContain('Found. Redirecting to /tasks');
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

 it('should return the update form', (done) => {
   request(app).get(`/tasks/update/${tasks[1]._id}`)
    .expect(200)
    .expect((res) => {
      expect(res.text).toContain('Update task');
      expect(res.text).toContain('<form name=\"update\" method=\"post\" action=\"/tasks/update\">');
      expect(res.text).toContain(`<input type=\"hidden\" name=\"_id\" value=\"${tasks[1]._id}\">`)
    })
    .end(done);
 });

 it('should update and return to task page', (done) => {

   request(app).post('/tasks/update')
     .send(tasks[0])
     .expect(302)
     .expect((res) => {
       expect(res.text).toContain('Found. Redirecting to /tasks');
     })
     .end(done);
 });
})
