/**
 * @author Jasman <jasman@ihsana.com>
 * @copyright Ihsana IT Solutiom 2015
 * @package Galau UI
 *
 * tinymce.init({
 *      plugins:["gui_fontawesome",...],
 *      toolbar1:["gui_fontawesome|..."],
 *      gui_fontawesome:{menu:true,css:{exist:false, external:'http://ihsana.web.id/jz-includes/css/font-awesome/css/font-awesome.min.css'}},
 * });
 */
tinymce.PluginManager.add('gui_fontawesome', function(editor, url) {
	var icon_text = 'Font Awesome';
	var icon_selector = '.fa';
	var icon_name = 'gui_fontawesome';
	var icon_class = 'fontawesome guicon guicon-fontawesome';
	var icon_command = 'showGuiFontAwesome';
	var galau_ui_title = 'Galau UI - Font Awesome';
	var css_list = [url + '/assets/css/plugin.min.css'];
	var galau_ui_desc = 'Font Awesome gives you scalable vector icons that can instantly be customized<br/> size, color, drop shadow, and anything that can be done with the power of CSS.<br/><br/><p class="premium">Premium TinyMCE plugins (more than 24 plugin) with support <br/>many front-end framework like as Bootstrap, Foundation, FontAwesome, Animate.CSS and other. <br/>And also available plugin helper such as visualblocks and others.<br/><a href="http://codecanyon.net/item/gui-visual-editor-package-for-tinymce/14858024?ref=regel">Get it NOW! Only $20</a></p>';
	var icon_list = [
		["Search", "fa fa-search", "Search"],
		["Bluetooth", "fa fa-bluetooth", "Bluetooth"],
		["Bluetooth B", "fa fa-bluetooth-b", "Bluetooth B"],
		["Codiepie", "fa fa-codiepie", "Codiepie"],
		["Credit Card Alt", "fa fa-credit-card-alt", "Credit Card Alt"],
		["Edge", "fa fa-edge", "Edge"],
		["Fort Awesome", "fa fa-fort-awesome", "Fort Awesome"],
		["Hashtag", "fa fa-hashtag", "Hashtag"],
		["Mixcloud", "fa fa-mixcloud", "Mixcloud"],
		["Modx", "fa fa-modx", "Modx"],
		["Pause Circle", "fa fa-pause-circle", "Pause Circle"],
		["Pause Circle O", "fa fa-pause-circle-o", "Pause Circle O"],
		["Percent", "fa fa-percent", "Percent"],
		["Product Hunt", "fa fa-product-hunt", "Product Hunt"],
		["Reddit Alien", "fa fa-reddit-alien", "Reddit Alien"],
		["Scribd", "fa fa-scribd", "Scribd"],
		["Shopping Bag", "fa fa-shopping-bag", "Shopping Bag"],
		["Shopping Basket", "fa fa-shopping-basket", "Shopping Basket"],
		["Stop Circle", "fa fa-stop-circle", "Stop Circle"],
		["Stop Circle O", "fa fa-stop-circle-o", "Stop Circle O"],
		["Usb", "fa fa-usb", "Usb"],
		["Adjust", "fa fa-adjust", "Adjust"],
		["Anchor", "fa fa-anchor", "Anchor"],
		["Archive", "fa fa-archive", "Archive"],
		["Area Chart", "fa fa-area-chart", "Area Chart"],
		["Arrows", "fa fa-arrows", "Arrows"],
		["Arrows H", "fa fa-arrows-h", "Arrows H"],
		["Arrows V", "fa fa-arrows-v", "Arrows V"],
		["Asterisk", "fa fa-asterisk", "Asterisk"],
		["At", "fa fa-at", "At"],
		["Automobile", "fa fa-automobile", "Automobile"],
		["Balance Scale", "fa fa-balance-scale", "Balance Scale"],
		["Ban", "fa fa-ban", "Ban"],
		["Bank", "fa fa-bank", "Bank"],
		["Bar Chart", "fa fa-bar-chart", "Bar Chart"],
		["Bar Chart O", "fa fa-bar-chart-o", "Bar Chart O"],
		["Barcode", "fa fa-barcode", "Barcode"],
		["Bars", "fa fa-bars", "Bars"],
		["Battery 0", "fa fa-battery-0", "Battery 0"],
		["Battery 1", "fa fa-battery-1", "Battery 1"],
		["Battery 2", "fa fa-battery-2", "Battery 2"],
		["Battery 3", "fa fa-battery-3", "Battery 3"],
		["Battery 4", "fa fa-battery-4", "Battery 4"],
		["Battery Empty", "fa fa-battery-empty", "Battery Empty"],
		["Battery Full", "fa fa-battery-full", "Battery Full"],
		["Battery Half", "fa fa-battery-half", "Battery Half"],
		["Battery Quarter", "fa fa-battery-quarter", "Battery Quarter"],
		["Battery Three Quarters", "fa fa-battery-three-quarters", "Battery Three Quarters"],
		["Bed", "fa fa-bed", "Bed"],
		["Beer", "fa fa-beer", "Beer"],
		["Bell", "fa fa-bell", "Bell"],
		["Bell O", "fa fa-bell-o", "Bell O"],
		["Bell Slash", "fa fa-bell-slash", "Bell Slash"],
		["Bell Slash O", "fa fa-bell-slash-o", "Bell Slash O"],
		["Bicycle", "fa fa-bicycle", "Bicycle"],
		["Binoculars", "fa fa-binoculars", "Binoculars"],
		["Birthday Cake", "fa fa-birthday-cake", "Birthday Cake"],
		["Bolt", "fa fa-bolt", "Bolt"],
		["Bomb", "fa fa-bomb", "Bomb"],
		["Book", "fa fa-book", "Book"],
		["Bookmark", "fa fa-bookmark", "Bookmark"],
		["Bookmark O", "fa fa-bookmark-o", "Bookmark O"],
		["Briefcase", "fa fa-briefcase", "Briefcase"],
		["Bug", "fa fa-bug", "Bug"],
		["Building", "fa fa-building", "Building"],
		["Building O", "fa fa-building-o", "Building O"],
		["Bullhorn", "fa fa-bullhorn", "Bullhorn"],
		["Bullseye", "fa fa-bullseye", "Bullseye"],
		["Bus", "fa fa-bus", "Bus"],
		["Cab", "fa fa-cab", "Cab"],
		["Calculator", "fa fa-calculator", "Calculator"],
		["Calendar", "fa fa-calendar", "Calendar"],
		["Calendar Check O", "fa fa-calendar-check-o", "Calendar Check O"],
		["Calendar Minus O", "fa fa-calendar-minus-o", "Calendar Minus O"],
		["Calendar O", "fa fa-calendar-o", "Calendar O"],
		["Calendar Plus O", "fa fa-calendar-plus-o", "Calendar Plus O"],
		["Calendar Times O", "fa fa-calendar-times-o", "Calendar Times O"],
		["Camera", "fa fa-camera", "Camera"],
		["Camera Retro", "fa fa-camera-retro", "Camera Retro"],
		["Car", "fa fa-car", "Car"],
		["Caret Square O Down", "fa fa-caret-square-o-down", "Caret Square O Down"],
		["Caret Square O Left", "fa fa-caret-square-o-left", "Caret Square O Left"],
		["Caret Square O Right", "fa fa-caret-square-o-right", "Caret Square O Right"],
		["Caret Square O Up", "fa fa-caret-square-o-up", "Caret Square O Up"],
		["Cart Arrow Down", "fa fa-cart-arrow-down", "Cart Arrow Down"],
		["Cart Plus", "fa fa-cart-plus", "Cart Plus"],
		["Cc", "fa fa-cc", "Cc"],
		["Certificate", "fa fa-certificate", "Certificate"],
		["Check", "fa fa-check", "Check"],
		["Check Circle", "fa fa-check-circle", "Check Circle"],
		["Check Circle O", "fa fa-check-circle-o", "Check Circle O"],
		["Check Square", "fa fa-check-square", "Check Square"],
		["Check Square O", "fa fa-check-square-o", "Check Square O"],
		["Child", "fa fa-child", "Child"],
		["Circle", "fa fa-circle", "Circle"],
		["Circle O", "fa fa-circle-o", "Circle O"],
		["Circle O Notch", "fa fa-circle-o-notch", "Circle O Notch"],
		["Circle Thin", "fa fa-circle-thin", "Circle Thin"],
		["Clock O", "fa fa-clock-o", "Clock O"],
		["Clone", "fa fa-clone", "Clone"],
		["Close", "fa fa-close", "Close"],
		["Cloud", "fa fa-cloud", "Cloud"],
		["Cloud Download", "fa fa-cloud-download", "Cloud Download"],
		["Cloud Upload", "fa fa-cloud-upload", "Cloud Upload"],
		["Code", "fa fa-code", "Code"],
		["Code Fork", "fa fa-code-fork", "Code Fork"],
		["Coffee", "fa fa-coffee", "Coffee"],
		["Cog", "fa fa-cog", "Cog"],
		["Cogs", "fa fa-cogs", "Cogs"],
		["Comment", "fa fa-comment", "Comment"],
		["Comment O", "fa fa-comment-o", "Comment O"],
		["Commenting", "fa fa-commenting", "Commenting"],
		["Commenting O", "fa fa-commenting-o", "Commenting O"],
		["Comments", "fa fa-comments", "Comments"],
		["Comments O", "fa fa-comments-o", "Comments O"],
		["Compass", "fa fa-compass", "Compass"],
		["Copyright", "fa fa-copyright", "Copyright"],
		["Creative Commons", "fa fa-creative-commons", "Creative Commons"],
		["Credit Card", "fa fa-credit-card", "Credit Card"],
		["Crop", "fa fa-crop", "Crop"],
		["Crosshairs", "fa fa-crosshairs", "Crosshairs"],
		["Cube", "fa fa-cube", "Cube"],
		["Cubes", "fa fa-cubes", "Cubes"],
		["Cutlery", "fa fa-cutlery", "Cutlery"],
		["Dashboard", "fa fa-dashboard", "Dashboard"],
		["Database", "fa fa-database", "Database"],
		["Desktop", "fa fa-desktop", "Desktop"],
		["Diamond", "fa fa-diamond", "Diamond"],
		["Dot Circle O", "fa fa-dot-circle-o", "Dot Circle O"],
		["Download", "fa fa-download", "Download"],
		["Edit", "fa fa-edit", "Edit"],
		["Ellipsis H", "fa fa-ellipsis-h", "Ellipsis H"],
		["Ellipsis V", "fa fa-ellipsis-v", "Ellipsis V"],
		["Envelope", "fa fa-envelope", "Envelope"],
		["Envelope O", "fa fa-envelope-o", "Envelope O"],
		["Envelope Square", "fa fa-envelope-square", "Envelope Square"],
		["Eraser", "fa fa-eraser", "Eraser"],
		["Exchange", "fa fa-exchange", "Exchange"],
		["Exclamation", "fa fa-exclamation", "Exclamation"],
		["Exclamation Circle", "fa fa-exclamation-circle", "Exclamation Circle"],
		["Exclamation Triangle", "fa fa-exclamation-triangle", "Exclamation Triangle"],
		["External Link", "fa fa-external-link", "External Link"],
		["External Link Square", "fa fa-external-link-square", "External Link Square"],
		["Eye", "fa fa-eye", "Eye"],
		["Eye Slash", "fa fa-eye-slash", "Eye Slash"],
		["Eyedropper", "fa fa-eyedropper", "Eyedropper"],
		["Fax", "fa fa-fax", "Fax"],
		["Feed", "fa fa-feed", "Feed"],
		["Female", "fa fa-female", "Female"],
		["Fighter Jet", "fa fa-fighter-jet", "Fighter Jet"],
		["File Archive O", "fa fa-file-archive-o", "File Archive O"],
		["File Audio O", "fa fa-file-audio-o", "File Audio O"],
		["File Code O", "fa fa-file-code-o", "File Code O"],
		["File Excel O", "fa fa-file-excel-o", "File Excel O"],
		["File Image O", "fa fa-file-image-o", "File Image O"],
		["File Movie O", "fa fa-file-movie-o", "File Movie O"],
		["File Pdf O", "fa fa-file-pdf-o", "File Pdf O"],
		["File Photo O", "fa fa-file-photo-o", "File Photo O"],
		["File Picture O", "fa fa-file-picture-o", "File Picture O"],
		["File Powerpoint O", "fa fa-file-powerpoint-o", "File Powerpoint O"],
		["File Sound O", "fa fa-file-sound-o", "File Sound O"],
		["File Video O", "fa fa-file-video-o", "File Video O"],
		["File Word O", "fa fa-file-word-o", "File Word O"],
		["File Zip O", "fa fa-file-zip-o", "File Zip O"],
		["Film", "fa fa-film", "Film"],
		["Filter", "fa fa-filter", "Filter"],
		["Fire", "fa fa-fire", "Fire"],
		["Fire Extinguisher", "fa fa-fire-extinguisher", "Fire Extinguisher"],
		["Flag", "fa fa-flag", "Flag"],
		["Flag Checkered", "fa fa-flag-checkered", "Flag Checkered"],
		["Flag O", "fa fa-flag-o", "Flag O"],
		["Flash", "fa fa-flash", "Flash"],
		["Flask", "fa fa-flask", "Flask"],
		["Folder", "fa fa-folder", "Folder"],
		["Folder O", "fa fa-folder-o", "Folder O"],
		["Folder Open", "fa fa-folder-open", "Folder Open"],
		["Folder Open O", "fa fa-folder-open-o", "Folder Open O"],
		["Frown O", "fa fa-frown-o", "Frown O"],
		["Futbol O", "fa fa-futbol-o", "Futbol O"],
		["Gamepad", "fa fa-gamepad", "Gamepad"],
		["Gavel", "fa fa-gavel", "Gavel"],
		["Gear", "fa fa-gear", "Gear"],
		["Gears", "fa fa-gears", "Gears"],
		["Gift", "fa fa-gift", "Gift"],
		["Glass", "fa fa-glass", "Glass"],
		["Globe", "fa fa-globe", "Globe"],
		["Graduation Cap", "fa fa-graduation-cap", "Graduation Cap"],
		["Group", "fa fa-group", "Group"],
		["Hand Grab O", "fa fa-hand-grab-o", "Hand Grab O"],
		["Hand Lizard O", "fa fa-hand-lizard-o", "Hand Lizard O"],
		["Hand Paper O", "fa fa-hand-paper-o", "Hand Paper O"],
		["Hand Peace O", "fa fa-hand-peace-o", "Hand Peace O"],
		["Hand Pointer O", "fa fa-hand-pointer-o", "Hand Pointer O"],
		["Hand Rock O", "fa fa-hand-rock-o", "Hand Rock O"],
		["Hand Scissors O", "fa fa-hand-scissors-o", "Hand Scissors O"],
		["Hand Spock O", "fa fa-hand-spock-o", "Hand Spock O"],
		["Hand Stop O", "fa fa-hand-stop-o", "Hand Stop O"],
		["Hdd O", "fa fa-hdd-o", "Hdd O"],
		["Headphones", "fa fa-headphones", "Headphones"],
		["Heart", "fa fa-heart", "Heart"],
		["Heart O", "fa fa-heart-o", "Heart O"],
		["Heartbeat", "fa fa-heartbeat", "Heartbeat"],
		["History", "fa fa-history", "History"],
		["Home", "fa fa-home", "Home"],
		["Hotel", "fa fa-hotel", "Hotel"],
		["Hourglass", "fa fa-hourglass", "Hourglass"],
		["Hourglass 1", "fa fa-hourglass-1", "Hourglass 1"],
		["Hourglass 2", "fa fa-hourglass-2", "Hourglass 2"],
		["Hourglass 3", "fa fa-hourglass-3", "Hourglass 3"],
		["Hourglass End", "fa fa-hourglass-end", "Hourglass End"],
		["Hourglass Half", "fa fa-hourglass-half", "Hourglass Half"],
		["Hourglass O", "fa fa-hourglass-o", "Hourglass O"],
		["Hourglass Start", "fa fa-hourglass-start", "Hourglass Start"],
		["I Cursor", "fa fa-i-cursor", "I Cursor"],
		["Image", "fa fa-image", "Image"],
		["Inbox", "fa fa-inbox", "Inbox"],
		["Industry", "fa fa-industry", "Industry"],
		["Info", "fa fa-info", "Info"],
		["Info Circle", "fa fa-info-circle", "Info Circle"],
		["Institution", "fa fa-institution", "Institution"],
		["Key", "fa fa-key", "Key"],
		["Keyboard O", "fa fa-keyboard-o", "Keyboard O"],
		["Language", "fa fa-language", "Language"],
		["Laptop", "fa fa-laptop", "Laptop"],
		["Leaf", "fa fa-leaf", "Leaf"],
		["Legal", "fa fa-legal", "Legal"],
		["Lemon O", "fa fa-lemon-o", "Lemon O"],
		["Level Down", "fa fa-level-down", "Level Down"],
		["Level Up", "fa fa-level-up", "Level Up"],
		["Life Bouy", "fa fa-life-bouy", "Life Bouy"],
		["Life Buoy", "fa fa-life-buoy", "Life Buoy"],
		["Life Ring", "fa fa-life-ring", "Life Ring"],
		["Life Saver", "fa fa-life-saver", "Life Saver"],
		["Lightbulb O", "fa fa-lightbulb-o", "Lightbulb O"],
		["Line Chart", "fa fa-line-chart", "Line Chart"],
		["Location Arrow", "fa fa-location-arrow", "Location Arrow"],
		["Lock", "fa fa-lock", "Lock"],
		["Magic", "fa fa-magic", "Magic"],
		["Magnet", "fa fa-magnet", "Magnet"],
		["Mail Forward", "fa fa-mail-forward", "Mail Forward"],
		["Mail Reply", "fa fa-mail-reply", "Mail Reply"],
		["Mail Reply All", "fa fa-mail-reply-all", "Mail Reply All"],
		["Male", "fa fa-male", "Male"],
		["Map", "fa fa-map", "Map"],
		["Map Marker", "fa fa-map-marker", "Map Marker"],
		["Map O", "fa fa-map-o", "Map O"],
		["Map Pin", "fa fa-map-pin", "Map Pin"],
		["Map Signs", "fa fa-map-signs", "Map Signs"],
		["Meh O", "fa fa-meh-o", "Meh O"],
		["Microphone", "fa fa-microphone", "Microphone"],
		["Microphone Slash", "fa fa-microphone-slash", "Microphone Slash"],
		["Minus", "fa fa-minus", "Minus"],
		["Minus Circle", "fa fa-minus-circle", "Minus Circle"],
		["Minus Square", "fa fa-minus-square", "Minus Square"],
		["Minus Square O", "fa fa-minus-square-o", "Minus Square O"],
		["Mobile", "fa fa-mobile", "Mobile"],
		["Mobile Phone", "fa fa-mobile-phone", "Mobile Phone"],
		["Money", "fa fa-money", "Money"],
		["Moon O", "fa fa-moon-o", "Moon O"],
		["Mortar Board", "fa fa-mortar-board", "Mortar Board"],
		["Motorcycle", "fa fa-motorcycle", "Motorcycle"],
		["Mouse Pointer", "fa fa-mouse-pointer", "Mouse Pointer"],
		["Music", "fa fa-music", "Music"],
		["Navicon", "fa fa-navicon", "Navicon"],
		["Newspaper O", "fa fa-newspaper-o", "Newspaper O"],
		["Object Group", "fa fa-object-group", "Object Group"],
		["Object Ungroup", "fa fa-object-ungroup", "Object Ungroup"],
		["Paint Brush", "fa fa-paint-brush", "Paint Brush"],
		["Paper Plane", "fa fa-paper-plane", "Paper Plane"],
		["Paper Plane O", "fa fa-paper-plane-o", "Paper Plane O"],
		["Paw", "fa fa-paw", "Paw"],
		["Pencil", "fa fa-pencil", "Pencil"],
		["Pencil Square", "fa fa-pencil-square", "Pencil Square"],
		["Pencil Square O", "fa fa-pencil-square-o", "Pencil Square O"],
		["Phone", "fa fa-phone", "Phone"],
		["Phone Square", "fa fa-phone-square", "Phone Square"],
		["Photo", "fa fa-photo", "Photo"],
		["Picture O", "fa fa-picture-o", "Picture O"],
		["Pie Chart", "fa fa-pie-chart", "Pie Chart"],
		["Plane", "fa fa-plane", "Plane"],
		["Plug", "fa fa-plug", "Plug"],
		["Plus", "fa fa-plus", "Plus"],
		["Plus Circle", "fa fa-plus-circle", "Plus Circle"],
		["Plus Square", "fa fa-plus-square", "Plus Square"],
		["Plus Square O", "fa fa-plus-square-o", "Plus Square O"],
		["Power Off", "fa fa-power-off", "Power Off"],
		["Print", "fa fa-print", "Print"],
		["Puzzle Piece", "fa fa-puzzle-piece", "Puzzle Piece"],
		["Qrcode", "fa fa-qrcode", "Qrcode"],
		["Question", "fa fa-question", "Question"],
		["Question Circle", "fa fa-question-circle", "Question Circle"],
		["Quote Left", "fa fa-quote-left", "Quote Left"],
		["Quote Right", "fa fa-quote-right", "Quote Right"],
		["Random", "fa fa-random", "Random"],
		["Recycle", "fa fa-recycle", "Recycle"],
		["Refresh", "fa fa-refresh", "Refresh"],
		["Registered", "fa fa-registered", "Registered"],
		["Remove", "fa fa-remove", "Remove"],
		["Reorder", "fa fa-reorder", "Reorder"],
		["Reply", "fa fa-reply", "Reply"],
		["Reply All", "fa fa-reply-all", "Reply All"],
		["Retweet", "fa fa-retweet", "Retweet"],
		["Road", "fa fa-road", "Road"],
		["Rocket", "fa fa-rocket", "Rocket"],
		["Rss", "fa fa-rss", "Rss"],
		["Rss Square", "fa fa-rss-square", "Rss Square"],
		["Search Minus", "fa fa-search-minus", "Search Minus"],
		["Search Plus", "fa fa-search-plus", "Search Plus"],
		["Send", "fa fa-send", "Send"],
		["Send O", "fa fa-send-o", "Send O"],
		["Server", "fa fa-server", "Server"],
		["Share", "fa fa-share", "Share"],
		["Share Alt", "fa fa-share-alt", "Share Alt"],
		["Share Alt Square", "fa fa-share-alt-square", "Share Alt Square"],
		["Share Square", "fa fa-share-square", "Share Square"],
		["Share Square O", "fa fa-share-square-o", "Share Square O"],
		["Shield", "fa fa-shield", "Shield"],
		["Ship", "fa fa-ship", "Ship"],
		["Shopping Cart", "fa fa-shopping-cart", "Shopping Cart"],
		["Sign In", "fa fa-sign-in", "Sign In"],
		["Sign Out", "fa fa-sign-out", "Sign Out"],
		["Signal", "fa fa-signal", "Signal"],
		["Sitemap", "fa fa-sitemap", "Sitemap"],
		["Sliders", "fa fa-sliders", "Sliders"],
		["Smile O", "fa fa-smile-o", "Smile O"],
		["Soccer Ball O", "fa fa-soccer-ball-o", "Soccer Ball O"],
		["Sort", "fa fa-sort", "Sort"],
		["Sort Alpha Asc", "fa fa-sort-alpha-asc", "Sort Alpha Asc"],
		["Sort Alpha Desc", "fa fa-sort-alpha-desc", "Sort Alpha Desc"],
		["Sort Amount Asc", "fa fa-sort-amount-asc", "Sort Amount Asc"],
		["Sort Amount Desc", "fa fa-sort-amount-desc", "Sort Amount Desc"],
		["Sort Asc", "fa fa-sort-asc", "Sort Asc"],
		["Sort Desc", "fa fa-sort-desc", "Sort Desc"],
		["Sort Down", "fa fa-sort-down", "Sort Down"],
		["Sort Numeric Asc", "fa fa-sort-numeric-asc", "Sort Numeric Asc"],
		["Sort Numeric Desc", "fa fa-sort-numeric-desc", "Sort Numeric Desc"],
		["Sort Up", "fa fa-sort-up", "Sort Up"],
		["Space Shuttle", "fa fa-space-shuttle", "Space Shuttle"],
		["Spinner", "fa fa-spinner", "Spinner"],
		["Spoon", "fa fa-spoon", "Spoon"],
		["Square", "fa fa-square", "Square"],
		["Square O", "fa fa-square-o", "Square O"],
		["Star", "fa fa-star", "Star"],
		["Star Half", "fa fa-star-half", "Star Half"],
		["Star Half Empty", "fa fa-star-half-empty", "Star Half Empty"],
		["Star Half Full", "fa fa-star-half-full", "Star Half Full"],
		["Star Half O", "fa fa-star-half-o", "Star Half O"],
		["Star O", "fa fa-star-o", "Star O"],
		["Sticky Note", "fa fa-sticky-note", "Sticky Note"],
		["Sticky Note O", "fa fa-sticky-note-o", "Sticky Note O"],
		["Street View", "fa fa-street-view", "Street View"],
		["Suitcase", "fa fa-suitcase", "Suitcase"],
		["Sun O", "fa fa-sun-o", "Sun O"],
		["Support", "fa fa-support", "Support"],
		["Tablet", "fa fa-tablet", "Tablet"],
		["Tachometer", "fa fa-tachometer", "Tachometer"],
		["Tag", "fa fa-tag", "Tag"],
		["Tags", "fa fa-tags", "Tags"],
		["Tasks", "fa fa-tasks", "Tasks"],
		["Taxi", "fa fa-taxi", "Taxi"],
		["Television", "fa fa-television", "Television"],
		["Terminal", "fa fa-terminal", "Terminal"],
		["Thumb Tack", "fa fa-thumb-tack", "Thumb Tack"],
		["Thumbs Down", "fa fa-thumbs-down", "Thumbs Down"],
		["Thumbs O Down", "fa fa-thumbs-o-down", "Thumbs O Down"],
		["Thumbs O Up", "fa fa-thumbs-o-up", "Thumbs O Up"],
		["Thumbs Up", "fa fa-thumbs-up", "Thumbs Up"],
		["Ticket", "fa fa-ticket", "Ticket"],
		["Times", "fa fa-times", "Times"],
		["Times Circle", "fa fa-times-circle", "Times Circle"],
		["Times Circle O", "fa fa-times-circle-o", "Times Circle O"],
		["Tint", "fa fa-tint", "Tint"],
		["Toggle Down", "fa fa-toggle-down", "Toggle Down"],
		["Toggle Left", "fa fa-toggle-left", "Toggle Left"],
		["Toggle Off", "fa fa-toggle-off", "Toggle Off"],
		["Toggle On", "fa fa-toggle-on", "Toggle On"],
		["Toggle Right", "fa fa-toggle-right", "Toggle Right"],
		["Toggle Up", "fa fa-toggle-up", "Toggle Up"],
		["Trademark", "fa fa-trademark", "Trademark"],
		["Trash", "fa fa-trash", "Trash"],
		["Trash O", "fa fa-trash-o", "Trash O"],
		["Tree", "fa fa-tree", "Tree"],
		["Trophy", "fa fa-trophy", "Trophy"],
		["Truck", "fa fa-truck", "Truck"],
		["Tty", "fa fa-tty", "Tty"],
		["Tv", "fa fa-tv", "Tv"],
		["Umbrella", "fa fa-umbrella", "Umbrella"],
		["University", "fa fa-university", "University"],
		["Unlock", "fa fa-unlock", "Unlock"],
		["Unlock Alt", "fa fa-unlock-alt", "Unlock Alt"],
		["Unsorted", "fa fa-unsorted", "Unsorted"],
		["Upload", "fa fa-upload", "Upload"],
		["User", "fa fa-user", "User"],
		["User Plus", "fa fa-user-plus", "User Plus"],
		["User Secret", "fa fa-user-secret", "User Secret"],
		["User Times", "fa fa-user-times", "User Times"],
		["Users", "fa fa-users", "Users"],
		["Video Camera", "fa fa-video-camera", "Video Camera"],
		["Volume Down", "fa fa-volume-down", "Volume Down"],
		["Volume Off", "fa fa-volume-off", "Volume Off"],
		["Volume Up", "fa fa-volume-up", "Volume Up"],
		["Warning", "fa fa-warning", "Warning"],
		["Wheelchair", "fa fa-wheelchair", "Wheelchair"],
		["Wifi", "fa fa-wifi", "Wifi"],
		["Wrench", "fa fa-wrench", "Wrench"],
		["Hand O Down", "fa fa-hand-o-down", "Hand O Down"],
		["Hand O Left", "fa fa-hand-o-left", "Hand O Left"],
		["Hand O Right", "fa fa-hand-o-right", "Hand O Right"],
		["Hand O Up", "fa fa-hand-o-up", "Hand O Up"],
		["Ambulance", "fa fa-ambulance", "Ambulance"],
		["Subway", "fa fa-subway", "Subway"],
		["Train", "fa fa-train", "Train"],
		["Genderless", "fa fa-genderless", "Genderless"],
		["Intersex", "fa fa-intersex", "Intersex"],
		["Mars", "fa fa-mars", "Mars"],
		["Mars Double", "fa fa-mars-double", "Mars Double"],
		["Mars Stroke", "fa fa-mars-stroke", "Mars Stroke"],
		["Mars Stroke H", "fa fa-mars-stroke-h", "Mars Stroke H"],
		["Mars Stroke V", "fa fa-mars-stroke-v", "Mars Stroke V"],
		["Mercury", "fa fa-mercury", "Mercury"],
		["Neuter", "fa fa-neuter", "Neuter"],
		["Transgender", "fa fa-transgender", "Transgender"],
		["Transgender Alt", "fa fa-transgender-alt", "Transgender Alt"],
		["Venus", "fa fa-venus", "Venus"],
		["Venus Double", "fa fa-venus-double", "Venus Double"],
		["Venus Mars", "fa fa-venus-mars", "Venus Mars"],
		["File", "fa fa-file", "File"],
		["File O", "fa fa-file-o", "File O"],
		["File Text", "fa fa-file-text", "File Text"],
		["File Text O", "fa fa-file-text-o", "File Text O"],
		["Cc Amex", "fa fa-cc-amex", "Cc Amex"],
		["Cc Diners Club", "fa fa-cc-diners-club", "Cc Diners Club"],
		["Cc Discover", "fa fa-cc-discover", "Cc Discover"],
		["Cc Jcb", "fa fa-cc-jcb", "Cc Jcb"],
		["Cc Mastercard", "fa fa-cc-mastercard", "Cc Mastercard"],
		["Cc Paypal", "fa fa-cc-paypal", "Cc Paypal"],
		["Cc Stripe", "fa fa-cc-stripe", "Cc Stripe"],
		["Cc Visa", "fa fa-cc-visa", "Cc Visa"],
		["Google Wallet", "fa fa-google-wallet", "Google Wallet"],
		["Paypal", "fa fa-paypal", "Paypal"],
		["Bitcoin", "fa fa-bitcoin", "Bitcoin"],
		["Btc", "fa fa-btc", "Btc"],
		["Cny", "fa fa-cny", "Cny"],
		["Dollar", "fa fa-dollar", "Dollar"],
		["Eur", "fa fa-eur", "Eur"],
		["Euro", "fa fa-euro", "Euro"],
		["Gbp", "fa fa-gbp", "Gbp"],
		["Gg", "fa fa-gg", "Gg"],
		["Gg Circle", "fa fa-gg-circle", "Gg Circle"],
		["Ils", "fa fa-ils", "Ils"],
		["Inr", "fa fa-inr", "Inr"],
		["Jpy", "fa fa-jpy", "Jpy"],
		["Krw", "fa fa-krw", "Krw"],
		["Rmb", "fa fa-rmb", "Rmb"],
		["Rouble", "fa fa-rouble", "Rouble"],
		["Rub", "fa fa-rub", "Rub"],
		["Ruble", "fa fa-ruble", "Ruble"],
		["Rupee", "fa fa-rupee", "Rupee"],
		["Shekel", "fa fa-shekel", "Shekel"],
		["Sheqel", "fa fa-sheqel", "Sheqel"],
		["Try", "fa fa-try", "Try"],
		["Turkish Lira", "fa fa-turkish-lira", "Turkish Lira"],
		["Usd", "fa fa-usd", "Usd"],
		["Won", "fa fa-won", "Won"],
		["Yen", "fa fa-yen", "Yen"],
		["Align Center", "fa fa-align-center", "Align Center"],
		["Align Justify", "fa fa-align-justify", "Align Justify"],
		["Align Left", "fa fa-align-left", "Align Left"],
		["Align Right", "fa fa-align-right", "Align Right"],
		["Bold", "fa fa-bold", "Bold"],
		["Chain", "fa fa-chain", "Chain"],
		["Chain Broken", "fa fa-chain-broken", "Chain Broken"],
		["Clipboard", "fa fa-clipboard", "Clipboard"],
		["Columns", "fa fa-columns", "Columns"],
		["Copy", "fa fa-copy", "Copy"],
		["Cut", "fa fa-cut", "Cut"],
		["Dedent", "fa fa-dedent", "Dedent"],
		["Files O", "fa fa-files-o", "Files O"],
		["Floppy O", "fa fa-floppy-o", "Floppy O"],
		["Font", "fa fa-font", "Font"],
		["Header", "fa fa-header", "Header"],
		["Indent", "fa fa-indent", "Indent"],
		["Italic", "fa fa-italic", "Italic"],
		["Link", "fa fa-link", "Link"],
		["List", "fa fa-list", "List"],
		["List Alt", "fa fa-list-alt", "List Alt"],
		["List Ol", "fa fa-list-ol", "List Ol"],
		["List Ul", "fa fa-list-ul", "List Ul"],
		["Outdent", "fa fa-outdent", "Outdent"],
		["Paperclip", "fa fa-paperclip", "Paperclip"],
		["Paragraph", "fa fa-paragraph", "Paragraph"],
		["Paste", "fa fa-paste", "Paste"],
		["Repeat", "fa fa-repeat", "Repeat"],
		["Rotate Left", "fa fa-rotate-left", "Rotate Left"],
		["Rotate Right", "fa fa-rotate-right", "Rotate Right"],
		["Save", "fa fa-save", "Save"],
		["Scissors", "fa fa-scissors", "Scissors"],
		["Strikethrough", "fa fa-strikethrough", "Strikethrough"],
		["Subscript", "fa fa-subscript", "Subscript"],
		["Superscript", "fa fa-superscript", "Superscript"],
		["Table", "fa fa-table", "Table"],
		["Text Height", "fa fa-text-height", "Text Height"],
		["Text Width", "fa fa-text-width", "Text Width"],
		["Th", "fa fa-th", "Th"],
		["Th Large", "fa fa-th-large", "Th Large"],
		["Th List", "fa fa-th-list", "Th List"],
		["Underline", "fa fa-underline", "Underline"],
		["Undo", "fa fa-undo", "Undo"],
		["Unlink", "fa fa-unlink", "Unlink"],
		["Angle Double Down", "fa fa-angle-double-down", "Angle Double Down"],
		["Angle Double Left", "fa fa-angle-double-left", "Angle Double Left"],
		["Angle Double Right", "fa fa-angle-double-right", "Angle Double Right"],
		["Angle Double Up", "fa fa-angle-double-up", "Angle Double Up"],
		["Angle Down", "fa fa-angle-down", "Angle Down"],
		["Angle Left", "fa fa-angle-left", "Angle Left"],
		["Angle Right", "fa fa-angle-right", "Angle Right"],
		["Angle Up", "fa fa-angle-up", "Angle Up"],
		["Arrow Circle Down", "fa fa-arrow-circle-down", "Arrow Circle Down"],
		["Arrow Circle Left", "fa fa-arrow-circle-left", "Arrow Circle Left"],
		["Arrow Circle O Down", "fa fa-arrow-circle-o-down", "Arrow Circle O Down"],
		["Arrow Circle O Left", "fa fa-arrow-circle-o-left", "Arrow Circle O Left"],
		["Arrow Circle O Right", "fa fa-arrow-circle-o-right", "Arrow Circle O Right"],
		["Arrow Circle O Up", "fa fa-arrow-circle-o-up", "Arrow Circle O Up"],
		["Arrow Circle Right", "fa fa-arrow-circle-right", "Arrow Circle Right"],
		["Arrow Circle Up", "fa fa-arrow-circle-up", "Arrow Circle Up"],
		["Arrow Down", "fa fa-arrow-down", "Arrow Down"],
		["Arrow Left", "fa fa-arrow-left", "Arrow Left"],
		["Arrow Right", "fa fa-arrow-right", "Arrow Right"],
		["Arrow Up", "fa fa-arrow-up", "Arrow Up"],
		["Arrows Alt", "fa fa-arrows-alt", "Arrows Alt"],
		["Caret Down", "fa fa-caret-down", "Caret Down"],
		["Caret Left", "fa fa-caret-left", "Caret Left"],
		["Caret Right", "fa fa-caret-right", "Caret Right"],
		["Caret Up", "fa fa-caret-up", "Caret Up"],
		["Chevron Circle Down", "fa fa-chevron-circle-down", "Chevron Circle Down"],
		["Chevron Circle Left", "fa fa-chevron-circle-left", "Chevron Circle Left"],
		["Chevron Circle Right", "fa fa-chevron-circle-right", "Chevron Circle Right"],
		["Chevron Circle Up", "fa fa-chevron-circle-up", "Chevron Circle Up"],
		["Chevron Down", "fa fa-chevron-down", "Chevron Down"],
		["Chevron Left", "fa fa-chevron-left", "Chevron Left"],
		["Chevron Right", "fa fa-chevron-right", "Chevron Right"],
		["Chevron Up", "fa fa-chevron-up", "Chevron Up"],
		["Long Arrow Down", "fa fa-long-arrow-down", "Long Arrow Down"],
		["Long Arrow Left", "fa fa-long-arrow-left", "Long Arrow Left"],
		["Long Arrow Right", "fa fa-long-arrow-right", "Long Arrow Right"],
		["Long Arrow Up", "fa fa-long-arrow-up", "Long Arrow Up"],
		["Backward", "fa fa-backward", "Backward"],
		["Compress", "fa fa-compress", "Compress"],
		["Eject", "fa fa-eject", "Eject"],
		["Expand", "fa fa-expand", "Expand"],
		["Fast Backward", "fa fa-fast-backward", "Fast Backward"],
		["Fast Forward", "fa fa-fast-forward", "Fast Forward"],
		["Forward", "fa fa-forward", "Forward"],
		["Pause", "fa fa-pause", "Pause"],
		["Play", "fa fa-play", "Play"],
		["Play Circle", "fa fa-play-circle", "Play Circle"],
		["Play Circle O", "fa fa-play-circle-o", "Play Circle O"],
		["Step Backward", "fa fa-step-backward", "Step Backward"],
		["Step Forward", "fa fa-step-forward", "Step Forward"],
		["Stop", "fa fa-stop", "Stop"],
		["Youtube Play", "fa fa-youtube-play", "Youtube Play"],
		["500px", "fa fa-500px", "500px"],
		["Adn", "fa fa-adn", "Adn"],
		["Amazon", "fa fa-amazon", "Amazon"],
		["Android", "fa fa-android", "Android"],
		["Angellist", "fa fa-angellist", "Angellist"],
		["Apple", "fa fa-apple", "Apple"],
		["Behance", "fa fa-behance", "Behance"],
		["Behance Square", "fa fa-behance-square", "Behance Square"],
		["Bitbucket", "fa fa-bitbucket", "Bitbucket"],
		["Bitbucket Square", "fa fa-bitbucket-square", "Bitbucket Square"],
		["Black Tie", "fa fa-black-tie", "Black Tie"],
		["Buysellads", "fa fa-buysellads", "Buysellads"],
		["Chrome", "fa fa-chrome", "Chrome"],
		["Codepen", "fa fa-codepen", "Codepen"],
		["Connectdevelop", "fa fa-connectdevelop", "Connectdevelop"],
		["Contao", "fa fa-contao", "Contao"],
		["Css3", "fa fa-css3", "Css3"],
		["Dashcube", "fa fa-dashcube", "Dashcube"],
		["Delicious", "fa fa-delicious", "Delicious"],
		["Deviantart", "fa fa-deviantart", "Deviantart"],
		["Digg", "fa fa-digg", "Digg"],
		["Dribbble", "fa fa-dribbble", "Dribbble"],
		["Dropbox", "fa fa-dropbox", "Dropbox"],
		["Drupal", "fa fa-drupal", "Drupal"],
		["Empire", "fa fa-empire", "Empire"],
		["Expeditedssl", "fa fa-expeditedssl", "Expeditedssl"],
		["Facebook", "fa fa-facebook", "Facebook"],
		["Facebook F", "fa fa-facebook-f", "Facebook F"],
		["Facebook Official", "fa fa-facebook-official", "Facebook Official"],
		["Facebook Square", "fa fa-facebook-square", "Facebook Square"],
		["Firefox", "fa fa-firefox", "Firefox"],
		["Flickr", "fa fa-flickr", "Flickr"],
		["Fonticons", "fa fa-fonticons", "Fonticons"],
		["Forumbee", "fa fa-forumbee", "Forumbee"],
		["Foursquare", "fa fa-foursquare", "Foursquare"],
		["Ge", "fa fa-ge", "Ge"],
		["Get Pocket", "fa fa-get-pocket", "Get Pocket"],
		["Git", "fa fa-git", "Git"],
		["Git Square", "fa fa-git-square", "Git Square"],
		["Github", "fa fa-github", "Github"],
		["Github Alt", "fa fa-github-alt", "Github Alt"],
		["Github Square", "fa fa-github-square", "Github Square"],
		["Gittip", "fa fa-gittip", "Gittip"],
		["Google", "fa fa-google", "Google"],
		["Google Plus", "fa fa-google-plus", "Google Plus"],
		["Google Plus Square", "fa fa-google-plus-square", "Google Plus Square"],
		["Gratipay", "fa fa-gratipay", "Gratipay"],
		["Hacker News", "fa fa-hacker-news", "Hacker News"],
		["Houzz", "fa fa-houzz", "Houzz"],
		["Html5", "fa fa-html5", "Html5"],
		["Instagram", "fa fa-instagram", "Instagram"],
		["Internet Explorer", "fa fa-internet-explorer", "Internet Explorer"],
		["Ioxhost", "fa fa-ioxhost", "Ioxhost"],
		["Joomla", "fa fa-joomla", "Joomla"],
		["Jsfiddle", "fa fa-jsfiddle", "Jsfiddle"],
		["Lastfm", "fa fa-lastfm", "Lastfm"],
		["Lastfm Square", "fa fa-lastfm-square", "Lastfm Square"],
		["Leanpub", "fa fa-leanpub", "Leanpub"],
		["Linkedin", "fa fa-linkedin", "Linkedin"],
		["Linkedin Square", "fa fa-linkedin-square", "Linkedin Square"],
		["Linux", "fa fa-linux", "Linux"],
		["Maxcdn", "fa fa-maxcdn", "Maxcdn"],
		["Meanpath", "fa fa-meanpath", "Meanpath"],
		["Medium", "fa fa-medium", "Medium"],
		["Odnoklassniki", "fa fa-odnoklassniki", "Odnoklassniki"],
		["Odnoklassniki Square", "fa fa-odnoklassniki-square", "Odnoklassniki Square"],
		["Opencart", "fa fa-opencart", "Opencart"],
		["Openid", "fa fa-openid", "Openid"],
		["Opera", "fa fa-opera", "Opera"],
		["Optin Monster", "fa fa-optin-monster", "Optin Monster"],
		["Pagelines", "fa fa-pagelines", "Pagelines"],
		["Pied Piper", "fa fa-pied-piper", "Pied Piper"],
		["Pied Piper Alt", "fa fa-pied-piper-alt", "Pied Piper Alt"],
		["Pinterest", "fa fa-pinterest", "Pinterest"],
		["Pinterest P", "fa fa-pinterest-p", "Pinterest P"],
		["Pinterest Square", "fa fa-pinterest-square", "Pinterest Square"],
		["Qq", "fa fa-qq", "Qq"],
		["Ra", "fa fa-ra", "Ra"],
		["Rebel", "fa fa-rebel", "Rebel"],
		["Reddit", "fa fa-reddit", "Reddit"],
		["Reddit Square", "fa fa-reddit-square", "Reddit Square"],
		["Renren", "fa fa-renren", "Renren"],
		["Safari", "fa fa-safari", "Safari"],
		["Sellsy", "fa fa-sellsy", "Sellsy"],
		["Shirtsinbulk", "fa fa-shirtsinbulk", "Shirtsinbulk"],
		["Simplybuilt", "fa fa-simplybuilt", "Simplybuilt"],
		["Skyatlas", "fa fa-skyatlas", "Skyatlas"],
		["Skype", "fa fa-skype", "Skype"],
		["Slack", "fa fa-slack", "Slack"],
		["Slideshare", "fa fa-slideshare", "Slideshare"],
		["Soundcloud", "fa fa-soundcloud", "Soundcloud"],
		["Spotify", "fa fa-spotify", "Spotify"],
		["Stack Exchange", "fa fa-stack-exchange", "Stack Exchange"],
		["Stack Overflow", "fa fa-stack-overflow", "Stack Overflow"],
		["Steam", "fa fa-steam", "Steam"],
		["Steam Square", "fa fa-steam-square", "Steam Square"],
		["Stumbleupon", "fa fa-stumbleupon", "Stumbleupon"],
		["Stumbleupon Circle", "fa fa-stumbleupon-circle", "Stumbleupon Circle"],
		["Tencent Weibo", "fa fa-tencent-weibo", "Tencent Weibo"],
		["Trello", "fa fa-trello", "Trello"],
		["Tripadvisor", "fa fa-tripadvisor", "Tripadvisor"],
		["Tumblr", "fa fa-tumblr", "Tumblr"],
		["Tumblr Square", "fa fa-tumblr-square", "Tumblr Square"],
		["Twitch", "fa fa-twitch", "Twitch"],
		["Twitter", "fa fa-twitter", "Twitter"],
		["Twitter Square", "fa fa-twitter-square", "Twitter Square"],
		["Viacoin", "fa fa-viacoin", "Viacoin"],
		["Vimeo", "fa fa-vimeo", "Vimeo"],
		["Vimeo Square", "fa fa-vimeo-square", "Vimeo Square"],
		["Vine", "fa fa-vine", "Vine"],
		["Vk", "fa fa-vk", "Vk"],
		["Wechat", "fa fa-wechat", "Wechat"],
		["Weibo", "fa fa-weibo", "Weibo"],
		["Weixin", "fa fa-weixin", "Weixin"],
		["Whatsapp", "fa fa-whatsapp", "Whatsapp"],
		["Wikipedia W", "fa fa-wikipedia-w", "Wikipedia W"],
		["Windows", "fa fa-windows", "Windows"],
		["Wordpress", "fa fa-wordpress", "Wordpress"],
		["Xing", "fa fa-xing", "Xing"],
		["Xing Square", "fa fa-xing-square", "Xing Square"],
		["Y Combinator", "fa fa-y-combinator", "Y Combinator"],
		["Y Combinator Square", "fa fa-y-combinator-square", "Y Combinator Square"],
		["Yahoo", "fa fa-yahoo", "Yahoo"],
		["Yc", "fa fa-yc", "Yc"],
		["Yc Square", "fa fa-yc-square", "Yc Square"],
		["Yelp", "fa fa-yelp", "Yelp"],
		["Youtube", "fa fa-youtube", "Youtube"],
		["Youtube Square", "fa fa-youtube-square", "Youtube Square"],
		["H Square", "fa fa-h-square", "H Square"],
		["Hospital O", "fa fa-hospital-o", "Hospital O"],
		["Medkit", "fa fa-medkit", "Medkit"],
		["Stethoscope", "fa fa-stethoscope", "Stethoscope"],
		["User Md", "fa fa-user-md", "User Md"]
		];
	var config = '';
	if (typeof editor.settings[icon_name] === 'object') {
		var config = editor.settings[icon_name];
	}
	var display_menu = true;
	var display_toolbar_text = true;
	if (typeof config === 'object') {
		if (typeof config.css !== 'undefined') {
			if (!config.css.exist) {
				if (!config.css.external) {
					css_list.push(url + '/assets/css/font-awesome.min.css');
					if (window.galau_ui_debug == true) {
						console.log('fontawesome => css : internal');
					}
				} else {
					css_list.push(config.css.external);
					if (window.galau_ui_debug == true) {
						console.log('fontawesome => css : external');
					}
				}
			} else {
				if (window.galau_ui_debug == true) {
					console.log('fontawesome => css : exist');
				}
			}
		} else {
			css_list.push(url + '/assets/css/font-awesome.min.css');
			if (window.galau_ui_debug == true) {
				console.log('fontawesome => css : internal');
			}
		}
		if (config.menu) {
			display_menu = true;
		} else {
			display_menu = false;
		}
		if (config.toolbar_text) {
			display_toolbar_text = true;
		} else {
			display_toolbar_text = false;
		}
	} else {
		css_list.push(url + '/assets/css/font-awesome.min.css');
		if (window.galau_ui_debug == true) {
			console.log('fontawesome => css : internal');
		}
	}

	function showDialog(callback) {
		if (!callback) {
			callback = false;
		}
		//window.console && console.log( typeof callback);
		//set current icon
		var selection = editor.selection;
		var dom = editor.dom;
		//window.console && console.log(icon_class);

		function getParentTd(elm) {
			while (elm) {
				if (elm.nodeName == 'TD') {
					return elm;
				}
				elm = elm.parentNode;
			}
		}

		function displayIcons(icons_list, obj) {
			var newTable, gridHtml, x, y, win;
			gridHtml = '<table role="presentation" cellspacing="0" ><tbody>';
			var width = 15;
			var height = Math.ceil(icons_list.length / width);
			for (y = 0; y < height; y++) {
				gridHtml += '<tr>';
				for (x = 0; x < width; x++) {
					var index = y * width + x;
					if (index < icons_list.length) {
						var chr = icons_list[index];
						gridHtml += '<td title="' + chr[0] + '" data-icon="' + chr[1] + '" ><div tabindex="-1" title="' + chr[0] + '" role="button"><span class="' + chr[1] + '"></span></div></td>';
					} else {
						gridHtml += '<td />';
					}
				}
				gridHtml += '</tr>';
			}
			gridHtml += '</tbody></table>';
			if (obj == true) {
				newTable = document.createElement('div');
				newTable.setAttribute('id', 'icon-table');
				newTable.setAttribute('class', 'mce-icon-table');
				newTable.innerHTML = gridHtml;
			} else {
				newTable = '<div class="mce-icon-table" id="icon-table">';
				newTable += gridHtml;
				newTable += '</div>';
			}
			return newTable;
		}

		function onSearch(keyword) {
			var filter = [];
			//icon_list
			for (var x = 0; x < icon_list.length; x++) {
				var chr = icon_list[x];
				if (chr[1].toLowerCase().indexOf(keyword) >= 0) {
					filter.push(chr);
				}
			};
			var newTable = displayIcons(filter, true);
			var oldTable = document.querySelector('#icon-table');
			oldTable.parentNode.replaceChild(newTable, oldTable);
			//window.console && console.log(newTable);
		}
		win = editor.windowManager.open({
			title: galau_ui_title,
			classes: icon_name + '-panel',
			bodyType: "tabpanel",
			body: [{
				title: "General",
				type: 'container',
				layout: 'flex',
				spacing: 10,
				padding: 10,
				items: [{
					type: 'container',
					classes: 'icon-table',
					html: '<div class="mce-icon-box" id="icon-box">' + displayIcons(icon_list, false) + '</div>',
					spacing: 10,
					minHeight: 300,
					onclick: function(e) {
						editor.undoManager.transact(function() {
							var td = getParentTd(e.target);
							if (typeof callback === 'string') {
								editor.settings[callback](td.getAttribute('data-icon'));
								win.close();
							} else {
								var icon_markup = '<span class="' + td.getAttribute('data-icon') + '"></span><span data-mce-bogus="1"/>';
								editor.execCommand('mceInsertContent', false, icon_markup);
								if (!e.ctrlKey) {
									win.close();
								}
							}
						});
					},
					onmouseover: function(e) {
						var td = getParentTd(e.target);
						var preview = document.getElementById('icon_preview');
						if (td && td.firstChild) {
							preview.setAttribute('class', td.getAttribute('data-icon'));
							win.find('#icon_title_preview').text(td.title);
						} else {
							preview.setAttribute('class', ' ');
							win.find('#icon_title_preview').text(' ');
						}
					}
				},
				{
					type: 'container',
					layout: 'flex',
					direction: 'column',
					align: 'center',
					spacing: 5,
					minWidth: 160,
					minHeight: 40,
					items: [{
						type: 'panel',
						name: 'preview',
						html: '<span style="margin:10px;font-size:60px;width:60px;height:60px;text-align: center" id="icon_preview"></span>',
						style: 'text-align:center;background:#fff;',
						border: 1,
						width: 80,
						minHeight: 80
					},
					{
						type: 'label',
						name: 'icon_title_preview',
						text: ' ',
						style: 'text-align: center',
						border: 1,
						minWidth: 140,
						minHeight: 36
					}]
				}, ],
			},
			{
				title: "About",
				type: "form",
				layout: "grid",
				items: [{
					type: "panel",
					classes: 'about-us',
					html: "<h2>" + galau_ui_title + "</h2><h4>Created by <a href='http://ihsana.com/jasman/'>Jasman</a></h4><p>" + galau_ui_desc + "</p>",
					style: "background-color:transparent",
				}, ]
			}],
			buttons: [{
				text: "Close",
				onclick: function() {
					win.close();
				},
			}],
		});
		var selectedElm = selection.getNode();
		var spanElm = dom.getParent(selectedElm, 'span[class]');
		if ((value = dom.getAttrib(spanElm, 'class'))) {
			var preview = document.querySelector('#icon_preview');
			preview.setAttribute('class', value);
		}
		var footPanel = document.querySelector('.mce-' + icon_name + '-panel .mce-foot .mce-container-body');
		var search_icon = tinymce.ui.Factory.create({
			type: 'container',
			classes: 'icon-search-container',
			items: [{
				type: 'textbox',
				onkeyup: function(e) {
					onSearch(e.target.value)
				},
				label: 'Search',
				size: 24,
			}, ]
		}).renderTo(footPanel).reflow();
	}
	// inline menu icon
	editor.addButton(icon_name + '_remove', {
		icon: 'remove',
		onclick: function() {
			var $_ = tinymce.dom.DomQuery;
			var spanElm = editor.dom.getParent(editor.selection.getStart(), icon_selector);
			if (spanElm) {
				editor.undoManager.transact(function() {
					$_(spanElm).replaceWith('');
				});
			}
		},
	});
	editor.on('init', function() {
		editor.addContextToolbar(icon_selector, icon_name + ' undo redo | ' + icon_name + '_remove');
	});
	// Include CSS 
	if (typeof editor.settings.content_css !== 'undefined') {
		if (typeof editor.settings.content_css.push === "function") {
			for (var i = 0; i < css_list.length; i++) {
				editor.settings.content_css.push(css_list[i]);
			};
		} else if (typeof editor.settings.content_css === "string") {
			editor.settings.content_css = [editor.settings.content_css];
			for (var i = 0; i < css_list.length; i++) {
				editor.settings.content_css.push(css_list[i]);
			};
		} else {
			editor.settings.content_css = css_list;
		}
	} else {
		editor.settings.content_css = css_list;
	}
	// Allow elements
	if (typeof editor.settings.extended_valid_elements == 'undefined') {
		editor.settings.extended_valid_elements = '*[*]';
	}
	if (typeof editor.settings.valid_elements == 'undefined') {
		editor.settings.valid_elements = '*[*]';
	}
	if (window.galau_ui_debug == true) {
		console.log('fontawesome => valid: ', editor.settings.valid_elements);
		console.log('fontawesome => extended_valid: ', editor.settings.extended_valid_elements);
	}
	// Include CSS 
	editor.on('init', function() {
		if (document.createStyleSheet) {
			for (var i = 0; i < css_list.length; i++) {
				document.createStyleSheet(css_list[i]);
			}
		} else {
			for (var i = 0; i < css_list.length; i++) {
				cssLink = editor.dom.create('link', {
					rel: 'stylesheet',
					href: css_list[i]
				});
				document.getElementsByTagName('head')[0].appendChild(cssLink);
			}
		}
	});
	editor.addCommand(icon_command, showDialog);
	var toolbar_text = '';
	if (display_toolbar_text) {
		toolbar_text = icon_text;
	}
	// Add to button
	editor.addButton(icon_name, {
		icon: icon_class,
		tooltip: icon_text,
		text: toolbar_text,
		cmd: icon_command,
		stateSelector: icon_selector,
	});
	if (display_menu == true) {
		// Add to menu
		editor.addMenuItem(icon_name, {
			icon: icon_class,
			text: icon_text,
			cmd: icon_command,
			stateSelector: icon_selector,
			context: 'insert',
		});
	}
	//callback
	if (!editor.settings[icon_command]) {
		editor.settings[icon_command] = showDialog;
	}
	var iconPicker = [{
		value: 'none',
		text: 'None'
	}];
	//register to iconPicker
	if (typeof editor.settings.gui_icon_picker === 'object') {
		iconPicker = editor.settings.gui_icon_picker;
	}
    
	iconPicker.push({
		value: icon_command,
		text: icon_text
	});

 

	editor.settings.gui_icon_picker = iconPicker
    
});