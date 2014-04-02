
# koa-write

  Write to koa bodies in generator style, respecting back pressure and
  throwing on closed sockets.

## Example

```js
var koa = require('koa');
var co = require('co');
var write = require('koa-write');
var PassThrough = require('stream').PassThrough;
var wait = require('co-wait');

var app = koa();
app.use(function(){
  var ctx = this;
  ctx.body = PassThrough();

  co(function*(){
    for (var i = 0; i < 100; i++) {
      yield write(ctx, Date.now().toString());
    }
  }, this.onerror);
});
```

## API

### write(ctx, chunk)

  Write `chunk` to `ctx`.
  
  Yields as soon as you're good to write more.

  Throws when the socket is already closed, so it doesn't make sense to write
  more.

## Why not just co-write?

  [co-write](https://github.com/juliangruber/co-write) writes to streams and
  does the same http socket handling, however it expects to be passed an http
  response object for that to work. In the situation where you have
  `stream.pipe(res)` you'll want to write to `stream`, however end when
  `res.socket` ends.

## Installation

```bash
$ npm install koa-write
```

## License

  MIT

