module.exports = {
    extract: function(str) {
        // TODO: implement me	
        return str.match(/[A-Z].*\s+\([A-Z]\+\)/);
    }
}
