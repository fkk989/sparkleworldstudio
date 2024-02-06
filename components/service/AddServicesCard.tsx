"use client";
import { useAddService, useGetServiceById, useUploadToAws } from "@/hooks";
import { serviceAtom } from "@/store";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { use, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import Image from "next/image";
interface AddServicesCardProp {
  id?: string;
  title: string;
  submit: (body: object) => void;
}
// imput style
const inputStyle = `w-[100%] h-[50px] outline-none bg-transparent border-b border-[#23252d] placeholder:text-[#23252d] mobile:w-[90%]`;

export const AddServiceCard: React.FC<AddServicesCardProp> = ({
  id,
  title,
  submit,
}) => {
  const [service, setServie] = useRecoilState(serviceAtom);
  const resetService = useResetRecoilState(serviceAtom);

  useEffect(() => {
    console.log(service);
  }, [service]);

  if (id) {
    const { serviceData, refetch } = useGetServiceById(id);
    useEffect(() => {
      refetch();
      if (serviceData && serviceData.service && serviceData.service.imageUrl) {
        const { title, info, imageUrl } = serviceData.service;
        setServie({
          title,
          info,
          imageUrl,
        });
      }
    }, [serviceData]);
  }

  const { mutate, data, isSuccess } = useUploadToAws();
  useEffect(() => {
    if (isSuccess) {
      const url = new URL(data.url);
      const imagePath = `${url.origin}${url.pathname}`;
      setServie({ ...service, imageUrl: imagePath });
    }
  }, [isSuccess]);

  const handleImgInput = async () => {
    const imgInput = document.createElement("input");
    imgInput.setAttribute("type", "file"),
      imgInput.setAttribute("accept", "image/*");
    imgInput.addEventListener("change", () => {
      mutate(imgInput);
    });
    imgInput.click();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {/*  Form started*/}
      <div className="w-screen  bg-[rgb(238,241,242)] flex flex-col justify-start items-center p-[30px] mobile:w-[700px] mobile:items-start mobile:gap-[50px] z-[10]">
        <h1 className="capitalize text-black text-[25px] font-[999] bg-white w-[250px] h-[50px] flex justify-center items-center digonals-lines mobile:text-[42px] mobile:w-[350px] mobile:h-[100px]  ">
          {title}
        </h1>
        <div
          typeof="contact"
          className=" w-[340px] gap-[30px] flex flex-col i max-mobile:mt-[20px] mobile:w-[100%] "
        >
          <div>
            {service.imageUrl.length !== 0 && (
              <Image src={service.imageUrl} alt="" width={200} height={200} />
            )}
          </div>
          {/* title */}
          <input
            onChange={(e) => {
              setServie({ ...service, title: e.target.value });
            }}
            type="text"
            placeholder="Title"
            className={`${inputStyle}`}
            value={service.title}
          />
          {/* info */}
          <input
            onChange={(e) => {
              setServie({ ...service, info: e.target.value });
            }}
            type="text"
            placeholder="Info"
            className={`${inputStyle}`}
            value={service.info}
          />
          {/* imageUrl */}
          {/* image input */}
          <button
            onClick={() => {
              handleImgInput();
            }}
          >
            <PhotoIcon className="w-[30px] h-[30px] text-slate-400 hover:text-slate-800" />
          </button>

          {/* submit button */}
          <div
            onClick={() => {
              submit(service);
              id === undefined && resetService();
              console.log(`id:${id}`);
            }}
            className="w-[100%] flex justify-end items-center mobile:w-[90%]"
          >
            <button className="w-[80px] h-[40px] bg-[#d7b39a] text-[11px] font-[600] tracking-[3px] uppercase">
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* form end */}
    </div>
  );
};
