import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';


const CustomInput = React.forwardRef(({ label, type, ...props }, ref) => {
  if(
    type === 'password'
  ) {
    return (
      <div className='w-100 password'>
        <label>{label}</label>
        <Password feedback={false} toggleMask className="d-flex align-items-center" style={{display: "flex", alignItems: "center"}} inputStyle={{width: "100%", height: "2%"}} inputStyleClass="w-100 h-25" ref={ref} {...props} />

      </div>
    );
  }
  else {
  return (
    <div className='w-100'>
              <label>{label}</label>

        <InputText  className="p-inputtext-sm w-100 h-25" ref={ref} {...props} />
    </div>
  );}
});

export default CustomInput;
