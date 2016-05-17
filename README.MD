# zhihu

> A React project fro zhihu-daily(http://daily.zhihu.com)

## Build Setup
```
npm run dev
```

## component hierarchy
```
HomePage
  ├─Header
  ├─Slider
  │  └─SliderItem*
  └─StoryCollection
     └─StoryList*
        ├─StoryHeader
        └─StoryItem

StoryPage
  ├─Header
  └─Story

CommentPage
  └─CommentList*
     ├─CommentHeader
     └─CommentItem*

```
