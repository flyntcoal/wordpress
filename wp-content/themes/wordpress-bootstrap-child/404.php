<?php get_header(); ?>
		<div class="container">
			<div id="content" class="clearfix row">
				<div class="col-md-12">
					<div id="main" class="col-md-12 main-ltgov main-ltgov-news clearfix" role="main">
						<div class="col-md-8 col-sm-7">
							<article id="post-not-found" class="clearfix">
								<header>
									<div class="hero-unit">
										<h1><?php _e("404 - Page Not Found","wpbootstrap"); ?></h1>
										<p><?php _e("I'm sorry. We can't find what you were looking for.","wpbootstrap"); ?></p>								
									</div>
								</header> <!-- end article header -->
								
								<section class="post_content">	
									<p><?php _e("Whatever you were looking for was not found, but maybe try looking again or search using the form above.","wpbootstrap"); ?></p><br><br>
									<!--<div class="row">
										<div class="col col-lg-12">
											<?php get_search_form(); ?>
										</div>
									</div>-->
									
									<div class="col-md-6 home-section">
										<div class="row">
											<div class="col-md-12">
												<a class="pull-left" id="twitter_large" title="Follow @MikeParsonforMO on Twitter" target="_blank" href="https://twitter.com/MikeParsonforMO"><img class="img-responsive" src="/wp-content/img/mp-twitter.png" alt="Twitter Button"></a><a class="pull-right" id="facebook_large" title="Like Mike on Facebook" target="_blank" href="https://www.facebook.com/TeamMikeParson"><img class="img-responsive" src="/wp-content/img/pk-facebook.png" alt="Facebook Button"></a>
											</div>
										</div>
										<div class="row">
											<div class="col-md-12">
												<a class="pull-left" title="Subscribe to our Youtube Channel" id="youtube_large" target="_blank" href="https://www.youtube.com/user/mogov1"><img class="img-responsive social-connect" src="/wp-content/img/pk-youtube.png" alt="Youtube Button"></a><a class="pull-left" title="Follow us on Flickr" id="flickr_large" target="_blank" href="https://www.flickr.com/photos/48275616@N07/"><img class="img-responsive social-connect" src="/wp-content/img/pk-flickr.png" alt="Flickr Button"></a><a class="pull-right" title="Contact Us" id="contact_us_large" target="_blank" href="mailto:ltgovinfo@ltgov.mo.gov"><img class="img-responsive social-connect" src="/wp-content/img/mp-contact.png" alt="Contact Us Email Button"></a>
											</div>
										</div>
										<div class="row">
											<div class="col-md-12">
												<!-- Begin MailChimp Signup Form -->
												<div id="mc_embed_signup">
													<form action="//ltgov.us9.list-manage.com/subscribe/post?u=f7ae4910c2fb15c571b52f32d&amp;id=c33adc9b97" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
													<div id="mc_embed_signup_scroll">
													<p id="signup-heading" class="visible-xs-block">Subscribe to updates from the Lt. Governor</p>
													<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required><!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
													<div style="position: absolute; left: -5000px;"><input type="text" name="b_f7ae4910c2fb15c571b52f32d_c33adc9b97" tabindex="-1" value=""></div>
													<div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
													</p>
													</div>
													</form>
												</div>
												<!--End mc_embed_signup-->
											</div>
										</div>
									</div>
								</section> <!-- end article section -->
							</article> <!-- end article -->
						</div>
						<div class="margin-top-60">
							<?php get_sidebar(); // sidebar 1 ?>
						</div>
					</div> <!-- end #content -->
				</div>
			</div>
		</div>
<?php get_footer(); ?>
<!--<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>-->
<script>window.jQuery || document.write('<script src="/wp-content/js/jquery.min.js">\x3C/script>')</script>
<script type="text/javascript" src="/wp-content/js/modernizr.custom.js"></script>
<script type="text/javascript" src="/wp-content/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/wp-content/js/global.js"></script>