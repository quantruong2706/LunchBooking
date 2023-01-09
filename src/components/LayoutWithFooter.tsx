import Footer from './Footer'

export default function LayoutWithFooter({ children }: any) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      {children}
      <Footer />
    </div>
  )
}
