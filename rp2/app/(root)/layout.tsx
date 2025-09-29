import Header from "../../components/Header"
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
        <div className='min-h-screen text-gray-400'>
          
            <div className="container   sm:px-6 lg:px-8">
                {children}
            </div>
        
        </div>
    </main>
  )
}
export default Layout