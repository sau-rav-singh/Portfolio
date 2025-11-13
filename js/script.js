const animatedItems = document.querySelectorAll('.animated-item');
    const backToTopButton = document.getElementById('back-to-top');
    const themeToggleContainer = document.getElementById('theme-toggle-container'); // Get reference to the container
    const sections = document.querySelectorAll('.section');


    const animationObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedItems.forEach(item => {
        animationObserver.observe(item);
    });

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    // Initial theme setting
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Theme toggle container click event listener
    themeToggleContainer.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'light'); // User is switching to light
            setTheme('light');
        } else {
            localStorage.setItem('theme', 'dark'); // User is switching to dark
            setTheme('dark');
        }
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    const sectionIndicatorBubble = document.getElementById('section-indicator-bubble');
    const mainHeader = document.querySelector('.main-header');

    // --- Section Indicator Bubble Logic ---
    function updateBubbleContent() { // This function runs on every scroll event
        let sectionForBubble = null;

        // 1. Determine which section's title should be displayed.
        // We find the LAST section that has its top edge scrolled above our trigger point (75px).
        for (const section of sections) {
            if (section.getBoundingClientRect().top <= 75) {
                sectionForBubble = section;
            }
        }

        // 2. Check if the bubble should be visible at all.
        const mainHeaderVisible = mainHeader.getBoundingClientRect().bottom > 0;
        const h3 = sectionForBubble ? sectionForBubble.querySelector('h3') : null;
        const h3IsOffscreen = h3 ? h3.getBoundingClientRect().bottom < 15 : false;

        // The bubble should be visible ONLY if a section is active, its h3 is offscreen, AND the main header is hidden.
        const shouldBeVisible = sectionForBubble && h3IsOffscreen && !mainHeaderVisible;

        if (shouldBeVisible) {
            // 3. If it should be visible, update the text and add the 'visible' class.
            sectionIndicatorBubble.textContent = h3.textContent.trim();
            sectionIndicatorBubble.classList.add('visible');
        } else {
            // 4. If it should NOT be visible, just remove the 'visible' class.
            // We DO NOT update the text here, which prevents the content flash.
            sectionIndicatorBubble.classList.remove('visible');
        }
    }

    // Listen to the scroll event to update the bubble in real-time
    window.addEventListener('scroll', updateBubbleContent);

    // Also run it once on load in case the page loads scrolled down
    updateBubbleContent();