```
<div class="wrap">
  <label>我是要超出隐藏的很长很长长很长长很长长很长长很长长很长的内容</label>
  <a>查看详情</a>
</div>

```

```
.wrap{
  width: 100%;
  display: flex;
}
label {
  /* width: 100%; */
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
}

a {
  font-size: 12px;
  color: royalblue;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 1;
}

a:hover {
  text-decoration: underline;
}
```
