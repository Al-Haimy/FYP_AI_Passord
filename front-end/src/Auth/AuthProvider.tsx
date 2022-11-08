import React, { createContext, useContext, useReducer} from 'react'
import type {ReactNode } from 'react';




const defaultState = {
  token: 'empty',
}

export type Action = 'LOGIN' | 'LOGOUT';
export type Dispatch = (action:Action) => void
export type State = typeof defaultState


const AuthContext = createContext<
{state:State, dispatch:Dispatch} | undefined
>(undefined);

function authReducer(state:State, action: Action){
  switch(action) {
    case 'LOGIN':
      
      
      return {
        token: 'exist'
      }
      case 'LOGOUT':

        localStorage.removeItem("auth");
        localStorage.removeItem("trained");
        localStorage.removeItem("refresh");

        return {
          token: 'empty'
    
        }
  }
}





const AuthProvider = ({children} : {children:ReactNode}) => {
  const [state, dispatch ]= useReducer(authReducer, defaultState)
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside CounterProvider')
  return context
}