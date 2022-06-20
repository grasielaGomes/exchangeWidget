import dayjs from "dayjs";
import { CustomText } from "../typography";
import { TableRowI } from "./interfaces";
import { SpinLoading } from "../loadings/SpinLoading";

interface CellI {
  isFirst?: boolean;
  isEven?: boolean;
}

const texts = {
  types: {
    exchanged: "Exchanged",
    livePrice: "Live price"
  }
};

const styles = {
  container: (index: number) =>
    `flex items-center py-4  rounded border border-transparent transition-all ease-out duration-200 ${
      index % 2 === 0 ? "bg-white" : "bg-neutral2"
    } hover:border-dark`,
  cell: ({ isFirst = false, isEven = true }: CellI) =>
    `pl-2 ${isEven ? "w-[210px]" : "w-[154px]"} ${!isFirst && "border-l-tiny"}`,
  loadingContainer: "flex justify-start pl-2"
};

export const TableRowDesktop = ({
  index = 0,
  isFetching = false,
  transaction: { amount, date, from, to, totalAmount, status }
}: TableRowI) => {
  const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm");
  const isLive = status === "LIVE";

  return (
    <div className={styles.container(index)}>
      <div className={styles.cell({ isFirst: true })}>
        <CustomText variant="small">{formattedDate}</CustomText>
      </div>
      <div className={styles.cell({ isEven: false })}>
        <CustomText variant="small">{from}</CustomText>
      </div>
      <div className={styles.cell({ isEven: true })}>
        <CustomText variant="small">{amount}</CustomText>
      </div>
      <div className={styles.cell({ isEven: false })}>
        <CustomText variant="small">{to}</CustomText>
      </div>
      <div className={styles.cell({ isEven: true })}>
        {isFetching && isLive ? (
          <div className={styles.loadingContainer}>
            <SpinLoading />
          </div>
        ) : (
          <CustomText variant="small">{totalAmount || ""}</CustomText>
        )}
      </div>
      <div className={styles.cell({ isEven: false })}>
        <CustomText variant="small" isBold>
          <span className={isLive ? "text-primary" : "text-secondary"}>
            {isLive ? texts.types.livePrice : texts.types.exchanged}
          </span>
        </CustomText>
      </div>
    </div>
  );
};
