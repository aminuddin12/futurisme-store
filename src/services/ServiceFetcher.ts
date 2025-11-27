/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * ServiceFetcher.ts
 * -----------------
 * Modul ini berfungsi sebagai lapisan abstraksi untuk komunikasi API.
 * Menangani injeksi header keamanan, parsing environment variables,
 * dan standarisasi error handling.
 */

// Custom Error Class untuk memudahkan debugging di UI
export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

// Mengambil konfigurasi dari Environment Variables
const ENV = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_API_PUBLIC_KEY || '',
  SECRET_KEY: process.env.NEXT_PUBLIC_API_SECRET_KEY || '',
  TOKEN: process.env.NEXT_PUBLIC_API_TOKEN || '',
};

class ServiceFetcher {
  /**
   * Menyusun header keamanan standar untuk setiap request.
   */
  private getHeaders(customHeaders: HeadersInit = {}): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-public-key': ENV.PUBLIC_KEY,
      'x-api-secret-key': ENV.SECRET_KEY,
      'Authorization': `Bearer ${ENV.TOKEN}`,
      ...customHeaders,
    };
  }

  /**
   * Core function untuk melakukan fetch.
   * Tidak perlu dipanggil langsung, gunakan method get/post di bawah.
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Normalisasi endpoint (menghapus slash di awal jika ada untuk mencegah double slash)
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${ENV.BASE_URL}${cleanEndpoint}`;

    const config: RequestInit = {
      ...options,
      headers: this.getHeaders(options.headers || {}),
    };

    try {
      const response = await fetch(url, config);

      // 1. Handle HTTP Errors (Status code selain 2xx)
      if (!response.ok) {
        let errorBody;
        try {
          errorBody = await response.json();
        } catch {
          errorBody = { message: response.statusText };
        }

        // Lempar error khusus
        throw new ApiError(
          response.status,
          errorBody.message || 'Terjadi kesalahan pada server',
          errorBody
        );
      }

      // 2. Handle Success Data
      // Kita asumsikan response selalu JSON
      const data = await response.json();
      return data as T;

    } catch (error) {
      // Jika error sudah bertipe ApiError, lempar ulang
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Jika error jaringan / offline
      throw new ApiError(
        0, 
        error instanceof Error ? error.message : 'Gagal terhubung ke layanan (Network Error)'
      );
    }
  }

  // --- Public Methods (Kode Singkat untuk Penggunaan) ---

  /**
   * Melakukan GET request.
   * Contoh: service.get<Product[]>('/products')
   */
  public get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  /**
   * Melakukan POST request dengan body JSON.
   * Contoh: service.post('/login', { username, password })
   */
  public post<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // Bisa ditambahkan put, patch, delete sesuai kebutuhan...
}

// Export instance tunggal agar tidak perlu 'new' di setiap file
export const service = new ServiceFetcher();