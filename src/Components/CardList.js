/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import Nav from "./Nav";
import Header from "./Header";
import CategorySwipe from "./CategorySwipe";
import { Link } from "react-router-dom";
// import sofa from "../Assets/Ads/sofa.JPG";
// import blackFriday from "../Assets/Ads/blackFriday.JPG";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/store";
import SearchFilters from "./SearchFilters";
import { allCategory, categoryFilter } from "../Data/categoryList";
import countryArr, { countryFlags } from "../Data/CountryArr";
import { useSelector } from "react-redux";
// import AdGirl from "../Assets/Ads/portraitgirl.JPG";
// import AdGuy2 from "../Assets/Ads/portraitguy2.JPG";
import Row from "./offers/Row";
import Banner from "./offers/Banner";
import { getPriceRangeOptions } from "../Data/PriceRangeData";
import { Dialog } from "primereact/dialog";
import { isMobile } from "../utils/constants";

export const Card = ({
  title,
  discount,
  item,
  price,
  rating,
  flag,
  id,
  Height,
  TextAlign,
  Button,
  linkless,
  weight,
  seller,
  country,
}) => {
  // Toastify
  const toast = useRef(null);

  const show = () => {
    toast.current.show({
      severity: "info",
      summary: "Added Successfully",
      detail: "Click on cart to checkout item",
    });
  };

  // Redux
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id,
        title,
        item,
        price: discountedPrice ? discountedPrice : price,
        weight,
        seller,
      })
    );
    show();
  };

  // currency conversion
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  // Stars
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
  }
  for (let i = rating; i < 5; i++) {
    stars.push(<i key={i} className="bi bi-star text-warning"></i>);
  }

  // discount
  let discountedPrice = price; // Default to the original price

  if (discount && discount > 0) {
    const discountPercentage = discount / 100;
    discountedPrice = (1 - discountPercentage) * price;
  }

  const flagImage = countryFlags[country] || ""; // Use flag image URL based on the country

  return (
    <div
      className="card mt-1 text-decoration-none text-black"
      data-aos="fade-up"
    >
      <Toast ref={toast} />

      {linkless ? (
        <img
          className=""
          data-aos="zoom-in"
          data-aos-duration="1500"
          src={item}
          alt="item"
          height={Height ? Height : "200rem"}
        />
      ) : (
        <Link to={`/product/${id}`}>
          <img className="card-img-top " src={item} alt="item" />
        </Link>
      )}

      <div className="card-body d-flex flex-column">
        <div>
          <div className="d-flex justify-content-between align-items-start">
          <div style={{ flex: 5, whiteSpace: "nowrap" }}>{title}</div>
            <div
              className="flag"
              style={{ flex: 1, translate: "0 0.5rem", float: "right" }}
            >
              {country ? (
                <div className="mx-1" style={{ fontSize: "0.8rem" }}>
                  <img
                    width="100%"
                    src={flagImage}
                    alt={country}
                    style={{ float: "right" }}
                  />
                </div>
              ) : (
                <span></span>
              )}
            </div>
          </div>

          <h5 className="price">
            {discount && discount > 0 ? (
              <>
                <div>
                  <span className="original-price">
                    {currencySymbol}
                    {(currencyFactor * price).toFixed(2)}
                  </span>
                  <span className="discount-off"> {discount}% off</span>
                </div>
                <span className="discounted-price">
                  {currencySymbol}
                  {(currencyFactor * discountedPrice).toFixed(2)}
                </span>
              </>
            ) : (
              // If no discount, display the regular price
              // `${currencySymbol}${(currencyFactor * price).toFixed(2)}`
              <div className="original-price-untouched">
                {currencySymbol}
                {(currencyFactor * price).toFixed(2)}
              </div>
            )}
          </h5>

          {/* stars */}
          {/* <p className="mt-3">{stars}</p> */}
        </div>

        {Button || (
          <button className="btn btn-outline-warning" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

const CardList = ({ currentPage, setCurrentPage, showNestedComponent }) => {
  const [itemsPerPage] = useState(24);

  const Products = useSelector((state) => state.allProducts.products);

  const itemsToDisplayBank = Products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const [itemsToDisplay, setItemsToDisplay] = useState(itemsToDisplayBank);

  useEffect(() => {
    setItemsToDisplay(
      Products.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    );
  }, [currentPage, Products, itemsPerPage]);

  // Pagination starts here

  const onPageChange = (event) => {
    setCurrentPage(event.page);
  };

  const template3 = {
    layout:
      "RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport",
  };

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const priceRangeOptions = getPriceRangeOptions(
    currencySymbol,
    currencyFactor
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Filters implementation start here...
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [search3bank, setSearch3Bank] = useState("");
  const [search4bank, setSearch4Bank] = useState("");
  const [search5bank, setSearch5Bank] = useState("");

  const [search4Options, setSearch4Options] = useState("");
  const [search3Options, setSearch3Options] = useState("");
  const [search5Options, setSearch5Options] = useState("");

  useEffect(() => {
    if (selectedCategory !== "") {
      setSearch4Bank("Gender");
      setSearch4Options(["Male", "Female"]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory === "Accessories") {
      setSearch5Bank("Size");
      if (selectedProduct === "Hat") {
        setSearch5Options([
          "Extra small",
          "Small",
          "Medium",
          "Large",
          "X-Large",
          "2X-Large",
        ]);
      } else if (selectedProduct === "Bra") {
        setSearch5Bank("Size(UK)");
        setSearch5Options([28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48]);
      }
    } else if (
      selectedCategory === "Clothing" ||
      selectedCategory === "Footwear"
    ) {
      setSearch5Bank("Size");
      setSearch5Options([
        "Extra small",
        "Small",
        "Medium",
        "Large",
        "X-Large",
        "2X-Large",
        "3X-Large",
        "4X-Large",
      ]);
    }
  }, [selectedCategory, selectedProduct]);

  useEffect(() => {
    if (selectedCategory === "Accessories") {
      const pullFilters = allCategory.find((f) => f.name === "Accessories");

      const actualFilter = pullFilters.filters;
      setSearch3Bank("Product");
      setSearch3Options(actualFilter[1].options);
    } else if (selectedCategory === "Clothing") {
      const pullFilters = allCategory.find((f) => f.name === "Clothing");

      const actualFilter = pullFilters.filters;
      setSearch3Bank("Product");
      setSearch3Options(actualFilter[1].options);
    } else if (selectedCategory === "Textiles") {
      const pullFilters = allCategory.find((f) => f.name === "Textiles");

      const actualFilter = pullFilters.filters;
      setSearch3Bank("Product");
      setSearch3Options(actualFilter[0].options);
    } else if (selectedCategory === "Footwear") {
      const pullFilters = allCategory.find((f) => f.name === "Footwear");

      const actualFilter = pullFilters.filters;
      setSearch3Bank("Product");
      setSearch3Options(actualFilter[1].options);
    } else if (selectedCategory === "Basketry") {
      const pullFilters = allCategory.find((f) => f.name === "Basketry");

      const actualFilter = pullFilters.filters;
      setSearch3Bank("Product");
      setSearch3Options(actualFilter[0].options);
      setSearch4Bank("");
    } else if (selectedCategory === "Pottery") {
      const pullFilters = allCategory.find((f) => f.name === "Pottery");

      const actualFilter = pullFilters.filters;
      setSearch3Bank("Product");
      setSearch3Options(actualFilter[0].options);
      setSearch4Bank("");
    } else if (selectedCategory === "Furniture") {
      const pullFilters = allCategory.find((f) => f.name === "Furniture");
      const actualFilter = pullFilters.filters;
      setSearch3Bank("Product");
      setSearch3Options(actualFilter[0].options);
      setSearch4Bank("");
    } else if (selectedCategory === "Handicrafts") {
      const pullFilters = allCategory.find((f) => f.name === "Handicrafts");
      const actualFilter = pullFilters.filters;
      setSearch3Bank("Product");
      setSearch3Options(actualFilter[0].options);
      setSearch4Bank("");
    }
  }, [selectedCategory]);

  const saveFilters = () => {
    const newItemstoDisplay = Products.filter((product) => {
      if (
        (selectedCountry === "" || product.country === selectedCountry) &&
        (selectedCategory === "" || product.category === selectedCategory) &&
        (selectedProduct === "" ||
          product.detailedCategory === selectedProduct) &&
        (selectedGender === "" || product.gender === selectedGender) &&
        (selectedSize === "" || product.size === selectedSize) &&
        (selectedPriceRange === "" ||
          (selectedPriceRange === 10 * currencyFactor &&
            product.price * currencyFactor < 10 * currencyFactor) ||
          (selectedPriceRange === 201 * currencyFactor &&
            product.price * currencyFactor > 200 * currencyFactor) ||
          (selectedPriceRange === 25 * currencyFactor &&
            product.price * currencyFactor >= 10 * currencyFactor &&
            product.price * currencyFactor <= 25 * currencyFactor) ||
          (selectedPriceRange === 50 * currencyFactor &&
            product.price * currencyFactor >= 25 * currencyFactor &&
            product.price * currencyFactor <= 50 * currencyFactor) ||
          (selectedPriceRange === 100 * currencyFactor &&
            product.price * currencyFactor >= 50 * currencyFactor &&
            product.price * currencyFactor <= 100 * currencyFactor) ||
          (selectedPriceRange === 200 * currencyFactor &&
            product.price * currencyFactor >= 100 * currencyFactor &&
            product.price * currencyFactor <= 200 * currencyFactor))
      ) {
        return true;
      }
      return false;
    });

    setItemsToDisplay(newItemstoDisplay);
  };

  const [showSearch, setshowSearch] = useState(false);

  return (
    <>
      {showNestedComponent && <Header />}
      {showNestedComponent === false ? <Nav /> : <></>}
      <div className="row px-3 d-flex">
        {showNestedComponent && <CategorySwipe />}

        <div
          onClick={() => setshowSearch(!showSearch)}
          className="advanced-search-button rounded-circle"
        >
          <span
            className="pi pi-search-plus"
            style={{ fontSize: "1.4rem" }}
          ></span>
        </div>

        {/* {showNestedComponent && !isMobile && <Row offerFix="Professionals" />} */}

        {showNestedComponent && <Row offerFix="One" />}

        <Dialog
          header="Advanced Search"
          visible={showSearch}
          className="col-10 col-sm-3 search-banner"
          onHide={() => {
            setshowSearch(false);
          }}
          dismissableMask={true}
        >
          <SearchFilters
            search1="Category"
            search2="Country"
            searchPrice="Price Range" // price filter
            search4={search4bank}
            search3={search3bank}
            search5={search5bank}
            options1={categoryFilter}
            options2={countryArr}
            optionPrice={priceRangeOptions} // price filter
            options3={search3Options}
            options4={search4Options}
            options5={search5Options}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedPriceRange={selectedPriceRange} // price
            setSelectedPriceRange={setSelectedPriceRange} // price
            selectedOption3={selectedProduct}
            setSelectedOption3={setSelectedProduct}
            selectedOption4={selectedGender}
            setSelectedOption4={setSelectedGender}
            selectedOption5={selectedSize}
            setSelectedOption5={setSelectedSize}
            handleSave={saveFilters}
          />
        </Dialog>


        {/* Iteration */}
        {itemsToDisplay.map((product, index) => (
          <React.Fragment>
            <div className="col-6 col-sm-2 product-card-container">
              <Card
                key={index}
                title={product.title}
                discount={product.discount}
                description={product.description}
                rating={product.rating}
                price={product.price}
                item={product.item}
                flag={product.flag}
                id={product.id}
                Height={product.height}
                TextAlign={product.TextAlign}
                Button={product.Button}
                linkless={product.linkless}
                weight={product.weight}
                seller={product.seller}
                country={product.country}
              />
            </div>

            {index === 11 && showNestedComponent && (
              <>
                <Banner
                  key={uuid()}
                  bannerFix="One"
                  headTitle="Discover the Timeless Beauty of African Handicraft"
                  seeMore="See More"
                  linkTo="/category/Handicrafts"
                />
              </>
            )}

            {/* banner 1 */}
            {index === 17 && showNestedComponent && (
              <>
                <Banner
                  key={uuid()}
                  bannerFix="Five"
                  headTitle="Time is running out on these Great Discounts"
                  seeMore="See More"
                  linkTo="/offers/discounts"
                />
                <Row offerFix="Six" />
              </>
            )}

            {index === 23 && showNestedComponent && (
              <>
                <Banner
                  // items={bannereight}
                  key={uuid()}
                  bannerFix="Eight"
                  headTitle="Discover Elegant African Fabrics"
                  seeMore="See More"
                  linkTo="/category/Textiles"
                />

                <Row offerFix="Nine" />
                <Banner
                  key={uuid()}
                  bannerFix="Ten"
                  headTitle="Low Cost, High Quality Furniture"
                  seeMore="See More"
                  linkTo="/category/Furniture"
                />
              </>
            )}
          </React.Fragment>
        ))}
        {/* Iteration ends here */}
      </div>
      <Paginator
        template={template3.layout}
        currentPage={currentPage}
        first={currentPage * itemsPerPage}
        rows={itemsPerPage}
        totalRecords={Products.length}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default CardList;
