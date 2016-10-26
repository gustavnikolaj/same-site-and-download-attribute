const app = require('express')();

app
  .use(require('cookie-parser')())
  .use(function (req, res, next) {
    console.log('%s: %s', req.method, req.url)
    next();
  })
  .get('/login', function (req, res, next) {
    res.send(`
      <div>
      <form action="/loginLax" method="POST">
        <button type="submit">Login Lax</button>
      </form>

      <form action="/login" method="POST">
        <button type="submit">Login</button>
      </form>
      </div>
    `)
  })
  .post('/login', function (req, res, next) {
    res.cookie('testCookie', 'normal', {
      path: '/'
    });
    res.redirect(302, '/');
  })
  .post('/loginLax', function (req, res, next) {
    res.cookie('testCookie', 'lax', {
      path: '/',
      sameSite: 'Lax'
    });
    res.redirect(302, '/');
  })
  .use(function (req, res, next) {
    if (!req.cookies.testCookie) {
      return res.redirect(302, '/login');
    }
    return next();
  })
  .get('/logout', function (req, res, next) {
    var cookieOpts = req.cookies.testCookie === 'lax' ? { sameSite: 'lax' } : {};
    res.cookie('testCookie', '', Object.assign(cookieOpts, {
      path: '/',
      expires: new Date(1)
    }));
    res.redirect(302, '/login');
  })
  .get('/', function (req, res, next) {
    res.send(`
      <a href="/download.txt" download>Download</a><br>
      <a href="/logout">Logout</a>
    `);
  })
  .get('/download.txt', function (req, res, next) {
    res.set('Content-Type', 'text/plain');
    res.end('Foo bar');
  });

app.listen(8000, () => console.log('listening on port 8000'));
