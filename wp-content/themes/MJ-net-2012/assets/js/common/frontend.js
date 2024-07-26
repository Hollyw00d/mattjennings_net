import $ from 'jquery'; // eslint-disable-line import/no-extraneous-dependencies
import debounce from 'debounce'; // eslint-disable-line import/no-extraneous-dependencies

export default class FrontEndUtils {
  init() {
    const isVertificalScrollbarActions = () => {
      const toTopParagraph = document.getElementById('to-top');

      const pageHasVerticalScrollbar =
        document.body.offsetHeight > window.innerHeight;

      if (pageHasVerticalScrollbar) {
        toTopParagraph.classList.remove('hide-override');
      } else {
        toTopParagraph.classList.add('hide-override');
      }
    };

    this.sidebar();
    this.youtubeEmbedResize();
    this.portfolioChooser(isVertificalScrollbarActions);
    this.toTopLink(isVertificalScrollbarActions);
    this.twitterQuotes();
  }

  sidebar() {
    //  Blog page functions to be called later
    function resizeBlogActions() {
      const blogSiteContentContainer = document.querySelector(
        '.blog-site-content-container'
      );
      if (blogSiteContentContainer.length === 0) return;

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

  youtubeEmbedResize() {
    const youtubeResponsive = $('.youtube-responsive');
    if (youtubeResponsive.length === 0) return;

    // Function to make YouTube embeds responsive
    const youtubeEmbedResponsive = (event) => {
      $('#site-content-container')
        .find(event.currentTarget)
        .wrap('<div class="youtube-responsive-container"></div>');
    };

    // Call to execute make_youtubeEmbedResponsive() on .youtube-responsive class
    if (youtubeResponsive.length > 0) {
      youtubeResponsive.each(youtubeEmbedResponsive);
    }
  }

  portfolioChooser(isVertificalScrollbarActions) {
    // Variables for the hash change and SELECT tag JS
    const portfolioProjectChooser = $('#portfolio-project-chooser');
    if (portfolioProjectChooser.length === 0) return;

    const showOverrideClass = 'show-override';
    const hideOverrideClass = 'hide-override';
    const hashSelectedClass = 'hash-selected';
    const featuredProjectsDataAttr = 'featured-projects';
    const featuredProjectsSection = $(`#${featuredProjectsDataAttr}-section`);
    const allProjectsSection = $('#all-projects-section');
    const portfolioUpdateText = $('#portfolio-update-text');

    // Push in  values to empty array 'data-project-category' values
    // into empty array
    const allDataProjectCategoryValuesArr = [];
    $('#portfolio-project-chooser > option').each((iterator, item) => {
      allDataProjectCategoryValuesArr.push($(item).data('project-category'));
    });

    // Show featured items only
    const showFeatured = (featuredId) => {
      $(featuredId).removeClass(hideOverrideClass).addClass(showOverrideClass);
    };

    const hashChange = (getSelectTag) => {
      const hash = window.location.hash.slice(1);

      // If loaded page to get a hash and
      // hash exists in allDataProjectCategoryValuesArr
      // then execute code below
      if (hash && $.inArray(hash, allDataProjectCategoryValuesArr) !== -1) {
        getSelectTag
          .find(`option[data-project-category=${hash}]`)
          .prop('selected', 'selected')
          .addClass(hashSelectedClass);

        if (hash === featuredProjectsDataAttr) {
          allProjectsSection.removeClass(showOverrideClass);
          featuredProjectsSection
            .removeClass(hideOverrideClass)
            .addClass(showOverrideClass);
        } else {
          featuredProjectsSection
            .removeClass(showOverrideClass)
            .addClass(hideOverrideClass);
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
      // Else if hash does not exist in allDataProjectCategoryValuesArr
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
          if (featuredProjectsSection.hasClass(showOverrideClass)) {
            featuredProjectsSection
              .removeClass(showOverrideClass)
              .addClass(hideOverrideClass);
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
            featuredProjectsSection
              .removeClass(hideOverrideClass)
              .addClass(showOverrideClass);
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

        // If on change event scrollbar area is high enough
        // show scrollbar if not hide scrollbar
        // on project chooser change
        isVertificalScrollbarActions();
      });

      const getHashChange = hashChange(portfolioProjectChooser);

      $(window).on('hashchange', getHashChange);
    }
  }

  toTopLink(isVertificalScrollbarActions) {
    const toTopLink = document.getElementById('to-top-link') ?? null;
    if (toTopLink) {
      toTopLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    isVertificalScrollbarActions();

    $(window).on('resize', isVertificalScrollbarActions);
  }

  twitterQuotes() {
    // Make quotes click to Tweet
    const twitterQuotesToClick = () => {
      // Get quote to add to Twitter from
      // 'blockquote' tag
      const $postQuote = $('blockquote');
      const postQuoteText = $postQuote.text();
      const postQuoteTextNoSpaces = postQuoteText.replace(/ /g, '%20');

      let twitterHashtagsTextNoHashes;

      if ($('#twitter-hashtags').length > 0) {
        const twitterHashtagsText = $('#twitter-hashtags').text();
        const twitterHashtagsTextReplace = twitterHashtagsText
          .replace(/#/g, '%23')
          .replace(/ /g, '%20');

        twitterHashtagsTextNoHashes = `%20${twitterHashtagsTextReplace}%20`;
      } else {
        twitterHashtagsTextNoHashes = '%20';
      }

      $postQuote.wrap(
        `<a class="no-link-underline" onclick="window.open('https://twitter.com/intent/tweet?text=${postQuoteTextNoSpaces}${twitterHashtagsTextNoHashes}${window.location}', '_blank', 'width=500,height=500'); return false;" href="#"></a>"`
      );
      $postQuote.prepend(
        '<span class="dashicons dashicons-format-quote twitter-blue"></span>'
      );
      $postQuote.append(
        '<p class="click-to-tweet twitter-blue"><i class="fa fa-twitter" style="padding-right: 5px;"></i>Click to Tweet</p>'
      );
    };

    // Run click to Tweet twitter code
    // ONLY if a 'blockquote' tag is found on website
    if ($('blockquote').length > 0) {
      twitterQuotesToClick();
    }
  }
}
