import { Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import NavigationBar from './components/Navbar/NavigationBar'
import Home from './components/Home/Home'
import Events from './components/Events/Events'
import SchoolPortal from './components/SchoolPortal/SchoolPortal'
import AboutUs from './components/AboutUs/AboutUs'
import OurGallery from './components/OurGallery/OurGallery'
import News from './components/News/News'
import Pta from './components/P.T.A/Pta'

function App() {

  return (
    <>
    <NavigationBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/school' element={<SchoolPortal />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/events' element={<Events />} />
        <Route path='/ourGallery' element={<OurGallery />} />
        <Route path='/news' element={<News />} />
        <Route path='/pta' element={<Pta />} />

      </Routes>
    <Footer />
    </>
  )
}

export default App
