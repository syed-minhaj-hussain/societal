function handleOptions(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, ");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  //intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    //respond with 200
    res.send(200);
  } else {
    //move on
    next();
  }
}

module.exports = { handleOptions };
