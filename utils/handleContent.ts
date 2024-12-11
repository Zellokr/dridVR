import type { DataImage } from "~/components/Body/Banner/types";

export const redirectToContent = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave
  }
};

export const handleContent = (data: string | DataImage) => {
  if (typeof data === "string") {
    // Si es un string, asume que es una URL y ábrela
    window.open(data, "_blank");
    return;
  }

  // Si es un objeto DataImage, verifica URL o contentId
  const { url, contentId } = data;

  if (url) {
    // Si hay una URL, abre una nueva pestaña
    window.open(url, "_blank");
  } else if (contentId) {
    // Si no hay URL pero hay contentId, realiza un scroll suave
    redirectToContent(contentId);
  }
};
