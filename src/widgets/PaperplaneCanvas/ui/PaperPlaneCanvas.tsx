import React, {useEffect, useRef} from 'react';
import cls from './PaperPlaneCanvas.module.css'
// @ts-ignore
import {Engine,Render,Runner,Bodies,World,Composite,Mouse,MouseConstraint} from 'matter-js';

const PaperPlaneCanvas = () => {


    const scene = useRef()

    const engine = useRef(Engine.create())

    useEffect(()=>{

        const cw = document.body.clientWidth
        const ch = document.body.clientHeight
        const xMax = 450

        const groundWidth = 60
        const ground = Bodies.rectangle(window.innerHeight, window.innerHeight, cw, groundWidth, { isStatic: true , render : { fillStyle : 'transparent'} });
        const leftWall = Bodies.rectangle(0 ,window.innerHeight/2,groundWidth,window.innerHeight,{ isStatic: true , render : { fillStyle : 'transparent'} })
        const rightWall = Bodies.rectangle(window.innerWidth ,window.innerHeight/2,groundWidth,window.innerHeight,{ isStatic: true , render : { fillStyle : 'transparent'} })

        const render = Render.create({
            element : scene.current,
            engine : engine.current,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent'
            }
        })

        const mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine.current, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });


        function getRandomInt(max : number) {
            return Math.floor(Math.random() * max);
        }

        function sleep(ms : number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        function createPaperPlane (x : number){
            const paperPlane = Bodies.circle(x,-50,40, {
                render:{
                    sprite:{
                        xScale:0.18,
                        yScale:0.18,
                        texture: "https://purepng.com/public/uploads/large/purepng.com-white-paper-planpaper-planeaeroplanepaper-gliderpaper-dartaircraftfolded-paperpaperboardclipartblack-1421526588372vrzkf.png"
                    }
                }

            })
            Composite.add(engine.current.world,[paperPlane])
        }

        async function createPaperPlanesWithDelay(delay : number){
            createPaperPlane(getRandomInt(window.innerHeight))
            await sleep(2000)
            for (let i = 0; i < 100; i++) {
                await sleep(delay).then(()=>{
                    createPaperPlane(getRandomInt(window.innerHeight))
                })
            }
        }

        createPaperPlanesWithDelay(70)

        Composite.add(engine.current.world, [ ground,leftWall, rightWall]);

        Composite.add(engine.current.world, mouseConstraint);

        render.mouse = mouse;

        Render.run(render);

        var runner = Runner.create();

        Runner.run(runner, engine.current);


        return () => {
            // destroy Matter
            Render.stop(render)
            World.clear(engine.current.world,true)
            Engine.clear(engine.current)
            render.canvas.remove()
            render.textures = {}
        }

    },[])

    return (
        // @ts-ignore
        <div ref={scene} className={cls.canvas}>
            <h1 className={cls.text}>Hello world</h1>
        </div>
    );
};

export default PaperPlaneCanvas;
