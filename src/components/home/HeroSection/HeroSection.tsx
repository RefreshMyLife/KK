import HeroSlider from "@/components/ui/Slider";
import { slides } from "./slidesData";

export default function HeroSection() {
  return (
    <HeroSlider
      slides={slides}
      initialSeconds={5600}
      showTimer={true}
      minHeight="100vh"
    />
  );
}
