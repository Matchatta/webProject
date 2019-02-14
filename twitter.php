<?php
session_start()
?>
<?php
//Initial all Twitter api key
$consumer_key = 'Sbj9G0SjVhZnP0X0Mjte7nxRL';
$consumer_secret="voomTmaiguLig6xdjev6vbTQPQ9GK5pq19Ps0tv63k4aVz6aCS";
$access_token="961991331110207489-mHR267xXV728oW3LTyZPTPsPC63YIgI";
$access_token_secret="Pu4wQets0ad8UGYQFBonXdUFKZdohCpmu1603NKSluVRP";
//Import require file and function
require ("twitteroauth-master/twitteroauth-master/autoload.php");
use Abraham\TwitterOAuth\TwitterOAuth;
//Use to get data from Twitter standard search
if(isset($_POST['search'])){
     //Handle data from view.js
     $_SESSION["key"] = $_POST['search'];
     //Create new object from twitter
     $twitter = new TwitterOAuth($consumer_key,$consumer_secret,$access_token,$access_token_secret);
     //get information from Twitter
        $tweet = $twitter->get('search/tweets', array("q" => $_SESSION["key"], "result_type" => "popular", "count"=>20));
        header('Content-type: application/json; charset=utf-8');
        header('access-control-allow-origin: *');
        //Convert data to JSON
        
        $result = "";
        foreach($tweet->statuses as $value){
          preg_match('/(.*)https(.*)/', $value->text, $output_array);
          //We form this pattern for print in HTML
          $result = $result."<p><img src=\"".$value->user->profile_image_url."\" class=\"rounded-circle pr-2\" alt=\"twitter\"style=\"padding-bottom: 5px\"> \"".$value->user->name."\"<br>".$output_array[1]."</p><hr>";
        }
        //Return value to view.js
        echo(json_encode($result));
}
else{
     echo("go back");
 }
?>