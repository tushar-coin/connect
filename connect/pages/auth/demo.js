import React, { useState } from 'react';
import Select from 'react-bootstrap-select';

const options = [
  { value: 'mustard', label: 'Mustard' },
  { value: 'ketchup', label: 'Ketchup' },
  { value: 'relish', label: 'Relish' },
];

const MyComponent = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (selectedOption) => {
    setSelectedValues(selectedOption);
  };

  return (
    <Select
      value={selectedValues}
      options={options}
      multiple
      searchable
      textProp="label"
      valueProp="value"
      onChange={handleChange}
    />
  );
};

export default MyComponent;
