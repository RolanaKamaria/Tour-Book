import { useNavigate } from "react-router-dom"
import Icon from "../../../../assets/images/mainIcon.svg"
function Header() {
    const navigate = useNavigate()
    return (
        <div className=" flex flex-row justify-center items center p-10 pt-20 xl:space-x-16 lg:space-x-12 md:space-x-8">
            <div className="flex flex-col justify-center items-center  font-['Georgia']">
                <img src={Icon} className="xl:h-full xl:w-full lg:h-36 lg:w-44 md:h-32 md:w-40" />
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-start items-start 
                 text-text-light  hover:cursor-pointer 
                            xl:text-xl  xl:space-x-5
                            lg:text-lg  lg:space-x-3
                            md:text-base md:space-x-2">
                    <a href="#tours" 
                    className="flex flex-col justify-center items-center px-3 rounded
                 hover:bg-loginButtonVia-light  hover:text-title-light">
                        Home
                    </a>
                    <a href="#services" 
                    className="flex flex-col justify-center items-center px-3 rounded 
                 hover:bg-loginButtonVia-light  hover:text-title-light">
                        Our Services
                    </a>
                    <a href="#privacy" 
                    className="flex flex-col justify-center items-center px-3 rounded 
                 hover:bg-loginButtonVia-light  hover:text-title-light">
                       Privacy
                    </a>
                    <a href="#about"
                    className="flex flex-col justify-center items-center px-3 rounded 
                 hover:bg-loginButtonVia-light  hover:text-title-light">
                        About Us
                    </a>
                    <a href="#contact"
                    className="flex flex-col justify-center items-center px-3 rounded 
                 hover:bg-loginButtonVia-light  hover:text-title-light">
                        Contact
                    </a>
                    <a href="#help"
                    className="flex flex-col justify-center items-center px-3 rounded 
                 hover:bg-loginButtonVia-light  hover:text-title-light">
                       Help
                    </a>
                </div>
            </div>
            <div className=" flex flex-col justify-center items-center">
                <div
                    className="flex flex-row text-text-light space-x-2
                   xl:space-x-2 xl:pl-32   xl:text-xl
                   lg:space-x-2 lg:pl-20  lg:text-lg
                   md:space-x-1 md:pl-10 md:text-base"
                >
                        <span onClick={()=>{
                            navigate('/create-account')
                        }}
                        className="flex flex-col hover:cursor-pointer" >Rigester</span>
                        <span className="flex flex-col"> | </span>
                        <span onClick={()=>{
                            navigate('/login')
                        }}
                        className="flex flex-col hover:cursor-pointer" >Sign Up</span>
                   
                </div>
            </div>
        </div>
    )
}
export default Header