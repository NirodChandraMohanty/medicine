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
        document.getElementById("headerAvatarInitials").innerText = initials || "U";
    }
});

