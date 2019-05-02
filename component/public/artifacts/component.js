window.addEventListener("load", function() {
	application.bootstrap(function($services) {
		nabu.page.provide("page-plugin", {
			name: "cms-social",
			module: "cms",
			component: "page-plugin-cms-social",
			configure: "page-plugin-cms-social-configure",
			target: "page"
		});
		
		return $services.$register({
			pageCms: nabu.page.services.PageCms,
		});
	});
});