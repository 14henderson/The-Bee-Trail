const express = require('express');

var path = require('path');
const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || 3000

app.use('/', express.static('static'))
//app.use('/favicon.ico', express.static('assets/favicon.ico'));

app.get('/', (req, res) => {
  res.set('X-Frame-Options', 'deny');
  res.set('X-Content-Type-Options', 'nosniff');
  //res.set('Content-Security-Policy', ')
  res.set('X-Permitted-Cross-Domain-Policies', 'none');
  res.set('Cross-Origin-Embedder-Policy', 'require-corp');
  res.set('Cross-Origin-Opener-Policy', 'same-origin');
  res.set('Cross-Origin-Resource-Policy', 'same-origin');
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
