var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Vertices = Matter.Vertices,
    Svg = Matter.Svg,
    Bodies = Matter.Bodies;

Common.setDecomp;

// create engine
var engine = Engine.create(),
    world = engine.world;


var heightAddressSection = document.getElementById('address').scrollHeight;

//media queries
var canvasHeight
(() => {
    if (window.matchMedia('(max-width: 390px)').matches) {
        canvasHeight = 1618
        return
    }
    if (window.matchMedia('(max-width: 640px)').matches) {
        canvasHeight = 1518
        return
    }
    if (window.matchMedia('(max-width: 770px)').matches) {
        canvasHeight = 1318
        return
    }
    if (window.matchMedia('(max-width: 830px)').matches) {
        canvasHeight = 1118
        return
    }
    if (window.matchMedia('(max-width: 1150px)').matches) {
        canvasHeight = 1640
        return
    }
    canvasHeight = 1600
})()

// create renderer
var render = Render.create({

    canvas: document.querySelector('#myCanvas'),
    engine: engine,
    options: {
        background: 'none',
        wireframes: false,
        width: window.innerWidth,
        height: canvasHeight
    }
});

Render.run(render);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// create runner
var runner = Runner.create();

// add bodies
Composite.add(world, [
    // walls: bottom, left, right, top
    Bodies.rectangle(0, canvasHeight, window.innerWidth * 2, 10, { isStatic: true, render: { opacity: 1, fillStyle: 'white' } }),
    Bodies.rectangle(0, 0, 10, heightAddressSection * 3, { isStatic: true, render: { opacity: 1, fillStyle: 'white' } }),
    Bodies.rectangle(window.innerWidth, 0, 10, heightAddressSection * 3, { isStatic: true, render: { opacity: 1, fillStyle: 'white' } }),
    Bodies.rectangle(0, 0, window.innerWidth * 2, 10, { isStatic: true, render: { opacity: 1, fillStyle: 'white' } }),
]);

// add bodies
if (typeof fetch !== 'undefined') {

    var select = function (root, selector) {
        return Array.prototype.slice.call(root.querySelectorAll(selector));
    };

    var loadSvg = function (url) {
        return fetch(url)
            .then(function (response) { return response.text(); })
            .then(function (raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
    };
    var isMobile = function() {
        return window.matchMedia('(max-width: 870px)').matches
    }

    //concave 1
    var concaveVector1 = (getInfo) => {
        if (isMobile() && getInfo === 'getFromPath') {
            return Vertices.fromPath('2.724 2.637, 2.724 133.805, 69.026 73.751, 135.327 133.805, 135.327 2.637, 2.724 2.637')
        } else if (!isMobile() && getInfo === 'getFromPath') {
            return Vertices.fromPath('204.025 0.528, 204.025 205.419, 108.639 205.419, 108.639 97.756, 0.976 97.756, 0.976 0.528, 204.025 0.528')
        }
        if (isMobile() && getInfo === 'getSvgPath') {
            return './img/svg/concave-vector2-mobile.svg'
        } else if (!isMobile() && getInfo === 'getSvgPath') {
            return './img/svg/concave-vector2.svg'
        }
    }
    Composite.add(world, Bodies.fromVertices(Math.abs(Math.floor(Math.random() * (window.innerWidth - 100))), 500, concaveVector1('getFromPath'), {
        render: {
            sprite: {
                texture: concaveVector1('getSvgPath'),
                xScale: 1,
                yScale: 1
            }
        }
    }, true));

    //concave 2
    var concaveVector2 = (getInfo) => {

        if (isMobile() && getInfo === 'getFromPath') {
            return Vertices.fromPath('135.327 135.804, 135.327 4.637, 69.025 64.690, 2.724 4.637, 2.724 135.804, 135.327 135.804')
        } else if (!isMobile() && getInfo === 'getFromPath') {
            return Vertices.fromPath('247.009 247.602, 247.009 6.965, 125.374 117.137, 3.738 6.965, 3.738 247.602, 247.009 247.602')
        }
        if (isMobile() && getInfo === 'getSvgPath') {
            return './img/svg/concave-vector1-mobile.svg'
        } else if (!isMobile() && getInfo === 'getSvgPath') {
            return './img/svg/concave-vector1.svg'
        }
    }

    Composite.add(world, Bodies.fromVertices(Math.abs(Math.floor(Math.random() * (window.innerWidth - 100))), 100, concaveVector2('getFromPath'), {
        render: {
            sprite: {
                texture: concaveVector2('getSvgPath'),
                xScale: 1,
                yScale: 1
            }
        }
    }, true));

    //direct vector 1
    function directVectorGenerator() {
        var color = ['#FFD800', '#FAA525', '#71C23E', '#01A6BC', '#FA547C', '#C5C6C7'][Math.floor(Math.random() * 6)]

        var directVector = () => {
            if (isMobile()) {
                return Vertices.fromPath('2.138 3.277, 2.138 66.370, 128.325 129.464, 128.325 66.370, 2.138 3.277')
            }
            return Vertices.fromPath('3.852 5.074, 3.852 120.824, 235.352 236.574, 235.352 120.824, 3.852 5.074')
        }
        return Bodies.fromVertices(Math.abs(Math.floor(Math.random() * (window.innerWidth - 100))), 10, directVector(), {
            render: {
                fillStyle: color,
                strokeStyle: 'black',
                lineWidth: isMobile() ? 6 : 10
            }
        });
    }
    for (var i = 0; i < 3; i++) {
        Composite.add(world, directVectorGenerator(), true);
    }

    //direct vector 2
    function directVectorGenerator2() {
        var color = ['#FFD800', '#FAA525', '#71C23E', '#01A6BC', '#FA547C', '#C5C6C7'][Math.floor(Math.random() * 6)]
        var directVector = () => {
            if (isMobile()) {
                return Vertices.fromPath('1.950 130.276, 128.137 130.276, 128.137 2.565, 1.950 2.565, 1.950 130.276')
            }
            return Vertices.fromPath('1.352 237.824, 232.852 237.824, 232.852 3.528, 1.352 3.528, 1.352 237.824')
        }
        return Bodies.fromVertices(Math.abs(Math.floor(Math.random() * (window.innerWidth - 100))), 10, directVector(), {
            render: {
                fillStyle: color,
                strokeStyle: 'black',
                lineWidth: isMobile() ? 6 : 10
            }
        });
    }
    for (var i = 0; i < 2; i++) {
        Composite.add(world, directVectorGenerator2(), true);
    }

    //direct vector 3
    function directVectorGenerator3() {
        var color = ['#FFD800', '#FAA525', '#71C23E', '#01A6BC', '#FA547C', '#C5C6C7'][Math.floor(Math.random() * 6)]
        var directVector = () => {
            if (isMobile()) {
                return Vertices.fromPath('2.325 65.659, 120.328 65.659, 120.328 2.565, 2.325 2.565, 2.325 65.659')
            }
            return Vertices.fromPath('3.352 119.271, 219.836 119.271, 219.836 3.521, 3.352 3.521, 3.352 119.271')
        }
        return  Bodies.fromVertices(Math.abs(Math.floor(Math.random() * (window.innerWidth - 100))), 10, directVector(), {
            render: {
                fillStyle: color,
                strokeStyle: 'black',
                lineWidth: isMobile() ? 6 : 10
            }
        });
    }
    Composite.add(world, directVectorGenerator3(), true);

    //direct vector 4
    function directVectorGenerator4() {
        var color = ['#FFD800', '#FAA525', '#71C23E', '#01A6BC', '#FA547C', '#C5C6C7'][Math.floor(Math.random() * 6)]
        var directVector = () => {
            if (isMobile()) {
                return Vertices.fromPath('2.521 55.155, 54.277 55.155, 54.277 2.775, 2.521 2.775, 2.521 55.155')
            }
            return Vertices.fromPath('3.738 99.572, 98.687 99.572, 98.687 3.476, 3.738 3.476, 3.738 99.572')
        }
        return  Bodies.fromVertices(Math.abs(Math.floor(Math.random() * (window.innerWidth - 100))), 10, directVector(), {
            render: {
                fillStyle: color,
                strokeStyle: 'black',
                lineWidth: isMobile() ? 6 : 10
            }
        });
    }
    Composite.add(world, directVectorGenerator4(), true);

    // circles
    function circleGenerator() {
        var circleSize = () => window.matchMedia('(max-width: 770px)').matches ? 26 : 36
        var color = Common.choose(['#FFD800', '#FAA525', '#71C23E', '#01A6BC', '#FA547C', '#C5C6C7']);
        var circle = Bodies.circle(Math.abs(Math.floor(Math.random() * (window.innerWidth - 100))), 10, circleSize(), {
            render: {
                fillStyle: color,
                strokeStyle: 'black',
                lineWidth: isMobile() ? 6 : 10
            }
        });
        return circle
    }
    for (var i = 0; i < 9; i++) {
        Composite.add(world, circleGenerator(), true);
    }

    ([
        (() => isMobile() ? './img/svg/vector1-mobile.svg' : './img/svg/vector1.svg')(),
        (() => isMobile() ? './img/svg/vector2-mobile.svg' : './img/svg/vector2.svg')(),
        (() => isMobile() ? './img/svg/vector3-mobile.svg' : './img/svg/vector3.svg')(),
        (() => isMobile() ? './img/svg/vector4-mobile.svg' : './img/svg/vector4.svg')(),
        (() => isMobile() ? './img/svg/vector5-mobile.svg' : './img/svg/vector5.svg')(),
        (() => isMobile() ? './img/svg/vector6-mobile.svg' : './img/svg/vector6.svg')(),

    ]).forEach(function (path, i) {
        loadSvg(path).then(function (root) {
            var vertexSets = select(root, 'path').map(function (path) { return Vertices.scale(Svg.pathToVertices(path, 30), 1, 1); });
            var color = Common.choose(['#FFD800', '#FAA525', '#71C23E', '#01A6BC', '#FA547C', '#C5C6C7']);
            Composite.add(world, Bodies.fromVertices(Math.abs(Math.floor(Math.random() * (window.innerWidth - 100))), 200, vertexSets, {
                render: {
                    fillStyle: color,
                    strokeStyle: 'black',
                    lineWidth: isMobile() ? 6 : 10
                }
            }, true));
        });
    });


} else {
    Common.warn('Fetch is not available. Could not load SVG.');
}

Matter.Runner.run(engine)
Render.run(render);



