<?php 

/**
* 
*/
if ( ! defined( 'ABSPATH' ) ) exit;
class WDButton_admin_style_script
{
	
	function __construct()
	{
		add_action('admin_enqueue_scripts', array(&$this,'WDButton_metaboxes_scripts'));
		add_action( 'admin_notices', array(&$this,'WDButton_review_notice') );
		add_action( 'wp_ajax_WDButton_dismiss_review', array(&$this,'WDButton_dismiss_review') );
	}

	function WDButton_metaboxes_scripts(){
		global $typenow; 	
		if ($typenow=='page' || $typenow=='post'){
			wp_register_style('wd_font_awesome',WDButton_URL.'css/wd_font_awesome/css/wd_font_awesome.css');					
			?><script src="https://ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js"></script><?php
		}				
		if ($typenow=='wd_button'){
			?><script src="https://ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js"></script><?php
			$dataToBePassed = array('WDButton_URL'  => WDButton_URL);
			wp_enqueue_script( 'jquery');
			wp_enqueue_script('jquery-ui-draggable');

			/*button hide show script*/
			wp_enqueue_script( 'button_effect_script', WDButton_URL.'admin/js/button_effect_script.js', array(), false, true );
			
			/**********/
			/*color picker*/
			wp_enqueue_style( 'wp-color-picker' );
			wp_enqueue_script( 'Button_colorpicker_script', WDButton_URL.'admin/js/button_color_picker.js', array( 'wp-color-picker' ), false, true );
			/**************/

			/** metabox style**/
			wp_enqueue_style('Button_metaboxes_style',WDButton_URL.'admin/css/metaboxes_style.css');

			/********/
			
			
			/***live preview******/

			wp_enqueue_script( 'button_preview', WDButton_URL.'admin/js/button_preview.js', array(), false, true );
			
			$localize_array=array('button_preview'=>$dataToBePassed);

			foreach ($localize_array as $key => $value) {
				wp_localize_script( $key, 'php_vars', $value );
			}

			/** linedtextarea***/
			wp_enqueue_style('jquery-linedtextarea-css',WDButton_URL.'admin/css/jquery.numberedtextarea.css');

			wp_enqueue_script( 'jquery-linedtextarea-js', WDButton_URL.'admin/js/jquery.numberedtextarea.js', array(), false, true);
			wp_enqueue_script( 'my_admin_custom', WDButton_URL.'admin/js/my_admin_custom.js', array(), false, true );
			/*****/
		}	

	}

	function WDButton_review_notice(){
		$review = get_option( 'wdbutton_review_data' );
		//print_r($review);
		$time	= time();
		$load	= false;
		if ( ! $review ) {
			$review = array(
				'time' 		=> $time,
				'dismissed' => false
				);
			add_option('wdbutton_review_data', $review);
		//$load = true;
			
		} else {
		// Check if it has been dismissed or not.			
			if ( (! $review['dismissed']) && ($review['time'] + (DAY_IN_SECONDS * 4) <= $time) ) {
				$load = true;
			}
		}
	// If we cannot load, return early.
		if ( ! $load ) {
			return;
		}

	// We have a candidate! Output a review message.
		?>
		
		<div class="notice notice-success is-dismissible notice-box">

			<p style="font-size:16px;">'Hi! We saw you have been using <strong>Button plugin</strong> for a few days and wanted to ask for your help to <strong>make the plugin better</strong>.We just need a minute of your time to rate the plugin. Thank you!</p>
			<p style="font-size:16px;"><strong><?php _e( '~ webdzier', '' ); ?></strong></p>
			<p style="font-size:17px;"> 
				<a style="color: #fff;background: #ef4238;padding: 5px 7px 4px 6px;border-radius: 4px;" href="https://wordpress.org/support/plugin/button/reviews/?filter=5" class="wdbutton-dismiss-review-notice review-out" target="_blank" rel="noopener"><?php _e('Rate the plugin','button') ?></a>&nbsp; &nbsp;
				<a style="color: #fff;background: #27d63c;padding: 5px 7px 4px 6px;border-radius: 4px;" href="#"  class="wdbutton-dismiss-review-notice rate-later" target="_self" rel="noopener"><?php _e( 'Nope, maybe later', '' ); ?></a>&nbsp; &nbsp;
				<a style="color: #fff;background: #31a3dd;padding: 5px 7px 4px 6px;border-radius: 4px;" href="#" class="wdbutton-dismiss-review-notice already-rated" target="_self" rel="noopener"><?php _e( 'I already did', '' ); ?></a>
			</p>
		</div>
		<script type="text/javascript">
		jQuery(function($){
			jQuery(document).on("click",'.wdbutton-dismiss-review-notice',function(){
				if ( $(this).hasClass('review-out') ) {
					var wdbtn_rate_data_val = "1";
				}
				if ( $(this).hasClass('rate-later') ) {
					var wdbtn_rate_data_val =  "2";
					event.preventDefault();
				}
				if ( $(this).hasClass('already-rated') ) {
					var wdbtn_rate_data_val =  "3";
					event.preventDefault();
				}

				$.post( ajaxurl, {
					action: 'WDButton_dismiss_review',
					wdbtn_rate : wdbtn_rate_data_val
				});
				
				$('.notice-box').hide();
			});
		});
		</script>
		<?php
	}

	function WDButton_dismiss_review(){
		if ( ! $review ) {
			$review = array();
		}

		if($_POST['wdbtn_rate']=="1"){
			$review['time'] 	 = time();
			$review['dismissed'] = true;

		}
		if($_POST['wdbtn_rate']=="2"){
			$review['time'] 	 = time();
			$review['dismissed'] = false;

		}
		if($_POST['wdbtn_rate']=="3"){
			$review['time'] 	 = time();
			$review['dismissed'] = true;

		}
		
		update_option( 'wdbutton_review_data', $review );
		die;
	}
}
?>