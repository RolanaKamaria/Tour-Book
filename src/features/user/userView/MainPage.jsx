import { useEffect, useState } from "react"
import AboutUs from "./MainPageComponent/AboutUs"
import ContactUs from "./MainPageComponent/ContactUs"
import Header from "./MainPageComponent/Header"
import HelpCenter from "./MainPageComponent/HelpCenter"
import OurPrivacy from "./MainPageComponent/OurPrivacy"
import Tours from "./MainPageComponent/Tours"
import WhatWeCanDo from "./MainPageComponent/WhatWeCanDo"

function MainPage() {
    
    const [isVisible, setIsVisible] = useState(false);
    
  //to add float button return to the top of page when get down
    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener('scroll', toggleVisibility);
  
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    return (
        <div className="flex flex-col space-y-14 overflow-x-hidden">
            <Header/>
            <Tours/>
            <WhatWeCanDo />
            <AboutUs />
            <OurPrivacy />
            <ContactUs/>
            <HelpCenter />
            {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 text-loginButtonText-light py-2 px-4 rounded-full shadow-md
          bg-gradient-to-br from-loginButtonFrom-light via-loginButtonVia-light to-loginButtonTo-light
            hover:bg-gradient-to-br hover:from-loginButtonVia-light hover:via-loginButtonVia-light hover:to-loginButtonVia-light hover:text-title-light"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
        </div>
    )
}

export default MainPage