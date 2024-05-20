<?php
require_once 'inc/wp-core-utils/wp-core-utils.php';
WPCoreUtils::init();
require_once 'inc/walker-nav-menu/walker-nav-menu.php';
	
	//Style first post differently
	add_filter( 'post_class', 'mark_first_post' );
	function mark_first_post( $classes )
	{
		remove_filter( current_filter(), __FUNCTION__ );
		$classes[] = 'first-post';
		return $classes;
	}
	
	//Prints older and newer post links
	function blog_pagination()
	{
		echo '
			<div class="navigation">
			<div class="next-posts blog-nav">' .previous_posts_link('&laquo; Newer Entries', 0) . '</div>
			<div class="prev-posts blog-nav">' . next_posts_link('Older Entries &raquo;', 0) . '</div>
			</div>
		';
	}
	



	function improved_trim_excerpt($text) {
        global $post;
        if ( '' == $text ) {
                $text = get_the_content('');
                $text = apply_filters('the_content', $text);
                $text = str_replace('\]\]\>', ']]&gt;', $text);
                $text = preg_replace('@<script[^>]*?>.*?</script>@si', '', $text);
$text = strip_tags($text, '<p> <em> <strong>
   <h2>
    <h3> <a>');
      $excerpt_length = 20;
      $words = explode(' ', $text, $excerpt_length + 1);
      if (count($words)> $excerpt_length) {
      array_pop($words);
      array_push($words, '<br /><a class="moretag" href="'. get_permalink($post->ID) . '">Read more...</a>');
      $text = implode(' ', $words);
      }
      }
      return $text;
      }
      remove_filter('get_the_excerpt', 'wp_trim_excerpt');
      add_filter('get_the_excerpt', 'improved_trim_excerpt');


      //Add post thumbnails to theme
      add_theme_support( 'post-thumbnails' );

      //Exclude categories from sidebar widget
      function exclude_widget_categories($args){
      $exclude = "37"; // The IDs of the excluding categories
      $args["exclude"] = $exclude;
      return $args;
      }
      add_filter("widget_categories_args","exclude_widget_categories");

      // Get Custom Post Type Template for a Single Post
      function my_single_template($single) {
      if(file_exists(get_template_directory() . '/single-' . get_the_ID() . '.php'))
      return get_template_directory() . '/single-' . get_the_ID() . '.php';
      return $single;
      }
      add_filter('single_template', 'my_single_template');