import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../Components/CardList";
import { useSelector } from "react-redux";
import Nav from "../Components/Nav";
import { useParams } from "react-router";
import { allCategory, categoryFilter } from "../Data/categoryList";
import SearchFilters from "../Components/SearchFilters";
import countryArr from "../Data/CountryArr";
import { Paginator } from "primereact/paginator";
import popular from "../Assets/Headers/offers/popular.JPG";
import newProducts from "../Assets/Headers/offers/newProducts.JPG";
import discount from "../Assets/Headers/offers/discount.JPG";
import lowestPrices from "../Assets/Headers/offers/lowest.JPG";
import under3 from "../Assets/Headers/offers/mwUnder.JPG";
import searchbanner from "../Assets/Headers/search.JPG";
import { differenceInDays, fromUnixTime } from "date-fns"; // Import the functions
import { getPriceRangeOptions } from "../Data/PriceRangeData";
import { Dialog } from "primereact/dialog";

const OffersDetail = () => {


  const { offerType } = useParams();
  const Products = useSelector((state) => state.allProducts.products);

  let selectedProducts = useMemo(() => [], [])
  let url = "";

  const newProductsThisWeek = Products.filter((item) => {
    if (item.createdAt?.seconds) {
      // Use optional chaining to safely access 'seconds'
      const createdAtTimestamp = item.createdAt.seconds;
      const currentTimestamp = Date.now() / 1000; // Convert to seconds

      // Calculate the difference in days
      const daysDifference = differenceInDays(
        fromUnixTime(currentTimestamp),
        fromUnixTime(createdAtTimestamp)
      );

      // Check if the product was created within the last 7 days
      return daysDifference <= 7;
    }
    // Handle the case where 'createdAt' or 'seconds' is undefined
    return false;
  });

  switch (offerType) {
    case "popular":
      selectedProducts = Products.filter((item) => item.rating >= 4);
      selectedProducts.sort((a, b) => {
        const createdAtTimestampA = a?.createdAt?.seconds || 0;
        const createdAtTimestampB = b?.createdAt?.seconds || 0;
        return createdAtTimestampB - createdAtTimestampA;
      });
      url = popular;
      break;
    case "New Products this Week":
      selectedProducts = newProductsThisWeek;
      selectedProducts.sort((a, b) => {
        const createdAtTimestampA = a?.createdAt?.seconds || 0;
        const createdAtTimestampB = b?.createdAt?.seconds || 0;
        return createdAtTimestampB - createdAtTimestampA;
      });
      url = newProducts;
      break;
    case "Lowest Prices in 60 Days":
      selectedProducts = Products.filter((item) => item.price < 20);
      selectedProducts.sort((a, b) => {
        const createdAtTimestampA = a?.createdAt?.seconds || 0;
        const createdAtTimestampB = b?.createdAt?.seconds || 0;
        return createdAtTimestampB - createdAtTimestampA;
      });
      url = lowestPrices;
      break;
    case "men clothing under ₵100":
      selectedProducts = Products.filter(
        (item) =>
          item.category === "Clothing" &&
          item.gender === "Male" &&
          item.price <= 100
      );
      selectedProducts.sort((a, b) => {
        const createdAtTimestampA = a?.createdAt?.seconds || 0;
        const createdAtTimestampB = b?.createdAt?.seconds || 0;
        return createdAtTimestampB - createdAtTimestampA;
      });
      url = under3;
      break;
    case "women clothing under ₵100":
      selectedProducts = Products.filter(
        (item) =>
          item.category === "Clothing" &&
          item.gender === "Female" &&
          item.price <= 100
      );
      selectedProducts.sort((a, b) => {
        const createdAtTimestampA = a?.createdAt?.seconds || 0;
        const createdAtTimestampB = b?.createdAt?.seconds || 0;
        return createdAtTimestampB - createdAtTimestampA;
      });
      url = under3;
      break;
    case "discounts":
      selectedProducts = Products.filter((item) => item.discount > 0);
      selectedProducts.sort((a, b) => {
        const createdAtTimestampA = a?.createdAt?.seconds || 0;
        const createdAtTimestampB = b?.createdAt?.seconds || 0;
        return createdAtTimestampB - createdAtTimestampA;
      });
      url = discount;
      break;
    default:
      selectedProducts = Products;
      selectedProducts.sort((a, b) => {
        const createdAtTimestampA = a?.createdAt?.seconds || 0;
        const createdAtTimestampB = b?.createdAt?.seconds || 0;
        return createdAtTimestampB - createdAtTimestampA;
      });
      url = searchbanner;
      break;
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(24);

  const onPageChange = (event) => {
    setCurrentPage(event.page);
  };

  const itemsToDisplayBank = selectedProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const template3 = {
    layout:
      "RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport",
  };

  // currency conversion
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);
  const priceRangeOptions = getPriceRangeOptions(
    currencySymbol,
    currencyFactor
  );

  const [itemsToDisplay, setItemsToDisplay] = useState(itemsToDisplayBank);

  useEffect(() => {
    setItemsToDisplay(
      selectedProducts.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    );
  }, [currentPage, itemsPerPage, selectedProducts]);

  // Filters implementation start here...
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

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
    const newItemstoDisplay = selectedProducts.filter((product) => {
      if (
        (selectedCountry === "" || product.country === selectedCountry) &&
        (selectedCategory === "" || product.category === selectedCategory) &&
        (selectedProduct === "" ||
          product.detailedCategory === selectedProduct) &&
        (selectedGender === "" || product.gender === selectedGender) &&
        (selectedSize === "" || product.size === selectedSize) &&
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

    setItemsToDisplay(newItemstoDisplay);
  };

  const [showSearch, setshowSearch] = useState(false);

  return (
    <>
      <Nav />
      <div
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${url})`,
          backgroundRepeat: "no-repeat",
          height: "15rem",
          width: "100%",
        }}
        className="page-banner"
      ></div>
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
          selectedPriceRange={selectedPriceRange} // price
          setSelectedPriceRange={setSelectedPriceRange} // price
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
      </Dialog>
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
        {itemsToDisplay.length !== 0 ? (
          itemsToDisplay.map((product, index) => (
            <div className="col-6 col-sm-2 p-1">
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
                country={product.country}
              />
            </div>
          ))
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center p-5">
            <h4>No results found</h4>
          </div>
        )}
      </div>
      <Paginator
        rows={itemsPerPage}
        totalRecords={selectedProducts.length}
        first={currentPage * itemsPerPage}
        onPageChange={onPageChange}
        template={template3.layout}
      />
    </>
  );
};

export default OffersDetail;
