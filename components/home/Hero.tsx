import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://img.freepik.com/free-photo/african-woman-dressed-stylish-yellow-jacket-carries-shopping-bag-uses-mobile-phone-online-communication-poses-near-clothing-rail-against-yellow-background_273609-34139.jpg?t=st=1730266600~exp=1730270200~hmac=015419921383b2ae277d9500008388dee0443083019e263cfdfa32669d8d0af8&w=740",
      title: "Summer Collection",
      subtitle: "Discover the latest trends"
    },
    {
      image: "https://img.freepik.com/free-photo/photo-irritated-woman-shopaholic-screams-very-loudly-cannot-pay-purchase-has-problems-with-transaction_273609-39218.jpg?t=st=1730266940~exp=1730270540~hmac=635807cd2fbfde8fe145c4f6643c0829c584f7b4b92bb81a3f8407c4598c8b69&w=740",
      title: "Spring Essentials",
      subtitle: "Refresh your wardrobe with vibrant colors"
    },
    {
      image: "https://img.freepik.com/free-photo/photo-happy-woman-dresses-first-date-stands-near-clothing-rack-gets-pleasant-sms-smartphone-holds-lovely-bouquet_273609-32745.jpg?t=st=1730266717~exp=1730270317~hmac=3ec0357bcdb638dc34ad16e50e19418f4d265aaba6cfe6964c127a24258b7a4b&w=740",
      title: "Casual Styles",
      subtitle: "Perfect for every day adventures"
    },
    {
      image: "https://img.freepik.com/free-photo/thinking-young-handsome-dark-skinned-man-with-curly-hair-leaves-printed-shirt-smilingholding-shopping-bags-with-hand-chin-while-standing-orange-background_141793-21877.jpg?t=st=1730266880~exp=1730270480~hmac=bf4c6a034a6b57979839b2094a7e7c9158b60471230e66382805fbab957c248d&w=740",
      title: "Men's Fashion",
      subtitle: "Elevate your style with our latest collection"
    },
    {
      image: "https://img.freepik.com/free-photo/woman-with-shopping-bags-studio-yellow-background-isolated_1303-14297.jpg?t=st=1730266763~exp=1730270363~hmac=91aefac0faeb8fe882615b5cb5afc2afacdd429d9868225ff0bf9ffdf3c9a583&w=740",
      title: "Friends & Family Sale",
      subtitle: "Exclusive discounts for you and your loved ones"
    },
    {
      image: "https://img.freepik.com/free-photo/surprised-girl-pink-culottes-posing-with-trolley-full-multi-colored-packages-with-new-clothes_197531-14251.jpg?t=st=1730266799~exp=1730270399~hmac=1db3fdbe8f13312a24c389e2b757b1489ee66389bb77f157ef9755cf41f2b1eb&w=740",
      title: "Fall Favorites",
      subtitle: "Embrace cozy fashion this season"
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
    <div className="relative h-[calc(100vh-0px)] max-h-[800px] w-full bg-gray-500">
      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
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
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-3xl mt-16"> {/* Added mt-16 to account for header height */}
              <h2 className="text-5xl font-bold mb-6 tracking-tight">{slide.title}</h2>
              <p className="text-xl font-medium text-gray-200">{slide.subtitle}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-white w-6' 
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