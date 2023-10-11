const slide_v = document.getElementById("velocity");
const slide_a = document.getElementById("acceleration");
const slide_t = document.getElementById("time");
const slide_s = document.getElementById("position");
const carElement = document.querySelector('#rideCar');

let graph_calculation = document.getElementById("graph-calculation");
let equation = document.getElementById("equation");

function getRandomElement(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function print_equation(s=slide_s.value, v=slide_v.value, t=slide_t.value, a=slide_a.value) {
    return `s = {${s}}<sub></sub> + {${v}}{${t}} + 1/2x{${a}}{${t}}<sup>2</sup>`;
}

let checkbox = document.querySelector('.switch input[type="checkbox"]');
let check = false;

function print_graphLine(s=slide_s.value, v=slide_v.value, t=slide_t.value, a=slide_a.value) {
    if (check) {
        return `s = {${s}} + {${v}}x{${t}} + 1/2x{${a}}x{${t}}<sup>2</sup>`;
    } else {
        return `v = {${v}} + {${a}}t<sup></sup>`;
    }
}
// switch button changed
// B96366
checkbox.addEventListener('change', function() {
    check = !check;
    if (check) {
        graph_calculation.innerHTML = print_graphLine();
    } else {
        graph_calculation.innerHTML = print_graphLine();
    }
});

// move car when slide
let initial_pos = -300; // car and Ajarn initial position
slide_s.addEventListener("input", function() { 
    graph_calculation.innerHTML = print_graphLine();
    equation.innerHTML = print_equation();
    carElement.style.left = (initial_pos + parseInt(slide_s.value)) + "px";
});

// change text when slide
let value_list = [slide_s, slide_v, slide_a,slide_t];
for (let i = 1; i < 4; i++) {
    value_list[i].addEventListener("input", function() {
        graph_calculation.innerHTML = print_graphLine();
        equation.innerHTML = print_equation();
    });
}

let minus_list = document.querySelectorAll('.minus');
let plus_list = document.querySelectorAll('.plus');
for (let i=0; i< minus_list.length; i++) {
    minus_list[i].addEventListener('click', function() {
        if (value_list[i].value > 0) {
            value_list[i].value = parseInt(value_list[i].value) - 1; 
            graph_calculation.innerHTML = print_graphLine();
            equation.innerHTML = print_equation();
        }
    });
    plus_list[i].addEventListener('click', function() {
        value_list[i].value = parseInt(value_list[i].value) + 1;
        graph_calculation.innerHTML = print_graphLine();
        equation.innerHTML = print_equation();
    });
}

//* change player
for (let i=0; i<8; i++) {
    document.querySelector("#AjPic").querySelectorAll("button")[i].addEventListener('click', function() {
        let path_name = "images/Aj/Aj" + document.querySelector("#AjPic").querySelectorAll("img")[i].attributes.alt.value + ".svg";
        document.querySelector("#rideCar img").attributes.src.value = path_name;
    });
}

// set car move
document.querySelector('#move-button').addEventListener('click', function() {
    let t = slide_t.value / 10;
    let diff_s = slide_v.value*t + 0.5*slide_a.value*t*t;
    carElement.style.left = (initial_pos + diff_s + parseInt(slide_s.value)) + "px";
    this.style.transform = 'rotate(360deg)';
    this.style.transition = 'transform 1s';
    setTimeout(() => {
        this.style.transform = "none";
        this.style.transition = "none";
    }, 1000)
});

// reset button
document.querySelector('#reset').addEventListener('click', function() {
    carElement.style.left = initial_pos + "px";
    slide_s.value = 0;
    slide_v.value = 0;
    slide_a.value = 0;
    slide_t.value = 0;
    graph_calculation.innerHTML = `v = {u} + {a}t<sup></sup>`;
});

// change Car
car_list = ["Car1", "Car2", "Car3", "Car4", "Car5", "Car6", "Car7", "Car8", "Car9", "Car10", "Car11", "Car12",
            "Army1", "Army2", "Army3", "Army4", "Army5", "Army6", 
            "formula1", "formula2","formula3", "formula4","formula5", "formula6","formula7", "formula8"];

document.querySelector('#changeCar').addEventListener('click', function() {
    random_car = getRandomElement(car_list);
    document.querySelector('#car').src = "images/carEDIT/" + random_car + "@4x" + ".png";
}); 

// set canvas for creating a graph
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3; 

    let x_pos = 20;
    let y_pos = 220;
    let x_end = 600; 
    let gap_y = 90;
    let gap_x = 120;
    const coefficient = 6;

    function drawGraph() {
        const time = slide_t.value;
        const velocity = slide_v.value;
        const acceleration = slide_a.value;
        const distance = slide_s.value;
        const a = acceleration / 1000;
        const b = velocity / 200;
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 3;
        ctx.strokeStyle ='gray'
        ctx.beginPath();
        // create the x axis
        ctx.moveTo(0,y_pos);
        ctx.lineTo(x_end,y_pos);
        ctx.stroke();
        // create the y axis
        ctx.moveTo(x_pos,20);
        ctx.lineTo(x_pos,y_pos + 20);
        ctx.stroke();



        // ctx.strokeText('t', x_end + 5, y_pos);
        ctx.strokeText('x', x_pos, 15);

        if (check) {
            // Draw the curve based on the physics parameters
            ctx.beginPath();
            ctx.arc(x_pos, y_pos-distance, 7, 0, Math.PI * 2, true);
            ctx.moveTo(x_pos,y_pos - distance);
            // Use a quadratic function for the curve
            for (let t = 0; t <= time*coefficient; t++) {
                const x = x_pos + t;
                const y = y_pos - distance - (0.5 * a * t * t + b * t);
                ctx.lineTo(x, y);
            }
            ctx.strokeStyle = 'gray';
            ctx.lineWidth = 3;
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(x_pos, y_pos - velocity, 7, 0, Math.PI * 2, true);
            ctx.moveTo(x_pos,y_pos - velocity);
            for (let t=0; t <= time*coefficient; t++) {
                const x = x_pos + t;
                const y = y_pos - velocity - (b + acceleration * t);
                ctx.lineTo(x, y);
            }
            ctx.strokeStyle = 'gray';
            ctx.lineWidth = 3;
            ctx.stroke();
        }


        // Display the physics parameters on the canvas
        ctx.font = "15px 'Mitr', sans-serif";
        ctx.fillStyle = 'black';
        // ctx.fillText(`current Time:  `, x_end-gap_x, y_pos - 20 - gap_y);
        ctx.fillText(`Time: ${time}`, x_end-gap_x, y_pos - gap_y);
        ctx.fillText(`Velocity: ${velocity}`, x_end-gap_x, y_pos+20 - gap_y);
        ctx.fillText(`Acceleration: ${acceleration}`, x_end-gap_x, y_pos+40 - gap_y);
    } 

    // Attach event listeners to the sliders
    slide_t.addEventListener('input', drawGraph);
    slide_v.addEventListener('input', drawGraph);
    slide_a.addEventListener('input', drawGraph);
    slide_s.addEventListener('input', drawGraph);

    // Initial draw
    drawGraph();

    document.querySelector('#move-button').addEventListener('click', () => {
        const time = slide_t.value;
        const velocity = slide_v.value;
        const acceleration = slide_a.value;
        const distance = slide_s.value;
        const a = acceleration / 1000;
        const b = velocity / 200;
        t = 0;
        let count = 0;
        ctx.font = "15px 'Mitr', sans-serif";
        if (check) {
            ctx.beginPath();
            ctx.moveTo(x_pos,y_pos - distance);
            const drawInterval = setInterval(() => {  
                if (t > time*coefficient) {
                    clearInterval(drawInterval);
                    return;
                }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawGraph();
                ctx.fillText(`current Time: ${count}`, x_end-gap_x, y_pos - 20 - gap_y);
                ctx.beginPath();
                const x = x_pos + t;
                const y = y_pos - distance - (0.5 * a * t * t + b * t);
                ctx.arc(x, y, 7, 0, Math.PI * 2, true);
                ctx.stroke();
                t+=coefficient;
                count++;
            }, 20);
        } else {
            ctx.beginPath();
            ctx.moveTo(x_pos,y_pos - velocity);
            const drawInterval = setInterval(() => {  
                if (t > time*coefficient) {
                    clearInterval(drawInterval);
                    return;
                }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawGraph();
                ctx.fillText(`current Time: ${count}`, x_end-gap_x, y_pos - 20 - gap_y);
                ctx.beginPath();
                const x = x_pos + t;
                const y = y_pos - velocity - (b + acceleration * t);
                ctx.arc(x, y, 7, 0, Math.PI * 2, true);
                ctx.stroke();
                t+=coefficient;
                count++;
            }, 20);
        }
    });

    checkbox.addEventListener('change', function() {
        drawGraph();
    });
});