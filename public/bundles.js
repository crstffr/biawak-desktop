(function(module) {

    var bust = {};
    var systemLocate = System.locate;
    var systemNormalize = System.normalize;

    var chksums = module.exports.chksums = {
    "bundles/angular.min.js": "96fb9d1d0c2e228e64170b86f3d1f7ca85917b78",
    "bundles/lodash.min.js": "2362f2b0149561d81411118ba3b23b1cf13f06e5",
    "bundles/socket/socket.min.js": "4ab8b747f71cbffc10cce999f33571ce304334e2",
    "bundles/jquery.min.js": "2e89895826f1767d7e7e4ab11b7c5186b7cf48ae",
    "bundles/app.min.js": "00489ae5c47240d0b8e943c0ef740ab50d017b82"
};

    var bundles = module.exports.bundles = {
    "bundles/angular.min.js": [
        "github:angular/bower-angular@1.5.5.js",
        "github:angular/bower-angular@1.5.5/angular.js"
    ],
    "bundles/lodash.min.js": [
        "npm:lodash@4.11.1.js",
        "npm:lodash@4.11.1/lodash.js",
        "github:jspm/nodelibs-process@0.1.2.js",
        "github:jspm/nodelibs-process@0.1.2/index.js",
        "npm:process@0.11.2.js",
        "npm:process@0.11.2/browser.js",
        "github:jspm/nodelibs-buffer@0.1.0.js",
        "github:jspm/nodelibs-buffer@0.1.0/index.js",
        "npm:buffer@3.6.0.js",
        "npm:buffer@3.6.0/index.js",
        "npm:isarray@1.0.0.js",
        "npm:isarray@1.0.0/index.js",
        "npm:ieee754@1.1.6.js",
        "npm:ieee754@1.1.6/index.js",
        "npm:base64-js@0.0.8.js",
        "npm:base64-js@0.0.8/lib/b64.js"
    ],
    "bundles/socket/socket.min.js": [
        "npm:socketio-wildcard@0.3.0.js",
        "npm:socketio-wildcard@0.3.0/index.js",
        "github:jspm/nodelibs-events@0.1.1.js",
        "github:jspm/nodelibs-events@0.1.1/index.js",
        "npm:events@1.0.2.js",
        "npm:events@1.0.2/events.js",
        "github:socketio/socket.io-client@1.4.5.js",
        "github:socketio/socket.io-client@1.4.5/socket.io.js",
        "app/vendor/feathers.js"
    ],
    "bundles/jquery.min.js": [
        "npm:jquery@2.2.3.js",
        "npm:jquery@2.2.3/dist/jquery.js"
    ],
    "bundles/app.min.js": [
        "app/app.module.js",
        "app/app.ctrl.js",
        "app/modules/router/router.module.js",
        "app/modules/router/router.service.js",
        "npm:lodash@4.11.1/forEach.js",
        "npm:lodash@4.11.1/isArray.js",
        "npm:lodash@4.11.1/_baseIteratee.js",
        "npm:lodash@4.11.1/property.js",
        "npm:lodash@4.11.1/_isKey.js",
        "npm:lodash@4.11.1/isSymbol.js",
        "npm:lodash@4.11.1/isObjectLike.js",
        "npm:lodash@4.11.1/_basePropertyDeep.js",
        "npm:lodash@4.11.1/_baseGet.js",
        "npm:lodash@4.11.1/_castPath.js",
        "npm:lodash@4.11.1/_stringToPath.js",
        "npm:lodash@4.11.1/toString.js",
        "npm:lodash@4.11.1/_Symbol.js",
        "npm:lodash@4.11.1/_root.js",
        "npm:lodash@4.11.1/_checkGlobal.js",
        "npm:lodash@4.11.1/memoize.js",
        "npm:lodash@4.11.1/_MapCache.js",
        "npm:lodash@4.11.1/_mapSet.js",
        "npm:lodash@4.11.1/_isKeyable.js",
        "npm:lodash@4.11.1/_hashSet.js",
        "npm:lodash@4.11.1/_nativeCreate.js",
        "npm:lodash@4.11.1/_getNative.js",
        "npm:lodash@4.11.1/isNative.js",
        "npm:lodash@4.11.1/_toSource.js",
        "npm:lodash@4.11.1/isObject.js",
        "npm:lodash@4.11.1/_isHostObject.js",
        "npm:lodash@4.11.1/isFunction.js",
        "npm:lodash@4.11.1/_assocSet.js",
        "npm:lodash@4.11.1/_assocIndexOf.js",
        "npm:lodash@4.11.1/eq.js",
        "npm:lodash@4.11.1/_Map.js",
        "npm:lodash@4.11.1/_mapHas.js",
        "npm:lodash@4.11.1/_hashHas.js",
        "npm:lodash@4.11.1/_assocHas.js",
        "npm:lodash@4.11.1/_mapGet.js",
        "npm:lodash@4.11.1/_hashGet.js",
        "npm:lodash@4.11.1/_assocGet.js",
        "npm:lodash@4.11.1/_mapDelete.js",
        "npm:lodash@4.11.1/_hashDelete.js",
        "npm:lodash@4.11.1/_assocDelete.js",
        "npm:lodash@4.11.1/_mapClear.js",
        "npm:lodash@4.11.1/_Hash.js",
        "npm:lodash@4.11.1/_baseProperty.js",
        "npm:lodash@4.11.1/identity.js",
        "npm:lodash@4.11.1/_baseMatchesProperty.js",
        "npm:lodash@4.11.1/_matchesStrictComparable.js",
        "npm:lodash@4.11.1/_isStrictComparable.js",
        "npm:lodash@4.11.1/hasIn.js",
        "npm:lodash@4.11.1/_hasPath.js",
        "npm:lodash@4.11.1/isString.js",
        "npm:lodash@4.11.1/isLength.js",
        "npm:lodash@4.11.1/_isIndex.js",
        "npm:lodash@4.11.1/isArguments.js",
        "npm:lodash@4.11.1/isArrayLikeObject.js",
        "npm:lodash@4.11.1/isArrayLike.js",
        "npm:lodash@4.11.1/_getLength.js",
        "npm:lodash@4.11.1/_baseHasIn.js",
        "npm:lodash@4.11.1/get.js",
        "npm:lodash@4.11.1/_baseIsEqual.js",
        "npm:lodash@4.11.1/_baseIsEqualDeep.js",
        "npm:lodash@4.11.1/isTypedArray.js",
        "npm:lodash@4.11.1/_getTag.js",
        "npm:lodash@4.11.1/_WeakMap.js",
        "npm:lodash@4.11.1/_Set.js",
        "npm:lodash@4.11.1/_Promise.js",
        "npm:lodash@4.11.1/_DataView.js",
        "npm:lodash@4.11.1/_equalObjects.js",
        "npm:lodash@4.11.1/keys.js",
        "npm:lodash@4.11.1/_isPrototype.js",
        "npm:lodash@4.11.1/_indexKeys.js",
        "npm:lodash@4.11.1/_baseTimes.js",
        "npm:lodash@4.11.1/_baseKeys.js",
        "npm:lodash@4.11.1/_baseHas.js",
        "npm:lodash@4.11.1/_getPrototype.js",
        "npm:lodash@4.11.1/_equalByTag.js",
        "npm:lodash@4.11.1/_setToArray.js",
        "npm:lodash@4.11.1/_mapToArray.js",
        "npm:lodash@4.11.1/_equalArrays.js",
        "npm:lodash@4.11.1/_arraySome.js",
        "npm:lodash@4.11.1/_Uint8Array.js",
        "npm:lodash@4.11.1/_Stack.js",
        "npm:lodash@4.11.1/_stackSet.js",
        "npm:lodash@4.11.1/_stackHas.js",
        "npm:lodash@4.11.1/_stackGet.js",
        "npm:lodash@4.11.1/_stackDelete.js",
        "npm:lodash@4.11.1/_stackClear.js",
        "npm:lodash@4.11.1/_baseMatches.js",
        "npm:lodash@4.11.1/_getMatchData.js",
        "npm:lodash@4.11.1/toPairs.js",
        "npm:lodash@4.11.1/_baseToPairs.js",
        "npm:lodash@4.11.1/_arrayMap.js",
        "npm:lodash@4.11.1/_baseIsMatch.js",
        "npm:lodash@4.11.1/_baseEach.js",
        "npm:lodash@4.11.1/_createBaseEach.js",
        "npm:lodash@4.11.1/_baseForOwn.js",
        "npm:lodash@4.11.1/_baseFor.js",
        "npm:lodash@4.11.1/_createBaseFor.js",
        "npm:lodash@4.11.1/_arrayEach.js",
        "app/routes/dashbaord/dashboard.route.js",
        "app/routes/dashbaord/dashboard.ctrl.js",
        "app/routes/dashbaord/dashboard.html!github:systemjs/plugin-text@0.0.7.js",
        "app/panels/fan-speed/fan-speed.module.js",
        "app/panels/fan-speed/fan-speed.ctrl.js",
        "app/panels/fan-speed/fan-speed.html!github:systemjs/plugin-text@0.0.7.js",
        "app/hardware/fan/fan.module.js",
        "app/hardware/fan/fan.service.js",
        "npm:lodash@4.11.1/extend.js",
        "npm:lodash@4.11.1/assignIn.js",
        "npm:lodash@4.11.1/keysIn.js",
        "npm:lodash@4.11.1/_baseKeysIn.js",
        "npm:lodash@4.11.1/_iteratorToArray.js",
        "npm:lodash@4.11.1/_Reflect.js",
        "npm:lodash@4.11.1/_createAssigner.js",
        "npm:lodash@4.11.1/rest.js",
        "npm:lodash@4.11.1/toInteger.js",
        "npm:lodash@4.11.1/toNumber.js",
        "npm:lodash@4.11.1/_apply.js",
        "npm:lodash@4.11.1/_isIterateeCall.js",
        "npm:lodash@4.11.1/_copyObject.js",
        "npm:lodash@4.11.1/_assignValue.js",
        "app/modules/collector/collector.module.js",
        "app/modules/collector/collector.service.js",
        "app/utils/upsert.js",
        "npm:lodash@4.11.1/indexOf.js",
        "npm:lodash@4.11.1/_baseIndexOf.js",
        "npm:lodash@4.11.1/_indexOfNaN.js",
        "npm:lodash@4.11.1/find.js",
        "npm:lodash@4.11.1/_baseFindIndex.js",
        "npm:lodash@4.11.1/_baseFind.js",
        "npm:lodash@4.11.1/assign.js",
        "npm:lodash@4.11.1/pull.js",
        "npm:lodash@4.11.1/pullAll.js",
        "npm:lodash@4.11.1/_basePullAll.js",
        "npm:lodash@4.11.1/_baseUnary.js",
        "npm:lodash@4.11.1/_baseIndexOfWith.js",
        "app/components/meter/meter.module.js",
        "app/components/meter/meter.html!github:systemjs/plugin-text@0.0.7.js",
        "app/components/meter/meter.ctrl.js",
        "github:minddust/bootstrap-progressbar@0.9.0.js",
        "github:minddust/bootstrap-progressbar@0.9.0/bootstrap-progressbar.js",
        "app/components/meter/meter.min.css!github:systemjs/plugin-css@0.1.21.js",
        "app/components/panel/panel.module.js",
        "app/components/panel/panel.html!github:systemjs/plugin-text@0.0.7.js",
        "app/components/panel/panel.min.css!github:systemjs/plugin-css@0.1.21.js",
        "app/panels/cpu-load/cpu-load.module.js",
        "app/panels/cpu-load/cpu-load.ctrl.js",
        "app/panels/cpu-load/cpu-load.html!github:systemjs/plugin-text@0.0.7.js",
        "app/hardware/cpu/cpu.module.js",
        "app/hardware/cpu/cpu.service.js",
        "app/panels/cpu-temp/cpu-temp.module.js",
        "app/panels/cpu-temp/cpu-temp.ctrl.js",
        "app/panels/cpu-temp/cpu-temp.html!github:systemjs/plugin-text@0.0.7.js",
        "app/panels/connect/connect.module.js",
        "app/panels/connect/connect.ctrl.js",
        "app/panels/connect/connect.html!github:systemjs/plugin-text@0.0.7.js",
        "app/modules/connection/connection.module.js",
        "app/modules/connection/connection.service.js",
        "npm:ngstorage@0.3.10.js",
        "npm:ngstorage@0.3.10/ngStorage.js",
        "npm:angular-dragula@1.2.6.js",
        "npm:angular-dragula@1.2.6/angular-dragula.js",
        "npm:angular-dragula@1.2.6/directive.js",
        "npm:dragula@3.6.8.js",
        "npm:dragula@3.6.8/dragula.js",
        "npm:dragula@3.6.8/classes.js",
        "npm:crossvent@1.5.4.js",
        "npm:crossvent@1.5.4/src/crossvent.js",
        "npm:crossvent@1.5.4/src/eventmap.js",
        "npm:custom-event@1.0.0.js",
        "npm:custom-event@1.0.0/index.js",
        "npm:contra@1.9.1/emitter.js",
        "npm:contra@1.9.1/debounce.js",
        "npm:ticky@1.0.0.js",
        "npm:ticky@1.0.0/ticky-browser.js",
        "npm:atoa@1.0.0.js",
        "npm:atoa@1.0.0/atoa.js",
        "npm:angular-dragula@1.2.6/service.js",
        "npm:angular-dragula@1.2.6/replicate-events.js",
        "app/routes/index.route.js",
        "github:christopherthielen/ui-router-extras@0.1.2.js",
        "github:christopherthielen/ui-router-extras@0.1.2/release/ct-ui-router-extras.js",
        "github:angular-ui/ui-router@0.2.18.js",
        "github:angular-ui/ui-router@0.2.18/angular-ui-router.js",
        "app/app.style.js",
        "style/css/main.min.css!github:systemjs/plugin-css@0.1.21.js",
        "style/css/theme-slate.min.css!github:systemjs/plugin-css@0.1.21.js",
        "vendor/bootstrap.js",
        "npm:bootstrap@3.3.6/js/alert.js"
    ]
};

    System.config({bundles: bundles});

    System.normalize = function (name, pName, pAddress) {
        return systemNormalize.call(this, name, pName, pAddress).then(function (address) {
            var chksum = chksums[name];
            address = address.replace(/\.gz\.js$/, '.gz');
            if (chksums[name]) { bust[address] = chksum; }
            return address;
        });
    };

    System.locate = function (load) {
        return Promise.resolve(systemLocate.call(this, load)).then(function (address) {
            var chksum = bust[address];
            return (chksum) ? address + '?' + chksum : address;
        });
    };

})((typeof module !== 'undefined') ? module : {exports: {}}, this);
