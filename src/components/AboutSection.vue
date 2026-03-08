<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  profile: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section id="about" class="card reveal" style="--delay: 0.25s">
    <h2>{{ title }}</h2>
    <p v-for="paragraph in profile.about" :key="paragraph">{{ paragraph }}</p>
    <p class="resume-line">{{ profile.resume.education }}</p>
    <p class="resume-line">{{ profile.resume.interests }}</p>
  </section>
</template>
