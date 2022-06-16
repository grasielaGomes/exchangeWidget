import { useState } from "react";
import dayjs from "dayjs";
import { FullButton } from "./components/buttons/FullButton";
import { DatePicker } from "./components/forms/DatePicker";
import { DropdowMenu } from "./components/forms/DropdowMenu";
import { cryptoOptions } from "./components/forms/helpers";
import { CustomText, Heading } from "./components/typography";

function App() {
  const [date, setDate] = useState(dayjs());
  return (
    <div className="w-1/2 m-auto grid gap-5">
      {/* <p className="text-2xl font-bold">Hello</p> */}
      <Heading color="text-blue-500" variant="h1">
        Hello World
      </Heading>
      <Heading color="text-zinc-500" variant="h2">
        {`Selected date: ${date.format("DD/MM/YYYY")}`}
      </Heading>
      <CustomText variant="tiny">Hello World</CustomText>
      <FullButton handleClick={() => {}} variant="secondary">
        Label
      </FullButton>
      <FullButton handleClick={() => {}}>Label</FullButton>
      <DropdowMenu
        options={cryptoOptions}
        label="Currency"
        handleSelect={(value) => console.log(value)}
      />
      <DatePicker selectedDate={date} onChange={setDate} />
    </div>
  );
}

export default App;
