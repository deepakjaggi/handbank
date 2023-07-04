console.log("Start"); // Log "Start" to the console
let responseData; // Declare a variable outside the function scope

performAsyncAPIOperation(aCallBackImplementationMethod)
	.then(() => { 
		console.log("\n" + "Stage 3 ---- Parsing/Verification")
		console.log("ID is : " + responseData.data.id)
	})
	.catch(error => {
		console.error('Error occurred:', error);
		console.log('FAILURE - so handling the error');
	})
	.finally(() => {
		console.log('\n' + 'satge 4 --- Accessing response in finally block:', JSON.stringify(responseData)); // Access the response variable in the finally block    
	});

console.log("end")

async function performAsyncAPIOperation(callback) {	
	const response = await fetch('https://reqres.in/api/users/2'); // Fetch returns a promise
	responseData = await response.json();
	console.log('Stage1 ---- API Request completed and now returning CallBack');
	callback(); // Invoke the callback function with the response data  
}

function aCallBackImplementationMethod() {
	console.log('\n' + 'Stage 2 ---- Accessing response in callBack block:', JSON.stringify(JSON.stringify(responseData)));
}
