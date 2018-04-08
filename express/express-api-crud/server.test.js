const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const Task = require('./task');
const app = require('./server').app;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

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
               expect(res.body.result).toBe('OK');
            })
            .end(done);
    });
});

describe('Tasks case tests', () => {
    it('should return tasks', (done) => {
        request(app).get('/tasks')
            .expect(200)
            .expect((res) => {
               expect(res.body.tasks.length).toBe(2);
            })
            .end(done);
    });
});

describe('Tasks detail tests', () => {
  it('should return 404 with wrong id', (done) => {
      request(app).get('/tasks/666')
          .expect(404)
          .expect((res) => {
            expect(res.body.err.details).toBe('Id not valid');
          })
          .end(done);
  });

  it('should return data with valid id', (done) => {
      request(app).get(`/tasks/${tasks[0]._id.toHexString()}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.task._id).toBe(tasks[0]._id.toHexString());
            expect(res.body.task.name).toBe(tasks[0].name);
            expect(res.body.task.done).toBe(tasks[0].done);
          })
          .end(done);
  });
});



describe('Task delete tests', () => {
  it('should return 404 with wrong id', (done) => {
    request(app).delete('/tasks/666')
      .expect(404)
      .expect((res) => {
        expect(res.body.err.details).toBe('Id not valid');
      })
      .end(done);
  });

  it('should delete data with valid id', (done) => {
      let deletedId = tasks[0]._id.toHexString();
      request(app).delete(`/tasks/${tasks[0]._id}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.task._id).toContain(tasks[0]._id);
            expect(res.body.task.name).toBe(tasks[0].name);
            expect(res.body.task.done).toBe(tasks[0].done);
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            Task.findOne({_id: deletedId}).then((task) => {
              expect(task).toBe(null);
              done();
            }).catch((e) => done(e));
          });
  });
});


describe('New task tests', () => {

  it('should insert', (done) => {
    const newTask = {
      name: 'Third task',
      date: new Date(),
      done: false
    }

    request(app).post('/tasks/new')
      .type('form')
      .send(newTask)
      .expect(200)
      .expect((res) => {
        expect(res.body.task.name).toBe(newTask.name);
        expect(res.body.task.done).toBe(newTask.done);
        expect(res.body.task._id).not.toBe(null);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Task.find({name: newTask.name}).then((dbTasks) => {
          expect(dbTasks.length).toBe(1);
          expect(dbTasks[0].name).toBe(newTask.name);
          done();
        }).catch((e) => done(e));
      });
  });
});


describe('Task update tests', () => {
  it('should return 404 with wrong id', (done) => {
    request(app).put('/tasks/update/666')
      .expect(404)
      .expect((res) => {
        expect(res.body.err.details).toBe('Id not valid');
      })
      .end(done);
  });

 it('should update and return to task page', (done) => {
   tasks[1]._id = tasks[1]._id.toHexString();
   tasks[1].name = 'CHANGED';

   request(app).put(`/tasks/update/${tasks[1]._id}`)
     .type('form')
     .send(tasks[1])
     .expect(200)
     .expect((res) => {
       expect(res.body.task.name).toContain('CHANGED');
     })
     .end((err, res) => {
       if (err) {
         return done(err);
       }

    Task.findOne({_id: tasks[1]._id}).then((task) => {
         expect(task.name).toBe('CHANGED');
         done();
       }).catch((e) => done(e));
     });
 });
});
