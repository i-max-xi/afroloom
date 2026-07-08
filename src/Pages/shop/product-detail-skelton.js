export default function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-10 animate-pulse max-w-6xl mx-auto p-6 md:p-10">
      {/* Left Side - Image Gallery */}
      <div className="w-full md:w-1/2 flex flex-col">
        {/* Main Image */}
        <div className="w-full h-96 bg-gray-300 rounded-lg"></div>

        {/* Thumbnail Images */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="w-16 h-16 bg-gray-300 rounded-md" />
          ))}
        </div>
      </div>

      {/* Right Side - Product Info */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Product Name */}
        <div className="h-8 w-3/4 bg-gray-300 rounded-md"></div>

        {/* Price Section */}
        <div className="flex items-center gap-4">
          <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
          <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
        </div>

        {/* Size Selection */}
        <div className="flex flex-col gap-2">
          <div className="h-6 w-1/3 bg-gray-300 rounded-md"></div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="h-8 w-16 bg-gray-300 rounded-full" />
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="flex flex-col gap-2">
          <div className="h-6 w-1/3 bg-gray-300 rounded-md"></div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
            <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
            <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
          </div>
        </div>

        {/* Ready In */}
        <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>

        {/* Add to Cart Button */}
        <div className="h-12 w-full bg-gray-300 rounded-lg mt-4"></div>
      </div>
    </div>
  );
}
