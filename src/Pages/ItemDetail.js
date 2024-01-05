import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import { Link, useParams } from "react-router-dom";
import { TabPanel, TabView } from "primereact/tabview";
import { Carousel } from "primereact/carousel";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Redux/store";

const ItemDetail = ({ match }) => {
  const { productId } = useParams();

  const Products = useSelector((state) => state.allProducts.products);

  const product = Products.find((p) => p.id === productId);

  const [count] = useState(1);

  // const handleIncrement = () => {
  //   setCount(count + 1);
  // };

  // const handleDecrement = () => {
  //   if (count > 1) {
  //     setCount(count - 1);
  //   }
  // };

  // Redux
  const dispatch = useDispatch();

  const starFilled = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-star-fill"
      viewBox="0 0 16 16"
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );

  const starUnfilled = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-star"
      viewBox="0 0 16 16"
    >
      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
    </svg>
  );

  const stars = [];
  for (let i = 0; i < product.rating; i++) {
    stars.push(
      <i key={i} className=" text-warning fs-3">
        {starFilled}
      </i>
    );
  }
  for (let i = product.rating; i < 5; i++) {
    stars.push(
      <i key={i} className="text-warning fs-3">
        {starUnfilled}
      </i>
    );
  }

  // Create a state variable to store extras, including the initial product.item

  const [extras, setExtras] = useState([
    product.item,
    ...(product.extras ? product.extras : []),
  ]);

  const [selectedImage, setSelectedImage] = useState(product.item); // Initially set to product.item
  const handleExtraClick = (extraImage) => {
    setSelectedImage(extraImage);
  };

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const augmentedPrice = currencyFactor * product.price * count;

  let discountedPrice = product.price; // Default to the original price

  if (product.discount && product.discount > 0) {
    const discountPercentage = product.discount / 100;
    discountedPrice =
      (1 - discountPercentage) * currencyFactor * product.price * count;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(product.item);
    setExtras([product.item, ...(product.extras ? product.extras : [])]);
  }, [product.extras, product.item, productId]);

  //related products
  // const relatedProducts = Products.filter(p => p.category !== parseInt(productId)).slice(0, 5);
  const relatedProducts = Products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 5);

  const productTemplate = (relatedProduct) => {
    const relatedPrice = currencyFactor * relatedProduct.price;

    let relatedDiscountedPrice = relatedProduct.price; // Default to the original price

    if (relatedProduct.discount && relatedProduct.discount > 0) {
      const discountPercentage = relatedProduct.discount / 100;
      relatedDiscountedPrice =
        (1 - discountPercentage) * currencyFactor * product.price * count;
    }
    return (
      <div className="text-center p-3 related-products">
        <Link to={`/product/${relatedProduct.id}`} >
          <img
            src={relatedProduct.item}
            alt={relatedProduct.title}
            className="shadow-2 mt-3"
            width="50%"
            height="50%"
            style={{ aspectRatio: 1/1 }}
          />
        </Link>
        <div>
          <p>{relatedProduct.title}</p>
          <p className="h3">
            {relatedProduct.discount ? (
              <div>
                <h6>
                  <del>{currencySymbol + relatedPrice.toFixed(2)}</del>
                </h6>
                <h5>{currencySymbol + relatedDiscountedPrice.toFixed(2)}</h5>
              </div>
            ) : (
              <h5>{currencySymbol + relatedPrice.toFixed(2)} </h5>
            )}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white">
      <Nav />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 d-flex">
            {extras ? (
              <div className="d-flex flex-column mx-1" style={{ width: "10%" }}>
                {extras.map((extra, index) => (
                  <img
                    className="mb-1"
                    src={extra}
                    key={index}
                    alt={extra + " " + index}
                    onClick={() => handleExtraClick(extra)}
                  />
                ))}
              </div>
            ) : (
              ""
            )}

            <div className="col-10 h-100">
              <img
                src={selectedImage}
                alt={product.title}
                width="100%"
                height="400rem"
                className="main-product-image"
              />
            </div>
          </div>
          <div className="col-md-6 product-info">
            <h3 className="mb-3 product-title">{product.title}</h3>
            {/* <p className="mb-3">{product.description}</p> */}
            <hr />
            <div className="d-flex mb-3">{stars}</div>
            {/* <div className="mb-3">
              {product.rating.toFixed(1)} ({product.reviews} reviews)
            </div> */}

            <p className="h3">
              {product.discount ? (
                <div>
                  <span className="original-price">
                    {currencySymbol + augmentedPrice.toFixed(2)}
                  </span>
                  <span className="discounted-price mx-3">
                    {currencySymbol + discountedPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span>{currencySymbol + augmentedPrice.toFixed(2)} </span>
              )}
            </p>
            <button
              className="btn btn-lg mt-3 bg-warning text-white"
              onClick={(
                id = product.id,
                title = product.title,
                item = product.item,
                weight = product.weight,
                price = product.discount ? discountedPrice : augmentedPrice,
                seller = product.seller
              ) => {
                dispatch(
                  addItem({ id, title, item, price, count, weight, seller })
                );
                // show();
              }}
            >
              Add to Cart
            </button>
            <div className="mt-5">
              <h4>Seller</h4>
              <p>{product.seller} </p>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="container">
        <TabView className="mt-2">
          <TabPanel header="Description">
            {product.description || "No description for this product"}
          </TabPanel>
          {/* <TabPanel header="Reviews">
            {product.rating} reviews for this product
          </TabPanel> */}
          <TabPanel header="Sold By">{product.seller} </TabPanel>
        </TabView>
      </div>
      <div className="container mt-5">
        <h4 className="text-center">Related Products</h4>
        <Carousel
          value={relatedProducts}
          numVisible={3}
          numScroll={1}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={productTemplate}
        />
      </div>
    </div>
  );
};

export default ItemDetail;
