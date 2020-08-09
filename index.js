const app = require('./src/app');

app.listen(8000, async (error) => {
  if (error) return console.log(error); //eslint-disable-line
  console.log(`Running [✔] in port: [${8000}]`); //eslint-disable-line
});
