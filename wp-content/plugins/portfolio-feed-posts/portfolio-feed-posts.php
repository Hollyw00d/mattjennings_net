<?php
/**
 * Plugin Name: Portfolio Feed Posts
 * Plugin URI: http://www.mattjennings.net/
 * Description: Plugin displays Portfolio Feed custom post types.
 * Author: Matt Jennings
 * Author URI: http://www.mattjennings.net/
 * Version: 0.0.1
 * License: GPLv2
 */
// Exit if accessed directly
if(!defined('ABSPATH')) {
  exit;
}


/******
 * Portfolio Feed Category Heading Type START
 ******/

function portfolio_feed_heading_post_type() {
  $singular = 'Portfolio - Headings';
  $plural = $singular;
  $labels = array(
        'name'                  => $plural,
        'singular_name'         => $singular,
        'add_name'              => 'Add New',
        'add_new_item'          => 'Add New ' . $singular,
        'edit'                  => 'Edit',
        'edit_item'             => 'Edit ' . $singular,
        'new_item'              => 'New ' . $singular,
        'view'                  => 'View ' . $singular,
        'view_item'             => 'View' . $singular,
        'search_term'           => 'Search ' . $plural,
        'parent'                => 'Parent ' . $singular,
        'not_found'             => 'No ' . $plural . ' found',
        'not_found_in_trash'    => 'No ' . $plural . ' in Trash'
  );
  $args = array(
        'labels'                => $labels,
        'public'                => false,
        'publicly_queryable'    => false,
        'exclude_from_search'   => true,
        'show_in_nav_menus'     => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_admin_bar'     => true,
        'menu_position'         => 50,
        'menu_icon'             => 'dashicons-universal-access-alt',
        'can_export'            => true,
        'delete_with_user'      => false,
        'hierarchical'          => false,
        'has_archive'           => false,
        'query_var'             => true,
        'capability_type'       => 'post',
        'map_meta_cap'          => true,
        'rewrite'               => array(
              'slug'                  => 'portfolio-feed-heading',
              'with_front'            => true,
              'pages'                 => true,
              'feeds'                 => true
        ),
        'supports'              => array(
              'title'
        )
  );
  register_post_type('portfolioheading', $args);
}
add_action('init', 'portfolio_feed_heading_post_type');

function portfolio_feed_heading_add_meta_box() {
  add_meta_box(
        'portfolio_feed_heading_id',
        __( 'Get Involved Page Heading Slug', 'portfolio_feed_heading_plugin' ),
        'portfolio_feed_heading_meta_box_callback',
        'portfolioheading'
  );
}

function portfolio_feed_heading_meta_box_callback($post) {

  wp_nonce_field( 'portfolio_feed_heading_save_meta_box_data', 'portfolio_feed_heading_meta_box_nonce' );

  echo '<p><label for="portfolio_feed_post_name">Post Slug (like "php-and-mysql")</label><br /><strong>NOTE: Do NOT enter any text in this field. It will auto-populate!</strong><br /><input type="text" name="portfolio_feed_post_name" value="' . $post->post_name . '" class="per100" /></p>';
}

add_action( 'add_meta_boxes', 'portfolio_feed_heading_add_meta_box' );

function portfolio_feed_heading_save_meta_box_data( $post_id ) {

  if ( !isset($_POST['portfolio_feed_heading_meta_box_nonce']) ) {
    return;
  }

  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
    return;
  }

  if ( ! current_user_can( 'edit_post', $post_id ) ) {
    return;
  }
}

add_action( 'save_post', 'portfolio_feed_heading_save_meta_box_data' );

/******
 * Portfolio Feed Category Heading Type END
 ******/


/******
 * Portfolio Feed Category Post Type START
 ******/

function portfolio_feed_posts_post_type() {
  $singular = 'Portfolio - Projects&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
  $plural = $singular;
  $labels = array(
        'name'                  => $plural,
        'singular_name'         => $singular,
        'add_name'              => 'Add New',
        'add_new_item'          => 'Add New ' . $singular,
        'edit'                  => 'Edit',
        'edit_item'             => 'Edit ' . $singular,
        'new_item'              => 'New ' . $singular,
        'view'                  => 'View ' . $singular,
        'view_item'             => 'View' . $singular,
        'search_term'           => 'Search ' . $plural,
        'parent'                => 'Parent ' . $singular,
        'not_found'             => 'No ' . $plural . ' found',
        'not_found_in_trash'    => 'No ' . $plural . ' in Trash'
  );
  $args = array(
        'labels'                => $labels,
        'public'                => true,
        'publicly_queryable'    => true,
        'exclude_from_search'   => false,
        'show_in_nav_menus'     => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'show_in_admin_bar'     => true,
        'menu_position'         => 50,
        'menu_icon'             => 'dashicons-universal-access-alt',
        'can_export'            => true,
        'delete_with_user'      => false,
        'hierarchical'          => false,
        'has_archive'           => false,
        'query_var'             => true,
        'capability_type'       => 'post',
        'map_meta_cap'          => true,
        'rewrite'               => array(
              'slug'                  => 'portfolio-feed',
              'with_front'            => true,
              'pages'                 => true,
              'feeds'                 => true
        ),
        'supports'              => array(
              'title',
              'thumbnail'
        )
  );
  register_post_type('portfoliopost', $args);
}
add_action('init', 'portfolio_feed_posts_post_type');

function portfolio_feed_posts_add_meta_box() {
  add_meta_box(
        'portfolio_feed_posts_id',
        __( 'Portfolio Project Details', 'portfolio_feed_posts_plugin' ),
        'portfolio_feed_posts_meta_box_callback',
        'portfoliopost'
  );
}

function portfolio_feed_posts_meta_box_callback($post) {

  wp_nonce_field( 'portfolio_feed_posts_save_meta_box_data', 'portfolio_feed_posts_meta_box_nonce' );

  $featured_project_radio_value = get_post_meta($post->ID, '_featured_project_radio', true);
  $portfolio_project_category_value = get_post_meta($post->ID, '_portfolio_project_category', true);
  $portfolio_project_thumbnail_summary_line_1_value = get_post_meta($post->ID, '_portfolio_project_thumbnail_summary_line_1', true);
  $portfolio_project_thumbnail_summary_line_2_value = get_post_meta($post->ID, '_portfolio_project_thumbnail_summary_line_2', true);
  $portfolio_project_thumbnail_summary_line_3_value = get_post_meta($post->ID, '_portfolio_project_thumbnail_summary_line_3', true);
  $show_link_to_portfolio_project_radio_value = get_post_meta($post->ID, '_show_link_to_portfolio_project', true);
  $portfolio_project_link_value = get_post_meta($post->ID, '_portfolio_project_link', true);
  $portfolio_project_link_text_value = get_post_meta($post->ID, '_portfolio_project_link_text', true);
  $project_role_title_value = get_post_meta($post->ID, '_project_role_title', true);
  $project_role_name_value = get_post_meta($post->ID, '_project_role_name', true);

  $featured_project_radio = '<p>Featured Project? <strong>(required)</strong><br /><input type="radio" name="featured_project_radio" id="' . $post->ID . '" value="1"';
  $featured_project_radio .= ($featured_project_radio_value == 1) ? 'checked="checked"' : '';
  $featured_project_radio .= ' />';
  $featured_project_radio .= '<label name="featured_project_radio">Yes</label><br />';
  $featured_project_radio .= '<input type="radio" name="featured_project_radio" id="' . $post->ID . '" value="0"';
  $featured_project_radio .= ($featured_project_radio_value == 0) ? 'checked="checked"' : '';
  $featured_project_radio .= '<label name="featured_project_radio">No</label><br /></p>';
  echo $featured_project_radio;

  // Class that contains methods to talk to MySQL DB
  global $wpdb;

  // Function for OPTION tags that go inside a SELECT tag
  function option_tags($min, $max, $database_value) {
    for($counter = $min; $counter <= $max; $counter++) {
      $option_tag = '<option value="' . $counter . '"';
      $option_tag .= ($counter == $database_value) ? ' selected="selected"' : '';
      $option_tag .= '>' . $counter . '</option>';
      echo $option_tag;
    }
  }

  // Selected featured project order
  $selected_featured_project_order = $wpdb->get_var( "SELECT meta_value FROM " . $wpdb->prefix . "postmeta" . " WHERE meta_key = '_featured_project_order' AND post_id = " . $post->ID );

  // Featured project order
  echo '<p class="featured-project-order-hide">Featured Project Order <strong>(ONLY if a featured project - required)</strong><br /><select name="featured_project_order">';
  option_tags(1, 10, $selected_featured_project_order);
  echo '</select></p>';

  $portfolio_project_category_args = array(
        'post_type'         => 'portfolioheading',
        'orderby'           => 'title',
        'order'             => 'ASC',
        'posts_per_page'    => -1
  );
  $portfolio_project_category_lib_query = new WP_Query($portfolio_project_category_args);
  echo '<p>Choose Project Category <strong>(required)</strong><br /><select name="portfolio_project_category">';
  if($portfolio_project_category_lib_query->have_posts()) {
    while ($portfolio_project_category_lib_query->have_posts()) : $portfolio_project_category_lib_query->the_post();

      $portfolio_project_category_slug_and_title = get_post_field( 'post_name', get_post()) . '&' . get_the_title();

      $portfolio_project_category_drop_down = '<option value="' . $portfolio_project_category_slug_and_title . '"';
      $portfolio_project_category_drop_down .= ($portfolio_project_category_slug_and_title == $portfolio_project_category_value) ? ' selected="selected"' : '';
      $portfolio_project_category_drop_down .= '>' . get_the_title() . '</option>';
      echo $portfolio_project_category_drop_down;

    endwhile;
    wp_reset_postdata();
  }
  echo '</select><br /><br /></p>';

  // Non-Featured project order
  $selected_non_featured_project_order = $wpdb->get_var( "SELECT meta_value FROM " . $wpdb->prefix . "postmeta" . " WHERE meta_key = '_non_featured_project_order' AND post_id = " . $post->ID );

  echo '<p>Non-Featured Project Order <strong>(required)</strong><br /><select name="non_featured_project_order">';
  option_tags(1, 10, $selected_non_featured_project_order);
  echo '</select></p>';

  echo '<p><label for="portfolio_project_thumbnail_summary_line_1">Portfolio Project Thumbnail Summary ---> Line 1<strong><br /><em>(like "MP Ministry Wedding" - optional)</em></strong></label><br /><input type="text" name="portfolio_project_thumbnail_summary_line_1" id="' . $post->ID . '" value="' . $portfolio_project_thumbnail_summary_line_1_value . '" class="per70" /></p>';

  echo '<p><label for="portfolio_project_thumbnail_summary_line_2">Portfolio Project Thumbnail Summary ---> Line 2<strong><br /><em>(like "Officiating Website Helps" - optional)</em></strong></label><br /><input type="text" name="portfolio_project_thumbnail_summary_line_2" id="' . $post->ID . '" value="' . $portfolio_project_thumbnail_summary_line_2_value . '" class="per70" /></p>';

  echo '<p><label for="portfolio_project_thumbnail_summary_line_3">Portfolio Project Thumbnail Summary ---> Line 3<strong><br /><em>(like "Couples Get Married" - optional)</em></strong></label><br /><input type="text" name="portfolio_project_thumbnail_summary_line_3" id="' . $post->ID . '" value="' . $portfolio_project_thumbnail_summary_line_3_value . '" class="per70" /></p>';

  // $project_summary below creates a WYSIWYG WordPress edit box
  $project_summary = get_post_meta( $post->ID, '_project_summary', true);
  echo '<p>Project Summary<br /><strong>(like "Mark Prusinowski is a wedding officiant..." - required)</strong></p>';
  echo wp_editor( $project_summary, 'project_summary', array( 'textarea_name' => 'project_summary', 'editor_height' => 250 ) ) . '<br />';

  $show_link_to_portfolio_project_radio = '<p>Show Link to Portfolio Project? <strong>(required)</strong><br /><input type="radio" name="show_link_to_portfolio_project" id="' . $post->ID . '" value="1"';
  $show_link_to_portfolio_project_radio .= ($show_link_to_portfolio_project_radio_value == 1) ? 'checked="checked"' : '';
  $show_link_to_portfolio_project_radio .= ' />';
  $show_link_to_portfolio_project_radio .= '<label name="show_link_to_portfolio_project">Yes</label><br />';
  $show_link_to_portfolio_project_radio .= '<input type="radio" name="show_link_to_portfolio_project" id="' . $post->ID . '" value="0"';
  $show_link_to_portfolio_project_radio .= ($show_link_to_portfolio_project_radio_value == 0) ? ' checked="checked"' : '';
  $show_link_to_portfolio_project_radio .= '<label name="show_link_to_portfolio_project">No</label><br /></p>';
  echo $show_link_to_portfolio_project_radio;

  echo '<p class="project-link-hide"><label for="portfolio_project_link">Portfolio Project Link <strong><em>(optional)</em></strong></label><br /><input type="text" name="portfolio_project_link" id="' . $post->ID . '" value="' . $portfolio_project_link_value . '" class="per100" /></p>';

  echo '<p class="project-link-hide"><label for="portfolio_project_link_text">Portfolio Project Link Text <strong><em>(like "See MPMinistry.com" - optional)</em></strong></label><br /><input type="text" name="portfolio_project_link_text" id="' . $post->ID . '" value="' . $portfolio_project_link_text_value . '" class="per100" /></p>';

  echo '<p><label for="project_role_title">Project Role Title <strong>(like "Web Developer" - required)</strong></label><br /><input type="text" name="project_role_title" id="' . $post->ID . '" value="' . $project_role_title_value . '" class="per100" /></p>';

  echo '<p><label for="project_role_name">Project Role Name <strong>(like "Matt Jennings." - required)</strong></label><br /><input type="text" name="project_role_name" id="' . $post->ID . '" value="' . $project_role_name_value . '" class="per100" /></p>';

  // $technologies_used below creates a WYSIWYG WordPress edit box
  $technologies_used = get_post_meta( $post->ID, '_technologies_used', true);
  echo '<p>Technologies Used<br /><strong>(like "PHP, CSS, and HTML." - required) and Screenshots (optional and must be 270 px wide, height variable, and centered)</strong></p>';
  echo wp_editor( $technologies_used, 'technologies_used', array( 'textarea_name' => 'technologies_used', 'editor_height' => 300 ) ) . '<br />';
}

add_action( 'add_meta_boxes', 'portfolio_feed_posts_add_meta_box' );

function portfolio_feed_posts_save_meta_box_data( $post_id ) {

  if ( !isset($_POST['portfolio_feed_posts_meta_box_nonce']) ) {
    return;
  }

  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
    return;
  }

  if ( ! current_user_can( 'edit_post', $post_id ) ) {
    return;
  }

  if ( !isset($_POST['project_summary']) && !isset($_POST['show_link_to_portfolio_project']) && !isset($_POST['project_role_title']) && !isset($_POST['project_role_name']) ) {
    return;
  }

  $data_featured_project_radio = sanitize_text_field( $_POST['featured_project_radio'] );
  $data_featured_project_order = sanitize_text_field( $_POST['featured_project_order'] );
  $data_portfolio_project_category = sanitize_text_field( $_POST['portfolio_project_category'] );
  $data_non_featured_project_order = sanitize_text_field( $_POST['non_featured_project_order'] );
  $data_portfolio_project_thumbnail_summary_line_1 = sanitize_text_field( $_POST['portfolio_project_thumbnail_summary_line_1'] );
  $data_portfolio_project_thumbnail_summary_line_2 = sanitize_text_field( $_POST['portfolio_project_thumbnail_summary_line_2'] );
  $data_portfolio_project_thumbnail_summary_line_3 = sanitize_text_field( $_POST['portfolio_project_thumbnail_summary_line_3'] );
  $data_project_summary = $_POST['project_summary'];
  $data_show_link_to_portfolio_project = sanitize_text_field( $_POST['show_link_to_portfolio_project'] );
  $data_portfolio_project_link = sanitize_text_field( $_POST['portfolio_project_link'] );
  $data_portfolio_project_link_text = sanitize_text_field( $_POST['portfolio_project_link_text'] );
  $data_project_role_title = sanitize_text_field( $_POST['project_role_title'] );
  $data_project_role_name = sanitize_text_field( $_POST['project_role_name'] );
  $data_technologies_used = $_POST['technologies_used'];

  update_post_meta( $post_id, '_featured_project_radio', $data_featured_project_radio );
  update_post_meta( $post_id, '_featured_project_order', $data_featured_project_order );
  update_post_meta( $post_id, '_portfolio_project_category', $data_portfolio_project_category );
  update_post_meta( $post_id, '_non_featured_project_order', $data_non_featured_project_order );


  update_post_meta( $post_id, '_portfolio_project_thumbnail_summary_line_1', $data_portfolio_project_thumbnail_summary_line_1 );

  update_post_meta( $post_id, '_portfolio_project_thumbnail_summary_line_2', $data_portfolio_project_thumbnail_summary_line_2 );

  update_post_meta( $post_id, '_portfolio_project_thumbnail_summary_line_3', $data_portfolio_project_thumbnail_summary_line_3 );


  update_post_meta( $post_id, '_project_summary', $data_project_summary );
  update_post_meta( $post_id, '_show_link_to_portfolio_project', $data_show_link_to_portfolio_project );
  update_post_meta( $post_id, '_portfolio_project_link', $data_portfolio_project_link );
  update_post_meta( $post_id, '_portfolio_project_link_text', $data_portfolio_project_link_text );
  update_post_meta( $post_id, '_project_role_title', $data_project_role_title );
  update_post_meta( $post_id, '_project_role_name', $data_project_role_name );
  update_post_meta( $post_id, '_technologies_used', $data_technologies_used );
}

add_action( 'save_post', 'portfolio_feed_posts_save_meta_box_data' );

/******
 * Portfolio Feed Category Post Type END
 ******/