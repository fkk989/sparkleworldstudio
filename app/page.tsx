import { HomePageContent, SlidesContainer } from "@/components";

export default function Home() {
  return (
    <div className="w-screen">
      <div>
        <SlidesContainer />
      </div>
      <div className="">
        <HomePageContent />
      </div>
    </div>
  );
}
