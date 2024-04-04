import { Html } from "@react-three/drei";

const HtmlComponent = ({
  textLeft,
  textRight,
  textColor,
  textSize,
  fontFamily,
  textLeftOrientation,
  textRightOrientation,
  ImprintTextPosition
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
        id="overlay-left"
        style={{
          position: "absolute",
          top: ImprintTextPosition?.left.top,
          left: ImprintTextPosition?.left.left,
          color: textColor,
          fontSize: textSize,
          width: ImprintTextPosition?.left.width,
          height: ImprintTextPosition?.left.height,
          textAlign: "center",
          wordWrap: "break-word", // Enable word wrapping for long words
          overflow: "hidden", // Ensure text doesn't overflow its container
          textTransform: "uppercase",
          fontFamily: fontFamily,
          writingMode: `${textLeftOrientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb'}`, // Apply text orientation
        }}
        dangerouslySetInnerHTML={{
          __html: separateWordsWithLineBreak(ImprintTextPosition?.left.text),
        }}
      />
    
      <div
        className="overlay"
        id="overlay-right"
        style={{
          position: "absolute",
          top: ImprintTextPosition?.right.top,
          left: ImprintTextPosition?.right.left,
          textAlign: "center",
          color: textColor,
          fontSize: textSize,
          width: ImprintTextPosition?.right.width,
          height: ImprintTextPosition?.right.height,
          wordWrap: "break-word", // Enable word wrapping for long words
          overflow: "hidden", // Ensure text doesn't overflow its container
          textTransform: "uppercase",
          fontFamily: fontFamily,
          writingMode: `${textRightOrientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb'}`, // Apply text orientation

        }}
        dangerouslySetInnerHTML={{
          __html: separateWordsWithLineBreak(ImprintTextPosition?.right.text),
        }}
      />
    </Html>
  );
};

export default HtmlComponent;
