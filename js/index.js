document.addEventListener("DOMContentLoaded", function () {
    loadXMLDoc();
});

function loadXMLDoc() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                loadImages(JSON.parse(xmlhttp.responseText));
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };
    xmlhttp.open("GET", "data.json", true);
    xmlhttp.send();
}

function loadImages(imageData) {
    for (let i = 0; i < imageData.length; i++) {
        //Slide Div
        let mySlideDiv = document.createElement("div");
        mySlideDiv.setAttribute('class', 'mySlide');
        //Slide number
        let numb = document.createElement("div");
        numb.setAttribute('class', 'numbertext');
        numb.innerHTML = i + 1 + " / " + imageData.length;
        //Image
        let img = document.createElement("img");
        img.setAttribute('class', 'imgClass');
        img.src = "images/" + imageData[i].image_name;
        //Caption
        let cap = document.createElement("div");
        cap.setAttribute('class', 'captiontext');
        cap.innerHTML = toTitleCase(imageData[i].title);
        //Description
        let des = document.createElement("div");
        des.setAttribute('class', 'descriptiontext');
        des.innerHTML = imageData[i].description;
        //Append to mySlide div
        document.getElementById("container").appendChild(mySlideDiv);
        mySlideDiv.appendChild(numb);
        mySlideDiv.appendChild(img);
        mySlideDiv.appendChild(cap);
        mySlideDiv.appendChild(des);
        //Add dots
        let dots = document.createElement('span');
        dots.setAttribute('class', 'dot');
        dots.setAttribute('onclick', 'currentSlide(' + (i + 1) + ')');
        document.getElementById('dots').appendChild(dots);
    }
    showSlides(slideIndex);
    //console.log(imageData);
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
let slideIndex = 1;
let prev = document.getElementById('prev');
let next = document.getElementById('next');


next.onclick = function plusSlides() {
    showSlides(slideIndex += 1);
};

prev.onclick = function minusSlides() {
    showSlides(slideIndex -= 1);
};

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName('mySlide');
    console.log(slides.length);
    let dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}