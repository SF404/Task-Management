const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors({
//   origin: 'https://task-management-uafi.vercel.app/',
// }));
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(bodyParser.json());


app.use('/api/auth', userRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
