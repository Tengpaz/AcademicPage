<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
});
</script>

<template>
  <footer class="footer reveal" style="--delay: 0.65s">
    <p>{{ text }}</p>
  </footer>
</template>
