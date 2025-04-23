const domain = "https://antonstest.antonshjemmeside.dk/";
const postsEndpoint = "wp-json/wp/v2/posts";
const fullImage = "?acf_format=standard&per_page=100";
const url = domain + postsEndpoint + fullImage;

const allRecipesContainer = document.getElementById("recipesGrid");


function renderAllRecipes(posts) {
  allRecipesContainer.innerHTML = posts.map(function(recipe) {
    return `
      <div class="allRecipes-card">
        <div class="allRecipes-card-image">
          <img src="${recipe.acf.billede_af_retten?.url}" alt="${recipe.acf.navn_pa_ret}" />
        </div>
        <div class="allRecipes-card-content">
          <h3>${recipe.acf.navn_pa_ret}</h3>
          <p>${recipe.acf.kort_beskrivelse || "Information om retten"}</p>
          <div class="allRecipes-meta">
            <span>⏱️ ${recipe.acf.tid}</span>
            <a href="recipe.html?slug=${recipe.slug}">Se opskrift</a>
          </div>
        </div>
      </div>
    `;
  }).join("");
}


fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    renderAllRecipes(data);
  })
  .catch(function(error) {
    console.error("Fejl ved indlæsning af opskrifter:", error);
  });
