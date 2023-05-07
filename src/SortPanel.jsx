import React, { useState } from "react";

const SortPanel = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleChange = (e) => {
    setIsChecked(!isChecked);
    props.onUpdateSort(isChecked);
  };
  return (
    <div className="form-check">
      <input
        type="checkbox"
        id="sort-by-name"
        className="form-control form-check-input mt-0"
        onChange={toggleChange}
        defaultChecked={isChecked}
      />
      <label htmlFor="sort-by-name" className="form-check-label mt-2">
        Sort by name
      </label>
    </div>
  );
};
export default SortPanel;
