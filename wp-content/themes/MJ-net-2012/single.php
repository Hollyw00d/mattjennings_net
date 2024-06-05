<?php get_header(); ?>

	<?php
    if (have_posts()) : while (have_posts()) : the_post();

    $blog_post_hashtags = get_field('blog_post_hashtags');
    ?>

        <div class="post-wrapper" role="article">
			                        
			<?php include (TEMPLATEPATH . '/inc/meta/meta.php' ); ?>

			<?php the_content(); ?>

            <?php if($blog_post_hashtags): ?>
                <div class="hide" id="twitter-hashtags"><?php echo $blog_post_hashtags; ?></div>
            <?php endif; ?>

			<?php 
			if(in_category('37')):
				echo '';
			else:
			?>				
	            <?php wp_link_pages(array('before' => 'Pages: ', 'next_or_number' => 'number')); ?>
	            
	            <?php the_tags( 'Tags: ', ', ', ''); ?>

				<?php edit_post_link('Edit this entry.',''); ?>
	     
				<?php comments_template(); ?>
			<?php
			endif;	
			?>
	    
	    </div><!-- #post-wrapper --> 

	<?php endwhile; endif; ?>
	
<?php get_footer(); ?>