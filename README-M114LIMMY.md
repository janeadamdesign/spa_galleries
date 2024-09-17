# The Spa Galleries

## Local gallery and events space website

Production website for a small local gallery and events space situated in The Pantiles, Tunbridge Wells. Built in Next.js using App Router with three dynamically rendered 'sections': a welcome section, a section showing artists who currently exhibit at The Spa Galleries, and an events section. Features three-dimensional wireframe animations developed using Three.js and vanilla JavaScript manipulation of DOM elements.

On initial page load user is greeted by full-screen 3D wireframe animation as it zooms out into focus as an elevated 'postcard'. Interacting with animation causes the full-screen page to swipe out of the viewport,  revealing the main website.

The app is strictly a single-page application with sections rendered dynamically inside the UI. Outer structure of app has header with animated logo and buttons to load a sidepane with further information. Side pane animates in and out using spring animations to display contact details and opening times of the gallery; both sections contain 3D animations of simple CSS shapes.

There is a footer with a field for entering an email to subscribe to newsletters. When user has submitted their email address the UI alters to reflect this and temporarily displays a dialog box in the center of the page while the rest of the website is blurred.

Beneath the main header is a subheader with navlinks to render the interior 'sections'.

Home section uses a modular 'card' component to show basic information about the gallery, followed by a Three.js animated wireframe. Events section uses the same modular 'card' component to show information for each upcoming event. Artists section uses a different modular 'card' component to display information about artists who are currently exhibiting.







## Known issues

- Mobile browsers on some devices zoom in on UI when email input field is focussed, causing unwanted visual effects. Specifying font-size must be 16px minimum does not seem to prevent this from happening.

## Dependencies

- @tsparticles/engine
- @tsparticles/react
- eslint
- eslint-config-next
- framer-motion
- next
- p5
- react
- react-dom
- react-p5-wrapper
- react-spring
- react-transition-group
- react-tsparticles
- sass
- three
- typescript
- validator



