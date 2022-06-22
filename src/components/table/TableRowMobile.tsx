import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import dayjs from "dayjs";

import { FullButton } from "../buttons";
import { CustomText } from "../typography";
import { TableRowI } from "./interfaces/index";
import { Heading } from "../typography/Heading";
import { Close } from "../../assets";
import { currencyCode } from "../forms/helpers";

const styles = {
  container:
    "relative w-full grid gap-2 text-left p-4 bg-[#F9F9F9] border border-[#EFF0F6] rounded-xl hover:border-primaryHover focus:outline-none focus:border-primary focus:ring-primary focus:ring-0",
  status: (status: string) =>
    `absolute top-4 right-4 h-4 w-4 ${
      status === "EXCHANGED" ? "bg-primary" : "bg-secondary"
    } rounded-full`,
  modal: {
    dialog: "relative z-10",
    overlay: "fixed inset-0 bg-black bg-opacity-25",
    container: "fixed bottom-0 inset-x-0 w-full",
    panel:
      "w-full transform rounded-t-2xl bg-white p-6 text-left align-middle shadow-3xl transition-all",
    header: "flex justify-between items-center",
    divider: "my-8",
    contentContainer: "grid gap-2 mb-[4rem]",
    content: "flex gap-2",
    colLeft: "w-[6rem]",
    bullet: (status: string) =>
      `h-4 w-4 rounded-full ${
        status === "EXCHANGED" ? "bg-primary" : "bg-secondary"
      }`,
    label: "text-neutral3"
  }
};

const texts = {
  modalTitle: "Exchange",
  closeIconAlt: "Close icon",
  content: {
    date: "Date & Time",
    status: "Status",
    from: "From",
    to: "To",
    amount: "Amount",
    total: "Total Amount"
  },
  types: {
    exchanged: "Approved",
    livePrice: "Live price"
  }
};

export const TableRowMobile = ({
  transaction: { amount, currencyRate, date, from, to, totalAmount, status }
}: TableRowI) => {
  const [isOpen, setIsOpen] = useState(false);
  const formattedDate = dayjs(date).format("DD/MM/YYYY @ HH.mm");
  const isLive = status === "LIVE";

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button type="button" className={styles.container} onClick={openModal}>
        <CustomText isBold>{`${from} ${"\u2192"} ${to}`}</CustomText>
        <CustomText variant="small">{`${amount} ${
          currencyCode[from.toLowerCase() as keyof typeof currencyCode]
        } ${currencyRate}`}</CustomText>
        <div className={styles.status(status)} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={styles.modal.dialog} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={styles.modal.overlay} />
          </Transition.Child>

          <div className={styles.modal.container}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform translate-y-1/4"
              enterTo="opacity-100 transform translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform translate-y-0"
              leaveTo="opacity-0 transform translate-y-1/4"
            >
              <Dialog.Panel className={styles.modal.panel}>
                <div className={styles.modal.header}>
                  <Heading variant="h3">{texts.modalTitle}</Heading>
                  <button type="button" onClick={closeModal}>
                    <img src={Close} alt={texts.closeIconAlt} />
                  </button>
                </div>
                <hr className={styles.modal.divider} />
                <div className={styles.modal.contentContainer}>
                  <div className={styles.modal.content}>
                    <div className={styles.modal.colLeft}>
                      <CustomText variant="small">
                        {texts.content.date}
                      </CustomText>
                    </div>
                    <CustomText variant="small">{formattedDate}</CustomText>
                  </div>
                  <div className={styles.modal.content}>
                    <div className={styles.modal.colLeft}>
                      <CustomText variant="small" color="neutral3">
                        {texts.content.status}
                      </CustomText>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={styles.modal.bullet(status)} />
                      <CustomText variant="small">
                        <span
                          className={isLive ? "text-secondary" : "text-primary"}
                        >
                          {isLive
                            ? texts.types.livePrice
                            : texts.types.exchanged}
                        </span>
                      </CustomText>
                    </div>
                  </div>
                  <div className={styles.modal.content}>
                    <div className={styles.modal.colLeft}>
                      <CustomText variant="small" color="neutral3">
                        {texts.content.from}
                      </CustomText>
                    </div>
                    <CustomText variant="small">{from}</CustomText>
                  </div>
                  <div className={styles.modal.content}>
                    <div className={styles.modal.colLeft}>
                      <CustomText variant="small" color="neutral3">
                        {texts.content.to}
                      </CustomText>
                    </div>
                    <CustomText variant="small">{to}</CustomText>
                  </div>
                  <div className={styles.modal.content}>
                    <div className={styles.modal.colLeft}>
                      <CustomText variant="small" color="neutral3">
                        {texts.content.amount}
                      </CustomText>
                    </div>
                    <CustomText variant="small">
                      <>
                        <span>{`${amount} `}</span>
                        <span className={styles.modal.label}>
                          {
                            currencyCode[
                              from.toLowerCase() as keyof typeof currencyCode
                            ]
                          }
                        </span>
                        <span
                          className={styles.modal.label}
                        >{` ${currencyRate}`}</span>
                      </>
                    </CustomText>
                  </div>
                  <div className={styles.modal.content}>
                    <div className={styles.modal.colLeft}>
                      <CustomText variant="small" color="neutral3">
                        {texts.content.total}
                      </CustomText>
                    </div>
                    <CustomText variant="small">
                      <>
                        <span>{`${totalAmount} `}</span>
                        <span className={styles.modal.label}>
                          {
                            currencyCode[
                              from.toLowerCase() as keyof typeof currencyCode
                            ]
                          }
                        </span>
                        <span
                          className={styles.modal.label}
                        >{` ${currencyRate}`}</span>
                      </>
                    </CustomText>
                  </div>
                </div>
                <FullButton isFull handleClick={closeModal}>
                  Close
                </FullButton>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
