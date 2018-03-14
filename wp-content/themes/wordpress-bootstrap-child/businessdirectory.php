 <?php
 /*
 Template Name: BusinessDirectory
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
				<div id="main" class="col-md-12 margin-bottom-25 main-ltgov" role="main">
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
					<header>			
							<div class="page-header"><h1><?php the_title(); ?></h1></div>
						</header> <!-- end article header -->
					<article id="post-<?php the_ID(); ?>" <?php post_class('col-md-8 margin-bottom-15 clearfix'); ?> role="article" style="width: 100%";>
						
						<section>		
<div style ="height:100%;">
<?php the_content(); ?>
<?php
$businessSearchResults = '';
$businessName='';
$searchFlag = 'false';
$selectedCountyEID = '';
function formatPhoneNumber($s) {
	$rx = "/
		(1)?\D*     # optional country code
		(\d{3})?\D* # optional area code
		(\d{3})\D*  # first three
		(\d{4})     # last four
		(?:\D+|$)   # extension delimiter or EOL
		(\d*)       # optional extension
	/x";
	preg_match($rx, $s, $matches);
	if(!isset($matches[0])) return $s;
	
	$country = $matches[1];
	$area = $matches[2];
	$three = $matches[3];
	$four = $matches[4];
	$ext = $matches[5];
	
	$out = "$three-$four";
	if(!empty($area)) $out = "$area-$out";
	if(!empty($country)) $out = "+$country-$out";
	if(!empty($ext)) $out .= "x$ext";
	
	// check that no digits were truncated
	// if (preg_replace('/\D/', '', $s) != preg_replace('/\D/', '', $out)) return false;
	return $out;
	}


	if($_GET['businessName'] && !empty($_GET['businessName'])) {
	$businessName = $_GET['businessName'];
	//echo $_GET['businessName'];
}

if($_GET['BusinessCategory'] && !empty($_GET['BusinessCategory'])) {
	$selectedCategoryEID = $_GET['BusinessCategory'];
	//echo $_GET['BusinessCategory'];
}

if($_GET['County'] && !empty($_GET['County'])) {
	$selectedCountyEID = $_GET['County'];
	//echo $_GET['County'];
}

if($_GET['search'] && !empty($_GET['search'])) {
	$searchFlag = $_GET['search']; //checks to see if this is a page load or a search postback 
	//echo $_GET['County'];
}


//gets missouri counties and puts them into a drop down list
$countyArray = $wpdb->get_results( "SELECT EID, COUNTY_NAME FROM COUNTY ORDER BY COUNTY_NAME;" );
if($countyArray != null){
	$ddlCounty = '<select name="County" style="margin-right:5px; height:25px;">';
    $ddlCounty.='<option value=""></OPTION>';
	$numberOfCounties = count($countyArray);

	for($lc = 0; $lc < $numberOfCounties; $lc++) {//lc stands for loop control
		$county = $countyArray[$lc]; //individual County
		if($selectedCountyEID == $county->EID){
			$ddlCounty.='<option value="'.$county->EID.'" selected>'.$county->COUNTY_NAME.'</OPTION>';
		}else{
			$ddlCounty.='<option value="'.$county->EID.'">'.$county->COUNTY_NAME.'</OPTION>';
		}
		
	}//end of for loop 
	$ddlCounty.='</select>';
} else {
    $ddlCounty = "Error, please try again";
}

//gets business category and puts them into a drop down list
$businessCategoryArray = $wpdb->get_results( "SELECT EID, CATEGORY FROM CATEGORY_TYPE WHERE ACTIVE = TRUE ORDER BY CATEGORY;" );
if($businessCategoryArray != null){
	$ddlBusinessCategory = '<select name="BusinessCategory" id="BusinessCategory" style="margin-right:5px; height:25px;">';
    $ddlBusinessCategory.= '<option value=""></OPTION>';
	$numberOfCategories = count($businessCategoryArray);

	for($lc = 0; $lc < $numberOfCategories; $lc++) {//lc stands for loop control
		$businessCategory = $businessCategoryArray[$lc];
		if($selectedCategoryEID == $businessCategory->EID){
			$ddlBusinessCategory.='<option value="'.$businessCategory->EID.'" selected>'.$businessCategory->CATEGORY.'</OPTION>';
		}else {
			$ddlBusinessCategory.='<option value="'.$businessCategory->EID.'">'.$businessCategory->CATEGORY.'</OPTION>';
		}
	}//end of for loop
	$ddlBusinessCategory.='</select>';
} else {
    $ddlBusinessCategory = "Error, please try again";
}


$searchBar = "";
$searchBar.="<form method='get' style='background-color: #f2f2f2;height: 100px;width: 781px;'>";
$searchBar.="<h2 style='font-size: 20px; color: #4671a9; font-weight:  bold; font-family: serif; position:  relative; left: 10px; top: 10px;'>Filter results by:</h2>";
$searchBar.="<h3 style='font-size: 15px;font-weight:  bold;position:  relative;left: 10px;'>Location(County)</h3>";
$searchBar.="<h3 style='font-size: 15px;font-weight:  bold;position:  relative; left: 144px; top: -36px;'>Category</h3>";
$searchBar.="<h3 style='font-size: 15px;font-weight:  bold;position:  relative; left: 383px; top: -72px;'>Business Name</h3>";
$searchBar.="<div style='position:  relative; bottom:  77px; left:10px;'>";
$searchBar.=$ddlCounty;
$searchBar.=$ddlBusinessCategory;
$searchBar.="<input type ='text' name = 'businessName' value='".$businessName."' />";
$searchBar.="<button type='submit' name='search' value='true' style='background-color: #bd272f;border: none;height: 30px;border-radius: 5px;margin-left: 10px;color: #fff;' >Search</button>";
$searchBar.="</div>";
$searchBar.="</form>";
$searchBar.="<h2 style='color: #4671a9;margin-top: 25px;margin-bottom: 25px; font-weight:bold;'>Category Name/Location Results</h2>";

echo $searchBar;

if($_GET['businessName'] && !empty($_GET['businessName'])) {
	$businessName = $_GET['businessName'];
	//echo $_GET['businessName'];
}

if($_GET['BusinessCategory'] && !empty($_GET['BusinessCategory'])) {
	$selectedCategoryEID = $_GET['BusinessCategory'];
	//echo $_GET['BusinessCategory'];
}

if($_GET['County'] && !empty($_GET['County'])) {
	$selectedCountyEID = $_GET['County'];
	//echo $_GET['County'];
}

if($searchFlag == 'false'){
	for($lc = 0; $lc < $numberOfCategories; $lc++) {//lc stands for loop control
		$businessCategory = $businessCategoryArray[$lc];
		$listOfCategories.='<a href="?BusinessCategory='.$businessCategory->EID.'&search=true">'.$businessCategory->CATEGORY.'</a>';
		$listOfCategories.='<br />';		
	}//end of for loop

	echo $listOfCategories;
   }else {
		$businessName = '%'.$businessName.'%';
		$sqlQueryBusinessSearch = "SELECT B.*, BL.* 
		FROM BUSINESS B, COUNTY C, BUSINESS_lOCATION BL
		WHERE B.ACTIVE = TRUE 
		AND BL.BUSINESS_EID = B.EID 
		AND C.EID = BL.COUNTY_EID 
		AND B.CATEGORY_EID = IF(%d = '', B.CATEGORY_EID, %d) 
		AND C.EID = IF(%d = '', C.EID, %d) 
		AND B.NAME LIKE %s;
		";

$businessSearchResults = $wpdb->get_results( $wpdb->prepare(	
	$sqlQueryBusinessSearch
,
	$selectedCategoryEID,  
	$selectedCategoryEID,  
	$selectedCountyEID,
	$selectedCountyEID,
	$businessName
  ) );

if($businessSearchResults != null){
	$numberOfBusinesses = count($businessSearchResults);
	$formattedPhoneNumber = '';
	$businessList.='<div>';
	for($lc = 0; $lc < $numberOfBusinesses; $lc++) {//lc stands for loop control
		$businessList.='<span style ="width:781px;">';
		$business = $businessSearchResults[$lc]; //individual County
		$businessList.='<h3 style="font-weight:  bold; border-bottom: 2px solid #DCDCDC;"> '.$business->NAME.'</h3>';
		$businessList.='<span style="position:  relative; left: 400px; font-size: 18px;">';
		$businessList.='<p style="font-size: 13px; max-width: 390px;"> '.$business->ABOUT_ME.'</p>';
		$businessList.='<span style="font-weight:  bold;">';
		$businessList.='<p style="margin: 0px;"> '.$business->ADDRESS.'</p>';
		$businessList.='<p style="margin: 0px;"> '.$business->CITY.", ".$business->STATE_ABB." ".$business->ZIP_CODE.'</p>';
		$formattedPhoneNumber = formatPhoneNumber($business->PHONE);
		$businessList.='<p style="margin: 0px;"> '.$formattedPhoneNumber.'</p>';
		$businessList.='<p style="margin: 0px;"> '.$business->WEBSITE_URL.'</p>';
		$businessList.='</span>';
		$businessList.='</span>';
		$businessList.='<img src="/wordpress/wp-content/img/business_logos/'.$business->LOGO.'" alt="'.$business->LOGO.'" style="position: relative;bottom: 170px;max-height: 190px;width: auto;max-width: 370px;margin-bottom: -100px;">';
		$businessList.='</span>';
	}//end of for loop 
	$businessList.='</div>';
}
   }
echo $businessList;
?></div>
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
</div>		
<?php get_footer(); ?>