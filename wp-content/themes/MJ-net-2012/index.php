<?php get_header(); ?>

<?php
$is_first_post = 1;
?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        
<hr <?php if ($is_first_post) { echo 'class="first-post-hr"'; } else{ echo '';} ?> />
		<div <?php post_class(); ?> id="post-<?php the_ID(); ?>">


			<h2><a href="<?php the_permalink() ?>"><?php the_title(); ?></a><br />
  <?php if(!in_category('24')): ?>
	  <span class="h2-sub">Posted on <?php the_time('F jS, Y') ?> in <?php the_category(', ') ?></span>
  <?php endif; ?>
</h2>

			<div class="entry">
				<?php the_content(); ?>
			</div>

			<div class="postmetadata">
				<?php comments_popup_link('No Comments &#187;', '1 Comment &#187;', '% Comments &#187;'); ?>
			</div>
		</div>
        
        <?php
        $is_first_post = 0;
		?>

	<?php endwhile; ?>

	<?php include (TEMPLATEPATH . '/inc/nav/nav.php' ); ?>

	<?php else : ?>

		<h2>Not Found</h2>

	<?php endif; ?>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
