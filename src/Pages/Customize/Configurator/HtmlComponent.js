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
  hideRightText,
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
        style={{
          position: "absolute",
          transform: `translate(${ImprintTextPosition?.left?.left}, ${ImprintTextPosition.left?.top})`,
          color: textColor,
          fontSize: textSize,
          width: ImprintTextPosition?.left?.width,
          height: ImprintTextPosition?.left?.height,
          wordWrap: "break-word", // Enable word wrapping for long words
          overflow: "hidden", // Ensure text doesn't overflow its container
          textTransform: "uppercase",
          fontFamily: fontFamily,
          writingMode: `${
            textLeftOrientation === "vertical" ? "vertical-rl" : "horizontal-tb"
          }`,
          opacity: ImprintTextPosition?.left.text !== "" ? 1 : 0.3,
        }}
        dangerouslySetInnerHTML={{
          __html: hideRightText ? textLeft !== "" ? textLeft : "TEXT HERE" : separateWordsWithLineBreak(
            textLeft !== "" ? textLeft : "TEXT HERE"
          ),
        }}
      />

      {!hideRightText && (
        <div
          className="overlay"
          style={{
            position: "absolute",
            transform: `translate(${ImprintTextPosition.right.left}, ${ImprintTextPosition.right?.top})`,
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
            opacity: ImprintTextPosition?.right.text !== "" ? 1 : 0.3,
            zIndex: 0.8,
          }}
          dangerouslySetInnerHTML={{
            __html: separateWordsWithLineBreak(
              textRight !== "" ? textRight : "TEXT HERE"
            ),
          }}
        />
      )}
    </Html>
  );
};

export default HtmlComponent;
