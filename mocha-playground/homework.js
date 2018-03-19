const random = require('./random');

for (let i = 0; i<10;i++)
  console.log(random.between(10,100)+ " "+random.plusOrMinus()+" " + random.between(10,100));
