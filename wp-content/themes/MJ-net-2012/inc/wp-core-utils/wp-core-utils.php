<?php
// WP core code for functions.php
class WPCoreUtils {
 public static function init() {
  $self = new self();
  add_action('init', array($self, 'cleanUpActions'));
  add_action('wp_loaded', array($self, 'enqueue_dequeue_styles_scripts'));
		add_action('body_class', array($self, 'append_body_class'));

		// Add RSS links to <head> section
  add_theme_support( 'automatic-feed-links' );
		// Add Custom Menu
		add_theme_support( 'menus' );
 }

	public function cleanUpActions() {
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
	}

 // Enqueue or dequeue styles and scripts
	public function enqueue_dequeue_styles_scripts() {
		$query_string = $this->query_string_from_timestamp();
		// Dequeue WP block library CSS from WP Core
		// and NOT on admin
		if ( !is_admin() ) {
			wp_dequeue_style( 'wp-block-library' );
			wp_deregister_style( 'wp-block-library' );
		}

		// Enqueue CSS
		wp_enqueue_style( 'theme-styles', get_stylesheet_directory_uri() . '/build/css/theme.min.css', array(), $query_string );

		// Enqueue JS
		wp_enqueue_script('theme-scripts', get_stylesheet_directory_uri().'/build/js/theme.min.js', '', $query_string, true);
	}
	
	public function append_body_class($classes) {
		$new_classes = $classes;
		$blog_class = 'blog';

		if((
			is_archive() ||
			(is_single() && 'post' == get_post_type()) ||
			is_search() 
			) && !in_array($blog_class, $new_classes)) {
			$new_classes[] = $blog_class;
		}

			return $new_classes;
	}

 // Utilities
 private function query_string_from_timestamp() {
		$timestamp_json_file_path = get_stylesheet_directory() . '/build/json/timestamp.json';
		$query_string = null;

		if (file_exists($timestamp_json_file_path)) {
			$json_data = file_get_contents($timestamp_json_file_path);
			$obj = json_decode($json_data);
			$timestamp = $obj->{'timestamp'};
			$query_string = $timestamp;
		}
		return $query_string;
	}	
}