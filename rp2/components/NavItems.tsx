'use client'
import { NAV_ITEMS } from '@/lib/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'



const NavItems = () => {
  const pathname : string = usePathname()
  const isActive = (name:string) => {
    if (name === "/")return pathname === "/"; 
    return pathname.startsWith(name);
    }
  return (
    <ul className = "flex flex-col sm:flex-row p-2 gap-10 font-mono  text-gray-200">
     {NAV_ITEMS.map((item)=>(
      <li key={item.name}> 
      <Link href={item.href} className={`hover:text-cyan-500 cursor-pointer transition-colors ${
      isActive(item.href) ? 'text-gray-400' : ''
      }`}>{item.name}</Link>
      </li>
     ))}
    </ul>
  )
}

export default NavItems