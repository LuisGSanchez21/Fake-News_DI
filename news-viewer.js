  class NewsViewer extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.loadArticles();
    }

    async loadArticles() {
      try {
        const response = await fetch(
          "https://news-foniuhqsba-uc.a.run.app/" + this.getAttribute("section")
        );

        if (!response.ok) {
          throw new Error("Error al obtener los artículos");
        }
        const articles = await response.json();
        this.renderArticles(articles);
      } catch (error) {
        console.error("Error:", error);
        this.innerHTML = `<p>Error al cargar los artículos. Inténtelo nuevamente más tarde.</p>`;
      }
    }

    renderArticles(articles) {
      const template = document.getElementById("article-template");

      // Limpiar contenido existente
      this.innerHTML = "";

      articles.forEach((article) => {
        // Clonar el contenido de la plantilla
        const articleContent = document.importNode(template.content, true);

        // Rellenar la plantilla con los datos del artículo
        articleContent.querySelector(".title").textContent = article.headline;
        articleContent.querySelector(".author").textContent = article.author;
        articleContent.querySelector(".description").innerHTML = article.body;

        // Añadir el artículo al componente
        this.appendChild(articleContent);
      });
    }
  }

  // Definir el elemento personalizado
  customElements.define("news-viewer", NewsViewer);

  class CustomArticle extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.loadArticle();
    }
  
    async loadArticle() {
      try {
        const params = new URLSearchParams(location.search);
        const id = params.get('id')
        const response = await fetch('https://news-foniuhqsba-uc.a.run.app/' + id);
        if (!response.ok) {
          throw new Error('Error al obtener artículo');
        }
        const article = await response.json();
        this.renderArticle(article);
      } catch (error) {
        console.error('Error:', error);
        this.innerHTML = `<p>Error al cargar el artículo. Inténtelo nuevamente más tarde.</p>`;
      }
    }
  
    renderArticles(articles) {
      const template = document.getElementById('article-template');
  
  
      this.innerHTML = '';
  
      articles.forEach(article => {
  
        const articleContent = document.importNode(template.content, true);
  
  
        articleContent.querySelector('.headline').textContent = article.headline;
        articleContent.querySelector('.abstract').textContent = article.abstract;
        articleContent.querySelector('.author').textContent = article.author;
        articleContent.querySelector('.section').textContent = article.section;
        articleContent.querySelector('.url').href = 'article.html?id=' + article.id;
  
  
        this.appendChild(articleContent);
      });
    }
  
  
  }
  customElements.define("custom-article", CustomArticle);
