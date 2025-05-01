import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from './components/product-card';
import Nav from '../../Components/Nav';
import { addToShopCart, removeFromShopCart } from '../../Redux/store';
import { useProducts } from './hooks/useProducts';
import { LazyScreen } from './components/lazy-screen';
import { SeeAll } from '../Customize/Configurator/SeeAll';
import {
  textureArrays,
  textureDescriptions,
} from '../Customize/Configurator/arrays/neededArrays';
import TextureItem from '../Customize/Configurator/LoomstoreTextureItem';
import { Disclaimer } from './components/disclaimer';
import { Carousel } from 'primereact/carousel';
import { useAllProducts } from './hooks/useAllProducts';
import { Toast } from 'primereact/toast';
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import CustomizeSize from './customize-size';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { color_variant_options, responsiveOptions } from './Data/products';
import { IoMdCloseCircle } from 'react-icons/io';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import ProductDetailSkeleton from './product-detail-skelton';

const ProductDetail = () => {
  const { id } = useParams();
  const { currentProduct: product } = useSelector((state) => state.loomstore);
  const dispatch = useDispatch();
  const toastRef = useRef(null);
  const shopCart = useSelector((state) => state.shopCart);
  const [openCustomize, setOpenCustomize] = useState(false);
  const [openColors, setOpenColors] = useState(false);
  const [CustomizedSizes, setCustomizedSizes] = useState([]);

  const isInCart = shopCart.some((item) => item.id === id);

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);
  const [quantity, setQuantity] = useState(1);

  // const { data: allProducts, isLoading, error } = useProducts();
  const { data: allProducts, isLoading, error } = useAllProducts();

  const products = allProducts?.pages?.flatMap((page) => page.products) || [];

  // const product = products?.find((item) => item.id === String(id));

  const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes[0] || {
      name: '',
      value: 0,
    },
  );
  const [selectedColor, setSelectedColor] = useState(null);

  const needsTextile = ['order to sew'].includes(product?.grandparent_category);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (product) {
      setSelectedImage(product.images[0] || '');
      setSelectedSize(product.sizes[0] || { name: '', value: 0 });
    }
  }, [id, product]); // Depend on `id` and `product`

  useEffect(() => {
    window.scrollTo(0, 0);
    if (CustomizedSizes.length > 0) {
      setSelectedSize({ name: '', value: 0 });
    } else {
      setSelectedSize(product?.sizes[0] || { name: '', value: 0 });
    }
  }, [CustomizedSizes]);

  const [openSeeAll, setOpenSeeAll] = useState(false);
  const [selectedSeeAll, setSelectedSeeAll] = useState({
    title: '',
    titleDisplay: '',
    array: [],
  });

  const handleOpenSeeAll = (title, titleDisplay, array) => {
    setSelectedSeeAll({ title, titleDisplay, array });
    setOpenSeeAll(true);
  };

  const handleCloseSeeAll = () => {
    setOpenSeeAll(false);
    setSelectedSeeAll({ title: '', titleDisplay: '', array: [] });
  };

  const [selectedPrintOn, setSelectedPrintOn] = useState('');

  const handleTextureChange = (newTexture) => {
    setSelectedColor(null);

    setSelectedPrintOn(newTexture);
  };

  const handleColorChange = (color) => {
    setSelectedPrintOn('');

    setSelectedColor(color);
  };

  const [partsFabrics, setPartsFabrics] = useState([]);
  const [currentPartToApply, setCurrentPartToApply] = useState(null);
  const [openColorTextileDialog, setOpenColorTextileDialog] = useState(false);
  const [openColorDropDown, setOpenColorDropdown] = useState(false);
  const [openTextileDropdown, setOpenTextileDropdown] = useState(false);

  const [selectedFabricType, setSelectedFabricType] = useState('textile');

  const onChangeFabricType = (type) => {
    setSelectedFabricType(type);
  };

  useEffect(() => {
    if (product?.parts?.length) {
      const initial = product.parts.map((part) => ({
        name: part.name,
        value: '',
        type: '',
        allows: part?.allows,
        set_type: part?.type,
      }));
      setPartsFabrics(initial);
    }
  }, [product]);

  // Find related products
  const relatedProducts = product
    ? products
        ?.filter(
          (item) =>
            item.parent_category === product.parent_category &&
            item.child_category === product.child_category &&
            item.id !== product.id,
        )
        .slice(0, 6)
    : [];

  // Base price with no discount
  const originalPrice = (
    (product?.price * quantity + selectedSize?.value) *
    currencyFactor
  ).toLocaleString();

  // Base price with discount applied
  const basePrice = product?.discount
    ? product?.price - (product?.price * product?.discount) / 100
    : product?.price;

  // Adjusted price based on selected size
  const finalPrice = selectedSize
    ? (basePrice + selectedSize?.value) * currencyFactor
    : basePrice * currencyFactor;

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (isInCart) {
      return;
    }

    if (!selectedSize) return;

    if (
      needsTextile &&
      selectedPrintOn === '' &&
      selectedColor === null &&
      product?.parts.length === 0
    ) {
      toastRef.current.show({
        severity: 'error',
        summary: 'Cannot Proceed without selecting a textile / color',
      });
      return;
    }

    if (
      needsTextile &&
      product?.parts?.length > 0 &&
      !partsFabrics.some((part) => part.value && part.value.trim() !== '')
    ) {
      toastRef.current.show({
        severity: 'error',
        summary:
          'Cannot Proceed without selecting a textile / color for applicable parts',
      });
      return;
    }

    dispatch(
      addToShopCart({
        id: product.id,
        name: product.name,
        // base_price: product?.price,
        price: finalPrice,
        selectedSize: selectedSize.name,
        quantity,
        image: product.images[0],
        selectedTextile: selectedPrintOn,
        selectedColor,
        customizedSizes: CustomizedSizes,
        partsFabrics,
      }),
    );
    toastRef.current.show({
      severity: 'success',
      summary: 'Added to cart',
    });

    setCustomizedSizes([]);
    setSelectedColor(null);
    setSelectedPrintOn('');
    setSelectedSize(
      product?.sizes[0] || {
        name: '',
        value: 0,
      },
    );
  };

  const onSaveCustomizeSize = (customizedSizes) => {
    setCustomizedSizes(customizedSizes);
    setOpenCustomize(false);
  };

  const removeCustomSize = (index) => {
    const filteredCustomSize = CustomizedSizes?.filter((_, i) => i !== index);
    setCustomizedSizes(filteredCustomSize);
  };

  // if (error) {
  //   return (
  //     <div className="text-center text-red-500">Error loading products</div>
  //   );
  // }

  // if (!product) {
  //   return <div className="text-center text-xl mt-10">Product not found</div>;
  // }

  const RenderPage = useMemo(() => {
    // if (isLoading) {
    //   return (
    //     <ProductDetailSkeleton />
    //     // <div className="flex justify-center items-center h-screen">
    //     //   <LazyScreen />
    //     // </div>
    //   );
    // }

    if (error) {
      return (
        <div className="text-center text-red-500">Error loading products</div>
      );
    }

    if (!product) {
      return <div className="text-center text-xl mt-10">Product not found</div>;
    }

    <div className="max-w-6xl mx-auto p-6 md:p-10">
      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2">
          {selectedImage && selectedImage !== '' ? (
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-full h-96 object-cover rounded-lg bg-gray-200"></div>
          )}

          {/* Thumbnail Images */}
          <div className="flex gap-2 mt-4">
            {product?.images?.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-contain rounded cursor-pointer border-2 ${
                  selectedImage === img
                    ? 'border-yellow-500'
                    : 'border-gray-300'
                }`}
                onClick={() => setSelectedImage(img)}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col  gap-2 md:gap-4">
          <h2 className="text-lg lg:text-3xl font-bold">{product.name}</h2>

          {/* Price Section */}
          <div className="flex items-center gap-4">
            {product.discount > 0 && (
              <span className="text-gray-400 line-through text-lg">
                {currencySymbol}
                {originalPrice}
              </span>
            )}
            <span className="text-yellow-500 text-2xl font-bold">
              {currencySymbol}
              {(finalPrice * quantity).toLocaleString()}
            </span>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="">
              <h3 className="text-base font-semibold mb-2">Select Size:</h3>
              {needsTextile && (
                <p className="text-sm">
                  Please refer to the product description for detailed size
                  options and guidance.
                </p>
              )}

              {CustomizedSizes.length < 1 ? (
                <div className="flex gap-2">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`px-3 py-2 rounded-full border-2 text-sm ${
                        selectedSize?.name === size.name
                          ? 'border-yellow-500 bg-yellow-500 text-white'
                          : 'border-gray-300'
                      } hover:border-yellow-500 transition`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-4 gap-1 text-xs">
                    {CustomizedSizes?.map((el, index) => (
                      <p
                        key={index}
                        className="leading-none flex items-center justify-between p-2 rounded-md bg-gray-800 text-white"
                      >
                        {el.name}: {el.value}{' '}
                        <button
                          onClick={() => removeCustomSize(index)}
                          className="text-red-400 hover:text-red-600 m-0 p-0 flex-shrink-0"
                        >
                          <IoMdCloseCircle className="w-4 h-4" />
                        </button>
                      </p>
                    ))}
                  </div>
                </>
              )}

              {needsTextile && (
                <button
                  className="flex items-center gap-1 mx-1"
                  onClick={() => {
                    setOpenCustomize(true);
                  }}
                >
                  <p className="text-sm  mt-2 px-2 py-2 rounded-full bg-yellow-500">
                    {CustomizedSizes.length > 0 ? (
                      <AiOutlineEdit size={10} />
                    ) : (
                      <AiOutlinePlus size={8} />
                    )}
                  </p>
                  <span className="text-yellow-500 mb-1">
                    {CustomizedSizes.length > 0
                      ? 'Edit your customized measurements'
                      : 'Customize your own Measurement'}
                  </span>
                </button>
              )}
            </div>
          )}

          {/* parts selection section */}
          {partsFabrics?.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="my-3"
            >
              <div className="flex flex-col gap-1 ">
                <h3 className="text-base font-semibold">Clothing parts</h3>
                <p className="text-sm">
                  Specify textiles / colors for clothing:
                </p>
              </div>

              <div className="no-scrollbar flex flex-col gap-2  pb-2 md:max-w-[40vw]">
                {partsFabrics?.map((part, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <p className="text-yellow-600  capitalize">{part.name}</p>
                    {part?.value ? (
                      part?.type === 'textile' ? (
                        <div
                          className="relative group cursor-pointer flex items-center gap-2"
                          onClick={() => {
                            setCurrentPartToApply(part);
                            setOpenColorTextileDialog(true);
                          }}
                        >
                          <img
                            src={part?.value}
                            alt=""
                            className="texture-button-checkout"
                          />

                          {/* Overlay Edit Icon */}
                          <div
                            onClick={() => {
                              setCurrentPartToApply(part);
                              setOpenColorTextileDialog(true);
                            }}
                            className=""
                          >
                            <AiOutlineEdit className="h-4 w-4 text-gray-700" />
                          </div>
                        </div>
                      ) : (
                        <p className="relative group cursor-pointer flex items-center gap-2">
                          <div
                            className="rounded-full h-10 w-10 border-1 hover:border-yellow-500 transition"
                            style={{ backgroundColor: part.value }}
                          ></div>
                          {/* Overlay Edit Icon */}
                          <div
                            onClick={() => {
                              setCurrentPartToApply(part);
                              setOpenColorTextileDialog(true);
                            }}
                            className=""
                          >
                            <AiOutlineEdit className="h-4 w-4 text-gray-700" />
                          </div>
                        </p>
                      )
                    ) : (
                      <p className="flex items-end justify-end ">
                        <button
                          onClick={() => {
                            setCurrentPartToApply(part);
                            setOpenColorTextileDialog(true);
                          }}
                          className="bg-gray-400 w-fit px-2 py-1 rounded-md whitespace-nowrap"
                        >
                          Click to edit
                        </button>
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <Dialog
                visible={openColorTextileDialog}
                onHide={() => setOpenColorTextileDialog(false)}
                header={
                  <p className="text-sm">
                    Part -{' '}
                    <span className="text-yellow-500 text-base">
                      {currentPartToApply?.name}
                    </span>
                  </p>
                }
                className="p-4 md:w-[40vw] w-[100vw] "
              >
                {currentPartToApply?.set_type === 'designer_discretion' ? (
                  <p className="text-sm italic text-gray-600">
                    This part is reserved for designer discretion and cannot be
                    customized by the user. Our expert designers will make the
                    best choice to ensure a cohesive and stylish final look.
                  </p>
                ) : (
                  <>
                    <section>
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold mb-2">
                            Select Fabric Colors:
                          </h3>

                          {currentPartToApply?.allows === 'color' ||
                          currentPartToApply?.allows === 'both' ? (
                            <button
                              onClick={() => {
                                setOpenTextileDropdown(false);
                                setOpenColorDropdown(!openColorDropDown);
                              }}
                              className="text-yellow-500 flex items-center"
                            >
                              See Colors
                              <AnimatePresence mode="wait" initial={false}>
                                {openColors ? (
                                  <motion.div
                                    key="up"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <HiChevronUp />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="down"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <HiChevronDown />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </button>
                          ) : (
                            <p className="text-red-500 font-bold">N/A</p>
                          )}
                        </div>
                        <p className="text-sm">
                          Select color to be used as material
                        </p>
                      </div>

                      <AnimatePresence initial={false}>
                        {openColorDropDown && (
                          <motion.div
                            key="parts-colors"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="-mx-4 px-0 w-full"
                          >
                            <div className="grid grid-cols-4 gap-2 w-full ">
                              {product.color_variants?.map((color, index) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    setPartsFabrics((prev) =>
                                      prev.map((p) =>
                                        p.name === currentPartToApply.name
                                          ? {
                                              ...p,
                                              value: color.value,
                                              type: 'color',
                                            }
                                          : p,
                                      ),
                                    );
                                    setOpenColorTextileDialog(false); // close after selection
                                    setOpenTextileDropdown(false);
                                    setOpenColorDropdown(false);
                                  }}
                                  className={`flex flex-col items-center space-y-1`}
                                >
                                  <div
                                    className={`rounded-full h-10 w-10 border-1 hover:border-yellow-500 transition ${
                                      selectedColor?.name === color.name
                                        ? 'border-4 border-yellow-500 bg-yellow-500 text-white'
                                        : 'border-1 border-gray-300'
                                    }`}
                                    style={{ backgroundColor: color.value }}
                                  ></div>
                                  <p className="text-sm">{color.name}</p>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </section>

                    <section>
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold mb-2">
                            Select Fabric Textile:
                          </h3>

                          {currentPartToApply?.allows === 'textile' ||
                          currentPartToApply?.allows === 'both' ? (
                            <button
                              onClick={() => {
                                setOpenTextileDropdown(!openTextileDropdown);
                                setOpenColorDropdown(false);
                              }}
                              className="text-yellow-500 flex items-center"
                            >
                              See Textiles
                              <AnimatePresence mode="wait" initial={false}>
                                {openTextileDropdown ? (
                                  <motion.div
                                    key="up"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <HiChevronUp />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="down"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <HiChevronDown />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </button>
                          ) : (
                            <p className="text-red-500 font-bold">N/A</p>
                          )}
                        </div>
                        <p className="text-sm">
                          Select textile to be used as material
                        </p>
                      </div>

                      <AnimatePresence initial={false}>
                        <div className="relative">
                          {openTextileDropdown && (
                            <motion.div
                              key="parts-textiles"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-0 w-full"
                            >
                              <div className="texture-row">
                                <div className="texture-category mt-1">
                                  <div className="w-full flex justify-between capitalize">
                                    <p className="text-sm font-medium text-[#4C5B5C]">
                                      WaxPrint
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-4 gap-3 px-4">
                                    {textureArrays?.waxPrint?.map(
                                      (texture, i) => (
                                        <TextureItem
                                          key={i}
                                          texture={texture}
                                          Title="waxPrint"
                                          selectedTexture={
                                            currentPartToApply.value
                                          }
                                          handleTextureChange={() => {
                                            setPartsFabrics((prev) =>
                                              prev.map((p) =>
                                                p.name ===
                                                currentPartToApply.name
                                                  ? {
                                                      ...p,
                                                      value: texture,
                                                      type: 'textile',
                                                    }
                                                  : p,
                                              ),
                                            );
                                            setOpenColorTextileDialog(false);
                                            setOpenTextileDropdown(false);
                                            setOpenColorDropdown(false);
                                          }}
                                          currencySymbol={currencySymbol}
                                          currencyFactor={currencyFactor}
                                          subTextureDescriptions={
                                            textureDescriptions?.waxPrint
                                          }
                                          textureIndex={i}
                                        />
                                      ),
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </AnimatePresence>
                    </section>
                  </>
                )}
              </Dialog>
            </motion.section>
          )}

          {/* non part dependent color and textile */}
          {product?.grandparent_category === 'order to sew' &&
            partsFabrics?.length === 0 && (
              <section>
                <div className="flex justify-center gap-0 items-center flex-col text-center">
                  <h3 className="text-base  font-semibold ">
                    Select Fabric Colors / Textiles
                  </h3>
                  <p className="text-xs">
                    Your selected clothing requires a textile / color choice
                  </p>
                </div>

                <div className=" flex  items-center justify-center  mt-1 text-xs md:text-sm">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative flex items-center justify-center  bg-white  rounded-full w-fit border-1 border-yellow-400 shadow-md"
                  >
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full"
                      initial={{ width: '50%', left: 0 }}
                      animate={{
                        left: selectedFabricType === 'color' ? '50%' : '0%',
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ width: '50%' }}
                    />

                    <button
                      onClick={() => onChangeFabricType('textile')}
                      className={`relative p-2  w-20 rounded-full transition-all font-semibold z-10 flex justify-center items-center ${
                        selectedFabricType === 'textile'
                          ? 'text-white'
                          : 'text-yellow-600'
                      }`}
                    >
                      Textile
                    </button>

                    <button
                      onClick={() => onChangeFabricType('color')}
                      className={`relative p-2 w-20 rounded-full transition-all font-semibold z-10 flex justify-center items-center ${
                        selectedFabricType === 'color'
                          ? 'text-white'
                          : 'text-yellow-600'
                      }`}
                    >
                      Color
                    </button>
                  </motion.div>
                </div>

                {selectedFabricType === 'color' ? (
                  <>
                    {/* Color Selection */}
                    {(!product?.parts || product?.parts?.length === 0) &&
                      needsTextile &&
                      product.color_variants &&
                      product.color_variants.length > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold mb-2">
                              Select Fabric Colors:
                            </h3>

                            <button
                              onClick={() => setOpenColors(!openColors)}
                              className="text-yellow-500 flex items-center"
                            >
                              See All
                              <AnimatePresence mode="wait" initial={false}>
                                {openColors ? (
                                  <motion.div
                                    key="up"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <HiChevronUp />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="down"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <HiChevronDown />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </button>
                          </div>
                          <p className="text-sm">
                            Select color to be used as material
                          </p>
                          <div className="flex gap-2">
                            {!openColors &&
                              product?.color_variants
                                ?.slice(0, 4)
                                ?.map((color, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleColorChange(color)}
                                    className={`   flex flex-col items-center space-y-1`}
                                  >
                                    <div
                                      className={`rounded-full h-10 w-10 border-1 hover:border-yellow-500 transition ${
                                        selectedColor?.name === color.name
                                          ? 'border-4 border-yellow-500 bg-yellow-500 text-white'
                                          : 'border-1 border-gray-300'
                                      }`}
                                      style={{ backgroundColor: color.value }}
                                    ></div>
                                    <p className="text-sm">{color.name}</p>
                                  </button>
                                ))}
                          </div>
                        </div>
                      )}
                    {/* color dropdown */}
                    <AnimatePresence initial={false}>
                      {openColors && (
                        <motion.div
                          key="colors"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="-mx-4 px-0 w-full"
                        >
                          <div className="grid grid-cols-4 gap-2 w-full ">
                            {product.color_variants?.map((color, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedColor(color)}
                                className={`flex flex-col items-center space-y-1`}
                              >
                                <div
                                  className={`rounded-full h-10 w-10 border-1 hover:border-yellow-500 transition ${
                                    selectedColor?.name === color.name
                                      ? 'border-4 border-yellow-500 bg-yellow-500 text-white'
                                      : 'border-1 border-gray-300'
                                  }`}
                                  style={{ backgroundColor: color.value }}
                                ></div>
                                <p className="text-sm">{color.name}</p>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <>
                    {/* textiltes */}
                    {(!product?.parts || product?.parts?.length === 0) &&
                      needsTextile && (
                        <div>
                          <p className="flex flex-col gap-0 mt-4">
                            <h3 className="text-base font-semibold mb-0">
                              Choose Textile
                            </h3>
                            <p className="text-sm">
                              Select textile to be used as material
                            </p>
                          </p>
                          <div className="texture-buttons-container">
                            <AnimatePresence>
                              {openSeeAll ? (
                                <SeeAll
                                  array={selectedSeeAll.array}
                                  title={selectedSeeAll.title}
                                  titleDisplay={selectedSeeAll.titleDisplay}
                                  onClose={handleCloseSeeAll}
                                  others={{
                                    selectedPrintOn,
                                    handleTextureChange,
                                    currencySymbol,
                                    currencyFactor,
                                  }}
                                />
                              ) : (
                                <div className="-mt-5">
                                  <div className="w-full flex justify-between capitalize ">
                                    <p className="text-sm font-medium text-[#4C5B5C]">
                                      WaxPrint
                                    </p>
                                    <p
                                      onClick={() =>
                                        handleOpenSeeAll(
                                          'waxPrint',
                                          'waxPrint',
                                          textureArrays?.waxPrint,
                                        )
                                      }
                                      className="flex items-center gap-1 cursor-pointer text-sm text-[#ffc107] hover:font-semibold"
                                    >
                                      See all
                                      <HiChevronDown />
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-4 gap-3 px-4">
                                    {textureArrays?.waxPrint
                                      ?.slice(0, 4)
                                      .map((texture, index) => (
                                        <TextureItem
                                          key={texture}
                                          texture={texture}
                                          // setHideText={setHideText}
                                          Title="waxPrint"
                                          selectedTexture={selectedPrintOn}
                                          handleTextureChange={
                                            handleTextureChange
                                          }
                                          currencySymbol={currencySymbol}
                                          currencyFactor={currencyFactor}
                                          subTextureDescriptions={
                                            textureDescriptions?.waxPrint
                                          }
                                          textureIndex={index}
                                        />
                                      ))}
                                  </div>
                                </div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      )}
                  </>
                )}
              </section>
            )}

          {/* Quantity Selection */}
          <div className="">
            <h3 className="text-base font-semibold mb-2">Select Quantity:</h3>
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
              >
                -
              </button>
              <span className="text-sm font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
              >
                +
              </button>
            </div>
          </div>

          <p className="text-sm  font-semibold mt-2 text-yellow-500 ">
            Ready in:{' '}
            <span className="text-sm text-gray-600 font-medium uppercase">
              {product.ready_in || '7 days'}
            </span>
          </p>

          {/* Add to Cart Button */}
          <button
            disabled={
              !isInCart &&
              !selectedSize &&
              (selectedColor === null || selectedPrintOn === '')
            }
            onClick={handleAddToCart}
            className={`mt-6  text-white px-6 py-3 rounded-lg  transition disabled:opacity-50 disabled:hover:bg-yellow-500 disabled:cursor-not-allowed ${
              isInCart
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
          >
            {isInCart ? 'Already In cart' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-4 lg:mt-10">
        <p className="text-sm text-gray-400 mt-2">
          Category: {product.grandparent_category} {product.parent_category} :{' '}
          {product.child_category}
        </p>
        <h3 className="text-base font-semibold mb-2">Description:</h3>
        <p className="text-gray-500 mt-2 break-words whitespace-pre-line">
          {product?.description || 'No description available.'}
        </p>
      </div>

      {/* Related Products */}
      {!isLoading && relatedProducts?.length > 0 && (
        <div className="mt-16 relative">
          <h3 className="text-lg md:text-2xl font-bold mb-6">
            Related Products
          </h3>
          <Carousel
            value={relatedProducts}
            numVisible={3} // Ensure 3 items are visible on desktop
            numScroll={1}
            responsiveOptions={responsiveOptions}
            itemTemplate={(item) => {
              return (
                <div className="px-2">
                  <ProductCard product={item} />
                  {/* <ProductCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      discount={item.discount}
                      images={item.images}
                    /> */}
                </div>
              );
            }}
            showIndicators={false} // Hide default dots
            showNavigators={true} // Show navigation arrows
            circular // Infinite loop
            autoplayInterval={1200} // Auto-scroll every 3 seconds
          />
        </div>
      )}
    </div>;
  }, [product, error]);

  return (
    <>
      <Nav />
      <Toast ref={toastRef} />

      {needsTextile && <Disclaimer />}

      {RenderPage}

      {openCustomize && (
        <CustomizeSize
          CustomizedSizes={CustomizedSizes}
          onHide={() => {
            setOpenCustomize(false);
          }}
          openCustomize={openCustomize}
          options={product?.custom_sizes}
          onSaveCustomizeSize={onSaveCustomizeSize}
        />
      )}
    </>
  );
};

export default ProductDetail;
