import { http, HttpResponse } from 'msw';
import productsData from '../data/products.json';
import webConfigData from '../data/web-config.json';
import initialUsers from '../data/users.json';
import flashSaleData from '../data/flash-sale.json'; // Import data baru

// Definisikan base URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper Validasi Keamanan (Sama seperti sebelumnya)
const isValidRequest = (request: Request) => {
  const publicKey = request.headers.get('x-api-public-key');
  const secretKey = request.headers.get('x-api-secret-key');
  if (publicKey !== 'pub_dev_1234567890') return false;
  if (secretKey !== 'sec_dev_abcdef123456') return false;
  return true;
};

const getUsersDB = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('mock_users_db');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('mock_users_db', JSON.stringify(initialUsers));
    return initialUsers;
  }
  return initialUsers;
};

const saveUserToDB = (newUser: any) => {
  if (typeof window !== 'undefined') {
    const currentUsers = getUsersDB();
    const updatedUsers = [...currentUsers, newUser];
    localStorage.setItem('mock_users_db', JSON.stringify(updatedUsers));
    return true;
  }
  return false;
};

export const handlers = [
  // --- ENDPOINT AUTH (Register & Login) - Tetap Sama ---
  http.post(`${apiUrl}/auth/register`, async ({ request }) => {
    const publicKey = request.headers.get('x-api-public-key');
    if (publicKey !== 'pub_dev_1234567890') {
       return new HttpResponse(JSON.stringify({ message: 'Invalid API Key' }), { status: 401 });
    }
    const body = await request.json() as any;
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return new HttpResponse(JSON.stringify({ message: 'Data tidak lengkap' }), { status: 400 });
    }
    const users = getUsersDB();
    if (users.some((u: any) => u.email === email)) {
      return new HttpResponse(JSON.stringify({ message: 'Email sudah terdaftar' }), { status: 409 });
    }
    const newUser = {
      id: `user_${Date.now()}`,
      name, email, password, role: 'member',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      joinDate: new Date().toISOString().split('T')[0]
    };
    saveUserToDB(newUser);
    return HttpResponse.json({ success: true, message: 'Registrasi berhasil', data: newUser });
  }),

  http.post(`${apiUrl}/auth/login`, async ({ request }) => {
    const body = await request.json() as any;
    const { email, password } = body;
    const users = getUsersDB();
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
       return new HttpResponse(JSON.stringify({ message: 'Email atau password salah' }), { status: 401 });
    }
    const { password: _, ...userWithoutPass } = user;
    return HttpResponse.json({ success: true, data: userWithoutPass, token: 'fake-jwt-token-123' });
  }),

  // --- ENDPOINT PRODUK ---
  http.get(`${apiUrl}/products`, ({ request }) => {
    if (!isValidRequest(request)) {
      return new HttpResponse(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401 });
    }
    return HttpResponse.json({ success: true, data: productsData });
  }),

  // --- ENDPOINT WEB CONFIG ---
  http.get(`${apiUrl}/web-config`, ({ request }) => {
    return HttpResponse.json(webConfigData);
  }),

  // --- ENDPOINT FLASH SALE (NEW) ---
  http.get(`${apiUrl}/flash-sale`, ({ request }) => {
    if (!isValidRequest(request)) {
      return new HttpResponse(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401 });
    }
    return HttpResponse.json({ success: true, data: flashSaleData });
  }),
];