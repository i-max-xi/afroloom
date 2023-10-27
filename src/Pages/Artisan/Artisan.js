import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArtisanData from "../../Data/ArtisanData";
import LayoutHeaders from "../../Components/LayoutHeaders";
import Top from "../../Assets/Headers/Hire_Artisan.jpg";
import { Paginator } from "primereact/paginator";
import SearchFilters from "../../Components/SearchFilters";

const Artisan = () => {
  const artisanArr = [
    "Bead Works",
    "Carvers",
    "Pottery",
    "Carpenters",
    "Crochet Works",
    "Dressmaker",
    "Fabric work (footwears)",
    "Fabric work (accessories)",
    "Leather work (accessories)",
    "Leather work (footwear)",
    "Metal works",
    "Painters",
  ];

  const specialtyArr = [
    "Male related",
    "Female related",
    // "Satin",
    // "Tie and Dye",
    // "Bags",
    // "Belts",
    // "Necklaces",
    // "Bracelets",
  ];

  const [specialtyBank, setSpecialtyBank] = useState("");

  // Pagination starts here
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(15);

  const onPageChange = (event) => {
    setCurrentPage(event.page);
  };

  const artisansToDisplayBank = ArtisanData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const [artisansToDisplay, setArtisansToDisplay] = useState(
    artisansToDisplayBank
  );

  const template3 = {
    layout:
      "RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport",
  };

  // Paginator scroll
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      window.scrollTo(0, 0);
      isFirstLoad.current = false;
    } else {
      const middleOfScreen =
        window.innerHeight / 2 + window.innerHeight / 2 / 2;
      window.scrollTo(0, middleOfScreen);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // Filter system
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const saveFilters = () => {
    const newArtisanstoDisplay = ArtisanData.filter(
      (artisan) => artisan.skill === selectedCategory
    );
    setArtisansToDisplay(newArtisanstoDisplay);
  };


  // Conditionally render specialty

  useEffect(() => {
    if(selectedCategory === "Crochet Works"){
      setSpecialtyBank("Specialty");
    }
    else if (selectedCategory === "Dressmaker") {
      setSpecialtyBank("Specialty");
    }
    else if (selectedCategory === "Fabric work (footwears)"){
      setSpecialtyBank("Specialty");
    }
    else if (selectedCategory === "Fabric work (accessories)"){
      setSpecialtyBank("Specialty");
    }
    else if (selectedCategory === "Leather work (accessories)"){
      setSpecialtyBank("Specialty");
    }
    else if (selectedCategory === "Leather work (footwear)"){
      setSpecialtyBank("Specialty");
    }
    else {
      setSpecialtyBank("");
    }

  }, [selectedCategory]);


  return (
    <>
      <div>
        <LayoutHeaders selectedBg={Top} />
        <div
          className="row p-5 d-flex justify-content-between"
          style={{ padding: "10rem" }}
        >
          <div className="row p-5 d-flex" style={{ padding: "10rem" }}>
            <SearchFilters
              title="Search Artisan"
              search1="Artisan Skill"
              search2= {specialtyBank}
              search3=""
              options1={artisanArr}
              options2={specialtyArr}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              handleSave={saveFilters}
            />

            {artisansToDisplay.map(
              ({ image, name, id, skill, rating, width }) => {
                return (
                  <ArtisanTemplate
                    key={id}
                    skill={skill}
                    image={image}
                    name={name}
                    rating={rating}
                    artisanId={id}
                    width={width}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
      <Paginator
        first={currentPage * itemsPerPage}
        rows={itemsPerPage}
        totalRecords={ArtisanData.length}
        onPageChange={onPageChange}
        template={template3}
      />
    </>
  );
};

const ArtisanTemplate = ({ image, name, artisanId, skill, rating, width }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
  }
  for (let i = rating; i < 5; i++) {
    stars.push(<i key={i} className="bi bi-star text-warning"></i>);
  }

  return (
    <div className=" mx-3" style={{ width: "21%" }}>
      <div className="info-wrapper artisan">
        <img
          src={image}
          alt={name}
          // width={width ? width : "30%"}
          width="30%"
          className="mt-4"
        />
        {/* <div className="mx-1 info-icon">{infoImage}</div> */}
        <div className="mx-auto info-content mt-4">
          <div className="d-flex justify-content-center">{stars}</div>
          <h5>{name}</h5>
          <p>{skill}</p>
        </div>
        <Link
          to={`/artisan/${artisanId}`}
          className="btn btn-warning text-white view-products"
        >
          View Artisan
        </Link>
      </div>
    </div>
  );
};

export default Artisan;
