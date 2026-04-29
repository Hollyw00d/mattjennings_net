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
    // Variables for the hash change and SELECT tag JS
    const portfolioSelector = document.getElementById(
      'portfolio-project-chooser'
    );
    if (!portfolioSelector) return;

    const featuredId = document.getElementById('featured-projects-section');
    const showClass = 'show-override';
    const hideClass = 'hide-override';
    const showInlineBlockClass = 'show-inlineblock-override';
    const hashSelectedClass = 'hash-selected';
    const featuredProjectsDataAttr = 'featured-projects';
    const featuredProjects = document.getElementById(
      `${featuredProjectsDataAttr}-section`
    );

    const allProjects = document.getElementById('all-projects-section');
    const portfolioUpdateText = document.getElementById(
      'portfolio-update-text'
    );

    // Push in  values to empty array 'data-project-category' values
    // into empty array
    const projectCatsArr = [];
    const portfolioSelectorOptions = document.querySelectorAll(
      '#portfolio-project-chooser > option'
    );
    portfolioSelectorOptions.forEach((option) =>
      projectCatsArr.push(option.getAttribute('data-project-category'))
    );

    const hashChange = (getSelectTag) => {
      const hash = window.location.hash.slice(1);

      // If loaded page to get a hash and
      // hash exists in projectCatsArr
      // then execute code below
      if (hash && projectCatsArr.includes(hash)) {
        const option = getSelectTag.querySelector(
          `option[data-project-category="${hash}"]`
        );
        if (option) {
          option.selected = true;
          option.classList.add(hashSelectedClass);
        }

        if (hash === featuredProjectsDataAttr) {
          allProjects.classList.remove(showClass);
          featuredProjects.classList.remove(hideClass);
          featuredProjects.classList.add(showClass);
        } else {
          featuredProjects.classList.remove(showClass);
          featuredProjects.classList.add(hideClass);
          allProjects.classList.add(showClass);

          const h3 = allProjects.querySelectorAll(
            `h3[data-project-category=${hash}]`
          );
          const li = allProjects.querySelectorAll(
            `li[data-project-category=${hash}]`
          );

          h3.forEach((elem) => {
            elem.classList.remove(hideClass);
            elem.classList.add(showClass);
          });

          li.forEach((elem) => {
            elem.classList.remove(hideClass);
            elem.classList.add(showInlineBlockClass);
          });
        }
      }
      // Else if hash does not exist in projectCatsArr
      // assign hash to #featured-projects
      else {
        window.location.hash = `#${featuredProjectsDataAttr}`;
      }

      // If portfolio update text exists remove it
      portfolioUpdateText.textContent = '';
    };

    // Portfolio page (front page) code to show and hide project categories AND
    // code runs ONLY if on Portfolio page (front page)
    featuredId.classList.remove(hideClass);
    featuredId.classList.add(showClass);

    portfolioSelector.addEventListener('change', (e) => {
      const select = e.target;
      const selectedOption = select.options[select.selectedIndex];
      const chosenOptionTagDataAttr = selectedOption.getAttribute(
        'data-project-category'
      );
      const chosenOptionTagVal = selectedOption.text;

      if (chosenOptionTagDataAttr !== featuredProjectsDataAttr) {
        if (featuredProjects.classList.contains(showClass)) {
          featuredProjects.classList.remove(showClass);
          featuredProjects.classList.add(hideClass);
        }

        const h3 = allProjects.querySelectorAll('h3');
        const h3Selected = allProjects.querySelectorAll(
          `h3[data-project-category=${chosenOptionTagDataAttr}]`
        );
        const li = allProjects.querySelectorAll('li');
        const liSelected = allProjects.querySelectorAll(
          `li[data-project-category=${chosenOptionTagDataAttr}]`
        );

        h3.forEach((elem) => {
          elem.classList.remove(showClass);
          elem.classList.add(hideClass);
        });

        h3Selected.forEach((elem) => {
          elem.classList.remove(hideClass);
          elem.classList.add(showClass);
        });

        li.forEach((elem) => {
          elem.classList.remove(showInlineBlockClass);
          elem.classList.add(hideClass);
        });

        liSelected.forEach((elem) => {
          elem.classList.remove(hideClass);
          elem.classList.add(showInlineBlockClass);
        });

        window.location.hash = `#${chosenOptionTagDataAttr}`;
      }
      // ELSE 'featured-projects' OPTION tag IS CHOSEN  then
      // ONLY display 'Featured Projects' portfolio item
      else {
        if (featuredProjects.classList.contains(hideClass)) {
          featuredProjects.classList.remove(hideClass);
          featuredProjects.classList.add(showClass);
        }

        allProjects.querySelector('li').classList.remove(showInlineBlockClass);
        allProjects.querySelector('li').classList.add(hideClass);

        window.location.hash = `#${featuredProjectsDataAttr}`;
      }

      // Add portfolio update text inside role="alert" DIV
      portfolioUpdateText.textContent = `Page updated to show ${chosenOptionTagVal} portfolio items`;
    });

    const getHashChange = hashChange(portfolioSelector);
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
