const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Home Route
app.get('/', (req, res) => {
  // Get the list of uploaded mp3 files
  const files = fs.readdirSync('./public/uploads').filter(file => file.endsWith('.mp3'));
  
  res.render('index', { files });
});

// Upload Route
app.post('/upload', upload.single('mp3file'), (req, res) => {
  res.redirect('/');
});

// Playlist Route
app.get('/playlist', (req, res) => {
  const files = fs.readdirSync('./public/uploads').filter(file => file.endsWith('.mp3'));
  
  res.render('playlist', { files });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
