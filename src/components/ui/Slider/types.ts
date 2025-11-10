export type Slide = {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  buttonText: string;
  buttonLink?: string;
  image: string;
  bgColor: string;
  info: string;
  infoTitle?: string;
  // Отдельные поля для левой стороны слайдера
  leftTitle?: string;
  leftSubtitle?: string;
  leftInfo?: string;
};

export interface HeroSliderProps {
  slides: Slide[];
  initialSeconds?: number;
  showTimer?: boolean;
  minHeight?: string;
}
