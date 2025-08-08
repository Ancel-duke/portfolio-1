const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Log the contact form submission
  console.log('Contact form submission:', {
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  });
  
  // In a real application, you would:
  // 1. Validate the input
  // 2. Send an email notification
  // 3. Store in database
  // 4. Handle spam protection
  
  // For now, just return success
  res.status(200).json({
    success: true,
    message: 'Message sent successfully!'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
