const header = document.getElementById("header");
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");


/* ================= HEADER ================= */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* ================= MOBILE MENU ================= */

function openMobileMenu() {

    if (!burger || !mobileMenu) return;

    burger.classList.add("active");
    mobileMenu.classList.add("active");

    document.body.classList.add("menu-open");

    burger.setAttribute(
        "aria-label",
        "Закрыть меню"
    );

}


function closeMobileMenu() {

    if (!burger || !mobileMenu) return;

    burger.classList.remove("active");
    mobileMenu.classList.remove("active");

    document.body.classList.remove("menu-open");

    burger.setAttribute(
        "aria-label",
        "Открыть меню"
    );

}


if (burger && mobileMenu) {

    burger.addEventListener("click", () => {

        if (
            mobileMenu.classList.contains("active")
        ) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    });


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

}


/* ================= REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* ================= IMAGE VIEWER ================= */

const menuImages =
    document.querySelectorAll(".menu-image");

const viewer =
    document.getElementById("imageViewer");

const viewerImage =
    document.getElementById("viewerImage");

const viewerClose =
    document.getElementById("viewerClose");

const viewerPrev =
    document.getElementById("viewerPrev");

const viewerNext =
    document.getElementById("viewerNext");

const viewerCounter =
    document.getElementById("viewerCounter");


let currentImage = 0;


function showImage(index) {

    if (
        !viewer ||
        !viewerImage ||
        menuImages.length === 0
    ) {
        return;
    }


    if (index < 0) {

        index =
            menuImages.length - 1;

    }


    if (index >= menuImages.length) {

        index = 0;

    }


    currentImage = index;


    const image =
        menuImages[currentImage]
            .querySelector("img");


    if (!image) return;


    viewerImage.src = image.src;
    viewerImage.alt = image.alt;


    if (viewerCounter) {

        viewerCounter.textContent =
            `${currentImage + 1} / ${menuImages.length}`;

    }

}


function openViewer(index) {

    if (!viewer) return;

    showImage(index);

    viewer.classList.add("active");

    document.body.classList.add(
        "viewer-open"
    );

}


function closeViewer() {

    if (!viewer) return;

    viewer.classList.remove("active");

    document.body.classList.remove(
        "viewer-open"
    );

}


menuImages.forEach(
    (button, index) => {

        button.addEventListener(
            "click",
            () => openViewer(index)
        );

    }
);


if (viewerClose) {

    viewerClose.addEventListener(
        "click",
        closeViewer
    );

}


if (viewerPrev) {

    viewerPrev.addEventListener(
        "click",
        () => showImage(currentImage - 1)
    );

}


if (viewerNext) {

    viewerNext.addEventListener(
        "click",
        () => showImage(currentImage + 1)
    );

}


/* CLICK BACKGROUND */

if (viewer) {

    viewer.addEventListener(
        "click",
        event => {

            if (event.target === viewer) {

                closeViewer();

            }

        }
    );

}


/* ================= KEYBOARD ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            mobileMenu &&
            mobileMenu.classList.contains("active") &&
            event.key === "Escape"
        ) {

            closeMobileMenu();

        }


        if (
            !viewer ||
            !viewer.classList.contains("active")
        ) {
            return;
        }


        if (event.key === "Escape") {

            closeViewer();

        }


        if (event.key === "ArrowLeft") {

            showImage(currentImage - 1);

        }


        if (event.key === "ArrowRight") {

            showImage(currentImage + 1);

        }

    }
);


/* ================= PHONE SWIPE ================= */

let touchStartX = 0;
let touchEndX = 0;


if (viewer) {

    viewer.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    viewer.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        {
            passive: true
        }
    );

}


function handleSwipe() {

    const distance =
        touchStartX - touchEndX;


    if (Math.abs(distance) < 45) {

        return;

    }


    if (distance > 0) {

        showImage(currentImage + 1);

    } else {

        showImage(currentImage - 1);

    }

}