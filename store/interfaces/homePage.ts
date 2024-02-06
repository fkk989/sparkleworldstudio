export interface SlidesElementsProps {
  mainDiv: HTMLDivElement;
  sketchSlide: HTMLDivElement;
  imageSlide: HTMLDivElement;
  sketchContent: HTMLDivElement[];
  imageContent: HTMLDivElement[];
  resizerDiv: HTMLDivElement;
}

export interface SlideProps {
  sketchImgUrl: string;
  imageURL: string;
  word: string;
  para: string;
}
