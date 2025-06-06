import type { DataImage } from "~/components/Body/Banner/types";

export const redirectToContent = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export const handleContent = (data: string | DataImage) => {
  if (typeof data === "string") {
    window.open(data, "_blank");
    return;
  }
  const { url, contentId } = data;

  if (url) {
    window.open(url, "_blank");
  } else if (contentId) {
    redirectToContent(contentId);
  }
};