<?php
/*
Template Name: Portfolio Template
*/
?>
<?php get_header(); ?>

  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

    <?php the_content(); ?>

  <?php endwhile; endif; ?>

  <hr class="clear" />

  <div>
    <div id="choose-project-categories">

        <h2 class="clear"><label for="portfolio-project-chooser">Choose Portfolio Project Category</label></h2>

      <div id="portfolio-update-text" class="show-screenreader-only" role="alert" aria-live="polite"></div>

      <select name="portfolio-project-chooser" id="portfolio-project-chooser">
        <?php
        // Category Chooser START
        $category_chooser_args = array(
              'post_type'         => 'portfoliopost',
              'orderby'           => 'meta_value',
              'meta_key'          => '_portfolio_project_category',
              'order'             => 'ASC',
              'posts_per_page'    => -1
        );
        $category_chooser_lib_query = new WP_Query($category_chooser_args);

        if($category_chooser_lib_query->have_posts()) {

          // Arrays to store portfolio category data attribute values
          // and headings that are NOT duplicates
          $unique_category_chooser_data_attr = array();
          $category_chooser_link = array();

          $category_chooser_counter = 0;
          $category_chooser_posts_count = $category_chooser_lib_query->post_count;

          while ($category_chooser_lib_query->have_posts()) : $category_chooser_lib_query->the_post();
            $category_chooser_link_text = substr( strstr( get_post_meta($post->ID, '_portfolio_project_category', true), '&' ), 1 );
            $category_chooser_data_attr = strstr( get_post_meta($post->ID, '_portfolio_project_category', true), '&', true );

            $category_chooser_counter++;

            // If not in $category_chooser_data_attr value is NOT in
            // $unique_category_chooser_data_attr array insert it and
            // do the same for $category_chooser_link
            if( !in_array( $category_chooser_data_attr, $unique_category_chooser_data_attr )):
              $unique_category_chooser_data_attr[] =  $category_chooser_data_attr;
            endif;

            if( !in_array( $category_chooser_link_text, $category_chooser_link )):
              $category_chooser_link[] =  $category_chooser_link_text;
            endif;
            ?>
            <?php
            // If last post
            if( $category_chooser_posts_count == $category_chooser_counter ):

              echo '<option data-project-category="featured-projects">Featured Projects</option>';

              $category_chooser_attr_and_headings = array_combine($unique_category_chooser_data_attr, $category_chooser_link);

              // Foreach loop to display portfolio category data attr
              // and headings
              foreach($category_chooser_attr_and_headings as $key => $value):
              ?>
                <option data-project-category="<?php echo $key; ?>"><?php echo $value; ?></option>
              <?php
              endforeach;
            endif;

          endwhile;
          wp_reset_postdata();
        }
        // Category Chooser END
        ?>
      </select>

    </div>

    <div id="featured-projects-section" class="show-override">
      <h3 class="clear">Featured Projects</h3>

      <ul class="portfolio-list">
        <?php
        // Portfolio Feed Featured Project Posts Custom Post Type START
        $featured_portfolio_posts_args = array(
              'post_type'         => 'portfoliopost',
              'orderby'           => 'meta_value',
              'meta_key'          => '_featured_project_order',
              'order'             => 'ASC',
              'posts_per_page'    => -1
        );

        $featured_portfolio_posts_lib_query = new WP_Query($featured_portfolio_posts_args);

        if($featured_portfolio_posts_lib_query->have_posts()) {
          while ($featured_portfolio_posts_lib_query->have_posts()) : $featured_portfolio_posts_lib_query->the_post();

            $featured_portfolio_category = strstr( get_post_meta($post->ID, '_portfolio_project_category', true), '&', true );

            // If Jetpack file exists of /wp-content/plugins/jetpack/functions.photon.php
            // require_once functions.photon.php
            // to use jetpack_photon_url function
            // and serve up images sped up by Jetpack CDN
            if(file_exists(ABSPATH . '/wp-content/plugins/jetpack/functions.photon.php')) {
	            require_once( ABSPATH . '/wp-content/plugins/jetpack/functions.photon.php' );
            }

            // If jetpack_photon_url function exists from require_once(...functions.photon.php) above
            // then use jetpack_photon_url function to make images optimized for Jetpack
            if( function_exists('jetpack_photon_url') ) {
              // Args for Jetpack (adds width and height to image string)
              $jetpack_image_url_args = array(
                      'w' => '200',
                      'h' => '125'
              );

              // Assign Jetpack scheme null
              $jetpack_image_url_scheme = null;

              $image_thumbnail = jetpack_photon_url( str_replace(array('local.', 'staging.'), 'www.', get_the_post_thumbnail_url()), $jetpack_image_url_args, $jetpack_image_url_scheme);
            }
            // Else jetpack_photon_url function doesn't exist
            // serve up get_the_post_thumbnail_url() NOT optimized by Jetpack CDN
            else {
	            $image_thumbnail = get_the_post_thumbnail_url();
            }
        ?>
            <?php // Show featured projects only ?>
            <?php if( get_post_meta($post->ID, '_featured_project_radio', true) ): ?>
              <li class="featured-project<?php echo get_post_meta($post->ID, '_featured_project_order', true); ?>" data-featured-project-category="<?php echo $featured_portfolio_category; ?>"><a href="<?php the_permalink(); ?>"><img src="<?php echo $image_thumbnail; ?>" alt="<?php the_title(); ?>" width="200" height="125" /><br /><?php echo get_post_meta($post->ID, '_portfolio_project_thumbnail_summary_line_1', true); ?><br /><?php echo get_post_meta($post->ID, '_portfolio_project_thumbnail_summary_line_2', true); ?><br /><?php echo get_post_meta($post->ID, '_portfolio_project_thumbnail_summary_line_3', true); ?></a></li>
            <?php endif; ?>
        <?php
          endwhile;
          wp_reset_postdata();
        }
        // Portfolio Feed Featured Project Posts Custom Post Type END
        ?>
      </ul>
    </div><?php // #featured-projects-section END ?>

    <div id="all-projects-section">
      <?php
      // Portfolio Post Categories START
      $portfolio_posts_categories_args = array(
            'post_type'         => 'portfoliopost',
            'orderby'           => 'meta_value',
            'meta_key'          => '_portfolio_project_category',
            'order'             => 'ASC',
            'posts_per_page'    => -1
      );
      $portfolio_posts_categories_lib_query = new WP_Query($portfolio_posts_categories_args);

      if($portfolio_posts_categories_lib_query->have_posts()) {

        // Arrays to store portfolio category data attribute values
        // and headings that are NOT duplicates
        $unique_portfolio_posts_categories_data_attr = array();
        $unique_portfolio_headings = array();

        $portfolio_categories_counter = 0;
        $portfolio_category_posts_count = $portfolio_posts_categories_lib_query->post_count;

        while ($portfolio_posts_categories_lib_query->have_posts()) : $portfolio_posts_categories_lib_query->the_post();
          $portfolio_category_heading = substr( strstr( get_post_meta($post->ID, '_portfolio_project_category', true), '&' ), 1 );
          $portfolio_category = strstr( get_post_meta($post->ID, '_portfolio_project_category', true), '&', true );

          $portfolio_categories_counter++;

          // If not in $portfolio_category value is NOT in
          // $unique_portfolio_posts_categories_data_attr array insert it and
          // do the same for $unique_portfolio_headings
          if( !in_array( $portfolio_category, $unique_portfolio_posts_categories_data_attr )):
            $unique_portfolio_posts_categories_data_attr[] =  $portfolio_category;
          endif;

          if( !in_array( $portfolio_category_heading, $unique_portfolio_headings )):
            $unique_portfolio_headings[] =  $portfolio_category_heading;
          endif;
        ?>
              <?php
              // If last post
              if( $portfolio_category_posts_count == $portfolio_categories_counter ):

                $portfolio_data_attr_and_headings = array_combine($unique_portfolio_posts_categories_data_attr, $unique_portfolio_headings);
              ?>
                <?php
                // Foreach loop to display portfolio category data attr
                // and headings
                foreach($portfolio_data_attr_and_headings as $key => $value) {
                ?>
                  <h3 data-project-category="<?php echo $key; ?>" class="hide-override"><?php echo $value; ?></h3>
                <?php
                }
                ?>
          <?php
              endif;

            endwhile;
            wp_reset_postdata();
          }
          // Portfolio Post Categories END
          ?>

      <ul class="portfolio-list">
        <?php
        // All Portfolio Feed Posts Custom Post Type START
        $all_portfolio_posts_args = array(
              'post_type'         => 'portfoliopost',
              'orderby'           => 'meta_value',
              'meta_key'          => '_non_featured_project_order',
              'order'             => 'ASC',
              'posts_per_page'    => -1
        );

        $all_posts_lib_query = new WP_Query($all_portfolio_posts_args);
        if($all_posts_lib_query->have_posts()) {
          while ($all_posts_lib_query->have_posts()) : $all_posts_lib_query->the_post();

            $portfolio_category = strstr( get_post_meta($post->ID, '_portfolio_project_category', true), '&', true );

	          // If jetpack_photon_url function exists from require_once(...functions.photon.php) above
	          // then use jetpack_photon_url function to make images optimized for Jetpack
	          if( function_exists('jetpack_photon_url') ) {
		          // Args for Jetpack (adds width and height to image string)
		          $jetpack_image_url_args = array(
			          'w' => '200',
			          'h' => '125'
		          );

		          // Assign Jetpack scheme null
		          $jetpack_image_url_scheme = null;

		          $image_thumbnail = jetpack_photon_url( str_replace(array('local.', 'staging.'), 'www.', get_the_post_thumbnail_url()), $jetpack_image_url_args, $jetpack_image_url_scheme);
	          }
	          // Else jetpack_photon_url function doesn't exist
	          // serve up get_the_post_thumbnail_url() NOT optimized by Jetpack CDN
	          else {
		          $image_thumbnail = get_the_post_thumbnail_url();
	          }

        ?>
          <li data-project-category="<?php echo $portfolio_category; ?>" class="portfolio-project<?php echo get_post_meta($post->ID, '_non_featured_project_order', true); ?> hide-override"><a href="<?php the_permalink(); ?>"><img src="<?php echo $image_thumbnail; ?>" alt="<?php the_title(); ?>" width="200" height="125" alt="<?php the_title(); ?>" width="200" height="125"/><br/><?php echo get_post_meta($post->ID, '_portfolio_project_thumbnail_summary_line_1', true); ?><br/><?php echo get_post_meta($post->ID, '_portfolio_project_thumbnail_summary_line_2', true); ?><br/><?php echo get_post_meta($post->ID, '_portfolio_project_thumbnail_summary_line_3', true); ?></a></li>
        <?php
          endwhile;
          wp_reset_postdata();
        }
        // All Portfolio Feed Posts Custom Post Type END
        ?>
      </ul>

    </div><?php // #all-projects-section END ?>
  </div><?php //section landmark END ?>

<?php get_footer(); ?>