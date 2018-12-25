<template>
  <VContainer fluid fill-height pa-0>
    <VLayout column>
      <VFlex class="accent">
        <VLayout row wrap>
          <VFlex xs12 md12 order-xs2 order-md1>
            <div class="text-xs-center">
              <VLayout
                class="pa-0 ma-0 asd"
                align-center
                justify-center
                fill-height
                fill-width
                style="z-index: 99; position:absolute; width:100%;bottom:6em"
              >
                <VFlex xs10 sm8 md4 lg3>
                  <img src="@/assets/penguins.png" alt="" width="100%" />
                  <div class="display-4 white--text">404</div>
                  <div class="headline white--text">The page you requested is not found!</div>
                </VFlex>
              </VLayout>
            </div>
          </VFlex>
        </VLayout>
      </VFlex>
    </VLayout>
  </VContainer>
</template>
<script>
export default {
  name: 'NotFound',
  data() {
    return {};
  }
};
</script>
