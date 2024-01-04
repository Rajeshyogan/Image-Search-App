let searchbox=document.getElementById("search-box")
let frontpage=document.getElementById("fp-images")
let imageresults=document.getElementById("imageResults")
let footerdiv=document.getElementById("footer-path")
let footer=document.querySelector('footer')
let showmore=document.getElementById("showmorebtn")
let field=document.getElementById("fieldtag")
let page=1;

    async function searchImages()
    { 

        let searchinput=document.getElementById("searchInput").value;
        let data=await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${searchinput}&client_id=wT5xCSl56MN9NkmhHuUtHb-QvPcSlUaS31wy31E5tfs`)
         data=await data.json();
    
    if (searchinput.trim() === "") {
        page = 1;
        showmore.style.display = "none";
        footer.style.position = "fixed";
        field.style.display = "block";
    } else {
        field.style.display = "none";
    }


        // for page section is if 
         if(page === 1)
          {
            frontpage.style.display="none"
            showmore.style.display="block"
          }
        data.results.map(({urls:{regular},likes,links:{download},alt_description}) => {
             imageresults.innerHTML +=`
              <div id="main-div">
             <img src=${regular} height=300px width=320px>
            <div class="inside-div">
            <p>${alt_description}</p>
            <div class="down-like">
            <a href=${download} download>Download&nbsp<i class="fa fa-arrow-circle-down" aria-hidden="true"></i></a>
            <h4> <i class="fa fa-heart-o" aria-hidden="true"></i> ${likes}</h4>
            </div>
            </div>
             </div>
             `
        })
        page++;
        if(page>1)
        {
            showmore.style.display="block"
            footer.style.display="block"
        }
    }
    
searchbox.addEventListener('submit',(event)=>{
    event.preventDefault();
    page=1;
    searchImages()
    imageresults.innerHTML=""
})

showmore.addEventListener('click',()=>{
    searchImages()
})
