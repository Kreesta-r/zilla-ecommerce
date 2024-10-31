import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
 const [currentSlide, setCurrentSlide] = useState(0);

 const slides = [
   {
     image: "/slide1.jpg",
     title: "Discover the Latest Trends",
     subtitle: "Elevate your style with our summer collection"
   },
   {
     image: "/slide2.jpg",
     title: "Refresh Your Wardrobe",
     subtitle: "Vibrant colors for the season ahead"
   },
   {
     image: "/slide3.jpg",
     title: "Casual Essentials",
     subtitle: "Everyday styles for your adventures"
   },
   {
     image: "/slide4.jpg",
     title: "Cozy Fall Favorites",
     subtitle: "Embrace the season with our latest collection"
   }
 ];

 const nextSlide = () => {
   setCurrentSlide((prev) => (prev + 1) % slides.length);
 };

 const prevSlide = () => {
   setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
 };

 useEffect(() => {
   const timer = setInterval(nextSlide, 5000);
   return () => clearInterval(timer);
 }, []);

 return (
   <div className="relative h-[90vh] max-h-[100vh] w-full">
     {/* Navigation Buttons */}
     <button 
       onClick={prevSlide}
       className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
       aria-label="Previous slide"
     >
       <ChevronLeft className="w-8 h-8" />
     </button>
     <button 
       onClick={nextSlide}
       className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
       aria-label="Next slide"
     >
       <ChevronRight className="w-8 h-8" />
     </button>

     {/* Slides */}
     {slides.map((slide, index) => (
       <div
         key={index}
         className={`absolute inset-0 transition-all duration-700 transform ${
           currentSlide === index 
             ? 'opacity-100 translate-x-0' 
             : 'opacity-0 translate-x-full'
         }`}
       >
         <Image
           src={slide.image}
           alt={slide.title}
           height={1000}
           width={1000}
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-center justify-center">
           <div className="text-center text-white px-4 max-w-3xl mt-24">
             <h2 className="text-6xl font-bold mb-6 tracking-tight">{slide.title}</h2>
             <p className="text-2xl font-semibold text-gray-200">{slide.subtitle}</p>
           </div>
         </div>
       </div>
     ))}

     {/* Slide Indicators */}
     <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
       {slides.map((_, index) => (
         <button
           key={index}
           onClick={() => setCurrentSlide(index)}
           className={`w-3 h-3 rounded-full transition-all ${
             currentSlide === index 
               ? 'bg-white w-8' 
               : 'bg-white/50 hover:bg-white/75'
           }`}
           aria-label={`Go to slide ${index + 1}`}
         />
       ))}
     </div>
   </div>
 );
};

export default Hero;