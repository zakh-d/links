// Work with localStorage

let getLinks = () => JSON.parse(localStorage.getItem("links"))

let setLinksToLocalStorage = (links) => {
    localStorage.setItem("links", JSON.stringify(links))
    rerenderLinksList(links)
}

// CREATORS

let listItemCreator  = (title, url, id) => {
    return `<li class="collection-item avatar">
                <img src="https://picsum.photos/200/200/?=${id}" alt="" class="circle">
                <span class="title">${title}</span>
                <p><a href="${url}" target="_blank">Go to</a></p>
                <button onclick="deleteLinkHandler(this)" data-id="${id}" class="secondary-content waves-effect waves-light btn red"><i class="material-icons">delete</i></button>
            </li>`
}

let linkCreator = (title, url) => {
    let id = 1;
    let links = getLinks();
    if (links && links.length !== 0){
        id = links[links.length - 1].id + 1
    }
    return {title, url, id}
}


// RERENDERER

let rerenderLinksList = (links) => {
    let list = document.getElementById("linksList");
    list.innerHTML = "";

    if (links && links.length !== 0 ){
        links.forEach(link => {
            list.innerHTML += listItemCreator(link.title, link.url, link.id)
        });

    }else{
        list.innerHTML = "<h3 class='centered'>Немає посилань :(  Додай нові!</h3>"
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

function deleteLinkHandler(elem){
    let id = elem.dataset.id
    let links = getLinks()

    setLinksToLocalStorage(deleteLink(links, id));
}


$(document).ready(() => {

    $('.modal').modal();

    rerenderLinksList(getLinks());

    $("#search").on("input", (e) => {
        rerenderLinksList(getLinks().filter(l => l.title.toLowerCase().includes(e.target.value.toLowerCase())));
    })

    $('#linkCreationForm').submit(function(e) {
        e.preventDefault();
        const link = linkCreator(this.title.value, this.url.value);
        setLinksToLocalStorage(addLink(getLinks(), link));
        this.reset();
        $('.modal').modal('close');
        
    });
});