<?php

require './blade/src/Autoloader.php';
require 'app/Film.php';
require 'app/Personne.php';
require 'app/fakedata.php';
Xiaoler\Blade\Autoloader::register();

use Xiaoler\Blade\FileViewFinder;
use Xiaoler\Blade\Factory;
use Xiaoler\Blade\Compilers\BladeCompiler;
use Xiaoler\Blade\Engines\CompilerEngine;
use Xiaoler\Blade\Filesystem;
use Xiaoler\Blade\Engines\EngineResolver;

$path = ['./resources/views'];         // your view file path, it's an array
$cachePath = './resources/cache';     // compiled file path

$file = new Filesystem;
$compiler = new BladeCompiler($file, $cachePath);


$resolver = new EngineResolver;
$resolver->register('blade', function () use ($compiler) {
    return new CompilerEngine($compiler);
});

// get an instance of factory
$factory = new Factory($resolver, new FileViewFinder($file, $path));

// if your view file extension is not php or blade.php, use this to add it
$factory->addExtension('tpl', 'blade');
