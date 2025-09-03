import express from 'express';

const router = express.Router();

// GET /health - Health check endpoint
router.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'German Practice API is running'
  });
});

export default router;