import React, { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store";

// import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";

import { Carousel } from "primereact/carousel";
import Confirmation from "./Confirmation";
import html2canvas from "html2canvas";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import LoadingAnimation from "./LoadingAnimation";

import { Dialog } from "primereact/dialog";
import Nav from "../../../Components/Nav";
import "./styles.css";
import { useParams } from "react-router";
import { mainUnisex } from "../../../Data/CustomizeDataUnisex";

import { useSelector } from "react-redux";

import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";

//arrays
import {
  colorOptions,
  textureArrays,
  textureDescriptions,
  textureValues,
  specialNodeNames,
  displayInplaceFor,
  noSpinFor,
  notAll,
  colorBasePrice,
  onlySashes,
  hideNotAllNodes,
  shiny3Ds,
} from "./arrays/neededArrays";
import TextureItem from "./TextureItem";
import PartImages from "./PartImages";
import WelcomeTour, { tourSteps } from "./WelcomeTour";
import { Dropdown } from "primereact/dropdown";

import { Toast } from "primereact/toast";
import ImageUpload from "./ImageUpload";
import HtmlComponent from "./HtmlComponent";
import {
  beadTypeOptions,
  genderOptions,
  isMobile,
} from "../../../utils/constants";
import uuid from "react-uuid";
import { OverlayPanel } from "primereact/overlaypanel";
import { readFileAsDataURL, uploadToStorage } from "../../../utils/functions";
import TakeTour from "./TakeTour";
import HtmlImageComponent from "./HtmlImageComponent";
import { SeeAll } from "./SeeAll";
import { AnimatePresence } from "framer-motion";

const Shirt = ({
  isRotating,
  selectedClothing,
  selectedPart,
  setSelectedPart,
  selectedTexture,
  showGlow,
}) => {
  const snap = useSnapshot(state);
  const { nodes } = useGLTF(selectedClothing.model);

  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (isRotating) {
      const rotationSpeed = 0.01;
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  useEffect(() => {
    if (!isRotating) {
      groupRef.current.rotation.y = 0;
    }
  }, [isRotating]);

  const handlePartClick = (index) => {
    if (index === selectedPart) {
      setSelectedPart(null); // Deselect the part if it is clicked again
    } else {
      setSelectedPart(index);
    }
  };

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate loading for 2 seconds (you can replace this with your actual loading code)
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Set loading state to false once model is loaded (replace with your actual model loading logic)
    }, 2000);

    for (let i = 0; i < state.color.length; i++) {
      state.color[i] = "#ffffff";
    }

    for (let i = 0; i < state.texture.length; i++) {
      state.texture[i] = null;
    }

    return () => clearTimeout(loadingTimeout); // Cleanup the timeout if component unmounts
  }, [selectedClothing.name]);

  return (
    <group ref={groupRef}>
      {isLoading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        selectedClothing.myNode?.map((node, index) => {
          const nodeName = node?.name; // Access the name property of the node object
          const color =
            specialNodeNames.includes(nodeName) && nodeName === "brass"
              ? "#cd7f32"
              : specialNodeNames.includes(nodeName) && nodeName !== "brass"
                ? snap.color[index] || "#333333"
                : snap.color[index] || "#ffffff";

          const texture = snap.texture[index] || null;

          return (
            <mesh
              key={uuid()}
              castShadow
              geometry={nodes[nodeName]?.geometry}
              // onClick={() => handlePartClick(index)}
            >
              <meshStandardMaterial
                attach="material"
                color={color}
                map={texture && new TextureLoader().load(texture)}
                roughness={shiny3Ds.includes(selectedClothing.name) ? 0.1 : 1}
                transparent={
                  shiny3Ds.includes(selectedClothing.name) ? true : false
                }
                metalness={node === "Brass" && 1}
                // metalnessMap={}
                emissive={selectedPart === index ? "#FF8C00" : null} // Apply golden glow if part is selected
                emissiveIntensity={showGlow && selectedPart === index ? 5 : 0} // Adjust glow intensity
              />
            </mesh>
          );
        })
      )}
    </group>
  );
};

const CameraControls = () => {
  const controlsRef = useRef();

  useFrame(() => {
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      enableRotate={true}
      enablePan={false}
      enableZoom={false}
      ref={controlsRef}
    />
  );
};

const ConfiguratorUnisex = () => {
  const { Id } = useParams();
  const selectedClothing = mainUnisex.find((item) => item.name === Id);

  // const [Price, setPrice] = useState(selectedClothing.price);

  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedPrintOn, setSelectedPrintOn] = useState("#ffffff");

  const [selectedPart, setSelectedPart] = useState(0);

  // const [selectedPart, setSelectedPart] = useState(
  //   notAll.includes(selectedClothing.name) ? 0 : null,
  // );

  const [isRotating, setIsRotating] = useState(noSpinFor.includes(selectedClothing.name) ? false : true);

  const canvasRef = useRef(null);
  // toast
  const toastRef = useRef(null);
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const [partPrices, setPartPrices] = useState(0);

  //total price
  useEffect(() => {
    setPartPrices(selectedClothing?.sizeOptions[1]?.colorPriceValue || 0);
  }, []);

  //total price
  const bikiniTotal = (
    (partPrices + selectedClothing.price) *
    currencyFactor
  ).toFixed();

  const total = useMemo(() => {
    if (
      noSpinFor.includes(selectedClothing.name) ||
      selectedClothing.name === "Earring"
    ) {
      return ((partPrices + selectedClothing.price) * currencyFactor).toFixed(
        2,
      );
    } else {
      return ((partPrices + selectedClothing.price) * currencyFactor).toFixed(
        2,
      );
    }
  }, [
    currencyFactor,
    partPrices,
    selectedClothing.name,
    selectedClothing.price,
  ]);


  useEffect(() => {
    const currentSize = selectedClothing.sizeOptions.find(
      (size) => size.value === selectedSize,
    );
    

    return setPartPrices(currentSize.colorPriceValue || 0);
    }, [selectedClothing.sizeOptions, selectedSize]);
    

  const handleSizeChange = (factor, priceValue) => {
    let newPartPrice;
    setSelectedSize(factor);

    const textureCategory = Object.keys(textureArrays).find((category) =>
      textureArrays[category].includes(selectedTexture),
    );

    if (!textureCategory) {
      const currentSize = selectedClothing.sizeOptions.find(
        (size) => size.value === selectedSize,
      );

      if(currentSize.colorPriceValue){
        return setPartPrices(currentSize.colorPriceValue);

      }
      else{
        return setPartPrices(0);
      }
  
    }

    if (textureCategory && textureCategory === "waxPrint") {
      const yardPrice = textureValues[textureCategory].price;

      newPartPrice = yardPrice;
    }

    if (textureCategory && textureCategory !== "waxPrint") {
      const yardPrice = textureValues[textureCategory].price;

      newPartPrice = yardPrice + priceValue;
    }

    setPartPrices(newPartPrice);
  };



  const [showGlow, setShowGlow] = useState(false);

  // Declare state for entered text and generated texture
  const [enteredTextLeft, setEnteredTextLeft] = useState("");
  const [enteredTextRight, setEnteredTextRight] = useState("");
  const [textLeftOrientation, setTextLeftOrientation] = useState("horizontal");
  const [textRightOrientation, setTextRightOrientation] =
    useState("horizontal");

  // const [textPosition] = useState([-0.65, -0.15, 0.05]); // Initialize text position
  const [textColor, setTextColor] = useState("black");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [hideText, setHideText] = useState(false);

  const fonts = [
    "Arial",
    "Verdana",
    "Courier New",
    "Roboto",
    "Comic Sans MS",
    "Book Antiqua",
  ];
  const [currentFontIndex, setCurrentFontIndex] = useState(0);

  const textEditRef = useRef(null);

  // Image imprint
  const [uploadedImageLeft, setUploadedImageLeft] = useState(null);
  const [uploadedImageRight, setUploadedImageRight] = useState(null);

  const [firebaseImageLeft, setFirebaseImageLeft] = useState(null);
  const [firebaseImageRight, setFirebaseImageRight] = useState(null);

  const imageLeftRef = useRef();
  const imageRightRef = useRef();

  const handleImageUploadLeft = async (file) => {
    setUploadedImageLeft(URL.createObjectURL(file));
    toastRef.current.show({
      severity: "success",
      summary: "Please Note",
      detail:
        "Focus would be on the pattern in your image, hence background may be removed where applicable",
    });

    try {
      const dataURL = await readFileAsDataURL(file);
      const downloadURL = await uploadToStorage(dataURL, "sash");
      setFirebaseImageLeft(downloadURL);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleImageUploadRight = async (file) => {
    setUploadedImageRight(URL.createObjectURL(file));

    toastRef.current.show({
      severity: "success",
      summary: "Please Note",
      detail:
        "Focus would be on the pattern in your image, hence background may be removed where applicable",
    });

    try {
      const dataURL = await readFileAsDataURL(file);
      const downloadURL = await uploadToStorage(dataURL, "sash");
      setFirebaseImageRight(downloadURL);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const ImprintTextPosition = useMemo(() => {
    if (selectedClothing.name === noSpinFor[0]) {
      return {
        left: {
          text: enteredTextLeft,
          top: "2.8rem",
          left: "-2.85rem",
          height: "2rem",
          size: 15,
          width: "5rem",
          lineHeight: "",
          image: {
            top: "-1rem",
            left: "16rem",
            height: "2rem",
            width: "2rem",
          },
        },
        right: {
          text: " ",
          top: "-1rem",
          left: "4rem",
          height: "12rem",
          width: "5.4rem",
          lineHeight: "",
        },
      };
    }

    if (selectedClothing.name === noSpinFor[1]) {
      return {
        left: {
          text: enteredTextLeft,
          top: "-1rem",
          left: "-7.4rem",
          height: "8rem",
          width: "3.6rem",
          image: {
            top: "-7rem",
            left: "-6.5rem",
            height: "2rem",
            width: "2rem",
          },
        },
        right: {
          text: enteredTextRight,
          top: "-1rem",
          left: "3.8rem",
          height: "8rem",
          width: "3.6rem",
          lineHeight: "",
          image: {
            top: "-7rem",
            left: "4.5rem",
            height: "2rem",
            width: "2rem",
          },
        },
      };
    }
    if (selectedClothing.name === noSpinFor[2]) {
      return {
        left: {
          text: enteredTextLeft,
          top: "-7rem",
          left: "-7.4rem",
          height: "8rem",
          width: "3.6rem",
          lineHeight: "",
          image: {
            top: "4.6rem",
            left: "-7.2rem",
            height: "2rem",
            width: "3rem",
          },
        },
        right: {
          text: enteredTextRight,
          top: "-7rem",
          left: "3.8rem",
          height: "8rem",
          width: "3.6rem",
          lineHeight: "",
          image: {
            top: "4.7rem",
            left: "4rem",
            height: "2rem",
            width: "3rem",
          },
        },
      };
    }
    if (selectedClothing.name === noSpinFor[3]) {
      return {
        left: {
          text: enteredTextLeft,
          top: "1.8rem",
          left: "-6.5rem",
          height: "10rem",
          width: "2rem",
          lineHeight: "",
          size: 6,
          image: {
            top: "-3rem",
            left: "-6rem",
            height: "1.5rem",
            width: "1.5rem",
          },
        },
        right: {
          text: enteredTextRight,
          top: "-3.8rem",
          left: "3.75rem",
          height: "10rem",
          width: "2rem",
          lineHeight: "",
          size: 6,
          image: {
            top: "7rem",
            left: "4.2rem",
            height: "1.5rem",
            width: "1.5rem",
          },
        },
      };
    }
    if (selectedClothing.name === noSpinFor[4]) {
      return {
        left: {
          text: enteredTextLeft,
          top: "-7rem",
          left: "-7.4rem",
          height: "10rem",
          width: "3.6rem",
          lineHeight: "",
          image: {
            top: "-10.5rem",
            left: "5.8rem",
            height: "2rem",
            width: "2rem",
          },
        },
        right: {
          text: enteredTextRight,
          top: "-7rem",
          left: "3.8rem",
          height: "10rem",
          width: "3.6rem",
          lineHeight: "",
          image: {
            top: "-11.5rem",
            left: "16.3rem",
            height: "2rem",
            width: "2rem",
          },
        },
      };
    }
    if (selectedClothing.name === noSpinFor[5]) {
      return {
        left: {
          text: enteredTextLeft,
          top: "-1rem",
          left: "-6.45rem",
          height: "12rem",
          width: "2rem",
          lineHeight: "",
          size: 6,
          image: {
            top: "-5rem",
            left: "-6.2rem",
            height: "1.5rem",
            width: "2rem",
          },
        },
        right: {
          text: enteredTextRight,
          top: "-6rem",
          left: "4.5rem",
          height: "16rem",
          width: "0.5rem",
          lineHeight: "2rem",
          image: {
            top: "-8rem",
            left: "16rem",
            height: "2rem",
            width: "2rem",
          },
        },
      };
    }
    if (selectedClothing.name === noSpinFor[6]) {
      return {
        left: {
          text: enteredTextLeft,
          top: "3.5rem",
          left: "-3rem",
          height: "2rem",
          width: "5.4rem",
          lineHeight: "",
          image: {
            top: "-1rem",
            left: "16rem",
            height: "2rem",
            width: "2rem",
          },
        },
        right: {
          text: " ",
          top: "-1rem",
          left: "4rem",
          height: "12rem",
          width: "5.4rem",
          lineHeight: "",
        },
      };
    }
  }, [selectedClothing.name]);

  const [fontSizeLeft, setFontSizeLeft] = useState(
    ImprintTextPosition?.left?.size || 11,
  );
  const [fontSizeRight, setFontSizeRight] = useState(
    ImprintTextPosition?.right?.size || 11,
  );

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleLeftTextOrientation = () => {
    if (textLeftOrientation === "horizontal") {
      setTextLeftOrientation("vertical");
    }

    if (textLeftOrientation === "vertical") {
      setTextLeftOrientation("horizontal");
    }
  };

  const handleRightTextOrientation = () => {
    if (textRightOrientation === "horizontal") {
      setTextRightOrientation("vertical");
    }

    if (textRightOrientation === "vertical") {
      setTextRightOrientation("horizontal");
    }
  };

  const handleChangeFont = () => {
    let newIndex = currentFontIndex + 1;

    // Loop back to the start or end of the array if needed
    if (newIndex < 0) {
      newIndex = fonts.length - 1;
    } else if (newIndex >= fonts.length) {
      newIndex = 0;
    }
    setCurrentFontIndex(newIndex);
    setFontFamily(fonts[newIndex]);
  };

  const increaseFontSizeLeft = () => {
    setFontSizeLeft((prevSize) => prevSize + 1);
  };

  const decreaseFontSizeLeft = () => {
    setFontSizeLeft((prevSize) => prevSize - 1);
  };

  const increaseFontSizeRight = () => {
    setFontSizeRight((prevSize) => prevSize + 1);
  };

  const decreaseFontSizeRight = () => {
    setFontSizeRight((prevSize) => prevSize - 1);
  };

  const handleColorChange = (newColor) => {
    state.color[selectedPart] = newColor;
    state.texture[selectedPart] = null;
    setSelectedPrintOn(newColor);

   
    setShowGlow(false);
  };



  const handleTextureChange = (newTexture) => {
    if (selectedPart !== null) {
      state.texture[selectedPart] = newTexture;
      state.color[selectedPart] = null;
      setSelectedPrintOn(newTexture);
      setSelectedTexture(newTexture); // needed to transfer to size

      const textureCategory = Object.keys(textureArrays).find((category) =>
        textureArrays[category].includes(newTexture),
      );

      const sizeValue = selectedClothing.sizeOptions.find(
        (size) => size.value === selectedSize,
      );

      const yardPrice = textureValues[textureCategory].price;

      let newPartPrice;
      if (textureCategory === "waxPrint") {
        newPartPrice = yardPrice;
      } else {
        newPartPrice = yardPrice + sizeValue.priceValue;
      }

      setPartPrices(newPartPrice);
    }

    setShowGlow(false);
  };


  const handleRotation = () => {
    setIsRotating((prev) => !prev);
    // setSelectedPart(null);
  };

  // Create an array to store selected parts with their color and texture information
  const selectedParts = selectedClothing.myNode?.map((nodeName, index) => ({
    name: nodeName.name,
    color: state.color[index] || null,
    texture: state.texture[index] || null,
  }));

  // Confrimation or not
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [stateImage, setStateImage] = useState("");

  const captureCanvasAsImage = async () => {
    setIsRotating(false);
    const requiresGender = displayInplaceFor.includes(selectedClothing.name);
    const genderProvided = gender !== "";

    if (requiresGender && !genderProvided) {
      // Prevent completing if height is required but not provided
      toastRef.current.show({
        severity: "error",
        summary: "Cannot continue",
        detail: "Please input your gender for accurate design",
      });
      return;
    }

    if (!canvasRef.current) {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "Complete action failed, please try again",
      });
      return;
    }

    const canvasImage = await html2canvas(canvasRef.current);
    const dataUrl = canvasImage.toDataURL();

    setStateImage(dataUrl);

    setShowConfirmation(true);
  };

  //size guide popup
  const [visible, setVisible] = useState(false);

  // Create a state object to store the form field values
  const [sizeFormValues, setSizeFormValues] = useState(
    selectedClothing.sizeForms?.reduce((acc, formField) => {
      acc[formField.label] = formField.value;
      return acc;
    }, {}),
  );

  // Handle changes in the size form fields
  const handleSizeFormChange = (label, value) => {
    setSizeFormValues((prevValues) => ({
      ...prevValues,
      [label]: value,
    }));
  };

  // description dialogs
  const [selectedTexture, setSelectedTexture] = useState({});

  // parse part title
  const parseTitle = (title) => {
    const split = title?.split("_");
    return split?.join(" ");
  };

  // Welcome
  const [showTourPopup, setShowTourPopup] = useState(true);
  const [showTour, setShowTour] = useState(false);

  const handleTourStart = () => {
    setShowTour(true);
    setShowTourPopup(false);
  };

  const handleTourLater = () => {
    setShowTourPopup(false);
  };

  const handleTourClose = () => {
    setShowTour(false);
    localStorage.setItem("tourCompleted", "true"); // Save tour completion status
  };

  useEffect(() => {
    const tourCompleted = localStorage.getItem("tourCompleted");
    if (tourCompleted === "true") {
      setShowTourPopup(false); // If tour completed, don't show it
    } else {
      setShowTourPopup(true); // Show the tour for new users
    }
  }, []);

  const handleRetakeTour = () => {
    setShowTour(true);
  };

  // customer height
  const [gender, setGender] = useState("");
  const [beadType, setBeadType] = useState("Glass");

  const handleAllPartsClick = () => {
    setSelectedPart("all");
  };

  const handleSelectPart = (index) => {
    if (selectedPart === index) {
      setShowGlow(false);
      setSelectedPart(null);
      return;
    }
    setSelectedPart(index);
    setShowGlow(true);
  };

  const demoType = useMemo(() => {
    if (selectedClothing.name === "Earring") {
      return "earring";
    }

    if (selectedClothing.name === "Bikini") {
      return "bikini";
    }

    if (selectedClothing.name.includes("Beads Bracelet")) {
      return "bangle";
    }

    if (onlySashes.includes(selectedClothing.name)) {
      return "sash";
    }
  }, [selectedClothing.name]);

  const [openSeeAll, setOpenSeeAll] = useState(false);
    const [selectedSeeAll, setSelectedSeeAll] = useState({ title: '', titleDisplay:'', array: [] });
  
    const handleOpenSeeAll = (title, titleDisplay, array) => {
      setSelectedSeeAll({ title, titleDisplay, array });
      setOpenSeeAll(true);
    };
  
    const handleCloseSeeAll = () => {
      setOpenSeeAll(false);
      setSelectedSeeAll({ title: '', titleDisplay: '', array: [] });
    };
  
  

  return (
    <>
      <Nav />
      <Toast ref={toastRef} />
      <>
        {showTourPopup && (
          <Dialog
            // header="Welcome to the 3D Customization!"
            visible={showTourPopup}
            className="col-12 col-sm-6"
            onHide={handleTourLater}
            dismissableMask={true}
          >
            <div className="tour-popup">
              <h2>Welcome to the 3D customization!</h2>
              <p>Would you like to take a quick tour?</p>
              <button className="btn btn-success m-3" onClick={handleTourStart}>
                Take Tour
              </button>
              <button
                className="btn btn-secondary m-3"
                onClick={handleTourLater}
              >
                Maybe Later
              </button>
            </div>
          </Dialog>
        )}

        {showTour && (
          <TakeTour
            isOpen={showTour}
            onClose={handleTourClose}
            type={demoType}
          />
        )}
      </>

      {showConfirmation ? (
        <Confirmation
          currencySymbol={currencySymbol}
          total={
            selectedClothing.name === "Bikini"
              ? bikiniTotal
              : selectedClothing.name === "Bikini"
                ? bikiniTotal
                : total
          }
          readyBy={selectedClothing.readyIn}
          weight={selectedClothing.weight}
          name={selectedClothing.name}
          selectedParts={
            notAll.includes(selectedClothing.name) ? null : selectedParts
          }
          selectedPrintOn={{
            isColor: state.texture[selectedPart] === null,
            item: selectedPrintOn,
          }}
          uploadedImageLeft={firebaseImageLeft}
          uploadedImageRight={firebaseImageRight}
          textLeft={enteredTextLeft}
          textRight={enteredTextRight}
          setShowConfirmation={setShowConfirmation}
          selectedSize={
            selectedClothing.sizeOptions.find(
              (option) => option.value === selectedSize,
            )?.label
          }
          modelImage={stateImage}
          customSizeValues={sizeFormValues}
          // height={height}
          gender={gender}
          beadType={beadType}
        />
      ) : (
        <>
          <div className="main-space pb-10">
            <h3 className="text-center text-sm lg:text-2xl mt-3 mb-2 capitalize font-normal text-gray-600 pt-3">
              Customizing {selectedClothing.name}
            </h3>
            <div className="flex gap-4 justify-content-center">
              {noSpinFor.includes(selectedClothing.name) ? null : (
                <button
                  className={`btn rotation-button text-white  ${
                    isRotating === true ? "btn-danger" : "btn-warning"
                  }`}
                  onClick={handleRotation}
                >
                  {isRotating ? (
                    <span>
                      Stop <i className="pi pi-ban"></i>
                    </span>
                  ) : (
                    <span>
                      Take a Spin <i className="pi pi-sync"></i>
                    </span>
                  )}
                </button>
              )}

              <button
                className="cursor-pointer bg-[#3C9FEF] py-2 px-4 text-white rounded-md"
                // style={{ float: "right" }}
                onClick={handleRetakeTour}
              >
                Take Tour
              </button>
            </div>
            <div className="lg:grid grid-cols-1 lg:gap-5 flex flex-col-reverse lg:grid-cols-2 container my-3 lg:h-screen">
              <div className="left-panel rounded border lg:h-hull">
                {!notAll.includes(selectedClothing.name) && (
                  <h5>Select Part</h5>
                )}
                <div className="select-part-container">
                  <>
                    {/* {!notAll.includes(selectedClothing.name) && (
                      <button
                        className={`size-button btn btn-outline-dark ${
                          selectedPart === "all" ? "selected" : ""
                        }`}
                        onClick={handleAllPartsClick}
                      >
                        All
                      </button>
                    )} */}

                    {noSpinFor.includes(selectedClothing.name) && selectedClothing.myNode.map((nodeName, index) => {
                      if (
                        specialNodeNames.includes(nodeName.name) ||
                        hideNotAllNodes.includes(nodeName.name)
                      ) {
                        return null; // Skip rendering this node
                      } else {
                        return (
                          <button
                            key={index}
                            className={`size-button btn btn-outline-dark ${
                              selectedPart === index ? "selected" : ""
                            }`}
                            onClick={() => handleSelectPart(index)}
                          >
                            {nodeName.name === "hands"
                              ? parseTitle("sleeves")
                              : parseTitle(nodeName.name)}
                          </button>
                        );
                      }
                    })}
                  </>
                </div>

                {selectedClothing.name.includes("Beads Bracelet") && (
                  <div className="select-part-container mt-3">
                    <h6>Bead Type</h6>

                    <p>
                      <Dropdown
                        value={beadType}
                        onChange={(e) => setBeadType(e.value)}
                        options={beadTypeOptions}
                        optionLabel="label"
                        placeholder="Select bead type"
                        style={{ width: "66.5%" }}
                      />
                    </p>
                  </div>
                )}

                <h5>Choose Size</h5>
                <div className="size">
                  <p className="size-button-container">
                    {selectedClothing.sizeOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`size-button btn btn-outline-dark ${
                          selectedSize === option.value ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleSizeChange(
                            option.value,
                            option.priceValue,
                            option.colorPriceValue,
                          )
                        }
                      >
                        {option.label}
                      </button>
                    ))}
                  </p>
                  <p className="fit">
                    <span onClick={() => setVisible(true)}>
                      Customize Your Size &#8594;
                    </span>
                    {displayInplaceFor.includes(selectedClothing.name) && (
                      <Inplace className="text-black" closable>
                        <InplaceDisplay>
                          <span
                            style={{
                              color: "red",
                              fontWeight: "bolder",
                              textTransform: "capitalize",
                            }}
                          >
                            {gender || "Tap to input gender"}
                          </span>
                        </InplaceDisplay>
                        <InplaceContent>
                          {/* <InputText
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            autoFocus
                            tooltip="we need this for accurate design"
                          /> */}
                          <Dropdown
                            value={gender}
                            onChange={(e) => setGender(e.value)}
                            options={genderOptions}
                            optionLabel="label"
                            placeholder="Select your Gender"
                          />
                        </InplaceContent>
                      </Inplace>
                    )}
                  </p>
                  <Dialog
                    header="Sizing Guide"
                    visible={visible}
                    className="col-12 col-sm-6"
                    onHide={() => setVisible(false)}
                    dismissableMask={true}
                  >
                    <div className="d-flex flex-column align-items-center">
                      {selectedClothing.sizeModels ? (
                        <p className="mb-1">
                          <img
                            src={selectedClothing.sizeModels}
                            width="100%"
                            alt="size-models"
                          />
                        </p>
                      ) : (
                        ""
                      )}
                      <p className="mb-1">
                        <img
                          src={selectedClothing.sizeGuide}
                          width="100%"
                          alt="size-guide"
                        />
                      </p>
                      <form>
                        <h4 className="mt-3">
                          Customize Your Own Measurements
                        </h4>
                        {selectedClothing?.sizeForms
                          ? selectedClothing.sizeForms?.map((formField) => (
                              <div className="m-3" key={formField.label}>
                                <label className="form-label">
                                  {formField.label}
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={sizeFormValues[formField.label]}
                                  onChange={(e) =>
                                    handleSizeFormChange(
                                      formField.label,
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                            ))
                          : "N/A"}
                      </form>
                    </div>
                  </Dialog>
                </div>
                <h5>Choose Color</h5>
                <div className="flex gap-5 overflow-x-scroll flex-nowrap no-scrollbar w-[90%] ">
                  {colorOptions.map((colorOption) => (
                      <div key={colorOption.color} className="color-item">
                      <button
                        className={`color-button ${
                          selectedPrintOn === colorOption.color
                            ? "selected-border"
                            : ""
                        }`}
                        onClick={() => handleColorChange(colorOption.color)}
                        style={{ backgroundColor: colorOption.color }}
                      ></button>
                    </div>
                  ))}
                </div>
                {noSpinFor.includes(selectedClothing.name) ||
                selectedClothing.name === "Earring" || selectedClothing.name === "Beads Bangles" ? null : (
                  <>
                    <h5>Choose Textile</h5>
                    {/* <h1>
                      {"this is" + !selectedClothing.name("Beads Bracelet")}
                    </h1> */}
                    {/* <div className="texture-buttons-container">
                      <div className="texture-row">
                        <div className="texture-category mt-3">
                          <h3>
                            Batik (+{currencySymbol}
                            {(
                              currencyFactor * textureValues.batik.price
                            ).toFixed()}
                            )
                          </h3>
                          <Carousel
                            value={textureArrays.batik}
                            numVisible={4}
                            numScroll={3}
                            showIndicators={false}
                            // responsiveOptions={responsiveNess}
                            itemTemplate={(texture, index) => (
                              <TextureItem
                                key={texture}
                                texture={texture}
                                setHideText={setHideText}
                                Title="batik"
                                selectedTexture={selectedPrintOn}
                                // Pass setSelectedTexture as a prop
                                handleTextureChange={handleTextureChange}
                                currencySymbol={currencySymbol}
                                currencyFactor={currencyFactor}
                                subTextureDescriptions={
                                  textureDescriptions.batik
                                }
                                textureIndex={textureArrays.batik.indexOf(
                                  texture,
                                )}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="texture-row">
                        <div className="texture-category mt-3">
                          <h3>
                            waxPrint (+{currencySymbol}
                            {(
                              currencyFactor * textureValues.waxPrint.price
                            ).toFixed()}
                            )
                          </h3>
                          <Carousel
                            value={textureArrays.waxPrint}
                            numVisible={4}
                            numScroll={3}
                            showIndicators={false}
                            itemTemplate={(texture) => (
                              <TextureItem
                                key={texture}
                                texture={texture}
                                setHideText={setHideText}
                                Title="waxPrint"
                                selectedTexture={selectedPrintOn}
                                // Pass setSelectedTexture as a prop
                                handleTextureChange={handleTextureChange}
                                currencySymbol={currencySymbol}
                                currencyFactor={currencyFactor}
                                subTextureDescriptions={
                                  textureDescriptions.waxPrint
                                }
                                textureIndex={textureArrays.waxPrint.indexOf(
                                  texture,
                                )}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="texture-row">
                        <div className="texture-category mt-3">
                          <h3>School Prints</h3>
                          <Carousel
                            value={textureArrays.Diaspora}
                            numVisible={4}
                            numScroll={1}
                            showIndicators={false}
                            itemTemplate={(texture) => (
                              <TextureItem
                                key={texture}
                                texture={texture}
                                setHideText={setHideText}
                                Title="Diaspora"
                                selectedTexture={selectedPrintOn}
                                // Pass setSelectedTexture as a prop
                                handleTextureChange={handleTextureChange}
                                currencySymbol={currencySymbol}
                                currencyFactor={currencyFactor}
                                subTextureDescriptions={
                                  textureDescriptions.diaspora
                                }
                                textureIndex={textureArrays.Diaspora.indexOf(
                                  texture,
                                )}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div> */}

                <div className="texture-buttons-container ">
                    {openSeeAll ? ( 
                      <AnimatePresence>
                      <SeeAll
                          array={selectedSeeAll.array}
                          title={selectedSeeAll.title}
                          titleDisplay={selectedSeeAll.titleDisplay}
                          onClose={handleCloseSeeAll}
                          others={{
                            selectedPrintOn:selectedPrintOn ,
                            handleTextureChange: handleTextureChange,
                            currencySymbol: currencySymbol,
                            currencyFactor: currencyFactor,
                          }}
                        />
                        </AnimatePresence>
                      ) : (

                        selectedClothing?.isVariant ? (

                          <div className="texture-row">
                    <div className="texture-category mt-1">
                      <div className="w-full flex justify-between capitalize">
                        <p className="text-sm font-medium text-[#4C5B5C]">WaxPrint</p>
                        <p  onClick={() => handleOpenSeeAll('waxPrint', "waxPrint",  textureArrays?.waxPrint)} className="cursor-pointer text-sm text-[#ffc107] hover:font-semibold"> See all &#8594;</p>
                      </div>
                      <div className="grid grid-cols-4 gap-3 px-4">
                          {textureArrays.waxPrint.slice(0, 4).map((texture) => (
                            <TextureItem
                            key={texture}
                            texture={texture}
                            setHideText={setHideText}
                            Title="waxPrint"
                            selectedTexture={selectedPrintOn}
                            // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={
                              textureDescriptions.waxPrint
                            }
                            textureIndex={textureArrays.waxPrint.indexOf(
                              texture,
                            )}
                          />
                          ))}
                      </div>
                    </div>
                  </div>
                      ) :(

                      <>
                    {/* <div className="texture-row">
                      <div className="texture-category mt-1">
                        
                        <div className="w-full flex justify-between capitalize">
                        <p className="text-sm font-medium text-[#4C5B5C]">Trending Now</p>
                        <p  onClick={() => handleOpenSeeAll('newTextures', "Trending Now",  textureArrays?.newTextures)} className="cursor-pointer text-sm text-[#ffc107] hover:font-semibold"> See all &#8594;</p>
                        </div>

                        <div className="grid grid-cols-4 gap-3 px-4">
                          {textureArrays.newTextures.slice(0,4).map((texture) => (
                            <TextureItem
                            key={texture}
                            texture={texture}
                            setHideText={setHideText}
                            Title="Trending Now"
                            selectedTexture={selectedPrintOn}
                            // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={
                              textureDescriptions.newTextures
                            }
                            textureIndex={textureArrays.newTextures.indexOf(
                              texture,
                            )}
                          />
                          ) )}
                        </div>
                      
                      </div>
                    </div> */}
                  
                  <div className="texture-category mt-1">
                    <div className="w-full flex justify-between capitalize">
                      <p className="text-sm font-medium text-[#4C5B5C]">Batik</p>
                      <p  onClick={() => handleOpenSeeAll('batik', "Batik",  textureArrays?.batik)} className="cursor-pointer text-sm text-[#ffc107] hover:font-semibold"> See all &#8594;</p>
                    </div>

                  <div className="grid grid-cols-4 gap-3 px-4">
                      {textureArrays.batik.slice(0, 4).map((texture) => (
                        <TextureItem
                        key={texture}
                        texture={texture}
                        setHideText={setHideText}
                        Title="batik"
                        selectedTexture={selectedPrintOn}
                        handleTextureChange={handleTextureChange}
                        subTextureDescriptions={textureDescriptions.batik}
                        textureIndex={textureArrays.batik.indexOf(texture)}
                      />
                      ))}
                  </div>

                  </div>

                  <div className="texture-row">
                    <div className="texture-category mt-1">
                      <div className="w-full flex justify-between capitalize">
                        <p className="text-sm font-medium text-[#4C5B5C]">WaxPrint</p>
                        <p  onClick={() => handleOpenSeeAll('waxPrint', "waxPrint",  textureArrays?.waxPrint)} className="cursor-pointer text-sm text-[#ffc107] hover:font-semibold"> See all &#8594;</p>
                      </div>
                      <div className="grid grid-cols-4 gap-3 px-4">
                          {textureArrays.waxPrint.slice(0, 4).map((texture) => (
                            <TextureItem
                            key={texture}
                            texture={texture}
                            setHideText={setHideText}
                            Title="waxPrint"
                            selectedTexture={selectedPrintOn}
                            // Pass setSelectedTexture as a prop
                            handleTextureChange={handleTextureChange}
                            currencySymbol={currencySymbol}
                            currencyFactor={currencyFactor}
                            subTextureDescriptions={
                              textureDescriptions.waxPrint
                            }
                            textureIndex={textureArrays.waxPrint.indexOf(
                              texture,
                            )}
                          />
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="texture-row">
                    <div className="texture-category mt-1">
                      <div className="w-full flex justify-between capitalize">
                          <p className="text-sm font-medium text-[#4C5B5C]">School Prints</p>
                          <p  onClick={() => handleOpenSeeAll('diaspora', "School Prints",  textureArrays?.Diaspora)} className="cursor-pointer text-sm text-[#ffc107] hover:font-semibold"> See all &#8594;</p>
                      </div>
                     

                        <div className="grid grid-cols-4 gap-3 px-4">
                          {textureArrays.Diaspora.slice(0, 4).map((texture) => (
                            <TextureItem
                              key={texture}
                              texture={texture}
                              setHideText={setHideText}
                              Title="Diaspora"
                              selectedTexture={selectedPrintOn}
                              // Pass setSelectedTexture as a prop
                              handleTextureChange={handleTextureChange}
                              currencySymbol={currencySymbol}
                              currencyFactor={currencyFactor}
                              subTextureDescriptions={
                                textureDescriptions.diaspora
                              }
                              textureIndex={textureArrays.Diaspora.indexOf(
                                texture,
                              )}
                          />
                          ))}
                      </div>

                    </div>
                  </div>
                       </>
                      )
                    
                    
                    )}

                </div>
                  </>
                )}
              </div>
              <div className="right-panel h-full">
                <div className="resize-right-panel h-full">
                  <div
                    ref={canvasRef}
                    style={
                      {
                        height:  "70%" ,
                      }
                    }
                  >
                    <Canvas
                      camera={{ position: [0, 0, selectedClothing.myZoom] }}
                      gl={{ preserveDrawingBuffer: true }}
                      className="main-canvas h-full "
                    >
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      {noSpinFor.includes(selectedClothing.name) &&
                        isLoading === false && (
                          <>
                            <HtmlComponent
                              textLeft={enteredTextLeft}
                              textRight={enteredTextRight}
                              textColor={textColor}
                              textSizeleft={fontSizeLeft}
                              textSizeRight={fontSizeRight}
                              fontFamily={fontFamily}
                              textLeftOrientation={textLeftOrientation}
                              textRightOrientation={textRightOrientation}
                              ImprintTextPosition={ImprintTextPosition}
                              hideRightText={
                                selectedClothing.name.includes("Beads Bracelet")
                              }
                            />
                            <HtmlImageComponent
                              ImprintTextPosition={ImprintTextPosition}
                              imageLeft={uploadedImageLeft}
                              imageRight={uploadedImageRight}
                              hideLogo={selectedClothing.name.includes("Beads Bracelet")}
                              hideRightText={
                                selectedClothing.name.includes("Beads Bracelet")
                              }
                            />
                          </>
                        )}
                      <Shirt
                        isRotating={isRotating}
                        selectedClothing={selectedClothing}
                        selectedPart={selectedPart}
                        selectedTexture={state.texture[selectedPart]}
                        showGlow={showGlow}
                      />
                      {!noSpinFor.includes(selectedClothing.name) && (
                        <CameraControls />
                      )}
                    </Canvas>
                    
                  </div>

                  {noSpinFor.includes(selectedClothing.name) && (
                    <div className="px-2 pt-2 w-100 text-image-imprint">
                      {/* test text inprinting */}
                      <h5 className="text-lg">Imprint text on model</h5>
                      <div className="flex lg:flex-col text-image-imprint-wrapper">
                        <div className="flex justify-between gap-2">
                          <InputText
                            type="text"
                            className="p-inputtext-sm"
                            placeholder={
                              selectedClothing.name.includes("Beads Bracelet")
                                ? "Text Here"
                                : "imprint on left side..."
                            }
                            value={enteredTextLeft}
                            onChange={(e) => setEnteredTextLeft(e.target.value)}
                            style={{
                              width:
                                selectedClothing.name.includes("Beads Bracelet")
                                  ? "66.5%"
                                  : "50%",
                            }}
                          />
                          {selectedClothing.name.includes("Beads Bracelet") ? null : (
                            <InputText
                              type="text"
                              placeholder="imprint on right side..."
                              className="p-inputtext-sm"
                              value={enteredTextRight}
                              onChange={(e) =>
                                setEnteredTextRight(e.target.value)
                              }
                              style={{
                                width:
                                  selectedClothing.name.includes("Beads Bracelet")
                                    ? "66.5%"
                                    : "50%",
                              }}
                            />
                          )}
                        </div>
                        <h5
                          className="flex  edit-text flex-col mt-1 cursor-pointer"
                          onClick={(e) => textEditRef.current.toggle(e)}
                        >
                          <span className="text-lg">
                            Edit Text
                            <i className={"pi pi-chevron-right mx-2 text-xs"}></i>
                          </span>
                        </h5>
                        <OverlayPanel
                          showCloseIcon
                          ref={textEditRef}
                          style={{
                            transform: `translateX(-2rem)`,
                            minWidth: "15rem",
                          }}
                        >
                          <div className="flex flex-col w-full gap-2">
                            <h6 className="text-base font-medium">Color</h6>
                            {selectedClothing.name.includes("Beads Bracelet") ? (
                              "N/A"
                            ) : (
                              <div className="flex">
                                <Carousel
                                  value={colorOptions.slice(0, 6)}
                                  numVisible={isMobile ? 4 : 7}
                                  numScroll={isMobile ? 3 : 5}
                                  showIndicators={false}
                                  itemTemplate={(colorOption) => (
                                    <button
                                      className={`imprint-text-color-button ${
                                        selectedPrintOn === colorOption.color
                                          ? "selected-border"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        setTextColor(colorOption.label)
                                      }
                                      style={{
                                        backgroundColor: colorOption.color,
                                      }}
                                    ></button>
                                  )}
                                />
                              </div>
                            )}

                            <h6 className="text-sm font-normal">Style</h6>
                            <div className="flex gap-2  fs-button">
                              <span className="font-size">{fontFamily}</span>
                              <button
                                className="p-1 px-2 bg-[#3C9FEF] text-white rounded-full hover:bg-[#3C9FEF]/70 focus:outline-none"
                                onClick={handleChangeFont}
                              >
                                <i className="pi pi-sync"></i>
                              </button>
                            </div>

                            <h6 className="text-base font-medium">
                              Size{" "}
                              {selectedClothing.name.includes("Beads Bracelet")
                                ? null
                                : "(Left)"}
                            </h6>
                            <div className="d-flex  gap-2 justify-content-center align-items-center fs-button">
                              <button
                                className="p-1 px-2 bg-[#3C9FEF] text-white rounded-full hover:bg-[#3C9FEF]/70 focus:outline-none"
                                onClick={decreaseFontSizeLeft}
                              >
                                -
                              </button>
                              <span className="font-size">{fontSizeLeft}</span>
                              <button
                                className="p-1 px-2 bg-[#3C9FEF] text-white rounded-full hover:bg-[#3C9FEF]/70 focus:outline-none"
                                onClick={increaseFontSizeLeft}
                              >
                                +
                              </button>
                            </div>

                            {selectedClothing.name.includes("Beads Bracelet")
                             ? null : (
                              <>
                                <h6 className="text-base font-medium">Size (Right)</h6>
                                <div className="d-flex  gap-2 justify-content-center align-items-center fs-button">
                                  <button
                                    className="p-1 px-2 bg-[#3C9FEF] text-white rounded-full hover:bg-[#3C9FEF]/70 focus:outline-none"
                                    onClick={decreaseFontSizeRight}
                                  >
                                    -
                                  </button>
                                  <span className="font-size">
                                    {fontSizeRight}
                                  </span>
                                  <button
                                    className="p-1 px-2 bg-[#3C9FEF] text-white rounded-full hover:bg-[#3C9FEF]/70 focus:outline-none"
                                    onClick={increaseFontSizeRight}
                                  >
                                    +
                                  </button>
                                </div>
                              </>
                            )}

                            
                          </div>
                        </OverlayPanel>
                        {selectedClothing.name === noSpinFor[0] || selectedClothing.name === noSpinFor[6] ? null : (
                          <>
                            <h5 className="text-sm lg:text-lg">Imprint images or Logos</h5>
                            <div className="flex justify-between gap-2">
                              <ImageUpload
                                labelLeft={"Upload for left"}
                                labelRight={"Upload for right"}
                                hideRightButton={
                                  selectedClothing.name ===
                                  "One-Sided Logo, Two-Sided Text Sash"
                                }
                                onImageUploadLeft={handleImageUploadLeft}
                                onImageUploadRight={handleImageUploadRight}
                                toastRef={toastRef}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="price w-100 d-flex bg-dark text-white justify-content-between lg:mt-5">
            <span className="m-3 expect-to-be-ready">
              Estimated time to make this order:{" "}
              <span className="customize-focus">
                {selectedClothing.readyIn} days{" "}
              </span>
            </span>

            <p className="price-text m-3">
              <span className="expect-to-be-ready">Price:</span>{" "}
              <span className="customize-focus">
                {currencySymbol}
                {selectedClothing.name === "Bikini" ? bikiniTotal : total}
              </span>
            </p>

            <p className="complete m-2">
              <button
                className="btn btn-success text-white"
                onClick={captureCanvasAsImage}
              >
                Complete
              </button>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default ConfiguratorUnisex;
