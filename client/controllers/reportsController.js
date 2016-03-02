app.controller('reportsController', ['createRequestService', 'eventsService', 'saladService', 'loginService', function(createRequestService, eventsService, saladService, loginService){
  this.user = loginService.user;
  this.requests = createRequestService.data.requests;
var gardenConfirmationDisplay = {
  gardens:[]};

this.postGardenConfirmations = function(){
var newUnit = 0;
var loopPush = '';
var loopQuantityPush = '';
var loopSummaryPush = '';
var loopSummaryAdd = '';
var loopNewSummaryAdd = '';
var place = '';
var garden = {
  name: '',
  vegetables: []
};
var vegetableLengthHolder = 0;
var gardensLengthHolder = 0;

for (var i = 0; i < this.requests.length; i++){
  console.log('first loop hit', this.requests);
  for (var j = 0; j < this.requests[i].recipients.length; j++){
    if(gardenConfirmationDisplay.gardens.length === 0){
      gardensLengthHolder = 1;
    }
    else{
      gardensLengthHolder = gardenConfirmationDisplay.gardens.length
    }
    for (var gI = 0; gI < gardensLengthHolder; gI++){
        if(gardenConfirmationDisplay.gardens.length === 0){
          loopPush = true;
        }
        else if (this.requests[i].recipients[j].orgName != gardenConfirmationDisplay.gardens[gI].name){


          loopPush = true;
        }else {
          loopPush = false;

//=================================

          for (var prop in this.requests[i].recipients[j].confirmations){


            if(gardenConfirmationDisplay.gardens[gI].vegetables.length === 0){
              vegetableLengthHolder  = 1;
            }
            else{
              vegetableLengthHolder = gardenConfirmationDisplay.gardens[gI].vegetables.length;

            }

            for (var gJ = 0 ; gJ < vegetableLengthHolder; gJ++){
              console.log('fifth loop',gardenConfirmationDisplay.gardens[gI].vegetables, [gJ],[gI]);

              if(gardenConfirmationDisplay.gardens[gI].vegetables.length === 0){
                loopQuantityPush = true;

              }
               else if(prop != gardenConfirmationDisplay.gardens[gI].vegetables[gJ].name){
                loopQuantityPush = true;


              }else {
                loopQuantityPush = false;

                //===================================================
                //this is where the loop for checking prop quantity and unit

                for( s = 0; s < this.requests[i].summary.length; s++){
                    console.log('conversionloop', prop, this.requests[i].summary[s].ingredient_name);
                  if(prop == this.requests[i].summary[s].ingredient_name){
                    console.log('conversionloop Find');
                    if(gardenConfirmationDisplay.gardens[gI].vegetables[gJ].unit != this.requests[i].summary[s].unit){
                      if(gardenConfirmationDisplay.gardens[gI].vegetables[gJ].unit == 'lbs.' && this.requests[i].summary[s].unit == 'oz.'){
                        newUnit = this.requests[i].recipients[j].confirmations[prop].quantity / 16;
                        console.log('lbs to oz', newUnit, i, j, s);
                        s = this.requests[i].summary.length;
                        loopNewSummaryAdd = true;
                      }
                      else if (gardenConfirmationDisplay.gardens[gI].vegetables[gJ].unit == 'oz.' && this.requests[i].summary[s].unit == 'lbs.'){
                        newUnit = this.requests[i].recipients[j].confirmations[prop].quantity * 16;
                        console.log('oz to lbs', newUnit, i, j, s);
                        s = this.requests[i].summary.length;
                        loopNewSummaryAdd = true;
                      }
                    }else{
                    gardenConfirmationDisplay.gardens[gI].vegetables[gJ].quantity += this.requests[i].recipients[j].confirmations[prop].quantity;
                    loopNewSummaryAdd = false;
                    s = this.requests[i].summary.length;
                    console.log('same unit hit');

                  }
                }else {
                  loopNewSummaryAdd = false;

                }
                if(loopNewSummaryAdd === true){
                  console.log('same add', gardenConfirmationDisplay.gardens[gI].vegetables[gJ].quantity,gardenConfirmationDisplay.gardens[gI].vegetables[gJ], gI, gJ);
                  gardenConfirmationDisplay.gardens[gI].vegetables[gJ].quantity += newUnit;
                }

              }
              // ===================================================







                gJ = vegetableLengthHolder;


              }
            }

            if(loopQuantityPush === true){

            for( s = 0; s < this.requests[i].summary.length; s++){

              if(prop != this.requests[i].summary[s].ingredient_name){

                loopSummaryPush = false;
              } else {

                loopSummaryPush = true;
                place = s;
                s = this.requests[i].summary.length;
              }
            }

            if(loopSummaryPush === true){
              currentVeg = {
                name : prop,
                quantity: this.requests[i].recipients[j].confirmations[prop].quantity,
                unit: this.requests[i].summary[place].unit
              };
              gardenConfirmationDisplay.gardens[gI].vegetables.push(currentVeg);
            }
            }
          }
          gI = gardensLengthHolder;

        }
      }
      garden = {};
      if(loopPush === true){
        garden.name = this.requests[i].recipients[j].orgName;
        garden.vegetables = [];
        gardenConfirmationDisplay.gardens.push(garden);
        j--;
        gI--;

      }

  }
}
this.stuff = gardenConfirmationDisplay.gardens;

};



}]);
