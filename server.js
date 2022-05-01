var http = require('http');
const schemaControl = require('./index');

http
  .createServer(function (req, res) {
    res.write(
      JSON.stringify({
        value: 'this is string',
        schema: 'string',
        result: schemaControl('string', 'this is string'),
      })
    );
    res.end();
  })
  .listen(parseInt(process.argv[2], 10));
