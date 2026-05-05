import debounce from 'debounce'; // eslint-disable-line import/no-extraneous-dependencies

export default class FrontEndUtils {
  init() {
    this.sidebar();
    this.portfolioChooser();
    this.decryptEmailPhone();
  }

  sidebar() {
    //  Blog page functions to be called later
    function resizeBlog() {
      const blogContainer = document.querySelector(
        '.blog-site-content-container'
      );
      const sidebar = document.getElementById('sidebar');
      if (!blogContainer || !sidebar) return;

      const windowWidth = window.innerWidth;
      const windowWidthLg = 1005;
      const sidebarHeight = sidebar.offsetHeight;

      if (windowWidth > windowWidthLg) {
        blogContainer.style.minHeight = `${sidebarHeight + 20}px`;
      } else if (windowWidth <= windowWidthLg) {
        blogContainer.removeAttribute('style');
      }
    }
    resizeBlog();
    window.onresize = debounce(resizeBlog, 300);
  }

  portfolioChooser() {
    // Variables for the tab change and SELECT tag JS
    const portfolioSelector = document.getElementById(
      'portfolio-project-chooser'
    );
    const featuredProjectsDataAttr = 'featured-projects';
    const featuredProjects = document.getElementById(
      `${featuredProjectsDataAttr}-section`
    );
    const allProjects = document.getElementById('all-projects-section');
    const portfolioUpdateText = document.getElementById(
      'portfolio-update-text'
    );
    const portfolioSelectorOptions = document.querySelectorAll(
      '#portfolio-project-chooser > option'
    );
    const h3 = allProjects?.querySelectorAll('h3');
    const li = allProjects?.querySelectorAll('li');

    if (
      !portfolioSelector ||
      !featuredProjects ||
      !allProjects ||
      !portfolioUpdateText ||
      !portfolioSelectorOptions ||
      !h3 ||
      !li
    ) {
      return;
    }

    const showClass = 'show-override';
    const hideClass = 'hide-override';
    const showInlineBlockClass = 'show-inlineblock-override';
    const queryStringSelectedClass = 'hash-selected';
    const queryParamName = 'portfolio';

    const projectCatsArr = Array.from(portfolioSelectorOptions).map(
      (option) => option.dataset.projectCategory
    );

    function showFeaturedProjects() {
      allProjects.classList.remove(showClass);
      allProjects.classList.add(hideClass);
      featuredProjects.classList.remove(hideClass);
      featuredProjects.classList.add(showClass);
      // Select "Featured Projects" or 1st option tag in selector
      portfolioSelectorOptions[0].selected = 'selected';
    }

    function showSelectedProject(selector) {
      featuredProjects.classList.remove(showClass);
      featuredProjects.classList.add(hideClass);
      allProjects.classList.remove(hideClass);
      allProjects.classList.add(showClass);

      h3.forEach((elem) => {
        if (elem.getAttribute('data-project-category') === selector) {
          elem.classList.remove(hideClass);
          elem.classList.add(showClass);
        } else {
          elem.classList.remove(showClass);
          elem.classList.add(hideClass);
        }
      });

      li.forEach((elem) => {
        if (elem.getAttribute('data-project-category') === selector) {
          elem.classList.remove(hideClass);
          elem.classList.add(showInlineBlockClass);
        } else {
          elem.classList.remove(showInlineBlockClass);
          elem.classList.add(hideClass);
        }
      });
    }

    function showHideProjects(selector) {
      if (selector === featuredProjectsDataAttr) {
        showFeaturedProjects();
      } else {
        showSelectedProject(selector);
      }
    }

    const queryStringChange = (getSelectTag) => {
      const url = new URL(window.location.href);
      const queryString = url.searchParams.get(queryParamName);
      let chosenOptionTagVal = '';

      // If loaded page to get a hash and
      // queryString exists in projectCatsArr
      // then execute code below
      if (queryString && projectCatsArr.includes(queryString)) {
        const option = getSelectTag.querySelector(
          `option[data-project-category="${queryString}"]`
        );
        if (option) {
          option.selected = true;
          option.classList.add(queryStringSelectedClass);
        }

        chosenOptionTagVal = option.text;

        showHideProjects(queryString);
      } else {
        showFeaturedProjects();
      }

      // If portfolio update text exists remove it
      portfolioUpdateText.textContent = `Page updated to show ${chosenOptionTagVal} portfolio items`;
    };

    portfolioSelector.addEventListener('change', (e) => {
      const select = e.target;
      const selectedOption = select.options[select.selectedIndex];
      const chosenOptionDataAttr = selectedOption.getAttribute(
        'data-project-category'
      );
      const chosenOptionTagVal = selectedOption.text;

      showHideProjects(chosenOptionDataAttr);

      // Add portfolio update text inside role="alert" DIV
      portfolioUpdateText.textContent = `Page updated to show ${chosenOptionTagVal} portfolio items`;

      const url = new URL(window.location.href);
      url.searchParams.set(queryParamName, chosenOptionDataAttr);
      window.history.pushState({}, '', url);
    });

    queryStringChange(portfolioSelector);

    window.addEventListener('popstate', () => {
      queryStringChange(portfolioSelector);
    });
  }

  decryptEmailPhone() {
    const parentElem = 'site-content-container';
    const emailClassWithAnchorTag = 'email-mj-protect-with-anchor-tag';
    const emailClassNoAnchorTag = 'email-mj-protect-no-anchor-tag';
    const elems = document.querySelectorAll(
      `#${parentElem} .${emailClassWithAnchorTag}, #${parentElem} .${emailClassNoAnchorTag}`
    );
    if (elems.length === 0) return;

    const insecureEncryptionJson = `${document.location.origin}/wp-content/themes/MJ-net-2012/json/insecure-encryption.json`;

    this.getInsecureJsonData(insecureEncryptionJson)
      .then((data) => {
        if (data?.xorKey) {
          const { xorKey } = data;
          elems.forEach((elem) => {
            if (elem.className === emailClassWithAnchorTag) {
              const elemContent = elem.textContent;
              const decryptedText = this.xorDecryptString(elemContent, xorKey);
              const emailLink = document.createElement('a');
              emailLink.setAttribute('href', `mailto:${decryptedText}`);
              emailLink.textContent = decryptedText;
              elem.insertAdjacentElement('beforebegin', emailLink);
              elem.remove();
            } else if (elem.className === emailClassNoAnchorTag) {
              const elemContent = elem.textContent;
              const decryptedText = this.xorDecryptString(elemContent, xorKey);
              const emailLink = document.createElement('span');
              emailLink.textContent = decryptedText;
              elem.insertAdjacentElement('beforebegin', emailLink);
              elem.remove();
            }
          });
        } else {
          throw new Error('Data not found!');
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  async getInsecureJsonData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  hexToBinary(hex) {
    let binary = '';
    for (let i = 0; i < hex.length; i += 2) {
      binary += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return binary;
  }

  xorDecryptString(encryptedString, key) {
    const binaryString = this.hexToBinary(encryptedString);
    let output = '';
    const keyLength = key.length;

    for (let i = 0; i < binaryString.length; i++) {
      output += String.fromCharCode(
        binaryString.charCodeAt(i) ^ key.charCodeAt(i % keyLength) // eslint-disable-line no-bitwise
      );
    }

    return output;
  }
}
