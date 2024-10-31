import { useState } from 'react';
import { useRouter } from 'next/router';
import useCartStore from '@/store/cartStore';
import { products } from '@/data/products';
import {
  Heart,
  Share,
  Truck,
  RefreshCcw,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Star,
  StarHalf,
  Link as LinkIcon,
  Check
} from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import RouteHeader from '@/components/products/RouteHeader';
import ToastAlert from '@/components/products/Toast';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const addItem = useCartStore((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [showAlert, setShowAlert] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <Alert className="w-96">
        <AlertTitle>Product Not Found</AlertTitle>
        <AlertDescription>
          The product you're looking for doesn't exist or has been removed.
        </AlertDescription>
      </Alert>
    </div>
  );

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setAlertType('warning');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowAlert(true);
      setAlertType('size-warning');
      return;
    }
    addItem({ ...product, selectedSize });
    setAddedToCart(true);
    setShowAlert(true);
    setAlertType('success');
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        // Use native sharing if available
        await navigator.share(shareData);
      } else {
        // Show share menu with copy link option if native sharing is not available
        setShowShareMenu(true);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      setShowShareMenu(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
        setShowShareMenu(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      setShowAlert(true);
      setAlertType('error');
    }
  };

  // Close share menu when clicking outside
  const handleClickOutside = (e) => {
    if (showShareMenu && !e.target.closest('.share-menu')) {
      setShowShareMenu(false);
    }
  };

  // Add event listener for clicking outside
  if (typeof window !== 'undefined') {
    window.addEventListener('click', handleClickOutside);
  }

  return (
    <>
      <RouteHeader />
      <div className="min-h-screen pt-16 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="container mx-auto py-6 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="lg:w-2/3">
              <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] group">
                <img
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} view ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                
                {/* Image Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Thumbnail Navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex === idx 
                          ? 'bg-black w-4' 
                          : 'bg-black/50 hover:bg-black/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/3 space-y-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>Home</span>
                <ChevronRight className="w-4 h-4" />
                <span className='capitalize'>{product.category}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-black">{product.name}</span>
              </div>

              {/* Title and Price */}
              <div className="border-b pb-4">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-semibold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <StarHalf className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs text-gray-500">(127 reviews)</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm">{product.description}</p>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold">Select Size</h3>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 border rounded-md transition-all ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full mt-4 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </div>

              {/* Wishlist and Share */}
              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-50"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </button>
                <div className="relative flex-1 share-menu">
                  <button 
                    className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-50"
                    onClick={handleShare}
                  >
                    <Share className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                  
                  {/* Share Menu Dropdown */}
                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        <button
                          onClick={handleCopyLink}
                          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          {linkCopied ? (
                            <>
                              <Check className="w-4 h-4 text-green-500" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <LinkIcon className="w-4 h-4" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Features</h3>
                <div className="space-y-2 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Free Shipping on orders over $50
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCcw className="w-5 h-5" />
                    Free Returns within 30 days
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Secure Payments with SSL encryption
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <ToastAlert
          product={product}
          onClose={() => setShowAlert(false)}
          type={alertType}
        />
      )}
    </>
  );
};

export default ProductPage;