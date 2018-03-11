<?php if (extension_loaded('newrelic')) {
    newrelic_disable_autorum();
} ?>
<!doctype html>
<html amp>
<head>
	<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<?php do_action( 'amp_post_template_head', $this ); ?>

	<style amp-custom>
	<?php $this->load_parts( array( 'style' ) ); ?>
	<?php do_action( 'amp_post_template_css', $this ); ?>
	</style>
</head>
<body>
<amp-analytics type="googleanalytics" id="amp-ga-wrapper">
<script type="application/json">
{
  "vars": {
    "account": "UA-10379756-4"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackClickOnHeader" : {
      "on": "click",
      "selector": "#amp-header",
      "request": "event",
      "vars": {
        "eventCategory": "ui-components",
        "eventAction": "header-click"
      }
    }
  }
}
</script>
</amp-analytics>
<nav class="amp-wp-title-bar" id="amp-header">
	<div>
		<a href="<?php echo esc_url( $this->get( 'home_url' ) ); ?>">
			<amp-img src="https://ltgov.mo.gov/wp-content/uploads/2017/05/missouri-lieutenant-governor-michael-parson-logo-1-300x58.jpg" width="300" height="58" class="amp-wp-site-icon" alt="Office of Missouri Lieutenant Governor Michael L. Parson"></amp-img>
		</a>
		<span class="amp-wp-title-text">
			<?php echo esc_html( $this->get( 'blog_name' ) ); ?>
		</span>
	</div>
</nav>
<div class="amp-wp-content">
	<h1 class="amp-wp-title"><?php echo wp_kses_data( $this->get( 'post_title' ) ); ?></h1>
	<ul class="amp-wp-meta">
		<?php $this->load_parts( apply_filters( 'amp_post_template_meta_parts', array( 'meta-author', 'meta-time', 'meta-taxonomy' ) ) ); ?>
	</ul>
	<?php echo $this->get( 'post_amp_content' ); // amphtml content; no kses ?>
</div>
<?php do_action( 'amp_post_template_footer', $this ); ?>

</body>
</html>