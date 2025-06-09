<?php

return [

    'paths' => [
        'api/*',
        'api/sanctum/csrf-cookie',
        'api/login',
        'api/register',
        'api/logout',
    ],

    'allowed_methods' => ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],

    'allowed_origins' => ['http://localhost:3000',],

    'allowed_origins_patterns' => ['/^http:\/\/localhost(:\d+)?$/'],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
