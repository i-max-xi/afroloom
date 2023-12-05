import { Html } from "@react-three/drei";

const HtmlComponent = ({
    textLeft,
    textRight,
  textColor,
  textSize,
}) => {
  return (
    <Html>
      <div
        className="overlay"
        id="overlay-left"
        style={{
          position: "absolute",
          top: -40,
          left: 10,
          color: textColor,
          fontSize: textSize,
          width: '5.3rem',
          height: '12rem',
          wordWrap: 'break-word', // Enable word wrapping for long words
          overflow: 'hidden', // Ensure text doesn't overflow its container
        }}
      >
        {textLeft}
      </div>
      <div
        className="overlay"
        id="overlay-right"
        style={{
          position: "absolute",
          top: -30,
          left: 10,
          color: textColor,
          fontSize: textSize,
          width: '4.8rem',
          height: '12rem',
          wordWrap: 'break-word', // Enable word wrapping for long words
          overflow: 'hidden', // Ensure text doesn't overflow its container
        }}
      >
        {textRight}
      </div>
    </Html>
  );
};

export default HtmlComponent;
