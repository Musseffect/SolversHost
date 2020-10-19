# Solvers
This application was made for bachelor degree project. It containes implementation of various explicit and implicit methods, used for ODE initial value problem. Application was made with React library. It uses React-Router library for routing and React-Redux library for global state management. There is no backend, this application is basically SPA. Npm was used for package management.

Srs folder contains source .js and .sass files, which were packed by Webpack.
Application provides a number of predefined ODE systems. Source files for those systems are contained in "src/tasks" folder, they are implemented as a JS objects with specific structure. The "src/tasks.js" script imports scripts from "src/tasks" folder and provides them to application as an array.
