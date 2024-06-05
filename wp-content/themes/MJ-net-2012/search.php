<?php get_header(); ?>

	<?php if (have_posts()) : ?>
    
		<h2><em>Search Results for <strong><?php echo get_search_query(); ?></strong></em></h2>

		<?php include (TEMPLATEPATH . '/inc/nav/nav.php' ); ?>

		<?php while (have_posts()) : the_post(); ?>

                <div class="post-wrapper" role="article">
			
                    <hr <?php post_class(); ?> />
                    
                    <?php include (TEMPLATEPATH . '/inc/meta/meta.php' ); ?>
                                            
                    <?php the_excerpt(); ?>
                
			    </div><!-- #post-wrapper --> 

		<?php endwhile; ?>

		<?php include (TEMPLATEPATH . '/inc/nav/nav.php' ); ?>

	<?php else : ?>
    
		<h2>You searched for <em><strong><?php the_search_query() ?></strong></em>. No posts found.</h2>

	<?php endif; ?>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
