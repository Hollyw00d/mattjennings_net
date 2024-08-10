<?php
// WP core code for functions.php
class WPCoreUtils {
 public static function init() {
  $self = new self();
  add_action('init', array($self, 'set_up_actions'));
  add_filter('xmlrpc_enabled', '__return_false');
  add_action('wp_enqueue_scripts', array($self, 'enqueue_dequeue_styles_scripts'), 100);
		add_filter( 'style_loader_src', array($self, 'remove_query_string_from_css_js'), 9999 );
		add_filter( 'script_loader_src', array($self, 'remove_query_string_from_css_js'), 9999 );
		add_action('body_class', array($self, 'customize_body_class'));
		add_filter ('wp_nav_menu', array($self, 'customize_nav_menu_output'));
		add_filter( 'post_class', array($self, 'mark_first_post') );	
		remove_filter('get_the_excerpt', 'wp_trim_excerpt');
		add_filter( 'get_the_excerpt', array($self, 'improved_excerpt') );	
 }

	/*
	 * Clean up actions for
		* - <head> tag
		* - Loading theme `style.css` in posts
		* - Updating sidebar
		* - Add styles to the WYSIWYG editor
		* - Add RSS links to <head> section
		* - Add Custom Menu
		* - Add post thumbnails to theme
		* - Disable xmlrpc.php pingback link, like:
	 * `<link rel="pingback" href="https://example.com/xmlrpc.php" />`
	 */
	public function set_up_actions() {
		// Clean up the <head>
		remove_action('wp_head', 'rsd_link');
		remove_action('wp_head', 'wlwmanifest_link');
		remove_action('wp_head', 'wp_generator');

		// Register sidebar
		if (function_exists('register_sidebar')) {
			register_sidebar(array(
				'name' => 'Sidebar Widgets',
				'id'   => 'sidebar-widgets',
				'description'   => 'These are widgets for the sidebar.',
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h2>',
				'after_title'   => '</h2>'
			));
		}		

		add_editor_style('style.css');		
  add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'menus' );
		add_theme_support( 'post-thumbnails' );

  $this->prevent_xmlrpc_access();
	}

	/*
	 * Update CSS and JS including:
		* - Dequeueing & enqueueing CSS and JS
		* - Removing query strings from CSS and JS
	 */	
	public function enqueue_dequeue_styles_scripts() {
		// Dequeue WP block library CSS from WP Core
		// and NOT on admin
		if ( !is_admin() ) {
			wp_dequeue_style( 'wp-block-library' );
			wp_deregister_style( 'wp-block-library' );
		}

		// If not on single 'post' then dequeue/deregister styles/scripts below
		if( !is_singular( 'post' ) ) {
			// Styles
			wp_dequeue_style('enlighterjs');
			wp_deregister_style('enlighterjs');

			// Scripts
			wp_dequeue_script('comment-reply');
			wp_deregister_script('comment-reply');

			wp_dequeue_script('enlighterjs');
			wp_deregister_script('enlighterjs');

			if ( !is_admin() ) {
				// Dequeue/deregister jQuery core & migrate
				wp_dequeue_script('jquery-core');
				wp_deregister_script('jquery-core');	

				wp_dequeue_script('jquery-migrate');
				wp_deregister_script('jquery-migrate');		
			}
		}

		// Enqueue CSS
		wp_enqueue_style( 'theme-styles', get_stylesheet_directory_uri() . '/build/css/theme.min.css', '', '', 'all');

		// Enqueue JS
		wp_enqueue_script('theme-scripts', get_stylesheet_directory_uri().'/build/js/theme.min.js', '', '', true);
	}

	public function remove_query_string_from_css_js( $src ) {
		if ( strpos( $src, 'ver=' ) ) {
			$src = remove_query_arg( 'ver', $src );
		}
		return $src;
	}

	/* 
	 * Update BODY tag classes including:
  * - If on blog archive page (posts page) or single post add `blog` as a class
	 * - If on any post (including custom post type) or page add `$post->post_name` value as a class	
	 * - On single posts add category as body class (if present)
	 */
	public function customize_body_class($classes) {
		global $post;
		$new_classes = $classes;
		$blog_class = 'blog';
		
		if(
			(
			is_archive() ||
			(is_single() && 'post' == get_post_type()) ||
			is_search() 
			) && !in_array($blog_class, $new_classes)) {
			$new_classes[] = $blog_class;
		}
		else if (isset($post->post_name)) {
			$new_classes[] = $post->post_name;
		}
		else if(is_single()) {
			$category = get_the_category();
			$classes[] = 'category-'.$category[0]->slug; 
		}

			return $new_classes;
	}

	/* 
	 * Customize main menu out including:
  * - Add page/post slug class to menu item classes
	 * - replace current classes with "active"
	 */
	public function customize_nav_menu_output($output) {
		$ps = get_option('permalink_structure');
		if (!empty($ps)) {
			$idstr = preg_match_all('/<li id="menu-item-(\d+)/', $output, $matches);
			$counter = 0;

			foreach ($matches[1] as $mid) {
							$counter++;
							$id = get_post_meta($mid, '_menu_item_object_id', true);
							
							if ($counter == 1) {
											$slug = 'home';
							} else {
											$slug = basename(get_permalink($id));
							}

							$output = preg_replace('/menu-item-' . $mid . '">/', 'menu-item-' . $mid . ' menu-item-' . $slug . '">', $output, 1);
			}
		}

		// Replace current classes with "active"
		$replace = array(
						'current_page_item' => 'active',
						'current_page_parent' => 'active',
						'current_page_ancestor' => 'active',
		);
		$output = str_replace(array_keys($replace), $replace, $output);
		return $output;
	}

	/* 
	 * Excerpt updates
	 */
	public function improved_excerpt($text) {
 	global $post;

  if ( '' == $text ) {
			$text = get_the_content('');
			$text = apply_filters('the_content', $text);
			$text = str_replace('\]\]\>', ']]&gt;', $text);
			$text = preg_replace('@<script[^>]*?>.*?</script>@si', '', $text);
			$text = strip_tags($text, '<p> <em> <strong> <h2> <h3> <a>');
			$text = $this->remove_all_html_tags_excluding_paragraphs($text);

			$excerpt_length = 20;
			$words = explode(' ', $text, $excerpt_length + 1);
			// $words = $this->remove_all_html_tags_excluding_paragraphs($words);

			if ( count($words) > $excerpt_length ) {
				array_pop($words);
				array_push($words, '&hellip;<br /><br /><a class="moretag" href="'. get_permalink($post->ID) . '">Read more</a>');
				$text = implode(' ', $words);
			}
  }

  return $text;
 }

	/*
	* Post updates including:
	* - Styling first post differently
	*/
	public function mark_first_post( $classes ) {
		remove_filter( current_filter(), __FUNCTION__ );
		$classes[] = 'first-post';
		return $classes;
	}

	/**
	* Private helper methods
	*/
	// Replace headings tags (h1 thru h6) with paragraph tags WITHOUT any attributes
	private function remove_all_html_tags_excluding_paragraphs( $content ) {
 	$content = preg_replace('/<h[1-6][^>]*>(.*?)<\/h[1-6]>/', '', $content);
  return $content;
 }

	private function prevent_xmlrpc_access() {
			if (strpos($_SERVER['REQUEST_URI'], '/xmlrpc.php') !== false) {
							http_response_code(403);
							exit;
			}
	}

}