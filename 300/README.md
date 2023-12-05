# 300 - Building Our Application

## 100 - You will need additional javaScript files beyond just that of threejs
On top of loading the usual threejs file, the Collada file loader will also need to be loaded first before any additional javaScript that makes use of threejs and the Collada loader. Where these files can be found and what kind of file you will need will change depending on what revision number of threejs you are using. 

In revisions of threejs that are at r147 and older there should be a js folder in the examples folder of the threejs github repo which is where one will find the plain js file version of the DAE loader that are to be used with text/javascript mime type script tags. 

However as of r146 the js folder has been removed, and now one must use module type script tags, and with that the JSM version of the DAE loader.

**NOTE**: We use revision r146 or newer.

In many of these examples I am also using the Orbit Controls file which is yet another external files that can be located in the examples folder. On top of all of this there is also the dae files themselves along with any additional texture files that will also need to be loaded along with that f the dae file.

## 200 - I am running this example by way of http rather the the file protocol
I am running this example by way of http rather than the file protocol, this should go without saying, but this is something that it would seem that I need to repeat in many posts. One way or another all the assets that I am using when it comes to three.js, additional javaScript files, and dae files are all being hosted by way of http even when I am just working with things locally. If you are trying to get this to work by opening an html file in the browser rather than navigating to a public folder that is being hosted by way of local host you might run into errors. Again this topic and many others are covered in my [getting started post with three.js post](https://dustinpfister.github.io/2018/04/04/threejs-getting-started/), sometimes it is just called for to take a step backward when trying to work out something.

## 300 - There is also my dae tools threejs examples project
This post has to do with a few examples involving working with the dae file loader alone, rather than some kind of additional module built on top of it. As I work with the dae loader there are going to be various tasks that will come up, and things that I will want to do a certain way that results in a need for some kind of additional utility library to park some of these methods that I will want to use over and over again. So then I have a [DAE tools threejs project example](https://dustinpfister.github.io/2021/06/25/threejs-examples-dae-tools/) that is my current standing take on this kind of project that I come around to revising now and then.

## 400 - The source code examples in this post are on Github
The source code examples that I am write about in this post can be [found up on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-dae-collada-loader) in my text threejs repository. This is also where I am placing all the various source code examples that I have made for all my [other blog posts on threejs](https://dustinpfister.github.io/categories/three-js/) over the years as well.

## 500 - Version Numbers matter with three.js
When I wrote this post I was using r127 of three.js, and the last time I got around to doing a little editing I was [using r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). In the future this code might break on later versions as code breaking changes are made to the library often. So if the code breaks the first thing you should check is what version of three.js you are using, it really matters a lot, more so than other libraries where the code is just more or less being maintained at a fixed state in terms of the state of the public API.

I try to do a half way decent job of editing files, but I have a lot of pots boiling when it comes to all the other various posts on threejs as well as whole other topics completely.

## 600 - 


MORE ...
