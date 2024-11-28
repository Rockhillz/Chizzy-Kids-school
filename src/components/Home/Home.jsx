import React from 'react'
import Courosel from './Courosel'
import Carditem from '../CardList/Carditem'
import Blog from './Blog'
import Events from './Events'
import News from './News'
import MapSection from './MapSection'

const Home = () => {
  return (
    <div>
      <Courosel/>
      <Carditem/>
      <Blog/>
      <Events/>
      <News/>
      <MapSection/>
    </div>
  )
}

export default Home