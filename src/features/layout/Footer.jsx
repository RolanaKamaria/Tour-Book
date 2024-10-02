import CopyWriteIcon from "../../assets/images/copyWriteIcon.svg";

function Footer() {
  return (
    <div>
      <footer className="w-full pb-5">
        <div className="w-10/12 mx-auto font-['Open_Sans'] xl:px-8">
          <div className="flex flex-col items-center justify-center w-full border-t border-text-light gap-1 xl:py-2 lg:py-1  md:py-1">
            <div className="flex flex-row items-start justify-center w-4/6 font-sans text-center text-text-light xl:text-sm xl:gap-4 lg:text-xs lg:gap-3 md:text-xs md:gap-2">
              <span className="flex flex-col font-['Open_Sans']">
                <a href="">our services</a>
              </span>
              <span className="flex flex-col font-['Open_Sans']">
                <a href="">privacy</a>
              </span>
              <span className="flex flex-col font-['Open_Sans']">
                <a href="">about us</a>
              </span>
              <span className="flex flex-col font-['Open_Sans']">
                <a href="">contact us</a>
              </span>
              <span className="flex flex-col font-['Open_Sans']">
                <a href="">help</a>
              </span>
            </div>
            <div className="flex flex-row items-center justify-center w-3/5 text-center text-text-light xl:gap-4 xl:text-sm lg:text-xs lg:gap-3 md:text-xs md:gap-2">
              <span className="flex flex-row">
                <img src={CopyWriteIcon} className="xl:w-3 xl:h-3 lg:h-2 md:w-2 md:h-2 m-1" />
                2024 TourBook from IT engineers
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
