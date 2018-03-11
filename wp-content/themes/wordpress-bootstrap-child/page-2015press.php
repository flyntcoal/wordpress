 <?php
 /*
 Template Name: 2015press
 */
?>
<?php get_header(); ?>
				<div class="container">
			<div id="content" class="clearfix row">
				<div class="col-md-12">
				<div id="main" class="col-md-12 main-ltgov main-ltgov-news clearfix" role="main">
					<div class="page-header"><h1>2015 Press Releases</h1></div>
					<div class="col-md-8 col-sm-7">

					<?php
						global $more;    // Declare global $more (before the loop).
						$more = 0;       // Set (inside the loop) to display content above the more tag. 

						// The Query
						$args =  array(
							'post_type'=> 'news',
							'tax_query' => array(
								array(
									'taxonomy' => 'news_category',
									'field'    => 'slug',
									'terms'    => 'press-2015',
								),
							),
		
						);
						// the query
						$the_query = new WP_Query( $args );  
					
						if ($the_query->have_posts()) : while ($the_query->have_posts()) : $the_query->the_post(); 
					?>
			
		
					<article id="post-<?php the_ID(); ?>" <?php post_class('margin-bottom-5 clearfix'); ?> role="article">
						
						<header>
						
							<a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php the_post_thumbnail( 'wpbs-featured' ); ?></a>
							
							<p class="meta"><div class="date"><?php
							  // If we are in a loop we can get the post ID easily
							  $date = get_post_meta( get_the_ID(), 'news_date', true );
							  $mydate = strtoTime($date);
							  echo $printdate = date('F d, Y', $mydate);
							  //echo $date;
							  
							  $date = get_post_meta( $news_id, 'news_date', true );
							  $mydate = strtoTime($date);
							  //echo $printdate = date('F d, Y', $mydate);
							  //echo $date;
							?> </div>
							<a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a>
							</p>			
							
						</header> <!-- end article header -->
					
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
					    <footer>
					    </footer>
					</article>
					
					<?php endif; ?>
					</div>
				<?php get_sidebar(); // sidebar 1 ?>
				</div> <!-- end #main -->
    
				
    		</div>
			</div> <!-- end #content -->
			</div>

<?php get_footer(); ?>

<!--<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>-->
<script>window.jQuery || document.write('<script src="/wp-content/js/jquery.min.js">\x3C/script>')</script>
<script type="text/javascript" src="/wp-content/js/modernizr.custom.js"></script>
<script type="text/javascript" src="/wp-content/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/wp-content/js/global.js"></script>