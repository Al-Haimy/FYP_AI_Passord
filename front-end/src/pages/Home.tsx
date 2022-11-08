import React from 'react'
import { Dispatch, State } from '../Auth/AuthProvider'

const Home = ({ handler }: { handler: Dispatch }, {token}:State) => {
  return (
    <div>Welcome to the homepage.</div>
  )
}

export default Home