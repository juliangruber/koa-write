var write = require('co-write');

module.exports = write;

/**
 * Write `chunk` to `ctx` and throw if the request ended.
 *
 * @param {Context} ctx
 * @param {Mixed} chunk
 */

function write(ctx, chunk){
  if (!ctx.res.socket.writable) {
    var err = new Error('write after end');
    err.status = 200;
    throw err;
  }
  yield write(ctx.body, chunk);
};

