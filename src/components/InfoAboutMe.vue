<template>
    <div class="Container">
        <div class="text-wrapper">
            <h1>Specs</h1>
            <p>Days spent on this world: <span>7000</span> (~19 years)</p>
            <p>My favorite color: <span>click</span></p>
            <p>Languages: <spanG>est</spanG>, <spanG>eng</spanG>, <spanY>ger</spanY></p>
            <p>CPU: <span>~20w</span> brain</p>
        </div>
        <div class="img-wrapper">
            <div class="img-bike">
        </div>
        </div>
    </div>
</template>

<style scoped>
    .Container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        background-color: #fff;
        color:red;
        column-gap: 5rem;
        row-gap: 2rem;
        padding: 4rem;
    }
    .Container h1{
        color: var(--main-color)
    }
    .text-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: flex-start;
        row-gap: 2rem;
        font-size: min(1.5rem, 5vw);
    }
    .text-wrapper p{
        color: var(--text-color)
    }
    .text-wrapper span{
        color: var(--main-color);
        font-weight: bold;
    }
    .text-wrapper spanG{
        color: #34C931;
        font-weight: bold;
    }
    .text-wrapper spanY{
        color: #E5B50B;
        font-weight: bold;
    }
    .img-wrapper{
        align-self: flex-end;
    }
    .img-bike{
        height: 20rem;
        width: 30rem;
        border-radius: var(--image-border-radius);
        background-image: url("./images/robert-bike.webp");
        background-position: center;
        background-size: cover;
        
    }
    
</style>