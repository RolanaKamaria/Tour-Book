import Title from "./Title"
import Road from "../../../../assets/images/road.png"
import Motor from "../../../../assets/images/motor.png"
import Cloud from "../../../../assets/images/Cloud.png"
function AboutUs() {
    return (
        <div className="flex flex-row justify-center items center" id="about">
            <div className="flex flex-col justify-center items-center space-y-20 px-10">
                <Title text=" About Us" style=" xl:px-72 xl:py-14 lg:px-44 lg:py-7 md:px-40 md:py-6 " />
                <div className="flex flex-row items-center justify-between bg-image bg-cover bg-center bg-no-repeat px-5 py-10 m-5 mt-20 relative w-11/12 h-1/3"
                    style={{ backgroundImage: `url(${Road})`, }}>
                    <div className="flex flex-col justify-start items-center font-semibold  xl:space-y-20 lg:space-y-5  md:space-y-5">
                        <div className="flex flex-row justify-start items-center  text-text-light font-['sans-serif'] w-full
             xl:text-2xl 
             lg:text-xl 
             md:text-lg ">
                            TourBook is a Graduation project. It was established by 5 IT’s students.
                        </div>
                        <div className="flex flex-row justify-start items-center  text-text-light font-['sans-serif'] w-full
             xl:text-2xl 
             lg:text-xl 
             md:text-lg ">
                            We strive to make the process of tourism more interesting & easier than before.
                        </div>
                    </div>
                    <img src={Motor} className="flex flex-col lg:h-52 lg:w-96 md:h-40 md:w-72" />
                </div>
                <div className="flex flex-row items-center justify-center ">
                    <img src={Cloud} className="flex flex-col" />


                </div>
            </div>
        </div>
    )
}

export default AboutUs