/* ============================
   ACTIVE NAVIGATION
============================ */

const sections = document.querySelectorAll("section[id], div[id], footer[id]");
const navLinks = document.querySelectorAll("nav a");

if (sections.length) {

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".nav-links");
const overlay = document.querySelector(".menu-overlay");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");

        mobileNav.classList.toggle("active");

        overlay.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

}
overlay.addEventListener("click", () => {

    menuToggle.classList.remove("active");

    mobileNav.classList.remove("active");

    overlay.classList.remove("active");

    document.body.classList.remove("menu-open");

});
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        mobileNav.classList.remove("active");

        overlay.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

});
/* ==========================================
   CONSULTATION FORM
========================================== */

const form = document.getElementById("consultForm");

if (form) {

    emailjs.init({
        publicKey: "JQNKRXUA8AB_kcVmm"
    });

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.sendForm(
            "service_82w12ja",
            "template_sanqo6c",
            this
        )
            .then(() => {

                console.log("Email sent!");

                document.getElementById("formBox").style.display = "none";
                document.getElementById("successBox").style.display = "block";

            })
            .catch((error) => {

                console.log(error);
                alert(error.message || "Something went wrong.");

            });

    });

}

/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.classList.add("hide");

        setTimeout(() => {

            loader.remove();

        }, 500);

    }

});
/* ==========================
   SCROLL REVEAL
========================== */

const reveals = document.querySelectorAll(".reveal");

function revealSections() {

    reveals.forEach(section => {

        const windowHeight = window.innerHeight;

        const revealTop = section.getBoundingClientRect().top;

        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {

            section.classList.add("active");

        }

    });

}
/* ==========================
   SCROLL REVEAL PORTFOLIO
========================== */

window.addEventListener("scroll", () => {

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {

            item.classList.add("active");

        }

    });

});

/* ==========================================
   ANIMATED COUNTERS
========================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;

        let duration = 2000;

        if (target <= 10) {
            duration = 2100;
        }

        if (target <= 5) {
            duration = 2150;
        }

        const increment = target / (duration / 16);

        let current = 0;

        function updateCounter() {

            current += increment;

            if (current < target) {

                counter.textContent = Math.ceil(current);

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target + "+";

            }

        }

        updateCounter();

        counterObserver.unobserve(counter);

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => counterObserver.observe(counter));
/*==========================
   LEGACY LIGHTBOX
==========================*/
const legacyGalleryImages = document.querySelectorAll(".gallery-img");
const legacyLightbox = document.getElementById("lightbox");
const legacyLightboxImg = document.getElementById("lightbox-img");
const legacyCloseBtn = document.querySelector(".close");

if (legacyLightbox && legacyLightboxImg) {
    legacyGalleryImages.forEach(img => {
        img.addEventListener("click", () => {
            legacyLightbox.style.display = "flex";
            legacyLightboxImg.src = img.src;
        });
    });

    if (legacyCloseBtn) {
        legacyCloseBtn.addEventListener("click", () => {
            legacyLightbox.style.display = "none";
        });
    }

    legacyLightbox.addEventListener("click", (e) => {
        if (e.target === legacyLightbox) {
            legacyLightbox.style.display = "none";
        }
    });
}
/*=========================================
TOP BUTTON
=========================================*/
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});
/*=========================================
SCROLL NAV
=========================================*/
const navbar = document.querySelector("nav");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        }

        else {

            navbar.classList.remove("scrolled");

        }

    });

}
/* ==========================================
   SCROLL REVEAL
========================================== */

const animatedElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

function revealOnScroll() {

    animatedElements.forEach(item => {

        const windowHeight = window.innerHeight;
        const revealTop = item.getBoundingClientRect().top;
        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {
            item.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
/* ==========================================
   CURSOR GLOW
========================================== */
const glow = document.querySelector(".cursor-glow");

if (glow) {

    document.addEventListener("mousemove", (e) => {

        glow.style.left = e.clientX + "px";

        glow.style.top = e.clientY + "px";

    });

}

/* ==========================================
   INTERACTIVE COST ESTIMATOR
========================================== */
const areaSlider = document.getElementById("areaSlider");
const areaVal = document.getElementById("areaVal");
const typeBtns = document.querySelectorAll("#calcPropertyType .type-btn");
const tierCards = document.querySelectorAll("#calcTier .tier-card");
const totalEstimate = document.getElementById("totalEstimate");
const bWoodwork = document.getElementById("bWoodwork");
const bLighting = document.getElementById("bLighting");
const bDecor = document.getElementById("bDecor");
const bFee = document.getElementById("bFee");
const bookWithEstimateBtn = document.getElementById("bookWithEstimateBtn");

if (areaSlider && totalEstimate) {
    let currentRate = 1500;
    let currentArea = parseInt(areaSlider.value);
    let currentMultiplier = 1.0;
    let selectedTypeName = "2 BHK";
    let selectedTierName = "Essential";

    function formatRupee(amount) {
        return "₹" + Math.round(amount).toLocaleString('en-IN');
    }

    function updateEstimate() {
        currentArea = parseInt(areaSlider.value);
        areaVal.textContent = currentArea.toLocaleString('en-IN') + " Sq Ft";

        const baseTotal = currentArea * currentRate * currentMultiplier;
        const minCost = baseTotal;
        const maxCost = baseTotal * 1.2;

        totalEstimate.textContent = `${formatRupee(minCost)} - ${formatRupee(maxCost)}`;

        // Breakdown calculation
        bWoodwork.textContent = formatRupee(minCost * 0.50);
        bLighting.textContent = formatRupee(minCost * 0.20);
        bDecor.textContent = formatRupee(minCost * 0.20);
        bFee.textContent = formatRupee(minCost * 0.10);

        // Update consultation link with estimate query parameters
        if (bookWithEstimateBtn) {
            const query = `?type=${encodeURIComponent(selectedTypeName)}&area=${currentArea}&tier=${encodeURIComponent(selectedTierName)}&est=${encodeURIComponent(formatRupee(minCost) + " - " + formatRupee(maxCost))}`;
            bookWithEstimateBtn.setAttribute("href", "consultation.html" + query);
        }
    }

    typeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            typeBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentRate = parseInt(btn.dataset.rate);
            selectedTypeName = btn.textContent.trim();
            updateEstimate();
        });
    });

    tierCards.forEach(card => {
        card.addEventListener("click", () => {
            tierCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            currentMultiplier = parseFloat(card.dataset.multiplier);
            selectedTierName = card.dataset.tier;
            updateEstimate();
        });
    });

    areaSlider.addEventListener("input", updateEstimate);
    updateEstimate();
}

/* ==========================================
   AUTO PRE-FILL CONSULTATION FROM ESTIMATE
========================================== */
if (window.location.pathname.includes("consultation.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const estType = urlParams.get("type");
    const estArea = urlParams.get("area");
    const estTier = urlParams.get("tier");
    const estVal = urlParams.get("est");

    if (estType || estVal) {
        const propSelect = document.getElementById("formPropertyType");
        const msgTextarea = document.getElementById("formMessage");

        if (propSelect && estType) {
            for (let opt of propSelect.options) {
                if (opt.value.toLowerCase().includes(estType.toLowerCase()) || estType.toLowerCase().includes(opt.value.toLowerCase())) {
                    opt.selected = true;
                    break;
                }
            }
        }

        if (msgTextarea && estVal) {
            msgTextarea.value = `Estimated scope: ${estType || 'Property'} (${estArea || ''} Sq Ft, ${estTier || 'Standard'} Tier).\nEstimated Budget Range: ${estVal}.\nLooking forward to discussing 3D designs and consultation options.`;
        }
    }

    // Set min date for preferred date picker to today
    const dateInput = document.getElementById("formDate");
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute("min", today);
        dateInput.value = today;
    }

    // Time Slot Chips interaction
    const slotChips = document.querySelectorAll(".slot-chip");
    const selectedSlotInput = document.getElementById("selectedTimeSlot");
    slotChips.forEach(chip => {
        chip.addEventListener("click", () => {
            slotChips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            if (selectedSlotInput) {
                selectedSlotInput.value = chip.dataset.slot;
            }
        });
    });
}

/* ==========================================
   BEFORE & AFTER TRANSFORMATION SLIDER
========================================== */
const baSlider = document.getElementById("baSlider");
const baBefore = document.getElementById("baBefore");
const baHandle = document.getElementById("baHandle");

if (baSlider && baBefore && baHandle) {
    let isDragging = false;

    function moveSlider(x) {
        const rect = baSlider.getBoundingClientRect();
        let position = x - rect.left;

        if (position < 0) position = 0;
        if (position > rect.width) position = rect.width;

        const percentage = (position / rect.width) * 100;
        baBefore.style.width = percentage + "%";
        baHandle.style.left = percentage + "%";
    }

    baSlider.addEventListener("mousedown", (e) => {
        isDragging = true;
        moveSlider(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        moveSlider(e.clientX);
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Touch events for mobile responsiveness
    baSlider.addEventListener("touchstart", (e) => {
        isDragging = true;
        if (e.touches[0]) moveSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        if (e.touches[0]) moveSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener("touchend", () => {
        isDragging = false;
    });
}

/* ==========================================
   FULL-SCREEN LIGHTBOX GALLERY MODAL
========================================== */
const lightboxModal = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

if (lightboxModal && lightboxImg) {
    let galleryImages = [];
    let currentIndex = 0;

    function initLightbox() {
        const images = document.querySelectorAll(
            ".category-card img, .hero-image img, .consult-right img, .portfolio-grid img, .service-card img, .ba-after img"
        );

        galleryImages = Array.from(images);

        galleryImages.forEach((img, idx) => {
            img.style.cursor = "zoom-in";
            img.addEventListener("click", (e) => {
                e.preventDefault();
                openLightbox(idx);
            });
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        const targetImg = galleryImages[currentIndex];
        if (!targetImg) return;

        lightboxImg.src = targetImg.src;
        lightboxCaption.textContent = targetImg.alt || "INTRA Luxury Interior Project";
        lightboxModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightboxModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox(currentIndex);
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener("click", showNext);
    if (lightboxPrev) lightboxPrev.addEventListener("click", showPrev);

    lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (!lightboxModal.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    });

    initLightbox();
}

/* ==========================================
   FLOATING WHATSAPP INTERACTIVE WIDGET
========================================== */
const waTrigger = document.getElementById("waTrigger");
const waPopup = document.getElementById("whatsappPopup");
const waClose = document.getElementById("waClose");

if (waTrigger && waPopup) {
    waTrigger.addEventListener("click", () => {
        waPopup.classList.toggle("active");
        const badge = waTrigger.querySelector(".wa-badge");
        if (badge) badge.style.display = "none";
    });

    if (waClose) {
        waClose.addEventListener("click", () => {
            waPopup.classList.remove("active");
        });
    }
}