import { User } from "../../Models/User";

function mapResponseToClass(responseData, ClassType) {    
    return Object.assign(new ClassType(), responseData);    
}

function apiRequest(method, url, requestData, ResponseClass) {
    // Default options for the request
    const requestBody = {
        method: method,
        url: url,
    };

    if (requestData) {
        // If requestData is provided, it's assumed to be the request body
        requestBody.body = requestData;      
    }    
    // Make the request    
    var responseBdy = cy.request(requestBody)
    .then((response) => {
        // Map the response to the output class and return it
        return mapResponseToClass(response.body, ResponseClass);
    });
    return  responseBdy;
}

describe('ApiTestsUser', function () {
    const user = new User();
    user.name = "Deepak";
    user.job = "SE";

    //test case    
    it('createUser', function () {        
        apiRequest('POST', 'https://reqres.in/api/users', user, User)
        .then((userCreateResponse) => {
            expect(userCreateResponse.name).to.equal(user.name);
            //expect(userCreateResponse.name).to.equal("DJ");
            expect(userCreateResponse.job).to.equal(user.job);            
        });
    });    
});


//Variable names and function parameter names start with a lowercase letter, class names start with an uppercase letter.
//Test case and test suite names are in camelCase, which is a common naming convention for functions in JavaScript.

/*Object.assign(new ClassType(), responseData): This uses the JavaScript Object.assign function to copy all properties 
from responseData to the new instance of ClassType. If there are properties in responseData that don't exist in the ClassType instance,
 they will be added. If there are properties that do exist, their values will be overwritten by the values from responseData.*/