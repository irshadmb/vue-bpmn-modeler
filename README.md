# Vue BPMN Modeler

## Overview
`vue-bpmn-modeler` is a Vue.js-based application for modeling BPMN (Business Process Model and Notation) diagrams. It leverages several BPMN libraries and Vue plugins to provide a comprehensive modeling experience.

![alt text](https://github.com/irshadmb/vue-bpmn-modeler/blob/main/public/Screenshot.png?raw=true)

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Building the Application](#building-the-application)
- [Linting the Code](#linting-the-code)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [DevDependencies](#devdependencies)
- [Browserslist](#browserslist)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites
Ensure you have the following software installed:
- Node.js (version 14.x or higher recommended)
- npm (version 6.x or higher)

## Installation
To install the project dependencies, run the following command in the project root directory:

```bash
npm install
```

## Running the Application
To start the development server, run:

```bash
npm run serve
```

This will launch the application at `http://localhost:8080` by default.

## Building the Application
To build the application for production, run:

```bash
npm run build
```

The compiled application will be located in the `dist` directory.

## Linting the Code
To lint and fix the code, run:

```bash
npm run lint
```

## Project Structure
- `src/`: Contains the source code of the application.
- `public/`: Contains the public assets.
- `dist/`: Contains the built application (generated after running the build script).
- `package.json`: Contains the project configuration and dependencies.

## Dependencies
The main dependencies used in this project are:

- `@bpmn-io/element-template-chooser`
- `@bpmn-io/element-template-icon-renderer`
- `@bpmn-io/properties-panel`
- `axios`
- `bpmn-js`
- `bpmn-js-color-picker`
- `bpmn-js-connectors-extension`
- `bpmn-js-create-append-anything`
- `bpmn-js-element-templates`
- `bpmn-js-properties-panel`
- `camunda-bpmn-js-behaviors`
- `camunda-bpmn-moddle`
- `camunda-modeler-plugin-helpers`
- `core-js`
- `diagram-js`
- `diagram-js-minimap`
- `jquery`
- `vue`
- `vue-bpmn-modeler`

## DevDependencies
The main development dependencies used in this project are:

- `@babel/core`
- `@babel/eslint-parser`
- `@vue/cli-plugin-babel`
- `@vue/cli-plugin-eslint`
- `@vue/cli-service`
- `@vue/compiler-sfc`
- `copy-webpack-plugin`
- `css-loader`
- `eslint`
- `eslint-plugin-bpmn-io`
- `eslint-plugin-vue`
- `less`
- `less-loader`
- `npm-run-all2`
- `raw-loader`
- `style-loader`
- `vue-loader`
- `webpack`
- `webpack-bundle-analyzer`
- `webpack-cli`
- `webpack-dev-server`

## Browserslist
This project supports the following browsers:

- `> 1%`
- `last 2 versions`
- `not dead`
- `not ie 11`

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License
This project is licensed under the MIT License.

---

Feel free to customize this README file further based on your project's specific needs.