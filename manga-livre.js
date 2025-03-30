import { parse } from "react-native-html-parser";

const fetchMangas = async () => {
  try {
    // Fetch a página HTML do Manga Livre
    const response = await fetch("https://mangalivre.tv/");
    const html = await response.text();

    // Utiliza o react-native-html-parser para parsear o HTML
    const document = parse(html);

    // Extrair informações dos mangas
    const mangas = [];
    const mangaItems = document.querySelectorAll(".manga__item");

    mangaItems.forEach((item) => {
      const title = item.querySelector(".post-title h2 a").text.trim();
      const link = item.querySelector(".post-title h2 a").attrs.href;
      const img = item.querySelector(".manga__thumb_item img").attrs.src;
      const description = item.querySelector(".manga-excerpt p").text.trim();

      mangas.push({
        title,
        link,
        img,
        description,
      });
    });

    console.log(mangas);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
};
