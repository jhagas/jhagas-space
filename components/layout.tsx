import Footer from './footer'
import Meta from './meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <div className="min-h-screen overflow-x-clip">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
