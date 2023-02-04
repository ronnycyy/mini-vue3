# 背景

笔者最近工作用到`vue3`，本着`将技术吃透`的理念，笔者买了很多 `vue` 相关的书籍来阅读，也去读了 `vue3` 的源码。但是最后发现一个问题：整个过程只是在`被动学习`，没有`主动地知识输出`，这样学习的效果是比较差的，知识很容易遗忘。


一次偶然的机会，笔者在 `B站` 遇到了 [阿崔cxr](https://github.com/cuixiaorui)，了解了他的 `mini-vue3` 课程后，大为触动。课程介绍里的`「学习vue3源码的最好方式就是自己实现一次」`这句话说得太对了，于是笔者购买了他的课程，沉淀了每一集的内容，经过独立思考后输出了一个自己的 [mini-vue3](https://github.com/ronnycyy/mini-vue3) 库，并将实现过程`输出`成`心得`记录下来，收录到自己的掘金专栏 [Vue3 核心原理与应用实践](https://juejin.cn/column/7183261591398268988)中。

这样的学习过程有了大量的`自我思考`，知识会更加牢固。

另一个好处是，当不可避免地出现`知识遗忘`的时候，有这个`专栏/项目`提供`复习资料`，读一遍`专栏文章`，看一看`项目代码`，就能回想起自己的`心路历程`，这有利于建立`长期记忆`。


# 开发须知

本项目提交的 `commit message` 需满足 `Angular` 的 `Commit message` 格式，这样更利于维护项目。

笔者通过一个`交互式界面`来格式化生成 `commit message`，满足提交规范。

这需要安装 `Commitizen` 这个库，`Commitizen` 是一个撰写合格 `Commit message` 的工具。


#### 安装

```shell
npm install -g commitizen
```

#### 启动

通过下面的命令使项目支持 `Angular` 的 `Commit message` 格式。

```shell
commitizen init cz-conventional-changelog --yarn --dev --exact
```

#### 用法

接下来，提交时要用 `git cz` 替换掉 `git commit`，执行 `git cz` 后会出现 `1` 个`交互式界面`，根据`界面提示`操作即可。


# Angular Commit Message 格式

参考`阮一峰老师`的博文 [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)


## commit message 格式

每次提交，`Commit message` 格式为:

```txt
<type>(<scope>): <subject>
```

### type

其中，`type` 用于说明 `commit` 的类别，只允许使用下面的标识:

```txt
feat：新功能（feature）
fix：修补bug
docs：文档变动（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：测试文件的修改
build：对构建系统文件或脚本的更改，如 npm, yarn, gulp 等
ci: 对 CI 配置文件或脚本的更改，如 Travis, Circle, BrowserStack, SauceLabs 等
revert: 回退上一次 commit
perf: 提升性能的代码更改 (performance)
chore：构建过程或辅助工具的变动
```

### scope

`scope` 用于说明 `commit` 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。


### subject

`subject` 是 `commit` 目的的简短描述，不超过 `50` 个字符。


## 示例

### 文档变动

```txt
docs(*): add api.md
```

这次`commit` 的类型是`文档变动`，影响范围是`整个项目`，添加了 `1` 份 `api.md` 文档。


### 变更构建系统的文件或脚本

```txt
build(yarn): 增加 yarn 配置文件
```
这次`commit` 的类型是`对构建系统文件或脚本的更改`，影响范围是`yarn`，做的事情是增加了 `yarn` 配置文件。
