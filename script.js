// Work with localStorage

let getLinks = () => JSON.parse(localStorage.getItem("links"))

let setLinksToLocalStorage = (links) => {
    localStorage.setItem("links", JSON.stringify(links))
    rerenderLinksList(links)
}

// CREATORS

let listItemCreator  = (title, url, id) => {
    return `
    <div class="btn-group mt-3">
        <a href="${url}" class="list-group-item list-group-item-action text-center p-3"><h4>${title}</h4></a>
        <button type="button" class="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
            <li><button class="dropdown-item" onclick="deleteLinkHandler(this)" data-id="${id}">Видалити</button></li>
        </ul>
    </div>`
}

let linkCreator = (title, url) => {
    let id = 1;
    let links = getLinks();
    if (links && links.length !== 0){
        id = links[links.length - 1].id + 1
    }
    return {title, url, id}
}

let rerenderLinksList = (links) => {
    let list = document.getElementById("linksList");
    list.innerHTML = "";

    if (links){
        links.forEach(link => {
            list.innerHTML += listItemCreator(link.title, link.url, link.id)
        });

    }else{
        list.innerHTML = "<h3 class='text-center text-muted'>Немає посилань :(  Додай нові!</h3>"
    }

}

// Modify Links

let addLink = (links, link) => {
    if (!links) links = []
    links.push(link)
    return links
}

let deleteLink = (links, id) => links.filter(link => link.id != id)



// Handle UI events

let form = document.getElementById("addNewLinkForm");

function deleteLinkHandler(elem){
    let id = elem.dataset.id
    let links = getLinks()

    setLinksToLocalStorage(deleteLink(links, id));
}

form.addEventListener("submit", function(e){
    e.preventDefault()
    let link = linkCreator(this.title.value, this.url.value)
    setLinksToLocalStorage(addLink(getLinks(), link))
    this.title.value = ""
    this.url.value = ""
    document.getElementById("closeModal").click()

} )

document.addEventListener("DOMContentLoaded", () => {
    rerenderLinksList(getLinks());
});
