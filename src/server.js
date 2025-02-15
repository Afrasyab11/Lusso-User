const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// POST endpoint to handle login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password match
  if (username === 'yeswanth' && password === 'cNgYF6ekdGKfhDp') {
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

