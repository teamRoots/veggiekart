app.controller('reportsController', ['createRequestService', 'eventsService', 'saladService', 'loginService', function(createRequestService, eventsService, saladService, loginService){
  this.user = loginService.user;
  this.requests = createRequestService.data.requests;
 console.log('alsjdflk;asjdf;lksadlfl;;lsdf', this.requests.length);
var gardenConfirmationDisplay = {
  gardens:[]};

this.postGardenConfirmations = function(){
  console.log('als', this.requests.length);
var loopPush = '';
var loopQuantityPush = '';
var garden = {
  name: '',
  vegetables: []
};
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
      console.log('third loop hit', gardenConfirmationDisplay.gardens, [gI]);
        if(gardenConfirmationDisplay.gardens.length === 0){
          console.log('length ISSUE');
          loopPush = true;
        }
        else if (this.requests[i].recipients[j].orgName != gardenConfirmationDisplay.gardens[gI].name){
          console.log('ISSUE original name', this.requests[i].recipients[j].orgName);
          console.log('ISSUE new name', gardenConfirmationDisplay.gardens[gI]);

          loopPush = true;
        }else {
          loopPush = false;

//=================================
          //
          // for (var prop in this.requests[i].recipients[j].confirmations){
          //   console.log('fourth loop', this.requests[i].recipients[j].confirmations[prop], 'length', gardenConfirmationDisplay.gardens[gI].vegetables.length);
          //   for (var gJ = 0 ; gJ < gardenConfirmationDisplay.gardens[gI].vegetables.length; gJ++){
          //     console.log('fifth loop',gardenConfirmationDisplay.gardens[gI].vegetables, [gJ]);
          //
          //     if(this.requests[i].recipients[j].confirmations[prop] != gardenConfirmationDisplay.gardens[gI].vegetables[gJ]){
          //       loopQuantityPush = true;
          //
          //     }else {
          //       loopQuantityPush = false;
          //       gardenConfirmationDisplay.gardens[gI].vegetables[gJ].quantity += this.requests[i].recipients[j].confirmations[prop].quantity;
          //     }
          //   }
          //   if(loopQuantityPush === true){
          //     gardenConfirmationDisplay.gardens[gI].vegetables.push(this.requests[i].recipients[j].confirmations[prop]);
          //
          //   }
          // }
//=================================
          gI = gardensLengthHolder;

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
        gI--;

      }

  }
}
this.stuff = gardenConfirmationDisplay.gardens;

};



}]);
