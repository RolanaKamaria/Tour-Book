import MainBackgrounGirl from "../../../../assets/images/mainBackgrounGirl.png"
import Title from "./Title"
import Direction from "../../../../assets/images/mainDirection.svg"
import MakeTour from "../../../../assets/data/a.pdf"
import PublishOffer from "../../../../assets/data/a.pdf"
import Register from "../../../../assets/data/a.pdf"
function HelpCenter() {

  return (
    <div className="flex flex-row justify-center items center" id="help">
      <div className="flex flex-col justify-center items-center space-y-10">
        <Title text="Help Center" style=" xl:px-48 xl:py-10 lg:px-40 lg:py-7 md:px-32 md:py-5 " />
        <div className="flex flex-row bg-image bg-cover h-fit w-screen bg-center bg-no-repeat "
          style={{
            backgroundImage: `url(${MainBackgrounGirl})`,
          }}>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="flex flex-col justify-center items-start xl:space-y-14 lg:space-y-10 md:space-y-8
          xl:px-28 lg:px-24 md:px-20">
                <div className="flex flex-row px-5">
                  <div className="flex flex-col justify-center items-start xl:space-y-5 lg:space-y-3 md:space-y-2">
                    <div className="flex flex-row justify-center items-start  text-title-light font-['Georgia'] font-semibold
            xl:text-3xl 
            lg:text-2xl
            md:text-xl ">Make New Tour ?</div>
                    <div className="flex flex-row justify-center items-start  text-text-light font-['sans-serif']  
             xl:text-2xl 
             lg:text-xl 
             md:text-lg ">Start here to learn more about How and When is the best time to create it.</div>
                    <div className="flex flex-row justify-center items-start">
                      <a href={MakeTour} download="MakeTour" target="_blank"
                        className="flex flex-col justify-center items-end text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-add-button-light text-button-text-light px-2
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-add-button-hover-light
                                xl:text-2xl xl:rounded-md xl:h-10 
                                lg:text-xl lg:rounded-md lg:h-10  
                                md:text-lg md:rounded-md md:h-8">Read the Guid</a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row px-5">
                  <div className="flex flex-col justify-center items-start space-y-5">
                    <div className="flex flex-row justify-center items-start  text-title-light font-['Georgia'] font-semibold
            xl:text-3xl 
            lg:text-2xl
            md:text-xl ">Publish New Offer ?</div>
                    <div className="flex flex-row justify-center items-start  text-text-light font-['sans-serif']  
             xl:text-2xl 
             lg:text-xl 
             md:text-lg ">Start here to learn more about How and what you have to put in it create the best offer.</div>
                    <div className="flex flex-row justify-center items-start">
                      <a href={PublishOffer} download="PublishOffer" target="_blank"
                        className="flex flex-col justify-center items-end text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-save-button-light text-button-text-light px-2
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-save-button-hover-light
                                xl:text-2xl xl:rounded-md xl:h-10 
                                lg:text-xl lg:rounded-md lg:h-10  
                                md:text-lg md:rounded-md md:h-8">Read the Guid</a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row px-5">
                  <div className="flex flex-col justify-center items-start space-y-5">
                    <div className="flex flex-row justify-center items-start  text-title-light font-['Georgia'] font-semibold
            xl:text-3xl 
            lg:text-2xl
            md:text-xl ">Register in a Tour ?</div>
                    <div className="flex flex-row justify-center items-start  text-text-light font-['sans-serif']  
             xl:text-2xl 
             lg:text-xl 
             md:text-lg ">Start here to learn more about How to require it.</div>
                    <div className="flex flex-row justify-center items-start">
                      <a href={Register} download="Register" target="_blank"
                        className="flex flex-col justify-center items-end text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-details-button-light text-button-text-light px-2
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-details-button-hover-light
                                xl:text-2xl xl:rounded-md xl:h-10 
                                lg:text-xl lg:rounded-md lg:h-10  
                                md:text-lg md:rounded-md md:h-8">Read the Guid</a>
                    </div>
                  </div>
                </div>


              </div>
            </div>
            <div className="flex flex-row items-end justify-end w-screen pt-5">

              <img src={Direction} className="lg:h-96 lg:w-72 md:h-72 md:w-52" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
export default HelpCenter