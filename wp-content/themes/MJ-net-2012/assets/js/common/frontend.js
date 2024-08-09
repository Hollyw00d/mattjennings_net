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
    const portfolioProjectChooser = document.getElementById(
      'portfolio-project-chooser'
    );
    if (!portfolioProjectChooser) return;

    const featuredId = document.getElementById('featured-projects-section');
    const showOverrideClass = 'show-override';
    const hideOverrideClass = 'hide-override';
    const showInlineBlockOverride = 'show-inlineblock-override';
    const hashSelectedClass = 'hash-selected';
    const featuredProjectsDataAttr = 'featured-projects';
    const featuredProjectsSection = document.getElementById(
      `${featuredProjectsDataAttr}-section`
    );

    const allProjectsSection = document.getElementById('all-projects-section');
    const portfolioUpdateText = document.getElementById(
      'portfolio-update-text'
    );

    // Push in  values to empty array 'data-project-category' values
    // into empty array
    const projectCategoriesArr = [];
    const portfolioProjectChooserOptions = document.querySelectorAll(
      '#portfolio-project-chooser > option'
    );
    portfolioProjectChooserOptions.forEach((option) =>
      projectCategoriesArr.push(option.getAttribute('data-project-category'))
    );

    const hashChange = (getSelectTag) => {
      const hash = window.location.hash.slice(1);

      // If loaded page to get a hash and
      // hash exists in projectCategoriesArr
      // then execute code below
      if (hash && projectCategoriesArr.includes(hash)) {
        const option = getSelectTag.querySelector(
          `option[data-project-category="${hash}"]`
        );
        if (option) {
          option.selected = true;
          option.classList.add(hashSelectedClass);
        }

        if (hash === featuredProjectsDataAttr) {
          allProjectsSection.classList.remove(showOverrideClass);
          featuredProjectsSection.classList.remove(hideOverrideClass);
          featuredProjectsSection.classList.add(showOverrideClass);
        } else {
          featuredProjectsSection.classList.remove(showOverrideClass);
          featuredProjectsSection.classList.add(hideOverrideClass);
          allProjectsSection.classList.add(showOverrideClass);

          const h3 = allProjectsSection.querySelectorAll(
            `h3[data-project-category=${hash}]`
          );
          const li = allProjectsSection.querySelectorAll(
            `li[data-project-category=${hash}]`
          );

          h3.forEach((elem) => {
            elem.classList.remove(hideOverrideClass);
            elem.classList.add(showOverrideClass);
          });

          li.forEach((elem) => {
            elem.classList.remove(hideOverrideClass);
            elem.classList.add(showInlineBlockOverride);
          });
        }
      }
      // Else if hash does not exist in projectCategoriesArr
      // assign hash to #featured-projects
      else {
        window.location.hash = `#${featuredProjectsDataAttr}`;
      }

      // If portfolio update text exists remove it
      portfolioUpdateText.textContent = '';
    };

    // Portfolio page (front page) code to show and hide project categories AND
    // code runs ONLY if on Portfolio page (front page)
    featuredId.classList.remove(hideOverrideClass);
    featuredId.classList.add(showOverrideClass);

    portfolioProjectChooser.addEventListener('change', (e) => {
      const select = e.target;
      const selectedOption = select.options[select.selectedIndex];
      const chosenOptionTagDataAttr = selectedOption.getAttribute(
        'data-project-category'
      );
      const chosenOptionTagVal = selectedOption.text;

      if (chosenOptionTagDataAttr !== featuredProjectsDataAttr) {
        if (featuredProjectsSection.classList.contains(showOverrideClass)) {
          featuredProjectsSection.classList.remove(showOverrideClass);
          featuredProjectsSection.classList.add(hideOverrideClass);
        }

        const h3 = allProjectsSection.querySelectorAll('h3');
        const h3Selected = allProjectsSection.querySelectorAll(
          `h3[data-project-category=${chosenOptionTagDataAttr}]`
        );
        const li = allProjectsSection.querySelectorAll('li');
        const liSelected = allProjectsSection.querySelectorAll(
          `li[data-project-category=${chosenOptionTagDataAttr}]`
        );

        h3.forEach((elem) => {
          elem.classList.remove(showOverrideClass);
          elem.classList.add(hideOverrideClass);
        });

        h3Selected.forEach((elem) => {
          elem.classList.remove(hideOverrideClass);
          elem.classList.add(showOverrideClass);
        });

        li.forEach((elem) => {
          elem.classList.remove(showInlineBlockOverride);
          elem.classList.add(hideOverrideClass);
        });

        liSelected.forEach((elem) => {
          elem.classList.remove(hideOverrideClass);
          elem.classList.add(showInlineBlockOverride);
        });

        window.location.hash = `#${chosenOptionTagDataAttr}`;
      }
      // ELSE 'featured-projects' OPTION tag IS CHOSEN  then
      // ONLY display 'Featured Projects' portfolio item
      else {
        if (featuredProjectsSection.classList.contains(hideOverrideClass)) {
          featuredProjectsSection.classList.remove(hideOverrideClass);
          featuredProjectsSection.classList.add(showOverrideClass);
        }

        allProjectsSection
          .querySelector('h3')
          .classList.remove(showOverrideClass);
        allProjectsSection.querySelector('h3').classList.add(hideOverrideClass);

        allProjectsSection
          .querySelector('li')
          .classList.remove(showInlineBlockOverride);
        allProjectsSection.querySelector('li').classList.add(hideOverrideClass);

        window.location.hash = `#${featuredProjectsDataAttr}`;
      }

      // Add portfolio update text inside role="alert" DIV
      portfolioUpdateText.textContent = `Page updated to show ${chosenOptionTagVal} portfolio items`;
    });

    const getHashChange = hashChange(portfolioProjectChooser);
    window.addEventListener('hashchange', getHashChange);
  }
}
