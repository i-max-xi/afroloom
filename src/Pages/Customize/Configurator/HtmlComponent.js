import { Html } from "@react-three/drei";


const HtmlComponent = ({
    textLeft,
    textRight,
  textColor,
  textSize,
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
          left: 8,
          color: textColor,
          fontSize: textSize,
          width: '5.8rem',
          height: '12rem',
          textAlign: "center",
          wordWrap: 'break-word', // Enable word wrapping for long words
          overflow: 'hidden', // Ensure text doesn't overflow its container
          textTransform: "uppercase"
        }}
        dangerouslySetInnerHTML={{ __html: separateWordsWithLineBreak(textLeft) }}

      />
        {/* {textLeft} */}
      {/* </div> */}
      <div
        className="overlay"
        id="overlay-right"
        style={{
          position: "absolute",
          top: -10,
          left: 8,
          textAlign: "center",
          color: textColor,
          fontSize: textSize,
          width: '5.8rem',
          height: '12rem',
          wordWrap: 'break-word', // Enable word wrapping for long words
          overflow: 'hidden', // Ensure text doesn't overflow its container
          textTransform: "uppercase"
        }}
        dangerouslySetInnerHTML={{ __html: separateWordsWithLineBreak(textRight) }}

      />
        {/* {textRight} */}
      {/* </div> */}
    </Html>
  );
};

export default HtmlComponent;
