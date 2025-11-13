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

    // --- Section Indicator Bubble Logic (Revised for top-sticky behavior) ---
    const sectionIndicatorBubble = document.getElementById('section-indicator-bubble');
    const mainHeader = document.querySelector('.main-header');

    // 1. Observer to control bubble visibility (based on main header)
    const headerVisibilityObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Main header is out of view, show the bubble
                sectionIndicatorBubble.classList.add('visible');
            } else {
                // Main header is in view, hide the bubble
                sectionIndicatorBubble.classList.remove('visible');
            }
        });
    }, { threshold: 0 }); // Trigger as soon as any part of the main header leaves/enters

    if (mainHeader) {
        headerVisibilityObserver.observe(mainHeader);
    }

    // 2. Logic to update bubble content based on the current top-most section
    function updateBubbleContent() {
        let currentSection = null;

        // Find the last section that has scrolled past the top of the viewport
        for (const section of sections) {
            // The 75px offset accounts for the top padding of the bubble and gives a little buffer
            if (section.getBoundingClientRect().top < 75) {
                currentSection = section;
            }
        }

        if (currentSection) {
            const sectionTitle = currentSection.querySelector('h3').textContent.trim();
            if (sectionIndicatorBubble.textContent !== sectionTitle) {
                sectionIndicatorBubble.textContent = sectionTitle;
            }
        }
    }

    // Listen to the scroll event to update the bubble in real-time
    window.addEventListener('scroll', updateBubbleContent);

    // Also run it once on load in case the page loads scrolled down
    updateBubbleContent();