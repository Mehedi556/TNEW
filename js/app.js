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