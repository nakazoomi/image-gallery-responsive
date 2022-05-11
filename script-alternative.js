

const getGalleryImages = () => Array.from(document.querySelectorAll(".galerie img")); 
const getImageInLightbox = () => document.querySelector(".lightbox-image");

const getIndexFromFileName = (filename) => getGalleryImages().indexOf(document.querySelector(`.galerie img[src*="${filename}"]`));
const getCurrentImageIndex = () => getIndexFromFileName(filenameFromImage(getImageInLightbox()));

const showLightbox = () => {
    document.querySelector(".lightbox").classList.add("visible");
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("wheel", handleMousewheel);
}

const hideLightbox = () => {
    document.querySelector(".lightbox").classList.remove("visible");
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("wheel", handleMousewheel);
}

const filenameFromImage = (image) => image.src.split("/").pop();
const imageNameFromIndex = (imageIndex) => filenameFromImage(document.querySelectorAll(".galerie img")[imageIndex]);

const changeImageInLightbox = (imageFileName) => { getImageInLightbox().src = `./bilder/${imageFileName}`; }
const removeImage = () => { getImageInLightbox().src = ""; }


const closeLightboxAndRemoveImage = () => {
    hideLightbox();
    removeImage();
}


const showNextImage = () => {
    if (getCurrentImageIndex() + 1 >= getGalleryImages().length) {
        changeImageInLightbox(imageNameFromIndex(0));
        return;
    }

    changeImageInLightbox(imageNameFromIndex(getCurrentImageIndex() + 1));
}

const showPreviousImage = () => {
    if (getCurrentImageIndex() - 1 <= 0) {
        changeImageInLightbox(imageNameFromIndex(getGalleryImages().length - 1));
        return;
    }

    changeImageInLightbox(imageNameFromIndex(getCurrentImageIndex() - 1));
}

const handleClickOnImage = (event) => {
    changeImageInLightbox(filenameFromImage(event.target));
    showLightbox();
}

const handleMousewheel = (event) => {
    event.wheelDelta > 0 ? showPreviousImage() : showNextImage();
}

const handleKeydown = (event) => {
    let acceptedKeys = ["Escape", "ArrowLeft", "ArrowRight", "a", "d", " "];

    if (acceptedKeys.includes(event.key) === false) {
        return;
    }
    
    if (event.key === "ArrowLeft" || event.key === "a") {
        showPreviousImage();
        return;
    }

    if (event.key === "ArrowRight" || event.key === "d" || event.key === " ") {
        showNextImage();
        return;
    }

    if (event.key === "Escape") {
        closeLightboxAndRemoveImage();
        return;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getGalleryImages().forEach(
        img => img.addEventListener("click", handleClickOnImage)
    );

    document.querySelector(".lightbox-image").addEventListener("click", closeLightboxAndRemoveImage);
    document.querySelector(".lightbox-next").addEventListener("click", showNextImage);
    document.querySelector(".lightbox-previous").addEventListener("click", showPreviousImage);
});