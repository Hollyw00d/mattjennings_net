<?php get_header(); ?>

		<?php if (have_posts()) : ?>
                
 			<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>

			<?php /* If this is a category archive */ if (is_category()) { ?>
				<h2><em>Archive for the <strong><?php single_cat_title(); ?></strong> Category</em></h2>

			<?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
				<h2><em>Posts Tagged &#8216;<?php single_tag_title(); ?>&#8217;</em></h2>

			<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
				<h2><em>Archive for <?php the_time('F jS, Y'); ?></em></h2>

			<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
				<h2><em>Archive for <?php the_time('F, Y'); ?></em></h2>

			<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
				<h2 class="pagetitle"><em>Archive for <?php the_time('Y'); ?></em></h2>

			<?php /* If this is an author archive */ } elseif (is_author()) { ?>
				<h2 class="pagetitle"><em>Author Archive</em></h2>

			<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
				<h2 class="pagetitle"><em>Blog Archives</em></h2>
			
			<?php } ?>

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
    
        <div class="post-wrapper">

            <h2>Nothing Found</h2>

        </div><!-- #post-wrapper --> 
        
	<?php endif; ?>
    
<?php get_footer(); ?>
