<template>
  <v-container>
    <v-row>
      <v-col col="12">
        <NuxtLink to="/history">
          <v-card
            class="d-inline-block mx-auto pa-md-4 rounded-xl textright shadow-2xl"
          >
            <div class="region d-inline-block ml-md-n8">EUW</div>
            <v-container>
              <v-row align="center">
                <v-img
                  height="100"
                  width="100"
                  src="https://placekitten.com/200/200"
                  class="rounded-circle mr-md-4"
                ></v-img>
                <v-col cols="auto" class="text-center pl-0">
                  <v-row class="flex-column ma-0 fill-height" justify="center">
                    <v-col class="px-0">{{ ign }}</v-col>
                    <v-col class="px-0">{{ rank }} {{ elo }} LP</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
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
</style>