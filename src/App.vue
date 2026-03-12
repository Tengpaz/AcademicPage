<script setup>
import { computed, onMounted, ref, watch } from "vue";
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
  language.value = stored || "en";
});
</script>

<template>
  <div class="page-wrap">
    <div class="bg-orb orb-left"></div>
    <div class="bg-orb orb-right"></div>

    <SiteTopBar :content="content" :language="language" @change-language="setLang" />

    <RouterView :content="content" />

    <SiteFooter :text="content.footerText" />
  </div>
</template>
