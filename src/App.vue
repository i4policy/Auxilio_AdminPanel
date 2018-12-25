<template>
  <VApp>
    <Notifications :overlap="true" />
    <RouterView></RouterView>
  </VApp>
</template>

<script>
export default {
  name: 'App'
};
</script>
