<script setup>
defineProps({
  content: {
    type: Object,
    required: true
  },
  language: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["change-language"]);
</script>

<template>
  <header class="topbar reveal" style="--delay: 0.05s">
    <div class="brand">{{ content.siteBrand }}</div>
    <nav class="nav-links">
      <a href="#about">{{ content.navAbout }}</a>
      <a href="#publications">{{ content.navPubs }}</a>
      <a href="#contact">{{ content.navContact }}</a>
    </nav>
    <div class="lang-switch" role="group" aria-label="Language switcher">
      <button class="lang-btn" :class="{ active: language === 'zh' }" type="button" @click="emit('change-language', 'zh')">
        中文
      </button>
      <button class="lang-btn" :class="{ active: language === 'en' }" type="button" @click="emit('change-language', 'en')">
        EN
      </button>
    </div>
  </header>
</template>
