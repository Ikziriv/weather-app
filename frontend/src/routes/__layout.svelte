<script>
    import { Styles } from 'sveltestrap';
    import { Header, HeaderMobile, Footer, FooterMobile } from "$lib/components/globals/index";
    import { theme, cssFrame } from "$lib/stores/index";
    import "../styles/tailwind.css";
    import "../styles/bootstrap.css";
</script>

<div class="main-layout h-auto md:h-screen relative bg-gray-100/50">
    <Header cssFrame={$cssFrame} />
    <main class="{$theme} flex flex-col justify-center items-center w-full h-auto md:h-screen">
        <HeaderMobile cssFrame={$cssFrame} />
        <slot></slot>
        <FooterMobile cssFrame={$cssFrame} />
    </main>
    <Footer cssFrame={$cssFrame} />
</div>

<style>
    .main-layout {
        width: 100%;
        height: auto;
    }
</style>