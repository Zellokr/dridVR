export type DataImage = {
  image: string;
  altText: string;
  url?: string;
  contentId?: string;
};

export type BannerProps = {
  dataImages: DataImage[];
  orientation?: "horizontal" | "vertical";
};
