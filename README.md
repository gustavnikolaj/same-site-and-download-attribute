Report: https://bugs.chromium.org/p/chromium/issues/detail?id=659554

----

When using Same-Site Lax or Strict on a cookie, it will not be passed when
following an `<a>`-tag with a `download` attribute.

I created a little node server that can illustrate this bug in Chrome 54.0.2840.71
on Linux and Windows.

You can "login" either with a Same-Site Lax or a Strict cookie, or with a plain
cookie.

On the login page, there's two links to a download, one with the download attribute
and one without, and lastly a logout link that will remove the cookie and let
you go back to the login page.

## Expected results:

For all combinations of cookie Same-Site values and presence of download-attrs
it should download the file.

## Actual Results:

- Same Site Lax: Downloads the file as expected when download attribute is not used. When it is used, it downloads the login page instead, as it will be redirected there because the cookie is not sent with the request.
- Same Site Strict: Same as Same Site Lax.
- No Same Site value: Works as expected.

# Start the server:

```
$ npm install
$ npm start
```

Go to http://localhost:8000 in your browser.
