class Gallery {
    images = [];
    imgElem;
    currentImage = -1;
    interval;

    constructor(elemId, ...imageUrls) {
        this.images = imageUrls;

        const galleryElem = document.getElementById(elemId);
        galleryElem.classList.add("gallery");

        // הוספת הלחצן הימני
        const right = document.createElement('div');
        right.classList.add('arrow', 'right');
        right.addEventListener('click', () => this.previousImage());
        galleryElem.appendChild(right);

        // הוספת הלחצן השמאלי
        const left = document.createElement('div');
        left.classList.add('arrow', 'left');
        left.addEventListener('click', () => this.nextImage());
        galleryElem.appendChild(left);

        // יצירת אלמנט של התמונה
        this.imgElem = document.createElement("img");

        // הוספת אירועים לגלרייה
        galleryElem.addEventListener('mouseover', () => {
            this.stopAuto();
        });
        //כשמפעילים מחדש את הגלרייה זורקים אירוע כללי שמעדכן את כל הגלריות להסתנכרן
        galleryElem.addEventListener('mouseout', () => {
            const myEvent = new CustomEvent("startAllGallery");
            dispatchEvent(myEvent);
        });

        // הוספת אירועים כלליים שיודעים להאזין לכל הגלריות על מנת לסנכרגן אותם בקצב
        addEventListener('startAllGallery', () => this.startAuto());

        // הוספת התמונה לדף
        galleryElem.appendChild(this.imgElem);

        // לצורך הצגת התמונה הראשונה
        this.nextImage();
        this.startAuto();
    }

    nextImage() {
        this.currentImage++;

        if (this.currentImage >= this.images.length) {
            this.currentImage = 0;
        }
        this.imgElem.src = this.images[this.currentImage];
    }

    previousImage() {
        this.currentImage--;
        if (this.currentImage < 0) {
            this.currentImage = this.images.length - 1;
        }
        this.imgElem.src = this.images[this.currentImage];

    }

    startAuto() {
        clearInterval(this.interval);

        this.interval = setInterval(() => this.nextImage(), 3000);

    }

    stopAuto() {
        clearInterval(this.interval);
    }
}

const g1 = new Gallery("gallery1", "./images/img1.jpg", "./images/img2.jpg", "./images/img3.jpg", "./images/img4.jpg", "./images/img5.jpg");
const g2 = new Gallery("gallery2", "./images/img6.jpg", "./images/img7.jpg", "./images/img8.jpg", "./images/img9.jpg", "./images/img10.jpg");
const g3 = new Gallery("gallery3", "./images/img11.jpg", "./images/img12.jpg", "./images/img13.jpg", "./images/img14.jpg", "./images/img15.jpg");
