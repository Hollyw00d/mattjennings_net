import debounce from 'debounce'; // eslint-disable-line import/no-extraneous-dependencies

export default class FrontEndUtils {
  init() {
    this.sidebar();
    this.portfolioChooser();
    this.decryptEmailPhone();
  }

  sidebar() {
    //  Blog page functions to be called later
    function resizeBlogActions() {
      const blogSiteContentContainer = document.querySelector(
        '.blog-site-content-container'
      );
      const sidebar = document.getElementById('sidebar');
      if (!blogSiteContentContainer || !sidebar) return;

      const windowWidth = window.innerWidth;
      const windowWidth1005 = 1005;
      const sidebarHeight = sidebar.offsetHeight;

      if (windowWidth > windowWidth1005) {
        blogSiteContentContainer.style.minHeight = `${sidebarHeight + 20}px`;
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
