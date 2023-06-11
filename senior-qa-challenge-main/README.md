git clone https://github.com/deepakjaggi/handbank.git
Open VS CODE
Open workspace from file : *Your windows directory*\handbank\senior-qa-challenge-main.code-workspace
npm install react react-dom
npm install react-scripts --save-dev
npm install cypress --save -dev
npm install -D cypress-xpath
npm install --save-dev @types/cypress
npm start
npx cypress open
select Electron browser
and run all tests
-------------
To run in parallel
    npm run test:parallel
-------------
To Setup mock server:
    npm init -y
    npm install express
    Go to this directory : 
    cd .\cypress\
    cd .\mock-server\
    node server.js
    http://localhost:3001/api/mockOslo
-----------






