<div>
  <label>我是要超出隐藏的很长很长长很长长很长长很长长很长长很长的内容</label>
  <a>查看详情</a>
</div>



span{
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
a{
  font-size: 12px;
  color: royalblue;
  cursor: pointer;
  white-space: nowrap;
  &:hover{
    text-decoration: underline;
  }
}