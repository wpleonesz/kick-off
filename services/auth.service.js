import httpRequest from '@lib/http-request';

const login = async (email, password) => {
  try {
    console.log('[AuthService] Intentando login con:', email);
    const response = await httpRequest.post('/api/auth/login', { email, password });
    console.log('[AuthService] Respuesta del servidor:', response);
    return {
      ok: response.ok,
      data: response.data,
    };
  } catch (error) {
    console.error('[AuthService] Error:', error);
    return {
      ok: false,
      error: error.message || 'Error al iniciar sesión',
    };
  }
};

const logout = async () => {
  try {
    console.log('[AuthService] Intentando logout');
    await httpRequest.post('/api/auth/logout', {});
    return { ok: true };
  } catch (error) {
    console.error('[AuthService] Error en logout:', error);
    return { ok: false };
  }
};

const getCurrentUser = async () => {
  try {
    const response = await httpRequest.get('/api/auth/me');
    return {
      ok: response.ok,
      data: response.data,
    };
  } catch (error) {
    console.error('[AuthService] Error getting current user:', error);
    return { ok: false };
  }
};

const register = async (payload) => {
  try {
    const response = await httpRequest.post('/api/auth/register', payload);
    return {
      ok: response.ok,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message || 'Error al registrarse',
    };
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
