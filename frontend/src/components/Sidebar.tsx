
import { MdOutlineDashboard } from "react-icons/md"
import { FiUsers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const links = [
    {
        name:"Dashboard",
        path:'/',
        icon:MdOutlineDashboard,
    },
    {
        name:"Agents",
        path:'/agents',
        icon:FiUsers,
    }
]
const Sidebar = () => {
    const {pathname} = useLocation()
  return (
    <div className="w-[300px] top-0 bottom-0 left-0 p-4 border-r ">
      <Link to='/' className="text-3xl font-bold text-blue-800 text-center block">
      HELPDESK
      </Link>
    <div className="my-8 flex flex-col gap-3">
        {links.map(link=>(
            <Link key={link.name} to={link.path} className={`flex items-center h-12 rounded-lg px-4 cursor-pointer ${pathname==link.path?'bg-blue-700 text-white':'border-gray-300 border text-black'}`}>
                <link.icon size={26} />
                <span className="ml-4 text-lg font-medium">{link.name}</span>
            </Link>
        ))}
    </div>
    </div>
  )
}

export default Sidebar