<?php
if(in_category('37')):
	echo '<h1>';
else:
	echo '<h2>';
endif;
?>

<?php
if(is_single()):
?>
	<?php the_title(); ?>
<?php
else:
?>
    <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>" <?php post_class(); ?>><?php the_title(); ?></a>
<?php
endif;
?>
<?php
if(!in_category('24')):
?>
	<br />
	<span <?php post_class(); ?>>Posted on <? the_time('F j, Y'); ?> in <?php the_category(', '); ?> by <?php the_author(); ?></span>
<?php
endif;


?>

<?php
if(in_category('24')):
	echo '</h1>';
else:
	echo '</h2>';
endif;
?>