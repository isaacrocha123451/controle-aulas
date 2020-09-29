const selectPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

for(let item of menuItems){
    if(selectPage.includes(item.getAttribute('href'))){
        item.classList.add('active')
    }
}

console.log(selectPage.includes("teachers"))    

//paginação

function paginate (selectedPage,totalPage){
    let pages= [],
    oldpage

for(let currentPage = 1; currentPage <= totalPage; currentPage++){
    const firtsPagesAndLastPages = currentPage == 1 || currentPage == 2 || currentPage == totalPage - 1 || currentPage == totalPage
    const pagesBefore = currentPage >= selectedPage - 1
    const pagesAfter = currentPage <= selectedPage + 1

    if(firtsPagesAndLastPages || pagesBefore && pagesAfter){
        
        if(oldpage && currentPage - oldpage > 2){
            pages.push("...")
        }
        if(oldpage && currentPage - oldpage == 2 ){
            pages.push(currentPage - 1)
        }
        pages.push(currentPage)
        oldpage = currentPage

        

    }

}
    return pages
}

function createPagination(pagination){
    
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const filter = pagination.dataset.filter
    const pages = paginate(page,total) 

    console.log(total)
    console.log(page)
    console.log(pages)

    let elements = ""


    for(let page of pages){
    if(String(page).includes("...")){
        elements += `<span>${page}</span>`
    }else{
        elements += `<a href="?filter=${filter}&page=${page}">${page}</a>`
    }
    }

    pagination.innerHTML = elements

}

const pagination = document.querySelector(".pagination")

if(pagination){
    createPagination(pagination)
}




