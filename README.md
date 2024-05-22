# Matt Jenning's WordPress Portfolio
Currently the website is a WordPress (WP) site at [mattjennings.net](https://www.mattjennings.net/). This is portfolio site for Matt Jennings, a front-end and full-stack web developer.

## Setup
1. To update CSS or JS in the WP active theme (both are located at __wp-content/themes/MJ-net-2012/assets__ and I use [SCSS](https://sass-lang.com/documentation/syntax/#scss), which is enhanced CSS), in your terminal go to __wp-content/themes/MJ-net-2012__

2. Then install npm packages (including [webpack](https://webpack.js.org/)) do: 
   `npm i`

3. To build CSS and JS for the theme do:
   `npm run build`

4. When doing localhost development on the website, do:
   `npm start`

5. Additional useful terminal commands in the active theme are below:
   - Lint WP theme JS located at __wp-content/themes/MJ-net-2012/assets__ by running:
     `npm run lint`
   - Reformat JS located at __wp-content/themes/MJ-net-2012/assets__ by running:
     `npm run format`
