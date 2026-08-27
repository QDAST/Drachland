import { ReactNode, useState } from "react";
import Button from "./Button";

type CreditType = {
  name?: ReactNode;
  summ?: number;
};

export default function Credit({ name = "ANONIM", summ = 10 }: CreditType) {
  const [circles, setCircles] = useState(1);

  if (name === "") name = "ANONIM";
  if (summ === 0 || summ < 0) summ = 10;

  const debt =
    summ <= 5
      ? Math.ceil(summ * (circles + 1))
      : summ <= 30
        ? Math.ceil(summ * (0.5 * circles + 1))
        : 0;

  const changeCircles = (operation: string) => {
    if (operation === "+" && circles < 9) setCircles(circles + 1);
    if (operation === "-" && circles > 1) setCircles(circles - 1);
  };

  return (
    <div className="flex gap-3 items-center bg-gray-500 p-2 rounded-xl border border-black">
      <div className="flex flex-col gap-3">
        <h1 className="bg-gray-600 w-[30vw] p-2 pl-4 pr-4 rounded-full font-bold">
          {name}
        </h1>
        <h1 className="bg-gray-600 w-[30vw] p-2 pl-4 pr-4 rounded-full font-bold">
          {summ}
        </h1>
      </div>
      <div className="w-0.5 h-3/4 bg-gray-400 rounded-full"></div>
      <div>
        <h1>{circles}</h1>
      </div>
      <div className="w-0.5 h-3/4 bg-gray-400 rounded-full"></div>
      <div className="flex flex-col gap-3">
        <Button
          className="flex bg-amber-300 w-[15vw] h-10 justify-center items-center text-3xl rounded-full"
          onClick={() => changeCircles("-")}
        >
          -
        </Button>
        <Button
          className="flex bg-amber-300 w-[15vw] h-10 justify-center items-center text-3xl rounded-full"
          onClick={() => changeCircles("+")}
        >
          +
        </Button>
      </div>
      <div className="w-0.5 h-3/4 bg-gray-400 rounded-full"></div>
      <div>
        <h1>{debt}</h1>
      </div>
      <div className="w-0.5 h-3/4 bg-gray-400 rounded-full"></div>
    </div>
  );
}
