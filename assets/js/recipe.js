const domain = "https://antonstest.antonshjemmeside.dk/";
const postsEndpoint = "wp-json/wp/v2/posts";
const fullImage = "?acf_format=standard";


const url = domain + postsEndpoint + fullImage;


fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);  
    postOpskrift(data); 
  })
  .catch(error => console.log("Der er sket en fejl", error));

// Get the query parameter 'slug' from the URL
const paramsString = window.location.search;
const searchParam = new URLSearchParams(paramsString);
const slug = searchParam.get("slug");


function renderRecipe(slug, posts) {
  
  const recipe = posts.find(post => post.slug === slug);

    recipeDetails.innerHTML = `
      <h2>${recipe.acf.navn_pa_ret}</h2>
      <img src="${recipe.acf.billede_af_retten.url}" alt="${recipe.acf.navn_pa_ret}" />
      <p>${recipe.acf.beskrivelse}</p>
    `;
  
}


function postOpskrift(posts) {
  renderRecipe(slug, posts);
}
