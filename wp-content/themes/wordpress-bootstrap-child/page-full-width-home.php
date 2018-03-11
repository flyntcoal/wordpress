<?php
/*
Template Name: Full Width Page Home
*/
?>

	<?php get_header('home'); ?>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div id="main" class="col-md-12 margin-bottom-25 main-home" role="main">
 
					<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

					<article id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?> role="article">
						<section>
						
						
						
						
							<?php the_content(); ?>
						</section> <!-- end article section -->
					</article> <!-- end article -->

					<?php endwhile; ?>	

					<?php else : ?>

					<article id="post-not-found">
						<header>
							<h1><?php _e("Not Found", "wpbootstrap"); ?></h1>
						</header>
						<section class="post_content">
							<p><?php _e("Sorry, but the requested resource was not found on this site.", "wpbootstrap"); ?></p>
						</section>
					</article>

					<?php endif;  wp_reset_postdata(); ?>
				</div> <!-- end #main -->
				</div>
			</div>
		</div>
		<?php get_footer(); ?>


<!--<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>-->
<script>window.jQuery || document.write('<script src="/wp-content/js/jquery.min.js">\x3C/script>')</script>
<script type="text/javascript" src="/wp-content/js/modernizr.custom.js"></script>
<!--<script type="text/javascript" src="/wp-content/js/bootstrap.min.js"></script>-->
<script type="text/javascript" src="/wp-content/js/global.js"></script>
<script src="/wp-content/js/jquery.flexslider-min.js"></script>
<script type="text/javascript">
jQuery(window).ready(function() {
  jQuery('.flexslider').flexslider({
	animation: "fade",
	pausePlay: true,
	pauseText: "Pause",
	playText: "Play",
	prevText: "Previous",
	nextText: "Next",
	controlNav: false
 });
});
</script>
</body>
</html>