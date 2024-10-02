import Title from "./Title"
import LeftKit from "../../../../assets/images/leftKitIcon.svg"
import RightKit from "../../../../assets/images/rightKitIcon.svg"
import Camera from "../../../../assets/images/mainCameraIcon.svg"
function WhatWeCanDo() {
    return (
        <div className="flex flex-row justify-center items center" id="services">
            <div className="flex flex-col justify-center items-center space-y-10">
                <Title text="ًWhat We Can Do ?" style=" xl:px-36 xl:py-10 lg:px-32 lg:py-8 md:px-28 md:py-6 " />
                <div className="flex flex-row justify-between items-center">
                    <img src={LeftKit} className="flex flex-col  lg:w-72 lg:h-52 md:w-44 md:h-32" />
                    <img src={RightKit} className="flex flex-col lg:w-72 lg:h-52 md:w-44 md:h-32" />
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="flex flex-col justify-center items-center bg-orgnizerbg-light border-solid border-2 border-text-light drop-shadow-[2px_4px_rgba(125,143,154,0.5)] w-1/3 p-5 rounded-lg space-y-5">
                        <div className="flex flex-row  text-title-light font-['Georgia'] font-semibold
            xl:text-3xl 
            lg:text-2xl
            md:text-xl">
                            Orgnizer
                        </div>
                        <div className="flex flex-row text-text-light font-['sans-serif']  
             xl:text-2xl 
             lg:text-xl 
             md:text-lg ">TourBook is your way to orgnize your Tour
                            from A to Z without any effort.
                            You can plane and reserve all places you
                            want to visit, choose best offers, publish
                            your tour, accept and refuse reservation
                            order and more. all of this from one website!
                            What are you waiting for ? subscribe  now
                            and let yourwork come easy ...</div>
                    </div>
                     <div className="flex flex-col justify-center items-end ">
                        <img src={Camera} className="xl:w-full xl:h-full lg:h-96 lg:w-52 md:h-80 md:w-40"/>
                     </div>
                    <div className="flex flex-col justify-center items-center bg-orgnizerbg-light border-solid border-2 border-text-light drop-shadow-[2px_4px_rgba(125,143,154,0.5)] w-1/3 p-5 rounded-lg space-y-5">
                        <div className="flex flex-row  text-title-light font-['Georgia'] font-semibold
            xl:text-3xl 
            lg:text-2xl
            md:text-xl">
                            Presenter
                        </div>
                        <div className="flex flex-row text-text-light font-['sans-serif']  
             xl:text-2xl 
             lg:text-xl 
             md:text-lg ">
             TourBook is your way to expanding your 
             business and win more customers from
             your place.
             you can publish your place , make offerts,
             receiving tourists and tours all of this and 
             more by joining us .
             What are you waiting for ? subscribe now
             and let your work  spreads globally ...</div>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center
                ">
                     <div className="flex flex-col w-1/3"></div>
                <div className="flex flex-col justify-center items-center bg-orgnizerbg-light border-solid border-2 border-text-light drop-shadow-[2px_4px_rgba(125,143,154,0.5)] w-1/3 p-5 rounded-lg space-y-5">
                        <div className="flex flex-row  text-title-light font-['Georgia'] font-semibold
            xl:text-3xl 
            lg:text-2xl
            md:text-xl">
                            Client
                        </div>
                        <div className="flex flex-row justify-center items-center text-text-light font-['sans-serif']  
             xl:text-2xl 
             lg:text-xl 
             md:text-lg ">TourBook is your way to turn the world
             from your place and choose best tour for 
             enjoy the weekend.
             You can surf the tours, discover new places,
             planing summer with your friends and
             more from your home.
             What are you waiting for? register now and 
             let’s have fun ...</div>
                    </div>
                    <div className="flex flex-col w-1/3"></div>
                </div>
            </div>
        </div>
    )
}

export default WhatWeCanDo