import Experience from "./Experience";
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'


export default class Enviornment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        const loader = new THREE.TextureLoader();
        const bgTexture = loader.load('static/sky.jpeg');
        const aspect = this.experience.sizes.width / this.experience.sizes.height
        bgTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
        bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;
        
        bgTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
        bgTexture.repeat.y = aspect > 1 ? 1 : aspect;
        this.scene.background = bgTexture;

        this.setAmbientLight()
        this.makebent()
        this.makeText()
        this.makefloor()
    }

    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(this.ambientLight)

        const pointLight = new THREE.PointLight(0xffffff, 0.1)
        pointLight.position.set(2, 10, -5)
        this.scene.add(pointLight)
    }

    makefloor()
    {
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(
                300, 300, 50, 50
            ),
            new THREE.MeshStandardMaterial({color: 0xABB290})
        )

        floor.rotation.set(- Math.PI / 2, 0, 0)
        floor.position.set(0, -2, 0)
        this.scene.add(floor)
    }

    makeText()
    {
        const fontLoader = new FontLoader()
        fontLoader.load(
            'static/helvetiker_regular.typeface.json',
            (font) =>
            {
                const name = new THREE.Mesh(
                    new TextGeometry(
                        'Chris Chan',
                        {
                            font: font,
                            size: 1.5,
                            height: 0.3,
                            curveSegments: 12,
                            bevelEnabled: true,
                            bevelThickness: 0.03,
                            bevelSize: 0.02,
                            bevelOffset: 0,
                            bevelSegments: 5
                        }
                    )
                    ,
                    new THREE.MeshStandardMaterial({color: 0xffffff})
                )
                name.position.set(-15, -1, 4)
                this.scene.add(name)

                const other = new THREE.Mesh(
                    new TextGeometry(
                        'TBP 2022',
                        {
                            font: font,
                            size: 1.5,
                            height: 0.3,
                            curveSegments: 12,
                            bevelEnabled: true,
                            bevelThickness: 0.03,
                            bevelSize: 0.02,
                            bevelOffset: 0,
                            bevelSegments: 5
                        }
                    )
                    ,
                    new THREE.MeshStandardMaterial({color: 0xffffff})
                )
                other.position.set(7.5, -1, 4)
                this.scene.add(other)
            }
        )
    }

    makebent()
    {
        const pillarAngle = Math.PI / 2.25
        const bottomHeight = 5
        const topWidth = 5
        const bottomWidth = 8
        const pillarHeight = 5
        const topCylinderHeight = 1.5
        const ringRadius = 0.75
        const ringTubeHeight = 0.25


        this.bent = new THREE.Group()

        const cylinder = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.5, // radiusTop
                0.5, // radiusBottom
                bottomHeight, // Height
                32 // RadialSegments
                ),
            new THREE.MeshStandardMaterial( {color: 0xAF5521 })
        )
        cylinder.position.set(0, bottomHeight / 2, 0)
        this.bent.add(cylinder)

        const bottomSide = new THREE.Mesh(
            new THREE.BoxGeometry(
                bottomWidth, // width
                1, // height
                1 //  depth
            ),
            new THREE.MeshStandardMaterial( {color: 0xAF5521 })
        )
        bottomSide.position.set(0, bottomHeight, 0)
        this.bent.add(bottomSide)

        const leftPillar = new THREE.Mesh(
            new THREE.BoxGeometry(
                pillarHeight / Math.sin(pillarAngle),    // width
                0.75, // height
                0.75  // depth
            ),
            new THREE.MeshStandardMaterial( {color: 0xAF5518 })
        )

        leftPillar.rotation.set(0, 0, pillarAngle)
        leftPillar.position.set(
            -bottomWidth * 0.2, 
            bottomHeight + pillarHeight / 2, 
            0)
        this.bent.add(leftPillar)

        const rightPillar = new THREE.Mesh(
            new THREE.BoxGeometry(
                pillarHeight / Math.sin(pillarAngle),
                0.75, // height
                0.75  // depth
            ),
            new THREE.MeshStandardMaterial( {color: 0xAF5518 })
        )

        rightPillar.rotation.set(0, 0, -pillarAngle)
        rightPillar.position.set(
            bottomWidth * 0.2, 
            bottomHeight + pillarHeight / 2, 
            0)
        this.bent.add(rightPillar)

        const topBar = new THREE.Mesh(
            new THREE.BoxGeometry(
                topWidth, // width
                1,
                1
            ),
            new THREE.MeshStandardMaterial( {color: 0xAF5521 })
        )

        topBar.position.set(
            0, 
            bottomHeight + pillarHeight,
            0)
        this.bent.add(topBar)

        const topCylinder = new THREE.Mesh(
            new THREE.BoxGeometry(
                1,
                topCylinderHeight,
                1
            ),
            new THREE.MeshStandardMaterial( {color: 0xAF5521 } )
        )
        topCylinder.position.set(
            0,
            bottomHeight + pillarHeight + topCylinderHeight / 2,
            0
        )
        this.bent.add(topCylinder)
    
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(
                ringRadius, // radius
                ringTubeHeight, // tube
                20,
                20,
                Math.PI * 2
            ),
            new THREE.MeshStandardMaterial( {color: 0xAF5521 } )
        )
        ring.position.set(
            0,
            bottomHeight + pillarHeight + topCylinderHeight + ringRadius,
            0
        )
        this.bent.add(ring)

        this.scene.add(this.bent)
    }

    update()
    {
        this.bent.rotateOnAxis(
            new THREE.Vector3(0, 1, 0),
            Math.PI / 300
        )
    }

}