import $ from 'jquery'; // eslint-disable-line import/no-extraneous-dependencies
import debounce from 'debounce'; // eslint-disable-line import/no-extraneous-dependencies

export default class FrontEndUtils {
  init() {
    this.sidebar();
    this.portfolioChooser();
  }

  sidebar() {
    //  Blog page functions to be called later
    function resizeBlogActions() {
      const blogSiteContentContainer = document.querySelector(
        '.blog-site-content-container'
      );
      if (!blogSiteContentContainer) return;

      const windowWidth = window.innerWidth;
      const windowWidth1005 = 1005;
      const sideBarHeight = document.getElementById('sidebar').offsetHeight;

      if (windowWidth > windowWidth1005) {
        blogSiteContentContainer.style.minHeight = `${sideBarHeight + 20}px`;
      } else if (windowWidth <= windowWidth1005) {
        blogSiteContentContainer.removeAttribute('style');
      }
    }
    resizeBlogActions();
    window.onresize = debounce(resizeBlogActions, 300);
  }

  portfolioChooser() {
    // Variables for the hash change and SELECT tag JS
    const portfolioProjectChooser = $('#portfolio-project-chooser');
    if (portfolioProjectChooser.length === 0) return;

    const showOverrideClass = 'show-override';
    const hideOverrideClass = 'hide-override';
    const hashSelectedClass = 'hash-selected';
    const featuredProjectsDataAttr = 'featured-projects';
    const featuredProjectsSection = document.getElementById(
      `${featuredProjectsDataAttr}-section`
    );
    const allProjectsSection = $('#all-projects-section');
    const portfolioUpdateText = $('#portfolio-update-text');

    // Push in  values to empty array 'data-project-category' values
    // into empty array
    const projectCategoriesArr = [];
    const portfolioProjectChooserOptions = document.querySelectorAll(
      '#portfolio-project-chooser > option'
    );
    portfolioProjectChooserOptions.forEach((option) =>
      projectCategoriesArr.push(option.getAttribute('data-project-category'))
    );

    // Show featured items only
    const showFeatured = (featuredId) => {
      $(featuredId).removeClass(hideOverrideClass).addClass(showOverrideClass);
    };

    const hashChange = (getSelectTag) => {
      const hash = window.location.hash.slice(1);

      // If loaded page to get a hash and
      // hash exists in projectCategoriesArr
      // then execute code below
      if (hash && $.inArray(hash, projectCategoriesArr) !== -1) {
        getSelectTag
          .find(`option[data-project-category=${hash}]`)
          .prop('selected', 'selected')
          .addClass(hashSelectedClass);

        if (hash === featuredProjectsDataAttr) {
          allProjectsSection.removeClass(showOverrideClass);
          featuredProjectsSection.classList.remove(hideOverrideClass);
          featuredProjectsSection.classList.add(showOverrideClass);
        } else {
          featuredProjectsSection.classList.remove(showOverrideClass);
          featuredProjectsSection.classList.add(hideOverrideClass);
          allProjectsSection.addClass(showOverrideClass);

          allProjectsSection
            .find(`h3[data-project-category=${hash}]`)
            .removeClass(hideOverrideClass)
            .addClass(showOverrideClass);
          allProjectsSection
            .find(`li[data-project-category=${hash}]`)
            .removeClass(hideOverrideClass)
            .addClass('show-inlineblock-override');
        }
      }
      // Else if hash does not exist in projectCategoriesArr
      // assign hash to #featured-projects
      else {
        window.location.hash = `#${featuredProjectsDataAttr}`;
      }

      // If portfolio update text exists remove it
      portfolioUpdateText.text('');
    };

    // Portfolio page (front page) code to show and hide project categories AND
    // code runs ONLY if on Portfolio page (front page)
    if ($('body.home').length > 0) {
      showFeatured('#featured-projects-section');

      portfolioProjectChooser.on('change', (event) => {
        const chosenOptionTagDataAttr = $(event.currentTarget)
          .find('option:selected')
          .attr('data-project-category');
        const chosenOptionTagVal = $(event.currentTarget)
          .find('option:selected')
          .val();
        portfolioProjectChooser.find('option').removeClass(hashSelectedClass);

        // If OPTION tag chosen is NOT 'featured-projects' then
        // ONLY display portfolio projects from chosen portfolio projects, like 'JavaScript and jQuery'
        if (chosenOptionTagDataAttr !== featuredProjectsDataAttr) {
          if (featuredProjectsSection.classList.contains(showOverrideClass)) {
            featuredProjectsSection.classList.remove(showOverrideClass);
            featuredProjectsSection.classList.add(hideOverrideClass);
          }

          allProjectsSection
            .find('h3')
            .removeClass(showOverrideClass)
            .addClass(hideOverrideClass);
          allProjectsSection
            .find('li')
            .removeClass('show-inlineblock-override')
            .addClass(hideOverrideClass);

          allProjectsSection
            .find(`h3[data-project-category=${chosenOptionTagDataAttr}]`)
            .removeClass(hideOverrideClass)
            .addClass(showOverrideClass);
          allProjectsSection
            .find(`li[data-project-category=${chosenOptionTagDataAttr}]`)
            .removeClass(hideOverrideClass)
            .addClass('show-inlineblock-override');
          window.location.hash = `#${chosenOptionTagDataAttr}`;
        }
        // ELSE 'featured-projects' OPTION tag IS CHOSEN  then
        // ONLY display 'Featured Projects' portfolio item
        else {
          if (featuredProjectsSection.hasClass(hideOverrideClass)) {
            featuredProjectsSection.classList.remove(hideOverrideClass);
            featuredProjectsSection.classList.add(showOverrideClass);
          }

          allProjectsSection
            .find('h3')
            .removeClass(showOverrideClass)
            .addClass(hideOverrideClass);
          allProjectsSection
            .find('li')
            .removeClass('show-inlineblock-override')
            .addClass(hideOverrideClass);
          window.location.hash = `#${featuredProjectsDataAttr}`;
        }

        // Add portfolio update text inside role="alert" DIV
        portfolioUpdateText.text(
          `Page updated to show ${chosenOptionTagVal} portfolio items`
        );
      });

      const getHashChange = hashChange(portfolioProjectChooser);

      $(window).on('hashchange', getHashChange);
    }
  }
}
