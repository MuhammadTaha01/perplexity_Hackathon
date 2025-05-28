import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import ChatWithSonar from './pages/ChatWithSonar'
import AboutUs from './pages/AboutUs'
import GetStarted from './pages/GetStarted'
import StarField from './components/StarField'
import LoginPage from './pages/Login'

function App() {
  const location = useLocation()

  return (
    <>
      <StarField />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatWithSonar />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path='/login' element={<LoginPage/>}/>
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  )
}

export default App