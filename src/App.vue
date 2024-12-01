<script setup lang="ts">
	import { onBeforeMount } from "vue";
	import { RouterView } from "vue-router";

	import { useTheme } from "@/store/theme";

	import TheContainer from "@/layouts/TheContainer.vue";


	const { watchStorageTheme } = useTheme();

	onBeforeMount(watchStorageTheme);
</script>


<template>
	<TheContainer>
		<RouterView/>
	</TheContainer>
</template>


<style lang="scss"></style>
