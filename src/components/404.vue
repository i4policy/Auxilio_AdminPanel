<template>
  <v-container fluid fill-height pa-0>
    <v-layout column>
      <v-flex class="accent">
        <v-layout row wrap>
          <v-flex xs12 md12 order-xs2 order-md1>
            <div class="text-xs-center">
              <v-layout
                class="pa-0 ma-0 asd"
                align-center
                justify-center
                fill-height
                fill-width
                style="z-index: 99; position:absolute; width:100%;bottom:6em"
              >
                <v-flex xs10 sm8 md4 lg3>
                <img src="@/assets/penguins.png" alt="" width="100%">
                 <div class="display-4 white--text">
                     404
                 </div>
                 <div class="headline white--text">
                     The page you requested is not found!
                 </div>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'NotFound',
  data() {
    return {};
  },
};
</script>
