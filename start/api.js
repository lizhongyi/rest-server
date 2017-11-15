const Route = use('Route')

//不需要登录
Route.group(() => {

  Route.get('index', 'Api/SiteController.index')
  Route.post('login', 'Api/SiteController.login')
  
}).prefix('api').middleware([
  'authenticator:jwt'
])

//需要登录
Route.group(() => {

  Route.post('upload', 'Api/SiteController.upload')

  Route.resource(':resource', 'Api/ResourceController')

}).prefix('api').middleware([
  // 'auth:jwt',
  'resource'
])

