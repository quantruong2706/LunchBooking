import Footer from '@app/components/Footer'
import Header from '@app/components/Header'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <Header />
      <div>
        <h1 className="text-3xl font-bold">Home Page</h1>
        <Link to="/home">Public Page</Link>
        <Link to="/protected">Protected Page</Link>
      </div>
      <Footer />
    </>
  )
}
