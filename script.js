const count = 1000;
const apiKey = "o97mXHcQjFaPHrxZiuecI1u67gJhEcQoV6Lxm5wQVbQ";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// create elements for img, link and add to the dom
function displayPhotos() {
  // create <a> </a> and link to unsplash
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    // put <img> inside <a> and put both inside the image-container

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// get photos from unsplash api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //catch error here
  }
}

getPhotos();
