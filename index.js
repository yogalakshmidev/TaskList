const apikey='pub_5897707795887ae345895a404e763e85c2cf0';
const blogContainer=document.getElementById("blog-container");

async function fetchRandomNews(){
  try{
    const apiUrl=`https://newsdata.io/api/1/latest?apikey=${apikey}&category=politics&country=bd`;
    const response = await fetch(apiUrl);
    const data=await response.json();
    console.log(data);
    return data.articles;
  }
  catch(error){
    console.log("Error fetching random news"+error);
    return [];
  }
}
function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  
  // articles.forEach((article) => {
    // need to create new element and used to display data
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");
      const img = document.createElement("img");
      img.src = articles.image_url;
      img.alt = articles.title;
      const title = document.createElement("h2");
      title.textContent = articles.title;
      const description = document.createElement("p");
      description.textContent = articles.description;

      // Need to add this element to the blog
      blogCard.appendChild(img);
      blogCard.appendChild(title);
      blogCard.appendChild(description);

      blogContainer.appendChild(blogCard);
      
  // })
}
(async ()=>{
  try{
    const articles = fetchRandomNews();
    console.log(articles);
    // for(i=0;i<articles.length;i++){
    //   console.log(articles[i].image_url);
    //   console.log(articles[i].title);
    //   console.log(articles[i].description);
    // }
    displayBlogs(articles);
  }
  catch(error){
    console.error("Error fetching random newsss..."+error);
  }
})();