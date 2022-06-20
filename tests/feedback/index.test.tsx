import { render } from "@testing-library/react";
import { Feedback } from "../../src/components/feedback";

describe("Tests on <Feedback />", () => {
  it("should match with snapshot on success", () => {
    const isSuccess = true;

    const { container } = render(<Feedback isSuccess={isSuccess} />);

    expect(container).toMatchSnapshot();
  });

  it("should show default error message", () => {
    const isSuccess = false;
    const errorMessage = "Server error. Please try again later.";

    const { getByText } = render(<Feedback isSuccess={isSuccess} />);

    expect(getByText(errorMessage)).toBeTruthy();
  });

  it("should show custom error message", () => {
    const isSuccess = false;
    const errorMessage = "Error message";

    const { getByText } = render(
      <Feedback isSuccess={isSuccess} errorMessage={errorMessage} />
    );

    expect(getByText(errorMessage).innerHTML).toBe(errorMessage);
  });
});
