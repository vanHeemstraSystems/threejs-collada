# 300 - Building Our Application

## 100 - You will need additional javaScript files beyond just that of threejs
On top of loading the usual threejs file, the Collada file loader will also need to be loaded first before any additional javaScript that makes use of threejs and the Collada loader. Where these files can be found and what kind of file you will need will change depending on what revision number of threejs you are using. 

In revisions of threejs that are at r147 and older there should be a js folder in the examples folder of the threejs github repo which is where one will find the plain js file version of the DAE loader that are to be used with text/javascript mime type script tags. 

However as of r146 the js folder has been removed, and now one must use module type script tags, and with that the JSM version of the DAE loader.

**NOTE**: We use revision r146 or newer.

In many of these examples I am also using the Orbit Controls file which is yet another external files that can be located in the examples folder. On top of all of this there is also the dae files themselves along with any additional texture files that will also need to be loaded along with that f the dae file.

## 200 - I am running this example by way of http rather the the file protocol
I am running this example by way of http rather than the file protocol, this should go without saying, but this is something that it would seem that I need to repeat in many posts. One way or another all the assets that I am using when it comes to three.js, additional javaScript files, and dae files are all being hosted by way of http even when I am juts working with thinks locally. If you are trying to get this to work by opening an html file in the browser rather than navigating to a public folder that is being hosted by way of local host you might run into errors. Again this topic and many others are covered in my getting starred post with three.js post, sometimes it is just called for to take a step backward when trying to work out something.
