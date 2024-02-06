import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";

export const InfoCard = () => {
  return (
    <div>
      {/* info started */}
      <div
        className=" flex flex-col justify-start items-start p-[10px]  textured-bg w-screen  max-mobile:mt-[20px] gap-[20px] mobile:absolute left-[88%] top-[30%] mobile:w-[390px] mobile:h-[460px] "
        style={{
          boxShadow: "10px 10px 64px -3px rgba(0,0,0,0.47)",
        }}
      >
        <h1 className="capitalize text-[25px] font-[999] bg-white w-[100px] h-[50px] flex justify-center items-center  ">
          info
        </h1>
        {/* details */}
        {/* phone */}
        <div className="flex w-[100%] justify-between items-center bg-white">
          <PhoneIcon className="w-[30px] h-[30px]" />
          <div className="flex flex-col gap-[10px] w-[80%]">
            <span className="font-[700]">phone number</span>
            <span className="font-[500]">(+91) 7000827363</span>
          </div>
        </div>
        {/* email */}
        <div className="flex w-[100%] justify-between items-center bg-white">
          <EnvelopeIcon className="w-[30px] h-[30px]" />
          <div className="flex flex-col gap-[10px] w-[80%]">
            <span className="font-[700]">Email</span>
            <span className="font-[500]">sparkleworldstudio@gmail.com</span>
          </div>
        </div>
        {/* addredd */}
        <div className="flex w-[100%] justify-between items-center bg-white ">
          <MapPinIcon className="w-[30px] h-[30px]" />
          <div className="flex flex-col gap-[10px] w-[80%]">
            <span className="font-[700]">address</span>
            <span className="font-[500]">
              318, 3rd Floor, City Center Mall, Pandri, Raipur C.G.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
