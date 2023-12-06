// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
//-------- ----------
// LOADING
//-------- ----------
DAE_loader({
    // custom cloner
    cloner: (obj, scene_source ) => {
        if(obj.type === 'Mesh'){
            const mat = new THREE.MeshBasicMaterial({
                map: obj.material.map
            });
            const mesh = new THREE.Mesh(obj.geometry, mat);
            mesh.name = obj.name;
            mesh.rotation.copy(obj.rotation);
            scene_source.add(mesh);
        }
    },
    urls_dae: [
        // 'dae/lego/lego-azure.dae'
        'dae/cube/cube.dae'
    ],
    urls_resource: [
        // 'dae/lego/skins/'
    ]
})
.then( (scene_source) => {
    console.log('done loading');
    camera.position.set(2, 1, -2); // 2, 1, -2
    scene.add( new THREE.GridHelper(10, 40) )
    const mesh_cube = scene_source.getObjectByName('Face1').clone();
    scene.add( mesh_cube)
    camera.lookAt(mesh_cube.position);
    /*
    const mesh_lego_baseplate = scene_source.getObjectByName('Part.0').clone();
    scene.add( mesh_lego_baseplate )
    const mesh_lego_largeplate = scene_source.getObjectByName('Part.1').clone();
    scene.add( mesh_lego_largeplate )
    const mesh_lego_smallplate = scene_source.getObjectByName('Part.2').clone();
    scene.add( mesh_lego_smallplate )  
    const mesh_lego_brick = scene_source.getObjectByName('Part.3').clone();
    scene.add( mesh_lego_brick )      
    camera.lookAt(mesh_lego_baseplate.position);
    */
    loop();
})
.catch( (e) => {
    console.warn(e);
});