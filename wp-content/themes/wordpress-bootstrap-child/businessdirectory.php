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
<?php

//gets missouri counties and puts them into a drop down list
$countyArray = $wpdb->get_results( "SELECT EID, COUNTY_NAME FROM COUNTY ORDER BY COUNTY_NAME;" );
if($countyArray != null){
	$ddlCounty = '<select name="County">';
    $ddlCounty.='<option value=""></OPTION>';
	$numberOfCounties = count($countyArray);

	for($lc = 0; $lc < $numberOfCounties; $lc++) {//lc stands for loop control
		$county = $countyArray[$lc]; //individual County
		$ddlCounty.='<option value="'.$county->EID.'">'.$county->COUNTY_NAME.'</OPTION>';
	}//end of for loop 
	$ddlCounty.='</select>';
} else {
    $ddlCounty = "Error, please try again";
}

//gets business category and puts them into a drop down list
$businessCategoryArray = $wpdb->get_results( "SELECT EID, CATEGORY FROM CATEGORY_TYPE WHERE ACTIVE = TRUE ORDER BY CATEGORY;" );
if($businessCategoryArray != null){
	$ddlBusinessCategory = '<select name="BusinessCategory" id="BusinessCategory">';
    $ddlBusinessCategory.= '<option value=""></OPTION>';
	$numberOfCategories = count($businessCategoryArray);

	for($lc = 0; $lc < $numberOfCategories; $lc++) {//lc stands for loop control
		$businessCategory = $businessCategoryArray[$lc];
		$ddlBusinessCategory.='<option value="'.$businessCategory->EID.'">'.$businessCategory->CATEGORY.'</OPTION>';
	}//end of for loop
	$ddlBusinessCategory.='</select>';
} else {
    $ddlBusinessCategory = "Error, please try again";
}



echo "<form method='get'>";
echo $ddlCounty;
echo $ddlBusinessCategory;
echo "<button type='submit' >Try it</button>";

echo "</form>";

if($_GET['BusinessCategory'] && !empty($_GET['BusinessCategory'])) {
	$selectedCategoryEID = $_GET['BusinessCategory'];
	echo $_GET['BusinessCategory'];
}

if($_GET['County'] && !empty($_GET['County'])) {
	$selectedCountyEID = $_GET['County'];
	echo $_GET['County'];
}

$businessSearchResults = $wpdb->get_results( $wpdb->prepare(
	"SELECT B.NAME 
	FROM BUSINESS B, COUNTY C, BUISNESS_lOCATION BL, BUSINESS_CATEGORY BC 
	WHERE B.ACTIVE = TRUE 
	AND BL.BUSINESS_EID = B.EID 
	AND C.EID = BL.EID 
	AND BC.BUSINESS_EID = B.EID 
	AND C.EID = ISNULL(%d, C.EID)
	AND BC.EID = ISNULL(%d, BC.EID);",
	$selectedCategoryEID,  
	$selectedCountyEID  
  ) );

  print_r($businessSearchResults);

?>
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