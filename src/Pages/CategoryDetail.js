/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../Components/Nav";
import { allCategory } from "../Data/categoryList";
import { Card } from "../Components/CardList";
import footwear from "../Assets/Headers/categories/Footwear.jpg";
import accessories from "../Assets/Headers/categories/Acessories.jpg";
import clothing from "../Assets/Headers/categories/clothing.jpg";
import textiles from "../Assets/Headers/categories/Textiles.jpg";
import handicraft from "../Assets/Headers/categories/handicraft.JPG";
import pottery from "../Assets/Headers/categories/pottery.jpg";
import furniture from "../Assets/Headers/categories/Furniture.jpg";
import basketry from "../Assets/Headers/categories/basketry.jpg";

import { Paginator } from "primereact/paginator";
import SearchFilters from "../Components/SearchFilters";
import { useSelector } from "react-redux";
import { getPriceRangeOptions } from "../Data/PriceRangeData";
import { Dialog } from "primereact/dialog";

const CategoryDetail = ({ option }) => {
  const { categoryName } = useParams();

  let url;
  if (categoryName === "Footwear") {
    url = footwear;
  } else if (categoryName === "Accessories") {
    url = accessories;
  } else if (categoryName === "Clothing") {
    url = clothing;
  } else if (categoryName === "Textiles") {
    url = textiles;
  } else if (categoryName === "Furniture") {
    url = furniture;
  } else if (categoryName === "Pottery") {
    url = pottery;
  } else if (categoryName === "Basketry") {
    url = basketry;
  } else if (categoryName === "Handicrafts") {
    url = handicraft;
  } else {
    url = ""; // fallback URL
  }

  const Products = useSelector((state) =>
    state.allProducts?.products?.filter((p) => p?.category === categoryName)
  );

  // const category = allCategory.find((p) => p.id === parseInt(categoryId));
  // const [Products, setProducts] = useState([]);

  // useEffect(() => {
  //   setProducts(products?.filter((p) => p.category === categoryName));
  // }, [categoryName]);

  // currency conversion
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);
  const priceRangeOptions = getPriceRangeOptions(
    currencySymbol,
    currencyFactor
  );

  const pullFilters = allCategory.find((f) => f.name === categoryName);

  const actualFilter = pullFilters.filters;

  // Pagination starts here
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(24);

  const onPageChange = (event) => {
    setCurrentPage(event.page);
  };

  const itemsToDisplayBank = Products?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const [itemsToDisplay, setitemsToDisplay] = useState(itemsToDisplayBank);

  useEffect(() => {
    setitemsToDisplay(
      Products.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    );
  }, [currentPage, categoryName]);


  const template3 = {
    layout:
      "RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Filter system
  const [typeBank, setTypeBank] = useState([]);
  const [sizeBank, setSizeBank] = useState([]);
  const [sizeName, setSizeName] = useState(
    actualFilter[2] ? actualFilter[2].name : ""
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const saveFilters = () => {
    const newItemstoDisplay = Products.filter((product) => {
      if (
        (selectedCountry === "" || product.country === selectedCountry) &&
        (selectedCategory === "" || product.category === selectedCategory) &&
        (selectedOption3 === "" || product.size === selectedOption3) &&
        (selectedPriceRange === "" ||
          (selectedPriceRange === 100 * currencyFactor &&
            product.price * currencyFactor < 100 * currencyFactor) ||
          (selectedPriceRange === 2001 * currencyFactor &&
            product.price * currencyFactor > 2000 * currencyFactor) ||
          (selectedPriceRange === 250 * currencyFactor &&
            product.price * currencyFactor >= 100 * currencyFactor &&
            product.price * currencyFactor <= 250 * currencyFactor) ||
          (selectedPriceRange === 500 * currencyFactor &&
            product.price * currencyFactor >= 250 * currencyFactor &&
            product.price * currencyFactor <= 500 * currencyFactor) ||
          (selectedPriceRange === 1000 * currencyFactor &&
            product.price * currencyFactor >= 500 * currencyFactor &&
            product.price * currencyFactor <= 1000 * currencyFactor) ||
          (selectedPriceRange === 2000 * currencyFactor &&
            product.price * currencyFactor >= 1000 * currencyFactor &&
            product.price * currencyFactor <= 2000 * currencyFactor))
      ) {
        return true;
      }
      return false;
    });

    setitemsToDisplay(newItemstoDisplay);
  };

  // Conditionally render type

  useEffect(() => {
    if (selectedCategory === "Male") {
      setTypeBank(actualFilter[1].maleOptions);
    } else if (selectedCategory === "Female") {
      setTypeBank(actualFilter[1].femaleOptions);
    } else {
      setTypeBank(actualFilter[1] ? actualFilter[1].options : []);
    }
  }, [selectedCategory]);

  // Conditionally render size
  useEffect(() => {
    if (selectedCountry === "Hat") {
      setSizeBank(actualFilter[2].hatOptions);
    } else if (selectedCountry === "Belt") {
      setSizeBank(actualFilter[2].hatOptions);
    } else if (selectedCountry === "Bra") {
      setSizeBank(actualFilter[2].braOptions);
      setSizeName("Size (UK)");
    } else {
      setSizeBank(actualFilter[2] ? actualFilter[2].options : []);
      setSizeName(actualFilter[2] ? actualFilter[2].name : "");
    }
  }, [selectedCountry]);

  const [showSearch, setshowSearch] = useState(false);

  return (
    <>
      <Nav />
      <div
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "15rem",
          width: "100%",
        }}
        className="page-banner"
      ></div>
      <div className="container category-items-container ">
        <div className="row d-flex justify-content-between">
          {actualFilter[0].options.length >= 1 && (
            <>
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
                  search1={actualFilter[0].name}
                  options1={actualFilter[0].options}
                  selectedCategory={selectedCategory}
                  optionPrice={priceRangeOptions} // price filter
                  selectedPriceRange={selectedPriceRange} // price
                  setSelectedPriceRange={setSelectedPriceRange} // price
                  setSelectedCategory={setSelectedCategory}
                  search2={actualFilter[1] ? actualFilter[1].name : ""}
                  options2={actualFilter[1] ? typeBank : []}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  search3={actualFilter[2] ? sizeName : ""}
                  options3={actualFilter[2] ? sizeBank : []}
                  selectedOption3={selectedOption3}
                  setSelectedOption3={setSelectedOption3}
                  search4=""
                  search5=""
                  handleSave={saveFilters}
                />
              </Dialog>
            </>
          )}
          <div
            onClick={() => setshowSearch(!showSearch)}
            className="m-3 d-flex justify-content-center advance-search-trigger align-items-center"
          >
            <label htmlFor="advancedSearch">Advanced Search</label>
            <span
              className="pi pi-search-plus advance-search-mobile"
              id="advance-search-for-all"
            ></span>
          </div>

          <div className="row p-3">
            {itemsToDisplay?.length !== 0 ? (
              itemsToDisplay?.map((product) => (
                <div className="col-6 col-sm-2 p-1">
                  <Card
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    item={product.item}
                    flag={product.flag}
                    country={product.country}
                    id={product.id}
                  />
                </div>
              ))
            ) : (
              <>Currently out of stock</>
            )}
          </div>
        </div>
      </div>

      <Paginator
        currentPage={currentPage}
        first={currentPage * itemsPerPage}
        rows={itemsPerPage}
        totalRecords={Products?.length}
        onPageChange={onPageChange}
        template={template3}
      />
      {/* <PageNav /> */}
    </>
  );
};

export default CategoryDetail;
