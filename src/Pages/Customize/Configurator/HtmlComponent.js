import { Html } from '@react-three/drei';

const HtmlComponent = ({content}) => {
  return (
    <Html>
      <div className='overlay' style={{ position: 'absolute', top: 10, left: 10, color: 'black', }}>
        {content}
      </div>
    </Html>
  );
};

export default HtmlComponent;
