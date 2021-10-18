// Template engine: Pug
// CSS framework: tailwind CSS

import Koa from "koa";
import path from "path";
import Pug from "koa-pug";

const app = new Koa();
new Pug({
  viewPath: path.resolve(__dirname, "./views"),
  app,
});

app.use(async (ctx) => {
  await ctx.render("index");
});

app.listen(5000);
