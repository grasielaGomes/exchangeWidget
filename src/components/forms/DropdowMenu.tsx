import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ArrowDown } from "../../assets";
import { CustomText } from "../typography/index";
import { DropdowMenuI } from "./interfaces";

export const DropdowMenu = ({ handleSelect, label, options }: DropdowMenuI) => {
  const [currentOption, setCurrentOption] = useState("Select");
  const animation = "transition-colors duration-200 ease-in-out";
  const isFirstTime = currentOption === "Select";

  return (
    <div className="flex flex-col">
      <Listbox value={currentOption} onChange={setCurrentOption}>
        {label && (
          <Listbox.Label className="text-sm text-neutral3 leading-5 mb-1">
            {label}
          </Listbox.Label>
        )}
        <Listbox.Button as={Fragment}>
          <button
            className={`${
              isFirstTime ? "text-neutral" : ""
            } bg-white text-sm leading-5 border rounded-lg border-neutral px-4 py-2 min-w-[180px] hover:border-primaryHover focus:border-primary focus:ring-primary focus:ring-0`}
          >
            <div className="flex justify-between">
              <CustomText>{currentOption}</CustomText>
              <img src={ArrowDown} alt="" />
            </div>
          </button>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="w-full rounded-lg bg-white shadow-3xl focus:outline-none overflow-hidden">
            {options.map(({ id, value, icon }, index) => (
              <Listbox.Option
                key={id}
                value={value}
                onClick={() => handleSelect(value)}
                className={
                  index !== options.length - 1 ? "border-b border-neutral2" : ""
                }
              >
                {({ selected }) => (
                  <div
                    className={`${
                      selected ? "bg-gray-100" : ""
                    } ${animation} flex gap-2 py-3 px-6 hover:bg-neutral2`}
                  >
                    <img src={icon} alt={`${value} icon`} />
                    <p className="text-fontSecondary text-base font-medium">
                      {value}
                    </p>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};
