const FAKE_USER = {
    email: 'teste@teste.com',
    password: '123',
  };
  
  export const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simula o delay de uma chamada de API
      setTimeout(() => {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
          // Colocar aqui um token JWT
          resolve({
            token: 'fake-jwt-token',
            user: {
              name: 'Usuário de Teste',
              email: 'teste@teste.com',
            },
          });
        } else {
          reject(new Error('Credenciais inválidas.'));
        }
      }, 1000)
    })
  }