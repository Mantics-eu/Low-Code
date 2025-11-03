# The Connected Ecosystem - Dynamic Image Presentation Website

A dynamic, interactive presentation website that displays interconnected toolchains through a single merged image with smooth scroll and zoom animations.

## Project Overview

This website showcases 8 interconnected toolchains:

1. **Airtable → Postgres → Grafana** - Data collection, storage, and visualization
2. **WhatsApp → Gemini → Notion** - Communication to AI to knowledge management
3. **Google Drive → Ollama → Excel** - File storage to local AI to spreadsheets
4. **Gmail → Gemini → Post (Social Media)** - Email to AI to social media distribution
5. **Telegram → Claude AI → Adobe Photoshop** - Chat to AI to design
6. **Discord → ChatGPT → Miro** - Community chat to AI to collaboration
7. **Rauva → Claude AI → Chat/Email** - Financial data to AI to communication
8. **Google Meet + Airtable ⇒ Ollama → Airtable** - Meeting data to AI back to database

## Project Structure

```
connected-ecosystem/
├── index.html          # HTML structure
├── style.css           # CSS styling and layout
├── script.js           # JavaScript logic and animations
├── README.md           # This file
└── img/
    └── canvas.png      # Merged image containing all 8 toolchains
```

## Features

- **Smooth Animations**: CSS transitions provide smooth zoom and pan effects between toolchains
- **Interactive Controls**: Navigate through chains using Previous/Next buttons or progress dots
- **Auto-Play**: Automatically cycles through all chains with adjustable speed
- **Responsive Design**: Adapts to window resizing
- **Dark Theme**: Professional dark background with blue accent colors

## Setup Instructions

### 1. File Organization
Ensure the project structure is as shown above with all files in the correct locations.

### 2. Image Preparation
The `canvas.png` file should contain all 8 toolchains laid out clearly, ideally stacked vertically one above the other.

### 3. Opening the Website
Simply open `index.html` in your web browser:
- Double-click the file in your file explorer, or
- Open it with your preferred web browser

## Usage

### Navigation Controls

- **Previous Button (`< Prev`)**: Navigate to the previous toolchain
- **Next Button (`Next >`)**: Navigate to the next toolchain
- **Progress Dots**: Click any dot to jump directly to that toolchain
- **Speed Slider**: Adjust the auto-play speed (1 = slowest, 100 = fastest)

### Fine-Tuning Frame Positions

If the toolchains don't align perfectly with the viewport, you may need to adjust the `presentationFrames` array in `script.js`:

1. Open `script.js` in a text editor
2. Locate the `presentationFrames` array
3. For each frame, adjust:
   - **`x`**: Horizontal center as a percentage (0.0 to 1.0) of the image width
   - **`y`**: Vertical center as a percentage (0.0 to 1.0) of the image height
   - **`scale`**: Zoom level (start with 2.5 and adjust up or down)

4. Save the file and refresh your browser to see changes

### Example Frame Adjustment

```javascript
// If a toolchain appears too far to the right, decrease its x value
{ x: 0.4, y: 0.0625, scale: 2.5 }, // Move left

// If it's too zoomed in, decrease the scale value
{ x: 0.5, y: 0.0625, scale: 2.0 }, // Zoom out
```

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Technical Details

### CSS Transform Logic

The website uses CSS `transform` with `scale()` and `translate()` to create the zoom and pan effect:

```css
transform: scale(2.5) translate(calc(-50% + (50% / 2.5)), calc(-50% + (50% / 2.5)))
```

This approach:
- Scales the image by the specified factor
- Translates it to center the desired point in the viewport
- Provides smooth transitions via CSS `transition` property

### JavaScript Functionality

- **`updateImageTransform(frame)`**: Applies the CSS transform based on frame coordinates
- **`updateProgressDots()`**: Updates the visual progress indicators
- **`showCurrentFrame()`**: Displays the current frame with wrapping logic
- **`advanceFrame()`**: Moves to the next frame
- **`resetAutoAdvance()`**: Manages the auto-play interval

## Customization

### Colors

Modify the CSS variables in `style.css`:
- Background: `background-color: #1a1a2e;`
- Button color: `background-color: #007bff;`
- Button hover: `background-color: #0056b3;`
- Dot colors: `.dot` and `.dot.active`

### Animation Speed

Adjust the CSS transition duration:
```css
transition: transform 1.5s ease-in-out;
```

Or modify the JavaScript speed range:
```javascript
autoAdvanceSpeed = 1000 + (100 - parseInt(event.target.value)) * 100;
```

## Troubleshooting

### Toolchains not centered properly
- Check that `canvas.png` is in the correct location (`img/canvas.png`)
- Adjust the `x`, `y`, and `scale` values in the `presentationFrames` array
- Use browser Developer Tools (F12) to inspect the `transform` property

### Image not loading
- Verify the file path is correct: `img/canvas.png`
- Check that the image file exists and is readable
- Clear browser cache and refresh

### Controls not responding
- Ensure JavaScript is enabled in your browser
- Check the browser console (F12) for any errors
- Verify all JavaScript files are in the correct location

## License

This project is part of the Low-Code ecosystem demonstration.

## Support

For issues or questions, please refer to the main project documentation or contact the development team.
