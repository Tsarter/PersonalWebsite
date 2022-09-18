<template>
    <div class="Container">
        <h1 ><span>Firstly</span><br>I call this dude <span>Tanel</span></h1>
        <div id="d2" class="img">

        </div>
        
        <div id="d1" class="wave-container">
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
    .Container span{
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