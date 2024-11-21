import React from 'react'
import Courosel from './Courosel'
import Carditem from '../CardList/Carditem'
import Blog from './Blog'
import Events from './Events'
import News from './News'

const Home = () => {
  return (
    <div>
      <Courosel/>
      <Carditem/>
      <Blog/>
      <Events/>
      <News/>
    </div>
  )
}

export default Home