Vue.component("page-plugin-cms-social", {
	template: "#page-plugin-cms-social",
	props: {
		page: {
			type: Object,
			required: true
		},
		edit: {
			type: Boolean,
			required: true
		},
		instance: {
			type: Object,
			required: true
		}
	},
	created: function() {
		var self = this;
		this.instance.$on("hook:mounted", function() {
			Vue.nextTick(function() {
				var pageInstance = self.$services.page.getPageInstance(self.page, self);
				if (self.page.content.path) {
					if (self.page.content.social && self.page.content.social.bindings) {
						// remove existing meta
						var meta = document.head.querySelectorAll("meta[property]");
						for (var i = 0; i < meta.length; i++) {
							meta[i].parentNode.removeChild(meta[i]);
						}
						var bindings = self.page.content.social.bindings;
						var nodeId = bindings["nodeId"] ? self.$services.page.getBindingValue(pageInstance, bindings["nodeId"]) : null;
						// TODO: could support profile too in the future? (and other stuff of course)
						self.createMetaTag("og:type", "article");
						self.createMetaTag("og:url", window.location);
						self.createMetaTag("og:site_name", self.$services.page.title);
						Object.keys(bindings).forEach(function(key) {
							if (bindings[key]) {
								var value = self.$services.page.getBindingValue(pageInstance, bindings[key]);
								if (key == "title" && value) {
									self.createMetaTag("og:title", value);
									self.createMetaTag("title", value);
									self.createMetaTag("twitter:title", value);
								}
								else if (key == "attachmentId" && value && nodeId) {
									if (value instanceof Array) {
										if (value.length > 0) {
											self.createMetaTag("og:image", "${environment('url')}" + self.$services.attachment.url(nodeId, value[0]));
										}
									}
									else {
										self.createMetaTag("og:image", "${environment('url')}" + self.$services.attachment.url(nodeId, value));
									}
								}
								else if (key == "published" && value) {
									self.createMetaTag("article:published_time", value instanceof Date ? value.toISOString() : value);
								}
								else if (key == "description" && value) {
									self.createMetaTag("og:description", value);
									self.createMetaTag("description", value);
									self.createMetaTag("twitter:description", value);
								}
							}
						});
					}
				}
			});
		})
	},
	methods: {
		createMetaTag: function(key, value) {
			var meta = document.createElement("meta");
			if (key == "title" || key == "description" || (key.indexOf("twitter:") == 0 && key != "twitter:title")) {
				meta.setAttribute("name", key);
				meta.setAttribute("value", value);	
			}
			else {
				meta.setAttribute("property", key);
				meta.setAttribute("content", value);
			}
			document.head.appendChild(meta);
		}
	},
});


Vue.component("page-plugin-cms-social-configure", {
	template: "#page-plugin-cms-social-configure",
	props: {
		page: {
			type: Object,
			required: true
		},
		edit: {
			type: Boolean,
			required: true
		},
	},
	methods: {
		// http://ogp.me/
		getOgTypes: function(value) {
			var items = ['article', 'profile', 'website', 'book', 'video.movie', 'video.episode', 'video.tv_show', 'video.other', 'music.song', 'music.album', 'music.playlist', 'music.radio_station', 'facebookAppId' ];
			if (items.indexOf(value) < 0) {
				items.unshift(value);
			}
			return items;
		},
		getSocialParameters: function() {
			var result = {};
			result.title = {type:"string"};
			result.description = {type:"string"};
			result.nodeId = {type:"string"};
			// the id of a cms attachment
			result.attachmentId = {type:"string"};
			// when it was published
			result.published = {type:"string", format: "date-time"};
			// @someone
			//result.twitterCreator = {type:"string"};
			// @something
			//result.twitterSite = {type:"string"};
			return {properties:result};
		}
	}
});