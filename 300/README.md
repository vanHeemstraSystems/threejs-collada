# 300 - Building Our Application

## 100 - You will need additional javaScript files beyond just that of threejs
On top of loading the usual threejs file, the Collada file loader will also need to be loaded first before any additional javaScript that makes use of threejs and the Collada loader. Where these files can be found and what kind of file you will need will change depending on what revision number of threejs you are using. 

In revisions of threejs that are at r147 and older there should be a js folder in the examples folder of the threejs github repo which is where one will find the plain js file version of the DAE loader that are to be used with text/javascript mime type script tags. 

However as of r146 the js folder has been removed, and now one must use module type script tags, and with that the JSM version of the DAE loader.

**NOTE**: We use revision r146 or newer.
