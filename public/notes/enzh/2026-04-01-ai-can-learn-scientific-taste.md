# AI Can Learn Scientific Taste

[项目网站](https://tongjingqi.github.io/AI-Can-Learn-Scientific-Taste/)
[论文](https://arxiv.org/abs/2603.14473)
[项目代码](https://github.com/tongjingqi/AI-Can-Learn-Scientific-Taste)
[模型和数据集](https://huggingface.co/collections/OpenMOSS-Team/ai-can-learn-scientific-taste)
[HuggingFace Daily Paper](https://huggingface.co/papers/2603.14473)
[演示](https://ai-innovator.open-moss.com/)

> TL;DR: We treat **scientific taste** as a learnable objective and show that Reinforcement Learning from Community Feedback can train models to judge and propose higher-impact scientific ideas.
> 
> 我们将研究品味看作一个可以学习的对象，展示了从社区反馈进行强化学习可以训练模型去评估并提出一个具有高影响力的研究想法。

## Abstract 摘要

Great scientists have strong judgement and foresight, closely tied to what we call scientific taste. Here, we use the term to refer to the capacity to judge and propose research ideas with high potential impact. However, most related research focuses on improving an AI scientist's executive capability, while enhancing an AI's scientific taste remains underexplored.

伟大的科学家往往具有强大的评估能力和远见卓识，这些能力与我们口中所说的研究品味息息相关。在这篇工作中，我们使用此术语（科学品味）指代评断和提出具有高潜在影响力的研究想法的能力。然而，大多相关研究聚焦于改善AI科学家的执行能力，而如何提高AI科学家的研究品味无人探索。

We propose **Reinforcement Learning from Community Feedback (RLCF)**, a training paradigm (范式) that uses large-scale community signals as supervision and formulates scientific taste learning as a preference modeling and alignment problem. For preference modeling, we train **Scientific Judge** on 700K field- and time-matched pairs of high- vs. low-citation papers. For preference alignment, using Scientific Judge as a reward model, we train **Scientific Thinker** to propose research ideas with high potential impact.

我们提出了*基于社区反馈的强化学习*（RLCF），这是一个训练范式，它使用大范围社区信号进行监督并将研究品味学习设定为一个偏好建模和对齐问题。为了建模偏好，我们在70万对领域和时间匹配的高引用论文与低引用论文上训练了一个*科学评估模型*。为了偏好对齐，我们使用训练得到的*科学评估模型*作为奖励模型，训练了一个能够提出高影响潜力研究想法的*科学思考模型*。

Experiments show that Scientific Judge outperforms strong LLM baselines such as GPT-5.2 and Gemini 3 Pro, and generalizes to future-year test sets, unseen fields, and peer-review preference. Scientific Thinker further proposes research ideas with higher potential impact than strong baselines. Our findings show that AI can learn scientific taste, marking a key step toward human-level AI scientists.

实验显示，科学评估模型能力超过了很多强大的LLM基线模型，比如GPT-5.2和Gemini 3 Pro，并且它能够被泛化应用到未来的测试集、尚未探索的领域、同行评审偏好。

科学思考模型能够提出比强大基线模型更具潜在影响力的研究想法。

我们的研究发现表明AI可以学习到研究品味，这标志着我们向能够匹敌人类的AI科学家迈出了关键一步。

## Why Scientific Taste Matters? 为什么研究品味如此重要？

- **Scientific taste is more than execution.** AI scientists increasingly help with literature search and experimentation, but choosing which ideas are worth pursuing remains a separate capability.
	研究品味比执行力更重要。AI科学家在文献搜索和实验上面越来越有帮助，但是选择一个值得研究的想法依旧难以做到。这颇具割裂感。
- **Community feedback provides supervision.** In science, long-term community judgement is reflected in signals such as citations, which can be turned into matched preference data.
	社区反馈提供监督。在科学界，长期的社区评估被反映在一些信息中，比如论文的引用量。这些信息可以成为相匹配的偏好数据。
- **Taste can be modeled and aligned.** Once preference signals are constructed, a model can learn to judge ideas and then be used as a reward model to improve idea generation itself.
	品味可以被建模并对齐。一旦偏好信息被构建出来，模型就可以学习如何评估研究想法，进而可以被用作一个奖励模型来改善想法生成本身。

![Scientific Judge (small models) outperforms much larger baselines; Scientific Thinker achieves strong win rates.](https://tongjingqi.github.io/AI-Can-Learn-Scientific-Taste/static/images/performance_teaser.png)

## RLCF Formulation RLCF方法

### Pipeline 流程

- **Construct community preference.** We pair papers from the same field and publication period, then label the higher-citation paper as preferred.
	构建社区偏好。我们在相同领域和时期的论文中进行配对，将高引用的论文标记为*被偏好的*。
- **Train Scientific Judge.** A generative reward model reasons over a pair of papers and predicts which one is more likely to have higher impact.
	训练科学评估模型。一个在*单论文对*上进行推理并预测哪篇论文更可能有更高影响力的*生成式奖励模型*。
- **Train Scientific Thinker.** Using Scientific Judge as the reward model, a policy model learns to propose follow-up research ideas with higher potential impact through comparison-based GRPO.
	训练科学思考模型。这是一个用科学评估模型作为奖励模型通过基于对比的GRPO策略来学习提出一个继已有成果的具有高影响潜力研究想法的策略模型。

![](https://tongjingqi.github.io/AI-Can-Learn-Scientific-Taste/static/images/formulation.png)

> **The Core Thesis**
> 
> Scientific taste is not mystical or purely subjective. Large-scale community feedback can be converted into matched preferences that enable models to learn scientific judgement and improve scientific ideation (构思).
> 
> **核心理念**
> 
> 科学品味并非神秘或完全客观。大规模的社区反馈可以被转化为匹配的偏好，从而使得模型得以学习到科研评估并改善研究构思。

## SciJudgeBench and Main Results SciJudgeBench和主要结果

SciJudgeBench is built from 2.1M arXiv papers published through 2024, producing 696,758 field- and time-matched citation-based preference pairs. We evaluate across three settings:

SciJudgeBench由2024年发布的2.1M arXiv论文构建，打造了共696758对领域时间匹配的基于引用数的偏好数据对。我们在三个方面进行了评估：

- In-domain scientific judgement : paired paper preference prediction across Computer Science, Mathematics, Physics, and Other fields.
	领域内的科研评估：覆盖计算机科学、数学、物理和其他领域的配对论文偏好预测。
- Generalization settings : future-year papers, ICLR peer-review preference, and bioRxiv biology transfer.
	泛化设定：未来年份论文、ICLR 同行评审偏好、bioRxiv 生态转换。
- Ideation evaluation : pairwise win-rate comparisons for Scientific Thinker against its base policy and strong proprietary (专有的) models.
	构思评估：科学思考模型与基础策略和强大专用模型的逐数据对判断胜率对比。

### Leaderboard

**Scientific Judge on SciJudgeBench and OOD Settings**

在SciJudgeBench上做科学评估和OOD设定

> We report pairwise accuracy with position-swap consistency on in-domain and out-of-domain evaluations.
> 
> 我们报告了在领域内和领域外评估中具有位置交换一致性的成对准确性

| Models                    | In-Domain | Future-Year | ICLR Review | bioRxiv  |
| ------------------------- | --------- | ----------- | ----------- | -------- |
| *Base Models*             |           |             |             |          |
| Qwen3-4B-Instruct         | 60.3      | 68.3        | 65.3        | 56.9     |
| Qwen3-30B-A3B-Instruct    | 66.3      | 71.6        | 76.8        | 45.0     |
| *Scientific Judge Models* |           |             |             |          |
| SciJudge-Qwen3-4B         | 75.3      | 74.5        | 79.1        | 57.5     |
| SciJudge-Qwen3-30B        | **80.6**  | **78.2**    | **87.7**    | **71.2** |
| *Strong Baselines*        |           |             |             |          |
| GPT-5.2-Thinking          | 72.7      | -           | -           | -        |
| GLM-5                     | 73.6      | -           | -           | -        |
| Gemini-3.0-Pro-Preview    | 75.7      | -           | -           | -        |

**Scientific Thinker Win Rates Against Strong Models**

科学思考模型与强大模型对抗的胜率

| Models                 | GPT-5.2-high | GLM-5  | Gemini 3 Pro | Average |
| ---------------------- | ------------ | ------ | ------------ | ------- |
| *In-Domain*            |              |        |              |         |
| Qwen3-30B-A3B-Thinking | 37.5         | 33.0   | 20.5         | 30.3    |
| SciThinker-30B         | **61.0**     | *58.5* | *43.0*       | *54.2*  |
| *Out-of-Domain*        |              |        |              |         |
| Qwen3-30B-A3B-Thinking | 36.0         | 29.5   | 18.0         | 27.8    |
| SciThinker-30B         | *59.0*       | *61.0* | *42.5*       | *54.2*  |

## Key Findings 关键发现

### Settings 基本设定

- Preference modeling: Scientific Judge is trained with GRPO on citation-based pairwise supervision and evaluated with position-swap consistency.
	偏好建模：科学评估模型使用GRPO策略在基于引用数的逐对监督上进行训练，对其的评估具有位置交换一致性
- Preference alignment: Scientific Thinker is trained with comparison-based GRPO using Scientific Judge as the reward model.
	偏好对齐：科学思考模型使用科学评估模型作为奖励模型进行基于对比的GRPO策略的训练。

![Scaling trends for scientific judgement across model size and training data.](https://tongjingqi.github.io/AI-Can-Learn-Scientific-Taste/static/images/scaling_curve.png)

> Scaling trends for scientific judgement across model size and training data.
> 
> 在模型大小和训练数据上的科学评估能力的扩展趋势

![Scientific Thinker win rates after preference alignment.](https://tongjingqi.github.io/AI-Can-Learn-Scientific-Taste/static/images/thinker_winrate.png)

> Scientific Thinker win rates after preference alignment.
> 
> 科学思考模型在偏好对齐后的胜率

### Results 结论

1. **Scientific judgement scales with both data and model size.** Larger models and more preference data consistently improve in-domain performance.
	科学评估能力会随着数据和模型的大小进行扩张。更大的模型和更多的偏好数据会对应地提高领域内的评估表现。
2. **Learned judgement transfers across time.** Scientific Judge generalizes to papers published after the training period.
	学习到的评估能力能够在时间维度上进行泛化。科学评估能力能够泛化到训练数据来源时期之后发布的论文上。
3. **Learned judgement transfers across fields and metrics.** Gains persist on bioRxiv biology papers and on ICLR peer-review preference.
	学习到的评估能力能够在领域和指标上进行泛化。能够在bioRxiv的生物学论文和ICLR同行评审上面保持其能力。
4. **Scientific Thinker improves ideation quality.** The trained policy model strongly outperforms its base policy on both in-domain and out-of-domain settings.
	科学思考模型能改善构思质量。被训练过的策略模型能力能够在领域内外设定上大幅度超越基础策略。
5. **AI can learn scientific taste.** Together, the results suggest that scientific judgement and high-potential ideation can both be improved through RLCF.
	AI可以学习研究品味。这个结果同样证明科学评估和高潜在构思能力都可以通过RLCF被改善。