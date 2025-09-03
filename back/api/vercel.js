import app from './index.js';

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Pass the request to the Express app
  return new Promise((resolve) => {
    const expressRes = {
      ...res,
      status: (code) => {
        res.status(code);
        return expressRes;
      },
      json: (data) => {
        res.json(data);
        resolve();
        return expressRes;
      },
      send: (data) => {
        res.send(data);
        resolve();
        return expressRes;
      },
      end: () => {
        res.end();
        resolve();
        return expressRes;
      }
    };
    
    app(req, expressRes);
  });
}

export const config = {
  api: {
    bodyParser: true,
  },
};