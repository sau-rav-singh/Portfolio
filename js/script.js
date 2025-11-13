const animatedItems = document.querySelectorAll('.animated-item');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTopButton = document.getElementById('back-to-top');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedItems.forEach(item => {
        observer.observe(item);
    });

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    }

    // Initial theme setting
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        // If a theme is saved in localStorage, use it
        setTheme(savedTheme);
    } else if (prefersDark) {
        // If no theme is saved, but browser prefers dark, set dark mode
        setTheme('dark');
    } else {
        // Default to light mode if no preference is found
        setTheme('light');
    }

    // Theme toggle event listener
    themeToggle.addEventListener('change', () => {
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