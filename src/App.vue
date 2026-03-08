<script setup>
import { computed, onMounted, ref, watch } from "vue";
import AboutSection from "./components/AboutSection.vue";
import HeroSection from "./components/HeroSection.vue";
import PublicationsSection from "./components/PublicationsSection.vue";
import SiteFooter from "./components/SiteFooter.vue";
import SiteTopBar from "./components/SiteTopBar.vue";
import { siteContent } from "./config/siteContent";
import "./styles/site.css";

const language = ref("en");
const content = computed(() => siteContent[language.value]);

function setLang(nextLang) {
  language.value = nextLang;
}

watch(language, (lang) => {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  localStorage.setItem("site-lang", lang);
});

onMounted(() => {
  const stored = localStorage.getItem("site-lang");
  const browserLang = navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
  language.value = stored || browserLang;
});
</script>

<template>
  <div class="page-wrap">
    <div class="bg-orb orb-left"></div>
    <div class="bg-orb orb-right"></div>

    <SiteTopBar :content="content" :language="language" @change-language="setLang" />

    <main>
      <HeroSection :profile="content.profile" />
      <AboutSection :title="content.sectionTitles.about" :profile="content.profile" />
      <PublicationsSection
        :title="content.sectionTitles.publications"
        :profile="content.profile"
        :paper-link-label="content.paperLink"
      />
    </main>

    <SiteFooter :text="content.footerText" />
  </div>
</template>
