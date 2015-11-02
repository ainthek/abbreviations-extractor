module.exports = {
    extract: function(str) {
        // TODO: implement me	
        var matches = str.match(/((\b([A-Z][A-Za-z,]*|in|of|the|and|or)\b){1,}\([A-Z]+\))/g);
        //console.error(matches);
        if (matches) {
        	matches=matches.map(function(m){
        		return m.replace(/(\r\n|\n|\r)/gm," ");
        	})
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
