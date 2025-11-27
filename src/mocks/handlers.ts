import { http, HttpResponse } from 'msw';
import productsData from '../data/products.json';
import webConfigData from '../data/web-config.json'; // Import data config

// Definisikan base URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper Validasi Keamanan
const isValidRequest = (request: Request) => {
  const publicKey = request.headers.get('x-api-public-key');
  const secretKey = request.headers.get('x-api-secret-key');
  const authHeader = request.headers.get('Authorization');

  // Validasi Dummy (sesuai .env development)
  if (publicKey !== 'pub_dev_1234567890') return false;
  if (secretKey !== 'sec_dev_abcdef123456') return false;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  
  const token = authHeader.split(' ')[1];
  if (token !== 'bearer_token_dev_xyz') return false;

  return true;
};

export const handlers = [
  // --- ENDPOINT PRODUK ---
  http.get(`${apiUrl}/products`, ({ request }) => {
    if (!isValidRequest(request)) {
      return new HttpResponse(
        JSON.stringify({ success: false, message: 'Unauthorized: Check headers' }), 
        { status: 401 }
      );
    }
    return HttpResponse.json({ success: true, data: productsData });
  }),

  // --- ENDPOINT WEB CONFIG ---
  http.get(`${apiUrl}/web-config`, ({ request }) => {
    if (!isValidRequest(request)) {
      return new HttpResponse(
        JSON.stringify({ success: false, message: 'Unauthorized' }), 
        { status: 401 }
      );
    }
    // Return data config yang sudah kita buat sebelumnya
    return HttpResponse.json(webConfigData);
  }),
];