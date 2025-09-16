import React, { createContext, useState, useEffect } from 'react'
import { login as loginService } from '../services/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verifica se há dados de usuário no localStorage ao carregar a aplicação
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [])

  const login = async (email, password) => {
    try {
      const response = await loginService(email, password);
      // Armazena os dados do usuário no localStorage
      localStorage.setItem('user', JSON.stringify(response.user))
      setUser(response.user);
    } catch (error) {
      console.error(error);
      alert('Falha no login!');
    }
  }

  const logout = () => {
    // Remove os dados do usuário do localStorage
    localStorage.removeItem('user');
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}