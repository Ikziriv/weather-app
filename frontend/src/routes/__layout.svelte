<script context="module">
	// This runs before the layout is rendered, setting key to the URL path
	export const load = async ({ url }) => ({
		props: {
			key: url.pathname
		}
	});
</script>

<script lang="ts">
    import { Header, HeaderMobile, TransitionPage, Footer, FooterMobile } from "$lib/components/globals/index";
    import { theme, cssFrame } from "$lib/stores/index";
    import "../styles/tailwind.css";
    import "../styles/bootstrap.css";
    
	export let key;
</script>

<div class="main-layout h-auto md:h-screen relative bg-gray-100/50 relative">
    <Header /> 
    <TransitionPage refresh={key}>
    <main class={$theme == 'dark' ? 'flex flex-col justify-center items-center w-full h-auto md:h-screen bg-gray-900' : 'flex flex-col justify-center items-center w-full h-auto md:h-screen'}>
        <HeaderMobile />
            <slot></slot>
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