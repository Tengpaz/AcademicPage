<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  profile: {
    type: Object,
    required: true
  },
  paperLinkLabel: {
    type: String,
    required: true
  }
});

</script>

<template>
  <section id="publications" class="card reveal" style="--delay: 0.35s">
    <div class="section-head">
      <h2>{{ props.title }}</h2>
      <span class="section-note">{{ props.profile.publicationsUpdated }}</span>
    </div>
    <ol class="publication-list">
      <li v-for="item in props.profile.publications" :key="item.title">
        <h3>{{ item.title }}</h3>
        <p v-if="item.hideAuthors !== true"><strong>{{ item.authors }}</strong></p>
        <p>{{ item.venue }}</p>
        <p v-if="item.abstract">{{ item.abstract }}</p>
        <a :href="item.link">{{ props.paperLinkLabel }}</a>
      </li>
    </ol>
  </section>
</template>
