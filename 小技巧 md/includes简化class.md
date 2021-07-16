前：
:class="{ 
  'classOnlyOnThesePages' : 
  $route.name === 'Home'
  || $route.name === 'Gallery' 
  || $route.name === 'Profile'
}"



后：
:class="{ 
  'classOnlyOnThesePages' : 
  ['Home', 'Gallery', 'Profile'].includes($route.name)
}"