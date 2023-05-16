import React from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';

export default function SelectableStepButton({ title, icon, onSelectChange, disable, selected }) {

  // const [active, setActive] = React.useState(false);

  const addedStyles = `${returnIf(disable, "bg-disabled")} ${returnIf(selected, "color-accent border-secondary")}`;

  const selectHandler = () => {
    if (disable) return;
    onSelectChange(!selected)
  }

  return (
    <div
      onClick={selectHandler}
      className={`${addedStyles} flex items-center rounded-md border border-gray-300 cursor-pointer p-2 select-none`}
    >
      <div className='w-6 flex'>
        {selected ? <MdCheckBox size={19} /> : <MdCheckBoxOutlineBlank size={19} />}
      </div>
      <div className="flex-1 pl-2 text-montserrat font-medium text-xs">
        <p className="">{title}</p>
      </div>
      <div className="w-6 flex">
        {icon}
      </div>
    </div>
  );
}

function returnIf(bool, str) {
  return bool ? str : "";
}