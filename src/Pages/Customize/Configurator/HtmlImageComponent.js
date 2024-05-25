import { Html } from "@react-three/drei";
import { separateWordsWithLineBreak } from "../../../utils/functions";

const HtmlImageComponent = ({
  ImprintTextPosition,
  hideRightText,
  imageLeft,
  imageRight,
}) => {
  return (
    <Html style={{ zIndex: 1 }}>
      <div
        className="overlay"
        style={{
          position: "absolute",
          transform: `translate(${ImprintTextPosition.left?.image?.left}, ${ImprintTextPosition.left?.image.top})`,
          fontSize: "0.5rem",
          lineHeight: "0.7rem",
          width:
            imageLeft !== null
              ? ImprintTextPosition?.left?.image?.width
              : "2rem",
          height:
            imageLeft !== null
              ? ImprintTextPosition?.left.image?.height
              : "2rem",
          wordWrap: "break-word", // Enable word wrapping for long words
          overflow: "hidden", // Ensure text doesn't overflow its container
          textTransform: "uppercase",
          backgroundImage: `url(${imageLeft})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: imageLeft !== null ? 1 : 0.3,
        }}
        dangerouslySetInnerHTML={{
          __html:
            imageLeft !== null ? "" : separateWordsWithLineBreak("LOGO HERE"),
        }}
      />

      {!hideRightText && (
        <div
          className="overlay"
          style={{
            position: "absolute",
            transform: `translate(${ImprintTextPosition.right?.image?.left}, ${ImprintTextPosition.right?.image.top})`,
            fontSize: "0.5rem",
            lineHeight: "0.7rem",
            width:
              imageRight !== null
                ? ImprintTextPosition?.right?.image?.width
                : "2rem",
            height:
              imageRight !== null
                ? ImprintTextPosition?.right?.image?.height
                : "2rem",
            wordWrap: "break-word", // Enable word wrapping for long words
            overflow: "hidden", // Ensure text doesn't overflow its container
            textTransform: "uppercase",

            backgroundImage: `url(${imageRight})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: imageRight !== null ? 1 : 0.3,
          }}
          dangerouslySetInnerHTML={{
            __html:
              imageRight !== null
                ? ""
                : separateWordsWithLineBreak("LOGO HERE"),
          }}
        />
      )}
    </Html>
  );
};

export default HtmlImageComponent;
