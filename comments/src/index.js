const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
require('dotenv').config();


app.use(express.json());

const commentRoutes = require('../src/routes/commentRoutes');
app.use('/comments', commentRoutes);

app.listen(port, () => {
  console.log(`Comments service is running on port ${port}`);
});
