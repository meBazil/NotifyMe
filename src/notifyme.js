/**
 * Global Variable NotifyMe
 */
var NotifyMe={};
(function(window,NotifyMe){
    var Notify;
Notify = (function () {
    var getPermissionAndLaunch, launchNotiWindow;
    
    /**
     * Notify Constructor
     * @param {String} title   Title for Notification
     * @param {Object} options Object with Options for Notification
     */
    function Notify(title, options) {
        this.title = title;
        this.options = options;
    }
    
    /**
     * Helps in launching Notification(Private)
     * @param  {String} title   Title for Notification
     * @param  {Object} options Object with Options for Notification
     * @return {Notification}         Object of Notification is returned along with the Notification being launched.
     */
    launchNotiWindow = function (title, options) {
        var notify;
        notify = new Notification(title, options);
        notify.onclick = function(){
            options.onclick();
        };
        notify.onshow = function(){
            options.onshow();
        };
        notify.onerror = function(){
            options.onerror();
        };
        notify.onclose = function(){
            options.onclose();
        };
    };
    
    /**
     * Checks for the permission from the user
     * @param  {String} title   Title for Notification
     * @param  {Object} options Object with Options for Notification
     * @return {NA}         NA
     */
    getPermissionAndLaunch = function (title, options) {
        Notification.requestPermission(function (permission) {
            if (permission === 'granted') {
                launchNotiWindow(title, options);
            } else if (permission === ''){
            }
        });
    };
    /**
     * Prototype function for invoking the Notification object.
     * @return {NA} [NA]
     */
    Notify.prototype.launch = function () {
        return getPermissionAndLaunch(this.title, this.options);
    };
    return Notify;
})();

NotifyMe.launch=function(title,options){
  var tempObj =  new Notify(title,options)  ;
  tempObj.launch();
};

return window.NotifyMe;
})(this,NotifyMe);
