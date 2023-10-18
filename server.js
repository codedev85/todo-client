const express = require('express');
const app = express()const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/api/v1/authenticate/user', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.listen(8080, () => console.log('API is running on https://todo_project/api/v1/authenticate/user'));
