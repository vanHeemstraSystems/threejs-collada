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

## 600 - Some basic examples of the DAE loader
Working with the DAE loader, and loaders in general has proved to be a little bit of a pain. Not so much when it comes to getting started with just loading a single DAE file mind you but a bunch of little things that will pop up as one moves forward to working out some code to use the DAE loader and address a whole bunch of other little things that will pop up. However I will not be getting into any of that here, rather I will be starting out with just a few vary simple basic examples. When it comes to just simply getting started with the DAE loader this is simple enough as least.

### 100 - Load a single dae file
In this example I will just be loading a single dae file using the THREE.ColladaLoader constructor to create an instance of such a loader. I then just need to call the load method of this Collada loader instance and pass the url to the dae file that I want to load as the first argument. For the second argument I am going to want to pass a callback function to call when the resource has finished loading. It is then within this call back function that I am going to want to add the whole scene, or a child object of the dae file into the three.js scene, or do whatever it is that needs to be done with what the file contains.

```
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LOADING A DAE FILE
//-------- ----------
const loader = new THREE.ColladaLoader();
loader.load("/dae/obj/obj.dae", function (result) {
    const mesh_source = result.scene.children[2];
    const mesh = new THREE.Mesh(mesh_source.geometry, new THREE.MeshNormalMaterial());
    scene.add(mesh);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
});
```

For this example I am just loading a single file, and I am sure nothing will go wrong when doing so. However when it comes to making something that is ready for production, or is staring to go in the direction of a full bug time project of some kind I am going to want to pass a few more functions to the loader method that have to do with tracking load progress, and handing errors.
Still for this basic example I just wanted to load a single object in the dae file, to do so there is the scene object of the result. In this scene object there are all the children in the scene loaded from the dae file, with the file I used there where three children and I just happen to know which child it is that I wanted to load. Alternatively I could also just load the full scene rather than just the single child object that I wanted.

After I have what I wanted from the file added to my main three.js scene, I just started my main app loop function in which I am rendering the scene, and updating the orbit controls that i am also making use of that I can then use to look at the module that I have loaded.

See containers/app/threejs/s1-1-basic-single/index.html

### 200 - Setting the resource URL and using a Custom Loading Manager
Loading just a single dae file where I just care about the geometry and nothing else is one thing, but then there are dae files where I also care about the uvs, and also some additional textures files to use to skin the dae file geometry. To make matters worse in some cases the dae file that I want to load is in one location and the texture files that I want to skin it with are located in another. For example I might have one dae file, but then a few folders with different skins for the same dae file. With that said there should be a way to change what the resource URL is for a loader, for this there is the [setResourcePath method of the loader class](https://threejs.org/docs/#api/en/loaders/Loader.setResourcePath) that can be used to do just that.

```
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff);
pl.position.set(2, 5, 3);
scene.add(pl);
//-------- ----------
// LOAD MANAGER
//-------- ----------
const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log('manager.onStart');
};
manager.onLoad = function ( ) {
    console.log('manager.onLoad: Dae and textures now loaded.');
    camera.position.set(5,5,5);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log('manager.onProgress: ' + itemsLoaded + '/' + itemsTotal);
};
manager.onError = function ( url ) {};
//-------- ----------
// DAE LOADER
//-------- ----------
// CREATE A COLLADALOADER INSTANCE
const loader = new THREE.ColladaLoader(manager);
// SETTING THE BASE RESOURCE URL FOR TEXTTURES
loader.setResourcePath('dae/guy2/guy2-skin-mrg1/');
// THEN LOADING AS USHUAL
loader.load('dae/guy2/guy2.dae', function (result) {
    console.log('cb of loader.load');
    // adding the child that I want to the scene
    scene.add(result.scene.children[2]);
});
```

One additional thing that I thought I should start to look into at least with this example is to use a custom loader manager along with the single instance of the dae loader. One major reason why is that the callback for the load method of the dae loader will fore when the dae file is loaded, but not when all the textures are loaded. So then I have found that I want to start the loop when all the textures are loaded also, not just the dae file alone.

See containers/app/threejs/s1-2-basic-resource/index.html

### 300 - Loading more than one file

This is where things will start to get a little involved as in this section I will be focusing on code examples that have to do with loading more than one DAE file. There is a lot to take in when it comes to this sort of thing, and I still do not have a solution that I am truly happy with as well for that matter. What makes this a little involved is that there is not just having an array of urls for each DAE file but I will also want to have urls for the base resource urls for the images that I will use for each file. On top of that there is also the question of how which objects from the dae exports do I want, and also how to go about making clones of them. There are a whole lot of other little tasks such as how to go about making a progress bar if I feel as though I may need one, and so forth.

### 400 - Basic helper function that returns a promise

Although loading a whole bunch of DAE files will prove to be a little hard, it is still only so hard. Also as always it helps to start out with a very simple hello world type example of something, and with this example at least I will be starting out with just that. For this example I have a single helper function that will return a promise that will resolve when the on load event happens for the main loading manager, and the promise will reject if there is a single error with the main manager.

```
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1, 3, 2);
scene.add(dl);
//-------- ----------
// HELPERS
//-------- ----------
const DAE_loader = function( dae_urls, resource_urls){
    resource_urls = resource_urls || [];
    const manager = new THREE.LoadingManager();
    const scene_source = new THREE.Scene();
    return new Promise( (resolve, reject) => {
        manager.onError = function(url){
            reject(new Error( 'error when loading: ' + url ));
        };
        manager.onLoad = function(){
            resolve(scene_source);
        };
        dae_urls.forEach((url, i) => {
            const loader = new THREE.ColladaLoader(manager);
            if(resource_urls[i]){
                loader.setResourcePath(resource_urls[i]);
            }
            loader.load(url, function(result){
                result.scene.traverse((obj) => {
                    if(obj.type === 'Mesh'){
                        scene_source.add( obj.clone() );
                    }
                });
            });
        });
    });
};
//-------- ----------
// LOADING
//-------- ----------
DAE_loader(
    // DAE FILES
    ['/dae/count_down_basic/cd4-nums.dae',
     '/dae/rpi4/rpi4_start_box.dae'],
    // RESOURCE PATHS
    ['/dae/count_down_basic/',
     '/dae/rpi4/']
)
.then( (scene_source) => {
    console.log('Done loading.');
    scene.add( scene_source)
    camera.position.set(10, 10, 10);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
})
.catch( (e) => {
    console.warn(e);
});
```

See containers/app/threejs/s2-1-many/index.html

### 500 - Custom Cloner option

One major problem that I have run into has to do with what objects to add in to a collection of source objects to begin with. After that I also often have problems that have to do with how to go about cloning in the new objects from the raw DAE files. I have found thus far that I can adress this problem by allowing for an option where I can define what the logic should be for this.

```
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const DAE_loader = function( opt ){
    opt = opt || {};
    opt.urls_dae = opt.urls_dae || [];
    opt.urls_resource = opt.resource_urls || [];
    // use given cloner or defult to add everything
    opt.cloner = opt.cloner || function(obj, scene_source, scene_result, result){
        scene_source.add(obj.clone());
    };
    const manager = new THREE.LoadingManager();
    const scene_source = new THREE.Scene();
    return new Promise( (resolve, reject) => {
        manager.onError = function(url){
            reject(new Error( 'error when loading: ' + url ));
        };
        manager.onLoad = function(){
            resolve(scene_source);
        };
        opt.urls_dae.forEach((url, i) => {
            const loader = new THREE.ColladaLoader(manager);
            if(opt.urls_resource[i]){
                loader.setResourcePath(opt.urls_resource[i]);
            }
            loader.load(url, function(result){
                result.scene.traverse((obj) => {
                      opt.cloner(obj, scene_source, result.scene, result);
                });
            });
        });
    });
};
//-------- ----------
// LOADING
//-------- ----------
DAE_loader({
    // custom cloner
    cloner: (obj, scene_source ) => {
        if(obj.type === 'Mesh'){
            const mat = new THREE.MeshPhongMaterial({
                emissive: new THREE.Color(1,1,1),
                emissiveIntensity: 0.5,
                emissiveMap: obj.material.map 
            });
            const mesh = new THREE.Mesh(obj.geometry, mat);
            mesh.position.copy(obj.position);
            mesh.rotation.copy(obj.rotation);
            scene_source.add(mesh);
        }
    },
    urls_dae: [
        '/dae/count_down_basic/cd4-nums.dae',
         '/dae/rpi4/rpi4_start_box.dae'
    ],
    urls_resource: [
        '/dae/count_down_basic/',
        '/dae/rpi4/'
    ]
})
.then( (scene_source) => {
    console.log('Done loading.');
    scene.add( scene_source)
    camera.position.set(10, 10, 10);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
})
.catch( (e) => {
    console.warn(e);
});
```

See containers/app/threejs/s2-2-many-cloner/index.html

### 600 - Having a module form of this DAE Helper ( r0 )

I have made a threejs project example called DAE tools that I have used a little now and then, and have also made a few revisions of thus far. However at the time of this writing at least I have found that I am making that project a little to complex, and also when it comes to the most important aspects of what it should be it is not working so great. So then I am making a new module type project where I am starting over and just thinking more in terms of what is most important when it comes to loading DAE files.

There is not just loading a DAE file, there is also loading a few DAE files. There is also not just loading a few DAE files but also loading zero or more textures for each of these files. There is also not just loading the DAE files and all additional assets, but there is also the question of what to load from the DAE files. For example when I work out a blender file, and export that file as DAE I might have a camera, lamp, and additional mesh objects that I might not want to be added to a main scene object that I will then add resources from. Speaking of a main source object there is also that as well. That is to not just have a collection of result objects but a single scene object that is created from one or more DAE files that I will either directly use as a project, or use as a means to get references to source objects that will in turn be used with another scene object.

Okay that was all a mouth full, however maybe all of that can still all be done with one little helper function that I can package up as just a very simple little javaScript project that I can then link to and use from one project to the next, and that will be what this section is all about.

### 700 - The module helper source code ( r0 )

This is then what I have together for my DAE helper module then. There is just having a single public method with this one that will return a promise that will result once all the assets are loaded. Also when the promise resolves it will give a single source scene object that I can then directly use with a renderer, or use as a way to get source objects that I can then clone and add to some other scene object as needed. This all comes down to how I go about writing the cloner method which is something that I can give as an option when calling the helper function. I of course have a built in cloner method that will just clone and add everything from each DAE file that is loaded by default. However I can of course change that as needed on a project by project basis if I want.

```
// dae-helper.js - r0 - from threejs-dae-collada-loader
(function(global){
    // a hard coded default cloner function
    const DEFAULT_CLONER = function(obj, scene_source, scene_result, result){
        scene_source.add(obj.clone());
    };
    // The public DAE_loader function
    global.DAE_loader = function( opt ){
        opt = opt || {};
        opt.urls_dae = opt.urls_dae || [];
        opt.urls_resource = opt.resource_urls || [];
        // use given cloner or defult to add everything
        opt.cloner = opt.cloner || DEFAULT_CLONER;
        const manager = new THREE.LoadingManager();
        const scene_source = new THREE.Scene();
        return new Promise( (resolve, reject) => {
            manager.onError = function(url){
                reject( new Error( 'error when loading: ' + url ) );
            };
            manager.onLoad = function(){
                resolve(scene_source);
            };
            opt.urls_dae.forEach((url, i) => {
                const loader = new THREE.ColladaLoader( manager );
                if(opt.urls_resource[i]){
                    loader.setResourcePath( opt.urls_resource[i] );
                }
                loader.load(url, function(result){
                    result.scene.traverse( (obj) => {
                          opt.cloner(obj, scene_source, result.scene, result);
                    });
                });
            });
        });
    };
}( window ));
```

See containers/app/threejs/s3-1-module/index.html

### 800 - Conclusion

The dae format seems to work okay thus far, in order to really know what I can do with the Collada format I am going to need to look into how to use blender more. I am thinking for now I will want to just focus on making simple static models, but there is also looking into how to go about create animations for a dae file also that can then be used in three.js with the Animation mixer. However maybe all of that is a matter for a whole other post, for now I just wanted to work out just a few quick examples that have to do with loading what I make in blender into a threejs project.

The alternative to getting into the various external file formats is to just make crude yet effective models using just three.js, and javaScript alone which I have done before getting into use blender. I have written a few posts on this kind of thing when it comes to [my post on my first guy model](https://dustinpfister.github.io/2021/04/29/threejs-examples-guy-one/) that I made that is just a bunch of [box geometries](https://dustinpfister.github.io/2021/04/26/threejs-box-geometry/) grouped together by way of the [threejs group class](https://dustinpfister.github.io/2018/05/16/threejs-grouping-mesh-objects/). This might actually be a decent starting point when it comes to making assets for three.js actually as thus far I find it to be the easiest way to go about making them. However there is a draw back to this sort of thing when it comes to making something that can be shared between three.js, blender, and other applications. So with that said it makes sense to look into what the options are with external file formats that are fairly open and a well supported standard when it comes to things outside that of three.js. For me so far it would seem that the Collada format seems to be just what it is that I want.

## 900 - Lego

In addition to the previous developer, we have developed more examples, including the LEGO 3D model in DAE.

```

```

See containers/app/threejs/s3-2-module-lego/index.html