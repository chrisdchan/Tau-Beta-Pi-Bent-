import * as THREE from 'three'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Renderer from './Renderer'
import Camera from './Camera'
import World from './World'

let instance = null

export default class Experience
{
    constructor(canvas)
    {
        if(instance)
        {
            return instance
        }

        instance = this
        window.experience = this

        this.canvas = canvas
        this.scene = new THREE.Scene()
        
        this.sizes = new Sizes()
        this.time = new Time()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        this.time.on('tick', () => {this.update()})
        this.sizes.on('resize', () => {this.resize()})
    }

    update()
    {
        this.renderer.update()
        this.world.update()
    }

    resize()
    {
        this.renderer.resize()
        this.camera.resize()
    }
}
