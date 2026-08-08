/* =========================================================
   INTRA INTERIORS — UNIVERSAL SCRIPT
   PART 1
   ========================================================= */


/* =========================================================
   01. GLOBAL CONFIGURATION
   ========================================================= */

const INTRA = {

    homePage: "index.html",

    navOffset: 20,

    revealOffset: 100,

    counterDuration: 2000

};


/* =========================================================
   02. PAGE HELPERS
   ========================================================= */

function getCurrentPage() {

    let page =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    /*
       When opening the website from a folder,
       pathname can be empty.
    */

    if (!page) {

        page = "index.html";

    }

    return page;

}


function isHomePage() {

    const page = getCurrentPage();

    return (
        page === "" ||
        page === "index.html"
    );

}


/* =========================================================
   03. MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");

    const overlay =
        document.querySelector(".menu-overlay");


    if (menuToggle) {

        menuToggle.classList.remove("active");

    }


    if (navLinks) {

        navLinks.classList.remove("active");

    }


    if (overlay) {

        overlay.classList.remove("active");

    }


    document.body.classList.remove(
        "menu-open"
    );

}


function openMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");

    const overlay =
        document.querySelector(".menu-overlay");


    if (menuToggle) {

        menuToggle.classList.add("active");

    }


    if (navLinks) {

        navLinks.classList.add("active");

    }


    if (overlay) {

        overlay.classList.add("active");

    }


    document.body.classList.add(
        "menu-open"
    );

}


function initMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const overlay =
        document.querySelector(".menu-overlay");


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const navLinks =
                    document.querySelector(
                        ".nav-links"
                    );

                if (
                    navLinks &&
                    navLinks.classList.contains(
                        "active"
                    )
                ) {

                    closeMobileMenu();

                }

                else {

                    openMobileMenu();

                }

            }
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeMobileMenu();

            }
        );

    }

}


/* =========================================================
   04. UNIVERSAL NAVIGATION
   ========================================================= */

function initNavigation() {

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                const href =
                    this.getAttribute("href");


                if (!href) {

                    return;

                }


                /*
                =========================================
                EXTERNAL LINK
                =========================================
                */

                if (
                    href.startsWith("http://") ||
                    href.startsWith("https://") ||
                    href.startsWith("tel:") ||
                    href.startsWith("mailto:")
                ) {

                    closeMobileMenu();

                    return;

                }


                /*
                =========================================
                HOME — #
                =========================================
                */

                if (href === "#") {

                    event.preventDefault();

                    closeMobileMenu();

                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                    return;

                }


                /*
                =========================================
                NORMAL PAGE
                Example:

                consultation.html
                living.html
                =========================================
                */

                if (!href.includes("#")) {

                    closeMobileMenu();

                    return;

                }


                /*
                =========================================
                PAGE + SECTION

                Example:

                index.html#services
                index.html#estimator
                =========================================
                */

                const hashIndex =
                    href.indexOf("#");


                const page =
                    href.substring(
                        0,
                        hashIndex
                    );


                const sectionId =
                    href.substring(
                        hashIndex + 1
                    );


                if (!sectionId) {

                    return;

                }


                const currentPage =
                    getCurrentPage();


                const targetPage =
                    page
                        ? page.toLowerCase()
                        : currentPage;


                const samePage =
                    (
                        targetPage ===
                        currentPage
                    )
                    ||
                    (
                        (
                            targetPage ===
                            "index.html"
                        )
                        &&
                        isHomePage()
                    );


                /*
                =========================================
                SAME PAGE
                =========================================
                */

                if (samePage) {

                    const target =
                        document.getElementById(
                            sectionId
                        );


                    /*
                    If target doesn't exist,
                    allow browser/default behaviour.
                    */

                    if (!target) {

                        return;

                    }


                    /*
                    IMPORTANT:

                    Stop the browser's default
                    anchor jump.

                    Then perform ONLY ONE
                    controlled scroll.
                    */

                    event.preventDefault();

                    closeMobileMenu();


                    const navbar =
                        document.querySelector(
                            "nav"
                        );


                    const navHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top
                        +
                        window.scrollY
                        -
                        navHeight
                        -
                        INTRA.navOffset;


                    window.scrollTo({

                        top:
                            Math.max(
                                0,
                                targetPosition
                            ),

                        behavior: "smooth"

                    });


                    return;

                }


                /*
                =========================================
                CROSS-PAGE
                =========================================

                Example:

                consultation.html
                → index.html#services
                */

                event.preventDefault();

                closeMobileMenu();


                /*
                Do NOT use sessionStorage.

                Do NOT perform another scroll
                on the current page.

                Let the browser handle the
                destination hash exactly once.
                */

                window.location.href =
                    page +
                    "#" +
                    sectionId;

            }
        );

    });

}


/* =========================================================
   05. NAVBAR SCROLL EFFECT
   ========================================================= */

function initNavbarScroll() {

    const navbar =
        document.querySelector("nav");


    if (!navbar) {

        return;

    }


    function updateNavbar() {

        if (window.scrollY > 40) {

            navbar.classList.add(
                "scrolled"
            );

        }

        else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();

}


/* =========================================================
   06. ACTIVE NAVIGATION
   ========================================================= */

/*
   IMPORTANT:

   We explicitly define the sections.

   We DO NOT scan every section/div on the page.

   This prevents nested elements from becoming
   accidental navigation targets.
*/

const INTRA_NAV_SECTIONS = [

    "services",

    "estimator",

    "transformation",

    "all-services",

    "contact"

];


function updateActiveNavigation() {

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (!navLinks.length) {

        return;

    }


    /*
       Only run active navigation on Home.
    */

    if (!isHomePage()) {

        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

        });

        return;

    }


    let currentSection = "";


    /*
    =========================================
    FIND CURRENT SECTION
    =========================================
    */

    INTRA_NAV_SECTIONS.forEach(id => {

        const section =
            document.getElementById(id);


        if (!section) {

            return;

        }


        const top =
            section.getBoundingClientRect().top
            +
            window.scrollY
            -
            180;


        if (
            window.scrollY >= top
        ) {

            currentSection = id;

        }

    });


    /*
    =========================================
    UPDATE NAV LINKS
    =========================================
    */

    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );


        const href =
            link.getAttribute("href");


        if (
            href ===
            "#" + currentSection
        ) {

            link.classList.add(
                "active"
            );

        }


        if (
            href ===
            "index.html#" +
            currentSection
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


function initActiveNavigation() {

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    updateActiveNavigation();

}


/* =========================================================
   07. LOADER
   ========================================================= */

function initLoader() {

    window.addEventListener(
        "load",
        function () {

            const loader =
                document.getElementById(
                    "loader"
                );


            if (!loader) {

                return;

            }


            loader.classList.add(
                "hide"
            );


            setTimeout(
                function () {

                    if (
                        loader &&
                        loader.parentNode
                    ) {

                        loader.remove();

                    }

                },
                500
            );

        }
    );

}


/* =========================================================
   08. SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right, .reveal-scale"
        );


    if (!elements.length) {

        return;

    }


    /*
       Use IntersectionObserver.

       This is much cleaner than having
       multiple scroll listeners.
    */

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );


                            /*
                            Once revealed,
                            stop observing it.
                            */

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {

                threshold: 0.12,

                rootMargin:
                    "0px 0px -80px 0px"

            }
        );


    elements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   09. ANIMATED COUNTERS
========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (!counters.length) {

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        const counter =
                            entry.target;


                        const target =
                            parseInt(
                                counter.dataset.target,
                                10
                            );


                        if (
                            Number.isNaN(
                                target
                            )
                        ) {

                            return;

                        }


                        const duration =
                            target <= 10
                                ? 2100
                                : 2000;


                        const startTime =
                            performance.now();


                        function animateCounter(
                            currentTime
                        ) {

                            const elapsed =
                                currentTime -
                                startTime;


                            const progress =
                                Math.min(
                                    elapsed /
                                    duration,
                                    1
                                );


                            /*
                            Ease-out effect
                            */

                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            const value =
                                Math.floor(
                                    eased *
                                    target
                                );


                            counter.textContent =
                                value;


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    animateCounter
                                );

                            }

                            else {

                                counter.textContent =
                                    target;

                            }

                        }


                        requestAnimationFrame(
                            animateCounter
                        );


                        observer.unobserve(
                            counter
                        );

                    }
                );

            },
            {

                threshold: 0.5

            }
        );


    counters.forEach(
        function (counter) {

            observer.observe(
                counter
            );

        }
    );

}


/* =========================================================
   10. INITIALIZE PART 1
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initMobileMenu();

        initNavigation();

        initNavbarScroll();

        initActiveNavigation();

        initLoader();

        initScrollReveal();

        initCounters();

    }
);
/* ==========================================
   09. COST ESTIMATOR
========================================== */

(function () {

    const areaSlider = document.getElementById("areaSlider");
    const areaVal = document.getElementById("areaVal");

    const typeBtns =
        document.querySelectorAll("#calcPropertyType .type-btn");

    const tierCards =
        document.querySelectorAll("#calcTier .tier-card");

    const totalEstimate =
        document.getElementById("totalEstimate");

    const bWoodwork =
        document.getElementById("bWoodwork");

    const bLighting =
        document.getElementById("bLighting");

    const bDecor =
        document.getElementById("bDecor");

    const bFee =
        document.getElementById("bFee");

    const bookBtn =
        document.getElementById("bookWithEstimateBtn");


    /* ------------------------------------------
       Only run if estimator exists
    ------------------------------------------ */

    if (!areaSlider || !totalEstimate) return;


    let currentRate = 1500;
    let currentMultiplier = 1;

    let selectedType = "2 BHK";
    let selectedTier = "Essential";


    /* ------------------------------------------
       FORMAT RUPEES
    ------------------------------------------ */

    function formatRupee(amount) {

        return "₹" +
            Math.round(amount)
                .toLocaleString("en-IN");

    }


    /* ------------------------------------------
       UPDATE ESTIMATE
    ------------------------------------------ */

    function updateEstimate() {

        const area =
            parseInt(areaSlider.value, 10);


        /* Area display */

        if (areaVal) {

            areaVal.textContent =
                area.toLocaleString("en-IN") +
                " Sq Ft";

        }


        /* Calculate */

        const base =
            area *
            currentRate *
            currentMultiplier;


        const minimum =
            base;

        const maximum =
            base * 1.20;


        /* Main estimate */

        totalEstimate.textContent =
            formatRupee(minimum) +
            " - " +
            formatRupee(maximum);


        /* Breakdown */

        if (bWoodwork) {

            bWoodwork.textContent =
                formatRupee(minimum * 0.50);

        }


        if (bLighting) {

            bLighting.textContent =
                formatRupee(minimum * 0.20);

        }


        if (bDecor) {

            bDecor.textContent =
                formatRupee(minimum * 0.20);

        }


        if (bFee) {

            bFee.textContent =
                formatRupee(minimum * 0.10);

        }


        /* --------------------------------------
           CONSULTATION LINK
        -------------------------------------- */

        if (bookBtn) {

            const params =
                new URLSearchParams({

                    type: selectedType,

                    area: area,

                    tier: selectedTier,

                    est:
                        formatRupee(minimum) +
                        " - " +
                        formatRupee(maximum)

                });


            bookBtn.href =
                "consultation.html?" +
                params.toString();

        }

    }


    /* ------------------------------------------
       PROPERTY TYPE
    ------------------------------------------ */

    typeBtns.forEach(button => {

        button.addEventListener("click", function () {

            typeBtns.forEach(btn => {

                btn.classList.remove("active");

            });


            this.classList.add("active");


            currentRate =
                parseInt(
                    this.dataset.rate,
                    10
                ) || 1500;


            selectedType =
                this.textContent.trim();


            updateEstimate();

        });

    });


    /* ------------------------------------------
       DESIGN TIER
    ------------------------------------------ */

    tierCards.forEach(card => {

        card.addEventListener("click", function () {

            tierCards.forEach(item => {

                item.classList.remove("active");

            });


            this.classList.add("active");


            currentMultiplier =
                parseFloat(
                    this.dataset.multiplier
                ) || 1;


            selectedTier =
                this.dataset.tier ||
                this.textContent.trim();


            updateEstimate();

        });

    });


    /* ------------------------------------------
       AREA SLIDER
    ------------------------------------------ */

    areaSlider.addEventListener(
        "input",
        updateEstimate
    );


    /* Initial calculation */

    updateEstimate();

})();


/* ==========================================
   10. CONSULTATION FORM
========================================== */

(function () {

    const form =
        document.getElementById("consultForm");


    if (!form) return;


    /* ------------------------------------------
       Make sure EmailJS exists
    ------------------------------------------ */

    if (
        typeof emailjs === "undefined"
    ) {

        console.error(
            "EmailJS library is not loaded."
        );

        return;

    }


    emailjs.init({

        publicKey:
            "JQNKRXUA8AB_kcVmm"

    });


    /* ------------------------------------------
       FORM SUBMIT
    ------------------------------------------ */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const submitButton =
                form.querySelector(
                    ".submit-btn"
                );


            /* Prevent double submission */

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.dataset.originalText =
                    submitButton.innerHTML;

                submitButton.innerHTML =
                    'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

            }


            emailjs.sendForm(

                "service_82w12ja",

                "template_sanqo6c",

                form

            )

                .then(function () {

                    const formBox =
                        document.getElementById(
                            "formBox"
                        );

                    const successBox =
                        document.getElementById(
                            "successBox"
                        );


                    if (formBox) {

                        formBox.style.display =
                            "none";

                    }


                    if (successBox) {

                        successBox.style.display =
                            "flex";

                        successBox.classList.add(
                            "show"
                        );

                    }

                })

                .catch(function (error) {

                    console.error(
                        "EmailJS error:",
                        error
                    );


                    alert(
                        error?.text ||
                        error?.message ||
                        "Something went wrong. Please try again."
                    );


                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            submitButton.dataset
                                .originalText ||
                            'Book Free Consultation <i class="fa-solid fa-arrow-right"></i>';

                    }

                });

        }

    );

})();


/* ==========================================
   11. CONSULTATION AUTO-FILL
========================================== */

(function () {

    const path =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    if (
        path !== "consultation.html"
    ) {

        return;

    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const type =
        params.get("type");

    const area =
        params.get("area");

    const tier =
        params.get("tier");

    const estimate =
        params.get("est");


    /* ------------------------------------------
       PROPERTY TYPE
    ------------------------------------------ */

    const propertySelect =
        document.getElementById(
            "formPropertyType"
        );


    if (
        propertySelect &&
        type
    ) {

        const wanted =
            type.toLowerCase();


        Array.from(
            propertySelect.options
        ).forEach(option => {

            const value =
                option.value.toLowerCase();


            if (
                value === wanted ||
                value.includes(wanted) ||
                wanted.includes(value)
            ) {

                option.selected = true;

            }

        });

    }


    /* ------------------------------------------
       PROJECT MESSAGE
    ------------------------------------------ */

    const message =
        document.getElementById(
            "formMessage"
        );


    if (
        message &&
        estimate
    ) {

        message.value =
            `Estimated scope: ${type || "Property"} ` +
            `(${area || ""} Sq Ft, ` +
            `${tier || "Standard"} Tier).\n` +

            `Estimated Budget Range: ${estimate}.\n\n` +

            `Looking forward to discussing ` +
            `3D designs and consultation options.`;

    }


    /* ------------------------------------------
       DATE
    ------------------------------------------ */

    const dateInput =
        document.getElementById(
            "formDate"
        );


    if (dateInput) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        dateInput.min = today;


        if (!dateInput.value) {

            dateInput.value =
                today;

        }

    }


    /* ------------------------------------------
       TIME SLOTS
    ------------------------------------------ */

    const slots =
        document.querySelectorAll(
            ".slot-chip"
        );


    const selectedSlot =
        document.getElementById(
            "selectedTimeSlot"
        );


    slots.forEach(slot => {

        slot.addEventListener(
            "click",
            function () {

                slots.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                this.classList.add(
                    "active"
                );


                if (selectedSlot) {

                    selectedSlot.value =
                        this.dataset.slot ||
                        this.textContent.trim();

                }

            }
        );

    });

})();


/* ==========================================
   12. BEFORE / AFTER SLIDER
========================================== */

(function () {

    const slider =
        document.getElementById(
            "baSlider"
        );

    const before =
        document.getElementById(
            "baBefore"
        );

    const handle =
        document.getElementById(
            "baHandle"
        );


    if (
        !slider ||
        !before ||
        !handle
    ) {

        return;

    }


    let dragging = false;


    /* ------------------------------------------
       MOVE SLIDER
    ------------------------------------------ */

    function moveSlider(clientX) {

        const rect =
            slider.getBoundingClientRect();


        let position =
            clientX -
            rect.left;


        position =
            Math.max(
                0,
                Math.min(
                    position,
                    rect.width
                )
            );


        const percentage =
            (position / rect.width) * 100;


        before.style.width =
            percentage + "%";


        handle.style.left =
            percentage + "%";

    }


    /* ------------------------------------------
       MOUSE
    ------------------------------------------ */

    slider.addEventListener(
        "pointerdown",
        function (event) {

            dragging = true;

            slider.setPointerCapture(
                event.pointerId
            );

            moveSlider(
                event.clientX
            );

        }
    );


    slider.addEventListener(
        "pointermove",
        function (event) {

            if (!dragging) return;

            moveSlider(
                event.clientX
            );

        }
    );


    slider.addEventListener(
        "pointerup",
        function () {

            dragging = false;

        }
    );


    slider.addEventListener(
        "pointercancel",
        function () {

            dragging = false;

        }
    );


    slider.addEventListener(
        "pointerleave",
        function () {

            /* Pointer capture handles dragging,
               so nothing else is required here. */

        }
    );

})();
/* =========================================================
   PART 3
   LIGHTBOX
   WHATSAPP
   BACK TO TOP
   CURSOR GLOW
   ========================================================= */


/* =========================================================
   13. FULL-SCREEN LIGHTBOX
========================================================= */

(function () {

    const modal =
        document.getElementById("lightboxModal");

    const image =
        document.getElementById("lightboxImg");

    const caption =
        document.getElementById("lightboxCaption");

    const closeBtn =
        document.getElementById("lightboxClose");

    const prevBtn =
        document.getElementById("lightboxPrev");

    const nextBtn =
        document.getElementById("lightboxNext");


    if (!modal || !image) {

        return;

    }


    let galleryImages = [];

    let currentIndex = 0;


    /* ------------------------------------------
       FIND GALLERY IMAGES
    ------------------------------------------ */

    function collectImages() {

        galleryImages =
            Array.from(
                document.querySelectorAll(
                    [
                        ".category-card img",
                        ".hero-image img",
                        ".consult-right img",
                        ".portfolio-grid img",
                        ".service-card img",
                        ".ba-after img",
                        ".gallery-img"
                    ].join(",")
                )
            );

    }


    /* ------------------------------------------
       OPEN LIGHTBOX
    ------------------------------------------ */

    function openLightbox(index) {

        if (!galleryImages.length) {

            return;

        }


        currentIndex =
            Math.max(
                0,
                Math.min(
                    index,
                    galleryImages.length - 1
                )
            );


        const target =
            galleryImages[currentIndex];


        if (!target) {

            return;

        }


        image.src =
            target.currentSrc ||
            target.src;


        image.alt =
            target.alt ||
            "INTRA Interior Design";


        if (caption) {

            caption.textContent =
                target.alt ||
                "INTRA Luxury Interior Project";

        }


        modal.classList.add(
            "active"
        );


        document.body.classList.add(
            "lightbox-open"
        );

    }


    /* ------------------------------------------
       CLOSE LIGHTBOX
    ------------------------------------------ */

    function closeLightbox() {

        modal.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "lightbox-open"
        );


        /*
           Clear image after closing.
           This prevents the old image from
           remaining visible during the next opening.
        */

        setTimeout(
            function () {

                if (
                    !modal.classList.contains(
                        "active"
                    )
                ) {

                    image.src = "";

                }

            },
            250
        );

    }


    /* ------------------------------------------
       NEXT IMAGE
    ------------------------------------------ */

    function showNext() {

        if (!galleryImages.length) {

            return;

        }


        currentIndex =
            (
                currentIndex + 1
            ) %
            galleryImages.length;


        openLightbox(
            currentIndex
        );

    }


    /* ------------------------------------------
       PREVIOUS IMAGE
    ------------------------------------------ */

    function showPrevious() {

        if (!galleryImages.length) {

            return;

        }


        currentIndex =
            (
                currentIndex -
                1 +
                galleryImages.length
            ) %
            galleryImages.length;


        openLightbox(
            currentIndex
        );

    }


    /* ------------------------------------------
       IMAGE CLICK
    ------------------------------------------ */

    function initGallery() {

        collectImages();


        galleryImages.forEach(
            function (img, index) {

                img.style.cursor =
                    "zoom-in";


                img.addEventListener(
                    "click",
                    function (event) {

                        /*
                           IMPORTANT:

                           If the image is inside
                           an <a>, prevent that link
                           from navigating.
                        */

                        event.preventDefault();

                        event.stopPropagation();


                        openLightbox(
                            index
                        );

                    }
                );

            }
        );

    }


    /* ------------------------------------------
       BUTTONS
    ------------------------------------------ */

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeLightbox();

            }
        );

    }


    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                showNext();

            }
        );

    }


    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                showPrevious();

            }
        );

    }


    /* ------------------------------------------
       CLICK OUTSIDE IMAGE
    ------------------------------------------ */

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                closeLightbox();

            }

        }
    );


    /* ------------------------------------------
       KEYBOARD CONTROLS
    ------------------------------------------ */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !modal.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key === "ArrowRight"
            ) {

                showNext();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                showPrevious();

            }

        }
    );


    /* ------------------------------------------
       INITIALIZE
    ------------------------------------------ */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initGallery
        );

    }

    else {

        initGallery();

    }

})();



/* =========================================================
   14. WHATSAPP WIDGET
========================================================= */

(function () {

    const widget =
        document.getElementById(
            "whatsappWidget"
        );

    const trigger =
        document.getElementById(
            "waTrigger"
        );

    const close =
        document.getElementById(
            "waClose"
        );


    if (!widget || !trigger) {

        return;

    }


    /* ------------------------------------------
       OPEN / CLOSE
    ------------------------------------------ */

    trigger.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            widget.classList.toggle(
                "active"
            );

        }
    );


    /* ------------------------------------------
       CLOSE BUTTON
    ------------------------------------------ */

    if (close) {

        close.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                widget.classList.remove(
                    "active"
                );

            }
        );

    }


    /* ------------------------------------------
       PREVENT POPUP CLICK FROM CLOSING
    ------------------------------------------ */

    const popup =
        document.getElementById(
            "whatsappPopup"
        );


    if (popup) {

        popup.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /* ------------------------------------------
       CLOSE WHEN CLICKING OUTSIDE
    ------------------------------------------ */

    document.addEventListener(
        "click",
        function (event) {

            if (
                widget.classList.contains(
                    "active"
                ) &&
                !widget.contains(
                    event.target
                )
            ) {

                widget.classList.remove(
                    "active"
                );

            }

        }
    );

})();



/* =========================================================
   15. BACK TO TOP
========================================================= */

(function () {

    const topBtn =
        document.getElementById(
            "topBtn"
        );


    if (!topBtn) {

        return;

    }


    function updateTopButton() {

        if (
            window.scrollY > 500
        ) {

            topBtn.classList.add(
                "show"
            );

        }

        else {

            topBtn.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateTopButton,
        {
            passive: true
        }
    );


    topBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    updateTopButton();

})();



/* =========================================================
   16. CURSOR GLOW
========================================================= */

(function () {

    const glow =
        document.querySelector(
            ".cursor-glow"
        );


    if (!glow) {

        return;

    }


    /*
       Cursor glow is mainly useful
       on desktop.

       Disable it for touch devices.
    */

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        glow.style.display =
            "none";

        return;

    }


    let mouseX = 0;

    let mouseY = 0;

    let glowX = 0;

    let glowY = 0;


    document.addEventListener(
        "mousemove",
        function (event) {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        },
        {
            passive: true
        }
    );


    /* ------------------------------------------
       SMOOTH GLOW MOVEMENT
    ------------------------------------------ */

    function animateGlow() {

        glowX +=
            (
                mouseX -
                glowX
            ) * 0.12;


        glowY +=
            (
                mouseY -
                glowY
            ) * 0.12;


        glow.style.left =
            glowX + "px";


        glow.style.top =
            glowY + "px";


        requestAnimationFrame(
            animateGlow
        );

    }


    animateGlow();

})();



/* =========================================================
   17. GLOBAL ERROR PROTECTION
========================================================= */

/*
   This doesn't hide real errors.

   It simply prevents optional UI features
   from breaking the rest of the website
   when an element doesn't exist on a page.
*/


window.addEventListener(
    "error",
    function (event) {

        /*
           Keep errors visible in the
           browser console for debugging.
        */

        console.error(
            "INTRA JS:",
            event.error || event.message
        );

    }
);



/* =========================================================
   18. FINAL INITIALIZATION
========================================================= */

/*
   Part 1 initializes:

   - Navigation
   - Mobile menu
   - Navbar
   - Active navigation
   - Loader
   - Scroll reveal
   - Counters

   Part 2 initializes:

   - Estimator
   - Consultation form
   - Consultation auto-fill
   - Before/After

   Part 3 initializes:

   - Lightbox
   - WhatsApp
   - Back to top
   - Cursor glow

   Nothing else needs to be initialized here.
*/


console.log(
    "INTRA Interiors JS loaded successfully."
);