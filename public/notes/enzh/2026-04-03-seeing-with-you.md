# Seeing with You 与你同视

> Perception–Reasoning Coevolution for Multimodal Reasoning
> 
> 面向多模态推理的感知推理协同演化

[论文](https://arxiv.org/abs/2603.28618)

## Abstract 摘要

Reinforcement learning with verifiable rewards (RLVR) has substantially enhanced the reasoning capabilities of multimodal large language models (MLLMs). However, existing RLVR approaches typically rely on outcome-driven optimization that updates both perception and reasoning using a shared reward based solely on the final answer. This shared reward blurs (模糊) credit assignment, frequently improving reasoning patterns while failing to reliably enhance the accuracy of upstream visual evidence extraction.

依靠可验证奖励的强化学习方法（RLVR）已经大幅提高了多模态大语言模型（MLLMs）的推理能力。然而，现有的RLVR方法通常依靠结果驱动的优化方法，这种方法仅仅基于最终结果的好坏给轨迹分配一个共用的奖励。这种共用的奖励会模糊得分分配，频繁更新推理模式，但是又无法可靠提升上游视觉信息提取的准确性。

To address this perception bottleneck, we introduce PRCO (Perception–Reasoning Coevolution), a dual-role RLVR framework with a shared policy. PRCO consists of two cooperative roles: an Observer that generates an evidence caption (说明) tailored (量身定制的) to the question and a Solver that predicts the final answer based on this caption. Crucially (关键的是), PRCO employs role-specific reward signals: the Solver is optimized using verifiable outcome rewards on the final answer, while the Observer receives a utility (实用性) reward derived from the Solver’s downstream success. 

为了解决这个感知瓶颈，我们提出了PRCO（感知-推理协同演化），一个单策略双角色RLVR框架。PRCO由两个协同工作的角色组成：一个用于生成与问题一致的信息说明的观察者和一个基于说明预测最终答案的解决者。关键的是，PRCO用了针对角色定制的奖励信号：解决者用根据最终结果得到的可验证结果奖励来进行优化更新，观察者接收一个根据解决者下游成功情况给定的一个实用性奖励进行优化更新。

Extensive experiments across eight challenging multimodal reasoning benchmarks demonstrate that PRCO yields consistent improvements across model scales by over 7 points on average accuracy compared to the base model, outperforming prior open-source RL-tuned baselines.

包含了八个挑战性多模态推理标准指标的实验表明使用PRCO后与基础模型相比在各种模型规模上都提高了7个点的平均准确性，超过了之前开源的强化学习微调后的各基线模型。

## Bottleneck 瓶颈

Effective reasoning relies on accurate perception, which provides the necessary grounding for logical deduction. However, RLVR is often applied in an outcome-driven manner, verifying only the final textual answer while largely neglecting the accuracy of upstream visual perception.

有效的推理依赖准确的感知，感知为逻辑推理提供了必要的基石。然而，RLVR通常被应用于结果驱动的方法中，只验证最终以文字呈现的结果是否正确，忽视了上游视觉感知的准确性。

To concretely examine this bottleneck, we conduct a diagnostic analysis using GRPO as a representative multimodal RLVR baseline. We train Qwen2.5-VL-7B (Team, 2025) with GRPO and compare its failure modes against its initialization on WeMath (Qiao et al., 2025) using fine-grained error categorization.

为了具体检验这个瓶颈是否存在，我们用GRPO作为表达性多模态RLVR的基线做了一个诊断分析实验。我们用GRPO训练了Qwen2.5-VL-7B，用微调过的错误分类将训练后的模型与最初模型在WeMath任务上的错误数据进行比较。

![[Pasted image 20260403154830.png]]

> Figure 1: Diagnostic (诊断) analysis of GRPO on WeMath (Qiao et al., 2025). 
> 
> Left: GRPO reduces reasoning errors much more than perception errors. 
> 
> Right: a representative failure case caused by incorrect perception.
> 
> 图1：在WeMath任务上对GRPO方法的诊断分析。
> 
> 左：GRPO更多地减少了推理错误，更少地减少感知错误。
> 
> 右：感知错误造成的一个表达错误案例。

We attribute this bottleneck to outcome-only RLVR with a shared reward updating both perception and reasoning. This blurs credit assignment and improves reasoning patterns without reliably improving visual evidence extraction.

我们觉得这个瓶颈源于*只基于结果的RLVR使用了一个共用的奖励来更新感知和推理能力*。这种方式模糊了奖励分配，改善了推理模式却没有可靠改善视觉信息提取能力。

## Prior work 以往的工作

Recently, some works have recognized perception as critical and explored perception-centric RLVR for MLLMs. These efforts focus on three directions: introducing additional perception-oriented optimization objectives, using weighted token-level credit assignment for perception and reasoning tokens, requiring an explicit image-description step before reasoning. Despite being promising, these works still distribute outcome-based rewards to both perception and reasoning tokens. Consequently, the coupled training signal may improve reasoning patterns without reliably improving visual evidence extraction. These findings naturally prompt the question:

最近一些工作也发现了感知的重要性，探索了一些用于MLLMs上以感知为中心的RLVR方法。这些工作聚焦于三个方向：引入额外的面向感知的优化目标、为感知和推理token使用token级加权奖励分配方法、在推理前进行一步显式对图片说明的操作。尽管这些工作变得更为可靠，它们依旧将基于结果的奖励分配同时给了感知和推理token。由此造成的结果是：这些成对的训练信号可能能改善推理模式，却无法有效改善视觉提取能力。这些发现很自然地引出了这个疑问：

> *Can we use reliable, separate learning signals for perception and reasoning to decouple them at the gradient level?*
> 
> *我们能否为感知和推理分别准备可靠的学习信号来在梯度层面解耦这两个任务？*

## Contribution 贡献

- We propose PRCO, a dual-role RLVR framework that disentangles (解耦合) perception and reasoning with an Observer and a Solver under a shared policy.
	我们提出了PRCO，一个使用单策略双角色（观察者&解决者）解耦感知和推理任务的RLVR框架。
- We demonstrate the effectiveness of PRCO on diverse and challenging multimodal reasoning benchmarks, showing consistent improvements over strong RLVR baselines.
	我们验证了PRCO在众多挑战性多模态推理指标上的有效性，展示了PRCO能够无差别改善强大的RLVR基线模型。
- We provide extensive ablation and diagnostic analyses that validate PRCO’s key design choices and characterize its effects on perception and reasoning.
	我们提供了额外的消融实验和诊断分析，验证了PRCO选择的关键设计的有效性，并描绘了PRCO在感知和推理两大任务上的效果。

## Method 方法

### Preliminary: Group Relative Policy Optimization 基础：组相对策略优化

GRPO is a reinforcement learning algorithm for fine-tuning a policy LLM without learning a separate value function. Its key idea is to compute relative learning signals by normalizing rewards against other responses sampled from the same prompt. For a given prompt $x$, the policy generates a group of $G$ complete responses $\{y_i\}^G_{i=1}$. Each response receives a scalar reward $r_i$. GRPO converts these rewards into response-level advantages via z-score normalization:

GRPO是一个无需学习额外的价值函数即可微调策略LLM的强化学习算法。它的关键思想是根据从相同提示词下采样的多个结果归一化奖励来计算得到相对性学习信号。对于一个给定的提示词$x$，这个策略生成一组$G$个完整的回复$\{y_i\}^G_{i = 1}$。每一个回复都会得到一个标量奖励值$r_i$。GRPO将这些奖励通过z-score归一化方法转化为回复级得分：

$$
\hat{A_i} = \frac{r_i - \mathrm{mean}(\{r_j\}^G_{j=1})}{\mathrm{std}(\{r_j\}^G_{j=1})+\epsilon_{\mathrm{norm}}}
\tag{1}
$$

其中$\epsilon_{\mathrm{norm}}$是一个用于保证数值稳定性的小常数。

#### Policy update

GRPO updates the policy using a PPO-style clipped surrogate (代理) objective to improve stability. To prevent excessive policy drift (漂移), the objective is regularized with a KL-divergence penalty to the old policy:

GRPO使用PPO风格的裁断代理目标更新策略来改善稳定性。未来避免过度的策略更新，目标通过一个KL散度惩罚项被正则化趋向原始策略：

$$
\begin{multline*}
\mathcal{L}_{\mathrm{GRPO}}(\theta)=-\mathbb{E}_{i, t}[\min(\rho_{i, t}(\theta)\hat{A}_i,\mathrm{clip}(\rho_{i, t}(\theta),1-\epsilon, 1+\epsilon)\hat{A}_i)] \\
+\beta\mathbb{E}_x [\mathrm{KL}(\pi_{\theta}(\cdot|x)||\pi_{\theta_{\mathrm{old}}}(\cdot|x))].
\end{multline*}
\tag{2}
$$

where $\rho_{i, t}(\theta)$ is the token-level importance ratio, $\epsilon$ is the clipping threshold, and $\beta$ controls the $\mathrm{KL}$
penalty. Optimizing this objective increases the likelihood of responses with positive relative advantages, while the $\mathrm{KL}$ term constrains divergence from $\pi_{\theta_{\mathrm{old}}}$ for stable training.

其中$\rho_{i, t}(\theta)$是token级重要性比值，$\epsilon$是截断阈值，$\beta$控制了$\mathrm{KL}$散度惩罚项。通过优化这个目标函数能够提高输出结果有正相对得分的概率，与此同时$\mathrm{KL}$散度惩罚项能够约束更新后策略相对原始策略的散度从而保证训练的稳定性。

### Overview 总览

![[Pasted image 20260403202749.png]]

> Figure 2: Overview of PRCO. A shared policy alternates between an Observer for question-conditioned evidence captioning and a Solver for evidence-conditioned reasoning. The two roles are jointly optimized with role-specific learning signals and group-relative advantages, enabling perception–reasoning coevolution under a shared policy.
> 
> 图2：PRCO总览。一个共用的策略，可以选择用于生成针对问题说明的观察者和用于根据信息推理的解决者任一角色。两个角色通过具体角色的学习信号和组相关得分一起优化，使得感知和推理在一个策略下协同演化。
#### RLVR setting RLVR设定

Following typical $\mathrm{RLVR}$ setups, our training dataset $\mathcal{D}$ consists of tuples $(I,q,a)$ where $I$ is an image, $q$ is a question, and $a$ is a short ground-truth answer. We do not rely on any existing chain-of-thought data and initiate RL training directly without supervised fine-tuning. We use a lightweight rule-based verifier $V(\hat{a}, a) \in \{ 0, 1 \}$ that checks whether the predicted answer $\hat{a}$matches $a$, and a simple format checker $\mathrm{FormatScore}(\hat{a}) \in [0,1]$ that evaluates whether the output satisfies the required format.

沿用传统RLVR的设定，我们的训练数据集 $\mathcal{D}$ 由多个元组 $(I, q, a)$ 组成，$I$ 是一张图片，$q$ 是问题，$a$ 是一个简短的目标答案。我们不依赖任何已有的思维链数据，无需监督微调直接初始化强化学习训练。我们使用了一个轻量级基于规则的验证器 $V(\hat{a}, a)\in \{0,1\}$ 来检查预测答案 $\hat{a}$ 是否匹配目标答案 $a$，使用一个简单的格式检查器 $\mathrm{FormatScore}(\hat{a})\in[0,1]$ 评估输出是否满足格式要求。

#### Two roles under one shared policy 一个策略两个角色

We instantiate a single policy $\pi_{\theta}$ in two roles via role-specific prompting. We denote (表示) by $r_O$ and  $r_S$ the prompts for the Observer and Solver, respectively. For each sample $(I,q,a)$, the Observer first generates an intermediate caption $c$ summarizing question-relevant visual evidence; then the Solver outputs the final answer conditioned on $c$ and optionally (可选地) the image. We denote the Solver’s visual input as $I^S \in \{\varnothing,I\}$. For each training instance, we sample $G_O$ candidate captions $\{c_k\}^{G_O}_{k=1}$ under the Observer role; given a caption $c_k$, we sample $G_S$ candidate answers $\{\hat{a}_{k,g}\}^{G_S}_{g=1}$ under the Solver role. The Observer is encouraged to externalize visual evidence into captions, while the Solver is trained to leverage captions for evidence-conditioned reasoning.

我们通过针对角色的提示词将一个简单的策略$\pi_{\theta}$实例化为两个角色。我们分别用 $r_O$ 和 $r_S$ 来表示观察者和解决者的提示词。对于每一个样本 $(I, q, a)$，首先观察者会生成一个中间说明 $c$ 总结概括与问题有关的视觉线索；接着解决者会根据 $c$ 或者图片给出最终答案。我们将解决者的视觉输入表示为 $I^S \in \{\varnothing , I \}$。对于每一个训练实例，我们会在观察者角色下取$G_O$个候选的说明 $\{c_k\}^{G_O}_{k=1}$；给定一个说明 $c_k$，我们在解决者角色下取 $G_S$ 个候选答案 $\{\hat{a}_{k, g}\}^{G_S}_{g=1}$ 。观察者被鼓励将视觉线索外显成说明，同时解决者被训练利用说明做基于线索的推理。

### Observer: Utility-Driven Evidence Caption 观察者：效用驱动的线索说明

The Observer converts high-dimensional visual input into a textual evidence signal by producing a question-conditioned evidence caption that summarizes the visual evidence most relevant to $q$ (e.g., entities, attributes, and relations). Formally, given $(I,q)$ , the Observer samples $c∼\pi_{\theta}(\cdot | I,q,r_O)$ .

观察者通过生成一段总结与问题 $q$ 最相关的视觉线索（如实体、参数、关系等）的文字说明，将高维视觉输入转化为文字线索信号。正式地说，给定 $(I, q)$，观察者输出 $c ∼ \pi_{\theta}(\cdot | I, q, r_O)$。

#### Utility reward with leakage (泄漏) suppression 抑制泄漏的效用奖励

Directly verifying the intrinsic quality of an evidence caption is difficult. We therefore train the Observer through the downstream utility (效用) that its caption provides to the Solver. A key failure mode is answer shortcutting (捷径), where the Observer directly places the final answer in the caption instead of extracting question-relevant visual evidence. To suppress this behavior, we use an auxiliary (辅助的) $\mathrm{LLM}$-based leakage checker that takes the caption $c$ and question $q$ as input and outputs a binary leakage indicator (指标). Let $\mathbb{I}_{\mathrm{leak}}(q,c) \in \{0,1\}$ be the indicator of answer leakage in $c$, where 1 indicates the presence of leakage. For a sampled caption $c_k$, we define the Observer reward as

直接验证线索说明的内在质量是很困难的。因此我们通过其提供给解决者的说明的下游效用来训练观察者。一个关键的失败模式是答案捷径，这种情况下观察者直接给出说明中的最终答案而不是提取问题相关的视觉线索。为了抑制这种行为，我们使用了一个辅助的基于$\mathrm{LLM}$的泄漏检查器，它输入说明 $c$ 和问题 $q$ 然后输出一个二进制泄漏指标。令 $\mathbb{I}_{\mathrm{leak}}(q,c) \in \{0,1\}$ 为在 $c$ 中的答案泄漏指标，1表示存在泄漏。对于一个取得的说明 $c_k$，我们将观察者奖励定义为

$$
r_k^O = (1 - \mathbb{I}_{\mathrm{leak}}(q, c_k))\mathbb{E}_{\hat{a}∼\pi_{\theta}(\cdot | I^S, q, c_k, r_S) }[V(\hat{a}, a)]
\tag{3}
$$

The expectation is approximated by the empirical (经验的) mean of the verifier scores over $G_S$ sampled Solver rollouts (输出) conditioned on $(I^S,q,c_k,r_S)$. This reward favors captions that help downstream solving and suppresses captions judged as leaking the answer.

期望用取得的 $G_S$ 个以 $(I^S, q, c_k, r_S)$ 为条件的解决者输出的验证器得分的经验均值估算。这个奖励偏好能够帮助下游解决问题的说明并抑制了被判定为泄漏答案的说明。

### Solver: Evidence-Conditioned Reasoning 解决者：基于证明的推理

The Solver produces a short final answer by reasoning over the question and the Observer’s caption, with the image provided when available. Conditioning on $c$ encourages explicit evidence-driven reasoning, while image input helps recover global structure or complex geometric relations that are difficult to fully convey in text. Formally, given a caption $c$, the Solver samples $\hat{a}∼\pi_{\theta}(\cdot | I^S,q,c,r_S)$.

解决者基于问题、观察者的说明、图片（如果有）推理生成一个简短的最终答案。以 $c$ 为条件鼓励显式线索驱动的推理，图片输入可以帮助还原文字难以完全传达的全局结构或复杂的几何关系。正式地说，给定一个说明 $c$，解决者输出 $\hat{a}∼\pi_{\theta}(\cdot | I^S, q, c, r_S)$。

#### Solver reward 解决者奖励

We define the correctness reward via the verifier as $r^{\mathrm{acc}} = V(\hat{a},a)$. In addition, $r^{\mathrm{format}} \in [0,1]$ measures whether the response strictly follows the required format. We compute it with a simple rule-based checker as $r^{\mathrm{format}} = \mathrm{FormatScore}(\hat{a})$. The Solver is rewarded for both correctness and basic format compliance (合规): 

我们将正确性奖励通过验证器定义为 $r^{acc} = V(\hat{a}, a)$。另外，$r^{\mathrm{format}} \in [0,1]$ 衡量回复是否严格符合格式需求。我们用一个简单的基于规则的检查器计算这个值，按照 $r^{\mathrm{format}} = \mathrm{FormatScore}(\hat{a})$。解决器同时接收正确性和基本的格式合规性反馈：

$$
r^S = \lambda r^{\mathrm{acc}} + (1 - \lambda)r^{\mathrm{format}},
\tag{4}
$$

where $\lambda$ balances accuracy and format compliance, with a default value of $0.9$.

其中 $\lambda$ 平衡了准确性和格式合规性，默认值为 $0.9$。

#### Caption-first warmup 说明优先的热身

In early training, we set $I^S = \varnothing$ so that the Solver must rely on $(q, c)$. We find that if the Solver receives both the image and the caption too early, it tends to ignore the caption and solve directly from the image, which can drown out the learning signal for improving captions. Therefore, we first warm up the Solver to solve using only captions; after a short warmup, we switch to $I^S = I$ to restore full multimodal grounding while retaining the benefits of caption conditioning.

在训练早期我们设 $I^S = \varnothing$ 以确保解决者必须依赖 $(q, c)$。我们发现如果解决者太早同时接收图片和说明，它会倾向于忽略说明根据图片直接解决问题，这样会掩盖用于改善说明的学习信号。因此我们首先让解决者仅仅使用说明解题来热身；简短热身之后，我们转化回 $I^S = I$ 来恢复完整的多模态信息，同时也保持了说明条件的有效性。

### Unified Policy Optimization with Role-Specific Advantages 用分角色的得分统一策略优化

The Observer and Solver share the same policy and are optimized jointly. However, their rollouts define different comparison groups for relative optimization. Observer captions are compared across samples from the same $(I,q)$ instance, whereas Solver answers are compared within caption-conditioned answer groups. We therefore compute relative advantages separately for the two roles and optimize the shared policy over the combined rollouts.

观察者和解决者共享相同的策略并一同被优化。然而，它们的输出为相对优化定义了不同的对比组。观察者的说明在从相同 $(I, q)$ 实例中采样的样本之间做比较，然而解决者的答案在说明条件下的答案组中比较。因此我们分别为这两个角色计算相对得分并在结合后的输出上面优化共享的策略。

#### Role-wise grouping and advantage computation 角色级分组和得分计算

For each sample $(I,q,a)$ , the Observer generates $G_O$ candidate captions $\{c_k\}^{G_O}_{k=1}$ under $\pi_{\theta}(\cdot|I,q,r_O)$. For each caption $c_k$, we generate $G_S$ Solver answers $\{\hat{a}_{k,g}\}^{G_S}_{g=1}$ under $(I_S,q,c_k,r_S)$ and compute rewards $\{r^S_{k,g}\}^{G_S}_{g=1}$ using $\mathrm{Eq}. (4)$. We then compute Observer rewards $\{r^O_k\}^{G_O}_{k=1}$ via $\mathrm{Eq}. (3)$. Following $\mathrm{Eq}. (1)$, we compute group-relative advantages separately for the two roles while omitting (省略) the standard deviation normalization term. Concretely (具体地说), for a reward group $\{r_i\}^G_{i=1}$, we use $\hat{A}_i = r_i − \mathrm{mean}(\{r_j\}^G_{j=1})$.

对于每一个样本 $I, q, a$，观察者在 $\pi_{\theta}(\cdot|I,q,r_O)$ 的条件上生成 $G_O$ 个候选说明 $\{c_k\}^{G_O}_{k=1}$。对于每一个说明 $c_k$，我们在 $(I_S, q, c_k, r_S)$ 的条件下生成 $G_S$ 个解决者答案 $\{\hat{a}_{k,g}\}^{G_S}_{g=1}$ 并通过等式 $(4)$ 计算奖励 $\{r^S_{k,g}\}^{G_S}_{g=1}$。接着我们通过等式 $(3)$ 计算观察者奖励 $\{r^O_k\}^{G_O}_{k=1}$。根据等式 $(1)$，我们为两个角色分别计算得到组相对得分，省略标准偏差归一化项。具体地说，对于一个奖励组 $\{r_i\}^G_{i=1}$，我们使用 $\hat{A}_i = r_i − \mathrm{mean}(\{r_j\}^G_{j=1})$ 计算得分。

By centering rewards around the role-specific group mean without standard deviation normalization, we ensure that gradient updates are driven by within-group relative performance rather than cross-role variance (方差) differences.

通过将奖励聚焦于具体角色的组平均值周围并省略标准偏差归一化，我们保证了梯度更新只由组内的相对表现决定而不是角色间的方差差异。

We compute caption advantage $\{\hat{A}^O_k\}^{G_O}_{k=1}$ from $\{r^O_k\}^{G_O}_{k=1}$ across the $G_O$ captions.

我们通过 $G_O$ 个说明的奖励组 $\{r^O_k\}^{G_O}_{k=1}$ 计算得到说明得分组 $\{\hat{A}^O_k\}^{G_O}_{k=1}$。

For the Solver update, we reuse these evidence-conditioned answer rollouts. For each $(I,q,a)$, we preferentially (优先地) sample one caption index $\tilde{k}$ uniformly from captions with $Var(\{r^S_{k,g}\}^{G_S}_{g=1}) > 0$ to avoid degenerate (抑制的) relative signals, and compute Solver advantages $\{\hat{A}^S_{\tilde{k},g}\}^{G_S}_{g=1}$ from $\{r^S_{\tilde{k},g}\}^{G_S}_{g=1}$.

对于解决者更新，我们重利用了基于线索的输出答案。对于每一组 $(I, q, a)$，我们统一从 $Var(\{r^S_{k,g}\}^{G_S}_{g=1}) > 0$ 的说明组中取一个说明序号 $\tilde{k}$ 来避免抑制的相对奖励，再从该说明的奖励组 $\{r^S_{\tilde{k},g}\}^{G_S}_{g=1}$ 中计算得到解决者得分组 $\{\hat{A}^S_{\tilde{k},g}\}^{G_S}_{g=1}$。

#### Unified policy update 统一策略更新

We aggregate Observer caption trajectories associated with $\hat{A}^O$ and Solver answer trajectories associated with $\hat{A}^S$ into a combined rollout batch and optimize a unified GRPO-style objective:

我们将与 $\hat{A}^O$ 相关联的观察者说明轨迹和与 $\hat{A}^S$ 相关联的解决者答案轨迹聚合成一个合成输出组并优化一个统一的 GRPO风格的目标函数：

$$
\mathcal{L}_{\mathrm{dual}}(\theta) = \mathcal{L}_{\mathrm{GRPO}}(\theta; \hat{A}^S) + \mathcal{L}_{\mathrm{GRPO}}(\theta; \hat{A}^O),
\tag{5}
$$

where $\mathcal{L}_{\mathrm{GRPO}}(\theta;\hat{A})$ denotes $Eq. (2)$ instantiated on the corresponding role trajectories with advantage $\hat{A}$. Following (Yu et al., 2025), we set $\beta = 0$ to remove the $\mathrm{KL}$ penalty and encourage exploration. Under the shared policy, this unified update jointly improves perception and reasoning.

其中 $\mathcal{L}_{\mathrm{GRPO}}(\theta;\hat{A})$ 代表附有得分$\hat{A}$的对应角色轨迹实例化的等式 $(2)$。沿用 (Yu et al., 2025) 的研究结论，我们设 $\beta = 0$ 来消除 $\mathrm{KL}$ 惩罚，鼓励探索。在共享的策略下，这个统一的更新同时改善了感知和推理。

## Experiments 实验

### Experimental Setup 实验设定

#### Models, Data and Baselines 模型、数据和基线

We perform direct RL training on the Qwen2.5-VL-3B, Qwen2.5-VL-7B, and Qwen3-VL-8B-Instruct backbones using ViRL39K. ViRL39K contains 39K verifiable multimodal reasoning questions across diverse visual formats, such as diagrams and charts. We benchmark our method against recent open-source reasoning MLLMs at the 3B and 7B scales, and further evaluate it on the stronger Qwen3-VL-8B-Instruct backbone.

我们用 ViRL39K 数据集直接在Qwen2.5-VL-3B、Qwen2.5-VL-7B、Qwen3-VL-8B-Instruct主体上进行了强化学习训练。ViRL39K数据集包含39K个覆盖多种视觉格式（如图、表）的可验证多模态推理问题。我们将我们的方法与最近的开源推理MLLMs在3B和7B规模上进行了对比测试，并在更强大的Qwen3-VL-8B-Instruct模型主体上做了进一步评估。

For the 3B setting, we compare with PAPO-G-3B and PAPO-D-3B, MMR1-3B-RL, and Vision-SR1-3B. For the 7B setting, we include PAPO-G-7B and PAPO-D-7B, R1-ShareVL-7B, Perception-R1-7B, Vision-Matters-7B, NoisyRollout-7B, MMR1-7B-RL, VPPO-7B, and Vision-SR1-7B. We also implement two strong RLVR baselines by finetuning the Qwen2.5-VL backbones and Qwen3-VL-8B-Instruct with GRPO and DAPO. Appendix A.5 reports the Qwen3-VL-8B-Instruct results, and Appendix A.1 provides additional details.