export const siteContentEn = {
  siteBrand: "Academic Homepage",
  navItems: [
    { label: "About", to: { path: "/", hash: "#about" } },
    { label: "News", to: { path: "/", hash: "#news" } },
    { label: "Selected Paper", to: { path: "/", hash: "#publications" } },
    { label: "Research Journey", to: "/journey" }
  ],
  paperLink: "Paper",
  sectionTitles: {
    about: "About Me",
    news: "News",
    publications: "Selected Paper",
    journey: "Research Journey"
  },
  journeyIntro: "Written for my future self, and for fellow travelers.",
  journeyEntries: [
    {
      date: "Mar 2026",
      title: "Catching Up on Embodied AI Fundamentals",
      tags: ["Embodied AI", "Research Basics"],
      content: "Reference learning material:\nhttps://scalelab-sjtu.github.io/embodied_guide.html"
    },
    {
      date: "Mar 2026",
      title: "First Paper Submitted to ECCV 2026",
      tags: ["Paper Submission", "Video Generation"],
      content: "During the project polishing phase, learned various experimental workflows and paper-writing techniques."
    },
    {
      date: "Jun 2025",
      title: "Looking for a Research Internship",
      tags: ["Research Start"],
      content: "It was hard to significantly improve my GPA at that point, but my research experience was still very limited. So I started looking for research opportunities — grateful to the advisor who took a chance on me."
    }
  ],
  profile: {
    role: "Software Engineering Undergraduate at Beihang University",
    name: "Yuzhen Wang",
    tags: ["Computer Vision", "World Model", "Video Generation"],
    avatar: "/assets/avatar.jpg",
    about: [
      "I am an undergraduate student in Software Engineering at Beihang University, with a GPA of 3.89/4.00 and a major rank of 4/158.",
      "I am currently conducting research training in Prof. Sheng Lu's group, focusing on computer vision, world models, and long-video generation, with ongoing exploration of 3D-conditioned control for generative tasks.",
      "I hope to extend my research toward intelligent systems in real interactive environments (e.g., embodied intelligence) and turn my research experience into reusable methods and open-source practice. Academic communication and collaboration are welcome."
    ],
    resume: {
      education: "Beihang University · Software Engineering · Undergraduate (2023.09 - Present)",
      interests: "Research Interests: computer vision, world models, long-video generation, 3D-conditioned generation"
    },
    news: [
      {
        date: "Mar 2026",
        text: "Submitted the paper WorldRenderer to ECCV 2026."
      },
      {
        date: "Nov 2025",
        text: "Started research on long-horizon video generation and 3D-conditioned control."
      },
      {
        date: "Oct 2025",
        text: "Joined Prof. Sheng Lu's research group as a research intern."
      }
    ],
    publicationsUpdated: "Updated: 2026",
    publications: [
      {
        title: "WorldRenderer: Long-Horizon 3D World Rendering with Video Diffusion Models",
        authors:
          "Li Yin, Ming Lin, Yuzhen Wang, Haoran Feng, Zhenghao Song, Yang-Tian Sun, Zehuan Huang, Lu Sheng",
        venue: "Under review at ECCV 2026 (Submitted: 06 Mar 2026)",
        abstract:
          "We present WorldRenderer, a framework for long-horizon 3D world rendering that produces temporally consistent and geometrically coherent videos, addressing key limitations of prior methods. Specifically, WorldRenderer employs a unified geometry-memory encoding that jointly represents geometric conditions and long-term world memory within a shared control space, allowing the model to preserve structural fidelity while maintaining temporal consistency. In addition, we propose GMem-Forcing, a distillation strategy that explicitly enforces long-horizon consistency during training through geometry-memory self-rollout, mitigating error accumulation and enabling stable real-time streaming video generation. Extensive experiments demonstrate that WorldRenderer significantly improves geometric coherence, temporal consistency, and real-time performance compared to prior approaches, offering an effective solution for long-term 3D world rendering.",
        hideAuthors: true,
        link: "#"
      }
    ],
    contact: {
      email: "23373097@buaa.edu.cn",
      github: "https://github.com/Tengpaz",
      scholar: "https://scholar.google.com/citations?user=G3OmpmUAAAAJ",
      location: "Beijing, China",
      phone: "13207901517",
      wechat: "candy051019"
    }
  },
  footerText: "© 2026 Yuzhen Wang · Academic Homepage"
};
