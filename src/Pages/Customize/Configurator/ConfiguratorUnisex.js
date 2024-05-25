import React, { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store";

// import { Link } from "react-router-dom";
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
  responsiveNess,
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
import { genderOptions, isMobile } from "../../../utils/constants";
import uuid from "react-uuid";
import { OverlayPanel } from "primereact/overlaypanel";
import { readFileAsDataURL, uploadToStorage } from "../../../utils/functions";
import TakeTour from "./TakeTour";
import HtmlImageComponent from "./HtmlImageComponent";

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

  return <OrbitControls ref={controlsRef} />;
};

const ConfiguratorUnisex = () => {
  const { Id } = useParams();
  const selectedClothing = mainUnisex.find((item) => item.name === Id);

  // const [Price, setPrice] = useState(selectedClothing.price);

  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedPrintOn, setSelectedPrintOn] = useState(null);

  const [selectedPart, setSelectedPart] = useState(
    notAll.includes(selectedClothing.name) ? 0 : null
  );

  const [isRotating, setIsRotating] = useState(false);

  const canvasRef = useRef(null);
  // toast
  const toastRef = useRef(null);
  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const [partPrices, setPartPrices] = useState(0);
  const [colorPrice, setColorPrice] = useState(
    colorBasePrice * selectedClothing.myNode[0].yardNeeded
  );

  //total price
  const total = useMemo(() => {
    if (
      noSpinFor.includes(selectedClothing.name) ||
      selectedClothing.name === "Earring"
    ) {
      return ((partPrices + selectedClothing.price) * currencyFactor).toFixed(
        2
      );
    } else {
      return (
        (partPrices + selectedClothing.price + colorPrice) *
        currencyFactor
      ).toFixed(2);
    }
  }, [selectedClothing.name]);

  const handleSizeChange = (factor) => {
    let yardNeeded;
    setSelectedSize(factor);

    switch (factor) {
      case 0.5:
        yardNeeded = selectedClothing.otherYards.small;
        break;

      case 1:
        yardNeeded = selectedClothing.myNode[0].yardNeeded;
        break;

      case 2:
        yardNeeded = selectedClothing.otherYards.large;
        break;

      case 3:
        yardNeeded = selectedClothing.otherYards.extraLarge;
        break;

      case 4:
        yardNeeded = selectedClothing.otherYards.extraExtraLarge;
        break;

      default:
        break;
    }

    const textureCategory = Object.keys(textureArrays).find((category) =>
      textureArrays[category].includes(selectedTexture)
    );

    const yardPrice = textureValues[textureCategory]?.price;
    const yardStart = textureValues[textureCategory]?.yardStart;

    let newPartPrice;

    if (!yardPrice || !yardStart) {
      setColorPrice(yardNeeded * colorBasePrice);
      return;
    } else {
      newPartPrice =
        yardStart === 2 ? yardNeeded * (yardPrice / 2) : yardNeeded * yardPrice;
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
          top: "2.5rem",
          left: "-3rem",
          height: "2rem",
          width: "5.4rem",
          lineHeight: "",
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
            height: "2.4rem",
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
  }, [selectedClothing.name]);

  const [fontSizeLeft, setFontSizeLeft] = useState(
    ImprintTextPosition?.left?.size || 11
  );
  const [fontSizeRight, setFontSizeRight] = useState(
    ImprintTextPosition?.right?.size || 11
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
    if (selectedPart === "all") {
      state.texture = Array(selectedClothing.myNode.length).fill(null);
      state.color = Array(selectedClothing.myNode.length).fill(newColor);
      setSelectedPrintOn(newColor);
      return;
    }

    state.color[selectedPart] = newColor;
    state.texture[selectedPart] = null;
    setSelectedPrintOn(newColor);

    setPartPrices(0);
    setShowGlow(false);
  };

  const handleTextureChange = (newTexture) => {
    if (selectedPart === "all") {
      state.texture = Array(selectedClothing.myNode.length).fill(newTexture);
      state.color = Array(selectedClothing.myNode.length).fill(null);
      setSelectedPrintOn(newTexture);

      const textureCategory = Object.keys(textureArrays).find((category) =>
        textureArrays[category].includes(newTexture)
      );

      const newPartPrice = textureValues[textureCategory];

      setPartPrices(Array(selectedClothing.myNode.length).fill(newPartPrice));
      return;
    }

    if (selectedPart !== null) {
      state.texture[selectedPart] = newTexture;
      state.color[selectedPart] = null;
      setSelectedPrintOn(newTexture);
      setSelectedTexture(newTexture); // needed to transfer to size

      const textureCategory = Object.keys(textureArrays).find((category) =>
        textureArrays[category].includes(newTexture)
      );

      const yardNeeded = selectedClothing.myNode[selectedPart].yardNeeded;
      const yardPrice = textureValues[textureCategory].price;
      const yardStart = textureValues[textureCategory].yardStart;

      const newPartPrice =
        yardStart === 2 ? yardNeeded * (yardPrice / 2) : yardNeeded * yardPrice;

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

    if (onlySashes.includes(selectedClothing.name)) {
      setStateImage(selectedClothing.confirm_image);
    } else {
      const canvasImage = await html2canvas(canvasRef.current);
      const dataUrl = canvasImage.toDataURL();

      setStateImage(dataUrl);
    }

    setShowConfirmation(true);
  };

  //size guide popup
  const [visible, setVisible] = useState(false);

  // Create a state object to store the form field values
  const [sizeFormValues, setSizeFormValues] = useState(
    selectedClothing.sizeForms?.reduce((acc, formField) => {
      acc[formField.label] = formField.value;
      return acc;
    }, {})
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

    if (selectedClothing.name === "Beads Bracelet") {
      return "bangle";
    }

    if (onlySashes.includes(selectedClothing.name)) {
      return "sash";
    }
  }, [selectedClothing.name]);

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
          total={total}
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
              (option) => option.value === selectedSize
            )?.label
          }
          modelImage={stateImage}
          customSizeValues={sizeFormValues}
          // height={height}
          gender={gender}
        />
      ) : (
        <>
          <div className="main-space">
            <h3 className="text-center pt-3">
              Customizing {selectedClothing.name}
            </h3>
            <div className="d-flex justify-content-center">
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
                className="btn btn-info text-white mx-3"
                // style={{ float: "right" }}
                onClick={handleRetakeTour}
              >
                Take Tour
              </button>
            </div>
            <div className="configurator-container container">
              <div className="left-panel rounded shadow">
                {!notAll.includes(selectedClothing.name) && (
                  <h5>Select Part</h5>
                )}
                <div className="select-part-container">
                  <>
                    {!notAll.includes(selectedClothing.name) && (
                      <button
                        className={`size-button btn btn-outline-dark ${
                          selectedPart === "all" ? "selected" : ""
                        }`}
                        onClick={handleAllPartsClick}
                      >
                        All
                      </button>
                    )}

                    {selectedClothing.myNode.map((nodeName, index) => {
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
                  </>{" "}
                </div>
                <h5>Choose Size</h5>
                <div className="size w-75">
                  <p className="size-button-container">
                    {selectedClothing.sizeOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`size-button btn btn-outline-dark ${
                          selectedSize === option.value ? "selected" : ""
                        }`}
                        onClick={() => handleSizeChange(option.value)}
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
                            {gender || "Tap to input your gender"}
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
                            placeholder="Select a Gender"
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
                                      e.target.value
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
                <div className="color-buttons-container">
                  <Carousel
                    value={colorOptions}
                    numVisible={isMobile ? 4 : 7}
                    numScroll={isMobile ? 3 : 5}
                    showIndicators={false}
                    // // responsiveOptions={responsiveColor}
                    itemTemplate={(colorOption) => (
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
                    )}
                  />
                </div>
                {noSpinFor.includes(selectedClothing.name) ||
                selectedClothing.name === "Earring" ? null : (
                  <>
                    <h5>Choose Textile</h5>
                    <h1>
                      {"this is" + selectedClothing.name !== "Beads Bracelet"}
                    </h1>
                    <div className="texture-buttons-container">
                      <div className="texture-row">
                        <div className="texture-category">
                          <h3>
                            Batik (+{currencySymbol}
                            {(
                              currencyFactor * textureValues.batik.price
                            ).toFixed(2)}
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
                                  texture
                                )}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="texture-row">
                        <div className="texture-category">
                          <h3>
                            waxPrint (+{currencySymbol}
                            {(
                              currencyFactor * textureValues.waxPrint.price
                            ).toFixed(2)}
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
                                  texture
                                )}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="right-panel">
                <div className="resize-right-panel">
                  <div
                    ref={canvasRef}
                    style={
                      {
                        // height: selectedClothing.name !== "Logo Up, Text Down Sash" ? "100%" : "81%",
                      }
                    }
                  >
                    <Canvas
                      camera={{ position: [0, 0, selectedClothing.myZoom] }}
                      gl={{ preserveDrawingBuffer: true }}
                      className="main-canvas"
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
                                selectedClothing.name === "Beads Bracelet"
                              }
                            />
                            <HtmlImageComponent
                              ImprintTextPosition={ImprintTextPosition}
                              imageLeft={uploadedImageLeft}
                              imageRight={uploadedImageRight}
                              hideRightText={
                                selectedClothing.name === "Beads Bracelet"
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
                    {/* {isLoading === false &&
                      noSpinFor.includes(selectedClothing.name) &&
                      selectedClothing.name !== "Beads Bracelet" &&
                      (uploadedImageLeft ? (
                        <div
                          ref={imageLeftRef}
                          style={{
                            transform: `translate(${ImprintTextPosition.left?.image?.left}, ${ImprintTextPosition?.left?.image?.top})`,
                            width:
                              ImprintTextPosition.left?.image?.width || "8%",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            maxHeight:
                              ImprintTextPosition.left?.image?.maxHeight ||
                              "1.5rem",
                          }}
                        >
                          <img
                            src={uploadedImageLeft}
                            alt="Uploaded Texture"
                            width="100%"
                            height="100%"
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            fontSize: "0.5rem",
                            opacity: 0.5,
                            transform: `translate(${ImprintTextPosition.left?.placeholder?.left}, ${ImprintTextPosition?.left?.placeholder?.top})`,
                            width:
                              ImprintTextPosition.left?.placeholder?.width ||
                              "8%",
                            zIndex: 1,
                          }}
                        >
                          {selectedClothing.name === "Text Up, Image Down Sash"
                            ? "Image here"
                            : "Logo here"}
                        </div>
                      ))}
                    {isLoading === false &&
                      noSpinFor.includes(selectedClothing.name) &&
                      selectedClothing.name !== "Beads Bracelet" &&
                      selectedClothing.name !==
                        "One-Sided Logo, Two-Sided Text Sash" &&
                      (uploadedImageRight ? (
                        <div
                          ref={imageRightRef}
                          style={{
                            transform: `translate(${ImprintTextPosition.right?.image?.left}, ${ImprintTextPosition.right?.image?.top})`,
                            width:
                              ImprintTextPosition.right?.image?.width || "8%",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            maxHeight:
                              ImprintTextPosition.right?.image.maxHeight ||
                              "1.5rem",
                          }}
                        >
                          <img
                            src={uploadedImageRight}
                            alt="Uploaded Texture"
                            width="100%"
                            height="100%"
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            fontSize: "0.5rem",
                            opacity: 0.5,
                            transform: `translate(${ImprintTextPosition.right?.placeholder?.left}, ${ImprintTextPosition.right?.placeholder?.top})`,
                            width:
                              ImprintTextPosition.right?.placeholder?.width ||
                              "8%",
                          }}
                        >
                          {selectedClothing.name === "Text Up, Image Down Sash"
                            ? "Image here"
                            : "Logo here"}
                        </div>
                      ))} */}
                  </div>

                  {noSpinFor.includes(selectedClothing.name) && (
                    <div className="px-2 pt-2 w-100 text-image-imprint">
                      {/* test text inprinting */}
                      <h5>Imprint text on model</h5>
                      <div className="d-flex text-image-imprint-wrapper">
                        <div className="inputs">
                          <input
                            type="text"
                            placeholder="imprint on left side..."
                            value={enteredTextLeft}
                            onChange={(e) => setEnteredTextLeft(e.target.value)}
                          />
                          {selectedClothing.name === noSpinFor[0] ? null : (
                            <input
                              type="text"
                              placeholder="imprint on right side..."
                              value={enteredTextRight}
                              onChange={(e) =>
                                setEnteredTextRight(e.target.value)
                              }
                            />
                          )}
                        </div>
                        <h5
                          className="d-flex edit-text flex-column mt-1"
                          onClick={(e) => textEditRef.current.toggle(e)}
                        >
                          <span>
                            Edit Text
                            <i className={"pi pi-chevron-right mx-2"}></i>
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
                          <div className="flex-column imprint-options">
                            <h6>Color</h6>
                            {selectedClothing.name === "Beads Bracelet" ? (
                              "N/A"
                            ) : (
                              <div className="d-flex">
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

                            <h6>Style</h6>
                            <div className="d-flex gap-2 justify-content-center fs-button">
                              <span className="font-size">{fontFamily}</span>
                              <button
                                className="btn btn-info btn-sm p-2 text-white"
                                onClick={handleChangeFont}
                              >
                                <i className="pi pi-sync"></i>
                              </button>
                            </div>

                            <h6 className="mt-3">
                              Size{" "}
                              {selectedClothing.name === "Beads Bracelet"
                                ? null
                                : "(Left)"}
                            </h6>
                            <div className="d-flex  gap-2 justify-content-center align-items-center fs-button">
                              <button
                                className="btn btn-info btn-sm p-2 text-white"
                                onClick={decreaseFontSizeLeft}
                              >
                                -
                              </button>
                              <span className="font-size">{fontSizeLeft}</span>
                              <button
                                className="btn btn-info btn-sm p-2 text-white"
                                onClick={increaseFontSizeLeft}
                              >
                                +
                              </button>
                            </div>

                            {selectedClothing.name ===
                            "Beads Bracelet" ? null : (
                              <>
                                <h6 className="mt-3">Size (Right)</h6>
                                <div className="d-flex  gap-2 justify-content-center align-items-center fs-button">
                                  <button
                                    className="btn btn-info btn-sm p-2 text-white"
                                    onClick={decreaseFontSizeRight}
                                  >
                                    -
                                  </button>
                                  <span className="font-size">
                                    {fontSizeRight}
                                  </span>
                                  <button
                                    className="btn btn-info btn-sm p-2 text-white"
                                    onClick={increaseFontSizeRight}
                                  >
                                    +
                                  </button>
                                </div>
                              </>
                            )}

                            {/* <div>
                              <h6>Orientation</h6>
                              <div className="d-flex justify-content-around  gap-4">
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  Toggle Left
                                  <button
                                    className="btn btn-info btn-sm p-2 text-white"
                                    onClick={handleLeftTextOrientation}
                                  >
                                    <i className="pi pi-sync"></i>
                                  </button>
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                  Toggle Right
                                  <button
                                    className="btn btn-info btn-sm p-2 text-white"
                                    onClick={handleRightTextOrientation}
                                  >
                                    <i className="pi pi-sync"></i>
                                  </button>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </OverlayPanel>
                        {selectedClothing.name === noSpinFor[0] ? null : (
                          <>
                            <h5>Imprint images or Logos</h5>
                            <div className="image-uploads">
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
          <div className="price w-100 d-flex bg-dark text-white justify-content-between">
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
                {total}
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
