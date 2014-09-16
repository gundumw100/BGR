cordova.define("com.mobovip.mobile.plugin.toast.Toast", function(require, exports, module) {/*global cordova, module*/
module.exports = {
    showShort: function (message, win, fail) {
        cordova.exec(win, fail, "Toast", "show_short", [message]);
    },

    showLong: function (message, win, fail) {
        cordova.exec(win, fail, "Toast", "show_long", [message]);
    },

    cancel: function (win, fail) {
        cordova.exec(win, fail, "Toast", "cancel", []);
    }
};
});
