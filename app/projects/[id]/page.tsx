import Image from "next/image";

export default function Projects({ params }: { params: { id: string } }) {
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className="w-[100%] mobile:w-[70%] h-[80%] flex flex-col-reverse mobile:flex-row  mobile:p-[50px]">
        <div className=" w-[100vw] mobile:w-[60%] h-[100%] mr-[20px] p-[10px]">
          <div>
            <h1 className="text-[20px]  mobile:text-[40px] font-[999]">
              Residential Project of Mr Sinha at Raipur
            </h1>
            <p className="pr-[10px]">
              This Beautiful House is an Ongoing Project of Easy Nirman located
              at Capital Homes Raipur
            </p>
            <p className=" mt-[30px]">The Total Land Area is 1065 Sq. Ft.</p>

            <h3 className="mt-[50px] font-[999] text-[25px]">Client</h3>
            <p>Residential Project of Mr Sinha at Raipur</p>

            {/* horizontal line */}

            <div className="w-[100%] h-[1px] bg-[#23252d] mt-[10px]"></div>
            <h3 className="mt-[50px] font-[999] text-[25px]">Budget</h3>
            <p>22 Lac</p>

            {/* horizontal line */}
            <div className="w-[100%] h-[1px] bg-[#23252d] mt-[10px]"></div>
            <h3 className="mt-[50px] font-[999] text-[25px]">Architect</h3>
            <p>Mr. Suraj</p>

            {/* horizontal line */}
            <div className="w-[100%] h-[1px] bg-[#23252d] mt-[10px]"></div>
          </div>
        </div>
        <div className=" w-[100vw]  mobile:w-[40%] mobile:h-[100%]">
          <Image
            src={
              "https://easynirman.com/easy-admin/assets/image/projects/sinhajielevation.jpg"
            }
            alt=""
            width={300}
            height={300}
            className="w-screen h-[350px] mobile:w-[35vw] mobile:h-[40vh]"
          />
        </div>
      </div>
    </div>
  );
}
