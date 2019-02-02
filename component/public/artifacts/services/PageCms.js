nabu.services.VueService(Vue.extend({
	services: ["page", "user"],
	watch: {
		'$services.page.wantEdit': function(newValue) {
			if (newValue && !this.$services.page.canEdit() && !this.$services.user.loggedIn) {
				this.$services.router.route("login");
			}
		}
	}
}), { name: "nabu.page.services.PageCms" });