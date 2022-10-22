import Experience from "./Experience";
import * as THREE from 'three'

export default class Enviornment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setAmbientLight()
        this.makeBent()
    }

    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(this.ambientLight)
    }

    makeBent()
    {
        const pillarAngle = Math.PI / 2.25
        const bottomHeight = 5
        const topWidth = 5
        const bottomWidth = 8
        const pillarHeight = 5


        const bent = new THREE.Group()

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
        bent.add(cylinder)

        const bottomSide = new THREE.Mesh(
            new THREE.BoxGeometry(
                bottomWidth, // width
                1, // height
                1 //  depth

            ),
            new THREE.MeshStandardMaterial( {color: 0xAF5521 })
        )
        bottomSide.position.set(0, bottomHeight, 0)
        bent.add(bottomSide)

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
        bent.add(leftPillar)

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
        bent.add(rightPillar)

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
        bent.add(topBar)

        this.scene.add(bent)
    }

}