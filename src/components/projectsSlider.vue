


<template>
    <div class="CarouselContainer">
        <h2>Websites</h2>
        <ul class="Carousellist">
            <li class="Carouselhide" id="0">1</li>
            <li class="Carouselprev" id="1">2</li>
            <li class="Carouselact" id="2">3</li>
            <li class="Carouselnext" id="3">4</li>
            <li class="Carouselnext Carouselnew-next" id="4">5</li>
        </ul>
        <div class="Carouselswipe"></div>
    </div>
</template>

<style>


    .CarouselContainer{
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
        align-content: center;
        /* padding: 1rem; */
        padding-top: 10rem;
        padding-bottom: 15rem;
        height: 50vh;
        row-gap: 4rem;
        width: 100%;
        background-color: var(--main-color);
    }
    * {
        padding: 0;
        margin: 0;
    }
    .Carousellist {
        height: 100%;
        width: 100vw;
        display: flex;
        justify-content: center;
/*       height: 200px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%) */
    }
    
    .Carousellist li {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style-type: none;
      width:20rem;
      height: 30rem;
      opacity: .25;
      position: absolute;
      /* left: 50%; */
      /* margin-left: -100px; */
      border-radius: 2rem;
      background: #9C89B8;
      transition: transform 1s, opacity 1s;
    }
    
    .Carousellist .Carouselact {
      opacity: 1;
    }
    
    .Carousellist .Carouselprev,
    .Carousellist .Carouselnext {
      cursor: pointer;
    }
    
    .Carousellist .Carouselprev {
      transform: translateX(-220px) scale(.85);
    }
    
    .Carousellist .Carouselnext {
      transform: translateX(220px) scale(.85);
    }
    
    .Carousellist .Carouselhide {
      transform: translateX(-420px) scale(.85);
    }
    
    .Carousellist .Carouselnew-next {
      transform: translateX(420px) scale(.85);
    }
    
    .Carousellist .Carouselhide,
    .Carousellist .Carouselnew-next {
      opacity: 0;
      transition: opacity .5s, transform .5s;
    }
    
    .Carouselswipe {
      width: 270px;
      height: 200px;
      position: absolute;
      background-color: green;
      border-radius: 2px;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      opacity: 0;
    }
</style>
<script>
 export default {
    mounted(){
        this.slider()
    },
    methods:{
        slider(){
            var Cards = {}
            var CardIdToPushRight = 0
            var CardIdToPushLeft = 0
            const $ = selector => {
            return document.querySelector(selector);
            };

            function next() {
                if ($(".Carouselhide")) {
                    CardIdToPushRight = parseInt($(".Carouselhide").id)
                    /* Add card to memory/dict, then remove it */
                    Cards[$(".Carouselhide").id] = $(".Carouselhide")
                    $(".Carouselhide").remove();             
                }

                /* Step */

                if ($(".Carouselprev")) {
                    $(".Carouselprev").classList.add("Carouselhide");
                    $(".Carouselprev").classList.remove("Carouselprev");
                }

                $(".Carouselact").classList.add("Carouselprev");
                $(".Carouselact").classList.remove("Carouselact");

                $(".Carouselnext").classList.add("Carouselact");
                $(".Carouselnext").classList.remove("Carouselnext");

                /* New Next */
                console.log($(".Carouselnew-next"))
                $(".Carouselnew-next").classList.remove("Carouselnew-next");

                /* Append card to list */
                Cards[CardIdToPushRight].classList.remove("Carouselhide")
                Cards[CardIdToPushRight].classList.add("Carouselnext","Carouselnew-next");
                $(".Carousellist").appendChild(Cards[CardIdToPushRight]);

            }

            function prev() {
            CardIdToPushLeft = parseInt($(".Carouselnew-next").id)
            /* Add card to memory/dict, then remove it */
            Cards[$(".Carouselnew-next").id] = $(".Carouselnew-next")
            $(".Carouselnew-next").remove();
                
            /* Step */

            $(".Carouselnext").classList.add("Carouselnew-next");

            $(".Carouselact").classList.add("Carouselnext");
            $(".Carouselact").classList.remove("Carouselact");

            $(".Carouselprev").classList.add("Carouselact");
            $(".Carouselprev").classList.remove("Carouselprev");

            /* New Prev */

            $(".Carouselhide").classList.add("Carouselprev");
            $(".Carouselhide").classList.remove("Carouselhide");

            const addedEl = Cards[CardIdToPushLeft]
            addedEl.classList.remove("Carouselnew-next")
            addedEl.classList.remove("Carouselnext")
            $(".Carousellist").insertBefore(addedEl, $(".Carousellist").firstChild);
            addedEl.classList.add("Carouselhide");
            }

            var slide = element => {
            /* Next slide */
            
                if (element.classList.contains('Carouselnext')) {
                    next();
                    
                /* Previous slide */
                    
                } else if (element.classList.contains('Carouselprev')) {
                    prev();
                }
            }

            const slider = $(".Carousellist"),
                swipe = new Hammer($(".Carouselswipe"));

            slider.onclick = event => {
            slide(event.target);
            }

            swipe.on("swipeleft", (ev) => {
            next();
            });

            swipe.on("swiperight", (ev) => {
            prev();
            });
        }
    }
 }
</script>

