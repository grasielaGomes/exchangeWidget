import { Transition, Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ArrowDown } from "../../assets";
import { CustomText } from "../typography";
import { DropdowMenuI } from "./interfaces";

export const DropdowMenu = ({ handleSelect, label, options }: DropdowMenuI) => {
  const [currentOption, setCurrentOption] = useState("Select");
  const animation = "transition-colors duration-200 ease-in-out";
  const selectedIcon = () =>
    options.find((option) => option.value === currentOption)?.icon;

  return (
    <div className="flex flex-col relative">
      <Listbox value={currentOption} onChange={setCurrentOption}>
        {label && (
          <Listbox.Label className="mb-1 ml-1">
            <CustomText color="neutral3" variant="small">
              {label}
            </CustomText>
          </Listbox.Label>
        )}
        <Listbox.Button as={Fragment}>
          <button className="bg-white text-sm leading-5 border rounded-lg border-neutral px-4 h-11 min-w-[180px] hover:border-primaryHover focus:outline-none focus:border-primary focus:ring-primary focus:ring-0">
            <div className="flex justify-between gap-4">
              <div className="flex items-center gap-2">
                {selectedIcon() && (
                  <img
                    src={selectedIcon()}
                    alt="crypto icon"
                    className="hidden md:inline"
                  />
                )}
                <CustomText variant="small">{currentOption}</CustomText>
              </div>
              <img src={ArrowDown} alt="dropdown menu down arrow" />
            </div>
          </button>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-in duration-100"
          enterFrom="transform translate-y-1/2 md:translate-y-0 md:opacity-0"
          enterTo="transform translate-y-0 md:opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform translate-y-1/2 md:translate-y-0 md:opacity-100"
          leaveTo="transform translate-y-0 md:opacity-0"
        >
          <Listbox.Options className="rounded-lg bg-white shadow-3xl focus:outline-none focus:border-primary focus:ring-primary overflow-hidden fixed bottom-0 left-0 w-full md:absolute md:top-[68px] md:h-fit">
            {options.map(({ id, value, icon }, index) => (
              <Listbox.Option
                key={id}
                value={value}
                onClick={() => handleSelect({ id, value, icon })}
                className={({ active }) =>
                  `${active && "bg-neutral2"} ${
                    index !== options.length - 1 && "border-b border-neutral2"
                  }`
                }
              >
                <div
                  className={`${animation} flex gap-2 py-3 px-6 hover:bg-neutral2`}
                >
                  <img src={icon} alt={`${value} icon`} />
                  <p className="text-fontSecondary text-base font-medium">
                    {value}
                  </p>
                </div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};
