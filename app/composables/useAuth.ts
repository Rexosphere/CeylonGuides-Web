/**
 * Auth Composable for CeylonGuide
 * Provides authentication state management and API calls
 */

// User type definition
export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  auth_provider?: string
}

// API Request/Response types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name?: string
}

export interface AuthResponse {
  success: boolean
  data: {
    user: User
    token: string
  }
}

export interface UserResponse {
  success: boolean
  data: {
    user: User
  }
}

// Auth state - using useState for SSR-friendly state
const useAuthState = () => {
  const user = useState<User | null>('auth_user', () => null)
  const token = useState<string | null>('auth_token', () => null)
  const loading = useState<boolean>('auth_loading', () => false)
  const initialized = useState<boolean>('auth_initialized', () => false)
  
  return { user, token, loading, initialized }
}

/**
 * Main auth composable
 */
export function useAuth() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase
  const router = useRouter()
  
  const { user, token, loading, initialized } = useAuthState()
  
  // Computed property for authentication status
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  
  /**
   * Initialize auth state from localStorage (client-side only)
   */
  const initAuth = async () => {
    if (import.meta.server || initialized.value) return
    
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      token.value = storedToken
      await fetchUser()
    }
    initialized.value = true
  }
  
  /**
   * Fetch current user from API
   */
  const fetchUser = async (): Promise<User | null> => {
    if (!token.value) return null
    
    loading.value = true
    try {
      const response = await $fetch<UserResponse>(`${baseUrl}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      
      if (response.success && response.data?.user) {
        user.value = response.data.user
        return response.data.user
      }
      return null
    } catch (error) {
      console.error('Failed to fetch user:', error)
      // Token might be invalid, clear it
      await logout()
      return null
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Login with email and password
   */
  const login = async (credentials: LoginRequest): Promise<{ success: boolean; error?: string }> => {
    loading.value = true
    try {
      const response = await $fetch<AuthResponse>(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: credentials
      })
      
      if (response.success && response.data) {
        user.value = response.data.user
        token.value = response.data.token
        
        // Persist token in localStorage
        if (import.meta.client) {
          localStorage.setItem('auth_token', response.data.token)
        }
        
        return { success: true }
      }
      
      return { success: false, error: 'Login failed' }
    } catch (error: any) {
      console.error('Login error:', error)
      const message = error?.data?.message || error?.message || 'Invalid email or password'
      return { success: false, error: message }
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Register new user
   */
  const register = async (data: RegisterRequest): Promise<{ success: boolean; error?: string }> => {
    loading.value = true
    try {
      const response = await $fetch<AuthResponse>(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
      
      if (response.success && response.data) {
        user.value = response.data.user
        token.value = response.data.token
        
        // Persist token in localStorage
        if (import.meta.client) {
          localStorage.setItem('auth_token', response.data.token)
        }
        
        return { success: true }
      }
      
      return { success: false, error: 'Registration failed' }
    } catch (error: any) {
      console.error('Registration error:', error)
      const message = error?.data?.message || error?.message || 'Registration failed. Email may already be in use.'
      return { success: false, error: message }
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Logout user
   */
  const logout = async () => {
    user.value = null
    token.value = null
    
    if (import.meta.client) {
      localStorage.removeItem('auth_token')
    }
    
    // Redirect to home
    await router.push('/')
  }
  
  // Initialize auth on client-side
  if (import.meta.client) {
    initAuth()
  }
  
  return {
    // State
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    isAuthenticated,
    
    // Methods
    login,
    register,
    logout,
    fetchUser,
    initAuth
  }
}
