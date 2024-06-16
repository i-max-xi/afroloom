import React from 'react';
import { InputText } from 'primereact/inputtext';

const CustomInput = React.forwardRef(({ label, ...props }, ref) => {
  return (
    <div className='w-100'>
              <label>{label}</label>

        <InputText  className="p-inputtext-sm w-100 h-25" ref={ref} {...props} />
    </div>
  );
});

export default CustomInput;
