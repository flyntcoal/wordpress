 <?php
 /*
 Template Name: Contact Us
 */
?>
	<?php get_header(); ?>
	<div class="container"style="
    position:  relative;
    top: 45px;
	width: 1170px;
">
		<div class="row">
			<div class="col-md-12">
				<div id="main" class="col-md-12 margin-bottom-25 main-ltgov" role="main" style="height: 725px;">

					<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
					<header>			
							<div class="page-header"><h1><?php the_title(); ?></h1></div>
						</header> <!-- end article header -->
					<article id="post-<?php the_ID(); ?>" <?php post_class('col-md-8 margin-bottom-15 clearfix'); ?> role="article" style="width: 100%;min-height: 500px;">
						
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
							<p> <?php _e("Sorry, but the requested resource was not found on this site.", "wpbootstrap"); ?></p>
						</section>
					</article>

					<?php endif; ?>
				
				</div> <!-- end #main -->
				
				<!--<div class="col-md-4">
					
				</div>-->
				</div>
			</div>
		</div>
		<?php get_footer(); ?>

<!--<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>-->
<script>window.jQuery || document.write('<script src="/wp-content/js/jquery.min.js">\x3C/script>')</script>
<script type="text/javascript" src="/wp-content/js/modernizr.custom.js"></script>
<!--<script type="text/javascript" src="/wp-content/js/bootstrap.min.js"></script>-->
<script type="text/javascript" src="/wp-content/js/global.js"></script>
</body>
</html>