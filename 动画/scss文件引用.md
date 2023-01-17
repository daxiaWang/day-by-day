1.npm install sass -g
2.
sass --watch test.scss:test.css    监听单文件
sass --watch app/scss:publish/stylesheets    监听目录
sass test.scss test.css    转换单文件
3.在html中通过link正常引入css文件即可
