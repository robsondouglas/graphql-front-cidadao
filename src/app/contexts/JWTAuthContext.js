import { createContext, useEffect, useReducer } from 'react';
import { MatxLoading } from 'app/components';
import {signIn, signUp, confirmSignup, refreshSignin, ressendCode, forgot, setPassword} from './../../auth';

const initialState = {
  usr: null,
  isInitialised: false,
  isAuthenticated: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user, name } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, usr: {user, name} };
    }

    case 'LOGIN': {
      const { user, name } = action.payload;
      return { ...state, isAuthenticated: true, usr:{user, name} };
    }

    case 'CHANGE': {
      const { user, name } = action.payload;
      return { ...state, mustChangePassword:true, isAuthenticated: false, usr:{user, name} };
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null };
    }

    case 'REGISTER': {
      // const { user } = action.payload;
      // return { ...state, isAuthenticated: true, user };
      return { ...state, isAuthenticated: false, user: null };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => {},
  logout: () => {},
  register: () => {},
  confirmCode: ()=>{},
  reload: () => {},
  ressendCode: ()=>{},
  forgot: ()=>{},
  change: ()=>{}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password, remember) => {
    const res = await signIn(email, password, remember);

    if( res.accessToken )
    {dispatch({ type: 'LOGIN', payload: {user: res.user, name: res.name}});}
    else
    { dispatch({ type: 'CHANGE', payload: {user: res.email, name: res.name}}); }
  };

  const register = async (itm) => {
    await signUp(itm);    
    dispatch({ type: 'REGISTER', payload: {  } });
  };

  const change = async (itm) => {
    try{
      const res = await setPassword(itm);
      dispatch({ type: 'LOGIN', payload: {user: res.user, name: res.name}});
    }
    catch(ex)
    { 
      console.log(ex)
      throw new Error(ex) 
    }
    
  };

  const confirmCode = (email, code) =>  confirmSignup(email, code); 
  const logout      = ()            => dispatch({ type: 'LOGOUT' });
  
  

  useEffect(() => {
    (async () => {
        const res = await refreshSignin();
        
        if(res)
        { dispatch({ type: 'INIT', payload: {...res, isAuthenticated: true}}); }
        else
        { dispatch({ type: 'INIT', payload: {isAuthenticated: false} }) }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialised) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout, register, change, confirmCode, ressendCode, forgot }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
