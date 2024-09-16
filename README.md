# Matt Jenning's WordPress Portfolio
This repo is code for [mattjennings.net](https://www.mattjennings.net/), the portfolio of Matt Jennings, front-end and full-stack web developer with design skills.

## Tech Details (for recruiters or hiring managers to read)
Below are code details about the active WordPress (WP) theme is at:  
__wp-content/themes/MJ-net-2012__

## webpack
- [webpack](https://webpack.js.org/) is used to transpile:
  - [SCSS](https://sass-lang.com/documentation/syntax/#scss) into CSS at:  
    __wp-content/themes/MJ-net-2012/assets/scss__
  - ES6 and beyond JavaScript (JS) into minified and ES5 (or higher) JS at:  
    __wp-content/themes/MJ-net-2012/assets/js__
- For webpack configuration details see (3 files):
  - __wp-content/themes/MJ-net-2012/webpack.config.cjs__
  - __wp-content/themes/MJ-net-2012/package.json__ (see `scripts` entry)
  - __wp-content/themes/MJ-net-2012/.babelrc.json__  

## Linting and Auto-formatting for JS and SCSS
See the files below:
- [ESLint](https://eslint.org/) (for JS)  
  __wp-content/themes/MJ-net-2012/.eslintrc.json__
- [Stylelint](https://stylelint.io/) (for SCSS)  
  __wp-content/themes/MJ-net-2012/.stylelintrc.json__
- [Prettier](https://prettier.io/) (auto-formatting of JS and SCSS; 2 files)  
  - __wp-content/themes/MJ-net-2012/.prettierrc.json__  
  - __wp-content/themes/MJ-net-2012/.prettierignore__

## Active WP Theme's functions.php File
- Shows example of linking to files with OOP PHP to execute [WP hooks](https://developer.wordpress.org/plugins/hooks/):  
  __wp-content/themes/MJ-net-2012/functions.php__
- Files with OOP PHP code linked to WP theme's __functions.php__ file:
  - WP Core Utilities (WP core hooks):  
    __wp-content/themes/MJ-net-2012/inc/wp-core-utils/wp-core-utils.php__
  - Example of Using [Walker_Nav_Menu](https://developer.wordpress.org/reference/classes/walker_nav_menu/) WordPress Class:  
    __wp-content/themes/MJ-net-2012/inc/walker-nav-menu/walker-nav-menu.php__

## JS and SCSS Files in Active WP Theme
- JS code:  
  [wp-content/themes/MJ-net-2012/assets/js/theme.js](https://github.com/Hollyw00d/mattjennings_net/blob/develop/wp-content/themes/MJ-net-2012/assets/js/theme.js)
- SCSS code:  
  [wp-content/themes/MJ-net-2012/assets/scss/style.scss](https://github.com/Hollyw00d/mattjennings_net/blob/develop/wp-content/themes/MJ-net-2012/assets/scss/style.scss)  
  
## Setup
1. To update CSS or JS in the WP active theme (both are located at __wp-content/themes/MJ-net-2012/assets__ and I use [SCSS](https://sass-lang.com/documentation/syntax/#scss), which is enhanced CSS), in your terminal go to:  
  __wp-content/themes/MJ-net-2012__

2. Then install npm packages (including [webpack](https://webpack.js.org/)) do:  
   `npm i`

3. To build CSS and JS for the theme do:  
   `npm run build`

4. When doing localhost development on the website, do:  
   `npm start`

5. Additional useful terminal commands in the active theme are below:
   - Lint WP theme JS located at __wp-content/themes/MJ-net-2012/assets/js__ by running:  
     `npm run lint`
   - Reformat JS located at __wp-content/themes/MJ-net-2012/assets/js__ by running:  
     `npm run format`
