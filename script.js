      document.addEventListener('DOMContentLoaded', function() {
            
            const menuToggle = document.getElementById('menu-toggle');
            const navbarUl = document.querySelector('.navbar ul');
            // Get all nav links
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.section');

            const filterButtons = document.querySelectorAll('.filter-btn');
            const works = document.querySelectorAll('.work');

            menuToggle.addEventListener('click', function() {
                navbarUl.classList.toggle('open');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navbarUl.classList.remove('open');
                });
            });
          

            // Handle initial active state based on URL hash
            function handleInitialState() {
                const hash = window.location.hash || '#home';
                const activeLink = document.querySelector(`a[href="${hash}"]`);
                const activeSection = document.querySelector(hash);
                
                navLinks.forEach(link => link.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));
                
                if (activeLink && activeSection) {
                    activeLink.classList.add('active');
                    activeSection.classList.add('active');
                }
            }
            // Handle initial state and hash changes
            handleInitialState();
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

            window.addEventListener('hashchange', handleInitialState);
        });