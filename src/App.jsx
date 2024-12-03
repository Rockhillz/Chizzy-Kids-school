import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import NavigationBar from './components/Navbar/NavigationBar';
import Home from './components/Home/Home';
import Events from './components/Events/Events';
import SchoolPortal from './components/SchoolPortal/SchoolPortal';
import AboutUs from './components/AboutUs/AboutUs';
// import News from './components/News/News';
// import Pta from './components/P.T.A/Pta';
import OurGalleryList from './components/OurGallery/OurGalleryList';
import ToggleFormImage from './components/Home/ToggleFormIcon';
import TeacherDash from './components/Dashboards/TeachersDashBoard/TeacherDash'
// import StudentDash from './components/Dashboards/StudentDasboard/StudentDash'
import Wildcard from './components/404Page/Wildcard';
import './App.css';




function App() {

  return (
    <>
      <div className="app-wrapper"> {/* Set the footer to the bottom with */}
        <NavigationBar />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/school' element={<SchoolPortal />} />
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path='/events' element={<Events />} />
            <Route path='/ourGallery' element={<OurGalleryList />} />
            <Route path='/teacher-dashboard' element={<TeacherDash />} />
            {/* <Route path='/student-dashboard' element={<StudentDash />} /> */}
            {/* <Route path='/news' element={<News />} />
            <Route path='/pta' element={<Pta />} /> */}
            <Route path="*" element={<Wildcard />} />

          </Routes>
          <ToggleFormImage />

        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
