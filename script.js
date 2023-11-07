const count = 30;
const apiKey = "M49-n1NBlXzJRzVsDC7MK5nob_nJqVaM8u8BrAmjOo0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let imagesLoaded = 0;
let ready = false;
let totalImages = 0;
// image loader function
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
  }
}
let photosArray = [];
// helper function to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for img, link and add to the dom
function displayPhotos() {
  totalImages = photosArray.length;
  // create <a> </a> and link to unsplash
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // check if an image has been loaded
    img.addEventListener("load", imageLoaded);
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

//check to see if scrolling near bottom of page, load more images
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    imagesLoaded = 0;
    getPhotos();
  }
});
getPhotos();
