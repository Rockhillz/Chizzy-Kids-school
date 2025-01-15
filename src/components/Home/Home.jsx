import React from 'react'
import Courosel from './Courosel'
import Carditem from '../CardList/Carditem'
import Blog from './Blog'
import Events from './Events'
import News from './News'
import MapSection from './MapSection'
import Contact from './Contact'

const Home = () => {
  return (
    <div>
      <Courosel/>
      <Carditem/>
      <Blog/>
      <Events/>
      <News/>
      <Contact />
    </div>
  )
}

export default Home