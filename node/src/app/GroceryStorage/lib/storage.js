
var StoreResult = function() {
    var result = {
        success: false,
        message: null,
        timestamp: null,
        groceryItem: null
    };
    return result;
}
exports.storeItem = function(args) {
    var storeResult = new StoreResult();
    storeResult.success = true;
    storeResult.message = "is now stored in your fridge.."
    return storeResult;
}