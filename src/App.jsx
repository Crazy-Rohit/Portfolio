import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home.jsx'

const BlogList = lazy(() => import('./pages/BlogList.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <Suspense fallback={<div className="min-h-screen bg-bg-base" />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </>
  )
}
