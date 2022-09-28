<script setup>
import { ref } from 'vue'
import SplashStart from '../components/splashStart.vue';
import LandingImage from '../components/LandingCaroussel.vue';
import PitchureOfMe from '../components/PitchureOfMe.vue';
import InfoAboutMe from '../components/InfoAboutMe.vue';
import ProjectsSlider from '../components/projectsSlider.vue'
var hideLaunch = ref(false)
</script>


<template>
    
    <SplashStart  @hide-launch="hideLaunch = true"></SplashStart>
    <div class="content" v-show="hideLaunch">
        
        <LandingImage  >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#605cf4" fill-opacity="1" d="M0,64L48,58.7C96,53,192,43,288,42.7C384,43,480,53,576,69.3C672,85,768,107,864,122.7C960,139,1056,149,1152,133.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>    
        </LandingImage>
        
        <PitchureOfMe >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,32L80,64C160,96,320,160,480,176C640,192,800,160,960,165.3C1120,171,1280,213,1360,234.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        </PitchureOfMe>
        <InfoAboutMe/>
        <!-- <projectsSlider23d  v-show="hideLaunch">h</projectsSlider23d> -->
        <ProjectsSlider></ProjectsSlider>
        
    </div>
    
        <div id="launchCardsScreen" class="Screen">
    </div>
</template>

<style scoped>
    .content{
        background-color: var(--main-color);
    }
</style>






