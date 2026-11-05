# Git 提交口诀（忘了就看这里）

## 四步，每天都要用

```bash
git status                          # ① 看：我到底改了什么
git add .                           # ② 加：把改动放进待提交区
git commit -m "这次改了什么"          # ③ 存：打成一个版本快照
git push                            # ④ 传：推到 GitHub
```

口诀：**看 → 加 → 存 → 传**

---

## 第一步 `git status` 怎么看

红色一类是"改了但没加"：
```
Changes not staged for commit:
	modified:   index.html
```

"Untracked" 是新建的、git 还不认识的文件：
```
Untracked files:
	docs/
```

- 看到这两类 → 正常，接着 `git add .`
- 看到 `nothing to commit, working tree clean` → 说明没改动，不用提交
- 看到 `Your branch is up to date` → 说明本地和 GitHub 一致

## 每一步的正常输出

| 命令 | 成功时你会看到 |
|---|---|
| `git status` | 一堆状态说明（正常） |
| `git add .` | **什么都不输出**（正常，不是失败） |
| `git commit -m "..."` | `[main 3f2a1b9] 这次改了什么` + `1 file changed` |
| `git push` | `To github.com:...` + `main -> main` |

## commit message 怎么写

写"**做了什么**"，不写"改了一下"、"更新"：

- ✅ `v0.1 Day1：投递记录数据模型与录入表单`
- ✅ `修复 channel 缺 name 属性导致取值 undefined`
- ❌ `update`
- ❌ `修改`

为什么较真：三个月后你回头看历史，只有写清楚了的 commit 才救得了你。

---

## 会丢东西的操作（别碰）

| 操作 | 后果 |
|---|---|
| VS Code 里点 **Discard Changes** | 未提交的修改**直接消失**，找不回来 |
| `git reset --hard` | 未提交的修改消失，可能连提交也丢 |
| `git checkout -- .` | 同上，放弃所有未提交改动 |

**没提交的改动，git 保护不了你。** 所以每天收工前必须 commit + push。

## 出事了怎么办

| 症状 | 处理 |
|---|---|
| 想知道自己改了什么 | `git diff` |
| 提交信息写错了 | `git commit --amend -m "新的信息"`（只在没 push 时用） |
| 推不上去，说 behind | 先 `git pull`，再 `git push` |
| 不确定现在什么状态 | `git status` + `git log --oneline -5`，然后把输出贴给小栈 |
