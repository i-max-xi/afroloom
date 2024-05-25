import { Html } from "@react-three/drei";

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
          fontSize: "0.6rem",
          width: ImprintTextPosition?.left?.image?.width,
          height: ImprintTextPosition?.left.image?.height,
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
          __html: imageLeft !== null ? "" : "LOGO HERE",
        }}
      />

      {!hideRightText && (
        <div
          className="overlay"
          style={{
            position: "absolute",
            transform: `translate(${ImprintTextPosition.right?.image?.left}, ${ImprintTextPosition.right?.image.top})`,
            fontSize: "0.6rem",
            width: ImprintTextPosition?.right?.image?.width,
            height: ImprintTextPosition?.right?.image?.height,
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
            __html: imageRight !== null ? "" : "LOGO HERE",
          }}
        />
      )}
    </Html>
  );
};

export default HtmlImageComponent;
