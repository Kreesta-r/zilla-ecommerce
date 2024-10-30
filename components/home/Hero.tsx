import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
 const [currentSlide, setCurrentSlide] = useState(0);

 const slides = [
   {
     image: "https://img.freepik.com/free-photo/exited-black-woman-with-white-shopping-bag-standing-yellow-background-trendy-spring-fashionable-look_273443-19.jpg?t=st=1730305004~exp=1730308604~hmac=94b265e33a4eb1eb94f7f0d9b6183b8bf2b782cef2f396a6f1ed67532f21cfef&w=740",
     title: "Discover the Latest Trends",
     subtitle: "Elevate your style with our summer collection"
   },
   {
     image: "https://img.freepik.com/free-photo/photo-irritated-woman-shopaholic-screams-very-loudly-cannot-pay-purchase-has-problems-with-transaction_273609-39218.jpg?t=st=1730266940~exp=1730270540~hmac=635807cd2fbfde8fe145c4f6643c0829c584f7b4b92bb81a3f8407c4598c8b69&w=740",
     title: "Refresh Your Wardrobe",
     subtitle: "Vibrant colors for the season ahead"
   },
   {
     image: "https://img.freepik.com/free-photo/photo-happy-woman-dresses-first-date-stands-near-clothing-rack-gets-pleasant-sms-smartphone-holds-lovely-bouquet_273609-32745.jpg?t=st=1730266717~exp=1730270317~hmac=3ec0357bcdb638dc34ad16e50e19418f4d265aaba6cfe6964c127a24258b7a4b&w=740",
     title: "Casual Essentials",
     subtitle: "Everyday styles for your adventures"
   },
   {
     image: "https://img.freepik.com/free-photo/thinking-young-handsome-dark-skinned-man-with-curly-hair-leaves-printed-shirt-smilingholding-shopping-bags-with-hand-chin-while-standing-orange-background_141793-21877.jpg?t=st=1730266880~exp=1730270480~hmac=bf4c6a034a6b57979839b2094a7e7c9158b60471230e66382805fbab957c248d&w=740",
     title: "Elevated Men's Fashion",
     subtitle: "Refined styles to elevate your look"
   },
   {
     image: "https://img.freepik.com/free-photo/woman-with-shopping-bags-studio-yellow-background-isolated_1303-14297.jpg?t=st=1730266763~exp=1730270363~hmac=91aefac0faeb8fe882615b5cb5afc2afacdd429d9868225ff0bf9ffdf3c9a583&w=740",
     title: "Friends & Family Sale",
     subtitle: "Exclusive discounts just for you"
   },
   {
     image: "https://img.freepik.com/free-photo/surprised-girl-pink-culottes-posing-with-trolley-full-multi-colored-packages-with-new-clothes_197531-14251.jpg?t=st=1730266799~exp=1730270399~hmac=1db3fdbe8f13312a24c389e2b757b1489ee66389bb77f157ef9755cf41f2b1eb&w=740",
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