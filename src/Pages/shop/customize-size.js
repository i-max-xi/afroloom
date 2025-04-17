import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';

export default function CustomizeSize({
  onHide,
  openCustomize,
  options,
  CustomizedSizes,
  onSaveCustomizeSize,
}) {
  const [customizedSizes, setCustomizedSizes] = useState({});

  // 🟡 Prefill values when modal opens or data changes
  useEffect(() => {
    if (CustomizedSizes?.length) {
      const formatted = {};
      CustomizedSizes.forEach(({ name, value }) => {
        formatted[name] = parseFloat(value); // remove "inches"
      });
      setCustomizedSizes(formatted);
    }
  }, [CustomizedSizes, openCustomize]);

  const handleChange = (name, value) => {
    setCustomizedSizes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const formatted = Object.entries(customizedSizes).map(([name, value]) => ({
      name,
      value: value ? `${value} inches` : '',
    }));
    onSaveCustomizeSize(formatted);
  };

  return (
    <Dialog
      header="Input Your Own Measurements"
      className="w-[90%] lg:w-[50%]"
      visible={openCustomize}
      modal
      onHide={onHide}
    >
      <div className="flex flex-col gap-4">
        {options?.map((option, idx) => (
          <div className="flex flex-col gap-2" key={idx}>
            <label htmlFor={`input-${option}`}>{option}</label>
            <InputNumber
              id={`input-${option}`}
              suffix=" inches"
              value={customizedSizes[option] ?? null}
              onValueChange={(e) => handleChange(option, e.value)}
              placeholder="eg. 5 inches"
            />
          </div>
        ))}

        <div className="flex items-center justify-center md:mx-auto gap-2 mt-6 md:w-[60%]">
          <button
            onClick={onHide}
            className="w-full p-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-full p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Dialog>
  );
}
