import Header from "../../components/Header"
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
        <div className='min-h-screen text-gray-400'>
          
            <div className="container ">
                {children}
            </div>
        
        </div>
    </main>
  )
}
export default Layout