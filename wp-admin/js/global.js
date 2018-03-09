//This code prevents us from having to add those ugly IE specific conditional classes to the html tag by hand. This is less than ideal since we'll be unable to target IE without javascript enabled, but since we're using html5 basic tags won't function anyway in any IE less than 9, so I think we're safe. 
function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);



jQuery(document).ready(function() {

	Modernizr.addTest('hiddentest', jQuery(".hidden-xs").is(':hidden'));
	//Modernizr.addTest('ticker', jQuery('[id*="newsticker"]').length > 0);
	//Modernizr.addTest('breadcrumbs', jQuery('[id*="breadcrumbs"]').length > 0);
	//Modernizr.addTest('megamenu', jQuery('[id*="megamenu"]').length > 0);
	//Modernizr.addTest('footable', !jQuery('table.footable').length > 0);
	//Modernizr.addTest('menuhover', jQuery('.dropdown-toggle').length > 0);

  	Modernizr.load([
	/*{
		test: Modernizr.menuhover,
		yep: ['/bower_components/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js'],
		callback: function(){
			jQuery('.dropdown-toggle').dropdownHover();	
		}
	},
	 {
	     test: Modernizr.mq('only screen and (max-width: 1200)'),
	     nope: ['/css/footable.core.css','/js/footable.js'],
	 	complete: function(){
	 		jQuery('.footable').footable({
	     		breakpoints: {
	         		tiny: 480,
	         		medium: 1024,
	         		big: 1200
	     		}
	 		});
		}
	 },
	{
    	test: Modernizr.breadcrumbs,
    	yep: '/wp-content/js/breadcrumbs.js'
	},
	{
    	test: Modernizr.ticker,
    	yep: '/wp-content/js/inewsticker.js',
    	callback: function () {
      	//Run this when the 'jquerycycle' and '!hiddentest' condition is met
	  		jQuery('.news li').show();

			jQuery('.news').inewsticker({
				speed       : 3200,
				effect      : 'fade',
				dir         : 'ltr',
				font_size   : 13,
				color       : '#fff',
				font_family : 'arial',
				delay_after : 1000		
			});
	}
	},*/
	{
    	test: Modernizr.details,
    	nope: '/wp-content/js/jquery.details.min.js'
	},
	{
    	test: Modernizr.placeholder,
    	nope: '/wp-content/js/jquery.placeholder.min.js',
		callback: function(){
			jQuery('input, textarea').placeholder();
		}
	},

  ]);//End Modernizr.load

  	/* Changes relative paths to absolute urls for print styles */
	var css = "@media print {#content a[href^=\"/\"]:after {content: \"(" + window.location.protocol + "//" + window.location.host + "\"attr(href)\"" + ")\"; }}",
	    head = document.head || document.getElementsByTagName('head')[0],
	    style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}
	head.appendChild(style);

  	// Creating custom :external selector
 	jQuery.expr[':'].external = function(obj){
      return !obj.href.match(/^mailto\:/) && !obj.href.match(/\.gov/) && !obj.href.match(/\.state\.mo\.us/) && !obj.href.match(/\.us/) && !obj.href.match(/^javascript\:/) && !obj.href.match(/\youtube\.com\/\user\/\mogov1/) && !obj.href.match(/\moguard\.com/) && !obj.href.match(/\modot\.org/);
  	}


	// Add 'external' CSS class to all external links
  	jQuery('a:external').addClass('external');
	
	// Remove 'external' CSS class from admin approved, whitelisted websites with complex, hard to escape urls like pages on visitmo.com
	// Only use if !obj.href.match doesn't work.
	//jQuery("a[href*='visitmo.com']").removeClass("external");
	jQuery("a[href*='twitter.com/MoGov'], a[href*='twitter.com/MOLtGov'], a[href*='facebook.com/MOLtGov'], a[href*='facebook.com/pages/State-of-Missouri/'], a[href*='facebook.com/mogov'], a[href*='flickr.com/photos/130030129@N08'], a[href*='youtube.com/channel/UChBGEP5EcO7ADYRaeoOwI8Q'], a[href*='twitter.com/peterkinder'],  a[href*='facebook.com/peterkinder.fanpage'], a[href*='flickr.com/photos/48275616@N07']").removeClass("external");

	jQuery("a[href*='http://']:not([href*='"+location.hostname+"'])").not(".external").addClass('new-window');
	jQuery("a[href*='http://']:not([href*='"+location.hostname+"'])").not(".external").click( function() {
		window.open(this.href);
		return false
		});
	
	// Add external link disclaimer icon
	jQuery('.external').append("<span class='external-link' aria-hidden='true'></span>");
	// Add pdf icons to pdf links
	jQuery('a[href$=".pdf"],.pdf').addClass("pdf");
	jQuery('.pdf').append("<span class='pdf-label' aria-hidden='true'><b class='hide'>PDF Document</b></span>");

	// Add xls icons to excel links (xls, xlsx)
	jQuery("a[href$='.xls'], a[href$='.xlsx'],.xls").addClass("xls");
	jQuery('.xls').append("<span class='xls-label' aria-hidden='true'><b class='hide'>Excel Spreadsheet</b></span>");

	// Add doc icons to word links (doc, docx, txt)
	jQuery("a[href$='.doc'], a[href$='.docx'], a[href$='.txt'],.doc").addClass("doc");
	jQuery('.doc').append("<span class='doc-label' aria-hidden='true'><b class='hide'>Word Document</b></span>");

	//Add icons to powerpoint links (ppt, pptx)
	jQuery("a[href$='.ppt'], a[href$='.pptx'],.ppt").addClass("ppt");
	jQuery('.ppt').append("<span class='ppt-label' aria-hidden='true'><b class='hide'>Powerpoint Presentation</b></span>");
	
	// Add icons to compressed files (zip, gzip, 7zip)
	jQuery("a[href$='.zip'], a[href$='.gzip'], a[href$='.rar'],.zip").addClass("zip");
	jQuery('.zip').append("<span class='zip-label' aria-hidden='true'><b class='hide'>Compressed Archive</b></span>");
	
	// Add icons to XML files (xml)
	jQuery("a[href$='.xml'],.xml").addClass("xml");
	jQuery('.xml').append("<span class='xml-label' aria-hidden='true'><b class='hide'>XML Document</b></span>");
			
	jQuery("a.external:has(img) .external-link, #connect:has('.external') .external-link, #toolbar:has('.external') .external-link, a.pdf:has(img) .pdf-label, a.pdf:has(button) .pdf-label, button:has(a) .pdf-label, a.xls:has(img) .xls-label, a.doc:has(img) .doc-label, .share-container ul li .external-link, a.rss .xml-label").remove();	
	
	//External Link Native Bootstrap Modal
	if ( jQuery(this).width() > 739 ) {
		
		jQuery('a.external').click(function (e) {
			
			var link = jQuery(this).attr('href');
			e.preventDefault();

			jQuery('body').append("<div id='modal-content' class='modal fade external-modal' tabindex='-1' role='dialog' aria-labelledby='externalModalTitle' aria-describedby='external link warning' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='bg-primary'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><div class='modal-title' id='externalModalTitle'><b>Warning - Exiting Site</b></div></div></div><div class='modal-body'><p>Beware, you are currently exiting to an external site that is not part of the government(.gov) domain. Please be aware that you will be subject to a wide variety of content and experiences that are beyond our control. Always use good judgement when using these platforms and when following links to other web sites.</p></br></br>Click \"Yes\" to Continue to: <p class='external-warning'><span id='url' class='label label-warning'></span></p></div><div class='modal-footer'><a id='link' class='btn btn-warning' href='" + (link) + "' target='_blank' title='Exit MO.Gov page and open external link'>Yes</a><a href='#' class='btn btn-primary' title='Cancel and stay on current page' data-dismiss='modal'>No</a></div></div></div>");
			jQuery('#modal-content').on('show.bs.modal', function () {
				jQuery("#link").attr("href", link);
				//jQuery("#link").attr("data-dismiss",'modal');
				 
			    var msg = (link);
			    jQuery('#url').text(msg);
			    jQuery('#link').click(function(){
			    	jQuery('#modal-content').modal('hide');
			    });
			});

			//initializes and invokes modal show
			jQuery('#modal-content').modal({
		        show: true,
		        keyboard: true
		   	});
		});
	}
})