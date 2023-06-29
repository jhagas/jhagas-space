import Footer from './footer'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <div className="min-h-screen overflow-x-clip dark:bg-zinc-900">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
