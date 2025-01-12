import React, { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Image } from "@react-three/drei";
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
import { mainUnisex, specialSash } from "../../../Data/CustomizeDataUnisex";

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

const ConfiguratorUnisexSpecial = () => {
  const { Id } = useParams();
  const selectedClothing = specialSash.find((item) => item.name === Id);

 const displayImage = selectedClothing?.model;

  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedPrintOn, setSelectedPrintOn] = useState(null);

  const [selectedPart, setSelectedPart] = useState(
    notAll.includes(selectedClothing.name) ? 0 : null,
  );

  const [isRotating, setIsRotating] = useState(false);

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
    return {
      left: {
        text: enteredTextLeft,
        top: selectedClothing.positioningLeft.text.top,
        left: selectedClothing.positioningLeft.text.left,
        height: selectedClothing.positioningLeft.text.height,
        width: selectedClothing.positioningLeft.text.width,
        lineHeight: selectedClothing.positioningLeft.text.lineHeight,
        image: {
          top: selectedClothing.positioningLeft.image.top,
          left: selectedClothing.positioningLeft.image.left,
          height: selectedClothing.positioningLeft.image.height,
          width: selectedClothing.positioningLeft.image.width,
        },
      },
      right: {
        text: enteredTextRight,
        top: selectedClothing.positioningRight.text.top,
        left: selectedClothing.positioningRight.text.left,
        height: selectedClothing.positioningRight.text.height,
        width: selectedClothing.positioningRight.text.width,
        lineHeight: selectedClothing.positioningRight.text.lineHeight,
        image: {
          top: selectedClothing.positioningRight.image.top,
          left: selectedClothing.positioningRight.image.left,
          height: selectedClothing.positioningRight.image.height,
          width: selectedClothing.positioningRight.image.width,
        },
      },
    };

   
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


    setTimeout(async () => {
      const canvas = canvasRef.current;
      const canvasImage = await html2canvas(canvas);
      const dataUrl = canvasImage.toDataURL();
      setStateImage(dataUrl);
      setShowConfirmation(true);
      setIsRotating(true);
    }, 100);
  };



  // Create a state object to store the form field values


  // Handle changes in the size form fields
 

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
          customSizeValues={{}}
          // height={height}
          gender={gender}
          beadType={beadType}
        />
      ) : (
        <>
          <div className="main-space pb-10">
            <h3 className="text-center pt-3">
              Customizing {selectedClothing.name}
            </h3>
            <div className="flex justify-content-center">
            
              <button
                className="cursor-pointer bg-[#3C9FEF] py-2 px-4 text-white rounded-md"
                // style={{ float: "right" }}
                onClick={handleRetakeTour}
              >
                Take Tour
              </button>
            </div>
            <div className=" flex flex-col container my-3 ">
             
              <div className="right-panel h-full lg:h-[80vh]">
                 <Canvas
                  camera={{ position: [0, 0, selectedClothing.myZoom] }}
                  ref={canvasRef}
                  gl={{ preserveDrawingBuffer: true }}
                  className="main-canvas h-full resize-right-panel"
                >
               
                  <Image scale={selectedClothing.scale || 1} url={displayImage} />
                  {
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
                              hideLogo={selectedClothing.name === "Beads Bracelet"}
                              hideRightText={
                                selectedClothing.name === "Beads Bracelet"
                              }
                            />
                          </>
                  )}
                </Canvas>
              </div>

              <div className="px-2 pt-2 w-100 text-image-imprint ">
                {/* test text inprinting */}
                <h5 className="text-lg">Imprint text on model</h5>
                <div className="flex lg:flex-col text-image-imprint-wrapper">
                  <div className="flex justify-between gap-2">
                    <InputText
                      type="text"
                      className="p-inputtext-sm"
                      placeholder={
                        selectedClothing.name === "Beads Bracelet"
                          ? "Text Here"
                          : "imprint on left side..."
                      }
                      value={enteredTextLeft}
                      onChange={(e) => setEnteredTextLeft(e.target.value)}
                      style={{
                        width:
                          selectedClothing.name === "Beads Bracelet"
                            ? "66.5%"
                            : "50%",
                      }}
                    />
                    {selectedClothing.name === noSpinFor[0] ? null : (
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
                            selectedClothing.name === "Beads Bracelet"
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
                      {selectedClothing.name === "Beads Bracelet" ? (
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
                        {selectedClothing.name === "Beads Bracelet"
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

                      {selectedClothing.name ===
                      "Beads Bracelet" ? null : (
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
                  {selectedClothing.name === noSpinFor[0] ? null : (
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
                onClick={ captureCanvasAsImage}
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

export default ConfiguratorUnisexSpecial;
