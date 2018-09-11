# SolversHost
This application was made for bachelor degree project. It containes implementation of various explicit and implicit methods, used for ODE initial problem. Application was made with React framework. It uses React-Router library for routing and React-Redux library for global state. There is no backend, this application only use client executed js scripts. Npm was used for package management.

Srs folder contains source js and sass files, which were packed by Webpack.
Application provides a number of predefined ODE systems. Source files for this systems contained in "src/tasks" folder, they all implemented as a JS object with specific structure. The "src/tasks.js" script imports scripts from "src/tasks" folder and containes array of systems available in application.
