export const redirectToContent = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave
  }
};
