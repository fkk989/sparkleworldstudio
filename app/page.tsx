import { HomePageContent, SlidesContainer, VoyageSlider } from "@/components";

export default function Home() {
  return (
    <div className="w-screen">
      <div>
        <VoyageSlider />
      </div>
      <div className="">
        <HomePageContent />
      </div>
    </div>
  );
}
