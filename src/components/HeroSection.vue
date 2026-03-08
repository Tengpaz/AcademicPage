<script setup>
import { computed } from "vue";

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
});

const contactIcons = computed(() => {
  const email = props.profile.contact.email;
  const github = props.profile.contact.github;
  const scholar = props.profile.contact.scholar;

  return [
    {
      key: "email",
      href: `mailto:${email}`,
      label: "Email",
      svg: "M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Zm1.5.398v.102l7.5 4.688 7.5-4.688v-.102a.75.75 0 0 0-.75-.75H5.25a.75.75 0 0 0-.75.75Zm15 1.869-7.103 4.439a.75.75 0 0 1-.794 0L4.5 9.017v8.233c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V9.017Z"
    },
    {
      key: "github",
      href: github,
      label: "GitHub",
      svg: "M12 2.25a9.75 9.75 0 0 0-3.083 19.001c.487.09.664-.212.664-.469 0-.23-.008-.84-.013-1.648-2.7.587-3.27-1.3-3.27-1.3-.442-1.122-1.079-1.42-1.079-1.42-.882-.602.067-.59.067-.59.975.069 1.489 1.001 1.489 1.001.866 1.485 2.272 1.056 2.826.807.088-.627.339-1.056.617-1.299-2.156-.246-4.423-1.078-4.423-4.798 0-1.06.378-1.928 1-2.608-.1-.246-.433-1.236.095-2.576 0 0 .816-.261 2.673.996A9.3 9.3 0 0 1 12 7.012c.826.004 1.659.111 2.437.326 1.857-1.257 2.672-.996 2.672-.996.529 1.34.196 2.33.096 2.576.623.68.999 1.548.999 2.608 0 3.729-2.271 4.549-4.435 4.791.349.3.66.89.66 1.794 0 1.295-.012 2.339-.012 2.658 0 .259.176.563.67.468A9.751 9.751 0 0 0 12 2.25Z"
    },
    {
      key: "scholar",
      href: scholar,
      label: "Google Scholar",
      svg: "M12 3 1.5 8.25 12 13.5 22.5 8.25 12 3Zm-6.75 9.75V15c0 2.486 3.022 4.5 6.75 4.5s6.75-2.014 6.75-4.5v-2.25L12 16.125 5.25 12.75Z"
    }
  ].filter((item) => item.href && item.href !== "#");
});
</script>

<template>
  <section class="hero reveal" style="--delay: 0.15s">
    <img class="avatar" :src="props.profile.avatar" alt="Profile avatar" />
    <div class="hero-text">
      <p class="role">{{ props.profile.role }}</p>
      <h1>{{ props.profile.name }}</h1>
      <div class="hero-tags">
        <span v-for="tag in props.profile.tags" :key="tag">{{ tag }}</span>
      </div>
      <div class="hero-contact">
        <div class="contact-icons" v-if="contactIcons.length">
          <a
            v-for="item in contactIcons"
            :key="item.key"
            :href="item.href"
            class="contact-icon-link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="item.label"
            :title="item.label"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path :d="item.svg" />
            </svg>
          </a>
        </div>
        <ul class="hero-contact-meta">
          <li><span>Email:</span> <span>{{ props.profile.contact.email }}</span></li>
        </ul>
      </div>
    </div>
  </section>
</template>
