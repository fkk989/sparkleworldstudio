import { ContactForm, InfoCard } from "@/components";
// input style

export default function Contact() {
  return (
    <div className="flex flex-col">
      {/* top image container */}
      <div
        className="  fixed top-0 w-screen h-[50vh] bg-cover bg-no-repeat bg-center bg-[rgba(0,0,0,0.3)] bg-blend-multiply"
        style={{
          backgroundImage:
            "url('https://sparkle-world-studio-production.s3.ap-south-1.amazonaws.com/contact.jpg')",
        }}
      ></div>
      {/* title */}
      <div className="mt-[40vh] z-[2]  ml-[30px]">
        <h1 className="capitalize text-white text-[35px] font-[800] tracking-[2px] mobile:text-[50px]">
          contact us
        </h1>
      </div>

      <div className=" mobile:relative flex flex-col items-center  mt-[5vh] bg-white z-[5] pt-[30px]">
        {/* contact form and info */}
        <div className="mobile:w-[100vw] mobile:h-[80vh] flex flex-col justify-center items-center  mobile:relative mobile:items-start mobile:pl-[20vw]">
          <div className="relative">
            <ContactForm />
            <InfoCard />
          </div>
        </div>
      </div>
    </div>
  );
}
