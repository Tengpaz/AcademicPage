<script setup>
import AboutSection from "../components/AboutSection.vue";
import HeroSection from "../components/HeroSection.vue";
import NewsSection from "../components/NewsSection.vue";
import PublicationsSection from "../components/PublicationsSection.vue";

defineProps({
  content: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <main>
    <HeroSection :profile="content.profile" />
    <AboutSection :title="content.sectionTitles.about" :profile="content.profile" />
    <NewsSection :title="content.sectionTitles.news" :items="content.profile.news" />
    <PublicationsSection
      :title="content.sectionTitles.publications"
      :profile="content.profile"
      :paper-link-label="content.paperLink"
    />
  </main>
</template>
