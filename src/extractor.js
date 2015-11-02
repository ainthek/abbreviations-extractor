module.exports = {
    extract: function(str) {
        // TODO: implement me	
        var matches = str.match(/([A-Z].*?\s*\([A-Z]+\))/g);
        console.error(matches);
        if (matches) {
        	if(matches.length==1){
        		return matches[0];	
        	}
        	else {
        		return matches;
        	}
            
        } else {
            return undefined;
        }
    }
}
