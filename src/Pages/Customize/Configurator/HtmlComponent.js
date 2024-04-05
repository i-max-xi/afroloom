import { Html } from "@react-three/drei";

const HtmlComponent = ({
  textLeft,
  textRight,
  textColor,
  textSize,
  fontFamily,
  textLeftOrientation,
  textRightOrientation,
  ImprintTextPosition,
}) => {
  const separateWordsWithLineBreak = (text) => {
    // Split the text into an array of words
    const wordsArray = text?.split(" ");
    // Insert <br> after each word and join them back into a string
    const textWithLineBreak = wordsArray?.join("<br>");
    return textWithLineBreak;
  };

  return (
    <Html>
      <div
        className="overlay"
        // id="overlay-left"
        style={{
          position: "absolute",
          // top: ImprintTextPosition?.left.top,
          // left: ImprintTextPosition?.left.left,
          transform: `translate(${ImprintTextPosition?.left?.left}, ${ImprintTextPosition.left?.top})`,
          color: textColor,
          fontSize: textSize,
          width: ImprintTextPosition?.left?.width,
          height: ImprintTextPosition?.left?.height,
          // textAlign: "center",
          wordWrap: "break-word", // Enable word wrapping for long words
          overflow: "hidden", // Ensure text doesn't overflow its container
          textTransform: "uppercase",
          fontFamily: fontFamily,
          writingMode: `${
            textLeftOrientation === "vertical" ? "vertical-rl" : "horizontal-tb"
          }`,
          opacity: ImprintTextPosition?.right.text !== "" ? 1 : 0.3
        }}
        dangerouslySetInnerHTML={{
          __html: separateWordsWithLineBreak(textLeft !=="" ? textLeft : "TEXT HERE"),
        }}
      />

      <div
        className="overlay"
        // id="overlay-right"
        style={{
          position: "absolute",
          // top: ImprintTextPosition?.right.top,
          // left: ImprintTextPosition?.right.left,
          transform: `translate(${ImprintTextPosition.right.left}, ${ImprintTextPosition.right?.top})`,
          // textAlign: "center",
          color: textColor,
          fontSize: textSize,
          width: ImprintTextPosition?.right.width,
          height: ImprintTextPosition?.right.height,
          wordWrap: "break-word", // Enable word wrapping for long words
          overflow: "hidden", // Ensure text doesn't overflow its container
          textTransform: "uppercase",
          fontFamily: fontFamily,
          writingMode: `${
            textRightOrientation === "vertical"
              ? "vertical-rl"
              : "horizontal-tb"
          }`,
          opacity: ImprintTextPosition?.right.text !== "" ? 1 : 0.3
        }}
        dangerouslySetInnerHTML={{
          __html: separateWordsWithLineBreak(textRight !=="" ? textRight : "TEXT HERE"),
        }}
      />
    </Html>
  );
};

export default HtmlComponent;
