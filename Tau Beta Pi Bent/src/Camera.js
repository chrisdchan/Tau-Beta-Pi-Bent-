import Experience from "./Experience"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import { PerspectiveCamera } from "three"

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            200
        )
        this.instance.position.set(0, 5, 50)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

}
