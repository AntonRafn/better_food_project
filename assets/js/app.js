const articleEl = document.querySelector("article");
const domain = "https://antonstest.antonshjemmeside.dk/";
const postsEndpoint = "wp-json/wp/v2/posts";
const getRealImageUrls = "?acf_format=standard";
const authEndpoint = "wp-json/jwt-auth/v1/token";
const fullImage = "?acf_format=standard";   

const url = domain + postsEndpoint + fullImage;


fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data);
    postOpskrift(data);
})
.catch(error => console.log("Der er sket en fejl"))


function postOpskrift(posts) {
    posts.forEach(post => {
      const postEl = document.createElement("section");

      postEl.innerHTML = `
        <h2>${post.acf.navn_pa_ret}</h2>
        
      <img src="${post.acf.billede_af_retten.url}" alt="">

      <p>${post.acf.beskrivelse}</p>

      <a href="/recipe.html?slug=${post.slug}">Click me</a>
        `;
  
      articleEl.appendChild(postEl);
    });
  }
