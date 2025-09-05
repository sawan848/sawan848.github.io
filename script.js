      document.addEventListener('DOMContentLoaded', function() {
            
            const menuToggle = document.getElementById('menu-toggle');
            const navbarUl = document.querySelector('.navbar ul');
            // Get all nav links
            // const navLinks = document.querySelectorAll('.nav-link');
            const navLinks = document.querySelectorAll('.navbar ul li a');
            const sections = document.querySelectorAll('.section');
            const navMenu = document.getElementById('nav-menu');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const works = document.querySelectorAll('.work');

            menuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Close menu and set active state
                    navMenu.classList.remove('active');
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // sync active link with hash
            function syncActiveFromHash() {
                const hash = window.location.hash || '#home';
                const activeLink = document.querySelector(`a[href="${hash}"]`);
                navLinks.forEach(link => link.classList.remove('active'));
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }

            // Initialize and listen for hash changes
            syncActiveFromHash();
            window.addEventListener('hashchange', syncActiveFromHash);

            // Smooth scrolling offset handling for fixed header is handled via CSS scroll-padding-top

            // Portfolio filters
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    works.forEach(work => {
                        if (filter === 'all' || work.getAttribute('data-category') === filter) {
                            work.classList.add('show');
                        } else {
                            work.classList.remove('show');
                        }
                    });
                });
            });

            works.forEach(work => work.classList.add('show'));

            // Continuous IntersectionObserver for fade in/out on scroll
            const fadeEls = document.querySelectorAll('.fade-on-scroll');
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!prefersReduced && 'IntersectionObserver' in window) {
                const fadeObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('in-view');
                        } else {
                            entry.target.classList.remove('in-view');
                        }
                    });
                }, { root: null, threshold: 0.15 });
                fadeEls.forEach(el => fadeObserver.observe(el));
            } else {
                fadeEls.forEach(el => el.classList.add('in-view'));
            }

            // Scrollspy: highlight nav link for section in view
            if ('IntersectionObserver' in window) {
                const spyObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const id = entry.target.getAttribute('id');
                        if (!id) return;
                        const link = document.querySelector(`.navbar a[href="#${id}"]`);
                        if (!link) return;
                        if (entry.isIntersecting) {
                            navLinks.forEach(l => l.classList.remove('active'));
                            link.classList.add('active');
                        }
                    });
                }, { root: null, threshold: 0.6 });
                sections.forEach(sec => spyObserver.observe(sec));
            }

            // Dynamic header height CSS var for scroll-padding
            function setHeaderHeightVar() {
                const header = document.querySelector('.navbar');
                if (!header) return;
                const height = header.getBoundingClientRect().height;
                document.documentElement.style.setProperty('--header-height', `${Math.round(height)}px`);
            }
            setHeaderHeightVar();
            window.addEventListener('resize', setHeaderHeightVar);
        });