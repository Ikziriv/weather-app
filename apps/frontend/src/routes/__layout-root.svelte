<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ url }) => {
        return {
			props: {
				key: url.pathname
			}
		};
	}
</script>

<script lang="ts">
    import { Header, HeaderMobile, TransitionPage, Footer, FooterMobile } from "$lib/components/globals/index";
    import { theme } from "$lib/stores/index";
    import '$styles/tailwind.css';
    import '$styles/bootstrap.css';
    
	export let key: any;
</script>

<div class="main-layout h-auto md:h-screenbg-gray-100/50 relative">
    <Header /> 
    <TransitionPage refresh={key}>
    <main class={$theme == 'dark' ? 'flex flex-col justify-center items-center w-full h-auto md:h-screen bg-gray-900' : 'flex flex-col justify-center items-center w-full h-auto md:h-screen'}>
        <HeaderMobile />
            <slot />
        <FooterMobile />
    </main>
    </TransitionPage>
    <Footer />
</div>

<style>
    .main-layout {
        width: 100%;
        height: auto;
    }
</style>