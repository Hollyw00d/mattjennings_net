/****** WordPress Admin JavaScript ******/
(function() {

  jQuery(function($) {

    // Code below executes on "portfoliopost" post type
    // to show "Featured Project?" and "Show Link to Portfolio Project?" SELECT tags
    var featured_project_order_show_hide = $("input[name=featured_project_radio]");
    var portfolio_project_link_show_hide = $("input[name=show_link_to_portfolio_project]");

    if( featured_project_order_show_hide.length > 0 && portfolio_project_link_show_hide.length > 0 ) {

      function show_hide_featured_project_order() {
        // If radio button selected with "Yes"
        featured_project_order_show_hide.change(function() {

          if($(this).val() == '1') {
            $(".featured-project-order-hide").removeClass("featured-project-order-hide").addClass("featured-project-order-show");
          }
          else {
            $(".featured-project-order-show").removeClass("featured-project-order-show").addClass("featured-project-order-hide");
          }
        });

        // If radio button selected with "Yes"
        if( featured_project_order_show_hide.val() == '1' ) {
          $(".featured-project-order-hide").removeClass("featured-project-order-hide").addClass("featured-project-order-show");
        }
      }
      show_hide_featured_project_order();

      function show_hide_featured_project_link() {
        // If radio button selected with "Yes"
        portfolio_project_link_show_hide.change(function() {

          if($(this).val() == '1') {
            $(".project-link-hide").removeClass("project-link-hide").addClass("project-link-show");
          }
          else {
            $(".project-link-show").removeClass("project-link-show").addClass("project-link-hide");
          }
        });

        // If radio button selected with "Yes"
        if( portfolio_project_link_show_hide.val() == '1' ) {
          $(".project-link-hide").removeClass("project-link-hide").addClass("project-link-show");
        }
      }
      show_hide_featured_project_link();
    }

  });

})(jQuery);