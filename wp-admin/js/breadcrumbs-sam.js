//////////////////////////////////////////////////////////////////////////////
//                         Nifty Breadcrumbs Script                         //
//////////////////////////////////////////////////////////////////////////////
// 
// This is a neat little script that takes your site's file/folder structure
// and converts it into breadcrumbs. As an added bonus, it forces you to
// create a structure that is optimal for search engines to index and rank!
//
// CONTRIBUTORS:
//
// Original Creator:
//     Paul Hirsch
//     www.paulhirsch.com - personal site
//
// Tested by:
//     International Web Developers Network (IWDN)
//     www.iwdn.net - home page
//     www.iwdn.net/index.php - forums/community where testing took place
//
// Other Contributors:
//
//     Sam Minter
//	   - Added removal of a tag from self referencing page links to make breadcrumb navigation less confusing. Also removed the need to explicitly define the domain 
//    	 name as a variable to prevent it from hanging when run from an unspecified domain.
//
// VERSIONS:
//
// 2.0
//     - COMPLETE overhaul of markup, from the ground up!
//     - Removed all requirements for a file extension to be set.
//     - Folder roots have been eliminated.  Now, when visitors step up the
//       breadcrumbs, they are taken to the parent folder via "../" only.
//     - Removed the script portion that parses the jumplink octothorpe. It
//       wasn't really doing anything all that useful.
//     - Script now functions at any folder level, not just the domain root.
//     - Updated instructions.  The script is now much easier to use!
//
// 1.1
//     - A little code cleanup.  Double quotes replaced with single quotes,
//       escaped characters unescaped.
//     - Word separators (underscore, hyphen, etc.) are now user-declared.
//     - Custom word replacement now available.  Use your own words in place
//       of your folder/file names.
// 1.0
//     - Original breadcrumbs script released.
//
// INSTRUCTIONS:
//
// 1.  Create your site structure using folders and files with useful names.
//     You may choose any character you'd like to replace spaces in your
//     URLs.  I recommend using underscores (as in the example below), but
//     this script will allow you to specify any single character you'd like
//     to be the replacement for spaces.  If you use something other than
//     underscores, you will need to make a change in the variables section.
//
//     EXAMPLE: http://www.squid.com/My_Pet_Squid/Meet_Rocky.html shows good
//     name choices to describe an area of content and the contents of a page.
//    
//     Alternatively, you can setup mod_rewrite via your .htaccess file to
//     create friendly URLs such as the one above.
//
// 2.  Fill in the settings for the variables in the next section of this
//     script.  They should be pretty self-explanatory.
//
// 3.  Add the following to your site wherever you want your breadcrumbs
//     to appear (change the path to point to wherever you put this script):
//
//     <div id="breadcrumbs"></div>
//     <script type="text/javascript" src="path/to/breadcrumbs.js"></script>
//
// LICENSE:
//
// This script is protected under General Public License (GPL).  Feel free to
// redistribute this script, so long as you do not alter any of the contents
// specifying authorship.  If you add to or modify this script, you may add
// your name to the "Other Contributors" list at the top of this script.  As
// a courtesy, please email me and let me know how you've improved my script!
// You may not profit from the direct sale of this script.  You may use this
// script in commercial endeavors however (i.e. as part of a commercial site).
//
// Email me here: http://www.paulhirsch.com/contact_me.php
//
// Copyright 2006, Paul Hirsch. All rights specified herein and within GPL
// documentation: http://www.gnu.org/licenses/gpl.txt
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Change the following variables as instructed                             //
//////////////////////////////////////////////////////////////////////////////
$( document ).ready(function() {
	$('.breadcrumb').attr('id', 'breadcrumbs');


// Enter your domain name or base URL here, NO TRAILING SLASH!
var baseurl = window.location.host;

// Enter the word you want to use to describe the home page of your site
var home = "<span class='glyphicon glyphicon-home'></span>";
//var home = "Home"; If you want home to read "Home" instead of the icon

// Enter the character(s) you want to use to separate your breadbrumbs
var divide = "&nbsp;";

// Enter text you'd like to see.  You can make this blank as well - "";
var pre = "";

// Enter the character that replaces spaces in your URL (i.e. - or _ or %20)
var sp = "_";

// Want to replace any folder names with custom names of your own?  Create
// replacement pairs in the following format: swap[i] = 'Old Words|New Words';
swap = new Array(); // Don't touch this line!
// Remove comments from swap array variables below to put them into use.
// Create additional replacement items by increasing the array number [i] as
// you add more lines.

//swap[0] = 'Replace Me|My Replacement';
// swap[1] = 'Replace Me|My Replacement';
swap[0] = 'styleguide|Style Guide';

//////////////////////////////////////////////////////////////////////////////
// DO NOT TOUCH ANYTHING BELOW THIS LINE                                    //
// unless you know damned well what you're doing!                           //
//////////////////////////////////////////////////////////////////////////////

var url = '' + window.location;
var code = '', left, newwords, oldwords, right, stop = 0, up = './', url2;

url = url.substring(url.indexOf('//')+2);

if (url.substring(0,url.lastIndexOf('.')).length>url.substring(0,url.lastIndexOf('/')).length) url = url.substring(0,url.lastIndexOf('.'));

left = url.substring(0,url.lastIndexOf('/'));
right = url.substring(url.lastIndexOf('/')+1);
if (right !== '') code = right.replace(new RegExp(sp, 'g'),' ') + code;

if ((url === baseurl) || (url === 'www.' + baseurl) || (url === baseurl + '/') || (url === 'www.' + baseurl + '/')) {
	code = pre + home;
} else {
	do {
		url = left;
		left = url.substring(0,url.lastIndexOf('/'));
		right = url.substring(url.lastIndexOf('/')+1);
		code = '<li><a href="' + up + '" title="Go Back one Directory">' + right.replace(new RegExp(sp, 'g'),' ') + '</a></li>' + code;
		up += '../'
		if ((url === 'www.' + baseurl) || (url === baseurl)) stop = 1;
	} while (stop !== 1)
	code = pre + code
	code = code.replace(right, home);
}

for (i=0 ; i<swap.length ; i++) {
	oldwords = swap[i].substr(0,swap[i].lastIndexOf('|'));
	newwords = swap[i].substr(swap[i].lastIndexOf('|')+1);
	code = code.replace(new RegExp(oldwords, "g"),newwords);
}

document.getElementById('breadcrumbs').innerHTML = code;


function clearCurrentLink(){
    var a = document.getElementById('breadcrumbs').getElementsByTagName("A");
    for(var i=0;i<a.length;i++)
        if(a[i].href == window.location.href.split("#")[0])
            removeNode(a[i]);
}

function removeNode(n){
    if(n.hasChildNodes())
        for(var i=0;i<n.childNodes.length;i++)
            n.parentNode.insertBefore(n.childNodes[i].cloneNode(true),n);
    n.parentNode.removeChild(n);
}

clearCurrentLink();

$("#breadcrumbs li:last-child").addClass("active");
});