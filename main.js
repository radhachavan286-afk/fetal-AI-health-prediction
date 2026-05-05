// ===========================
// FetalAI - Main JavaScript
// ===========================

document.addEventListener("DOMContentLoaded", () => {

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // ---- Active nav link on scroll ----
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add("active");
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(section => observer.observe(section));

    // ---- Hamburger menu ----
    const hamburger = document.getElementById("hamburger");
    const navLinksList = document.querySelector(".nav-links");
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinksList.classList.toggle("open");
        });
    }

    // ---- Back to top ----
    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    // ---- Animate elements on scroll ----
    const animElements = document.querySelectorAll(".feature-card, .contact-item, .about-text p");
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, i * 80);
                animObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        animObserver.observe(el);
    });

    // ---- Scroll result into view if present ----
    const resultBanner = document.querySelector(".result-banner");
    if (resultBanner) {
        setTimeout(() => {
            resultBanner.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
    }

    // ---- Input validation feedback ----
    const inputs = document.querySelectorAll(".predict-form input[type='number']");
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) {
                input.style.borderColor = "rgba(34, 197, 94, 0.5)";
            } else {
                input.style.borderColor = "";
            }
        });
    });

    // ---- Predict button loading state ----
    const predictForm = document.querySelector(".predict-form");
    if (predictForm) {
        predictForm.addEventListener("submit", (e) => {
            const btn = predictForm.querySelector("button[type='submit']");
            if (btn) {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Predicting...';
                btn.disabled = true;
            }
        });
    }

    // ---- Sample value fill buttons (via keyboard shortcut Ctrl+Shift+N/S/P) ----
    const sampleValues = {
        normal: {
            accelerations: 0.003,
            prolongued_decelerations: 0.0,
            abnormal_short_term_variability: 48,
            percentage_of_time_with_abnormal_long_term_variability: 0,
            mean_value_of_long_term_variability: 5,
            histogram_mode: 120,
            histogram_median: 121,
            histogram_variance: 73
        },
        suspect: {
            accelerations: 0.001,
            prolongued_decelerations: 0.001,
            abnormal_short_term_variability: 53,
            percentage_of_time_with_abnormal_long_term_variability: 10,
            mean_value_of_long_term_variability: 3,
            histogram_mode: 142,
            histogram_median: 143,
            histogram_variance: 12
        },
        pathological: {
            accelerations: 0.0,
            prolongued_decelerations: 0.005,
            abnormal_short_term_variability: 72,
            percentage_of_time_with_abnormal_long_term_variability: 43,
            mean_value_of_long_term_variability: 0,
            histogram_mode: 140,
            histogram_median: 141,
            histogram_variance: 14
        }
    };

    function fillSample(type) {
        const values = sampleValues[type];
        if (!values) return;
        Object.entries(values).forEach(([name, val]) => {
            const input = document.querySelector(`[name="${name}"]`);
            if (input) {
                input.value = val;
                input.style.borderColor = "rgba(34, 197, 94, 0.5)";
            }
        });
        document.getElementById("predict").scrollIntoView({ behavior: "smooth" });
    }

    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey) {
            if (e.key === "N") fillSample("normal");
            if (e.key === "S") fillSample("suspect");
            if (e.key === "P") fillSample("pathological");
        }
    });
});

// ---- Contact Form Handler ----
function handleContactSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector("button[type='submit']");
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
        document.getElementById("contactSuccess").style.display = "flex";
        btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        e.target.reset();
        setTimeout(() => {
            document.getElementById("contactSuccess").style.display = "none";
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.disabled = false;
        }, 4000);
    }, 1500);
}
