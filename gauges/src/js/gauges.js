var global = this;
var defaults = {
    width: 200,
    height: 200,
    radius: 5
};
var gauges = {
    defaults: defaults
};

global.gauges && (gauges._gauges = global.gauges);
global.gauges = gauges;