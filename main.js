const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "ugo de ughi",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const userLikes = [1, 3, 4];

const container = document.getElementById('container');
container.innerHTML = '';

posts.forEach( post => {

    container.innerHTML += getPostTemplate(post);

} )

function getPostTemplate(post){

    const {id, author, content, media, likes, created} = post;

    return `
    <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                    <!-- uso l'operatore ternario per far stampare dei tag differenti in base alla presenza o meno dell'immagine -->
                        ${author.image ? getImageProfile(author) : getProfileDefault(author)}
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${formatDate(created)}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="${media}" alt="${author}">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                    <!-- uso l'operatore ternario per far stampare dei la classe like solo se l'id del post è presente nella lista di id liked -->
                        <a class="like-button  js-like-button ${isPostLiked(id) ? 'like-button--liked' : ''} " href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
    `
}

// prendo la lista dei like-button
const likesButtons = document.querySelectorAll('.like-button');

// la posso cilclare con forEach perché ho usato querySelectorAll :-)
likesButtons.forEach( likeButton => {
    // ad ogni bottone aggiungo l'evento click
    likeButton.addEventListener('click', function(event){
        // impedisco al tag a di funzionare (altrimenti uso un tag button che non ha l'href)
        event.preventDefault();
        // prendo l'id del post
        const postId = parseInt(this.getAttribute('data-postid'));
        // prendo l'elememto dove scrivere il dato aggiornato
        const counterDisplay = document.getElementById('like-counter-' + postId);
        let likes = parseInt(counterDisplay.innerText);
      
        // se l'elemto che ho cliccato è attivo lo disattivo e viceversa in base alla presenza o meno della classe like-button--liked
        if(this.classList.contains('like-button--liked')){
            this.classList.remove('like-button--liked');
            // stampo e decremento i like
            counterDisplay.innerText = --likes;
        }else{
            this.classList.add('like-button--liked');
            // stampo e incremento i like
            counterDisplay.innerText = ++likes;
        }
        
        // per salvare il dato aggiornato nella base dati filtro dall'array totale il post con id = all'id cliccato
        const likedPost = posts.filter( (post) => post.id === postId )
        // otterrò un array con un solo elemento e gli aggiorno il dato
        likedPost[0].likes = likes;

    })

} )


function formatDate(date){
    return date.split('-').reverse().join('/');
}

function isPostLiked(id){
    return userLikes.includes(id);
}

function getImageProfile(author){
    const {image, name} = author;
    return `<img class="profile-pic" src="${image}" alt="${name}"> `
}

function getProfileDefault(author){
    const {name} = author;

    // inizializzo una stringa vuota per poi concatenare le iniziali
    let initials = '';
    // trasformo la stringa del nome in una array separandola con lo spazio
    const nameParts = name.split(' ');
    nameParts.forEach( part => {
        // concateno alla stringa vuota la prima lettere di ogni elemento dell'array
        // e ottengo le iniziali
        initials += part[0];
    })

    return `
    <div class="profile-pic-default">
        <span>${initials}</span>
    </div>
    `
}
