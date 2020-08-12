# :monkey_face: rblogx

这是点子有点烂大街的项目。它基于 [Next.js](https://nextjs.org/) 实现，整体样式完全参照于锤子便签

说点子烂大街是因为基于不同编程语言，核心功能一样，用的最多也比较有代表的已经有基于 Node.js 的 [Hexo](https://hexo.io) 基于 Ruby 的 [Jekyll](https://jekyllrb.com/) 基于 Go 的 [Hugo](https://gohugo.io/) ...

这个项目和它们的核心实现有一些不一样，这个项目是使用 React.js 来做页面渲染的，并且基于 Next.js 的 Static HTML export 功能做静态页面导出

项目的功能很核心，没有像它们那样有丰富的功能和扩展，它的出现完全是我自己想要一个自己的博客

## 为什么会有这个项目

+ 我觉得静态博客的点子很棒，不需要数据库，任意一家云服务器厂商的最低配置就可以毫无压力的部署使用

+ 我觉得用 Markdown 写文章很酷，文章即数据，数据即文件，博客的核心数据是 Markdown 文件里的文本，而不是在数据库里被富文本编辑器处理过的字符串。你甚至不用做任何事或者只进行少量修改，就可以直接把你的 Markdown 文章迁移在印象笔记，有道笔记等笔记软件或者类似简书这样的网站

+ 我觉得富文本编辑器可以解决较为复杂的文本编辑需要，却无法给你带来纯字符编辑的乐趣

+ 考虑实现的技术和自己想要的功能契合的刚刚好，既不复杂，也不简陋

+ 我想要一个简单好看完全自己把控，知晓每一个细节，完全由自己一手打造的博客，如果只是基于人家的东西创建或者修改主题，那多没意思，况且自己略懂前端，为什么不自己动手

+ 我想只用 JavaScript 这一种语言实现我的博客，并且我喜欢 React.js 我想用它来组织和渲染我的页面，而不是类似 Hexo 使用的 ejs 或者 Jade/Pug 等插件来用动态页面的技术渲染页面最终再生成静态页面

+ 我想要了解 Next.js

## 贡献

希望大家能够喜欢并且使用，但是不接受 pull request 如果你对该项目感兴趣并且有任何新的想法请随意修改 

## 环境

推荐 Node.js v10.13 以上

使用现代浏览器，如 Chrome Firefox Safari 最次怎么也得用 Edge 吧

## 简述

该博客项目分为 PC 端和移动端的 Web 两个独立的 Next.js 项目，但是共用一套博客数据，两端可以分别开发，部署和导出

`next-project/pc` 为 PC 端的项目

`next-project/mobile` 为移动端的 Web 项目

## 使用规则

在项目根目录下的 `_post` 目录为所有文章存档的目录，所有文章必须用 .md 结尾，使用标准 Markdown 语法进行编写，因为使用了 [gray-matter](https://www.npmjs.com/package/gray-matter) 解析，所以必须在文章顶部添加数据的元信息，包含标题，时间和分类

**请务必严格遵守规则**，例如

```
---
title: '如何写一篇文章'
date: '2020-08-12'
category: '例子'
---

# hello markdown
```

## Markdown

支持主流 Markdown 语法，其中对一些语法的表现做出了修改

+ 其中 h3 h4 h5 h6 标题表现一致

+ 有序列表和无序列表表现一致

+ 分割线没有任何效果

+ 不支持流程图

+ 不支持甘特图

+ 如果需要加空行，可以使用 `&emsp;`

+ 支持数学公式，使用参考 [remark-math](https://github.com/Rokt33r/remark-math) 和 [react-katex](https://github.com/talyssonoc/react-katex)

当然，如果你愿意可以自己添加和修改 Markdown 的渲染

### 关于渲染

渲染 Markdown 使用了 `react-markdown` 如果要修改 Markdown 的渲染，请参考阅读[官方文档](https://github.com/rexxars/react-markdown)

### 关于展示代码块

Markdown 中展示代码块用了 `react-syntax-highlighter` 同样，如果想要修改，请参考阅读[官方文档](https://github.com/conorhastings/react-syntax-highlighter)

其中对编程语言支持的语法高亮列表请参考[这里](https://github.com/conorhastings/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD)

举个例子，如果要展示 js 的代码，那么在列表中查询到 js 的完整名称为 `javascript` ，那么 Markdown 语法应该这样写：

\```javascript

console.log('Hello world');

\```

## 使用方法

在项目根目录下 `_posts` 编写完自己的文章以后，需要执行命令来进行开发调试和部署

命令使用和 `next.js` 规则一致，在进行 `next start` 命令之前必须要先执行 `next build` 命令，但是其中开发和部署需要的端口号请在 `package.json` 里进行修改

下面举例桌面端的命令，移动端类似，只要把下面命令的 `-pc` 修改为 `-mobile` 即可

```
npm run dev-pc # 开发调试桌面端
npm run build-pc # 构建生成桌面端的 .next 文件夹
npm run start-pc # 部署桌面端
npm run service-pc # 构建完桌面端以后执行 next start 命令部署开发环境
npm run deploy-pc # 使用 pm2 以守护进程的方式启动 `next start`
```

## 注意事项

在使用开发和调试的时候，刷新功能会导致 `404` 如果要测试自定义 `404` 页面或者错误页面，请先执行 `next build` 再进行 `next start` 进行测试

## 部署

因为使用 next.js 框架，所以部署方式有很多种

因为此项目有桌面端和移动端，如果想实现客户端访问同一个地址，服务器端可以自动判断设备类型进行不同项目的访问，这里举一个基于 nginx 反向代理来实现的例子

桌面端通过 `next start` 运行以后的地址为: `http://localhost:3000`

移动端通过 `next start` 运行以后的地址为: `http://localhost:3001`

那么 nginx 的配置文件可以这样编写

```
server {
  listen 80;
  server_name blog.rback.fun;
  set $mobile no;

  if ($http_user_agent ~* "(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|mobile|nokia|iphone|ipad|android|samsung|htc|blackberry|Android|iPhone|Windows Phone|UC|Kindle|MicroMessenger|micromessenger|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino") {
    set $mobile yes;
  }

  if ($http_user_agent ~* "^(1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-)") {
    set $mobile yes;
  }

  location / {
    if ($mobile = no) {
      proxy_pass http://localhost:3000;
    }

    if ($mobile = yes) {
      proxy_pass http://localhost:3001;
    }
  }
}
```

