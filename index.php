<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

// Allows any origin to access the url
header('access-control-allow-origin: *');
// Allows for the custom header x-api-key to be present in requests
header('access-control-allow-headers: x-api-key, content-type');
// Aloows for some request methods to be used to access URL
header('access-control-allow-methods: GET, POST, PUT, OPTIONS');
header('cache-control: no-store, no-cache, must-revalidate, max-age=0');
header('content-type: text/html');

// When using a method other than GET, HEAD and POST,
//  the content-type header needs to be defined as allowed!



echo json_encode(array('success_opt' => true));

} else {

$queryWeather = $_SERVER['REQUEST_URI'];

$headers = apache_request_headers();

//var_dump($headers);

if (substr($queryWeather, 0, 12) === '/v2/stations') {

if (array_key_exists('X-Api-Key', $headers)) {

$apiKey = $headers['X-Api-Key'];

//var_dump($apiKey);

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'https://api.meteostat.net' . $queryWeather,
    CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:79.0) Gecko/20100101 Firefox/79.0'
]);

curl_setopt($curl, CURLOPT_HTTPHEADER, array(
'x-api-key: ' . $apiKey,
'Cache-Control: no-cache',
'Accept: */*',
));

$cHeaders = [];

// this function is called by curl for each header received
curl_setopt($curl, CURLOPT_HEADERFUNCTION,
  function($curl, $header) use (&$cHeaders)
  {
    $len = strlen($header);
    $header = explode(':', $header, 2);
    if (count($header) < 2) // ignore invalid headers
      return $len;

    $cHeaders[strtolower(trim($header[0]))][] = trim($header[1]);

    return $len;
  }
);

$resp = curl_exec($curl);

//var_dump($resp);

$curlInfo = curl_getinfo($curl);

//var_dump($curlInfo);

curl_close($curl);

http_response_code($curlInfo['http_code']);

//var_dump($cHeaders);

$ignoreHeader = array('transfer-encoding');

foreach ($cHeaders as $cHeaderKey => $cHeaderVal) {
if (count($cHeaderVal) > 0 && !in_array($cHeaderKey, $ignoreHeader)) {
header($cHeaderKey . ': ' . $cHeaderVal[0]);
//var_dump($cHeaderKey . ': ' . $cHeaderVal[0]);
}
}

echo $resp;

} else {
echo 'no key';
}

} else {
header('content-type: application/json; charset=UTF-8');
header('cache-control: public, must-revalidate, max-age=1209600');
header('access-control-allow-origin: *');

echo json_encode(array('success' => true));

}


}

?>
