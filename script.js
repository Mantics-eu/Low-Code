document.addEventListener('DOMContentLoaded', () => {
    const dynamicImage = document.getElementById('dynamic-image');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const speedSlider = document.getElementById('speedSlider');
    const progressDotsContainer = document.getElementById('progress-dots');

    // --- IMPORTANT: Define the 'frames' for each chain. ---
    // Each chain has three positions: A (left), B (center), C (right)
    // The animation sequence: A -> pan to C -> ballistic transition -> next A -> repeat
    const presentationChains = [
        // Chain 1: Airtable -> Postgres -> Grafana
        {
            y: 0.0625,
            positions: {
                A: { x: 0.25, scale: 2.5 },  // Left side
                B: { x: 0.5, scale: 2.5 },   // Center
                C: { x: 0.75, scale: 2.5 }   // Right side
            }
        },
        // Chain 2: WhatsApp -> Gemini -> Notion
        {
            y: 0.1875,
            positions: {
                A: { x: 0.25, scale: 2.5 },
                B: { x: 0.5, scale: 2.5 },
                C: { x: 0.75, scale: 2.5 }
            }
        },
        // Chain 3: Google Drive -> Ollama -> Excel
        {
            y: 0.3125,
            positions: {
                A: { x: 0.25, scale: 2.5 },
                B: { x: 0.5, scale: 2.5 },
                C: { x: 0.75, scale: 2.5 }
            }
        },
        // Chain 4: Gmail -> Gemini -> Post (Social Media Parallel)
        {
            y: 0.4375,
            positions: {
                A: { x: 0.25, scale: 2.5 },
                B: { x: 0.5, scale: 2.5 },
                C: { x: 0.75, scale: 2.5 }
            }
        },
        // Chain 5: Telegram -> Claude AI -> Adobe Photoshop
        {
            y: 0.5625,
            positions: {
                A: { x: 0.25, scale: 2.5 },
                B: { x: 0.5, scale: 2.5 },
                C: { x: 0.75, scale: 2.5 }
            }
        },
        // Chain 6: Discord -> ChatGPT -> Miro
        {
            y: 0.6875,
            positions: {
                A: { x: 0.25, scale: 2.5 },
                B: { x: 0.5, scale: 2.5 },
                C: { x: 0.75, scale: 2.5 }
            }
        },
        // Chain 7: Rauva -> Claude AI -> Chat / Email
        {
            y: 0.8125,
            positions: {
                A: { x: 0.25, scale: 2.5 },
                B: { x: 0.5, scale: 2.5 },
                C: { x: 0.75, scale: 2.5 }
            }
        },
        // Chain 8: Google Meet + Airtable => Ollama -> Airtable
        {
            y: 0.9375,
            positions: {
                A: { x: 0.25, scale: 2.5 },
                B: { x: 0.5, scale: 2.5 },
                C: { x: 0.75, scale: 2.5 }
            }
        }
    ];

    let currentChainIndex = 0;
    let autoAdvanceInterval;
    let autoAdvanceSpeed = 5000; // Default speed in ms (5 seconds per chain)
    let isAnimating = false;
    let panDuration = 8000; // Duration for panning from A to C
    let ballisticDuration = 1500; // Duration for ballistic transition

    // --- Helper Functions ---
    /**
     * Applies the CSS transform to the dynamic-image element based on the current frame.
     * @param {number} x - Horizontal center as a percentage (0.0 to 1.0)
     * @param {number} y - Vertical center as a percentage (0.0 to 1.0)
     * @param {number} scale - Zoom level
     * @param {number} duration - Transition duration in ms
     */
    function updateImageTransform(x, y, scale, duration) {
        dynamicImage.style.transitionDuration = `${duration}ms`;
        dynamicImage.style.transform = `
            scale(${scale})
            translate(
                calc(-${x * 100}% + (50% / ${scale})),
                calc(-${y * 100}% + (50% / ${scale}))
            )
        `;
    }

    /**
     * Performs the complete animation sequence for a chain: A -> pan to C -> ballistic transition
     * @param {number} chainIndex - The index of the target chain.
     */
    function animateChain(chainIndex) {
        if (isAnimating) return;
        isAnimating = true;

        // Wrap around logic
        if (chainIndex < 0) chainIndex = presentationChains.length - 1;
        if (chainIndex >= presentationChains.length) chainIndex = 0;

        const chain = presentationChains[chainIndex];
        const posA = chain.positions.A;
        const posC = chain.positions.C;

        // Step 1: Move to position A (start of chain)
        updateImageTransform(posA.x, chain.y, posA.scale, 500);

        setTimeout(() => {
            // Step 2: Pan from A to C (slow pan across the chain)
            updateImageTransform(posC.x, chain.y, posC.scale, panDuration);

            setTimeout(() => {
                // Step 3: Prepare for ballistic transition to next chain
                const nextChainIndex = (chainIndex + 1) % presentationChains.length;
                const nextChain = presentationChains[nextChainIndex];
                const nextPosA = nextChain.positions.A;

                // Calculate intermediate (zoomed-out) position
                const intermediateFrame = {
                    x: (posC.x + nextPosA.x) / 2,
                    y: (chain.y + nextChain.y) / 2,
                    scale: 1.0 // Zoom out
                };

                // Step 3a: Zoom out to intermediate position
                updateImageTransform(intermediateFrame.x, intermediateFrame.y, intermediateFrame.scale, ballisticDuration / 2);

                setTimeout(() => {
                    // Step 3b: Zoom in to next chain's A position
                    updateImageTransform(nextPosA.x, nextChain.y, nextPosA.scale, ballisticDuration / 2);

                    setTimeout(() => {
                        currentChainIndex = nextChainIndex;
                        updateProgressDots();
                        isAnimating = false;
                    }, ballisticDuration / 2);

                }, ballisticDuration / 2);

            }, panDuration);

        }, 500);
    }

    /**
     * Updates the visual progress indicators (dots) in the control panel.
     */
    function updateProgressDots() {
        progressDotsContainer.innerHTML = ''; // Clear existing dots
        presentationChains.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentChainIndex) {
                dot.classList.add('active'); // Highlight active dot
            }
            dot.addEventListener('click', () => {
                animateChain(index); // Jump to clicked chain
                resetAutoAdvance();
            });
            progressDotsContainer.appendChild(dot);
        });
    }

    /**
     * Initializes the presentation to the first chain.
     */
    function initializePresentation() {
        const chain = presentationChains[currentChainIndex];
        const posA = chain.positions.A;
        dynamicImage.style.transitionDuration = '0ms'; // No transition for initialization
        updateImageTransform(posA.x, chain.y, posA.scale, 0);
        updateProgressDots();
    }

    /**
     * Advances to the next chain animation sequence.
     */
    function advanceChain() {
        const nextChainIndex = (currentChainIndex + 1) % presentationChains.length;
        animateChain(nextChainIndex);
    }

    /**
     * Resets the automatic presentation interval. Clears the old one and starts a new one.
     */
    function resetAutoAdvance() {
        clearInterval(autoAdvanceInterval); // Stop previous interval
        // Calculate total time for one chain animation: initial move + pan + ballistic
        const totalChainTime = 500 + panDuration + ballisticDuration;
        autoAdvanceInterval = setInterval(advanceChain, totalChainTime + 1000); // Add 1s buffer
    }

    // --- Event Listeners ---
    // Previous button click
    prevBtn.addEventListener('click', () => {
        const newIndex = currentChainIndex - 1;
        animateChain(newIndex);
        resetAutoAdvance();
    });

    // Next button click
    nextBtn.addEventListener('click', () => {
        const newIndex = currentChainIndex + 1;
        animateChain(newIndex);
        resetAutoAdvance();
    });

    // Speed slider input changes
    speedSlider.addEventListener('input', (event) => {
        // Map slider value (1-100) to durations
        // Lower slider value = faster animations
        // Higher slider value = slower animations
        const sliderValue = parseInt(event.target.value);
        const speedFactor = (101 - sliderValue) / 50; // Range from 2 to 0.02

        panDuration = Math.max(500, 1500 * speedFactor);
        ballisticDuration = Math.max(500, 1500 * speedFactor);

        resetAutoAdvance();
    });

    // --- Initialization ---
    // Initialize the presentation to the first chain
    initializePresentation();

    // Start the automatic presentation loop
    resetAutoAdvance();

    // Re-adjust transform on window resize
    window.addEventListener('resize', () => {
        initializePresentation();
    });
});
