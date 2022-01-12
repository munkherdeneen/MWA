const child_process = require('child_process');
 
for(var i =1; i<=5; i++) {
   var parentProcess = child_process.spawn('node', ['child.js', i]);

   parentProcess.stdout.on('data', function (data) {
      console.log('stdout value: ' + data);
   });

   parentProcess.stderr.on('data', function (data) {
      console.log('stderr value: ' + data);
   });

   parentProcess.on('close', function (code) {
       console.log('Child process is exiting with exit code: '+code);
   });
}