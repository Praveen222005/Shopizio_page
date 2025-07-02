import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  Star, 
  Clock, 
  Truck, 
  Shield, 
  Headphones,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid,
  List,
  Zap,
  TrendingUp,
  Award,
  Gift
} from 'lucide-react';
import Cart from './Cart';
import Checkout from './Checkout';
import OrderSuccess from './OrderSuccess';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  badge?: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [addToCartAnimation, setAddToCartAnimation] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [email, setEmail] = useState('');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 10,
    seconds: 6
  });

  // Expanded products data with 30+ diverse products
  const allProducts: Product[] = [
    // Electronics & Gadgets
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 134900,
      image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
      rating: 4.9,
      reviews: 567,
      badge: "HOT",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Samsung 4K Smart TV 55\"",
      price: 45999,
      originalPrice: 59999,
      image: "https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg",
      rating: 4.6,
      reviews: 892,
      discount: 23,
      badge: "SALE",
      category: "Electronics"
    },
    {
      id: 3,
      name: "Sony PlayStation 5",
      price: 54990,
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
      rating: 4.9,
      reviews: 1567,
      badge: "HOT",
      category: "Gaming"
    },
    {
      id: 4,
      name: "Apple MacBook Pro M3",
      price: 199900,
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
      rating: 4.8,
      reviews: 234,
      badge: "NEW",
      category: "Computers"
    },
    {
      id: 5,
      name: "iPad Air 5th Generation",
      price: 59900,
      originalPrice: 64900,
      image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg",
      rating: 4.7,
      reviews: 445,
      discount: 8,
      category: "Electronics"
    },
    {
      id: 6,
      name: "Samsung Galaxy S24 Ultra",
      price: 124999,
      originalPrice: 134999,
      image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
      rating: 4.8,
      reviews: 678,
      discount: 7,
      badge: "NEW",
      category: "Electronics"
    },

    // Fashion & Accessories
    {
      id: 7,
      name: "Premium Leather Handbag",
      price: 8999,
      originalPrice: 12999,
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
      rating: 4.5,
      reviews: 456,
      discount: 31,
      badge: "SALE",
      category: "Fashion"
    },
    {
      id: 8,
      name: "Designer Sunglasses",
      price: 3499,
      originalPrice: 4999,
      image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg",
      rating: 4.4,
      reviews: 789,
      discount: 30,
      category: "Fashion"
    },
    {
      id: 9,
      name: "Luxury Watch Collection",
      price: 25999,
      originalPrice: 32999,
      image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
      rating: 4.7,
      reviews: 345,
      discount: 21,
      badge: "SALE",
      category: "Fashion"
    },
    {
      id: 10,
      name: "Casual Sneakers",
      price: 4999,
      originalPrice: 6999,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      rating: 4.3,
      reviews: 567,
      discount: 29,
      category: "Fashion"
    },
    {
      id: 11,
      name: "Formal Business Suit",
      price: 15999,
      originalPrice: 19999,
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
      rating: 4.6,
      reviews: 234,
      discount: 20,
      category: "Fashion"
    },
    {
      id: 12,
      name: "Women's Winter Jacket",
      price: 7999,
      originalPrice: 10999,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
      rating: 4.5,
      reviews: 432,
      discount: 27,
      badge: "SALE",
      category: "Fashion"
    },

    // Home & Living
    {
      id: 13,
      name: "Modern Coffee Table",
      price: 12999,
      originalPrice: 16999,
      image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
      rating: 4.6,
      reviews: 234,
      discount: 24,
      badge: "SALE",
      category: "Home"
    },
    {
      id: 14,
      name: "Decorative Plant Pot Set",
      price: 2499,
      originalPrice: 3499,
      image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg",
      rating: 4.4,
      reviews: 678,
      discount: 29,
      category: "Home"
    },
    {
      id: 15,
      name: "LED Desk Lamp",
      price: 3999,
      originalPrice: 5499,
      image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
      rating: 4.5,
      reviews: 432,
      discount: 27,
      category: "Home"
    },
    {
      id: 16,
      name: "Cozy Throw Blanket",
      price: 1999,
      originalPrice: 2999,
      image: "https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg",
      rating: 4.3,
      reviews: 789,
      discount: 33,
      badge: "SALE",
      category: "Home"
    },
    {
      id: 17,
      name: "Dining Table Set",
      price: 24999,
      originalPrice: 29999,
      image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
      rating: 4.7,
      reviews: 156,
      discount: 17,
      category: "Home"
    },
    {
      id: 18,
      name: "Bedroom Wardrobe",
      price: 18999,
      originalPrice: 22999,
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      rating: 4.5,
      reviews: 298,
      discount: 17,
      category: "Home"
    },

    // Audio & Music
    {
      id: 19,
      name: "Wireless Bluetooth Headphones",
      price: 8999,
      originalPrice: 12999,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      rating: 4.6,
      reviews: 1876,
      discount: 31,
      badge: "SALE",
      category: "Audio"
    },
    {
      id: 20,
      name: "Portable Bluetooth Speaker",
      price: 4999,
      originalPrice: 7999,
      image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
      rating: 4.4,
      reviews: 987,
      discount: 38,
      badge: "SALE",
      category: "Audio"
    },
    {
      id: 21,
      name: "Professional Microphone",
      price: 6999,
      originalPrice: 9999,
      image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
      rating: 4.7,
      reviews: 456,
      discount: 30,
      category: "Audio"
    },
    {
      id: 22,
      name: "Gaming Headset RGB",
      price: 5999,
      originalPrice: 7999,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      rating: 4.5,
      reviews: 567,
      discount: 25,
      badge: "HOT",
      category: "Audio"
    },

    // Sports & Fitness
    {
      id: 23,
      name: "Yoga Mat Premium",
      price: 2499,
      originalPrice: 3499,
      image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
      rating: 4.5,
      reviews: 654,
      discount: 29,
      category: "Sports"
    },
    {
      id: 24,
      name: "Fitness Dumbbells Set",
      price: 5999,
      originalPrice: 7999,
      image: "https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg",
      rating: 4.6,
      reviews: 432,
      discount: 25,
      badge: "SALE",
      category: "Sports"
    },
    {
      id: 25,
      name: "Running Shoes",
      price: 7999,
      originalPrice: 10999,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      rating: 4.4,
      reviews: 789,
      discount: 27,
      category: "Sports"
    },
    {
      id: 26,
      name: "Resistance Bands Set",
      price: 1999,
      originalPrice: 2999,
      image: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg",
      rating: 4.3,
      reviews: 345,
      discount: 33,
      category: "Sports"
    },

    // Books & Education
    {
      id: 27,
      name: "Programming Books Collection",
      price: 3999,
      originalPrice: 5999,
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
      rating: 4.7,
      reviews: 234,
      discount: 33,
      category: "Books"
    },
    {
      id: 28,
      name: "Notebook & Pen Set",
      price: 1499,
      originalPrice: 1999,
      image: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg",
      rating: 4.3,
      reviews: 567,
      discount: 25,
      category: "Books"
    },
    {
      id: 29,
      name: "Study Desk Organizer",
      price: 2999,
      originalPrice: 3999,
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      rating: 4.4,
      reviews: 234,
      discount: 25,
      category: "Books"
    },

    // Beauty & Personal Care
    {
      id: 30,
      name: "Skincare Gift Set",
      price: 4999,
      originalPrice: 6999,
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg",
      rating: 4.6,
      reviews: 892,
      discount: 29,
      badge: "SALE",
      category: "Beauty"
    },
    {
      id: 31,
      name: "Professional Hair Dryer",
      price: 3499,
      originalPrice: 4999,
      image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
      rating: 4.4,
      reviews: 345,
      discount: 30,
      category: "Beauty"
    },
    {
      id: 32,
      name: "Makeup Brush Set",
      price: 2499,
      originalPrice: 3499,
      image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg",
      rating: 4.5,
      reviews: 456,
      discount: 29,
      category: "Beauty"
    },

    // Kitchen & Appliances
    {
      id: 33,
      name: "Coffee Maker Machine",
      price: 8999,
      originalPrice: 11999,
      image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
      rating: 4.5,
      reviews: 456,
      discount: 25,
      category: "Kitchen"
    },
    {
      id: 34,
      name: "Blender & Juicer",
      price: 5999,
      originalPrice: 7999,
      image: "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg",
      rating: 4.3,
      reviews: 678,
      discount: 25,
      badge: "SALE",
      category: "Kitchen"
    },
    {
      id: 35,
      name: "Air Fryer Digital",
      price: 7999,
      originalPrice: 9999,
      image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg",
      rating: 4.6,
      reviews: 567,
      discount: 20,
      badge: "HOT",
      category: "Kitchen"
    },

    // Toys & Games
    {
      id: 36,
      name: "Educational Building Blocks",
      price: 2999,
      originalPrice: 3999,
      image: "https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg",
      rating: 4.7,
      reviews: 234,
      discount: 25,
      category: "Toys"
    },
    {
      id: 37,
      name: "Remote Control Drone",
      price: 12999,
      originalPrice: 16999,
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
      rating: 4.6,
      reviews: 345,
      discount: 24,
      badge: "HOT",
      category: "Toys"
    },

    // Automotive
    {
      id: 38,
      name: "Car Phone Mount",
      price: 1499,
      originalPrice: 1999,
      image: "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg",
      rating: 4.4,
      reviews: 567,
      discount: 25,
      category: "Auto"
    },
    {
      id: 39,
      name: "Car Air Freshener Set",
      price: 999,
      originalPrice: 1499,
      image: "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg",
      rating: 4.2,
      reviews: 789,
      discount: 33,
      category: "Auto"
    },
    {
      id: 40,
      name: "Dash Camera HD",
      price: 6999,
      originalPrice: 8999,
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
      rating: 4.5,
      reviews: 234,
      discount: 22,
      category: "Auto"
    }
  ];

  const categories: Category[] = [
    { id: 1, name: "Electronics", icon: "📱", count: allProducts.filter(p => p.category === "Electronics").length },
    { id: 2, name: "Fashion", icon: "👗", count: allProducts.filter(p => p.category === "Fashion").length },
    { id: 3, name: "Home", icon: "🏠", count: allProducts.filter(p => p.category === "Home").length },
    { id: 4, name: "Audio", icon: "🎧", count: allProducts.filter(p => p.category === "Audio").length },
    { id: 5, name: "Sports", icon: "⚽", count: allProducts.filter(p => p.category === "Sports").length },
    { id: 6, name: "Beauty", icon: "💄", count: allProducts.filter(p => p.category === "Beauty").length },
    { id: 7, name: "Kitchen", icon: "🍳", count: allProducts.filter(p => p.category === "Kitchen").length },
    { id: 8, name: "Books", icon: "📚", count: allProducts.filter(p => p.category === "Books").length }
  ];

  const bannerSlides = [
    {
      id: 1,
      title: "Mega Sale Event",
      subtitle: "Up to 70% Off Everything",
      description: "Discover amazing deals across all categories",
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
      color: "from-violet-600 via-purple-600 to-blue-600"
    },
    {
      id: 2,
      title: "Home & Living",
      subtitle: "Transform Your Space",
      description: "Beautiful furniture and decor for every room",
      image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
      color: "from-emerald-500 via-teal-500 to-cyan-600"
    },
    {
      id: 3,
      title: "Fashion Forward",
      subtitle: "Style That Speaks",
      description: "Trendy fashion and accessories for every occasion",
      image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg",
      color: "from-pink-500 via-rose-500 to-red-600"
    },
    {
      id: 4,
      title: "Tech Innovation",
      subtitle: "Future is Here",
      description: "Latest gadgets and electronics at unbeatable prices",
      image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
      color: "from-orange-500 via-amber-500 to-yellow-600"
    }
  ];

  // Filter products based on selected category and show all toggle
  const getDisplayedProducts = () => {
    let products = selectedCategory 
      ? allProducts.filter(product => product.category === selectedCategory)
      : allProducts;

    // If showAllProducts is false and no category is selected, show only first 12 products
    if (!showAllProducts && !selectedCategory) {
      return products.slice(0, 12);
    }

    return products;
  };

  const displayedProducts = getDisplayedProducts();

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-slide banner
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, [bannerSlides.length]);

  // Search functionality
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const searchResults = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (searchResults.length > 0) {
        setSelectedCategory(null); // Clear category filter
        setShowAllProducts(true); // Show all matching results
        alert(`Found ${searchResults.length} products matching "${searchQuery}"`);
        // Here you would update the displayed products
      } else {
        alert(`No products found for "${searchQuery}"`);
      }
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Category selection
  const handleCategorySelect = (categoryName: string) => {
    const isCurrentlySelected = categoryName === selectedCategory;
    
    if (isCurrentlySelected) {
      // Deselecting current category
      setSelectedCategory(null);
      setShowAllProducts(false);
      alert('Showing featured products');
    } else {
      // Selecting new category
      setSelectedCategory(categoryName);
      setShowAllProducts(true); // Show all products in this category
      const categoryProducts = allProducts.filter(product => product.category === categoryName);
      alert(`Showing all ${categoryProducts.length} products in ${categoryName} category`);
    }
  };

  // Cart functionality
  const addToCart = (product: Product) => {
    setAddToCartAnimation(product.id);
    
    setTimeout(() => {
      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
          }];
        }
      });
      setAddToCartAnimation(null);
    }, 600);
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Wishlist functionality
  const toggleWishlist = (productId: number) => {
    setWishlistItems(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Navigation functions
  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderComplete = () => {
    setShowCheckout(false);
    setShowOrderSuccess(true);
    setCartItems([]); // Clear cart after order
  };

  const handleBackToHome = () => {
    setShowOrderSuccess(false);
    setShowCheckout(false);
    setShowCart(false);
  };

  // Newsletter subscription
  const handleNewsletterSubscribe = () => {
    if (email.trim()) {
      alert(`Thank you for subscribing with email: ${email}`);
      setEmail('');
    } else {
      alert('Please enter a valid email address');
    }
  };

  // Banner navigation
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  // Buy Now functionality
  const handleBuyNow = (product?: Product) => {
    if (product) {
      // Add to cart first
      addToCart(product);
      // Then go to checkout
      setTimeout(() => {
        setShowCheckout(true);
      }, 1000);
    } else {
      // For banner buy now
      alert('Redirecting to featured products...');
    }
  };

  // Show all products functionality
  const handleViewAllProducts = () => {
    if (selectedCategory) {
      // If a category is selected, show all products in that category
      setShowAllProducts(true);
      const categoryProducts = allProducts.filter(product => product.category === selectedCategory);
      alert(`Now showing all ${categoryProducts.length} products in ${selectedCategory} category`);
    } else {
      // If no category is selected, show all products from all categories
      setSelectedCategory(null);
      setShowAllProducts(true);
      alert(`Now showing all ${allProducts.length} products from all categories`);
    }
  };

  // Show different components based on state
  if (showOrderSuccess) {
    return <OrderSuccess onBackToHome={handleBackToHome} />;
  }

  if (showCheckout) {
    return (
      <Checkout
        cartItems={cartItems}
        onBack={() => {
          setShowCheckout(false);
          setShowCart(true);
        }}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6">
          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo - Modern Design */}
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => window.location.reload()}>
              <div className="relative">
                <img 
                  src="/shopizio-logo.png" 
                  alt="Shopizio Logo"
                  className="h-16 w-auto object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback Logo */}
                <div className="hidden items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      Shopizio
                    </h1>
                    <p className="text-xs text-gray-500 font-medium">Premium Shopping</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar - Modern Design */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Search for products, brands, and more..."
                  className="w-full px-6 py-4 pl-14 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-gray-900 placeholder-gray-500 transition-all duration-300 group-hover:shadow-md"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                <button 
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-violet-500/25"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Header Actions - Modern Design */}
            <div className="flex items-center space-x-4">
              <button className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors group">
                <Heart className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-violet-600 transition-colors" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-violet-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button 
                onClick={() => alert('User profile functionality would be implemented here')}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <User className="w-6 h-6 text-gray-600 group-hover:text-violet-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* Navigation - Simplified */}
          <nav className="py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors group"
                >
                  <Menu className="w-5 h-5 text-gray-600 group-hover:text-violet-600 transition-colors" />
                  <span className="font-medium text-gray-700 group-hover:text-violet-600 transition-colors">Categories</span>
                </button>
                <a href="#" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">Home</a>
                <a href="#" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">Deals</a>
                <a href="#" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">About</a>
                <a href="#" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">Contact</a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="w-4 h-4 text-emerald-500" />
                <span className="text-gray-600">Free shipping on orders over <span className="font-semibold text-emerald-600">₹999</span></span>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Banner - Modern Design */}
        <section className="relative h-[600px] overflow-hidden">
          {/* Banner Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-violet-600 transition-colors" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-violet-600 transition-colors" />
          </button>

          {bannerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <div className={`h-full bg-gradient-to-br ${slide.color} relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
                
                <div className="container mx-auto px-6 h-full flex items-center relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                    <div className="text-white space-y-6">
                      <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-medium">Limited Time Offer</span>
                      </div>
                      <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-2xl lg:text-3xl font-light opacity-90">
                        {slide.subtitle}
                      </h2>
                      <p className="text-lg opacity-80 max-w-md">
                        {slide.description}
                      </p>
                      <div className="flex items-center space-x-4 pt-4">
                        <button 
                          onClick={() => handleBuyNow()}
                          className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          Shop Now
                        </button>
                        <button className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300">
                          Learn More
                        </button>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <div className="relative">
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="w-full h-96 object-cover rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Banner Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Categories Section - Modern Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-gray-600 text-lg">Discover our diverse collection across multiple categories</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`group relative p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category.name 
                      ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-xl shadow-violet-500/25' 
                      : 'bg-gray-50 hover:bg-gray-100 hover:shadow-lg'
                  }`}
                >
                  <div className="text-center space-y-3">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className={`font-semibold text-sm ${
                      selectedCategory === category.name ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      selectedCategory === category.name 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </div>
                  {selectedCategory === category.name && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-400/20 to-purple-500/20 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Flash Sale Section */}
        <section className="py-16 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600">
          <div className="container mx-auto px-6">
            <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-6 h-6 text-yellow-300" />
                    <span className="text-yellow-300 font-semibold">Flash Sale</span>
                  </div>
                  <h2 className="text-4xl font-bold">Limited Time Offers</h2>
                  <p className="text-white/80 text-lg">Don't miss out on these incredible deals across all categories!</p>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center bg-black/30 rounded-xl p-4">
                      <div className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
                      <div className="text-sm opacity-75">Days</div>
                    </div>
                    <div className="text-center bg-black/30 rounded-xl p-4">
                      <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                      <div className="text-sm opacity-75">Hours</div>
                    </div>
                    <div className="text-center bg-black/30 rounded-xl p-4">
                      <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                      <div className="text-sm opacity-75">Minutes</div>
                    </div>
                    <div className="text-center bg-black/30 rounded-xl p-4">
                      <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                      <div className="text-sm opacity-75">Seconds</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center lg:text-right">
                  <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Shop Flash Sale
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section - Modern Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedCategory ? `${selectedCategory} Collection` : 'Featured Products'}
                </h2>
                <p className="text-gray-600">
                  {selectedCategory 
                    ? `${displayedProducts.length} premium ${selectedCategory.toLowerCase()} products`
                    : showAllProducts 
                      ? `All ${displayedProducts.length} products from our collection`
                      : 'Handpicked products from various categories'
                  }
                </p>
              </div>
              {selectedCategory && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setShowAllProducts(false);
                  }}
                  className="text-violet-600 hover:text-violet-700 font-medium flex items-center space-x-2"
                >
                  <span>View All Categories</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedProducts.map(product => (
                <div key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {product.badge && (
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          product.badge === 'SALE' ? 'bg-red-500 text-white' :
                          product.badge === 'NEW' ? 'bg-emerald-500 text-white' :
                          'bg-orange-500 text-white'
                        }`}>
                          {product.badge}
                        </span>
                      )}
                      {product.discount && (
                        <span className="bg-black/80 text-white px-3 py-1 text-xs font-bold rounded-full">
                          -{product.discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button 
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        wishlistItems.includes(product.id) 
                          ? 'bg-red-500 text-white scale-110' 
                          : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${wishlistItems.includes(product.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick Actions */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => addToCart(product)}
                          disabled={addToCartAnimation === product.id}
                          className="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 py-2 px-4 rounded-xl font-medium hover:bg-white transition-all duration-300"
                        >
                          {addToCartAnimation === product.id ? 'Adding...' : 'Add to Cart'}
                        </button>
                        <button 
                          onClick={() => handleBuyNow(product)}
                          className="bg-violet-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-violet-700 transition-all duration-300"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-violet-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      {product.discount && (
                        <span className="text-emerald-600 font-semibold text-sm">
                          Save ₹{(product.originalPrice! - product.price).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button - Enhanced functionality */}
            <div className="text-center mt-12">
              {!showAllProducts && !selectedCategory && (
                <button 
                  onClick={handleViewAllProducts}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-violet-500/25 flex items-center space-x-3 mx-auto"
                >
                  <Grid className="w-5 h-5" />
                  <span>View All {allProducts.length} Products</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
              
              {selectedCategory && !showAllProducts && (
                <button 
                  onClick={handleViewAllProducts}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-violet-500/25 flex items-center space-x-3 mx-auto"
                >
                  <Grid className="w-5 h-5" />
                  <span>View All {selectedCategory} Products</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
              
              <p className="text-gray-600 mt-4">
                Showing {displayedProducts.length} of {
                  selectedCategory 
                    ? allProducts.filter(p => p.category === selectedCategory).length
                    : allProducts.length
                } products
                {selectedCategory && ` in ${selectedCategory} category`}
              </p>
              
              {showAllProducts && (
                <div className="mt-4 flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-2 text-emerald-600">
                    <Award className="w-5 h-5" />
                    <span className="font-medium">All products displayed</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowAllProducts(false);
                      setSelectedCategory(null);
                    }}
                    className="text-violet-600 hover:text-violet-700 font-medium"
                  >
                    Show Featured Only
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section - Modern Design */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Shopizio?</h2>
              <p className="text-gray-600 text-lg">Experience the difference with our premium services</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Truck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Free Fast Delivery</h3>
                <p className="text-gray-600">Lightning-fast delivery on all orders over ₹999. Get your products in 24-48 hours.</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Headphones className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock customer support to help you with any questions or concerns.</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Shopping</h3>
                <p className="text-gray-600">Your data is protected with bank-level security and 30-day money-back guarantee.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Shopizio</h3>
              </div>
              <p className="text-gray-400">Your premium destination for diverse products across multiple categories.</p>
              <div className="flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleNewsletterSubscribe()}
                />
                <button 
                  onClick={handleNewsletterSubscribe}
                  className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-r-xl transition-colors font-medium"
                >
                  Subscribe
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <div className="space-y-3 text-gray-400">
                <p>123 RS Puram, Coimbatore</p>
                <p>Tamil Nadu 641002, India</p>
                <a href="mailto:support@shopizio.com" className="block hover:text-white transition-colors">
                  support@shopizio.com
                </a>
                <a href="tel:+919876543210" className="block hover:text-white transition-colors">
                  +91 9876543210
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <div className="space-y-3 text-gray-400">
                <button onClick={() => alert('My Account')} className="block hover:text-white transition-colors text-left">My Account</button>
                <button onClick={() => setShowCart(true)} className="block hover:text-white transition-colors text-left">Shopping Cart</button>
                <button onClick={() => alert('Wishlist')} className="block hover:text-white transition-colors text-left">Wishlist</button>
                <button onClick={() => alert('Order Tracking')} className="block hover:text-white transition-colors text-left">Order Tracking</button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Legal</h4>
              <div className="space-y-3 text-gray-400">
                <button onClick={() => alert('Privacy Policy')} className="block hover:text-white transition-colors text-left">Privacy Policy</button>
                <button onClick={() => alert('Terms of Service')} className="block hover:text-white transition-colors text-left">Terms of Service</button>
                <button onClick={() => alert('Return Policy')} className="block hover:text-white transition-colors text-left">Return Policy</button>
                <button onClick={() => alert('FAQ')} className="block hover:text-white transition-colors text-left">FAQ</button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 Shopizio. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-violet-600 transition-colors">
                  <span className="text-sm">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-violet-600 transition-colors">
                  <span className="text-sm">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-violet-600 transition-colors">
                  <span className="text-sm">i</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      {showCart && (
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onClose={() => setShowCart(false)}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default HomePage;