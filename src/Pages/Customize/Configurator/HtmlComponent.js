import { Html } from '@react-three/drei';

const HtmlComponent = ({content, textColor, textSize}) => {
  return (
    <Html>
      <div className='overlay' style={{ position: 'absolute', top: 10, left: 10, color: textColor, fontSize: textSize }}>
        {content}
      </div>
    </Html>
  );
};

export default HtmlComponent;
