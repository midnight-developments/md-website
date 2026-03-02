import { useEffect } from "react"
import { BrowserRouter, useLocation, useRoutes } from "react-router"
import { ReactLenis, useLenis } from "lenis/react"
import { pages, type PageConfig } from "@/pages.config"
import Layout from "@/components/Layout"
import { Toaster } from "@/components/ui/sonner"
import { AnimatePresence, motion } from "framer-motion"
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'

function AppContent() {
  const element = useRoutes(
    pages.map((page: PageConfig) => ({
      path: page.path,
      element: <page.component />,
    }))
  )

  const location = useLocation()

  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, lenis])

  return (
    <>
      <Layout>
        <AnimatePresence mode="wait" >
          {element && (
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {element}
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>
      <Toaster />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ReactLenis root options={{ lerp: 0.15, wheelMultiplier: 1.2, smoothWheel: true }}>
            <AppContent />
          </ReactLenis>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
