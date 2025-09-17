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

  export const register = (email, password, name) => {
    return new Promise((resolve, reject) => {
      //Simula o tempo de rsposa da API
      setTimeout(() => {
        //1: Verificaria na back-end real se o email ja existe
        //2: salvaria o novo usuario no banco de dados
        // como nao possui back-end e simulado que sempre da certos os passos
        if(email && password && name) {
          resolve({
            message: 'Usuario registrado com uscesso! Voce ja pode fazer o login',
          })
        } else {
          reject(new Error ('Dados invalidos para registro'))
        }
      }, 1000)
    })
  }