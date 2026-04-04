# LeWorldModel

> Stable End-to-End Joint-Embedding Predictive Architecture from Pixels
> 从像素到稳定端到端联合嵌入预测架构

[论文](https://arxiv.org/pdf/2603.19312v1)
[项目网站](https://le-wm.github.io)
[项目代码](https://github.com/lucas-maes/le-wm)
[项目数据和检查点](https://hf.co/collections/quentinll/lewm)

## Abstract 摘要

Joint Embedding Predictive Architectures (JEPAs) offer a compelling (引人注目的) framework for learning world models in compact (紧凑的) latent spaces, yet existing methods remain fragile, relying on complex multi-term losses, exponential (指数的) moving averages (平均线), pre-trained encoders, or auxiliary (辅助) supervision to avoid representation collapse. In this work, we introduce LeWorldModel (LeWM), the first JEPA that trains stably end-to-end from raw pixels using only two loss terms: a next-embedding prediction loss and a regularizer enforcing Gaussian-distributed latent embeddings. This reduces tunable loss hyperparameters from six to one compared to the only existing end-to-end alternative. With ~15M parameters trainable on a single GPU in a few hours, LeWM plans up to 48× faster than foundation-model-based world models while remaining competitive across diverse 2D and 3D control tasks. Beyond control, we show that LeWM's latent space encodes meaningful physical structure through probing (探测) of physical quantities. Surprise evaluation confirms that the model reliably detects physically implausible (不可信的) events.

JEPAs提供了一个引人注目的可在紧凑的潜在空间中学习世界模型的框架。但是，现有的方法依然脆弱，它们依赖复杂的多项损失函数、指数移动的平均线、预训练好的编码器或者辅助的监督策略来避免表征坍缩。

在这项工作中，我们提出了LeWorldModel (LeWM)，它是第一个仅仅使用两个损失项实现从像素到稳定端到端训练的JEPA。这两个损失项分别为——一个*表征预测损失*和一个*用于强迫潜在表征符合高斯分布的正则化项*。与现有的端到端平替方案相比，这种方式将可调的损失函数超参数从6个减少到了1个。有着大约15M参数的LeWM可以在一张GPU上训练几小时得到，这计划比基于基础模型的世界模型要快超过48倍，同时还保证在2D和3D控制任务上兼具竞争力。

控制以外，我们展示出了LeWM能够通过探测物理量编码富有意义的物理结构的能力。更多的评估保证了这个模型能可靠检测出物理不可信的事件。

> **TL;DR:** LeWM is a JEPA-based world model that avoids representation collapse using a simple Gaussian regularizer (SIGReg), trains end-to-end from pixels with only two loss terms, and achieves competitive control performance at a fraction of the compute cost.
> LeWM是一个依靠简单高斯正则化项避免了表征坍缩的基于JEPA架构的世界模型。它仅使用两个损失项实现从像素到端到端的训练，并在减倍的计算成本上表现出了有竞争力的控制能力。

## Approach 方法

### Model Architecture 模型架构

LeWM is built upon two components: an encoder and a predictor. The encoder maps a given frame observation $o_t$ into a compact, low-dimensional latent representation $z_t$. The predictor models the environment dynamics in latent space by predicting the embedding of the next frame observation $\hat z_{t+1}$ given the latent embedding $z_t$ and an action $a_t$.

LeWM 基于两个部分搭建：一个编码器和一个预测器。编码器将一个给定的观测帧$\textbf{o}_t$映射为一个紧凑的低维潜在表征$\textbf{z}_t$。预测期通过给定潜在表征$\textbf{z}_t$和一个动作$\textbf{a}_t$预测下一观测帧对应的表征$\hat{\textbf{z}}_{t+1}$来在潜在空间中建模环境的动态变化。

$$
LeWorldModel
\begin{cases}
Encoder: \textbf{z}_t = Enc(\textbf{o}_t) \\
Predictor: \hat {\textbf{z}}_{t+1} = Pred(\textbf{z}_t, \textbf{a}_t)
\end{cases}
$$

### Training Objective 训练目标

The complete LeWM training objective combines a classical prediction loss $\mathcal{L}_{pred}$ with a regularization term:

$$
\mathcal{L}_{LeWM} \triangleq \mathcal{L}_{pred}+\lambda SIG
Reg(\textbf{Z})
$$

The prediction loss $\mathcal{L}_{pred}$ is a standard latent prediction loss. SIGReg is a regularization enforcing a Gaussian distribution of the latent space; we refer to [LeJEPA](https://arxiv.org/abs/2511.08544) for details.

## Planning with LeWM 用LeWM进行规划

LeWM plans purely from pixels, with no proprioceptive (本体感受的) information used at any stage. At test time, LeWM encodes a start and goal image into latent space, then uses the Cross-Entropy Method to optimize an action sequence by rolling out candidates through the predictor and picking those whose final embedding lands closest to the goal. Because each frame is encoded as a single 192-dim token (roughly 200× fewer tokens than DINO-WM), planning completes in about ~1 second versus 47 seconds for DINO-WM, a 48× speedup. We perform ablations on several design choices of LeWM and find that LeWM reaches similar performances while being orders of magnitude (几个数量级) more efficient than DINO-WM.

LeWM完全基于像素进行规划，在任何阶段都不使用本体感受的信息。

在测试期间，LeWM首先将一个起始图片和一个目标图片编码进潜在空间，接着使用交叉熵方法通过预测器展开候选动作序列，并选择表征最接近目标的序列来对动作序列进行优化。

因为每一帧都被编码为了一个简单的192维的词元（大约比DINO-WM少200倍），与DINO-WM的47秒相比，LeWM能够在大约1秒内完成规划，加快了48倍。

我们在几种LeWM的设计选项上进行了消融实验，发现LeWM表现相近的同时比DINO-WM效率高了几个数量级。

### Efficient Planning 高效的规划

Planning performance at a fixed compute budget (FLOPs). LeWM achieves competitive results with a fraction of the computation required by baselines.

在固定计算预算上的规划表现。LeWM依靠比基线模型低几倍的计算量达到了强有力的结果。

| ![[Pasted image 20260331113107.png]] | ![[Pasted image 20260331112256.png]] | ![[Pasted image 20260331112319.png]] |
| ------------------------------------ | ------------------------------------ | ------------------------------------ |

### Planning Results 规划结果

Planning performance across four environments: Two-Room (2D navigation), Reacher (2-joint arm control), Push-T (block manipulation), and OGBench-Cube (3D robotic pick-and-place). LeWM outperforms PLDM on all challenging tasks and surpasses DINO-WM on Push-T and Reacher, even without pre-trained features. On Push-T, LeWM beats DINO-WM even when DINO-WM uses additional proprioceptive inputs. DINO-WM retains an edge on the visually complex 3D OGBench-Cube task, likely due to richer visual priors from large-scale pretraining. LeWM underperforms on Two-Room; we suspect this is due to the intrinsic dimensionality of the task being too low, which may hinder the Gaussian regularizer from producing a well-structured latent space. Additional checkpoints for baselines are available on [Google Drive](https://drive.google.com/drive/folders/1r31os0d4-rR0mdHc7OlY_e5nh3XT4r4e?usp=sharing).

四种环境下的规划表现：Two-Room（2D导航）、Reacher（2关节机械臂控制）、Push-T（块操纵）、OGBench-Cube（3D机器人拾取和放置）。

LeWM甚至在没有预训练特征的情况下在所有挑战性任务中表现均超过了PLDM，在Push-T和Reacher任务中表现超过了DINO-WM。在Push-T任务中，LeWM在DINO-WM使用额外本体感受输入信息的情况下打败了对方。DINO-WM在视觉复杂任务OGBench-Cube中依旧保持领先，这可能是因为来自大规模预训练得到的丰富的视觉优势。

LeWM在Two-Room任务中表现较差；我们认为这是由于这个任务的隐藏维度太低了，导致高斯正则化项没能产生一个良好结构化的潜在空间。

额外的基线检查点数据在[谷歌云盘](https://drive.google.com/drive/folders/1r31os0d4-rR0mdHc7OlY_e5nh3XT4r4e?usp=sharing)中可用。

| Two-Room                                                                       | Reacher                                                                        | Push-T                                                                     | OGBench Cube                                                              |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| ![](https://le-wm.github.io/static/videos/planning/tworoom/tworoom_3_half.gif) | ![](https://le-wm.github.io/static/videos/planning/reacher/reacher_1_half.gif) | ![](https://le-wm.github.io/static/videos/planning/pusht/pusht_1_half.gif) | ![](https://le-wm.github.io/static/videos/planning/cube/cube_1_half.gif)  |
| ![](https://le-wm.github.io/static/images/planning/ctrl-two-room.png)          | ![](https://le-wm.github.io/static/images/planning/ctrl-reacher.png)           | ![](https://le-wm.github.io/static/images/planning/ctrl-push-t.png)        | ![](https://le-wm.github.io/static/images/planning/ctrl-ogbench-cube.png) |

Additional qualitative rollouts for each environment are shown below, including both success and failure cases. Each clip shows two frames side by side: **left** is the planning rollout and **right** is the visual goal.

每个环境其他的量化数据展示如下，包括每个成功和失败案例。每一个切片并排展示了两个帧：左侧是规划结果，右侧是视觉目标。

|              | Success                                                                        | Success                                                                        | Failure                                                                             |
| ------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Two-Room     | ![](https://le-wm.github.io/static/videos/planning/tworoom/tworoom_2_half.gif) | ![](https://le-wm.github.io/static/videos/planning/tworoom/tworoom_3_half.gif) | ![](https://le-wm.github.io/static/videos/planning/tworoom/tworoom_1_fail_half.gif) |
| Reacher      | ![](https://le-wm.github.io/static/videos/planning/reacher/reacher_1_half.gif) | ![](https://le-wm.github.io/static/videos/planning/reacher/reacher_3_half.gif) | ![](https://le-wm.github.io/static/videos/planning/reacher/reacher_fail_half.gif)   |
| Push-T       | ![](https://le-wm.github.io/static/videos/planning/pusht/pusht_1_half.gif)     | ![](https://le-wm.github.io/static/videos/planning/pusht/pusht_2_half.gif)     | ![](https://le-wm.github.io/static/videos/planning/pusht/pusht_3_fail_half.gif)     |
| OGBench-Cube | ![](https://le-wm.github.io/static/videos/planning/cube/cube_2_half.gif)       | ![](https://le-wm.github.io/static/videos/planning/cube/cube_4_half.gif)       | ![](https://le-wm.github.io/static/videos/planning/cube/cube_5_half.gif)            |

## Evaluating Physical Understanding

## Citation