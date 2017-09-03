# Example Vue app

> An example project to demostrate how a crud page could work in a Vue Js project.

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader). Project was scaffolded with [vue-cli](https://github.com/vuejs/vue-cli).

## Description
The node server used to serve the html page also contains some api endpoints for the Vue app to communicate with (all are at /api). The endpoints only store and manipulate data in in memory variables to simulate storage; because of this any data saved will be lost when the node server is stopped. This is a deliberate 1 second delay when loading the list of users to demo the loading indicator.

Uses the following libraries:
- [Vue Router](https://router.vuejs.org/en/)
- [Vuex](https://vuex.vuejs.org/en/) for state management
- [Element](https://github.com/ElemeFE/element) which is a Vue UI component library
- [Vue Types](https://github.com/dwightjack/vue-types) to help make prop validation nicer
- Setup to use sass, includes Font Awesome and uses normailze.css
- [Axios](https://github.com/mzabriskie/axios) for ajax calls

### Notes
In order to work in IE a polyfill for Function.Name and Promise was needed. Function.Name is used to run vuex mutations and actions.

When running in Visual Studio Code the [Vetur](https://vuejs.github.io/vetur/) extension is recommended.
[Vue dev tools](https://github.com/vuejs/vue-devtools) are recommended for development.