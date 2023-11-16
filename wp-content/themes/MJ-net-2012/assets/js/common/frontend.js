// Wrap code in variable to make private
const Module = (() => {
  // 'pageHasVerticalScrollbar' displays true when page has vertical scrollbar
  // and false when page doesn't have vertical scrollbar
  const findOutIfPageHasVerticalScrollBar = () => {
    const $toTopParagraph = jQuery('#to-top');

    const pageHasVerticalScrollbar =
      jQuery('body').height() > window.innerHeight;

    if (pageHasVerticalScrollbar) {
      $toTopParagraph.removeClass('hide-override');
    } else {
      $toTopParagraph.addClass('hide-override');
    }
  };

  const sidebarOnBlogPagePrivate = () => {
    const blogSiteContentContainer = jQuery('.blog-site-content-container');
    const windowWidth = jQuery(window).width();
    const windowWidth1005 = 1005;
    let sideBarHeight = jQuery('#sidebar').height();
    let mobileSize = '';

    //  Blog page functions to be called later
    const makeSidebarFitInsideDivOnBlogPagesDocumentReady = () => {
      if (windowWidth > windowWidth1005 && !mobileSize) {
        blogSiteContentContainer.css('min-height', `${sideBarHeight}20px`);
      } else if (windowWidth <= windowWidth1005 && mobileSize) {
        blogSiteContentContainer.removeAttr('min-height');
      }
    };

    const blogPageSidebarResize = () => {
      if (windowWidth > windowWidth1005) {
        sideBarHeight = jQuery('#sidebar').height();
        blogSiteContentContainer.css('min-height', `${sideBarHeight}20px`);
      }

      if (windowWidth <= windowWidth1005) {
        sideBarHeight = jQuery('#sidebar').height();
        blogSiteContentContainer.css('min-height', `${sideBarHeight}20px`);
        blogSiteContentContainer.removeAttr('min-height');
      }
    };

    // If on Blog page, single post, category page, search page, archive page
    // create window width variable
    if (blogSiteContentContainer.length > 0) {
      if (windowWidth > windowWidth1005) {
        mobileSize = false;
      } else if (windowWidth <= windowWidth1005) {
        mobileSize = true;
      }

      makeSidebarFitInsideDivOnBlogPagesDocumentReady();

      // Window resize event
      jQuery(window).resize(blogPageSidebarResize);
    }
  };

  const youtubeEmbedResizePrivate = () => {
    // Function to make YouTube embeds responsive
    const youtubeEmbedResponsive = (event) => {
      jQuery('#site-content-container')
        .find(event.currentTarget)
        .wrap('<div class="youtube-responsive-container"></div>');
    };

    const youtubeResponsive = jQuery('.youtube-responsive');

    // Call to execute make_youtubeEmbedResponsive() on .youtube-responsive class
    if (youtubeResponsive.length > 0) {
      youtubeResponsive.each(youtubeEmbedResponsive);
    }
  };

  const portfolioChooserPrivate = () => {
    // Variables for the hash change and SELECT tag JS
    const showOverrideClass = 'show-override';
    const hideOverrideClass = 'hide-override';
    const hashSelectedClass = 'hash-selected';
    const featuredProjectsDataAttr = 'featured-projects';
    const featuredProjectsSection = jQuery(
      `#${featuredProjectsDataAttr}-section`
    );
    const allProjectsSection = jQuery('#all-projects-section');
    const portfolioProjectChooser = jQuery('#portfolio-project-chooser');
    const portfolioUpdateText = jQuery('#portfolio-update-text');

    // Push in  values to empty array 'data-project-category' values
    // into empty array
    const allDataProjectCategoryValuesArr = [];
    jQuery('#portfolio-project-chooser > option').each((iterator, item) => {
      allDataProjectCategoryValuesArr.push(
        jQuery(item).data('project-category')
      );
    });

    // Show featured items only
    const showFeatured = (featuredId) => {
      jQuery(featuredId)
        .removeClass(hideOverrideClass)
        .addClass(showOverrideClass);
    };

    const hashChange = (getSelectTag) => {
      const hash = window.location.hash.slice(1);

      // If loaded page to get a hash and
      // hash exists in allDataProjectCategoryValuesArr
      // then execute code below
      if (
        hash &&
        jQuery.inArray(hash, allDataProjectCategoryValuesArr) !== -1
      ) {
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
    if (jQuery('body.home').length > 0) {
      showFeatured('#featured-projects-section');

      portfolioProjectChooser.on('change', (event) => {
        const chosenOptionTagDataAttr = jQuery(event.currentTarget)
          .find('option:selected')
          .attr('data-project-category');
        const chosenOptionTagVal = jQuery(event.currentTarget)
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
        findOutIfPageHasVerticalScrollBar();
      });

      const getHashChange = hashChange(portfolioProjectChooser);

      jQuery(window).on('hashchange', getHashChange);
    }
  };

  const toTopLinkPrivate = () => {
    // If the #to-top-link anchor tag exists
    // execute scroll to top of page function
    const $toTopLink = jQuery('#to-top-link');

    if ($toTopLink.length > 0) {
      $toTopLink.on('click', (e) => {
        e.preventDefault();
        jQuery('html, body').animate(
          {
            scrollTop: 0
          },
          700
        );
      });
    }

    findOutIfPageHasVerticalScrollBar();

    jQuery(window).on('resize', findOutIfPageHasVerticalScrollBar);
  };

  // Make quotes click to Tweet
  const twitterQuotesToClick = () => {
    // Get quote to add to Twitter from
    // 'blockquote' tag
    const $postQuote = jQuery('blockquote');
    const postQuoteText = $postQuote.text();
    const postQuoteTextNoSpaces = postQuoteText.replace(/ /g, '%20');

    let twitterHashtagsTextNoHashes;

    if (jQuery('#twitter-hashtags').length > 0) {
      const twitterHashtagsText = jQuery('#twitter-hashtags').text();
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

  const twitterQuotes = () => {
    // Run click to Tweet twitter code
    // ONLY if a 'blockquote' tag is found on website
    if (jQuery('blockquote').length > 0) {
      twitterQuotesToClick();
    }
  };

  const publicMethod = () => {
    sidebarOnBlogPagePrivate();
    youtubeEmbedResizePrivate();
    portfolioChooserPrivate();
    toTopLinkPrivate();
    twitterQuotes();
  };

  return {
    publicMethod
  };
})();

export default Module;
