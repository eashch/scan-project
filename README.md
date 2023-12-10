npm run start

Layout requirements

    1) The layout must match the layout. It is not necessary to achieve Pixel Perfect compliance, but the main points must be observed:
        1.1) presence of all interface elements,
        1.2) color spectrum,
        1.3) fonts,
        1.4) sizes,
        1.5) indentation.

    2) The application must display and work correctly on mobile devices. You will find the design for the mobile version in the layout.

    3) Follow semantic layout. Every page should have <header>, <main> and <footer> sections, as well as a <h1> header. Buttons should be implemented by a <button> element, a dropdown list by a <select> element, and so on.

    4) If any element is available for interaction (link, button), cursor: pointer should appear when hovering the cursor.

    5) The appearance of the element itself should also change when you hover the cursor. Example: underline text for a link, a different background color for a button.

    6) Use any option for connecting styles at your discretion:
        6.1) general project style file,
        6.2) CSS modules,
        6.3) special React libraries for styling components (for example, Styled Components).

    7) It is not recommended to use tag and ID selectors to set styles; try to give preference to classes.

    8) It's best to export Figma pictures in SVG format to ensure consistent image quality across different resolutions.

Code requirements

    1) The project was supposed to be done in React.

    2) The interface must be divided into components. Before you begin, consider what components you will use. The division must be logical and justified.

    3) The project will work with a lot of data. We recommend using a more advanced data storage and modification tool than the usual state. For example, useReducer, React Context or Redux.

    4) When writing code, try to follow the following principles:
        KISS (Keep It Short and Simple)
        DRY (Don’t Repeat Yourself - don’t repeat yourself).

    5) You are not limited in using any tools and additional libraries (for example, to implement a carousel). But try to ensure that their use is justified and does not complicate the code unnecessarily.