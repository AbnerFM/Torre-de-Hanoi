let towers = [[5, 4, 3, 2, 1], [], []];
let positions = ['p1', 'p2', 'p3', 'p4', 'p5', 'p0', 't1', 't2', 't3'];
let movements = [];
let movementCount = 0;  // Variável para armazenar o número de movimentos

function render() {
    towers.forEach((tower, towerid) => {
        tower.forEach((disk, position) => {
            let d = document.querySelector('.d' + disk);
            positions.forEach(position => {
                d.classList.remove(position);
            });
            d.classList.add('t' + (towerid + 1));
            d.classList.add('p' + (position + 1));
        });
    });
}

function move(fromtower, totower) {
    if (!towers[fromtower].length) return;

    let disk = towers[fromtower][towers[fromtower].length - 1];

    if (towers[totower].length && disk > towers[totower][towers[totower].length - 1]) {
        return towers[fromtower].push(disk);
    }

    let d = document.querySelector('.d' + disk);
    d.classList.add('p0');
    towers[totower].push(towers[fromtower].pop());
    setTimeout(() => {
        render();
        updateMovementCount();  // Atualiza o contador após renderizar
    }, 400);
}

function clicktower(n) {
    if (movements.length && movements[0].length == 1) {
        movements[0].push(n);
    } else {
        movements.unshift([n]);
    }
}

function updateMovementCount() {
    movementCount++;
    document.getElementById('movementCount').textContent = 'Movimentos: ' + movementCount;
}

setInterval(() => {
    if (movements.length && movements[movements.length - 1].length == 2) {
        let m = movements.pop();
        move(m[0], m[1]);
    }
}, 600);


function resetGame() {
    towers = [[5, 4, 3, 2, 1], [], []];
    movements = [];
    movementCount = 0;
    render();
    document.getElementById('movementCount').textContent = 'Movimentos: ' + movementCount;
}

function simulateGame(size,fromtower,totower){
    if(size==1){
        return movements.unshift([fromtower,totower])
    }
    let other = 3 - fromtower - totower
    simulateGame(size-1,fromtower,other)
    movements.unshift([fromtower,totower])
    simulateGame(size-1,other,totower)
}
setTimeout(()=> {simulateGame(5,0,1)},2000)


render();
