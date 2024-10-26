const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Ruta al archivo db.json
const middlewares = jsonServer.defaults();

// Reglas de autenticación
const rules = auth.rewriter({
  // Solo usuarios autenticados pueden acceder a productos
  products: 644, // 6 = solo usuarios autenticados pueden ver (GET)
  users: 600, // Evitar que los usuarios accedan a otros usuarios
});

// Usar middlewares de JSON Server y json-server-auth
server.use(middlewares);
server.use(rules);

server.db = router.db;

server.use(auth);
server.use(router);

// Iniciar el servidor en el puerto 3001
server.listen(3001, () => {
  console.log("JSON Server with Auth running on port 3001");
});
