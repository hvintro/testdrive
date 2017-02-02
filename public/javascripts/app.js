angular.module('nodeTodo', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.todoData = {};
  // Get all todos
  $http.get('/api/v1/preguntas')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });

  $scope.createPregunta = () => {
   $http.post('/api/v1/preguntas', $scope.formData)
   .success((data) => {
     $scope.formData = {};
     $scope.todoData = data;
     console.log(data);
   })
   .error((error) => {
     console.log('Error: ' + error);
   });
 };

 $scope.createTodo = () => {
   $http.post('/api/v1/todos', $scope.formData)
   .success((data) => {
     $scope.formData = {};
     $scope.todoData = data;
     console.log(data);
   })
   .error((error) => {
     console.log('Error: ' + error);
   });
 };

});
