<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  projects: {
    type: Array,
    required: true
  },
  projectLinkLabel: {
    type: String,
    required: true
  }
});
</script>

<template>
  <section id="projects" class="card reveal" style="--delay: 0.45s">
    <h2>{{ title }}</h2>
    <div class="project-grid">
      <article v-for="project in projects" :key="project.title" class="project-item">
        <h3>{{ project.title }}</h3>
        <p>{{ project.desc }}</p>
        <a :href="project.link">{{ projectLinkLabel }}</a>
      </article>
    </div>
  </section>
</template>
