function Reset() {
    var filters_to_reset = ['year', 'attribute1', 'attribute2', 'region']
    for (let x = 0; x < filters_to_reset.length; x++) {
            var dropDown = document.getElementById(filters_to_reset[x]);
            dropDown.selectedIndex = 0;
            if ("createEvent" in document) {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                dropDown.dispatchEvent(evt);
            }
            else
            dropDown.fireEvent("onchange");
        }
}