<?php
require_once 'inc/wp-core-utils/wp-core-utils.php';
WPCoreUtils::init();

	/**
	 * My extended menu walker
	 * Supports separators as "ex_separator" arg to wp_nav_menu call
	 */
	class MyExtendedMenuWalker extends Walker_Nav_Menu {
	
		private $counter = 0;
	
		/**
		 * Starting an element
		 * If this is not the first, add separator here
		 */
		function start_el(&$output, $item, $depth = 0, $args = [], $id = 0) {
	
			if($this->counter && isset($args->ex_separator))
				$output .= $args->ex_separator;
			parent::start_el($output, $item, $depth, $args);
			$this->counter ++;
		}
	}
	
	// REPLACE "current_page_" WITH CLASS "active"
	function current_to_active($text){
		$replace = array(
			// List of classes to replace with "active"
			'current_page_item' => 'active',
			'current_page_parent' => 'active',
			'current_page_ancestor' => 'active',
		);
		$text = str_replace(array_keys($replace), $replace, $text);
			return $text;
		}
	add_filter ('wp_nav_menu','current_to_active');

	// Add page/post slug class to menu item classes	
	function add_slug_class_to_menu_item($output){
		$ps = get_option('permalink_structure');
		if(!empty($ps)){
			$idstr = preg_match_all('/<li id="menu-item-(\d+)/', $output, $matches);

      $counter = 0;

			foreach($matches[1] as $mid){
        $counter++;

				$id = get_post_meta($mid, '_menu_item_object_id', true);
				if( $counter == 1 ) {
          $slug = 'home';
        }
        else {
          $slug = basename(get_permalink($id));
        }

				$output = preg_replace('/menu-item-'.$mid.'">/', 'menu-item-'.$mid.' menu-item-'.$slug.'">', $output, 1);
			}
		}
		return $output;
	}
	add_filter('wp_nav_menu', 'add_slug_class_to_menu_item');	

	// Add styles to the WYSIWYG editor. Function finds stylesheet from the root of the current theme's folder.
	add_editor_style('style.css');

	//Limit Words in any WordPress Function	
	function limit_words($string, $word_limit) {
		// creates an array of words from $string (this will be our excerpt)
		// explode divides the excerpt up by using a space character
		$words = explode(' ', $string);
		// this next bit chops the $words array and sticks it back together
		// starting at the first word '0' and ending at the $word_limit
		// the $word_limit which is passed in the function will be the number
		// of words we want to use
		// implode glues the chopped up array back together using a space character
		return implode(' ', array_slice($words, 0, $word_limit));
	}	 
	
	// Limit the the_excerpt() to 20 words
	function custom_excerpt_length( $length ) {
		return 20;
	}
	add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );	
	
	// Replaces the excerpt "more" text by a link
	function new_excerpt_more($more) {
		   global $post;
		return '...<br /><a class="moretag" href="'. get_permalink($post->ID) . '">Read more</a>';
	}
	add_filter('excerpt_more', 'new_excerpt_more');
	
	//Add Post or Page Name to Body Classes
	add_filter('body_class', 'add_slug_to_body_class');
	function add_slug_to_body_class($classes) {
		global $post;

		if(isset($post->post_name)) {
			$classes[] = $post->post_name;
		}

		$classes[] = '';

		return $classes;
	}

	//Add category name to body tag
	function add_category_name($classes = '') {
		if(is_single()) {
			$category = get_the_category();
			$classes[] = 'category-'.$category[0]->slug; 
		}
			return $classes;
	}
	add_filter('body_class','add_category_name');

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