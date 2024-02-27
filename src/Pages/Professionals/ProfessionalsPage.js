/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import { useSelector } from "react-redux";
import Nav from "../../Components/Nav";
import { allProfessionalscategory } from "../../Data/professionalsCategoryList";
import { getPriceRangeOptions } from "../../Data/PriceRangeData";
import profBanner from "../../Assets/Headers/search.JPG";
import { Dialog } from "primereact/dialog";
import SearchFilters from "../../Components/SearchFilters";
import { countryFlags } from "../../Data/CountryArr";

const ProfessionalsPage = ({ match }) => {
  const { professionalName } = useParams();

  const Models = useSelector((state) => state.allModels.products);
  const Photographers = useSelector((state) => state.allPhotographers.products);
  const TourGuides = useSelector((state) => state.allTourGuides.products);

  let products;

  if (professionalName === "Model") {
    products = Models;
  } else if (professionalName === "Photographer") {
    products = Photographers;
  } else if (professionalName === "TourGuide") {
    products = TourGuides;
  }

  const ApproveProducts = products.filter((item) => item.approved === true);

  // console.log(ProfessionalName)

  // currency conversion
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);
  const priceRangeOptions = getPriceRangeOptions(
    currencySymbol,
    currencyFactor
  );

  const pullFilters =
    allProfessionalscategory.find((f) => f.name === professionalName) || [];

  const actualFilter = pullFilters.filters;

  // Pagination starts here
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(20);

  const onPageChange = (event) => {
    setCurrentPage(event.page);
  };

  const itemsToDisplayBank = ApproveProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const [itemsToDisplay, setitemsToDisplay] = useState(itemsToDisplayBank);

  const template3 = {
    layout:
      "RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Filter system

  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const saveFilters = () => {
    const newItemstoDisplay = ApproveProducts.filter((product) => {
      if (
        (selectedOption2 === "" || product.country === selectedOption2) &&
        (selectedOption1 === "" || product.gender === selectedOption1) &&
        (selectedOption3 === "" ||
          product?.specialties?.[0] === selectedOption3) &&
        (selectedPriceRange === "" ||
          (selectedPriceRange === 100 * currencyFactor &&
            product?.lowerPrice * currencyFactor < 100 * currencyFactor) ||
          (selectedPriceRange === 2001 * currencyFactor &&
            product.lowerPrice * currencyFactor > 2000 * currencyFactor) ||
          (selectedPriceRange === 250 * currencyFactor &&
            product.lowerPrice * currencyFactor >= 100 * currencyFactor &&
            product.lowerPrice * currencyFactor <= 250 * currencyFactor) ||
          (selectedPriceRange === 500 * currencyFactor &&
            product.lowerPrice * currencyFactor >= 250 * currencyFactor &&
            product.lowerPrice * currencyFactor <= 500 * currencyFactor) ||
          (selectedPriceRange === 1000 * currencyFactor &&
            product.lowerPrice * currencyFactor >= 500 * currencyFactor &&
            product.lowerPrice * currencyFactor <= 1000 * currencyFactor) ||
          (selectedPriceRange === 2000 * currencyFactor &&
            product.lowerPrice * currencyFactor >= 1000 * currencyFactor &&
            product.lowerPrice * currencyFactor <= 2000 * currencyFactor))
      ) {
        return true;
      }
      return false;
    });

    setitemsToDisplay(newItemstoDisplay);
  };

  const [showSearch, setshowSearch] = useState(false);

  return (
    <>
      <Nav />
      <div
        style={{
          backgroundImage: `url(${profBanner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "16rem",
          width: "100%",
        }}
        className="page-banner"
      ></div>
      <div className="container category-items-container ">
        <div className="row d-flex ">
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
                  selectedCategory={selectedOption1}
                  optionPrice={priceRangeOptions} // price filter
                  selectedPriceRange={selectedPriceRange} // price
                  setSelectedPriceRange={setSelectedPriceRange} // price
                  setSelectedCategory={setSelectedOption1}
                  search2={actualFilter[1].name}
                  options2={actualFilter[1].options}
                  selectedCountry={selectedOption2}
                  setSelectedCountry={setSelectedOption2}
                  search3={actualFilter[2].name}
                  options3={actualFilter[2].options}
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
          {/* <div className="d-flex" style={{justifyContent: "space-evenly"}}> */}
          {itemsToDisplay.length !== 0 ? (
            itemsToDisplay.map(
              ({
                profile,
                name,
                id,
                country,
                lowerPrice,
                UpperPrice,
                specialties,
                offers,
              }) => {
                return (
                  <ProfessionalsTemplate
                    key={id}
                    profile={profile}
                    name={name}
                    country={country}
                    upperPrice={UpperPrice}
                    specialty={specialties?.[0]}
                    specialties={specialties}
                    destinations={offers}
                    lowerPrice={lowerPrice}
                    professionalId={id}
                    ProfessionalName={professionalName}
                    // showSeeAll={showSeeAll}
                    // setshowSeeAll={setshowSeeAll}
                  />
                );
              }
            )
          ) : (
            <p className="m-5">No results currently</p>
          )}
        </div>
      </div>

      <Paginator
        currentPage={currentPage}
        first={currentPage * itemsPerPage}
        rows={itemsPerPage}
        totalRecords={products.length}
        onPageChange={onPageChange}
        template={template3}
      />
    </>
  );
};

const ProfessionalsTemplate = ({
  profile,
  name,
  upperPrice,
  lowerPrice,
  country,
  specialty,
  professionalId,
  ProfessionalName,
  // setshowSeeAll,
  // showSeeAll,
  specialties,
  destinations,
}) => {
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);
  const flagImage = countryFlags[country] || ""; // Use flag image URL based on the country

  const [showSeeAll, setshowSeeAll] = useState(false);

  const openDialog = () => {
    setshowSeeAll(true);
  };

  const closeDialog = () => {
    setshowSeeAll(false);
  };

  return (
    <div className="col-12 col-sm-3 m-1 text-decoration-none">
      <div className="info-wrapper artisan">
        <img
          src={profile}
          alt={name}
          className="mt-2 card-img-top"
          style={{ aspectRatio: 1 / 1 }}
        />
        <div className="mx-auto info-content mt-4">
          <div>
            <h5>{name}</h5>
            {country && flagImage !== "" ? (
              <div className="mx-1">
                <img
                  width="10%"
                  src={flagImage}
                  alt={country}
                  style={{ float: "right", transform: "translateY(-1.8rem)" }}
                />
              </div>
            ) : (
              <span></span>
            )}
          </div>

          <h6 className="mx-5">{specialty}</h6>

          {ProfessionalName !== "Model" && (
            <h6>
              {currencySymbol}
              {(currencyFactor * lowerPrice).toFixed(2)} - {currencySymbol}
              {(currencyFactor * upperPrice).toFixed(2)}
            </h6>
          )}
        </div>
        <div className="d-flex justify-content-between" style={{ gap: "2rem" }}>
          <Link
            to={`/professional/${ProfessionalName}/${professionalId}`}
            className="btn btn-dark text-white view-products"
          >
            View{" "}
            {ProfessionalName === "Photographer"? "Profile" : ProfessionalName === "TourGuide" ? "Tour Guide" : ProfessionalName}
          </Link>
          <Link
            onClick={openDialog}
            className="btn btn-outline-dark view-products"
          >
            {ProfessionalName !== "TourGuide" ? "Specialties" : "Destinations"}
          </Link>
        </div>
      </div>
      <Dialog
        header={
          ProfessionalName !== "TourGuide" ? "Specialties" : "Destinations"
        }
        visible={showSeeAll}
        className="col-10 col-sm-3 search-banner"
        onHide={closeDialog}
        dismissableMask={true}
      >
        {ProfessionalName === "TourGuide" ? (
          <ol>
            {destinations?.length > 0 ? (
              destinations.map(({ offer }, index) => (
                <li key={index}>{offer}</li>
              ))
            ) : (
              <p className="m-5">No destinations available to show</p>
            )}
          </ol>
        ) : (
          <ol>
            {specialties?.length > 0 ? (
              specialties.map((item, index) => (
                <li key={index}>
                  {/* Display each specialty here, you can customize this part */}
                  {item}
                </li>
              ))
            ) : (
              <p className="m-5">No specialties available to show</p>
            )}
          </ol>
        )}
      </Dialog>
    </div>
  );
};

export default ProfessionalsPage;
