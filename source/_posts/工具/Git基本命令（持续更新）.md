---
title: Git基本命令（持续更新）
author: Cynthia
categories:
  - 工具
  - 前端工具
tags: []
date: 2019-04-30 10:44:35
---

🐰
...
<!--more-->

> [Git 手册](https://git-scm.com/book/zh/v2)

## VSCode Git 操作

- [操作面板中英文对照](https://raw.githubusercontent.com/chen1440731632/images/master/img/20190328093418.png)



### Vim命令

- [vi-vim ：删除、撤销、恢复删除、复制删除](https://www.cnblogs.com/zknublx/p/8795789.html)







## Git flow

### 不同的模式

Git flow有很多，从简单到复杂，没有绝对的标准，选择适合自己的就好：

- 如果整个项目只有你一个人，在一个master分支上玩就可以
- 如果项目有多人合作，且master分支总是可以跟线上环境吻合，使用master分支+branches开发。
- 如果项目有多人合作，并且master分支并不一定跟线上环境吻合，使用master分支+production分支+branches开发。





### 方案二

> https://www.cnblogs.com/windchen/p/6290685.html

1. 主代码在master分支上
2. 要对代码做的任何一个改动，无论是开发功能，修复bug，均从master分支开新的branch
3. 代码完成，发pull/merge request，如果有CI，此时会跑test脚本，通过之后，reviewers会来评审你的代码，期间可能需要你再对code做一些修改
4. 完成之后，代码被合并至master分支，如果有CI，会自动部署到stage（QA）环境

#### 创建分支

```shell
# 在实际多人合作开发过程中，无论是开发功能或者修复bug
# 均需先获取远程master分支最新代码，再创建branch
$ git checkout master
$ git pull origin master
$ git checkout -b [branch-name]

# 首先 git add，避免新添加的文件无法加入储藏
$ git add

# 将暂存区中的文件提交到本地版本库
$ git commit -m "修改消息....."

# 将分支推送到远程仓库
$ git push origin [branch-name]
```



#### 合并分支

> [为什么要使用git pull --rebase？](https://www.jianshu.com/p/dc367c8dca8e)

```shell
# 此时这个branch的代码还不在master分支中，在提交merge request之前
# 要先合并master分支的最新代码到当前分支，避免merge失败
$ git pull --rebase origin master

# (如果遇到错误提示，则打开冲突的文件，修改冲突)

# 所有冲突的文件调整好之后，提交到暂存区
$ git add .

# 执行下面命令，合并冲突
$ git rebase --continue

# 再push到远程
$ git push
```



#### 建立pull/merge request 







## Git 基本命令

### 待整理

- git add [file-name] 将文件放入暂存区
- git add . 将所有文件放入暂存区
- git status 查看工作区和暂存区状况
- git commit -m "message" [file-name] 提交文件到版本库
- git commit -m "message" 提交所有暂存区中的文件到版本库
- git push origin [branch-name] 将当前分支推到远端分支
- git pull --rebase origin master 将远端master的修改更新到本地当前分支
- git diff [file-name] 比较工作区文件与暂存区/版本库的差别
- git checkout [file-name] 忽略文件当前工作区的修改，如果暂存区有该文件的修改，则回到暂存区的版本，否则回到版本库的版本
- git rm [file-name] 删除文件
- git log 查看版本库提交历史
- git reset --hard [commit-id] 将代码回退到某一次commit，丢弃所有更改。另外HEAD代表当前版本，HEAD^表示上一次commit，HEAD^^表示上上次，以此类推，当然，还有这种表示方法：HEAD~10
- git reset --soft [commit-id] 取消commit记录，但保留代码修改。这个在从feature branch上merge回master的时候非常有用，通常开发一个feature会有多次commit，如果不经过处理直接marge到master，commit也会一并marge进去，导致master分支的commit太多不容易阅读和维护。最好是在push到origin的时候，先将commit清空，仅保留一个描述当前功能的commit
- git tag 查看所有标签
- git tag -a [tag-name] -m "message" 给当前最新一次commit打标签，并给标签添加说明
- git tag -a [tag-name] -m "message" [commit-id] 给某一个commit打标签，并添加说明
- git push origin [tag-name] 将本地标签推到远程
- git push origin --tags 将本地未推送的标签批量推到远程
- git tag -d [tag-name] 删除标签
- git push origin :refs/tags/[tag-name] 删除远程标签
- git branch 查看本地分支
- git branch -a 查看远程分支
- git branch -d [branch-name] 删除本地分支
- git branch -d -r origin/[branch-name] 删除远程分支 推荐用下面的方法
- git push origin :[branch-name] 删除远程分支
- git branch |grep 'bran'|xargs git branch -d 批量删除以bran开头的本地分支
- git branch -a |  grep 'bran' | sed 's/remotes\///' | xargs git branch -d -r 批量删除以bran开头的远程分支
- git check-ignore -v [file] 检查文件是被哪条规则ignore

### 邮箱和用户名

```shell
# 查看用户名和邮箱地址：
$ git config user.name
$ git config user.email

# 修改用户名和邮箱地址
$  git config --global user.name  "xxxx"
$  git config --global user.email  "xxxx"
```



### 提交代码三大基本命令

```shell
## 提交代码
git add .
git commit -m "说明"
git push
```



查看操作

#### 查看远程库的信息 
> 当你从远程仓库克隆时，实际上Git自动把本地的`master`分支和远程的`master`分支对应起来了，并且，远程仓库的默认名称是`origin`。
>

要查看远程库的信息，用`git remote`：

```shell
$ git remote
origin
```

或者，用`git remote -v`显示更详细的信息：

```shell
$ git remote -v
origin  git@github.com:michaelliao/learngit.git (fetch)
origin  git@github.com:michaelliao/learngit.git (push)
```

上面显示了可以抓取和推送的`origin`的地址。**如果没有推送权限，就看不到push的地址。**

分支

#### 基本操作

```shell
## 创建dev分支并切换到dev分支
$ git checkout -b dev

## git checkout命令加上-b参数表示创建并切换，相当于以下两条命令

# 创建分支
$ git branch dev
# 切换分支
$ git checkout dev
# 查看分支
git branch 
```

#### 查看分支

```shell
# 查看分支
$ git branch 

# 查看指明最新提交信息的分支列表
$ git branch -v

# 查看已合并至当前分支的所有分支
$ git branch --merged
# 查看未合并至当前分支的所有分支
$ git branch --no-merged
```



#### 远程分支

> 分支都是存在本地的，即本地分支，还需要了解远程分支，如[remote]/[branch]这种形式，表示是远端主机的某分支 
>
> 这两类分支之间应该有某种关系将他们关联起来 ，当我们从一个远程分支切出（创建）一个本地分支时，这个分支就叫跟踪分支（tracking branch）,而远程分支叫上游分支（upstream branch） 
```shell
# 创建跟踪分支指令如下：
$ git checkout -b 本地分支名 远端主机别名/远程分支名1

# 当然也可以不指定分支名，使用远程分支同名：
$ git checkout --track 远端主机别名/远程分支名

# 从远程分支（下面指远程主机origin上的develop分支），切出新的本地分支 test分支
$ git checkout -b test origin/develop
```





#### 合并分支

- 基本操作：

  ```shell
  # 切换到当前分支
  $ git checkout master
  
  # 选择需要合并的分支（dev就是分支的name）
  $ git merge dev
  ```

- 分支管理策略

  > 通常，合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。
  >
  > 如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。
  >
  > 合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。 

  ```shell
  # 切换到当前分支
  $ git checkout master
  
  # 准备合并dev分支，请注意--no-ff参数，表示禁用Fast forward
  # 因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去。
  $ git merge --no-ff -m "merge with no-ff" dev
  
  # 合并后，可以用git log查看分支历史
  $ git log
  ```

  

#### **解决合并分支的冲突**

- 如果合并分支遇到冲突

```shell
$ git status 
# 查看冲突的文件
```

- 然后，修改当前文件重新add和commit（之后保存vscode会弹出相关操作）
- 最后再重新合并即可



#### 删除分支

```shell
# 合并完成后可选择删除分支
$ git branch -d dev

# 强制删除未合并的分支
$ git branch -D <name>
```



stash 命令



### git stash

> git stash 用于保存和恢复工作进度。 
>
> [廖雪峰教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137602359178794d966923e5c4134bc8bf98dfb03aea3000) (该教程是简单的指令)
>
> [git stash详解](https://blog.csdn.net/stone_yw/article/details/80795669)

#### 应用场景

- 当正在dev分支上开发某个项目，这时项目中出现一个**bug**，需要**紧急修复**，但是正在开发的内容只是完成一半，还不想提交，这时可以用git stash命令将修改的内容保存至堆栈区，然后顺利切换到hotfix分支进行bug修复，修复完成后，再次切回到dev分支，从堆栈中恢复刚刚保存的内容。 
- 由于疏忽，本应该在dev分支开发的内容，却在master上进行了开发，需要重新切回到dev分支上进行开发，可以用git stash将内容保存至堆栈中，切回到dev分支后，再次恢复内容即可。 



总的来说，git stash命令的作用就是：

将目前还不想提交的但是已经修改的内容进行保存至堆栈中，后续可以在某个分支上恢复出堆栈中的内容。

这也就是说，stash中的内容不仅仅可以恢复到原先开发的分支，也可以恢复到其他任意指定的分支上。

git stash作用的范围包括工作区和暂存区中的内容，也就是说没有提交的内容都会保存至堆栈中。



**简易版操作：**

```shell
# 保存当前工作进度（save 描述可以省略）
$ git stash save '描述'

# 查看暂存区中的内容
$ git stash list

# 恢复暂存区中的内容
$ git stash apply

# 恢复并删除暂存区中的内容
$ git stash pop
```

**具体版操作：**

```shell
# 保存当前的工作进度。会分别对暂存区和工作区的状态进行保存。
$ git stash save "说明...."

# 显示进度列表。此命令显然暗示了git stash 可以多次保存工作进度，并用在恢复时候选择。
$ git stash list

# 删除某个队列
$ git stash drop stash@{0}  		这是删除第一个队列

# 清空所有队列
$ git stash clear

# 指定恢复某一个具体进度。如果 --index 没有这个参数，默认恢复最新进度
# 恢复完毕会从进度列表中删除<stash>。    
$ git stash pop --index stash@{0}

# 除了不删除恢复的进度之外，其余和git stash pop 命令一样。
$ git stash apply --index stash@{0}
```

**未整理的运用场景：**

- [解决突发情况](https://blog.csdn.net/qq_32452623/article/details/76100140)
- [git merge git pull 时候遇到冲突解决办法](https://www.bbsmax.com/A/nAJv9jAnzr/)



标签管理

> [为什么要使用标签](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013762144381812a168659b3dd4610b4229d81de5056cc000)

[暂时还来不及看](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013762144381812a168659b3dd4610b4229d81de5056cc000)



### git branch





### git checkout 

#### 切换并创建分支

```shell
git checkout -b <new_branch> <start point> 
```





### git rebase

待看：

- [这一次彻底搞懂 Git Rebase](https://www.jianshu.com/p/4079284dd970)



相关应用：

- [git 合并多个commit](https://www.cnblogs.com/kingBook/p/8855331.html)
- [(Git)合并多个commit](https://segmentfault.com/a/1190000007748862)



### git merge

>  [git merge合并代码时各参数含义](https://blog.csdn.net/feeltouch/article/details/80920499)

#### --squash

[git merge –squash介绍](https://www.cnblogs.com/lookphp/p/5799533.html)

建议：合并分支的时候使用（不会合并分支上的提交历史）

```shell
# 判断是否使用--squash选项最根本的标准是，待合并分支上的历史是否有意义
$ git merge --squash dev
$ git commit -m "message here"
```



#### --abort 

取消本次合并操作

```shell
git merge --abort dev
```



#### --no-ff

> 不使用fast-forward方式合并，保留分支的commit历史 

fast-forward 方式：当条件允许的时候，git直接把HEAD指针指向合并分支的头，完成合并。属于“快进方式”，不过这种情况如果删除分支，则会丢失分支信息。因为在这个过程中没有创建commit 

```shell
git merge --no-ff dev
```

- [Git：git-merge的--ff和--no-ff](https://blog.csdn.net/chaiyu2002/article/details/81020370)
- 





## 多人协作

### 基本操作

> [廖雪峰教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013760174128707b935b0be6fc4fc6ace66c4f15618f8d000)

- 从远程库clone时，默认情况下，只能看到本地的`master`分支。可以用`git branch`命令查看：

  ```shell
  $ git branch
  * master
  ```

- 要在`dev`分支上开发，就必须 **创建远程`origin`的`dev`分支到本地** 

**总结：**

因此，多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

**小结**

- 查看远程库信息，使用`git remote -v`；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。



### 常见问题

- [为什么要先commit，然后pull，最后再push？而不是commit然后直接push？](https://segmentfault.com/q/1010000009549291)

## git 忽略提交文件

[百度](https://www.baidu.com/s?wd=gitignore&rsv_spt=1&rsv_iqid=0xaba6af910000c9f0&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=93380420_hao_pg&rsv_enter=1&rsv_sug3=5&rsv_sug1=5&rsv_sug7=101&rsv_t=bfc5YSjr26wItXmAOWWr83hx%2F2Q14%2FM19Gj28UT7Ao%2BSCM%2F8xGC1KvdVdz3h4r2E615KYTw1&sug=gitignore&rsv_n=1)

常用的规则：

- /mtk/ 过滤整个文件夹
- *.zip 过滤所有.zip文件
- /mtk/do.c 过滤某个具体文件



[删除并忽略已远程提交的文件](https://blog.csdn.net/s740556472/article/details/82825434)

## git 常用场景



### 未整理

- [git stash详解](https://blog.csdn.net/stone_yw/article/details/80795669)

### 撤销已经push的commit

[Git撤销已经推送(push)至远端仓库的提交(commit)信息](https://blog.csdn.net/hanchao5272/article/details/79435730)

- 查看提交信息，获取需要回退至的版本号

  ```shell
  $ git log
  ```

- 重置至指定版本的提交，达到撤销提交的目的

  参数 `soft` 指的是：保留当前工作区，以便重新提交 

  还可以选择参数 `hard`，会撤销相应工作区的修改，一定要谨慎使用

    ```shell
  $ git reset --soft <commit的版本号>
    ```

- 确认是否成功撤销

    ```shell
    $git log
    ```

- 强制提交当前版本号

  必须添加参数 `force` 进行强制提交，否则会提交失败，并报错

    ```shell
  $ git push origin  master --force
    ```

- 最后将代码重新提交和推送

  ```shell
  $ git add .
  $ git commit -m "最新提交的内容"
  $ git push origin master
  ```



### 合并分支的commit

#### 只合并一个commit

- 找出要合并的commit ID :

  ```js
  // 例如
  0128660c08e325d410cb845616af355c0c19c6fe
  ```

  

- 然后切换到B分支上

  ```shell
  $ git checkout B
  $ git cherry-pick  0128660c08e325d410cb845616af355c0c19c6fe
  ```

  

然后就将A分支的某个commit合并到了B分支了



#### 合并连续的多个commit

> 比如在**develop**分支上有7c32be61到54dfef55的连续的10个commit，54dfef55是后面的提交。
>
> 现在要将这10个commit 合并到**develop-hbb**分支上

- 首先基于**develop**分支创建一个临时分支**temp**，并指明新分支的最后一个commit

    ```shell
    git checkout -b temp 54dfef55 
    ```

- 将**temp**分支上的从7c32be61到最后一个commit，也就是54dfef55的commit合并到**develop-hbb**上

    ```shell
    git rebase --onto develop-hbb 7c32be61^
    ```

 




## checkout 命令

### 常用指令

```shell
# 省略commit：用暂存区的文件覆盖工作区的文件。
# 加上commit：用指定提交中的文件覆盖暂存区和工作区中的文件。如例1
$ git checkout 某次commit的hash值
```



### 1. clone 指定历史版本的源码

在 git bash 中执行以下命令

```shell
git clone http://xxx/xx.git
git checkout 4c9acfd867e69297e84887f245dc1b953593dc61
```

### 2. 用暂存区的文件覆盖工作区中的文件 

> 相当于撤销自上次执行git add filename以来（如果执行过）的本地修改。 

```shell
# 撤销某个文件本地的修改（相对于暂存区）
$ git checkout -- filename

# 撤销所有本地的修改（相对于暂存区）【谨慎使用】
$ git checkout -- . / git checkout .
```



x

## reset 命令

### 常用指令

```shell
# 将之前用git add命令更新到暂存区的内容 撤出暂存区（工作区不会受到影响）
$ git reset / git reset HEAD

# 仅将文件filename 的改动撤出暂存区，暂存区中其他文件不改变。
$ git reset -- filename / git reset HEAD filename

# 工作区和暂存区不改变，但是引用向前回退一次。
# 当对最新的提交说明或者提交的更改不满意时，撤销最新的提交以便重新提交。
$ git reset --soft HEAD^

# 工作区不改变，但是暂存区会回退到上一次提交之前，引用也会回退一次。
$ git reset HEAD^ / git reset --mixed HEAD^

# 彻底撤销最近的提交。引用回退到前一次，而且工作区和暂存区都会回退到上一次提交的状态。
# 自上一次以来的提交全部丢失。【谨慎使用】
$ git reset --hard HEAD^
```

### 1. 撤销最新的提交以便重新提交

> 工作区和暂存区不改变，但是引用向前回退一次

```shell
$ git reset --soft HEAD^
```





1. 树状图双击错误提示bug
2. prop的值动态跟随参数改变
3. 板块模块，收起功能报错bug

