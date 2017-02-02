angular.module('nodeTodo', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.todoData = {};
  $scope.formpregunta = {};
  $scope.formrespuestaa = {};
  $scope.formrespuestab = {};
  $scope.formrespuestac = {};
  $scope.formcorrecta = {};
  $scope.formexplicacio = {};

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
   var Indata = $.param({'pregunta': $scope.formpregunta, 'respuestaa': $scope.formrespuestaa ,
   'respuestab': $scope.formrespuestab , 'respuestac': $scope.formrespuestac,
   'correcta': $scope.formcorrecta, 'explicacio' :$scope.formexplicacio });

   var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }

   $http.post('/api/v1/preguntas', Indata, config)
   .success((data) => {
     $scope.formpregunta = {};
     $scope.todoData = data;
     console.log(data);
   })
   .error((error) => {
     console.log('Error: ' + error);
   });
 };
});
