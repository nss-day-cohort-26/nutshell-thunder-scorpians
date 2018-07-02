const $ = require("jquery")
const clear = () => {
    const $wrapper = $("#wrapper");
    while ($wrapper.first()){
        $wrapper.remove();}
};

module.exports = clear;