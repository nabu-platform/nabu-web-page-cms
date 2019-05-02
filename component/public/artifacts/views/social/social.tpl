<template id="page-plugin-cms-social">
	<div class="page-plugin-cms-social">
		
	</div>
</template>


<template id="page-plugin-cms-social-configure">
	<div class="page-plugin-cms-social-configure">
		<button v-if="page.content.path && !page.content.social" @click="$window.Vue.set(page.content, 'social', {bindings:{}})">Add Social Media Settings</button>
		<n-collapsible title="CMS Social Media Settings" v-if="page.content.path && page.content.social">
			<n-page-mapper
				:to="getSocialParameters()"
				:from="$services.page.getAllAvailableParameters(page, $self)" 
				v-model="page.content.social.bindings"/>
		</n-collapsible>
	</div>
</template>