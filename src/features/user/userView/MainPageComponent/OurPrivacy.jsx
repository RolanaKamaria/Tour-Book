import Title from "./Title"
import Flower from "../../../../assets/images/flowerBackground.svg"
function OurPrivacy() {
    return (
        <div className="flex flex-row justify-center items center" id="privacy">
            <div className="flex flex-col justify-center items-center space-y-10">
                <Title text="Our Privacy" style=" xl:px-64 xl:py-14 lg:px-44 lg:py-8 md:px-40 md:py-7 " />
                <div className="flex flex-row justify-center items-start  text-text-light font-['sans-serif']  w-9/12 
             xl:text-2xl 
             lg:text-xl 
             md:text-lg ">
                    <div className="flex flex-col justify-start items-start space-y-5">
                        <div className="flex flex-row">
                            This Privacy Policy describes Meta Platforms, Inc.  practices for handling your information
                            in connection with this website and our open source-related websites ("Websites") and any content,
                            related documentation, information and services (e.g. apps, tutorials, tools to support the
                            developer workflow, access to resources, etc.) made available to you on this website(collectively,
                            the "Services").
                            This Privacy Policy describes the personal information we process to support our Services.
                            For clarity, this Privacy Policy only applies to the Websites and does not apply to any:

                            1.use of open source code, documentation or specifications made available on GitHub, which are
                            governed by the terms of the applicable open source license;
                            2.pull requests, issues and any other interactions or features related to participation in open
                            source projects on GitHub, which are governed by GitHub's terms and conditions
                            3.use of any other Meta website, service or product, which are governed by the terms and
                            conditions applicable to those offerings.
                        </div>
                        <div className="flex flex-row justify-center items-start  text-title-light font-['Georgia'] font-semibold
            xl:text-3xl 
            lg:text-2xl
            md:text-xl ">What Kinds of Information Do We Collect?</div>
                        <div className="flex flex-row">
                            When you interact with us through our Services, we may collect or receive the following types of information:
                            Information you provide directly to us. For certain activities, we may collect the following types of information:
                            Contact information, such as name, email address and contact details; and
                            Other information you provide to us, such as when you send us correspondence or otherwise participate on the Services.
                            Information we collect automatically. Depending on the type of device you use and how you interact with us, we may also
                            collect certain information automatically when you use our Services, such as:
                            Device attributes, including information such as the operating system, hardware and software versions, battery level,
                            signal strength, available storage space, browser type, app and file names and types, and plugins.
                            Device operations, including information about operations performed on the Services as well as pages visited.
                            Identifiers, including information such as unique identifiers, device IDs, and other identifiers, and Family Device IDs
                            associated with the same device or account.
                            Network and connections, information such as the name of your mobile operator or ISP, language, time zone, mobile phone
                            number, IP address, connection speed, information about other devices that are nearby or on your network, and Wi-Fi
                            hotspots you connect to using our Services.
                            Cookie data, data from cookies and other similar technologies that are stored on your device, including cookie IDs and
                            settings. Learn more about how we use cookies by reading our Cookie Policy.
                        </div>
                    </div>



                </div>
                <div className="flex flex-row relative w-9/12 items-center justify-center bg-image bg-cover bg-center bg-no-repeat
        xl:h-96 lg:h-72 md:h-60 "
                    style={{
                        backgroundImage: `url(${Flower})`,
                    }}>
                </div>
            </div>
        </div>
    )
}
export default OurPrivacy