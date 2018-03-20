<!doctype html>  
<!--[if IEMobile 7 ]> <html <?php language_attributes(); ?>class="no-js iem7"> <![endif]-->
<!--[if lt IE 7 ]> <html <?php language_attributes(); ?> class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html <?php language_attributes(); ?> class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html <?php language_attributes(); ?> class="no-js ie8"> <![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)|!(IEMobile)|!(IE)]><!--><html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title><?php wp_title(''); ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Chrome, Firefox OS and Opera -->
<meta name="theme-color" content="#294d7d">
<!-- Windows Phone -->
<meta name="msapplication-navbutton-color" content="#294d7d">
<link rel="icon" href="/wp-content/img/favicon.ico" type="image/x-icon">
<link rel="apple-touch-icon" href="/wp-content/img/apple-touch-icon.png">
<link href='https://fonts.googleapis.com/css?family=Arimo' rel='stylesheet' type='text/css'>
<?php wp_head(); ?>
<!-- IE8 fallback moved below head to work properly. Added respond as well. Tested to work. -->
<!-- media-queries.js (fallback) -->

<!--[if lt IE 9]>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/livingston-css3-mediaqueries-js/1.0.0/css3-mediaqueries.min.js"></script>	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

<!--[if lte IE 8]>
  <div class="alert alert-dismissable alert-warning" id="ie-warning" aria-hidden="true">
    <button type="button" class="close" data-dismiss="alert">×</button>
    <p><strong>Notice</strong>: You are using Internet Explorer version 8 or below. Support for these browsers has been <a href="https://www.microsoft.com/en-us/WindowsForBusiness/End-of-IE-support" target="_blank">discontinued</a>. For your safety &amp; user experience, please upgrade to a modern web browser such as: <a href="https://www.google.com/chrome/browser/desktop/" target="_blank">Google Chrome</a>, <a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank">Mozilla Firefox</a>, or Microsoft <a href="https://windows.microsoft.com/en-us/internet-explorer/download-ie" target="_blank">Internet Explorer 11</a>.</p>
</div>
<![endif]-->
<link rel="stylesheet" type="text/css" href="/wp-content/uploads/2015/02/flexslider.css">
</head>

<body <?php body_class(); ?> style="background:url(/wordpress/wp-content/img/pixels.png)">
<!--googleoff: snippet-->
<div id="header-region" class="navbar navbar-default pagetemp-header" role="banner" style="background: url(/wordpress/wp-content/img/capital-bkrd-blue.jpg)no-repeat;width: 100%;height:  auto;background-color: #11305c;background-position:  center;">
	<div class="container">
		<div class="row">
			<div class="navbar-header">
				<a href="/wordpress/" class="navbar-brand text-hide"> BuyMissouri Logo<img src="/wordpress/wp-content/img/buymologowithtext.png" alt="BuyMissouri Logo" class="col-xs-9" id="logo" style="
    width: 450px;
"></a>
				<div class="clearfix visible-xs"></div>  
				<div id="utility-bar-region" class="col-sm-7 col-sm-push-5" style="width: 500px;position:  absolute;left: auto; background-color:#294d7d;">
					<div class="row">
						<div id="utility-bar" class="hidden-xs col-sm-8 col-md-9 col-lg-8">  
							<h2 class="sr-only">Quick Navigation</h2>
							<ul>
								<li id="skiptocontent"><a href="#main" class="sr-only sr-only-focusable">Skip to Main Content</a></li>
								<li><a href="https://www.mo.gov" class="new-window">MO.gov</a></li>
								<li><a href="https://www.mo.gov/search-results?mode=state_agencies" class="new-window">Find an Agency</a></li>
								<li class="last"><a href="https://www.mo.gov/search-results?mode=online_services" class="new-window">Online Services</a></li>
							</ul>
						</div><!--end utility-bar-->

						<div id="search" role="search" class="col-xs-12 col-sm-4 col-md-3 col-lg-4">
							<!-- Google Search Code -->
							<form action="https://search.mo.gov/search" method="get">
								<fieldset>
									<legend class="sr-only">Search</legend>
									<div class="form-group">
										<label for="siteQ" class="sr-only">Search</label>
										<input type="search" id="siteQ" name="q" placeholder="Search" class="form-control" title="Enter Search Query">
									</div>
									<button type="submit" id="btg" class="btn text-hide">Search</button>
									<input type="hidden" name="access" value="a">
									<input type="hidden" name="site" value="ltgov">
									<input type="hidden" name="output" value="xml_no_dtd">
									<input type="hidden" name="client" value="ltgov">
									<input type="hidden" name="num" value="10">
									<input type="hidden" name="proxystylesheet" value="ltgov">
								</fieldset>
							</form>          

							<div id="navigate">
								<button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar-main">
									<span class="sr-only">Mobile Menu Button</span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
								</button>
							</div>
						</div><!--end search div-->
						<div class="clearfix"></div>

						<div id="toolbar" class="col-xs-12">
							<h2 class="sr-only">Toolbar Links</h2>
							<ul>
								<li><a href="mailto:ltgovinfo@ltgov.mo.gov" class="email text-hide" title="Email us">Email us</a></li>
								<li><a href="https://twitter.com/MOLtGov" target='_blank' class="twitter text-hide" title="Follow @MOLtGov on Twitter">Follow @MOLtGov on Twitter</a></li> 
								<li><a href="https://www.facebook.com/MOLtGov/" target='_blank' class="facebook text-hide" title="Like Mike on Facebook">Like us on Facebook</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="menu">
		<div class="container" style="position: relative; top:45px;">
			<div class="row">
				<div class="navbar-collapse collapse" id="navbar-main" style="position: absolute; top: 0px;height: 1px;width: 1170px;margin-left:  auto;margin-right:  auto;">
					<ul class="nav navbar-nav yamm" id="navbar-lt" style="    background: #BD272F;    border-bottom: 5px solid #BD272F;">
						<li><a href="/wordpress/" >HOME</a></li>
						<li><a href="/wordpress/about/">ABOUT</a></li>
						<li><a href="/wordpress/business-directory/">BUSINESS DIRECTORY</a></li>
						<li><a href="/wordpress/business-spotlights/">BUSINESS SPOLIGHTS</a></li>
						<li><a href="/wordpress/sign-up/">SIGN UP</a></li>
						<li><a href="/wordpress/partners/">PARTNERS</a></li>
						<li><a href="/wordpress/news-events/">NEWS & EVENTS</a></li>
						<li><a href="/wordpress/contact-us/">CONTACT US</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!--PAGEWATCH-->
</div>
<!--googleon: snippet-->