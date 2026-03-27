import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Floor texture
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/forrest_ground_01_1k/forrest_ground_01_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/forrest_ground_01_1k/forrest_ground_01_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/forrest_ground_01_1k/forrest_ground_01_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/forrest_ground_01_1k/forrest_ground_01_disp_1k.jpg')

floorColorTexture.colorSpace = THREE.SRGBColorSpace
floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall
const wallColorTexture = textureLoader.load('./wall/worn_mossy_plasterwall_1k/worn_mossy_plasterwall_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./wall/worn_mossy_plasterwall_1k/worn_mossy_plasterwall_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/worn_mossy_plasterwall_1k/worn_mossy_plasterwall_nor_gl_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace
wallColorTexture.repeat.set(2, 1.25)
wallARMTexture.repeat.set(2, 1.25)
wallNormalTexture.repeat.set(2, 1.25)

wallColorTexture.wrapS = THREE.RepeatWrapping
wallColorTexture.wrapT = THREE.RepeatWrapping
wallARMTexture.wrapS = THREE.RepeatWrapping
wallARMTexture.wrapT = THREE.RepeatWrapping
wallNormalTexture.wrapS = THREE.RepeatWrapping
wallNormalTexture.wrapT = THREE.RepeatWrapping

// Roof
const roofColorTexture = textureLoader.load('./roof/roof_3_1k/roof_3_diff_1k.webp')
const roofARMTexture = textureLoader.load('./roof/roof_3_1k/roof_3_arm_1k.webp')
const roofNormalTexture = textureLoader.load('./roof/roof_3_1k/roof_3_nor_gl_1k.webp')

roofColorTexture.colorSpace = THREE.SRGBColorSpace
roofColorTexture.repeat.set(4, 1)
roofARMTexture.repeat.set(4, 1)
roofNormalTexture.repeat.set(4, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

// Bush
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg')
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg')
const bushDisplacementTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_disp_1k.jpg')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

// Graves
const graveColorTexture = textureLoader.load('./graves/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
const graveARMTexture = textureLoader.load('./graves/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')
const graveNormalTexture = textureLoader.load('./graves/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')
graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(1.2, 1.6)
graveARMTexture.repeat.set(1.2, 1.6)
graveNormalTexture.repeat.set(1.2, 1.6)

graveColorTexture.wrapS = THREE.RepeatWrapping
graveColorTexture.wrapT = THREE.RepeatWrapping
graveARMTexture.wrapS = THREE.RepeatWrapping
graveARMTexture.wrapT = THREE.RepeatWrapping
graveNormalTexture.wrapS = THREE.RepeatWrapping
graveNormalTexture.wrapT = THREE.RepeatWrapping

// Door
const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.025
    })
)
floor.rotation.x = -Math.PI / 2
scene.add(floor)

// House group
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture,
    })
)
walls.position.y += 2.5 / 2
house.add(walls)

// Roof
const roofGeometry = new THREE.ConeGeometry(3.5, 1.5, 4)
const positionAttribute = roofGeometry.attributes.position
const uvAttribute = roofGeometry.attributes.uv

for (let i = 0; i < uvAttribute.count; i++) {
    if (positionAttribute.getY(i) > 0) {
        uvAttribute.setX(i, uvAttribute.getX(i) - 0.125)
    }
}

const roof = new THREE.Mesh(
    roofGeometry,
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)

roof.position.y = 2.5 + 1.5 / 2
roof.rotation.y = Math.PI / 4
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
    })
)
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColorTexture,
    normalMap: bushNormalTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    displacementMap: bushDisplacementTexture,
    displacementScale: 0.56,
    displacementBias: -0.16
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.45, 0.45, 0.45)
bush1.position.set(2.1, 0.3, 2.2)
bush1.rotation.x = -0.25
bush1.rotation.z = -1.7

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.35, 0.35, 0.35)
bush2.position.set(1.4, 0.25, 2.4)
bush2.rotation.x = -0.6

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-1.4, 0.3, 2.5)
bush3.rotation.x = -0.95
bush3.rotation.y = -0.95

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.25, 0.25, 0.25)
bush4.position.set(-1.7, 0.2, 2.6)
bush4.rotation.z = -0.8

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial)
bush5.scale.set(0.25, 0.25, 0.25)
bush5.position.set(-1, 0.2, 2.5)
bush5.rotation.z = -2.8

house.add(bush1, bush2, bush3, bush4, bush5)

// Graves
const graveShape = new THREE.Shape()
graveShape.moveTo(-0.3, -0.4)
graveShape.lineTo(0.3, -0.4)
graveShape.lineTo(0.3, 0.1)
graveShape.absarc(0, 0.1, 0.3, 0, Math.PI, false)
const graveGeometry = new THREE.ExtrudeGeometry(graveShape, {
    depth: 0.2,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.02,
    bevelThickness: 0.02
})
graveGeometry.center()
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture,
})

const graves = new THREE.Group()
scene.add(graves)

const placedGraves = []

for (let i = 0; i < 30; i++) {
    let x, z;
    let overlapping = true;
    let attempts = 0;

    while (overlapping && attempts < 100) {
        const angle = Math.random() * Math.PI * 2
        const radius = 3 + Math.random() * 4
        x = Math.sin(angle) * radius
        z = Math.cos(angle) * radius

        overlapping = false;

        for (const bush of [bush1, bush2, bush3, bush4, bush5]) {
            const distance = Math.hypot(x - bush.position.x, z - bush.position.z)
            if (distance < bush.scale.x + 0.4) {
                overlapping = true;
                break;
            }
        }

        if (!overlapping) {
            for (const placedGrave of placedGraves) {
                const distance = Math.hypot(x - placedGrave.x, z - placedGrave.z)
                if (distance < 0.8) {
                    overlapping = true;
                    break;
                }
            }
        }
        attempts++;
    }

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x
    grave.position.y = 0.2 + Math.random() * 0.2
    grave.position.z = z
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    graves.add(grave)

    // Store position so the next grave can check against it
    placedGraves.push({ x: x, z: z })
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadow
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for (const grave of graves.children) {
    grave.castShadow = true
    grave.receiveShadow = true
}

// Mappings
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

/**
 * Sky
 */
const sky = new Sky()
sky.scale.setScalar(100)
sky.material.uniforms.turbidity.value = 10
sky.material.uniforms.rayleigh.value = 3
sky.material.uniforms.mieCoefficient.value = 0.1
sky.material.uniforms.mieDirectionalG.value = 0.95
sky.material.uniforms.sunPosition.value.set(0.3, -0.038, -0.95)
scene.add(sky)

/**
 * Fog
 */

scene.fog = new THREE.FogExp2('#04343f', 0.1)

/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = - elapsedTime * 0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()