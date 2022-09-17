<template>
    <div class="Container">
        <h1>That's me </h1>
        <div class="img">

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
        height: 100vh;
        background-color: var(--main-color)
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
        border-radius: 2rem;
        

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