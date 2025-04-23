const domain = "https://antonstest.antonshjemmeside.dk/";
const postsEndpoint = "wp-json/wp/v2/posts";
const fullImage = "?acf_format=standard&per_page=100";
const url = domain + postsEndpoint + fullImage;

const paramsString = window.location.search;
const searchParam = new URLSearchParams(paramsString);
const slug = searchParam.get("slug");

const recipeDetails = document.getElementById("recipeDetails");

function renderRecipe(slug, posts) {
  const recipe = posts.find((post) => post.slug === slug);

  if (!recipe) {
    recipeDetails.innerHTML = "<p>Opskrift ikke fundet</p>";
  }

  
let ingredientsList = "";

for (let i = 1; i <= 25; i++) {
  const ingredient = recipe.acf.ingredienser[`ingrediens_${i}`];
  if (ingredient) {
    ingredientsList += `<li>${ingredient}</li>`;
  }
}

let fremgangsmadeList = "";
for (let i = 1; i <= 25; i++) {
  const fremgangsmade = recipe.acf.fremgangsmade[`gor_det_her_${i}`];
  if (fremgangsmade) {
    fremgangsmadeList += `<li>${fremgangsmade}</li>`;
  }
}


  recipeDetails.innerHTML = `
    <h2>${recipe.acf.navn_pa_ret}</h2>
    <img src="${recipe.acf.billede_af_retten.url}" alt="${recipe.acf.navn_pa_ret}" />
    <div class="recipe-meta">
      <span>Tid</span>
      <span>Antal Personer</span>
      <span>Sværhedsgrad</span>
      <span>${recipe.acf.tid}</span>
      
      <span>${recipe.acf.antal_personer_}</span>
      
      <span>${recipe.acf.svaerhedsgrad}</span>
    </div>
    <div class="ingredients-steps-wrapper">
      <div class="ingredients-box">
        <h3>Ingredienser:</h3>
        <ul>
          ${ingredientsList}
        </ul>
      </div>
      <div class="steps-box">
        <h3>Fremgangsmåde:</h3>
        <ol>
          ${fremgangsmadeList}
        </ol>
      </div>
    </div>
  `;
}

fetch(url)
  .then((response) => response.json())
  .then((data) => renderRecipe(slug, data))
  .catch((error) => console.error("Fejl ved indlæsning af opskrift:", error));
