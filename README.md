# 云锻开源官网

这是一个参考苹果中国官网设计风格的云锻开源官网项目。项目采用HTML、CSS和JavaScript技术栈构建，具有现代化的UI设计和响应式布局。

## 项目结构

```
├── css/
│   ├── reset.css      # 重置样式
│   ├── style.css      # 主样式文件
│   └── responsive.css # 响应式样式
├── images/
│   ├── product-engine.jpg    # 产品图片
│   ├── product-toolchain.jpg # 产品图片
│   └── product-platform.jpg  # 产品图片
├── js/
│   └── main.js        # 主JavaScript文件
├── index.html         # 主页面
└── README.md          # 项目说明文档
```

## 特点

- **现代化设计**：参考苹果官网的简洁大气设计风格
- **响应式布局**：适配各种设备尺寸，从手机到桌面设备
- **交互动画**：包含滚动动画、导航栏效果等交互元素
- **模块化结构**：代码组织清晰，易于维护和扩展

## 使用方法

1. 直接在浏览器中打开`index.html`文件即可查看网站
2. 也可以使用任意HTTP服务器托管项目文件夹

## 自定义修改

### 修改内容

- 编辑`index.html`文件中的文本内容和链接
- 替换`images/`文件夹中的图片资源
- 根据需要调整`css/style.css`中的样式

### 修改颜色主题

在`css/style.css`文件中，可以修改`:root`选择器中的CSS变量来更改网站的主题颜色：

```css
:root {
    --primary-color: #0071e3; /* 主色调 */
    --secondary-color: #1d1d1f; /* 次要色调 */
    --light-color: #f5f5f7; /* 浅色背景 */
    /* 其他颜色变量... */
}
```

## 扩展建议

- 添加更多页面，如产品详情页、关于我们、联系方式等
- 集成表单提交功能，用于收集用户反馈
- 添加多语言支持
- 集成实际的开源项目展示和下载链接

## 浏览器兼容性

网站兼容所有现代浏览器，包括：

- Chrome
- Firefox
- Safari
- Edge

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。