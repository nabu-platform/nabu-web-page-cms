window.addEventListener("load", function() {
	application.bootstrap(function($services) {
		return $services.$register({
			pageCms: nabu.page.services.PageCms,
		});
	});
});