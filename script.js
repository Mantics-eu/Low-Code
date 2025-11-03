document.addEventListener('DOMContentLoaded', () => {
    const dynamicImage = document.getElementById('dynamic-image');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const speedSlider = document.getElementById('speedSlider');
    const progressDotsContainer = document.getElementById('progress-dots');

    // --- IMPORTANT: Define the 'frames' for each chain. ---
    // These values (x, y, scale) dictate how each section of your 'canvas.png' is displayed.
    // 'x': Horizontal center of the target chain, as a percentage (0.0 to 1.0) of the *full image width*.
    // 'y': Vertical center of the target chain, as a percentage (0.0 to 1.0) of the *full image height*.
    // 'scale': How much to zoom in. A value of 2 means 200% zoom. Adjust so one chain fills the viewport nicely.
    //
    // Fine-tuned values based on the canvas.png layout with 8 toolchains stacked vertically.
    const presentationFrames = [
        // Chain 1: Airtable -> Postgres -> Grafana
        { x: 0.5, y: 0.0625, scale: 2.5 },
        // Chain 2: WhatsApp -> Gemini -> Notion
        { x: 0.5, y: 0.1875, scale: 2.5 },
        // Chain 3: Google Drive -> Ollama -> Excel
        { x: 0.5, y: 0.3125, scale: 2.5 },
        // Chain 4: Gmail -> Gemini -> Post (Social Media Parallel)
        { x: 0.5, y: 0.4375, scale: 2.5 },
        // Chain 5: Telegram -> Claude AI -> Adobe Photoshop
        { x: 0.5, y: 0.5625, scale: 2.5 },
        // Chain 6: Discord -> ChatGPT -> Miro
        { x: 0.5, y: 0.6875, scale: 2.5 },
        // Chain 7: Rauva -> Claude AI -> Chat / Email
        { x: 0.5, y: 0.8125, scale: 2.5 },
        // Chain 8: Google Meet + Airtable => Ollama -> Airtable
        { x: 0.5, y: 0.9375, scale: 2.5 },
    ];

    let currentFrameIndex = 0;
    let autoAdvanceInterval;
    let autoAdvanceSpeed = 3000; // Default speed in ms (3 seconds)

    // --- Helper Functions ---
    /**
     * Applies the CSS transform to the dynamic-image element based on the current frame.
     * This centers the point (frame.x, frame.y) of the scaled image within the viewport.
     * @param {object} frame - The current frame object with x, y, and scale properties.
     */
    function updateImageTransform(frame) {
        // The transform-origin is set to 0 0 (top-left) in CSS.
        // The calculation below adjusts for this to effectively center the desired point.
        dynamicImage.style.transform = `
            scale(${frame.scale})
            translate(
                calc(-${frame.x * 100}% + (50% / ${frame.scale})),
                calc(-${frame.y * 100}% + (50% / ${frame.scale}))
            )
        `;
        // This CSS `calc` effectively centers the point (frame.x, frame.y)
        // after the image has been scaled.
        // It moves the image to the left by `frame.x` of its *original* width,
        // then adds back `50% / scale` to account for the viewport's center.
        // This is a common pattern for "zooming to a point."
    }

    /**
     * Updates the visual progress indicators (dots) in the control panel.
     */
    function updateProgressDots() {
        progressDotsContainer.innerHTML = ''; // Clear existing dots
        presentationFrames.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentFrameIndex) {
                dot.classList.add('active'); // Highlight active dot
            }
            dot.addEventListener('click', () => {
                currentFrameIndex = index; // Jump to clicked frame
                showCurrentFrame();
                resetAutoAdvance();
            });
            progressDotsContainer.appendChild(dot);
        });
    }

    /**
     * Displays the current frame by applying its transform and updating dots.
     * Handles wrapping around from last to first frame and vice-versa.
     */
    function showCurrentFrame() {
        // Wrap around logic
        if (currentFrameIndex < 0) currentFrameIndex = presentationFrames.length - 1;
        if (currentFrameIndex >= presentationFrames.length) currentFrameIndex = 0;

        const frame = presentationFrames[currentFrameIndex];
        updateImageTransform(frame);
        updateProgressDots();
    }

    /**
     * Advances to the next frame in the presentation.
     */
    function advanceFrame() {
        currentFrameIndex++;
        showCurrentFrame();
    }

    /**
     * Resets the automatic presentation interval. Clears the old one and starts a new one.
     */
    function resetAutoAdvance() {
        clearInterval(autoAdvanceInterval); // Stop previous interval
        autoAdvanceInterval = setInterval(advanceFrame, autoAdvanceSpeed); // Start new interval
    }

    // --- Event Listeners ---
    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentFrameIndex--;
        showCurrentFrame();
        resetAutoAdvance();
    });

    // Next button click
    nextBtn.addEventListener('click', () => {
        currentFrameIndex++;
        showCurrentFrame();
        resetAutoAdvance();
    });

    // Speed slider input changes
    speedSlider.addEventListener('input', (event) => {
        // Map slider value (1-100) to speed (e.g., 1000ms to 10000ms for full cycle duration)
        // Lower slider value = faster auto-advance (less time between frames)
        // Higher slider value = slower auto-advance (more time between frames)
        autoAdvanceSpeed = 1000 + (100 - parseInt(event.target.value)) * 100; // Range from 1s to 10s
        // Optionally, adjust CSS transition duration for a smoother/faster visual feel
        dynamicImage.style.transitionDuration = `${(autoAdvanceSpeed / 2) / 1000}s`; // Half the autoAdvanceSpeed for transition
        resetAutoAdvance();
    });

    // --- Initialization ---
    // Display the first frame as soon as the DOM is loaded
    showCurrentFrame();

    // Start the automatic presentation loop
    resetAutoAdvance();

    // Re-adjust transform on window resize to ensure correct centering for current frame
    window.addEventListener('resize', () => {
        showCurrentFrame();
    });
});
