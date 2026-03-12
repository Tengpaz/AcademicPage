export const siteContentZh = {
  siteBrand: "个人学术主页",
  navItems: [
    { label: "个人介绍", to: { path: "/", hash: "#about" } },
    { label: "动态", to: { path: "/", hash: "#news" } },
    { label: "代表作", to: { path: "/", hash: "#publications" } },
    { label: "科研足迹", to: "/journey" }
  ],
  paperLink: "论文链接",
  sectionTitles: {
    about: "关于我",
    news: "最新动态",
    publications: "代表作",
    journey: "科研足迹"
  },
  journeyUi: {
    notesLabel: "关联笔记",
    noteListTitle: "本条目笔记",
    tocTitle: "目录",
    loading: "正在加载笔记...",
    empty: "暂无笔记内容",
    failed: "笔记加载失败，请稍后重试。",
    close: "关闭"
  },
  journeyIntro: "写给未来的自己，也写给同路人。",
  journeyEntries: [
    {
      date: "2026年3月",
      title: "尝试补齐具身智能基础知识",
      tags: ["具身智能", "科研入门"],
      content: "参考学习资料：\n计算机视觉入门斯坦福课程 https://www.bilibili.com/video/BV1YJ3PzLEiW/\nhttps://scalelab-sjtu.github.io/embodied_guide.html",
      notes: [
        {
          title: "具身智能学习导航",
          file: "zh/embodied-ai-guide.md"
        }
      ]
    },
    {
      date: "2026年3月",
      title: "第一篇论文投稿 ECCV 2026",
      tags: ["论文投稿", "视频生成"],
      content: "项目打磨期间，学习各种实验流程，论文撰写技巧。"
    },
    {
      date: "2025年6月",
      title: "寻找科研实习机会",
      tags: ["科研起点"],
      content: "成绩方面可能很难取得显著提升了，但是科研经历还是十分匮乏。于是开始寻找科研机会，感谢接纳自己的老师。",
      notes: [
        {
          title: "寻找科研机会的准备清单",
          file: "zh/research-internship-search.md"
        }
      ]
    }
  ],
  profile: {
    role: "北京航空航天大学软件工程本科生",
    name: "王宇祯",
    tags: ["Computer Vision", "World Model", "Video Generation"],
    avatar: "/assets/avatar.jpg",
    about: [
      "我目前就读于北京航空航天大学软件学院软件工程专业，GPA 为 3.89/4.00，专业排名 4/158。",
      "目前在盛律老师课题组开展科研训练，主要关注计算机视觉、世界模型与长视频生成，并持续探索 3D 条件控制在生成任务中的有效性。",
      "我希望将研究兴趣延展到更贴近真实交互场景的智能系统（如具身智能方向），也期待把已有研究经验沉淀为可复用的方法与开源实践，欢迎学术交流与合作。"
    ],
    resume: {
      education: "北京航空航天大学 · 软件工程 · 本科在读（2023.09 - 至今）",
      interests: "研究兴趣：计算机视觉、世界模型、长视频生成、3D 条件控制生成"
    },
    news: [
      {
        date: "2026年3月",
        text: "论文 WorldRenderer 投稿至 ECCV 2026。"
      },
      {
        date: "2025年11月",
        text: "开始长时程视频生成与 3D 条件控制方向的有关研究。"
      },
      {
        date: "2025年10月",
        text: "进入盛律老师课题组实习"
      }
    ],
    publicationsUpdated: "更新于：2026",
    publications: [
      {
        title: "WorldRenderer: Long-Horizon 3D World Rendering with Video Diffusion Models",
        authors:
          "Li Yin, Ming Lin, Yuzhen Wang, Haoran Feng, Zhenghao Song, Yang-Tian Sun, Zehuan Huang, Lu Sheng",
        venue: "在投 ECCV 2026（投稿时间：06 Mar 2026）",
        abstract:
          "我们提出 WorldRenderer，一个面向长时程 3D 世界渲染的框架，可生成时间一致且几何连贯的视频，解决以往方法的关键局限。具体来说，WorldRenderer 采用统一的 geometry-memory 编码，在共享控制空间中联合表示几何条件与长期世界记忆，从而在保持结构保真度的同时维持时间一致性。此外，我们提出 GMem-Forcing 蒸馏策略，通过 geometry-memory 自回滚在训练中显式约束长时程一致性，缓解误差累积并实现稳定的实时流式视频生成。大量实验表明，相比已有方法，WorldRenderer 在几何连贯性、时间一致性和实时性能上均有显著提升，为长时程 3D 世界渲染提供了有效方案。",
        hideAuthors: true,
        link: "#"
      }
    ],
    contact: {
      email: "23373097@buaa.edu.cn",
      github: "https://github.com/Tengpaz",
      scholar: "https://scholar.google.com/citations?user=G3OmpmUAAAAJ",
      location: "中国北京",
      phone: "13207901517",
      wechat: "candy051019"
    }
  },
  footerText: "© 2026 王宇祯 · 学术主页"
};
