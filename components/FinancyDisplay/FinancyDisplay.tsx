import { useEffect, useState } from "react";
import { FinancyDisplayType } from "../types/FinancyDisplay";

export default function FinancyDisplay({ text, income }: FinancyDisplayType) {
  const [style, setStyle] = useState("");
  useEffect(() => {
    if (income) {
      setStyle("flex font-bold text-[20px] text-green-500");
    } else {
      setStyle("flex font-bold text-[20px] text-red-500");
    }
  }, []);

  return (
    <div className="flex w-10 justify-center">
      <div className="flex justify-center">
        <span className={style}>{text}</span>
      </div>
    </div>
  );
}
