import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
const Navbar = ({user,userName}) => {

  const navigate = useNavigate('')

  const handleLoginBtn = () => {
    navigate('/login')
  }

  return (
    <nav className="flex justify-between items-center shadow-2xl py-2 px-6 bg-white ">
    
      <h1 className="text-2xl font-extrabold text-gray-800">Sandrop</h1>
      <div>
        {user ?(
         <div className="flex gap-2 text-md">
            <h1>{userName}</h1>
            <FaUserCircle  className="h-6 w-6 text-gray-700 cursor-pointer" />
         </div>
         )
        : <button 
        onClick={handleLoginBtn}
        className="bg-blue-300 py-1 px-4 text-gray-700 font-bold rounded-md cursor-pointer shadow-2xl ">Login
        </button>}
      </div>
    </nav>
  );
};

export default Navbar;
