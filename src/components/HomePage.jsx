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
  const [hoveredItem, setHoveredItem] = useState(null);
  const [leftOffset, setLeftOffset] = useState(0);
  const [isMovingRight, setIsMovingRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Refs for elements
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const sofaRef = useRef(null);
  const diningTableRef = useRef(null);
  const bedRef = useRef(null);
  const sideBoardRef = useRef(null);
  const tvStandRef = useRef(null);

  // Animation refs
  const animationFrameIdRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const lastTimestampRef = useRef(null);

  // Sync state with refs
  const leftOffsetRef = useRef(leftOffset);
  const isMovingRightRef = useRef(isMovingRight);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    leftOffsetRef.current = leftOffset;
  }, [leftOffset]);

  useEffect(() => {
    isMovingRightRef.current = isMovingRight;
  }, [isMovingRight]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      const container = containerRef.current;
      const phone = phoneRef.current;

      if (!container || !phone) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const containerWidth = container.offsetWidth + 40;
      const phoneWidth = phone.offsetWidth;
      const maxLeft = containerWidth - phoneWidth;

      if (!isPausedRef.current) {
        const speed = maxLeft / 5000; // 5 seconds per leg
        const currentLeft = leftOffsetRef.current;
        
        let newPosition = isMovingRightRef.current
          ? currentLeft + speed * deltaTime
          : currentLeft - speed * deltaTime;

        let updatedDirection = isMovingRightRef.current;

        // Handle boundary collisions
        if (newPosition > maxLeft) {
          newPosition = maxLeft;
          updatedDirection = false;
        } else if (newPosition < 0) {
          newPosition = 0;
          updatedDirection = true;
        }

        setLeftOffset(newPosition);
        if (updatedDirection !== isMovingRightRef.current) {
          setIsMovingRight(updatedDirection);
        }

        // Check for center alignment with items
        const phoneCenterX = newPosition + phoneWidth / 2 - 15;
        const buffer = 2;

        const items = [
          { ref: sofaRef, id: 'sofa' },
          { ref: diningTableRef, id: 'diningTable' },
          { ref: bedRef, id: 'bed' },
          { ref: sideBoardRef, id: 'sideBoard' },
          { ref: tvStandRef, id: 'tvStand' }
        ];

        for (const item of items) {
          const itemEl = item.ref.current;
          if (!itemEl) continue;

          const containerRect = container.getBoundingClientRect();
          const itemRect = itemEl.getBoundingClientRect();
          
          const itemCenterX = (itemRect.left - containerRect.left) + itemRect.width / 2;

          if (Math.abs(phoneCenterX - itemCenterX) <= buffer) {
            setIsPaused(true);
            setHoveredItem(item.id);

            if (timeoutIdRef.current) {
              clearTimeout(timeoutIdRef.current);
            }

            timeoutIdRef.current = setTimeout(() => {
              setIsPaused(false);
              setHoveredItem(null);
            }, 1000);

            break;
          }
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return (
    <div className="flex w-full h-[450px] bg-white overflow-hidden">
      {/* Left Section */}
      <div className="flex-1 p-4 relative w-full">
        <div className="absolute top-4 left-4 z-10">
          <img src={vedeeoLogo} alt="Logo" className="h-16 md:h-20 lg:h-24 w-auto" />
        </div>

        <div className="flex flex-row h-full items-center pt-24 md:pt-16 lg:pt-12">
          <div className="w-1/3 lg:w-72 h-80 md:h-80 lg:h-96 flex items-center justify-center">
            <img src={namsteImage} alt="Main visual" className="object-contain max-h-full" />
          </div>
          
          <div className="w-3/5 lg:w-3/5 px-2 md:px-4 lg:px-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 mb-3 md:mb-4 font-semibold">Virtual Tour</h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed my-4 md:my-6 lg:my-8">
                  Experience our products from the comfort of your home. Our experts are ready to guide you through our collection and answer all your questions in real-time.
              </p>
              <a href="https://client.vedeeo.com/?companyUrl=https://www.mayuriinternationals.com" target='_blank'> <button className="bg-[#0c0cfc] border-none text-white w-12 h-12 md:w-auto md:h-auto md:px-3 md:py-2 rounded-full md:rounded-xl font-semibold text-sm md:text-md hover:bg-[#a9ff94] hover:text-black transition-all duration-300 ease-in-out flex items-center justify-center">
                  <span className="hidden md:inline">Explore Our Showroom</span>
                  <span className="md:hidden">Call Now</span>
              </button></a>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex flex-1 bg-[#ffea4a] p-4 flex-col justify-center relative">
        <div className="absolute lg:top-6 md:top-5 right-[50%] transform translate-x-[50%] w-[90%] lg:text-base md:text-sm ">
          <p className="text-black text-center font-bold">Explore our products from the comfort of your homes. See before you purchase and we'll make sure you feel contended.</p>
        </div>
        <div 
          ref={phoneRef}
          className="absolute top-1/2 transform -translate-y-1/2 z-10"
          style={{ left: `${leftOffset}px` }}
        >
          <div className="w-24 sm:w-32 md:w-32 lg:w-40">
            <img src={phone} alt="Phone" className="w-full h-full object-cover opacity-70" />
          </div>
        </div>

        <div 
          ref={containerRef}
          className="flex justify-between items-center bg-white px-3 sm:px-4 md:px-6 h-3/5 relative overflow-hidden rounded-xl"
        > 
          <div className="relative z-0 flex justify-around items-center w-full">
            <div className="flex items-center justify-center">
              <img 
                ref={sofaRef}
                src={sofa} 
                alt="Sofa" 
                className={`w-12 sm:w-16 md:w-20 lg:w-32 max-h-3/5 transition-transform duration-50 ${
                  hoveredItem === 'sofa' ? 'scale-50' : 'scale-100'
                }`} 
              />
            </div>
            <div className="flex items-center justify-center">
              <img 
                ref={diningTableRef}
                src={diningTable} 
                alt="Dining Table" 
                className={`w-12 sm:w-16 md:w-20 lg:w-32 max-h-3/5 transition-transform duration-50 ${
                  hoveredItem === 'diningTable' ? 'scale-50' : 'scale-100'
                }`} 
              />
            </div>
            <div className="flex items-center justify-center">
              <img 
                ref={bedRef}
                src={bed} 
                alt="Bed" 
                className={`w-12 sm:w-16 md:w-20 lg:w-32 max-h-3/5 transition-transform duration-50 ${
                  hoveredItem === 'bed' ? 'scale-50' : 'scale-100'
                }`} 
              />
            </div>
            <div className="flex items-center justify-center sm:hidden md:flex">
              <img 
                ref={sideBoardRef}
                src={sideBoard} 
                alt="Side Board" 
                className={`w-12 sm:w-16 md:w-20 lg:w-32 max-h-3/5 transition-transform duration-50 ${
                  hoveredItem === 'sideBoard' ? 'scale-50' : 'scale-100'
                }`} 
              />
            </div>
            <div className="flex items-center justify-center hidden md:flex">
              <img 
                ref={tvStandRef}
                src={tvStand} 
                alt="TV Stand" 
                className={`w-12 sm:w-16 md:w-20 lg:w-32 max-h-3/5 transition-transform duration-50 ${
                  hoveredItem === 'tvStand' ? 'scale-50' : 'scale-100'
                }`} 
              />
            </div>
          </div>
        </div>
        <a href='https://ionic-s.com/' target='_blank'>
          <div className="absolute bottom-4 right-4 sm:right-8 text-xs sm:text-sm text-black font-medium">
            Powered By TWIF Technologies Private Limited
          </div>
        </a>
      </div>
    </div>
  );
};

export default BannerComponent;