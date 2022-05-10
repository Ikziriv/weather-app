<script>
    import { Styles } from 'sveltestrap';
    import { Header, Footer } from "$lib/components/globals/index";
    import { theme, cssFrame } from "$lib/stores/index";
    import "../styles/tailwind.css";
    import "../styles/bootstrap.css";
</script>

<div class="main-layout">
    <Header cssFrame={$cssFrame} />
    <main class="{$theme}">
        <slot></slot>
    </main>
    <Footer cssFrame={$cssFrame} />
</div>

<style>
    .main-layout {
        width: 100%;
        height: 100vw;
    }
</style>