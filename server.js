const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
// eslint-disable-next-line import/extensions
const { addingTicket, allTickets, statusСhange, delTicket, changeTicket, changeFull } = require('./action/data.js');

const app = new Koa();

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use(cors({
  origin() {
    return '*';
  },
  allowMethods: ['GET', 'POST', 'DELETE'],
}));

// GET
app.use(async (ctx, next) => {
  if (ctx.request.method !== 'GET') {
    next();
    return;
  }
  const { method } = ctx.request.query;
  let body;
  try {
    if (method === 'allTickets') {
      body = allTickets();
      ctx.response.body = body;
      ctx.response.status = 200;
      return;
    }
    ctx.response.status = 400;
    ctx.response.body = 'Некорректный запрос';
  } catch (error) {
    console.log(error);
    ctx.response.status = 500;
  }
});

// POST
app.use(async (ctx, next) => {
  if (ctx.request.method !== 'POST') {
    next();
    return;
  }
  const { method } = ctx.request.query;

  let id; let status; let name; let description; let created; let full;

  try {
    switch (method) {
      case 'createTicket':
        ({ status, full, name, description, created } = ctx.request.body);
        if (addingTicket(status, full, name, description, created)) {
          ctx.response.status = 201;
          return;
        }
        ctx.response.status = 501;
        ctx.response.body = 'Объект не создан';
        return;
      case 'changeTicket':
        ({ id, name, description, created } = ctx.request.body);
        if (changeTicket(id, name, description, created)) {
          ctx.response.status = 201;
          return;
        }
        ctx.response.status = 422;
        ctx.response.body = 'Объект не найден';
        return;
      case 'statusСhange':
        ({ id } = ctx.request.body);
        if (statusСhange(id)) {
          ctx.response.status = 201;
          return;
        }
        ctx.response.status = 422;
        ctx.response.body = 'Объект не найден';
        return;
      case 'changeFull':
        ({ id } = ctx.request.body);
        if (changeFull(id)) {
          ctx.response.status = 201;
          return;
        }
        ctx.response.status = 422;
        ctx.response.body = 'Объект не найден';
        return;
      default:
        ctx.response.status = 400;
        ctx.response.body = 'Некорректный запрос';
        return;
    }
  } catch (error) {
    console.log(error);
    ctx.response.status = 500;
  }
});

// DELETE
app.use(async (ctx, next) => {
  if (ctx.request.method !== 'DELETE' && ctx.request.query.method !== 'ticketById') {
    ctx.response.status = 405;
    next();
    return;
  }
  try {
    const id = Number(ctx.request.query.id);
    if (!id) {
      ctx.response.status = 422;
      ctx.response.body = 'Отсутствует идентификатор';
      return;
    }
    if (delTicket(id)) {
      ctx.response.status = 200;
      return;
    }
    ctx.response.status = 422;
    ctx.response.body = 'Объект не найден';
  } catch (error) {
    console.log(error);
    ctx.response.status = 500;
  }
});

// Server
const server = http.createServer(app.callback());

const port = 7070;

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Сервер запущен. Порт: ${port}`);
});
