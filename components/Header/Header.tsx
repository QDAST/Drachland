import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col w-full h-20 bg-[#2196F3] shadow-xl justify-center items-center ">
      <div className="h-full"></div>
      <div className="flex w-auto h-auto ">
        <Image
          loading="eager"
          src={"/HeaderIMG.jpg"}
          alt="HeaderIMG"
          width={116}
          height={41}
        ></Image>
      </div>
    </div>
  );
}
