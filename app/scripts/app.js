// try{
//   var ck = require('createjs');
// }catch(e){
//     console.log(e);
// }
// console.log(123);
// require('../lib/easeljs-0.8.2.min');
require('../lib/ionic');
console.log(123);

document.documentElement.style.fontSize = (document.documentElement.offsetWidth / 10) + 'px';

angular.element(document).ready(function () {
    window.extHeader = {productID:"5815919718275566320001",JDBID:"BF712413-77B7-4767-8129-47FF58925877",tradeType:"3",deviceType:"iPhone 5S",proxyType:"http",memberID:"550357453066215428",channel:"appstore",h:"1136",appKey:"fb371c48e9a9b2a1174ed729ae888513",udid:"298b613a4b5c1a2e369d6a5b91299b9e80a21e80",w:"640",accessToken:"ACCESS_TOKEN5503574530662154281459335278960",deviceID:"B4541559-B800-4343-87E2-03E01DFCA1B7",platform:"iOS",clientVersion:"2.1.0",phoneVen:"1",jailbreak:0,network:"5",systemVersion:"8.3",traceID:"9954E8A1-DEE2-4830-B5CC-01055031D183",companyName:"人人行",companyId:"123123"};
    try{
        angular.bootstrap(document, ['worker']);
    }catch(e){
        console.log(e);
    }

});
console.log(angular);
/*/*
/**
 * require your modules
 */
require('./common/tools.js');
require('./app.module.js');
require('./app.route.js');
require('./app.run.js');

/* require controllers */

require('./controllers/index.controller.js');
require('./controllers/wantOffer.controller.js');


/* controllers end*/

// require('./directive/fancySelect.directive.js');
// require('./directive/imgUpload.directive.js');
// require('./directive/jdbScrollPicker.directive.js');
// require('./directive/jdbScrollSelector.directive.js');
// require('./directive/ngTap.directive.js');
// require('./directive/jdbImgView.directive.js');
// require('./directive/moneyFmt.directive.js');
// require('./directive/regionSelect.directive.js');
// require('./directive/inputPhone.directive.js');

/*require('./directive/changeView.directive.js');*/

require('./services/api.service.js');
require('./services/storage.service.js');
require('./services/img.service.js');
require('./services/share.service.js');

require('./app.filter.js');
