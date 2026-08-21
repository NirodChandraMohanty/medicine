// AVIJIT MEDICARE - Core JS with Custom Cursor

document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows exactly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay using CSS transition
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });

        // Add hover effect to interactive elements
        const interactives = document.querySelectorAll('a, button, input, .cat-glass-box, .product-glass');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
        });
    }

    // 2. Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun'); icon.classList.add('fa-moon');
        }
    }

    function updateCartCountBadge() {
        const cart = JSON.parse(localStorage.getItem("avijit_cart")) || [];
        const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
        const badges = document.querySelectorAll('a[href="cart.html"] span');
        badges.forEach(badge => {
            if (totalCount > 0) {
                badge.innerText = totalCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        });
    }

    // Dynamic Wishlist Icon Setup on all pages
    const wishlistIcons = document.querySelectorAll('.square-icon i.fa-heart');
    wishlistIcons.forEach(icon => {
        const parent = icon.parentElement;
        if (parent && parent.tagName === 'DIV') {
            const anchor = document.createElement('a');
            anchor.href = 'wishlist.html';
            anchor.className = parent.className;
            anchor.id = 'wishlistHeaderBtn';
            anchor.style.position = 'relative';
            anchor.style.textDecoration = 'none';
            
            const badge = document.createElement('span');
            badge.style.cssText = 'position: absolute; top:-5px; right:-5px; background:#f06a42; color:white; font-size:9px; width:14px; height:14px; border-radius:50%; display:flex; align-items:center; justify-content:center; display:none;';
            
            while (parent.firstChild) {
                anchor.appendChild(parent.firstChild);
            }
            anchor.appendChild(badge);
            parent.replaceWith(anchor);
        }
    });

    function updateWishlistCountBadge() {
        const wishlist = JSON.parse(localStorage.getItem("avijit_wishlist")) || [];
        const totalCount = wishlist.length;
        const badges = document.querySelectorAll('#wishlistHeaderBtn span');
        badges.forEach(badge => {
            if (totalCount > 0) {
                badge.innerText = totalCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        });
    }

    updateCartCountBadge();
    window.updateCartCountBadge = updateCartCountBadge;
    
    updateWishlistCountBadge();
    window.updateWishlistCountBadge = updateWishlistCountBadge;

    // Profile Dropdown Toggle Logic
    window.toggleProfileDropdown = function(event) {
        event.stopPropagation();
        const menu = document.getElementById("profileDropdownMenu");
        const wrapper = document.querySelector(".profile-dropdown-wrapper");
        if (menu && wrapper) {
            menu.classList.toggle("active");
            wrapper.classList.toggle("active");
            
            // Close mobile dropdown if open
            const mobileMenu = document.getElementById("mobileProfileDropdownMenu");
            const mobileWrapper = document.querySelector(".mobile-profile-wrapper");
            if (mobileMenu) {
                mobileMenu.classList.remove("active");
                mobileWrapper.classList.remove("active");
            }
        }
    };

    window.toggleMobileProfileDropdown = function(event) {
        event.stopPropagation();
        const menu = document.getElementById("mobileProfileDropdownMenu");
        const wrapper = document.querySelector(".mobile-profile-wrapper");
        if (menu && wrapper) {
            menu.classList.toggle("active");
            wrapper.classList.toggle("active");
            
            // Close desktop dropdown if open
            const desktopMenu = document.getElementById("profileDropdownMenu");
            const desktopWrapper = document.querySelector(".profile-dropdown-wrapper");
            if (desktopMenu) {
                desktopMenu.classList.remove("active");
                desktopWrapper.classList.remove("active");
            }
        }
    };

    // Close dropdowns when clicking outside
    document.addEventListener("click", () => {
        const desktopMenu = document.getElementById("profileDropdownMenu");
        const desktopWrapper = document.querySelector(".profile-dropdown-wrapper");
        if (desktopMenu && desktopWrapper) {
            desktopMenu.classList.remove("active");
            desktopWrapper.classList.remove("active");
        }

        const mobileMenu = document.getElementById("mobileProfileDropdownMenu");
        const mobileWrapper = document.querySelector(".mobile-profile-wrapper");
        if (mobileMenu && mobileWrapper) {
            mobileMenu.classList.remove("active");
            mobileWrapper.classList.remove("active");
        }
    });

    // Populate header avatar initials dynamically if user is logged in
    const currentUser = JSON.parse(localStorage.getItem("avijit_current_user"));
    if (currentUser && document.getElementById("headerAvatarInitials")) {
        const initials = (currentUser.fname ? currentUser.fname.charAt(0).toUpperCase() : "") +
                         (currentUser.lname ? currentUser.lname.charAt(0).toUpperCase() : "");
    }

    // Inject Notification styles dynamically
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        /* --- SMS PUSH NOTIFICATION SIMULATOR --- */
        .sms-push-container {
            position: fixed;
            top: -120px;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 32px);
            max-width: 420px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 18px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.18);
            padding: 16px;
            z-index: 100000;
            display: flex;
            gap: 12px;
            transition: all 0.50s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #1f2937;
        }

        .sms-push-container.active {
            top: 24px;
        }

        .sms-icon {
            width: 40px;
            height: 40px;
            background: #10b981;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.15rem;
            flex-shrink: 0;
            box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
        }

        .sms-content {
            flex-grow: 1;
        }

        .sms-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
        }

        .sms-title {
            font-weight: 700;
            font-size: 0.85rem;
            color: #374151;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .sms-time {
            font-size: 0.72rem;
            color: #9ca3af;
        }

        .sms-body {
            font-size: 0.82rem;
            line-height: 1.4;
            color: #4b5563;
        }
        
        .sms-body strong {
            color: #1f2937;
        }
    `;
    document.head.appendChild(styleEl);

    // simulated Mail show function
    function showSimulatedMail(name, email) {
        const container = document.createElement("div");
        container.className = "sms-push-container";
        container.innerHTML = `
            <div class="sms-icon">
                <i class="fa-solid fa-envelope"></i>
            </div>
            <div class="sms-content">
                <div class="sms-header">
                    <span class="sms-title">MAIL • now</span>
                    <span class="sms-time">just now</span>
                </div>
                <div class="sms-body">
                    <strong>DΛMODΛRΛ MEDICΛRE:</strong> Hello ${name}, login alert sent to <strong>${email}</strong>.
                </div>
            </div>
        `;
        document.body.appendChild(container);
        
        setTimeout(() => container.classList.add("active"), 100);
        
        setTimeout(() => {
            container.classList.remove("active");
            setTimeout(() => container.remove(), 600);
        }, 6000);
    }

    // trigger login notifications
    function triggerLoginNotification(user) {
        if (localStorage.getItem("avijit_login_notified") === "true") {
            return;
        }
        
        const email = user.email || "";
        const name = (user.fname || "") + " " + (user.lname || "");
        const loginDate = new Date().toLocaleDateString();
        const loginTime = new Date().toLocaleTimeString();
        const device = navigator.userAgent.substring(0, 70) + "...";
        const websiteName = "DΛMODΛRΛ MEDICΛRE";
        const year = new Date().getFullYear();
        
        // 1. Show the premium iOS push notification banner on screen
        showSimulatedMail(name, email);
        
        // 2. Send the premium FormSubmit email notification with custom template
        fetch("https://formsubmit.co/ajax/" + email, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "Subject": "Security Notification: Login Successful to DΛMODΛRΛ MEDICΛRE",
                "Message": `
# Login Successful

Hello ${name},

Welcome back! 🎉

Your account has been successfully logged in.

Login Details:
* Email: ${email}
* Date: ${loginDate}
* Time: ${loginTime}
* Device: ${device}
* Location: Bhubaneswar, Odisha

Your account is now securely active.

If you did not perform this login, please secure your account immediately or contact our support team.

Thank you for choosing ${websiteName}.

© ${year} ${websiteName}
Secure • Reliable • Trusted
                `.trim()
            })
        }).catch(err => console.warn("Email notify fail:", err));
        
        localStorage.setItem("avijit_login_notified", "true");
    }

    // Check if we need to show the login alert (runs post-login redirect on home page!)
    if (localStorage.getItem("show_login_alert") === "true") {
        const user = JSON.parse(localStorage.getItem("avijit_current_user"));
        if (user) {
            triggerLoginNotification(user);
        }
        localStorage.removeItem("show_login_alert");
    }

    // Update all header avatars & name dynamically
    const savedPhoto = localStorage.getItem("avijit_profile_photo");
    const activeUser = JSON.parse(localStorage.getItem("avijit_current_user"));
    
    if (activeUser) {
        const fullName = (activeUser.fname || "") + " " + (activeUser.lname || "");
        
        // Update header user name badge if it exists
        const headerName = document.getElementById("headerProfileName");
        if (headerName) {
            headerName.innerText = fullName;
        }
        
        const welcomeUser = document.getElementById("welcomeUser");
        if (welcomeUser) {
            welcomeUser.innerText = "Hi, " + (activeUser.fname || "");
        }
    }
    
    // Desktop dropdown triggers (standard pages e.g. about.html, doctors.html, index.html)
    const desktopTriggers = document.querySelectorAll(".profile-dropdown-trigger");
    desktopTriggers.forEach(trigger => {
        if (!trigger.querySelector(".user-header-avatar")) {
            const avatar = document.createElement("span");
            avatar.className = "user-header-avatar";
            avatar.style.display = "inline-flex";
            avatar.style.alignItems = "center";
            avatar.style.marginRight = "8px";
            avatar.style.verticalAlign = "middle";
            
            if (savedPhoto) {
                avatar.innerHTML = `<img src="${savedPhoto}" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--primary);">`;
            } else {
                avatar.innerHTML = `<i class="fa-regular fa-circle-user" style="font-size: 1.15rem; color: var(--primary);"></i>`;
            }
            trigger.insertBefore(avatar, trigger.firstChild);
        }
    });

    // Mobile avatar buttons
    const mobileBtns = document.querySelectorAll(".mobile-logout-btn");
    mobileBtns.forEach(btn => {
        const icon = btn.querySelector("i");
        if (icon && savedPhoto) {
            const img = document.createElement("img");
            img.src = savedPhoto;
            img.style.cssText = "width: 24px; height: 24px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--primary); vertical-align: middle;";
            icon.replaceWith(img);
        }
    });

    // Desktop/Dashboard badge avatar (for profile.html & dashboard.html)
    const badge = document.getElementById("headerProfileBadge");
    if (badge && savedPhoto) {
        const icon = badge.querySelector("i");
        if (icon) {
            const img = document.createElement("img");
            img.src = savedPhoto;
            img.style.cssText = "width: 24px; height: 24px; border-radius: 50%; object-fit: cover; border: 1px solid var(--primary); margin-right: 6px; vertical-align: middle;";
            icon.replaceWith(img);
        }
    }
});
