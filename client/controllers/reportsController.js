app.controller('reportsController', ['createRequestService', 'eventsService', 'saladService', 'loginService', function(createRequestService, eventsService, saladService, loginService){
  this.user = loginService.user;
  this.requests = createRequestService.data.requests;
 console.log('alsjdflk;asjdf;lksadlfl;;lsdf', this.requests.length);
var gardenConfirmationDisplay = {
  gardens:[]};

this.postGardenConfirmations = function(){
  console.log('als', this.requests.length);
var loopPush = '';
var garden = {
  name: '',
  vegetables: []
}
var gardensLengthHolder = 0;
for (var i = 0; i < this.requests.length; i++){
  console.log('first loop hit', this.requests);
  for (var j = 0; j < this.requests[i].recipients.length; j++){
    console.log('second loop hit', this.requests[i].recipients);
    if(gardenConfirmationDisplay.gardens.length === 0){
      gardensLengthHolder = 1;
    }
    else{
      gardensLengthHolder = gardenConfirmationDisplay.gardens.length
    }
    for (var gI = 0; gI < gardensLengthHolder; gI++){
      console.log('third loop hit', gardenConfirmationDisplay.gardens);
        if(gardenConfirmationDisplay.gardens.length === 0){
          console.log('length ISSUE');
          loopPush = true;
        }
        else if (this.requests[i].recipients[j].orgName != gardenConfirmationDisplay.gardens[gI].name){
          console.log('ISSUE original name', this.requests[i].recipients[j].orgName);
          console.log('ISSUE new name', gardenConfirmationDisplay.gardens[gI].name);

          loopPush = true;
        }else {
          loopPush = false;
          gI = gardensLengthHolder;
          

          // for (var prop in this.requests[i].recipients[j].confirmations)
        }
      }
      console.log('loopPush', loopPush);
      garden = {};
      if(loopPush === true){
          console.log('gardenarray', gardenConfirmationDisplay.gardens);
        garden.name = this.requests[i].recipients[j].orgName;
        garden.vegetables = [];
        garden.vegetables.push(this.requests[i].recipients[j].confirmations);
        gardenConfirmationDisplay.gardens.push(garden);
        console.log('garden', garden);

        j--;

      }

  }
}
this.stuff = gardenConfirmationDisplay.gardens;

};



//
//   for ( i = 0; i < this.requests.length; i++){
//     console.log('first loop hit', this.requests);
//     for ( j = 0; j < this.requests[i].recipients.length; j++){
//       console.log('second loop hit', this.requests[i].recipients);
//       for (var gI = 0; gI < gardenConfirmationDisplay.gardens.length; gI++){
//         if(this.requests[i].recipients[j]._id == gardenConfirmationDisplay.gardens[gI].gardenId){
//
//         }
//       }
//
//       for (var prop in this.requests[i].recipients[j].confirmations) {
//         console.log('third loop hit', this.requests[i].recipients[j].confirmations);
//
//           for (var k = 0; k < gardenConfirmationDisplay.gardens.length; k++){
//                 console.log('fourth loop hit', this.requests[i].recipients[j].confirmations[prop]);
//
//
//
//
//
//
//       }
//     }
//
// };



}]);
