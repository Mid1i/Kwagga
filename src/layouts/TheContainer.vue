<script setup lang="ts">
	import TheHeader from "@/layouts/TheHeader.vue";
	import TheSidebar from "@/layouts/TheSidebar.vue";
</script>


<template>
	<div class="container">
		<TheSidebar/>
		<div class="container__content">
			<TheHeader/>
			<slot></slot>
		</div>
	</div>
</template>


<style scoped lang="scss">
	.container {
		align-items: flex-start;
		display: flex;
		gap: 2.1vw;

		padding: 1.05vw 2.1vw 2.1vw;

		min-height: 100%;
		width: 100%;

		&__content {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
			gap: 2.1vw;
		}
	}
</style>