const images=[
"images/1pic.webp",
"images/2pic.webp",
"images/3pic.webp",
"images/4pic.webp",
"images/5pic.webp",
"images/6pic.webp"
];

let current=0;

function openLightbox(index){
    current=index;
    document.getElementById("lightbox").style.display="flex";
    document.getElementById("lightbox-img").src=images[current];
}

function closeLightbox(){
    document.getElementById("lightbox").style.display="none";
}

function changeImage(step){
    current+=step;

    if(current<0)
        current=images.length-1;

    if(current>=images.length)
        current=0;

    document.getElementById("lightbox-img").src=images[current];
}

function filterSelection(category){

let items=document.querySelectorAll(".image");

items.forEach(item=>{

if(category==="all"){
item.style.display="block";
}
else{

if(item.classList.contains(category))
item.style.display="block";
else
item.style.display="none";

}

});

}
