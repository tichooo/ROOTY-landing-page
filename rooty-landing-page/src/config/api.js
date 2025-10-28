// API Configuration
// Update this URL after deploying your backend to Render

const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.onrender.com' // Replace with your Render URL
    : 'http://localhost:4000');

export default API_BASE_URL;
