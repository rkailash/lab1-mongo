import React from 'react';
import 'styles/radioGroup.scss';

const RadioGroup = ({options, checked, onChange}) => (
  <div className="radio-group">
    {
      options.map((item, key) => (
        <label className="container" key={key}>{item.label}
          <input type="radio" checked={checked === item.value} onChange={() => onChange(item.value)} name="radio" />
          <span className="checkmark"></span>
        </label>
      ))
    }
  </div>
)

export default RadioGroup;