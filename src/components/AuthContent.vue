<template>
  <div>
    <Navbar />
    <Sidebar />
    <VContent>
      <VContainer fluid> <RouterView /> </VContainer>
    </VContent>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'AppContent',
  components: {
    Navbar,
    Sidebar
  }
};
</script>
