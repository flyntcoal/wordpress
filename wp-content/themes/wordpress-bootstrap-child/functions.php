<?php

// Remove the default  function
function remove_wp_actions() {
    remove_action('the_content','wp_bootstrap_first_paragraph');
	remove_action('wp_bootstrap_theme_styles','wp_enqueue_scripts');
	remove_action('wp_title', 'wp_bootstrap_wp_title');
	 
}
// Call 'remove_thematic_actions' (above) during WP initialization
add_action('init','remove_wp_actions');



// enqueue styles
if( !function_exists("wp_bootstrap_theme_styles") ) {  
    function wp_bootstrap_theme_styles() { 
        // This is the compiled css file from LESS - this means you compile the LESS file locally and put it in the appropriate directory if you want to make any changes to the master bootstrap.css.
        wp_register_style( 'wpbs', get_template_directory_uri() . '/library/dist/css/styles.f6413c85.min.css', array(), '1.0', 'all' );
        wp_enqueue_style( 'wpbs' );

        // For child themes
        wp_register_style( 'wpbs-style', get_stylesheet_directory_uri() . '/style.min.css', array(), '1.0', 'all' );
        wp_enqueue_style( 'wpbs-style' );
    }
}
add_action( 'wp_enqueue_scripts', 'wp_bootstrap_theme_styles' );


// enqueue javascript
if( !function_exists( "wp_bootstrap_theme_js" ) ) {  
  function wp_bootstrap_theme_js(){

    // This is the full Bootstrap js distribution file. If you only use a few components that require the js files consider loading them individually instead
    wp_register_script( 'bootstrap', 
      '/wp-content/js/bootstrap.min.js', 
      array('jquery'), 
      '1.2' );

    wp_register_script( 'wpbs-js', 
      get_template_directory_uri() . '/library/dist/js/scripts.d1e3d952.min.js',
      array('bootstrap'), 
      '1.2' );
  
    wp_register_script( 'modernizr', 
      get_template_directory_uri() . '/bower_components/modernizer/modernizr.min.js', 
      array('jquery'), 
      '1.2' );
  
    wp_enqueue_script( 'bootstrap' );
    wp_enqueue_script( 'wpbs-js' );
    wp_enqueue_script( 'modernizr' );
    
  }
}
add_action( 'wp_enqueue_scripts', 'wp_bootstrap_theme_js' );

//Adds custom post type functionality to wp_get_archives()
add_filter( 'getarchives_where' , 'ucc_getarchives_where_filter' , 10 , 2 );
function ucc_getarchives_where_filter( $where , $r ) {
  $args = array(
  'public' => true ,
  '_builtin' => false
  );
  $output = 'names';
  $operator = 'and';

  $post_types = get_post_types( $args , $output , $operator );
  $post_types = array_merge( $post_types , array( 'post' ) );
  $post_types = "'" . implode( "' , '" , $post_types ) . "'";
  //return str_replace( "post_type = 'post'" , "post_type IN ( $post_types )" , $where );  //posts + custom post types
  return str_replace( "post_type = 'post'" , "post_type = 'news'", $where ); //Restricted to defined custom post types
}

//Shortcode function for grabbing number of desired "Latest Releases" for Homepage "Newsroom" Section
function new_items_func($atts){ 

  //Parameters defined in shortcode from page
  $a = shortcode_atts( array('num_display' => 3), $atts );

  //Posts Arguments
  $args_posts = array(
   //'post_type'       => 'news',
    'type'            => 'postbypost',
    'limit'           => '',
    'format'          => 'html', 
    'before'          => '',
    'after'           => '',
    'show_post_count' => true,
    'echo'            => 0,
    'order'           => 'DESC'
  );

  $posts = wp_get_archives($args_posts);
  $posts_arr = explode("\n", $posts);
  $links = array();

  foreach( $posts_arr as $link ) {
    if( '' != $link )
      $links[] = $link;
    else
      continue;
  }

  $postCount = count($links);
    
  //Pages Arguments (2013/14 releases)
  $args_pages = array(
    'authors'      => '',
    'child_of'     => 34,
    'date_format'  => get_option('date_format'),
    'depth'        => 0,
    'echo'         => 0,
    'exclude'      => '',
    'include'      => '',
    'link_after'   => '',
    'link_before'  => '',
    'post_type'    => 'page',
    'post_status'  => 'publish',
    'show_date'    => '',
    'sort_column'  => 'post_date, post_title',
    'sort_order'   => '',
    'title_li'     => __(''), 
    'walker'       => ''
  ); 

  $pages = wp_list_pages($args_pages);
  $pages_arr = explode("\n", $pages);
  
  //Logic for combining 2014 pages and 2015 posts into one
  //If there are less news "posts" than defined via shortcode parameters then grab total posts then pages according to difference and combine
  if($postCount < $a['num_display']){

    //difference of posts to desired display entries
    $pages_to_get = ($a['num_display'] - $postCount);
    //$count = 0;
    
   //add total number of posts to array
    for($j = 0; $j < $postCount; $j++){
      $return .= $links[$j];
      //$count++;
    }

    //add pages to array until it reaches desired number of entries to display
    for($i=0; $i < $pages_to_get; $i++){
      //echo $pages_arr[$i];
      $return .= $pages_arr[$i];
    }
   
  }
  //If there are enough total posts to at least equal the deisred number of desired display entries, skip "pages" and just grab desired number of posts
  else if($postCount >= $a['num_display']){

    for($j = 0; $j < $a['num_display']; $j++){
        $return .= $links[$j];
      }
  }
  remove_filter ('getarchives_where' , 'ucc_getarchives_where_filter');

  return $return;
  
}
add_shortcode('newsItems', 'new_items_func');


function my_custom_post_news() {
  $labels = array(
    'name'               => _x( 'News', 'post type general name' ),
    'singular_name'      => _x( 'News-release', 'post type singular name' ),
    'add_new'            => _x( 'Add New', 'post' ),
    'add_new_item'       => __( 'Add New News Item' ),
    'edit_item'          => __( 'Edit News Item' ),
    'new_item'           => __( 'New News Item' ),
    'all_items'          => __( 'All News' ),
    'view_item'          => __( 'View News' ),
    'search_items'       => __( 'Search News' ),
    'not_found'          => __( 'No News items found' ),
    'not_found_in_trash' => __( 'No News items found in the Trash' ), 
    'parent_item_colon'  => '',
    'menu_name'          => 'News Items'
  );
  $args = array(
    'labels'        => $labels,
    'description'   => 'Holds our news and specific news item data',
    'public'        => true,
    'menu_position' => 5,
    'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
    'has_archive'   => true,
  );
  register_post_type( 'news', $args ); 
}
add_action( 'init', 'my_custom_post_news' );

add_action( 'amp_init', 'amp_add_news' );
function amp_add_news() {
     add_post_type_support( 'news', AMP_QUERY_VAR );
}

function my_taxonomies_news() {
  $labels = array(
    'name'              => __( 'News Categories', 'taxonomy general name' ),
    'singular_name'     => __( 'News Category', 'taxonomy singular name' ),
    'search_items'      => __( 'Search News Categories' ),
    'all_items'         => __( 'All News Categories' ),
    'parent_item'       => __( 'Parent News Category' ),
    'parent_item_colon' => __( 'Parent News Category:' ),
    'edit_item'         => __( 'Edit News Category' ), 
    'update_item'       => __( 'Update News Category' ),
    'add_new_item'      => __( 'Add New News Category' ),
    'new_item_name'     => __( 'New News Category' ),
    'menu_name'         => __( 'News Categories' ),
  );
  $args = array(
    'labels' => $labels,
    'hierarchical' => true,
  );
  register_taxonomy( 'news_category', 'news', $args );
}
add_action( 'init', 'my_taxonomies_news', 0 );

add_action( 'amp_init', 'amp_add_News_release' );
function amp_add_News_release() {
     add_post_type_support( 'News-release', AMP_QUERY_VAR );
}


add_action( 'add_meta_boxes', 'news_date_box' );
function news_date_box() {
    add_meta_box( 
        'news_date_box',
        __( 'News Date', 'myplugin_textdomain' ),
        'news_date_box_content',
        array( 'news', 'weekly-news-release'),
        'side',
        'high'
        
    );
}

function news_date_box_content( $post ) {
  wp_nonce_field( plugin_basename( __FILE__ ), 'news_date_box_content_nonce' );
  echo '<label for="news_date"></label>';
  echo '<input type="date" id="news_date" name="news_date" placeholder="enter a display date" />';
}

add_action( 'save_post', 'news_date_box_save' );
function news_date_box_save( $post_id ) {

  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) 
  return;

  if ( !wp_verify_nonce( $_POST['news_date_box_content_nonce'], plugin_basename( __FILE__ ) ) )
  return;

  if ( 'page' == $_POST['post_type'] ) {
    if ( !current_user_can( 'edit_page', $post_id ) )
    return;
  } else {
    if ( !current_user_can( 'edit_post', $post_id ) )
    return;
  }
  $news_date = $_POST['news_date'];
  update_post_meta( $post_id, 'news_date', $news_date );
}

add_filter( 'getarchives_where' , 'ucc_getarchives_where_filter_weekly', 10 , 2 );
function ucc_getarchives_where_filter_weekly( $where , $r ) {
  $args = array(
  'public' => true ,
  '_builtin' => false
  );
  $output = 'names';
  $operator = 'and';

  $post_types = get_post_types( $args , $output , $operator );
  $post_types = array_merge( $post_types , array( 'post' ) );
  $post_types = "'" . implode( "' , '" , $post_types ) . "'";
  //return str_replace( "post_type = 'post'" , "post_type IN ( $post_types )" , $where );  //posts + custom post types
  return str_replace( "post_type = 'post'" , "post_type = 'weekly-news-release'", $where ); //Restricted to defined custom post types
}


//Shortcode function for grabbing number of desired "Latest Releases" for Homepage "Newsroom" Section
function weeklynew_items_func($atts){ 

  //Parameters defined in shortcode from page
  $a = shortcode_atts( array('num_display' => 3), $atts );

  //Posts Arguments
  $args_posts = array(
 // 'post_type'       => 'weekly-news-release',
    'type'            => 'postbypost',
    'limit'           => '',
    'format'          => 'html', 
    'before'          => '',
    'after'           => '',
    'show_post_count' => true,
    'echo'            => 0,
    'order'           => 'DESC'
  );

  $posts = wp_get_archives($args_posts);
  $posts_arr = explode("\n", $posts);
  $links = array();

  foreach( $posts_arr as $link ) {
    if( '' != $link )
      $links[] = $link;
    else
      continue;
  }

  $postCount = count($links);
    
  //Pages Arguments (2013/14 releases)
  $args_pages = array(
    'authors'      => '',
    'child_of'     => 34,
    'date_format'  => get_option('date_format'),
    'depth'        => 0,
    'echo'         => 0,
    'exclude'      => '',
    'include'      => '',
    'link_after'   => '',
    'link_before'  => '',
    'post_type'    => 'page',
    'post_status'  => '',
    'show_date'    => '',
    'sort_column'  => 'post_date, post_title',
    'sort_order'   => '',
    'title_li'     => __(''), 
    'walker'       => ''
  ); 

  $pages = wp_list_pages($args_pages);
  $pages_arr = explode("\n", $pages);
  
  //Logic for combining 2014 pages and 2015 posts into one
  //If there are less news "posts" than defined via shortcode parameters then grab total posts then pages according to difference and combine
  if($postCount < $a['num_display']){

    //difference of posts to desired display entries
    $pages_to_get = ($a['num_display'] - $postCount);
    //$count = 0;
    
   //add total number of posts to array
    for($j = 0; $j < $postCount; $j++){
      $return .= $links[$j];
      //$count++;
    }

    //add pages to array until it reaches desired number of entries to display
    for($i=0; $i < $pages_to_get; $i++){
      //echo $pages_arr[$i];
      $return .= $pages_arr[$i];
    }
   
  }
  //If there are enough total posts to at least equal the deisred number of desired display entries, skip "pages" and just grab desired number of posts
  else if($postCount >= $a['num_display']){

    for($j = 0; $j < $a['num_display']; $j++){
        $return .= $links[$j];
      }
  }

  return $return;
  
}
add_shortcode('weeklynewsItems', 'weeklynew_items_func');


function my_custom_post_news_weekly() {
  $labels = array(
    'name'               => _x( 'Weekly News Releases', 'post type general name' ),
    'singular_name'      => _x( 'weekly-news-release', 'post type singular name' ),
    'add_new'            => _x( 'Add New', 'post' ),
    'add_new_item'       => __( 'Add Weekly News Item' ),
    'edit_item'          => __( 'Edit News Item' ),
    'new_item'           => __( 'New Weekly News Item' ),
    'all_items'          => __( 'All News' ),
    'view_item'          => __( 'View News' ),
    'search_items'       => __( 'Search Weekly News' ),
    'not_found'          => __( 'No News items found' ),
    'not_found_in_trash' => __( 'No News items found in the Trash' ), 
    'parent_item_colon'  => '',
    'menu_name'          => 'Weekly News Releases'
  );
  $args = array(
    'labels'        => $labels,
    'description'   => 'Holds our news and specific news item data',
    'public'        => true,
    'menu_position' => 6,
    'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
    'has_archive'   => true,
  );
  register_post_type( 'weekly-news-release', $args ); 
}
add_action( 'init', 'my_custom_post_news_weekly' );


function my_taxonomies_news_weekly() {
  $labels = array(
    'name'              => __( 'Weekly News Categories', 'taxonomy general name' ),
    'singular_name'     => __( 'News Category', 'taxonomy singular name' ),
    'search_items'      => __( 'Search News Categories' ),
    'all_items'         => __( 'All News Categories' ),
    'parent_item'       => __( 'Parent News Category' ),
    'parent_item_colon' => __( 'Parent News Category:' ),
    'edit_item'         => __( 'Edit News Category' ), 
    'update_item'       => __( 'Update News Category' ),
    'add_new_item'      => __( 'Add New Weekly News Category' ),
    'new_item_name'     => __( 'New News Category' ),
    'menu_name'         => __( 'Weekly News Categories' ),
  );
  $args = array(
    'labels' => $labels,
    'hierarchical' => true,
  );
  register_taxonomy( 'weekly_news_category', 'weekly-news-release', $args );
}
add_action( 'init', 'my_taxonomies_news_weekly', 0 );

add_action( 'amp_init', 'amp_add_weekly_news_release' );
function amp_add_weekly_news_release() {
     add_post_type_support( 'weekly-news-release', AMP_QUERY_VAR );
}

//removes ?ver=* query tag from styles and scripts
function _remove_script_version( $src ){
  $parts = explode( '?ver=', $src );
  return $parts[0];
}
add_filter( 'script_loader_src', '_remove_script_version', 15, 1 );
add_filter( 'style_loader_src', '_remove_script_version', 15, 1 );
remove_action('wp_head', 'wp_generator');

add_action('rss2_item', 'add_my_rss_node');

function add_my_rss_node() {
  echo("<category>GOVERNMENT</category>");
}

?>