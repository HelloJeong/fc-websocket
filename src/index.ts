// Template engine: Pug
// CSS framework: tailwind CSS

import Koa from "koa";
import path from "path";
import Pug from "koa-pug";
import serve from "koa-static";
import mount from "koa-mount";
import route from "koa-route";
import websockify from "koa-websocket";

const app = websockify(new Koa());
new Pug({
  viewPath: path.resolve(__dirname, "./views"),
  app,
});

app.use(mount("/public", serve("src/public")));

app.use(async (ctx) => {
  await ctx.render("index");
});

// Using routes
app.ws.use(
  route.all("/ws", (ctx) => {
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    // ctx.websocket.send("Hello World");
    ctx.websocket.on("message", (data) => {
      // do something with the message from client
      if (typeof data !== "string") {
        return;
      }

      const { message, nickname } = JSON.parse(data);

      // broadcast
      const { server } = app.ws;

      if (!server) {
        return;
      }

      server.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            nickname,
            message,
          })
        );
      });

      // unicast
      // ctx.websocket.send(
      //   JSON.stringify({
      //     nickname,
      //     message,
      //   })
      // );
    });
  })
);

app.listen(5000);
