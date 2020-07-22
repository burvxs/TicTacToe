
const targetNodes = $(".grid-item");
const config = {attributes : true, childList : true, subtree : true}

const observer = new MutationObserver(function(mutationRecord){
    for (let mutation of mutationRecord){
        if (mutation.type === 'childList'){
            // Human player has placed a coin
        }          
    }
})

targetNodes.each(function(){
    observer.observe(this, config)
})


