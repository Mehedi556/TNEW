const loadAllCategories = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    // console.log(data);
    return data.data.news_category;
   
}

const setAllCategories = async() => {
    const data = await loadAllCategories();
    // console.log(data);

    const ul = document.getElementById('category') 


    for(const category of data){
        // console.log(category.category_id);

        const li = document.createElement('li');
        
        li.innerHTML = `
        <a onclick = "categoryDetail('${category.category_id}')">${category.category_name}</a>
        `;

        ul.appendChild(li);

    }
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('hidden')
    }else{
        loaderSection.classList.add('hidden')
    }
}



const categoryDetail = (code) => {
    // console.log(code);
    const loadDetail = ` https://openapi.programming-hero.com/api/news/category/${code}`;
 
fetch(loadDetail)
.then(res => res.json())
.then(data => displaySingleCategories(data.data))
    
}

const displaySingleCategories = (items) => {
    // console.log(items);

    const singleCategori = document.getElementById('single-category');
    singleCategori.innerHTML = '';
    for(const item of items){
        // console.log(item);

const {thumbnail_url , title , total_view , details , image_url , author , _id} = item;
toggleSpinner(true);
const creatingDiv = document.createElement('div');
creatingDiv.classList.add = ('rounded-md');
creatingDiv.innerHTML = `

<figure class="w-3/3 mx-auto"><img src="${image_url}" alt="Album"></figure>
    <div class="card-body bg-slate-700">
      <h2 class="card-title">${title}</h2>
      <p>${details.slice(0 , 200)}</p>
      <p><i class="fa-solid fa-arrows-to-eye"></i>: ${total_view ? total_view : "No viewers found"}</p>
      <div class="d-flex">
      <img class="author-image" src="${author.img}" alt="">
      <div>
      <p>${author.name ? author.name : "No name found"}</p>
      <p>${author.published_date ? author.published_date : "No date found"}</p>
      </div>
      
      </div>
      
      <div class="card-actions justify-end">
        
      <label onclick="modalDetailBtn('${_id}')" for="my-modal-4" class="btn modal-button">Details</label>
        
      </div>
    </div>

`;
singleCategori.appendChild(creatingDiv);
}
// stop loader

toggleSpinner(false)
}



const modalDetailBtn = (code) => {

    const url = `https://openapi.programming-hero.com/api/news/${code}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data[0]));
    }
    
    const displayDetails = (mainDetails) => {
        // console.log(mainDetails);
    const {author , thumbnail_url , title , total_view , image_url} = mainDetails;
     
    const modalImg = document.getElementById('modal-img');
    modalImg.innerHTML = `
    <img src="${image_url}" alt="">
    `;
    
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = title;
    
    const modalMoreDetails = document.getElementById('modal-more-details');
    modalMoreDetails.innerHTML = `
    <h4>Author Name: ${author.name}</h4>
    <h6>Published Date: ${author.published_date}</h6>
    <p>Total view: ${total_view}</p>
    `;
    
    
    }
    
    
    
    // displaySingleCategories('All News');
    categoryDetail('Breaking News');
    setAllCategories('Breaking News');
    loadAllCategories('Breaking News');