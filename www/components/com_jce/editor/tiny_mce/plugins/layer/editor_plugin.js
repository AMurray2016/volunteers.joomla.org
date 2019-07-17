/* jce - 2.7.15 | 2019-07-17 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2019 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(){function findParentLayer(node){do if(node.className&&node.className.indexOf("mce-item-layer")!=-1)return node;while(node=node.parentNode)}tinymce.create("tinymce.plugins.Layer",{init:function(ed,url){var t=this;t.editor=ed,ed.addCommand("mceInsertLayer",t._insertLayer,t),ed.addCommand("mceMoveForward",function(){t._move(1)}),ed.addCommand("mceMoveBackward",function(){t._move(-1)}),ed.addCommand("mceMakeAbsolute",function(){t._toggleAbsolute()}),ed.addButton("layerforward",{title:"layer.forward_desc",cmd:"mceMoveForward"}),ed.addButton("layerbackward",{title:"layer.backward_desc",cmd:"mceMoveBackward"}),ed.addButton("layerabsolute",{title:"layer.absolute_desc",cmd:"mceMakeAbsolute"}),ed.addButton("insertlayer",{title:"layer.insertlayer_desc",cmd:"mceInsertLayer"}),ed.onInit.add(function(){ed.dom;tinymce.isIE&&ed.getDoc().execCommand("2D-Position",!1,!0)}),ed.onMouseUp.add(function(ed,e){var layer=findParentLayer(e.target);layer&&ed.dom.setAttrib(layer,"data-mce-style","")}),ed.onMouseDown.add(function(ed,e){var parent,node=e.target,doc=ed.getDoc();tinymce.isGecko&&(findParentLayer(node)?"on"!==doc.designMode&&(doc.designMode="on",node=doc.body,parent=node.parentNode,parent.removeChild(node),parent.appendChild(node)):"on"==doc.designMode&&(doc.designMode="off"))}),ed.onNodeChange.add(t._nodeChange,t),ed.onVisualAid.add(t._visualAid,t)},getInfo:function(){return{longname:"Layer",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/layer",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_nodeChange:function(ed,cm,n){var le,p;le=this._getParentLayer(n),p=ed.dom.getParent(n,"DIV,P,IMG"),p?(cm.setDisabled("absolute",0),cm.setDisabled("moveforward",!le),cm.setDisabled("movebackward",!le),cm.setActive("absolute",le&&"absolute"==le.style.position.toLowerCase())):(cm.setDisabled("absolute",1),cm.setDisabled("moveforward",1),cm.setDisabled("movebackward",1))},_visualAid:function(ed,e,s){var dom=ed.dom;tinymce.each(dom.select("div,p",e),function(e){/^(absolute|relative|fixed)$/i.test(e.style.position)&&(s?dom.addClass(e,"mce-item-visualaid"):dom.removeClass(e,"mce-item-visualaid"),dom.addClass(e,"mce-item-layer"))})},_move:function(d){var i,nl,ed=this.editor,z=[],le=this._getParentLayer(ed.selection.getNode()),ci=-1,fi=-1;for(nl=[],tinymce.walk(ed.getBody(),function(n){1==n.nodeType&&/^(absolute|relative|static)$/i.test(n.style.position)&&nl.push(n)},"childNodes"),i=0;i<nl.length;i++)z[i]=nl[i].style.zIndex?parseInt(nl[i].style.zIndex):0,ci<0&&nl[i]==le&&(ci=i);if(d<0){for(i=0;i<z.length;i++)if(z[i]<z[ci]){fi=i;break}fi>-1?(nl[ci].style.zIndex=z[fi],nl[fi].style.zIndex=z[ci]):z[ci]>0&&(nl[ci].style.zIndex=z[ci]-1)}else{for(i=0;i<z.length;i++)if(z[i]>z[ci]){fi=i;break}fi>-1?(nl[ci].style.zIndex=z[fi],nl[fi].style.zIndex=z[ci]):nl[ci].style.zIndex=z[ci]+1}ed.execCommand("mceRepaint")},_getParentLayer:function(n){return this.editor.dom.getParent(n,function(n){return 1==n.nodeType&&/^(absolute|relative|static)$/i.test(n.style.position)})},_insertLayer:function(){var ed=this.editor,dom=ed.dom,p=dom.getPos(dom.getParent(ed.selection.getNode(),"*")),body=ed.getBody(),le=ed.dom.add(body,"div",{style:{position:"absolute",left:p.x,top:p.y>20?p.y:20,width:100,height:100},class:"mce-item-visualaid mce-item-layer"},ed.selection.getContent()||ed.getLang("layer.content"));ed.dom.setAttrib(le,"data-mce-style",""),tinymce.isIE&&dom.setHTML(body,body.innerHTML)},_toggleAbsolute:function(){var ed=this.editor,le=this._getParentLayer(ed.selection.getNode());le||(le=ed.dom.getParent(ed.selection.getNode(),"DIV,P,IMG")),le&&("absolute"==le.style.position.toLowerCase()?(ed.dom.setStyles(le,{position:"",left:"",top:"",width:"",height:""}),ed.dom.removeClass(le,"mce-item-visualaid"),ed.dom.removeClass(le,"mce-item-layer")):(""==le.style.left&&(le.style.left="20px"),""==le.style.top&&(le.style.top="20px"),""==le.style.width&&(le.style.width=le.width?le.width+"px":"100px"),""==le.style.height&&(le.style.height=le.height?le.height+"px":"100px"),le.style.position="absolute",ed.addVisual(ed.getBody())),ed.dom.setAttrib(le,"data-mce-style",""),ed.execCommand("mceRepaint"),ed.nodeChanged())}}),tinymce.PluginManager.add("layer",tinymce.plugins.Layer)}();