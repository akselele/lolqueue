<template>
  <v-container>
    <v-row>
      <v-col col="12">
        <v-card class="d-inline-block mx-auto pa-md-4 rounded-xl kak">
          <div class="region d-inline-block ml-md-n8">EUW</div>
          <v-container>
            <v-row align="center">
              <v-img
                height="100"
                width="100"
                src="https://placekitten.com/200/200"
                class="rounded-circle mr-md-4"
              ></v-img>
              {{ matches }}
              <v-col cols="auto" class="text-center pl-0">
                <v-row class="flex-column ma-0 fill-height" justify="center">
                  <v-col class="px-0"> Yuumi LFT </v-col>
                  <v-col class="px-0"> Challenger --- 2000 LP</v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>

export default {
  props: {
    matches: {
      type: Array,
      required: true,
    },
  },
  created() {
    console.log(this.matches);
  },
  // methods: {
  //   getInfo() {
  //     return getMatchHistory(this)
  //   },
  // },
}
</script>


<style scoped>
.region {
  position: absolute;
  font-size: 0.75em;
}

.kak {
  text-align: right;
}
</style>