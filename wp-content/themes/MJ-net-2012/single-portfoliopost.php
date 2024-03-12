<?php
/*
Template Name: Single "portfoliopost" Custom Post Type
*/
/**
 * Display a single portfolio feed item from the
 * "portfoliopost" custom post type.
 */

// Get current post ID
global $post;
$post_id = $post->ID;

get_header(); ?>

  <?php
  while ( have_posts() ) : the_post();
  ?>

    <?php echo get_post_meta($post->ID, '_project_summary', true); ?>

    <?php if( get_post_meta($post->ID, '_show_link_to_portfolio_project', true) ): ?>
      <h3><strong><a href="<?php echo get_post_meta($post->ID, '_portfolio_project_link', true); ?>" target="_blank"><?php echo get_post_meta($post->ID, '_portfolio_project_link_text', true); ?> &gt;&gt;</strong></a></h3>
    <?php endif; ?>

    <?php
    // project_role_title
    // project_role_name
    ?>
    <p><strong><?php echo get_post_meta($post->ID, '_project_role_title', true); ?>:</strong> <?php echo get_post_meta($post->ID, '_project_role_name', true); ?></p>

    <p><strong>Technologies Used:</strong> <?php echo get_post_meta($post->ID, '_technologies_used', true); ?></p>
    <br class="clear" />
    <?php echo get_post_meta($post->ID, '_project_images', true); ?>

      <?php
      if( have_rows('portfolio_project_images') ):
      ?>

        <?php
        while( have_rows('portfolio_project_images') ): the_row();
          $single_portfolio_project_image = get_sub_field("single_portfolio_project_image");
        ?>

              <p class="center"><img src="<?php echo $single_portfolio_project_image['url']; ?>" alt="<?php echo $single_portfolio_project_image['alt']; ?>" width="<?php echo $single_portfolio_project_image['width']; ?>" height="<?php echo $single_portfolio_project_image['width']; ?>" /></p>
        <?php
        endwhile;
        ?>

      <?php
      endif;
      ?>

  <?php
  endwhile;
  ?>

<?php get_footer(); ?>
