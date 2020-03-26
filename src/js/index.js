import 'foundation-sites/dist/css/foundation.min.css';


import "../scss/index.scss";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "../react/components/App";

require('foundation-sites');
console.log("hello world")

ReactDOM.render(<App />, document.getElementById("root"))