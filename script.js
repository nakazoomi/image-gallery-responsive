const closeLightboxAndRemoveImage = () => {                                 // Wenn Lightbox geschlossen werden Eventlistener deaktiviert 
    document.removeEventListener("keydown", handleKeydown);                 // Schließt den addEventListener Keyboard
    document.removeEventListener("wheel", handleMousewheel);                // Schließt den addEventListener Mousewheel

    document.querySelector('.lightbox-image').src = "";                     // Löscht den Pfad des original Images
    document.querySelector('.lightbox').classList.remove("visible");        // Deaktiviert die Lightbox komplett
}

const showNextImage = () => {
    let allImages = Array.from(document.querySelectorAll('.galerie img'));                      // Speichert das Arrey in der variablen allImages
    let numberOfImages = allImages.length;                                                      // Anzahl der Images im Arrey wird gespeichert 

    let currentImageFilename = document.querySelector(".lightbox-image").src;                   // Der Flad des Images wird aufgerufen und in der nächsten Zeile gespilttet 
    currentImageFilename = currentImageFilename.split("/").pop();                               // Pflad wird gesplittet und über die .pop funcktion wird der letzte Teil des Pfades nach dem Slash (/) gelöscht und neu hinzugefügt 

    let currentImage = document.querySelector(`.galerie img[src*="${currentImageFilename}"]`);  // Pfad des aktuellen Images wird selectiert
    let currentImageIndex = allImages.indexOf(currentImage);                                    // Der Index von de aktuellen Image wird ermittelt
    
    let nextImage = '';                                                                         // Neue Veriable mit leerem Speicherplatz wird erstellt 

    let index = '';

    if (currentImageIndex + 1 >= numberOfImages) {                                              // Wenn der aktuelle Index den letzten Wert erreichert dann öffne wieder das erste Image
        nextImage = allImages[0].src;
        index = 1;

    } else {                                                                                    // Wenn der Index nicht au den letzten Wert zeigt, dann springt es zu dem nächsten Wert 
        nextImage = allImages[currentImageIndex + 1].src;
        index = currentImageIndex + 2;
    }

    document.querySelector(".lightbox-image").src = "./images/originals/" + nextImage.split('/').pop();     // Quelle(Link) des Bildes in der Lightboy wird geändert 

    document.querySelector(".lightbox-index").innerHTML= index + " / " + numberOfImages;

}


const showPreviousImage = () => {
    let allImages = Array.from(document.querySelectorAll('.galerie img'));
    let numberOfImages = allImages.length;

    let currentImageFilename = document.querySelector(".lightbox-image").src;
    currentImageFilename = currentImageFilename.split("/").pop();

    let currentImage = document.querySelector(`.galerie img[src*="${currentImageFilename}"]`);
    let currentImageIndex = allImages.indexOf(currentImage);
    
    let nextImage = '';

    if (currentImageIndex - 1 < 0) {
        nextImage = allImages[numberOfImages - 1].src;
        index = numberOfImages;

    } else {
        nextImage = allImages[currentImageIndex - 1].src;
        index = currentImageIndex;
    }

    document.querySelector(".lightbox-image").src = "./images/originals/" + nextImage.split('/').pop();

    document.querySelector(".lightbox-index").innerHTML= index + " / " + numberOfImages;

}


// handleClickOnImage 

const handleClickOnImage = (event) => {                                     // Parameter des addEventListeners (beinhaltet das Event)        
    let image = event.target.parentElement.querySelector("img")                                                      
    let filename = image.src.split("/").pop();                              // Splittet den Pfad des Images // .pop greift auf das letzte ELement im Pfad zu nachdem Slahs/  
    
    let currentImage = document.querySelector(`.galerie img[src*="${filename}"]`);  
    
    let allImages = Array.from(document.querySelectorAll('.galerie img'));
    let currentImageIndex = allImages.indexOf(currentImage);                                    
    
    let numberOfImages = allImages.length;
    document.querySelector(".lightbox-index").innerHTML= currentImageIndex + " / " + numberOfImages;
    
    document.querySelector('.lightbox-image').src = "./images/originals/" + filename;   // Nuer Pfad des Images mit Originalgröße
    document.querySelector('.lightbox').classList.add("visible");           // Fügt die Classe "visible" and die Lightbox > Lightbox wird geöffnet 

    document.addEventListener('keydown', handleKeydown);                    // Wenn Lightboy geöffnet ist, wird Keyboardsteuerung aktiviert 
    document.addEventListener("wheel", handleMousewheel);
}

// Keyboardsteuerung

const handleKeydown = (event) => {

    if (event.key === "ArrowLeft" || event.key === "a") {                               // Wenn Pfeiltaste link (oder verknüpfter Buchstaben) gedrückt wird das vorherige Bild angezeigt
        showPreviousImage();

    } else if (event.key === "ArrowRight" || event.key === "d" || event.key === " ") {  // Wenn Pfeiltaste rechts (oder verknüpfter Buchstaben bzw Leertaste) gedrückt wird das nächste Bild angezeigt
        showNextImage();

    } else if (event.key === "Escape") {                                    // Bei gedrückter ESC Taste wird Image Gallery geschlossen
        closeLightboxAndRemoveImage();
    }
}

// Mousewheelsteuerung 

const handleMousewheel = (event) => {                                       // Beim scrollen des Mausrads wird das nächste bzw vorherige Image angezeigt
    if(event.wheelDelta > 0) {
        showPreviousImage();
    } else {
        showNextImage();
    }
}


// Ausführende EventListener


document.addEventListener("DOMContentLoaded", () => {                       // Funktion wird ausgeführt nachdem der DOM Content geladen wurde

    Array.from(document.querySelectorAll('.galerie-img')).forEach(          // addEventListener greift auf das Arrey zu und startet einen forEach loop 
        img => img.addEventListener("click", handleClickOnImage)            // Bei click wird die Funktion handleClickOnImage ausgeführt 
    );

    document.querySelector(".lightbox-image").addEventListener("click", closeLightboxAndRemoveImage);
    document.querySelector(".lightbox-next").addEventListener("click", showNextImage);
    document.querySelector(".lightbox-previous").addEventListener("click", showPreviousImage);

});