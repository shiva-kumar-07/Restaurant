// ========================================
// BELLA VISTA - JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------------------
    // 1. SMOOTH SCROLLING
    // ----------------------------------------

    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // ----------------------------------------
    // 2. NAVBAR EFFECT ON SCROLL
    // ----------------------------------------

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.style.padding = "0.6rem 0";
            header.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
        } else {
            header.style.padding = "1rem 0";
            header.style.boxShadow = "none";
        }

    });


    // ----------------------------------------
    // 3. RESERVATION DATE
    // PREVENT SELECTING PAST DATES
    // ----------------------------------------

    const dateInput = document.querySelector("#date");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        const todayDate = `${year}-${month}-${day}`;

        dateInput.setAttribute("min", todayDate);
    }


    // ----------------------------------------
    // 4. RESERVATION FORM
    // ----------------------------------------

    const reservationForm = document.querySelector(".contact-form form");

    if (reservationForm) {

        reservationForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const phone = document.querySelector("#phone").value.trim();
            const date = document.querySelector("#date").value;
            const time = document.querySelector("#time").value;
            const guests = document.querySelector("#guest").value;
            const message = document.querySelector("#message").value.trim();


            // ----------------------------------------
            // BASIC VALIDATION
            // ----------------------------------------

            if (!name || !email || !phone || !date || !time || !guests) {
                showNotification(
                    "Please fill in all required fields.",
                    "error"
                );

                return;
            }


            // ----------------------------------------
            // NAME VALIDATION
            // ----------------------------------------

            if (name.length < 2) {
                showNotification(
                    "Please enter a valid name.",
                    "error"
                );

                return;
            }


            // ----------------------------------------
            // EMAIL VALIDATION
            // ----------------------------------------

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                showNotification(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            // ----------------------------------------
            // PHONE VALIDATION
            // ----------------------------------------

            const phonePattern = /^[0-9]{10}$/;

            if (!phonePattern.test(phone)) {

                showNotification(
                    "Please enter a valid 10-digit phone number.",
                    "error"
                );

                return;
            }


            // ----------------------------------------
            // CREATE RESERVATION MESSAGE
            // ----------------------------------------

            const reservation = {
                name: name,
                email: email,
                phone: phone,
                date: date,
                time: time,
                guests: guests,
                message: message
            };


            // Save reservation in browser
            localStorage.setItem(
                "bellaVistaReservation",
                JSON.stringify(reservation)
            );


            // ----------------------------------------
            // SUCCESS MESSAGE
            // ----------------------------------------

            showNotification(
                `Thank you ${name}! Your table reservation has been received.`,
                "success"
            );


            // Reset form
            reservationForm.reset();

        });
    }


    // ----------------------------------------
    // 5. NOTIFICATION SYSTEM
    // ----------------------------------------

    function showNotification(message, type) {

        const oldNotification =
            document.querySelector(".notification");

        if (oldNotification) {
            oldNotification.remove();
        }


        const notification =
            document.createElement("div");

        notification.className =
            `notification ${type}`;

        notification.innerHTML = `
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        `;


        document.body.appendChild(notification);


        // Close button
        const closeButton =
            notification.querySelector(".close-notification");

        closeButton.addEventListener("click", () => {
            notification.remove();
        });


        // Automatically remove
        setTimeout(() => {

            if (notification) {
                notification.remove();
            }

        }, 5000);
    }


    // ----------------------------------------
    // 6. MENU ITEM INTERACTION
    // ----------------------------------------

    const menuItems =
        document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {

        item.addEventListener("click", () => {

            // Remove selected class
            menuItems.forEach(menuItem => {
                menuItem.classList.remove("selected");
            });

            // Select current item
            item.classList.add("selected");

        });

    });


    // ----------------------------------------
    // 7. SCROLL REVEAL ANIMATION
    // ----------------------------------------

    const revealElements =
        document.querySelectorAll(
            ".menu-item, .about-text, .about-image, .contact-info, .contact-form"
        );


    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {
        observer.observe(element);
    });


    // ----------------------------------------
    // 8. ACTIVE NAVIGATION LINK
    // ----------------------------------------

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");


    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    });


    // ----------------------------------------
    // 9. WELCOME MESSAGE
    // ----------------------------------------

    setTimeout(() => {

        console.log(
            "🍝 Welcome to Bella Vista - Authentic Italian Cuisine!"
        );

    }, 1000);

});