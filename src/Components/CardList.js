/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import Nav from "./Nav";
import Header from "./Header";
import CategorySwipe from "./CategorySwipe";
import { Link } from "react-router-dom";
import sofa from "../Assets/Ads/sofa.JPG";
import blackFriday from "../Assets/Ads/blackFriday.JPG";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import {
  addItem,
  addProducts,
  setFilteredItems,
  setQuery,
  setVisible,
} from "../Redux/store";
import SearchFilters from "./SearchFilters";
import { allCategory, categoryFilter } from "../Data/categoryList";
import countryArr from "../Data/CountryArr";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import ProductsDataService from "../Services/products.services";
import AdGirl from "../Assets/Ads/portraitgirl.JPG";
import AdGuy2 from "../Assets/Ads/portraitguy2.JPG";



export const Card = ({
  title,
  item,
  price,
  rating,
  flag,
  id,
  Height,
  TextAlign,
  Button,
  linkless,
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
    dispatch(addItem({ id, title, item, price }));
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

  return (
    <div className="card" data-aos="fade-up">
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
          <img
            className="card-img-top"
            src={item}
            alt="item"
            height={Height ? Height : "200rem"}
          />
        </Link>
      )}

      <div className="card-body m-0 d-flex justify-content-center flex-column">
        <div className="card-title" style={{ textAlign: TextAlign }}>
          <span style={{ fontSize: "0.8rem" }}>{title}</span>
          {flag ? (
            <span className="mx-1">
              <img
                width="9%"
                src={flag}
                alt="nationality-flag"
                style={{ float: "right" }}
              />
            </span>
          ) : (
            <span></span>
          )}

          <h5 className="price mt-3">{currencySymbol}{currencyFactor * price}</h5>

          {/* stars */}
          <p className="mt-3">{stars}</p>
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
  // ads
  const ads = [
    {
      id: 1,
      title: "Female Collection",
      item: AdGirl,
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      price: "20.99 - 80.99",
      height: "400rem",
      Width: "28%",
      TextAlign: "center",
      Button: (
        <Link to="/category/Clothing" className="btn btn-outline-warning">
          View More
        </Link>
      ),
      linkless: true,
      rating: 5,
    },

    {
      id: 2,
      title: "Men's Collection",
      item: AdGuy2,
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      price: "20.99 - 80.99",
      height: "400rem",
      Width: "28%",
      TextAlign: "center",
      Button: (
        <Link to="/category/Clothing" className="btn btn-outline-warning">
          View More
        </Link>
      ),
      linkless: true,
      rating: 5,
    },
  ];

  const dispatch = useDispatch(); // Move dispatch here

  // const [Products, setProducts] = useState([]);
  const [itemsPerPage] = useState(19);

  const Products = useSelector((state) => state.allProducts);

  const itemsToDisplayBank = Products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const [itemsToDisplay, setItemsToDisplay] = useState(itemsToDisplayBank);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setItemsToDisplay(
      Products.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    );
  }, [currentPage, Products, itemsPerPage]);

  const getProducts = async () => {
    const data = await ProductsDataService.getAllProducts();
    const fetchedProducts = await data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    // setProducts(fetchedProducts);
    dispatch(addProducts(fetchedProducts));
  };

  console.log(Products);

  // Pagination starts here

  const onPageChange = (event) => {
    setCurrentPage(event.page);
  };

  const template3 = {
    layout:
      "RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Filters implementation start here...
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
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
      if(selectedProduct === "Hat"){
        setSearch5Options([
          "Extra small",
          "Small",
          "Medium",
          "Large",
          "X-Large",
          "2X-Large",
        ]);
      }
      else if (selectedProduct === "Bra"){
        setSearch5Bank("Size(UK)");
        setSearch5Options([
          28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48
        ]);
      }
    }

    else if (selectedCategory === "Clothing" || selectedCategory === "Footwear"){
      setSearch5Bank("Size");
      setSearch5Options([
        "Extra small",
        "Small",
        "Medium",
        "Large",
        "X-Large",
        "2X-Large",
        "3X-Large",
        "4X-Large"
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
    } else if (selectedCategory === "Pottery") {
      const pullFilters = allCategory.find((f) => f.name === "Pottery");

      const actualFilter = pullFilters.filters;
      setSearch3Bank("Product");
      setSearch3Options(actualFilter[0].options);
    } else if (selectedCategory === "Furniture") {
      const pullFilters = allCategory.find((f) => f.name === "Furniture");

      const actualFilter = pullFilters.filters;
      setSearch3Bank("Product");
      setSearch3Options(actualFilter[0].options);
    }
  }, [selectedCategory]);

  // const saveFilters = () => {
  //   const newItemstoDisplay = Products.filter(
  //     (product) =>
  //     // product.country === selectedCountry &&
  //     product.category === selectedCategory &&
  //     (selectedProduct === "" || product.detailedCategory === selectedProduct)      
  //   );
  //   setItemsToDisplay(newItemstoDisplay);
  // };

  const saveFilters = () => {
    const newItemstoDisplay = Products.filter((product) => {
      if (
        (selectedCountry === "" || product.country === selectedCountry) &&
        (selectedCategory === "" || product.category === selectedCategory) &&
        (selectedProduct === "" || product.detailedCategory === selectedProduct) &&
        (selectedGender === "" || product.gender === selectedGender) &&
        (selectedSize === "" || product.size === selectedSize)
      ) {
        return true;
      }
      return false;
    });
  
    setItemsToDisplay(newItemstoDisplay);
  };
  
  

  // search feature
  const searchQuery = useSelector((state) => state.search.query);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    dispatch(setQuery(query));

    const filteredItems = Products.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    dispatch(setFilteredItems(filteredItems));
    setItemsToDisplay(filteredItems);
  };

  const isVisible = useSelector((state) => state.search.visible);
  const closeSearch = () => {
    dispatch(setVisible(false));
  };
  // search ends here

  return (
    <>
      {showNestedComponent && <Header />}
      {showNestedComponent === false ? <Nav /> : <></>}
      <div
        className="row p-5 d-flex justify-content-between"
        style={{ padding: "10rem" }}
      >
        {showNestedComponent && <CategorySwipe />}

        {/* search input */}
        {isVisible && (
          <SearchBar
            handleSearchInputChange={handleSearchInputChange}
            searchQuery={searchQuery}
            closePopup={closeSearch}
          />
        )}
        {/* search ends here */}
        <SearchFilters
          search1="Category"
          search2="Country"
          search4={search4bank}
          search3={search3bank}
          search5={search5bank}
          options1={categoryFilter}
          options2={countryArr}
          options3={search3Options}
          options4={search4Options}
          options5={search5Options}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedOption3={selectedProduct}
          setSelectedOption3={setSelectedProduct}
          selectedOption4={selectedGender}
          setSelectedOption4={setSelectedGender}
          selectedOption5={selectedSize}
          setSelectedOption5={setSelectedSize}
          handleSave={saveFilters}
        />


        {/* Iteration */}
        {itemsToDisplay.map((product, index) => (
          <React.Fragment key={uuid()}>
            <div
              className="mt-2 text-decoration-none text-black"
              style={{ width: product.Width || "24%" }}
            >
              <Card
                title={product.title}
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
              />
            </div>

            {index === 6 && showNestedComponent && (
              <div className="container mt-5 mb-5" key={uuid()}>
                <img
                  src={sofa}
                  alt="Sofa"
                  width="100%"
                  style={{ height: "20rem" }}
                />
              </div>
            )}

            {index === 9 && showNestedComponent && (
              <div className="w-25" style={{ float: "right" }}>
                <Card
                  title={ads[0].title}
                  description={ads[0].description}
                  rating={ads[0].rating}
                  price={ads[0].price}
                  item={ads[0].item}
                  flag={ads[0].flag}
                  id={ads[0].id}
                  Height={ads[0].height}
                  TextAlign={ads[0].TextAlign}
                  Button={ads[0].Button}
                  linkless={ads[0].linkless}
                />
              </div>
            )}

            {index === 12 && showNestedComponent && (
              <div className="container mt-5 mb-5" key={uuid()}>
                <img
                  src={blackFriday}
                  alt="Black Friday"
                  width="100%"
                  style={{ height: "20rem" }}
                />
              </div>
            )}

            {index === 16 && showNestedComponent && (
              <div className="w-25" style={{ float: "right" }}>
                <Card
                  title={ads[1].title}
                  description={ads[1].description}
                  rating={ads[1].rating}
                  price={ads[1].price}
                  item={ads[1].item}
                  flag={ads[1].flag}
                  id={ads[1].id}
                  Height={ads[1].height}
                  TextAlign={ads[1].TextAlign}
                  Button={ads[1].Button}
                  linkless={ads[1].linkless}
                />
              </div>
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
        totalRecords={itemsToDisplayBank.length}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default CardList;
