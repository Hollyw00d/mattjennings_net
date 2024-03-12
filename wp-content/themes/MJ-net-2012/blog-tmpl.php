<?php
/*
Template Name: Blog Template
*/
?>
<?php get_header(); ?>

<?php 
//Set pagination
$temp = $wp_query; 
$wp_query = null; 
$wp_query = new WP_Query(); 
$wp_query->query('showposts=5&post_type=post'.'&paged='.$paged); 
?>  

<div class="navigation" role="navigation">
    <div class="prev-posts blog-nav"><?php next_posts_link('&laquo; Older Entries', 0); ?></div>
    <div class="next-posts blog-nav"><?php previous_posts_link('Newer Entries &raquo;', 0); ?></div>
</div>

<?php while ($wp_query->have_posts()) : $wp_query->the_post(); ?>

        <div class="post-wrapper" class="<?php if(in_category('37')){echo 'portfolio-feed-post';} ?>" role="article">

            <hr <?php post_class(); ?> />
            
			<?php include (TEMPLATEPATH . '/inc/meta.php' ); ?>
                                    
            <?php the_excerpt(); ?>

						<?php the_post_thumbnail(); ?>
                        
        </div><!-- #post-wrapper --> 

<?php endwhile; ?>

<div class="navigation" role="navigation">
    <div class="prev-posts blog-nav"><?php next_posts_link('&laquo; Older Entries', 0); ?></div>
    <div class="next-posts blog-nav"><?php previous_posts_link('Newer Entries &raquo;', 0); ?></div>
</div>

<?php 
// Reset
$wp_query = null; 
$wp_query = $temp;  
?>

<?php get_footer(); ?>