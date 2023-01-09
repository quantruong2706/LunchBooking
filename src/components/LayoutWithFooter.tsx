import Footer from './Footer'

export default function LayoutWithFooter({ children }: any) {
  return (
    <div className="flex flex-col justify-between  h-screen">
      {children}
      <Footer />
    </div>
  )
}
