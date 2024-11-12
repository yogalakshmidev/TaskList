const generateMemeBtn=document.querySelector(".generator-meme-btn");
const memeImage=document.querySelector(".img");
const memeTitle=document.querySelector(".meme-title");
const memeAuthor=document.querySelector(".meme-author");
const updateDetails = (image,title,price)=>{
  memeImage.setAttribute("src",image);
  memeTitle.innerHTML=title;
  memeAuthor.innerHTML=`$: ${price}`;
};
const generateMeme = ()=>{
  console.log("enter into fn");
  fetch('https://fakestoreapi.com/products/1')
            .then((res)=>{
              res.json();
              console.log(res);
            }
          )
            .then((json)=>{
              console.log("json result"+json)})
            .then((data) => {
              console.log("data result"+data);
              updateDetails(data.title,data.image,data.price)
            });
};

generateMemeBtn.addEventListener("click",generateMeme);