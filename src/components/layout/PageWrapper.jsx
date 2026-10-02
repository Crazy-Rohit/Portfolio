import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function PageWrapper({ children, padded = true }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-base text-fg-primary">
      {/* global film grain: the fixed shell clips, the 3x-viewport child
          moves — so its edges never slide into view mid-jump */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.04] mix-blend-difference"
      >
        <div className="bg-noise animate-noise absolute -inset-[100%]" />
      </div>
      <Navbar />
      <main className={`flex-1 ${padded ? 'pt-24' : ''}`}>{children}</main>
      <Footer />
    </div>
  )
}
