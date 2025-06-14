// Removido o armazenamento de dados do usuário no localStorage para máxima segurança
export const storage = {
  setUser: () => {}, // Não faz nada
  getUser: () => null, // Sempre retorna null
  removeUser: () => {}, // Não faz nada
  clearAll: () => {}, // Não faz nada
};
