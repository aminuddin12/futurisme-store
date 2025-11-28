import { http, HttpResponse } from 'msw';
import productsData from '../data/products.json';
import webConfigData from '../data/web-config.json';
import initialUsers from '../data/users.json'; // Data user awal

// Definisikan base URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper Validasi Keamanan
const isValidRequest = (request: Request) => {
  const publicKey = request.headers.get('x-api-public-key');
  const secretKey = request.headers.get('x-api-secret-key');
  // Untuk demo register/login, kita mungkin melonggarkan cek token Auth, 
  // tapi tetap cek API key
  if (publicKey !== 'pub_dev_1234567890') return false;
  if (secretKey !== 'sec_dev_abcdef123456') return false;
  return true;
};

// Helper DB User (Simulasi)
// Fungsi ini akan membaca dari localStorage browser jika ada, atau fallback ke file JSON
const getUsersDB = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('mock_users_db');
    if (stored) return JSON.parse(stored);
    // Jika belum ada di LS, inisialisasi dengan data JSON
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
  // --- ENDPOINT REGISTER ---
  http.post(`${apiUrl}/auth/register`, async ({ request }) => {
    // 1. Validasi Header API Key (Tanpa Bearer karena user belum login)
    const publicKey = request.headers.get('x-api-public-key');
    if (publicKey !== 'pub_dev_1234567890') {
       return new HttpResponse(JSON.stringify({ message: 'Invalid API Key' }), { status: 401 });
    }

    const body = await request.json() as any;
    const { name, email, password } = body;

    // 2. Validasi Input
    if (!name || !email || !password) {
      return new HttpResponse(JSON.stringify({ message: 'Data tidak lengkap' }), { status: 400 });
    }

    // 3. Cek Duplikasi Email di "Database"
    const users = getUsersDB();
    if (users.some((u: any) => u.email === email)) {
      return new HttpResponse(JSON.stringify({ message: 'Email sudah terdaftar' }), { status: 409 });
    }

    // 4. Buat User Baru
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password, // Di real app harus di-hash!
      role: 'member',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`, // Generate avatar lucu
      joinDate: new Date().toISOString().split('T')[0]
    };

    // 5. Simpan ke "Database" (LocalStorage)
    saveUserToDB(newUser);

    // 6. Return Success
    return HttpResponse.json({
      success: true,
      message: 'Registrasi berhasil',
      data: newUser
    });
  }),

  // --- ENDPOINT LOGIN ---
  http.post(`${apiUrl}/auth/login`, async ({ request }) => {
    const body = await request.json() as any;
    const { email, password } = body;

    const users = getUsersDB();
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
       return new HttpResponse(JSON.stringify({ message: 'Email atau password salah' }), { status: 401 });
    }

    // Return data user tanpa password
    const { password: _, ...userWithoutPass } = user;
    
    return HttpResponse.json({
      success: true,
      data: userWithoutPass,
      token: 'fake-jwt-token-123'
    });
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
    // Untuk config publik, validasi API key saja cukup
    return HttpResponse.json(webConfigData);
  }),
];