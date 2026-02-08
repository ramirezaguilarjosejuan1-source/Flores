const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

// Handle interaction
function handleAction(x, y) {
    drawTulip(x, y);
}

canvas.addEventListener('mousedown', (e) => {
    handleAction(e.clientX, e.clientY);
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleAction(touch.clientX, touch.clientY);
}, { passive: false });

function drawTulip(x, y) {
    const stemHeight = canvas.height - y;

    // Draw Stem
    drawStem(x, y, stemHeight);

    // Draw Leaves
    const leafPos1 = canvas.height - stemHeight * (0.2 + Math.random() * 0.1);
    const leafPos2 = canvas.height - stemHeight * (0.4 + Math.random() * 0.1);
    drawLeaf(x, leafPos1, true, stemHeight);
    drawLeaf(x, leafPos2, false, stemHeight);

    // Draw Flower Head
    drawFlowerHead(x, y);
}

function drawStem(x, y, stemHeight) {
    const cp1x = x + (Math.random() - 0.5) * 120;
    const cp1y = canvas.height - stemHeight * 0.5;

    ctx.lineCap = 'round';

    // Multiple strokes for paint effect
    for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(45, 90, 39, ${0.3 + Math.random() * 0.5})`;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.beginPath();
        ctx.moveTo(x + (Math.random() - 0.5) * 6, canvas.height);

        ctx.quadraticCurveTo(
            cp1x + (Math.random() - 0.5) * 30,
            cp1y + (Math.random() - 0.5) * 30,
            x, y
        );
        ctx.stroke();
    }
}

function drawLeaf(x, y, left, stemHeight) {
    const leafWidth = 8 + Math.random() * 10;
    const leafHeight = 20 + Math.random() * 20;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(left ? -0.5 - Math.random() * 0.5 : 0.5 + Math.random() * 0.5);

    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.ellipse(0, -leafHeight/2, leafWidth/2, leafHeight/2, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#3a7d32';
    ctx.fill();

    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = '#2d5a27';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -leafHeight);
    ctx.stroke();

    ctx.restore();
}

function drawFlowerHead(x, y) {
    const colors = [
        {base: '#ff4d4d', light: '#ff8080', dark: '#cc0000'}, // Red
        {base: '#ff1a75', light: '#ff66a3', dark: '#b30047'}, // Pink
        {base: '#cc33ff', light: '#df80ff', dark: '#9900cc'}, // Purple
        {base: '#ff6600', light: '#ff944d', dark: '#cc5200'}, // Orange
        {base: '#ffcc00', light: '#ffdb4d', dark: '#cc9900'}, // Yellow
        {base: '#00ccff', light: '#80e5ff', dark: '#008fb3'}  // Blue
    ];
    const colorSet = colors[Math.floor(Math.random() * colors.length)];

    const size = 20 + Math.random() * 15;

    ctx.save();
    ctx.translate(x, y);

    // Painterly effect: multiple layers with slight offsets
    for (let i = 0; i < 3; i++) {
        ctx.globalAlpha = 0.6 + Math.random() * 0.4;
        const offset = (Math.random() - 0.5) * 4;

        // Side petals
        drawPetal(-size * 0.3 + offset, -size * 0.4, size, colorSet.base, -0.15);
        drawPetal(size * 0.3 + offset, -size * 0.4, size, colorSet.base, 0.15);
        // Center petal
        drawPetal(offset, -size * 0.5, size, colorSet.dark, 0);
    }

    ctx.globalAlpha = 1.0;
    ctx.restore();
}

function drawPetal(px, py, size, color, angle) {
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, size * 0.6);
    ctx.bezierCurveTo(-size * 0.6, size * 0.4, -size * 0.6, -size * 0.4, 0, -size * 0.6);
    ctx.bezierCurveTo(size * 0.6, -size * 0.4, size * 0.6, size * 0.4, 0, size * 0.6);

    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
}
