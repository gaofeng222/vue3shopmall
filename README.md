# 启动项目

1. npm install
2. npm run dev

# 接口说明

## 获取列表

```javascript
axios.get("/list");
```

## 删除

```javascript
axios.delete(`/del/${id}`);
```

## 编辑

```javascript
axios.patch(`/edit/${id}`, {
  name: "姓名",
  place: "籍贯",
});
```

## 配置浏览器调试 pinia 工具的插件

插件网站

- https://chrome.zzzmh.cn/info/nhdogjmejiglipccpnnnanhbledajbpd
