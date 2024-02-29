import logo from '../assets/Shape.png'
import { useAuthStore } from '../stores/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const logout = useAuthStore(state => state.logout)
    const navigate = useNavigate()
    const handleLogOut = () => {
        logout()
        navigate('/');

    }

    return (
        <div className="flex justify-between absolute p-6 top-0 left-0 w-full z-50">
            <div className="text-white">
                <img src={logo} alt={logo} />
            </div>
            <div>
                <ul className="flex gap-5 text-white text-[16px]">
                    <li>Blog</li>
                    <li>About</li>
                    <li>Perfil</li>
                </ul>
            </div>
            <div>
                <button onClick={handleLogOut} className="text-white">Log Out</button>
            </div>
        </div>
    )
}

export default Header