import { Transition, Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ArrowDown } from "../../assets";
import { CustomText } from "../typography";
import { DropdowMenuI } from "./interfaces";

const texts = {
  cryptoAlt: "crypto icon",
  arrowAlt: "dropdown menu down arrow",
  errorMessage: "Please select a date",
};

export const DropdowMenu = ({
  handleSelect,
  initialOption,
  label,
  options
}: DropdowMenuI) => {
  const [currentOption, setCurrentOption] = useState(
    initialOption?.value || "Select"
  );

  const selectedIcon = () =>
    options.find((option) => option.value === currentOption)?.icon;

  const animation = "transition-colors duration-200 ease-in-out";

  const styles = {
    container: "flex flex-col relative",
    label: "mb-1 ml-1",
    buttonContainer:
      "bg-white text-sm leading-5 border rounded-lg border-neutral px-4 h-11 min-w-[180px] hover:border-primaryHover focus:outline-none focus:border-primary focus:ring-primary focus:ring-0",
    button: {
      content: "flex justify-between gap-4",
      selectedLabel: "flex items-center gap-2",
      currencyIcon: "hidden md:inline"
    },
    optionsContainer:
      "z-40 rounded-lg bg-white shadow-3xl focus:outline-none focus:border-primary focus:ring-primary overflow-hidden fixed bottom-0 left-0 w-full transform transition-all md:absolute md:top-[68px] md:h-fit",
    option: {
      container: `${animation} flex gap-2 py-3 px-6 hover:bg-neutral2`,
      label: "text-fontSecondary text-base font-medium"
    },
  };

  return (
    <div className={styles.container}>
      <Listbox value={currentOption} onChange={setCurrentOption}>
        {label && (
          <Listbox.Label className={styles.label}>
            <CustomText color="neutral3" variant="small">
              {label}
            </CustomText>
          </Listbox.Label>
        )}
        <Listbox.Button as={Fragment}>
          <button className={styles.buttonContainer}>
            <div className={styles.button.content}>
              <div className={styles.button.selectedLabel}>
                {selectedIcon() && (
                  <img
                    src={selectedIcon()}
                    alt={texts.cryptoAlt}
                    className={styles.button.currencyIcon}
                  />
                )}
                <CustomText variant="small">{currentOption}</CustomText>
              </div>
              <img src={ArrowDown} alt={texts.arrowAlt} />
            </div>
          </button>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 translate-y-3/4 md:translate-y-0"
          enterTo="opacity-100"
          leave="ease-out duration-200"
          leaveFrom="opacity-100 md:translate-y-0"
          leaveTo="opacity-0 translate-y-3/4 md:translate-y-0"
        >
          <Listbox.Options className={styles.optionsContainer}>
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
                <div className={styles.option.container}>
                  {icon && <img src={icon} alt={`${value} icon`} />}
                  <p className={styles.option.label}>{value}</p>
                </div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};
