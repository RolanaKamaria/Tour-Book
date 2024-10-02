import Logo from "../../assets/images/Logo.svg"
import Title from "../../assets/images/Title.svg"

function Header() {
    return (
        <div class=" absolute flex flex-row justify-start items-center pl-10 xl:gap-4  xl:top-4 lg:top-2 lg:gap-3 md:top-1 md:gap-2 ">
            <img src={Logo} className=" flex flex-col xl:w-24 xl:h-28 lg:w-20 lg:h-24 md:w-16 md:h-20" />
            <img src={Title} className="flex flex-col xl:pt-8 xl:w-72 xl:h-36 lg:pt-6 lg:w-60 lg:h-32 md:pt-4 md:w-48 md:h-28" />
        </div>
    )
}
export default Header