class Canvas  {
    constructor () {

        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseDown = 0;
    
        this.touchX = 0;
        this.touchY = 0;
    
        this.lastX = -1;
        this.lastY = -1;
    
        // init: function () {
        ctx = document.getElementById('signatureCanvas').getContext('2d');
    
        document.getElementById('signatureCanvas').addEventListener('mousedown', canvas.sketchpad_mouseDown, false);
        document.getElementById('signatureCanvas').addEventListener('mousemove', canvas.sketchpad_mouseMove, false);
        window.addEventListener('mouseup', canvas.sketchpad_mouseUp, false);
    
        document.getElementById('signatureCanvas').addEventListener('touchstart', canvas.sketchpad_touchStart, false);
        document.getElementById('signatureCanvas').addEventListener('touchend', canvas.sketchpad_touchEnd, false);
        document.getElementById('signatureCanvas').addEventListener('touchmove', canvas.sketchpad_touchMove, false);
    
        document.getElementById('eraseCanvas').addEventListener('click', function () {
            ctx.clearRect(0, 0, document.getElementById('signatureCanvas').width, document.getElementById('signatureCanvas').height);
        });
    }


    // },

    drawLine(ctx, x, y, size) {

        if (this.lastX == -1) {
            this.lastX = x;
            this.lastY = y;
        }

        ctx.strokeStyle = "#45505b";

        ctx.lineCap = "round";

        ctx.beginPath();

        ctx.moveTo(canvas.lastX, canvas.lastY);

        ctx.lineTo(x, y);

        ctx.lineWidth = size;
        ctx.stroke();

        ctx.closePath();

        this.lastX = x;
        this.lastY = y;

    }


    sketchpad_mouseDown() {
        this.mouseDown = 1;
        this.drawLine(ctx, this.mouseX, this.mouseY, 4);
    }

    sketchpad_mouseUp() {
        this.mouseDown = 0;

        this.lastX = -1;
        this.lastY = -1;
    }

    sketchpad_mouseMove(e) {

        this.getMousePos(e);

        if (this.mouseDown == 1) {
            this.drawLine(ctx, this.mouseX, this.mouseY, 4);
        }
    }

    getMousePos(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        } else if (e.layerX) {
            this.mouseX = e.layerX;
            this.mouseY = e.layerY;
        }
    }

    sketchpad_touchStart(e) {
        this.getTouchPos();

        this.drawLine(ctx, this.touchX, this.touchY, 4);

        event.preventDefault();
    }

    sketchpad_touchEnd() {
        this.lastX = -1;
        this.lastY = -1;
    }

    sketchpad_touchMove(){
        this.getTouchPos(e);

        this.drawLine(ctx, this.touchX, this.touchY, 4);

        event.preventDefault();
    }

    getTouchPos(e) {
        if (!e)
            var e = event;

        if (e.touches) {
            if (e.touches.length == 1) {
                var touch = e.touches[0];
                this.touchX = touch.pageX - touch.target.offsetLeft;
                this.touchY = touch.pageY - touch.target.offsetTop;
            }
        }
    }
}