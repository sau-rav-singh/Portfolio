const animatedItems = document.querySelectorAll('.animated-item');
    const backToTopButton = document.getElementById('back-to-top');
    const themeToggleContainer = document.getElementById('theme-toggle-container'); // Get reference to the container

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