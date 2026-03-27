// Performance optimization: Remove preload class after DOM loads
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.remove('preload');
        });

        // Optimized particle system
        class ParticleSystem {
            constructor() {
                this.particles = [];
                this.maxParticles = 50;
                this.isActive = true;
            }

            createSparkle() {
                if (!this.isActive || this.particles.length >= this.maxParticles) return;
                
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.width = sparkle.style.height = (Math.random() * 4 + 2) + 'px';
                sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
                sparkle.style.animationDelay = Math.random() * 2 + 's';
                document.body.appendChild(sparkle);
                
                this.particles.push(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.remove();
                        this.particles = this.particles.filter(p => p !== sparkle);
                    }
                }, 5000);
            }

            createFlower() {
                if (!this.isActive || this.particles.length >= this.maxParticles) return;
                
                const flower = document.createElement('div');
                flower.className = 'flower';
                flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
                flower.style.left = Math.random() * 100 + '%';
                flower.style.animationDuration = (Math.random() * 4 + 3) + 's';
                flower.style.fontSize = (Math.random() * 15 + 20) + 'px';
                flower.style.animationDelay = Math.random() * 2 + 's';
                document.body.appendChild(flower);
                
                this.particles.push(flower);
                
                setTimeout(() => {
                    if (flower.parentNode) {
                        flower.remove();
                        this.particles = this.particles.filter(p => p !== flower);
                    }
                }, 7000);
            }

            pause() {
                this.isActive = false;
                this.particles.forEach(particle => {
                    particle.style.animationPlayState = 'paused';
                });
            }

            resume() {
                this.isActive = true;
                this.particles.forEach(particle => {
                    particle.style.animationPlayState = 'running';
                });
            }
        }

        // Initialize particle system
        const particleSystem = new ParticleSystem();

        // Optimized intervals
        const sparkleInterval = setInterval(() => particleSystem.createSparkle(), 500);
        const flowerInterval = setInterval(() => particleSystem.createFlower(), 800);

        // Calculator functionality
        const display = document.getElementById('display');
        const calculatorScreen = document.getElementById('calculatorScreen');
        const birthdayScreen = document.getElementById('birthdayScreen');

        // Fixed appendToDisplay to avoid input conflicts
        function appendToDisplay(value) {
            if (display.value.length < 8) {
                display.value += value;
                createKeyEffect(value); // Pass value to create key effect
            }
        }

        function clearDisplay() {
            display.value = '';
            createKeyEffect();
        }

        function deleteLast() {
            display.value = display.value.slice(0, -1);
            createKeyEffect();
        }

        function createKeyEffect(val) {
            const btns = document.querySelectorAll('.btn-number');
            btns.forEach(btn => {
                if (btn.textContent.trim() === val) {
                    btn.style.animation = 'keyEffect 0.3s ease';
                    setTimeout(() => {
                        btn.style.animation = '';
                    }, 300);
                }
            });
        }

        const birthdayLines = [
            "Wishing you a wonderful and meaningful birthday!",
            "May the new year bring you good health, happiness, and success!",
            "May all your dreams come true this year!",
            "🌸 Happy Birthday! 🌸"
        ];

        function typeBirthdayLines(lines, element, done) {
            element.innerHTML = '';
            let idx = 0;
            function nextLine() {
                if (idx < lines.length) {
                    const lineDiv = document.createElement('div');
                    lineDiv.className = 'message-text';
                    element.appendChild(lineDiv);
                    let i = 0;
                    function typing() {
                        if (i <= lines[idx].length) {
                            lineDiv.innerHTML = lines[idx].slice(0, i) + '<span style="border-right:2px solid #ff69b4"></span>';
                            i++;
                            setTimeout(typing, 40);
                        } else {
                            lineDiv.innerHTML = lines[idx]; // Remove cursor
                            idx++;
                            setTimeout(nextLine, 500);
                        }
                    }
                    typing();
                } else {
                    // Show gift button after typing is done
                    const btn = document.getElementById('openGiftBtn');
                    if (btn) btn.style.display = 'inline-block';
                    if (done) done();
                }
            }
            nextLine();
        }

        function checkPassword() {
            if (display.value === '280309') {
                calculatorScreen.style.display = 'none';
                birthdayScreen.style.display = 'block';
                
                // Only show the wishes page with 3D card
                document.getElementById('wishesPage').style.display = 'block';
                document.getElementById('letterSection').style.display = 'none';
                
                // Initialize wishes page effects
                initWishesPage();
                
                setTimeout(() => {
                    createEnhancedFireworks();
                    playSuccessAnimation();
                }, 500);
            } else {
                // Enhanced shake effect
                display.style.animation = 'shake 0.6s ease-in-out';
                display.style.borderColor = '#ff4444';
                
                setTimeout(() => {
                    alert('🌸 Incorrect password! Please try again! 🌸');
                    clearDisplay();
                    display.style.animation = '';
                    display.style.borderColor = '';
                }, 600);
            }
        }

        // Initialize wishes page with effects
        function initWishesPage() {
            // Lock body to prevent scrolling
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100vw';
            document.body.style.height = '100vh';
            document.documentElement.style.overflow = 'hidden';
            
            // Add click event for 3D card on mobile
            const card3D = document.querySelector('.card-3d');
            if (card3D) {
                card3D.addEventListener('click', function() {
                    this.classList.toggle('active');
                });
                
                card3D.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    this.classList.toggle('active');
                });
            }
            
            setTimeout(() => {
                launchContinuousConfetti();
            }, 1000);
        }

        // Switch to heart gallery instead of letter
        function showLetter() {
            // Fade out effect before switching pages
            document.getElementById('wishesPage').style.transition = 'opacity 0.8s ease';
            document.getElementById('wishesPage').style.opacity = '0';
            
            // Navigate to congrats page after 0.8 seconds
            setTimeout(() => {
                window.location.href = 'chucmung.html';
            }, 800);
        }

        // Success animation
        function playSuccessAnimation() {
            const cake = document.querySelector('.cake');
            if (cake) {
                cake.style.animation = 'none';
                cake.offsetHeight; // Trigger reflow
                cake.style.animation = 'cakeParty 1s ease-in-out 3';
            }
        }

        // Confetti function
        function launchConfetti() {
            for (let i = 0; i < 80; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.background = `hsl(${Math.random()*360},90%,60%)`;
                    confetti.style.animationDuration = (Math.random()*1.5+1.5) + 's';
                    confetti.style.width = confetti.style.height = (Math.random()*8+6) + 'px';
                    document.body.appendChild(confetti);
                    setTimeout(() => confetti.remove(), 2500);
                }, i*18);
            }
        }

        // Enhanced keyboard support
        document.addEventListener('keydown', function(event) {
            if (calculatorScreen.style.display === 'none') return;

            const key = event.key;
            
            // Prevent default behavior for all number keys
            if (key >= '0' && key <= '9') {
                event.preventDefault(); // IMPORTANT: Prevent auto-input
                appendToDisplay(key);
            } else if (key === 'Enter') {
                event.preventDefault();
                checkPassword();
            } else if (key === 'Escape') {
                event.preventDefault();
                clearDisplay();
            } else if (key === 'Backspace') {
                event.preventDefault();
                deleteLast();
            }
        });

        // Performance optimization: Pause animations when tab is not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                particleSystem.pause();
                clearInterval(sparkleInterval);
                clearInterval(flowerInterval);
            } else {
                particleSystem.resume();
            }
        });

        // Intersection Observer for performance
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, observerOptions);

        // Observe animated elements
        setTimeout(() => {
            document.querySelectorAll('.sparkle, .flower').forEach(el => {
                observer.observe(el);
            });
        }, 1000);

        // Auto-focus display
        display.focus();

        // Floating bubble effect
        function createBubble() {
            const bubbles = document.getElementById('bubbles');
            if (!bubbles) return;
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            // Random size
            const size = Math.random() * 40 + 30;
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            // Random horizontal position
            bubble.style.left = Math.random() * 100 + 'vw';
            // Random float duration
            bubble.style.animationDuration = (6 + Math.random() * 4) + 's';
            bubbles.appendChild(bubble);
            setTimeout(() => {
                bubble.remove();
            }, 9000);
        }
        setInterval(createBubble, 700);
        for (let i = 0; i < 10; i++) createBubble();

        // Floating small heart effect
        function createBgHeart() {
            const bgHearts = document.getElementById('bgHearts');
            if (!bgHearts) return;
            const heart = document.createElement('div');
            heart.className = 'bg-heart';
            // Randomly pick 1 of 3 heart types
            const heartTypes = ['💖', '💗', '💞'];
            heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            // Random size
            const size = Math.random() * 18 + 22;
            heart.style.fontSize = size + 'px';
            // Random horizontal position
            heart.style.left = Math.random() * 100 + 'vw';
            // Random float duration
            heart.style.animationDuration = (5 + Math.random() * 4) + 's';
            bgHearts.appendChild(heart);
            setTimeout(() => {
                heart.remove();
            }, 9000);
        }
        setInterval(createBgHeart, 1200);
        for (let i = 0; i < 6; i++) createBgHeart();

        function typeBirthdayLines(lines, element, done) {
            element.innerHTML = '';
            let idx = 0;
            function nextLine() {
                if (idx < lines.length) {
                    const lineDiv = document.createElement('div');
                    lineDiv.className = 'message-text';
                    element.appendChild(lineDiv);
                    let i = 0;
                    function typing() {
                        if (i <= lines[idx].length) {
                            lineDiv.innerHTML = lines[idx].slice(0, i) + '<span style="border-right:2px solid #ff69b4"></span>';
                            i++;
                            setTimeout(typing, 40);
                        } else {
                            lineDiv.innerHTML = lines[idx]; // Remove cursor
                            idx++;
                            setTimeout(nextLine, 500);
                        }
                    }
                    typing();
                } else {
                    // Show gift button after typing is done
                    const btn = document.getElementById('openGiftBtn');
                    if (btn) btn.style.display = 'inline-block';
                    if (done) done();
                }
            }
            nextLine();
        }

        function openLetter() {
            document.getElementById('letterClosed').style.display = 'none';
            const opened = document.getElementById('letterOpened');
            opened.style.display = 'flex';
            // Typing effect line by line
            const messageEl = opened.querySelector('.birthday-message');
            typeBirthdayLines(birthdayLines, messageEl, function(){});
        }

        // Updated checkPassword to only show closed letter first, not content yet
        function checkPassword() {
            if (display.value === '280309') {
                calculatorScreen.style.display = 'none';
                birthdayScreen.style.display = 'block';

                // Hide all birthday screen content, only show closed letter
                document.querySelector('.birthday-title').style.display = 'none';
                document.querySelector('.date-special').style.display = 'none';
                document.getElementById('letterClosed').style.display = 'flex';
                document.getElementById('letterOpened').style.display = 'none';
                document.querySelector('.back-btn').style.display = 'none';

                setTimeout(() => {
                    createEnhancedFireworks();
                    playSuccessAnimation();
                }, 500);
            } else {
                // Enhanced shake effect
                display.style.animation = 'shake 0.6s ease-in-out';
                display.style.borderColor = '#ff4444';
                
                setTimeout(() => {
                    alert('🌸 Incorrect password! Please try again! 🌸');
                    clearDisplay();
                    display.style.animation = '';
                    display.style.borderColor = '';
                }, 600);
            }
        }
        
        document.addEventListener('DOMContentLoaded', () => {
            const card3D = document.querySelector('.card-3d');
            if (card3D) {
                // Remove any old touchstart listeners if present
                card3D.addEventListener('click', function () {
                    this.classList.toggle('active');
                });
                card3D.addEventListener('touchend', function (e) {
                    // Only toggle on a tap (not a drag)
                    if (e.cancelable) e.preventDefault();
                    this.classList.toggle('active');
                });
            }
        });


     function showLetter() {
    document.getElementById('wishesPage').style.transition = 'opacity 0.8s ease';
    document.getElementById('wishesPage').style.opacity = '0';
    setTimeout(() => {
        window.location.href = 'chucmung.html';
    }, 800);
}