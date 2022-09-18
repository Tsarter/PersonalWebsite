<script setup>
</script>
<template>
    <div class="Container">
        <h1><span class="y">Firstly.</span><br>I call <span class="y" id="d1">this</span> dude <span class="y">Tanel</span></h1>
        <div id="d2" class="img">

        </div>
        
        <div class="wave-container">
            <slot/>
        </div>
    </div>
    
</template>

<style scoped>
    
    .Container{
        display: flex;
        position: relative;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        column-gap: 6rem;
        padding: 1rem;
        padding-top: 10rem;
        padding-bottom: 15rem;
        background-color: var(--main-color);
    }
    .Container span.y{
        color:#ffc401;
    }
    h1{
        color:white;
        font-size: 4rem;
    }
    .img{
        width: 25rem;
        height: 25rem;
        max-height: 40rem;
        background-image: url("./images/IMG_1164H.jpg");
        background-position: 10% 10%;
        background-size: cover;
        border-radius: var(--image-border-radius);
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.322);

    }
    .wave-container {
      background: rgba(255, 255, 255, 0);
      text-align: center;
      overflow: hidden;
      position: absolute;
      width: 100%;
      bottom: -1.5rem;
    }
</style>

<script>
    export default {
      name: "pitchure-of-me",
      mounted() {
        var func = this.drawLine
        func()
        var width_before = window.innerWidth;
        window.addEventListener('resize', function(){
            console.log(Math.abs(width_before - window.innerWidth))
            if (Math.abs(width_before - window.innerWidth) > 50){
               func()
               width_before = window.innerWidth
            }

        });
      },
      methods:{
        drawLine(){
            //To see if dom element is visible
            //https://stackoverflow.com/questions/1462138/event-listener-for-when-element-becomes-visible
            function onVisible(element, callback) {
                new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                    if(entry.intersectionRatio > 0) {
                        callback(element);
                        observer.disconnect();
                    }
                    });
                }).observe(element);
            }
            
            onVisible(document.querySelector("#d1"), () => {
                //Draw line between two dom elements
                //https://github.com/anseki/leader-line

                function removeElementsByClass(className){
                    const elements = document.getElementsByClassName(className);
                    while(elements.length > 0){
                        elements[0].parentNode.removeChild(elements[0]);
                    }
                }
                removeElementsByClass("leader-line")
                
                var line1 = new LeaderLine(
                        document.getElementById('d1'),
                        LeaderLine.pointAnchor({element: document.getElementById('d2'), x: 250, y: 150}),
                        {color: '#ffc401', size: 8},
                        {dash: {animation: true}}
                    )
                var line2 = new LeaderLine(
                    document.getElementById('d1'),
                    document.getElementById('d2'),
                    {color: '#ffc401', size: 8},
                    {dash: {animation: true}}
                )
                var smallerScreenWidth = window.matchMedia("(max-width: 1160px)");
                var biggerScreenWidth = window.matchMedia("(min-width: 1160px)");
                if (smallerScreenWidth.matches) {
                    line2.remove()
                    line1.setOptions({
                        startSocketGravity: [300, 10],
                        endSocketGravity: [250, -10],
                        startSocket: 'right', 
                        endSocket: 'bottom'
                    });
                    line1.show()
                    console.log("smaller screen")
                }
                if (biggerScreenWidth.matches) {
                    line1.remove()
                    line2.setOptions({
                        startSocketGravity: [-100, 272],
                        endSocketGravity: [-192, 152]
                    });
                    line2.show()
                    console.log("bigger screen")
                }
                
                console.log("line is visible")
            });    
        },
      }
    }
    </script>