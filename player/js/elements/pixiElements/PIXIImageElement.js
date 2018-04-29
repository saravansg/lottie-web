function PIXIImageElement(data,parentContainer,globalData,comp,placeholder){
    this.assetData = globalData.getAssetData(data.refId);
    this._parent.constructor.call(this,data,parentContainer,globalData,comp,placeholder);
}
extendPrototype([BaseElement, TransformElement, PIXIBaseElement, HierarchyElement, FrameElement, RenderableElement], PIXIImageElement);

PIXIImageElement.prototype.createElements = function(){

    var assetPath = this.globalData.getAssetsPath(this.assetData);

    this._parent.createElements.call(this);

    this.innerElem = document.createElementNS(svgNS,'image');
    this.innerElem.setAttribute('width',this.assetData.w+"px");
    this.innerElem.setAttribute('height',this.assetData.h+"px");
    this.innerElem.setAttribute('preserveAspectRatio','xMidYMid slice');
    this.innerElem.setAttributeNS('http://www.w3.org/1999/xlink','href',assetPath);
    this.maskedElement = this.innerElem;
    this.layerElement.appendChild(this.innerElem);
    if(this.data.ln){
        this.innerElem.setAttribute('id',this.data.ln);
    }
    if(this.data.cl){
        this.innerElem.setAttribute('class',this.data.cl);
    }

    var texture = PIXI.Texture.fromImage(assetPath);
    this.PInnerElem = new PIXI.Sprite(texture);
    this.PLayerElement.addChild(this.PInnerElem);

};

PIXIImageElement.prototype.hide = function(){
    if(!this.hidden){
        this.innerElem.style.display = 'none';
        this.PLayerElement.visible = false;
        this.hidden = true;
    }
};

PIXIImageElement.prototype.renderFrame = function(parentMatrix){
    var renderParent = this._parent.renderFrame.call(this,parentMatrix);
    if(renderParent===false){
        this.hide();
        return;
    }
    if(this.hidden){
        this.hidden = false;
        this.innerElem.style.display = 'block';
        this.PLayerElement.visible = true;
    }
    if(this.firstFrame){
        this.firstFrame = false;
    }
};

PIXIImageElement.prototype.destroy = function(){
    this._parent.destroy.call();
    this.innerElem =  null;
};