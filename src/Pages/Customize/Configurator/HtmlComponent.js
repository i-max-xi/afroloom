import { Html } from "@react-three/drei";

const HtmlComponent = ({
  textLeft,
  textRight,
  textColor,
  textSize,
  fontFamily,
  textLeftOrientation,
  textRightOrientation
}) => {
  const separateWordsWithLineBreak = (text) => {
    // Split the text into an array of words
    const wordsArray = text.split(" ");
    // Insert <br> after each word and join them back into a string
    const textWithLineBreak = wordsArray.join("<br>");
    return textWithLineBreak;
  };

  return (
    <Html>
      <div
        className="overlay"
        id="overlay-left"
        style={{
          position: "absolute",
          top: -20,
          left: 10,
          color: textColor,
          fontSize: textSize,
          width: "5.4rem",
          height: "12rem",
          textAlign: "center",
          wordWrap: "break-word", // Enable word wrapping for long words
          overflow: "hidden", // Ensure text doesn't overflow its container
          textTransform: "uppercase",
          fontFamily: fontFamily,
          writingMode: `${textLeftOrientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb'}`, // Apply text orientation
        }}
        dangerouslySetInnerHTML={{
          __html: separateWordsWithLineBreak(textLeft),
        }}
      />
    
      <div
        className="overlay"
        id="overlay-right"
        style={{
          position: "absolute",
          top: -20,
          left: 13,
          textAlign: "center",
          color: textColor,
          fontSize: textSize,
          width: "5.4rem",
          height: "12rem",
          wordWrap: "break-word", // Enable word wrapping for long words
          overflow: "hidden", // Ensure text doesn't overflow its container
          textTransform: "uppercase",
          fontFamily: fontFamily,
          writingMode: `${textRightOrientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb'}`, // Apply text orientation

        }}
        dangerouslySetInnerHTML={{
          __html: separateWordsWithLineBreak(textRight),
        }}
      />
    </Html>
  );
};

export default HtmlComponent;
