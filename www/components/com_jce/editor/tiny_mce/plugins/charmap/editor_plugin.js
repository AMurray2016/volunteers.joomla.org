/* jce - 2.7.19 | 2019-10-25 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2019 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(){var each=tinymce.each;tinymce.create("tinymce.plugins.CharacterMap",{init:function(ed,url){this.editor=ed,ed.addCommand("mceCharacterMap",function(v){ed.windowManager.open({url:ed.getParam("site_url")+"index.php?option=com_jce&task=plugin.display&plugin=charmap",width:640+parseInt(ed.getLang("advanced.charmap_delta_width",0)),height:300+parseInt(ed.getLang("advanced.charmap_delta_height",0)),close_previous:!1,inline:!0,size:"mce-modal-landscape-large"})})},createControl:function(name,cm){function insertChar(chr){editor.execCommand("mceInsertContent",!1,"&"+chr+";"),editor.focus()}var btn,self=this,editor=self.editor;if("charmap"===name)return editor.getParam("charmap_custom")?(btn=cm.createSplitButton(name,{title:"advanced.charmap_desc",cmd:"mceCharacterMap"}),btn.onRenderMenu.add(function(btn,menu){each(editor.getParam("charmap_custom","","hash"),function(v,k){var id=editor.dom.uniqueId();v=v.replace(/[^a-z0-9]/gi,""),menu.add({id:id,title:k+" &"+v+";",onclick:function(){insertChar(v)}})})})):btn=cm.createButton(name,{title:"advanced.charmap_desc",cmd:"mceCharacterMap"}),btn}}),tinymce.PluginManager.add("charmap",tinymce.plugins.CharacterMap)}();