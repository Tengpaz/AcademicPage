<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <section id="news" class="card reveal" style="--delay: 0.3s">
    <h2>{{ title }}</h2>
    <ul class="news-list">
      <li v-for="item in items" :key="`${item.date}-${item.text}`" class="news-item">
        <span class="news-date">{{ item.date }}</span>
        <p>{{ item.text }}</p>
      </li>
    </ul>
  </section>
</template>