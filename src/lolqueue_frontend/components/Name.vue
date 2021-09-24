<template>
  <v-container>
        <NuxtLink :to="`/history/${ign}`">
  <v-card 
    :loading="loading"
    class="mx-auto my-12"
    max-width="300"
  >

<h4 class="ribbon">EUW</h4>
    <img style="width: 100%" src="../assets/musht.png">

    <v-card-title style="text-align: center" >{{ign}}</v-card-title>

    <v-card-text>

      <div class="my-4 text-subtitle-1">
        {{rank}}
      </div>
    </v-card-text>

    
  </v-card>
        </NuxtLink>
  </v-container>
</template>
  
<script>
export default {
  props: {
    ign: {
      type: String,
      required: true,
      default: '',
    },
    rank: {
      type: String,
      required: true,
      default: '',
    },
    elo: {
      type: Number,
      required: true,
      default: 0,
    }
  },
}
</script>


<style scoped>
.region {
  position: absolute;
  font-size: 0.75em;
}

.textright {
  text-align: right;
}

.ribbon {
  text-align: center;
  margin: 0;
  padding: 0.2rem 0.2rem;
  background: rebeccapurple;
  color:white;
  position: relative;
}
</style>