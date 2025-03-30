// manga-livre:0.0.1

const fetchMangas = async () => {
  try {
    const response = await fetch("https://mangalivre.tv/");
    const html = await response.text();
    const $ = cheerio.load(html); // Carregar o HTML
    let mangas = [];

    $(".manga__item").each((index, element) => {
      // Título e link
      const title = $(element).find(".post-title h2 a").text().trim();
      const link = $(element).find(".post-title h2 a").attr("href");

      // Imagem
      const img = $(element).find(".manga__thumb_item img").attr("src");

      // Descrição
      const description = $(element).find(".manga-excerpt p").text().trim();

      // Total de capítulos (extraindo apenas o número)
      const totalChaptersText = $(element)
        .find(".manga-info .total")
        .text()
        .trim();
      // Extrair apenas os números do texto "90 Capitulos"
      const totalChapters = totalChaptersText.replace(/[^0-9]/g, "");

      // Gêneros
      const genres = [];
      $(element)
        .find(".manga-genres .genre-item a")
        .each((_, genreElement) => {
          genres.push($(genreElement).text().trim());
        });

      // Adicionando a estrutura do manga sem a lista de capítulos
      mangas.push({
        title,
        link,
        img,
        description,
        totalChapters,
        genres,
      });
    });

    setMangaList(mangas);
    return mangas;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return [];
  }
};
