import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  const buttonAnimate = React.useRef(null);

  const buttonAnimation = () => {
    buttonAnimate.current.style.transform = "translateY(200%)";
    buttonAnimate.current.style.opacity = "0";
    setTimeout(() => {
      buttonAnimate.current.style.transform = "translateY(0%)";
      buttonAnimate.current.style.opacity = "1";
    }, 100);
  };

  React.useEffect(() => {
    buttonAnimation();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center bg-gray-900 min-h-screen overflow-hidden">
        <div className="w-full flex flex-col items-center justify-center max-w-[1920px] gap-1 relative">
          <h1 
          className="animate-pulse p-3 w-full text-center text-3xl md:text-5xl text-violet-400"
          >
            404 Not Found
          </h1>
          <button
            onClick={() => navigate(-1)}
            ref={buttonAnimate}
            className="notfound-transition p-3 w-full text-center text-xl md:text-2xl text-indigo-900"
          >
            Previous Page
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
