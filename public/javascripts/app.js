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
   console.log("haha" + $scope.formpregunta);
   console.log("haha" + $scope.formcorrecta);
   console.log("haha" + $scope.formexplicacio);
   var Indata = {'pregunta': $scope.formpregunta, 'respuestaa': $scope.formrespuestaa , 'respuestab': $scope.formrespuestab , 'respuestac': $scope.formrespuestac, 'correcta': $scope.formcorrecta, 'explicacio' :$scope.formexplicacio };
   $http.post('/api/v1/preguntas', Indata )
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
