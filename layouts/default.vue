<template>
    <div class="font">
      
    <div class="bg-gray-200 h-screen  ">
          <nuxt v-if="!$slots.default" />
    <slot />
    </div>
    </div>



</template>

<script>
    export default {}
</script>
<style scoped>
.font{
font-family: Georgia, serif;
}
</style>
