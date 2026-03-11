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

function resolvePreviewSrc(src) {
  if (!src) {
    return "";
  }

  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) {
    return src;
  }

  if (src.startsWith("/")) {
    return `${import.meta.env.BASE_URL}${src.slice(1)}`;
  }

  return src;
}

</script>

<template>
  <section id="publications" class="card reveal" style="--delay: 0.35s">
    <div class="section-head">
      <h2>{{ props.title }}</h2>
      <span class="section-note">{{ props.profile.publicationsUpdated }}</span>
    </div>
    <ol class="publication-list">
      <li
        v-for="item in props.profile.publications"
        :key="item.title"
        class="publication-item"
        :class="{ 'has-preview': !!item.previewImage }"
      >
        <div v-if="item.previewImage" class="paper-preview" aria-hidden="true">
          <img :src="resolvePreviewSrc(item.previewImage)" :alt="`${item.title} preview`" loading="lazy" />
        </div>
        <div class="paper-content">
          <h3>{{ item.title }}</h3>
          <p v-if="item.hideAuthors !== true"><strong>{{ item.authors }}</strong></p>
          <p>{{ item.venue }}</p>
          <p v-if="item.abstract" class="paper-abstract">{{ item.abstract }}</p>
          <a :href="item.link">{{ props.paperLinkLabel }}</a>
        </div>
      </li>
    </ol>
  </section>
</template>
