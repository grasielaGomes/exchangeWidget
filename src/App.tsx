import { FullButton } from "./components/buttons";
import { CustomText, Heading } from "./components/typography";

function App() {
  return (
    <div>
      {/* <p className="text-2xl font-bold">Hello</p> */}
      <Heading color="text-blue-500" variant="h1">
        Hello World
      </Heading>
      <Heading color="text-zinc-500" variant="h2">
        Hello World
      </Heading>
      <CustomText variant="tiny">Hello World</CustomText>
      <FullButton handleClick={() => {}} variant="secondary">
        Label
      </FullButton>
      <FullButton handleClick={() => {}}>Label</FullButton>
    </div>
  );
}

export default App;
