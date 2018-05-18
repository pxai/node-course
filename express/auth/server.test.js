const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./server');
const {Stock} = require('./models/stock');

const stocks = [{
  _id: new ObjectID(),
  name: 'AAPL',
  qty: 1,
  price: 4.5,
  id_user: 1
}, {
  _id: new ObjectID(),
  name: 'PIPR',
  qty: 1,
  price: 4.5,
  id_user: 1
}];

beforeEach((done) => {
  Stock.remove({}).then(() => {
    return Stock.insertMany(stocks);
  }).then(() => done());
});


describe('GET /stocks', () => {
	it('should return all stocks', (done) => {
		request(app)
			.get('/stocks')
			.expect(200)
			.expect((res) => {
				expect(res.body.stocks.length).toBe(2);
			})
			.end(done);
	
	});	
});

describe('GET /stocks/:id', () => {
	it('should return a valid stock', (done) => {
		request(app)
			.get(`/stocks/${stocks[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.stock.name).toBe(stocks[0].name);
			})
			.end(done);
	});

	it('should not return stock with invalid id', (done) => {
		request(app)
			.get('/stocks/666')
			.expect(404)
			.end(done);
	});
});

describe('POST /stocks', () => {
	it('should create a new stock', (done) => {
		const stock = { name: 'PX', qty: 1, price: 4.5, id_user: 1 }
		request(app)
			.post('/stocks')
			.send(stock)
			.expect(200)
			.expect((res) => {
				expect(res.body.stock.name).toBe(stock.name);
			})
			.end((err,res)=> {
				if(err) {
					return done(err);
				}
				Stock.find({name: stock.name}).then((stocks) => {
					expect(stocks.length).toBe(1);
					expect(stocks[0].name).toBe(stock.name);
					done();
				}).catch((e) => done(e));
			});
	});
/*
	it('should not create stock with invalid data', (done) => {
		request(app)
			.post('/stocks')
			.send({})
			.expect(400)
			.end((err,res) => {
				if (err) {
					return done(err);
				}
			Stock.find().then((stocks) => {
				expect(stocks.length).toBe(2);
			}).catch((e)=>done(e));
			})
			.end(done);

	});
*/
});
