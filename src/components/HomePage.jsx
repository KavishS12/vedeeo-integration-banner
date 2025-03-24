import React, { useState, useRef, useEffect } from 'react';
import vedeeoLogo from '../assets/vedeeo_logo.webp';
import namsteImage from '../assets/namaste.avif';
import bed from "../assets/bed.jpg";
import sofa from "../assets/sofa.jpg";
import tvStand from "../assets/tv-stand.jpg";
import diningTable from "../assets/dining-table.jpg";
import sideBoard from "../assets/side-board.jpg";
import phone from "../assets/phone.png";

const BannerComponent = () => {
  // Create refs for each furniture item
  const sofaRef = useRef(null);
  const diningTableRef = useRef(null);
  const bedRef = useRef(null);
  const sideBoardRef = useRef(null);
  const tvStandRef = useRef(null);
  const phoneRef = useRef(null);
  
  // State to track which item is being hovered by the phone
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Function to check if phone is hovering over an item
  const checkOverlap = () => {
    if (!phoneRef.current) return;
    
    const phoneRect = phoneRef.current.getBoundingClientRect();
    const phoneCenter = {
      x: phoneRect.left + phoneRect.width / 2,
      y: phoneRect.top + phoneRect.height / 2
    };
    
    // Check each furniture item
    const items = [
      { ref: sofaRef, id: 'sofa' },
      { ref: diningTableRef, id: 'diningTable' },
      { ref: bedRef, id: 'bed' },
      { ref: sideBoardRef, id: 'sideBoard' },
      { ref: tvStandRef, id: 'tvStand' }
    ];
    
    let foundOverlap = false;
    
    for (const item of items) {
      if (!item.ref.current) continue;
      
      const itemRect = item.ref.current.getBoundingClientRect();
      
      // Check if phone center is within the item's bounds with 30px offset
      if (
        phoneCenter.x >= (itemRect.left) &&
        phoneCenter.x <= (itemRect.right) &&
        phoneCenter.y >= itemRect.top &&
        phoneCenter.y <= itemRect.bottom
      ) {
        setHoveredItem(item.id);
        foundOverlap = true;
        break;
      }
    }
    
    // If no overlap found, reset hovered item
    if (!foundOverlap) {
      setHoveredItem(null);
    }
  };
  
  // Set up animation frame for continuous checking
  useEffect(() => {
    let animationFrameId;
    
    const checkFrame = () => {
      checkOverlap();
      animationFrameId = requestAnimationFrame(checkFrame);
    };
    
    animationFrameId = requestAnimationFrame(checkFrame);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex w-full h-[450px] bg-white overflow-hidden">
        {/* Left Section - Always visible */}
        <div className="flex-1 p-4 relative w-full">
            {/* Logo */}
            <div className="absolute top-4 left-4 z-10">
                <img src={vedeeoLogo} alt="Logo" className="h-16 md:h-20 lg:h-24 w-auto" />
            </div>

            <div className="flex flex-row h-full items-center pt-24 md:pt-16 lg:pt-12">
                {/* Image Container - Increased height for mobile */}
                <div className="w-1/3 lg:w-72 h-80 md:h-80 lg:h-96 flex items-center justify-center">
                    <img src={namsteImage} alt="Main visual" className="object-contain max-h-full" />
                </div>
                
                {/* Text Content */}
                <div className="w-3/5 lg:w-3/5 px-2 md:px-4 lg:px-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 mb-3 md:mb-4 font-semibold">Video call our showroom</h2>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed my-4 md:my-6 lg:my-8">
                        Experience our products from the comfort of your home. Our experts are ready to guide you through our collection and answer all your questions in real-time.
                    </p>
                    <button className="bg-[#0c0cfc] border-none text-white w-12 h-12 md:w-auto md:h-auto md:px-3 md:py-2 rounded-full md:rounded-xl font-semibold text-sm md:text-md hover:bg-[#abfb94] hover:text-black transition-all duration-300 ease-in-out flex items-center justify-center">
                        <span className="hidden md:inline">Book a call now</span>
                        <span className="md:hidden">Book</span>
                    </button>
                </div>
            </div>
        </div>
      
        {/* Right Section - Hidden on mobile */}
        <div className="hidden md:flex flex-1 bg-[#0c0cfc] p-4 flex-col justify-center relative">
            {/* Moving Phone Background */}
            <div 
              ref={phoneRef}
              className="absolute top-1/2 transform -translate-y-1/2 z-10 animate-phone-slide"
            >
                <div className="w-24 sm:w-32 md:w-40 lg:w-48">
                    <img src={phone} alt="Background" className="w-full h-full object-cover opacity-70" />
                </div>
            </div>
            
            {/*Objects - with lower z-index for the phone to overlap*/}
            <div className="flex justify-between items-center bg-white px-3 sm:px-4 md:px-6 h-3/5 relative overflow-hidden rounded-xl"> 
                <div className="relative z-0 flex justify-around items-center w-full">
                    <div className="flex items-center justify-center">
                        <img 
                          ref={sofaRef}
                          src={sofa} 
                          alt="Feature 1" 
                          className={`w-12 sm:w-16 md:w-20 lg:w-32 max-h-3/5 transition-transform duration-300 ${hoveredItem === 'sofa' ? 'scale-[0.65]' : 'scale-100'}`} 
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <img 
                          ref={diningTableRef}
                          src={diningTable} 
                          alt="Feature 2" 
                          className={`w-12 sm:w-16 md:w-20 lg:w-32 max-h-3/5 transition-transform duration-300 ${hoveredItem === 'diningTable' ? 'scale-[0.65]' : 'scale-100'}`} 
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <img 
                          ref={bedRef}
                          src={bed} 
                          alt="Feature 3" 
                          className={`w-12 sm:w-16 md:w-20 lg:w-32 max-h-3/5 transition-transform duration-300 ${hoveredItem === 'bed' ? 'scale-[0.65]' : 'scale-100'}`} 
                        />
                    </div>
                    <div className="flex items-center justify-center sm:hidden md:flex">
                        <img 
                          ref={sideBoardRef}
                          src={sideBoard} 
                          alt="Feature 4" 
                          className={`w-12 sm:w-16 md:w-20 lg:w-32 max-h-3/5 transition-transform duration-300 ${hoveredItem === 'sideBoard' ? 'scale-[0.65]' : 'scale-100'}`} 
                        />
                    </div>
                    <div className="flex items-center justify-center hidden md:flex">
                        <img 
                          ref={tvStandRef}
                          src={tvStand} 
                          alt="Feature 5" 
                          className={`w-12 sm:w-16 md:w-20 lg:w-32 max-h-3/5 transition-transform duration-300 ${hoveredItem === 'tvStand' ? 'scale-[0.65]' : 'scale-100'}`} 
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
            @keyframes phoneSlide {
                    0% { 
                        left: 0px; 
                    }
                    45% { 
                        left: calc(80% - 48px); 
                    }
                    50% { 
                        left: calc(80% - 48px); 
                    }
                    95% { 
                        left: 0px; 
                    }
                    100% { 
                        left: 0px; 
                    }
                }
                
                @media (min-width: 768px) {
                    @keyframes phoneSlide {
                        0% { left: 0px; }
                        45% { left: calc(80% - 72px); }
                        50% { left: calc(80% - 72px); }
                        95% { left: 0px; }
                        100% { left: 0px; }
                    }
                }
                
                @media (min-width: 1024px) {
                    @keyframes phoneSlide {
                        0% { left: 0px; }
                        45% { left: calc(80% - 72px); }
                        50% { left: calc(80% - 72px); }
                        95% { left: 0px; }
                        100% { left: 0px; }
                    }
                }
                
                @media (min-width: 1280px) {
                    @keyframes phoneSlide {
                        0% { left: 0px; }
                        45% { left: calc(80% - 56px); }
                        50% { left: calc(80% - 56px); }
                        95% { left: 0px; }
                        100% { left: 0px; }
                    }
                }
                .animate-phone-slide {
                    animation: phoneSlide 10s linear infinite;
                }
            `}</style>
            
            {/* Footer Text */}
            <div className="absolute bottom-4 right-4 sm:right-8 text-xs sm:text-sm text-gray-200 font-medium">
                Powered By TWIF Technologies Private Limited
            </div>
        </div>
    </div>
  );
};

export default BannerComponent;