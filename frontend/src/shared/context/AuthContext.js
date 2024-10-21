import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: ( token) => {}, 
  logout: () => {}
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        userId: action.userId,
        token: action.token
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        token: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    userId: null,
    token: null
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      dispatch({ 
        type: 'LOGIN', 
        userId: storedData.userId, 
        token: storedData.token 
      });
    }
  }, []);

  const login = (userId, token) => {
    localStorage.setItem('userData', JSON.stringify({ userId, token }));
    dispatch({ type: 'LOGIN', userId, token });
  };

  const logout = () => {
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: authState.isLoggedIn,
        userId: authState.userId,
        token: authState.token,
        login: login,
        logout: logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};