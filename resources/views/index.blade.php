<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="{{ asset('images/MLiby.png') }}" type="image/x-icon">
    <title>MLiby.com</title>
    @viteReactRefresh
    @vite([
        'resources/css/index.css', //
        'resources/js/index.jsx', //
    ])
</head>

<body>
    <div id="root"></div>
</body>

</html>
