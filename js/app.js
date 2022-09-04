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
}