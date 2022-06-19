import { CustomText } from "../typography";
import { FeedbackI } from "./interfaces/index";
import { useLayoutEffect, useState } from "react";

const texts = {
  errorMessage: "Server error. Please try again later.",
  successMessage: "Exchange submitted."
};

const styles = {
  successFeedback: (isSuccess: boolean, showFeedback: boolean) =>
    `fixed left-0 bottom-0 w-full flex items-center justify-center h-12 transition-opacity duration-200 ease-in-out opacity-0 ${
      isSuccess ? "bg-primary" : "bg-pink-500"
    } ${(showFeedback && "opacity-100") || "opacity-0"}`
};

export const Feedback = ({
  errorMessage = texts.errorMessage,
  isSuccess,
  successMessage = texts.successMessage
}: FeedbackI) => {
  const [showFeedback, setShowFeedback] = useState(isSuccess);

  useLayoutEffect(() => {
    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  }, [isSuccess]);

  return (
    <div className={styles.successFeedback(isSuccess, showFeedback)}>
      <CustomText isBold color="white">
        {isSuccess ? successMessage : errorMessage}
      </CustomText>
    </div>
  );
};
