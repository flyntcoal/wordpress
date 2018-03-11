<?php
/*
Template Name: Page with Section Header
*/
?>

	<?php get_header(); ?>
	<div class="container">
		<div id="ltgov-oage-header" class="row">
			<div class="col-md-12">
				<div id="main" class="col-md-12 margin-bottom-25" role="main">

					<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

					<article id="post-<?php the_ID(); ?>" <?php post_class('margin-top-25 clearfix'); ?> role="article">
						<header>
									
									<div class="page-header"><h1><?php the_title(); ?></h1></div>
								
								</header> <!-- end article header -->
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

					<?php endif; ?>
				</div> <!-- end #main -->
				</div>
			</div>
		</div>
		<?php get_footer(); ?>

<script type="text/javascript" src="/wp-content/themes/wordpress-bootstrap/library/js/global.js"></script>
</body>
</html>